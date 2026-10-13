import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/**
 * 不分區立委席次分配：34 席、5% 政黨門檻、最大餘數法。
 * 任務：調整得票，讓原本未過門檻的戊黨取得席次。
 */
const SEATS = 34;
const THRESHOLD = 0.05;
const PARTIES = [
  { name: "甲黨", color: "#2563eb", init: 500, max: 800 },
  { name: "乙黨", color: "#16a34a", init: 420, max: 800 },
  { name: "丙黨", color: "#d97706", init: 150, max: 400 },
  { name: "丁黨", color: "#7c3aed", init: 90, max: 300 },
  { name: "戊黨", color: "#e11d48", init: 40, max: 150 },
];

interface Row {
  share: number;
  passed: boolean;
  quota: number;
  seats: number;
}

/** 最大餘數法：先分整數席，剩餘席次依小數大小（同分時依順序）分配 */
function allocate(votes: number[], useThreshold: boolean): Row[] {
  const total = votes.reduce((a, b) => a + b, 0);
  const passed = votes.map((v) => total > 0 && (!useThreshold || v / total >= THRESHOLD));
  const qTotal = votes.reduce((a, v, i) => a + (passed[i] ? v : 0), 0);
  const quota = votes.map((v, i) => (passed[i] && qTotal > 0 ? (v / qTotal) * SEATS : 0));
  const seats = quota.map((q) => Math.floor(q));
  let left = qTotal > 0 ? SEATS - seats.reduce((a, b) => a + b, 0) : 0;
  const order = quota
    .map((q, i) => ({ i, rem: q - Math.floor(q) }))
    .filter((o) => passed[o.i])
    .sort((a, b) => b.rem - a.rem || a.i - b.i);
  for (const o of order) {
    if (left <= 0) break;
    seats[o.i]++;
    left--;
  }
  return votes.map((v, i) => ({
    share: total > 0 ? v / total : 0,
    passed: passed[i],
    quota: quota[i],
    seats: seats[i],
  }));
}

export default function SeatLab({ onComplete }: LabProps) {
  const [votes, setVotes] = useState(() => PARTIES.map((p) => p.init));
  const [done, setDone] = useState(false);
  const rows = allocate(votes, true);
  const noTh = allocate(votes, false);

  const setVote = (i: number, v: number) => {
    const next = votes.map((x, j) => (j === i ? v : x));
    setVotes(next);
    const r = allocate(next, true);
    if (!done && r[4].seats >= 1) {
      setDone(true);
      onComplete();
    }
  };

  // 34 個席位圓點（半圓議場）
  const seatColors: string[] = [];
  rows.forEach((r, i) => {
    for (let k = 0; k < r.seats; k++) seatColors.push(PARTIES[i].color);
  });
  const dots = seatColors.map((c, k) => {
    const ring = k % 2;
    const idx = Math.floor(k / 2);
    const n = Math.ceil(SEATS / 2);
    const ang = Math.PI - (idx + 0.5) * (Math.PI / n);
    const rad = ring ? 70 : 100;
    return { x: 160 + rad * Math.cos(ang), y: 130 - rad * Math.sin(ang), c };
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-2">
          {PARTIES.map((p, i) => (
            <ParamSlider
              key={p.name}
              label={`${p.name} 政黨票（萬票）`}
              min={0}
              max={p.max}
              step={5}
              value={votes[i]}
              onChange={(v) => setVote(i, v)}
              color={p.color}
            />
          ))}
        </div>
        <div>
          <svg
            viewBox="0 0 320 150"
            className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
            role="img"
            aria-label={`席次分配：${PARTIES.map((p, i) => `${p.name} ${rows[i].seats} 席`).join("、")}`}
          >
            <rect x="0" y="0" width="320" height="150" fill="#ffffff" />
            {dots.map((d, k) => (
              <circle
                key={`seat${k}`}
                cx={d.x}
                cy={d.y}
                r="7"
                fill={d.c}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            ))}
            <text x="160" y="126" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">
              不分區 {SEATS} 席
            </text>
            <text x="160" y="143" textAnchor="middle" fontSize="10" fill="#64748b">
              門檻 5%・最大餘數法
            </text>
          </svg>
          <p className="mt-2 text-sm">
            🎯 任務：戊黨目前沒有過門檻。調整各黨得票，讓<strong>戊黨取得至少 1 席</strong>
            ，並觀察門檻如何影響其他政黨的席次。
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700">
              <th className="py-1">政黨</th>
              <th>得票率</th>
              <th>過 5% 門檻？</th>
              <th>理論席次</th>
              <th>分配席次</th>
              <th>若沒有門檻</th>
            </tr>
          </thead>
          <tbody>
            {PARTIES.map((p, i) => (
              <tr key={p.name} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-1 font-semibold" style={{ color: p.color }}>
                  {p.name}
                </td>
                <td>{fmt(rows[i].share * 100, 2)}%</td>
                <td>{rows[i].passed ? "✅ 是" : "❌ 否"}</td>
                <td className="font-mono">{rows[i].passed ? fmt(rows[i].quota, 3) : "—"}</td>
                <td className="font-bold">{rows[i].seats}</td>
                <td className="text-slate-500">{noTh[i].seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        理論席次 = 該黨得票 ÷ 過門檻政黨的得票總和 ×
        34。先分配整數部分，剩下的席次依小數由大到小分配。
      </p>
      {done && (
        <Feedback ok>
          🎉 戊黨跨過 5%
          門檻後才能參與分配！比較「若沒有門檻」欄位：門檻會讓小黨的選票無法轉換成席次，大黨則多分到一些席位。
        </Feedback>
      )}
    </div>
  );
}
