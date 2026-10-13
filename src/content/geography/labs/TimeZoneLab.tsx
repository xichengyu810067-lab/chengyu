import { useState } from "react";
import { Feedback } from "../../../ui";
import { ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

/** 理論時區：每 15° 經度相差 1 小時（不考慮日光節約時間與各國自訂的時區界線） */
const CITIES = [
  { name: "洛杉磯", lon: -118.2, tz: -8 },
  { name: "紐約", lon: -74, tz: -5 },
  { name: "里約熱內盧", lon: -43.2, tz: -3 },
  { name: "倫敦", lon: -0.1, tz: 0 },
  { name: "開羅", lon: 31.2, tz: 2 },
  { name: "曼谷", lon: 100.5, tz: 7 },
  { name: "臺北", lon: 121.5, tz: 8 },
  { name: "東京", lon: 139.7, tz: 9 },
  { name: "雪梨", lon: 151.2, tz: 10 },
];

const WEEK = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
const TAIPEI_DAY = 1; // 臺北固定為週一

const TASKS = [
  { target: 0, hint: "本初子午線經過英國倫敦的格林威治。" },
  { target: 150, hint: "比臺北快 2 小時，要往東移 2 × 15° = 30°。" },
  { target: -75, hint: "比臺北慢 13 小時，要往西移 13 × 15° = 195°，越過本初子午線到西經。" },
];

const pad = (n: number) => String(n).padStart(2, "0");
function localTime(taipeiHour: number, tz: number) {
  const t = taipeiHour - 8 + tz;
  const dayShift = Math.floor(t / 24);
  const hour = ((t % 24) + 24) % 24;
  return { day: (((TAIPEI_DAY + dayShift) % 7) + 7) % 7, hour, dayShift };
}
const show = (taipeiHour: number, tz: number) => {
  const { day, hour } = localTime(taipeiHour, tz);
  return `${WEEK[day]} ${pad(hour)}:00`;
};
const lonText = (lon: number) =>
  lon === 0 ? "0°" : lon > 0 ? `東經 ${lon}°` : `西經 ${Math.abs(lon)}°`;

const W = 440;
const sx = (lon: number) => 20 + ((lon + 180) / 360) * 400;

export default function TimeZoneLab({ onComplete }: LabProps) {
  const [hour, setHour] = useState(9);
  const [lon, setLon] = useState(120);
  const [task, setTask] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const done = task >= TASKS.length;
  const tz = lon / 15;
  const here = localTime(hour, tz);

  const check = () => {
    if (done) return;
    const t = TASKS[task];
    if (lon === t.target) {
      setMsg({ ok: true, text: `答對了！${lonText(lon)} 的時間是 ${show(hour, tz)}。` });
      const next = task + 1;
      setTask(next);
      if (next === TASKS.length) onComplete();
    } else {
      const diff = tz - 8;
      setMsg({
        ok: false,
        text: `這裡比臺北${diff >= 0 ? "快" : "慢"} ${Math.abs(diff)} 小時，還不對喔。提示：${t.hint}`,
      });
    }
  };

  // 太陽直射（當地正午）的經度
  let noon = (12 - (hour - 8)) * 15;
  while (noon > 180) noon -= 360;
  while (noon <= -180) noon += 360;

  const target = done ? null : TASKS[task];
  const targetTz = target ? target.target / 15 : 0;

  return (
    <div className="space-y-4">
      <svg
        viewBox={`0 0 ${W} 210`}
        className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
        role="img"
        aria-label={`臺北 ${show(hour, 8)}，${lonText(lon)} 為 ${show(hour, tz)}`}
      >
        <rect x="0" y="0" width={W} height="210" fill="#f8fafc" />
        {Array.from({ length: 25 }, (_, i) => {
          // 第 k 時區以 15k° 為中央經線，範圍 15k ± 7.5°（兩端只剩半格）
          const z = i - 12;
          const left = Math.max(-180, z * 15 - 7.5);
          const right = Math.min(180, z * 15 + 7.5);
          const { hour: h } = localTime(hour, z);
          const day = h >= 6 && h < 18;
          return (
            <g key={z}>
              <rect
                x={sx(left)}
                y="40"
                width={sx(right) - sx(left)}
                height="70"
                fill={day ? "#fef3c7" : "#1e3a8a"}
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
              <text
                x={sx((left + right) / 2)}
                y="80"
                fontSize="9"
                textAnchor="middle"
                fill={day ? "#92400e" : "#e0e7ff"}
              >
                {h}
              </text>
            </g>
          );
        })}
        <text x={sx(noon)} y="34" fontSize="16" textAnchor="middle">
          ☀️
        </text>
        <line x1={sx(0)} x2={sx(0)} y1="40" y2="122" stroke="#059669" strokeWidth="2" />
        <text x={sx(0)} y="133" fontSize="9" textAnchor="middle" fill="#047857">
          本初子午線 0°
        </text>
        {[-180, 180].map((l) => (
          <line
            key={l}
            x1={sx(l)}
            x2={sx(l)}
            y1="36"
            y2="122"
            stroke="#e11d48"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        ))}
        <text x={sx(-180) + 2} y="133" fontSize="9" fill="#be123c">
          換日線
        </text>
        <text x={sx(180) - 2} y="133" fontSize="9" textAnchor="end" fill="#be123c">
          換日線
        </text>
        {CITIES.map((c, i) => (
          <g key={c.name}>
            <circle cx={sx(c.lon)} cy="110" r="3.5" fill="#e11d48" stroke="#fff" />
            <line
              x1={sx(c.lon)}
              x2={sx(c.lon)}
              y1="113"
              y2={146 + (i % 3) * 18}
              stroke="#94a3b8"
              strokeWidth="0.6"
            />
            <text
              x={sx(c.lon)}
              y={156 + (i % 3) * 18}
              fontSize="10"
              textAnchor="middle"
              fill="#1e293b"
            >
              {c.name} {pad(localTime(hour, c.tz).hour)}:00
            </text>
          </g>
        ))}
        <polygon points={`${sx(lon)},40 ${sx(lon) - 6},28 ${sx(lon) + 6},28`} fill="#7c3aed" />
        <line x1={sx(lon)} x2={sx(lon)} y1="40" y2="110" stroke="#7c3aed" strokeWidth="2.5" />
        <text x="20" y="16" fontSize="11" fill="#475569">
          西經 180°
        </text>
        <text x="420" y="16" fontSize="11" textAnchor="end" fill="#475569">
          東經 180°
        </text>
        <text x="220" y="16" fontSize="11" textAnchor="middle" fill="#475569">
          黃色＝白天（6～18 時）、深藍＝夜晚
        </text>
      </svg>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <ParamSlider
            label={`臺北時間（${WEEK[TAIPEI_DAY]}）`}
            min={0}
            max={23}
            step={1}
            unit="時"
            value={hour}
            onChange={setHour}
            color="#e11d48"
          />
          <ParamSlider
            label={`紫色經線：${lonText(lon)}`}
            min={-180}
            max={180}
            step={15}
            unit="°"
            value={lon}
            onChange={setLon}
            color="#7c3aed"
          />
        </div>
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
          <p>
            臺北（東經 120° 標準時區，UTC+8）：<strong>{show(hour, 8)}</strong>
          </p>
          <p>
            {lonText(lon)}（UTC{tz >= 0 ? "+" : "−"}
            {Math.abs(tz)}）：<strong>{show(hour, tz)}</strong>
          </p>
          <p className="mt-1 text-slate-500">
            與臺北相差 {Math.abs(tz - 8)} 小時
            {here.dayShift !== 0 && `，日期${here.dayShift < 0 ? "早" : "晚"}一天`}
          </p>
          {Math.abs(lon) === 180 && (
            <p className="mt-1 text-rose-600 dark:text-rose-300">
              180° 經線兩側時刻相同，但日期相差一天：向東越過換日線日期減一天，向西越過加一天。
            </p>
          )}
        </div>
      </div>
      {target ? (
        <div className="space-y-2">
          <p className="text-sm">
            🎯 任務 {task + 1}/{TASKS.length}：臺北是 <strong>{show(hour, 8)}</strong>
            時，哪一條經線的當地時間是 <strong>{show(hour, targetTz)}</strong>？
          </p>
          <button type="button" className="btn-primary" onClick={check}>
            就是這條經線！
          </button>
        </div>
      ) : (
        <Feedback ok>
          🎉 三個任務都完成了！記住：經度每差 15°，時間差 1 小時，東邊的時間比較快。
        </Feedback>
      )}
      {msg && !done && <Feedback ok={msg.ok}>{msg.text}</Feedback>}
    </div>
  );
}
