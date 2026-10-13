import type { SceneProps } from "../../types";

/**
 * 海岸地形（viewBox 0 0 480 340）。
 * 上半部：岩岸側視示意（海階、海蝕崖、海蝕平台、海蝕門、海蝕柱）
 * 下半部：沙岸俯視示意（沙嘴、沙洲與潟湖、陸連島）
 */
const GLOW: Record<string, { cx: number; cy: number; rx: number; ry: number }> = {
  terrace: { cx: 100, cy: 52, rx: 52, ry: 14 },
  cliff: { cx: 155, cy: 88, rx: 16, ry: 38 },
  platform: { cx: 212, cy: 121, rx: 50, ry: 10 },
  arch: { cx: 326, cy: 110, rx: 34, ry: 36 },
  stack: { cx: 405, cy: 118, rx: 18, ry: 36 },
  spit: { cx: 105, cy: 266, rx: 70, ry: 16 },
  lagoon: { cx: 262, cy: 272, rx: 76, ry: 24 },
  tombolo: { cx: 428, cy: 288, rx: 26, ry: 42 },
};

export default function CoastScene({ active }: SceneProps) {
  const glow = active ? GLOW[active] : undefined;
  return (
    <g>
      <rect x="0" y="0" width="480" height="340" fill="#f8fafc" />
      {/* ── 上半部：側視 ── */}
      <rect x="0" y="0" width="480" height="165" fill="#f0f9ff" />
      <rect x="0" y="120" width="480" height="45" fill="#93c5fd" />
      <polygon
        points="0,165 0,30 40,30 62,54 150,54 150,62 158,108 166,120 262,123 300,165"
        fill="#a8a29e"
        stroke="#57534e"
        strokeWidth="1.5"
      />
      {/* 海階面與海蝕崖強調線 */}
      <line x1="62" y1="54" x2="150" y2="54" stroke="#65a30d" strokeWidth="4" />
      <path d="M150,54 L150,62 L158,108" stroke="#44403c" strokeWidth="3" fill="none" />
      {/* 崖腳的海蝕洞（凹壁） */}
      <path d="M158,108 Q148,113 156,119" fill="#57534e" stroke="#44403c" strokeWidth="1" />
      {/* 海蝕平台 */}
      <line x1="166" y1="120" x2="262" y2="123" stroke="#78716c" strokeWidth="3" />
      {/* 海蝕門 */}
      <rect x="302" y="86" width="14" height="79" fill="#a8a29e" stroke="#57534e" />
      <rect x="337" y="86" width="14" height="79" fill="#a8a29e" stroke="#57534e" />
      <path d="M298,92 Q326,70 355,92 L351,104 Q326,90 306,104 Z" fill="#a8a29e" stroke="#57534e" />
      {/* 海蝕柱 */}
      <polygon points="395,165 398,98 405,90 413,99 416,165" fill="#a8a29e" stroke="#57534e" />
      <line x1="0" y1="120" x2="480" y2="120" stroke="#1d4ed8" strokeDasharray="4 3" />
      <text x="474" y="114" fontSize="10" textAnchor="end" fill="#1e3a8a">
        現在海平面
      </text>
      <text x="8" y="16" fontSize="12" fontWeight="700" fill="#1e293b">
        岩岸（側視示意）
      </text>
      {/* ── 下半部：俯視 ── */}
      <rect x="0" y="172" width="480" height="168" fill="#bfdbfe" />
      <path
        d="M0,172 L480,172 L480,252 L440,252 C420,250 400,248 380,246 L330,246 C300,248 260,250 200,250 L150,252 C110,254 70,256 46,258 L0,262 Z"
        fill="#fef3c7"
        stroke="#a16207"
        strokeWidth="1"
      />
      {/* 沙嘴：自海岸向外延伸、末端彎曲 */}
      <path
        d="M40,258 C80,264 130,270 160,272 C170,272 176,268 172,262"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* 潟湖與沙洲 */}
      <path d="M196,251 L332,247 L334,282 L194,286 Z" fill="#99f6e4" />
      <path
        d="M186,287 C230,284 300,282 344,280"
        stroke="#fbbf24"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* 陸連島 */}
      <path d="M420,250 C424,272 428,292 430,306" stroke="#fbbf24" strokeWidth="9" fill="none" />
      <ellipse cx="432" cy="316" rx="22" ry="14" fill="#a8a29e" stroke="#57534e" />
      <text x="8" y="188" fontSize="12" fontWeight="700" fill="#1e293b">
        沙岸（俯視示意）
      </text>
      <text x="40" y="222" fontSize="12" fill="#92400e">
        陸地
      </text>
      <text x="40" y="318" fontSize="12" fill="#1d4ed8">
        海洋
      </text>
      {glow && <ellipse {...glow} fill="#f43f5e" opacity="0.18" stroke="#e11d48" strokeWidth="2" />}
    </g>
  );
}
