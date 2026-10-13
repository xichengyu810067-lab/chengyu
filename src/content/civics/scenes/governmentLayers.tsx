import type { SceneProps } from "../../types";

/** 我國政府組織圖層（viewBox 0 0 480 320），示意用 */

const box = (x: number, y: number, w: number, h: number, fill: string, stroke: string) => (
  <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="2" />
);

const text = (x: number, y: number, s: string, size = 13, color = "#1e293b", weight = 700) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={color}>
    {s}
  </text>
);

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f8fafc" />
      {text(240, 18, "中華民國政府組織（示意）", 13, "#475569")}
      <line x1="20" y1="160" x2="460" y2="160" stroke="#cbd5e1" strokeDasharray="6 6" />
      <text x="24" y="154" fontSize="10" fill="#64748b">
        中央政府
      </text>
      <text x="24" y="174" fontSize="10" fill="#64748b">
        地方政府
      </text>
      <rect
        x="20"
        y="282"
        width="440"
        height="30"
        rx="8"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="2"
      />
      {text(240, 302, "人民（國家的主權者）", 13, "#92400e")}
    </g>
  );
}

export function President(_: SceneProps) {
  return (
    <g>
      {box(170, 28, 140, 38, "#fde68a", "#b45309")}
      {text(240, 46, "總統", 14)}
      {text(240, 60, "國家元首・統率三軍", 10, "#78350f", 400)}
    </g>
  );
}

const YUAN = [
  { name: "行政院", sub: "執行政策", fill: "#dbeafe", stroke: "#2563eb" },
  { name: "立法院", sub: "議決法律、預算", fill: "#dcfce7", stroke: "#16a34a" },
  { name: "司法院", sub: "審判・憲法法庭", fill: "#ede9fe", stroke: "#7c3aed" },
  { name: "考試院", sub: "考試・銓敘", fill: "#ffedd5", stroke: "#ea580c" },
  { name: "監察院", sub: "彈劾・審計", fill: "#fce7f3", stroke: "#db2777" },
];

export function FiveYuan(_: SceneProps) {
  return (
    <g>
      <line x1="240" y1="66" x2="240" y2="80" stroke="#94a3b8" strokeWidth="2" />
      <line x1="60" y1="80" x2="420" y2="80" stroke="#94a3b8" strokeWidth="2" />
      {YUAN.map((y, i) => {
        const x = 20 + i * 90;
        return (
          <g key={y.name}>
            <line x1={x + 40} y1="80" x2={x + 40} y2="96" stroke="#94a3b8" strokeWidth="2" />
            {box(x, 96, 80, 48, y.fill, y.stroke)}
            {text(x + 40, 116, y.name, 13)}
            {text(x + 40, 133, y.sub, 9, "#334155", 400)}
          </g>
        );
      })}
    </g>
  );
}

const LOCAL = [
  { name: "直轄市", sub: "市政府・市議會", x: 30 },
  { name: "縣（市）", sub: "縣市政府・縣市議會", x: 175 },
  { name: "鄉（鎮、市）", sub: "公所・代表會", x: 320 },
];

export function Local(_: SceneProps) {
  return (
    <g>
      {LOCAL.map((l) => (
        <g key={l.name}>
          {box(l.x, 186, 130, 54, "#ccfbf1", "#0d9488")}
          {text(l.x + 65, 208, l.name, 13)}
          {text(l.x + 65, 228, l.sub, 10, "#115e59", 400)}
        </g>
      ))}
      <path d="M305,213 L320,213" stroke="#0d9488" strokeWidth="2" />
      {text(240, 277, "地方自治：居民自己選出首長與議員", 11, "#115e59", 400)}
    </g>
  );
}

const tag = (x: number, y: number) => (
  <g>
    <rect x={x} y={y} width="56" height="18" rx="9" fill="#e11d48" />
    <text x={x + 28} y={y + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">
      人民選出
    </text>
  </g>
);

export function Vote(_: SceneProps) {
  return (
    <g>
      {tag(108, 38)}
      {tag(122, 146)}
      {tag(52, 244)}
      {tag(212, 244)}
      {tag(372, 244)}
      <path
        d="M470,282 L470,47 L324,47"
        fill="none"
        stroke="#e11d48"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />
      <polygon points="324,41 312,47 324,53" fill="#e11d48" />
      <text
        x="462"
        y="205"
        fontSize="10"
        fill="#be123c"
        textAnchor="middle"
        transform="rotate(-90 462 205)"
      >
        選舉・罷免
      </text>
    </g>
  );
}
