import { useEffect, useRef, useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 碰撞學說：A + B → C。
 * 粒子在盒中運動，A 與 B 相撞時，能量夠大（越過活化能）才會反應。
 * 溫度影響粒子速率與有效碰撞比例、濃度影響碰撞頻率、催化劑降低活化能。
 */
const W = 360;
const H = 240;
const R = 6;
const EA = 50_000; // 活化能（J/mol），使室溫附近每升高 10 °C 速率約變為 2 倍
const RGAS = 8.314;
const T0 = 298.15;
const CAT = 5; // 催化劑使有效碰撞比例變為約 5 倍
const T_MAX = 45;
const TARGET = 10;

type Kind = "A" | "B" | "C" | "X";
type Particle = { x: number; y: number; vx: number; vy: number; kind: Kind; flash: number };
type Stats = {
  products: number;
  collisions: number;
  time: number;
  history: number[];
  total: number;
};
type Cfg = { tC: number; cat: boolean };

const kRel = (tC: number) => Math.exp((EA / RGAS) * (1 / T0 - 1 / (tC + 273.15)));
const relRate = (tC: number, c: number, cat: boolean) => c * c * kRel(tC) * (cat ? CAT : 1);
const speed = (tC: number) => 70 * Math.sqrt((tC + 273.15) / T0);

function makeParticles(c: number, tC: number): Particle[] {
  const out: Particle[] = [];
  const v = speed(tC);
  for (const kind of ["A", "B"] as const) {
    for (let i = 0; i < 6 * c; i++) {
      const ang = Math.random() * 2 * Math.PI;
      const s = v * (0.6 + Math.random() * 0.8);
      out.push({
        x: R + Math.random() * (W - 2 * R),
        y: R + Math.random() * (H - 2 * R),
        vx: s * Math.cos(ang),
        vy: s * Math.sin(ang),
        kind,
        flash: 0,
      });
    }
  }
  return out;
}

function freshStats(c: number): Stats {
  return { products: 0, collisions: 0, time: 0, history: [0], total: 6 * c };
}

/** 前進 dt 秒：移動、碰牆反彈、A–B 碰撞判定 */
function advance(ps: Particle[], st: Stats, cfg: Cfg, dt: number): Particle[] {
  for (const p of ps) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.x < R) {
      p.x = R;
      p.vx = Math.abs(p.vx);
    } else if (p.x > W - R) {
      p.x = W - R;
      p.vx = -Math.abs(p.vx);
    }
    if (p.y < R) {
      p.y = R;
      p.vy = Math.abs(p.vy);
    } else if (p.y > H - R) {
      p.y = H - R;
      p.vy = -Math.abs(p.vy);
    }
    if (p.flash > 0) p.flash = Math.max(0, p.flash - dt);
  }
  const pEff = Math.min(1, 0.1 * kRel(cfg.tC) * (cfg.cat ? CAT : 1));
  for (let i = 0; i < ps.length; i++) {
    const a = ps[i];
    if (a.kind !== "A" && a.kind !== "B") continue;
    for (let j = i + 1; j < ps.length; j++) {
      const b = ps[j];
      if (a.kind === "C") break;
      if (b.kind === "X") continue;
      const pair = (a.kind === "A" && b.kind === "B") || (a.kind === "B" && b.kind === "A");
      if (!pair) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > 4 * R * R || d2 === 0) continue;
      const approach = (a.vx - b.vx) * dx + (a.vy - b.vy) * dy;
      if (approach <= 0) continue;
      st.collisions++;
      if (Math.random() < pEff) {
        a.kind = "C";
        a.x = (a.x + b.x) / 2;
        a.y = (a.y + b.y) / 2;
        a.vx = (a.vx + b.vx) / 2;
        a.vy = (a.vy + b.vy) / 2;
        a.flash = 0.7;
        b.kind = "X";
        st.products++;
      } else {
        const d = Math.sqrt(d2);
        const nx = dx / d;
        const ny = dy / d;
        const va = a.vx * nx + a.vy * ny;
        const vb = b.vx * nx + b.vy * ny;
        a.vx += (vb - va) * nx;
        a.vy += (vb - va) * ny;
        b.vx += (va - vb) * nx;
        b.vy += (va - vb) * ny;
      }
    }
  }
  const before = Math.floor(st.time * 2);
  st.time += dt;
  if (Math.floor(st.time * 2) > before) {
    st.history.push(st.products);
    if (st.history.length > 61) st.history.shift();
  }
  return ps.filter((p) => p.kind !== "X");
}

export default function RateLab({ onComplete }: LabProps) {
  const [tC, setTC] = useState(25);
  const [c, setC] = useState(1);
  const [cat, setCat] = useState(false);
  const [reached, setReached] = useState(false);
  const [, setFrame] = useState(0);
  const parts = useRef<Particle[] | null>(null);
  const stats = useRef<Stats>(freshStats(1));
  const cfg = useRef<Cfg>({ tC: 25, cat: false });
  if (parts.current === null) parts.current = makeParticles(1, 25);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      parts.current = advance(parts.current ?? [], stats.current, cfg.current, dt);
      setFrame((f) => (f + 1) % 1_000_000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const check = (t: number, cc: number, k: boolean) => {
    if (!reached && t <= T_MAX && relRate(t, cc, k) >= TARGET) {
      setReached(true);
      onComplete();
    }
  };

  const restart = (cc: number, t: number) => {
    parts.current = makeParticles(cc, t);
    stats.current = freshStats(cc);
  };

  const changeT = (v: number) => {
    const f = speed(v) / speed(tC);
    for (const p of parts.current ?? []) {
      p.vx *= f;
      p.vy *= f;
    }
    cfg.current = { ...cfg.current, tC: v };
    setTC(v);
    check(v, c, cat);
  };
  const changeC = (v: number) => {
    setC(v);
    restart(v, tC);
    check(tC, v, cat);
  };
  const toggleCat = () => {
    const k = !cat;
    cfg.current = { ...cfg.current, cat: k };
    setCat(k);
    check(tC, c, k);
  };

  const ps = parts.current ?? [];
  const st = stats.current;
  const rate = relRate(tC, c, cat);
  const left = ps.filter((p) => p.kind === "A").length;
  const hist = st.history;
  const hx = (i: number) => 12 + (i / 60) * 276;
  const hy = (v: number) => 78 - (v / Math.max(1, st.total)) * 62;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-3">
        <ParamSlider
          label="溫度"
          min={5}
          max={65}
          step={5}
          unit="°C"
          value={tC}
          onChange={changeT}
          color="#e11d48"
        />
        <ParamSlider
          label="濃度（相對值，A 與 B 同時改變）"
          min={1}
          max={3}
          step={1}
          value={c}
          onChange={changeC}
          color="#2563eb"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={cat ? "btn-primary" : "btn-ghost"}
            onClick={toggleCat}
            aria-pressed={cat}
          >
            {cat ? "🧪 已加入催化劑" : "🧪 加入催化劑"}
          </button>
          <button type="button" className="btn-ghost" onClick={() => restart(c, tC)}>
            ↺ 重新開始
          </button>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">相對反應速率</dt>
            <dd className="font-mono font-semibold">× {fmt(rate, 1)}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">已生成 C</dt>
            <dd className="font-mono font-semibold">
              {st.products} / {st.total}
            </dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">有效碰撞比例</dt>
            <dd className="font-mono font-semibold">
              {st.collisions ? `${fmt((st.products / st.collisions) * 100, 0)}%` : "—"}
            </dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">經過時間</dt>
            <dd className="font-mono font-semibold">{fmt(st.time, 0)} 秒</dd>
          </div>
        </dl>
        <p className="text-sm">
          🎯 任務：溫度<strong>不超過 {T_MAX} °C</strong>，讓相對反應速率達到初始條件（25 °C、濃度
          1、無催化劑）的 <strong>{TARGET} 倍</strong>以上。
        </p>
        {reached && (
          <Feedback ok>🎉 達成！升溫、提高濃度、加催化劑都能增加「有效碰撞」的次數。</Feedback>
        )}
      </div>
      <div className="space-y-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full rounded-xl border border-slate-200 bg-white dark:border-slate-700"
          role="img"
          aria-label={`反應容器：剩下 ${left} 個 A，已生成 ${st.products} 個 C`}
        >
          <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
          {ps.map((p, i) =>
            p.kind === "C" ? (
              <g key={i}>
                {p.flash > 0 && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={10 + (0.7 - p.flash) * 20}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    opacity={p.flash / 0.7}
                  />
                )}
                <circle cx={p.x} cy={p.y} r="8" fill="#a855f7" stroke="#6b21a8" />
              </g>
            ) : (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={R}
                fill={p.kind === "A" ? "#ef4444" : "#3b82f6"}
                stroke="#ffffff"
                strokeWidth="1"
              />
            ),
          )}
          {left === 0 && (
            <text
              x={W / 2}
              y={H / 2}
              fontSize="16"
              fontWeight="700"
              textAnchor="middle"
              fill="#6b21a8"
            >
              反應完成！
            </text>
          )}
        </svg>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
          <span>
            <span className="inline-block size-3 rounded-full bg-red-500" /> A
          </span>
          <span>
            <span className="inline-block size-3 rounded-full bg-blue-500" /> B
          </span>
          <span>
            <span className="inline-block size-3 rounded-full bg-purple-500" /> 產物 C
          </span>
        </div>
        <svg
          viewBox="0 0 300 90"
          className="h-auto w-full rounded-lg bg-white dark:bg-slate-900"
          role="img"
          aria-label="產物數量隨時間變化"
        >
          <rect x="0" y="0" width="300" height="90" fill="#f8fafc" />
          <line x1="12" y1="78" x2="290" y2="78" stroke="#94a3b8" />
          <line x1="12" y1="10" x2="12" y2="78" stroke="#94a3b8" />
          <polyline
            points={hist.map((v, i) => `${hx(i)},${hy(v)}`).join(" ")}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <text x="18" y="20" fontSize="11" fill="#475569">
            產物 C 的數量
          </text>
          <text x="290" y="72" fontSize="11" textAnchor="end" fill="#475569">
            時間 →
          </text>
        </svg>
      </div>
    </div>
  );
}
