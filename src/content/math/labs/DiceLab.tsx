import { useState } from "react";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

const SUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
/** 兩顆骰子點數和的理論機率：(6 − |s − 7|) / 36 */
const theory = (s: number) => (6 - Math.abs(s - 7)) / 36;

export default function DiceLab({ onComplete }: LabProps) {
  const [n, setN] = useState(20);
  const [counts, setCounts] = useState<number[]>(() => SUMS.map(() => 0));
  const [last, setLast] = useState<[number, number] | null>(null);
  const total = counts.reduce((a, b) => a + b, 0);

  const roll = () => {
    const next = [...counts];
    let d: [number, number] = [1, 1];
    for (let i = 0; i < n; i++) {
      d = [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)];
      next[d[0] + d[1] - 2]++;
    }
    setCounts(next);
    setLast(d);
    if (total < 300 && total + n >= 300) onComplete();
  };

  const maxP = 0.25;
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="space-y-3">
        <ParamSlider label="每次擲幾回" min={1} max={200} step={1} value={n} onChange={setN} />
        <div className="flex gap-2">
          <button type="button" className="btn-primary" onClick={roll}>
            🎲 擲骰子
          </button>
          <button type="button" className="btn-ghost" onClick={() => setCounts(SUMS.map(() => 0))}>
            歸零
          </button>
        </div>
        {last && (
          <p className="text-2xl" aria-live="polite">
            {"⚀⚁⚂⚃⚄⚅"[last[0] - 1]} {"⚀⚁⚂⚃⚄⚅"[last[1] - 1]}{" "}
            <span className="text-sm">最後一次：和 = {last[0] + last[1]}</span>
          </p>
        )}
        <p className="text-sm">
          已擲 <strong>{total}</strong> 回（擲滿 300 回完成實驗）
        </p>
        <p className="text-xs text-slate-500">
          藍色長條是實驗的相對次數，橘色點是理論機率。擲越多次，兩者越接近。
        </p>
      </div>
      <svg
        viewBox="0 0 440 260"
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label="兩顆骰子點數和的次數分配"
      >
        {SUMS.map((s, i) => {
          const p = total ? counts[i] / total : 0;
          const x = 30 + i * 37;
          const h = (p / maxP) * 200;
          const th = (theory(s) / maxP) * 200;
          return (
            <g key={s}>
              <rect
                x={x}
                y={225 - h}
                width={28}
                height={h}
                fill="#3b82f6"
                rx="3"
                style={{ transition: "all .3s" }}
              />
              <circle cx={x + 14} cy={225 - th} r="4" fill="#f97316" />
              <text
                x={x + 14}
                y={242}
                textAnchor="middle"
                fontSize="12"
                className="fill-slate-600 dark:fill-slate-300"
              >
                {s}
              </text>
              {total > 0 && (
                <text
                  x={x + 14}
                  y={220 - h}
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-slate-500"
                >
                  {(p * 100).toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
        <line x1="25" x2="440" y1="225" y2="225" stroke="#94a3b8" />
        <text x="440" y="258" textAnchor="end" fontSize="11" className="fill-slate-500">
          點數和
        </text>
      </svg>
    </div>
  );
}
