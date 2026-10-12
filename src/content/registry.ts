/**
 * 內容註冊表：以 Vite glob 自動找出各科資料，新增科目或學段不需修改此檔。
 * - `<subject>/meta.ts`：同步載入（首頁要顯示）
 * - `<subject>/<stage>/index.ts`：依需要延遲載入（每個學段一個 chunk）
 * - `<subject>/scenarios.ts`：對話情境，延遲載入
 */

import { retryImport } from "../lib/lazyRetry";
import type { Lesson, Question, Scenario, Stage, SubjectId, SubjectMeta, TrackData } from "./types";
import { SUBJECT_IDS } from "./types";

const metaModules = import.meta.glob<{ default: SubjectMeta }>("./*/meta.ts", { eager: true });
const trackModules = import.meta.glob<{ default: TrackData }>("./*/*/index.ts");
const scenarioModules = import.meta.glob<{ default: Scenario[] }>("./*/scenarios.ts");

export const SUBJECTS: SubjectMeta[] = Object.values(metaModules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

const SUBJECT_MAP = new Map(SUBJECTS.map((s) => [s.id, s]));

export function getSubject(id: string): SubjectMeta | undefined {
  return SUBJECT_MAP.get(id as SubjectId);
}

export function isSubjectId(id: string): id is SubjectId {
  return (SUBJECT_IDS as readonly string[]).includes(id);
}

export function isStage(s: string): s is Stage {
  return s === "junior" || s === "senior";
}

export function trackId(subject: SubjectId, stage: Stage) {
  return `${subject}.${stage}`;
}

/** 這個科目的這個學段是否已有內容 */
export function hasTrack(subject: SubjectId, stage: Stage): boolean {
  return `./${subject}/${stage}/index.ts` in trackModules;
}

const trackCache = new Map<string, Promise<TrackData>>();

export function loadTrack(subject: SubjectId, stage: Stage): Promise<TrackData> {
  const key = trackId(subject, stage);
  let p = trackCache.get(key);
  if (!p) {
    const loader = trackModules[`./${subject}/${stage}/index.ts`];
    if (!loader) return Promise.reject(new Error(`尚無內容：${key}`));
    p = retryImport(loader).then((m) => m.default);
    p.catch(() => trackCache.delete(key));
    trackCache.set(key, p);
  }
  return p;
}

/** 由 id（`${subject}.${stage}.xxx`）解析出科目與學段 */
export function parseContentId(id: string): { subject: SubjectId; stage: Stage } | null {
  const [subject, stage] = id.split(".");
  if (!subject || !stage || !isSubjectId(subject) || !isStage(stage)) return null;
  return { subject, stage };
}

export async function loadLesson(
  lessonId: string,
): Promise<{ lesson: Lesson; track: TrackData; subject: SubjectId; stage: Stage } | null> {
  const parsed = parseContentId(lessonId);
  if (!parsed || !hasTrack(parsed.subject, parsed.stage)) return null;
  const track = await loadTrack(parsed.subject, parsed.stage);
  const lesson = track.lessons.find((l) => l.id === lessonId);
  return lesson ? { lesson, track, ...parsed } : null;
}

export async function loadQuestions(ids: string[]): Promise<Map<string, Question>> {
  const byTrack = new Map<string, { subject: SubjectId; stage: Stage }>();
  for (const id of ids) {
    const p = parseContentId(id);
    if (p && hasTrack(p.subject, p.stage)) byTrack.set(trackId(p.subject, p.stage), p);
  }
  const tracks = await Promise.all([...byTrack.values()].map((p) => loadTrack(p.subject, p.stage)));
  const wanted = new Set(ids);
  const out = new Map<string, Question>();
  for (const t of tracks) for (const q of t.questions) if (wanted.has(q.id)) out.set(q.id, q);
  return out;
}

const scenarioCache = new Map<string, Promise<Scenario[]>>();

export function loadSubjectScenarios(subject: SubjectId): Promise<Scenario[]> {
  let p = scenarioCache.get(subject);
  if (!p) {
    const loader = scenarioModules[`./${subject}/scenarios.ts`];
    p = loader ? retryImport(loader).then((m) => m.default) : Promise.resolve([]);
    p.catch(() => scenarioCache.delete(subject));
    scenarioCache.set(subject, p);
  }
  return p;
}

export async function loadScenario(id: string): Promise<Scenario | undefined> {
  const [subject] = id.split(".");
  if (!subject || !isSubjectId(subject)) return undefined;
  const list = await loadSubjectScenarios(subject);
  return list.find((s) => s.id === id);
}

export async function loadAllScenarios(): Promise<Scenario[]> {
  const lists = await Promise.all(SUBJECT_IDS.map((s) => loadSubjectScenarios(s)));
  return lists.flat();
}
