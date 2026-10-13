import type { Lesson } from "../../types";

const unitCircleLab = () => import("../labs/UnitCircleLab");
const vectorLab = () => import("../labs/VectorLab");

const q = (s: string) => `math.senior.q-${s}`;

/* 數據分析拉桿用的固定資料（確定性，方便重現） */
const XS = Array.from({ length: 20 }, (_, i) => 0.5 + i * 0.5);
const NOISE = [
  1.2, -0.8, 0.5, -1.5, 0.9, -0.3, 1.6, -1.1, 0.2, -0.6, 1.3, -1.4, 0.7, -0.2, 1, -0.9, 0.4, -1.7,
  0.8, -0.4,
];
const dataY = (r: number) =>
  XS.map((x, i) => 5 + r * 0.8 * (x - 5) + (1 - Math.abs(r)) * 2.5 * NOISE[i]);
function corr(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
    syy += (ys[i] - my) ** 2;
  }
  return sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0;
}
function regression(r: number) {
  const ys = dataY(r);
  const n = XS.length;
  const mx = XS.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (XS[i] - mx) * (ys[i] - my);
    sxx += (XS[i] - mx) ** 2;
  }
  const m = sxy / sxx;
  return { m, b: my - m * mx };
}

const lessons: Lesson[] = [
  {
    id: "math.senior.exp-log",
    title: "指數與對數：成長的語言",
    grade: 10,
    minutes: 10,
    nodeIds: ["math.senior.exp-log"],
    objectives: [
      "比較 $y = a^x$ 與 $y = \\log_a x$ 的圖形",
      "熟悉指數律與對數律",
      "能解簡單的指數方程式",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：底數 a 怎麼影響圖形？",
        prompt: "觀察 $y = a^x$（紫）與 $y = \\log_a x$（紅）的形狀，以及它們和 $y = x$ 的關係。",
        params: [{ key: "a", label: "底數 a", min: 0.2, max: 4, step: 0.1, init: 2 }],
        plot: {
          x: [-4, 6],
          y: [-4, 6],
          fns: [
            { label: "y = aˣ", f: (x, p) => p.a ** x },
            {
              label: "y = logₐ x",
              f: (x, p) => (x > 0 && p.a !== 1 ? Math.log(x) / Math.log(p.a) : Number.NaN),
              color: "#e11d48",
            },
            { label: "y = x", f: (x) => x, color: "#cbd5e1" },
          ],
          points: () => [
            { x: 0, y: 1, label: "(0, 1)", color: "#4f46e5" },
            { x: 1, y: 0, label: "(1, 0)", color: "#e11d48" },
          ],
        },
        readouts: [
          {
            label: "單調性",
            value: (p) => (p.a > 1 ? "遞增" : p.a < 1 ? "遞減" : "常數函數（a = 1）"),
          },
          { label: "a² 的值", value: (p) => (p.a ** 2).toFixed(2) },
        ],
        goal: { text: "調整底數，讓**兩條曲線都變成遞減**。", test: (p) => p.a < 1 },
        insight:
          "$a > 1$ 時遞增、$0 < a < 1$ 時遞減。兩圖形互為反函數，對稱於 $y = x$；分別恆過 $(0, 1)$ 與 $(1, 0)$。",
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：指數律與對數律",
        cards: [
          { front: "$a^m \\cdot a^n = ?$", back: "$a^{m+n}$" },
          { front: "$(a^m)^n = ?$", back: "$a^{mn}$" },
          { front: "$\\log_a MN = ?$", back: "$\\log_a M + \\log_a N$" },
          { front: "$\\log_a M^r = ?$", back: "$r \\log_a M$" },
          { front: "換底公式 $\\log_a b = ?$", back: "$\\frac{\\log b}{\\log a}$" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "解指數方程式",
        problem: "解 $2^{x+1} = 32$",
        steps: [
          {
            show: "$32 = 2^5$",
            why: "把兩邊寫成同底數。",
            predict: {
              question: "32 可以寫成 2 的幾次方？",
              choices: ["$2^4$", "$2^5$", "$2^6$"],
              answer: 1,
            },
          },
          {
            show: "$2^{x+1} = 2^5 \\Rightarrow x + 1 = 5$",
            why: "底數相同（且 $\\ne 1$），指數必相等。",
          },
          { show: "$x = 4$" },
        ],
        takeaway: "指數方程式：**化成同底** → 比較指數；化不成同底時，兩邊取對數。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e3"), q("e5"), q("e6")],
      },
    ],
  },
  {
    id: "math.senior.counting-probability",
    title: "排列組合與機率：算清楚再出手",
    grade: 10,
    minutes: 15,
    nodeIds: ["math.senior.counting", "math.senior.probability"],
    objectives: [
      "分辨排列與組合",
      "會用「全部 − 不合」計算「至少」型問題",
      "能用期望值判斷遊戲是否划算",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "排列還是組合？",
        prompt: "關鍵：**交換順序算不算不同的結果？**",
        buckets: [
          { id: "p", label: "排列（順序有差）" },
          { id: "c", label: "組合（順序無差）" },
        ],
        items: [
          { id: "i1", label: "選出班長和副班長各一人", bucket: "p" },
          { id: "i2", label: "從 10 人中選 3 人當值日生", bucket: "c" },
          { id: "i3", label: "4 本不同的書排在書架上", bucket: "p" },
          { id: "i4", label: "從 5 種配料選 2 種加在披薩上", bucket: "c" },
          { id: "i5", label: "設定數字不重複的 4 位數密碼", bucket: "p" },
          { id: "i6", label: "從 52 張撲克牌抽 5 張成為一手牌", bucket: "c" },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "「至少」問題：用扣的比較快",
        problem: "從 5 男 4 女中選出 3 人，**至少有 1 位女生**的選法有幾種？",
        steps: [
          { show: "全部選法：$C^9_3 = 84$" },
          {
            show: "「沒有女生」＝全是男生：$C^5_3 = 10$",
            predict: {
              question: "「至少 1 女」的反面是？",
              choices: ["至少 1 男", "全部都是男生", "恰好 1 女"],
              answer: 1,
            },
          },
          { show: "$84 - 10 = 74$ 種" },
        ],
        takeaway: "「至少一個」常用**餘事件**：全部 − 一個都沒有。",
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：公式與意義",
        pairs: [
          ["$P^n_k$", "$\\frac{n!}{(n-k)!}$"],
          ["$C^n_k$", "$\\frac{n!}{k!(n-k)!}$"],
          ["$0!$", "定義為 1"],
          ["$P(A \\cup B)$", "$P(A) + P(B) - P(A \\cap B)$"],
          ["$P(A')$", "$1 - P(A)$"],
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：夜市抽獎划算嗎？",
        scenarioId: "math.senior.s-lottery",
      },
      { id: "a5", kind: "quiz", title: "小試身手", questionIds: [q("c1"), q("c3"), q("c4")] },
    ],
  },
  {
    id: "math.senior.data-analysis",
    title: "數據分析：相關係數與迴歸直線",
    grade: 10,
    minutes: 10,
    nodeIds: ["math.senior.data"],
    objectives: ["從散布圖判斷正、負相關與強弱", "理解相關係數的範圍與意義", "知道相關不等於因果"],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：資料的相關程度",
        prompt: "拉動「關聯強度」，觀察散布圖、相關係數 $r$ 與迴歸直線的變化。",
        params: [
          { key: "s", label: "關聯強度（負 ← → 正）", min: -1, max: 1, step: 0.1, init: 0.2 },
        ],
        plot: {
          x: [0, 10.5],
          y: [0, 10],
          xLabel: "x",
          yLabel: "y",
          fns: [
            {
              label: "迴歸直線",
              f: (x, p) => regression(p.s).m * x + regression(p.s).b,
              color: "#e11d48",
            },
          ],
          points: (p) => XS.map((x, i) => ({ x, y: dataY(p.s)[i], color: "#4f46e5" })),
        },
        readouts: [
          { label: "相關係數 r", value: (p) => corr(XS, dataY(p.s)).toFixed(3) },
          { label: "迴歸直線斜率", value: (p) => regression(p.s).m.toFixed(2) },
        ],
        goal: {
          text: "讓資料呈現**強烈負相關**（$r \\le -0.8$）。",
          test: (p) => corr(XS, dataY(p.s)) <= -0.8,
        },
        insight:
          "$-1 \\le r \\le 1$；$|r|$ 越接近 1，點越集中在一直線上。迴歸直線一定通過 $(\\bar{x}, \\bar{y})$，斜率與 $r$ 同號。",
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：統計觀念",
        cards: [
          { front: "標準差 $\\sigma$ 越大代表？", back: "資料越**分散**，離平均數越遠。" },
          {
            front: "相關係數 $r = 0$ 代表？",
            back: "沒有**線性**相關（但仍可能有其他關係，例如拋物線）。",
          },
          {
            front: "冰淇淋銷量和溺水人數正相關，冰淇淋害人溺水嗎？",
            back: "不是！兩者都受「天氣熱」影響。**相關不等於因果**。",
          },
          { front: "每筆資料都加 5，標準差會？", back: "**不變**；平均數加 5，但分散程度不變。" },
        ],
      },
      {
        id: "a3",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("d1"), q("d2"), q("d3"), q("d4")],
      },
    ],
  },
  {
    id: "math.senior.trig-unit-circle",
    title: "三角函數：單位圓轉一圈",
    grade: 11,
    minutes: 12,
    nodeIds: ["math.senior.trig-func", "math.senior.trig-ratio"],
    objectives: ["用單位圓理解廣義角的正弦與餘弦", "熟記特別角的三角函數值", "能使用正弦定理"],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：單位圓與正弦波",
        prompt: "拖動角度 θ，看單位圓上的點如何對應到正弦波。",
        load: unitCircleLab,
        insight:
          "點 $P$ 的 $y$ 坐標就是 $\\sin\\theta$、$x$ 坐標就是 $\\cos\\theta$，所以 $\\sin^2\\theta + \\cos^2\\theta = 1$。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：特別角的值",
        pairs: [
          { id: "t1", left: "$\\sin 30^\\circ$", right: "$\\frac{1}{2}$" },
          { id: "t2", left: "$\\cos 30^\\circ$", right: "$\\frac{\\sqrt{3}}{2}$" },
          { id: "t3", left: "$\\tan 45^\\circ$", right: "$1$" },
          { id: "t4", left: "$\\sin 45^\\circ$", right: "$\\frac{\\sqrt{2}}{2}$" },
          { id: "t5", left: "$\\cos 180^\\circ$", right: "$-1$" },
          { id: "t6", left: "$\\tan 60^\\circ$", right: "$\\sqrt{3}$" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "正弦定理求外接圓半徑",
        problem: "$\\triangle ABC$ 中，$\\angle A = 30^\\circ$，$a = 5$，求外接圓半徑 $R$。",
        steps: [
          {
            show: "正弦定理：$\\frac{a}{\\sin A} = 2R$",
            predict: {
              question: "要用哪個定理？",
              choices: ["正弦定理", "餘弦定理", "畢氏定理"],
              answer: 0,
            },
          },
          { show: "$\\frac{5}{\\sin 30^\\circ} = \\frac{5}{1/2} = 10 = 2R$" },
          { show: "$R = 5$" },
        ],
        takeaway: "已知「一邊及其對角」→ 正弦定理；已知「兩邊夾一角」或「三邊」→ 餘弦定理。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("t1"), q("t2"), q("t4"), q("t5")],
      },
    ],
  },
  {
    id: "math.senior.vectors",
    title: "平面向量：有方向的量",
    grade: 11,
    minutes: 12,
    nodeIds: ["math.senior.vector"],
    objectives: ["能用平行四邊形法作向量加法", "能計算內積並求夾角", "知道垂直時內積為 0"],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：向量加法與內積",
        load: vectorLab,
        insight:
          "內積 $\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta$：夾角為銳角時內積為正、鈍角時為負、垂直時為 0。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "內積求夾角",
        problem: "已知 $\\vec{u} = (1, 2)$、$\\vec{v} = (3, -1)$，求 $\\cos\\theta$。",
        steps: [
          {
            show: "$\\vec{u} \\cdot \\vec{v} = 1 \\times 3 + 2 \\times (-1) = 1$",
            predict: { question: "內積是多少？", choices: ["$1$", "$5$", "$-1$"], answer: 0 },
          },
          { show: "$|\\vec{u}| = \\sqrt{5}$，$|\\vec{v}| = \\sqrt{10}$" },
          {
            show: "$\\cos\\theta = \\frac{1}{\\sqrt{5}\\sqrt{10}} = \\frac{1}{5\\sqrt{2}} = \\frac{\\sqrt{2}}{10}$",
          },
          { show: "$\\cos\\theta > 0$，所以 $\\theta$ 是銳角（約 $81.9^\\circ$）。" },
        ],
      },
      {
        id: "a3",
        kind: "canvas",
        title: "動手畫：兩種向量加法",
        task: "畫兩個向量 $\\vec{a}$、$\\vec{b}$，分別用**三角形法**（頭接尾）與**平行四邊形法**畫出 $\\vec{a} + \\vec{b}$。",
        background: "grid",
        hint: "可用「箭頭」工具畫向量，用不同顏色區分。",
        reference:
          "三角形法：把 $\\vec{b}$ 的起點接在 $\\vec{a}$ 的終點；平行四邊形法：兩向量同起點，對角線就是和向量。兩種方法結果相同。",
        aiFeedback: true,
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("v1"), q("v2"), q("v3"), q("v4")],
      },
    ],
  },
  {
    id: "math.senior.calculus-intro",
    title: "微積分入門：從割線到切線",
    grade: 12,
    minutes: 15,
    nodeIds: ["math.senior.limit", "math.senior.calculus"],
    objectives: ["理解導數是切線斜率（割線斜率的極限）", "能用導數求極值", "知道積分與面積的關係"],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "微積分概念地圖",
        root: {
          id: "calc",
          title: "微積分",
          children: [
            {
              id: "calc-limit",
              title: "極限",
              summary: "當 $h$ 越來越接近 0 時，式子會趨近的值。",
              children: [
                {
                  id: "calc-deriv",
                  title: "導數 f′(a)",
                  summary: "$f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$，即切線斜率。",
                },
                {
                  id: "calc-int",
                  title: "定積分",
                  summary: "把區間切成很多細長方形，面積和的極限。",
                },
              ],
            },
            { id: "calc-mono", title: "遞增與遞減", summary: "$f' > 0$ 遞增；$f' < 0$ 遞減。" },
            { id: "calc-ext", title: "極值", summary: "$f'$ 由正變負為極大，由負變正為極小。" },
            {
              id: "calc-ftc",
              title: "微積分基本定理",
              summary: "$\\int_a^b f(x)\\,dx = F(b) - F(a)$，其中 $F' = f$。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：割線逼近切線",
        prompt: "割線通過 $(1, 1)$ 與 $(1 + h, (1 + h)^2)$。把 $h$ 縮小，看割線斜率趨近多少。",
        params: [{ key: "h", label: "h", min: 0.05, max: 2, step: 0.05, init: 1.5 }],
        plot: {
          x: [-1, 4],
          y: [-1, 9],
          fns: [
            { label: "y = x²", f: (x) => x * x },
            { label: "割線", f: (x, p) => 1 + (2 + p.h) * (x - 1), color: "#e11d48" },
            { label: "切線 y = 2x − 1", f: (x) => 2 * x - 1, color: "#94a3b8" },
          ],
          points: (p) => [
            { x: 1, y: 1, label: "(1, 1)" },
            { x: 1 + p.h, y: (1 + p.h) ** 2, color: "#e11d48" },
          ],
        },
        readouts: [
          { label: "割線斜率", value: (p) => (2 + p.h).toFixed(2) },
          { label: "切線斜率 f′(1)", value: () => "2" },
        ],
        goal: { text: "讓割線斜率**小於 2.1**。", test: (p) => 2 + p.h < 2.1 },
        insight:
          "割線斜率 $= \\frac{(1+h)^2 - 1}{h} = 2 + h$，當 $h \\to 0$ 時趨近 2，這就是 $f'(1) = 2$。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "用導數找極值",
        problem: "求 $f(x) = x^3 - 3x$ 的極大值與極小值",
        steps: [
          { show: "$f'(x) = 3x^2 - 3$" },
          {
            show: "令 $f'(x) = 0$：$x = 1$ 或 $x = -1$",
            predict: {
              question: "$3x^2 - 3 = 0$ 的解是？",
              choices: ["$x = \\pm 1$", "$x = 1$", "$x = \\pm 3$"],
              answer: 0,
            },
          },
          { show: "$x < -1$ 時 $f' > 0$；$-1 < x < 1$ 時 $f' < 0$；$x > 1$ 時 $f' > 0$" },
          { show: "極大值 $f(-1) = 2$，極小值 $f(1) = -2$" },
        ],
        takeaway: "求極值：**求導 → 令導數為 0 → 檢查導數正負變化**。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("k1"), q("k2"), q("k3"), q("k4")],
      },
    ],
  },
];

export default lessons;
