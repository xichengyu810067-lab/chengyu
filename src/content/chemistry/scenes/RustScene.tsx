import type { SceneProps } from "../../types";

/** 鐵釘生鏽的對照實驗：四支試管（viewBox 0 0 480 300） */
const TUBES = [
  { id: "dry", cx: 90, mark: "甲", label: "乾燥空氣" },
  { id: "boiled", cx: 190, mark: "乙", label: "煮沸的水＋油" },
  { id: "half", cx: 290, mark: "丙", label: "水＋空氣" },
  { id: "salt", cx: 390, mark: "丁", label: "食鹽水＋空氣" },
];

const tube = (cx: number) =>
  `M${cx - 22},50 L${cx - 22},230 A22,22 0 0 0 ${cx + 22},230 L${cx + 22},50`;
const liquid = (cx: number, top: number) =>
  `M${cx - 21},${top} L${cx - 21},230 A21,21 0 0 0 ${cx + 21},230 L${cx + 21},${top} Z`;

function Nail({ cx, y1, y2 }: { cx: number; y1: number; y2: number }) {
  return (
    <g>
      <rect x={cx - 7} y={y1 - 4} width="14" height="4" rx="1" fill="#64748b" />
      <line x1={cx} y1={y1} x2={cx} y2={y2} stroke="#64748b" strokeWidth="4" />
      <polygon points={`${cx - 2},${y2} ${cx + 2},${y2} ${cx},${y2 + 7}`} fill="#64748b" />
    </g>
  );
}

function Rust({ cx, ys }: { cx: number; ys: number[] }) {
  return (
    <g fill="#b45309">
      {ys.map((y, i) => (
        <circle key={y} cx={cx + (i % 2 ? 2.5 : -2.5)} cy={y} r="3" />
      ))}
    </g>
  );
}

export default function RustScene({ active }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="480" height="300" fill="#f8fafc" />
      {/* 試管架 */}
      <rect x="40" y="196" width="400" height="12" rx="3" fill="#d6b48a" />
      <rect x="48" y="196" width="8" height="70" fill="#c49a6c" />
      <rect x="424" y="196" width="8" height="70" fill="#c49a6c" />
      <rect x="0" y="266" width="480" height="4" fill="#cbd5e1" />

      {/* 液體 */}
      <path d={liquid(190, 100)} fill="#bfdbfe" />
      <rect x="169" y="88" width="42" height="12" fill="#fde68a" />
      <path d={liquid(290, 150)} fill="#bfdbfe" />
      <path d={liquid(390, 150)} fill="#c7d2fe" />

      {/* 甲：乾燥劑、棉花、塞子 */}
      <g fill="#ffffff" stroke="#94a3b8">
        <circle cx="80" cy="240" r="4" />
        <circle cx="90" cy="244" r="4" />
        <circle cx="100" cy="240" r="4" />
        <circle cx="85" cy="232" r="4" />
        <circle cx="96" cy="231" r="4" />
      </g>
      <rect x="69" y="212" width="42" height="12" rx="4" fill="#f1f5f9" stroke="#cbd5e1" />
      <rect x="64" y="38" width="52" height="16" rx="3" fill="#92400e" />

      {/* 鐵釘 */}
      <Nail cx={90} y1={90} y2={200} />
      <Nail cx={190} y1={120} y2={232} />
      <Nail cx={290} y1={90} y2={232} />
      <Nail cx={390} y1={90} y2={232} />
      <Rust cx={290} ys={[142, 150, 157, 165]} />
      <Rust cx={390} ys={[130, 140, 148, 156, 165, 176, 190, 205]} />

      {/* 試管外框 */}
      {TUBES.map((t) => (
        <path
          key={t.id}
          d={tube(t.cx)}
          fill="none"
          stroke={active === t.id ? "#e11d48" : "#64748b"}
          strokeWidth={active === t.id ? 4 : 2}
        />
      ))}

      {/* 標籤 */}
      {TUBES.map((t) => (
        <g key={`l-${t.id}`}>
          <text x={t.cx} y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b">
            {t.mark}
          </text>
          <text x={t.cx} y="297" textAnchor="middle" fontSize="11" fill="#334155">
            {t.label}
          </text>
        </g>
      ))}
      <text x="212" y="84" fontSize="10" fill="#92400e">
        油層
      </text>
    </g>
  );
}
