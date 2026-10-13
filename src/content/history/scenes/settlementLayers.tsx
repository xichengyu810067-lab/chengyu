import type { SceneProps } from "../../types";

/**
 * 清帝國時期漢人移墾範圍的擴展（viewBox 0 0 300 400，示意圖、非精確比例）。
 * 島形由主要海岸地點的經緯度粗略換算而來。
 */
type P = [number, number];
const pts = (list: P[]) => list.map(([x, y]) => `${x},${y}`).join(" ");

const TAIWAN: P[] = [
  [198.5, 25.8],
  [217.9, 43.6],
  [243.1, 56.2],
  [225.6, 72],
  [230.5, 99],
  [204.3, 164.4],
  [182, 256.8],
  [160.7, 293.5],
  [136.4, 335.5],
  [131.6, 382.8],
  [117, 379.6],
  [106.3, 333.4],
  [92.8, 324],
  [75.3, 307],
  [64.6, 267],
  [58.8, 238.9],
  [63.7, 220],
  [73, 185.4],
  [90.8, 156],
  [99.5, 133.9],
  [115, 110.8],
  [138, 77.2],
  [155.8, 52],
  [185.9, 39.4],
];

const MOUNTAINS: P[] = Array.from({ length: 10 }, (_, i) => {
  const y = 90 + i * 25;
  return [196 - (y - 90) * 0.27, y];
});

function Tag({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="12"
      fontWeight="700"
      fill={color}
      stroke="#ffffff"
      strokeWidth="3"
      paintOrder="stroke"
    >
      {text}
    </text>
  );
}

export function TaiwanBase(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="300" height="400" fill="#e0f2fe" />
      <polygon points={pts(TAIWAN)} fill="#f5f5f4" stroke="#78716c" strokeWidth="1.5" />
      {MOUNTAINS.map(([x, y]) => (
        <polygon
          key={y}
          points={`${x - 7},${y + 6} ${x},${y - 6} ${x + 7},${y + 6}`}
          fill="#d6d3d1"
          stroke="#a8a29e"
        />
      ))}
      <circle cx="12" cy="205" r="2.5" fill="#a8a29e" />
      <circle cx="17" cy="211" r="2" fill="#a8a29e" />
      <circle cx="10" cy="213" r="2" fill="#a8a29e" />
      <text x="4" y="230" fontSize="10" fill="#475569">
        澎湖
      </text>
      <circle cx="68" cy="266" r="3.5" fill="#1e293b" />
      <text x="60" y="270" textAnchor="end" fontSize="11" fill="#1e293b">
        府城
      </text>
      <text x="6" y="124" fontSize="11" fill="#0369a1">
        臺灣海峽
      </text>
      <text x="238" y="210" fontSize="11" fill="#0369a1">
        太平洋
      </text>
      <text x="150" y="232" fontSize="10" fill="#57534e">
        中央山脈
      </text>
    </g>
  );
}

export function EarlyQing(_: SceneProps) {
  const c = "#dc2626";
  return (
    <g>
      <polygon
        points={pts([
          [60, 232],
          [64.6, 267],
          [75.3, 307],
          [92.8, 324],
          [104, 318],
          [100, 280],
          [92, 240],
          [78, 226],
        ])}
        fill={c}
        fillOpacity="0.45"
        stroke={c}
      />
      <Tag x={4} y={322} text="17 世紀末" color={c} />
    </g>
  );
}

export function Western(_: SceneProps) {
  const c = "#ea580c";
  return (
    <g>
      <polygon
        points={pts([
          [63.7, 220],
          [73, 185.4],
          [90.8, 156],
          [99.5, 133.9],
          [115, 110.8],
          [138, 77.2],
          [155.8, 52],
          [185.9, 39.4],
          [198.5, 25.8],
          [206, 42],
          [190, 62],
          [172, 82],
          [150, 102],
          [132, 135],
          [118, 168],
          [106, 202],
          [98, 228],
          [78, 226],
        ])}
        fill={c}
        fillOpacity="0.4"
        stroke={c}
      />
      <polygon
        points={pts([
          [92.8, 324],
          [106.3, 333.4],
          [116, 322],
          [112, 300],
          [101, 284],
          [104, 318],
        ])}
        fill={c}
        fillOpacity="0.4"
        stroke={c}
      />
      <Tag x={30} y={160} text="18 世紀" color={c} />
    </g>
  );
}

export function NorthEast(_: SceneProps) {
  const c = "#7c3aed";
  return (
    <g>
      <polygon
        points={pts([
          [222, 66],
          [236, 62],
          [225.6, 72],
          [230.5, 99],
          [215, 97],
          [212, 78],
        ])}
        fill={c}
        fillOpacity="0.45"
        stroke={c}
      />
      <circle cx="143" cy="165" r="9" fill={c} fillOpacity="0.45" stroke={c} />
      <Tag x={238} y={92} text="1812" color={c} />
      <Tag x={156} y={162} text="埔里" color={c} />
    </g>
  );
}

export function EastCoast(_: SceneProps) {
  const c = "#059669";
  return (
    <g>
      <polygon
        points={pts([
          [207, 160],
          [204.3, 164.4],
          [182, 256.8],
          [160.7, 293.5],
          [146, 296],
          [160, 262],
          [176, 210],
          [194, 166],
        ])}
        fill={c}
        fillOpacity="0.45"
        stroke={c}
      />
      <Tag x={198} y={250} text="1875 後" color={c} />
    </g>
  );
}

export function Boundary(_: SceneProps) {
  const c = "#1e293b";
  return (
    <g>
      <polyline
        points={pts([
          [185, 62],
          [165, 85],
          [140, 115],
          [122, 150],
          [108, 190],
          [100, 225],
          [98, 260],
          [104, 300],
          [112, 320],
        ])}
        fill="none"
        stroke={c}
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      <Tag x={132} y={128} text="番界" color={c} />
    </g>
  );
}
