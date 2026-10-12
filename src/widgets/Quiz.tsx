import { useMemo, useState } from "react";
import type { QuizActivity } from "../content/types";
import { useProgress } from "../lib/progress";
import { ProgressBar } from "../ui";
import QuestionView from "./QuestionView";
import type { WidgetProps } from "./types";

/** 課程中的練習題（逐題作答、即時詳解，答錯自動加入錯題本） */
export default function Quiz({ activity, done, onComplete, ctx }: WidgetProps<QuizActivity>) {
  const questions = useMemo(() => {
    const map = new Map((ctx.questions ?? []).map((q) => [q.id, q]));
    return activity.questionIds.map((id) => map.get(id)).filter((q) => q !== undefined);
  }, [activity.questionIds, ctx.questions]);
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return <p className="text-sm text-slate-500">（找不到題目）</p>;
  }
  const q = questions[idx];

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      onComplete(correct / questions.length);
    } else {
      setIdx(idx + 1);
      setAnswered(false);
    }
  };

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="animate-pop space-y-3 text-center">
        <p className="text-5xl">{pct === 100 ? "🏆" : pct >= 60 ? "👍" : "💪"}</p>
        <p className="text-lg font-bold">
          答對 {correct} / {questions.length} 題（{pct}%）
        </p>
        <p className="text-sm text-slate-500">
          {pct === 100 ? "完美！" : "答錯的題目已加入錯題本，記得回來複習。"}
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setIdx(0);
            setCorrect(0);
            setAnswered(false);
            setFinished(false);
          }}
        >
          再做一次
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        第 {idx + 1} / {questions.length} 題
        <ProgressBar value={idx / questions.length} color={ctx.color} className="flex-1" />
        {done && <span className="chip">已完成過</span>}
      </div>
      <QuestionView
        key={q.id}
        question={q}
        onAnswer={(ok) => {
          setAnswered(true);
          if (ok) setCorrect((c) => c + 1);
          recordAnswer(q.id, ok);
        }}
      />
      {answered && (
        <button type="button" className="btn-primary" onClick={next} data-testid="quiz-next">
          {idx + 1 >= questions.length ? "看結果" : "下一題 →"}
        </button>
      )}
    </div>
  );
}
