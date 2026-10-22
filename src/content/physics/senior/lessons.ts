import type { Lesson } from "../../types";

const projectileLab = () => import("../labs/ProjectileLab");
const photoelectricLab = () => import("../labs/PhotoelectricLab");
const inductionScene = () => import("../scenes/InductionScene");
const incBase = () => import("../scenes/inclineLayers").then((m) => ({ default: m.Base }));
const incGravity = () => import("../scenes/inclineLayers").then((m) => ({ default: m.Gravity }));
const incNormal = () => import("../scenes/inclineLayers").then((m) => ({ default: m.Normal }));
const incFriction = () => import("../scenes/inclineLayers").then((m) => ({ default: m.Friction }));
const incComponents = () =>
  import("../scenes/inclineLayers").then((m) => ({ default: m.Components }));

const q = (s: string) => `physics.senior.q-${s}`;
const n = (s: string) => `physics.senior.${s}`;
/** 四捨五入到小數第 2 位並轉成字串 */
const r2 = (x: number) => (Number.isFinite(x) ? String(Math.round(x * 100) / 100) : "—");

const G = 10; // 重力加速度（m/s²）
const SOUND = 340; // 聲速（m/s）

/** 水平面上受水平拉力的物體：加速度（若拉力不足以克服摩擦則維持靜止） */
const accel = (F: number, m: number, mu: number) => {
  const fMax = mu * m * G;
  return F > fMax ? (F - fMax) / m : 0;
};

/** 一維碰撞（B 原本靜止），e 為恢復係數：1 為彈性碰撞、0 為完全非彈性碰撞 */
const collide = (m1: number, m2: number, v1: number, e: number) => ({
  a: ((m1 - e * m2) * v1) / (m1 + m2),
  b: ((1 + e) * m1 * v1) / (m1 + m2),
});

const lessons: Lesson[] = [
  {
    id: n("matter-interactions"),
    title: "物質的組成與四種基本交互作用",
    grade: 10,
    minutes: 10,
    nodeIds: [n("sci-units"), n("matter-scale"), n("interactions")],
    objectives: [
      "能用科學記號與數量級描述物質的尺度",
      "能說出物質由大到小的組成層次",
      "能說出四種基本交互作用及其代表現象",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：四種基本交互作用",
        root: {
          id: "fi",
          title: "四種基本交互作用",
          children: [
            {
              id: "fi-g",
              title: "重力",
              summary: "所有具有質量的物體互相吸引；作用範圍無限遠，但是四者中最弱。",
              keyPoints: ["主宰行星、恆星與星系的運動"],
            },
            {
              id: "fi-em",
              title: "電磁力",
              summary: "帶電粒子之間的作用：同性相斥、異性相吸；作用範圍無限遠。",
              keyPoints: ["使電子與原子核結合成原子", "摩擦力、正向力、張力的本質"],
            },
            {
              id: "fi-s",
              title: "強力",
              summary: "把夸克束縛成質子與中子，也把質子與中子結合成原子核；四者中最強。",
              keyPoints: ["作用範圍約 $10^{-15}$ m（原子核的大小）"],
            },
            {
              id: "fi-w",
              title: "弱力",
              summary: "造成 β 衰變等粒子種類的轉變，例如中子轉變為質子。",
              keyPoints: ["作用範圍極短，約 $10^{-18}$ m"],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "排序：由大到小的尺度",
        prompt: "把下列物體依大小由**大到小**排列。",
        items: [
          { id: "earth", label: "地球" },
          { id: "human", label: "人" },
          { id: "cell", label: "細胞" },
          { id: "atom", label: "原子" },
          { id: "nucleus", label: "原子核" },
          { id: "quark", label: "夸克" },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分類：這是哪一種交互作用？",
        prompt: "把每個現象拖到主要相關的基本交互作用。",
        buckets: [
          { id: "g", label: "重力" },
          { id: "em", label: "電磁力" },
          { id: "s", label: "強力" },
          { id: "w", label: "弱力" },
        ],
        items: [
          { id: "i1", label: "月球繞著地球運轉", bucket: "g" },
          { id: "i2", label: "蘋果從樹上掉下來", bucket: "g" },
          { id: "i3", label: "推箱子時地面對箱子的摩擦力", bucket: "em" },
          { id: "i4", label: "磁鐵吸引迴紋針", bucket: "em" },
          { id: "i5", label: "原子核內的質子與中子緊緊結合", bucket: "s" },
          { id: "i6", label: "夸克被束縛在質子內部", bucket: "s" },
          { id: "i7", label: "原子核的 β 衰變", bucket: "w" },
          { id: "i8", label: "微中子幾乎不與物質作用，能輕易穿過地球", bucket: "w" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：單位與尺度",
        cards: [
          {
            front: "國際單位制（SI）的 7 個基本單位？",
            back: "公尺 m、公斤 kg、秒 s、安培 A、克耳文 K、莫耳 mol、燭光 cd",
          },
          { front: "0.00052 m 用科學記號怎麼寫？", back: "$5.2 \\times 10^{-4}$ m" },
          {
            front: "原子與原子核的大小差多少？",
            back: "原子約 $10^{-10}$ m，原子核約 $10^{-15}$～$10^{-14}$ m，相差約 1 萬到 10 萬倍。",
          },
          {
            front: "光在真空中的速率？",
            back: "約 $3 \\times 10^8$ m/s，1 秒可繞地球約 7.5 圈。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("b1"), q("b2"), q("b3"), q("b4")],
      },
    ],
  },
  {
    id: n("projectile"),
    title: "拋體運動：命中目標",
    grade: 11,
    minutes: 14,
    nodeIds: [n("projectile"), n("linear-motion")],
    objectives: [
      "能把拋體運動分解成水平與鉛直兩個方向",
      "能計算飛行時間、最大高度與水平射程",
      "知道互為餘角的兩個仰角射程相同",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：拋體射靶",
        prompt: "調整初速與仰角後按「發射」。先用分量算算看射程，再發射驗證！",
        load: projectileLab,
        insight:
          "飛行時間 $T = \\dfrac{2v_0\\sin\\theta}{g}$，射程 $R = v_0\\cos\\theta \\cdot T = \\dfrac{v_0^2\\sin 2\\theta}{g}$。因為 $\\sin 2\\theta = \\sin(180° - 2\\theta)$，仰角 $\\theta$ 與 $90° - \\theta$ 的射程相同；45° 時射程最大。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：水平拋射",
        problem:
          "從高 45 m 的崖頂，以 20 m/s 的速率水平拋出一顆石頭（$g = 10$ m/s²，忽略空氣阻力）。求飛行時間、水平距離與落地速率。",
        steps: [
          {
            show: "鉛直方向：初速 0、加速度 $g$ 的自由落體：$45 = \\dfrac{1}{2} \\times 10 \\times t^2$",
            why: "水平拋出時，初速度沒有鉛直分量。",
            predict: {
              question: "飛行時間由哪個方向的運動決定？",
              choices: ["水平方向", "鉛直方向", "兩者都無關"],
              answer: 1,
            },
          },
          { show: "$t^2 = 9$，$t = 3$ s" },
          {
            show: "水平方向：等速度運動，$x = 20 \\times 3 = 60$ m",
            why: "水平方向不受力（忽略空氣阻力），速度保持 20 m/s。",
            predict: { choices: ["30 m", "60 m", "90 m"], answer: 1 },
          },
          {
            show: "落地時 $v_y = gt = 30$ m/s，$v = \\sqrt{20^2 + 30^2} = \\sqrt{1300} \\approx 36$ m/s",
            why: "落地速度是水平與鉛直分量的向量和。",
          },
        ],
        takeaway: "拋體運動 = **水平等速度** + **鉛直等加速度**，兩個方向共用同一個時間 $t$。",
      },
      {
        id: "a3",
        kind: "canvas",
        title: "動手畫：斜拋的速度分量",
        task: "畫出一個斜向拋出的物體從地面飛出、再落回地面的軌跡。在起點、最高點與落地點各畫出速度向量，並用虛線畫出它的水平分量與鉛直分量。",
        background: "grid",
        hint: "水平分量在整個過程中都一樣長；鉛直分量向上逐漸變短，到最高點變成 0，之後向下逐漸變長。",
        reference:
          "軌跡是左右對稱的拋物線。水平分量 $v_0\\cos\\theta$ 始終不變；最高點的速度只剩水平分量；落地速度大小與拋出時相同，方向在水平線下方 $\\theta$ 角。",
        aiFeedback: true,
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("k1"), q("k2"), q("k3"), q("k4"), q("k5")],
      },
    ],
  },
  {
    id: n("forces"),
    title: "牛頓定律與力圖分析：斜面與摩擦",
    grade: 11,
    minutes: 14,
    nodeIds: [n("newton")],
    objectives: [
      "能畫出斜面上物體的受力圖並分解重力",
      "能區分靜摩擦力與動摩擦力",
      "能用 $\\Sigma F = ma$ 求出加速度",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：斜面上的受力圖",
        prompt: "木塊靜止在傾角 θ 的斜面上。逐一打開圖層，建立完整的受力圖。",
        viewBox: "0 0 400 300",
        base: incBase,
        layers: [
          {
            id: "g",
            label: "重力 mg",
            load: incGravity,
            color: "#e11d48",
            on: true,
            note: "地球對木塊的吸引力，永遠**鉛直向下**。",
          },
          {
            id: "n",
            label: "正向力 N",
            load: incNormal,
            color: "#2563eb",
            note: "斜面對木塊的支撐力，**垂直於斜面**向外，不是鉛直向上。",
          },
          {
            id: "f",
            label: "靜摩擦力 f",
            load: incFriction,
            color: "#d97706",
            note: "木塊有沿斜面下滑的趨勢，所以靜摩擦力**沿斜面向上**。",
          },
          {
            id: "c",
            label: "重力的分量",
            load: incComponents,
            color: "#059669",
            note: "沿斜面與垂直斜面分解：$mg\\sin\\theta$ 使木塊有下滑趨勢，$mg\\cos\\theta$ 壓向斜面。",
          },
        ],
        check: {
          stem: "木塊靜止在斜面上時，靜摩擦力 $f$ 的大小等於多少？",
          choices: ["$mg\\sin\\theta$", "$mg\\cos\\theta$", "$mg$", "$\\mu mg$"],
          answer: 0,
          explain:
            "沿斜面方向合力為零：$f = mg\\sin\\theta$；垂直斜面方向合力也為零：$N = mg\\cos\\theta$。靜摩擦力不一定等於 $\\mu N$，只有在即將滑動時才達到最大值。",
        },
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：拉力、質量與摩擦",
        prompt:
          "用水平拉力 $F$ 拉動放在水平地面上、原本靜止的物體（$g = 10$ m/s²，假設靜摩擦係數與動摩擦係數相同）。圖形是物體的 v-t 圖。",
        params: [
          { key: "F", label: "水平拉力 F", min: 0, max: 40, step: 1, init: 10, unit: "N" },
          { key: "m", label: "質量 m", min: 1, max: 10, step: 1, init: 2, unit: "kg" },
          { key: "mu", label: "摩擦係數 μ", min: 0, max: 0.6, step: 0.05, init: 0.2 },
        ],
        plot: {
          x: [0, 5],
          y: [0, 40],
          xLabel: "時間 t（s）",
          yLabel: "速度 v（m/s）",
          fns: [{ label: "v = at", f: (t, p) => accel(p.F, p.m, p.mu) * t }],
          points: (p) => [
            { x: 5, y: accel(p.F, p.m, p.mu) * 5, label: `a = ${r2(accel(p.F, p.m, p.mu))} m/s²` },
          ],
        },
        readouts: [
          { label: "最大摩擦力 μmg", value: (p) => `${r2(p.mu * p.m * G)} N` },
          {
            label: "實際摩擦力",
            value: (p) =>
              p.F > p.mu * p.m * G ? `${r2(p.mu * p.m * G)} N（動摩擦）` : `${r2(p.F)} N（靜摩擦）`,
          },
          {
            label: "合力 ΣF",
            value: (p) => `${r2(Math.max(0, p.F - p.mu * p.m * G))} N`,
          },
          { label: "加速度 a = ΣF ÷ m", value: (p) => `${r2(accel(p.F, p.m, p.mu))} m/s²` },
        ],
        goal: {
          text: "在**有摩擦（μ ≥ 0.2）**的情況下，調出加速度恰為 **2 m/s²** 的組合。",
          test: (p) => p.mu >= 0.2 - 1e-9 && Math.abs(accel(p.F, p.m, p.mu) - 2) < 1e-6,
        },
        insight:
          "$a = \\dfrac{F - \\mu mg}{m}$。例如 $m = 2$ kg、$\\mu = 0.2$：摩擦力 4 N，要得到 2 m/s² 需要合力 4 N，所以 $F = 8$ N。拉力小於最大靜摩擦力時，物體根本拉不動！",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：木塊沿粗糙斜面下滑",
        problem:
          "質量 2 kg 的木塊從傾角 37° 的斜面頂端由靜止下滑，動摩擦係數 0.5。求下滑的加速度，以及滑下 4 m 時的速率。（$g = 10$ m/s²，$\\sin 37° \\approx 0.6$，$\\cos 37° \\approx 0.8$）",
        steps: [
          {
            show: "沿斜面向下的重力分量：$mg\\sin 37° = 2 \\times 10 \\times 0.6 = 12$ N",
          },
          {
            show: "正向力：$N = mg\\cos 37° = 2 \\times 10 \\times 0.8 = 16$ N",
            why: "垂直斜面方向沒有加速度，所以正向力與 $mg\\cos\\theta$ 平衡。",
            predict: {
              question: "正向力 N 等於多少？",
              choices: ["20 N", "16 N", "12 N"],
              answer: 1,
            },
          },
          {
            show: "動摩擦力：$f_k = \\mu N = 0.5 \\times 16 = 8$ N，方向沿斜面向上",
          },
          {
            show: "$a = \\dfrac{12 - 8}{2} = 2$ m/s²",
            predict: { choices: ["2 m/s²", "6 m/s²", "10 m/s²"], answer: 0 },
          },
          {
            show: "$v^2 = v_0^2 + 2as = 0 + 2 \\times 2 \\times 4 = 16$，$v = 4$ m/s",
          },
        ],
        takeaway:
          "斜面問題三步驟：**畫受力圖 → 沿斜面與垂直斜面分解 → 各方向列 $\\Sigma F = ma$**。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("n1"), q("n2"), q("n3"), q("n4"), q("n6")],
      },
    ],
  },
  {
    id: n("momentum-energy"),
    title: "動量、碰撞與能量守恆",
    grade: 11,
    minutes: 13,
    nodeIds: [n("momentum"), n("work-energy")],
    objectives: [
      "能用動量守恆分析一維碰撞",
      "能區分彈性碰撞與非彈性碰撞的能量變化",
      "能用衝量與功能定理解題",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：一維碰撞",
        prompt:
          "A 球以速度 $v$ 撞向靜止的 B 球。圖形是兩球的位置－時間圖（$t = 0$ 時碰撞）。$e = 1$ 為彈性碰撞，$e = 0$ 為完全非彈性碰撞（碰後黏在一起）。",
        params: [
          { key: "m1", label: "A 球質量 m₁", min: 1, max: 5, step: 0.5, init: 2, unit: "kg" },
          { key: "m2", label: "B 球質量 m₂", min: 1, max: 5, step: 0.5, init: 1, unit: "kg" },
          { key: "v1", label: "A 球初速 v", min: 1, max: 6, step: 1, init: 4, unit: "m/s" },
          { key: "e", label: "彈性程度 e", min: 0, max: 1, step: 0.25, init: 1 },
        ],
        plot: {
          x: [-3, 3],
          y: [-20, 25],
          xLabel: "時間 t（s）",
          yLabel: "位置 x（m）",
          fns: [
            {
              label: "A 球",
              f: (t, p) => (t < 0 ? p.v1 * t : collide(p.m1, p.m2, p.v1, p.e).a * t),
            },
            {
              label: "B 球",
              f: (t, p) => (t < 0 ? 0 : collide(p.m1, p.m2, p.v1, p.e).b * t),
              color: "#e11d48",
            },
          ],
          points: () => [{ x: 0, y: 0, label: "碰撞", color: "#1e293b" }],
        },
        readouts: [
          {
            label: "碰後 A 球速度",
            value: (p) => `${r2(collide(p.m1, p.m2, p.v1, p.e).a)} m/s`,
          },
          {
            label: "碰後 B 球速度",
            value: (p) => `${r2(collide(p.m1, p.m2, p.v1, p.e).b)} m/s`,
          },
          {
            label: "總動量（碰前 → 碰後）",
            value: (p) => {
              const c = collide(p.m1, p.m2, p.v1, p.e);
              return `${r2(p.m1 * p.v1)} → ${r2(p.m1 * c.a + p.m2 * c.b)} kg·m/s`;
            },
          },
          {
            label: "總動能（碰前 → 碰後）",
            value: (p) => {
              const c = collide(p.m1, p.m2, p.v1, p.e);
              const after = 0.5 * p.m1 * c.a ** 2 + 0.5 * p.m2 * c.b ** 2;
              return `${r2(0.5 * p.m1 * p.v1 ** 2)} → ${r2(after)} J`;
            },
          },
        ],
        goal: {
          text: "讓 A 球在碰撞後**完全停下來**。",
          test: (p) => Math.abs(collide(p.m1, p.m2, p.v1, p.e).a) < 1e-9,
        },
        insight:
          "不論哪一種碰撞，**總動量都守恆**；只有彈性碰撞（$e = 1$）動能守恆。質量相等的彈性碰撞會「交換速度」，A 球停下、B 球以原速度前進——就像牛頓擺。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：子彈射入木塊",
        problem:
          "質量 0.02 kg 的子彈以 300 m/s 水平射入靜止在光滑水平面上、質量 1.98 kg 的木塊，並留在木塊中。求共同速度，以及碰撞中損失的動能。",
        steps: [
          {
            show: "碰前總動量：$0.02 \\times 300 + 1.98 \\times 0 = 6$ kg·m/s",
            why: "水平方向不受外力，系統動量守恆。",
          },
          {
            show: "碰後一起運動：$(0.02 + 1.98)V = 6$，$V = 3$ m/s",
            predict: {
              question: "共同速度是多少？",
              choices: ["3 m/s", "6 m/s", "150 m/s"],
              answer: 0,
            },
          },
          {
            show: "碰前動能：$\\dfrac{1}{2} \\times 0.02 \\times 300^2 = 900$ J；碰後動能：$\\dfrac{1}{2} \\times 2 \\times 3^2 = 9$ J",
          },
          {
            show: "損失的動能 $= 900 - 9 = 891$ J，轉換成熱能、聲能與木塊的形變",
            why: "完全非彈性碰撞動量守恆，但動能損失最多。",
          },
        ],
        takeaway: "碰撞問題先用**動量守恆**；只有確定是彈性碰撞時才能再用動能守恆。",
      },
      {
        id: "a3",
        kind: "scratch",
        title: "刮刮樂：動量與能量",
        cards: [
          { front: "動量的定義與單位？", back: "$\\vec{p} = m\\vec{v}$，單位 kg·m/s，是向量。" },
          {
            front: "衝量與動量的關係？",
            back: "衝量 $\\vec{F}\\Delta t = \\Delta\\vec{p}$（動量的變化）。",
          },
          { front: "動量守恆的條件？", back: "系統所受**外力的合力為零**（或外力可忽略）。" },
          { front: "功能定理？", back: "合力對物體作的功 = 物體動能的變化。" },
          {
            front: "安全氣囊為什麼能保護乘客？",
            back: "動量變化相同時，延長作用時間 $\\Delta t$，可以減小撞擊力 $F$。",
          },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：物理量與 SI 單位",
        pairs: [
          ["動量", "kg·m/s"],
          ["電場", "N/C"],
          ["磁場", "特斯拉（T）"],
          ["頻率", "赫茲（Hz）"],
          ["普朗克常數", "J·s"],
          ["功率", "瓦特（W）"],
        ],
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：空氣軌道上的碰撞",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [
          "physics.senior.q-set-cart-collision-1",
          "physics.senior.q-set-cart-collision-2",
          "physics.senior.q-set-cart-collision-3",
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("mo1"), q("mo2"), q("mo3"), q("mo5"), q("mo8")],
      },
    ],
  },
  {
    id: n("waves"),
    title: "波動：干涉、繞射與都卜勒效應",
    grade: 12,
    minutes: 13,
    nodeIds: [n("wave-props"), n("interference"), n("doppler")],
    objectives: [
      "能說明都卜勒效應並計算觀察到的頻率",
      "能辨認反射、折射、繞射、干涉等波動現象",
      "能用雙狹縫干涉公式計算條紋間距",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：救護車的鳴笛聲",
        prompt:
          "救護車（聲源）以速率 $v_s$ 行駛，鳴笛頻率為 $f$，聲速 340 m/s。比較車前方與車後方的靜止路人聽到的頻率。",
        params: [
          { key: "f0", label: "鳴笛頻率 f", min: 200, max: 1000, step: 50, init: 500, unit: "Hz" },
          { key: "vs", label: "車速 vₛ", min: 0, max: 120, step: 4, init: 20, unit: "m/s" },
        ],
        plot: {
          x: [0, 120],
          y: [0, 2000],
          xLabel: "車速（m/s）",
          yLabel: "聽到的頻率（Hz）",
          fns: [
            { label: "車前方", f: (x, p) => (p.f0 * SOUND) / (SOUND - x), color: "#e11d48" },
            { label: "車後方", f: (x, p) => (p.f0 * SOUND) / (SOUND + x), color: "#2563eb" },
            { label: "原頻率", f: (_x, p) => p.f0, color: "#94a3b8" },
          ],
          points: (p) => [
            { x: p.vs, y: (p.f0 * SOUND) / (SOUND - p.vs), color: "#e11d48" },
            { x: p.vs, y: (p.f0 * SOUND) / (SOUND + p.vs), color: "#2563eb" },
          ],
        },
        readouts: [
          { label: "車前方聽到", value: (p) => `${r2((p.f0 * SOUND) / (SOUND - p.vs))} Hz` },
          { label: "車後方聽到", value: (p) => `${r2((p.f0 * SOUND) / (SOUND + p.vs))} Hz` },
          { label: "車前方的波長", value: (p) => `${r2((SOUND - p.vs) / p.f0)} m` },
          { label: "前方頻率 ÷ 原頻率", value: (p) => r2(SOUND / (SOUND - p.vs)) },
        ],
        goal: {
          text: "調整車速，讓車前方路人聽到的頻率恰為原頻率的 **1.25 倍**。",
          test: (p) => Math.abs(SOUND / (SOUND - p.vs) - 1.25) < 1e-9,
        },
        insight:
          "聲源向前移動時把前方的波前「擠」在一起，波長變短、頻率變高：$f' = f\\dfrac{v}{v - v_s}$。$\\dfrac{340}{340 - v_s} = 1.25$，得 $v_s = 68$ m/s。注意比值只和車速有關，與原頻率無關。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "分類：這是哪一種波動現象？",
        buckets: [
          { id: "refl", label: "反射" },
          { id: "refr", label: "折射" },
          { id: "diff", label: "繞射" },
          { id: "intf", label: "干涉" },
          { id: "dop", label: "都卜勒效應" },
        ],
        items: [
          { id: "w1", label: "山谷中的回聲", bucket: "refl" },
          { id: "w2", label: "利用聲納測量海底深度", bucket: "refl" },
          { id: "w3", label: "插入水中的筷子看起來彎折", bucket: "refr" },
          { id: "w4", label: "海浪接近海岸時，波前逐漸與海岸線平行", bucket: "refr" },
          { id: "w5", label: "站在牆角另一邊也能聽到說話聲", bucket: "diff" },
          { id: "w6", label: "光通過極細的狹縫後在屏幕上散開", bucket: "diff" },
          { id: "w7", label: "肥皂泡表面出現彩色條紋", bucket: "intf" },
          { id: "w8", label: "降噪耳機發出反相聲波抵銷噪音", bucket: "intf" },
          { id: "w9", label: "救護車經過時，鳴笛聲由高變低", bucket: "dop" },
          { id: "w10", label: "交通警察用雷達測速槍測量車速", bucket: "dop" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：雙狹縫干涉",
        problem:
          "波長 600 nm 的光通過間距 0.3 mm 的雙狹縫，屏幕距離狹縫 1.5 m。求相鄰亮紋的間距；若改用 450 nm 的藍光，間距變為多少？",
        steps: [
          {
            show: "公式：$\\Delta y = \\dfrac{L\\lambda}{d}$",
            why: "相鄰亮紋到兩狹縫的波程差相差一個波長。",
          },
          {
            show: "換成公尺：$\\lambda = 6 \\times 10^{-7}$ m，$d = 3 \\times 10^{-4}$ m",
            predict: {
              question: "0.3 mm 等於多少公尺？",
              choices: ["$3 \\times 10^{-3}$ m", "$3 \\times 10^{-4}$ m", "$3 \\times 10^{-5}$ m"],
              answer: 1,
            },
          },
          {
            show: "$\\Delta y = \\dfrac{1.5 \\times 6 \\times 10^{-7}}{3 \\times 10^{-4}} = 3 \\times 10^{-3}$ m = 3 mm",
          },
          {
            show: "改用 450 nm：$\\Delta y$ 與 $\\lambda$ 成正比，$3 \\times \\dfrac{450}{600} = 2.25$ mm",
            predict: { choices: ["變寬", "變窄", "不變"], answer: 1 },
          },
        ],
        takeaway: "波長越長、屏幕越遠、狹縫間距越小，干涉條紋越寬。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w1"), q("w2"), q("w3"), q("w5"), q("w6")],
      },
    ],
  },
  {
    id: n("em-quantum"),
    title: "電磁感應、電磁波與光電效應",
    grade: 10,
    minutes: 15,
    nodeIds: [n("induction"), n("em-wave"), n("photoelectric"), n("duality")],
    objectives: [
      "能用法拉第定律與冷次定律說明電磁感應",
      "知道光是電磁波，並能依頻率排列電磁波譜",
      "能用光子說解釋光電效應並計算光電子最大動能",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "探索：電磁感應實驗",
        prompt: "把磁棒的 N 極插入線圈，檢流計指針偏轉了！點擊每個熱點，了解發生了什麼事。",
        viewBox: "0 0 400 300",
        scene: inductionScene,
        spots: [
          {
            id: "magnet",
            x: 90,
            y: 145,
            title: "磁棒",
            body: "磁棒的 N 極靠近線圈時，通過線圈的**磁通量增加**。磁棒越強，磁通量變化越大。",
          },
          {
            id: "motion",
            x: 100,
            y: 104,
            title: "運動方向",
            body: "磁棒移動得越快，磁通量的**變化率**越大，感應電動勢就越大；磁棒停止不動，感應電流就消失。",
          },
          {
            id: "field",
            x: 182,
            y: 96,
            title: "磁力線",
            body: "磁力線由 N 極出發、進入 S 極。穿過線圈的磁力線數目可以想成**磁通量** $\\Phi_B$。",
          },
          {
            id: "coil",
            x: 250,
            y: 145,
            title: "線圈",
            body: "法拉第定律：$\\varepsilon = -N\\dfrac{\\Delta \\Phi_B}{\\Delta t}$，線圈匝數 $N$ 越多，感應電動勢越大。",
          },
          {
            id: "current",
            x: 200,
            y: 222,
            title: "感應電流的方向",
            body: "冷次定律：感應電流產生的磁場要**反抗**磁通量的變化。N 極插入時，線圈靠近磁棒的一端會變成 N 極，排斥磁棒。",
          },
          {
            id: "galvanometer",
            x: 250,
            y: 255,
            title: "檢流計",
            body: "偵測微小電流。磁棒插入與拔出時，指針偏轉方向相反。發電機就是利用電磁感應把動能轉換成電能。",
          },
        ],
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：光電效應",
        prompt: "選擇金屬，改變光的波長與強度，觀察是否有光電子飛出，以及它們的最大動能。",
        load: photoelectricLab,
        insight:
          "光子能量 $E = hf = \\dfrac{hc}{\\lambda}$，光電子最大動能 $K_{max} = hf - W$。圖中三條直線的**斜率都等於普朗克常數** $h$，與 $f$ 軸的交點就是各金屬的底限頻率。光的波動說無法解釋「紅光再強也打不出電子」，這是光具有粒子性的證據。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：光電效應計算",
        problem:
          "以波長 400 nm 的紫光照射功函數 2.3 eV 的鈉金屬。求光子能量、光電子的最大動能與截止電壓。（$hc \\approx 1240$ eV·nm）",
        steps: [
          {
            show: "光子能量：$E = \\dfrac{hc}{\\lambda} = \\dfrac{1240}{400} = 3.1$ eV",
            predict: {
              question: "光子能量是多少？",
              choices: ["1.6 eV", "3.1 eV", "4.96 eV"],
              answer: 1,
            },
          },
          {
            show: "最大動能：$K_{max} = E - W = 3.1 - 2.3 = 0.8$ eV",
            why: "光子能量先用來克服功函數，剩下的才是電子的動能。",
          },
          {
            show: "截止電壓：$eV_s = K_{max}$，$V_s = 0.8$ V",
            why: "反向電壓要讓動能最大的電子也恰好到不了另一極。",
          },
          {
            show: "延伸：鈉的底限波長 $\\lambda_0 = \\dfrac{1240}{2.3} \\approx 539$ nm，波長比它長的光（例如紅光）無法產生光電效應",
            predict: {
              question: "改用強度加倍的 400 nm 光，最大動能會？",
              choices: ["加倍", "不變", "減半"],
              answer: 1,
            },
          },
        ],
        takeaway: "**頻率決定光電子的最大動能，強度決定光電子的數目。**",
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：和愛因斯坦聊光電效應",
        scenarioId: "physics.senior.s-einstein",
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：光電效應實驗紀錄",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [
          "physics.senior.q-set-photo-data-1",
          "physics.senior.q-set-photo-data-2",
          "physics.senior.q-set-photo-data-3",
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e3"), q("e5"), q("e6"), q("e7")],
      },
    ],
  },
];

export default lessons;
