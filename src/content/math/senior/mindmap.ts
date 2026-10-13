import type { CurriculumNode } from "../../types";

/** 普通型高中數學（108 課綱第五學習階段）：高一共同必修、高二數A／數B、高三數甲／數乙 */
const mindmap: CurriculumNode = {
  id: "math.senior",
  title: "高中數學",
  summary: "高一學共同必修；高二依志向選數A（理工）或數B（人文社會）；高三加深加廣選數甲或數乙。",
  children: [
    {
      id: "math.senior.y10",
      title: "高一 共同必修",
      children: [
        {
          id: "math.senior.numbers",
          title: "數與式",
          grade: 10,
          summary: "實數的性質、絕對值、乘法公式與根式運算。",
          keyPoints: [
            "$|x - a| < r \\Leftrightarrow a - r < x < a + r$",
            "算幾不等式 $\\frac{a+b}{2} \\ge \\sqrt{ab}$（$a, b \\ge 0$）",
          ],
        },
        {
          id: "math.senior.line-circle",
          title: "直線與圓",
          grade: 10,
          summary: "斜率、直線方程式、圓方程式，以及直線與圓的關係。",
          keyPoints: ["點斜式 $y - y_0 = m(x - x_0)$", "圓 $(x-h)^2 + (y-k)^2 = r^2$"],
        },
        {
          id: "math.senior.polynomial",
          title: "多項式函數",
          grade: 10,
          summary: "多項式除法、餘式定理、因式定理、三次函數圖形與多項式不等式。",
          keyPoints: ["餘式定理：$f(x)$ 除以 $x - a$ 的餘式為 $f(a)$"],
        },
        {
          id: "math.senior.exp-log",
          title: "指數與對數",
          grade: 10,
          summary: "指數律推廣到實數指數、常用對數與對數律。",
          keyPoints: ["$\\log_a MN = \\log_a M + \\log_a N$", "$\\log 2 \\approx 0.3010$"],
          lessonIds: ["math.senior.exp-log"],
        },
        {
          id: "math.senior.sequence",
          title: "數列與級數",
          grade: 10,
          summary: "等差、等比數列與級數，$\\Sigma$ 符號與數學歸納法。",
        },
        {
          id: "math.senior.counting",
          title: "排列組合",
          grade: 10,
          summary: "加法原理、乘法原理、排列 $P^n_k$ 與組合 $C^n_k$、二項式定理。",
          lessonIds: ["math.senior.counting-probability"],
        },
        {
          id: "math.senior.probability",
          title: "古典機率",
          grade: 10,
          summary: "樣本空間、事件、機率的性質與期望值。",
          lessonIds: ["math.senior.counting-probability"],
        },
        {
          id: "math.senior.data",
          title: "數據分析",
          grade: 10,
          summary: "一維數據的平均與標準差；二維數據的散布圖、相關係數與迴歸直線。",
          lessonIds: ["math.senior.data-analysis"],
        },
        {
          id: "math.senior.trig-ratio",
          title: "三角比",
          grade: 10,
          summary: "廣義角、正弦定理與餘弦定理、三角測量。",
          keyPoints: ["$\\frac{a}{\\sin A} = 2R$", "$c^2 = a^2 + b^2 - 2ab\\cos C$"],
        },
      ],
    },
    {
      id: "math.senior.y11",
      title: "高二 數A／數B",
      children: [
        {
          id: "math.senior.trig-func",
          title: "三角函數",
          grade: 11,
          summary: "弧度、單位圓定義的三角函數、圖形與週期、和角公式。",
          keyPoints: ["$\\sin^2\\theta + \\cos^2\\theta = 1$", "$y = \\sin x$ 週期 $2\\pi$"],
          lessonIds: ["math.senior.trig-unit-circle"],
        },
        {
          id: "math.senior.exp-func",
          title: "指數與對數函數",
          grade: 11,
          summary: "$y = a^x$ 與 $y = \\log_a x$ 的圖形互為反函數，對稱於 $y = x$。",
        },
        {
          id: "math.senior.vector",
          title: "平面向量",
          grade: 11,
          summary: "向量的加減、係數積、內積與夾角，以及面積公式。",
          keyPoints: ["$\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta$"],
          lessonIds: ["math.senior.vectors"],
        },
        {
          id: "math.senior.space",
          title: "空間向量、平面與直線（數A）",
          grade: 11,
          summary: "空間坐標、外積、平面方程式與空間直線。",
        },
        {
          id: "math.senior.matrix",
          title: "矩陣",
          grade: 11,
          summary: "矩陣運算、反方陣、線性變換與轉移矩陣（數B 偏重資料表的應用）。",
        },
        {
          id: "math.senior.cond-prob",
          title: "條件機率與貝氏定理",
          grade: 11,
          summary: "$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$，以及獨立事件。",
        },
      ],
    },
    {
      id: "math.senior.y12",
      title: "高三 數甲／數乙",
      children: [
        {
          id: "math.senior.random-var",
          title: "隨機變數與二項分布",
          grade: 12,
          summary: "離散隨機變數的期望值、變異數與二項分布。",
        },
        {
          id: "math.senior.complex",
          title: "複數與極式（數甲）",
          grade: 12,
          summary: "複數平面、極式與棣美弗定理。",
        },
        {
          id: "math.senior.limit",
          title: "極限與函數",
          grade: 12,
          summary: "數列與函數的極限、連續性。",
          lessonIds: ["math.senior.calculus-intro"],
        },
        {
          id: "math.senior.calculus",
          title: "微分與積分",
          grade: 12,
          summary: "導數是切線斜率；用導數判斷遞增遞減與極值；積分求面積。",
          lessonIds: ["math.senior.calculus-intro"],
        },
        {
          id: "math.senior.lp",
          title: "線性規劃（數乙）",
          grade: 12,
          summary: "在可行解區域的頂點找最大值或最小值。",
        },
      ],
    },
  ],
};

export default mindmap;
