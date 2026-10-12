import type { SceneProps } from "../../types";

/**
 * 週期表（第 1～4 週期）圖層（viewBox 0 0 640 290）。
 * 底圖畫出元素格子，各圖層用半透明色塊或箭頭疊加：
 * 國中：金屬、非金屬、重要的族；高中：s/p/d 區、原子半徑、電負度與游離能。
 */
const X0 = 60;
const Y0 = 50;
const CW = 30;
const CH = 34;

type El = { z: number; s: string; p: number; g: number };

const SYMBOLS =
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr".split(
    " ",
  );

function position(z: number): { p: number; g: number } {
  if (z === 1) return { p: 1, g: 1 };
  if (z === 2) return { p: 1, g: 18 };
  if (z <= 10) return { p: 2, g: z <= 4 ? z - 2 : z + 8 };
  if (z <= 18) return { p: 3, g: z <= 12 ? z - 10 : z };
  return { p: 4, g: z - 18 };
}

const ELEMENTS: El[] = SYMBOLS.map((s, i) => ({ z: i + 1, s, ...position(i + 1) }));

const NONMETALS = new Set([
  "H",
  "He",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "P",
  "S",
  "Cl",
  "Ar",
  "Se",
  "Br",
  "Kr",
]);
const METALLOIDS = new Set(["B", "Si", "Ge", "As"]);

const cx = (g: number) => X0 + (g - 1) * CW;
const cy = (p: number) => Y0 + (p - 1) * CH;

function Tint({ pick, color }: { pick: (e: El) => boolean; color: string }) {
  return (
    <g>
      {ELEMENTS.filter(pick).map((e) => (
        <rect
          key={e.s}
          x={cx(e.g) + 1}
          y={cy(e.p) + 1}
          width={CW - 2}
          height={CH - 2}
          fill={color}
          fillOpacity="0.6"
        />
      ))}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 12;
  const p1 = `${x2 - h * Math.cos(a - 0.45)},${y2 - h * Math.sin(a - 0.45)}`;
  const p2 = `${x2 - h * Math.cos(a + 0.45)},${y2 - h * Math.sin(a + 0.45)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="5" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </g>
  );
}

/** 直式文字（一字一行） */
function VText({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <g>
      {[...text].map((ch, i) => (
        <text
          key={`${ch}-${i}`}
          x={x}
          y={y + i * 14}
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          fill={color}
        >
          {ch}
        </text>
      ))}
    </g>
  );
}

function Legend({ items }: { items: { color: string; text: string }[] }) {
  return (
    <g>
      <rect x="128" y="88" width="286" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      {items.map((it, i) => {
        const x = 140 + (i % 2) * 140;
        const y = 100 + Math.floor(i / 2) * 24;
        return (
          <g key={it.text}>
            <rect x={x} y={y} width="14" height="14" rx="3" fill={it.color} />
            <text x={x + 20} y={y + 12} fontSize="12" fill="#1e293b">
              {it.text}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function Base(_: SceneProps) {
  return (
    <g>
      <rect x="0" y="0" width="640" height="290" fill="#f8fafc" />
      <text x="8" y="42" fontSize="10" fill="#475569">
        週期＼族
      </text>
      {Array.from({ length: 18 }, (_, i) => (
        <text
          key={`g${i + 1}`}
          x={cx(i + 1) + CW / 2}
          y="44"
          fontSize="10"
          textAnchor="middle"
          fill="#475569"
        >
          {i + 1}
        </text>
      ))}
      {[1, 2, 3, 4].map((p) => (
        <text
          key={`p${p}`}
          x="52"
          y={cy(p) + 22}
          fontSize="12"
          fontWeight="700"
          textAnchor="end"
          fill="#475569"
        >
          {p}
        </text>
      ))}
      {ELEMENTS.map((e) => (
        <g key={e.s}>
          <rect
            x={cx(e.g)}
            y={cy(e.p)}
            width={CW}
            height={CH}
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          <text x={cx(e.g) + 3} y={cy(e.p) + 11} fontSize="10" fill="#64748b">
            {e.z}
          </text>
          <text
            x={cx(e.g) + CW / 2}
            y={cy(e.p) + 28}
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            fill="#1e293b"
          >
            {e.s}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ───────── 國中圖層 ───────── */

export function Metals(_: SceneProps) {
  return <Tint pick={(e) => !NONMETALS.has(e.s) && !METALLOIDS.has(e.s)} color="#60a5fa" />;
}

export function Nonmetals(_: SceneProps) {
  return (
    <g>
      <Tint pick={(e) => NONMETALS.has(e.s)} color="#fbbf24" />
      <Tint pick={(e) => METALLOIDS.has(e.s)} color="#a8a29e" />
      {/* 金屬與非金屬的階梯狀分界線 */}
      <polyline
        points={`${cx(13)},${cy(2)} ${cx(13)},${cy(3)} ${cx(14)},${cy(3)} ${cx(14)},${cy(5)}`}
        fill="none"
        stroke="#1e293b"
        strokeWidth="3.5"
      />
    </g>
  );
}

const FAMILY = [
  { g: 1, from: 2, color: "#ef4444", text: "第 1 族 鹼金屬" },
  { g: 2, from: 2, color: "#f97316", text: "第 2 族 鹼土金屬" },
  { g: 17, from: 2, color: "#16a34a", text: "第 17 族 鹵素" },
  { g: 18, from: 1, color: "#9333ea", text: "第 18 族 惰性氣體" },
];

export function Families(_: SceneProps) {
  return (
    <g>
      {FAMILY.map((f) => (
        <rect
          key={f.g}
          x={cx(f.g) + 2}
          y={cy(f.from) + 2}
          width={CW - 4}
          height={(5 - f.from) * CH - 4}
          rx="4"
          fill={f.color}
          fillOpacity="0.18"
          stroke={f.color}
          strokeWidth="3"
        />
      ))}
      <Legend items={FAMILY.map((f) => ({ color: f.color, text: f.text }))} />
    </g>
  );
}

/* ───────── 高中圖層 ───────── */

export function Blocks(_: SceneProps) {
  return (
    <g>
      <Tint pick={(e) => e.g <= 2 || e.s === "He"} color="#fca5a5" />
      <Tint pick={(e) => e.g >= 13 && e.s !== "He"} color="#93c5fd" />
      <Tint pick={(e) => e.g >= 3 && e.g <= 12} color="#86efac" />
      <Legend
        items={[
          { color: "#fca5a5", text: "s 區（填 s 軌域）" },
          { color: "#93c5fd", text: "p 區（填 p 軌域）" },
          { color: "#86efac", text: "d 區（過渡元素）" },
        ]}
      />
    </g>
  );
}

export function RadiusTrend(_: SceneProps) {
  return (
    <g>
      <Arrow x1={590} y1={206} x2={72} y2={206} color="#e11d48" />
      <text x="330" y="226" fontSize="12" fontWeight="700" textAnchor="middle" fill="#9f1239">
        同週期：由右往左，原子半徑變大
      </text>
      <Arrow x1={16} y1={60} x2={16} y2={184} color="#e11d48" />
      <VText x={32} y={92} text="半徑變大" color="#9f1239" />
    </g>
  );
}

export function ENTrend(_: SceneProps) {
  return (
    <g>
      <Arrow x1={72} y1={250} x2={590} y2={250} color="#2563eb" />
      <text x="330" y="272" fontSize="12" fontWeight="700" textAnchor="middle" fill="#1e40af">
        同週期：由左往右，電負度、游離能大致變大
      </text>
      <Arrow x1={614} y1={184} x2={614} y2={60} color="#2563eb" />
      <VText x={630} y={82} text="往上變大" color="#1e40af" />
      <circle
        cx={cx(17) + CW / 2}
        cy={cy(2) + CH / 2}
        r="20"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
      />
      <text x={cx(17) + CW / 2} y={cy(1) + 22} fontSize="11" textAnchor="middle" fill="#1e40af">
        F 最大
      </text>
    </g>
  );
}
