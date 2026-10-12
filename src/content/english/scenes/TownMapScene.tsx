import type { SceneProps } from "../../types";

/**
 * 問路小鎮地圖（viewBox 0 0 400 300），地圖上方為北。
 * 道路：Main Street（東西向）、First Avenue 與 Second Avenue（南北向）。
 */
export default function TownMapScene({ active }: SceneProps) {
  const hl = (ids: string[], base: string) => (active && ids.includes(active) ? "#e11d48" : base);
  const hw = (ids: string[]) => (active && ids.includes(active) ? 4 : 2);
  const showRoute = active === "go" || active === "turn" || active === "hospital";
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f1f5f9" />

      {/* 道路 */}
      <rect x="0" y="120" width="400" height="30" fill="#cbd5e1" />
      <rect x="110" y="0" width="30" height="300" fill="#cbd5e1" />
      <rect x="260" y="0" width="30" height="300" fill="#cbd5e1" />
      <line
        x1="0"
        y1="135"
        x2="400"
        y2="135"
        stroke="#f8fafc"
        strokeWidth="2"
        strokeDasharray="8 8"
      />
      <text x="56" y="139" textAnchor="middle" fontSize="11" fill="#334155" fontWeight="700">
        Main Street
      </text>
      <text
        x="125"
        y="60"
        textAnchor="middle"
        fontSize="10"
        fill="#334155"
        fontWeight="700"
        transform="rotate(-90 125 60)"
      >
        First Avenue
      </text>
      <text
        x="275"
        y="220"
        textAnchor="middle"
        fontSize="10"
        fill="#334155"
        fontWeight="700"
        transform="rotate(-90 275 220)"
      >
        Second Avenue
      </text>

      {/* 學校 School（西北角） */}
      <rect
        x="12"
        y="22"
        width="86"
        height="86"
        rx="4"
        fill="#fde68a"
        stroke={hl(["corner"], "#b45309")}
        strokeWidth={hw(["corner"])}
      />
      <line x1="30" y1="22" x2="30" y2="6" stroke="#475569" strokeWidth="2" />
      <polygon points="30,6 44,10 30,14" fill="#e11d48" />
      <text x="55" y="70" textAnchor="middle" fontSize="12" fill="#1e293b" fontWeight="700">
        School
      </text>

      {/* 銀行 Bank、郵局 Post Office */}
      <rect
        x="148"
        y="48"
        width="52"
        height="62"
        rx="3"
        fill="#bfdbfe"
        stroke={hl(["next", "across"], "#1d4ed8")}
        strokeWidth={hw(["next", "across"])}
      />
      <text x="174" y="84" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        Bank
      </text>
      <rect
        x="204"
        y="48"
        width="50"
        height="62"
        rx="3"
        fill="#fecaca"
        stroke={hl(["next"], "#b91c1c")}
        strokeWidth={hw(["next"])}
      />
      <text x="229" y="66" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">
        Post
      </text>
      <text x="229" y="98" textAnchor="middle" fontSize="10" fill="#1e293b" fontWeight="700">
        Office
      </text>

      {/* 醫院 Hospital（東北角） */}
      <rect
        x="300"
        y="25"
        width="88"
        height="85"
        rx="4"
        fill="#ffffff"
        stroke={hl(["hospital"], "#dc2626")}
        strokeWidth={hw(["hospital"])}
      />
      <rect x="337" y="38" width="14" height="38" fill="#dc2626" />
      <rect x="325" y="50" width="38" height="14" fill="#dc2626" />
      <text x="344" y="98" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        Hospital
      </text>

      {/* 圖書館 Library */}
      <rect
        x="12"
        y="162"
        width="86"
        height="58"
        rx="4"
        fill="#ddd6fe"
        stroke="#6d28d9"
        strokeWidth="2"
      />
      <text x="55" y="195" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        Library
      </text>

      {/* 公園 Park */}
      <rect
        x="148"
        y="158"
        width="104"
        height="84"
        rx="6"
        fill="#bbf7d0"
        stroke={hl(["across"], "#15803d")}
        strokeWidth={hw(["across"])}
      />
      <circle cx="170" cy="178" r="10" fill="#22c55e" />
      <circle cx="232" cy="176" r="9" fill="#22c55e" />
      <circle cx="166" cy="216" r="8" fill="#16a34a" />
      <text x="214" y="230" textAnchor="middle" fontSize="12" fill="#14532d" fontWeight="700">
        Park
      </text>

      {/* 書店、麵包店、超市（由北到南） */}
      <rect
        x="298"
        y="158"
        width="92"
        height="36"
        rx="3"
        fill="#fef3c7"
        stroke="#a16207"
        strokeWidth="2"
      />
      <text x="344" y="180" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        Bookstore
      </text>
      <rect
        x="298"
        y="200"
        width="92"
        height="36"
        rx="3"
        fill="#ffedd5"
        stroke={hl(["between"], "#c2410c")}
        strokeWidth={hw(["between"])}
      />
      <text x="350" y="222" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        Bakery
      </text>
      <rect
        x="298"
        y="242"
        width="92"
        height="40"
        rx="3"
        fill="#dcfce7"
        stroke="#15803d"
        strokeWidth="2"
      />
      <text x="344" y="266" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        Supermarket
      </text>

      {/* 路線（點選問路熱點時顯示） */}
      {showRoute && (
        <g>
          <polyline
            points="125,272 125,135 300,135"
            fill="none"
            stroke="#e11d48"
            strokeWidth="4"
            strokeDasharray="10 6"
          />
          <polygon points="300,128 312,135 300,142" fill="#e11d48" />
        </g>
      )}

      {/* 你在這裡 */}
      <polygon
        points="125,268 129,278 140,278 131,284 134,295 125,288 116,295 119,284 110,278 121,278"
        fill="#e11d48"
      />
      <text x="58" y="284" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="700">
        You are here
      </text>
      <text x="20" y="250" fontSize="10" fill="#475569">
        N ↑
      </text>
    </g>
  );
}
