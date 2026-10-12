import { useState } from "react";
import { Feedback } from "../../../ui";
import type { LabProps } from "../../types";

/**
 * 溫雨圖判讀：看月均溫折線與月雨量長條，判斷氣候類型。
 * 數據為各城市長期月平均的約略值（四捨五入），僅供教學判讀。
 * config.set：「junior」用國中常用的氣候名稱；「senior」用柯本氣候分類。
 */
interface City {
  id: string;
  name: string;
  where: string;
  temp: number[];
  rain: number[];
  junior?: string;
  senior?: string;
  why: string;
}

const CITIES: City[] = [
  {
    id: "singapore",
    name: "新加坡",
    where: "北緯 1°，馬來半島南端",
    temp: [26.7, 27.3, 27.8, 28.3, 28.6, 28.6, 28.2, 28.1, 27.9, 27.9, 27.1, 26.6],
    rain: [240, 115, 170, 155, 170, 135, 155, 165, 130, 160, 255, 300],
    junior: "熱帶雨林氣候",
    senior: "Af",
    why: "全年高溫（每月均溫都在 26°C 以上）、年溫差很小，而且每個月都有 100 公釐以上的雨。",
  },
  {
    id: "mumbai",
    name: "孟買",
    where: "北緯 19°，印度西海岸",
    temp: [24, 25, 27.1, 28.8, 30.2, 29.4, 27.8, 27.4, 27.7, 28.9, 27.8, 25.6],
    rain: [1, 1, 0, 1, 15, 520, 840, 535, 330, 85, 15, 4],
    junior: "熱帶季風氣候",
    why: "全年高溫，但雨量集中在 6～9 月（夏季西南季風帶來水氣），冬半年幾乎不下雨，乾濕季分明。",
  },
  {
    id: "riyadh",
    name: "利雅德",
    where: "北緯 25°，阿拉伯半島內陸",
    temp: [14.5, 17.2, 21.6, 27.1, 32.6, 35.4, 36.8, 36.6, 33.4, 28, 21, 16],
    rain: [12, 8, 20, 25, 6, 0, 0, 0, 0, 2, 8, 12],
    junior: "沙漠氣候",
    senior: "BW",
    why: "年雨量不到 100 公釐，夏季酷熱、氣溫年較差大，蒸發量遠大於降水量。",
  },
  {
    id: "beijing",
    name: "北京",
    where: "北緯 40°，華北平原北緣",
    temp: [-3.1, 0.3, 6.7, 14.8, 20.8, 24.9, 26.7, 25.5, 20.8, 13.7, 5, -0.9],
    rain: [3, 5, 9, 26, 35, 78, 185, 160, 46, 22, 9, 2],
    junior: "溫帶季風氣候",
    why: "夏季高溫多雨、冬季寒冷乾燥（1 月均溫低於 0°C），雨量集中在 7、8 月，是季風影響的「雨熱同季」。",
  },
  {
    id: "taipei",
    name: "臺北",
    where: "北緯 25°，臺灣北部盆地",
    temp: [16.1, 16.6, 18.6, 22.1, 25.4, 28, 29.9, 29.5, 27.8, 24.8, 21.8, 18],
    rain: [95, 165, 175, 175, 250, 330, 240, 320, 360, 150, 95, 75],
    junior: "副熱帶季風氣候",
    senior: "Cfa",
    why: "夏季炎熱、冬季溫和（最冷月約 16°C），全年都有雨；春末夏初的梅雨與夏秋的颱風帶來豐沛雨量。",
  },
  {
    id: "darwin",
    name: "達爾文",
    where: "南緯 12°，澳洲北部",
    temp: [28.5, 28.2, 28.3, 28.3, 27.1, 25.4, 25, 25.8, 27.8, 29.2, 29.5, 29],
    rain: [420, 365, 315, 100, 21, 1, 1, 5, 15, 70, 140, 250],
    senior: "Aw",
    why: "全年高溫（最冷月 25°C），南半球夏季前後（約 12～3 月）是雨季、冬季（5～9 月）非常乾燥，乾濕季分明。",
  },
  {
    id: "rome",
    name: "羅馬",
    where: "北緯 42°，義大利半島西岸",
    temp: [7.5, 8.2, 10.2, 12.6, 17.2, 21.1, 24.1, 24.5, 20.8, 16.4, 11.4, 8.4],
    rain: [67, 73, 58, 81, 53, 34, 19, 37, 73, 113, 115, 81],
    senior: "Cs",
    why: "夏季炎熱乾燥（7 月雨量不到 20 公釐）、冬季溫和多雨，這是「夏乾冬雨」的地中海型氣候。",
  },
  {
    id: "london",
    name: "倫敦",
    where: "北緯 51°，英國東南部",
    temp: [5.8, 6.2, 8.3, 10.9, 14.2, 17.3, 19.4, 19.1, 16.3, 12.6, 8.8, 6.2],
    rain: [56, 41, 37, 44, 49, 45, 46, 50, 49, 69, 59, 55],
    senior: "Cfb",
    why: "冬暖夏涼（最熱月不到 22°C）、年溫差小，全年雨量平均，受西風與北大西洋暖流調節。",
  },
  {
    id: "moscow",
    name: "莫斯科",
    where: "北緯 56°，東歐平原",
    temp: [-6.2, -5.9, -0.7, 6.9, 13.6, 17.3, 19.7, 17.6, 11.9, 5.8, -0.5, -4.4],
    rain: [53, 44, 39, 37, 61, 78, 84, 78, 66, 71, 55, 52],
    senior: "Df",
    why: "冬季嚴寒（最冷月低於 −3°C）、夏季溫暖（最熱月高於 10°C），全年都有降水。",
  },
  {
    id: "utqiagvik",
    name: "烏特恰維克",
    where: "北緯 71°，美國阿拉斯加北岸",
    temp: [-25.4, -27, -25.6, -17.5, -5.9, 2.3, 5, 3.6, -0.5, -9, -17.6, -23.4],
    rain: [4, 4, 4, 5, 5, 9, 25, 25, 17, 12, 6, 5],
    senior: "ET",
    why: "最熱月均溫只有約 5°C（介於 0～10°C），長年嚴寒，只有短暫夏季地表融化，生長苔蘚、地衣。",
  },
];

const SETS: Record<string, { ids: string[]; options: string[]; label: (c: City) => string }> = {
  junior: {
    ids: ["singapore", "mumbai", "riyadh", "beijing", "taipei"],
    options: [
      "熱帶雨林氣候",
      "熱帶季風氣候",
      "沙漠氣候",
      "溫帶季風氣候",
      "副熱帶季風氣候",
      "地中海型氣候",
    ],
    label: (c) => c.junior ?? "",
  },
  senior: {
    ids: ["singapore", "darwin", "riyadh", "rome", "london", "taipei", "moscow", "utqiagvik"],
    options: ["Af", "Aw", "BW", "BS", "Cs", "Cfa", "Cfb", "Dw", "Df", "ET"],
    label: (c) => c.senior ?? "",
  },
};

const NAMES: Record<string, string> = {
  Af: "Af 熱帶雨林",
  Aw: "Aw 熱帶莽原",
  BW: "BW 沙漠",
  BS: "BS 草原",
  Cs: "Cs 地中海型",
  Cfa: "Cfa 溫帶濕潤（夏熱）",
  Cfb: "Cfb 溫帶海洋性",
  Dw: "Dw 冷溫帶冬乾",
  Df: "Df 冷溫帶全年濕潤",
  ET: "ET 苔原",
};

const LETTERS = "ABCDEFGHIJ";
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

export default function ClimateGraphLab({ onComplete, config }: LabProps) {
  const key = config?.set === "senior" ? "senior" : "junior";
  const set = SETS[key];
  const cities = set.ids.map((id) => CITIES.find((c) => c.id === id) as City);
  const [idx, setIdx] = useState(0);
  const [solved, setSolved] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const city = cities[idx];
  const isSolved = solved.includes(city.id);

  const tMax = Math.max(...city.temp);
  const tMin = Math.min(...city.temp);
  const rainTotal = sum(city.rain);
  const rMaxRaw = Math.max(...city.rain);
  const rTop = rMaxRaw <= 200 ? 200 : rMaxRaw <= 400 ? 400 : 900;

  // 圖表座標：x 為 12 個月；左軸氣溫 −30～40°C；右軸雨量 0～rTop
  const L = 44;
  const R = 396;
  const T = 16;
  const B = 196;
  const mx = (i: number) => L + ((i + 0.5) / 12) * (R - L);
  const ty = (t: number) => B - ((t + 30) / 70) * (B - T);
  const ry = (r: number) => B - (r / rTop) * (B - T);
  const bw = ((R - L) / 12) * 0.62;

  const pick = (opt: string) => {
    if (isSolved) return;
    if (opt === set.label(city)) {
      const next = [...solved, city.id];
      setSolved(next);
      setWrong(null);
      if (next.length === cities.length) onComplete();
    } else setWrong(opt);
  };

  const hint = () => {
    // 依柯本的判讀順序：先看是否為寒帶（最熱月），再看是否乾燥
    if (tMin >= 18) return "最冷月均溫有沒有高於 18°C？再看看雨是全年都有，還是集中在某些月份。";
    if (tMax < 10) return "最熱月均溫還不到 10°C，這是很冷的地方。";
    if (rainTotal < 250) return "年雨量非常少，先想想「乾燥」的氣候。";
    if (tMin < -3) return "最冷月很冷（低於 −3°C），再看看冬季降水多不多。";
    return "看看最冷月均溫，以及雨量集中在夏季、冬季，還是全年平均。";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="城市">
        {cities.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={i === idx}
            onClick={() => {
              setIdx(i);
              setWrong(null);
            }}
            className={`rounded-lg border-2 px-3 py-1 text-sm font-semibold ${
              i === idx
                ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40"
                : "border-slate-200 dark:border-slate-700"
            }`}
          >
            {solved.includes(c.id) ? `✓ ${c.name}` : `城市 ${LETTERS[i]}`}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <svg
          viewBox="0 0 440 230"
          className="h-auto w-full rounded-xl bg-white dark:bg-slate-900"
          role="img"
          aria-label={`溫雨圖：最熱月 ${tMax}°C、最冷月 ${tMin}°C、年雨量約 ${rainTotal} 公釐`}
        >
          <rect x="0" y="0" width="440" height="230" fill="#ffffff" />
          {[-30, -20, -10, 0, 10, 20, 30, 40].map((t) => (
            <g key={t}>
              <line x1={L} x2={R} y1={ty(t)} y2={ty(t)} stroke={t === 0 ? "#94a3b8" : "#e2e8f0"} />
              <text x={L - 4} y={ty(t) + 3} fontSize="9" textAnchor="end" fill="#dc2626">
                {t}
              </text>
            </g>
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((k) => (
            <text key={k} x={R + 4} y={ry(rTop * k) + 3} fontSize="9" fill="#2563eb">
              {rTop * k}
            </text>
          ))}
          {city.rain.map((r, i) => (
            <rect
              key={i}
              x={mx(i) - bw / 2}
              y={ry(r)}
              width={bw}
              height={B - ry(r)}
              fill="#60a5fa"
              opacity="0.8"
            />
          ))}
          <path
            d={city.temp.map((t, i) => `${i ? "L" : "M"}${mx(i)},${ty(t)}`).join("")}
            fill="none"
            stroke="#dc2626"
            strokeWidth="2.5"
          />
          {city.temp.map((t, i) => (
            <circle key={i} cx={mx(i)} cy={ty(t)} r="2.5" fill="#dc2626" />
          ))}
          {city.temp.map((_, i) => (
            <text key={i} x={mx(i)} y={B + 13} fontSize="9" textAnchor="middle" fill="#475569">
              {i + 1}
            </text>
          ))}
          <text x="6" y="12" fontSize="9" fill="#dc2626">
            氣溫（°C）
          </text>
          <text x="434" y="12" fontSize="9" textAnchor="end" fill="#2563eb">
            雨量（公釐）
          </text>
          <text x={(L + R) / 2} y="226" fontSize="9" textAnchor="middle" fill="#475569">
            月份
          </text>
        </svg>
        <div className="space-y-3">
          <dl className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-lg bg-rose-50 p-2 dark:bg-rose-950/40">
              <dt className="text-xs">最熱月均溫</dt>
              <dd className="font-mono font-semibold">{tMax}°C</dd>
            </div>
            <div className="rounded-lg bg-sky-50 p-2 dark:bg-sky-950/40">
              <dt className="text-xs">最冷月均溫</dt>
              <dd className="font-mono font-semibold">{tMin}°C</dd>
            </div>
            <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-950/40">
              <dt className="text-xs">氣溫年較差</dt>
              <dd className="font-mono font-semibold">{(tMax - tMin).toFixed(1)}°C</dd>
            </div>
            <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/40">
              <dt className="text-xs">年雨量（約）</dt>
              <dd className="font-mono font-semibold">{rainTotal} 公釐</dd>
            </div>
          </dl>
          <p className="text-xs text-slate-500">位置提示：{city.where}</p>
          <p className="text-sm font-semibold">這是哪一種氣候？</p>
          <div className="grid grid-cols-2 gap-2">
            {set.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => pick(o)}
                disabled={isSolved}
                className={`rounded-lg border-2 px-2 py-1.5 text-sm ${
                  isSolved && o === set.label(city)
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
                    : wrong === o
                      ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40"
                      : "border-slate-200 hover:border-amber-400 dark:border-slate-700"
                }`}
              >
                {key === "senior" ? NAMES[o] : o}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isSolved && (
        <Feedback ok>
          ✓ {city.name}：{key === "senior" ? NAMES[set.label(city)] : set.label(city)}。{city.why}
        </Feedback>
      )}
      {wrong && !isSolved && (
        <Feedback ok={false}>
          不是「{key === "senior" ? NAMES[wrong] : wrong}」喔。{hint()}
        </Feedback>
      )}
      <p className="text-sm">
        🎯 任務：判讀全部 {cities.length} 個城市的氣候類型（已完成 {solved.length}/{cities.length}）
      </p>
      {solved.length === cities.length && (
        <Feedback ok>🎉 全部判讀正確！你已經會用「氣溫＋雨量」兩把鑰匙打開溫雨圖了。</Feedback>
      )}
    </div>
  );
}
