import { describe, expect, it } from "vitest";
import { addDays, diffDays } from "../../src/lib/date";
import {
  computeStreak,
  computeXP,
  EMPTY_PROGRESS,
  levelInfo,
  mergeProgress,
  type ProgressData,
  scheduleReview,
  xpForLevel,
} from "../../src/lib/gamification";

const sample: ProgressData = {
  ...EMPTY_PROGRESS,
  lessons: {
    "math.junior.a": {
      activitiesDone: ["a1", "a2"],
      completedAt: "2026-01-02T00:00:00Z",
      bestScore: 100,
    },
    "math.junior.b": { activitiesDone: ["a1"] },
  },
  answers: { "math.junior.q-1": { correct: 5, wrong: 1, last: "2026-01-02" } },
  activeDays: ["2026-01-01", "2026-01-02"],
};

describe("日期工具", () => {
  it("加減天數跨月", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(diffDays("2026-02-27", "2026-03-01")).toBe(2);
  });
});

describe("經驗值與等級", () => {
  it("由進度推導 XP，答對次數有上限", () => {
    // 3 個活動*10 + 完課 50 + 滿分 30 + 答對 min(5,3)*5
    expect(computeXP(sample)).toBe(30 + 50 + 30 + 15);
  });
  it("等級門檻遞增", () => {
    expect(xpForLevel(1)).toBe(0);
    expect(xpForLevel(2)).toBe(100);
    expect(levelInfo(99).level).toBe(1);
    expect(levelInfo(100).level).toBe(2);
    expect(levelInfo(299).level).toBe(2);
    expect(levelInfo(300).level).toBe(3);
  });
});

describe("連續天數", () => {
  it("今天或昨天有學習才算連續", () => {
    expect(computeStreak(["2026-01-01", "2026-01-02", "2026-01-03"], "2026-01-03")).toBe(3);
    expect(computeStreak(["2026-01-01", "2026-01-02"], "2026-01-03")).toBe(2);
    expect(computeStreak(["2026-01-01"], "2026-01-03")).toBe(0);
  });
});

describe("錯題本間隔重複", () => {
  it("答錯回到第 0 盒，答對逐步延後，最後畢業", () => {
    let r = scheduleReview(undefined, false, "2026-01-01");
    expect(r.item).toEqual({ box: 0, due: "2026-01-02", added: "2026-01-01" });
    r = scheduleReview(r.item ?? undefined, true, "2026-01-02");
    expect(r.item?.box).toBe(1);
    expect(r.item?.due).toBe("2026-01-05");
    let item = r.item ?? undefined;
    let graduated = false;
    for (let i = 0; i < 5 && item; i++) {
      const next = scheduleReview(item, true, "2026-02-01");
      item = next.item ?? undefined;
      graduated = next.graduated;
    }
    expect(graduated).toBe(true);
  });
});

describe("合併進度", () => {
  it("冪等：重複合併結果不變、XP 不灌水", () => {
    const once = mergeProgress(EMPTY_PROGRESS, sample);
    const twice = mergeProgress(once, sample);
    expect(twice).toEqual(once);
    expect(computeXP(twice)).toBe(computeXP(sample));
  });
  it("取最佳分數與活動聯集", () => {
    const other: ProgressData = {
      ...EMPTY_PROGRESS,
      lessons: {
        "math.junior.b": {
          activitiesDone: ["a2"],
          completedAt: "2026-01-05T00:00:00Z",
          bestScore: 80,
        },
      },
      activeDays: ["2026-01-05"],
    };
    const m = mergeProgress(sample, other);
    expect(m.lessons["math.junior.b"].activitiesDone).toEqual(["a1", "a2"]);
    expect(m.lessons["math.junior.b"].bestScore).toBe(80);
    expect(m.activeDays).toEqual(["2026-01-01", "2026-01-02", "2026-01-05"]);
  });
});
