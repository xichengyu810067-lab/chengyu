import type { SceneProps } from "../../types";

/** 大門上的春聯（viewBox 0 0 400 300）：上聯在右、下聯在左 */
const RIGHT = "天增歲月人增壽";
const LEFT = "春滿乾坤福滿門";

function Strip({ x, text, on }: { x: number; text: string; on: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y="88"
        width="30"
        height="184"
        rx="3"
        fill="#fecaca"
        stroke={on ? "#b91c1c" : "#f87171"}
        strokeWidth={on ? 4 : 1.5}
      />
      {[...text].map((ch, i) => (
        <text
          key={`${ch}${i}`}
          x={x + 15}
          y={112 + i * 25}
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#1e293b"
        >
          {ch}
        </text>
      ))}
    </g>
  );
}

function Diamond({ cx, cy, ch, on }: { cx: number; cy: number; ch: string; on: boolean }) {
  return (
    <g>
      <rect
        x={cx - 15}
        y={cy - 15}
        width="30"
        height="30"
        fill="#fecaca"
        stroke={on ? "#b91c1c" : "#f87171"}
        strokeWidth={on ? 3 : 1.5}
        transform={`rotate(45 ${cx} ${cy})`}
      />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b">
        {ch}
      </text>
    </g>
  );
}

export default function SpringCoupletScene({ active }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#fff7ed" />
      {/* 牆與屋簷 */}
      <rect x="40" y="40" width="320" height="250" fill="#f5e6d3" />
      <polygon points="20,44 200,8 380,44" fill="#a8a29e" />
      <rect x="0" y="288" width="400" height="12" fill="#d6d3d1" />
      {/* 門框與兩扇門 */}
      <rect x="144" y="84" width="112" height="204" fill="#92400e" />
      <rect x="150" y="90" width="49" height="198" fill="#d97706" />
      <rect x="201" y="90" width="49" height="198" fill="#d97706" />
      <circle cx="192" cy="200" r="4" fill="#fde68a" />
      <circle cx="208" cy="200" r="4" fill="#fde68a" />
      {/* 橫批 */}
      <rect
        x="140"
        y="50"
        width="120"
        height="28"
        rx="3"
        fill="#fecaca"
        stroke={active === "top" ? "#b91c1c" : "#f87171"}
        strokeWidth={active === "top" ? 4 : 1.5}
      />
      <text x="200" y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b">
        四季平安
      </text>
      {/* 上聯貼右、下聯貼左（面對大門） */}
      <Strip x={268} text={RIGHT} on={active === "upper"} />
      <Strip x={102} text={LEFT} on={active === "lower"} />
      {/* 門上的斗方 */}
      <Diamond cx={175} cy={140} ch="春" on={active === "square"} />
      <Diamond cx={225} cy={140} ch="福" on={active === "square"} />
      <text x="200" y="280" textAnchor="middle" fontSize="11" fontWeight="700" fill="#451a03">
        （面對大門）
      </text>
    </g>
  );
}
