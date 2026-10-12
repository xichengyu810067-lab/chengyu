import type { SceneProps } from "../../types";
import { contourPaths, RELIEF } from "./terrain";

/** 等高線地形判讀（viewBox 0 0 400 300）：山頂、鞍部、山谷、山脊、陡坡、緩坡 */
const LEVELS = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
const PATHS = contourPaths(RELIEF, LEVELS, 400, 300, 4);

/** 沿線段取樣，找出某高度第一次被穿越的位置，用來擺放等高線數字 */
function crossing(level: number, x0: number, y0: number, x1: number, y1: number) {
  let prev = RELIEF(x0, y0);
  for (let i = 1; i <= 300; i++) {
    const x = x0 + ((x1 - x0) * i) / 300;
    const y = y0 + ((y1 - y0) * i) / 300;
    const cur = RELIEF(x, y);
    if ((prev - level) * (cur - level) <= 0) return { x, y };
    prev = cur;
  }
  return null;
}

const LABELS = [
  ...[200, 300, 400].map((lv) => ({ lv, p: crossing(lv, 0, 30, 130, 135) })),
  ...[100].map((lv) => ({ lv, p: crossing(lv, 216, 290, 216, 129) })),
  ...[200, 300].map((lv) => ({ lv, p: crossing(lv, 292, 0, 292, 125) })),
  ...[100].map((lv) => ({ lv, p: crossing(lv, 130, 300, 130, 135) })),
].filter((l): l is { lv: number; p: { x: number; y: number } } => l.p !== null);

const GLOW: Record<string, { cx: number; cy: number; rx: number; ry: number }> = {
  summit: { cx: 130, cy: 135, rx: 22, ry: 18 },
  saddle: { cx: 216, cy: 129, rx: 24, ry: 30 },
  valley: { cx: 216, cy: 196, rx: 26, ry: 34 },
  ridge: { cx: 82, cy: 228, rx: 26, ry: 36 },
  steep: { cx: 318, cy: 125, rx: 18, ry: 40 },
  gentle: { cx: 42, cy: 135, rx: 34, ry: 48 },
};

export default function ContourScene({ active }: SceneProps) {
  const glow = active ? GLOW[active] : undefined;
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#fefce8" />
      {glow && <ellipse {...glow} fill="#fde047" opacity="0.55" />}
      {PATHS.map((p) => (
        <path
          key={p.level}
          d={p.d}
          fill="none"
          stroke={p.level % 100 === 0 ? "#92400e" : "#d97706"}
          strokeWidth={p.level % 100 === 0 ? 1.8 : 1}
          strokeLinecap="round"
        />
      ))}
      {LABELS.map(({ lv, p }) => (
        <g key={`${lv}-${p.x.toFixed(0)}`}>
          <rect x={p.x - 12} y={p.y - 7} width="24" height="13" rx="3" fill="#fefce8" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fill="#78350f">
            {lv}
          </text>
        </g>
      ))}
      <g transform="translate(372 30)">
        <polygon points="0,-16 6,2 0,-3 -6,2" fill="#1e293b" />
        <text x="0" y="16" textAnchor="middle" fontSize="12" fill="#1e293b">
          N
        </text>
      </g>
      <rect x="8" y="8" width="168" height="38" rx="6" fill="#ffffff" opacity="0.9" />
      <text x="16" y="23" fontSize="11" fill="#1e293b">
        等高線地形圖（示意）
      </text>
      <text x="16" y="39" fontSize="10" fill="#475569">
        等高距 50 公尺，粗線為 100 的倍數
      </text>
    </g>
  );
}
