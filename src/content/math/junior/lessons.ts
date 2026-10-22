import type { Lesson } from "../../types";

const pythagorasLab = () => import("../labs/PythagorasLab");
const diceLab = () => import("../labs/DiceLab");
const triangleScene = () => import("../scenes/RightTriangleScene");
const axes = () => import("../scenes/parabolaLayers").then((m) => ({ default: m.Axes }));
const base = () => import("../scenes/parabolaLayers").then((m) => ({ default: m.Base }));
const up = () => import("../scenes/parabolaLayers").then((m) => ({ default: m.Up }));
const right = () => import("../scenes/parabolaLayers").then((m) => ({ default: m.Right }));
const flip = () => import("../scenes/parabolaLayers").then((m) => ({ default: m.Flip }));

const q = (s: string) => `math.junior.q-${s}`;

const lessons: Lesson[] = [
  {
    id: "math.junior.negative-numbers",
    title: "負數與數線：在數線上走一走",
    grade: 7,
    minutes: 8,
    nodeIds: ["math.junior.n-negative"],
    objectives: [
      "能在數線上表示正負數並比較大小",
      "理解加上負數就是往左移動",
      "能依運算順序計算含負數的算式",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "數線上的加法",
        prompt: "$a$ 是起點，加上 $b$ 就是往右（$b > 0$）或往左（$b < 0$）走 $|b|$ 格。",
        params: [
          { key: "a", label: "起點 a", min: -8, max: 8, step: 1, init: 3 },
          { key: "b", label: "加上 b", min: -8, max: 8, step: 1, init: 2 },
        ],
        plot: {
          x: [-10, 10],
          y: [-1, 1],
          xLabel: "數線",
          vlines: (p) => [
            { x: p.a, label: "a", color: "#2563eb" },
            { x: p.a + p.b, label: "a+b", color: "#e11d48" },
          ],
          points: (p) => [
            { x: p.a, y: 0, color: "#2563eb" },
            { x: p.a + p.b, y: 0, label: String(p.a + p.b) },
          ],
        },
        readouts: [
          { label: "a + b", value: (p) => String(p.a + p.b) },
          { label: "|a + b|（到原點距離）", value: (p) => String(Math.abs(p.a + p.b)) },
        ],
        goal: {
          text: "讓起點 $a = 5$，並使 $a + b = -2$。$b$ 應該是多少？",
          test: (p) => p.a === 5 && p.a + p.b === -2,
        },
        insight: "加上負數就是往左走：$5 + (-7) = -2$，等於 $5 - 7$。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "由小到大排一排",
        prompt: "把下列數字由**小到大**排列。提示：數線上越左邊越小。",
        items: [
          { id: "n5", label: "$-5$" },
          { id: "n25", label: "$-2.5$" },
          { id: "nh", label: "$-\\frac{1}{2}$" },
          { id: "z", label: "$0$" },
          { id: "p34", label: "$\\frac{3}{4}$" },
          { id: "p2", label: "$2$" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：四則混合運算",
        problem: "計算 $(-3) - (-5) \\times 2 + |-4|$",
        steps: [
          {
            show: "先算乘法：$(-5) \\times 2 = -10$",
            why: "先乘除、後加減。",
            predict: {
              question: "第一步應該先算哪一部分？",
              choices: ["$(-3) - (-5)$", "$(-5) \\times 2$", "最後的 $+ |-4|$"],
              answer: 1,
            },
          },
          { show: "絕對值：$|-4| = 4$", why: "絕對值是到原點的距離，一定不是負數。" },
          {
            show: "$(-3) - (-10) = (-3) + 10 = 7$",
            why: "減去一個數，等於加上它的相反數。",
            predict: {
              question: "$(-3) - (-10)$ 等於？",
              choices: ["$-13$", "$7$", "$-7$"],
              answer: 1,
            },
          },
          { show: "$7 + 4 = 11$", why: "最後由左到右做加法。" },
        ],
        takeaway: "運算順序：**括號 → 指數 → 乘除 → 加減**；減負數 = 加正數。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("n1"), q("n2"), q("n3"), q("n5")],
      },
    ],
  },
  {
    id: "math.junior.linear-equation",
    title: "一元一次方程式：讓天平保持平衡",
    grade: 7,
    minutes: 12,
    nodeIds: ["math.junior.a-linear"],
    objectives: [
      "理解等量公理與移項法則",
      "能解含括號的一元一次方程式並驗算",
      "能把生活情境列成方程式",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：等量公理",
        prompt: "先想想看答案，再刮開確認。",
        cards: [
          { front: "若 $a = b$，兩邊同時加上 $c$？", back: "等式仍成立：$a + c = b + c$" },
          { front: "若 $a = b$，兩邊同時乘以 $c$？", back: "等式仍成立：$ac = bc$" },
          {
            front: "兩邊同除以一個數時要注意什麼？",
            back: "除數**不可以是 0**：$\\frac{a}{c} = \\frac{b}{c}$（$c \\ne 0$）",
          },
          {
            front: "什麼是「移項」？",
            back: "把一項從等號的一邊移到另一邊，**要變號**：$x + 3 = 7 \\Rightarrow x = 7 - 3$",
          },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：解方程式",
        problem: "解 $2(x + 3) = 5x - 9$",
        steps: [
          { show: "$2x + 6 = 5x - 9$", why: "用分配律去括號。" },
          {
            show: "$2x - 5x = -9 - 6$",
            why: "含 $x$ 的項移到左邊、常數移到右邊，移項變號。",
            predict: {
              choices: ["$2x - 5x = -9 - 6$", "$2x + 5x = -9 + 6$", "$2x - 5x = -9 + 6$"],
              answer: 0,
            },
          },
          { show: "$-3x = -15$", why: "合併同類項。" },
          {
            show: "$x = 5$",
            why: "兩邊同除以 $-3$。",
            predict: { choices: ["$x = -5$", "$x = 5$", "$x = 45$"], answer: 1 },
          },
          {
            show: "驗算：左式 $2(5 + 3) = 16$，右式 $5 \\times 5 - 9 = 16$，相等 ✓",
            why: "把解代回原式檢查。",
          },
        ],
        takeaway: "解題流程：**去括號 → 移項 → 合併 → 係數化為 1 → 驗算**。",
      },
      {
        id: "a3",
        kind: "slider",
        title: "圖解方程式：兩線的交點",
        prompt:
          "方程式 $2x + b = c$ 的解，就是直線 $y = 2x + b$ 與水平線 $y = c$ 交點的 $x$ 坐標。",
        params: [
          { key: "b", label: "b", min: -5, max: 5, step: 1, init: -3 },
          { key: "c", label: "c", min: -5, max: 9, step: 1, init: 7 },
        ],
        plot: {
          x: [-3, 8],
          y: [-6, 10],
          fns: [
            { label: "y = 2x + b", f: (x, p) => 2 * x + p.b },
            { label: "y = c", f: (_x, p) => p.c, color: "#e11d48" },
          ],
          points: (p) => [{ x: (p.c - p.b) / 2, y: p.c, label: `x = ${(p.c - p.b) / 2}` }],
        },
        readouts: [
          { label: "方程式", value: (p) => `2x ${p.b < 0 ? "−" : "+"} ${Math.abs(p.b)} = ${p.c}` },
          { label: "解", value: (p) => `x = ${(p.c - p.b) / 2}` },
        ],
        goal: {
          text: "調整 $b$ 與 $c$，讓方程式的解 $x = 3$。",
          test: (p) => (p.c - p.b) / 2 === 3,
        },
        insight: "$2 \\times 3 + b = c$，只要 $c - b = 6$ 解就是 3，所以有很多組 $(b, c)$ 都可以！",
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：菜市場裡的數學",
        scenarioId: "math.junior.s-market",
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：運動中心的方案選擇",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [
          "math.junior.q-set-gym-plan-1",
          "math.junior.q-set-gym-plan-2",
          "math.junior.q-set-gym-plan-3",
        ],
      },
      { id: "a5", kind: "quiz", title: "小試身手", questionIds: [q("l1"), q("l3"), q("l5")] },
    ],
  },
  {
    id: "math.junior.pythagoras",
    title: "畢氏定理：直角三角形的秘密",
    grade: 8,
    minutes: 12,
    nodeIds: ["math.junior.s-pythagoras"],
    objectives: [
      "能指出直角三角形的股與斜邊",
      "理解 $a^2 + b^2 = c^2$ 的面積意義",
      "能用畢氏定理解決生活問題",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "認識直角三角形",
        prompt: "點擊每個閃爍的熱點，認識直角三角形的各部位。",
        viewBox: "0 0 400 300",
        scene: triangleScene,
        spots: [
          { id: "right", x: 91, y: 229, title: "直角", body: "90° 的角。直角所對的邊就是斜邊。" },
          {
            id: "leg-a",
            x: 200,
            y: 240,
            title: "股 a",
            body: "夾住直角的兩條邊之一，稱為「股」。",
          },
          { id: "leg-b", x: 80, y: 150, title: "股 b", body: "另一條夾住直角的邊。" },
          {
            id: "hyp",
            x: 200,
            y: 150,
            title: "斜邊 c",
            body: "直角的對邊，是直角三角形中**最長**的邊。",
          },
          {
            id: "acute",
            x: 290,
            y: 228,
            title: "銳角",
            body: "直角三角形的另外兩個角都是銳角，且兩角和為 90°。",
          },
        ],
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：三個正方形的面積",
        prompt: "調整兩股長，觀察兩個小正方形面積和，與斜邊上大正方形面積的關係。",
        load: pythagorasLab,
        insight:
          "不論兩股多長，永遠有 $a^2 + b^2 = c^2$。三邊都是整數的組合稱為**勾股數**，如 3-4-5、6-8-10、5-12-13。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "生活應用：梯子有多高？",
        problem: "一把 13 公尺長的梯子斜靠在牆上，梯腳離牆腳 5 公尺。梯子頂端離地多高？",
        steps: [
          {
            show: "梯子、牆、地面形成直角三角形，**梯子是斜邊** $c = 13$，地面距離 $a = 5$。",
            predict: { question: "哪一段是斜邊？", choices: ["梯子", "牆", "地面"], answer: 0 },
          },
          { show: "設高度為 $h$：$5^2 + h^2 = 13^2$", why: "股² + 股² = 斜邊²" },
          { show: "$h^2 = 169 - 25 = 144$" },
          { show: "$h = 12$（公尺）", why: "長度不能是負數，所以只取正的平方根。" },
        ],
        takeaway: "先找出**直角與斜邊**，再列 $a^2 + b^2 = c^2$。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：3-4-5 三角形",
        task: "在方格上畫一個直角三角形，兩股分別是 3 格和 4 格，再量量看斜邊是不是 5 格長。",
        background: "grid",
        hint: "可以用「直線」工具畫邊，用不同顏色標出兩股和斜邊。",
        reference:
          "斜邊長 $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ 格。相傳古埃及人就用 3-4-5 的繩子圍出直角！",
        aiFeedback: true,
      },
      { id: "a5", kind: "quiz", title: "小試身手", questionIds: [q("p1"), q("p2"), q("p3")] },
    ],
  },
  {
    id: "math.junior.factorization",
    title: "乘法公式與因式分解",
    grade: 8,
    minutes: 10,
    nodeIds: ["math.junior.a-formula", "math.junior.a-factor"],
    objectives: ["熟記三個乘法公式並能用來速算", "能用公式與十字交乘法因式分解"],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：乘法公式",
        cards: [
          { front: "$(a + b)^2 = ?$", back: "$a^2 + 2ab + b^2$" },
          { front: "$(a - b)^2 = ?$", back: "$a^2 - 2ab + b^2$" },
          { front: "$(a + b)(a - b) = ?$", back: "$a^2 - b^2$（平方差公式）" },
          { front: "$101^2$ 怎麼心算？", back: "$(100 + 1)^2 = 10000 + 200 + 1 = 10201$" },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：多項式 ↔ 因式分解",
        prompt: "把右邊的因式分解結果，拖到對應的多項式旁。",
        pairs: [
          { id: "f1", left: "$x^2 - 9$", right: "$(x + 3)(x - 3)$" },
          { id: "f2", left: "$x^2 + 6x + 9$", right: "$(x + 3)^2$" },
          { id: "f3", left: "$x^2 + 5x + 6$", right: "$(x + 2)(x + 3)$" },
          { id: "f4", left: "$x^2 - x - 6$", right: "$(x - 3)(x + 2)$" },
          { id: "f5", left: "$2x^2 + 4x$", right: "$2x(x + 2)$" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "十字交乘法",
        problem: "因式分解 $x^2 + 7x + 12$",
        steps: [
          {
            show: "找兩個數：**相乘 = 12**、**相加 = 7**",
            why: "因為 $(x + p)(x + q) = x^2 + (p + q)x + pq$。",
          },
          {
            show: "$3 \\times 4 = 12$，$3 + 4 = 7$",
            predict: {
              question: "哪一組數符合？",
              choices: ["2 和 6", "3 和 4", "1 和 12"],
              answer: 1,
            },
          },
          { show: "$x^2 + 7x + 12 = (x + 3)(x + 4)$" },
          { show: "檢查：$(x + 3)(x + 4) = x^2 + 4x + 3x + 12 = x^2 + 7x + 12$ ✓" },
        ],
        takeaway: "常數項找「乘積」、一次項係數找「和」，最後展開檢查。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("f1"), q("f2"), q("f4"), q("f5")],
      },
    ],
  },
  {
    id: "math.junior.quadratic-function",
    title: "二次函數：拋物線大解密",
    grade: 9,
    minutes: 15,
    nodeIds: ["math.junior.f-quadratic"],
    objectives: [
      "能說出 $a$、$h$、$k$ 對拋物線的影響",
      "能用配方法求頂點與最大最小值",
      "能畫出二次函數的大致圖形",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：二次函數重點",
        root: {
          id: "qf",
          title: "$y = a(x-h)^2 + k$",
          children: [
            {
              id: "qf-a",
              title: "a：開口方向與寬窄",
              summary: "$a > 0$ 開口向上；$a < 0$ 開口向下；$|a|$ 越大越窄。",
            },
            { id: "qf-v", title: "頂點 (h, k)", summary: "拋物線的最高點或最低點。" },
            { id: "qf-axis", title: "對稱軸 x = h", summary: "拋物線左右對稱於直線 $x = h$。" },
            {
              id: "qf-ext",
              title: "最大值與最小值",
              summary: "$a > 0$ 時最小值為 $k$；$a < 0$ 時最大值為 $k$。",
            },
            {
              id: "qf-root",
              title: "與 x 軸交點",
              summary: "令 $y = 0$ 解一元二次方程式；判別式決定交點個數。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：調出指定的拋物線",
        params: [
          { key: "a", label: "a", min: -3, max: 3, step: 0.5, init: 1 },
          { key: "h", label: "h", min: -4, max: 4, step: 1, init: 0 },
          { key: "k", label: "k", min: -4, max: 5, step: 1, init: 0 },
        ],
        plot: {
          x: [-6, 6],
          y: [-6, 8],
          fns: [
            { label: "y = a(x−h)² + k", f: (x, p) => p.a * (x - p.h) ** 2 + p.k },
            { label: "y = −x²（參考）", f: (x) => -x * x, color: "#cbd5e1" },
          ],
          points: (p) => [{ x: p.h, y: p.k, label: `(${p.h}, ${p.k})` }],
          vlines: (p) => [{ x: p.h, label: "對稱軸" }],
        },
        readouts: [
          { label: "頂點", value: (p) => `(${p.h}, ${p.k})` },
          {
            label: "最值",
            value: (p) => (p.a > 0 ? `最小值 ${p.k}` : p.a < 0 ? `最大值 ${p.k}` : "a 不可為 0"),
          },
        ],
        goal: {
          text: "調出頂點 $(-1, 3)$、開口向下，而且比 $y = -x^2$ **更窄**的拋物線。",
          test: (p) => p.h === -1 && p.k === 3 && p.a < -1,
        },
        insight: "比 $y = -x^2$ 更窄表示 $|a| > 1$，再加上開口向下，所以 $a < -1$。",
      },
      {
        id: "a3",
        kind: "layers",
        title: "圖層疊加：拋物線的平移與翻轉",
        prompt: "逐一打開圖層，和黑色的 $y = x^2$ 比較。",
        viewBox: "0 0 400 300",
        base: axes,
        layers: [
          { id: "base", label: "y = x²（原圖形）", load: base, color: "#1e293b", on: true },
          {
            id: "up",
            label: "y = x² + 3",
            load: up,
            color: "#e11d48",
            note: "整個圖形**向上**平移 3 單位。",
          },
          {
            id: "right",
            label: "y = (x − 2)²",
            load: right,
            color: "#2563eb",
            note: "整個圖形**向右**平移 2 單位（注意是減號）。",
          },
          {
            id: "flip",
            label: "y = −x²",
            load: flip,
            color: "#059669",
            note: "對 $x$ 軸**上下翻轉**，開口變向下。",
          },
        ],
        check: {
          stem: "$y = (x - 2)^2$ 是把 $y = x^2$ 怎樣移動得到的？",
          choices: ["向右 2 單位", "向左 2 單位", "向上 2 單位"],
          answer: 0,
          explain: "頂點從 $(0, 0)$ 移到 $(2, 0)$，所以是向右平移 2 單位。",
        },
      },
      {
        id: "a4",
        kind: "steps",
        title: "配方法求頂點",
        problem: "求 $y = x^2 - 4x + 1$ 的頂點與最小值",
        steps: [
          {
            show: "$y = (x^2 - 4x + 4) - 4 + 1$",
            why: "一次項係數 $-4$ 的一半是 $-2$，平方得 4，加 4 再減 4。",
            predict: {
              question: "括號內要補上多少才能配成完全平方？",
              choices: ["2", "4", "16"],
              answer: 1,
            },
          },
          { show: "$y = (x - 2)^2 - 3$" },
          { show: "頂點 $(2, -3)$；$a = 1 > 0$ 開口向上，最小值為 $-3$。" },
        ],
        takeaway:
          "配方法：把 $x^2 + bx$ 補上 $\\left(\\frac{b}{2}\\right)^2$，寫成 $a(x-h)^2 + k$。",
      },
      {
        id: "a5",
        kind: "canvas",
        title: "動手畫拋物線",
        task: "在坐標平面畫出 $y = x^2 - 2x - 3$ 的大致圖形，並標出頂點和與 $x$ 軸的兩個交點。",
        background: "axes",
        hint: "先配方找頂點，再令 $y = 0$ 因式分解找 $x$ 截距。",
        reference:
          "$y = (x - 1)^2 - 4$，頂點 $(1, -4)$；$(x - 3)(x + 1) = 0$，$x$ 截距為 $3$ 與 $-1$；$y$ 截距為 $-3$。",
        aiFeedback: true,
      },
      { id: "a6", kind: "quiz", title: "小試身手", questionIds: [q("q1"), q("q3"), q("q5")] },
    ],
  },
  {
    id: "math.junior.probability",
    title: "機率與統計：骰子會說話",
    grade: 9,
    minutes: 10,
    nodeIds: ["math.junior.d-prob", "math.junior.d-stats"],
    objectives: [
      "理解古典機率的計算方式",
      "知道實驗次數越多，相對次數越接近機率",
      "分辨平均數、中位數、眾數",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：擲兩顆骰子",
        prompt: "擲兩顆骰子並記錄點數和，猜猜看哪個點數和最常出現？",
        load: diceLab,
        insight:
          "點數和 7 有 6 種組合（1+6、2+5、…、6+1），機率 $\\frac{6}{36} = \\frac{1}{6}$ 最大；和為 2 或 12 只有 1 種組合。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "事件分類",
        buckets: [
          { id: "one", label: "必然發生（機率 1）" },
          { id: "zero", label: "不可能發生（機率 0）" },
          { id: "some", label: "可能發生（0 到 1 之間）" },
        ],
        items: [
          { id: "e1", label: "擲一顆骰子出現 7 點", bucket: "zero" },
          { id: "e2", label: "擲一顆骰子點數小於 7", bucket: "one" },
          { id: "e3", label: "擲一枚硬幣出現正面", bucket: "some" },
          { id: "e4", label: "從只有紅球的袋子摸到紅球", bucket: "one" },
          { id: "e5", label: "擲兩顆骰子點數和為 1", bucket: "zero" },
          { id: "e6", label: "從撲克牌抽到紅心", bucket: "some" },
        ],
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：統計名詞",
        pairs: [
          ["平均數", "資料總和 ÷ 資料個數"],
          ["中位數", "排序後位於正中間的數"],
          ["眾數", "出現次數最多的數"],
          ["全距", "最大值 − 最小值"],
          ["四分位距", "$Q_3 - Q_1$"],
        ],
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：班級閱讀量統計",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [
          "math.junior.q-set-reading-stats-1",
          "math.junior.q-set-reading-stats-2",
          "math.junior.q-set-reading-stats-3",
        ],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s1"), q("s2"), q("s3"), q("s4")],
      },
    ],
  },
];

export default lessons;
