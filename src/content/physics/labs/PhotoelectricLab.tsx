import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";

const METALS = [
  { name: "銫", W: 2.1, color: "#0891b2" },
  { name: "鈉", W: 2.3, color: "#7c3aed" },
  { name: "鋅", W: 4.3, color: "#e11d48" },
];
const HC = 1240; // hc ≈ 1240 eV·nm
const H_PER_1E14 = 0.4136; // h ≈ 4.136 × 10⁻¹⁵ eV·s，頻率以 10¹⁴ Hz 為單位

type TaskId = "red" | "zinc" | "ke1";
const TASKS: { id: TaskId; text: string }[] = [
  { id: "red", text: "用最強（強度 10）的紅光（λ ≥ 620 nm）照射鈉，觀察有沒有光電子" },
  { id: "zinc", text: "讓鋅板放出光電子" },
  { id: "ke1", text: "讓鈉放出的光電子最大動能約為 1.0 eV（誤差 ±0.1 eV）" },
];

function band(l: number): { name: string; color: string } {
  if (l < 380) return { name: "紫外線", color: "#a78bfa" };
  if (l < 450) return { name: "紫光", color: "#7c3aed" };
  if (l < 495) return { name: "藍光", color: "#2563eb" };
  if (l < 570) return { name: "綠光", color: "#16a34a" };
  if (l < 590) return { name: "黃光", color: "#eab308" };
  if (l < 620) return { name: "橙光", color: "#f97316" };
  return { name: "紅光", color: "#dc2626" };
}

function physics(lambda: number, metal: number) {
  const E = HC / lambda;
  const ke = E - METALS[metal].W;
  return { E, ke, emit: ke > 0 };
}

function check(lambda: number, intensity: number, metal: number): TaskId[] {
  const { ke, emit } = physics(lambda, metal);
  const name = METALS[metal].name;
  const out: TaskId[] = [];
  if (name === "鈉" && intensity === 10 && lambda >= 620) out.push("red");
  if (name === "鋅" && emit) out.push("zinc");
  if (name === "鈉" && emit && Math.abs(ke - 1) <= 0.1) out.push("ke1");
  return out;
}

/** 光電效應：改變光的波長、強度與金屬種類，觀察光電子 */
export default function PhotoelectricLab({ onComplete }: LabProps) {
  const [lambda, setLambda] = useState(650);
  const [intensity, setIntensity] = useState(5);
  const [metal, setMetal] = useState(1);
  const [done, setDone] = useState<TaskId[]>([]);
  const { E, ke, emit } = physics(lambda, metal);
  const b = band(lambda);
  const freq = 3000 / lambda; // 單位 10¹⁴ Hz

  const update = (l: number, i: number, m: number) => {
    setLambda(l);
    setIntensity(i);
    setMetal(m);
    const hit = check(l, i, m).filter((t) => !done.includes(t));
    if (hit.length) {
      const next = [...done, ...hit];
      setDone(next);
      if (next.length === TASKS.length) onComplete();
    }
  };

  const electrons = emit ? intensity : 0;
  const len = emit ? 18 + Math.sqrt(ke) * 40 : 0;

  return (
    <div className="space-y-4">
      <fieldset className="flex flex-wrap gap-2" aria-label="選擇金屬">
        {METALS.map((m, i) => (
          <button
            key={m.name}
            type="button"
            className={metal === i ? "btn-primary" : "btn-ghost"}
            aria-pressed={metal === i}
            onClick={() => update(lambda, intensity, i)}
          >
            {m.name}（功函數約 {m.W} eV）
          </button>
        ))}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-2">
        <svg
          viewBox="0 0 400 260"
          className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
          role="img"
          aria-label={`${b.name} ${lambda} 奈米照射${METALS[metal].name}，${emit ? `放出 ${electrons} 個示意電子` : "沒有光電子"}`}
        >
          <rect x="0" y="0" width="400" height="260" fill="#f8fafc" />
          {/* 光源 */}
          <rect x="20" y="20" width="60" height="36" rx="6" fill="#334155" />
          <text x="50" y="43" fontSize="11" textAnchor="middle" fill="#f8fafc">
            光源
          </text>
          <polygon
            points="80,26 80,50 250,200 320,200"
            fill={b.color}
            opacity={0.12 + intensity * 0.05}
          />
          {Array.from({ length: Math.ceil(intensity / 2) }, (_, i) => (
            <line
              key={i}
              x1={92 + i * 8}
              y1={36 + i * 3}
              x2={262 + i * 10}
              y2={198}
              stroke={b.color}
              strokeWidth="2"
              strokeDasharray="7 5"
            />
          ))}
          {/* 金屬板 */}
          <rect
            x="200"
            y="200"
            width="180"
            height="22"
            fill="#cbd5e1"
            stroke="#475569"
            strokeWidth="2"
          />
          <text x="290" y="244" fontSize="13" textAnchor="middle" fill="#1e293b">
            {METALS[metal].name}板
          </text>
          {/* 光電子 */}
          {Array.from({ length: electrons }, (_, i) => {
            const x = 270 + (i % 5) * 20;
            const ang = (-60 - (i % 5) * 12 - Math.floor(i / 5) * 6) * (Math.PI / 180);
            const ex = x + len * Math.cos(ang);
            const ey = 196 + len * Math.sin(ang);
            return (
              <g key={i}>
                <line x1={x} y1="196" x2={ex} y2={ey} stroke="#0f766e" strokeWidth="1.5" />
                <circle cx={ex} cy={ey} r="5" fill="#14b8a6" stroke="#0f766e" />
                <text x={ex} y={ey + 3} fontSize="8" textAnchor="middle" fill="#fff">
                  e
                </text>
              </g>
            );
          })}
          {!emit && (
            <text x="340" y="130" fontSize="13" textAnchor="middle" fill="#64748b">
              沒有電子飛出
            </text>
          )}
        </svg>
        <Plot
          x={[4, 15]}
          y={[0, 4]}
          xLabel="頻率（×10¹⁴ Hz）"
          yLabel="最大動能（eV）"
          fns={METALS.map((m) => ({
            label: m.name,
            color: m.color,
            f: (x: number) => {
              const k = H_PER_1E14 * x - m.W;
              return k >= 0 ? k : Number.NaN;
            },
          }))}
          points={[
            {
              x: freq,
              y: Math.max(0, ke),
              label: emit ? `${fmt(ke, 2)} eV` : "無光電子",
              color: METALS[metal].color,
            },
          ]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <ParamSlider
            label="光的波長 λ"
            min={200}
            max={700}
            step={10}
            unit="nm"
            value={lambda}
            onChange={(v) => update(v, intensity, metal)}
            color={b.color}
          />
          <ParamSlider
            label="光的強度"
            min={1}
            max={10}
            step={1}
            value={intensity}
            onChange={(v) => update(lambda, v, metal)}
            color="#475569"
          />
        </div>
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p>
            {b.name}：光子能量 E = hc ÷ λ = {fmt(E, 2)} eV
          </p>
          <p>功函數 W = {METALS[metal].W} eV</p>
          <p>
            最大動能 = E − W = <strong>{emit ? `${fmt(ke, 2)} eV` : "小於 0 → 不放出電子"}</strong>
          </p>
        </div>
      </div>
      <ul className="space-y-0.5 text-sm">
        {TASKS.map((t) => (
          <li key={t.id}>
            {done.includes(t.id) ? "✅" : "⬜"} {t.text}
          </li>
        ))}
      </ul>
      {done.length === TASKS.length && (
        <Feedback ok>
          🎉 完成！能不能放出電子只看光子能量（頻率），光的強度只影響光電子的「數目」。
        </Feedback>
      )}
    </div>
  );
}
