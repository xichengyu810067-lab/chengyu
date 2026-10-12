import type { SceneProps } from "../../types";

/** 電磁感應實驗：磁棒插入線圈，檢流計指針偏轉（viewBox 0 0 400 300） */
export default function InductionScene({ active }: SceneProps) {
  const on = (id: string) => active === id;
  const loops = [205, 220, 235, 250, 265, 280, 295];
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />

      {/* 磁力線 */}
      <g
        fill="none"
        stroke={on("field") ? "#e11d48" : "#94a3b8"}
        strokeWidth={on("field") ? 2.5 : 1.5}
        strokeDasharray="5 4"
      >
        <path d="M150,132 C205,92 170,52 90,56 C30,60 4,100 30,132" />
        <path d="M150,158 C205,198 170,238 90,234 C30,230 4,190 30,158" />
        <line x1="150" y1="145" x2="318" y2="145" />
      </g>

      {/* 運動方向 */}
      <g opacity={on("motion") ? 1 : 0.85}>
        <line
          x1="55"
          y1="104"
          x2="135"
          y2="104"
          stroke={on("motion") ? "#e11d48" : "#475569"}
          strokeWidth="3"
        />
        <polygon points="147,104 133,96 133,112" fill={on("motion") ? "#e11d48" : "#475569"} />
        <text x="62" y="94" fontSize="12" fill="#1e293b">
          插入線圈
        </text>
      </g>

      {/* 磁棒 */}
      <g stroke={on("magnet") ? "#e11d48" : "#1e293b"} strokeWidth={on("magnet") ? 3.5 : 2}>
        <rect x="30" y="125" width="60" height="40" fill="#bfdbfe" />
        <rect x="90" y="125" width="60" height="40" fill="#fecaca" />
      </g>
      <text x="60" y="151" fontSize="16" fontWeight="700" textAnchor="middle" fill="#1d4ed8">
        S
      </text>
      <text x="120" y="151" fontSize="16" fontWeight="700" textAnchor="middle" fill="#b91c1c">
        N
      </text>

      {/* 線圈 */}
      {loops.map((x) => (
        <ellipse
          key={x}
          cx={x}
          cy="145"
          rx="9"
          ry="40"
          fill="none"
          stroke={on("coil") ? "#e11d48" : "#b45309"}
          strokeWidth={on("coil") ? 3.5 : 2.5}
        />
      ))}
      <text x="250" y="92" fontSize="13" textAnchor="middle" fill="#1e293b">
        線圈
      </text>

      {/* 導線與感應電流 */}
      <g fill="none" stroke="#475569" strokeWidth="2.5">
        <polyline points="200,182 200,255 226,255" />
        <polyline points="300,182 300,255 274,255" />
      </g>
      <polygon
        points="200,232 193,218 207,218"
        fill={on("current") ? "#e11d48" : "#f59e0b"}
        stroke={on("current") ? "#e11d48" : "none"}
        strokeWidth="2"
      />
      <text x="168" y="226" fontSize="12" fontWeight="700" fill="#b45309">
        I
      </text>

      {/* 檢流計 */}
      <circle
        cx="250"
        cy="255"
        r="24"
        fill="#fff"
        stroke={on("galvanometer") ? "#e11d48" : "#1e293b"}
        strokeWidth={on("galvanometer") ? 3.5 : 2}
      />
      <path d="M234,252 A17,17 0 0,1 266,252" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="250" y1="266" x2="262" y2="242" stroke="#e11d48" strokeWidth="2.5" />
      <circle cx="250" cy="266" r="2.5" fill="#1e293b" />
      <text x="282" y="282" fontSize="12" fill="#1e293b">
        檢流計 G
      </text>
    </g>
  );
}
