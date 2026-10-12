import type { SceneProps } from "../../types";

/** 假設語氣圖層（viewBox 0 0 400 300）：時間軸 y = 150；過去 x = 90、現在 x = 200、未來 x = 310 */
const AXIS_Y = 150;
const INK = "#1e293b";

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      <line x1="16" y1={AXIS_Y} x2="374" y2={AXIS_Y} stroke="#475569" strokeWidth="3" />
      <polygon points={`386,${AXIS_Y} 372,${AXIS_Y - 7} 372,${AXIS_Y + 7}`} fill="#475569" />
      {[
        { x: 90, t: "過去 Past" },
        { x: 200, t: "現在 Now" },
        { x: 310, t: "未來 Future" },
      ].map((p) => (
        <g key={p.x}>
          <line
            x1={p.x}
            y1={AXIS_Y - 6}
            x2={p.x}
            y2={AXIS_Y + 6}
            stroke="#475569"
            strokeWidth="2"
          />
          <text x={p.x} y={AXIS_Y + 22} textAnchor="middle" fontSize="12" fill="#475569">
            {p.t}
          </text>
        </g>
      ))}
    </g>
  );
}

export function PastUnreal(_: SceneProps) {
  const c = "#2563eb";
  return (
    <g>
      <rect x="8" y="20" width="186" height="80" rx="8" fill="#eff6ff" stroke={c} strokeWidth="2" />
      <text x="18" y="40" fontSize="11" fill="#475569">
        事實：I didn't study.
      </text>
      <text x="18" y="62" fontSize="12" fill={INK}>
        If I{" "}
        <tspan fill={c} fontWeight="700">
          had studied
        </tspan>
        ,
      </text>
      <text x="18" y="84" fontSize="12" fill={INK}>
        I{" "}
        <tspan fill={c} fontWeight="700">
          would have passed
        </tspan>
        .
      </text>
      <line
        x1="90"
        y1="100"
        x2="90"
        y2={AXIS_Y - 8}
        stroke={c}
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <circle cx="90" cy={AXIS_Y} r="7" fill={c} />
    </g>
  );
}

export function PresentUnreal(_: SceneProps) {
  const c = "#e11d48";
  return (
    <g>
      <rect
        x="56"
        y="186"
        width="288"
        height="50"
        rx="8"
        fill="#fff1f2"
        stroke={c}
        strokeWidth="2"
      />
      <text x="200" y="204" textAnchor="middle" fontSize="11" fill="#475569">
        事實：I am not a bird.
      </text>
      <text x="200" y="226" textAnchor="middle" fontSize="12" fill={INK}>
        If I{" "}
        <tspan fill={c} fontWeight="700">
          were
        </tspan>{" "}
        a bird, I{" "}
        <tspan fill={c} fontWeight="700">
          would fly
        </tspan>{" "}
        to you.
      </text>
      <circle cx="200" cy={AXIS_Y} r="7" fill={c} />
    </g>
  );
}

export function FutureUnlikely(_: SceneProps) {
  const c = "#7c3aed";
  return (
    <g>
      <rect
        x="206"
        y="20"
        width="186"
        height="80"
        rx="8"
        fill="#f5f3ff"
        stroke={c}
        strokeWidth="2"
      />
      <text x="216" y="40" fontSize="11" fill="#475569">
        幾乎不可能發生的未來：
      </text>
      <text x="216" y="62" fontSize="11" fill={INK}>
        If I{" "}
        <tspan fill={c} fontWeight="700">
          were to win
        </tspan>{" "}
        the lottery,
      </text>
      <text x="216" y="84" fontSize="11" fill={INK}>
        I{" "}
        <tspan fill={c} fontWeight="700">
          would travel
        </tspan>{" "}
        the world.
      </text>
      <line
        x1="310"
        y1="100"
        x2="310"
        y2={AXIS_Y - 8}
        stroke={c}
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <circle cx="310" cy={AXIS_Y} r="7" fill={c} />
    </g>
  );
}

export function Mixed(_: SceneProps) {
  const c = "#d97706";
  return (
    <g>
      <path
        d={`M90,${AXIS_Y - 4} Q145,108 192,${AXIS_Y - 6}`}
        fill="none"
        stroke={c}
        strokeWidth="4"
      />
      <polygon points={`198,${AXIS_Y - 3} 186,${AXIS_Y - 12} 184,${AXIS_Y - 1}`} fill={c} />
      <rect
        x="40"
        y="246"
        width="320"
        height="48"
        rx="8"
        fill="#fffbeb"
        stroke={c}
        strokeWidth="2"
      />
      <text x="200" y="265" textAnchor="middle" fontSize="12" fill={INK}>
        混合：If I{" "}
        <tspan fill={c} fontWeight="700">
          had slept
        </tspan>{" "}
        earlier last night,
      </text>
      <text x="200" y="285" textAnchor="middle" fontSize="12" fill={INK}>
        I{" "}
        <tspan fill={c} fontWeight="700">
          wouldn't be
        </tspan>{" "}
        so tired now.
      </text>
    </g>
  );
}
