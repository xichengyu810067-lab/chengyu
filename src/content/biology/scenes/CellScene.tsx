import type { SceneProps } from "../../types";

/** 植物細胞與動物細胞對照（viewBox 0 0 480 300） */
export default function CellScene({ active }: SceneProps) {
  const on = (id: string) => active === id;
  const chloroplasts: [number, number, number][] = [
    [55, 80, -20],
    [95, 66, 10],
    [48, 205, 30],
    [70, 240, -10],
    [185, 228, 15],
    [192, 115, -35],
  ];
  return (
    <g>
      <rect x="0" y="0" width="480" height="300" fill="#f8fafc" />
      <text x="120" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e293b">
        植物細胞
      </text>
      <text x="360" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e293b">
        動物細胞
      </text>

      {/* ── 植物細胞 ── */}
      <rect
        x="20"
        y="40"
        width="200"
        height="220"
        rx="10"
        fill="#f7fee7"
        stroke={on("wall") ? "#e11d48" : "#4d7c0f"}
        strokeWidth={on("wall") ? 10 : 7}
      />
      <rect
        x="28"
        y="48"
        width="184"
        height="204"
        rx="6"
        fill={on("cytoplasm") ? "#fef9c3" : "#ecfccb"}
        stroke={on("membrane") ? "#e11d48" : "#a16207"}
        strokeWidth={on("membrane") ? 3 : 1.5}
      />
      <ellipse
        cx="122"
        cy="165"
        rx="66"
        ry="62"
        fill="#bae6fd"
        stroke={on("vacuole") ? "#e11d48" : "#0284c7"}
        strokeWidth={on("vacuole") ? 4 : 2}
      />
      <circle
        cx="170"
        cy="78"
        r="20"
        fill="#ddd6fe"
        stroke={on("nucleus") ? "#e11d48" : "#6d28d9"}
        strokeWidth={on("nucleus") ? 4 : 2}
      />
      <circle cx="173" cy="76" r="6" fill="#7c3aed" />
      {chloroplasts.map(([x, y, r]) => (
        <g key={`c${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse
            cx={x}
            cy={y}
            rx="15"
            ry="8"
            fill="#4ade80"
            stroke={on("chloroplast") ? "#e11d48" : "#15803d"}
            strokeWidth={on("chloroplast") ? 3 : 1.5}
          />
          <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="#166534" strokeWidth="1.5" />
          <line x1={x - 4} y1={y - 4} x2={x - 4} y2={y + 4} stroke="#166534" />
          <line x1={x + 4} y1={y - 4} x2={x + 4} y2={y + 4} stroke="#166534" />
        </g>
      ))}
      <ellipse
        cx="40"
        cy="140"
        rx="9"
        ry="5"
        fill="#fdba74"
        stroke={on("mito") ? "#e11d48" : "#c2410c"}
        strokeWidth={on("mito") ? 3 : 1.2}
      />

      {/* ── 動物細胞 ── */}
      <ellipse
        cx="360"
        cy="155"
        rx="100"
        ry="95"
        fill={on("cytoplasm") ? "#fef9c3" : "#ffe4e6"}
        stroke={on("membrane") ? "#e11d48" : "#be123c"}
        strokeWidth={on("membrane") ? 5 : 2.5}
      />
      <circle
        cx="350"
        cy="145"
        r="30"
        fill="#ddd6fe"
        stroke={on("nucleus") ? "#e11d48" : "#6d28d9"}
        strokeWidth={on("nucleus") ? 4 : 2}
      />
      <circle cx="356" cy="140" r="9" fill="#7c3aed" />
      {(
        [
          [300, 205, 25],
          [420, 110, -30],
          [415, 200, 10],
          [300, 110, 60],
        ] as [number, number, number][]
      ).map(([x, y, r]) => (
        <g key={`m${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse
            cx={x}
            cy={y}
            rx="16"
            ry="8"
            fill="#fdba74"
            stroke={on("mito") ? "#e11d48" : "#c2410c"}
            strokeWidth={on("mito") ? 3 : 1.5}
          />
          <path
            d={`M${x - 11},${y} q3,-6 6,0 t6,0 t6,0 t3,0`}
            fill="none"
            stroke="#9a3412"
            strokeWidth="1.2"
          />
        </g>
      ))}
      <circle cx="380" cy="215" r="5" fill="#e2e8f0" stroke="#94a3b8" />
      <circle cx="330" cy="235" r="4" fill="#e2e8f0" stroke="#94a3b8" />
      <circle cx="430" cy="160" r="4" fill="#e2e8f0" stroke="#94a3b8" />

      <text x="240" y="290" textAnchor="middle" fontSize="11" fill="#475569">
        示意圖：細胞大小與胞器數量並非實際比例
      </text>
    </g>
  );
}
