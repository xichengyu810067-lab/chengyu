/**
 * 元件展示頁（/gallery）與 e2e 測試共用的示範資料。
 */
import { useState } from "react";
import type { Activity, LabProps, Question, SceneProps } from "../content/types";
import { ParamSlider, Plot } from "../widgets/kit";

/* ───────── 示範場景（SVG） ───────── */

function CellScene({ active }: SceneProps) {
  const hl = (id: string) => (active === id ? 4 : 2);
  return (
    <g>
      <rect
        x="40"
        y="30"
        width="320"
        height="220"
        rx="18"
        fill="#dcfce7"
        stroke="#15803d"
        strokeWidth={hl("wall") + 2}
      />
      <rect
        x="54"
        y="44"
        width="292"
        height="192"
        rx="14"
        fill="#f0fdf4"
        stroke="#22c55e"
        strokeWidth={hl("membrane")}
      />
      <ellipse
        cx="250"
        cy="140"
        rx="70"
        ry="55"
        fill="#e0f2fe"
        stroke="#0ea5e9"
        strokeWidth={hl("vacuole")}
      />
      <circle
        cx="130"
        cy="110"
        r="32"
        fill="#ede9fe"
        stroke="#7c3aed"
        strokeWidth={hl("nucleus")}
      />
      <circle cx="130" cy="110" r="10" fill="#a78bfa" />
      {[
        [110, 195],
        [170, 200],
        [300, 70],
        [90, 160],
      ].map(([x, y]) => (
        <ellipse
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          rx="16"
          ry="8"
          fill="#4ade80"
          stroke="#166534"
          strokeWidth={hl("chloroplast")}
        />
      ))}
    </g>
  );
}

function IslandBase() {
  return (
    <g>
      <rect x="0" y="0" width="400" height="300" fill="#e0f2fe" />
      <path
        d="M200 20 C250 40 270 90 260 150 C250 210 230 260 190 285 C160 260 140 210 140 150 C140 90 160 40 200 20 Z"
        fill="#fefce8"
        stroke="#a16207"
        strokeWidth="2"
      />
    </g>
  );
}
function MountainLayer() {
  return (
    <g>
      <path
        d="M205 50 C225 90 228 160 215 230 C205 200 195 150 195 100 Z"
        fill="#a3a3a3"
        opacity="0.8"
      />
      <text x="232" y="130" fontSize="12" fill="#404040">
        山脈
      </text>
    </g>
  );
}
function RiverLayer() {
  return (
    <g fill="none" stroke="#2563eb" strokeWidth="3">
      <path d="M200 110 C185 120 170 125 150 130" />
      <path d="M205 170 C230 180 245 190 255 200" />
      <path d="M200 220 C180 235 170 245 165 255" />
    </g>
  );
}
function CityLayer() {
  return (
    <g>
      {[
        [175, 60, "北城"],
        [150, 150, "中城"],
        [175, 250, "南城"],
      ].map(([x, y, n]) => (
        <g key={String(n)}>
          <circle cx={Number(x)} cy={Number(y)} r="7" fill="#dc2626" />
          <text x={Number(x) - 40} y={Number(y) + 4} fontSize="12" fill="#7f1d1d">
            {n}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ───────── 示範實驗：擲硬幣 ───────── */

function CoinLab({ onComplete }: LabProps) {
  const [n, setN] = useState(10);
  const [heads, setHeads] = useState<number[]>([]);
  const flip = () => {
    const res = Array.from({ length: n }, () => (Math.random() < 0.5 ? 1 : 0));
    const next = [...heads, ...res];
    setHeads(next);
    if (next.length >= 100) onComplete();
  };
  const ratio = heads.length ? heads.reduce((a, b) => a + b, 0) / heads.length : 0;
  const running = heads.map((_, i) => heads.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3">
        <ParamSlider label="每次擲幾枚" min={1} max={100} step={1} value={n} onChange={setN} />
        <button type="button" className="btn-primary" onClick={flip}>
          🪙 擲硬幣
        </button>
        <p className="text-sm">
          累計 {heads.length} 次，正面比例 <strong>{(ratio * 100).toFixed(1)}%</strong>
        </p>
        <p className="text-xs text-slate-500">擲超過 100 次即完成實驗。</p>
      </div>
      <Plot
        x={[0, Math.max(10, heads.length)]}
        y={[0, 1]}
        xLabel="次數"
        yLabel="正面比例"
        fns={[{ label: "理論值 0.5", f: () => 0.5, color: "#94a3b8" }]}
      >
        {({ sx, sy }) => (
          <path
            d={running.map((r, i) => `${i ? "L" : "M"}${sx(i + 1)},${sy(r)}`).join("")}
            fill="none"
            stroke="#e11d48"
            strokeWidth={2}
          />
        )}
      </Plot>
    </div>
  );
}

const loadCell = () => Promise.resolve({ default: CellScene });
const loadIsland = () => Promise.resolve({ default: IslandBase });
const loadMountain = () => Promise.resolve({ default: MountainLayer });
const loadRiver = () => Promise.resolve({ default: RiverLayer });
const loadCity = () => Promise.resolve({ default: CityLayer });
const loadCoin = () => Promise.resolve({ default: CoinLab });

export const DEMO_QUESTIONS: Question[] = [
  {
    id: "demo.junior.q-1",
    type: "single",
    stem: "方程式 $2x + 3 = 11$ 的解是？",
    choices: ["$x = 3$", "$x = 4$", "$x = 7$", "$x = 8$"],
    answer: 1,
    explain: "兩邊同減 3 得 $2x = 8$，再同除以 2 得 $x = 4$。",
  },
  {
    id: "demo.junior.q-2",
    type: "tf",
    stem: "植物細胞有細胞壁，動物細胞沒有。",
    answer: true,
    explain: "細胞壁是植物細胞特有的構造，提供支撐與保護。",
  },
  {
    id: "demo.junior.q-3",
    type: "numeric",
    stem: "直角三角形兩股長為 3 和 4，斜邊長為多少？",
    answer: 5,
    explain: "由畢氏定理：$\\sqrt{3^2+4^2}=\\sqrt{25}=5$。",
  },
  {
    id: "demo.junior.q-4",
    type: "cloze",
    stem: "水的化學式是 ____。（請用英文字母與數字作答）",
    accept: ["H2O", "H₂O"],
    explain: "水由 2 個氫原子與 1 個氧原子組成：$\\ce{H2O}$。",
  },
  {
    id: "demo.junior.q-5",
    type: "multi",
    stem: "下列哪些是質數？",
    choices: ["2", "9", "13", "21"],
    answer: [0, 2],
    explain: "9 = 3×3、21 = 3×7 都是合數；2 與 13 只有 1 和自己兩個因數。",
  },
];

export const DEMO_ACTIVITIES: Activity[] = [
  {
    id: "mindmap",
    kind: "mindmap",
    title: "心智圖：國中數學主題",
    prompt: "點開節點，看看每個主題的重點。",
    root: {
      id: "demo.junior",
      title: "國中數學",
      children: [
        {
          id: "demo.junior.n",
          title: "數與量",
          children: [
            {
              id: "demo.junior.n1",
              title: "負數與數線",
              grade: 7,
              code: "N-7-3",
              summary: "認識負數，並在數線上表示。",
              keyPoints: ["數線右大左小", "絕對值是到原點的距離"],
            },
            {
              id: "demo.junior.n2",
              title: "平方根",
              grade: 8,
              code: "N-8-1",
              summary: "$\\sqrt{a}$ 表示平方後等於 $a$ 的非負數。",
            },
          ],
        },
        {
          id: "demo.junior.a",
          title: "代數",
          children: [
            {
              id: "demo.junior.a1",
              title: "一元一次方程式",
              grade: 7,
              code: "A-7-3",
              summary: "等量公理解方程式。",
            },
            {
              id: "demo.junior.a2",
              title: "乘法公式",
              grade: 8,
              code: "A-8-1",
              keyPoints: ["$(a+b)^2=a^2+2ab+b^2$", "$(a+b)(a-b)=a^2-b^2$"],
            },
          ],
        },
      ],
    },
  },
  {
    id: "slider",
    kind: "slider",
    title: "拉桿：二次函數的頂點",
    prompt: "拖動拉桿改變 $a$、$h$、$k$，觀察 $y = a(x-h)^2 + k$ 的圖形。",
    params: [
      { key: "a", label: "a（開口）", min: -3, max: 3, step: 0.1, init: 1 },
      { key: "h", label: "h（左右平移）", min: -5, max: 5, step: 0.5, init: 0 },
      { key: "k", label: "k（上下平移）", min: -5, max: 5, step: 0.5, init: 0 },
    ],
    plot: {
      x: [-6, 6],
      y: [-6, 6],
      fns: [{ label: "y = a(x−h)² + k", f: (x, p) => p.a * (x - p.h) ** 2 + p.k }],
      points: (p) => [{ x: p.h, y: p.k, label: `頂點 (${p.h}, ${p.k})` }],
    },
    readouts: [
      { label: "頂點", value: (p) => `(${p.h}, ${p.k})` },
      { label: "開口", value: (p) => (p.a > 0 ? "向上" : p.a < 0 ? "向下" : "退化成直線") },
    ],
    goal: {
      text: "把頂點移到 $(2, -1)$ 且開口向下。",
      test: (p) => p.h === 2 && p.k === -1 && p.a < 0,
    },
    insight: "$h$ 控制左右、$k$ 控制上下，$a$ 的正負決定開口方向，$|a|$ 越大越窄。",
  },
  {
    id: "lab",
    kind: "lab",
    title: "互動實驗：擲硬幣與機率",
    load: loadCoin,
    insight: "擲的次數越多，正面比例越接近 0.5（大數法則）。",
  },
  {
    id: "drag-cat",
    kind: "drag",
    mode: "categorize",
    title: "拖拽分類：細胞構造",
    buckets: [
      { id: "plant", label: "只有植物細胞有" },
      { id: "both", label: "動植物細胞都有" },
    ],
    items: [
      { id: "wall", label: "細胞壁", bucket: "plant" },
      { id: "chloro", label: "葉綠體", bucket: "plant" },
      { id: "membrane", label: "細胞膜", bucket: "both" },
      { id: "nucleus", label: "細胞核", bucket: "both" },
      { id: "mito", label: "粒線體", bucket: "both" },
    ],
  },
  {
    id: "drag-order",
    kind: "drag",
    mode: "order",
    title: "拖拽排序：行星由內而外",
    items: [
      { id: "me", label: "水星" },
      { id: "ve", label: "金星" },
      { id: "ea", label: "地球" },
      { id: "ma", label: "火星" },
    ],
  },
  {
    id: "drag-match",
    kind: "drag",
    mode: "match",
    title: "拖拽配對：英文單字",
    pairs: [
      { id: "p1", left: "apple", right: "蘋果" },
      { id: "p2", left: "library", right: "圖書館" },
      { id: "p3", left: "weather", right: "天氣" },
    ],
  },
  {
    id: "hotspot",
    kind: "hotspot",
    title: "熱區：植物細胞",
    viewBox: "0 0 400 280",
    scene: loadCell,
    spots: [
      {
        id: "wall",
        x: 48,
        y: 140,
        title: "細胞壁",
        body: "位於最外層，由纖維素構成，支撐與保護細胞。",
      },
      {
        id: "nucleus",
        x: 130,
        y: 110,
        title: "細胞核",
        body: "含遺傳物質 DNA，控制細胞的生命活動。",
      },
      {
        id: "vacuole",
        x: 250,
        y: 140,
        title: "液胞",
        body: "儲存水分與養分，成熟植物細胞的液胞很大。",
      },
      { id: "chloroplast", x: 300, y: 70, title: "葉綠體", body: "進行光合作用的場所，含葉綠素。" },
    ],
  },
  {
    id: "layers",
    kind: "layers",
    title: "圖層疊加：島嶼地理",
    viewBox: "0 0 400 300",
    base: loadIsland,
    layers: [
      { id: "mountain", label: "山脈", load: loadMountain, color: "#737373" },
      { id: "river", label: "河川", load: loadRiver, color: "#2563eb" },
      { id: "city", label: "城市", load: loadCity, color: "#dc2626" },
    ],
    check: {
      stem: "疊加圖層後，城市大多位在哪裡？",
      choices: ["山脈頂端", "河川下游的平原", "島嶼中央"],
      answer: 1,
      explain: "河川下游的平原地勢平坦、水源充足，適合人口聚集。",
    },
  },
  {
    id: "steps",
    kind: "steps",
    title: "步驟拆解：解方程式",
    problem: "解 $3(x - 2) = 2x + 5$",
    steps: [
      { show: "$3x - 6 = 2x + 5$", why: "先用分配律展開括號。" },
      {
        show: "$3x - 2x = 5 + 6$",
        why: "移項：含 $x$ 的放左邊，常數放右邊，移項要變號。",
        predict: {
          choices: ["$3x - 2x = 5 + 6$", "$3x + 2x = 5 - 6$", "$3x - 2x = 5 - 6$"],
          answer: 0,
        },
      },
      { show: "$x = 11$", why: "合併同類項。" },
    ],
    takeaway: "解一元一次方程式：**去括號 → 移項 → 合併 → 係數化 1**。",
  },
  {
    id: "scratch",
    kind: "scratch",
    title: "刮刮樂：單字記憶",
    cards: [
      { front: "**environment**", back: "環境（n.）", speak: "environment" },
      { front: "**opportunity**", back: "機會（n.）", speak: "opportunity" },
    ],
  },
  {
    id: "dialogue",
    kind: "dialogue",
    title: "情境對話：菜市場裡的數學",
    scenarioId: "math.junior.s-market",
  },
  {
    id: "canvas",
    kind: "canvas",
    title: "沙盒畫布：畫出直線",
    task: "在坐標平面上畫出 $y = 2x - 1$，並標出與 $y$ 軸的交點。",
    background: "axes",
    hint: "先找兩個點，例如 $x=0$ 與 $x=1$。",
    reference: "通過 $(0,-1)$ 與 $(1,1)$ 的直線，斜率為 2。",
    aiFeedback: true,
  },
  { id: "quiz", kind: "quiz", title: "練習題", questionIds: DEMO_QUESTIONS.map((q) => q.id) },
  {
    id: "memory",
    kind: "memory",
    title: "翻牌配對：元素符號",
    pairs: [
      ["H", "氫"],
      ["O", "氧"],
      ["C", "碳"],
      ["Na", "鈉"],
    ],
  },
];
