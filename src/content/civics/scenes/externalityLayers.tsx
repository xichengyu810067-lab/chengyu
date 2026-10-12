import type { SceneProps } from "../../types";

/**
 * 負外部性圖層（viewBox 0 0 400 300），數量 Q ∈ [0, 10]、價格 P ∈ [0, 10]。
 * 需求 P = 9 − 0.7Q；私人邊際成本（供給）P = 1 + 0.7Q；社會邊際成本 P = 3 + 0.7Q。
 */
const sx = (q: number) => 50 + q * 32;
const sy = (p: number) => 260 - p * 22;
const line = (f: (q: number) => number, q0: number, q1: number) =>
  `M${sx(q0)},${sy(f(q0))} L${sx(q1)},${sy(f(q1))}`;

const demand = (q: number) => 9 - 0.7 * q;
const mpc = (q: number) => 1 + 0.7 * q;
const msc = (q: number) => 3 + 0.7 * q;
const QM = 40 / 7; // 市場均衡數量
const QS = 6 / 1.4; // 社會最適數量

export function Axes(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#ffffff" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={sx(i)} x2={sx(i)} y1={sy(0)} y2={sy(10)} stroke="#f1f5f9" />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`h${i}`} x1={sx(0)} x2={sx(10)} y1={sy(i)} y2={sy(i)} stroke="#f1f5f9" />
      ))}
      <line x1={sx(0)} y1={sy(0)} x2={sx(10) + 10} y2={sy(0)} stroke="#475569" strokeWidth="1.5" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(10) - 14} stroke="#475569" strokeWidth="1.5" />
      <text x={sx(10) + 8} y={sy(0) + 18} textAnchor="end" fontSize="12" fill="#475569">
        數量 Q
      </text>
      <text x={sx(0) + 6} y={sy(10) - 4} fontSize="12" fill="#475569">
        價格 P
      </text>
      <text x={sx(0) - 6} y={sy(0) + 14} textAnchor="end" fontSize="11" fill="#475569">
        0
      </text>
    </g>
  );
}

export function Demand(_: SceneProps) {
  return (
    <g>
      <path d={line(demand, 0, 10)} stroke="#2563eb" strokeWidth="3.5" fill="none" />
      <text x={sx(0.3)} y={sy(9.3)} fontSize="12" fontWeight="700" fill="#1d4ed8">
        需求 D（社會邊際利益）
      </text>
    </g>
  );
}

export function PrivateCost(_: SceneProps) {
  return (
    <g>
      <path d={line(mpc, 0, 10)} stroke="#059669" strokeWidth="3.5" fill="none" />
      <text
        x={sx(10)}
        y={sy(mpc(10)) + 34}
        textAnchor="end"
        fontSize="12"
        fontWeight="700"
        fill="#047857"
      >
        供給 S（私人邊際成本）
      </text>
    </g>
  );
}

export function SocialCost(_: SceneProps) {
  return (
    <g>
      <path d={line(msc, 0, 10)} stroke="#e11d48" strokeWidth="3.5" fill="none" />
      <text
        x={sx(7.6)}
        y={sy(msc(7.6)) - 10}
        textAnchor="end"
        fontSize="12"
        fontWeight="700"
        fill="#be123c"
      >
        社會邊際成本（含汙染）
      </text>
      <path
        d={`M${sx(1.5)},${sy(mpc(1.5))} L${sx(1.5)},${sy(msc(1.5))}`}
        stroke="#be123c"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <rect
        x={sx(1.5) + 4}
        y={sy(mpc(1.5) + 1) - 7}
        width="46"
        height="14"
        rx="3"
        fill="#ffffff"
        opacity="0.9"
      />
      <text x={sx(1.5) + 6} y={sy(mpc(1.5) + 1) + 4} fontSize="10" fill="#be123c">
        外部成本
      </text>
    </g>
  );
}

export function Compare(_: SceneProps) {
  const tri = [
    [QS, msc(QS)],
    [QM, msc(QM)],
    [QM, demand(QM)],
  ]
    .map(([q, p]) => `${sx(q)},${sy(p)}`)
    .join(" ");
  return (
    <g>
      <polygon points={tri} fill="#f43f5e" opacity="0.35" />
      {[
        { q: QM, p: demand(QM), label: "市場產量 Qm", color: "#047857", dy: 16 },
        { q: QS, p: msc(QS), label: "社會最適 Q*", color: "#be123c", dy: 30 },
      ].map((pt) => (
        <g key={pt.label}>
          <line
            x1={sx(pt.q)}
            x2={sx(pt.q)}
            y1={sy(pt.p)}
            y2={sy(0)}
            stroke={pt.color}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle
            cx={sx(pt.q)}
            cy={sy(pt.p)}
            r="5.5"
            fill={pt.color}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text
            x={sx(pt.q)}
            y={sy(0) + pt.dy}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={pt.color}
          >
            {pt.label}
          </text>
        </g>
      ))}
      <text x={sx(QM) + 12} y={sy(1.2)} fontSize="10" fill="#9f1239">
        ↖ 紅色區域：過度生產的損失
      </text>
    </g>
  );
}
