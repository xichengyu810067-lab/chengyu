import type { SceneProps } from "../../types";

/**
 * 靜止在斜面上的木塊：受力圖圖層（viewBox 0 0 400 300）。
 * 斜面傾角 30°，木塊中心 C = (177.4, 153.4)；
 * 沿斜面向上單位向量 (0.866, −0.5)，斜面外法向量 (−0.5, −0.866)。
 */
const CX = 177.4;
const CY = 153.4;

function Arrow({
  x2,
  y2,
  color,
  x1 = CX,
  y1 = CY,
  dashed = false,
}: {
  x2: number;
  y2: number;
  color: string;
  x1?: number;
  y1?: number;
  dashed?: boolean;
}) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 12;
  const p1 = `${x2 - h * Math.cos(ang - 0.4)},${y2 - h * Math.sin(ang - 0.4)}`;
  const p2 = `${x2 - h * Math.cos(ang + 0.4)},${y2 - h * Math.sin(ang + 0.4)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={dashed ? "6 4" : undefined}
      />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </g>
  );
}

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      <line x1="20" y1="250" x2="390" y2="250" stroke="#64748b" strokeWidth="2" />
      <polygon points="60,250 340,250 340,88.3" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
      <path d="M110,250 A50,50 0 0,0 103.3,225" fill="none" stroke="#475569" strokeWidth="2" />
      <text x="116" y="242" fontSize="14" fill="#1e293b">
        θ
      </text>
      <g transform={`translate(${CX} ${CY}) rotate(-30)`}>
        <rect
          x="-25"
          y="-25"
          width="50"
          height="50"
          rx="3"
          fill="#c4b5fd"
          stroke="#5b21b6"
          strokeWidth="2"
        />
      </g>
      <circle cx={CX} cy={CY} r="3.5" fill="#1e293b" />
      <text x="250" y="280" fontSize="12" fill="#475569">
        木塊靜止在斜面上
      </text>
    </g>
  );
}

export function Gravity(_: SceneProps) {
  return (
    <g>
      <Arrow x2={CX} y2={243.4} color="#e11d48" />
      <text x={CX + 8} y="268" fontSize="15" fontWeight="700" fill="#be123c">
        mg
      </text>
    </g>
  );
}

export function Normal(_: SceneProps) {
  return (
    <g>
      {/* 長度 = mg cosθ（與「重力的分量」圖層一致） */}
      <Arrow x2={138.4} y2={85.9} color="#2563eb" />
      <text x="118" y="84" fontSize="15" fontWeight="700" fill="#1d4ed8">
        N
      </text>
    </g>
  );
}

export function Friction(_: SceneProps) {
  return (
    <g>
      {/* 長度 = mg sinθ（靜止時靜摩擦力與下滑分力等大反向） */}
      <Arrow x2={216.4} y2={130.9} color="#d97706" />
      <text x="230" y="120" fontSize="15" fontWeight="700" fill="#b45309">
        f（靜摩擦力）
      </text>
    </g>
  );
}

export function Components(_: SceneProps) {
  return (
    <g>
      <line
        x1={CX}
        y1={243.4}
        x2={138.4}
        y2={175.9}
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <line
        x1={CX}
        y1={243.4}
        x2={216.4}
        y2={220.9}
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <Arrow x2={138.4} y2={175.9} color="#059669" dashed />
      <Arrow x2={216.4} y2={220.9} color="#7c3aed" dashed />
      <text x="70" y="186" fontSize="13" fontWeight="700" fill="#047857">
        mg sinθ
      </text>
      <text x="222" y="232" fontSize="13" fontWeight="700" fill="#6d28d9">
        mg cosθ
      </text>
      <text x="184" y="208" fontSize="12" fill="#1e293b">
        θ
      </text>
    </g>
  );
}
