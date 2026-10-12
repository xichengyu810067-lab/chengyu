import { useState } from "react";
import { Feedback } from "../../../ui";
import { fmt, ParamSlider } from "../../../widgets/kit";
import type { LabProps } from "../../types";

type Kind = "divergent" | "convergent" | "transform";

const KINDS: Kind[] = ["divergent", "convergent", "transform"];

const INFO: Record<Kind, { name: string; motion: string; features: string; example: string }> = {
  divergent: {
    name: "張裂型邊界",
    motion: "兩板塊互相分離，地函物質上升、岩漿冷卻形成新的海洋地殼。",
    features: "中洋脊、裂谷；多淺源地震與火山。新地殼兩側的磁條紋左右對稱。",
    example: "大西洋中洋脊、東非大裂谷",
  },
  convergent: {
    name: "聚合型邊界",
    motion: "兩板塊互相靠近，密度較大的海洋板塊隱沒到另一板塊之下。",
    features: "海溝、火山島弧、造山帶；地震多且震源可深可淺。",
    example: "日本、臺灣東北外海的琉球海溝；大陸碰撞形成喜馬拉雅山",
  },
  transform: {
    name: "錯動型邊界",
    motion: "兩板塊沿邊界水平錯開，地殼不增加也不減少。",
    features: "轉形斷層；多淺源地震，很少有火山。",
    example: "美國加州的聖安地列斯斷層",
  },
};

const SPEED_KM_PER_MYR = 50; // 每年 5 公分 = 每百萬年 50 公里

function Divergent({ t }: { t: number }) {
  const half = t * 6;
  const pairs = Math.ceil(half / 12);
  // 磁條帶跟著板塊往外移：k = 0 是最早生成、離中洋脊最遠的一條，最新的地殼在中洋脊旁
  const stripes = Array.from({ length: pairs }, (_, k) => {
    const w = Math.min(12, half - 12 * k);
    const color = k % 2 === 0 ? "#475569" : "#cbd5e1";
    return (
      <g key={k}>
        <rect x={220 - half + 12 * k} y="100" width={w} height="40" fill={color} />
        <rect x={220 + half - 12 * k - w} y="100" width={w} height="40" fill={color} />
      </g>
    );
  });
  return (
    <g>
      <rect x="0" y="0" width="440" height="100" fill="#bfdbfe" />
      <rect x="0" y="140" width="440" height="120" fill="#fed7aa" />
      <rect x="0" y="100" width={220 - half} height="40" fill="#94a3b8" />
      <rect x={220 + half} y="100" width={220 - half} height="40" fill="#94a3b8" />
      {stripes}
      {/* 中洋脊 */}
      <polygon points="200,100 212,88 220,95 228,88 240,100" fill="#64748b" />
      {/* 岩漿上升與對流 */}
      <path d="M220,250 L220,112" stroke="#dc2626" strokeWidth="6" strokeDasharray="10 6" />
      <polygon points="212,118 228,118 220,104" fill="#dc2626" />
      <path d="M210,175 Q150,160 80,175" fill="none" stroke="#c2410c" strokeWidth="2" />
      <polygon points="80,169 80,181 70,175" fill="#c2410c" />
      <path d="M230,175 Q290,160 360,175" fill="none" stroke="#c2410c" strokeWidth="2" />
      <polygon points="360,169 360,181 370,175" fill="#c2410c" />
      {/* 板塊上的參考點 */}
      <circle cx={150 - half} cy="120" r="6" fill="#facc15" stroke="#1e293b" />
      <circle cx={290 + half} cy="120" r="6" fill="#facc15" stroke="#1e293b" />
      <g fontSize="12" fill="#1e293b">
        <text x="20" y="40">
          ← 板塊
        </text>
        <text x="370" y="40">
          板塊 →
        </text>
        <text x="186" y="80">
          中洋脊
        </text>
        <text x="20" y="232">
          軟流圈
        </text>
        <text x="20" y="88">
          海水
        </text>
      </g>
    </g>
  );
}

function Convergent({ t }: { t: number }) {
  const s = 110 + t * 18;
  const cos = 0.848;
  const sin = 0.53;
  const onSlab = s > 250;
  const mx = onSlab ? 250 + cos * (s - 250) : s;
  const my = onSlab ? 110 + sin * (s - 250) : 110;
  const ang = onSlab ? 32 : 0;
  return (
    <g>
      <rect x="0" y="0" width="440" height="110" fill="#bfdbfe" />
      <rect x="0" y="110" width="440" height="150" fill="#fed7aa" />
      {/* 海洋板塊與隱沒的板塊 */}
      <polygon points="0,110 250,110 470,248 458,267 238,132 0,132" fill="#94a3b8" />
      {/* 大陸板塊 */}
      <polygon
        points="262,108 282,86 322,82 334,58 340,46 346,58 358,82 440,82 440,226 262,116"
        fill="#d6d3d1"
        stroke="#57534e"
      />
      {/* 隱沒帶地震（震源沿隱沒板塊由淺而深） */}
      {[
        [296, 158],
        [336, 184],
        [376, 209],
        [416, 234],
      ].map(([x, y]) => (
        <text key={x} x={x} y={y} fontSize="13" fill="#b91c1c">
          ✶
        </text>
      ))}
      {/* 岩漿上升到火山 */}
      <path d="M338,164 C330,130 348,100 340,52" fill="none" stroke="#dc2626" strokeWidth="4" />
      <ellipse cx="337" cy="150" rx="8" ry="5" fill="#dc2626" />
      <circle cx="340" cy="42" r="5" fill="#f97316" />
      {/* 海山（隨板塊移動） */}
      <g transform={`translate(${mx} ${my}) rotate(${ang})`}>
        <polygon points="-10,0 0,-12 10,0" fill="#facc15" stroke="#1e293b" />
      </g>
      <g fontSize="12" fill="#1e293b">
        <text x="20" y="40">
          海洋板塊 →
        </text>
        <text x="372" y="104">
          大陸板塊
        </text>
        <text x="226" y="100">
          海溝
        </text>
        <text x="352" y="44">
          火山
        </text>
        <text x="20" y="232">
          軟流圈
        </text>
        <text x="300" y="250" fontSize="11">
          隱沒的板塊
        </text>
      </g>
    </g>
  );
}

function Transform({ t }: { t: number }) {
  const d = t * 5;
  return (
    <g>
      <rect x="0" y="0" width="440" height="260" fill="#ecfccb" />
      <rect x="0" y="0" width="220" height="260" fill="#d9f99d" opacity="0.6" />
      <line
        x1="220"
        y1="0"
        x2="220"
        y2="260"
        stroke="#dc2626"
        strokeWidth="3"
        strokeDasharray="8 5"
      />
      {/* 道路被錯開（右移斷層，與聖安地列斯斷層相同：從一側看，對面往右移） */}
      <line x1="20" y1={130 - d} x2="220" y2={130 - d} stroke="#475569" strokeWidth="10" />
      <line x1="220" y1={130 + d} x2="420" y2={130 + d} stroke="#475569" strokeWidth="10" />
      <line
        x1="20"
        y1={130 - d}
        x2="220"
        y2={130 - d}
        stroke="#f8fafc"
        strokeWidth="1.5"
        strokeDasharray="8 8"
      />
      <line
        x1="220"
        y1={130 + d}
        x2="420"
        y2={130 + d}
        stroke="#f8fafc"
        strokeWidth="1.5"
        strokeDasharray="8 8"
      />
      {/* 移動方向 */}
      <g stroke="#1e293b" fill="#1e293b" strokeWidth="3">
        <line x1="110" y1="250" x2="110" y2="212" />
        <polygon points="102,214 118,214 110,200" />
        <line x1="330" y1="40" x2="330" y2="78" />
        <polygon points="322,76 338,76 330,90" />
      </g>
      {[60, 200, 240].map((y) => (
        <text key={y} x="214" y={y} fontSize="13" fill="#b91c1c">
          ✶
        </text>
      ))}
      <g fontSize="12" fill="#1e293b">
        <text x="30" y="24">
          板塊甲（俯視圖）
        </text>
        <text x="300" y="24">
          板塊乙
        </text>
        <text x="228" y="252">
          斷層（板塊交界）
        </text>
      </g>
    </g>
  );
}

/** 板塊邊界：選擇邊界類型，拉動時間觀察板塊如何移動 */
export default function PlateBoundaryLab({ onComplete }: LabProps) {
  const [kind, setKind] = useState<Kind>("divergent");
  const [t, setT] = useState(0);
  const [seen, setSeen] = useState<Kind[]>([]);
  const [done, setDone] = useState(false);
  const info = INFO[kind];

  const change = (v: number) => {
    setT(v);
    if (v >= 6 && !seen.includes(kind)) {
      const next = [...seen, kind];
      setSeen(next);
      if (next.length === KINDS.length && !done) {
        setDone(true);
        onComplete();
      }
    }
  };

  const pick = (k: Kind) => {
    setKind(k);
    setT(0);
  };

  return (
    <div className="space-y-4">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">選擇板塊邊界類型</legend>
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            className={k === kind ? "btn-primary" : "btn-ghost"}
            aria-pressed={k === kind}
            onClick={() => pick(k)}
          >
            {seen.includes(k) ? "✓ " : ""}
            {INFO[k].name}
          </button>
        ))}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <svg
          viewBox="0 0 440 260"
          className="h-auto w-full rounded-xl border border-slate-200 bg-white dark:border-slate-700"
          role="img"
          aria-label={`${info.name}示意圖，經過 ${t} 百萬年`}
        >
          {kind === "divergent" && <Divergent t={t} />}
          {kind === "convergent" && <Convergent t={t} />}
          {kind === "transform" && <Transform t={t} />}
        </svg>
        <div className="space-y-3 text-sm">
          <ParamSlider
            label="經過時間"
            min={0}
            max={10}
            step={0.5}
            unit="百萬年"
            value={t}
            onChange={change}
            color="#0f766e"
          />
          <p className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
            板塊每年約移動 5 公分，{fmt(t, 1)} 百萬年可移動約{" "}
            <strong>{fmt(t * SPEED_KM_PER_MYR, 0)} 公里</strong>。
          </p>
          <div className="space-y-1">
            <p className="font-semibold">{info.name}</p>
            <p>{info.motion}</p>
            <p>地形與現象：{info.features}</p>
            <p>例子：{info.example}</p>
          </div>
        </div>
      </div>
      <p className="text-sm">
        🎯 任務：三種邊界都要看一次，並把時間拉到 <strong>6 百萬年以上</strong>
        觀察板塊的變化（已完成 {seen.length}/3）。
      </p>
      {done && (
        <Feedback ok>
          🎉 完成！張裂型「生出」新地殼、聚合型讓地殼「隱沒或擠高」、錯動型則是「水平錯開」。
        </Feedback>
      )}
    </div>
  );
}
