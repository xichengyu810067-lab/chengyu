import { useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

const W1 = 60; // 左側砝碼（gw）
const D1 = 20; // 左側力臂（cm）
const PX = 220; // 支點 x
const PY = 130; // 支點 y
const S = 3.6; // 每公分幾 px

/** 槓桿原理：調整右側砝碼與力臂，讓槓桿水平平衡 */
export default function LeverLab({ onComplete }: LabProps) {
  const [w2, setW2] = useState(50);
  const [d2, setD2] = useState(10);
  const [found, setFound] = useState<string[]>([]);
  const tauL = W1 * D1;
  const tauR = w2 * d2;
  const net = tauR - tauL;
  const angle = Math.max(-12, Math.min(12, net / 150));
  const rad = (angle * Math.PI) / 180;
  const at = (d: number) => ({ x: PX + d * S * Math.cos(rad), y: PY + d * S * Math.sin(rad) });

  const update = (nw: number, nd: number) => {
    setW2(nw);
    setD2(nd);
    if (nw * nd === tauL) {
      const key = `${nw} gw × ${nd} cm`;
      if (!found.includes(key)) {
        const next = [...found, key];
        setFound(next);
        if (next.length === 2) onComplete();
      }
    }
  };

  const weight = (d: number, w: number, color: string) => {
    const p = at(d);
    const size = 16 + w / 5;
    return (
      <g>
        <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 40} stroke="#475569" strokeWidth="1.5" />
        <rect
          x={p.x - size / 2}
          y={p.y + 40}
          width={size}
          height={size}
          rx="3"
          fill={color}
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        <text x={p.x} y={p.y + 40 + size + 14} fontSize="12" textAnchor="middle" fill="#1e293b">
          {w} gw
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 440 260"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`槓桿：左側 ${W1} gw 在 ${D1} cm，右側 ${w2} gw 在 ${d2} cm，${net === 0 ? "平衡" : net > 0 ? "右側下沉" : "左側下沉"}`}
      >
        <rect x="0" y="0" width="440" height="260" fill="#f8fafc" />
        <g transform={`rotate(${angle} ${PX} ${PY})`}>
          <rect
            x={PX - 50 * S}
            y={PY - 5}
            width={100 * S}
            height="10"
            rx="3"
            fill="#d6d3d1"
            stroke="#57534e"
            strokeWidth="1.5"
          />
          {Array.from({ length: 11 }, (_, i) => (i - 5) * 10).map((d) => (
            <g key={d}>
              <line
                x1={PX + d * S}
                x2={PX + d * S}
                y1={PY - 5}
                y2={PY + 5}
                stroke="#57534e"
                strokeWidth="1"
              />
              <text x={PX + d * S} y={PY - 9} fontSize="9" textAnchor="middle" fill="#57534e">
                {Math.abs(d)}
              </text>
            </g>
          ))}
        </g>
        <polygon
          points={`${PX},${PY + 5} ${PX - 16},${PY + 40} ${PX + 16},${PY + 40}`}
          fill="#64748b"
        />
        <text x={PX} y={PY + 56} fontSize="11" textAnchor="middle" fill="#475569">
          支點
        </text>
        {weight(-D1, W1, "#93c5fd")}
        {weight(d2, w2, "#fca5a5")}
        <text x="12" y="22" fontSize="12" fill="#1e293b">
          刻度單位：公分（cm）
        </text>
      </svg>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <ParamSlider
            label="右側砝碼重"
            min={10}
            max={100}
            step={10}
            unit="gw"
            value={w2}
            onChange={(v) => update(v, d2)}
            color="#e11d48"
          />
          <ParamSlider
            label="右側力臂"
            min={5}
            max={50}
            step={5}
            unit="cm"
            value={d2}
            onChange={(v) => update(w2, v)}
            color="#e11d48"
          />
        </div>
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p>
            左側力矩 = {W1} × {D1} = <strong>{tauL}</strong> gw·cm（逆時針）
          </p>
          <p>
            右側力矩 = {w2} × {d2} = <strong>{tauR}</strong> gw·cm（順時針）
          </p>
          <p className="mt-1 font-sans font-semibold">
            {net === 0 ? "⚖️ 平衡！" : net > 0 ? "右側下沉" : "左側下沉"}
          </p>
        </div>
      </div>
      <p className="text-sm">
        🎯 任務：找出 <strong>2 種</strong>不同的右側砝碼與力臂組合，讓槓桿保持水平平衡。
      </p>
      <p className="text-sm text-slate-500">已找到：{found.length ? found.join("、") : "尚無"}</p>
      {found.length >= 2 && (
        <Feedback ok>🎉 槓桿平衡時：順時針力矩 = 逆時針力矩，也就是 W₁ × d₁ = W₂ × d₂。</Feedback>
      )}
    </div>
  );
}
