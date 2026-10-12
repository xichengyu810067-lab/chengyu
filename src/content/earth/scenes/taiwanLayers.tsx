import type { SceneProps } from "../../types";

/**
 * 臺灣地質示意圖層（viewBox 0 0 400 420）。
 * 座標約為 x = (經度 − 118.8) × 100、y = (25.8 − 緯度) × 100，僅為示意，非精確地圖。
 */
const TAIWAN =
  "273,50 292,58 320,79 305,105 307,120 296,150 284,182 276,215 266,250 250,285 235,305 222,345 205,390 193,387 190,365 179,343 160,330 147,318 138,300 135,280 135,235 145,205 155,175 172,153 190,125 212,98 230,75 261,62";

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="420" fill="#e0f2fe" />
      <polygon points={TAIWAN} fill="#ecfccb" stroke="#4d7c0f" strokeWidth="2" />
      {/* 澎湖、綠島、蘭嶼、龜山島 */}
      <polygon points="74,218 84,214 88,226 80,232 72,228" fill="#ecfccb" stroke="#4d7c0f" />
      <circle cx="271" cy="316" r="4" fill="#ecfccb" stroke="#4d7c0f" />
      <circle cx="277" cy="376" r="5" fill="#ecfccb" stroke="#4d7c0f" />
      <circle cx="318" cy="96" r="3" fill="#ecfccb" stroke="#4d7c0f" />
      <g fontSize="11" fill="#334155">
        <text x="58" y="248">
          澎湖
        </text>
        <text x="60" y="330">
          臺灣海峽
        </text>
        <text x="330" y="405">
          太平洋
        </text>
        <text x="286" y="384">
          蘭嶼
        </text>
      </g>
      <g fill="#334155">
        <polygon points="370,20 364,36 376,36" />
        <text x="370" y="50" fontSize="11" textAnchor="middle">
          北
        </text>
      </g>
      <text x="8" y="18" fontSize="11" fill="#64748b">
        示意圖
      </text>
    </g>
  );
}

export function Plates(_: SceneProps) {
  return (
    <g>
      <text x="30" y="140" fontSize="16" fontWeight="700" fill="#7c3aed">
        歐亞板塊
      </text>
      <text x="322" y="272" fontSize="15" fontWeight="700" fill="#b45309" textAnchor="middle">
        菲律賓海板塊
      </text>
      {/* 琉球海溝：菲律賓海板塊隱沒到歐亞板塊之下 */}
      <path
        d="M318,232 Q350,200 398,170"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="3"
        strokeDasharray="8 5"
      />
      <text
        x="346"
        y="186"
        fontSize="11"
        fill="#5b21b6"
        stroke="#ffffff"
        strokeWidth="3"
        paintOrder="stroke"
      >
        琉球海溝
      </text>
      {/* 花東縱谷：板塊交界帶 */}
      <line x1="277" y1="180" x2="237" y2="298" stroke="#dc2626" strokeWidth="3.5" />
      <text
        x="296"
        y="205"
        fontSize="11"
        fill="#991b1b"
        stroke="#ffffff"
        strokeWidth="3"
        paintOrder="stroke"
      >
        花東縱谷
      </text>
      {/* 馬尼拉海溝：歐亞板塊隱沒到菲律賓海板塊之下 */}
      <path
        d="M132,345 Q118,382 104,418"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="3"
        strokeDasharray="8 5"
      />
      <text x="40" y="380" fontSize="11" fill="#5b21b6">
        馬尼拉海溝
      </text>
      {/* 菲律賓海板塊往西北移動 */}
      <g stroke="#b45309" fill="#b45309" strokeWidth="3">
        <line x1="392" y1="330" x2="358" y2="300" />
        <polygon points="350,293 366,298 356,308" />
      </g>
      <text x="290" y="345" fontSize="10" fill="#92400e">
        每年約 7～8 公分
      </text>
    </g>
  );
}

const RANGES: { name: string; pts: string; lx: number; ly: number }[] = [
  {
    name: "中央山脈",
    pts: "290,95 272,140 255,200 238,260 220,320 208,372",
    lx: 276,
    ly: 140,
  },
  { name: "雪山山脈", pts: "270,82 250,115 232,150 222,178", lx: 188, ly: 132 },
  { name: "玉山山脈", pts: "232,205 225,240 218,272", lx: 198, ly: 292 },
  { name: "阿里山山脈", pts: "200,200 193,240 186,280", lx: 140, ly: 216 },
  { name: "海岸山脈", pts: "281,195 268,235 253,275", lx: 284, ly: 240 },
];

export function Mountains(_: SceneProps) {
  return (
    <g>
      {RANGES.map((r) => (
        <g key={r.name}>
          <polyline
            points={r.pts}
            fill="none"
            stroke="#a16207"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          <text
            x={r.lx}
            y={r.ly}
            fontSize="10"
            fill="#713f12"
            fontWeight="700"
            stroke="#ffffff"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {r.name}
          </text>
        </g>
      ))}
      {/* 玉山主峰 */}
      <polygon points="225,226 219,238 231,238" fill="#713f12" />
      <text x="234" y="232" fontSize="10" fill="#713f12">
        玉山
      </text>
    </g>
  );
}

const FAULTS: { name: string; pts: string; lx?: number; ly?: number }[] = [
  { name: "山腳斷層", pts: "263,62 254,80", lx: 202, ly: 56 },
  { name: "車籠埔斷層", pts: "190,150 186,175 180,205", lx: 92, ly: 156 },
  { name: "梅山斷層", pts: "165,222 186,226" },
  { name: "新化斷層", pts: "150,285 163,287" },
  { name: "米崙斷層", pts: "288,166 282,184", lx: 296, ly: 160 },
  { name: "池上斷層", pts: "247,270 238,295" },
];

export function Faults(_: SceneProps) {
  return (
    <g>
      {FAULTS.map((f) => (
        <g key={f.name}>
          <polyline
            points={f.pts}
            fill="none"
            stroke="#dc2626"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {f.lx !== undefined && (
            <text
              x={f.lx}
              y={f.ly}
              fontSize="10"
              fill="#991b1b"
              stroke="#ffffff"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {f.name}
            </text>
          )}
        </g>
      ))}
      <text x="70" y="170" fontSize="9" fill="#991b1b">
        （1999 年集集地震）
      </text>
    </g>
  );
}

/** 震央示意：東部與東部外海較密集 */
const QUAKES: [number, number, number][] = [
  [320, 120, 5],
  [335, 135, 4],
  [348, 112, 3],
  [312, 140, 6],
  [328, 160, 4],
  [302, 170, 5],
  [318, 182, 7],
  [296, 196, 4],
  [310, 205, 5],
  [290, 222, 3],
  [305, 232, 4],
  [284, 250, 5],
  [298, 262, 3],
  [272, 278, 4],
  [288, 290, 6],
  [262, 300, 3],
  [280, 318, 4],
  [252, 330, 3],
  [266, 350, 5],
  [342, 196, 3],
  [356, 150, 4],
  [338, 230, 3],
  [262, 150, 3],
  [250, 182, 4],
  [244, 214, 3],
  [258, 236, 4],
  [230, 262, 3],
  [214, 196, 5],
  [200, 232, 3],
  [184, 252, 4],
  [170, 230, 3],
  [160, 296, 3],
  [196, 160, 4],
  [226, 120, 3],
  [212, 340, 3],
  [194, 372, 3],
  [120, 360, 3],
  [140, 400, 4],
];

export function Quakes(_: SceneProps) {
  return (
    <g>
      {QUAKES.map(([x, y, r]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill="#f97316"
          fillOpacity="0.55"
          stroke="#c2410c"
        />
      ))}
    </g>
  );
}
