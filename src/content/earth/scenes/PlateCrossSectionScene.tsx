import type { SceneProps } from "../../types";

/** 板塊構造剖面示意（viewBox 0 0 400 260）：中洋脊 → 海洋板塊 → 海溝 → 隱沒帶 → 火山弧 */
export default function PlateCrossSectionScene({ active }: SceneProps) {
  const hl = (id: string) => active === id;
  return (
    <g>
      <rect x="0" y="0" width="400" height="260" fill="#f8fafc" />
      <rect x="0" y="0" width="400" height="60" fill="#e0f2fe" />
      {/* 軟流圈 */}
      <rect
        x="0"
        y="100"
        width="400"
        height="160"
        fill="#fed7aa"
        stroke={hl("astheno") ? "#e11d48" : "none"}
        strokeWidth="4"
      />
      {/* 海水 */}
      <rect x="0" y="60" width="300" height="48" fill="#93c5fd" />
      {/* 中洋脊下方的岩漿上湧 */}
      <path d="M110,250 L110,96" stroke="#dc2626" strokeWidth="5" strokeDasharray="9 6" />
      {/* 海洋岩石圈：離中洋脊越遠越厚，並在海溝處隱沒 */}
      <polygon
        points="0,100 90,96 110,84 130,96 200,100 270,106 400,196 400,236 262,140 200,132 130,114 110,110 90,114 0,132"
        fill="#94a3b8"
        stroke={hl("litho") || hl("slab") ? "#e11d48" : "#475569"}
        strokeWidth={hl("litho") || hl("slab") ? 3 : 1.5}
      />
      {/* 大陸板塊與火山 */}
      <polygon
        points="276,110 290,70 300,60 330,60 340,40 345,30 350,40 360,60 400,60 400,196"
        fill="#d6d3d1"
        stroke={hl("arc") ? "#e11d48" : "#57534e"}
        strokeWidth={hl("arc") ? 3 : 1.5}
      />
      <path d="M343,150 C335,120 352,80 345,36" fill="none" stroke="#dc2626" strokeWidth="4" />
      <circle cx="345" cy="28" r="5" fill="#f97316" />
      {/* 隱沒帶地震 */}
      {[
        [292, 136],
        [327, 160],
        [362, 184],
        [304, 150],
      ].map(([x, y]) => (
        <text key={`${x}-${y}`} x={x} y={y} fontSize="13" fill="#b91c1c">
          ✶
        </text>
      ))}
      {/* 中洋脊與海溝標示 */}
      <circle
        cx="110"
        cy="86"
        r="10"
        fill="none"
        stroke={hl("ridge") ? "#e11d48" : "none"}
        strokeWidth="3"
      />
      <circle
        cx="273"
        cy="108"
        r="10"
        fill="none"
        stroke={hl("trench") ? "#e11d48" : "none"}
        strokeWidth="3"
      />
      {/* 板塊運動方向 */}
      <g stroke="#1e293b" fill="#1e293b" strokeWidth="2">
        <line x1="70" y1="80" x2="30" y2="80" />
        <polygon points="30,75 30,85 22,80" />
        <line x1="150" y1="80" x2="210" y2="80" />
        <polygon points="210,75 210,85 218,80" />
      </g>
      <g fontSize="11" fill="#1e293b">
        <text x="84" y="54">
          中洋脊
        </text>
        <text x="236" y="54">
          海溝
        </text>
        <text x="360" y="24">
          火山弧
        </text>
        <text x="20" y="200">
          軟流圈
        </text>
        <text x="150" y="126">
          海洋岩石圈
        </text>
        <text x="320" y="84">
          大陸板塊
        </text>
        <text x="300" y="236">
          隱沒板塊
        </text>
      </g>
    </g>
  );
}
