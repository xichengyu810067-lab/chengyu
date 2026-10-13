import type { SceneProps } from "../../types";

/** 一篇議論文的結構示意（viewBox 0 0 400 300） */
const BLOCKS = [
  {
    id: "thesis",
    y: 54,
    h: 40,
    tag: "第一段",
    text: "閱讀能讓我們看見更大的世界。",
    fill: "#dbeafe",
  },
  {
    id: "fact",
    y: 100,
    h: 40,
    tag: "第二段",
    text: "小芸讀了一本天文書，從此愛上觀星。",
    fill: "#dcfce7",
  },
  {
    id: "reason",
    y: 146,
    h: 40,
    tag: "第三段",
    text: "杜甫說：「讀書破萬卷，下筆如有神。」",
    fill: "#fef3c7",
  },
  {
    id: "contrast",
    y: 192,
    h: 40,
    tag: "第四段",
    text: "不讀書的人，只能從別人口中認識世界。",
    fill: "#fce7f3",
  },
  {
    id: "conclusion",
    y: 238,
    h: 46,
    tag: "第五段",
    text: "每天讀一點，世界就大一點。",
    fill: "#ede9fe",
  },
];

export default function ArticleStructureScene({ active }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#f8fafc" />
      <rect
        x="64"
        y="10"
        width="300"
        height="282"
        rx="8"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <rect
        x="120"
        y="18"
        width="188"
        height="28"
        rx="6"
        fill={active === "title" ? "#fde68a" : "#f1f5f9"}
        stroke={active === "title" ? "#d97706" : "none"}
        strokeWidth="2"
      />
      <text x="214" y="38" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e293b">
        閱讀，讓世界變大
      </text>
      {BLOCKS.map((b) => {
        const on = active === b.id;
        return (
          <g key={b.id}>
            <rect
              x="76"
              y={b.y}
              width="276"
              height={b.h}
              rx="6"
              fill={b.fill}
              stroke={on ? "#c2410c" : "#e2e8f0"}
              strokeWidth={on ? 3 : 1}
            />
            <text x="86" y={b.y + 16} fontSize="10" fontWeight="700" fill="#475569">
              {b.tag}
            </text>
            <text x="86" y={b.y + 32} fontSize="12" fill="#1e293b">
              {b.text}
            </text>
          </g>
        );
      })}
    </g>
  );
}
