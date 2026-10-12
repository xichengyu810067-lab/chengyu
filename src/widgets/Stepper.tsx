import { useState } from "react";
import type { StepsActivity } from "../content/types";
import { Feedback } from "../ui";
import { CompleteBar } from "./kit";
import { Rich, RichText } from "./RichText";
import type { WidgetProps } from "./types";

export default function Stepper({ activity, done, onComplete, ctx }: WidgetProps<StepsActivity>) {
  const total = activity.steps.length;
  const [shown, setShown] = useState(done ? total : 0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const current = activity.steps[shown];
  const predicting = current?.predict && picks[shown] === undefined;
  const finished = shown >= total;
  const predictTotal = activity.steps.filter((s) => s.predict).length;

  const pick = (i: number) => {
    if (!current?.predict) return;
    setPicks({ ...picks, [shown]: i });
    if (i === current.predict.answer) setCorrectCount((c) => c + 1);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
        <p className="mb-1 text-xs font-semibold tracking-wide text-slate-500">題目</p>
        <RichText text={activity.problem} className="text-base" />
      </div>
      <ol className="space-y-3">
        {activity.steps.slice(0, shown).map((s, i) => (
          <li key={i} className="flex animate-fade-in gap-3">
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ background: ctx.color }}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <RichText text={s.show} />
              {s.why && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">為什麼？</span>
                  <Rich text={s.why} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
      {!finished && current && (
        <div
          className="rounded-2xl border-2 border-dashed p-4"
          style={{ borderColor: `${ctx.color}88` }}
        >
          <p className="text-sm font-semibold">
            第 {shown + 1} / {total} 步
          </p>
          {current.predict ? (
            <div className="mt-2 space-y-2">
              <p className="text-sm">
                🤔 <Rich text={current.predict.question ?? "你覺得下一步該怎麼做？"} />
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {current.predict.choices.map((c, i) => {
                  const chosen = picks[shown];
                  const state =
                    chosen === undefined
                      ? "idle"
                      : i === current.predict?.answer
                        ? "right"
                        : i === chosen
                          ? "wrong"
                          : "dim";
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={chosen !== undefined}
                      onClick={() => pick(i)}
                      data-testid={`predict-${i}`}
                      className={`rounded-xl border-2 px-3 py-2 text-left text-sm transition ${
                        state === "idle"
                          ? "border-slate-200 hover:border-brand-400 dark:border-slate-700"
                          : state === "right"
                            ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                            : state === "wrong"
                              ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40"
                              : "border-slate-200 opacity-50 dark:border-slate-700"
                      }`}
                    >
                      <Rich text={c} />
                    </button>
                  );
                })}
              </div>
              {picks[shown] !== undefined && (
                <Feedback ok={picks[shown] === current.predict.answer}>
                  {picks[shown] === current.predict.answer
                    ? "猜對了！看看完整的這一步。"
                    : "沒關係，看看正確的做法。"}
                </Feedback>
              )}
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShown(shown + 1)}
              disabled={Boolean(predicting)}
              data-testid="step-next"
            >
              {current.predict ? "揭曉這一步" : "顯示下一步"} →
            </button>
            <button type="button" className="btn-ghost" onClick={() => setShown(total)}>
              全部顯示
            </button>
          </div>
        </div>
      )}
      {finished && activity.takeaway && (
        <div className="rounded-xl bg-amber-50 p-4 text-sm dark:bg-amber-950/30">
          <span className="font-semibold">📌 重點整理：</span>
          <RichText text={activity.takeaway} className="mt-1" />
        </div>
      )}
      {finished && (
        <CompleteBar
          done={done}
          onComplete={() => onComplete(predictTotal ? correctCount / predictTotal : undefined)}
          label="看懂了，完成"
          hint={predictTotal ? `預測答對 ${correctCount}/${predictTotal}` : undefined}
        />
      )}
    </div>
  );
}
