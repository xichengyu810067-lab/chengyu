import type { SceneProps } from "../../types";

/** 社區示意圖（viewBox 0 0 480 320）：上排公家機關，下排社區生活設施 */
export default function CommunityScene({ active }: SceneProps) {
  const stroke = (id: string) => (active === id ? "#e11d48" : "#475569");
  const sw = (id: string) => (active === id ? 3.5 : 1.5);
  const label = (x: number, y: number, text: string, size = 12) => (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="700" fill="#1e293b">
      {text}
    </text>
  );
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f1f5f9" />
      {/* 天空與草地 */}
      <rect x="0" y="0" width="480" height="40" fill="#e0f2fe" />
      <rect x="0" y="290" width="480" height="30" fill="#dcfce7" />
      {/* 主要道路 */}
      <rect x="0" y="146" width="480" height="32" fill="#cbd5e1" />
      <line
        x1="0"
        y1="162"
        x2="480"
        y2="162"
        stroke="#f8fafc"
        strokeWidth="2"
        strokeDasharray="12 10"
      />
      <text x="470" y="158" textAnchor="end" fontSize="10" fill="#475569">
        中正路
      </text>

      {/* 市政府 */}
      <rect
        x="10"
        y="52"
        width="90"
        height="88"
        fill="#fef3c7"
        stroke={stroke("govt")}
        strokeWidth={sw("govt")}
      />
      <rect x="44" y="40" width="22" height="12" fill="#fde68a" stroke="#475569" />
      <line x1="55" y1="40" x2="55" y2="22" stroke="#475569" strokeWidth="1.5" />
      <rect x="55" y="22" width="14" height="9" fill="#93c5fd" />
      {[20, 42, 64, 86].map((x) => (
        <rect key={`gw${x}`} x={x - 6} y="64" width="12" height="14" fill="#bae6fd" />
      ))}
      <rect x="46" y="112" width="18" height="28" fill="#92400e" />
      {label(55, 100, "市政府")}

      {/* 區公所 */}
      <rect
        x="110"
        y="72"
        width="72"
        height="68"
        fill="#e0e7ff"
        stroke={stroke("hall")}
        strokeWidth={sw("hall")}
      />
      <polygon points="104,72 146,52 188,72" fill="#c7d2fe" stroke="#475569" />
      <rect x="138" y="116" width="16" height="24" fill="#4338ca" opacity="0.6" />
      {label(146, 104, "區公所")}

      {/* 地方法院 */}
      <polygon
        points="186,62 237,36 288,62"
        fill="#e2e8f0"
        stroke={stroke("court")}
        strokeWidth={sw("court")}
      />
      <rect
        x="192"
        y="62"
        width="90"
        height="78"
        fill="#f8fafc"
        stroke={stroke("court")}
        strokeWidth={sw("court")}
      />
      {[202, 220, 238, 256, 272].map((x) => (
        <rect key={`col${x}`} x={x - 3} y="66" width="6" height="44" fill="#cbd5e1" />
      ))}
      <text x="237" y="56" textAnchor="middle" fontSize="12" fill="#1e293b">
        ⚖
      </text>
      {label(237, 128, "地方法院")}

      {/* 警察局 */}
      <rect
        x="292"
        y="72"
        width="72"
        height="68"
        fill="#dbeafe"
        stroke={stroke("police")}
        strokeWidth={sw("police")}
      />
      <rect x="292" y="72" width="72" height="12" fill="#1d4ed8" />
      <circle cx="328" cy="66" r="5" fill="#ef4444" />
      <rect x="320" y="116" width="16" height="24" fill="#1e3a8a" opacity="0.7" />
      {label(328, 106, "警察局")}

      {/* 學校 */}
      <rect
        x="374"
        y="62"
        width="96"
        height="78"
        fill="#fee2e2"
        stroke={stroke("school")}
        strokeWidth={sw("school")}
      />
      {[388, 410, 434, 456].map((x) => (
        <rect
          key={`sw${x}`}
          x={x - 7}
          y="72"
          width="14"
          height="12"
          fill="#fecaca"
          stroke="#f87171"
        />
      ))}
      <rect x="415" y="112" width="18" height="28" fill="#7f1d1d" opacity="0.7" />
      <line x1="462" y1="62" x2="462" y2="34" stroke="#475569" strokeWidth="1.5" />
      <rect x="462" y="34" width="12" height="8" fill="#f87171" />
      {label(422, 104, "學校")}

      {/* 圖書館 */}
      <rect
        x="10"
        y="194"
        width="80"
        height="72"
        fill="#ede9fe"
        stroke={stroke("library")}
        strokeWidth={sw("library")}
      />
      <rect x="22" y="206" width="56" height="20" fill="#ddd6fe" />
      <text x="50" y="221" textAnchor="middle" fontSize="12" fill="#5b21b6">
        📚
      </text>
      <rect x="42" y="244" width="16" height="22" fill="#5b21b6" opacity="0.6" />
      {label(50, 284, "圖書館")}

      {/* 社區活動中心 */}
      <rect
        x="100"
        y="194"
        width="86"
        height="72"
        fill="#ffedd5"
        stroke={stroke("center")}
        strokeWidth={sw("center")}
      />
      <rect x="110" y="204" width="66" height="16" fill="#fed7aa" />
      <text x="143" y="216" textAnchor="middle" fontSize="9" fill="#9a3412">
        長青食堂・陪讀
      </text>
      <rect x="134" y="242" width="18" height="24" fill="#9a3412" opacity="0.6" />
      {label(143, 284, "社區活動中心")}

      {/* 公園 */}
      <rect
        x="196"
        y="190"
        width="96"
        height="88"
        rx="10"
        fill="#bbf7d0"
        stroke={stroke("park")}
        strokeWidth={sw("park")}
      />
      <circle cx="214" cy="210" r="12" fill="#4ade80" />
      <circle cx="274" cy="212" r="13" fill="#4ade80" />
      <circle cx="226" cy="258" r="10" fill="#4ade80" />
      <rect x="248" y="250" width="26" height="6" fill="#a16207" />
      <path d="M200,236 Q244,224 288,240" fill="none" stroke="#fef9c3" strokeWidth="5" />
      {label(244, 296, "社區公園")}

      {/* 廟宇 */}
      <rect
        x="302"
        y="212"
        width="72"
        height="54"
        fill="#fee2e2"
        stroke={stroke("temple")}
        strokeWidth={sw("temple")}
      />
      <path d="M294,214 Q338,186 382,214 Z" fill="#dc2626" stroke="#7f1d1d" />
      <rect x="328" y="236" width="20" height="30" fill="#b91c1c" />
      <circle cx="316" cy="232" r="5" fill="#fbbf24" />
      <circle cx="360" cy="232" r="5" fill="#fbbf24" />
      {label(338, 284, "廟宇")}

      {/* 新住民小吃店 */}
      <rect
        x="384"
        y="204"
        width="88"
        height="62"
        fill="#fef9c3"
        stroke={stroke("shop")}
        strokeWidth={sw("shop")}
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={`aw${i}`}
          x={384 + i * 11}
          y="204"
          width="11"
          height="12"
          fill={i % 2 ? "#f97316" : "#fde68a"}
        />
      ))}
      <rect x="394" y="222" width="68" height="16" fill="#ffffff" stroke="#f59e0b" />
      <text x="428" y="234" textAnchor="middle" fontSize="9" fill="#92400e">
        越南河粉・奶茶
      </text>
      <rect x="420" y="244" width="16" height="22" fill="#92400e" opacity="0.6" />
      {label(428, 284, "新住民小吃店", 11)}
    </g>
  );
}
