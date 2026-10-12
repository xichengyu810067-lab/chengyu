import type { SceneProps } from "../../types";

/** 人體器官系統圖層（viewBox 0 0 320 420）。正面示意圖：圖的左側是人體的右側。 */

type Label = { text: string; side: "l" | "r"; y: number; to: [number, number] };

function Labels({ items, color }: { items: Label[]; color: string }) {
  return (
    <g stroke="none" strokeDasharray="none">
      {items.map((l) => {
        const x = l.side === "l" ? 6 : 314;
        const lx = l.side === "l" ? 32 : 288;
        return (
          <g key={l.text}>
            <line
              x1={lx}
              y1={l.y - 4}
              x2={l.to[0]}
              y2={l.to[1]}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle cx={l.to[0]} cy={l.to[1]} r="2" fill={color} stroke="none" />
            <text
              x={x}
              y={l.y}
              fontSize="11"
              fontWeight="700"
              fill="#1e293b"
              stroke="none"
              textAnchor={l.side === "l" ? "start" : "end"}
            >
              {l.text}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** 底圖：人形輪廓 */
export function Body(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="320" height="420" fill="#ffffff" />
      <g fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5">
        <path d="M108,100 L84,112 L66,250 L80,252 L98,130 Z" />
        <path d="M212,100 L236,112 L254,250 L240,252 L222,130 Z" />
        <path d="M122,258 L158,258 L154,405 L128,405 Z" />
        <path d="M162,258 L198,258 L192,405 L166,405 Z" />
        <path d="M110,96 L210,96 Q225,100 224,120 L218,250 Q215,262 200,262 L120,262 Q105,262 102,250 L96,120 Q95,100 110,96 Z" />
        <rect x="150" y="78" width="20" height="20" />
        <circle cx="160" cy="50" r="30" />
      </g>
      <text x="160" y="416" textAnchor="middle" fontSize="10" fill="#64748b">
        正面圖：左側為人體的右側
      </text>
    </g>
  );
}

export function Skeletal(_: SceneProps) {
  const ribs = Array.from({ length: 6 }, (_, i) => 118 + i * 13);
  return (
    <g fill="none" stroke="#475569" strokeLinecap="round">
      <ellipse cx="160" cy="46" rx="24" ry="25" strokeWidth="3" fill="#f8fafc" />
      <path d="M142,60 Q160,80 178,60" strokeWidth="2.5" />
      <line x1="160" y1="78" x2="160" y2="244" strokeWidth="6" strokeDasharray="7 2" />
      <path d="M160,102 L112,106 M160,102 L208,106" strokeWidth="3" />
      {ribs.map((y) => (
        <path
          key={y}
          d={`M160,${y} Q128,${y} 120,${y + 14} M160,${y} Q192,${y} 200,${y + 14}`}
          strokeWidth="2.5"
        />
      ))}
      <path d="M126,236 Q160,264 194,236 L198,256 Q160,280 122,256 Z" strokeWidth="3" />
      <path
        d="M100,110 L88,180 M88,184 L76,246 M220,110 L232,180 M232,184 L244,246"
        strokeWidth="4"
      />
      <path
        d="M140,262 L141,330 M141,336 L141,400 M180,262 L179,330 M179,336 L179,400"
        strokeWidth="5"
      />
      <Labels
        color="#475569"
        items={[
          { text: "頭骨", side: "l", y: 40, to: [138, 44] },
          { text: "肋骨", side: "l", y: 142, to: [124, 140] },
          { text: "脊椎", side: "l", y: 262, to: [158, 236] },
          { text: "股骨", side: "l", y: 300, to: [140, 300] },
          { text: "骨盆", side: "r", y: 258, to: [194, 250] },
        ]}
      />
    </g>
  );
}

export function Respiratory(_: SceneProps) {
  return (
    <g>
      <line x1="156" y1="84" x2="156" y2="118" stroke="#0284c7" strokeWidth="6" />
      <path d="M156,118 L140,132 M156,118 L174,132" stroke="#0284c7" strokeWidth="4" fill="none" />
      <ellipse cx="136" cy="150" rx="20" ry="34" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      <ellipse cx="184" cy="152" rx="18" ry="32" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      <path d="M114,192 Q160,172 206,192" fill="none" stroke="#0369a1" strokeWidth="3" />
      <Labels
        color="#0284c7"
        items={[
          { text: "氣管", side: "r", y: 98, to: [156, 100] },
          { text: "肺", side: "l", y: 122, to: [128, 140] },
          { text: "橫膈", side: "l", y: 198, to: [120, 190] },
        ]}
      />
    </g>
  );
}

export function Circulatory(_: SceneProps) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M162,142 L162,82 M164,132 L104,112 L78,248 M168,132 L216,112 L242,248 M166,172 L166,248 L144,262 L144,400 M166,248 L176,262 L176,400"
        stroke="#dc2626"
        strokeWidth="3"
      />
      <path
        d="M154,142 L154,82 M152,136 L98,118 L72,248 M172,138 L222,118 L248,248 M158,176 L158,252 L136,264 L136,400 M158,252 L184,264 L184,400"
        stroke="#2563eb"
        strokeWidth="2.5"
      />
      <path
        d="M168,150 C160,138 144,146 150,160 L168,178 L186,160 C192,146 176,138 168,150 Z"
        fill="#ef4444"
        stroke="#7f1d1d"
        strokeWidth="1.5"
      />
      <Labels
        color="#dc2626"
        items={[
          { text: "心臟", side: "r", y: 160, to: [182, 158] },
          { text: "動脈", side: "r", y: 360, to: [176, 360] },
          { text: "靜脈", side: "l", y: 360, to: [136, 360] },
        ]}
      />
    </g>
  );
}

export function Digestive(_: SceneProps) {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M164,72 L164,172" stroke="#b45309" strokeWidth="5" fill="none" />
      <path
        d="M114,178 Q140,166 162,178 L158,196 Q132,204 114,196 Z"
        fill="#a16207"
        fillOpacity="0.75"
        stroke="#713f12"
      />
      <path
        d="M164,172 Q192,166 196,188 Q196,212 174,208 Q162,206 160,196 Z"
        fill="#fdba74"
        stroke="#c2410c"
        strokeWidth="1.5"
      />
      <path
        d="M122,252 L122,212 L198,212 L198,252 L176,258"
        fill="none"
        stroke="#92400e"
        strokeWidth="7"
      />
      <path
        d="M134,222 Q150,216 166,222 Q182,228 166,234 Q150,240 134,234 Q122,228 140,228 Q160,230 178,236 Q186,244 168,246 Q150,248 138,244"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="4"
      />
      <Labels
        color="#b45309"
        items={[
          { text: "食道", side: "r", y: 128, to: [164, 126] },
          { text: "胃", side: "r", y: 192, to: [192, 190] },
          { text: "小腸", side: "r", y: 238, to: [178, 236] },
          { text: "肝臟", side: "l", y: 178, to: [120, 186] },
          { text: "大腸", side: "l", y: 228, to: [122, 228] },
        ]}
      />
    </g>
  );
}

export function Nervous(_: SceneProps) {
  return (
    <g fill="none" strokeLinecap="round">
      <ellipse cx="160" cy="42" rx="22" ry="17" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
      <path d="M146,40 Q152,32 160,40 Q168,48 174,40" stroke="#db2777" strokeWidth="1.5" />
      <line x1="160" y1="58" x2="160" y2="240" stroke="#ca8a04" strokeWidth="4" />
      <path
        d="M160,104 L100,118 L74,248 M160,104 L220,118 L246,248 M160,238 L142,262 L140,402 M160,238 L178,262 L180,402 M160,130 L124,138 M160,130 L196,138 M160,160 L122,168 M160,160 L198,168"
        stroke="#eab308"
        strokeWidth="2"
      />
      <Labels
        color="#a16207"
        items={[
          { text: "腦", side: "r", y: 36, to: [176, 40] },
          { text: "脊髓", side: "r", y: 216, to: [160, 212] },
          { text: "神經", side: "l", y: 330, to: [140, 330] },
        ]}
      />
    </g>
  );
}
