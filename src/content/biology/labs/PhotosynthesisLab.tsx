import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 影響光合作用速率的因子（示意模型，數值為相對值）：
 * 總光合作用 = Pmax(CO₂, 溫度) × (1 − e^(−光強度/20))；呼吸作用隨溫度上升（Q₁₀ ≈ 2）。
 */
const co2Factor = (c: number) => c / (c + 400);
const tempFactor = (t: number) =>
  t <= 30 ? Math.exp(-(((t - 30) / 12) ** 2)) : Math.exp(-(((t - 30) / 7) ** 2));
const pmax = (c: number, t: number) => 70 * co2Factor(c) * tempFactor(t);
const gross = (l: number, c: number, t: number) => pmax(c, t) * (1 - Math.exp(-l / 20));
const resp = (t: number) => 6 * 2 ** ((t - 25) / 10);
const net = (l: number, c: number, t: number) => gross(l, c, t) - resp(t);
/** 光補償點：淨光合作用 = 0 的光強度；不存在時回傳 NaN */
function compensation(c: number, t: number): number {
  const p = pmax(c, t);
  const r = resp(t);
  return r < p ? -20 * Math.log(1 - r / p) : Number.NaN;
}

const GOAL = 35;

export default function PhotosynthesisLab({ onComplete }: LabProps) {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(400);
  const [temp, setTemp] = useState(25);
  const [foundComp, setFoundComp] = useState(false);
  const [foundMax, setFoundMax] = useState(false);

  const n = net(light, co2, temp);
  const lc = compensation(co2, temp);
  const saturation = 1 - Math.exp(-light / 20);
  const limiting =
    saturation < 0.9
      ? "光強度"
      : co2Factor(co2) < 0.6
        ? "CO₂ 濃度"
        : temp < 24 || temp > 34
          ? "溫度"
          : "已接近此植物的最大速率";

  const update = (l: number, c: number, t: number) => {
    setLight(l);
    setCo2(c);
    setTemp(t);
    const v = net(l, c, t);
    let comp = foundComp;
    let max = foundMax;
    if (!comp && l > 0 && Math.abs(v) <= 1) {
      comp = true;
      setFoundComp(true);
    }
    if (!max && v >= GOAL) {
      max = true;
      setFoundMax(true);
    }
    if (comp && max && !(foundComp && foundMax)) onComplete();
  };

  const done = foundComp && foundMax;
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <ParamSlider
          label="光強度（相對值）"
          min={0}
          max={100}
          step={1}
          value={light}
          onChange={(v) => update(v, co2, temp)}
          color="#ca8a04"
        />
        <ParamSlider
          label="CO₂ 濃度"
          min={100}
          max={1000}
          step={50}
          unit="ppm"
          value={co2}
          onChange={(v) => update(light, v, temp)}
          color="#0891b2"
        />
        <ParamSlider
          label="溫度"
          min={5}
          max={45}
          step={1}
          unit="°C"
          value={temp}
          onChange={(v) => update(light, co2, v)}
          color="#e11d48"
        />
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">總光合作用速率</dt>
            <dd className="font-mono font-semibold">{fmt(gross(light, co2, temp), 1)}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">呼吸作用速率</dt>
            <dd className="font-mono font-semibold">{fmt(resp(temp), 1)}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">淨光合作用速率</dt>
            <dd className="font-mono font-semibold">{fmt(n, 1)}</dd>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
            <dt className="text-xs text-slate-500">目前主要限制因子</dt>
            <dd className="font-semibold">{limiting}</dd>
          </div>
        </dl>
        <div className="text-sm">
          <p>🎯 任務</p>
          <ul className="mt-1 space-y-1">
            <li>
              {foundComp ? "✅" : "⬜"} 找到<strong>光補償點</strong>：淨光合作用速率約等於 0（±1）
            </li>
            <li>
              {foundMax ? "✅" : "⬜"} 讓淨光合作用速率達到 <strong>{GOAL}</strong> 以上
            </li>
          </ul>
        </div>
        {done && (
          <Feedback ok>
            🎉 完成！光很強時，速率不再隨光增加，這時要提高 CO₂
            濃度、調到適當溫度才能再提升——這就是「限制因子」的概念。
          </Feedback>
        )}
      </div>
      <Plot
        x={[0, 100]}
        y={[-20, 55]}
        xLabel="光強度"
        yLabel="速率（相對值）"
        title={`光合作用速率對光強度的關係，目前淨速率 ${fmt(n, 1)}`}
        fns={[
          { label: "總光合作用", color: "#16a34a", f: (x) => gross(x, co2, temp) },
          { label: "淨光合作用", color: "#ca8a04", f: (x) => net(x, co2, temp) },
          { label: "目標", color: "#cbd5e1", f: () => GOAL },
        ]}
        points={[{ x: light, y: n, label: fmt(n, 1), color: "#e11d48" }]}
        vlines={
          foundComp && Number.isFinite(lc) ? [{ x: lc, label: "光補償點", color: "#64748b" }] : []
        }
        className="rounded-xl bg-white p-2 dark:bg-slate-900"
      />
    </div>
  );
}
