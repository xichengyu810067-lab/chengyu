import { useMemo, useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 潮汐示意模型：月球與太陽各造成兩個海水隆起，地球自轉讓觀察地點輪流經過隆起與凹陷。
 * 角度以太陽方向為 0°、逆時針為正（北極在上方的俯視圖）。
 */
const A_MOON = 1;
const A_SUN = 0.46;
const EARTH_DEG_PER_H = 15; // 相對於太陽，每小時自轉 15°
const MOON_DEG_PER_H = 360 / (29.53 * 24); // 月球每小時繞地球約 0.5°
const START = 180; // t = 0 時觀察者在背對太陽的一側（午夜）

const toRad = (d: number) => (d * Math.PI) / 180;
const observer = (t: number) => START + EARTH_DEG_PER_H * t;
const moonAt = (m0: number, t: number) => m0 + MOON_DEG_PER_H * t;
const tide = (m0: number, t: number) => {
  const o = observer(t);
  return A_MOON * Math.cos(2 * toRad(o - moonAt(m0, t))) + A_SUN * Math.cos(2 * toRad(o));
};

/** 48 小時內的最高與最低潮高 */
function extremes(m0: number) {
  let max = Number.NEGATIVE_INFINITY;
  let min = Number.POSITIVE_INFINITY;
  for (let s = 0; s <= 48; s += 0.25) {
    const h = tide(m0, s);
    max = Math.max(max, h);
    min = Math.min(min, h);
  }
  return { max, min };
}

function moonPhase(m0: number): string {
  const d = ((m0 % 360) + 360) % 360;
  if (d === 0) return "新月（朔）";
  if (d === 90) return "上弦月";
  if (d === 180) return "滿月（望）";
  if (d === 270) return "下弦月";
  return d < 90 ? "眉月" : d < 180 ? "盈凸月" : d < 270 ? "虧凸月" : "殘月";
}

function clock(t: number): string {
  const day = Math.floor(t / 24) + 1;
  const mins = Math.round((t % 24) * 60);
  return `第 ${day} 天 ${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

export default function TideLab({ onComplete }: LabProps) {
  const [m0, setM0] = useState(90);
  const [t, setT] = useState(3);
  const [found, setFound] = useState({ high: false, low: false, spring: false });
  const [done, setDone] = useState(false);

  const range = useMemo(() => extremes(m0), [m0]);

  const update = (nm: number, nt: number) => {
    setM0(nm);
    setT(nt);
    const { max, min } = extremes(nm);
    const h = tide(nm, nt);
    const next = {
      high: found.high || h >= max - 0.03 * (max - min),
      low: found.low || h <= min + 0.03 * (max - min),
      spring: found.spring || nm % 180 === 0,
    };
    setFound(next);
    if (!done && next.high && next.low && next.spring) {
      setDone(true);
      onComplete();
    }
  };

  const h = tide(m0, t);
  const o = toRad(observer(t));
  const m = toRad(moonAt(m0, t));
  const cx = 130;
  const cy = 115;
  const water = Array.from({ length: 73 }, (_, i) => {
    const psi = toRad(i * 5);
    const r = 52 + 9 * (A_MOON * Math.cos(2 * (psi - m)) + A_SUN * Math.cos(2 * psi));
    return `${(cx + r * Math.cos(psi)).toFixed(1)},${(cy - r * Math.sin(psi)).toFixed(1)}`;
  }).join(" ");
  const ox = cx + 40 * Math.cos(o);
  const oy = cy - 40 * Math.sin(o);
  const mx = cx + 100 * Math.cos(m);
  const my = cy - 100 * Math.sin(m);
  const kind = m0 % 180 === 0 ? "大潮" : m0 % 180 === 90 ? "小潮" : "介於大潮與小潮之間";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <svg
          viewBox="0 0 300 230"
          className="h-auto w-full rounded-xl border border-slate-200 bg-white dark:border-slate-700"
          role="img"
          aria-label={`潮汐俯視示意圖：${moonPhase(m0)}，${clock(t)}`}
        >
          <rect x="0" y="0" width="300" height="230" fill="#0f172a" />
          {[50, 115, 180].map((y) => (
            <g key={y} stroke="#fde047" fill="#fde047" strokeWidth="2">
              <line x1="296" y1={y} x2="262" y2={y} />
              <polygon points={`262,${y - 5} 262,${y + 5} 254,${y}`} />
            </g>
          ))}
          <text x="250" y="30" fontSize="11" fill="#fde047">
            陽光
          </text>
          <polygon points={water} fill="#60a5fa" opacity="0.8" />
          <circle cx={cx} cy={cy} r="40" fill="#65a30d" stroke="#365314" />
          <circle cx={ox} cy={oy} r="6" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x={ox + 8} y={oy - 6} fontSize="10" fill="#fecaca">
            臺灣
          </text>
          <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#94a3b8" strokeDasharray="3 3" />
          <circle cx={mx} cy={my} r="9" fill="#e2e8f0" />
          <text x={mx} y={my + 22} fontSize="10" fill="#e2e8f0" textAnchor="middle">
            月球
          </text>
          <text x="8" y="222" fontSize="10" fill="#cbd5e1">
            俯視圖：藍色為海水隆起（已誇大）
          </text>
        </svg>
        <Plot
          x={[0, 48]}
          y={[-1.6, 1.6]}
          height={230}
          xLabel="經過時間（小時）"
          yLabel="潮高（相對）"
          fns={[{ label: "觀察地點的潮高", color: "#2563eb", f: (s) => tide(m0, s) }]}
          points={[{ x: t, y: h, color: "#ef4444" }]}
          vlines={[{ x: t, color: "#ef4444" }]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ParamSlider
          label="經過時間（從第 1 天午夜起）"
          min={0}
          max={48}
          step={0.25}
          unit="小時"
          value={t}
          onChange={(v) => update(m0, v)}
          color="#2563eb"
        />
        <ParamSlider
          label="第 1 天午夜時月球的位置"
          min={0}
          max={345}
          step={15}
          unit="°"
          value={m0}
          onChange={(v) => update(v, t)}
          color="#64748b"
        />
      </div>
      <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
          <dt className="text-xs text-slate-500">時刻</dt>
          <dd className="font-mono font-semibold">{clock(t)}</dd>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
          <dt className="text-xs text-slate-500">月相</dt>
          <dd className="font-semibold">{moonPhase(m0)}</dd>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
          <dt className="text-xs text-slate-500">潮差（相對）</dt>
          <dd className="font-mono font-semibold">{fmt(range.max - range.min, 2)}</dd>
        </div>
        <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
          <dt className="text-xs text-slate-500">這幾天是</dt>
          <dd className="font-semibold">{kind}</dd>
        </div>
      </dl>
      <ul className="space-y-1 text-sm">
        <li>{found.high ? "✅" : "⬜"} 拉動時間，讓臺灣轉到海水隆起處（滿潮）</li>
        <li>{found.low ? "✅" : "⬜"} 拉動時間，讓臺灣轉到海水凹陷處（乾潮）</li>
        <li>{found.spring ? "✅" : "⬜"} 改變月球位置，調出潮差最大的「大潮」（新月或滿月）</li>
      </ul>
      {done && (
        <Feedback ok>
          🎉 完成！一天約有兩次滿潮、兩次乾潮；月球同時繞地球運行，所以滿潮每天約延後 50
          分鐘。日、月、地排成一直線時引潮力相加，形成大潮。
        </Feedback>
      )}
    </div>
  );
}
