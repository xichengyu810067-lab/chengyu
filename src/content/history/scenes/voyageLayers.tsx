import type { SceneProps } from "../../types";

/**
 * 大航海時代通往東亞的航線（viewBox 0 0 480 280，示意圖、非精確比例）
 * 經度 −30°～270°（美洲西岸畫在最右側）、緯度 60°N～45°S，等距投影。
 */
type LL = [number, number];

const px = ([lon, lat]: LL): [number, number] => [(lon + 30) * 1.6, (60 - lat) * (280 / 105)];
const pts = (list: LL[]) =>
  list
    .map(px)
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
const path = (list: LL[]) =>
  list
    .map(px)
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join("");

const EUROPE: LL[] = [
  [-10, 36],
  [-9, 43],
  [-2, 44],
  [-4, 48],
  [2, 51],
  [5, 53],
  [8, 57],
  [5, 60],
  [42, 60],
  [42, 42],
  [30, 41],
  [26, 40],
  [23, 36],
  [20, 40],
  [16, 38],
  [12, 44],
  [8, 44],
  [3, 42],
  [-1, 36],
  [-6, 36],
];

const AFRICA: LL[] = [
  [-6, 36],
  [10, 37],
  [11, 33],
  [20, 31],
  [32, 31],
  [34, 28],
  [43, 12],
  [51, 12],
  [50, 2],
  [40, -10],
  [40, -16],
  [35, -24],
  [32, -29],
  [27, -34],
  [20, -35],
  [18, -32],
  [15, -27],
  [12, -17],
  [13, -6],
  [9, 4],
  [-3, 5],
  [-8, 4],
  [-13, 8],
  [-17, 15],
  [-17, 21],
  [-13, 28],
  [-10, 30],
];

const ASIA: LL[] = [
  [26, 40],
  [36, 36],
  [35, 33],
  [34, 28],
  [39, 21],
  [43, 13],
  [45, 12.5],
  [52, 16],
  [57, 19],
  [59, 22],
  [56, 26],
  [52, 27],
  [50, 30],
  [57, 25],
  [62, 25],
  [67, 24],
  [70, 21],
  [73, 17],
  [75, 12],
  [77.5, 8],
  [80, 10],
  [80, 15],
  [86, 20],
  [90, 22],
  [92, 21],
  [94, 17],
  [98, 16],
  [98, 8],
  [100, 6],
  [103.5, 1.5],
  [104, 4],
  [103, 10],
  [106, 9],
  [109, 12],
  [108, 16],
  [106, 20],
  [110, 21],
  [114, 22],
  [118, 24.5],
  [121, 28],
  [122, 31],
  [120, 35],
  [122, 37],
  [118, 38],
  [121, 40],
  [125, 40],
  [127, 35],
  [129, 35],
  [129, 40],
  [132, 43],
  [140, 48],
  [141, 53],
  [135, 55],
  [150, 60],
  [42, 60],
  [42, 42],
];

const ISLANDS: LL[][] = [
  // 日本
  [
    [130, 31],
    [131, 34],
    [136, 34],
    [140, 35],
    [141, 38],
    [142, 40],
    [140, 41],
    [139, 38],
    [137, 37],
    [133, 35.5],
    [130, 33.5],
  ],
  [
    [140, 42],
    [143, 42],
    [145, 43.5],
    [142, 45.5],
    [141, 43],
  ],
  // 呂宋、民答那峨
  [
    [120, 18.5],
    [122, 18.5],
    [122, 14],
    [124, 13],
    [121, 13.8],
    [120, 16],
  ],
  [
    [122, 8],
    [126, 9],
    [126, 6],
    [124, 6.5],
  ],
  // 婆羅洲、蘇門答臘、爪哇
  [
    [109, 1],
    [111, 2],
    [113, 4],
    [116, 7],
    [119, 5],
    [118, 1],
    [116, -3],
    [111, -3],
    [109, -1],
  ],
  [
    [95, 5.5],
    [98, 4],
    [104, -2],
    [106, -6],
    [104, -5.5],
    [101, -2],
    [97, 2],
  ],
  [
    [106, -6],
    [111, -6.5],
    [114, -7.5],
    [114, -8.5],
    [106, -7],
  ],
  // 馬達加斯加
  [
    [44, -25],
    [47, -25],
    [50, -15],
    [49, -12],
    [44, -17],
  ],
  // 澳洲
  [
    [114, -22],
    [122, -18],
    [130, -12],
    [137, -12],
    [142, -11],
    [146, -19],
    [153, -25],
    [150, -37],
    [141, -38],
    [135, -35],
    [129, -32],
    [115, -34],
  ],
  // 美洲西岸（經度 +360 畫在右側）
  [
    [236, 60],
    [236, 48],
    [237.6, 37],
    [243, 32],
    [250, 23],
    [255, 20],
    [260, 17],
    [265, 16],
    [270, 14],
    [270, 60],
  ],
];

function Label({
  at,
  text,
  dx = 5,
  dy = 4,
  anchor = "start",
}: {
  at: LL;
  text: string;
  dx?: number;
  dy?: number;
  anchor?: "start" | "end" | "middle";
}) {
  const [x, y] = px(at);
  return (
    <g>
      <circle cx={x} cy={y} r="2.8" fill="#1e293b" />
      <text
        x={x + dx}
        y={y + dy}
        textAnchor={anchor}
        fontSize="10"
        fill="#1e293b"
        stroke="#ffffff"
        strokeWidth="2.5"
        paintOrder="stroke"
      >
        {text}
      </text>
    </g>
  );
}

function Route({ list, color, dashed }: { list: LL[]; color: string; dashed?: boolean }) {
  const [x1, y1] = px(list[list.length - 2]);
  const [x2, y2] = px(list[list.length - 1]);
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 8;
  return (
    <g>
      <path
        d={path(list)}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={dashed ? "6 4" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)} ${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`}
        fill={color}
      />
    </g>
  );
}

export function WorldBase(_: SceneProps) {
  const land = { fill: "#f5f5f4", stroke: "#a8a29e", strokeWidth: 1 };
  const tw = px([121, 23.7]);
  return (
    <g>
      <rect x="0" y="0" width="480" height="280" fill="#e0f2fe" />
      <polygon points={pts(EUROPE)} {...land} />
      <polygon points={pts(AFRICA)} {...land} />
      <polygon points={pts(ASIA)} {...land} />
      {ISLANDS.map((isl) => (
        <polygon key={`${isl[0][0]},${isl[0][1]}`} points={pts(isl)} {...land} />
      ))}
      <ellipse cx={tw[0]} cy={tw[1]} rx="2" ry="4.5" fill="#fbbf24" stroke="#b45309" />
      <text x="88" y="34" fontSize="12" fill="#475569">
        歐洲
      </text>
      <text x="80" y="150" fontSize="12" fill="#475569">
        非洲
      </text>
      <text x="190" y="40" fontSize="12" fill="#475569">
        亞洲
      </text>
      <text x="452" y="40" textAnchor="middle" fontSize="12" fill="#475569">
        美洲
      </text>
      <text x="270" y="232" fontSize="11" fill="#475569">
        澳洲
      </text>
      <text x="8" y="140" fontSize="11" fill="#0369a1">
        大西洋
      </text>
      <text x="150" y="215" fontSize="11" fill="#0369a1">
        印度洋
      </text>
      <text x="350" y="170" fontSize="11" fill="#0369a1">
        太平洋
      </text>
    </g>
  );
}

export function PortugalRoute(_: SceneProps) {
  const c = "#16a34a";
  return (
    <g>
      <Route
        color={c}
        list={[
          [-9, 38.7],
          [-20, 25],
          [-25, 5],
          [-10, -20],
          [15, -38],
          [33, -30],
          [42, -15],
          [52, -3],
          [65, 8],
          [73.8, 15.5],
          [77, 6],
          [95, 6],
          [102.2, 2.2],
          [108, 10],
          [113.5, 22.2],
          [125, 28],
          [129.9, 32.7],
        ]}
      />
      <Label at={[-9, 38.7]} text="里斯本" dx={2} dy={13} />
      <Label at={[73.8, 15.5]} text="果亞" dx={-5} anchor="end" />
      <Label at={[102.2, 2.2]} text="麻六甲" dx={-5} dy={10} anchor="end" />
      <Label at={[113.5, 22.2]} text="澳門" dx={-5} anchor="end" />
      <Label at={[129.9, 32.7]} text="長崎" dx={6} dy={6} />
    </g>
  );
}

export function SpainRoute(_: SceneProps) {
  const c = "#dc2626";
  return (
    <g>
      <Route
        color={c}
        list={[
          [-6, 37.4],
          [-15, 32],
          [-28.5, 25],
        ]}
      />
      <text
        x="4"
        y="104"
        fontSize="10"
        fill={c}
        stroke="#ffffff"
        strokeWidth="2.5"
        paintOrder="stroke"
      >
        往美洲
      </text>
      <Route
        color={c}
        list={[
          [260, 16.9],
          [200, 14],
          [150, 13],
          [124, 14.6],
        ]}
      />
      <Route
        color={c}
        dashed
        list={[
          [121, 14.6],
          [121.5, 20],
          [121.7, 24.6],
        ]}
      />
      <text
        x="362"
        y="102"
        textAnchor="middle"
        fontSize="10"
        fill={c}
        stroke="#ffffff"
        strokeWidth="2.5"
        paintOrder="stroke"
      >
        大帆船貿易：美洲白銀 ⇄ 中國絲綢、瓷器
      </text>
      <Label at={[-6, 37.4]} text="塞維亞" dx={4} dy={-5} />
      <Label at={[260, 16.9]} text="阿卡普爾科" dx={-5} dy={14} anchor="end" />
      <Label at={[121, 14.6]} text="馬尼拉" dx={6} dy={8} />
      <Label at={[121.7, 25.1]} text="雞籠（1626）" dx={6} dy={-3} />
    </g>
  );
}

export function DutchRoute(_: SceneProps) {
  const c = "#ea580c";
  return (
    <g>
      <Route
        color={c}
        list={[
          [4.9, 52.4],
          [-5, 48],
          [-18, 30],
          [-27, 5],
          [-5, -25],
          [18, -41],
          [60, -39],
          [100, -25],
          [105.8, -7],
          [106.8, -6.2],
          [110, 5],
          [117, 18],
          [120.2, 23],
          [126, 30],
          [129.6, 33.4],
        ]}
      />
      <Label at={[4.9, 52.4]} text="阿姆斯特丹" dx={5} dy={-4} />
      <Label at={[106.8, -6.2]} text="巴達維亞" dx={6} dy={10} />
      <Label at={[120.2, 23]} text="大員" dx={6} dy={10} />
      <Label at={[129.6, 33.4]} text="平戶、長崎" dx={-4} dy={-7} anchor="end" />
    </g>
  );
}
