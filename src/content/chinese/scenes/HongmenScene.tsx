import type { SceneProps } from "../../types";

/** 〈鴻門宴〉座次示意圖（viewBox 0 0 400 300，上方為北） */
type Dir = "e" | "w" | "n" | "s";

interface Seat {
  id: string;
  x: number;
  y: number;
  name: string;
  /** 名字相對於人物的位置 */
  lx: number;
  ly: number;
  dir: Dir;
  side: "xiang" | "liu";
}

const SEATS: Seat[] = [
  { id: "xiangwang", x: 95, y: 112, name: "項王", lx: 0, ly: 32, dir: "e", side: "xiang" },
  { id: "xiangbo", x: 95, y: 192, name: "項伯", lx: 0, ly: 32, dir: "e", side: "xiang" },
  { id: "fanzeng", x: 190, y: 72, name: "范增（亞父）", lx: 50, ly: 5, dir: "s", side: "xiang" },
  { id: "peigong", x: 190, y: 228, name: "沛公（劉邦）", lx: 50, ly: 5, dir: "n", side: "liu" },
  { id: "zhangliang", x: 300, y: 128, name: "張良", lx: 0, ly: 32, dir: "w", side: "liu" },
  { id: "fankuai", x: 300, y: 214, name: "樊噲", lx: 0, ly: 32, dir: "w", side: "liu" },
];

const COLOR = { xiang: "#fca5a5", liu: "#93c5fd" };

function arrow(x: number, y: number, d: Dir) {
  const k = 21;
  if (d === "e") return `${x + k},${y - 5} ${x + k + 8},${y} ${x + k},${y + 5}`;
  if (d === "w") return `${x - k},${y - 5} ${x - k - 8},${y} ${x - k},${y + 5}`;
  if (d === "s") return `${x - 5},${y + k} ${x},${y + k + 8} ${x + 5},${y + k}`;
  return `${x - 5},${y - k} ${x},${y - k - 8} ${x + 5},${y - k}`;
}

export default function HongmenScene({ active }: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#fffbeb" />
      <text x="190" y="26" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b">
        鴻門宴座次示意圖
      </text>
      <rect
        x="50"
        y="38"
        width="280"
        height="226"
        rx="6"
        fill="#fef3c7"
        stroke="#92400e"
        strokeWidth="3"
      />
      {/* 東側的帷幕：樊噲「披帷西嚮立」 */}
      <rect x="324" y="186" width="10" height="60" fill="#c4b5fd" />
      {/* 方位 */}
      <circle cx="366" cy="78" r="24" fill="#ffffff" stroke="#94a3b8" />
      <text x="366" y="66" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e293b">
        北
      </text>
      <text x="366" y="100" textAnchor="middle" fontSize="11" fill="#475569">
        南
      </text>
      <text x="352" y="83" textAnchor="middle" fontSize="11" fill="#475569">
        西
      </text>
      <text x="380" y="83" textAnchor="middle" fontSize="11" fill="#475569">
        東
      </text>
      {/* 項莊舞劍 */}
      <g>
        <line x1="178" y1="140" x2="160" y2="116" stroke="#475569" strokeWidth="3" />
        <circle
          cx="190"
          cy="150"
          r="13"
          fill="#fecaca"
          stroke={active === "xiangzhuang" ? "#b91c1c" : "#7f1d1d"}
          strokeWidth={active === "xiangzhuang" ? 3 : 1.5}
        />
        <text x="232" y="155" textAnchor="middle" fontSize="12" fill="#1e293b">
          項莊舞劍
        </text>
      </g>
      {SEATS.map((s) => {
        const on = active === s.id;
        return (
          <g key={s.id}>
            <rect
              x={s.x - 17}
              y={s.y - 17}
              width="34"
              height="34"
              rx="6"
              fill="#fde68a"
              opacity="0.8"
            />
            <circle
              cx={s.x}
              cy={s.y}
              r="13"
              fill={COLOR[s.side]}
              stroke={on ? "#c2410c" : "#334155"}
              strokeWidth={on ? 3 : 1.5}
            />
            <polygon points={arrow(s.x, s.y, s.dir)} fill="#c2410c" />
            <text
              x={s.x + s.lx}
              y={s.y + s.ly}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#1e293b"
            >
              {s.name}
            </text>
          </g>
        );
      })}
      <circle cx="96" cy="284" r="6" fill={COLOR.xiang} />
      <text x="106" y="288" fontSize="11" fill="#1e293b">
        項羽一方
      </text>
      <circle cx="176" cy="284" r="6" fill={COLOR.liu} />
      <text x="186" y="288" fontSize="11" fill="#1e293b">
        劉邦一方
      </text>
      <polygon points="252,279 260,284 252,289" fill="#c2410c" />
      <text x="266" y="288" fontSize="11" fill="#1e293b">
        面朝方向
      </text>
    </g>
  );
}
