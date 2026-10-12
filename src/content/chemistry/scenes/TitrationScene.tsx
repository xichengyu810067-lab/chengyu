import type { SceneProps } from "../../types";

/** 酸鹼滴定裝置（viewBox 0 0 400 320） */
export default function TitrationScene({ active }: SceneProps) {
  const hl = (id: string, base: string) => (active === id ? "#e11d48" : base);
  const sw = (id: string, base: number) => (active === id ? base + 2 : base);
  return (
    <g>
      <rect x="0" y="0" width="400" height="320" fill="#f8fafc" />
      <rect x="0" y="300" width="400" height="20" fill="#e2e8f0" />

      {/* 鐵架與滴定管夾 */}
      <rect x="50" y="290" width="150" height="10" rx="2" fill="#475569" />
      <rect x="66" y="30" width="6" height="262" fill="#64748b" />
      <rect x="70" y="78" width="80" height="8" fill="#94a3b8" />
      <rect
        x="144"
        y="72"
        width="24"
        height="20"
        rx="3"
        fill="none"
        stroke="#475569"
        strokeWidth="3"
      />

      {/* 滴定管 */}
      <rect
        x="150"
        y="24"
        width="12"
        height="196"
        fill="#ffffff"
        stroke={hl("buret", "#64748b")}
        strokeWidth={sw("buret", 1.5)}
      />
      <rect x="151" y="60" width="10" height="160" fill="#dbeafe" />
      {Array.from({ length: 11 }, (_, i) => (
        <line
          key={`t${i}`}
          x1="150"
          x2={i % 5 === 0 ? 158 : 155}
          y1={40 + i * 16}
          y2={40 + i * 16}
          stroke="#475569"
          strokeWidth="1"
        />
      ))}

      {/* 活栓與尖嘴 */}
      <rect x="138" y="222" width="36" height="7" rx="2" fill={hl("stopcock", "#475569")} />
      <circle cx="156" cy="225.5" r="5" fill="#94a3b8" stroke="#334155" />
      <polygon points="152,229 160,229 157,250 155,250" fill="#cbd5e1" stroke="#64748b" />

      {/* 白紙 */}
      <rect
        x="96"
        y="296"
        width="120"
        height="5"
        fill="#ffffff"
        stroke={hl("paper", "#94a3b8")}
        strokeWidth={sw("paper", 1)}
      />

      {/* 錐形瓶 */}
      <rect x="146" y="252" width="20" height="12" fill="#ffffff" stroke="#475569" />
      <polygon
        points="146,264 166,264 196,296 116,296"
        fill="#ffffff"
        stroke={hl("flask", "#475569")}
        strokeWidth={sw("flask", 2)}
      />
      <polygon points="131,280 181,280 196,296 116,296" fill="#fbcfe8" />

      {/* 洗瓶 */}
      <path d="M308,228 L308,210 L288,204" fill="none" stroke="#0284c7" strokeWidth="3" />
      <rect x="300" y="228" width="16" height="10" fill="#0284c7" />
      <rect
        x="290"
        y="238"
        width="36"
        height="60"
        rx="8"
        fill="#e0f2fe"
        stroke={hl("wash", "#0284c7")}
        strokeWidth={sw("wash", 2)}
      />

      {/* 護目鏡 */}
      <path d="M340,288 C340,276 392,276 392,288" fill="none" stroke="#334155" strokeWidth="2" />
      <ellipse
        cx="352"
        cy="290"
        rx="12"
        ry="8"
        fill="#bae6fd"
        stroke={hl("goggles", "#0369a1")}
        strokeWidth={sw("goggles", 2)}
      />
      <ellipse
        cx="380"
        cy="290"
        rx="12"
        ry="8"
        fill="#bae6fd"
        stroke={hl("goggles", "#0369a1")}
        strokeWidth={sw("goggles", 2)}
      />
      <line x1="364" y1="289" x2="368" y2="289" stroke="#0369a1" strokeWidth="3" />

      <text x="230" y="40" fontSize="12" fill="#1e293b">
        NaOH 標準溶液
      </text>
      <line x1="228" y1="36" x2="164" y2="70" stroke="#94a3b8" strokeDasharray="3 3" />
      <text x="214" y="266" fontSize="12" fill="#1e293b">
        待測酸＋酚酞
      </text>
    </g>
  );
}
