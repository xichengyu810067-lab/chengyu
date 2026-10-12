import type { SceneProps } from "../../types";

/** 杜甫〈春望〉五言律詩圖層（viewBox 0 0 400 280） */
const LINES: [string, string][] = [
  ["國破山河在", "城春草木深"],
  ["感時花濺淚", "恨別鳥驚心"],
  ["烽火連三月", "家書抵萬金"],
  ["白頭搔更短", "渾欲不勝簪"],
];
const LIAN = ["首聯", "頷聯", "頸聯", "尾聯"];

const cy = (row: number) => 66 + row * 52;
const cxOut = (i: number) => 104 + i * 28;
const cxIn = (i: number) => 256 + i * 28;

export function PoemBase(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="280" fill="#fffbeb" />
      <text x="236" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e293b">
        〈春望〉　唐・杜甫
      </text>
      {LINES.map(([a, b], r) => (
        <g key={a}>
          {[...a].map((ch, i) => (
            <g key={`a${i}`}>
              <rect
                x={cxOut(i) - 12}
                y={cy(r) - 12}
                width="24"
                height="24"
                rx="3"
                fill="#ffffff"
                stroke="#e2e8f0"
              />
              <text x={cxOut(i)} y={cy(r) + 6} textAnchor="middle" fontSize="16" fill="#1e293b">
                {ch}
              </text>
            </g>
          ))}
          <text x="236" y={cy(r) + 6} textAnchor="middle" fontSize="14" fill="#64748b">
            ，
          </text>
          {[...b].map((ch, i) => (
            <g key={`b${i}`}>
              <rect
                x={cxIn(i) - 12}
                y={cy(r) - 12}
                width="24"
                height="24"
                rx="3"
                fill="#ffffff"
                stroke="#e2e8f0"
              />
              <text x={cxIn(i)} y={cy(r) + 6} textAnchor="middle" fontSize="16" fill="#1e293b">
                {ch}
              </text>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/** 圖層：四聯名稱 */
export function LianLayer(_: SceneProps) {
  return (
    <g>
      {LIAN.map((name, r) => (
        <g key={name}>
          <rect x="14" y={cy(r) - 18} width="60" height="36" rx="6" fill="#ede9fe" />
          <text
            x="44"
            y={cy(r) + 1}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#5b21b6"
          >
            {name}
          </text>
          <text x="44" y={cy(r) + 14} textAnchor="middle" fontSize="10" fill="#5b21b6">
            第 {r * 2 + 1}、{r * 2 + 2} 句
          </text>
        </g>
      ))}
    </g>
  );
}

/** 圖層：韻腳（偶數句末字） */
export function RhymeLayer(_: SceneProps) {
  return (
    <g>
      {LINES.map(([a], r) => (
        <circle
          key={a}
          cx={cxIn(4)}
          cy={cy(r)}
          r="15"
          fill="none"
          stroke="#d97706"
          strokeWidth="3"
        />
      ))}
      <circle
        cx={cxOut(4)}
        cy={cy(0)}
        r="15"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <text x="216" y="47" textAnchor="middle" fontSize="10" fill="#475569">
        首句不入韻
      </text>
      <text x="368" y="47" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">
        韻腳
      </text>
    </g>
  );
}

const GROUPS: { from: number; to: number; color: string }[] = [
  { from: 0, to: 1, color: "#2563eb" },
  { from: 2, to: 2, color: "#059669" },
  { from: 3, to: 4, color: "#e11d48" },
];

/** 圖層：頷聯、頸聯的對仗（相同顏色的底線＝詞性相對） */
export function DuiLayer(_: SceneProps) {
  return (
    <g>
      {[1, 2].map((r) => (
        <g key={r}>
          <rect
            x="88"
            y={cy(r) - 20}
            width="298"
            height="40"
            rx="8"
            fill="#10b981"
            opacity="0.14"
          />
          {GROUPS.map((g) => (
            <g key={g.color}>
              <rect
                x={cxOut(g.from) - 11}
                y={cy(r) + 14}
                width={(g.to - g.from) * 28 + 22}
                height="3"
                fill={g.color}
              />
              <rect
                x={cxIn(g.from) - 11}
                y={cy(r) + 14}
                width={(g.to - g.from) * 28 + 22}
                height="3"
                fill={g.color}
              />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}
