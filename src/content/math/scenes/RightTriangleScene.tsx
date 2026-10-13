import type { SceneProps } from "../../types";

/** 直角三角形各部位（viewBox 0 0 400 300） */
export default function RightTriangleScene({ active }: SceneProps) {
  const hl = (id: string, base: string, on: string) => (active === id ? on : base);
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      <polygon points="80,240 320,240 80,60" fill="#ede9fe" stroke="#4c1d95" strokeWidth="3" />
      <line
        x1="80"
        y1="240"
        x2="320"
        y2="240"
        stroke={hl("leg-a", "#4c1d95", "#2563eb")}
        strokeWidth={active === "leg-a" ? 7 : 3}
      />
      <line
        x1="80"
        y1="240"
        x2="80"
        y2="60"
        stroke={hl("leg-b", "#4c1d95", "#059669")}
        strokeWidth={active === "leg-b" ? 7 : 3}
      />
      <line
        x1="320"
        y1="240"
        x2="80"
        y2="60"
        stroke={hl("hyp", "#4c1d95", "#d97706")}
        strokeWidth={active === "hyp" ? 7 : 3}
      />
      <rect
        x="80"
        y="218"
        width="22"
        height="22"
        fill="none"
        stroke={hl("right", "#4c1d95", "#e11d48")}
        strokeWidth={active === "right" ? 4 : 2}
      />
      <path
        d="M282,240 A38,38 0 0,0 290,217"
        fill="none"
        stroke={hl("acute", "#7c3aed", "#e11d48")}
        strokeWidth="3"
      />
      <text x="200" y="268" textAnchor="middle" fontSize="16" fill="#1e293b">
        a
      </text>
      <text x="58" y="155" fontSize="16" fill="#1e293b">
        b
      </text>
      <text x="210" y="140" fontSize="16" fill="#1e293b">
        c
      </text>
    </g>
  );
}
