import type { SceneProps } from "../../types";

/**
 * 臺灣示意地圖圖層（viewBox 0 0 300 400）。
 * 以經緯度換算畫面座標（等距圓柱、經度方向乘上 cos 23.5°），只求形狀大致正確。
 */
const X = (lon: number) => 55 + (lon - 119.9) * 96;
const Y = (lat: number) => 18 + (25.32 - lat) * 105;
type LL = [number, number];
const pts = (list: LL[]) =>
  list.map(([lon, lat]) => `${X(lon).toFixed(1)},${Y(lat).toFixed(1)}`).join(" ");
const line = (list: LL[]) =>
  list.map(([lon, lat], i) => `${i ? "L" : "M"}${X(lon).toFixed(1)},${Y(lat).toFixed(1)}`).join("");

/** 臺灣本島海岸線（由富貴角順時針） */
const COAST: LL[] = [
  [121.535, 25.3],
  [121.64, 25.23],
  [121.69, 25.2],
  [121.75, 25.15],
  [121.92, 25.12],
  [122.0, 25.01],
  [121.86, 24.86],
  [121.83, 24.7],
  [121.87, 24.59],
  [121.8, 24.45],
  [121.67, 24.22],
  [121.62, 23.98],
  [121.52, 23.6],
  [121.38, 23.1],
  [121.16, 22.76],
  [121.0, 22.6],
  [120.9, 22.35],
  [120.88, 22.2],
  [120.85, 21.9],
  [120.73, 21.93],
  [120.7, 22.12],
  [120.62, 22.3],
  [120.55, 22.4],
  [120.45, 22.46],
  [120.27, 22.6],
  [120.18, 22.9],
  [120.15, 23.0],
  [120.03, 23.1],
  [120.1, 23.27],
  [120.14, 23.45],
  [120.2, 23.78],
  [120.33, 23.97],
  [120.42, 24.07],
  [120.5, 24.28],
  [120.67, 24.49],
  [120.85, 24.7],
  [120.92, 24.85],
  [121.05, 24.98],
  [121.15, 25.08],
  [121.3, 25.13],
  [121.41, 25.18],
  [121.5, 25.26],
];

const PENGHU: LL[] = [
  [119.55, 23.7],
  [119.66, 23.66],
  [119.7, 23.55],
  [119.6, 23.5],
  [119.52, 23.58],
];

/** 主要山地範圍（約 1,000 公尺以上，示意） */
const MOUNTAIN_BELT: LL[] = [
  [121.62, 24.88],
  [121.75, 24.62],
  [121.68, 24.35],
  [121.55, 24.05],
  [121.45, 23.8],
  [121.32, 23.5],
  [121.2, 23.2],
  [121.07, 22.9],
  [120.98, 22.6],
  [120.9, 22.3],
  [120.83, 22.05],
  [120.75, 22.1],
  [120.68, 22.4],
  [120.62, 22.7],
  [120.6, 23.0],
  [120.55, 23.3],
  [120.62, 23.6],
  [120.78, 23.88],
  [120.86, 24.15],
  [120.96, 24.45],
  [121.15, 24.68],
  [121.38, 24.82],
];

const COASTAL_RANGE: LL[] = [
  [121.58, 23.93],
  [121.48, 23.62],
  [121.36, 23.28],
  [121.24, 22.98],
  [121.17, 22.8],
  [121.22, 22.82],
  [121.36, 23.1],
  [121.5, 23.58],
  [121.6, 23.95],
];

function Label({
  x,
  y,
  text,
  size = 10,
  color = "#1e293b",
  anchor = "middle",
  bg = false,
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
  /** 在文字後方加白底，避免和線條重疊 */
  bg?: boolean;
}) {
  // 估算字寬：中文約 1 個字級、其他字元約 0.6 個字級
  const w = [...text].reduce((t, ch) => t + (/[\u4e00-\u9fff]/.test(ch) ? size : size * 0.6), 0);
  const left = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
  const label = (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      textAnchor={anchor}
      stroke="#ffffff"
      strokeWidth="3"
      paintOrder="stroke"
    >
      {text}
    </text>
  );
  if (!bg) return label;
  return (
    <g>
      <rect
        x={left - 2}
        y={y - size}
        width={w + 4}
        height={size + 4}
        rx="2"
        fill="#ffffff"
        opacity="0.9"
      />
      {label}
    </g>
  );
}

/** 直書文字（逐字往下排） */
function VText({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="11" fill="#0369a1" textAnchor="middle">
      {[...text].map((ch, i) => (
        <tspan key={i} x={x} y={y + i * 14}>
          {ch}
        </tspan>
      ))}
    </text>
  );
}

/** 底圖：海洋、本島輪廓、澎湖、北回歸線、方位與比例尺 */
export function Base(_: SceneProps) {
  const tropic = Y(23.44);
  return (
    <g>
      <rect x="0" y="0" width="300" height="400" fill="#e0f2fe" />
      <polygon points={pts(COAST)} fill="#fef9c3" stroke="#475569" strokeWidth="1.5" />
      <polygon points={pts(PENGHU)} fill="#fef9c3" stroke="#475569" strokeWidth="1" />
      <line
        x1="0"
        x2="300"
        y1={tropic}
        y2={tropic}
        stroke="#e11d48"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      <Label x={296} y={tropic - 4} text="北回歸線" size={9} color="#be123c" anchor="end" />
      <Label x={X(119.62)} y={Y(23.82)} text="澎湖" size={9} />
      <VText x={30} y={110} text="臺灣海峽" />
      <VText x={276} y={300} text="太平洋" />
      <text x="150" y="396" fontSize="10" fill="#0369a1" textAnchor="middle">
        巴士海峽
      </text>
      <g transform="translate(272 32)">
        <polygon points="0,-16 6,2 0,-3 -6,2" fill="#1e293b" />
        <text x="0" y="15" textAnchor="middle" fontSize="11" fill="#1e293b">
          N
        </text>
      </g>
      <g transform="translate(12 382)">
        <rect x="0" y="0" width="47" height="4" fill="#1e293b" />
        <rect x="0" y="0" width="23.5" height="4" fill="#ffffff" stroke="#1e293b" />
        <text x="0" y="-3" fontSize="9" fill="#1e293b">
          0
        </text>
        <text x="47" y="-3" fontSize="9" fill="#1e293b" textAnchor="middle">
          50 公里
        </text>
      </g>
      <text x="8" y="16" fontSize="12" fontWeight="700" fill="#1e293b">
        臺灣示意圖
      </text>
    </g>
  );
}

/** 山脈：五大山脈稜線與最高峰 */
export function Mountains(_: SceneProps) {
  const ridges: { name: string; color: string; path: LL[]; at: LL }[] = [
    {
      name: "中央山脈",
      color: "#7c2d12",
      path: [
        [121.62, 24.6],
        [121.42, 24.3],
        [121.3, 23.95],
        [121.2, 23.6],
        [121.05, 23.2],
        [120.92, 22.75],
        [120.84, 22.2],
      ],
      at: [121.42, 24.08],
    },
    {
      name: "雪山山脈",
      color: "#9a3412",
      path: [
        [121.82, 24.96],
        [121.55, 24.72],
        [121.23, 24.38],
        [121.0, 24.08],
      ],
      at: [121.42, 24.78],
    },
    {
      name: "玉山山脈",
      color: "#b45309",
      path: [
        [121.0, 23.78],
        [120.96, 23.47],
        [120.82, 23.05],
      ],
      at: [120.99, 23.12],
    },
    {
      name: "阿里山山脈",
      color: "#a16207",
      path: [
        [120.82, 23.78],
        [120.72, 23.48],
        [120.62, 23.1],
      ],
      at: [120.56, 23.62],
    },
    {
      name: "海岸山脈",
      color: "#854d0e",
      path: [
        [121.56, 23.9],
        [121.45, 23.55],
        [121.3, 23.15],
        [121.19, 22.82],
      ],
      at: [121.8, 23.12],
    },
  ];
  return (
    <g>
      <polygon points={pts(MOUNTAIN_BELT)} fill="#d6a46b" opacity="0.75" />
      <polygon points={pts(COASTAL_RANGE)} fill="#d6a46b" opacity="0.75" />
      {ridges.map((r) => (
        <g key={r.name}>
          <path
            d={line(r.path)}
            fill="none"
            stroke={r.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 5"
          />
          <Label x={X(r.at[0])} y={Y(r.at[1])} text={r.name} size={9} color={r.color} />
        </g>
      ))}
      <polygon
        points={`${X(120.957)},${Y(23.47) - 6} ${X(120.957) - 5},${Y(23.47) + 3} ${X(120.957) + 5},${Y(23.47) + 3}`}
        fill="#7f1d1d"
      />
      <Label x={X(120.957) + 6} y={Y(23.47) + 4} text="玉山 3,952" size={9} anchor="start" bg />
      <polygon
        points={`${X(121.231)},${Y(24.383) - 6} ${X(121.231) - 5},${Y(24.383) + 3} ${X(121.231) + 5},${Y(24.383) + 3}`}
        fill="#7f1d1d"
      />
      <Label x={X(121.231) - 6} y={Y(24.383) + 4} text="雪山 3,886" size={9} anchor="end" bg />
    </g>
  );
}

/** 平原、盆地與縱谷 */
export function Plains(_: SceneProps) {
  const areas: { name: string; at: LL; rx: number; ry: number; rot?: number }[] = [
    { name: "臺北盆地", at: [121.52, 25.04], rx: 10, ry: 7 },
    { name: "蘭陽平原", at: [121.76, 24.72], rx: 9, ry: 9 },
    { name: "臺中盆地", at: [120.7, 24.15], rx: 8, ry: 13 },
    { name: "埔里盆地", at: [120.96, 23.97], rx: 5, ry: 5 },
    { name: "嘉南平原", at: [120.3, 23.4], rx: 16, ry: 40, rot: -12 },
    { name: "屏東平原", at: [120.52, 22.62], rx: 9, ry: 18 },
  ];
  return (
    <g>
      {areas.map((a) => (
        <g key={a.name}>
          <ellipse
            cx={X(a.at[0])}
            cy={Y(a.at[1])}
            rx={a.rx}
            ry={a.ry}
            fill="#86efac"
            opacity="0.85"
            transform={a.rot ? `rotate(${a.rot} ${X(a.at[0])} ${Y(a.at[1])})` : undefined}
          />
          <Label x={X(a.at[0])} y={Y(a.at[1]) + 3} text={a.name} size={9} color="#14532d" />
        </g>
      ))}
      <path
        d={line([
          [121.58, 23.97],
          [121.42, 23.5],
          [121.27, 23.1],
          [121.15, 22.8],
        ])}
        fill="none"
        stroke="#4ade80"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <Label
        x={X(121.48) + 10}
        y={Y(23.3)}
        text="花東縱谷"
        size={9}
        color="#14532d"
        anchor="start"
      />
    </g>
  );
}

/** 主要河川 */
export function Rivers(_: SceneProps) {
  const rivers: { name: string; path: LL[]; at: LL; anchor?: "start" | "end" }[] = [
    {
      name: "淡水河",
      path: [
        [121.41, 25.17],
        [121.47, 25.08],
        [121.42, 24.95],
        [121.35, 24.8],
      ],
      at: [121.3, 25.22],
      anchor: "end",
    },
    {
      name: "大甲溪",
      path: [
        [120.55, 24.33],
        [120.75, 24.27],
        [120.95, 24.25],
        [121.2, 24.3],
      ],
      at: [120.6, 24.4],
      anchor: "end",
    },
    {
      name: "濁水溪",
      path: [
        [120.24, 23.85],
        [120.55, 23.82],
        [120.8, 23.78],
        [121.0, 23.9],
        [121.2, 24.05],
      ],
      at: [120.42, 23.9],
      anchor: "end",
    },
    {
      name: "曾文溪",
      path: [
        [120.08, 23.06],
        [120.35, 23.15],
        [120.55, 23.25],
        [120.75, 23.42],
      ],
      at: [120.3, 23.08],
      anchor: "start",
    },
    {
      name: "高屏溪",
      path: [
        [120.43, 22.5],
        [120.48, 22.7],
        [120.6, 22.95],
        [120.8, 23.2],
        [120.93, 23.42],
      ],
      at: [120.38, 22.75],
      anchor: "end",
    },
    {
      name: "蘭陽溪",
      path: [
        [121.83, 24.72],
        [121.6, 24.55],
        [121.4, 24.45],
      ],
      at: [121.7, 24.52],
      anchor: "start",
    },
    {
      name: "秀姑巒溪",
      path: [
        [121.22, 23.12],
        [121.33, 23.33],
        [121.4, 23.45],
        [121.5, 23.48],
      ],
      at: [121.6, 23.55],
      anchor: "start",
    },
  ];
  return (
    <g>
      {rivers.map((r) => (
        <g key={r.name}>
          <path
            d={line(r.path)}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Label
            x={X(r.at[0])}
            y={Y(r.at[1])}
            text={r.name}
            size={9}
            color="#1d4ed8"
            anchor={r.anchor}
          />
        </g>
      ))}
    </g>
  );
}

/** 主要都市（六都以較大圓點表示） */
export function Cities(_: SceneProps) {
  const cities: { name: string; at: LL; big?: boolean; anchor?: "start" | "middle" | "end" }[] = [
    { name: "臺北", at: [121.56, 25.04], big: true, anchor: "start" },
    { name: "新北", at: [121.46, 25.01], big: true, anchor: "middle" },
    { name: "基隆", at: [121.74, 25.13], anchor: "start" },
    { name: "桃園", at: [121.3, 24.99], big: true, anchor: "end" },
    { name: "新竹", at: [120.97, 24.8], anchor: "end" },
    { name: "臺中", at: [120.68, 24.15], big: true, anchor: "end" },
    { name: "嘉義", at: [120.45, 23.48], anchor: "end" },
    { name: "臺南", at: [120.21, 23.0], big: true, anchor: "end" },
    { name: "高雄", at: [120.31, 22.63], big: true, anchor: "end" },
    { name: "宜蘭", at: [121.75, 24.75], anchor: "start" },
    { name: "花蓮", at: [121.6, 23.98], anchor: "start" },
    { name: "臺東", at: [121.15, 22.76], anchor: "start" },
  ];
  return (
    <g>
      {cities.map((c) => (
        <g key={c.name}>
          <circle
            cx={X(c.at[0])}
            cy={Y(c.at[1])}
            r={c.big ? 5 : 3.5}
            fill={c.big ? "#7c3aed" : "#a78bfa"}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <Label
            x={X(c.at[0]) + (c.anchor === "end" ? -7 : c.anchor === "middle" ? 0 : 7)}
            y={Y(c.at[1]) + (c.anchor === "middle" ? 16 : 4)}
            text={c.name}
            size={10}
            color="#4c1d95"
            anchor={c.anchor}
          />
        </g>
      ))}
    </g>
  );
}

/** 年雨量多寡（示意）：山地與東北部多雨，西部沿海與澎湖較少 */
export function Rainfall(_: SceneProps) {
  const westCoast: LL[] = [
    [120.42, 24.07],
    [120.33, 23.97],
    [120.2, 23.78],
    [120.14, 23.45],
    [120.1, 23.27],
    [120.03, 23.1],
    [120.15, 23.0],
    [120.18, 22.9],
    [120.27, 22.6],
    [120.42, 22.75],
    [120.4, 23.1],
    [120.38, 23.5],
    [120.45, 23.85],
    [120.55, 24.05],
  ];
  const northeast: LL[] = [
    [121.55, 25.22],
    [121.75, 25.15],
    [121.92, 25.12],
    [122.0, 25.01],
    [121.86, 24.86],
    [121.83, 24.7],
    [121.87, 24.59],
    [121.62, 24.7],
    [121.5, 24.95],
  ];
  return (
    <g>
      <polygon points={pts(COAST)} fill="#93c5fd" opacity="0.6" />
      <polygon points={pts(MOUNTAIN_BELT)} fill="#1d4ed8" opacity="0.7" />
      <polygon points={pts(northeast)} fill="#1d4ed8" opacity="0.7" />
      <polygon points={pts(westCoast)} fill="#fde68a" opacity="0.95" />
      <polygon points={pts(PENGHU)} fill="#fde68a" />
      <Label x={X(121.2)} y={Y(23.75)} text="多雨" size={11} color="#1e3a8a" />
      <Label x={X(121.82)} y={Y(24.9)} text="多雨" size={10} color="#1e3a8a" anchor="end" />
      <Label x={X(120.23)} y={Y(23.35)} text="較少" size={10} color="#92400e" />
    </g>
  );
}

/** 人口密度（示意）：集中在西部平原與都會區 */
export function Population(_: SceneProps) {
  const westPlain: LL[] = [
    [121.41, 25.18],
    [121.3, 25.13],
    [121.05, 24.98],
    [120.92, 24.85],
    [120.85, 24.7],
    [120.67, 24.49],
    [120.5, 24.28],
    [120.42, 24.07],
    [120.2, 23.78],
    [120.1, 23.27],
    [120.03, 23.1],
    [120.27, 22.6],
    [120.45, 22.46],
    [120.6, 22.5],
    [120.58, 22.9],
    [120.52, 23.3],
    [120.6, 23.7],
    [120.78, 24.1],
    [120.95, 24.55],
    [121.2, 24.85],
    [121.5, 25.0],
  ];
  const hubs: { at: LL; r: number }[] = [
    { at: [121.5, 25.03], r: 16 },
    { at: [121.28, 24.98], r: 9 },
    { at: [120.98, 24.8], r: 7 },
    { at: [120.67, 24.15], r: 12 },
    { at: [120.22, 23.0], r: 9 },
    { at: [120.32, 22.64], r: 12 },
  ];
  return (
    <g>
      <polygon points={pts(westPlain)} fill="#fb923c" opacity="0.55" />
      {hubs.map((h, i) => (
        <circle key={i} cx={X(h.at[0])} cy={Y(h.at[1])} r={h.r} fill="#dc2626" opacity="0.75" />
      ))}
      <Label x={X(121.15)} y={Y(23.6)} text="地廣人稀" size={10} color="#475569" />
      <Label x={X(120.3)} y={Y(23.6)} text="稠密" size={10} color="#9a3412" />
    </g>
  );
}
