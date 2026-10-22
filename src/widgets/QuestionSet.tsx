import { useMemo, useState } from "react";
import type { SetActivity } from "../content/types";
import { useProgress } from "../lib/progress";
import { ProgressBar } from "../ui";
import QuestionView, { ContextBox } from "./QuestionView";
import type { WidgetProps } from "./types";

/** 素養題組：共用材料只顯示一次，下方各題獨立作答，答錯自動加入錯題本 */
export default function QuestionSet({ activity, done, onComplete, ctx }: WidgetProps<SetActivity>) {
  const questions = useMemo(() => {
    const map = new Map((ctx.questions ?? []).map((q) => [q.id, q]));
    return activity.questionIds.map((id) => map.get(id)).filter((q) => q !== undefined);
  }, [activity.questionIds, ctx.questions]);
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [round, setRound] = useState(0);

  if (questions.length === 0) {
    return <p className="text-sm text-slate-500">（找不到題目）</p>;
  }
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;
  const finished = answered === questions.length;

  return (
    <div className="space-y-4">
      {questions[0].context && <ContextBox text={questions[0].context} />}
      <div className="flex items-center gap-3 text-xs text-slate-500">
        已作答 {answered} / {questions.length} 題
        <ProgressBar value={answered / questions.length} color={ctx.color} className="flex-1" />
        {done && <span className="chip">已完成過</span>}
      </div>
      <ol className="space-y-6">
        {questions.map((q, i) => (
          <li
            key={`${round}-${q.id}`}
            className="border-t border-slate-200 pt-4 dark:border-slate-800"
          >
            <p className="mb-1 text-xs font-semibold" style={{ color: ctx.color }}>
              第 {i + 1} 題
            </p>
            <QuestionView
              question={q}
              compact
              hideContext
              onAnswer={(ok) => {
                recordAnswer(q.id, ok);
                const next = { ...results, [q.id]: ok };
                setResults(next);
                if (Object.keys(next).length === questions.length) {
                  const c = Object.values(next).filter(Boolean).length;
                  onComplete(c / questions.length);
                }
              }}
            />
          </li>
        ))}
      </ol>
      {finished && (
        <div className="animate-pop space-y-2 text-center" data-testid="set-result">
          <p className="text-lg font-bold">
            題組答對 {correct} / {questions.length} 題
          </p>
          <p className="text-sm text-slate-500">
            {correct === questions.length
              ? "完美！你能從材料中找出關鍵資訊。"
              : "答錯的題目已加入錯題本；回頭再讀一次材料，找找線索在哪裡。"}
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setResults({});
              setRound((r) => r + 1);
            }}
          >
            再做一次
          </button>
        </div>
      )}
    </div>
  );
}
