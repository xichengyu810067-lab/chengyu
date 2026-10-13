import { useEffect, useRef, useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/** 理想氣體方程式 PV = nRT：調整體積、溫度、莫耳數，觀察壓力與粒子運動 */
const RG = 0.082; // atm·L/(mol·K)
const V0 = 24.6;
const T0 = 300;
const N0 = 1.0;
const P_TARGET = 2.0;
const BOX_X = 20;
const BOX_Y = 60;
const BOX_H = 150;
const PX_PER_L = 9;
const R = 4;

type Dot = { x: number; y: number; vx: number; vy: number };

const near = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;
const dotsFor = (n: number) => Math.round(n * 14);
const speedFor = (T: number) => 90 * Math.sqrt(T / T0);

function makeDot(width: number, T: number): Dot {
  const ang = Math.random() * 2 * Math.PI;
  const s = speedFor(T) * (0.6 + Math.random() * 0.8);
  return {
    x: R + Math.random() * (width - 2 * R),
    y: R + Math.random() * (BOX_H - 2 * R),
    vx: s * Math.cos(ang),
    vy: s * Math.sin(ang),
  };
}

const WAYS = [
  { id: "V", text: "只改變體積（波以耳定律）" },
  { id: "T", text: "只改變溫度（定容下 P 與 T 成正比）" },
  { id: "n", text: "只改變莫耳數（亞佛加厥定律）" },
];

export default function GasLab({ onComplete }: LabProps) {
  const [V, setV] = useState(V0);
  const [T, setT] = useState(T0);
  const [n, setN] = useState(N0);
  const [found, setFound] = useState<string[]>([]);
  const [hits, setHits] = useState(0);
  const [, setFrame] = useState(0);
  const dots = useRef<Dot[] | null>(null);
  const width = useRef(V0 * PX_PER_L);
  const wallHits = useRef(0);
  if (dots.current === null)
    dots.current = Array.from({ length: dotsFor(N0) }, () => makeDot(V0 * PX_PER_L, T0));

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const step = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const wpx = width.current;
      for (const d of dots.current ?? []) {
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        if (d.x < R) {
          d.x = R;
          d.vx = Math.abs(d.vx);
        } else if (d.x > wpx - R) {
          d.x = wpx - R;
          d.vx = -Math.abs(d.vx);
          wallHits.current++;
        }
        if (d.y < R) {
          d.y = R;
          d.vy = Math.abs(d.vy);
        } else if (d.y > BOX_H - R) {
          d.y = BOX_H - R;
          d.vy = -Math.abs(d.vy);
        }
      }
      acc += dt;
      if (acc >= 1) {
        setHits(Math.round(wallHits.current / acc));
        wallHits.current = 0;
        acc = 0;
      }
      setFrame((f) => (f + 1) % 1_000_000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const P = (n * RG * T) / V;

  const update = (nv: number, nt: number, nn: number) => {
    const ds = dots.current ?? [];
    // 溫度：調整速率；體積：移動活塞；莫耳數：增減粒子
    if (nt !== T) {
      const f = speedFor(nt) / speedFor(T);
      for (const d of ds) {
        d.vx *= f;
        d.vy *= f;
      }
    }
    width.current = nv * PX_PER_L;
    for (const d of ds) d.x = Math.min(d.x, width.current - R);
    const want = dotsFor(nn);
    if (want > ds.length) {
      for (let i = ds.length; i < want; i++) ds.push(makeDot(width.current, nt));
    } else ds.length = want;
    setV(nv);
    setT(nt);
    setN(nn);

    const np = (nn * RG * nt) / nv;
    if (!near(np, P_TARGET, 0.02)) return;
    let way: string | null = null;
    if (near(nn, N0) && near(nt, T0)) way = "V";
    else if (near(nn, N0) && near(nv, V0)) way = "T";
    else if (near(nt, T0) && near(nv, V0)) way = "n";
    if (way && !found.includes(way)) {
      const next = [...found, way];
      setFound(next);
      if (next.length === WAYS.length) onComplete();
    }
  };

  const wpx = V * PX_PER_L;
  const gaugeAng = Math.PI * (1 - Math.min(P, 4) / 4);
  const gx = 360;
  const gy = 40;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="space-y-3">
        <ParamSlider
          label="體積 V"
          min={6}
          max={40}
          step={0.1}
          unit="L"
          value={V}
          onChange={(v) => update(v, T, n)}
          color="#2563eb"
        />
        <ParamSlider
          label="溫度 T"
          min={150}
          max={600}
          step={10}
          unit="K"
          value={T}
          onChange={(v) => update(V, v, n)}
          color="#e11d48"
        />
        <ParamSlider
          label="莫耳數 n"
          min={0.5}
          max={2}
          step={0.1}
          unit="mol"
          value={n}
          onChange={(v) => update(V, T, v)}
          color="#059669"
        />
        <div className="rounded-xl bg-slate-100 p-3 font-mono text-sm dark:bg-slate-800">
          <p>
            P = nRT / V = {fmt(n, 1)} × 0.082 × {T} ÷ {fmt(V, 1)} = <strong>{fmt(P, 2)} atm</strong>
          </p>
          <p>PV = {fmt(P * V, 2)} atm·L</p>
          <p>每秒撞擊右側活塞：約 {hits} 次</p>
        </div>
        <p className="text-sm">
          🎯 任務：從初始狀態（1.0 mol、300 K、24.6 L，壓力 1.00 atm）出發，用
          <strong>三種不同的方法</strong>，每次只改一個變因，讓壓力變成 <strong>2.00 atm</strong>。
          （改完記得把其他變因調回初始值）
        </p>
        <ul className="space-y-1 text-sm">
          {WAYS.map((w) => (
            <li key={w.id}>
              {found.includes(w.id) ? "✅" : "⬜"} {w.text}
            </li>
          ))}
        </ul>
        {found.length === WAYS.length && (
          <Feedback ok>
            🎉 三種方法都找到了！體積減半、絕對溫度加倍、莫耳數加倍，壓力都會加倍。
          </Feedback>
        )}
      </div>
      <svg
        viewBox="0 0 420 230"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`氣體：體積 ${fmt(V, 1)} 公升、溫度 ${T} K、${fmt(n, 1)} 莫耳，壓力 ${fmt(P, 2)} 大氣壓`}
      >
        <rect x="0" y="0" width="420" height="230" fill="#f8fafc" />
        <rect
          x={BOX_X}
          y={BOX_Y}
          width={wpx}
          height={BOX_H}
          fill="#eff6ff"
          stroke="#334155"
          strokeWidth="3"
        />
        <g transform={`translate(${BOX_X} ${BOX_Y})`}>
          {(dots.current ?? []).map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={R} fill="#f97316" />
          ))}
        </g>
        {/* 活塞 */}
        <rect x={BOX_X + wpx} y={BOX_Y - 6} width="10" height={BOX_H + 12} fill="#64748b" />
        <rect
          x={BOX_X + wpx + 10}
          y={BOX_Y + BOX_H / 2 - 4}
          width={Math.max(0, 390 - wpx)}
          height="8"
          fill="#94a3b8"
        />
        {/* 壓力計 */}
        <path
          d={`M${gx - 34},${gy} A34,34 0 0 1 ${gx + 34},${gy}`}
          fill="#ffffff"
          stroke="#334155"
          strokeWidth="2"
        />
        <line
          x1={gx}
          y1={gy}
          x2={gx + 28 * Math.cos(gaugeAng)}
          y2={gy - 28 * Math.sin(gaugeAng)}
          stroke="#e11d48"
          strokeWidth="3"
        />
        <text x={gx} y={gy + 14} fontSize="11" textAnchor="middle" fill="#1e293b">
          {fmt(P, 2)} atm
        </text>
        <text x={BOX_X} y="40" fontSize="12" fill="#1e293b">
          T = {T} K
        </text>
        <text x={BOX_X} y="224" fontSize="11" fill="#475569">
          橘色粒子越快代表溫度越高；活塞往左推，體積變小
        </text>
      </svg>
    </div>
  );
}
