import type { Lesson } from "../../types";

const plateLab = () => import("../labs/PlateBoundaryLab");
const moonLab = () => import("../labs/MoonPhaseLab");
const tideLab = () => import("../labs/TideLab");
const interiorScene = () => import("../scenes/EarthInteriorScene");
const volcanoScene = () => import("../scenes/VolcanoScene");
const weatherScene = () => import("../scenes/WeatherMapScene");
const twBase = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Base }));
const twPlates = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Plates }));
const twMountains = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Mountains }));
const twFaults = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Faults }));
const twQuakes = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Quakes }));

const q = (s: string) => `earth.junior.q-${s}`;
const n = (s: string) => `earth.junior.${s}`;

/* 四季拉桿：太陽直射緯度（以地軸傾斜 23.5° 計） */
const TILT = 23.5;
const rad = (d: number) => (d * Math.PI) / 180;
const decl = (pos: number) => TILT * Math.sin(rad(pos));
const noonAltitude = (lat: number, pos: number) => 90 - Math.abs(lat - decl(pos));
function dayLength(lat: number, pos: number): number {
  const x = -Math.tan(rad(lat)) * Math.tan(rad(decl(pos)));
  const h0 = Math.acos(Math.max(-1, Math.min(1, x)));
  return (2 * ((h0 * 180) / Math.PI)) / 15;
}
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function dateOf(pos: number): string {
  // 春分約為 3 月 21 日（一年中的第 80 天）
  let d = (79 + Math.round((pos / 360) * 365)) % 365;
  let m = 0;
  while (d >= MONTH_DAYS[m]) {
    d -= MONTH_DAYS[m];
    m++;
  }
  return `${m + 1} 月 ${d + 1} 日左右`;
}
const SOLAR_TERMS: Record<number, string> = { 0: "春分", 90: "夏至", 180: "秋分", 270: "冬至" };

const lessons: Lesson[] = [
  {
    id: "earth.junior.earth-structure",
    title: "地球的構造與岩石循環",
    grade: 9,
    minutes: 12,
    nodeIds: [n("layers"), n("minerals"), n("rocks"), n("rock-cycle")],
    objectives: [
      "說出地殼、地函、外核、內核的位置與特性",
      "依成因把岩石分成火成岩、沉積岩、變質岩",
      "描述岩石循環中岩石如何互相轉變",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "地球的內部構造",
        prompt: "點擊每個閃爍的熱點，從地殼一路往下走到地心。",
        viewBox: "0 0 400 300",
        scene: interiorScene,
        mode: "explore",
        spots: [
          {
            id: "crust",
            x: 31,
            y: 87,
            title: "地殼",
            body: "地球最外層的薄殼。大陸地殼較厚（平均約 35 公里，高山底下更厚），以花崗岩質岩石為主；海洋地殼較薄（約 5～10 公里），以玄武岩為主。",
          },
          {
            id: "moho",
            x: 201,
            y: 44,
            title: "莫氏不連續面",
            body: "地殼與地函的交界。地震波穿過這裡時速度明顯變快，科學家因此發現了這個界面。",
          },
          {
            id: "mantle",
            x: 107,
            y: 60,
            title: "地函",
            body: "從地殼底部到地下約 2900 公里，是地球體積最大的一層。由高溫岩石組成，雖然是固態，上部的**軟流圈**卻能非常緩慢地流動，帶動上方的板塊移動。",
          },
          {
            id: "gutenberg",
            x: 116,
            y: 217,
            title: "古氏不連續面",
            body: "地函與外核的交界，約在地下 2900 公里。S 波無法穿過這裡進入外核，P 波速度也突然變慢。",
          },
          {
            id: "outer",
            x: 187,
            y: 133,
            title: "外核",
            body: "主要由鐵、鎳組成的**液態**金屬層。外核中液態金屬的流動，被認為是地球磁場的來源。",
          },
          {
            id: "inner",
            x: 140,
            y: 150,
            title: "內核",
            body: "地球的中心，半徑約 1200 公里，溫度可達 5000°C 以上，但因為壓力極大，鐵鎳被壓成**固態**。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "岩石分類",
        prompt: "依照**形成方式**，把岩石放進正確的類別。",
        buckets: [
          { id: "igneous", label: "火成岩（岩漿冷卻）" },
          { id: "sedimentary", label: "沉積岩（沉積物壓密膠結）" },
          { id: "metamorphic", label: "變質岩（高溫高壓改變）" },
        ],
        items: [
          { id: "granite", label: "花崗岩：晶體大、有黑白斑點", bucket: "igneous" },
          { id: "basalt", label: "玄武岩：澎湖的柱狀節理", bucket: "igneous" },
          { id: "andesite", label: "安山岩：大屯火山群常見", bucket: "igneous" },
          { id: "sandstone", label: "砂岩：由砂粒膠結而成", bucket: "sedimentary" },
          { id: "shale", label: "頁岩：由細泥沉積而成", bucket: "sedimentary" },
          { id: "limestone", label: "石灰岩：常含珊瑚、貝殼化石", bucket: "sedimentary" },
          { id: "marble", label: "大理岩：太魯閣峽谷的岩壁", bucket: "metamorphic" },
          { id: "slate", label: "板岩：可剝成薄片蓋石板屋", bucket: "metamorphic" },
          { id: "schist", label: "片岩：有明顯片狀葉理", bucket: "metamorphic" },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排一排：一顆砂粒的岩石循環之旅",
        prompt: "把事件依照發生的先後順序排好。",
        items: [
          { id: "r1", label: "岩漿在地下冷卻凝固，形成花崗岩" },
          { id: "r2", label: "地殼抬升，花崗岩露出地表" },
          { id: "r3", label: "花崗岩受風化，破碎成砂粒" },
          { id: "r4", label: "河流把砂粒侵蝕、搬運到海邊" },
          { id: "r5", label: "砂粒在海底一層層沉積" },
          { id: "r6", label: "沉積物被壓密、膠結成砂岩" },
          { id: "r7", label: "砂岩被埋到深處，受高溫高壓變成石英岩" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：礦物與岩石小知識",
        prompt: "先想想看，再刮開確認答案。",
        cards: [
          {
            front: "礦物和岩石有什麼不同？",
            back: "**礦物**有固定的化學成分與晶體結構；**岩石**通常由一種或多種礦物組成。",
          },
          {
            front: "摩氏硬度最軟和最硬的礦物各是什麼？",
            back: "最軟是**滑石**（1），最硬是**鑽石**（10）；石英是 7。",
          },
          { front: "怎麼簡單分辨方解石？", back: "滴上稀鹽酸會冒出二氧化碳氣泡，硬度約 3。" },
          {
            front: "為什麼玄武岩的晶體很小？",
            back: "熔岩噴出地表後**快速冷卻**，晶體來不及長大。",
          },
          {
            front: "變質岩常見的「葉理」是怎麼來的？",
            back: "岩石受到**定向的高壓**，礦物重新排列成一層層平行的構造，例如板岩、片岩。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s1"), q("s2"), q("s4"), q("s7"), q("s8")],
      },
    ],
  },
  {
    id: "earth.junior.plates-quakes",
    title: "板塊運動、地震與火山",
    grade: 9,
    minutes: 15,
    nodeIds: [n("plates"), n("earthquake"), n("volcano"), n("taiwan-geology")],
    objectives: [
      "比較張裂型、聚合型、錯動型板塊邊界的運動方式與地形",
      "能利用 P 波與 S 波的到達時間差推算震源距離",
      "說明臺灣的板塊位置與地震、山脈的關係",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：三種板塊邊界",
        prompt: "切換邊界類型，拉動時間，觀察板塊怎麼移動、會形成什麼地形。",
        load: plateLab,
        insight:
          "板塊每年只移動數公分，但經過數百萬年就能移動數百公里。地震、火山與高山大多集中在**板塊邊界**附近。",
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "找找看：火山的構造",
        prompt: "依照提示，在火山剖面圖中找出各個部位。",
        viewBox: "0 0 400 300",
        scene: volcanoScene,
        mode: "find",
        spots: [
          {
            id: "chamber",
            x: 200,
            y: 262,
            title: "岩漿庫",
            body: "地下儲存岩漿的地方。岩漿密度比周圍岩石小，會沿著裂隙往上升。",
          },
          {
            id: "conduit",
            x: 200,
            y: 160,
            title: "火山管道",
            body: "岩漿從岩漿庫上升到地表的通道。",
          },
          {
            id: "crater",
            x: 200,
            y: 74,
            title: "火山口",
            body: "火山頂端噴出岩漿、氣體與碎屑的開口。",
          },
          {
            id: "lava",
            x: 252,
            y: 135,
            title: "熔岩流",
            body: "噴出地表的岩漿稱為**熔岩**，冷卻後形成玄武岩、安山岩等火山岩。",
          },
          {
            id: "ash",
            x: 203,
            y: 30,
            title: "火山灰與火山碎屑",
            body: "爆發時噴出的細小岩屑（火山灰）與較大的火山彈，可隨風飄到很遠的地方，影響飛航與農作。",
          },
          {
            id: "cone",
            x: 130,
            y: 170,
            title: "火山錐",
            body: "熔岩與火山碎屑一層層堆積形成的錐狀山體。由多次噴發交互堆疊而成的稱為層狀火山。",
          },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：P 波與 S 波的時間差",
        problem:
          "某地震測站先收到 P 波，**10 秒**後才收到 S 波。若 P 波速度約 6 公里／秒、S 波速度約 3.5 公里／秒，測站距離震源大約多遠？",
        steps: [
          {
            show: "設測站與震源距離為 $d$ 公里。P 波走完 $d$ 需要 $\\frac{d}{6}$ 秒，S 波需要 $\\frac{d}{3.5}$ 秒。",
            why: "時間 = 距離 ÷ 速度。",
          },
          {
            show: "$\\frac{d}{3.5} - \\frac{d}{6} = 10$",
            why: "S 波比較慢，兩者到達的時間差是 10 秒。",
            predict: {
              question: "時間差的式子應該怎麼列？",
              choices: [
                "$\\frac{d}{3.5} - \\frac{d}{6} = 10$",
                "$\\frac{d}{6} - \\frac{d}{3.5} = 10$",
                "$6d - 3.5d = 10$",
              ],
              answer: 0,
            },
          },
          {
            show: "$d \\times \\frac{6 - 3.5}{3.5 \\times 6} = 10$，也就是 $d \\times \\frac{2.5}{21} = 10$",
            why: "通分後合併。",
          },
          {
            show: "$d = 10 \\times \\frac{21}{2.5} = 10 \\times 8.4 = 84$（公里）",
            predict: {
              question: "距離大約是？",
              choices: ["35 公里", "60 公里", "84 公里"],
              answer: 2,
            },
          },
        ],
        takeaway:
          "時間差越長，距離越遠。在這個速度下，**每差 1 秒約相當於 8.4 公里**。這是依假設波速算出的**近似值**：實際波速會隨岩層改變，課本也常取每秒約 8 公里。用三個測站的距離畫圓，交點就是震央。",
      },
      {
        id: "a4",
        kind: "layers",
        title: "圖層疊加：臺灣的板塊、山脈、斷層與地震",
        prompt: "逐一打開圖層，找找看它們之間有什麼關聯。",
        viewBox: "0 0 400 420",
        base: twBase,
        layers: [
          {
            id: "plates",
            label: "板塊與交界",
            load: twPlates,
            color: "#7c3aed",
            on: true,
            note: "菲律賓海板塊往西北擠向歐亞板塊。東北外海是**琉球海溝**，南部外海是**馬尼拉海溝**，陸上的花東縱谷是兩板塊的交界帶。",
          },
          {
            id: "mountains",
            label: "主要山脈",
            load: twMountains,
            color: "#a16207",
            note: "五大山脈大致呈東北—西南走向，與板塊擠壓的方向垂直。海岸山脈原屬於菲律賓海板塊上的火山島弧。",
          },
          {
            id: "faults",
            label: "活動斷層（部分）",
            load: twFaults,
            color: "#dc2626",
            note: "1999 年 9 月 21 日的集集地震，就是車籠埔斷層錯動造成的。",
          },
          {
            id: "quakes",
            label: "地震震央（示意）",
            load: twQuakes,
            color: "#f97316",
            note: "震央在東部與東部外海特別密集。",
          },
        ],
        check: {
          stem: "為什麼臺灣東部與東部外海的地震特別多？",
          choices: [
            "靠近菲律賓海板塊與歐亞板塊的聚合交界",
            "東部的颱風比較多",
            "東部的火山正在大規模噴發",
            "東部離赤道比較近",
          ],
          answer: 0,
          explain:
            "板塊交界處岩層受到強烈擠壓，應力不斷累積後突然釋放，就形成地震。臺灣東部正位於兩板塊碰撞、隱沒的地帶。",
        },
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：用時間差找震源",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-quake-1"), q("set-quake-2"), q("set-quake-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p3"), q("p4"), q("p5"), q("p6"), q("p7")],
      },
    ],
  },
  {
    id: "earth.junior.surface-history",
    title: "地表作用與地層化石",
    grade: 9,
    minutes: 12,
    nodeIds: [n("weathering"), n("strata"), n("fold-fault")],
    objectives: [
      "分辨風化、侵蝕、搬運、沉積作用",
      "運用疊置定律與截切定律判斷地層與事件的先後",
      "由化石推論古代環境與地質年代",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "這是哪一種作用？",
        prompt: "把每個現象放到對應的作用。",
        buckets: [
          { id: "weather", label: "風化（原地破碎分解）" },
          { id: "erode", label: "侵蝕與搬運（被帶走）" },
          { id: "deposit", label: "沉積（堆積下來）" },
        ],
        items: [
          { id: "w1", label: "岩石因白天晚上冷熱交替而碎裂", bucket: "weather" },
          { id: "w2", label: "樹根伸進岩縫，把岩石撐開", bucket: "weather" },
          { id: "w3", label: "含二氧化碳的雨水慢慢溶解石灰岩", bucket: "weather" },
          { id: "e1", label: "湍急的溪水把河床切割成深谷", bucket: "erode" },
          { id: "e2", label: "海浪拍打海岸，掏空岩壁形成海蝕洞", bucket: "erode" },
          { id: "e3", label: "強風捲起沙粒吹向內陸", bucket: "erode" },
          { id: "d1", label: "河口泥沙堆積成三角洲", bucket: "deposit" },
          { id: "d2", label: "河流出山口堆積成沖積扇", bucket: "deposit" },
        ],
      },
      {
        id: "a2",
        kind: "memory",
        title: "翻牌配對：地形與成因",
        pairs: [
          ["野柳女王頭（蕈狀岩）", "岩層軟硬不同造成的差異侵蝕"],
          ["V 形谷", "河流向下切割侵蝕"],
          ["沖積扇", "河流出山口流速變慢而堆積"],
          ["海蝕洞", "海浪長期拍打岩壁"],
          ["鐘乳石", "含碳酸鈣的水滴沉澱"],
          ["褶皺", "岩層受擠壓而彎曲"],
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：讀懂地層的故事",
        problem:
          "某處地層由下而上為：砂岩 A、頁岩 B、含珊瑚化石的石灰岩 C。一條斷層 F 切過 A、B、C，最上方覆蓋著**沒有被斷層切到**的礫岩 D。請排出這些事件的先後順序。",
        steps: [
          {
            show: "最先形成的是最下面的砂岩 A，接著是頁岩 B，再來是石灰岩 C。",
            why: "**疊置定律**：未受擾動的地層，下層比上層老。",
            predict: { question: "A、B、C 中哪一層最老？", choices: ["A", "B", "C"], answer: 0 },
          },
          {
            show: "斷層 F 切過了 A、B、C，所以斷層發生在 C 形成之後。",
            why: "**截切定律**：切過其他地層的構造，比被切的地層年輕。",
            predict: {
              question: "斷層 F 和石灰岩 C 誰比較晚？",
              choices: ["斷層 F 比較晚", "石灰岩 C 比較晚", "無法判斷"],
              answer: 0,
            },
          },
          {
            show: "礫岩 D 蓋在斷層上方卻沒有被切斷，表示 D 是斷層發生**之後**才沉積的。",
          },
          {
            show: "順序：A → B → C → 斷層 F → D。C 含珊瑚化石，表示當時這裡是溫暖清澈的淺海。",
            why: "珊瑚是指示環境的「指相化石」。",
          },
        ],
        takeaway:
          "判斷地層先後：先用**疊置定律**排沉積順序，再用**截切定律**安插斷層、侵入岩等事件。",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：化石與地質年代",
        cards: [
          {
            front: "什麼是「指準化石」？",
            back: "又稱標準化石：生存時間短、分布廣的生物化石，可用來判斷地層年代。例如三葉蟲代表**古生代**、菊石代表**中生代**。",
          },
          {
            front: "什麼是「指相化石」？",
            back: "能指示當時環境的化石，例如珊瑚代表**溫暖清澈的淺海**。",
          },
          {
            front: "地質年代由老到新怎麼排？",
            back: "前寒武紀 → 古生代 → 中生代 → 新生代。",
          },
          {
            front: "地球大約幾歲？",
            back: "約 **46 億年**。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("h1"), q("h2"), q("h3"), q("h4"), q("h5"), q("h7")],
      },
    ],
  },
  {
    id: "earth.junior.weather-map",
    title: "天氣圖解讀：氣壓、鋒面與颱風",
    grade: 9,
    minutes: 15,
    nodeIds: [n("weather-elements"), n("clouds"), n("fronts"), n("taiwan-weather"), n("forecast")],
    objectives: [
      "說明高氣壓、低氣壓的風向與天氣",
      "看懂地面天氣圖上的等壓線與鋒面符號",
      "認識影響臺灣的天氣系統：寒流、梅雨、颱風",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：天氣的組成",
        root: {
          id: "wx",
          title: "天氣",
          children: [
            {
              id: "wx-p",
              title: "氣壓與風",
              summary: "風由高壓吹向低壓；等壓線越密風越強。",
              children: [
                { id: "wx-h", title: "高氣壓", summary: "下沉氣流，天氣多晴朗。" },
                { id: "wx-l", title: "低氣壓", summary: "上升氣流，容易成雲致雨。" },
              ],
            },
            {
              id: "wx-w",
              title: "水氣與雲雨",
              summary: "空氣上升冷卻到露點以下，水氣凝結成雲。",
            },
            {
              id: "wx-f",
              title: "氣團與鋒面",
              summary: "冷、暖氣團交界處常有雲雨：冷鋒、暖鋒、滯留鋒。",
            },
            {
              id: "wx-tw",
              title: "臺灣四季天氣",
              summary: "冬季東北季風與寒流、春末夏初梅雨、夏秋颱風與午後雷陣雨。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "看懂天氣圖",
        prompt: "這是一張冬季東亞地面天氣圖（示意）。點擊熱點認識圖上的符號。",
        viewBox: "0 0 400 300",
        scene: weatherScene,
        mode: "explore",
        spots: [
          {
            id: "high",
            x: 110,
            y: 78,
            title: "高氣壓（H）",
            body: "冬季強大的**大陸冷高壓**。中心氣壓約 1040 百帕，空氣下沉、乾冷晴朗；北半球的風以順時針方向向外吹出。",
          },
          {
            id: "low",
            x: 345,
            y: 62,
            title: "低氣壓（L）",
            body: "中心氣壓比四周低，空氣以逆時針方向向中心吹入並上升，容易形成雲雨。",
          },
          {
            id: "front",
            x: 284,
            y: 123,
            title: "冷鋒",
            body: "藍色線加上三角形的符號，三角形指向鋒面前進的方向。冷鋒通過時常有短暫降雨，過境後氣溫下降、氣壓上升。",
          },
          {
            id: "dense",
            x: 170,
            y: 100,
            title: "等壓線密集處",
            body: "等壓線是氣壓相等的點連成的線，通常每 4 百帕畫一條。線越密，氣壓梯度越大，**風越強**。",
          },
          {
            id: "taiwan",
            x: 208,
            y: 204,
            title: "臺灣",
            body: "冷高壓南下時，臺灣吹**東北季風**：北部與東北部迎風面多雲有雨，中南部背風面較乾燥。若臺北測站最低氣溫降到 10°C 以下，中央氣象署稱為寒流。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "match",
        title: "配對：天氣系統與臺灣的天氣",
        pairs: [
          { id: "m1", left: "冷鋒過境", right: "短暫降雨後氣溫下降、氣壓上升" },
          { id: "m2", left: "梅雨鋒面（滯留鋒）", right: "5～6 月連續多日的降雨" },
          { id: "m3", left: "颱風", right: "夏秋季的強風豪雨" },
          { id: "m4", left: "太平洋高壓籠罩", right: "夏季晴朗炎熱，午後常有雷陣雨" },
          { id: "m5", left: "強烈大陸冷高壓南下", right: "冬季寒流，氣溫驟降" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：判讀一張天氣圖",
        problem: "看著上面的天氣圖，推測明天臺灣北部的天氣。",
        steps: [
          {
            show: "找出高、低氣壓：大陸上是 H（冷高壓），日本附近是 L（低氣壓）。",
            why: "H 表示高氣壓、L 表示低氣壓。",
          },
          {
            show: "找出鋒面：從 L 延伸到臺灣北方的是**冷鋒**（藍線加三角形）。",
            predict: {
              question: "藍色線加三角形代表什麼？",
              choices: ["冷鋒", "暖鋒", "滯留鋒"],
              answer: 0,
            },
          },
          {
            show: "判斷風向：風由高壓吹向低壓，並繞著高壓順時針吹出，臺灣附近吹**東北風**。",
            predict: {
              question: "臺灣附近吹什麼風？",
              choices: ["東北風", "西南風", "東南風"],
              answer: 0,
            },
          },
          {
            show: "冷鋒往東南移動，即將通過臺灣：北部會先下雨，鋒面過後氣溫明顯下降。",
            why: "冷鋒過境後由冷氣團籠罩。",
          },
          { show: "結論：明天北部轉為**有雨、溫度下降**，外出記得帶傘與外套。" },
        ],
        takeaway: "讀天氣圖的順序：**找 H／L → 找鋒面 → 判斷風向與風力 → 推測天氣變化**。",
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：氣象主播解讀颱風路徑",
        scenarioId: "earth.junior.s-typhoon",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w1"), q("w2"), q("w3"), q("w4"), q("w7")],
      },
    ],
  },
  {
    id: "earth.junior.ocean",
    title: "海洋：洋流、波浪與潮汐",
    grade: 9,
    minutes: 12,
    nodeIds: [n("currents"), n("waves"), n("tides")],
    objectives: [
      "說明潮汐的成因，以及大潮、小潮與月相的關係",
      "分辨暖流與寒流，認識流經臺灣的黑潮",
      "了解波浪傳遞的是能量而不是海水",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：潮起潮落",
        prompt: "拉動時間讓地球自轉，再改變月球位置，觀察臺灣的潮高如何變化。",
        load: tideLab,
        insight:
          "月球的引力在地球**面向月球**與**背向月球**的兩側各造成一個海水隆起；太陽也有類似但較小的作用。新月、滿月時兩者疊加形成大潮，上弦、下弦時互相抵消一部分形成小潮。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "暖流還是寒流？",
        prompt: "暖流由低緯度流向高緯度，寒流由高緯度流向低緯度。",
        buckets: [
          { id: "warm", label: "暖流" },
          { id: "cold", label: "寒流" },
        ],
        items: [
          { id: "c1", label: "黑潮（沿臺灣東岸北上）", bucket: "warm" },
          { id: "c2", label: "墨西哥灣流", bucket: "warm" },
          { id: "c3", label: "北大西洋洋流", bucket: "warm" },
          { id: "c4", label: "親潮（日本東北外海南下）", bucket: "cold" },
          { id: "c5", label: "加利福尼亞洋流", bucket: "cold" },
          { id: "c6", label: "秘魯洋流", bucket: "cold" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：明天幾點滿潮？",
        problem: "某漁港今天早上 6:00 滿潮。明天早上的滿潮大約是幾點？",
        steps: [
          {
            show: "月球繞地球的方向和地球自轉的方向相同，每天約前進 12 度。",
            why: "月球約 29.5 天繞地球一圈：$360^\\circ \\div 29.5 \\approx 12^\\circ$。",
          },
          {
            show: "地球要多轉約 50 分鐘，同一地點才會再次正對月球。所以一個「太陰日」約 24 小時 50 分。",
            predict: {
              question: "同一地點兩次正對月球，大約相隔多久？",
              choices: ["剛好 24 小時", "約 24 小時 50 分", "約 23 小時 10 分"],
              answer: 1,
            },
          },
          {
            show: "一天有兩次滿潮，間隔約 12 小時 25 分：今天下午約 18:25 會再滿潮一次。",
          },
          {
            show: "明天早上的滿潮約在 **6:50** 左右。",
            predict: {
              question: "明天早上滿潮約幾點？",
              choices: ["6:00", "6:50", "5:10"],
              answer: 1,
            },
          },
        ],
        takeaway: "滿潮、乾潮的時間**每天約延後 50 分鐘**，所以每天看潮汐表才安全。",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：海水的運動",
        cards: [
          { front: "表層洋流主要是由什麼推動的？", back: "**盛行風**長期吹拂海面。" },
          {
            front: "黑潮為什麼叫「黑」潮？",
            back: "水中浮游生物與雜質少、透明度高，陽光不易反射，看起來呈**深藍近黑**的顏色。",
          },
          {
            front: "波浪靠近海岸時為什麼會變高、破碎？",
            back: "水深變淺，波浪底部受海底摩擦而變慢，波浪變陡後破碎成碎浪。",
          },
          {
            front: "海嘯和一般波浪有什麼不同？",
            back: "海嘯多由**海底地震**造成，波長極長、傳播極快，到岸邊時水位暴漲，破壞力很大。",
          },
        ],
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：讀懂潮汐表",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-tide-1"), q("set-tide-2"), q("set-tide-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("o1"), q("o2"), q("o3"), q("o4")],
      },
    ],
  },
  {
    id: "earth.junior.sky",
    title: "天文：四季、月相與日月食",
    grade: 9,
    minutes: 15,
    nodeIds: [n("rotation"), n("seasons"), n("moon-phases"), n("eclipses"), n("solar-system")],
    objectives: [
      "以地軸傾斜與公轉解釋四季、太陽高度角與晝夜長短",
      "由日、地、月的相對位置推論月相",
      "說明日食與月食的成因",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：四季與太陽高度",
        prompt:
          "地軸傾斜 23.5°，地球公轉時太陽直射的緯度跟著改變。調整**地點緯度**與**公轉位置**，觀察正午太陽高度角與晝長。",
        params: [
          {
            key: "lat",
            label: "觀察地點（北緯）",
            min: 0,
            max: 66,
            step: 0.5,
            init: 25,
            unit: "°",
          },
          {
            key: "pos",
            label: "公轉位置（從春分起算）",
            min: 0,
            max: 345,
            step: 15,
            init: 0,
            unit: "°",
          },
        ],
        plot: {
          x: [0, 360],
          y: [0, 100],
          xLabel: "公轉位置（0 春分、90 夏至、180 秋分、270 冬至）",
          yLabel: "高度角（度）",
          fns: [{ label: "一年中的正午太陽高度角", f: (x, p) => noonAltitude(p.lat, x) }],
          points: (p) => [
            {
              x: p.pos,
              y: noonAltitude(p.lat, p.pos),
              label: `${noonAltitude(p.lat, p.pos).toFixed(1)}°`,
            },
          ],
          vlines: () => [
            { x: 90, label: "夏至", color: "#e11d48" },
            { x: 270, label: "冬至", color: "#2563eb" },
          ],
        },
        readouts: [
          {
            label: "日期",
            value: (p) => SOLAR_TERMS[p.pos] ?? dateOf(p.pos),
          },
          {
            label: "太陽直射",
            value: (p) => {
              const d = decl(p.pos);
              if (Math.abs(d) < 0.05) return "赤道";
              return `${d > 0 ? "北緯" : "南緯"} ${Math.abs(d).toFixed(1)}°`;
            },
          },
          {
            label: "正午太陽高度角",
            value: (p) => `${noonAltitude(p.lat, p.pos).toFixed(1)}°`,
          },
          {
            label: "白晝長度",
            value: (p) => {
              const h = dayLength(p.lat, p.pos);
              const hh = Math.floor(h);
              return `${hh} 小時 ${Math.round((h - hh) * 60)} 分`;
            },
          },
        ],
        goal: {
          text: "把地點設在**北回歸線（北緯 23.5°）**，找出正午太陽**直射頭頂**（高度角 90°）的那一天。",
          test: (p) => p.lat === 23.5 && Math.abs(decl(p.pos) - 23.5) < 0.01,
        },
        insight:
          "北回歸線一年只有**夏至**這天正午太陽直射頭頂。臺北（北緯 25°）在北回歸線以北，太陽永遠不會直射頭頂；夏至時正午高度角最大、白晝最長，冬至時最小、最短。",
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：月相變變變",
        prompt: "移動月球在軌道上的位置，比較俯視圖和從臺灣看到的月亮形狀。",
        load: moonLab,
        insight:
          "月球永遠有一半被太陽照亮，月相是**我們看到亮面的多少**。新月 → 上弦月（右半亮）→ 滿月 → 下弦月（左半亮），約 29.5 天循環一次。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：為什麼會有日食？",
        problem: "說明日食發生時日、地、月的位置，以及為什麼不是每個月都有日食。",
        steps: [
          {
            show: "月球本身不發光，會在背對太陽的一側拖出影子。",
          },
          {
            show: "當月球運行到太陽與地球**之間**，月影落到地球上，影子內的人就看到太陽被遮住，這就是日食。",
            predict: {
              question: "日食時，三者的排列是？",
              choices: ["太陽－月球－地球", "太陽－地球－月球", "月球－太陽－地球"],
              answer: 0,
            },
          },
          {
            show: "月球在太陽與地球之間，正是**新月（朔）**的位置，所以日食只會發生在農曆初一前後。",
            predict: {
              question: "日食會發生在哪一種月相？",
              choices: ["新月", "上弦月", "滿月"],
              answer: 0,
            },
          },
          {
            show: "但月球公轉軌道面和地球公轉軌道面約夾 **5 度**，大多數的朔，月影會從地球的上方或下方經過。",
            why: "只有朔剛好發生在兩個軌道面的交點附近時，才會出現日食。",
          },
          {
            show: "同理，月食發生在**滿月（望）**時，地球位於太陽與月球之間，月球進入地球的影子。",
          },
        ],
        takeaway:
          "日食：太陽－月球－地球（朔）；月食：太陽－地球－月球（望）。軌道面夾約 5 度，所以日月食不是每個月都有。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：月相的位置",
        task: "在畫布中央畫地球，右邊標出太陽光的方向。在地球周圍畫出月球的 8 個位置，並在旁邊畫出從地球看到的月相形狀（新月、眉月、上弦月、盈凸月、滿月、虧凸月、下弦月、殘月）。",
        background: "dots",
        hint: "先畫出每個位置的月球都是「朝向太陽的半邊亮」，再想像站在地球上看過去，會看到多少亮面。",
        reference:
          "太陽在右方時：月球在地球與太陽之間是**新月**；依逆時針方向轉 90 度到地球上方是**上弦月**（右半亮）；轉到地球左側（背對太陽）是**滿月**；再到地球下方是**下弦月**（左半亮）。中間依序是眉月、盈凸月、虧凸月、殘月。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "drag",
        mode: "order",
        title: "排一排：八大行星",
        prompt: "依照**離太陽由近到遠**的順序排列。",
        items: [
          { id: "mercury", label: "水星" },
          { id: "venus", label: "金星" },
          { id: "earth", label: "地球" },
          { id: "mars", label: "火星" },
          { id: "jupiter", label: "木星" },
          { id: "saturn", label: "土星" },
          { id: "uranus", label: "天王星" },
          { id: "neptune", label: "海王星" },
        ],
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("a1"), q("a2"), q("a4"), q("a6"), q("a7"), q("a8")],
      },
    ],
  },
];

export default lessons;
