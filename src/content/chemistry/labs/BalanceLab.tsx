import { Fragment, useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

type Species = { f: string; atoms: Record<string, number> };
type Equation = { id: string; name: string; left: Species[]; right: Species[] };

const EQS: Equation[] = [
  {
    id: "water",
    name: "氫氣燃燒",
    left: [
      { f: "H2", atoms: { H: 2 } },
      { f: "O2", atoms: { O: 2 } },
    ],
    right: [{ f: "H2O", atoms: { H: 2, O: 1 } }],
  },
  {
    id: "ammonia",
    name: "合成氨",
    left: [
      { f: "N2", atoms: { N: 2 } },
      { f: "H2", atoms: { H: 2 } },
    ],
    right: [{ f: "NH3", atoms: { N: 1, H: 3 } }],
  },
  {
    id: "methane",
    name: "甲烷燃燒",
    left: [
      { f: "CH4", atoms: { C: 1, H: 4 } },
      { f: "O2", atoms: { O: 2 } },
    ],
    right: [
      { f: "CO2", atoms: { C: 1, O: 2 } },
      { f: "H2O", atoms: { H: 2, O: 1 } },
    ],
  },
  {
    id: "alumina",
    name: "鋁的氧化",
    left: [
      { f: "Al", atoms: { Al: 1 } },
      { f: "O2", atoms: { O: 2 } },
    ],
    right: [{ f: "Al2O3", atoms: { Al: 2, O: 3 } }],
  },
];

const GOAL = 3;

const COLOR: Record<string, string> = {
  H: "#cbd5e1",
  O: "#ef4444",
  N: "#3b82f6",
  C: "#334155",
  Al: "#a78bfa",
};
const NAME: Record<string, string> = { H: "氫", O: "氧", N: "氮", C: "碳", Al: "鋁" };

const SUB = "₀₁₂₃₄₅₆₇₈₉";
/** H2O → H₂O */
const sub = (f: string) => f.replace(/\d/g, (d) => SUB[Number(d)]);

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

function count(side: Species[], coef: number[], el: string) {
  return side.reduce((t, s, i) => t + coef[i] * (s.atoms[el] ?? 0), 0);
}

function Formula({ f }: { f: string }) {
  const parts = f.split(/(\d+)/).filter(Boolean);
  return (
    <span>
      {parts.map((p, i) => (/^\d+$/.test(p) ? <sub key={i}>{p}</sub> : <span key={i}>{p}</span>))}
    </span>
  );
}

export default function BalanceLab({ onComplete }: LabProps) {
  const [idx, setIdx] = useState(0);
  const [coefs, setCoefs] = useState<number[][]>(() =>
    EQS.map((e) => [...e.left, ...e.right].map(() => 1)),
  );
  const [solved, setSolved] = useState<string[]>([]);
  const eq = EQS[idx];
  const c = coefs[idx];
  const cl = c.slice(0, eq.left.length);
  const cr = c.slice(eq.left.length);
  const elements = [...new Set([...eq.left, ...eq.right].flatMap((s) => Object.keys(s.atoms)))];
  const rows = elements.map((el) => ({
    el,
    l: count(eq.left, cl, el),
    r: count(eq.right, cr, el),
  }));
  const balanced = rows.every((r) => r.l === r.r);
  const simplest = c.reduce((a, b) => gcd(a, b)) === 1;

  const setCoef = (i: number, v: number) => {
    const next = coefs.map((row) => [...row]);
    next[idx][i] = v;
    setCoefs(next);
    const nl = next[idx].slice(0, eq.left.length);
    const nr = next[idx].slice(eq.left.length);
    const ok =
      elements.every((el) => count(eq.left, nl, el) === count(eq.right, nr, el)) &&
      next[idx].reduce((a, b) => gcd(a, b)) === 1;
    if (ok && !solved.includes(eq.id)) {
      const all = [...solved, eq.id];
      setSolved(all);
      if (all.length === GOAL) onComplete();
    }
  };

  const all = [...eq.left, ...eq.right];
  const maxCount = Math.max(...rows.flatMap((r) => [r.l, r.r]), 1);
  const dot = Math.min(13, 300 / maxCount);

  return (
    <div className="space-y-4">
      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">選擇反應式</legend>
        {EQS.map((e, i) => (
          <button
            key={e.id}
            type="button"
            className={i === idx ? "btn-primary" : "btn-ghost"}
            onClick={() => setIdx(i)}
            aria-pressed={i === idx}
          >
            {solved.includes(e.id) ? "✅ " : ""}
            {e.name}
          </button>
        ))}
      </fieldset>

      <p
        className="rounded-xl bg-slate-100 p-3 text-center text-xl font-semibold dark:bg-slate-800 sm:text-2xl"
        aria-live="polite"
      >
        {all.map((s, i) => (
          <Fragment key={`${eq.id}-${s.f}-${i}`}>
            {i > 0 && (
              <span className="mx-2 text-slate-500">{i === eq.left.length ? "→" : "+"}</span>
            )}
            <span className="text-rose-600 dark:text-rose-400">{c[i] === 1 ? "" : c[i]}</span>
            <Formula f={s.f} />
          </Fragment>
        ))}
      </p>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          {all.map((s, i) => (
            <ParamSlider
              key={`${eq.id}-${s.f}-${i}`}
              label={`${sub(s.f)} 的係數（${i < eq.left.length ? "反應物" : "生成物"}）`}
              min={1}
              max={6}
              step={1}
              value={c[i]}
              onChange={(v) => setCoef(i, v)}
              color={i < eq.left.length ? "#2563eb" : "#059669"}
            />
          ))}
          {balanced && simplest && <Feedback ok>⚖️ 平衡了！兩邊每一種原子的數目都相等。</Feedback>}
          {balanced && !simplest && (
            <Feedback ok={false}>
              原子數相等了，但係數要化成<strong>最簡整數比</strong>喔！
            </Feedback>
          )}
          <p className="text-sm">
            🎯 任務：用最簡整數係數平衡 <strong>{GOAL}</strong> 條反應式（已完成 {solved.length}/
            {GOAL}）。
          </p>
          {solved.length >= GOAL && (
            <Feedback ok>🎉 任務達成！平衡反應式只改係數，不能改化學式的下標。</Feedback>
          )}
        </div>
        <svg
          viewBox="0 0 420 240"
          className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
          role="img"
          aria-label={rows
            .map((r) => `${NAME[r.el]}原子 左邊 ${r.l} 個、右邊 ${r.r} 個`)
            .join("；")}
        >
          <rect x="0" y="0" width="420" height="240" fill="#f8fafc" />
          <text x="10" y="18" fontSize="12" fill="#475569">
            每種原子的數目（上排：反應物，下排：生成物）
          </text>
          {rows.map((r, k) => {
            const y = 40 + k * 64;
            const ok = r.l === r.r;
            return (
              <g key={r.el}>
                <text x="10" y={y + 18} fontSize="14" fontWeight="700" fill="#1e293b">
                  {r.el}
                </text>
                <text x="384" y={y + 18} fontSize="18" fill={ok ? "#059669" : "#e11d48"}>
                  {ok ? "✓" : "✗"}
                </text>
                {Array.from({ length: r.l }, (_, i) => (
                  <circle
                    key={`l${i}`}
                    cx={50 + i * dot + dot / 2}
                    cy={y + 6}
                    r={dot / 2 - 1}
                    fill={COLOR[r.el]}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: r.r }, (_, i) => (
                  <circle
                    key={`r${i}`}
                    cx={50 + i * dot + dot / 2}
                    cy={y + 26}
                    r={dot / 2 - 1}
                    fill={COLOR[r.el]}
                    stroke="#475569"
                    strokeWidth="1"
                    opacity="0.75"
                  />
                ))}
                <text x="36" y={y + 10} fontSize="10" textAnchor="end" fill="#2563eb">
                  {r.l}
                </text>
                <text x="36" y={y + 30} fontSize="10" textAnchor="end" fill="#059669">
                  {r.r}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
