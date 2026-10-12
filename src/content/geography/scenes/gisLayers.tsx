import type { SceneProps } from "../../types";

/** GIS 疊圖分析（viewBox 0 0 400 300，示意）：替新醫院選址 */
const RIVER = "M0,50 C60,58 90,108 150,120 S250,132 300,175 S370,238 400,250";

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} x2={i * 50} y1="0" y2="300" stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} y1={i * 50} y2={i * 50} x1="0" x2="400" stroke="#e2e8f0" />
      ))}
      <g transform="translate(378 30)">
        <polygon points="0,-14 5,2 0,-3 -5,2" fill="#1e293b" />
        <text x="0" y="14" textAnchor="middle" fontSize="10" fill="#1e293b">
          N
        </text>
      </g>
      <g transform="translate(14 22)">
        <rect x="0" y="-4" width="100" height="4" fill="#1e293b" />
        <text x="0" y="-8" fontSize="9" fill="#1e293b">
          0
        </text>
        <text x="100" y="-8" fontSize="9" textAnchor="middle" fill="#1e293b">
          1 公里
        </text>
      </g>
    </g>
  );
}

/** 坡度：東北側丘陵坡度大 */
export function Slope(_: SceneProps) {
  return (
    <g>
      <path
        d="M240,0 L400,0 L400,150 C360,150 330,120 300,110 C270,95 250,60 240,0 Z"
        fill="#d97706"
        opacity="0.35"
      />
      {Array.from({ length: 10 }, (_, i) => (
        <line
          key={i}
          x1={262 + i * 14}
          y1={4}
          x2={290 + i * 14}
          y2={100 + (i > 6 ? 40 : 0)}
          stroke="#b45309"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}
      <text x="330" y="132" fontSize="11" fill="#92400e" textAnchor="middle">
        陡坡區
      </text>
    </g>
  );
}

/** 河川與洪泛區（河道兩側的環域） */
export function Flood(_: SceneProps) {
  return (
    <g>
      <path d={RIVER} fill="none" stroke="#93c5fd" strokeWidth="56" opacity="0.6" />
      <path d={RIVER} fill="none" stroke="#2563eb" strokeWidth="4" />
      <text x="40" y="96" fontSize="11" fill="#1d4ed8">
        洪泛區
      </text>
    </g>
  );
}

/** 主要道路 */
export function Roads(_: SceneProps) {
  return (
    <g>
      <line x1="0" y1="210" x2="400" y2="210" stroke="#475569" strokeWidth="6" />
      <line x1="200" y1="110" x2="200" y2="300" stroke="#475569" strokeWidth="6" />
      <line
        x1="0"
        y1="210"
        x2="400"
        y2="210"
        stroke="#f8fafc"
        strokeWidth="1"
        strokeDasharray="6 6"
      />
      <line
        x1="200"
        y1="110"
        x2="200"
        y2="300"
        stroke="#f8fafc"
        strokeWidth="1"
        strokeDasharray="6 6"
      />
      <text x="392" y="202" fontSize="10" textAnchor="end" fill="#334155">
        主要道路
      </text>
    </g>
  );
}

/** 土地利用：住宅區、農地、森林保護區 */
export function LandUse(_: SceneProps) {
  return (
    <g>
      <rect x="40" y="222" width="140" height="66" fill="#f472b6" opacity="0.45" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x={50 + (i % 6) * 21}
          y={232 + Math.floor(i / 6) * 26}
          width="14"
          height="14"
          fill="#be185d"
          opacity="0.6"
        />
      ))}
      <text x="110" y="284" fontSize="10" textAnchor="middle" fill="#831843">
        住宅區
      </text>
      <rect x="212" y="220" width="176" height="74" fill="#bef264" opacity="0.5" />
      <text x="370" y="286" fontSize="10" textAnchor="end" fill="#3f6212">
        農地／空地
      </text>
      <path d="M270,0 L400,0 L400,110 C350,105 300,80 270,0 Z" fill="#15803d" opacity="0.4" />
      <text x="372" y="60" fontSize="10" textAnchor="middle" fill="#14532d">
        森林保護區
      </text>
    </g>
  );
}

/** 候選地 A、B、C */
export function Sites(_: SceneProps) {
  const sites = [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 330, y: 62 },
    { id: "C", x: 250, y: 245 },
  ];
  return (
    <g>
      {sites.map((s) => (
        <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
          <circle r="11" fill="#ffffff" stroke="#e11d48" strokeWidth="3" />
          <text y="4" fontSize="12" fontWeight="700" textAnchor="middle" fill="#be123c">
            {s.id}
          </text>
        </g>
      ))}
    </g>
  );
}
