import { describe, expect, it } from "vitest";
import type { Question } from "../../src/content/types";
import { checkAnswer, normalizeAnswer } from "../../src/widgets/QuestionView";

const base = { id: "x.junior.q-1", stem: "", explain: "" };

describe("判斷答案", () => {
  it("單選、是非", () => {
    const q: Question = { ...base, type: "single", choices: ["a", "b"], answer: 1 };
    expect(checkAnswer(q, 1)).toBe(true);
    expect(checkAnswer(q, 0)).toBe(false);
    expect(checkAnswer({ ...base, type: "tf", answer: false }, false)).toBe(true);
  });
  it("複選不看順序", () => {
    const q: Question = { ...base, type: "multi", choices: ["a", "b", "c"], answer: [0, 2] };
    expect(checkAnswer(q, [2, 0])).toBe(true);
    expect(checkAnswer(q, [0])).toBe(false);
  });
  it("數值題容許誤差與千分位", () => {
    const q: Question = { ...base, type: "numeric", answer: 3.14, tolerance: 0.01 };
    expect(checkAnswer(q, "3.141")).toBe(true);
    expect(checkAnswer(q, "3.2")).toBe(false);
    expect(checkAnswer({ ...base, type: "numeric", answer: 1200 }, "1,200")).toBe(true);
  });
  it("填充題忽略大小寫、全形與標點", () => {
    const q: Question = { ...base, type: "cloze", accept: ["H2O"] };
    expect(checkAnswer(q, " h２o。")).toBe(true);
    expect(normalizeAnswer("  Hello,  World! ")).toBe("hello world");
  });
});
