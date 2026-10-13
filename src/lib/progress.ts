import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { Stage } from "../content/types";
import { dateKey } from "./date";
import {
  EMPTY_PROGRESS,
  mergeProgress,
  type ProgressData,
  type ReviewItem,
  scheduleReview,
} from "./gamification";

export const STORE_KEY = "learning-planet";
export const STORE_VERSION = 1;

export interface Settings {
  theme: "system" | "light" | "dark";
  fontScale: number;
  reduceMotion: boolean;
}

export interface Profile {
  nickname: string;
  avatar: string;
  stage: Stage;
}

export interface ProgressState extends ProgressData {
  profile: Profile;
  settings: Settings;
  /** AI 通行碼（老師提供，選填） */
  aiAccessCode: string;
  /** 當日 AI 使用次數（本機提示用） */
  aiUsage: Record<string, number>;

  markActive: () => void;
  completeActivity: (lessonId: string, activityId: string) => void;
  completeLesson: (lessonId: string, score: number) => void;
  recordAnswer: (questionId: string, correct: boolean, opts?: { review?: boolean }) => void;
  removeReview: (questionId: string) => void;
  recordGame: (trackId: string, score: number) => void;
  recordDaily: (score: number) => void;
  bumpUsage: (kind: "canvas" | "dialogue") => void;
  bumpAiUsage: () => void;
  setProfile: (p: Partial<Profile>) => void;
  setSettings: (s: Partial<Settings>) => void;
  setAiAccessCode: (code: string) => void;
  importProgress: (data: ProgressData) => void;
  resetAll: () => void;
}

/* localStorage 不可用（無痕模式、被封鎖）時改用記憶體 */
function createSafeStorage(): { storage: StateStorage; persistent: boolean } {
  try {
    const k = "__lp_probe__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return { storage: window.localStorage, persistent: true };
  } catch {
    const mem = new Map<string, string>();
    return {
      storage: {
        getItem: (n) => mem.get(n) ?? null,
        setItem: (n, v) => void mem.set(n, v),
        removeItem: (n) => void mem.delete(n),
      },
      persistent: false,
    };
  }
}

const safe =
  typeof window === "undefined" ? { storage: undefined, persistent: false } : createSafeStorage();
export const storagePersistent = safe.persistent;

const DEFAULT_PROFILE: Profile = { nickname: "", avatar: "🧑‍🚀", stage: "junior" };
const DEFAULT_SETTINGS: Settings = { theme: "system", fontScale: 1, reduceMotion: false };

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...EMPTY_PROGRESS,
      profile: DEFAULT_PROFILE,
      settings: DEFAULT_SETTINGS,
      aiAccessCode: "",
      aiUsage: {},

      markActive: () => {
        const today = dateKey();
        const days = get().activeDays;
        if (days[days.length - 1] === today || days.includes(today)) return;
        set({ activeDays: [...days, today].slice(-800) });
      },

      completeActivity: (lessonId, activityId) => {
        const rec = get().lessons[lessonId] ?? { activitiesDone: [] };
        if (rec.activitiesDone.includes(activityId)) return;
        get().markActive();
        set({
          lessons: {
            ...get().lessons,
            [lessonId]: { ...rec, activitiesDone: [...rec.activitiesDone, activityId] },
          },
        });
      },

      completeLesson: (lessonId, score) => {
        const rec = get().lessons[lessonId] ?? { activitiesDone: [] };
        get().markActive();
        set({
          lessons: {
            ...get().lessons,
            [lessonId]: {
              ...rec,
              completedAt: rec.completedAt ?? new Date().toISOString(),
              bestScore: Math.max(rec.bestScore ?? 0, Math.round(score)),
            },
          },
        });
      },

      recordAnswer: (questionId, correct, opts) => {
        const today = dateKey();
        const prev = get().answers[questionId] ?? { correct: 0, wrong: 0, last: today };
        const answers = {
          ...get().answers,
          [questionId]: {
            correct: prev.correct + (correct ? 1 : 0),
            wrong: prev.wrong + (correct ? 0 : 1),
            last: today,
          },
        };
        const current = get().review[questionId];
        let review = get().review;
        let mastered = get().mastered;
        // 答錯一律進錯題本；答對只在「錯題本複習」時推進盒子
        if (!correct || (opts?.review && current)) {
          const { item, graduated } = scheduleReview(current, correct, today);
          review = { ...review };
          if (item) review[questionId] = item;
          else delete review[questionId];
          if (graduated) mastered += 1;
        }
        get().markActive();
        set({ answers, review, mastered });
      },

      removeReview: (questionId) => {
        const review = { ...get().review };
        delete review[questionId];
        set({ review });
      },

      recordGame: (trackId, score) => {
        get().markActive();
        set({ games: { ...get().games, [trackId]: Math.max(get().games[trackId] ?? 0, score) } });
      },

      recordDaily: (score) => {
        const today = dateKey();
        get().markActive();
        set({ daily: { ...get().daily, [today]: Math.max(get().daily[today] ?? 0, score) } });
      },

      bumpUsage: (kind) => {
        get().markActive();
        set({ usage: { ...get().usage, [kind]: get().usage[kind] + 1 } });
      },

      bumpAiUsage: () => {
        const today = dateKey();
        set({ aiUsage: { [today]: (get().aiUsage[today] ?? 0) + 1 } });
      },

      setProfile: (p) => set({ profile: { ...get().profile, ...p } }),
      setSettings: (s) => set({ settings: { ...get().settings, ...s } }),
      setAiAccessCode: (code) => set({ aiAccessCode: code.trim() }),

      importProgress: (data) => set(mergeProgress(pickProgress(get()), data)),

      resetAll: () =>
        set({
          ...EMPTY_PROGRESS,
          profile: DEFAULT_PROFILE,
          settings: get().settings,
          aiAccessCode: "",
          aiUsage: {},
        }),
    }),
    {
      name: STORE_KEY,
      version: STORE_VERSION,
      storage: safe.storage ? createJSONStorage(() => safe.storage as StateStorage) : undefined,
      partialize: (s) => ({
        ...pickProgress(s),
        profile: s.profile,
        settings: s.settings,
        aiAccessCode: s.aiAccessCode,
        aiUsage: s.aiUsage,
      }),
      migrate: (persisted) => persisted as ProgressState,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ProgressState>;
        return {
          ...current,
          ...p,
          usage: { ...current.usage, ...(p.usage ?? {}) },
          profile: { ...current.profile, ...(p.profile ?? {}) },
          settings: { ...current.settings, ...(p.settings ?? {}) },
        };
      },
    },
  ),
);

export function pickProgress(s: ProgressData): ProgressData {
  return {
    lessons: s.lessons,
    answers: s.answers,
    review: s.review,
    mastered: s.mastered,
    games: s.games,
    daily: s.daily,
    activeDays: s.activeDays,
    usage: s.usage,
  };
}

/* ───────── 匯出 / 匯入 ───────── */

export interface ExportFile {
  app: "learning-planet";
  version: number;
  exportedAt: string;
  profile?: Profile;
  data: ProgressData;
}

export function buildExport(s: ProgressState): ExportFile {
  return {
    app: "learning-planet",
    version: STORE_VERSION,
    exportedAt: new Date().toISOString(),
    profile: s.profile,
    data: pickProgress(s),
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** 驗證匯入檔，回傳清理過的資料；格式錯誤時丟出錯誤訊息 */
export function parseExport(text: string): ExportFile {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("檔案不是有效的 JSON。");
  }
  if (!isRecord(raw) || raw.app !== "learning-planet" || !isRecord(raw.data)) {
    throw new Error("這不是學習星球的進度檔。");
  }
  const d = raw.data;
  const lessons: ProgressData["lessons"] = {};
  if (isRecord(d.lessons)) {
    for (const [id, r] of Object.entries(d.lessons)) {
      if (!isRecord(r)) continue;
      lessons[id] = {
        activitiesDone: Array.isArray(r.activitiesDone)
          ? r.activitiesDone.filter((x): x is string => typeof x === "string")
          : [],
        completedAt: typeof r.completedAt === "string" ? r.completedAt : undefined,
        bestScore:
          typeof r.bestScore === "number" ? Math.min(100, Math.max(0, r.bestScore)) : undefined,
      };
    }
  }
  const answers: ProgressData["answers"] = {};
  if (isRecord(d.answers)) {
    for (const [id, a] of Object.entries(d.answers)) {
      if (isRecord(a) && typeof a.correct === "number" && typeof a.wrong === "number") {
        answers[id] = { correct: a.correct, wrong: a.wrong, last: String(a.last ?? "") };
      }
    }
  }
  const review: Record<string, ReviewItem> = {};
  if (isRecord(d.review)) {
    for (const [id, r] of Object.entries(d.review)) {
      if (isRecord(r) && typeof r.box === "number" && typeof r.due === "string") {
        review[id] = { box: r.box, due: r.due, added: String(r.added ?? r.due) };
      }
    }
  }
  const numMap = (v: unknown) => {
    const out: Record<string, number> = {};
    if (isRecord(v)) for (const [k, n] of Object.entries(v)) if (typeof n === "number") out[k] = n;
    return out;
  };
  const usage = isRecord(d.usage) ? d.usage : {};
  const data: ProgressData = {
    lessons,
    answers,
    review,
    mastered: typeof d.mastered === "number" ? d.mastered : 0,
    games: numMap(d.games),
    daily: numMap(d.daily),
    activeDays: Array.isArray(d.activeDays)
      ? d.activeDays.filter(
          (x): x is string => typeof x === "string" && /^\d{4}-\d{2}-\d{2}$/.test(x),
        )
      : [],
    usage: {
      canvas: typeof usage.canvas === "number" ? usage.canvas : 0,
      dialogue: typeof usage.dialogue === "number" ? usage.dialogue : 0,
    },
  };
  return {
    app: "learning-planet",
    version: typeof raw.version === "number" ? raw.version : 1,
    exportedAt: String(raw.exportedAt ?? ""),
    profile: isRecord(raw.profile) ? (raw.profile as unknown as Profile) : undefined,
    data,
  };
}
