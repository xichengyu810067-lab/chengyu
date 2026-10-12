import type { SceneProps } from "../../types";

/** 〈桃花源記〉漁人路線示意圖（viewBox 0 0 400 300） */
const PEACH: [number, number][] = [
  [100, 205],
  [135, 188],
  [170, 170],
  [112, 252],
  [148, 234],
  [184, 212],
];
const PETALS: [number, number][] = [
  [118, 222],
  [142, 214],
  [160, 205],
  [128, 236],
  [176, 196],
  [96, 232],
];

function House({ x, on }: { x: number; on: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y="50"
        width="22"
        height="16"
        fill="#fef3c7"
        stroke={on ? "#c2410c" : "#92400e"}
        strokeWidth={on ? 2.5 : 1}
      />
      <polygon points={`${x - 3},50 ${x + 11},40 ${x + 25},50`} fill="#b45309" />
    </g>
  );
}

export default function TaohuayuanScene({ active }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f0fdf4" />
      {/* 山與小口 */}
      <polygon points="180,192 245,68 310,192" fill="#d6d3d1" stroke="#78716c" strokeWidth="2" />
      <polygon points="150,192 190,128 230,192" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="1.5" />
      <ellipse
        cx="244"
        cy="170"
        rx="15"
        ry="19"
        fill="#fde68a"
        opacity={active === "mouth" ? 1 : 0.7}
      />
      <ellipse cx="244" cy="172" rx="8" ry="12" fill="#44403c" />
      {/* 溪流 */}
      <path
        d="M0,288 C60,276 90,246 120,228 S185,192 232,170"
        fill="none"
        stroke={active === "boat" ? "#60a5fa" : "#93c5fd"}
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* 漁船 */}
      <path d="M38,258 L74,258 L67,268 L45,268 Z" fill="#92400e" />
      <circle cx="56" cy="250" r="4" fill="#1e293b" />
      <line x1="62" y1="236" x2="70" y2="266" stroke="#78350f" strokeWidth="2" />
      {/* 夾岸桃花林 */}
      {PEACH.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x - 2} y={y} width="4" height="12" fill="#a16207" />
          <circle
            cx={x}
            cy={y - 4}
            r="11"
            fill="#f9a8d4"
            stroke={active === "peach" ? "#be185d" : "none"}
            strokeWidth="2"
          />
        </g>
      ))}
      {PETALS.map(([x, y]) => (
        <circle key={`p${x}-${y}`} cx={x} cy={y} r="2" fill="#ec4899" />
      ))}
      {/* 山後的村落：屋舍、良田、美池、桑竹 */}
      <House x={302} on={active === "village"} />
      <House x={334} on={active === "village"} />
      <House x={366} on={active === "village"} />
      <rect
        x="300"
        y="84"
        width="92"
        height="42"
        fill="#d9f99d"
        stroke={active === "field" ? "#c2410c" : "#a16207"}
        strokeWidth={active === "field" ? 2.5 : 1}
      />
      <line x1="346" y1="84" x2="346" y2="126" stroke="#a16207" />
      <line x1="300" y1="105" x2="392" y2="105" stroke="#a16207" />
      <line x1="323" y1="84" x2="323" y2="126" stroke="#a16207" strokeDasharray="2 3" />
      <line x1="369" y1="84" x2="369" y2="126" stroke="#a16207" strokeDasharray="2 3" />
      <ellipse cx="330" cy="146" rx="24" ry="10" fill="#bae6fd" stroke="#38bdf8" />
      {[372, 380, 388].map((x) => (
        <line key={x} x1={x} y1="134" x2={x} y2="160" stroke="#16a34a" strokeWidth="3" />
      ))}
      {/* 郡城 */}
      <rect
        x="300"
        y="236"
        width="90"
        height="48"
        fill="#e7e5e4"
        stroke={active === "city" ? "#c2410c" : "#57534e"}
        strokeWidth={active === "city" ? 3 : 1.5}
      />
      {[300, 318, 336, 354, 372].map((x) => (
        <rect key={x} x={x} y="228" width="10" height="8" fill="#a8a29e" />
      ))}
      <path d="M335,284 L335,266 A10,10 0 0,1 355,266 L355,284 Z" fill="#78716c" />
      <text x="318" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b">
        郡城
      </text>
      {/* 去程（紅）與回程「處處誌之」（灰） */}
      <path
        d="M76,252 C112,236 168,204 228,172 M258,160 C276,140 290,118 302,100"
        fill="none"
        stroke="#dc2626"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <path
        d="M298,132 C276,168 282,204 316,230"
        fill="none"
        stroke="#64748b"
        strokeWidth="2"
        strokeDasharray="3 4"
      />
      {[
        [284, 166],
        [287, 198],
      ].map(([x, y]) => (
        <g key={`m${x}`}>
          <line x1={x} y1={y} x2={x} y2={y - 12} stroke="#475569" strokeWidth="1.5" />
          <polygon points={`${x},${y - 12} ${x + 8},${y - 9} ${x},${y - 6}`} fill="#ef4444" />
        </g>
      ))}
    </g>
  );
}
