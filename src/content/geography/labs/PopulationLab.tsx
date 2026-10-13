import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider, Plot } from "../../../widgets/kit";
import type { LabProps } from "../../types";
import { END_YEAR, START_YEAR, stageOf, YEARS, type YearStat } from "./demography";

/** 人口轉型與人口金字塔：拖動年份，對照出生率、死亡率曲線與金字塔形狀 */
const at = (x: number) =>
  YEARS[Math.max(0, Math.min(YEARS.length - 1, Math.round(x) - START_YEAR))];

const NI = YEARS.map((s) => s.birth - s.death);
const MAX_NI = Math.max(...NI);
const firstYear = (test: (s: YearStat) => boolean) =>
  (YEARS.find((s) => s.year > 1950 && test(s)) as YearStat).year;
const OLD14 = firstYear((s) => s.old >= 14);
const NEG = firstYear((s) => s.birth < s.death);

const TASKS = [
  {
    text: "找出人口成長最快（自然增加率最高）的時期",
    ok: (s: YearStat) => s.birth - s.death >= MAX_NI - 1.5,
    hint: "看上方圖：出生率和死亡率兩條線之間的距離最大的時候。",
  },
  {
    text: "找出 65 歲以上人口比例「剛超過 14%」、進入高齡社會的那一年",
    ok: (s: YearStat) => s.year >= OLD14 && s.year <= OLD14 + 2,
    hint: "留意下方的老年人口比例，找出它第一次超過 14% 的年份。",
  },
  {
    text: "找出出生率「剛開始低於」死亡率、人口開始自然減少的那一年",
    ok: (s: YearStat) => s.year >= NEG && s.year <= NEG + 2,
    hint: "找出兩條線交叉的位置。",
  },
];

const AGE_LABELS = Array.from({ length: 17 }, (_, g) =>
  g === 16 ? "80+" : `${g * 5}–${g * 5 + 4}`,
);

export default function PopulationLab({ onComplete }: LabProps) {
  const [year, setYear] = useState(START_YEAR);
  const [task, setTask] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const s = at(year);
  const stage = stageOf(s);
  const done = task >= TASKS.length;
  const dependency = ((s.young + s.old) / s.working) * 100;

  const mark = () => {
    if (done) return;
    const t = TASKS[task];
    if (t.ok(s)) {
      setMsg({ ok: true, text: `答對了！${year} 年：${stage.text}。` });
      const next = task + 1;
      setTask(next);
      if (next === TASKS.length) onComplete();
    } else setMsg({ ok: false, text: `${year} 年還不是喔。提示：${t.hint}` });
  };

  const unit = 10; // 每 1% 人口 = 10 px（單側）
  const barH = 12;
  const cx = 150;
  const gap = 20;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-1 text-sm font-semibold">出生率與死亡率（‰）</p>
          <Plot
            x={[START_YEAR, END_YEAR]}
            y={[-25, 55]}
            xLabel="年份"
            yLabel="‰"
            height={260}
            fns={[
              { label: "出生率", color: "#e11d48", f: (x) => at(x).birth },
              { label: "死亡率", color: "#2563eb", f: (x) => at(x).death },
              { label: "自然增加率", color: "#059669", f: (x) => at(x).birth - at(x).death },
            ]}
            vlines={[{ x: year, label: String(year), color: "#7c3aed" }]}
          />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold">{year} 年的人口金字塔</p>
          <svg
            viewBox="0 0 300 260"
            className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
            role="img"
            aria-label={`${year} 年人口金字塔：幼年 ${fmt(s.young, 1)}%、老年 ${fmt(s.old, 1)}%`}
          >
            <rect x="0" y="0" width="300" height="260" fill="#ffffff" />
            {s.groups.map((g, i) => {
              const w = (g / 2) * unit;
              const y = 228 - (i + 1) * barH;
              const color = i < 3 ? "#f59e0b" : i >= 13 ? "#8b5cf6" : "#10b981";
              return (
                <g key={i}>
                  <rect x={cx - gap - w} y={y} width={w} height={barH - 1.5} fill={color} />
                  <rect x={cx + gap} y={y} width={w} height={barH - 1.5} fill={color} />
                  {i % 2 === 0 && (
                    <text x={cx} y={y + 9} fontSize="8" textAnchor="middle" fill="#475569">
                      {AGE_LABELS[i]}
                    </text>
                  )}
                </g>
              );
            })}
            <line x1="10" x2="290" y1="228" y2="228" stroke="#94a3b8" />
            {[2, 4, 6, 8, 10].map((p) => (
              <g key={p}>
                <text
                  x={cx + gap + p * unit}
                  y="240"
                  fontSize="8"
                  textAnchor="middle"
                  fill="#64748b"
                >
                  {p}%
                </text>
                <text
                  x={cx - gap - p * unit}
                  y="240"
                  fontSize="8"
                  textAnchor="middle"
                  fill="#64748b"
                >
                  {p}%
                </text>
              </g>
            ))}
            <text x="60" y="16" fontSize="11" textAnchor="middle" fill="#1e293b">
              男
            </text>
            <text x="240" y="16" fontSize="11" textAnchor="middle" fill="#1e293b">
              女
            </text>
            <text x="150" y="254" fontSize="9" textAnchor="middle" fill="#64748b">
              黃：0–14 歲　綠：15–64 歲　紫：65 歲以上
            </text>
          </svg>
        </div>
      </div>
      <ParamSlider
        label="年份（模擬國家）"
        min={START_YEAR}
        max={END_YEAR}
        step={1}
        value={year}
        onChange={setYear}
        color="#7c3aed"
      />
      <div className="grid grid-cols-2 gap-2 text-center text-sm sm:grid-cols-4">
        {[
          ["出生率", `${fmt(s.birth, 1)}‰`],
          ["死亡率", `${fmt(s.death, 1)}‰`],
          ["自然增加率", `${fmt((s.birth - s.death) / 10, 2)}%`],
          ["扶養比", fmt(dependency, 1)],
          ["0–14 歲", `${fmt(s.young, 1)}%`],
          ["15–64 歲", `${fmt(s.working, 1)}%`],
          ["65 歲以上", `${fmt(s.old, 1)}%`],
          ["平均壽命／總生育率", `${fmt(s.e0, 0)} 歲／${fmt(s.tfr, 2)}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
            <div className="text-xs text-slate-500">{k}</div>
            <div className="font-mono font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <p className="rounded-lg bg-violet-50 p-2 text-sm dark:bg-violet-950/40">📍 {stage.text}</p>
      {!done ? (
        <div className="space-y-2">
          <p className="text-sm">
            🎯 任務 {task + 1}/{TASKS.length}：{TASKS[task].text}，再按「標記這一年」。
          </p>
          <button type="button" className="btn-primary" onClick={mark}>
            標記這一年
          </button>
        </div>
      ) : (
        <Feedback ok>
          🎉 完成！人口轉型的順序是：死亡率先下降 → 出生率隨後下降 →
          人口老化，金字塔由「底寬頂尖」逐漸變成「底部縮小」。
        </Feedback>
      )}
      {msg && !done && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
      <p className="text-xs text-slate-500">
        說明：這是虛構國家的模型模擬，走勢與臺灣等國家相似，但數字並非實際統計。
      </p>
    </div>
  );
}
