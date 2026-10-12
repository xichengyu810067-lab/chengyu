import { useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";
import { contourPaths, PROFILE_HILL } from "../scenes/terrain";

/** 等高線 → 地形剖面：移動剖面線，觀察剖面圖如何隨等高線疏密改變 */
const MAP_W = 400;
const MAP_H = 240;
const LEVELS = [100, 200, 300, 400, 500, 600];
const PATHS = contourPaths(PROFILE_HILL, LEVELS, MAP_W, MAP_H, 4);
const SUMMIT_ROW = 120;

const px = (x: number) => 20 + x;
const prY = (h: number) => 150 - (h / 700) * 130;

export default function ContourLab({ onComplete }: LabProps) {
  const [row, setRow] = useState(60);
  const [found, setFound] = useState(false);
  const [side, setSide] = useState<"W" | "E" | null>(null);
  const [completed, setCompleted] = useState(false);

  const samples = Array.from({ length: 101 }, (_, i) => {
    const x = i * 4;
    return { x, h: PROFILE_HILL(x, row) };
  });
  const top = samples.reduce((m, s) => (s.h > m.h ? s : m), samples[0]);
  const profile = samples
    .map((s, i) => `${i ? "L" : "M"}${px(s.x).toFixed(1)},${prY(s.h).toFixed(1)}`)
    .join("");
  const area = `${profile}L${px(400)},${prY(0)}L${px(0)},${prY(0)}Z`;

  const move = (v: number) => {
    setRow(v);
    if (v === SUMMIT_ROW) setFound(true);
  };
  const answer = (s: "W" | "E") => {
    setSide(s);
    if (s === "E" && found && !completed) {
      setCompleted(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        <svg
          viewBox="0 0 440 270"
          className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
          role="img"
          aria-label="等高線地圖與剖面線"
        >
          <rect x="0" y="0" width="440" height="270" fill="#fefce8" />
          <g transform="translate(20 14)">
            {PATHS.map((p) => (
              <path
                key={p.level}
                d={p.d}
                fill="none"
                stroke={p.level >= 500 ? "#7c2d12" : "#b45309"}
                strokeWidth={p.level % 200 === 0 ? 1.8 : 1.1}
                strokeLinecap="round"
              />
            ))}
            <line
              x1="0"
              x2={MAP_W}
              y1={row}
              y2={row}
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            <circle cx="0" cy={row} r="4" fill="#e11d48" />
            <circle cx={MAP_W} cy={row} r="4" fill="#e11d48" />
            <text x="6" y={row - 6} fontSize="12" fontWeight="700" fill="#be123c">
              A
            </text>
            <text
              x={MAP_W - 6}
              y={row - 6}
              fontSize="12"
              fontWeight="700"
              textAnchor="end"
              fill="#be123c"
            >
              B
            </text>
          </g>
          <text x="22" y="266" fontSize="10" fill="#475569">
            等高距 100 公尺（西 A → 東 B）
          </text>
          <g transform="translate(418 34)">
            <polygon points="0,-14 5,2 0,-3 -5,2" fill="#1e293b" />
            <text x="0" y="14" textAnchor="middle" fontSize="10" fill="#1e293b">
              N
            </text>
          </g>
        </svg>
        <svg
          viewBox="0 0 440 170"
          className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
          role="img"
          aria-label={`地形剖面圖，最高約 ${Math.round(top.h)} 公尺`}
        >
          <rect x="0" y="0" width="440" height="170" fill="#f8fafc" />
          {[0, 100, 200, 300, 400, 500, 600, 700].map((h) => (
            <g key={h}>
              <line x1="20" x2="420" y1={prY(h)} y2={prY(h)} stroke="#e2e8f0" />
              <text x="16" y={prY(h) + 3} fontSize="8" textAnchor="end" fill="#64748b">
                {h}
              </text>
            </g>
          ))}
          <path d={area} fill="#fcd34d" opacity="0.6" />
          <path d={profile} fill="none" stroke="#92400e" strokeWidth="2.5" />
          <circle cx={px(top.x)} cy={prY(top.h)} r="4" fill="#e11d48" />
          <text x={px(top.x)} y={prY(top.h) - 8} fontSize="10" textAnchor="middle" fill="#be123c">
            {Math.round(top.h)} 公尺
          </text>
          <text x="22" y="166" fontSize="11" fontWeight="700" fill="#be123c">
            A（西）
          </text>
          <text x="418" y="166" fontSize="11" fontWeight="700" textAnchor="end" fill="#be123c">
            B（東）
          </text>
          <text x="220" y="166" fontSize="9" textAnchor="middle" fill="#64748b">
            剖面圖（垂直比例已放大）
          </text>
        </svg>
      </div>
      <ParamSlider
        label="剖面線位置（往下拉＝往南移）"
        min={20}
        max={220}
        step={10}
        value={row}
        onChange={move}
        color="#e11d48"
      />
      <p className="text-sm">
        🎯 任務一：移動剖面線，讓它<strong>通過最高的山頂</strong>（剖面最高點達到最大）。
        {found && <span className="font-semibold text-emerald-600"> ✓ 完成</span>}
      </p>
      {found && (
        <div className="space-y-2">
          <p className="text-sm">🎯 任務二：比較山頂兩側，哪一側的坡度比較陡？</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-ghost" onClick={() => answer("W")}>
              西側（A 那一側）
            </button>
            <button type="button" className="btn-ghost" onClick={() => answer("E")}>
              東側（B 那一側）
            </button>
          </div>
          {side === "W" && (
            <Feedback ok={false}>
              再看一次地圖：西側等高線之間距離寬、比較稀疏，剖面線也比較平緩喔。
            </Feedback>
          )}
          {side === "E" && (
            <Feedback ok>
              🎉 正確！東側等高線<strong>密集</strong>
              ，水平距離很短就上升很多，所以坡度陡；西側等高線稀疏、坡度緩。
            </Feedback>
          )}
        </div>
      )}
    </div>
  );
}
