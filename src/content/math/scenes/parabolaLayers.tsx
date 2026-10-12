import type { SceneProps } from "../../types";

/** 拋物線平移圖層（viewBox 0 0 400 300，可視範圍 x ∈ [-5,5]、y ∈ [-3.3,13.3]；超出範圍的點夾在畫面外） */
const sx = (x: number) => 200 + x * 36;
const sy = (y: number) => 240 - y * 18;

function curve(f: (x: number) => number) {
  let d = "";
  for (let i = 0; i <= 100; i++) {
    const x = -5 + i * 0.1;
    const y = f(x);
    d += `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(Math.max(-5, Math.min(15, y))).toFixed(1)}`;
  }
  return d;
}

export function Axes(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#ffffff" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={sx(i - 5)} x2={sx(i - 5)} y1="0" y2="300" stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`h${i}`} y1={sy(i - 4)} y2={sy(i - 4)} x1="0" x2="400" stroke="#e2e8f0" />
      ))}
      <line x1="0" x2="400" y1={sy(0)} y2={sy(0)} stroke="#475569" strokeWidth="1.5" />
      <line y1="0" y2="300" x1={sx(0)} x2={sx(0)} stroke="#475569" strokeWidth="1.5" />
      <text x="388" y={sy(0) - 6} fontSize="12" fill="#475569">
        x
      </text>
      <text x={sx(0) + 6} y="12" fontSize="12" fill="#475569">
        y
      </text>
    </g>
  );
}

const layer = (f: (x: number) => number, color: string, label: string, lx: number, ly: number) =>
  function Layer(_: SceneProps) {
    return (
      <g>
        <path d={curve(f)} fill="none" stroke={color} strokeWidth="3.5" />
        <text x={sx(lx)} y={sy(ly)} fontSize="13" fontWeight="700" fill={color}>
          {label}
        </text>
      </g>
    );
  };

export const Base = layer((x) => x * x, "#1e293b", "y = x²", 2.2, 6);
export const Up = layer((x) => x * x + 3, "#e11d48", "y = x² + 3", -4.8, 6.5);
export const Right = layer((x) => (x - 2) ** 2, "#2563eb", "y = (x − 2)²", 2.8, 1.5);
export const Flip = layer((x) => -x * x, "#059669", "y = −x²", 1.2, -3.3);
