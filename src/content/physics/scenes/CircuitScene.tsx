import type { SceneProps } from "../../types";

/** 基本電路圖：電池、開關、安培計、燈泡、伏特計、電阻（viewBox 0 0 400 300） */
export default function CircuitScene({ active }: SceneProps) {
  const c = (id: string) => (active === id ? "#e11d48" : "#1e293b");
  const w = (id: string) => (active === id ? 4.5 : 2.5);
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      {/* 導線 */}
      <g fill="none" stroke="#475569" strokeWidth="2.5" strokeLinejoin="round">
        <polyline points="60,140 60,70 130,70" />
        <line x1="170" y1="70" x2="216" y2="70" />
        <polyline points="244,70 340,70 340,132" />
        <polyline points="340,168 340,230 236,230" />
        <polyline points="164,230 60,230 60,156" />
        <polyline points="340,105 380,105 380,136" />
        <polyline points="380,164 380,195 340,195" />
      </g>
      <circle cx="340" cy="105" r="4" fill="#475569" />
      <circle cx="340" cy="195" r="4" fill="#475569" />

      {/* 電池：長線為正極、短線為負極 */}
      <line
        x1="38"
        y1="140"
        x2="82"
        y2="140"
        stroke={c("battery")}
        strokeWidth={w("battery") + 0.5}
      />
      <line
        x1="49"
        y1="156"
        x2="71"
        y2="156"
        stroke={c("battery")}
        strokeWidth={w("battery") + 3}
      />
      <text x="88" y="138" fontSize="14" fill="#1e293b">
        +
      </text>
      <text x="88" y="162" fontSize="14" fill="#1e293b">
        −
      </text>
      <text x="8" y="153" fontSize="13" fill="#1e293b">
        電池
      </text>

      {/* 電流方向（由正極流出） */}
      <polygon points="60,92 53,106 67,106" fill="#f59e0b" />
      <text x="70" y="102" fontSize="11" fill="#b45309">
        電流 I
      </text>

      {/* 開關 */}
      <circle cx="130" cy="70" r="4" fill="#fff" stroke={c("switch")} strokeWidth="2" />
      <circle cx="170" cy="70" r="4" fill="#fff" stroke={c("switch")} strokeWidth="2" />
      <line x1="133" y1="68" x2="168" y2="64" stroke={c("switch")} strokeWidth={w("switch")} />
      <text x="150" y="52" fontSize="13" textAnchor="middle" fill="#1e293b">
        開關
      </text>

      {/* 安培計（串聯） */}
      <circle
        cx="230"
        cy="70"
        r="14"
        fill="#fff"
        stroke={c("ammeter")}
        strokeWidth={w("ammeter")}
      />
      <text x="230" y="75" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1e293b">
        A
      </text>
      <text x="230" y="44" fontSize="12" textAnchor="middle" fill="#1e293b">
        安培計
      </text>

      {/* 燈泡 */}
      <circle cx="340" cy="150" r="24" fill="#fef9c3" opacity={active === "bulb" ? 1 : 0.6} />
      <circle cx="340" cy="150" r="18" fill="#fff" stroke={c("bulb")} strokeWidth={w("bulb")} />
      <line x1="327" y1="137" x2="353" y2="163" stroke={c("bulb")} strokeWidth="2" />
      <line x1="353" y1="137" x2="327" y2="163" stroke={c("bulb")} strokeWidth="2" />
      <text x="286" y="155" fontSize="13" fill="#1e293b">
        燈泡
      </text>

      {/* 伏特計（並聯） */}
      <circle
        cx="380"
        cy="150"
        r="14"
        fill="#fff"
        stroke={c("voltmeter")}
        strokeWidth={w("voltmeter")}
      />
      <text x="380" y="155" fontSize="14" fontWeight="700" textAnchor="middle" fill="#1e293b">
        V
      </text>
      <text x="352" y="218" fontSize="12" fill="#1e293b">
        伏特計
      </text>

      {/* 電阻器 */}
      <polyline
        points="236,230 230,220 220,240 210,220 200,240 190,220 180,240 170,220 164,230"
        fill="none"
        stroke={c("resistor")}
        strokeWidth={w("resistor")}
        strokeLinejoin="round"
      />
      <text x="200" y="262" fontSize="13" textAnchor="middle" fill="#1e293b">
        電阻器
      </text>
    </g>
  );
}
