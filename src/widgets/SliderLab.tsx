import { useMemo, useRef, useState } from "react";
import type { LabActivity, Params, SliderActivity } from "../content/types";
import { Feedback } from "../ui";
import { CompleteBar, PALETTE, ParamSlider, Plot } from "./kit";
import { LazyComponent } from "./LazyHost";
import { RichText } from "./RichText";
import type { WidgetProps } from "./types";

/** 資料驅動的拉桿實驗：參數 → 即時圖形與讀數 */
export function SliderWidget({ activity, done, onComplete, ctx }: WidgetProps<SliderActivity>) {
  const [params, setParams] = useState<Params>(() =>
    Object.fromEntries(activity.params.map((p) => [p.key, p.init])),
  );
  const [touched, setTouched] = useState(false);
  const reached = activity.goal ? safeTest(() => activity.goal?.test(params) ?? false) : false;
  const completedRef = useRef(done);

  const set = (key: string, v: number) => {
    const next = { ...params, [key]: v };
    setParams(next);
    setTouched(true);
    if (
      activity.goal &&
      !completedRef.current &&
      safeTest(() => activity.goal?.test(next) ?? false)
    ) {
      completedRef.current = true;
      onComplete(1);
    }
  };

  const plot = activity.plot;
  const fns = useMemo(
    () =>
      (plot?.fns ?? []).map((f, i) => ({
        label: f.label,
        color: f.color ?? PALETTE[i % PALETTE.length],
        f: (x: number) => safeNum(() => f.f(x, params)),
      })),
    [plot, params],
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        {activity.params.map((p) => (
          <ParamSlider
            key={p.key}
            label={p.label}
            min={p.min}
            max={p.max}
            step={p.step}
            unit={p.unit}
            value={params[p.key]}
            onChange={(v) => set(p.key, v)}
            color={ctx.color}
          />
        ))}
        <button
          type="button"
          className="btn-ghost min-h-8 px-2 py-1 text-xs"
          onClick={() => setParams(Object.fromEntries(activity.params.map((p) => [p.key, p.init])))}
        >
          ↺ 重設參數
        </button>
        {activity.readouts && (
          <dl className="grid grid-cols-2 gap-2">
            {activity.readouts.map((r) => (
              <div key={r.label} className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
                <dt className="text-xs text-slate-500">{r.label}</dt>
                <dd className="font-mono font-semibold tabular-nums">
                  <RichText text={safeStr(() => r.value(params))} inline />
                </dd>
              </div>
            ))}
          </dl>
        )}
        {activity.goal && (
          <div className="rounded-xl border border-dashed border-amber-400 bg-amber-50 p-3 text-sm dark:bg-amber-950/30">
            <span className="font-semibold">🎯 任務：</span>
            <RichText text={activity.goal.text} inline />
          </div>
        )}
        {reached && <Feedback ok>🎉 達成任務！你調出了正確的參數。</Feedback>}
      </div>
      <div className="min-w-0">
        {plot && (
          <Plot
            x={plot.x}
            y={plot.y}
            xLabel={plot.xLabel}
            yLabel={plot.yLabel}
            fns={fns}
            points={plot.points ? safeArr(() => plot.points?.(params) ?? []) : []}
            vlines={plot.vlines ? safeArr(() => plot.vlines?.(params) ?? []) : []}
          />
        )}
        {activity.insight && touched && (
          <div className="mt-3 rounded-xl bg-brand-50 p-3 text-sm dark:bg-brand-950/40">
            <span className="font-semibold">💡 觀察重點：</span>
            <RichText text={activity.insight} className="mt-1" />
          </div>
        )}
        {!activity.goal && (
          <div className="mt-4">
            <CompleteBar
              done={done}
              onComplete={() => onComplete()}
              disabled={!touched}
              hint={touched ? undefined : "先拉動拉桿觀察變化"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/** 客製實驗元件 */
export function LabWidget({ activity, done, onComplete }: WidgetProps<LabActivity>) {
  const [labDone, setLabDone] = useState(done);
  return (
    <div className="space-y-4">
      <LazyComponent
        load={activity.load}
        props={{
          config: activity.config,
          onComplete: () => {
            if (!labDone) {
              setLabDone(true);
              onComplete(1);
            }
          },
        }}
      />
      {activity.insight && labDone && (
        <div className="rounded-xl bg-brand-50 p-3 text-sm dark:bg-brand-950/40">
          <span className="font-semibold">💡 觀察重點：</span>
          <RichText text={activity.insight} className="mt-1" />
        </div>
      )}
      {!labDone && (
        <CompleteBar
          done={done}
          onComplete={() => {
            setLabDone(true);
            onComplete();
          }}
          label="我完成實驗了"
        />
      )}
    </div>
  );
}

function safeTest(fn: () => boolean): boolean {
  try {
    return fn();
  } catch {
    return false;
  }
}
function safeNum(fn: () => number): number {
  try {
    return fn();
  } catch {
    return Number.NaN;
  }
}
function safeStr(fn: () => string): string {
  try {
    return fn();
  } catch {
    return "—";
  }
}
function safeArr<T>(fn: () => T[]): T[] {
  try {
    return fn();
  } catch {
    return [];
  }
}
