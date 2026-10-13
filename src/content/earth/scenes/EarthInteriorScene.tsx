import type { SceneProps } from "../../types";

/** 地球內部構造剖面（viewBox 0 0 400 300）。地殼厚度刻意放大，為示意圖。 */
const CX = 140;
const CY = 150;

export default function EarthInteriorScene({ active }: SceneProps) {
  const ring = (id: string) => (active === id ? "#e11d48" : "#475569");
  const width = (id: string) => (active === id ? 4 : 1.2);
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      {/* 地殼（放大） */}
      <circle
        cx={CX}
        cy={CY}
        r="130"
        fill="#a8a29e"
        stroke={ring("crust")}
        strokeWidth={width("crust")}
      />
      {/* 地函 */}
      <circle
        cx={CX}
        cy={CY}
        r="121"
        fill="#fdba74"
        stroke={active === "moho" ? "#e11d48" : "#78350f"}
        strokeWidth={active === "moho" ? 4 : 1.5}
      />
      <circle
        cx={CX}
        cy={CY}
        r="100"
        fill="#fb923c"
        opacity={active === "mantle" ? 1 : 0.55}
        stroke="none"
      />
      {/* 外核 */}
      <circle
        cx={CX}
        cy={CY}
        r="71"
        fill="#facc15"
        stroke={active === "gutenberg" ? "#e11d48" : "#92400e"}
        strokeWidth={active === "gutenberg" ? 4 : 1.5}
      />
      {/* 內核 */}
      <circle
        cx={CX}
        cy={CY}
        r="28"
        fill="#fef9c3"
        stroke={ring("inner")}
        strokeWidth={active === "inner" ? 4 : 1.5}
      />
      {active === "outer" && (
        <circle cx={CX} cy={CY} r="50" fill="none" stroke="#e11d48" strokeWidth="3" />
      )}
      {active === "mantle" && (
        <circle cx={CX} cy={CY} r="96" fill="none" stroke="#e11d48" strokeWidth="3" />
      )}
      {/* 對流示意箭頭 */}
      <path
        d="M70,190 A80,80 0 0,1 70,110"
        fill="none"
        stroke="#9a3412"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <polygon points="66,112 74,112 70,104" fill="#9a3412" />
      {/* 右側圖例 */}
      <g fontSize="12" fill="#1e293b">
        <rect x="282" y="40" width="14" height="14" fill="#a8a29e" stroke="#475569" />
        <text x="302" y="51">
          地殼
        </text>
        <text x="302" y="66" fontSize="10" fill="#475569">
          地表～約 35 km
        </text>
        <rect x="282" y="90" width="14" height="14" fill="#fb923c" stroke="#475569" />
        <text x="302" y="101">
          地函
        </text>
        <text x="302" y="116" fontSize="10" fill="#475569">
          至約 2900 km
        </text>
        <rect x="282" y="140" width="14" height="14" fill="#facc15" stroke="#475569" />
        <text x="302" y="151">
          外核（液態）
        </text>
        <text x="302" y="166" fontSize="10" fill="#475569">
          至約 5150 km
        </text>
        <rect x="282" y="190" width="14" height="14" fill="#fef9c3" stroke="#475569" />
        <text x="302" y="201">
          內核（固態）
        </text>
        <text x="302" y="216" fontSize="10" fill="#475569">
          至地心約 6370 km
        </text>
      </g>
      <text x="282" y="262" fontSize="10" fill="#64748b">
        ＊地殼厚度已放大
      </text>
    </g>
  );
}
