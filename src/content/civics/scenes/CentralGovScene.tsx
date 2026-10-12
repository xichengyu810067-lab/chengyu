import type { SceneProps } from "../../types";

/** 我國中央政府體制的互動關係（viewBox 0 0 480 320），示意用 */

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  on,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  on: boolean;
  dashed?: boolean;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 10;
  const p = (da: number) => `${x2 - h * Math.cos(a + da)},${y2 - h * Math.sin(a + da)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={on ? 4.5 : 2.5}
        strokeDasharray={dashed ? "6 4" : undefined}
      />
      <polygon points={`${x2},${y2} ${p(0.45)} ${p(-0.45)}`} fill={color} />
    </g>
  );
}

const Box = ({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  title,
  sub,
  on,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  title: string;
  sub?: string;
  on: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="8"
      fill={fill}
      stroke={on ? "#e11d48" : stroke}
      strokeWidth={on ? 3.5 : 2}
    />
    <text
      x={x + w / 2}
      y={sub ? y + h / 2 - 2 : y + h / 2 + 5}
      textAnchor="middle"
      fontSize="14"
      fontWeight="700"
      fill="#1e293b"
    >
      {title}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize="10" fill="#334155">
        {sub}
      </text>
    )}
  </g>
);

const note = (
  x: number,
  y: number,
  s: string,
  color: string,
  anchor: "start" | "middle" | "end",
) => (
  <text x={x} y={y} textAnchor={anchor} fontSize="11" fontWeight="700" fill={color}>
    {s}
  </text>
);

export default function CentralGovScene({ active }: SceneProps) {
  const is = (id: string) => active === id;
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f8fafc" />

      {/* 關係箭頭 */}
      <Arrow x1={162} y1={46} x2={318} y2={46} color="#b45309" on={is("appoint")} />
      {note(240, 32, "任命行政院院長", "#b45309", "middle")}

      <Arrow x1={360} y1={78} x2={360} y2={156} color="#2563eb" on={is("reconsider")} />
      {note(348, 134, "覆議", "#2563eb", "end")}

      <Arrow x1={420} y1={156} x2={420} y2={78} color="#16a34a" on={is("noconf")} />
      {note(428, 128, "不信任案", "#15803d", "start")}
      {note(428, 142, "質詢", "#15803d", "start")}

      <Arrow x1={162} y1={70} x2={318} y2={164} color="#7c2d12" on={is("dissolve")} dashed />
      {note(250, 100, "被動解散", "#7c2d12", "start")}

      <Arrow x1={162} y1={182} x2={318} y2={182} color="#7c3aed" on={is("review")} dashed />
      {note(240, 172, "違憲審查", "#6d28d9", "middle")}

      <Arrow x1={220} y1={262} x2={126} y2={80} color="#e11d48" on={is("vote")} />
      <Arrow x1={262} y1={262} x2={370} y2={208} color="#e11d48" on={is("vote")} />
      {note(196, 244, "選出", "#be123c", "end")}
      {note(334, 252, "選出", "#be123c", "start")}

      {/* 機關 */}
      <Box
        x={30}
        y={28}
        w={130}
        h={48}
        fill="#fef3c7"
        stroke="#b45309"
        title="總統"
        sub="國家元首"
        on={is("president")}
      />
      <Box
        x={320}
        y={28}
        w={130}
        h={48}
        fill="#dbeafe"
        stroke="#2563eb"
        title="行政院"
        sub="最高行政機關"
        on={is("appoint") || is("reconsider")}
      />
      <Box
        x={30}
        y={158}
        w={130}
        h={48}
        fill="#ede9fe"
        stroke="#7c3aed"
        title="司法院"
        sub="大法官・憲法法庭"
        on={is("review")}
      />
      <Box
        x={320}
        y={158}
        w={130}
        h={48}
        fill="#dcfce7"
        stroke="#16a34a"
        title="立法院"
        sub="最高立法機關"
        on={is("noconf") || is("dissolve")}
      />
      <Box
        x={30}
        y={262}
        w={120}
        h={40}
        fill="#fce7f3"
        stroke="#db2777"
        title="監察院"
        on={is("control")}
      />
      <Box
        x={180}
        y={262}
        w={120}
        h={40}
        fill="#fef9c3"
        stroke="#ca8a04"
        title="人民"
        sub="主權者・選民"
        on={is("vote")}
      />
      <Box
        x={330}
        y={262}
        w={120}
        h={40}
        fill="#ffedd5"
        stroke="#ea580c"
        title="考試院"
        on={is("exam")}
      />
    </g>
  );
}
