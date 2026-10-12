import type { SceneProps } from "../../types";

/**
 * 河流與海岸地形（viewBox 0 0 480 320，俯視示意）：
 * 上游 V 形谷 → 河階 → 山麓沖積扇 → 平原曲流 → 河口三角洲；右下角岬角有海蝕平台。
 */
type Pt = [number, number];

/** 沿線段 p→q 的一側，做出距離 d1～d2 的帶狀多邊形（用來畫河階面） */
function band(p: Pt, q: Pt, d1: number, d2: number) {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const o = (pt: Pt, d: number) => `${(pt[0] + nx * d).toFixed(1)},${(pt[1] + ny * d).toFixed(1)}`;
  return `${o(p, d1)} ${o(q, d1)} ${o(q, d2)} ${o(p, d2)}`;
}

const T1: Pt = [104, 66];
const T2: Pt = [166, 120];

/** 沖積扇：扇頂 (170,122)，半徑 80，張角 0°～100° */
const FAN = `M170,122 L250,122 A80,80 0 0,1 ${(170 + 80 * Math.cos((100 * Math.PI) / 180)).toFixed(1)},${(122 + 80 * Math.sin((100 * Math.PI) / 180)).toFixed(1)} Z`;

const GLOW: Record<string, string> = {
  vvalley: "M48,20 L112,60 L100,76 L36,36 Z",
  terrace: `M${band(T1, T2, -26, 26).replace(/ /g, " L")} Z`,
  fan: FAN,
  meander: "M208,170 L300,170 L322,256 L214,256 Z",
  delta: "M290,258 L370,258 L330,302 Z",
  platform: "M408,284 L480,292 L480,314 L406,304 Z",
};

export default function LandformScene({ active }: SceneProps) {
  const glow = active ? GLOW[active] : undefined;
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f0fdf4" />
      {/* 海洋（海岸線繞過三角洲與岬角） */}
      <path
        d="M0,266 C80,258 170,270 296,262 L330,294 L364,262 L404,258 L418,290 L480,298 L480,320 L0,320 Z"
        fill="#bfdbfe"
      />
      {/* 山地 */}
      <path
        d="M0,0 L240,0 L222,40 L196,74 L178,112 L150,128 L96,134 L40,146 L0,156 Z"
        fill="#e7c9a0"
      />
      {[
        [30, 60],
        [80, 22],
        [150, 30],
        [200, 18],
        [40, 115],
        [120, 108],
      ].map(([x, y]) => (
        <polygon
          key={`${x}-${y}`}
          points={`${x},${y - 16} ${x - 15},${y + 8} ${x + 15},${y + 8}`}
          fill="#c08552"
          opacity="0.8"
        />
      ))}
      {/* 河階：河道兩側的階梯狀平坦面 */}
      <polygon points={band(T1, T2, 6, 14)} fill="#fcd34d" opacity="0.85" />
      <polygon points={band(T1, T2, 14, 22)} fill="#fbbf24" opacity="0.85" />
      <polygon points={band(T1, T2, -6, -14)} fill="#fcd34d" opacity="0.85" />
      <polygon points={band(T1, T2, -14, -22)} fill="#fbbf24" opacity="0.85" />
      {/* 沖積扇 */}
      <path d={FAN} fill="#fde68a" opacity="0.95" />
      {[15, 40, 65, 90].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1="170"
            y1="122"
            x2={170 + 74 * Math.cos(r)}
            y2={122 + 74 * Math.sin(r)}
            stroke="#93c5fd"
            strokeWidth="1.2"
          />
        );
      })}
      {/* 河道：V 形谷 → 河階段 → 扇頂 → 曲流 → 河口 */}
      <path
        d="M40,18 L104,66 L166,120 L170,122 C190,140 205,160 215,176 C248,170 258,198 236,206 C214,214 222,236 256,230 C288,224 300,240 330,262"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* V 形谷兩側陡坡 */}
      <path d="M52,16 L108,56 M30,28 L96,74" stroke="#92400e" strokeWidth="1.5" fill="none" />
      {/* 三角洲 */}
      <polygon points="296,262 364,262 330,294" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
      <path
        d="M330,262 L312,274 M330,262 L330,288 M330,262 L348,274"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      {/* 岬角、海蝕崖與海蝕平台 */}
      <polygon points="404,236 480,226 480,298 418,290 404,258" fill="#a8a29e" />
      <path d="M404,258 L418,290 L480,298" stroke="#57534e" strokeWidth="3" fill="none" />
      <polygon points="418,290 480,298 480,310 414,300" fill="#e7e5e4" stroke="#a8a29e" />
      {glow && <path d={glow} fill="#f43f5e" opacity="0.18" stroke="#e11d48" strokeWidth="2" />}
      {/* 小剖面圖示 */}
      <g transform="translate(262 14)">
        <rect x="0" y="0" width="64" height="44" rx="4" fill="#ffffff" stroke="#e2e8f0" />
        <path d="M8,8 L32,32 L56,8" fill="none" stroke="#92400e" strokeWidth="2" />
        <circle cx="32" cy="31" r="2.5" fill="#2563eb" />
        <text x="32" y="56" fontSize="9" textAnchor="middle" fill="#1e293b">
          V 形谷剖面
        </text>
      </g>
      <g transform="translate(344 14)">
        <rect x="0" y="0" width="64" height="44" rx="4" fill="#ffffff" stroke="#e2e8f0" />
        <path
          d="M4,8 L12,8 L14,18 L22,18 L26,32 L38,32 L42,18 L50,18 L52,8 L60,8"
          fill="none"
          stroke="#b45309"
          strokeWidth="2"
        />
        <circle cx="32" cy="31" r="2.5" fill="#2563eb" />
        <text x="32" y="56" fontSize="9" textAnchor="middle" fill="#1e293b">
          河階剖面
        </text>
      </g>
      <text x="340" y="140" fontSize="13" fill="#166534">
        平原
      </text>
      <text x="10" y="96" fontSize="12" fill="#78350f">
        山地
      </text>
      <text x="60" y="300" fontSize="13" fill="#1d4ed8">
        海洋
      </text>
      <text x="470" y="214" fontSize="10" textAnchor="end" fill="#475569">
        河流與海岸地形（示意）
      </text>
    </g>
  );
}
