import { useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/** 月相：月球在軌道上的位置（從地球指向太陽的方向起算、逆時針）→ 從地球看到的形狀 */

const TARGETS: { angle: number; name: string; hint: string }[] = [
  { angle: 90, name: "上弦月", hint: "上弦月是「右半邊亮」的半圓，月球在地球與太陽連線的側邊。" },
  { angle: 180, name: "滿月", hint: "滿月時整個亮面朝向地球，月球在地球「背對太陽」的一側。" },
  { angle: 270, name: "下弦月", hint: "下弦月是「左半邊亮」的半圓，位置和上弦月相對。" },
  { angle: 0, name: "新月", hint: "新月時月球在太陽與地球之間，亮面完全背對地球。" },
];

function phaseName(a: number): string {
  const d = ((a % 360) + 360) % 360;
  if (d === 0) return "新月（朔）";
  if (d < 90) return "眉月";
  if (d === 90) return "上弦月";
  if (d < 180) return "盈凸月";
  if (d === 180) return "滿月（望）";
  if (d < 270) return "虧凸月";
  if (d === 270) return "下弦月";
  return "殘月";
}

const LUNAR_DIGITS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
function lunarDay(n: number): string {
  if (n <= 10) return `初${LUNAR_DIGITS[n]}`;
  if (n < 20) return `十${LUNAR_DIGITS[n - 10]}`;
  if (n === 20) return "二十";
  if (n < 30) return `廿${LUNAR_DIGITS[n - 20]}`;
  return "三十";
}

/** 從地球看到的月面：亮面路徑（北半球觀察） */
function litPath(a: number, cx: number, cy: number, R: number): string | null {
  const d = ((a % 360) + 360) % 360;
  if (d === 0) return null;
  if (d === 180) return "full";
  const c = Math.cos((d * Math.PI) / 180);
  const waxing = d < 180;
  const rx = Math.abs(c) * R;
  const edgeSweep = waxing ? 1 : 0;
  const termSweep = waxing ? (c > 0 ? 0 : 1) : c > 0 ? 1 : 0;
  return `M${cx},${cy - R} A${R},${R} 0 0 ${edgeSweep} ${cx},${cy + R} A${rx.toFixed(2)},${R} 0 0 ${termSweep} ${cx},${cy - R} Z`;
}

export default function MoonPhaseLab({ onComplete }: LabProps) {
  const [angle, setAngle] = useState(45);
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const done = step >= TARGETS.length;
  const target = TARGETS[Math.min(step, TARGETS.length - 1)];

  const rad = (angle * Math.PI) / 180;
  const ex = 135;
  const ey = 125;
  const mx = ex + 90 * Math.cos(rad);
  const my = ey - 90 * Math.sin(rad);
  const lit = litPath(angle, 360, 112, 52);
  const day = Math.round(1 + (angle / 360) * 29.5);
  const riseMin = Math.round((6 * 60 + (angle / 360) * 24 * 60) % (24 * 60));
  const rise = `${String(Math.floor(riseMin / 60)).padStart(2, "0")}:${String(riseMin % 60).padStart(2, "0")}`;

  const check = () => {
    if (done) return;
    if (angle === target.angle) {
      const next = step + 1;
      setStep(next);
      setMsg({ ok: true, text: `答對了！這就是${target.name}。` });
      if (next === TARGETS.length) onComplete();
    } else {
      setMsg({ ok: false, text: `現在看到的是「${phaseName(angle)}」。提示：${target.hint}` });
    }
  };

  return (
    <div className="space-y-4">
      <svg
        viewBox="0 0 440 250"
        className="h-auto w-full rounded-xl border border-slate-200 bg-white dark:border-slate-700"
        role="img"
        aria-label={`月球位於軌道 ${angle} 度處，從地球看到的月相`}
      >
        <rect x="0" y="0" width="440" height="250" fill="#0f172a" />
        {/* 陽光 */}
        {[40, 125, 210].map((y) => (
          <g key={y} stroke="#fde047" fill="#fde047" strokeWidth="2">
            <line x1="282" y1={y} x2="254" y2={y} />
            <polygon points={`254,${y - 5} 254,${y + 5} 246,${y}`} />
          </g>
        ))}
        <text x="252" y="24" fontSize="11" fill="#fde047">
          陽光
        </text>
        {/* 軌道與 8 個參考位置 */}
        <circle cx={ex} cy={ey} r="90" fill="none" stroke="#64748b" strokeDasharray="4 4" />
        {Array.from({ length: 8 }, (_, i) => {
          const r = (i * 45 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={ex + 90 * Math.cos(r)}
              cy={ey - 90 * Math.sin(r)}
              r="2.5"
              fill="#94a3b8"
            />
          );
        })}
        {/* 地球：右半邊白天 */}
        <circle cx={ex} cy={ey} r="16" fill="#1e3a8a" />
        <path d={`M${ex},${ey - 16} A16,16 0 0,1 ${ex},${ey + 16} Z`} fill="#38bdf8" />
        <line x1={ex} y1={ey} x2={mx} y2={my} stroke="#e2e8f0" strokeDasharray="3 3" />
        {/* 月球：永遠是朝向太陽的半邊被照亮 */}
        <circle cx={mx} cy={my} r="10" fill="#334155" stroke="#94a3b8" />
        <path d={`M${mx},${my - 10} A10,10 0 0,1 ${mx},${my + 10} Z`} fill="#fde68a" />
        <path
          d={`M${ex + 112},${ey - 30} A116,116 0 0,0 ${ex + 30},${ey - 112}`}
          fill="none"
          stroke="#94a3b8"
        />
        <polygon
          points={`${ex + 30},${ey - 112} ${ex + 40},${ey - 117} ${ex + 39},${ey - 106}`}
          fill="#94a3b8"
        />
        <text x="12" y="20" fontSize="11" fill="#e2e8f0">
          俯視圖（北極在上方）
        </text>
        {/* 從地球看到的月相 */}
        <line x1="290" y1="10" x2="290" y2="240" stroke="#334155" />
        <circle cx="360" cy="112" r="52" fill="#334155" />
        {lit === "full" && <circle cx="360" cy="112" r="52" fill="#fde68a" />}
        {lit && lit !== "full" && <path d={lit} fill="#fde68a" />}
        <text x="360" y="190" fontSize="12" textAnchor="middle" fill="#e2e8f0">
          從臺灣看到的月亮
        </text>
        <text x="360" y="210" fontSize="11" textAnchor="middle" fill="#cbd5e1">
          農曆約 {lunarDay(day)}
        </text>
        <text x="360" y="228" fontSize="11" textAnchor="middle" fill="#cbd5e1">
          約 {rise} 月出
        </text>
      </svg>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <ParamSlider
          label="月球在軌道上的位置"
          min={0}
          max={345}
          step={15}
          unit="°"
          value={angle}
          onChange={(v) => {
            setAngle(v);
            setMsg(null);
          }}
          color="#0f766e"
        />
        <div className="space-y-2 text-sm">
          {!done ? (
            <>
              <p>
                🎯 任務 {step + 1}/{TARGETS.length}：把月球移到看起來是「
                <strong>{target.name}</strong>」的位置，再按確定。
              </p>
              <button type="button" className="btn-primary" onClick={check}>
                確定
              </button>
            </>
          ) : (
            <p>
              目前位置：<strong>{phaseName(angle)}</strong>
            </p>
          )}
        </div>
      </div>
      {msg && !done && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
      {done && (
        <Feedback ok>
          🎉
          全部完成！月球被照亮的永遠是朝向太陽的半邊，我們看到多少亮面，取決於日、地、月的相對位置。
        </Feedback>
      )}
    </div>
  );
}
