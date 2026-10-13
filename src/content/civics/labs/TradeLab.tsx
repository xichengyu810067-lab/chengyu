import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 比較利益與分工：甲、乙兩國各有 60 小時勞動力，分配在晶片與稻米的生產上。
 * 甲國：1 單位晶片 1 小時、1 單位稻米 2 小時；乙國：1 單位晶片 6 小時、1 單位稻米 3 小時。
 * 各自平分時合計：晶片 35、稻米 25。任務：合計晶片 ≥ 35 且稻米 ≥ 30。
 */
const HOURS = 60;
const A = { chip: 1, rice: 2 };
const B = { chip: 6, rice: 3 };
const BASE = { chip: 35, rice: 25 };

export default function TradeLab({ onComplete }: LabProps) {
  const [x, setX] = useState(30); // 甲國投入晶片的小時
  const [y, setY] = useState(30); // 乙國投入晶片的小時
  const [done, setDone] = useState(false);

  const prod = (hx: number, hy: number) => {
    const a = { chip: hx / A.chip, rice: (HOURS - hx) / A.rice };
    const b = { chip: hy / B.chip, rice: (HOURS - hy) / B.rice };
    return { a, b, chip: a.chip + b.chip, rice: a.rice + b.rice };
  };
  const r = prod(x, y);
  const ok = (p: ReturnType<typeof prod>) => p.chip >= BASE.chip && p.rice >= 30;

  const update = (nx: number, ny: number) => {
    setX(nx);
    setY(ny);
    if (!done && ok(prod(nx, ny))) {
      setDone(true);
      onComplete();
    }
  };

  // 長條圖：每組為甲（下）乙（上）堆疊
  const H = 220;
  const scale = 2.2; // 每單位 2.2 px
  const bar = (gx: number, label: string, va: number, vb: number, base: number) => {
    const ha = va * scale;
    const hb = vb * scale;
    const bottom = H - 30;
    return (
      <g>
        <rect x={gx} y={bottom - ha} width="70" height={ha} fill="#3b82f6" rx="3" />
        <rect x={gx} y={bottom - ha - hb} width="70" height={hb} fill="#f59e0b" rx="3" />
        <line
          x1={gx - 10}
          x2={gx + 80}
          y1={bottom - base * scale}
          y2={bottom - base * scale}
          stroke="#e11d48"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x={gx + 82} y={bottom - base * scale + 4} fontSize="10" fill="#e11d48">
          原本 {base}
        </text>
        <text
          x={gx + 35}
          y={bottom - ha - hb - 6}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#1e293b"
        >
          {fmt(va + vb, 1)}
        </text>
        <text x={gx + 35} y={bottom + 18} textAnchor="middle" fontSize="13" fill="#334155">
          {label}
        </text>
      </g>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-1">每生產 1 單位需要</th>
                <th>晶片</th>
                <th>稻米</th>
                <th>1 晶片的機會成本</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 font-semibold text-blue-600">甲國</td>
                <td>1 小時</td>
                <td>2 小時</td>
                <td>0.5 單位稻米</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-amber-600">乙國</td>
                <td>6 小時</td>
                <td>3 小時</td>
                <td>2 單位稻米</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ParamSlider
          label="甲國：投入晶片的工時（其餘種稻米）"
          min={0}
          max={60}
          step={2}
          value={x}
          unit="小時"
          onChange={(v) => update(v, y)}
          color="#2563eb"
        />
        <ParamSlider
          label="乙國：投入晶片的工時（其餘種稻米）"
          min={0}
          max={60}
          step={6}
          value={y}
          unit="小時"
          onChange={(v) => update(x, v)}
          color="#d97706"
        />
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
          <p>
            甲國產出：晶片 {fmt(r.a.chip, 1)}、稻米 {fmt(r.a.rice, 1)}
          </p>
          <p>
            乙國產出：晶片 {fmt(r.b.chip, 1)}、稻米 {fmt(r.b.rice, 1)}
          </p>
        </div>
        <p className="text-sm">
          🎯 任務：一開始兩國都把工時平分。請重新分工，讓兩國<strong>合計</strong>的晶片至少 35
          單位、稻米至少 30 單位。
        </p>
        {done && (
          <Feedback ok>
            🎉
            成功！各自生產機會成本較低的產品（甲國做晶片、乙國種稻米），總產量變多了，再透過貿易交換，兩國都能得到好處。
          </Feedback>
        )}
      </div>
      <svg
        viewBox={`0 0 300 ${H}`}
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`兩國合計產量：晶片 ${fmt(r.chip, 1)}、稻米 ${fmt(r.rice, 1)}`}
      >
        <rect x="0" y="0" width="300" height={H} fill="#ffffff" />
        <line x1="20" x2="290" y1={H - 30} y2={H - 30} stroke="#94a3b8" />
        {bar(40, "晶片（合計）", r.a.chip, r.b.chip, BASE.chip)}
        {bar(170, "稻米（合計）", r.a.rice, r.b.rice, BASE.rice)}
        <rect x="20" y="8" width="12" height="10" fill="#3b82f6" />
        <text x="36" y="17" fontSize="11" fill="#334155">
          甲國
        </text>
        <rect x="80" y="8" width="12" height="10" fill="#f59e0b" />
        <text x="96" y="17" fontSize="11" fill="#334155">
          乙國
        </text>
      </svg>
    </div>
  );
}
