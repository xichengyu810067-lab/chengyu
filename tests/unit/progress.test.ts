import { describe, expect, it } from "vitest";
import { parseExport } from "../../src/lib/progress";

describe("匯入進度檔", () => {
  it("拒絕非本站檔案", () => {
    expect(() => parseExport("not json")).toThrow(/JSON/);
    expect(() => parseExport(JSON.stringify({ app: "other", data: {} }))).toThrow(/學習星球/);
  });
  it("清理不合法欄位", () => {
    const f = parseExport(
      JSON.stringify({
        app: "learning-planet",
        version: 1,
        data: {
          lessons: { "math.junior.a": { activitiesDone: ["a1", 3], bestScore: 999 }, bad: "x" },
          answers: { q: { correct: 1, wrong: "x" } },
          review: { q: { box: 1, due: "2026-01-01" } },
          activeDays: ["2026-01-01", "<script>"],
          games: { t: 100, u: "x" },
        },
      }),
    );
    expect(f.data.lessons["math.junior.a"]).toEqual({
      activitiesDone: ["a1"],
      completedAt: undefined,
      bestScore: 100,
    });
    expect(f.data.lessons.bad).toBeUndefined();
    expect(f.data.answers.q).toBeUndefined();
    expect(f.data.review.q.box).toBe(1);
    expect(f.data.activeDays).toEqual(["2026-01-01"]);
    expect(f.data.games).toEqual({ t: 100 });
  });
});
