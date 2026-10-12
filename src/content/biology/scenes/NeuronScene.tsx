import type { SceneProps } from "../../types";

/** 有髓鞘的運動神經元示意圖（viewBox 0 0 480 240）。不標示名稱，方便「找找看」模式。 */
const MYELIN: [number, number][] = [
  [140, 188],
  [200, 248],
  [260, 308],
  [320, 368],
];

export default function NeuronScene({ active }: SceneProps) {
  const hl = (id: string, base: string) => (active === id ? "#e11d48" : base);
  const sw = (id: string, base: number) => (active === id ? base + 2.5 : base);
  return (
    <g>
      <rect x="0" y="0" width="480" height="240" fill="#f8fafc" />

      {/* 樹突 */}
      <g
        stroke={hl("dendrite", "#b45309")}
        strokeWidth={sw("dendrite", 3)}
        fill="none"
        strokeLinecap="round"
      >
        <path d="M66,102 L36,80 M48,89 L40,62 M36,80 L14,78" />
        <path d="M60,120 L22,124 M34,123 L18,142" />
        <path d="M66,140 L36,170 M48,158 L54,190 M36,170 L16,176" />
        <path d="M80,92 L74,58 M76,70 L94,48" />
        <path d="M84,150 L86,190" />
      </g>

      {/* 細胞本體與細胞核 */}
      <circle
        cx="92"
        cy="120"
        r="32"
        fill="#fde68a"
        stroke={hl("soma", "#b45309")}
        strokeWidth={sw("soma", 2)}
      />
      <circle cx="90" cy="118" r="11" fill="#c4b5fd" stroke="#6d28d9" />

      {/* 軸突 */}
      <line
        x1="122"
        y1="120"
        x2="404"
        y2="120"
        stroke={hl("axon", "#64748b")}
        strokeWidth={sw("axon", 5)}
      />

      {/* 髓鞘與蘭氏結 */}
      {MYELIN.map(([a, b]) => (
        <rect
          key={a}
          x={a}
          y="108"
          width={b - a}
          height="24"
          rx="11"
          fill="#bfdbfe"
          stroke={hl("myelin", "#2563eb")}
          strokeWidth={sw("myelin", 1.5)}
        />
      ))}
      {[194, 254, 314].map((x) => (
        <circle
          key={x}
          cx={x}
          cy="120"
          r={active === "node" ? 6 : 3.5}
          fill={active === "node" ? "#e11d48" : "#64748b"}
        />
      ))}

      {/* 軸突末梢 */}
      <g stroke={hl("terminal", "#64748b")} strokeWidth={sw("terminal", 3)} fill="none">
        <path d="M404,120 L440,88 M404,120 L446,120 M404,120 L440,152" />
      </g>
      {[
        [442, 86],
        [449, 120],
        [442, 154],
      ].map(([x, y]) => (
        <circle
          key={y}
          cx={x}
          cy={y}
          r="7"
          fill="#fecdd3"
          stroke={hl("terminal", "#be123c")}
          strokeWidth={sw("terminal", 1.5)}
        />
      ))}

      {/* 傳遞方向 */}
      <path d="M170,200 L330,200" stroke="#0f766e" strokeWidth="2.5" />
      <polygon points="330,193 344,200 330,207" fill="#0f766e" />
      <text x="250" y="224" textAnchor="middle" fontSize="12" fill="#1e293b">
        神經衝動傳遞方向
      </text>
    </g>
  );
}
