import type { SceneProps } from "../../types";

/** 17 世紀的大員與台江內海示意圖（viewBox 0 0 480 320，非精確比例） */
export default function ZeelandiaScene({ active }: SceneProps) {
  const hl = (id: string) => active === id;
  const ring = (id: string) => (hl(id) ? "#e11d48" : "none");
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f0f9ff" />
      {/* 外海 */}
      <rect x="0" y="0" width="172" height="320" fill="#93c5fd" />
      {/* 台江內海 */}
      <rect
        x="172"
        y="0"
        width="168"
        height="320"
        fill={hl("lagoon") ? "#7dd3fc" : "#bae6fd"}
        style={{ transition: "fill .3s" }}
      />
      {/* 大員沙洲（一鯤身） */}
      <path
        d="M150,20 C185,30 210,80 205,150 C200,220 210,270 190,310 L150,310 C140,250 130,200 138,130 C142,80 135,40 150,20 Z"
        fill="#fde68a"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      {/* 赤崁一側的陸地 */}
      <path
        d="M330,0 C345,80 325,160 340,240 C345,280 335,300 340,320 L480,320 L480,0 Z"
        fill="#bbf7d0"
      />

      {/* 熱蘭遮城 */}
      <g stroke={ring("fort")} strokeWidth="3">
        <rect x="140" y="70" width="56" height="50" fill="#c2410c" />
        <rect x="134" y="64" width="14" height="14" fill="#9a3412" />
        <rect x="188" y="64" width="14" height="14" fill="#9a3412" />
        <rect x="134" y="112" width="14" height="14" fill="#9a3412" />
        <rect x="188" y="112" width="14" height="14" fill="#9a3412" />
        <rect x="154" y="80" width="28" height="28" fill="#ea580c" />
      </g>
      <line x1="168" y1="80" x2="168" y2="50" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="168" y="50" width="18" height="4" fill="#dc2626" />
      <rect x="168" y="54" width="18" height="4" fill="#ffffff" />
      <rect x="168" y="58" width="18" height="4" fill="#2563eb" />

      {/* 大員市鎮 */}
      <g stroke={ring("town")} strokeWidth="2.5">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={150 + i * 16} y={198} width="13" height="12" fill="#fef3c7" />
            <polygon
              points={`${148 + i * 16},198 ${156.5 + i * 16},189 ${165 + i * 16},198`}
              fill="#b45309"
            />
          </g>
        ))}
        <rect x="156" y="222" width="13" height="12" fill="#fef3c7" />
        <polygon points="154,222 162.5,213 171,222" fill="#b45309" />
        <rect x="174" y="222" width="13" height="12" fill="#fef3c7" />
        <polygon points="172,222 180.5,213 189,222" fill="#b45309" />
      </g>

      {/* 外海的公司商船 */}
      <g stroke={ring("ship")} strokeWidth="2.5">
        <path d="M30,150 L95,150 L85,166 L40,166 Z" fill="#78350f" />
        <line x1="50" y1="150" x2="50" y2="104" stroke="#1e293b" strokeWidth="2" />
        <line x1="72" y1="150" x2="72" y2="98" stroke="#1e293b" strokeWidth="2" />
        <polygon points="50,106 50,138 36,134" fill="#f8fafc" />
        <polygon points="72,100 72,140 90,136" fill="#f8fafc" />
      </g>

      {/* 內海的中式帆船 */}
      <path d="M245,238 L290,238 L282,250 L252,250 Z" fill="#92400e" />
      <polygon points="266,238 266,212 282,232" fill="#fcd34d" />

      {/* 普羅民遮城 */}
      <g stroke={ring("provintia")} strokeWidth="3">
        <rect x="366" y="76" width="36" height="30" fill="#c2410c" />
        <rect x="374" y="64" width="20" height="14" fill="#ea580c" />
      </g>

      {/* 原住民族村社與鹿 */}
      <g stroke={ring("village")} strokeWidth="2.5">
        <polygon points="400,236 414,214 428,236" fill="#a16207" />
        <polygon points="426,246 440,224 454,246" fill="#a16207" />
        <ellipse cx="446" cy="200" rx="13" ry="7" fill="#b45309" />
        <circle cx="458" cy="193" r="5" fill="#b45309" />
        <line x1="440" y1="206" x2="440" y2="216" stroke="#78350f" strokeWidth="2" />
        <line x1="452" y1="206" x2="452" y2="216" stroke="#78350f" strokeWidth="2" />
        <path d="M458,188 L455,180 M460,188 L464,180" stroke="#78350f" strokeWidth="1.5" />
      </g>
      {/* 甘蔗田 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={360 + i * 8}
          y1={300}
          x2={360 + i * 8}
          y2={270}
          stroke="#15803d"
          strokeWidth="3"
        />
      ))}

      <text x="70" y="40" textAnchor="middle" fontSize="14" fill="#1e293b">
        外海
      </text>
      <text x="172" y="290" textAnchor="middle" fontSize="12" fill="#1e293b">
        大員（一鯤身）
      </text>
      <text x="270" y="40" textAnchor="middle" fontSize="14" fill="#1e293b">
        台江內海
      </text>
      <text x="410" y="40" textAnchor="middle" fontSize="14" fill="#1e293b">
        赤崁
      </text>
      <text x="384" y="124" textAnchor="middle" fontSize="11" fill="#1e293b">
        普羅民遮城
      </text>
      <text x="168" y="142" textAnchor="middle" fontSize="11" fill="#1e293b">
        熱蘭遮城
      </text>
      <text x="380" y="314" textAnchor="middle" fontSize="11" fill="#1e293b">
        甘蔗田
      </text>
    </g>
  );
}
