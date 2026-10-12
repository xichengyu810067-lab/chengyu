import type { SceneProps } from "../../types";

/** 東亞冬季地面天氣圖示意（viewBox 0 0 400 300）：大陸冷高壓、低氣壓與冷鋒 */

/** 冷鋒經過的點 */
const FRONT: [number, number][] = [
  [334, 86],
  [302, 110],
  [266, 136],
  [236, 166],
];

/** 沿鋒面畫出指向東南方（冷鋒前進方向）的三角形 */
function frontTriangles(): string[] {
  const tris: string[] = [];
  for (let i = 0; i < FRONT.length - 1; i++) {
    const [x1, y1] = FRONT[i];
    const [x2, y2] = FRONT[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    // 兩個法向量中，選指向東南（x + y 較大）的一個
    let nx = -uy;
    let ny = ux;
    if (nx + ny < 0) {
      nx = -nx;
      ny = -ny;
    }
    for (const t of [0.3, 0.75]) {
      const mx = x1 + (x2 - x1) * t;
      const my = y1 + (y2 - y1) * t;
      const a = `${(mx - ux * 6).toFixed(1)},${(my - uy * 6).toFixed(1)}`;
      const b = `${(mx + ux * 6).toFixed(1)},${(my + uy * 6).toFixed(1)}`;
      const c = `${(mx + nx * 9).toFixed(1)},${(my + ny * 9).toFixed(1)}`;
      tris.push(`${a} ${b} ${c}`);
    }
  }
  return tris;
}

const ISOBARS_H = [0, 1, 2, 3, 4].map((i) => ({
  cx: 110 - 10 * i,
  cy: 80 - 8 * i,
  rx: 40 + 26 * i,
  ry: 30 + 20 * i,
  p: 1036 - 4 * i,
}));

export default function WeatherMapScene({ active }: SceneProps) {
  const hl = (id: string) => active === id;
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#dbeafe" />
      {/* 陸地（示意） */}
      <polygon
        points="0,0 262,0 256,28 238,48 244,72 228,96 216,124 198,150 186,174 170,194 150,214 120,234 90,250 60,262 30,270 0,276"
        fill="#f5f5f4"
        stroke="#a8a29e"
      />
      <polygon points="264,30 278,26 288,54 282,80 270,86 263,60" fill="#f5f5f4" stroke="#a8a29e" />
      <ellipse
        cx="335"
        cy="68"
        rx="44"
        ry="10"
        transform="rotate(-38 335 68)"
        fill="#f5f5f4"
        stroke="#a8a29e"
      />
      <ellipse cx="292" cy="104" rx="10" ry="8" fill="#f5f5f4" stroke="#a8a29e" />
      <ellipse cx="386" cy="18" rx="14" ry="11" fill="#f5f5f4" stroke="#a8a29e" />
      <ellipse
        cx="208"
        cy="204"
        rx="7"
        ry="16"
        transform="rotate(18 208 204)"
        fill={hl("taiwan") ? "#bbf7d0" : "#f5f5f4"}
        stroke={hl("taiwan") ? "#e11d48" : "#57534e"}
        strokeWidth={hl("taiwan") ? 3 : 1.5}
      />
      <polygon
        points="196,262 212,258 220,280 214,300 200,300 194,282"
        fill="#f5f5f4"
        stroke="#a8a29e"
      />
      {/* 高氣壓的等壓線 */}
      {ISOBARS_H.map((e) => (
        <g key={e.p}>
          <ellipse
            cx={e.cx}
            cy={e.cy}
            rx={e.rx}
            ry={e.ry}
            fill="none"
            stroke={hl("dense") ? "#e11d48" : "#475569"}
            strokeWidth={hl("dense") ? 2 : 1.2}
          />
          <text x={e.cx} y={e.cy - e.ry - 2} fontSize="9" textAnchor="middle" fill="#334155">
            {e.p}
          </text>
        </g>
      ))}
      {/* 低氣壓的等壓線 */}
      <circle cx="345" cy="62" r="20" fill="none" stroke="#475569" strokeWidth="1.2" />
      <circle cx="345" cy="62" r="38" fill="none" stroke="#475569" strokeWidth="1.2" />
      {/* 冷鋒 */}
      <polyline
        points={FRONT.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="#2563eb"
        strokeWidth={hl("front") ? 5 : 3}
      />
      {frontTriangles().map((pts) => (
        <polygon key={pts} points={pts} fill="#2563eb" />
      ))}
      {/* 高、低氣壓中心 */}
      <text
        x="110"
        y="88"
        fontSize="24"
        fontWeight="700"
        textAnchor="middle"
        fill={hl("high") ? "#e11d48" : "#1d4ed8"}
      >
        H
      </text>
      <text x="110" y="102" fontSize="10" textAnchor="middle" fill="#1e293b">
        1040
      </text>
      <text
        x="345"
        y="70"
        fontSize="24"
        fontWeight="700"
        textAnchor="middle"
        fill={hl("low") ? "#e11d48" : "#b91c1c"}
      >
        L
      </text>
      <text x="345" y="84" fontSize="10" textAnchor="middle" fill="#1e293b">
        996
      </text>
      {/* 東北季風 */}
      <g stroke="#0f766e" strokeWidth="2" fill="#0f766e">
        <line x1="262" y1="182" x2="236" y2="204" />
        <polygon points="232,208 236,198 242,206" />
        <line x1="250" y1="222" x2="226" y2="242" />
        <polygon points="222,246 226,236 232,244" />
      </g>
      <text x="216" y="232" fontSize="11" fill="#1e293b">
        臺灣
      </text>
      <text x="300" y="290" fontSize="11" fill="#475569">
        太平洋
      </text>
    </g>
  );
}
