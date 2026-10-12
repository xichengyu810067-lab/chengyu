import type { SceneProps } from "../../types";

/** 花的縱切構造示意圖（viewBox 0 0 400 320） */
export default function FlowerScene({ active }: SceneProps) {
  const hi = (id: string) => (active === id ? "#e11d48" : undefined);
  const w = (id: string, base: number) => (active === id ? base + 2.5 : base);
  return (
    <g>
      <rect x="0" y="0" width="400" height="320" fill="#f8fafc" />

      {/* 莖與花托 */}
      <rect x="194" y="232" width="12" height="88" fill="#65a30d" />
      <ellipse cx="200" cy="232" rx="34" ry="11" fill="#84cc16" stroke="#3f6212" />

      {/* 花瓣（左右兩片，畫在最後方） */}
      <path
        d="M178,222 Q90,210 70,150 Q60,110 100,115 Q150,125 186,212 Z"
        fill="#fbcfe8"
        stroke={hi("petal") ?? "#db2777"}
        strokeWidth={w("petal", 2)}
      />
      <path
        d="M222,222 Q310,210 330,150 Q340,110 300,115 Q250,125 214,212 Z"
        fill="#fbcfe8"
        stroke={hi("petal") ?? "#db2777"}
        strokeWidth={w("petal", 2)}
      />

      {/* 花萼 */}
      <path
        d="M172,234 Q130,236 118,214 Q146,214 176,226 Z"
        fill="#4ade80"
        stroke={hi("sepal") ?? "#15803d"}
        strokeWidth={w("sepal", 1.5)}
      />
      <path
        d="M228,234 Q270,236 282,214 Q254,214 224,226 Z"
        fill="#4ade80"
        stroke={hi("sepal") ?? "#15803d"}
        strokeWidth={w("sepal", 1.5)}
      />

      {/* 雄蕊：花絲 + 花藥 */}
      <line
        x1="176"
        y1="222"
        x2="156"
        y2="124"
        stroke={hi("filament") ?? "#a16207"}
        strokeWidth={w("filament", 3)}
      />
      <line
        x1="224"
        y1="222"
        x2="244"
        y2="124"
        stroke={hi("filament") ?? "#a16207"}
        strokeWidth={w("filament", 3)}
      />
      <ellipse
        cx="154"
        cy="112"
        rx="10"
        ry="15"
        fill="#fbbf24"
        stroke={hi("anther") ?? "#b45309"}
        strokeWidth={w("anther", 1.5)}
      />
      <ellipse
        cx="246"
        cy="112"
        rx="10"
        ry="15"
        fill="#fbbf24"
        stroke={hi("anther") ?? "#b45309"}
        strokeWidth={w("anther", 1.5)}
      />
      {[
        [140, 96],
        [146, 88],
        [258, 92],
        [264, 100],
      ].map(([x, y]) => (
        <circle key={`p${x}`} cx={x} cy={y} r="2.5" fill="#f59e0b" />
      ))}

      {/* 雌蕊：柱頭、花柱、子房（內有胚珠） */}
      <rect x="195" y="112" width="10" height="66" fill="#bef264" stroke="#4d7c0f" />
      <ellipse
        cx="200"
        cy="106"
        rx="16"
        ry="8"
        fill="#d9f99d"
        stroke={hi("stigma") ?? "#4d7c0f"}
        strokeWidth={w("stigma", 1.5)}
      />
      <ellipse
        cx="200"
        cy="202"
        rx="36"
        ry="28"
        fill="#fef3c7"
        stroke={hi("ovary") ?? "#a16207"}
        strokeWidth={w("ovary", 2)}
      />
      {[
        [204, 190],
        [218, 204],
        [204, 216],
      ].map(([x, y]) => (
        <ellipse
          key={`o${y}`}
          cx={x}
          cy={y}
          rx="7"
          ry="5"
          fill="#fde047"
          stroke={hi("ovule") ?? "#854d0e"}
          strokeWidth={w("ovule", 1)}
        />
      ))}

      <text x="200" y="22" textAnchor="middle" fontSize="13" fill="#1e293b">
        花的縱切面（示意）
      </text>
    </g>
  );
}
