import type { SceneProps } from "../../types";

/** DNA 雙股構造（拉直的梯子示意，viewBox 0 0 420 320） */
const PAIRS: { y: number; left: string; right: string }[] = [
  { y: 70, left: "A", right: "T" },
  { y: 130, left: "G", right: "C" },
  { y: 190, left: "T", right: "A" },
  { y: 250, left: "C", right: "G" },
];
const COLOR: Record<string, string> = {
  A: "#f87171",
  T: "#60a5fa",
  G: "#4ade80",
  C: "#fbbf24",
};

function Pentagon({ cx, cy, stroke, sw }: { cx: number; cy: number; stroke: string; sw: number }) {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return `${(cx + 14 * Math.cos(a)).toFixed(1)},${(cy + 14 * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill="#e9d5ff" stroke={stroke} strokeWidth={sw} />;
}

export default function DNAScene({ active }: SceneProps) {
  const hl = (id: string, base: string) => (active === id ? "#e11d48" : base);
  const sw = (id: string, base: number) => (active === id ? base + 2 : base);
  return (
    <g>
      <rect x="0" y="0" width="420" height="320" fill="#f8fafc" />

      {/* 糖—磷酸骨架 */}
      <line x1="84" y1="40" x2="84" y2="280" stroke="#94a3b8" strokeWidth="4" />
      <line x1="336" y1="40" x2="336" y2="280" stroke="#94a3b8" strokeWidth="4" />

      {PAIRS.map((p) => {
        const two = p.left === "A" || p.left === "T";
        const bonds = two ? [-5, 5] : [-8, 0, 8];
        return (
          <g key={p.y}>
            {/* 磷酸 */}
            <circle
              cx="84"
              cy={p.y - 30}
              r="11"
              fill="#fde047"
              stroke={hl("phosphate", "#a16207")}
              strokeWidth={sw("phosphate", 1.5)}
            />
            <text x="84" y={p.y - 26} textAnchor="middle" fontSize="11" fill="#1e293b">
              P
            </text>
            <circle
              cx="336"
              cy={p.y + 30}
              r="11"
              fill="#fde047"
              stroke={hl("phosphate", "#a16207")}
              strokeWidth={sw("phosphate", 1.5)}
            />
            <text x="336" y={p.y + 34} textAnchor="middle" fontSize="11" fill="#1e293b">
              P
            </text>
            {/* 去氧核糖 */}
            <line x1="98" y1={p.y} x2="130" y2={p.y} stroke="#64748b" strokeWidth="3" />
            <line x1="290" y1={p.y} x2="322" y2={p.y} stroke="#64748b" strokeWidth="3" />
            <Pentagon cx={98} cy={p.y} stroke={hl("sugar", "#7c3aed")} sw={sw("sugar", 1.5)} />
            <Pentagon cx={322} cy={p.y} stroke={hl("sugar", "#7c3aed")} sw={sw("sugar", 1.5)} />
            {/* 含氮鹼基 */}
            <rect
              x="130"
              y={p.y - 13}
              width="72"
              height="26"
              rx="5"
              fill={COLOR[p.left]}
              stroke={hl("base", "#334155")}
              strokeWidth={sw("base", 1)}
            />
            <rect
              x="218"
              y={p.y - 13}
              width="72"
              height="26"
              rx="5"
              fill={COLOR[p.right]}
              stroke={hl("base", "#334155")}
              strokeWidth={sw("base", 1)}
            />
            <text
              x="166"
              y={p.y + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#1e293b"
            >
              {p.left}
            </text>
            <text
              x="254"
              y={p.y + 5}
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#1e293b"
            >
              {p.right}
            </text>
            {/* 氫鍵 */}
            {bonds.map((d) => (
              <line
                key={d}
                x1="202"
                x2="218"
                y1={p.y + d}
                y2={p.y + d}
                stroke={hl("hbond", "#475569")}
                strokeWidth={sw("hbond", 1.5)}
                strokeDasharray="3 2"
              />
            ))}
          </g>
        );
      })}

      {/* 方向 */}
      <g fill={hl("ends", "#1e293b")} fontSize="15" fontWeight="700">
        <text x="40" y="34">
          5′
        </text>
        <text x="40" y="300">
          3′
        </text>
        <text x="362" y="34">
          3′
        </text>
        <text x="362" y="300">
          5′
        </text>
      </g>
      <path d="M58,50 L58,270" stroke={hl("ends", "#64748b")} strokeWidth="2" />
      <polygon points="52,266 64,266 58,280" fill={hl("ends", "#64748b")} />
      <path d="M362,270 L362,50" stroke={hl("ends", "#64748b")} strokeWidth="2" />
      <polygon points="356,54 368,54 362,40" fill={hl("ends", "#64748b")} />
    </g>
  );
}
