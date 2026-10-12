import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/** 平面向量：加法（平行四邊形法）、內積與夾角 */
export default function VectorLab({ onComplete }: LabProps) {
  const [u, setU] = useState<[number, number]>([3, 1]);
  const [v, setV] = useState<[number, number]>([1, 2]);
  const [done, setDone] = useState(false);
  const dot = u[0] * v[0] + u[1] * v[1];
  const lu = Math.hypot(...u);
  const lv = Math.hypot(...v);
  const angle =
    lu && lv ? (Math.acos(Math.max(-1, Math.min(1, dot / (lu * lv)))) * 180) / Math.PI : Number.NaN;
  const sum: [number, number] = [u[0] + v[0], u[1] + v[1]];
  const S = 20;
  const O = { x: 220, y: 160 };
  const P = (p: [number, number]) => ({ x: O.x + p[0] * S, y: O.y - p[1] * S });

  const set = (which: "u" | "v", i: 0 | 1, val: number) => {
    const nu: [number, number] = which === "u" ? (i === 0 ? [val, u[1]] : [u[0], val]) : u;
    const nv: [number, number] = which === "v" ? (i === 0 ? [val, v[1]] : [v[0], val]) : v;
    setU(nu);
    setV(nv);
    const d = nu[0] * nv[0] + nu[1] * nv[1];
    if (!done && d === 0 && Math.hypot(...nu) > 0 && Math.hypot(...nv) > 0) {
      setDone(true);
      onComplete();
    }
  };

  const arrow = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    color: string,
    label: string,
    dashed = false,
  ) => {
    const ang = Math.atan2(to.y - from.y, to.x - from.x);
    const h = 10;
    return (
      <g>
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={color}
          strokeWidth="3"
          strokeDasharray={dashed ? "5 4" : undefined}
        />
        <polygon
          points={`${to.x},${to.y} ${to.x - h * Math.cos(ang - 0.4)},${to.y - h * Math.sin(ang - 0.4)} ${to.x - h * Math.cos(ang + 0.4)},${to.y - h * Math.sin(ang + 0.4)}`}
          fill={color}
        />
        <text x={to.x + 6} y={to.y - 6} fontSize="13" fontWeight="700" fill={color}>
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="space-y-3">
        <ParamSlider
          label="u 的 x 分量"
          min={-5}
          max={5}
          step={1}
          value={u[0]}
          onChange={(x) => set("u", 0, x)}
          color="#2563eb"
        />
        <ParamSlider
          label="u 的 y 分量"
          min={-5}
          max={5}
          step={1}
          value={u[1]}
          onChange={(x) => set("u", 1, x)}
          color="#2563eb"
        />
        <ParamSlider
          label="v 的 x 分量"
          min={-5}
          max={5}
          step={1}
          value={v[0]}
          onChange={(x) => set("v", 0, x)}
          color="#e11d48"
        />
        <ParamSlider
          label="v 的 y 分量"
          min={-5}
          max={5}
          step={1}
          value={v[1]}
          onChange={(x) => set("v", 1, x)}
          color="#e11d48"
        />
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p>
            u + v = ({sum[0]}, {sum[1]})
          </p>
          <p>
            u · v = {u[0]}×{v[0]} + {u[1]}×{v[1]} = <strong>{dot}</strong>
          </p>
          <p>夾角 θ ≈ {Number.isNaN(angle) ? "—" : `${fmt(angle, 1)}°`}</p>
        </div>
        <p className="text-sm">
          🎯 任務：調整向量，讓 u 與 v <strong>互相垂直</strong>（兩者都不是零向量）。
        </p>
        {done && <Feedback ok>🎉 垂直時內積為 0！因為 u·v = |u||v|cos 90° = 0。</Feedback>}
      </div>
      <svg
        viewBox="0 0 440 320"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`向量 u=(${u.join(",")})，v=(${v.join(",")})，內積 ${dot}`}
      >
        {Array.from({ length: 23 }, (_, i) => (
          <line
            key={`x${i}`}
            x1={O.x + (i - 11) * S}
            x2={O.x + (i - 11) * S}
            y1="0"
            y2="320"
            stroke="#e2e8f0"
            className="dark:stroke-slate-800"
          />
        ))}
        {Array.from({ length: 17 }, (_, i) => (
          <line
            key={`y${i}`}
            y1={O.y + (i - 8) * S}
            y2={O.y + (i - 8) * S}
            x1="0"
            x2="440"
            stroke="#e2e8f0"
            className="dark:stroke-slate-800"
          />
        ))}
        <line x1="0" x2="440" y1={O.y} y2={O.y} stroke="#94a3b8" />
        <line y1="0" y2="320" x1={O.x} x2={O.x} stroke="#94a3b8" />
        <polygon
          points={[O, P(u), P(sum), P(v)].map((p) => `${p.x},${p.y}`).join(" ")}
          fill="#a78bfa"
          opacity="0.15"
        />
        {arrow(P(u), P(sum), "#e11d48", "", true)}
        {arrow(P(v), P(sum), "#2563eb", "", true)}
        {arrow(O, P(sum), "#7c3aed", "u+v")}
        {arrow(O, P(u), "#2563eb", "u")}
        {arrow(O, P(v), "#e11d48", "v")}
      </svg>
    </div>
  );
}
