import { useState } from "react";
import type { LayersActivity } from "../content/types";
import { Feedback } from "../ui";
import { CompleteBar } from "./kit";
import { LazyScene } from "./LazyHost";
import { Rich, RichText } from "./RichText";
import type { WidgetProps } from "./types";

export default function LayerViewer({
  activity,
  done,
  onComplete,
  ctx,
}: WidgetProps<LayersActivity>) {
  const [state, setState] = useState(() =>
    Object.fromEntries(activity.layers.map((l) => [l.id, { on: l.on ?? false, opacity: 0.85 }])),
  );
  const [toggled, setToggled] = useState<Set<string>>(
    () => new Set(done ? activity.layers.map((l) => l.id) : []),
  );
  const [answer, setAnswer] = useState<number | null>(null);
  const allSeen = toggled.size >= activity.layers.length;
  const check = activity.check;
  const ready = allSeen && (!check || answer !== null);

  const toggle = (id: string) => {
    setState((s) => ({ ...s, [id]: { ...s[id], on: !s[id].on } }));
    setToggled((t) => new Set(t).add(id));
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <svg
          viewBox={activity.viewBox}
          className="mx-auto h-auto max-h-[65vh] w-full"
          role="img"
          aria-label={`${activity.title}（圖層：${
            activity.layers
              .filter((l) => state[l.id].on)
              .map((l) => l.label)
              .join("、") || "無"
          }）`}
        >
          {activity.base && <LazyScene load={activity.base} props={{}} />}
          {activity.layers.map((l) => (
            <g
              key={l.id}
              style={{
                opacity: state[l.id].on ? state[l.id].opacity : 0,
                transition: "opacity .45s ease",
              }}
              aria-hidden={!state[l.id].on}
            >
              <LazyScene load={l.load} props={{}} />
            </g>
          ))}
        </svg>
        <p className="border-t border-slate-100 px-3 py-1 text-right text-[11px] text-slate-400 dark:border-slate-800">
          示意圖，非精確比例
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          打開或關閉圖層、調整透明度，觀察資料之間的關聯。
        </p>
        <ul className="space-y-2">
          {activity.layers.map((l) => (
            <li key={l.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={state[l.id].on}
                  onChange={() => toggle(l.id)}
                  className="size-5"
                  style={{ accentColor: l.color ?? ctx.color }}
                  data-testid={`layer-${l.id}`}
                />
                {l.color && (
                  <span
                    className="inline-block size-3 rounded-sm"
                    style={{ background: l.color }}
                    aria-hidden
                  />
                )}
                <span className="font-semibold">{l.label}</span>
              </label>
              {state[l.id].on && (
                <div className="mt-2 space-y-1">
                  <label className="flex items-center gap-2 text-xs text-slate-500">
                    透明度
                    <input
                      type="range"
                      min={0.2}
                      max={1}
                      step={0.05}
                      value={state[l.id].opacity}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          [l.id]: { ...s[l.id], opacity: Number(e.target.value) },
                        }))
                      }
                      className="flex-1"
                      style={{ accentColor: l.color ?? ctx.color }}
                    />
                  </label>
                  {l.note && (
                    <RichText
                      text={l.note}
                      className="text-xs text-slate-600 dark:text-slate-300"
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        {check && allSeen && (
          <div className="card space-y-2 p-3">
            <p className="text-sm font-semibold">
              🤔 <Rich text={check.stem} />
            </p>
            <div className="grid gap-2">
              {check.choices.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={answer !== null}
                  onClick={() => setAnswer(i)}
                  className={`rounded-xl border-2 px-3 py-2 text-left text-sm ${
                    answer === null
                      ? "border-slate-200 hover:border-brand-400 dark:border-slate-700"
                      : i === check.answer
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                        : i === answer
                          ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40"
                          : "border-slate-200 opacity-60 dark:border-slate-700"
                  }`}
                >
                  <Rich text={c} />
                </button>
              ))}
            </div>
            {answer !== null && (
              <Feedback ok={answer === check.answer}>
                <RichText
                  text={`${answer === check.answer ? "答對了！" : "再想想："}${check.explain}`}
                />
              </Feedback>
            )}
          </div>
        )}
        <CompleteBar
          done={done}
          onComplete={() => onComplete(check ? (answer === check.answer ? 1 : 0.5) : undefined)}
          disabled={!ready}
          hint={
            ready
              ? undefined
              : allSeen
                ? "回答上面的思考題"
                : `每個圖層都打開看看（${toggled.size}/${activity.layers.length}）`
          }
        />
      </div>
    </div>
  );
}
