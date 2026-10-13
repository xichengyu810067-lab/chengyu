import type { SceneProps } from "../../types";

/**
 * 假想大陸的柯本氣候分布（viewBox 0 0 400 320，示意）。
 * 以「緯度」與「離西岸的相對位置 t（0＝西岸、1＝東岸）」決定每個網格的氣候大類，
 * 再依大類拆成五個圖層。
 */
const Y = (lat: number) => 160 - lat * 1.75;

/** 各緯度的大陸西岸與東岸（x 座標）：北半球中高緯度寬、南半球窄 */
const EDGE: [number, number, number][] = [
  [75, 120, 290],
  [70, 85, 330],
  [60, 70, 340],
  [50, 75, 335],
  [40, 90, 320],
  [30, 105, 305],
  [20, 115, 295],
  [10, 125, 285],
  [0, 130, 278],
  [-10, 135, 270],
  [-20, 142, 262],
  [-30, 150, 250],
  [-40, 162, 236],
  [-50, 178, 214],
  [-56, 190, 200],
];

function edges(lat: number): [number, number] | null {
  for (let i = 0; i + 1 < EDGE.length; i++) {
    const [la, w1, e1] = EDGE[i];
    const [lb, w2, e2] = EDGE[i + 1];
    if (lat <= la && lat >= lb) {
      const k = (la - lat) / (la - lb);
      return [w1 + (w2 - w1) * k, e1 + (e2 - e1) * k];
    }
  }
  return null;
}

type Zone = "A" | "B" | "C" | "D" | "E";

/** 依緯度與東西相對位置判定氣候大類（理想化的柯本假想大陸） */
function zone(lat: number, t: number): Zone {
  const a = Math.abs(lat);
  if (lat >= 68) return "E";
  if (a < 10) return "A";
  if (a < 20) return t < 0.3 ? "B" : "A";
  if (lat > 0) {
    if (lat < 30) return t < 0.6 ? "B" : "C";
    if (lat < 40) return t < 0.15 ? "C" : t < 0.7 ? "B" : "C";
    if (lat < 50) return t < 0.2 ? "C" : t < 0.5 ? "B" : "D";
    if (lat < 60) return t < 0.15 ? "C" : "D";
    return "D";
  }
  if (a < 32) return t < 0.55 ? "B" : "C";
  return "C";
}

const CELL_W = 8;
const CELL_H = 7;
const CELLS: { x: number; y: number; z: Zone }[] = [];
for (let y = Y(75); y < Y(-56); y += CELL_H) {
  const lat = (160 - (y + CELL_H / 2)) / 1.75;
  const e = edges(lat);
  if (!e) continue;
  for (let x = 60; x < 350; x += CELL_W) {
    const cx = x + CELL_W / 2;
    if (cx < e[0] || cx > e[1]) continue;
    CELLS.push({ x, y, z: zone(lat, (cx - e[0]) / (e[1] - e[0])) });
  }
}

const OUTLINE = [
  ...EDGE.map(([lat, w]) => `${w},${Y(lat).toFixed(1)}`),
  ...[...EDGE].reverse().map(([lat, , e]) => `${e},${Y(lat).toFixed(1)}`),
].join(" ");

export function Base(_: SceneProps) {
  const lines: [number, string][] = [
    [66.5, "北極圈 66.5°N"],
    [23.5, "北回歸線 23.5°N"],
    [0, "赤道 0°"],
    [-23.5, "南回歸線 23.5°S"],
    [-66.5, "南極圈 66.5°S"],
  ];
  return (
    <g>
      <rect x="0" y="0" width="400" height="320" fill="#e0f2fe" />
      <polygon points={OUTLINE} fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      {lines.map(([lat, label]) => (
        <g key={lat}>
          <line
            x1="0"
            x2="400"
            y1={Y(lat)}
            y2={Y(lat)}
            stroke="#64748b"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />
          <text x="396" y={Y(lat) - 3} fontSize="9" textAnchor="end" fill="#334155">
            {label}
          </text>
        </g>
      ))}
      <text x="40" y={Y(5)} fontSize="11" textAnchor="middle" fill="#0369a1">
        西岸
      </text>
      <text x="40" y={Y(-3)} fontSize="9" textAnchor="middle" fill="#0369a1">
        （大洋）
      </text>
      <text x="358" y={Y(5)} fontSize="11" textAnchor="middle" fill="#0369a1">
        東岸
      </text>
      <text x="200" y="14" fontSize="12" fontWeight="700" textAnchor="middle" fill="#1e293b">
        假想大陸的氣候分布（示意）
      </text>
    </g>
  );
}

const zoneLayer = (z: Zone, color: string) =>
  function ZoneLayer(_: SceneProps) {
    return (
      <g>
        {CELLS.filter((c) => c.z === z).map((c) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x}
            y={c.y}
            width={CELL_W + 0.4}
            height={CELL_H + 0.4}
            fill={color}
          />
        ))}
      </g>
    );
  };

export const Tropical = zoneLayer("A", "#059669");
export const Dry = zoneLayer("B", "#f59e0b");
export const Temperate = zoneLayer("C", "#3b82f6");
export const Cold = zoneLayer("D", "#8b5cf6");
export const Polar = zoneLayer("E", "#94a3b8");
