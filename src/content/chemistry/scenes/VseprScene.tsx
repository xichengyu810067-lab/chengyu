import type { SceneProps } from "../../types";

/** 常見分子的形狀（VSEPR，viewBox 0 0 500 300） */
const COLORS: Record<string, string> = {
  C: "#475569",
  O: "#ef4444",
  H: "#f8fafc",
  N: "#3b82f6",
  B: "#f9a8d4",
  F: "#a3e635",
};

function Atom({ x, y, el, r = 12 }: { x: number; y: number; el: string; r?: number }) {
  const dark = el === "C" || el === "N" || el === "O";
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={COLORS[el]} stroke="#334155" strokeWidth="1.5" />
      <text
        x={x}
        y={y + 4}
        fontSize="11"
        fontWeight="700"
        textAnchor="middle"
        fill={dark ? "#ffffff" : "#1e293b"}
      >
        {el}
      </text>
    </g>
  );
}

function Bond({
  x1,
  y1,
  x2,
  y2,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#475569"
      strokeWidth="3"
      strokeDasharray={dashed ? "4 3" : undefined}
    />
  );
}

/** 孤對電子（橢圓雲＋兩點） */
function LonePair({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx="7" ry="11" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
      <circle cx={x} cy={y - 4} r="1.8" fill="#4338ca" />
      <circle cx={x} cy={y + 4} r="1.8" fill="#4338ca" />
    </g>
  );
}

function Caption({
  x,
  y,
  f,
  shape,
  on,
}: {
  x: number;
  y: number;
  f: string;
  shape: string;
  on: boolean;
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
        fill={on ? "#e11d48" : "#1e293b"}
      >
        {f}
      </text>
      <text x={x} y={y + 17} fontSize="12" textAnchor="middle" fill="#334155">
        {shape}
      </text>
    </g>
  );
}

export default function VseprScene({ active }: SceneProps) {
  const box = (id: string, x: number, y: number, w: number, h: number) => (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="10"
      fill={active === id ? "#fff1f2" : "#ffffff"}
      stroke={active === id ? "#e11d48" : "#e2e8f0"}
      strokeWidth="2"
    />
  );
  return (
    <g>
      <rect x="0" y="0" width="500" height="300" fill="#f8fafc" />
      {box("co2", 8, 8, 156, 150)}
      {box("bf3", 172, 8, 156, 150)}
      {box("ch4", 336, 8, 156, 150)}
      {box("nh3", 90, 164, 156, 132)}
      {box("h2o", 256, 164, 156, 132)}

      {/* CO2：直線形 */}
      <line x1="44" y1="72" x2="126" y2="72" stroke="#475569" strokeWidth="2.5" />
      <line x1="44" y1="79" x2="126" y2="79" stroke="#475569" strokeWidth="2.5" />
      <Atom x={44} y={75} el="O" r={13} />
      <Atom x={86} y={75} el="C" r={13} />
      <Atom x={128} y={75} el="O" r={13} />
      <Caption x={86} y={124} f="CO₂" shape="直線形　180°" on={active === "co2"} />

      {/* BF3：平面三角形 */}
      <Bond x1={250} y1={80} x2={250} y2={40} />
      <Bond x1={250} y1={80} x2={284.6} y2={100} />
      <Bond x1={250} y1={80} x2={215.4} y2={100} />
      <Atom x={250} y={80} el="B" />
      <Atom x={250} y={40} el="F" />
      <Atom x={284.6} y={100} el="F" />
      <Atom x={215.4} y={100} el="F" />
      <Caption x={250} y={134} f="BF₃" shape="平面三角形　120°" on={active === "bf3"} />

      {/* CH4：四面體（楔形朝外、虛線朝內） */}
      <Bond x1={414} y1={72} x2={414} y2={36} />
      <Bond x1={414} y1={72} x2={380} y2={90} />
      <Bond x1={414} y1={72} x2={450} y2={88} dashed />
      <polygon points="414,72 418,108 428,106" fill="#475569" />
      <Atom x={414} y={72} el="C" />
      <Atom x={414} y={36} el="H" r={10} />
      <Atom x={380} y={90} el="H" r={10} />
      <Atom x={450} y={88} el="H" r={10} />
      <Atom x={423} y={110} el="H" r={10} />
      <Caption x={414} y={136} f="CH₄" shape="四面體　109.5°" on={active === "ch4"} />

      {/* NH3：三角錐形 */}
      <LonePair x={168} y={186} />
      <Bond x1={168} y1={212} x2={134} y2={232} />
      <Bond x1={168} y1={212} x2={202} y2={232} />
      <polygon points="168,212 164,246 176,246" fill="#475569" />
      <Atom x={168} y={212} el="N" />
      <Atom x={134} y={232} el="H" r={10} />
      <Atom x={202} y={232} el="H" r={10} />
      <Atom x={170} y={248} el="H" r={10} />
      <Caption x={168} y={272} f="NH₃" shape="三角錐形　約 107°" on={active === "nh3"} />

      {/* H2O：角形 */}
      <LonePair x={320} y={190} rot={-30} />
      <LonePair x={348} y={190} rot={30} />
      <Bond x1={334} y1={214} x2={302} y2={240} />
      <Bond x1={334} y1={214} x2={366} y2={240} />
      <Atom x={334} y={214} el="O" />
      <Atom x={302} y={240} el="H" r={10} />
      <Atom x={366} y={240} el="H" r={10} />
      <Caption x={334} y={272} f="H₂O" shape="角形　約 104.5°" on={active === "h2o"} />
    </g>
  );
}
