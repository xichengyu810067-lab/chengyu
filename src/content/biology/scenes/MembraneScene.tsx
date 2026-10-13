import type { SceneProps } from "../../types";

/** 細胞膜（流體鑲嵌模型）與物質運輸示意圖（viewBox 0 0 480 280） */
const TOP = 112;
const BOTTOM = 168;
/** 蛋白質所在的 x 範圍，磷脂在這些位置略過 */
const GAPS: [number, number][] = [
  [86, 134],
  [196, 254],
  [316, 374],
  [406, 446],
];

function Lipid({ x }: { x: number }) {
  return (
    <g>
      <circle cx={x} cy={TOP} r="6.5" fill="#fca5a5" stroke="#b91c1c" strokeWidth="1" />
      <path
        d={`M${x - 2},${TOP + 6} L${x - 2},${TOP + 26} M${x + 2},${TOP + 6} L${x + 2},${TOP + 26}`}
        stroke="#b45309"
        strokeWidth="1.2"
      />
      <circle cx={x} cy={BOTTOM} r="6.5" fill="#fca5a5" stroke="#b91c1c" strokeWidth="1" />
      <path
        d={`M${x - 2},${BOTTOM - 6} L${x - 2},${BOTTOM - 26} M${x + 2},${BOTTOM - 6} L${x + 2},${BOTTOM - 26}`}
        stroke="#b45309"
        strokeWidth="1.2"
      />
    </g>
  );
}

export default function MembraneScene({ active }: SceneProps) {
  const ring = (id: string) => (active === id ? "#e11d48" : "#475569");
  const width = (id: string) => (active === id ? 3.5 : 1.5);
  const xs: number[] = [];
  for (let x = 12; x <= 472; x += 15) {
    if (!GAPS.some(([a, b]) => x > a - 6 && x < b + 6)) xs.push(x);
  }
  return (
    <g>
      <rect x="0" y="0" width="480" height="280" fill="#f8fafc" />
      <rect x="0" y="0" width="480" height="104" fill="#eff6ff" />
      <rect x="0" y="176" width="480" height="104" fill="#fefce8" />
      <text x="12" y="22" fontSize="13" fontWeight="700" fill="#1e293b">
        細胞外
      </text>
      <text x="12" y="268" fontSize="13" fontWeight="700" fill="#1e293b">
        細胞內（細胞質）
      </text>

      {/* 磷脂雙層 */}
      <g opacity={active && active !== "bilayer" && active !== "diffusion" ? 0.75 : 1}>
        {xs.map((x) => (
          <Lipid key={x} x={x} />
        ))}
      </g>
      {active === "bilayer" && (
        <rect
          x="4"
          y="102"
          width="80"
          height="76"
          rx="8"
          fill="none"
          stroke="#e11d48"
          strokeWidth="3"
        />
      )}

      {/* 簡單擴散：O₂ 直接穿過 */}
      {[
        [168, 60],
        [180, 82],
        [162, 140],
        [176, 214],
      ].map(([x, y]) => (
        <circle
          key={`o${y}`}
          cx={x}
          cy={y}
          r="5"
          fill="#93c5fd"
          stroke={ring("diffusion")}
          strokeWidth={width("diffusion")}
        />
      ))}
      <text x="186" y="64" fontSize="11" fill="#1e293b">
        O₂
      </text>
      <path d="M152,92 L152,200" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="146,198 158,198 152,210" fill="#2563eb" />

      {/* 通道蛋白 */}
      <rect
        x="88"
        y="98"
        width="18"
        height="84"
        rx="8"
        fill="#6ee7b7"
        stroke={ring("channel")}
        strokeWidth={width("channel")}
      />
      <rect
        x="114"
        y="98"
        width="18"
        height="84"
        rx="8"
        fill="#6ee7b7"
        stroke={ring("channel")}
        strokeWidth={width("channel")}
      />
      <circle cx="110" cy="80" r="4" fill="#38bdf8" />
      <circle cx="110" cy="140" r="4" fill="#38bdf8" />
      <circle cx="110" cy="204" r="4" fill="#38bdf8" />

      {/* 載體蛋白（促進性擴散） */}
      <path
        d="M198,100 Q225,86 252,100 L252,180 Q225,194 198,180 Z"
        fill="#fde68a"
        stroke={ring("carrier")}
        strokeWidth={width("carrier")}
      />
      <polygon
        points="225,128 235,134 235,146 225,152 215,146 215,134"
        fill="#fb923c"
        stroke="#9a3412"
      />
      <text x="225" y="74" textAnchor="middle" fontSize="11" fill="#1e293b">
        葡萄糖
      </text>

      {/* 幫浦（主動運輸） */}
      <rect
        x="318"
        y="96"
        width="54"
        height="88"
        rx="14"
        fill="#f9a8d4"
        stroke={ring("pump")}
        strokeWidth={width("pump")}
      />
      <text x="345" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="#be185d">
        ATP → ADP
      </text>
      <path d="M345,170 L345,112" stroke="#be185d" strokeWidth="2.5" />
      <polygon points="338,114 352,114 345,100" fill="#be185d" />
      <text x="345" y="80" textAnchor="middle" fontSize="11" fill="#1e293b">
        Na⁺（高濃度）
      </text>

      {/* 醣蛋白 */}
      <rect
        x="410"
        y="100"
        width="32"
        height="80"
        rx="12"
        fill="#c4b5fd"
        stroke={ring("glyco")}
        strokeWidth={width("glyco")}
      />
      <path d="M426,100 L426,62 M426,78 L410,62 M426,70 L442,54" stroke="#7c3aed" strokeWidth="2" />
      {[
        [426, 58],
        [408, 58],
        [444, 50],
        [426, 76],
      ].map(([x, y]) => (
        <circle
          key={`g${x}-${y}`}
          cx={x}
          cy={y}
          r="5"
          fill="#a78bfa"
          stroke={ring("glyco")}
          strokeWidth={width("glyco") - 0.5}
        />
      ))}
    </g>
  );
}
