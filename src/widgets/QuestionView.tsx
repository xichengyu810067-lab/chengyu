import { useEffect, useId, useState } from "react";
import type { Question } from "../content/types";
import { Feedback } from "../ui";
import { Rich, RichText } from "./RichText";

export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[。．.，,！!？?、；;：:「」『』"'（）()]/g, "");
}

export function checkAnswer(q: Question, value: unknown): boolean {
  switch (q.type) {
    case "single":
      return value === q.answer;
    case "multi": {
      const v = [...((value as number[]) ?? [])].sort();
      const a = [...q.answer].sort();
      return v.length === a.length && v.every((x, i) => x === a[i]);
    }
    case "tf":
      return value === q.answer;
    case "numeric": {
      const n = Number(String(value).replace(/,/g, ""));
      return Number.isFinite(n) && Math.abs(n - q.answer) <= (q.tolerance ?? 1e-9);
    }
    case "cloze": {
      const v = normalizeAnswer(String(value ?? ""));
      return q.accept.some((a) => normalizeAnswer(a) === v);
    }
  }
}

export function correctAnswerText(q: Question): string {
  switch (q.type) {
    case "single":
      return q.choices[q.answer];
    case "multi":
      return q.answer.map((i) => q.choices[i]).join("、");
    case "tf":
      return q.answer ? "⭕ 正確" : "❌ 錯誤";
    case "numeric":
      return `${q.answer}${q.unit ? ` ${q.unit}` : ""}`;
    case "cloze":
      return q.accept[0];
  }
}

const LETTERS = "ABCDEFGH";

export default function QuestionView({
  question,
  onAnswer,
  disabled = false,
  showExplain = true,
  compact = false,
}: {
  question: Question;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
  showExplain?: boolean;
  compact?: boolean;
}) {
  const [value, setValue] = useState<unknown>(question.type === "multi" ? [] : null);
  const [result, setResult] = useState<boolean | null>(null);
  const inputId = useId();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 換題時重設
  useEffect(() => {
    setValue(question.type === "multi" ? [] : null);
    setResult(null);
  }, [question.id]);

  const submit = (v: unknown) => {
    if (result !== null || disabled) return;
    const ok = checkAnswer(question, v);
    setValue(v);
    setResult(ok);
    onAnswer(ok);
  };

  const locked = result !== null || disabled;

  const choiceClass = (i: number, chosen: boolean) => {
    if (result === null) {
      return chosen
        ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40"
        : "border-slate-200 hover:border-brand-400 dark:border-slate-700";
    }
    const isAnswer =
      question.type === "single"
        ? i === question.answer
        : question.type === "multi"
          ? question.answer.includes(i)
          : false;
    if (isAnswer) return "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40";
    if (chosen) return "border-rose-400 bg-rose-50 dark:bg-rose-950/40";
    return "border-slate-200 opacity-60 dark:border-slate-700";
  };

  return (
    <div className="space-y-3" data-testid="question">
      <RichText
        text={question.stem}
        className={compact ? "font-semibold" : "text-lg font-semibold"}
      />
      {question.type === "single" && (
        <div className="grid gap-2 sm:grid-cols-2">
          {question.choices.map((c, i) => (
            <button
              key={i}
              type="button"
              disabled={locked}
              onClick={() => submit(i)}
              className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2.5 text-left transition ${choiceClass(i, value === i)}`}
              data-testid={`choice-${i}`}
            >
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-700">
                {LETTERS[i]}
              </span>
              <Rich text={c} />
            </button>
          ))}
        </div>
      )}
      {question.type === "multi" && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">（複選，選完按「確認」）</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {question.choices.map((c, i) => {
              const arr = value as number[];
              const chosen = arr.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={locked}
                  aria-pressed={chosen}
                  onClick={() => setValue(chosen ? arr.filter((x) => x !== i) : [...arr, i])}
                  className={`flex items-start gap-2 rounded-xl border-2 px-3 py-2.5 text-left transition ${choiceClass(i, chosen)}`}
                  data-testid={`choice-${i}`}
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-slate-300 text-xs">
                    {chosen ? "✓" : ""}
                  </span>
                  <Rich text={c} />
                </button>
              );
            })}
          </div>
          {result === null && (
            <button
              type="button"
              className="btn-primary"
              disabled={locked || (value as number[]).length === 0}
              onClick={() => submit(value)}
            >
              確認
            </button>
          )}
        </div>
      )}
      {question.type === "tf" && (
        <div className="flex gap-3">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              type="button"
              disabled={locked}
              onClick={() => submit(v)}
              className={`flex-1 rounded-xl border-2 py-3 text-lg font-bold transition ${
                result === null
                  ? "border-slate-200 hover:border-brand-400 dark:border-slate-700"
                  : v === question.answer
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                    : value === v
                      ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40"
                      : "border-slate-200 opacity-50 dark:border-slate-700"
              }`}
              data-testid={`tf-${v}`}
            >
              {v ? "⭕ 對" : "❌ 錯"}
            </button>
          ))}
        </div>
      )}
      {(question.type === "numeric" || question.type === "cloze") && (
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.currentTarget.elements.namedItem("answer") as HTMLInputElement).value;
            if (input.trim()) submit(input);
          }}
        >
          <label htmlFor={inputId} className="sr-only">
            作答
          </label>
          <input
            id={inputId}
            name="answer"
            className="input max-w-xs"
            inputMode={question.type === "numeric" ? "decimal" : "text"}
            autoComplete="off"
            disabled={locked}
            placeholder={question.type === "numeric" ? "輸入數字" : "輸入答案"}
            data-testid="answer-input"
          />
          {question.type === "numeric" && question.unit && (
            <span className="text-sm">{question.unit}</span>
          )}
          {result === null && (
            <button type="submit" className="btn-primary" disabled={locked}>
              確認
            </button>
          )}
        </form>
      )}
      {result !== null && (
        <Feedback ok={result}>
          <p className="font-semibold">
            {result ? "🎉 答對了！" : "😅 答錯了，"}
            {!result && (
              <>
                正確答案：
                <Rich text={correctAnswerText(question)} />
              </>
            )}
          </p>
          {showExplain && <RichText text={question.explain} className="mt-1" />}
        </Feedback>
      )}
    </div>
  );
}
