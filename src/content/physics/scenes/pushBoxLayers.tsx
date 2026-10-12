import type { SceneProps } from "../../types";

/** 在水平地面上被推動的箱子：受力圖圖層（viewBox 0 0 400 300） */

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 13;
  const p1 = `${x2 - h * Math.cos(ang - 0.4)},${y2 - h * Math.sin(ang - 0.4)}`;
  const p2 = `${x2 - h * Math.cos(ang + 0.4)},${y2 - h * Math.sin(ang + 0.4)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="5" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </g>
  );
}

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      <rect x="0" y="220" width="400" height="80" fill="#e2e8f0" />
      <line x1="0" y1="220" x2="400" y2="220" stroke="#64748b" strokeWidth="2" />
      <rect
        x="150"
        y="140"
        width="100"
        height="80"
        rx="4"
        fill="#fcd34d"
        stroke="#92400e"
        strokeWidth="2.5"
      />
      <text x="200" y="168" fontSize="14" textAnchor="middle" fill="#78350f">
        箱子
      </text>
      <circle cx="200" cy="180" r="4" fill="#1e293b" />
      <line x1="290" y1="120" x2="350" y2="120" stroke="#64748b" strokeWidth="2" />
      <polygon points="360,120 348,113 348,127" fill="#64748b" />
      <text x="290" y="108" fontSize="12" fill="#475569">
        運動方向
      </text>
    </g>
  );
}

export function Gravity(_: SceneProps) {
  return (
    <g>
      <Arrow x1={200} y1={180} x2={200} y2={268} color="#e11d48" />
      <text x="210" y="266" fontSize="14" fontWeight="700" fill="#be123c">
        重力 W
      </text>
    </g>
  );
}

export function Normal(_: SceneProps) {
  return (
    <g>
      <Arrow x1={200} y1={180} x2={200} y2={92} color="#2563eb" />
      <text x="210" y="100" fontSize="14" fontWeight="700" fill="#1d4ed8">
        正向力 N
      </text>
    </g>
  );
}

export function Push(_: SceneProps) {
  return (
    <g>
      <Arrow x1={70} y1={180} x2={146} y2={180} color="#059669" />
      <text x="62" y="168" fontSize="14" fontWeight="700" fill="#047857">
        推力 F
      </text>
    </g>
  );
}

export function Friction(_: SceneProps) {
  return (
    <g>
      <Arrow x1={230} y1={232} x2={140} y2={232} color="#d97706" />
      <text x="240" y="244" fontSize="14" fontWeight="700" fill="#b45309">
        摩擦力 f
      </text>
    </g>
  );
}
