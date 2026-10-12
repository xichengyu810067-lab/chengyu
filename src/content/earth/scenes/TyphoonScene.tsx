import type { SceneProps } from "../../types";

/** 北半球颱風俯視示意（viewBox 0 0 400 300）：颱風眼、眼牆、螺旋雨帶、逆時針旋轉、往西北移動 */
const CX = 200;
const CY = 150;

/** 由外向內、逆時針捲入的螺旋雨帶 */
function arm(a0: number): string {
  let d = "";
  for (let i = 0; i <= 40; i++) {
    const s = i / 40;
    const a = a0 + s * 1.5 * Math.PI;
    const r = 135 - 100 * s;
    const x = CX + r * Math.cos(a);
    const y = CY - r * Math.sin(a);
    d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

/** 在半徑 r、角度 deg 處畫逆時針方向的箭頭 */
function rotationArrow(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  const x = CX + r * Math.cos(a);
  const y = CY - r * Math.sin(a);
  // 逆時針切線方向（螢幕座標）
  const tx = -Math.sin(a);
  const ty = -Math.cos(a);
  const nx = Math.cos(a);
  const ny = -Math.sin(a);
  const tip = `${(x + tx * 9).toFixed(1)},${(y + ty * 9).toFixed(1)}`;
  const b1 = `${(x - tx * 6 + nx * 5).toFixed(1)},${(y - ty * 6 + ny * 5).toFixed(1)}`;
  const b2 = `${(x - tx * 6 - nx * 5).toFixed(1)},${(y - ty * 6 - ny * 5).toFixed(1)}`;
  return `${tip} ${b1} ${b2}`;
}

export default function TyphoonScene({ active }: SceneProps) {
  const hl = (id: string) => active === id;
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#e0f2fe" />
      {/* 移動方向右側（東北側）半圓 */}
      <path
        d={`M101,51 A140,140 0 0,1 299,249 Z`}
        fill="#fecaca"
        opacity={hl("right") ? 0.75 : 0.35}
      />
      <line x1="101" y1="51" x2="299" y2="249" stroke="#f87171" strokeDasharray="5 5" />
      {/* 螺旋雨帶 */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((a0) => (
        <path
          key={a0}
          d={arm(a0)}
          fill="none"
          stroke={hl("bands") ? "#475569" : "#94a3b8"}
          strokeWidth="14"
          strokeLinecap="round"
          opacity="0.75"
        />
      ))}
      {/* 眼牆與颱風眼 */}
      <circle
        cx={CX}
        cy={CY}
        r="38"
        fill="#64748b"
        stroke={hl("wall") ? "#e11d48" : "none"}
        strokeWidth="4"
      />
      <circle
        cx={CX}
        cy={CY}
        r="14"
        fill="#e0f2fe"
        stroke={hl("eye") ? "#e11d48" : "#334155"}
        strokeWidth={hl("eye") ? 4 : 1.5}
      />
      {/* 逆時針旋轉 */}
      {[30, 150, 270].map((d) => (
        <polygon key={d} points={rotationArrow(d, 62)} fill={hl("spin") ? "#e11d48" : "#1e293b"} />
      ))}
      {/* 移動方向 */}
      <g stroke="#b91c1c" fill="#b91c1c" strokeWidth="3">
        <line x1="96" y1="46" x2="56" y2="18" strokeDasharray="6 4" />
        <polygon points="46,12 62,14 54,26" />
      </g>
      <g fontSize="11" fill="#1e293b">
        <text x="12" y="44">
          移動方向
        </text>
        <text x="300" y="40">
          右半圓：風較強
        </text>
        <text x="12" y="290">
          北半球颱風（俯視示意）
        </text>
      </g>
    </g>
  );
}
