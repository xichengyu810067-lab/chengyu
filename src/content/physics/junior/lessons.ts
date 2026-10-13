import type { Lesson } from "../../types";

const lensLab = () => import("../labs/ConvexLensLab");
const buoyancyLab = () => import("../labs/BuoyancyLab");
const leverLab = () => import("../labs/LeverLab");
const ohmLab = () => import("../labs/OhmLab");
const circuitScene = () => import("../scenes/CircuitScene");
const boxBase = () => import("../scenes/pushBoxLayers").then((m) => ({ default: m.Base }));
const boxGravity = () => import("../scenes/pushBoxLayers").then((m) => ({ default: m.Gravity }));
const boxNormal = () => import("../scenes/pushBoxLayers").then((m) => ({ default: m.Normal }));
const boxPush = () => import("../scenes/pushBoxLayers").then((m) => ({ default: m.Push }));
const boxFriction = () => import("../scenes/pushBoxLayers").then((m) => ({ default: m.Friction }));

const q = (s: string) => `physics.junior.q-${s}`;
const n = (s: string) => `physics.junior.${s}`;
/** 四捨五入到小數第 2 位並轉成字串 */
const r2 = (x: number) => (Number.isFinite(x) ? String(Math.round(x * 100) / 100) : "—");

const SOUND = 340; // 空氣中聲速（m/s）

const lessons: Lesson[] = [
  {
    id: n("wave-light"),
    title: "波動、聲音與光：透鏡成像",
    grade: 8,
    minutes: 15,
    nodeIds: [n("wave-basic"), n("sound"), n("reflection"), n("lens")],
    objectives: [
      "能說出波速、頻率與波長的關係 $v = f\\lambda$",
      "知道響度、音調由振幅、頻率決定",
      "能依物距判斷凸透鏡成像的性質，並畫出成像光路圖",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：頻率與波長",
        prompt: "聲音在空氣中的速率約為 340 m/s。改變頻率 $f$ 與振幅 $A$，觀察某一瞬間的波形。",
        params: [
          { key: "f", label: "頻率 f", min: 100, max: 1000, step: 20, init: 340, unit: "Hz" },
          { key: "A", label: "振幅 A", min: 0.5, max: 2, step: 0.5, init: 1 },
        ],
        plot: {
          x: [0, 3],
          y: [-2.5, 2.5],
          xLabel: "位置（m）",
          yLabel: "振動位移",
          fns: [
            {
              label: "某一瞬間的波形",
              f: (x, p) => p.A * Math.sin((2 * Math.PI * x * p.f) / SOUND),
            },
          ],
          vlines: (p) => [{ x: SOUND / p.f, label: "一個波長", color: "#e11d48" }],
          points: (p) => [{ x: SOUND / p.f / 4, y: p.A, label: "波峰" }],
        },
        readouts: [
          { label: "波長 λ = v ÷ f", value: (p) => `${r2(SOUND / p.f)} m` },
          { label: "週期 T = 1 ÷ f", value: (p) => `${r2(1000 / p.f)} ms` },
          { label: "音調", value: (p) => (p.f >= 600 ? "較高" : p.f <= 250 ? "較低" : "中等") },
          { label: "響度", value: (p) => (p.A >= 1.5 ? "較大聲" : p.A <= 0.5 ? "較小聲" : "中等") },
        ],
        goal: {
          text: "調出波長恰為 **0.5 m** 的聲波。頻率要是多少？",
          test: (p) => Math.abs(SOUND / p.f - 0.5) < 1e-9,
        },
        insight:
          "$v = f\\lambda$：波速由介質決定，所以頻率加倍、波長就減半，$340 \\div 0.5 = 680$ Hz。頻率決定**音調**，振幅決定**響度**。",
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：光的反射與折射",
        prompt: "先想一想，再刮開確認。",
        cards: [
          {
            front: "光的反射定律是什麼？",
            back: "**入射角 = 反射角**，且入射線、反射線與法線在同一平面上。",
          },
          {
            front: "平面鏡成像有什麼特性？",
            back: "正立、等大、左右相反的**虛像**；像到鏡面的距離 = 物體到鏡面的距離。",
          },
          {
            front: "光從空氣斜射入水中，會怎樣偏折？",
            back: "光在水中速率變慢，折射光**偏向法線**（折射角 < 入射角）。",
          },
          {
            front: "凸透鏡與凹透鏡對光線的作用？",
            back: "凸透鏡**會聚**光線（老花眼鏡、放大鏡）；凹透鏡**發散**光線（近視眼鏡）。",
          },
          {
            front: "什麼是凸透鏡的焦點？",
            back: "平行主軸的光線經凸透鏡折射後，會聚於主軸上的一點，這點就是焦點 F。",
          },
        ],
      },
      {
        id: "a3",
        kind: "lab",
        title: "實驗：凸透鏡成像",
        prompt: "拖動物距與焦距，觀察兩條特殊光線如何決定像的位置、大小與正倒。",
        load: lensLab,
        insight:
          "成像公式 $\\dfrac{1}{p} + \\dfrac{1}{q} = \\dfrac{1}{f}$。物體越靠近焦點，實像越大、越遠；物體在焦點以內時，折射光發散，眼睛看到的是延長線交會形成的**虛像**。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：凸透鏡成像光路圖",
        task: "畫出主軸與凸透鏡，標出兩側的 F 與 2F。把物體放在 F 與 2F 之間，至少畫出兩條特殊光線，找出像的位置。",
        background: "grid",
        hint: "特殊光線：① 平行主軸 → 折射後通過另一側焦點；② 通過透鏡中心 → 直線前進；③ 通過焦點 → 折射後平行主軸。",
        reference:
          "兩條光線在另一側 2F 以外交會，成**倒立、放大的實像**。例如物距 $p = 1.5f$ 時，像距 $q = 3f$，像是物體的 2 倍大。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w2"), q("w3"), q("w5"), q("w6")],
      },
    ],
  },
  {
    id: n("heat"),
    title: "溫度與熱：比熱與熱的傳播",
    grade: 8,
    minutes: 12,
    nodeIds: [n("specific-heat"), n("heat-transfer")],
    objectives: [
      "能用 $H = ms\\Delta T$ 計算熱量",
      "能解釋水的比熱大所造成的現象",
      "能分辨傳導、對流與輻射",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：熱的傳播",
        root: {
          id: "ht",
          title: "熱的傳播方式",
          children: [
            {
              id: "ht-cond",
              title: "傳導",
              summary: "熱經由物質內粒子的碰撞，由高溫處傳到低溫處；主要發生在固體。",
              keyPoints: ["金屬是熱的良導體", "木頭、塑膠、空氣是熱的不良導體"],
            },
            {
              id: "ht-conv",
              title: "對流",
              summary: "液體或氣體受熱膨脹、密度變小而上升，冷的部分下降，形成循環。",
              keyPoints: ["暖氣放低處、冷氣裝高處"],
            },
            {
              id: "ht-rad",
              title: "輻射",
              summary: "熱以電磁波的形式直接傳播，**不需要介質**，在真空中也能傳播。",
              keyPoints: ["黑色、粗糙表面吸收與放出輻射的能力較強"],
            },
            {
              id: "ht-app",
              title: "生活應用：保溫瓶",
              summary: "雙層玻璃間抽成真空，阻隔傳導與對流；鍍銀的內壁反射熱輻射。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：加熱一杯水",
        prompt:
          "水的初溫 20°C。改變水的質量與供給的熱量，看看溫度上升多少；橘線是**相同質量的鋁**吸收同樣熱量時的溫度。",
        params: [
          { key: "m", label: "水的質量 m", min: 100, max: 500, step: 50, init: 100, unit: "g" },
          { key: "Q", label: "供給熱量 H", min: 0, max: 12000, step: 500, init: 2000, unit: "cal" },
        ],
        plot: {
          x: [0, 12000],
          y: [0, 110],
          xLabel: "供給熱量（cal）",
          yLabel: "溫度（°C）",
          fns: [
            {
              label: "水（比熱 1 cal/g·°C）",
              f: (x, p) => (20 + x / p.m <= 100 ? 20 + x / p.m : Number.NaN),
            },
            {
              label: "同質量的鋁（比熱約 0.21 cal/g·°C）",
              f: (x, p) => 20 + x / (0.21 * p.m),
              color: "#d97706",
            },
          ],
          points: (p) => [
            {
              x: p.Q,
              y: Math.min(100, 20 + p.Q / p.m),
              label: 20 + p.Q / p.m > 100 ? "已達沸點" : `${r2(20 + p.Q / p.m)}°C`,
            },
          ],
        },
        readouts: [
          { label: "溫度變化 ΔT = H ÷ (m × s)", value: (p) => `${r2(p.Q / p.m)}°C` },
          {
            label: "水的末溫",
            value: (p) =>
              20 + p.Q / p.m > 100 ? "超過 100°C（水會沸騰）" : `${r2(20 + p.Q / p.m)}°C`,
          },
        ],
        goal: {
          text: "把水從 20°C 加熱到**恰好 50°C**。",
          test: (p) => Math.abs(20 + p.Q / p.m - 50) < 1e-9,
        },
        insight:
          "$H = ms\\Delta T$：要升高 30°C，100 g 的水需 3000 cal、200 g 需 6000 cal——質量加倍，所需熱量也加倍。水的比熱大，吸收同樣熱量時，同質量的鋁升溫約是水的 5 倍。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分類：熱是怎麼傳過去的？",
        prompt: "把每個生活現象拖到對應的熱傳播方式。",
        buckets: [
          { id: "cond", label: "傳導" },
          { id: "conv", label: "對流" },
          { id: "rad", label: "輻射" },
        ],
        items: [
          { id: "h1", label: "鐵湯匙放進熱湯裡，握柄也變燙", bucket: "cond" },
          { id: "h2", label: "冬天摸金屬欄杆比摸木頭覺得冷", bucket: "cond" },
          { id: "h3", label: "冷氣機通常裝在牆壁高處", bucket: "conv" },
          { id: "h4", label: "燒開水時，水由下往上翻滾", bucket: "conv" },
          { id: "h5", label: "太陽的熱穿過太空傳到地球", bucket: "rad" },
          { id: "h6", label: "站在營火旁，臉感到溫暖", bucket: "rad" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：冷熱水混合",
        problem:
          "將 100 g、80°C 的熱水與 300 g、20°C 的冷水混合，若沒有熱量散失，混合後的溫度是多少？",
        steps: [
          {
            show: "熱平衡原則：**熱水放出的熱量 = 冷水吸收的熱量**",
            why: "熱由高溫傳到低溫，直到兩者溫度相同。",
            predict: {
              question: "混合後的溫度會落在哪個範圍？",
              choices: ["低於 20°C", "介於 20°C 與 80°C 之間", "高於 80°C"],
              answer: 1,
            },
          },
          {
            show: "設末溫為 $T$：$100 \\times 1 \\times (80 - T) = 300 \\times 1 \\times (T - 20)$",
            why: "$H = ms\\Delta T$，水的比熱 $s = 1$ cal/(g·°C)。",
          },
          { show: "$8000 - 100T = 300T - 6000$" },
          {
            show: "$400T = 14000$，$T = 35$（°C）",
            predict: { choices: ["35°C", "50°C", "65°C"], answer: 0 },
          },
          {
            show: "驗算：熱水放出 $100 \\times 45 = 4500$ cal，冷水吸收 $300 \\times 15 = 4500$ cal ✓",
          },
        ],
        takeaway: "冷水的質量較大，所以末溫比較靠近冷水的溫度。",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("h1"), q("h2"), q("h3"), q("h4")],
      },
    ],
  },
  {
    id: n("pressure-buoyancy"),
    title: "壓力與浮力：浮沉的祕密",
    grade: 8,
    minutes: 14,
    nodeIds: [n("density"), n("pressure"), n("buoyancy")],
    objectives: [
      "能比較物體與液體的密度，判斷浮沉",
      "理解阿基米德原理：浮力 = 排開液體的重量",
      "能計算液體壓力與浮力",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：浮還是沉？",
        prompt: "調整物體與液體的密度，觀察物體在液體中的位置，以及重量與浮力長條的高低。",
        load: buoyancyLab,
        insight:
          "**物體密度 < 液體密度 → 漂浮**，沒入的體積比例 = $\\dfrac{\\text{物體密度}}{\\text{液體密度}}$；**相等 → 懸浮**；**大於 → 沉底**，此時浮力 = 排開液體的重量，視重 = 重量 − 浮力。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：木塊浮在水面",
        problem:
          "一塊體積 200 cm³、質量 150 g 的木塊放入水中，靜止時浮在水面上。求木塊所受浮力，以及沒入水中的體積。（水的密度 1 g/cm³）",
        steps: [
          {
            show: "木塊重量 = 150 gw",
            why: "質量 150 g 的物體，重量為 150 公克重。",
          },
          {
            show: "漂浮靜止 → **浮力 = 重量 = 150 gw**",
            why: "靜止時合力為零，向上的浮力和向下的重力大小相等。",
            predict: {
              question: "木塊所受浮力是多少？",
              choices: ["150 gw", "200 gw", "50 gw"],
              answer: 0,
            },
          },
          {
            show: "浮力 = 排開水的重量：設排開水的體積為 $V$，$150 = V \\times 1$，所以 $V = 150$ cm³",
            why: "阿基米德原理：浮力 = 排開液體體積 × 液體密度。",
          },
          {
            show: "露出水面的體積 $= 200 - 150 = 50$ cm³，即 $\\dfrac{1}{4}$ 露出水面",
          },
        ],
        takeaway: "漂浮時先用「浮力 = 重量」，再用「浮力 = 排開液體重」求沒入體積。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排序：驗證阿基米德原理",
        prompt: "用彈簧秤與溢水杯驗證阿基米德原理，請把實驗步驟依正確順序排好。",
        items: [
          { id: "s1", label: "用彈簧秤測出物體在空氣中的重量 $W_1$" },
          { id: "s2", label: "將溢水杯裝水至恰好從溢水口流出，並在溢水口下放一個已秤重的空燒杯" },
          { id: "s3", label: "把物體完全浸入水中，讀出彈簧秤讀數 $W_2$" },
          { id: "s4", label: "秤出燒杯與溢出水的總重，算出溢出水的重量" },
          { id: "s5", label: "比較浮力 $W_1 - W_2$ 與溢出水重，發現兩者相等" },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：物理量與單位",
        pairs: [
          ["力", "牛頓（N）"],
          ["壓力", "帕（Pa）"],
          ["密度", "g/cm³"],
          ["功", "焦耳（J）"],
          ["功率", "瓦特（W）"],
          ["電流", "安培（A）"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p3"), q("p4"), q("p6")],
      },
    ],
  },
  {
    id: n("motion-newton"),
    title: "直線運動與牛頓運動定律",
    grade: 9,
    minutes: 15,
    nodeIds: [n("kinematics"), n("motion-graphs"), n("newton"), n("friction")],
    objectives: [
      "能從 v-t 圖讀出加速度與位移",
      "能畫出物體的受力圖並判斷合力",
      "能用牛頓三大運動定律解釋生活現象",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：v-t 圖下的面積",
        prompt:
          "設定初速度 $v_0$、加速度 $a$ 與時間 $t$，觀察 v-t 圖。圖形與時間軸所圍的面積就是位移。",
        params: [
          { key: "v0", label: "初速度 v₀", min: 0, max: 20, step: 1, init: 4, unit: "m/s" },
          { key: "a", label: "加速度 a", min: -4, max: 4, step: 0.5, init: 1, unit: "m/s²" },
          { key: "T", label: "經過時間 t", min: 1, max: 10, step: 1, init: 4, unit: "s" },
        ],
        plot: {
          x: [0, 10],
          y: [-10, 30],
          xLabel: "時間 t（s）",
          yLabel: "速度 v（m/s）",
          fns: [{ label: "v = v₀ + at", f: (t, p) => (t <= p.T ? p.v0 + p.a * t : Number.NaN) }],
          vlines: (p) => [{ x: p.T, label: `t = ${p.T} s`, color: "#94a3b8" }],
          points: (p) => [
            { x: p.T, y: p.v0 + p.a * p.T, label: `v = ${r2(p.v0 + p.a * p.T)} m/s` },
          ],
        },
        readouts: [
          { label: "末速度 v = v₀ + at", value: (p) => `${r2(p.v0 + p.a * p.T)} m/s` },
          {
            label: "位移（面積）",
            value: (p) => `${r2(p.v0 * p.T + 0.5 * p.a * p.T * p.T)} m`,
          },
          { label: "平均速度", value: (p) => `${r2(p.v0 + 0.5 * p.a * p.T)} m/s` },
          {
            label: "運動狀態",
            value: (p) => {
              if (p.a > 0) return "加速";
              if (p.a === 0) return p.v0 === 0 ? "靜止" : "等速度";
              if (p.v0 + p.a * p.T >= 0) return "減速";
              return p.v0 > 0 ? "先減速，再反向加速" : "反向加速";
            },
          },
        ],
        goal: {
          text: "調出一個**加速**運動（$a > 0$），使它在 **5 秒內的位移恰為 50 m**。",
          test: (p) => p.T === 5 && p.a > 0 && Math.abs(p.v0 * 5 + 12.5 * p.a - 50) < 1e-9,
        },
        insight:
          "v-t 圖下的梯形面積 $= \\dfrac{(v_0 + v) \\times t}{2}$。例如 $v_0 = 5$、$a = 2$：末速 15 m/s，面積 $= \\dfrac{(5 + 15) \\times 5}{2} = 50$ m。",
      },
      {
        id: "a2",
        kind: "layers",
        title: "圖層疊加：推箱子的受力圖",
        prompt: "一個人用水平力推箱子，使箱子在水平地面上前進。逐一打開圖層，看看箱子受到哪些力。",
        viewBox: "0 0 400 300",
        base: boxBase,
        layers: [
          {
            id: "g",
            label: "重力 W",
            load: boxGravity,
            color: "#e11d48",
            on: true,
            note: "地球對箱子的吸引力，方向**鉛直向下**。",
          },
          {
            id: "n",
            label: "正向力 N",
            load: boxNormal,
            color: "#2563eb",
            note: "地面垂直於接觸面支撐箱子；在水平地面上，N 與 W 大小相等、方向相反。",
          },
          {
            id: "f",
            label: "推力 F",
            load: boxPush,
            color: "#059669",
            note: "人對箱子施的水平力，方向朝運動方向。",
          },
          {
            id: "fr",
            label: "摩擦力 f",
            load: boxFriction,
            color: "#d97706",
            note: "地面對箱子的動摩擦力，方向與運動方向**相反**。",
          },
        ],
        check: {
          stem: "如果箱子被推著在水平地面上**等速度**前進，推力 F 與摩擦力 f 的關係為何？",
          choices: ["F > f", "F = f", "F < f"],
          answer: 1,
          explain:
            "等速度運動表示加速度為零，所以合力為零（第一定律），推力與摩擦力大小相等、方向相反。",
        },
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分類：這是哪一條定律？",
        prompt: "把每個現象拖到最能解釋它的牛頓運動定律。",
        buckets: [
          { id: "n1", label: "第一定律（慣性）" },
          { id: "n2", label: "第二定律（F = ma）" },
          { id: "n3", label: "第三定律（作用與反作用）" },
        ],
        items: [
          { id: "e1", label: "公車突然啟動，站著的乘客向後倒", bucket: "n1" },
          { id: "e2", label: "用力拍打棉被，灰塵就掉下來", bucket: "n1" },
          { id: "e3", label: "同樣的推力，推空購物車比推滿載的購物車加速得快", bucket: "n2" },
          { id: "e4", label: "踢球時用力越大，球的速度改變越大", bucket: "n2" },
          { id: "e5", label: "划船時槳向後推水，船向前進", bucket: "n3" },
          { id: "e6", label: "火箭向下噴出氣體而向上升空", bucket: "n3" },
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：和伽利略討論落體運動",
        scenarioId: "physics.junior.s-galileo",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m4"), q("m5"), q("m6")],
      },
    ],
  },
  {
    id: n("work-energy"),
    title: "功、能量與簡單機械",
    grade: 9,
    minutes: 14,
    nodeIds: [
      n("work-power"),
      n("mechanical-energy"),
      n("torque"),
      n("machines"),
      n("energy-forms"),
    ],
    objectives: [
      "能計算功、功率、動能與位能",
      "能用力學能守恆求物體的速率",
      "能用力矩說明槓桿平衡，並知道機械不能省功",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：讓槓桿平衡",
        prompt: "左側在 20 cm 處掛了 60 gw 的砝碼。調整右側砝碼與力臂，讓槓桿恢復水平。",
        load: leverLab,
        insight:
          "槓桿平衡條件：$W_1 \\times d_1 = W_2 \\times d_2$。$60 \\times 20 = 1200$，所以 30 gw × 40 cm、40 gw × 30 cm、60 gw × 20 cm、80 gw × 15 cm 都能平衡。力臂越長越省力，但施力移動的距離也越長——**機械不能省功**。",
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：功與能的公式",
        cards: [
          { front: "功 $W$ = ?", back: "$W = F \\times S$（力 × 沿力方向的位移），單位焦耳 J" },
          { front: "功率 $P$ = ?", back: "$P = \\dfrac{W}{t}$，單位瓦特 W（1 W = 1 J/s）" },
          { front: "動能 $E_k$ = ?", back: "$E_k = \\dfrac{1}{2}mv^2$，速率加倍，動能變 4 倍" },
          { front: "重力位能 $U$ = ?", back: "$U = mgh$（以地面為零位面）" },
          {
            front: "什麼時候力學能守恆？",
            back: "只有重力（或彈力）作功、沒有摩擦與空氣阻力時，**動能 + 位能 = 定值**。",
          },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：力學能守恆",
        problem:
          "質量 2 kg 的小球從離地 5 m 高處由靜止落下，不計空氣阻力（$g = 10$ m/s²）。小球落到離地 1.8 m 時的速率是多少？",
        steps: [
          {
            show: "起點：$U = mgh = 2 \\times 10 \\times 5 = 100$ J，$E_k = 0$，力學能 = 100 J",
            why: "由靜止落下，初速為 0。",
          },
          {
            show: "離地 1.8 m 時：$U' = 2 \\times 10 \\times 1.8 = 36$ J",
          },
          {
            show: "力學能守恆：$E_k' = 100 - 36 = 64$ J",
            why: "減少的位能全部轉換成動能。",
            predict: {
              question: "此時的動能是多少？",
              choices: ["36 J", "64 J", "100 J"],
              answer: 1,
            },
          },
          {
            show: "$\\dfrac{1}{2} \\times 2 \\times v^2 = 64$，$v^2 = 64$，$v = 8$ m/s",
            predict: { choices: ["4 m/s", "8 m/s", "64 m/s"], answer: 1 },
          },
        ],
        takeaway: "力學能守恆：**初動能 + 初位能 = 末動能 + 末位能**，不必知道過程中的細節。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "配對：裝置中的能量轉換",
        prompt: "把右邊的能量轉換，拖到對應的裝置旁。",
        pairs: [
          { id: "m1", left: "電風扇", right: "電能 → 動能" },
          { id: "m2", left: "太陽能板", right: "光能 → 電能" },
          { id: "m3", left: "乾電池放電", right: "化學能 → 電能" },
          { id: "m4", left: "水力發電", right: "位能 → 動能 → 電能" },
          { id: "m5", left: "電熱水壺", right: "電能 → 熱能" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e3"), q("e4"), q("e5"), q("e8")],
      },
    ],
  },
  {
    id: n("electricity"),
    title: "電路、歐姆定律與電磁現象",
    grade: 9,
    minutes: 15,
    nodeIds: [
      n("circuit"),
      n("series-parallel"),
      n("electric-power"),
      n("current-magnetic"),
      n("motor"),
      n("induction"),
    ],
    objectives: [
      "認識電路元件，知道安培計串聯、伏特計並聯",
      "能用歐姆定律計算串聯與並聯電路",
      "能計算電功率與用電度數，並說出電磁現象的應用",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "認識電路圖",
        prompt: "點擊每個閃爍的熱點，認識電路中的元件與電表接法。",
        viewBox: "0 0 400 300",
        scene: circuitScene,
        spots: [
          {
            id: "battery",
            x: 60,
            y: 148,
            title: "電池（電源）",
            body: "提供電壓，推動電流。電路符號中**長線是正極、短線是負極**；電流由正極流出，經外電路流回負極。",
          },
          {
            id: "switch",
            x: 150,
            y: 66,
            title: "開關",
            body: "開關閉合時形成**通路**，電流才能流動；打開時成為**斷路**。",
          },
          {
            id: "ammeter",
            x: 230,
            y: 70,
            title: "安培計",
            body: "測量電流，必須與待測元件**串聯**。安培計的內電阻很小，不可直接接在電池兩端。",
          },
          {
            id: "bulb",
            x: 340,
            y: 150,
            title: "燈泡",
            body: "電流通過燈絲時，把電能轉換成光能與熱能。",
          },
          {
            id: "voltmeter",
            x: 380,
            y: 150,
            title: "伏特計",
            body: "測量電壓（電位差），必須與待測元件**並聯**。伏特計的內電阻很大。",
          },
          {
            id: "resistor",
            x: 200,
            y: 230,
            title: "電阻器",
            body: "阻礙電流的元件。電阻 $R = \\dfrac{V}{I}$，單位歐姆（Ω）。",
          },
        ],
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：歐姆定律與燈泡亮度",
        prompt:
          "調整電池電壓與燈泡電阻，切換一個燈泡、兩燈串聯、兩燈並聯，觀察安培計讀數與燈泡亮度。",
        load: ohmLab,
        insight:
          "歐姆定律 $I = \\dfrac{V}{R}$。串聯時總電阻變大、電流變小，每個燈泡只分到一半電壓，所以變暗；並聯時每個燈泡兩端都是電池電壓，亮度不變，但總電流加倍。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：串並聯電路",
        problem:
          "6 Ω 與 3 Ω 的電阻並聯後，再與 2 Ω 的電阻串聯，接在 12 V 的電池上。求電路總電流，以及通過 6 Ω 電阻的電流。",
        steps: [
          {
            show: "並聯部分的等效電阻 $R_p$：$\\dfrac{1}{R_p} = \\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{2}$，$R_p = 2$ Ω",
            why: "並聯後的等效電阻比任何一個分支都小。",
            predict: {
              question: "6 Ω 與 3 Ω 並聯的等效電阻是？",
              choices: ["9 Ω", "2 Ω", "4.5 Ω"],
              answer: 1,
            },
          },
          { show: "總電阻：$R = 2 + 2 = 4$ Ω", why: "串聯電阻直接相加。" },
          {
            show: "總電流：$I = \\dfrac{12}{4} = 3$ A",
            predict: { choices: ["1 A", "3 A", "6 A"], answer: 1 },
          },
          {
            show: "2 Ω 兩端電壓 $= 3 \\times 2 = 6$ V，所以並聯部分電壓 $= 12 - 6 = 6$ V",
            why: "串聯時各段電壓相加等於電池電壓。",
          },
          {
            show: "通過 6 Ω 的電流 $= \\dfrac{6}{6} = 1$ A（通過 3 Ω 的是 2 A，合計 3 A ✓）",
          },
        ],
        takeaway: "先把並聯部分化成等效電阻，再用 $I = \\dfrac{V}{R}$ 一層一層算回去。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "配對：電磁裝置的原理",
        prompt: "把右邊的原理拖到對應的裝置旁。",
        pairs: [
          { id: "d1", left: "電磁鐵", right: "電流的磁效應" },
          { id: "d2", left: "電動機（馬達）", right: "載流導線在磁場中受力" },
          { id: "d3", left: "發電機", right: "電磁感應" },
          { id: "d4", left: "指南針", right: "地球磁場" },
        ],
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：電器行裡的電費學問",
        scenarioId: "physics.junior.s-electric-bill",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c5"), q("c7"), q("c8")],
      },
    ],
  },
];

export default lessons;
