import type { ReactNode } from "react";

export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  color = "var(--color-brand-600)",
  children,
  label,
}: {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `${Math.round(v * 100)}%`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset .6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-xs font-bold">{children}</div>
    </div>
  );
}

export function ProgressBar({
  value,
  color,
  className = "",
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
    >
      <div
        className="h-full rounded-full bg-brand-500 transition-[width] duration-500"
        style={{ width: `${v * 100}%`, background: color }}
      />
    </div>
  );
}

export function Spinner({ label = "載入中…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-slate-500" role="status">
      <span className="size-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      {label}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <p className="text-5xl" aria-hidden>
        {icon}
      </p>
      <h2 className="mt-3 text-lg font-bold">{title}</h2>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{children}</div>
    </div>
  );
}

export function PageTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{children}</h1>
      {sub && <p className="mt-1 text-slate-600 dark:text-slate-400">{sub}</p>}
    </div>
  );
}

export function Feedback({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      role="status"
      className={`animate-pop rounded-xl border px-4 py-3 text-sm ${
        ok
          ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-100"
          : "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-100"
      }`}
    >
      {children}
    </div>
  );
}
