import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 三站定震央：由 S−P 到時差換算距離，以三個圓的交點找出震央。
 * 假設 P 波 6 km/s、S 波 3.5 km/s，距離 = 時間差 × 8.4 km/s。地圖 1 公里 = 1.5 像素。
 */
const VP = 6;
const VS = 3.5;
const K = (VP * VS) / (VP - VS); // 8.4
const SCALE = 1.5;
const TOL = 3;
const EPICENTER = { x: 130, y: 85 };

const STATIONS = [
  { id: "A", x: 76, y: 45, sp: 8, color: "#2563eb" },
  { id: "B", x: 223, y: 45, sp: 12, color: "#d97706" },
  { id: "C", x: 106, y: 166, sp: 10, color: "#7c3aed" },
] as const;

type Radii = Record<"A" | "B" | "C", number>;

export default function EpicenterLab({ onComplete }: LabProps) {
  const [r, setR] = useState<Radii>({ A: 40, B: 40, C: 40 });
  const [checked, setChecked] = useState<Record<string, boolean> | null>(null);
  const [done, setDone] = useState(false);

  const set = (id: keyof Radii, v: number) => {
    setR({ ...r, [id]: v });
    setChecked(null);
  };

  const check = () => {
    const res = Object.fromEntries(
      STATIONS.map((s) => [s.id, Math.abs(r[s.id] - s.sp * K) <= TOL]),
    );
    setChecked(res);
    if (!done && STATIONS.every((s) => res[s.id])) {
      setDone(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <svg
          viewBox="0 0 400 300"
          className="h-auto w-full rounded-xl border border-slate-200 bg-white dark:border-slate-700"
          role="img"
          aria-label="三個地震測站與距離圓的示意地圖"
        >
          <rect x="0" y="0" width="400" height="300" fill="#f0fdf4" />
          {[50, 100, 150, 200, 250].map((k) => (
            <line key={`v${k}`} x1={k * SCALE} x2={k * SCALE} y1="0" y2="300" stroke="#d1fae5" />
          ))}
          {[50, 100, 150].map((k) => (
            <line key={`h${k}`} y1={k * SCALE} y2={k * SCALE} x1="0" x2="400" stroke="#d1fae5" />
          ))}
          {STATIONS.map((s) => (
            <circle
              key={`c${s.id}`}
              cx={s.x * SCALE}
              cy={s.y * SCALE}
              r={r[s.id] * SCALE}
              fill={s.color}
              fillOpacity="0.06"
              stroke={s.color}
              strokeWidth="2"
              strokeDasharray={checked?.[s.id] ? undefined : "6 4"}
            />
          ))}
          {STATIONS.map((s) => (
            <g key={`s${s.id}`} transform={`translate(${s.x * SCALE} ${s.y * SCALE})`}>
              <polygon points="0,-9 8,6 -8,6" fill={s.color} stroke="#fff" strokeWidth="1.5" />
              <text x="10" y="-6" fontSize="13" fontWeight="700" fill="#1e293b">
                {s.id} 站
              </text>
            </g>
          ))}
          {done && (
            <g transform={`translate(${EPICENTER.x * SCALE} ${EPICENTER.y * SCALE})`}>
              <polygon
                points="0,-12 3.5,-4 12,-4 5,2 8,11 0,6 -8,11 -5,2 -12,-4 -3.5,-4"
                fill="#dc2626"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <text x="14" y="5" fontSize="13" fontWeight="700" fill="#b91c1c">
                震央
              </text>
            </g>
          )}
          <g transform="translate(16 284)">
            <line x1="0" x2={50 * SCALE} y1="0" y2="0" stroke="#334155" strokeWidth="2" />
            <text x={50 * SCALE + 6} y="4" fontSize="10" fill="#334155">
              50 公里
            </text>
          </g>
          <text x="392" y="292" fontSize="10" textAnchor="end" fill="#64748b">
            示意圖
          </text>
        </svg>
        <div className="space-y-3 text-sm">
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
            <p>
              P 波 {VP} km/s、S 波 {VS} km/s，所以
              <br />
              <strong>距離 ＝ S−P 時間差 × {fmt(K, 1)} 公里</strong>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {fmt(K, 1)} 是依假設波速算出的近似值；實際波速隨岩層而變，課本也常取約 8 公里。
            </p>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="py-1">測站</th>
                <th>S−P 時間差</th>
                <th>判讀</th>
              </tr>
            </thead>
            <tbody>
              {STATIONS.map((s) => (
                <tr key={s.id}>
                  <td className="py-1 font-semibold" style={{ color: s.color }}>
                    {s.id} 站
                  </td>
                  <td className="font-mono">{fmt(s.sp, 1)} 秒</td>
                  <td>{checked ? (checked[s.id] ? "✅ 正確" : "❌ 再算算") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {STATIONS.map((s) => (
            <ParamSlider
              key={s.id}
              label={`${s.id} 站的距離圓半徑`}
              min={0}
              max={150}
              step={1}
              unit="公里"
              value={r[s.id]}
              onChange={(v) => set(s.id, v)}
              color={s.color}
            />
          ))}
          <button type="button" className="btn-primary" onClick={check}>
            檢查半徑
          </button>
        </div>
      </div>
      <p className="text-sm">
        🎯 任務：算出每個測站到震源的距離，把三個圓的半徑調對（誤差 {TOL} 公里內），找出震央。
      </p>
      {checked && !done && (
        <Feedback ok={false}>
          還有測站的半徑不對。提示：A 站時間差 8 秒，距離約 8 × 8.4 ≈ 67 公里。
        </Feedback>
      )}
      {done && (
        <Feedback ok>
          🎉
          三個圓交於一點，那裡就是震央！一個測站只能知道「距離多遠」，至少要三個測站才能定出位置。
        </Feedback>
      )}
    </div>
  );
}
