import type { SceneProps } from "../../types";

/**
 * 大氣垂直結構圖層（viewBox 0 0 400 320）。
 * 高度 0～120 公里對應 y = 300～20；溫度 −100～40°C 對應 x = 150～390。示意圖。
 */
const ay = (km: number) => 300 - (km * 280) / 120;
const tx = (c: number) => 150 + ((c + 100) * 240) / 140;

const BANDS = [
  { name: "對流層", from: 0, to: 12, fill: "#dbeafe", range: "0～約 12 km" },
  { name: "平流層", from: 12, to: 50, fill: "#e0e7ff", range: "約 12～50 km" },
  { name: "中氣層", from: 50, to: 85, fill: "#ede9fe", range: "約 50～85 km" },
  { name: "增溫層", from: 85, to: 120, fill: "#fae8ff", range: "約 85 km 以上" },
];

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="320" fill="#f8fafc" />
      {BANDS.map((b) => (
        <g key={b.name}>
          <rect x="0" y={ay(b.to)} width="400" height={ay(b.from) - ay(b.to)} fill={b.fill} />
          <text
            x="8"
            y={ay(b.to) + (ay(b.from) - ay(b.to)) / 2}
            fontSize="13"
            fontWeight="700"
            fill="#1e293b"
          >
            {b.name}
          </text>
          <text x="8" y={ay(b.to) + (ay(b.from) - ay(b.to)) / 2 + 14} fontSize="10" fill="#475569">
            {b.range}
          </text>
        </g>
      ))}
      {[12, 50, 85].map((h) => (
        <line
          key={h}
          x1="0"
          x2="400"
          y1={ay(h)}
          y2={ay(h)}
          stroke="#64748b"
          strokeDasharray="5 4"
        />
      ))}
      {/* 高度軸 */}
      <line x1="146" y1={ay(0)} x2="146" y2={ay(120)} stroke="#475569" />
      {[0, 20, 40, 60, 80, 100, 120].map((h) => (
        <g key={h}>
          <line x1="142" x2="146" y1={ay(h)} y2={ay(h)} stroke="#475569" />
          <text x="138" y={ay(h) + 3} fontSize="9" textAnchor="end" fill="#475569">
            {h}
          </text>
        </g>
      ))}
      <text x="112" y="14" fontSize="10" fill="#475569">
        高度（km）
      </text>
      {/* 溫度軸 */}
      <line x1="150" y1="300" x2="390" y2="300" stroke="#475569" />
      {[-100, -50, 0, 40].map((c) => (
        <text key={c} x={tx(c)} y="314" fontSize="9" textAnchor="middle" fill="#475569">
          {c}°C
        </text>
      ))}
    </g>
  );
}

const PROFILE: [number, number][] = [
  [15, 0],
  [-56, 12],
  [-56, 20],
  [-2, 48],
  [-2, 52],
  [-90, 85],
  [-85, 95],
  [-60, 104],
  [-20, 110],
  [38, 116],
];

export function Temperature(_: SceneProps) {
  return (
    <g>
      <polyline
        points={PROFILE.map(([c, h]) => `${tx(c).toFixed(1)},${ay(h).toFixed(1)}`).join(" ")}
        fill="none"
        stroke="#dc2626"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon
        points={`${tx(38)},${ay(116) - 8} ${tx(38) - 5},${ay(116)} ${tx(38) + 5},${ay(116)}`}
        fill="#dc2626"
      />
      <g fontSize="10" fill="#991b1b">
        <text x={tx(15) + 4} y={ay(0) - 4}>
          15°C
        </text>
        <text x={tx(-56) + 6} y={ay(16)}>
          約 −56°C
        </text>
        <text x={tx(-2) + 6} y={ay(50) + 14}>
          約 0°C
        </text>
        <text x={tx(-90) + 12} y={ay(85) - 6}>
          約 −90°C（最冷）
        </text>
        <text x={tx(-20) - 70} y={ay(118)}>
          往上可達上千 °C
        </text>
      </g>
    </g>
  );
}

export function Ozone(_: SceneProps) {
  return (
    <g>
      <rect
        x="150"
        y={ay(35)}
        width="240"
        height={ay(15) - ay(35)}
        fill="#4ade80"
        opacity="0.35"
        rx="8"
      />
      <text x="262" y={ay(26)} fontSize="11" fontWeight="700" fill="#166534">
        臭氧層：吸收紫外線
      </text>
    </g>
  );
}

export function Weather(_: SceneProps) {
  return (
    <g>
      {/* 積雨雲（雲頂接近對流層頂，呈砧狀） */}
      <path
        d="M187,298 C182,290 190,285 196,287 L198,279 C192,277 191,272 197,271 L246,270 C248,273 240,275 228,277 L215,279 L216,287 C223,285 229,291 224,298 Z"
        fill="#ffffff"
        stroke="#64748b"
      />
      {/* 客機 */}
      <g transform={`translate(330 ${ay(11)})`} fill="#334155">
        <rect x="-12" y="-1.5" width="24" height="3" rx="1.5" />
        <polygon points="-2,-1 4,-1 -4,-8" />
        <polygon points="-2,1 4,1 -4,8" />
      </g>
    </g>
  );
}

export function Upper(_: SceneProps) {
  return (
    <g>
      {/* 流星 */}
      <line x1="300" y1={ay(84)} x2="272" y2={ay(74)} stroke="#f59e0b" strokeWidth="3" />
      <circle cx="272" cy={ay(74)} r="3" fill="#f59e0b" />
      <text x="282" y={ay(70)} fontSize="10" fill="#92400e">
        流星（約 80 km）
      </text>
      {/* 極光 */}
      <path
        d={`M300,${ay(100)} q15,-12 30,0 t30,0 t30,0`}
        fill="none"
        stroke="#22c55e"
        strokeWidth="5"
        opacity="0.8"
      />
      <path
        d={`M300,${ay(106)} q15,-12 30,0 t30,0 t30,0`}
        fill="none"
        stroke="#16a34a"
        strokeWidth="3"
        opacity="0.6"
      />
      <text x="318" y={ay(95)} fontSize="10" fill="#166534">
        極光
      </text>
      <text x="302" y={ay(90)} fontSize="9" fill="#166534">
        約 100 km 以上
      </text>
    </g>
  );
}
