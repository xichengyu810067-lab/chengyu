import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

const TARGETS = [30, 150];

/** 單位圓與正弦波：角度 θ 對應點 (cos θ, sin θ) */
export default function UnitCircleLab({ onComplete }: LabProps) {
  const [deg, setDeg] = useState(60);
  const [found, setFound] = useState<number[]>([]);
  const r = (deg * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  const R = 90;
  const cx = 110;
  const cy = 130;
  const px = cx + R * cos;
  const py = cy - R * sin;
  const gx = (d: number) => 240 + (d / 360) * 176;
  const gy = (v: number) => cy - v * R;
  const wave = Array.from({ length: 73 }, (_, i) => {
    const d = i * 5;
    return `${i ? "L" : "M"}${gx(d).toFixed(1)},${gy(Math.sin((d * Math.PI) / 180)).toFixed(1)}`;
  }).join("");

  const change = (v: number) => {
    setDeg(v);
    if (TARGETS.includes(v) && !found.includes(v)) {
      const next = [...found, v];
      setFound(next);
      if (next.length === TARGETS.length) onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 440 260"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`θ = ${deg} 度，sin θ = ${fmt(sin, 3)}，cos θ = ${fmt(cos, 3)}`}
      >
        <line x1={cx - R - 15} x2={cx + R + 15} y1={cy} y2={cy} stroke="#94a3b8" />
        <line x1={cx} x2={cx} y1={cy - R - 15} y2={cy + R + 15} stroke="#94a3b8" />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#64748b" strokeWidth="1.5" />
        <path
          d={`M${cx + 22},${cy} A22,22 0 ${deg > 180 ? 1 : 0},0 ${cx + 22 * cos},${cy - 22 * sin}`}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#1e293b" strokeWidth="2" />
        <line x1={px} y1={py} x2={px} y2={cy} stroke="#e11d48" strokeWidth="3" />
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#2563eb" strokeWidth="3" />
        <circle cx={px} cy={py} r="6" fill="#7c3aed" />
        <text x={px + 8} y={py - 8} fontSize="11" className="fill-slate-700 dark:fill-slate-200">
          P(cos θ, sin θ)
        </text>
        <line x1={gx(0)} x2={gx(360)} y1={cy} y2={cy} stroke="#94a3b8" />
        {[90, 180, 270, 360].map((d) => (
          <text
            key={d}
            x={gx(d)}
            y={cy + 16}
            fontSize="10"
            textAnchor="middle"
            className="fill-slate-500"
          >
            {d}°
          </text>
        ))}
        <path d={wave} fill="none" stroke="#e11d48" strokeWidth="2" opacity="0.7" />
        <line x1={px} y1={py} x2={gx(deg)} y2={gy(sin)} stroke="#e11d48" strokeDasharray="3 3" />
        <circle cx={gx(deg)} cy={gy(sin)} r="5" fill="#e11d48" />
        <text x={gx(0)} y="18" fontSize="11" className="fill-slate-600 dark:fill-slate-300">
          y = sin θ
        </text>
      </svg>
      <div className="grid gap-4 sm:grid-cols-2">
        <ParamSlider
          label="角度 θ"
          min={0}
          max={360}
          step={5}
          unit="°"
          value={deg}
          onChange={change}
          color="#7c3aed"
        />
        <dl className="grid grid-cols-3 gap-2 text-center font-mono text-sm">
          <div className="rounded-lg bg-rose-50 p-2 dark:bg-rose-950/40">
            <dt className="text-xs">sin θ</dt>
            <dd>{fmt(sin, 3)}</dd>
          </div>
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/40">
            <dt className="text-xs">cos θ</dt>
            <dd>{fmt(cos, 3)}</dd>
          </div>
          <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
            <dt className="text-xs">tan θ</dt>
            <dd>{Math.abs(cos) < 1e-9 ? "不存在" : fmt(sin / cos, 3)}</dd>
          </div>
        </dl>
      </div>
      <p className="text-sm">
        🎯 任務：在 0°～360° 之間，找出所有使 sin θ = 0.5 的角度（已找到 {found.length}/2：
        {found.join("°、") || "—"}
        {found.length ? "°" : ""}）
      </p>
      {found.length === 2 && (
        <Feedback ok>🎉 正確！sin 30° = sin 150° = 0.5，因為兩點對 y 軸對稱。</Feedback>
      )}
    </div>
  );
}
