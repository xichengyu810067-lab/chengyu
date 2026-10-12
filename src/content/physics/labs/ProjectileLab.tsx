import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

const G = 10; // 重力加速度（m/s²）
const TARGET = 40; // 靶的水平距離（m）
const TOL = 0.75; // 命中容許誤差（m）
const OX = 30; // 發射點 x（px）
const OY = 250; // 地面 y（px）
const S = 5; // 每公尺幾 px

interface Shot {
  v0: number;
  deg: number;
  range: number;
  hit: boolean;
}

function flight(v0: number, deg: number) {
  const r = (deg * Math.PI) / 180;
  const vx = v0 * Math.cos(r);
  const vy = v0 * Math.sin(r);
  const T = (2 * vy) / G;
  return { vx, vy, T, range: vx * T, H: (vy * vy) / (2 * G) };
}

function pathOf(v0: number, deg: number) {
  const { vx, vy, T } = flight(v0, deg);
  return Array.from({ length: 61 }, (_, i) => {
    const t = (T * i) / 60;
    const x = OX + vx * t * S;
    const y = OY - (vy * t - 0.5 * G * t * t) * S;
    return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join("");
}

/** 拋體運動：調整初速與仰角，命中 40 公尺外的靶 */
export default function ProjectileLab({ onComplete }: LabProps) {
  const [v0, setV0] = useState(15);
  const [deg, setDeg] = useState(30);
  const [shots, setShots] = useState<Shot[]>([]);
  const [done, setDone] = useState(false);
  const now = flight(v0, deg);
  const last = shots.length ? shots[shots.length - 1] : undefined;
  const hitAngles = shots.filter((s) => s.hit).map((s) => s.deg);

  const fire = () => {
    const f = flight(v0, deg);
    const hit = Math.abs(f.range - TARGET) <= TOL;
    const next = [...shots, { v0, deg, range: f.range, hit }].slice(-6);
    setShots(next);
    if (!done && hit && hitAngles.some((a) => Math.abs(a - deg) >= 20)) {
      setDone(true);
      onComplete();
    }
  };

  const rad = (deg * Math.PI) / 180;
  const L = v0 * 3;
  const tip = { x: OX + L * Math.cos(rad), y: OY - L * Math.sin(rad) };

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 440 280"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`初速 ${v0} 公尺每秒、仰角 ${deg} 度${last ? `，上一發射程 ${fmt(last.range, 1)} 公尺` : ""}`}
      >
        <rect x="0" y="0" width="440" height="280" fill="#f8fafc" />
        <rect x="0" y={OY} width="440" height={280 - OY} fill="#dcfce7" />
        <line x1="0" x2="440" y1={OY} y2={OY} stroke="#15803d" strokeWidth="2" />
        {Array.from({ length: 9 }, (_, i) => i * 10).map((m) => (
          <g key={m}>
            <line
              x1={OX + m * S}
              x2={OX + m * S}
              y1={OY}
              y2={OY + 6}
              stroke="#166534"
              strokeWidth="1.5"
            />
            <text x={OX + m * S} y={OY + 20} fontSize="10" textAnchor="middle" fill="#166534">
              {m} m
            </text>
          </g>
        ))}
        {/* 靶 */}
        <rect
          x={OX + (TARGET - TOL) * S}
          y={OY - 4}
          width={TOL * 2 * S}
          height="8"
          fill="#e11d48"
        />
        <line
          x1={OX + TARGET * S}
          x2={OX + TARGET * S}
          y1={OY}
          y2={OY - 34}
          stroke="#1e293b"
          strokeWidth="2"
        />
        <circle
          cx={OX + TARGET * S}
          cy={OY - 40}
          r="9"
          fill="#fff"
          stroke="#e11d48"
          strokeWidth="3"
        />
        <circle cx={OX + TARGET * S} cy={OY - 40} r="3" fill="#e11d48" />
        {/* 歷史軌跡 */}
        {shots.map((s, i) => (
          <path
            key={`${s.v0}-${s.deg}-${i}`}
            d={pathOf(s.v0, s.deg)}
            fill="none"
            stroke={s.hit ? "#059669" : "#94a3b8"}
            strokeWidth={i === shots.length - 1 ? 2.5 : 1.5}
            strokeDasharray={i === shots.length - 1 ? undefined : "4 4"}
          />
        ))}
        {last && (
          <circle
            cx={OX + last.range * S}
            cy={OY}
            r="5"
            fill={last.hit ? "#059669" : "#64748b"}
            stroke="#fff"
            strokeWidth="1.5"
          />
        )}
        {/* 初速度向量與分量 */}
        <line
          x1={OX}
          y1={OY}
          x2={tip.x}
          y2={OY}
          stroke="#2563eb"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <line
          x1={tip.x}
          y1={OY}
          x2={tip.x}
          y2={tip.y}
          stroke="#d97706"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <line x1={OX} y1={OY} x2={tip.x} y2={tip.y} stroke="#7c3aed" strokeWidth="3.5" />
        <circle cx={OX} cy={OY} r="6" fill="#1e293b" />
        <text x="12" y="22" fontSize="12" fill="#1e293b">
          g = 10 m/s²，忽略空氣阻力
        </text>
      </svg>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <ParamSlider
            label="初速 v₀"
            min={5}
            max={30}
            step={1}
            unit="m/s"
            value={v0}
            onChange={setV0}
            color="#7c3aed"
          />
          <ParamSlider
            label="仰角 θ"
            min={5}
            max={85}
            step={1}
            unit="°"
            value={deg}
            onChange={setDeg}
            color="#7c3aed"
          />
          <button type="button" className="btn-primary" onClick={fire}>
            🚀 發射
          </button>
        </div>
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p className="text-blue-700 dark:text-blue-300">水平分量 v₀cosθ = {fmt(now.vx, 2)} m/s</p>
          <p className="text-amber-700 dark:text-amber-300">
            鉛直分量 v₀sinθ = {fmt(now.vy, 2)} m/s
          </p>
          {last ? (
            <>
              <p className="mt-2">
                上一發：v₀ = {last.v0} m/s、θ = {last.deg}°
              </p>
              <p>
                射程 = <strong>{fmt(last.range, 2)} m</strong> {last.hit ? "🎯 命中！" : ""}
              </p>
              <p>
                飛行時間 = {fmt(flight(last.v0, last.deg).T, 2)} s，最大高度 ={" "}
                {fmt(flight(last.v0, last.deg).H, 2)} m
              </p>
            </>
          ) : (
            <p className="mt-2 font-sans text-slate-500">先算算看，再按「發射」。</p>
          )}
        </div>
      </div>
      <p className="text-sm">
        🎯 任務：用<strong>兩個相差至少 20°</strong>的仰角，都命中 {TARGET} m 外的靶（誤差 ±{TOL} m
        以內）。
      </p>
      <p className="text-sm text-slate-500">
        命中過的仰角：{hitAngles.length ? hitAngles.map((a) => `${a}°`).join("、") : "尚無"}
      </p>
      {done && (
        <Feedback ok>
          🎉 太厲害了！射程 R = v₀² sin2θ ÷ g，互為餘角（θ 與 90° − θ）的兩個仰角射程相同。
        </Feedback>
      )}
    </div>
  );
}
