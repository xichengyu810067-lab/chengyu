import type { SceneProps } from "../../types";

/** 〈赤壁賦〉江上月夜圖層（viewBox 0 0 400 300） */

function Note({
  x,
  y,
  w,
  text,
  color,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height="22"
        rx="5"
        fill="#ffffff"
        stroke={color}
        strokeWidth="1.5"
      />
      <text x={x + 6} y={y + 15} fontSize="11" fill="#1e293b">
        {text}
      </text>
    </g>
  );
}

export function ChibiBase(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#eef2ff" />
      <circle cx="338" cy="52" r="24" fill="#fde68a" />
      <polygon
        points="0,176 50,128 110,152 170,110 240,150 300,118 360,140 400,124 400,180 0,180"
        fill="#c7d2fe"
      />
      <polygon points="0,180 0,92 44,108 74,180" fill="#fecaca" stroke="#f87171" />
      <text x="24" y="150" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7f1d1d">
        赤壁
      </text>
      <rect x="0" y="176" width="400" height="124" fill="#dbeafe" />
      {[196, 236, 276].map((y) => (
        <path
          key={y}
          d={`M10,${y} q12,-5 24,0 t24,0 M300,${y + 8} q12,-5 24,0 t24,0`}
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1.5"
        />
      ))}
      {/* 小舟與主客二人 */}
      <path d="M160,224 L224,224 L214,238 L170,238 Z" fill="#92400e" />
      <circle cx="180" cy="212" r="6" fill="#334155" />
      <rect x="175" y="216" width="10" height="9" fill="#334155" />
      <circle cx="206" cy="212" r="6" fill="#64748b" />
      <rect x="201" y="216" width="10" height="9" fill="#64748b" />
      <text x="180" y="200" textAnchor="middle" fontSize="10" fill="#1e293b">
        蘇子
      </text>
      <text x="206" y="200" textAnchor="middle" fontSize="10" fill="#1e293b">
        客
      </text>
    </g>
  );
}

/** 圖層：景（清風、明月、江水） */
export function SceneryLayer(_: SceneProps) {
  return (
    <g>
      <Note x={12} y={14} w={180} text="月出於東山之上，徘徊於斗牛之間" color="#d97706" />
      <Note x={236} y={146} w={114} text="白露橫江，水光接天" color="#2563eb" />
      <Note x={232} y={190} w={114} text="清風徐來，水波不興" color="#0891b2" />
    </g>
  );
}

/** 圖層：情（樂 → 悲 → 喜） */
export function EmotionLayer(_: SceneProps) {
  return (
    <g>
      <rect x="6" y="244" width="388" height="52" rx="8" fill="#ffffff" opacity="0.75" />
      <path
        d="M24,262 C90,262 120,288 200,288 S318,258 376,258"
        fill="none"
        stroke="#e11d48"
        strokeWidth="3"
      />
      <circle cx="24" cy="262" r="5" fill="#e11d48" />
      <circle cx="200" cy="288" r="5" fill="#e11d48" />
      <circle cx="376" cy="258" r="5" fill="#e11d48" />
      <text x="34" y="258" fontSize="11" fontWeight="700" fill="#9f1239">
        樂：飲酒樂甚，扣舷而歌
      </text>
      <text x="200" y="273" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9f1239">
        悲：洞簫嗚嗚，客嘆人生須臾
      </text>
      <text x="366" y="253" textAnchor="end" fontSize="11" fontWeight="700" fill="#9f1239">
        喜：客喜而笑，洗盞更酌
      </text>
    </g>
  );
}

/** 圖層：理（水與月——變與不變） */
export function PhilosophyLayer(_: SceneProps) {
  return (
    <g>
      <Note x={148} y={80} w={164} text="月：盈虛者如彼，而卒莫消長也" color="#7c3aed" />
      <line x1="312" y1="88" x2="322" y2="70" stroke="#7c3aed" strokeDasharray="3 3" />
      <Note x={10} y={212} w={144} text="水：逝者如斯，而未嘗往也" color="#7c3aed" />
    </g>
  );
}
