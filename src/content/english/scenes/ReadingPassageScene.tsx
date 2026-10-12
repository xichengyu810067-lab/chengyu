import type { SceneProps } from "../../types";

/** 閱讀策略短文（viewBox 0 0 480 320）：點熱點時以底色標出相關的句子 */
const LINES = [
  "Bubble tea was born in Taiwan in the 1980s, and today",
  "it is enjoyed all over the world. In cities such as",
  "London and New York, people wait in long lines just to",
  "buy a cup. Part of its appeal is choice: customers can",
  "pick their own sugar level, ice, and toppings. However,",
  "most cups contain a lot of sugar, so doctors suggest",
  "enjoying it only as an occasional treat. In short, this",
  "small cup of tea has become a big cultural export.",
];
const TOP = 82;
const STEP = 27;
const lineY = (i: number) => TOP + i * STEP;

/** 每個熱點要標示的行（從 0 起算） */
const MARKS: Record<string, number[]> = {
  topic: [0, 1],
  it: [1],
  inference: [2, 3],
  appeal: [3, 4],
  however: [4, 5, 6],
  conclusion: [6, 7],
};

export default function ReadingPassageScene({ active }: SceneProps) {
  const marked = new Set(active ? (MARKS[active] ?? []) : []);
  return (
    <g>
      <rect x="0" y="0" width="480" height="320" fill="#f8fafc" />
      <rect
        x="22"
        y="12"
        width="436"
        height="296"
        rx="10"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="240" y="46" textAnchor="middle" fontSize="17" fontWeight="700" fill="#1e293b">
        Bubble Tea Goes Global
      </text>
      {LINES.map((_, i) =>
        marked.has(i) ? (
          <rect
            key={`m${i}`}
            x="50"
            y={lineY(i) - 17}
            width="374"
            height="24"
            rx="4"
            fill="#fef08a"
          />
        ) : null,
      )}
      {LINES.map((t, i) => (
        <text
          key={t}
          x="56"
          y={lineY(i)}
          fontSize="13"
          fill="#1e293b"
          textLength={i < LINES.length - 1 ? 362 : undefined}
          lengthAdjust="spacing"
        >
          {t}
        </text>
      ))}
    </g>
  );
}
