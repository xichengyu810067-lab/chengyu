import type { SceneProps } from "../../types";

/** 時態時間軸圖層（viewBox 0 0 400 300）：時間軸在 y = 160，「現在」在 x = 200 */
const AXIS_Y = 160;
const NOW_X = 200;

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      <line x1="20" y1={AXIS_Y} x2="372" y2={AXIS_Y} stroke="#475569" strokeWidth="3" />
      <polygon points={`384,${AXIS_Y} 370,${AXIS_Y - 7} 370,${AXIS_Y + 7}`} fill="#475569" />
      {/* 「現在」虛線在 y = 82–104 留空，讓現在完成式的例句不被遮住 */}
      {[
        [60, 82],
        [104, 226],
      ].map(([a, b]) => (
        <line
          key={a}
          x1={NOW_X}
          y1={a}
          x2={NOW_X}
          y2={b}
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
      ))}
      <text x={NOW_X} y="52" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b">
        now 現在
      </text>
      <text x="24" y="184" fontSize="12" fill="#475569">
        Past 過去
      </text>
      <text x="376" y="184" textAnchor="end" fontSize="12" fill="#475569">
        Future 未來
      </text>
    </g>
  );
}

export function Past(_: SceneProps) {
  const c = "#2563eb";
  return (
    <g>
      <circle cx="110" cy={AXIS_Y} r="8" fill={c} />
      <text x="110" y="146" textAnchor="middle" fontSize="11" fill={c} fontWeight="700">
        yesterday
      </text>
      <text x="110" y="206" textAnchor="middle" fontSize="12" fill="#1e293b">
        I{" "}
        <tspan fill={c} fontWeight="700">
          played
        </tspan>{" "}
        tennis yesterday.
      </text>
    </g>
  );
}

export function Progressive(_: SceneProps) {
  const c = "#e11d48";
  let d = "";
  for (let i = 0; i <= 40; i++) {
    const x = NOW_X - 22 + i * 1.1;
    const y = AXIS_Y + Math.sin(i * 0.6) * 7;
    d += `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return (
    <g>
      <path d={d} fill="none" stroke={c} strokeWidth="4" strokeLinecap="round" />
      <text x={NOW_X} y="242" textAnchor="middle" fontSize="12" fill="#1e293b">
        I{" "}
        <tspan fill={c} fontWeight="700">
          am playing
        </tspan>{" "}
        tennis now.
      </text>
    </g>
  );
}

export function Future(_: SceneProps) {
  const c = "#059669";
  return (
    <g>
      <circle cx="290" cy={AXIS_Y} r="8" fill={c} />
      <text x="290" y="146" textAnchor="middle" fontSize="11" fill={c} fontWeight="700">
        tomorrow
      </text>
      <text x="290" y="206" textAnchor="middle" fontSize="12" fill="#1e293b">
        I{" "}
        <tspan fill={c} fontWeight="700">
          will play
        </tspan>{" "}
        tennis tomorrow.
      </text>
    </g>
  );
}

export function Perfect(_: SceneProps) {
  const c = "#d97706";
  return (
    <g>
      <line x1="62" y1="118" x2="62" y2={AXIS_Y} stroke={c} strokeWidth="2" strokeDasharray="4 4" />
      <line x1="62" y1="118" x2={NOW_X - 10} y2="118" stroke={c} strokeWidth="5" />
      <polygon points={`${NOW_X},118 ${NOW_X - 12},111 ${NOW_X - 12},125`} fill={c} />
      <text x="62" y="112" textAnchor="middle" fontSize="11" fill={c} fontWeight="700">
        2020
      </text>
      <text x="138" y="96" textAnchor="middle" fontSize="12" fill="#1e293b">
        I{" "}
        <tspan fill={c} fontWeight="700">
          have played
        </tspan>{" "}
        tennis since 2020.
      </text>
    </g>
  );
}
