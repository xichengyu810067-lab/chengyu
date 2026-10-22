import type { Lesson } from "../../types";

const epicenterLab = () => import("../labs/EpicenterLab");
const crossSection = () => import("../scenes/PlateCrossSectionScene");
const typhoonScene = () => import("../scenes/TyphoonScene");
const atmBase = () => import("../scenes/atmosphereLayers").then((m) => ({ default: m.Base }));
const atmTemp = () =>
  import("../scenes/atmosphereLayers").then((m) => ({ default: m.Temperature }));
const atmOzone = () => import("../scenes/atmosphereLayers").then((m) => ({ default: m.Ozone }));
const atmWeather = () => import("../scenes/atmosphereLayers").then((m) => ({ default: m.Weather }));
const atmUpper = () => import("../scenes/atmosphereLayers").then((m) => ({ default: m.Upper }));

const q = (s: string) => `earth.senior.q-${s}`;
const n = (s: string) => `earth.senior.${s}`;

/* 恆星顏色：普朗克黑體輻射（以峰值歸一化）與維恩定律 */
const WIEN = 2.898e6; // nm·K
const C2 = 1.4388e7; // nm·K
const planck = (lam: number, T: number) => lam ** -5 / Math.expm1(C2 / (lam * T));
const peak = (T: number) => WIEN / T;
const relIntensity = (lam: number, T: number) =>
  lam > 0 && T > 0 ? planck(lam, T) / planck(peak(T), T) : Number.NaN;
function starClass(T: number): string {
  if (T >= 30000) return "O 型：藍色";
  if (T >= 10000) return "B 型：藍白色（如參宿七）";
  if (T >= 7500) return "A 型：白色（如天狼星）";
  if (T >= 6000) return "F 型：黃白色（如南河三）";
  if (T >= 5200) return "G 型：黃色（如太陽）";
  if (T >= 3700) return "K 型：橙色（如大角星）";
  return "M 型：紅色（如參宿四）";
}

/* 放射性定年：碳 14 */
const HALF = 5730;
const remain = (t: number) => 100 * 0.5 ** (t / HALF);

/* 聖嬰示意模型：信風強度 → 赤道太平洋表層海溫 */
const eastAnom = (w: number) => 3.5 * (1 - w);
const westAnom = (w: number) => -0.8 * (1 - w);
function sst(lon: number, w: number): number {
  const s0 = Math.max(0, Math.min(1, (lon - 160) / 110));
  const s = s0 * s0 * (3 - 2 * s0);
  return (29.5 + westAnom(w)) * (1 - s) + (24 + eastAnom(w)) * s;
}
function ensoState(w: number): string {
  const a = eastAnom(w);
  if (a >= 0.5) return "聖嬰";
  if (a <= -0.5) return "反聖嬰";
  return "正常（中性）";
}

/* 溫室效應：平衡增溫 ΔT = S × log₂(C / 280) */
const warming = (c: number, s: number) => (c > 0 ? s * Math.log2(c / 280) : Number.NaN);
const fmtSigned = (v: number, d = 1) => `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(d)}`;

const lessons: Lesson[] = [
  {
    id: "earth.senior.universe",
    title: "從地球看宇宙：尺度、恆星與星系",
    grade: 10,
    minutes: 12,
    nodeIds: [n("scale"), n("stars"), n("galaxies"), n("sun")],
    objectives: [
      "以天文單位、光年描述宇宙的階層與尺度",
      "由恆星的顏色推論表面溫度（維恩定律）",
      "說明紅移與宇宙膨脹的關係",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "宇宙的階層",
        root: {
          id: "cosmos",
          title: "可觀測宇宙（約 138 億歲）",
          summary: "宇宙有階層結構：一層一層點開，看看我們在宇宙中的位置。",
          children: [
            {
              id: "cosmos-cluster",
              title: "超星系團",
              summary: "許多星系群與星系團聚在一起，構成宇宙大尺度的網狀結構。",
              children: [
                {
                  id: "cosmos-local",
                  title: "本星系群",
                  summary: "銀河系、仙女座星系等數十個星系組成，範圍約一千萬光年。",
                  children: [
                    {
                      id: "cosmos-mw",
                      title: "銀河系",
                      summary:
                        "棒旋星系，直徑約 10 萬光年，有數千億顆恆星；太陽在旋臂上，距中心約 2.6 萬光年。",
                      children: [
                        {
                          id: "cosmos-ss",
                          title: "太陽系",
                          summary: "太陽與八大行星、矮行星、小行星、彗星等；海王星距太陽約 30 AU。",
                          children: [
                            {
                              id: "cosmos-em",
                              title: "地月系",
                              summary: "月球距地球約 38 萬公里，光只要約 1.3 秒。",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "排一排：由小到大",
        prompt: "依照**實際大小（直徑或範圍）**由小到大排列。",
        items: [
          { id: "moon", label: "月球" },
          { id: "earth", label: "地球" },
          { id: "sun", label: "太陽" },
          { id: "ss", label: "太陽系（到海王星軌道）" },
          { id: "mw", label: "銀河系" },
          { id: "lg", label: "本星系群" },
        ],
      },
      {
        id: "a3",
        kind: "slider",
        title: "拉桿：恆星的顏色與溫度",
        prompt:
          "恆星近似黑體，溫度決定它在哪個波長最亮。調整表面溫度，觀察輻射曲線的峰值如何移動。兩條虛線之間是可見光（約 400～700 nm）。",
        params: [
          { key: "T", label: "表面溫度", min: 2500, max: 30000, step: 100, init: 3000, unit: "K" },
        ],
        plot: {
          x: [50, 2000],
          y: [0, 1.1],
          xLabel: "波長（nm）",
          yLabel: "相對輻射強度",
          fns: [{ label: "黑體輻射曲線", color: "#dc2626", f: (x, p) => relIntensity(x, p.T) }],
          points: (p) => [{ x: peak(p.T), y: 1, label: `${Math.round(peak(p.T))} nm` }],
          vlines: () => [
            { x: 400, color: "#7c3aed" },
            { x: 700, color: "#dc2626" },
          ],
        },
        readouts: [
          { label: "峰值波長", value: (p) => `${Math.round(peak(p.T))} nm` },
          { label: "光譜型與顏色", value: (p) => starClass(p.T) },
        ],
        goal: {
          text: "調出和太陽差不多的恆星：峰值波長約 **500 nm**（誤差 15 nm 內）。",
          test: (p) => Math.abs(peak(p.T) - 500) <= 15,
        },
        insight:
          "維恩定律：$\\lambda_{max} = \\frac{2.898 \\times 10^{6}\\ \\text{nm·K}}{T}$。太陽表面約 5800 K，峰值在綠光附近，但混合各色光看起來偏白黃。溫度越高，峰值越往短波（藍）移動。",
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：看見過去的光",
        problem:
          "仙女座星系距離我們約 250 萬光年。(1) 1 光年約是多少公里？(2) 我們今晚看到的仙女座星系，是它什麼時候的樣子？",
        steps: [
          {
            show: "一年的秒數：$365.25 \\times 24 \\times 60 \\times 60 \\approx 3.16 \\times 10^7$ 秒。",
          },
          {
            show: "1 光年 $= 3 \\times 10^5\\ \\text{km/s} \\times 3.16 \\times 10^7\\ \\text{s} \\approx 9.5 \\times 10^{12}$ 公里。",
            why: "距離 = 速率 × 時間。",
            predict: {
              question: "1 光年大約是多少公里？",
              choices: [
                "$9.5 \\times 10^{12}$ 公里",
                "$3 \\times 10^5$ 公里",
                "$1.5 \\times 10^8$ 公里",
              ],
              answer: 0,
            },
          },
          {
            show: "光從仙女座星系出發，要走 250 萬年才到地球。",
            predict: {
              question: "我們看到的是仙女座星系多久以前的樣子？",
              choices: ["約 250 萬年前", "現在的樣子", "約 250 年前"],
              answer: 0,
            },
          },
          {
            show: "所以**望向越遠的天體，就是看見越久以前的宇宙**。",
            why: "天文學家因此能藉由觀測極遠的星系，研究早期宇宙。",
          },
        ],
        takeaway: "光年是距離單位：距離 $n$ 光年的天體，我們看到的是它 $n$ 年前發出的光。",
      },
      {
        id: "a5",
        kind: "scratch",
        title: "刮刮樂：天文觀念",
        cards: [
          { front: "1 天文單位（AU）是多遠？", back: "日地平均距離，約 $1.5 \\times 10^8$ 公里。" },
          {
            front: "視星等與絕對星等有什麼不同？",
            back: "**視星等**是從地球看到的亮度；**絕對星等**是假設把恆星放在 10 秒差距（約 32.6 光年）處的亮度，可比較真實發光能力。",
          },
          {
            front: "太陽最後會變成什麼？",
            back: "約 50 億年後膨脹成**紅巨星**，最後拋出外層形成行星狀星雲，核心成為**白矮星**。",
          },
          {
            front: "哈伯定律說了什麼？",
            back: "星系遠離的速度與距離成正比：$v = H_0 d$，代表宇宙正在膨脹。",
          },
        ],
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("u1"), q("u2"), q("u3"), q("u4"), q("u5"), q("u7")],
      },
    ],
  },
  {
    id: "earth.senior.plate-tectonics",
    title: "板塊構造學說與地質年代",
    grade: 10,
    minutes: 15,
    nodeIds: [n("plate-theory"), n("boundaries"), n("taiwan-orogeny"), n("geologic-time")],
    objectives: [
      "說明大陸漂移說、海底擴張說到板塊構造學說的演進與證據",
      "能由海洋地殼年齡計算板塊移動速率",
      "運用半衰期推算岩石或化石的絕對年齡",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "板塊構造剖面",
        prompt: "點擊熱點，從中洋脊一路走到隱沒帶。",
        viewBox: "0 0 400 260",
        scene: crossSection,
        mode: "explore",
        spots: [
          {
            id: "ridge",
            x: 110,
            y: 86,
            title: "中洋脊（張裂型邊界）",
            body: "地函物質上升、部分熔融形成岩漿，冷卻後成為新的海洋地殼，再被推向兩側。中洋脊兩側的岩石磁性呈對稱的條帶。",
          },
          {
            id: "litho",
            x: 240,
            y: 120,
            title: "岩石圈",
            body: "由地殼與最上部的地函組成，剛性較強，分裂成一塊塊板塊。海洋岩石圈離中洋脊越遠越老、越冷、越厚。",
          },
          {
            id: "astheno",
            x: 160,
            y: 210,
            title: "軟流圈",
            body: "岩石圈下方部分熔融、具可塑性的地函，能非常緩慢地流動，板塊就在它上面移動。",
          },
          {
            id: "trench",
            x: 273,
            y: 108,
            title: "海溝（聚合型邊界）",
            body: "又老又冷、密度較大的海洋板塊在這裡向下彎曲隱沒，形成海洋中最深的地方。",
          },
          {
            id: "slab",
            x: 330,
            y: 170,
            title: "隱沒帶與地震",
            body: "隱沒板塊與上方板塊摩擦，地震震源由海溝往大陸方向**由淺而深**排列成傾斜的帶狀。",
          },
          {
            id: "arc",
            x: 345,
            y: 40,
            title: "火山弧",
            body: "隱沒板塊下沉到一定深度時釋出水分，使上方地函熔點降低而產生岩漿，上升形成一列火山，例如日本的火山。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "證據分類：大陸漂移還是海底擴張？",
        buckets: [
          { id: "drift", label: "大陸漂移說的證據（1910 年代）" },
          { id: "spread", label: "海底擴張說的證據（1960 年代）" },
        ],
        items: [
          { id: "d1", label: "南美洲東岸與非洲西岸的海岸線可以拼合", bucket: "drift" },
          { id: "d2", label: "相隔大洋的大陸上找到相同的古生物化石", bucket: "drift" },
          { id: "d3", label: "現今熱帶地區留有古代冰川的遺跡", bucket: "drift" },
          { id: "d4", label: "大洋兩岸的岩層與山脈可以接續", bucket: "drift" },
          { id: "s1", label: "中洋脊兩側的磁條帶左右對稱", bucket: "spread" },
          { id: "s2", label: "海洋地殼離中洋脊越遠年齡越老", bucket: "spread" },
          { id: "s3", label: "海底沉積物離中洋脊越遠越厚", bucket: "spread" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：板塊移動有多快？",
        problem:
          "在中洋脊東側 150 公里處的海洋地殼，定年結果為 300 萬年；西側 150 公里處也是 300 萬年。求單側的移動速率與兩側的擴張速率。",
        steps: [
          { show: "單位換算：150 公里 $= 150 \\times 10^5$ 公分 $= 1.5 \\times 10^7$ 公分。" },
          {
            show: "單側速率 $= \\frac{1.5 \\times 10^7\\ \\text{公分}}{3 \\times 10^6\\ \\text{年}} = 5$ 公分／年。",
            predict: {
              question: "單側每年移動多少？",
              choices: ["5 公分", "50 公分", "0.5 公分"],
              answer: 0,
            },
          },
          {
            show: "兩側板塊互相遠離，擴張速率 $= 5 + 5 = 10$ 公分／年。",
            why: "兩側各自以 5 公分／年往外移動。",
          },
          {
            show: "比一比：人的指甲一年大約長 3～4 公分，板塊移動的速度和指甲生長差不多。",
          },
        ],
        takeaway: "速率 = 距離 ÷ 年齡。記得把公里換成公分（1 公里 $= 10^5$ 公分）。",
      },
      {
        id: "a4",
        kind: "slider",
        title: "拉桿：放射性定年",
        prompt:
          "生物死亡後不再吸收碳 14，體內的碳 14 依半衰期 5730 年逐漸減少。拉動時間，觀察剩下的比例。",
        params: [
          {
            key: "t",
            label: "生物死亡後經過",
            min: 0,
            max: 30000,
            step: 100,
            init: 2000,
            unit: "年",
          },
        ],
        plot: {
          x: [0, 30000],
          y: [0, 100],
          xLabel: "經過時間（年）",
          yLabel: "剩餘（%）",
          fns: [{ label: "剩餘碳 14 比例", color: "#0f766e", f: (x) => remain(x) }],
          points: (p) => [{ x: p.t, y: remain(p.t), label: `${remain(p.t).toFixed(1)}%` }],
          vlines: () => [
            { x: HALF, label: "1 個" },
            { x: 2 * HALF, label: "2 個" },
            { x: 3 * HALF, label: "3 個半衰期" },
          ],
        },
        readouts: [
          { label: "剩餘碳 14", value: (p) => `${remain(p.t).toFixed(1)}%` },
          { label: "經過幾個半衰期", value: (p) => (p.t / HALF).toFixed(2) },
        ],
        goal: {
          text: "找出碳 14 只剩下原來 **25%** 時，大約經過了幾年（誤差 0.5% 內）。",
          test: (p) => Math.abs(remain(p.t) - 25) <= 0.5,
        },
        insight:
          "25% $= \\left(\\frac{1}{2}\\right)^2$，經過 2 個半衰期，約 11460 年。碳 14 適合測定約 5 萬年內的生物遺骸；更古老的岩石要用半衰期更長的元素，例如鈾 238（約 45 億年）。",
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：地質學家帶你看太魯閣",
        scenarioId: "earth.senior.s-taroko",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("g1"), q("g2"), q("g3"), q("g6"), q("g8"), q("g10")],
      },
    ],
  },
  {
    id: "earth.senior.earthquake",
    title: "地震波、震央定位與地震防災",
    grade: 10,
    minutes: 12,
    nodeIds: [n("interior"), n("quake-hazard")],
    objectives: [
      "比較 P 波、S 波與表面波的特性，並說明地震波如何揭露地球內部構造",
      "利用三個測站的 S−P 時間差定出震央",
      "分辨規模與震度，認識地震災害與防災",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：三站定震央",
        prompt: "根據每個測站記錄到的 S−P 時間差算出距離，調整三個圓的半徑，找出震央。",
        load: epicenterLab,
        insight:
          "S−P 時間差換算出的其實是到**震源**的距離，淺源地震時可近似為到震央的距離。單一測站只知道「多遠」，三個測站的距離圓交點才能定出位置。",
      },
      {
        id: "a2",
        kind: "memory",
        title: "翻牌配對：地震波與地球內部",
        pairs: [
          ["P 波", "縱波，可通過固體、液體與氣體"],
          ["S 波", "橫波，只能通過固體"],
          ["表面波", "沿地表傳播，速度最慢、搖晃最劇烈"],
          ["莫氏不連續面", "地殼與地函的交界"],
          ["古氏不連續面", "地函與外核的交界"],
          ["S 波陰影區", "顯示外核為液態的證據"],
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "規模還是震度？",
        buckets: [
          { id: "mag", label: "規模" },
          { id: "int", label: "震度" },
        ],
        items: [
          { id: "i1", label: "代表地震釋放能量的大小", bucket: "mag" },
          { id: "i2", label: "一次地震只有一個數值", bucket: "mag" },
          { id: "i3", label: "數值增加 1，能量約增為 32 倍", bucket: "mag" },
          { id: "i4", label: "代表某地點搖晃的劇烈程度", bucket: "int" },
          { id: "i5", label: "同一次地震，各地數值不同", bucket: "int" },
          { id: "i6", label: "中央氣象署分為 0～7 級", bucket: "int" },
          { id: "i7", label: "通常離震央越遠數值越小", bucket: "int" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：強震即時警報爭取多少時間？",
        problem:
          "某地震震源距離臺北 120 公里。若 P 波速度 6 公里／秒、S 波 3.5 公里／秒，系統偵測到 P 波並完成計算、發布警報需要 10 秒。臺北民眾在 S 波（主要搖晃）到達前，大約有幾秒可以應變？",
        steps: [
          {
            show: "S 波到達臺北的時間：$\\frac{120}{3.5} \\approx 34.3$ 秒。",
            why: "時間 = 距離 ÷ 速度。",
          },
          {
            show: "警報在地震發生後約 10 秒發出（這個數字是假設，實際會依測站分布而不同）。",
          },
          {
            show: "應變時間 $\\approx 34.3 - 10 \\approx 24$ 秒。",
            predict: {
              question: "大約有幾秒可以應變？",
              choices: ["約 24 秒", "約 34 秒", "約 10 秒"],
              answer: 0,
            },
          },
          {
            show: "如果震源離臺北只有 30 公里，S 波約 8.6 秒就到達，警報還沒發出就已經開始搖晃——這是震央附近的「盲區」。",
            why: "距離震央越近，預警時間越短。",
          },
        ],
        takeaway:
          "強震即時警報利用「P 波比 S 波快、電訊比地震波快」爭取時間。收到警報立刻**趴下、掩護、穩住**。",
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：規模與震度",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-quake-1"), q("set-quake-2"), q("set-quake-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("g4"), q("g5"), q("h4"), q("h8"), q("h9")],
      },
    ],
  },
  {
    id: "earth.senior.atmosphere",
    title: "大氣的垂直結構與大氣環流",
    grade: 10,
    minutes: 15,
    nodeIds: [n("atmo-layers"), n("radiation"), n("circulation")],
    objectives: [
      "依氣溫隨高度的變化說出大氣四層的特徵",
      "說明臭氧層與平流層增溫的關係",
      "以三胞環流與科氏力解釋全球的氣壓帶與風帶",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：大氣的垂直結構",
        prompt: "逐一打開圖層，觀察每一層的氣溫變化與發生的現象。",
        viewBox: "0 0 400 320",
        base: atmBase,
        layers: [
          {
            id: "temp",
            label: "氣溫隨高度變化",
            load: atmTemp,
            color: "#dc2626",
            on: true,
            note: "氣溫「降 → 升 → 降 → 升」，正是分層的依據。對流層平均每升高 1 公里約降 6.5°C。",
          },
          {
            id: "ozone",
            label: "臭氧層",
            load: atmOzone,
            color: "#22c55e",
            note: "臭氧吸收太陽的紫外線而增溫，所以平流層的氣溫隨高度上升；也保護地表生物免受過量紫外線傷害。",
          },
          {
            id: "weather",
            label: "雲與飛機",
            load: atmWeather,
            color: "#64748b",
            note: "幾乎所有的水氣都在對流層，雲、雨、颱風都在這裡發生；客機多在對流層頂附近（約 10～12 公里）巡航，避開劇烈天氣。",
          },
          {
            id: "upper",
            label: "流星與極光",
            load: atmUpper,
            color: "#f59e0b",
            note: "流星體多在中氣層附近與空氣摩擦燃燒；極光出現在增溫層，是太陽風的帶電粒子撞擊高層大氣發光。",
          },
        ],
        check: {
          stem: "哪一層的氣溫隨高度**上升**，主要是因為臭氧吸收紫外線？",
          choices: ["平流層", "對流層", "中氣層", "增溫層"],
          answer: 0,
          explain: "平流層的臭氧吸收紫外線而增溫，因此上暖下冷、大氣穩定，不易產生對流。",
        },
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：三胞環流與地面風帶",
        problem: "為什麼赤道多雨、南北緯 30 度附近多沙漠？北半球低緯度為什麼吹東北信風？",
        steps: [
          {
            show: "赤道受熱最多，空氣受熱上升，形成**赤道低壓帶**；上升冷卻使水氣凝結，降雨旺盛。",
            predict: {
              question: "赤道地面是高氣壓還是低氣壓？",
              choices: ["低氣壓", "高氣壓"],
              answer: 0,
            },
          },
          {
            show: "上升空氣在高空流向高緯，約在南北緯 30 度下沉，形成**副熱帶高壓帶**；下沉增溫、乾燥少雨，許多大沙漠都在這附近。",
          },
          {
            show: "地面空氣由副熱帶高壓吹回赤道低壓，這一圈稱為**哈德里環流胞**。",
          },
          {
            show: "北半球受科氏力向右偏，原本往南吹的風偏成由東北吹來，就是**東北信風**。",
            predict: {
              question: "北半球往南吹的風會偏向哪邊？",
              choices: ["向右偏，成為東北風", "向左偏，成為西北風", "不會偏轉"],
              answer: 0,
            },
          },
          {
            show: "中緯度（30～60 度）有費雷爾環流胞，地面吹**盛行西風**；高緯度有極地環流胞，地面吹**極地東風**。",
          },
        ],
        takeaway: "上升處為低壓、多雨；下沉處為高壓、乾燥。風由高壓吹向低壓，再受科氏力偏轉。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "match",
        title: "配對：氣壓帶、風帶與特徵",
        pairs: [
          { id: "p1", left: "赤道低壓帶", right: "空氣上升，對流旺盛多雨" },
          { id: "p2", left: "副熱帶高壓帶", right: "空氣下沉，乾燥少雨，多沙漠" },
          { id: "p3", left: "東北信風", right: "北半球 0～30 度的地面風" },
          { id: "p4", left: "盛行西風", right: "中緯度 30～60 度的地面風" },
          { id: "p5", left: "極地東風", right: "高緯度地區的地面風" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：大氣小檔案",
        cards: [
          {
            front: "乾空氣中含量最多的兩種氣體？",
            back: "**氮氣**約 78%、**氧氣**約 21%；氬約 0.9%，二氧化碳約 0.04%。",
          },
          {
            front: "對流層頂的高度各地都一樣嗎？",
            back: "不一樣：赤道附近較高（約 16～18 公里），兩極較低（約 8 公里）。",
          },
          {
            front: "大氣層中最冷的地方在哪裡？",
            back: "**中氣層頂**附近（約 85 公里），可低到約 −90°C。",
          },
          {
            front: "為什麼高山上比較冷？",
            back: "對流層的熱主要來自地面，離地面越遠越冷；空氣上升也會膨脹冷卻。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m3"), q("m4"), q("m5"), q("m10")],
      },
    ],
  },
  {
    id: "earth.senior.ocean-enso",
    title: "海洋環流與聖嬰現象",
    grade: 10,
    minutes: 12,
    nodeIds: [n("ocean-structure"), n("ocean-circulation"), n("enso")],
    objectives: [
      "說明表層環流與溫鹽環流的驅動力",
      "以艾克曼輸送解釋沿岸湧升流",
      "描述聖嬰與反聖嬰時赤道太平洋的變化及影響",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：信風與聖嬰（示意模型）",
        prompt:
          "平常東風（信風）把溫暖的表層海水吹向西太平洋，東太平洋則有冷水上湧。調整信風強度，觀察赤道太平洋表層海溫的變化。灰線是平常狀態。",
        params: [{ key: "w", label: "信風強度（平常 = 1）", min: 0, max: 2, step: 0.1, init: 1 }],
        plot: {
          x: [120, 280],
          y: [18, 32],
          xLabel: "經度（120°E 印尼 → 280°E 即 80°W 秘魯）",
          yLabel: "表層海溫（°C）",
          fns: [
            { label: "目前海溫", color: "#dc2626", f: (x, p) => sst(x, p.w) },
            { label: "平常狀態", color: "#94a3b8", f: (x) => sst(x, 1) },
          ],
        },
        readouts: [
          { label: "東太平洋海溫距平", value: (p) => `${fmtSigned(eastAnom(p.w))}°C` },
          { label: "狀態", value: (p) => ensoState(p.w) },
          {
            label: "秘魯沿岸湧升流",
            value: (p) => (p.w >= 1.2 ? "增強" : p.w > 0.8 ? "正常" : "減弱"),
          },
          {
            label: "主要降雨區",
            value: (p) =>
              eastAnom(p.w) >= 1.5
                ? "東移到太平洋中、東部"
                : eastAnom(p.w) <= -1
                  ? "集中在印尼一帶且更旺盛"
                  : "西太平洋（印尼一帶）",
          },
        ],
        goal: {
          text: "減弱信風，讓東太平洋海溫比平常高出 **2°C 以上**（典型的聖嬰）。",
          test: (p) => eastAnom(p.w) >= 2,
        },
        insight:
          "信風減弱時，西太平洋的暖水向東擴展、湧升流減弱，東太平洋變暖，降雨區跟著東移：秘魯一帶多雨成災、漁獲減少，印尼與澳洲則可能乾旱。海溫與信風會互相加強，這種大氣與海洋的交互作用稱為 ENSO。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "聖嬰還是反聖嬰？",
        buckets: [
          { id: "nino", label: "聖嬰（El Niño）" },
          { id: "nina", label: "反聖嬰（La Niña）" },
        ],
        items: [
          { id: "n1", label: "東太平洋赤道海溫異常偏高", bucket: "nino" },
          { id: "n2", label: "秘魯沿岸湧升流減弱，漁獲減少", bucket: "nino" },
          { id: "n3", label: "印尼、澳洲一帶較容易乾旱", bucket: "nino" },
          { id: "n4", label: "南美洲西岸降雨增加", bucket: "nino" },
          { id: "l1", label: "信風比平常更強", bucket: "nina" },
          { id: "l2", label: "東太平洋赤道海溫異常偏低", bucket: "nina" },
          { id: "l3", label: "西太平洋暖水堆積更多，降雨更旺盛", bucket: "nina" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：湧升流從哪裡來？",
        problem: "秘魯外海的風大致沿著海岸由南往北吹。為什麼會造成深層冷水湧升？",
        steps: [
          {
            show: "風吹動表層海水，但地球自轉產生的科氏力會讓海水的運動偏轉。",
          },
          {
            show: "秘魯在南半球，科氏力使運動**向左偏**。",
            predict: {
              question: "南半球的科氏力讓運動往哪邊偏？",
              choices: ["向左", "向右", "不偏"],
              answer: 0,
            },
          },
          {
            show: "整層表層海水的淨移動方向，約與風向垂直（艾克曼輸送）：向北的風 → 海水淨往**西**移動，也就是離開海岸。",
            predict: {
              question: "表層海水淨往哪個方向移動？",
              choices: ["往西，離開海岸", "往東，衝向海岸", "往北，和風同向"],
              answer: 0,
            },
          },
          {
            show: "表層海水被帶離岸邊，下方又冷又富含營養鹽的深層海水上湧補充，浮游生物大量繁殖，形成世界級漁場。",
          },
        ],
        takeaway:
          "湧升流 = 沿岸風 + 科氏力讓表層海水離岸 → 深層冷水上湧。聖嬰時信風減弱，湧升流跟著減弱。",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：海洋小檔案",
        cards: [
          { front: "海水的平均鹽度約多少？", back: "約 **35‰**（每公斤海水約含 35 公克鹽類）。" },
          {
            front: "海水由上而下可分成哪三層？",
            back: "**混合層**（受風攪拌、溫度均勻）→ **斜溫層**（溫度快速下降）→ **深層**（冷而穩定）。",
          },
          {
            front: "什麼樣的海水密度最大？",
            back: "溫度**低**、鹽度**高**的海水，例如北大西洋高緯度結冰時留下的冷鹹海水。",
          },
          {
            front: "黑潮屬於哪一種環流的一部分？",
            back: "北太平洋**副熱帶環流**（順時針）的西方邊界流，又快又強。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m6"), q("m7"), q("m8"), q("m9")],
      },
    ],
  },
  {
    id: "earth.senior.climate-hazards",
    title: "天然災害與氣候變遷",
    grade: 10,
    minutes: 15,
    nodeIds: [n("typhoon"), n("slope-hazard"), n("climate-change"), n("radiation")],
    objectives: [
      "說明颱風的結構與造成災害的方式",
      "分析土石流發生的條件與防災作為",
      "以溫室效應與二氧化碳濃度解釋全球暖化",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "颱風的構造",
        prompt: "點擊熱點，認識北半球颱風的各個部分。",
        viewBox: "0 0 400 300",
        scene: typhoonScene,
        mode: "explore",
        spots: [
          {
            id: "eye",
            x: 200,
            y: 150,
            title: "颱風眼",
            body: "颱風中心的下沉氣流區，風力微弱、雲少，甚至能看到藍天。直徑常為數十公里。",
          },
          {
            id: "wall",
            x: 228,
            y: 150,
            title: "眼牆",
            body: "環繞颱風眼的高聳積雨雲牆，**風速最大、雨勢最猛**。",
          },
          {
            id: "bands",
            x: 160,
            y: 67,
            title: "螺旋雨帶",
            body: "由外向內捲入的帶狀對流雲，經過時會出現一陣一陣的強降雨。",
          },
          {
            id: "spin",
            x: 200,
            y: 212,
            title: "逆時針旋轉",
            body: "北半球的颱風是低氣壓，空氣逆時針旋轉吹向中心；南半球的熱帶氣旋則是順時針。",
          },
          {
            id: "right",
            x: 300,
            y: 110,
            title: "移動方向的右半圓",
            body: "颱風往西北移動時，右側（東北側）的旋轉風向與移動方向相同、互相疊加，風力通常較強。",
          },
          {
            id: "move",
            x: 70,
            y: 30,
            title: "移動路徑",
            body: "影響臺灣的颱風多沿著太平洋高壓的南緣往西或西北移動；高壓減弱或退縮時，可能轉向北或東北。",
          },
        ],
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：二氧化碳與全球增溫",
        prompt:
          "平衡增溫大約和 CO₂ 濃度的**對數**成正比：$\\Delta T = S \\times \\log_2 \\frac{C}{280}$，$S$ 是氣候敏感度（CO₂ 加倍時的增溫）。灰色虛線是工業革命前的 280 ppm。",
        params: [
          {
            key: "c",
            label: "大氣 CO₂ 濃度",
            min: 180,
            max: 1000,
            step: 10,
            init: 280,
            unit: "ppm",
          },
          { key: "s", label: "氣候敏感度 S", min: 2, max: 5, step: 0.5, init: 3, unit: "°C" },
        ],
        plot: {
          x: [180, 1000],
          y: [-3, 8],
          xLabel: "CO₂ 濃度（ppm）",
          yLabel: "平衡增溫（°C）",
          fns: [{ label: "平衡增溫", color: "#dc2626", f: (x, p) => warming(x, p.s) }],
          points: (p) => [
            { x: p.c, y: warming(p.c, p.s), label: `${fmtSigned(warming(p.c, p.s))}°C` },
          ],
          vlines: () => [
            { x: 280, color: "#64748b" },
            { x: 420, label: "近年約 420", color: "#d97706" },
          ],
        },
        readouts: [
          { label: "平衡增溫", value: (p) => `${fmtSigned(warming(p.c, p.s))}°C` },
          { label: "相對工業革命前", value: (p) => `${(p.c / 280).toFixed(2)} 倍` },
          {
            label: "輻射強迫",
            value: (p) => `${fmtSigned(5.35 * Math.log(p.c / 280), 2)} W/m²`,
          },
        ],
        goal: {
          text: "在氣候敏感度 3°C 時，找出讓平衡增溫達到 **2°C**（誤差 0.1°C 內）的 CO₂ 濃度。",
          test: (p) => p.s === 3 && Math.abs(warming(p.c, p.s) - 2) <= 0.1,
        },
        insight:
          "約 440～450 ppm 就可能帶來 2°C 的長期增溫，而目前濃度已超過 420 ppm。IPCC 評估氣候敏感度最可能約 3°C，因此減少排放刻不容緩。這是簡化模型，實際升溫還受海洋吸熱、氣膠與其他溫室氣體影響。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：這條溪會發生土石流嗎？",
        problem:
          "颱風帶來豪雨，山區一條上游有大量崩塌土石的陡峭溪溝，下游出口處有村落。判斷土石流風險並提出因應。",
        steps: [
          {
            show: "檢查**材料**：上游有大量鬆散的崩塌土石。✓",
            predict: {
              question: "土石流的三個條件是？",
              choices: ["鬆散土石、陡峭坡度、充足水分", "高溫、乾燥、強風", "地震、海嘯、火山"],
              answer: 0,
            },
          },
          { show: "檢查**坡度**：溪溝陡峭，土石容易向下移動。✓" },
          { show: "檢查**水分**：颱風豪雨使土石含水飽和。✓ 三個條件都符合，風險很高。" },
          {
            show: "因應：留意土石流警戒資訊、依指示**提早撤離**，避開溪溝與出口的堆積區；平時可做坡地保育與工程防護。",
            why: "土石流速度快、衝擊力大，等看到再逃往往來不及。",
          },
        ],
        takeaway: "土石流 = 鬆散土石 + 陡峭坡度 + 充足水分。豪雨期間遠離溪溝，聽從撤離指示。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：溫室效應",
        task: "畫出太陽、大氣層與地表，用箭頭表示：(1) 太陽短波輻射穿過大氣加熱地表；(2) 地表放出紅外線；(3) 溫室氣體吸收紅外線並向下輻射。最後標出「溫室氣體」的位置與例子。",
        background: "blank",
        hint: "用黃色箭頭代表太陽光，紅色波浪箭頭代表紅外線；有一部分紅外線會被大氣「擋住再送回來」。",
        reference:
          "太陽輻射以可見光等短波為主，大多能穿過大氣；地表吸熱後放出長波紅外線，二氧化碳、甲烷、水氣等溫室氣體吸收後向各方向（包括地面）再輻射，使地表平均溫度約 15°C，而不是約 −18°C。溫室氣體增加 → 留住更多熱 → 全球暖化。",
        aiFeedback: true,
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：二氧化碳濃度的變化",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-co2-1"), q("set-co2-2"), q("set-co2-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("h1"), q("h2"), q("h3"), q("h5"), q("h6"), q("h7"), q("h10")],
      },
    ],
  },
];

export default lessons;
