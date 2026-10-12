import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/** 族群成長：指數成長（J 型）與邏輯斯諦成長（S 型） */
const N0 = 10;
const logistic = (t: number, r: number, k: number) => k / (1 + ((k - N0) / N0) * Math.exp(-r * t));
const exponential = (t: number, r: number) => N0 * Math.exp(r * t);
/** 達到 90% K 所需時間 */
const t90 = (r: number, k: number) => Math.log((9 * (k - N0)) / N0) / r;

export default function PopulationLab({ onComplete }: LabProps) {
  const [r, setR] = useState(0.3);
  const [k, setK] = useState(500);
  const [t, setT] = useState(4);
  const [foundHalf, setFoundHalf] = useState(false);
  const [foundFast, setFoundFast] = useState(false);

  const n = logistic(t, r, k);
  const rate = r * n * (1 - n / k);

  const update = (nr: number, nk: number, nt: number) => {
    setR(nr);
    setK(nk);
    setT(nt);
    let half = foundHalf;
    let fast = foundFast;
    if (!half && Math.abs(logistic(nt, nr, nk) - nk / 2) <= 0.05 * nk) {
      half = true;
      setFoundHalf(true);
    }
    if (!fast && t90(nr, nk) <= 10) {
      fast = true;
      setFoundFast(true);
    }
    if (half && fast && !(foundHalf && foundFast)) onComplete();
  };

  const done = foundHalf && foundFast;
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <ParamSlider
          label="內在成長率 r"
          min={0.1}
          max={1}
          step={0.05}
          value={r}
          onChange={(v) => update(v, k, t)}
          color="#059669"
        />
        <ParamSlider
          label="環境負荷量 K"
          min={200}
          max={1000}
          step={50}
          value={k}
          onChange={(v) => update(r, v, t)}
          color="#7c3aed"
        />
        <ParamSlider
          label="觀察時間 t"
          min={0}
          max={30}
          step={0.25}
          value={t}
          onChange={(v) => update(r, k, v)}
          color="#e11d48"
        />
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">S 型：族群數量 N</dt>
            <dd className="font-mono font-semibold">{fmt(n, 0)}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">J 型：族群數量</dt>
            <dd className="font-mono font-semibold">
              {exponential(t, r) > 1e6 ? "超過一百萬" : fmt(exponential(t, r), 0)}
            </dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">S 型成長速率 dN/dt</dt>
            <dd className="font-mono font-semibold">{fmt(rate, 1)} / 單位時間</dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">達到 90% K 的時間</dt>
            <dd className="font-mono font-semibold">t ≈ {fmt(t90(r, k), 1)}</dd>
          </div>
        </dl>
        <div className="text-sm">
          <p>🎯 任務（起始族群 N₀ = {N0}）</p>
          <ul className="mt-1 space-y-1">
            <li>
              {foundHalf ? "✅" : "⬜"} 移動觀察時間，找到 S 型曲線<strong>成長最快</strong>的時刻
            </li>
            <li>
              {foundFast ? "✅" : "⬜"} 調整參數，讓族群在 <strong>t ≤ 10</strong> 時就達到 K 的 90%
            </li>
          </ul>
        </div>
        {done && (
          <Feedback ok>
            🎉 完成！S 型曲線在 N = K/2 時成長最快；r 越大，族群越快接近環境負荷量 K。
          </Feedback>
        )}
      </div>
      <Plot
        x={[0, 30]}
        y={[0, 1200]}
        xLabel="時間 t"
        yLabel="族群數量 N"
        title={`族群成長曲線，r = ${r}、K = ${k}`}
        fns={[
          { label: "指數成長（J 型）", color: "#94a3b8", f: (x) => exponential(x, r) },
          { label: "邏輯斯諦成長（S 型）", color: "#059669", f: (x) => logistic(x, r, k) },
          { label: "環境負荷量 K", color: "#7c3aed", f: () => k },
        ]}
        points={[{ x: t, y: n, label: `N = ${fmt(n, 0)}`, color: "#e11d48" }]}
        vlines={[{ x: t, color: "#e11d48" }]}
        className="rounded-xl bg-white p-2 dark:bg-slate-900"
      />
    </div>
  );
}
