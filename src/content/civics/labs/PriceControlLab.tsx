import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 價格管制：需求 Qd = 100 − P、供給 Qs = P − 20，均衡 P = 60、Q = 40。
 * 任務一：設定有效的價格上限，造成短缺 40 單位（P = 40）。
 * 任務二：設定有效的價格下限，造成過剩 30 單位（P = 75）。
 */
type Mode = "none" | "ceiling" | "floor";

const qd = (p: number) => Math.max(0, 100 - p);
const qs = (p: number) => Math.max(0, p - 20);
const PE = 60;

export default function PriceControlLab({ onComplete }: LabProps) {
  const [mode, setMode] = useState<Mode>("none");
  const [pc, setPc] = useState(60);
  const [tasks, setTasks] = useState({ shortage: false, surplus: false });
  const [done, setDone] = useState(false);

  const evaluate = (m: Mode, p: number) => {
    const binding = (m === "ceiling" && p < PE) || (m === "floor" && p > PE);
    const price = binding ? p : PE;
    const d = qd(price);
    const s = qs(price);
    return { binding, price, d, s, traded: Math.min(d, s), gap: d - s };
  };
  const r = evaluate(mode, pc);

  const check = (m: Mode, p: number) => {
    const e = evaluate(m, p);
    const next = {
      shortage: tasks.shortage || (m === "ceiling" && e.binding && e.gap === 40),
      surplus: tasks.surplus || (m === "floor" && e.binding && e.gap === -30),
    };
    setTasks(next);
    if (!done && next.shortage && next.surplus) {
      setDone(true);
      onComplete();
    }
  };

  const changeMode = (m: Mode) => {
    setMode(m);
    check(m, pc);
  };
  const changePrice = (p: number) => {
    setPc(p);
    check(mode, p);
  };

  const status = !r.binding
    ? mode === "none"
      ? "沒有管制：市場在均衡價格 60 元成交。"
      : `管制價格 ${pc} 元沒有「卡住」市場（${mode === "ceiling" ? "上限高於" : "下限低於"}均衡價格），市場仍以 60 元成交。`
    : r.gap > 0
      ? `短缺 ${fmt(r.gap)} 單位：想買 ${fmt(r.d)}，只有人賣 ${fmt(r.s)}。`
      : `過剩 ${fmt(-r.gap)} 單位：想賣 ${fmt(r.s)}，只有人買 ${fmt(r.d)}。`;

  const btn = (m: Mode, label: string) => (
    <button
      type="button"
      className={mode === m ? "btn-primary" : "btn-ghost"}
      aria-pressed={mode === m}
      onClick={() => changeMode(m)}
    >
      {label}
    </button>
  );

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {btn("none", "不管制")}
          {btn("ceiling", "價格上限")}
          {btn("floor", "價格下限")}
        </div>
        <ParamSlider
          label="管制價格"
          min={20}
          max={100}
          step={5}
          value={pc}
          unit="元"
          onChange={changePrice}
          color="#e11d48"
        />
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
          <p>
            成交價格：<strong>{fmt(r.price)} 元</strong>　實際成交量：
            <strong>{fmt(r.traded)}</strong>
          </p>
          <p className="mt-1">{status}</p>
        </div>
        <ul className="space-y-1 text-sm">
          <li>{tasks.shortage ? "✅" : "⬜"} 任務一：設定有效的「價格上限」，造成短缺 40 單位</li>
          <li>{tasks.surplus ? "✅" : "⬜"} 任務二：設定有效的「價格下限」，造成過剩 30 單位</li>
        </ul>
        {done && (
          <Feedback ok>
            🎉
            完成！上限要「低於」均衡價格、下限要「高於」均衡價格才有效果；實際成交量都會比均衡時的
            40 少。
          </Feedback>
        )}
      </div>
      <Plot
        x={[0, 100]}
        y={[0, 100]}
        xLabel="數量 Q"
        yLabel="價格 P"
        title="供需圖與價格管制"
        fns={[
          { label: "需求 D", f: (q) => 100 - q, color: "#2563eb" },
          { label: "供給 S", f: (q) => q + 20, color: "#059669" },
          ...(mode === "none"
            ? []
            : [
                {
                  label: mode === "ceiling" ? "價格上限" : "價格下限",
                  f: () => pc,
                  color: "#e11d48",
                },
              ]),
        ]}
        points={[{ x: 40, y: 60, label: "E", color: "#64748b" }]}
      >
        {(s) =>
          r.binding ? (
            <g>
              <line
                x1={s.sx(Math.min(r.d, r.s))}
                x2={s.sx(Math.max(r.d, r.s))}
                y1={s.sy(pc)}
                y2={s.sy(pc)}
                stroke={r.gap > 0 ? "#f97316" : "#7c3aed"}
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.55"
              />
              <text
                x={s.sx((r.d + r.s) / 2)}
                y={s.sy(pc) + (r.gap > 0 ? 20 : -12)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={r.gap > 0 ? "#c2410c" : "#6d28d9"}
              >
                {r.gap > 0 ? `短缺 ${fmt(r.gap)}` : `過剩 ${fmt(-r.gap)}`}
              </text>
            </g>
          ) : null
        }
      </Plot>
    </div>
  );
}
