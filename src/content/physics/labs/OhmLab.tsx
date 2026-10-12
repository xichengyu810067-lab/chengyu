import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

type Mode = "single" | "series" | "parallel";
const MODES: { id: Mode; label: string }[] = [
  { id: "single", label: "一個燈泡" },
  { id: "series", label: "兩燈串聯" },
  { id: "parallel", label: "兩燈並聯" },
];

const TASKS: { id: Mode; text: string; target: number }[] = [
  { id: "single", text: "一個燈泡：讓安培計讀數恰為 0.5 A", target: 0.5 },
  { id: "series", text: "兩燈串聯：讓安培計讀數恰為 0.5 A", target: 0.5 },
  { id: "parallel", text: "兩燈並聯：讓安培計讀數恰為 3 A", target: 3 },
];

function solve(V: number, R: number, mode: Mode) {
  if (mode === "series") {
    const I = V / (2 * R);
    return { total: I, bulbI: I, bulbV: V / 2, req: 2 * R };
  }
  if (mode === "parallel") {
    return { total: (2 * V) / R, bulbI: V / R, bulbV: V, req: R / 2 };
  }
  return { total: V / R, bulbI: V / R, bulbV: V, req: R };
}

function Bulb({ x, y, glow }: { x: number; y: number; glow: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14 + glow * 22} fill="#fde047" opacity={glow * 0.9} />
      <circle cx={x} cy={y} r="14" fill="#fff" stroke="#1e293b" strokeWidth="2" />
      <line x1={x - 10} y1={y - 10} x2={x + 10} y2={y + 10} stroke="#1e293b" strokeWidth="2" />
      <line x1={x + 10} y1={y - 10} x2={x - 10} y2={y + 10} stroke="#1e293b" strokeWidth="2" />
    </g>
  );
}

/** 歐姆定律：改變電壓、電阻與接法，觀察電流與燈泡亮度 */
export default function OhmLab({ onComplete }: LabProps) {
  const [V, setV] = useState(3);
  const [R, setR] = useState(10);
  const [mode, setMode] = useState<Mode>("single");
  const [done, setDone] = useState<Mode[]>([]);
  const s = solve(V, R, mode);
  const power = s.bulbV * s.bulbI;
  const glow = Math.min(1, Math.sqrt(power / 20));

  const update = (nv: number, nr: number, nm: Mode) => {
    setV(nv);
    setR(nr);
    setMode(nm);
    const task = TASKS.find((t) => t.id === nm);
    if (task && !done.includes(nm) && Math.abs(solve(nv, nr, nm).total - task.target) < 1e-9) {
      const next = [...done, nm];
      setDone(next);
      if (next.length === TASKS.length) onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <fieldset className="flex flex-wrap gap-2" aria-label="電路接法">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={mode === m.id ? "btn-primary" : "btn-ghost"}
            aria-pressed={mode === m.id}
            onClick={() => update(V, R, m.id)}
          >
            {m.label}
          </button>
        ))}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <ParamSlider
            label="電池電壓 V"
            min={1.5}
            max={12}
            step={1.5}
            unit="V"
            value={V}
            onChange={(v) => update(v, R, mode)}
            color="#d97706"
          />
          <ParamSlider
            label="每個燈泡的電阻 R"
            min={1}
            max={20}
            step={1}
            unit="Ω"
            value={R}
            onChange={(v) => update(V, v, mode)}
            color="#2563eb"
          />
          <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
            <p>等效電阻 = {fmt(s.req, 2)} Ω</p>
            <p>
              安培計讀數 I = V ÷ R = <strong>{fmt(s.total, 3)} A</strong>
            </p>
            <p>
              每個燈泡：{fmt(s.bulbV, 2)} V、{fmt(s.bulbI, 3)} A
            </p>
            <p>每個燈泡的電功率 P = {fmt(power, 2)} W</p>
          </div>
          <p className="text-xs text-slate-500">
            假設燈泡電阻固定不變（實際燈絲電阻會隨溫度升高）。
          </p>
        </div>
        <svg
          viewBox="0 0 440 260"
          className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
          role="img"
          aria-label={`${MODES.find((m) => m.id === mode)?.label}，電壓 ${V} 伏特，電流 ${fmt(s.total, 3)} 安培`}
        >
          <rect x="0" y="0" width="440" height="260" fill="#f8fafc" />
          <g fill="none" stroke="#475569" strokeWidth="2.5" strokeLinejoin="round">
            <polyline points="60,120 60,50 380,50 380,210 60,210 60,136" />
            {mode === "parallel" && <line x1="290" y1="50" x2="290" y2="210" />}
          </g>
          {mode === "parallel" && (
            <g fill="#475569">
              <circle cx="290" cy="50" r="4" />
              <circle cx="290" cy="210" r="4" />
            </g>
          )}
          {/* 電池 */}
          <line x1="40" y1="120" x2="80" y2="120" stroke="#1e293b" strokeWidth="3" />
          <line x1="50" y1="136" x2="70" y2="136" stroke="#1e293b" strokeWidth="6" />
          <text x="86" y="118" fontSize="13" fill="#1e293b">
            +
          </text>
          <text x="86" y="142" fontSize="13" fill="#1e293b">
            − {V} V
          </text>
          {/* 安培計 */}
          <circle cx="160" cy="50" r="16" fill="#fff" stroke="#1e293b" strokeWidth="2" />
          <text x="160" y="55" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1e293b">
            A
          </text>
          <text x="160" y="24" fontSize="13" textAnchor="middle" fill="#b45309" fontWeight="700">
            {fmt(s.total, 3)} A
          </text>
          {/* 燈泡 */}
          {mode === "single" && <Bulb x={380} y={130} glow={glow} />}
          {mode === "series" && (
            <>
              <Bulb x={380} y={95} glow={glow} />
              <Bulb x={380} y={165} glow={glow} />
            </>
          )}
          {mode === "parallel" && (
            <>
              <Bulb x={290} y={130} glow={glow} />
              <Bulb x={380} y={130} glow={glow} />
            </>
          )}
        </svg>
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
          🎉 完成！串聯時兩燈分壓、電流變小、燈泡變暗；並聯時每個燈泡都得到完整電壓，總電流是兩倍。
        </Feedback>
      )}
    </div>
  );
}
