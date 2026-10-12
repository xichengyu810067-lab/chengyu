import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

const V = 100; // 物體體積（cm³）
const SURFACE = 110; // 液面 y
const BOTTOM = 250; // 杯底 y
const SIDE = 70; // 方塊邊長（px）

type TaskId = "half" | "suspend" | "sink100";
const TASKS: { id: TaskId; text: string }[] = [
  { id: "half", text: "讓物體浮在液面上，而且恰好一半體積沒入液體" },
  { id: "suspend", text: "讓物體懸浮在液體中（不浮起也不沉底）" },
  { id: "sink100", text: "讓物體沉底，且在液體中的視重恰為 100 gw" },
];

const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;

function analyze(rhoO: number, rhoL: number) {
  const weight = rhoO * V;
  if (near(rhoO, rhoL)) {
    return { state: "懸浮", frac: 1, weight, buoy: weight, apparent: 0 };
  }
  if (rhoO < rhoL) {
    return { state: "漂浮", frac: rhoO / rhoL, weight, buoy: weight, apparent: 0 };
  }
  const buoy = rhoL * V;
  return { state: "沉底", frac: 1, weight, buoy, apparent: weight - buoy };
}

function check(rhoO: number, rhoL: number): TaskId[] {
  const out: TaskId[] = [];
  const a = analyze(rhoO, rhoL);
  if (a.state === "漂浮" && near(a.frac, 0.5)) out.push("half");
  if (a.state === "懸浮") out.push("suspend");
  if (a.state === "沉底" && near(a.apparent, 100)) out.push("sink100");
  return out;
}

/** 浮力實驗：比較物體密度與液體密度，觀察浮沉與浮力大小 */
export default function BuoyancyLab({ onComplete }: LabProps) {
  const [rhoO, setRhoO] = useState(0.6);
  const [rhoL, setRhoL] = useState(1);
  const [done, setDone] = useState<TaskId[]>([]);
  const a = analyze(rhoO, rhoL);

  const update = (o: number, l: number) => {
    setRhoO(o);
    setRhoL(l);
    const hit = check(o, l).filter((t) => !done.includes(t));
    if (hit.length) {
      const next = [...done, ...hit];
      setDone(next);
      if (next.length === TASKS.length) onComplete();
    }
  };

  const top =
    a.state === "漂浮"
      ? SURFACE + a.frac * SIDE - SIDE
      : a.state === "懸浮"
        ? (SURFACE + BOTTOM - SIDE) / 2
        : BOTTOM - SIDE;
  const cx = 140; // 方塊中心 x
  const cy = top + SIDE / 2;
  const k = 0.6; // 長條圖：每 gw 幾 px
  const bars = [
    { x: 300, label: "重量 W", value: a.weight, color: "#e11d48" },
    { x: 370, label: "浮力 B", value: a.buoy, color: "#2563eb" },
  ];
  const liquidAlpha = 0.25 + (rhoL - 0.8) * 0.8;
  const blockShade = Math.round(210 - ((Math.min(rhoO, 3) - 0.2) / 2.8) * 120);

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-3">
        <ParamSlider
          label="物體密度"
          min={0.2}
          max={3}
          step={0.1}
          unit="g/cm³"
          value={rhoO}
          onChange={(v) => update(v, rhoL)}
          color="#b45309"
        />
        <ParamSlider
          label="液體密度"
          min={0.8}
          max={1.3}
          step={0.1}
          unit="g/cm³"
          value={rhoL}
          onChange={(v) => update(rhoO, v)}
          color="#0284c7"
        />
        <p className="text-xs text-slate-500">
          參考：酒精約 0.8、水 1.0、濃鹽水約 1.2 g/cm³；物體體積固定為 {V} cm³。
        </p>
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p>重量 W = {fmt(a.weight, 1)} gw</p>
          <p>浮力 B = {fmt(a.buoy, 1)} gw</p>
          <p>沒入體積 = {fmt(a.frac * V, 1)} cm³</p>
          <p>液體中的視重 = {fmt(a.apparent, 1)} gw</p>
          <p className="mt-1 font-sans font-semibold">狀態：{a.state}</p>
        </div>
        <ul className="space-y-0.5 text-sm">
          {TASKS.map((t) => (
            <li key={t.id}>
              {done.includes(t.id) ? "✅" : "⬜"} {t.text}
            </li>
          ))}
        </ul>
        {done.length === TASKS.length && (
          <Feedback ok>🎉 完成！漂浮與懸浮時浮力 = 重量；沉底時浮力 = 排開液體的重量。</Feedback>
        )}
      </div>
      <svg
        viewBox="0 0 440 280"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`物體密度 ${rhoO}、液體密度 ${rhoL}，物體${a.state}`}
      >
        <rect x="0" y="0" width="440" height="280" fill="#f8fafc" />
        {/* 燒杯與液體 */}
        <rect
          x="42"
          y={SURFACE}
          width="196"
          height={BOTTOM - SURFACE}
          fill="#38bdf8"
          opacity={liquidAlpha}
        />
        <polyline
          points={`40,50 40,${BOTTOM + 2} 240,${BOTTOM + 2} 240,50`}
          fill="none"
          stroke="#475569"
          strokeWidth="3"
        />
        <text x="246" y={SURFACE + 4} fontSize="11" fill="#0369a1">
          液面
        </text>
        <rect
          x={cx - SIDE / 2}
          y={top}
          width={SIDE}
          height={SIDE}
          rx="4"
          fill={`rgb(${blockShade}, ${blockShade - 30}, ${blockShade - 60})`}
          stroke="#78350f"
          strokeWidth="2"
        />
        {/* 受力方向示意：重力向下、浮力向上 */}
        <line x1={cx - 12} y1={cy} x2={cx - 12} y2={cy + 22} stroke="#e11d48" strokeWidth="4" />
        <polygon
          points={`${cx - 12},${cy + 32} ${cx - 19},${cy + 22} ${cx - 5},${cy + 22}`}
          fill="#e11d48"
        />
        <line x1={cx + 12} y1={cy} x2={cx + 12} y2={cy - 22} stroke="#2563eb" strokeWidth="4" />
        <polygon
          points={`${cx + 12},${cy - 32} ${cx + 5},${cy - 22} ${cx + 19},${cy - 22}`}
          fill="#2563eb"
        />
        {/* 長條圖：力的大小 */}
        <text x="365" y="34" fontSize="12" textAnchor="middle" fill="#1e293b">
          力的大小（gw）
        </text>
        <line x1="280" y1={BOTTOM} x2="430" y2={BOTTOM} stroke="#64748b" strokeWidth="1.5" />
        {bars.map((b) => (
          <g key={b.label}>
            <rect
              x={b.x - 20}
              y={BOTTOM - b.value * k}
              width="40"
              height={b.value * k}
              rx="3"
              fill={b.color}
              opacity="0.85"
            />
            <text
              x={b.x}
              y={BOTTOM - b.value * k - 6}
              fontSize="12"
              textAnchor="middle"
              fill={b.color}
              fontWeight="700"
            >
              {fmt(b.value, 0)}
            </text>
            <text x={b.x} y={BOTTOM + 18} fontSize="12" textAnchor="middle" fill="#1e293b">
              {b.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
