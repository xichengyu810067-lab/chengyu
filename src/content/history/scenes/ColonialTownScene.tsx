import type { SceneProps } from "../../types";

/** 日治時期城鎮示意圖：車站、鐵路、公學校、製糖工場、派出所（viewBox 0 0 480 320） */
export default function ColonialTownScene({ active }: SceneProps) {
  const ring = (id: string) => (active === id ? "#e11d48" : "none");
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f0f9ff" />
      <rect x="0" y="200" width="480" height="120" fill="#e7e5e4" />

      {/* 甘蔗田 */}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={12 + i * 9}
          y1={196}
          x2={12 + i * 9}
          y2={160}
          stroke="#15803d"
          strokeWidth="3"
        />
      ))}

      {/* 製糖工場 */}
      <g stroke={ring("sugar")} strokeWidth="3">
        <rect x="40" y="110" width="90" height="70" fill="#d6d3d1" />
        <polygon points="40,110 85,86 130,110" fill="#78716c" />
        <rect x="100" y="40" width="12" height="70" fill="#57534e" />
        <rect x="116" y="56" width="10" height="54" fill="#57534e" />
      </g>
      <circle cx="108" cy="30" r="9" fill="#cbd5e1" />
      <circle cx="120" cy="20" r="11" fill="#e2e8f0" />
      <circle cx="124" cy="44" r="7" fill="#cbd5e1" />
      <text x="85" y="200" textAnchor="middle" fontSize="11" fill="#1e293b">
        製糖工場
      </text>

      {/* 車站 */}
      <g stroke={ring("clock")} strokeWidth="3">
        <rect x="180" y="140" width="120" height="70" fill="#fef3c7" />
        <polygon points="172,140 240,104 308,140" fill="#b45309" />
        <rect x="226" y="176" width="28" height="34" fill="#92400e" />
      </g>
      {/* 時鐘 */}
      <g stroke={ring("clock")} strokeWidth="3">
        <circle cx="240" cy="126" r="13" fill="#ffffff" />
      </g>
      <circle cx="240" cy="126" r="13" fill="none" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="240" y1="126" x2="240" y2="117" stroke="#1e293b" strokeWidth="2" />
      <line x1="240" y1="126" x2="247" y2="126" stroke="#1e293b" strokeWidth="2" />
      <text x="240" y="160" textAnchor="middle" fontSize="12" fill="#1e293b">
        車站
      </text>

      {/* 公學校 */}
      <g stroke={ring("school")} strokeWidth="3">
        <rect x="340" y="130" width="120" height="66" fill="#e0e7ff" />
        <polygon points="334,130 400,108 466,130" fill="#4338ca" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={350 + i * 28} y={146} width="16" height="16" fill="#ffffff" />
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={380 + i * 14} cy={206} r="4" fill="#1e293b" />
          <rect x={377 + i * 14} y={210} width="6" height="10" fill="#334155" />
        </g>
      ))}
      <text x="400" y="190" textAnchor="middle" fontSize="12" fill="#1e293b">
        公學校
      </text>

      {/* 派出所 */}
      <g stroke={ring("police")} strokeWidth="3">
        <rect x="318" y="226" width="66" height="44" fill="#f1f5f9" />
        <polygon points="312,226 351,208 390,226" fill="#475569" />
      </g>
      <text x="351" y="254" textAnchor="middle" fontSize="12" fill="#1e293b">
        派出所
      </text>

      {/* 鐵路 */}
      <g stroke={ring("railway")} strokeWidth="3">
        <line x1="0" y1="286" x2="480" y2="286" stroke="#57534e" strokeWidth="3" />
        <line x1="0" y1="296" x2="480" y2="296" stroke="#57534e" strokeWidth="3" />
      </g>
      {Array.from({ length: 24 }, (_, i) => (
        <rect key={i} x={i * 20 + 4} y={283} width="5" height="16" fill="#a8a29e" />
      ))}
      {/* 火車 */}
      <rect x="40" y="252" width="56" height="30" rx="4" fill="#1e293b" />
      <rect x="84" y="236" width="10" height="16" fill="#1e293b" />
      <rect x="100" y="258" width="50" height="24" rx="3" fill="#7f1d1d" />
      <rect x="154" y="258" width="50" height="24" rx="3" fill="#7f1d1d" />
      {[52, 80, 112, 138, 166, 192].map((x) => (
        <circle key={x} cx={x} cy={284} r="5" fill="#334155" />
      ))}
      <circle cx="90" cy="226" r="7" fill="#e2e8f0" />
      <circle cx="100" cy="214" r="9" fill="#f1f5f9" />
      <text x="130" y="312" textAnchor="middle" fontSize="11" fill="#1e293b">
        縱貫鐵路
      </text>
    </g>
  );
}
