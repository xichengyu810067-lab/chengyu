import { useState } from "react";
import type { Question } from "../content/types";
import { ProgressBar } from "../ui";
import QuestionView from "./QuestionView";

/** 逐題練習（每日挑戰、錯題本共用） */
export default function QuestionRunner({
  questions,
  onAnswer,
  onDone,
  color,
  labelFor,
}: {
  questions: Question[];
  onAnswer: (q: Question, ok: boolean) => void;
  onDone: (correct: number, total: number) => void;
  color?: string;
  labelFor?: (q: Question) => string | undefined;
}) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const q = questions[idx];
  if (!q) return null;
  const label = labelFor?.(q);
  return (
    <div className="card space-y-4 p-5">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        第 {idx + 1} / {questions.length} 題{label && <span className="chip">{label}</span>}
        <ProgressBar value={idx / questions.length} color={color} className="flex-1" />
      </div>
      <QuestionView
        key={q.id}
        question={q}
        onAnswer={(ok) => {
          setAnswered(true);
          if (ok) setCorrect((c) => c + 1);
          onAnswer(q, ok);
        }}
      />
      {answered && (
        <button
          type="button"
          className="btn-primary"
          data-testid="runner-next"
          onClick={() => {
            if (idx + 1 >= questions.length) onDone(correct, questions.length);
            else {
              setIdx(idx + 1);
              setAnswered(false);
            }
          }}
        >
          {idx + 1 >= questions.length ? "看結果" : "下一題 →"}
        </button>
      )}
    </div>
  );
}
