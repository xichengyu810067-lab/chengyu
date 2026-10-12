import type { SceneProps } from "../../types";

/** 蒸餾裝置示意圖（viewBox 0 0 480 320） */
export default function DistillationScene({ active }: SceneProps) {
  const hl = (id: string, base: string, on = "#e11d48") => (active === id ? on : base);
  const w = (id: string, base: number) => (active === id ? base + 2 : base);
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f8fafc" />
      {/* 桌面 */}
      <rect x="0" y="292" width="480" height="28" fill="#e2e8f0" />

      {/* 酒精燈 */}
      <polygon
        points="85,292 135,292 128,262 92,262"
        fill="#dbeafe"
        stroke={hl("heat", "#64748b")}
        strokeWidth={w("heat", 2)}
      />
      <rect x="104" y="252" width="12" height="10" fill="#94a3b8" />
      <path d="M110,236 C102,246 104,252 110,252 C116,252 118,246 110,236 Z" fill="#fb923c" />
      <path d="M110,242 C106,248 107,251 110,251 C113,251 114,248 110,242 Z" fill="#fde047" />

      {/* 三腳架與陶瓷纖維網 */}
      <line x1="72" y1="292" x2="80" y2="240" stroke="#475569" strokeWidth="3" />
      <line x1="148" y1="292" x2="140" y2="240" stroke="#475569" strokeWidth="3" />
      <rect x="68" y="234" width="84" height="6" fill="#f1f5f9" stroke="#94a3b8" />

      {/* 蒸餾瓶 */}
      <rect
        x="102"
        y="105"
        width="16"
        height="62"
        fill="#ffffff"
        stroke={hl("flask", "#475569")}
        strokeWidth="2"
      />
      <circle
        cx="110"
        cy="197"
        r="34"
        fill="#ffffff"
        stroke={hl("flask", "#475569")}
        strokeWidth="2"
      />
      <path d="M76.95,205 A34,34 0 0 0 143.05,205 Z" fill="#bae6fd" opacity="0.9" />
      {/* 沸石 */}
      <g fill={hl("chips", "#475569")}>
        <polygon points="98,224 104,222 105,227 99,228" />
        <polygon points="110,226 116,224 117,229 111,230" />
        <polygon points="121,221 126,220 127,225 122,226" />
      </g>
      {/* 橡皮塞 */}
      <rect x="99" y="98" width="22" height="10" rx="2" fill="#a16207" />

      {/* 溫度計 */}
      <line
        x1="110"
        y1="58"
        x2="110"
        y2="128"
        stroke={hl("thermo", "#94a3b8")}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line x1="110" y1="80" x2="110" y2="128" stroke="#ef4444" strokeWidth="1.5" />
      <circle cx="110" cy="130" r="4" fill="#ef4444" />

      {/* 支管 */}
      <line x1="118" y1="125" x2="180" y2="153" stroke="#94a3b8" strokeWidth="7" />
      <line x1="118" y1="125" x2="180" y2="153" stroke="#f8fafc" strokeWidth="3" />

      {/* 冷凝管：外管（冷卻水）與內管（蒸氣） */}
      <polygon
        points="184.8,168.9 320.8,228.9 331.2,205.1 195.2,145.1"
        fill="#bfdbfe"
        stroke={hl("condenser", "#3b82f6")}
        strokeWidth={w("condenser", 2)}
      />
      <line x1="178" y1="152" x2="338" y2="222" stroke="#64748b" strokeWidth="6" />
      <line x1="178" y1="152" x2="338" y2="222" stroke="#f8fafc" strokeWidth="2.5" />
      {/* 冷水入口（低處）與出口（高處） */}
      <rect
        x="311"
        y="222"
        width="8"
        height="32"
        fill="#93c5fd"
        stroke={hl("water-in", "#3b82f6")}
        strokeWidth={w("water-in", 1.5)}
      />
      <polygon points="315,236 309,246 321,246" fill="#1d4ed8" />
      <rect x="197" y="118" width="8" height="30" fill="#93c5fd" stroke="#3b82f6" />
      <polygon points="201,118 195,128 207,128" fill="#1d4ed8" />
      <text x="262" y="268" fontSize="12" fill="#1e3a8a">
        冷水入
      </text>
      <text x="211" y="122" fontSize="12" fill="#1e3a8a">
        冷水出
      </text>

      {/* 接收管與錐形瓶 */}
      <path d="M338,222 L366,236 L370,246" fill="none" stroke="#64748b" strokeWidth="5" />
      <rect x="364" y="238" width="16" height="14" fill="#ffffff" stroke="#475569" />
      <polygon
        points="364,252 380,252 402,292 342,292"
        fill="#ffffff"
        stroke={hl("receiver", "#475569")}
        strokeWidth={w("receiver", 2)}
      />
      <polygon points="350.8,276 393.2,276 402,292 342,292" fill="#bae6fd" />

      {/* 標籤 */}
      <text x="120" y="66" fontSize="12" fill="#1e293b">
        溫度計
      </text>
      <text x="22" y="190" fontSize="12" fill="#1e293b">
        蒸餾瓶
      </text>
      <text x="232" y="150" fontSize="12" fill="#1e293b">
        冷凝管
      </text>
      <text x="410" y="268" fontSize="12" fill="#1e293b">
        錐形瓶
      </text>
      <text x="110" y="311" fontSize="12" fill="#1e293b" textAnchor="middle">
        酒精燈
      </text>
    </g>
  );
}
