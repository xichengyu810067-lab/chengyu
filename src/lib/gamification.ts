import { addDays, dateKey, diffDays } from "./date";

export interface LessonRecord {
  activitiesDone: string[];
  completedAt?: string;
  /** 0–100 */
  bestScore?: number;
}

export interface AnswerRecord {
  correct: number;
  wrong: number;
  last: string;
}

export interface ReviewItem {
  /** Leitner 盒子 0–4 */
  box: number;
  due: string;
  added: string;
}

export interface ProgressData {
  lessons: Record<string, LessonRecord>;
  answers: Record<string, AnswerRecord>;
  review: Record<string, ReviewItem>;
  /** 從錯題本畢業的題數 */
  mastered: number;
  /** trackId -> 最佳闖關分數 */
  games: Record<string, number>;
  /** 日期 -> 每日挑戰答對題數 */
  daily: Record<string, number>;
  activeDays: string[];
  usage: { canvas: number; dialogue: number };
}

export const EMPTY_PROGRESS: ProgressData = {
  lessons: {},
  answers: {},
  review: {},
  mastered: 0,
  games: {},
  daily: {},
  activeDays: [],
  usage: { canvas: 0, dialogue: 0 },
};

/* ───────── 經驗值與等級（全部由進度推導，重複匯入不會灌水） ───────── */

export const XP_RULES = {
  activity: 10,
  lesson: 50,
  perfectLesson: 30,
  correctAnswer: 5,
  /** 每題最多計算幾次答對 */
  correctCap: 3,
  dailyChallenge: 30,
  mastered: 15,
} as const;

export function computeXP(p: ProgressData): number {
  let xp = 0;
  for (const rec of Object.values(p.lessons)) {
    xp += rec.activitiesDone.length * XP_RULES.activity;
    if (rec.completedAt) xp += XP_RULES.lesson;
    if ((rec.bestScore ?? 0) >= 100) xp += XP_RULES.perfectLesson;
  }
  for (const a of Object.values(p.answers)) {
    xp += Math.min(a.correct, XP_RULES.correctCap) * XP_RULES.correctAnswer;
  }
  for (const best of Object.values(p.games)) xp += Math.floor(best / 20);
  xp += Object.keys(p.daily).length * XP_RULES.dailyChallenge;
  xp += p.mastered * XP_RULES.mastered;
  return xp;
}

export const LEVEL_TITLES = [
  "星際見習生",
  "月球探險家",
  "行星觀測員",
  "彗星追蹤者",
  "恆星研究員",
  "星雲導航員",
  "銀河領航員",
  "星系建築師",
  "宇宙智者",
  "傳奇星神",
];

/** 第 n 級（從 1 起）所需累積 XP：Lv2=100、Lv3=300、Lv4=600、Lv5=1000… */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  const n = level - 1;
  return 50 * n * n + 50 * n;
}

export function levelInfo(xp: number) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  return {
    level,
    title,
    current: xp - base,
    needed: next - base,
    progress: (xp - base) / (next - base),
  };
}

/* ───────── 連續學習天數 ───────── */

export function computeStreak(activeDays: string[], today: string = dateKey()): number {
  const set = new Set(activeDays);
  let cursor = set.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function longestStreak(activeDays: string[]): number {
  const days = [...new Set(activeDays)].sort();
  let best = 0;
  let run = 0;
  for (let i = 0; i < days.length; i++) {
    run = i > 0 && diffDays(days[i - 1], days[i]) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}

/* ───────── 間隔重複（錯題本） ───────── */

export const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export function scheduleReview(
  item: ReviewItem | undefined,
  correct: boolean,
  today: string = dateKey(),
): { item: ReviewItem | null; graduated: boolean } {
  if (!correct) {
    return {
      item: { box: 0, due: addDays(today, 1), added: item?.added ?? today },
      graduated: false,
    };
  }
  if (!item) return { item: null, graduated: false };
  const box = item.box + 1;
  if (box >= REVIEW_INTERVALS.length) return { item: null, graduated: true };
  return { item: { ...item, box, due: addDays(today, REVIEW_INTERVALS[box]) }, graduated: false };
}

export function dueReviewIds(
  review: Record<string, ReviewItem>,
  today: string = dateKey(),
): string[] {
  return Object.entries(review)
    .filter(([, r]) => r.due <= today)
    .sort((a, b) => a[1].due.localeCompare(b[1].due))
    .map(([id]) => id);
}

/* ───────── 徽章 ───────── */

export interface Badge {
  id: string;
  icon: string;
  name: string;
  desc: string;
  earned: boolean;
}

export function computeBadges(p: ProgressData, today: string = dateKey()): Badge[] {
  const lessons = Object.entries(p.lessons);
  const completed = lessons.filter(([, r]) => r.completedAt);
  const subjects = new Set(completed.map(([id]) => id.split(".")[0]));
  const stages = new Set(completed.map(([id]) => id.split(".")[1]));
  const activities = lessons.reduce((n, [, r]) => n + r.activitiesDone.length, 0);
  const streak = Math.max(computeStreak(p.activeDays, today), longestStreak(p.activeDays));
  const bestGame = Math.max(0, ...Object.values(p.games));
  const totalCorrect = Object.values(p.answers).reduce((n, a) => n + a.correct, 0);
  const list: Omit<Badge, "earned">[] = [];
  const earned: boolean[] = [];
  const add = (b: Omit<Badge, "earned">, ok: boolean) => {
    list.push(b);
    earned.push(ok);
  };
  add(
    { id: "first-step", icon: "🚀", name: "第一步", desc: "完成第一個互動活動" },
    activities >= 1,
  );
  add({ id: "lesson-1", icon: "📘", name: "完課新星", desc: "完成 1 堂課" }, completed.length >= 1);
  add(
    { id: "lesson-10", icon: "📚", name: "課程達人", desc: "完成 10 堂課" },
    completed.length >= 10,
  );
  add(
    { id: "perfect", icon: "💯", name: "十全十美", desc: "任一堂課拿到滿分" },
    completed.some(([, r]) => (r.bestScore ?? 0) >= 100),
  );
  add({ id: "streak-3", icon: "🔥", name: "三日不輟", desc: "連續學習 3 天" }, streak >= 3);
  add({ id: "streak-7", icon: "🌟", name: "一週恆星", desc: "連續學習 7 天" }, streak >= 7);
  add({ id: "streak-30", icon: "🌕", name: "滿月之約", desc: "連續學習 30 天" }, streak >= 30);
  add(
    { id: "explorer", icon: "🧭", name: "跨科探險家", desc: "在 5 個科目完成課程" },
    subjects.size >= 5,
  );
  add(
    { id: "all-subjects", icon: "🪐", name: "十科全制霸", desc: "10 個科目都完成課程" },
    subjects.size >= 10,
  );
  add(
    { id: "both-stages", icon: "🎓", name: "跨越學段", desc: "國中與高中都完成課程" },
    stages.size >= 2,
  );
  add(
    { id: "answers-100", icon: "🎯", name: "百發百中", desc: "累積答對 100 題" },
    totalCorrect >= 100,
  );
  add({ id: "review-10", icon: "🛡️", name: "錯題剋星", desc: "讓 10 題錯題畢業" }, p.mastered >= 10);
  add(
    { id: "gamer", icon: "🎮", name: "闖關高手", desc: "闖關遊戲獲得 800 分以上" },
    bestGame >= 800,
  );
  add(
    { id: "daily-5", icon: "📅", name: "每日挑戰者", desc: "完成 5 次每日挑戰" },
    Object.keys(p.daily).length >= 5,
  );
  add(
    { id: "artist", icon: "🎨", name: "小畫家", desc: "在畫布完成 3 次作品" },
    p.usage.canvas >= 3,
  );
  add(
    { id: "talker", icon: "💬", name: "對話高手", desc: "完成 3 次情境對話" },
    p.usage.dialogue >= 3,
  );
  return list.map((b, i) => ({ ...b, earned: earned[i] }));
}

/* ───────── 合併兩份進度（匯入、日後雲端同步使用；結果與順序無關且冪等） ───────── */

function minStr(a?: string, b?: string) {
  if (!a) return b;
  if (!b) return a;
  return a < b ? a : b;
}

export function mergeProgress(a: ProgressData, b: ProgressData): ProgressData {
  const lessons: Record<string, LessonRecord> = { ...a.lessons };
  for (const [id, rb] of Object.entries(b.lessons)) {
    const ra = lessons[id];
    if (!ra) {
      lessons[id] = { ...rb, activitiesDone: [...new Set(rb.activitiesDone)] };
      continue;
    }
    const best = Math.max(ra.bestScore ?? -1, rb.bestScore ?? -1);
    lessons[id] = {
      activitiesDone: [...new Set([...ra.activitiesDone, ...rb.activitiesDone])].sort(),
      completedAt: minStr(ra.completedAt, rb.completedAt),
      bestScore: best >= 0 ? best : undefined,
    };
  }
  const answers: Record<string, AnswerRecord> = { ...a.answers };
  for (const [id, x] of Object.entries(b.answers)) {
    const y = answers[id];
    answers[id] = y
      ? {
          correct: Math.max(x.correct, y.correct),
          wrong: Math.max(x.wrong, y.wrong),
          last: x.last > y.last ? x.last : y.last,
        }
      : x;
  }
  const review: Record<string, ReviewItem> = { ...a.review };
  for (const [id, x] of Object.entries(b.review)) {
    const y = review[id];
    review[id] = y ? (x.due < y.due ? x : y.due < x.due ? y : x.box <= y.box ? x : y) : x;
  }
  const games: Record<string, number> = { ...a.games };
  for (const [id, s] of Object.entries(b.games)) games[id] = Math.max(games[id] ?? 0, s);
  const daily: Record<string, number> = { ...a.daily };
  for (const [d, s] of Object.entries(b.daily)) daily[d] = Math.max(daily[d] ?? 0, s);
  return {
    lessons,
    answers,
    review,
    mastered: Math.max(a.mastered, b.mastered),
    games,
    daily,
    activeDays: [...new Set([...a.activeDays, ...b.activeDays])].sort(),
    usage: {
      canvas: Math.max(a.usage.canvas, b.usage.canvas),
      dialogue: Math.max(a.usage.dialogue, b.usage.dialogue),
    },
  };
}
