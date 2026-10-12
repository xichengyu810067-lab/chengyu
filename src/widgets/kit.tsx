/**
 * 給互動元件與各科客製 lab 共用的小工具：函數繪圖、參數拉桿、完成按鈕。
 * 各科 labs/*.tsx 可以 `import { Plot, ParamSlider, ... } from "../../../widgets/kit"`。
 */
import { type ReactNode, useId } from "react";

export const PALETTE = ["#4f46e5", "#e11d48", "#059669", "#d97706", "#0891b2", "#7c3aed"];

export function niceStep(range: number, target = 8): number {
  const raw = range / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const n = raw / mag;
  const step = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10;
  return step * mag;
}

export function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const r = Number(n.toFixed(digits));
  return Object.is(r, -0) ? "0" : String(r);
}

export interface Scale {
  sx: (x: number) => number;
  sy: (y: number) => number;
  width: number;
  height: number;
  pad: { l: number; r: number; t: number; b: number };
}

export interface PlotProps {
  x: [number, number];
  y: [number, number];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  fns?: { label: string; color?: string; f: (x: number) => number }[];
  points?: { x: number; y: number; label?: string; color?: string }[];
  vlines?: { x: number; label?: string; color?: string }[];
  /** 額外的 SVG 疊加（使用座標轉換） */
  children?: (s: Scale) => ReactNode;
  className?: string;
  title?: string;
  showLegend?: boolean;
}

export function Plot({
  x,
  y,
  width = 420,
  height = 300,
  xLabel,
  yLabel,
  fns = [],
  points = [],
  vlines = [],
  children,
  className = "",
  title,
  showLegend = true,
}: PlotProps) {
  const pad = { l: 36, r: 14, t: 14, b: 30 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const sx = (v: number) => pad.l + ((v - x[0]) / (x[1] - x[0])) * w;
  const sy = (v: number) => pad.t + (1 - (v - y[0]) / (y[1] - y[0])) * h;
  const xs = niceStep(x[1] - x[0]);
  const ys = niceStep(y[1] - y[0]);
  const xticks: number[] = [];
  for (let v = Math.ceil(x[0] / xs) * xs; v <= x[1] + 1e-9; v += xs)
    xticks.push(Number(v.toFixed(10)));
  const yticks: number[] = [];
  for (let v = Math.ceil(y[0] / ys) * ys; v <= y[1] + 1e-9; v += ys)
    yticks.push(Number(v.toFixed(10)));
  const axisX = y[0] <= 0 && y[1] >= 0 ? sy(0) : pad.t + h;
  const axisY = x[0] <= 0 && x[1] >= 0 ? sx(0) : pad.l;
  const clipId = useId().replace(/:/g, "");

  const paths = fns.map((fn) => {
    const N = 240;
    let d = "";
    let pen = false;
    let prevY: number | null = null;
    for (let i = 0; i <= N; i++) {
      const xv = x[0] + ((x[1] - x[0]) * i) / N;
      const yv = fn.f(xv);
      const ok = Number.isFinite(yv) && Math.abs(yv) < 1e6;
      // 不連續（例如 tan）時斷開
      const jump = prevY !== null && ok && Math.abs(yv - prevY) > (y[1] - y[0]) * 2;
      if (!ok || jump) {
        pen = false;
        prevY = ok ? yv : null;
        if (!ok) continue;
      }
      d += `${pen ? "L" : "M"}${sx(xv).toFixed(1)},${sy(yv).toFixed(1)}`;
      pen = true;
      prevY = yv;
    }
    return d;
  });

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full touch-pan-y select-none"
        role="img"
        aria-label={title ?? `函數圖形${fns.map((f) => `：${f.label}`).join("")}`}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={pad.l} y={pad.t} width={w} height={h} />
          </clipPath>
        </defs>
        <rect x={pad.l} y={pad.t} width={w} height={h} className="fill-white dark:fill-slate-900" />
        {xticks.map((v) => (
          <line
            key={`gx${v}`}
            x1={sx(v)}
            x2={sx(v)}
            y1={pad.t}
            y2={pad.t + h}
            className="stroke-slate-200 dark:stroke-slate-800"
          />
        ))}
        {yticks.map((v) => (
          <line
            key={`gy${v}`}
            x1={pad.l}
            x2={pad.l + w}
            y1={sy(v)}
            y2={sy(v)}
            className="stroke-slate-200 dark:stroke-slate-800"
          />
        ))}
        <line
          x1={pad.l}
          x2={pad.l + w}
          y1={axisX}
          y2={axisX}
          className="stroke-slate-500"
          strokeWidth={1.2}
        />
        <line
          x1={axisY}
          x2={axisY}
          y1={pad.t}
          y2={pad.t + h}
          className="stroke-slate-500"
          strokeWidth={1.2}
        />
        {xticks.map((v) => (
          <text
            key={`tx${v}`}
            x={sx(v)}
            y={pad.t + h + 16}
            textAnchor="middle"
            className="fill-slate-500 text-[10px]"
          >
            {fmt(v, 3)}
          </text>
        ))}
        {yticks.map((v) => (
          <text
            key={`ty${v}`}
            x={pad.l - 5}
            y={sy(v) + 3}
            textAnchor="end"
            className="fill-slate-500 text-[10px]"
          >
            {fmt(v, 3)}
          </text>
        ))}
        {xLabel && (
          <text
            x={pad.l + w}
            y={height - 2}
            textAnchor="end"
            className="fill-slate-600 text-[11px] dark:fill-slate-300"
          >
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text
            x={pad.l + 4}
            y={pad.t + 11}
            className="fill-slate-600 text-[11px] dark:fill-slate-300"
          >
            {yLabel}
          </text>
        )}
        <g clipPath={`url(#${clipId})`}>
          {vlines.map((v, i) => (
            <g key={`v${i}`}>
              <line
                x1={sx(v.x)}
                x2={sx(v.x)}
                y1={pad.t}
                y2={pad.t + h}
                stroke={v.color ?? "#94a3b8"}
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              {v.label && (
                <text
                  x={sx(v.x) + 4}
                  y={pad.t + 12}
                  className="text-[10px]"
                  fill={v.color ?? "#64748b"}
                >
                  {v.label}
                </text>
              )}
            </g>
          ))}
          {paths.map((d, i) => (
            <path
              key={`p${i}`}
              d={d}
              fill="none"
              stroke={fns[i].color ?? PALETTE[i % PALETTE.length]}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
          {children?.({ sx, sy, width, height, pad })}
          {points.map((p, i) => (
            <g key={`pt${i}`}>
              <circle
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={5}
                fill={p.color ?? "#e11d48"}
                stroke="white"
                strokeWidth={1.5}
              />
              {p.label && (
                <text
                  x={sx(p.x) + 8}
                  y={sy(p.y) - 8}
                  className="fill-slate-700 text-[11px] font-semibold dark:fill-slate-200"
                >
                  {p.label}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
      {showLegend && fns.length > 0 && (
        <figcaption className="mt-1 flex flex-wrap gap-3 text-xs text-slate-600 dark:text-slate-300">
          {fns.map((f, i) => (
            <span key={f.label} className="inline-flex items-center gap-1">
              <span
                className="inline-block h-1 w-4 rounded"
                style={{ background: f.color ?? PALETTE[i % PALETTE.length] }}
              />
              {f.label}
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

export function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  color,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  color?: string;
}) {
  const id = useId();
  const digits = step >= 1 ? 0 : Math.min(4, Math.ceil(-Math.log10(step)));
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <output htmlFor={id} className="font-mono font-semibold tabular-nums" style={{ color }}>
          {value.toFixed(digits)}
          {unit ? ` ${unit}` : ""}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-8 w-full cursor-pointer"
        style={{ accentColor: color ?? "var(--color-brand-600)" }}
      />
    </div>
  );
}

export function CompleteBar({
  done,
  onComplete,
  label = "我懂了，完成這個活動",
  disabled,
  hint,
}: {
  done: boolean;
  onComplete: () => void;
  label?: string;
  disabled?: boolean;
  hint?: string;
}) {
  if (done) {
    return (
      <p
        className="animate-pop text-sm font-semibold text-emerald-600 dark:text-emerald-400"
        role="status"
      >
        ✅ 已完成！
      </p>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" className="btn-success" onClick={onComplete} disabled={disabled}>
        {label}
      </button>
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </div>
  );
}

/** viewBox 字串 → 寬高 */
export function parseViewBox(vb: string): { x: number; y: number; w: number; h: number } {
  const [x, y, w, h] = vb.split(/[\s,]+/).map(Number);
  return { x, y, w, h };
}
