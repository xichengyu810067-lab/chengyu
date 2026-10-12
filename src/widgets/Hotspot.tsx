import { useMemo, useState } from "react";
import type { HotspotActivity } from "../content/types";
import { shuffle } from "../lib/date";
import { Feedback, ProgressBar } from "../ui";
import { parseViewBox } from "./kit";
import { LazyScene } from "./LazyHost";
import { RichText } from "./RichText";
import type { WidgetProps } from "./types";

export default function Hotspot({ activity, done, onComplete, ctx }: WidgetProps<HotspotActivity>) {
  const mode = activity.mode ?? "explore";
  const vb = parseViewBox(activity.viewBox);
  const r = Math.max(vb.w, vb.h) * 0.03;
  const [active, setActive] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(
    () => new Set(done ? activity.spots.map((s) => s.id) : []),
  );
  const order = useMemo(() => shuffle(activity.spots.map((s) => s.id)), [activity.spots]);
  const [findIdx, setFindIdx] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(done);

  const spot = activity.spots.find((s) => s.id === active);
  const target = mode === "find" ? activity.spots.find((s) => s.id === order[findIdx]) : undefined;

  const click = (id: string) => {
    if (mode === "explore") {
      setActive(id);
      const next = new Set(visited).add(id);
      setVisited(next);
      if (!completed && next.size === activity.spots.length) {
        setCompleted(true);
        onComplete(1);
      }
      return;
    }
    if (!target || completed) {
      setActive(id);
      return;
    }
    if (id === target.id) {
      setActive(id);
      setVisited(new Set(visited).add(id));
      if (findIdx + 1 >= order.length) {
        setCompleted(true);
        onComplete(Math.max(0, 1 - mistakes / (order.length * 2)));
      } else setFindIdx(findIdx + 1);
    } else {
      setMistakes((m) => m + 1);
      setWrongId(id);
      setTimeout(() => setWrongId(null), 500);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div>
        {mode === "find" && !completed && target && (
          <div
            className="mb-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
            role="status"
          >
            🔍 請找出：{target.title}（{findIdx + 1}/{order.length}）
          </div>
        )}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <svg viewBox={activity.viewBox} className="h-auto w-full select-none">
            <title>{activity.title}</title>
            <LazyScene load={activity.scene} props={{ active }} />
            {activity.spots.map((s, i) => {
              const seen = visited.has(s.id);
              const isActive = active === s.id;
              const label = mode === "find" && !completed ? `熱區 ${i + 1}` : s.title;
              return (
                <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
                  {/* biome-ignore lint/a11y/useSemanticElements: SVG 內無法使用 <button>，以 role 與鍵盤事件補足 */}
                  <g
                    className={`hotspot-btn cursor-pointer ${wrongId === s.id ? "animate-shake" : ""}`}
                    role="button"
                    tabIndex={0}
                    aria-label={label}
                    aria-pressed={isActive}
                    onClick={() => click(s.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        click(s.id);
                      }
                    }}
                    data-testid={`hotspot-${s.id}`}
                  >
                    {!seen && <circle r={r} fill={ctx.color} className="hotspot-ring" />}
                    <circle r={r * 1.6} fill="transparent" />
                    <circle
                      r={r * (isActive ? 0.95 : 0.75)}
                      fill={seen ? "#10b981" : ctx.color}
                      stroke="white"
                      strokeWidth={r * 0.22}
                      style={{ transition: "r .2s" }}
                    />
                    <text
                      textAnchor="middle"
                      dy={r * 0.32}
                      fontSize={r * 0.85}
                      fill="white"
                      fontWeight={700}
                      pointerEvents="none"
                    >
                      {seen ? "✓" : mode === "find" ? "?" : i + 1}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <ProgressBar
            value={visited.size / activity.spots.length}
            color={ctx.color}
            className="flex-1"
          />
          {visited.size}/{activity.spots.length}
        </div>
      </div>
      <div className="space-y-3">
        {spot ? (
          <div
            key={spot.id}
            className="card animate-fade-in p-4"
            style={{ borderTop: `4px solid ${ctx.color}` }}
            aria-live="polite"
          >
            <h4 className="text-lg font-bold">{spot.title}</h4>
            <RichText
              text={spot.body}
              className="mt-2 text-sm text-slate-700 dark:text-slate-200"
            />
          </div>
        ) : (
          <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {mode === "explore"
              ? "👆 點擊圖上閃爍的熱點，逐一認識每個部位。"
              : "依照上方提示，在圖上點出正確位置。"}
          </p>
        )}
        {mode === "explore" && (
          <ul className="flex flex-wrap gap-2">
            {activity.spots.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => click(s.id)}
                  className={`chip cursor-pointer ${visited.has(s.id) ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : ""}`}
                >
                  {visited.has(s.id) ? "✓ " : ""}
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        )}
        {completed && (
          <Feedback ok>
            {mode === "find"
              ? `🎉 全部找到了！${mistakes ? `（點錯 ${mistakes} 次）` : "零失誤！"}`
              : "🎉 所有熱點都探索完了！"}
          </Feedback>
        )}
      </div>
    </div>
  );
}
