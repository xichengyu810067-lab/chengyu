import type { SceneProps } from "../../types";

/**
 * 心臟縱切示意圖（viewBox 0 0 400 340）。
 * 依解剖圖慣例，圖的左側是人體的右側。不標示腔室名稱，方便「找找看」模式。
 */
export default function HeartScene({ active }: SceneProps) {
  const sw = (id: string, base = 2) => (active === id ? 5 : base);
  const sc = (id: string, base: string) => (active === id ? "#f59e0b" : base);
  return (
    <g>
      <rect x="0" y="0" width="400" height="340" fill="#f8fafc" />

      {/* 心臟外形 */}
      <path
        d="M95,110 Q95,95 115,95 L285,95 Q305,95 305,115 L305,240 Q300,300 230,318 Q200,326 175,312 Q100,280 95,220 Z"
        fill="#fecdd3"
        stroke="#9f1239"
        strokeWidth="3"
      />

      {/* 肺動脈：由右心室往上，分支到左右兩肺（畫在大靜脈與主動脈後方） */}
      <path
        d="M182,200 L182,84 Q182,70 166,70 L58,70"
        fill="none"
        stroke={sc("pa", "#2563eb")}
        strokeWidth={active === "pa" ? 20 : 16}
        strokeLinecap="round"
      />
      <path
        d="M182,84 Q182,70 198,70 L262,70"
        fill="none"
        stroke={sc("pa", "#2563eb")}
        strokeWidth={active === "pa" ? 20 : 16}
        strokeLinecap="round"
      />

      {/* 上大靜脈、下大靜脈（缺氧血流回右心房） */}
      <rect x="120" y="26" width="26" height="84" rx="6" fill="#60a5fa" stroke="#1d4ed8" />
      <rect x="46" y="148" width="62" height="22" rx="6" fill="#60a5fa" stroke="#1d4ed8" />

      {/* 肺靜脈（充氧血流回左心房） */}
      <rect x="294" y="118" width="62" height="15" rx="5" fill="#f87171" stroke="#b91c1c" />
      <rect x="294" y="146" width="62" height="15" rx="5" fill="#f87171" stroke="#b91c1c" />

      {/* 右心房、右心室（圖左側） */}
      <rect
        x="104"
        y="106"
        width="66"
        height="70"
        rx="12"
        fill="#bfdbfe"
        stroke={sc("ra", "#1e40af")}
        strokeWidth={sw("ra")}
      />
      <path
        d="M104,190 L192,190 L192,300 Q140,285 108,228 Z"
        fill="#93c5fd"
        stroke={sc("rv", "#1e40af")}
        strokeWidth={sw("rv")}
      />

      {/* 左心房、左心室（圖右側，左心室壁最厚） */}
      <rect
        x="230"
        y="106"
        width="66"
        height="70"
        rx="12"
        fill="#fecaca"
        stroke={sc("la", "#991b1b")}
        strokeWidth={sw("la")}
      />
      <path
        d="M208,190 L294,190 L294,238 Q290,290 228,306 L208,306 Z"
        fill="#fca5a5"
        stroke={sc("lv", "#7f1d1d")}
        strokeWidth={sw("lv", 6)}
      />

      {/* 心室中隔 */}
      <line x1="200" y1="186" x2="200" y2="312" stroke="#9f1239" strokeWidth="6" />

      {/* 房室瓣 */}
      <polygon points="112,176 128,176 120,192" fill="#ffffff" stroke="#475569" />
      <polygon points="146,176 162,176 154,192" fill="#ffffff" stroke="#475569" />
      <polygon points="242,176 258,176 250,192" fill="#ffffff" stroke="#475569" />
      <polygon points="272,176 288,176 280,192" fill="#ffffff" stroke="#475569" />

      {/* 主動脈：由左心室往上，再向人體左側彎下 */}
      <path
        d="M218,200 L218,58 Q218,22 262,22 Q312,22 326,62 L336,100"
        fill="none"
        stroke={sc("aorta", "#dc2626")}
        strokeWidth={active === "aorta" ? 22 : 18}
        strokeLinecap="round"
      />

      {/* 血流方向箭頭 */}
      <polygon points="44,70 58,61 58,79" fill="#2563eb" />
      <polygon points="338,114 328,98 344,96" fill="#dc2626" />

      {/* 方位與圖例 */}
      <text x="12" y="330" fontSize="12" fill="#1e293b">
        ← 人體右側
      </text>
      <text x="318" y="330" fontSize="12" fill="#1e293b">
        人體左側 →
      </text>
      <rect x="12" y="236" width="12" height="12" fill="#93c5fd" stroke="#1e40af" />
      <text x="28" y="246" fontSize="11" fill="#1e293b">
        缺氧血
      </text>
      <rect x="12" y="256" width="12" height="12" fill="#fca5a5" stroke="#7f1d1d" />
      <text x="28" y="266" fontSize="11" fill="#1e293b">
        充氧血
      </text>
    </g>
  );
}
