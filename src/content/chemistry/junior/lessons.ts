import type { Lesson } from "../../types";

const atomLab = () => import("../labs/AtomBuilderLab");
const balanceLab = () => import("../labs/BalanceLab");
const rateLab = () => import("../labs/RateLab");
const distillScene = () => import("../scenes/DistillationScene");
const rustScene = () => import("../scenes/RustScene");
const ptBase = () => import("../scenes/periodicLayers").then((m) => ({ default: m.Base }));
const ptMetals = () => import("../scenes/periodicLayers").then((m) => ({ default: m.Metals }));
const ptNonmetals = () =>
  import("../scenes/periodicLayers").then((m) => ({ default: m.Nonmetals }));
const ptFamilies = () => import("../scenes/periodicLayers").then((m) => ({ default: m.Families }));

const q = (s: string) => `chemistry.junior.q-${s}`;
const n = (s: string) => `chemistry.junior.${s}`;

/** 食鹽在 25 °C 時的溶解度約為每 100 g 水 36 g */
const SALT_SOLUBILITY = 0.36;
const dissolved = (s: number, w: number) => Math.min(s, SALT_SOLUBILITY * w);

/** 20 mL 鹽酸 + V mL 同濃度（0.1 M）氫氧化鈉的 pH */
function neutralPH(v: number): number {
  const d = (0.1 * 20 - 0.1 * v) / (20 + v);
  if (d >= 0) return -Math.log10((d + Math.sqrt(d * d + 4e-14)) / 2);
  const oh = (-d + Math.sqrt(d * d + 4e-14)) / 2;
  return -Math.log10(1e-14 / oh);
}

const lessons: Lesson[] = [
  {
    id: n("substances"),
    title: "物質的分類、分離與濃度",
    grade: 8,
    minutes: 14,
    nodeIds: [n("pure-mixture"), n("element-compound"), n("separation"), n("concentration")],
    objectives: [
      "能區分純物質與混合物、元素與化合物",
      "能說出蒸餾裝置各部位的功能與安全注意事項",
      "能計算重量百分濃度並配製指定濃度的溶液",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：物質的分類",
        prompt: "點選每個節點，看看物質是怎麼一層一層分類的。",
        root: {
          id: "matter",
          title: "物質",
          children: [
            {
              id: "pure",
              title: "純物質",
              summary: "只由一種物質組成，有固定的組成與性質，例如固定的熔點與沸點。",
              children: [
                {
                  id: "element",
                  title: "元素",
                  summary:
                    "只含一種原子，無法再用化學方法分解。例：$\\ce{O2}$、$\\ce{Fe}$、鑽石（$\\ce{C}$）。",
                },
                {
                  id: "compound",
                  title: "化合物",
                  summary:
                    "由兩種以上元素以固定比例化合而成，可用化學方法分解。例：$\\ce{H2O}$、$\\ce{CO2}$、$\\ce{NaCl}$。",
                },
              ],
            },
            {
              id: "mixture",
              title: "混合物",
              summary:
                "由兩種以上物質混合，各成分保有原來的性質，組成比例不固定，可用物理方法分離。",
              children: [
                {
                  id: "homo",
                  title: "均勻混合物",
                  summary: "各部分的組成都相同，例如空氣、糖水、不鏽鋼（合金）。",
                },
                {
                  id: "hetero",
                  title: "不均勻混合物",
                  summary: "各部分的組成不同，例如泥水、花崗岩。",
                },
              ],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "分類挑戰：元素、化合物、混合物",
        prompt: "把每張卡片拖到正確的分類。提示：先想「是不是只有一種物質」，再想「含幾種元素」。",
        buckets: [
          { id: "element", label: "元素" },
          { id: "compound", label: "化合物" },
          { id: "mixture", label: "混合物" },
        ],
        items: [
          { id: "o2", label: "氧氣 $\\ce{O2}$", bucket: "element" },
          { id: "cu", label: "銅 $\\ce{Cu}$", bucket: "element" },
          { id: "diamond", label: "鑽石", bucket: "element" },
          { id: "he", label: "氦氣", bucket: "element" },
          { id: "water", label: "水 $\\ce{H2O}$", bucket: "compound" },
          { id: "co2", label: "二氧化碳 $\\ce{CO2}$", bucket: "compound" },
          { id: "nacl", label: "氯化鈉 $\\ce{NaCl}$", bucket: "compound" },
          { id: "sugar", label: "葡萄糖", bucket: "compound" },
          { id: "air", label: "空氣", bucket: "mixture" },
          { id: "sea", label: "海水", bucket: "mixture" },
          { id: "soda", label: "汽水", bucket: "mixture" },
          { id: "steel", label: "不鏽鋼", bucket: "mixture" },
        ],
      },
      {
        id: "a3",
        kind: "hotspot",
        title: "蒸餾裝置大解析",
        prompt:
          "蒸餾是利用**沸點不同**來分離混合物。點擊每個熱點，認識各部位的功能與安全注意事項。",
        viewBox: "0 0 480 320",
        scene: distillScene,
        mode: "explore",
        spots: [
          {
            id: "thermo",
            x: 110,
            y: 128,
            title: "溫度計",
            body: "感溫球（液泡）要放在**蒸餾瓶支管口**附近，測量即將進入冷凝管的蒸氣溫度，也就是餾出物的沸點。",
          },
          {
            id: "chips",
            x: 111,
            y: 222,
            title: "沸石",
            body: "加熱前先放入 2～3 粒沸石（碎瓷片），防止液體**突沸**而噴出。若忘了放，要先停止加熱、等液體冷卻後才能補放。",
          },
          {
            id: "condenser",
            x: 258,
            y: 187,
            title: "冷凝管",
            body: "蒸氣在內管中被外管的冷水冷卻，凝結成液體。冷水和蒸氣在不同的管子裡，彼此不會混合。",
          },
          {
            id: "water-in",
            x: 315,
            y: 250,
            title: "冷卻水入口",
            body: "冷卻水要**下進上出**：從低的一端流入、高的一端流出，冷凝管才會充滿水，冷卻效果最好。",
          },
          {
            id: "receiver",
            x: 372,
            y: 278,
            title: "錐形瓶（接收器）",
            body: "收集到的液體叫做**餾出液**。蒸餾海水時，水先變成蒸氣被收集，食鹽留在蒸餾瓶中。",
          },
          {
            id: "heat",
            x: 110,
            y: 277,
            title: "加熱與安全",
            body: "墊陶瓷纖維網使燒瓶均勻受熱；瓶內液體**不可蒸乾**，以免燒瓶破裂。酒精燈要用燈帽蓋熄，不可用嘴吹，也不可拿一盞酒精燈去點另一盞。",
          },
        ],
      },
      {
        id: "a4",
        kind: "slider",
        title: "拉桿實驗：配製食鹽水",
        prompt:
          "改變食鹽和水的質量，觀察重量百分濃度。注意：25 °C 時每 100 g 水最多只能溶解約 36 g 食鹽。",
        params: [
          { key: "s", label: "食鹽（溶質）", min: 0, max: 60, step: 1, init: 10, unit: "g" },
          { key: "w", label: "水（溶劑）", min: 20, max: 200, step: 5, init: 100, unit: "g" },
        ],
        plot: {
          x: [0, 60],
          y: [0, 40],
          xLabel: "加入的食鹽（g）",
          yLabel: "濃度（%）",
          fns: [
            {
              label: "目前水量下的濃度",
              f: (x, p) => (dissolved(x, p.w) / (dissolved(x, p.w) + p.w)) * 100,
            },
          ],
          points: (p) => {
            const d = dissolved(p.s, p.w);
            return [
              { x: p.s, y: (d / (d + p.w)) * 100, label: `${((d / (d + p.w)) * 100).toFixed(1)}%` },
            ];
          },
        },
        readouts: [
          { label: "溶液質量", value: (p) => `${dissolved(p.s, p.w) + p.w} g` },
          {
            label: "重量百分濃度",
            value: (p) => {
              const d = dissolved(p.s, p.w);
              return `${((d / (d + p.w)) * 100).toFixed(1)}%`;
            },
          },
          {
            label: "狀態",
            value: (p) => (p.s > SALT_SOLUBILITY * p.w ? "飽和（杯底有未溶解的鹽）" : "未飽和"),
          },
        ],
        goal: {
          text: "配製 **100 g、濃度 20%** 的食鹽水。",
          test: (p) => p.s === 20 && p.w === 80,
        },
        insight:
          "重量百分濃度 = 溶質質量 ÷ **溶液**質量 × 100%。20 g 食鹽 + 80 g 水 = 100 g 溶液，濃度 20%。若用 20 g 食鹽 + 100 g 水，濃度只有約 16.7%！",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m3"), q("m6")],
      },
    ],
  },
  {
    id: n("atoms-periodic"),
    title: "原子結構與週期表",
    grade: 8,
    minutes: 13,
    nodeIds: [n("atom-model"), n("isotope"), n("periodic"), n("symbol")],
    objectives: [
      "能說出原子由質子、中子、電子組成及各自的帶電性",
      "能由質子數判斷元素，並區分同位素與離子",
      "能說出週期表中族、週期與金屬、非金屬的分布",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "原子積木：組出指定的粒子",
        prompt: "拉動拉桿改變質子、中子、電子的數目，看看原子會變成什麼。",
        load: atomLab,
        insight:
          "**質子數（原子序）決定元素種類**；質子數相同、中子數不同的原子互為**同位素**（如碳-12 與碳-14），化學性質幾乎相同。原子失去電子成為帶正電的陽離子，得到電子成為帶負電的陰離子。",
      },
      {
        id: "a2",
        kind: "layers",
        title: "圖層疊加：週期表的地圖",
        prompt: "週期表就像一張元素地圖。逐一打開圖層，看看金屬、非金屬與重要的族在哪裡。",
        viewBox: "0 0 640 290",
        base: ptBase,
        layers: [
          {
            id: "metals",
            label: "金屬元素",
            load: ptMetals,
            color: "#60a5fa",
            note: "金屬佔了週期表的大部分，位於左方與中間。金屬有光澤、能導電導熱、有延展性。",
          },
          {
            id: "nonmetals",
            label: "非金屬與類金屬",
            load: ptNonmetals,
            color: "#fbbf24",
            note: "非金屬（黃）多在右上方，**氫是位於左上角的非金屬**。黑色階梯線是金屬與非金屬的大致分界，線旁的硼、矽、鍺、砷（灰）性質介於兩者之間，稱為類金屬。",
          },
          {
            id: "families",
            label: "重要的族",
            load: ptFamilies,
            color: "#16a34a",
            note: "同族元素最外層電子數相同，化學性質相似。鹼金屬遇水劇烈反應；鹵素是活潑的非金屬；惰性氣體很不活潑。",
          },
        ],
        check: {
          stem: "週期表中，**鹵素**位於哪一族？",
          choices: ["第 1 族", "第 2 族", "第 17 族", "第 18 族"],
          answer: 2,
          explain: "鹵素（氟、氯、溴、碘…）位於第 17 族；第 18 族是惰性氣體。",
        },
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：元素符號",
        prompt: "翻開兩張牌，配對元素名稱和元素符號。",
        pairs: [
          ["鈉", "Na"],
          ["鉀", "K"],
          ["鈣", "Ca"],
          ["鐵", "Fe"],
          ["銅", "Cu"],
          ["銀", "Ag"],
        ],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("a1"), q("a2"), q("a3"), q("a5"), q("a7")],
      },
    ],
  },
  {
    id: n("equations"),
    title: "化學反應式、質量守恆與莫耳",
    grade: 8,
    minutes: 15,
    nodeIds: [n("conservation"), n("equation"), n("mole")],
    objectives: [
      "理解化學反應是原子的重新排列，遵守質量守恆定律",
      "能平衡簡單的化學反應式",
      "能用莫耳換算物質的質量與粒子數",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "係數天平：平衡化學反應式",
        prompt: "調整每種物質前面的係數，讓箭頭兩邊每一種原子的數目都相等。",
        load: balanceLab,
        insight:
          "平衡反應式只能改**係數**，不能改化學式的下標（改了下標就變成別的物質）。係數代表粒子數目的比，也就是**莫耳數比**：$\\ce{2H2 + O2 -> 2H2O}$ 表示 2 mol 氫氣與 1 mol 氧氣反應，生成 2 mol 水。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：莫耳的換算",
        problem:
          "36 g 的水（$\\ce{H2O}$）是多少莫耳？含有多少個水分子？要生成這些水，需要多少克氫氣與氧氣？（原子量 H = 1，O = 16）",
        steps: [
          {
            show: "水的分子量 = $1 \\times 2 + 16 = 18$",
            why: "分子量 = 分子中所有原子的原子量總和。",
            predict: { question: "水的分子量是多少？", choices: ["17", "18", "34"], answer: 1 },
          },
          {
            show: "莫耳數 = $36 \\div 18 = 2$ mol",
            why: "莫耳數 = 質量 ÷ 分子量。",
          },
          {
            show: "分子數 = $2 \\times 6 \\times 10^{23} = 1.2 \\times 10^{24}$ 個",
            why: "1 莫耳約含 $6 \\times 10^{23}$ 個粒子。",
            predict: {
              question: "2 mol 的水約含幾個水分子？",
              choices: ["$2$ 個", "$1.2 \\times 10^{24}$ 個", "$3 \\times 10^{23}$ 個"],
              answer: 1,
            },
          },
          {
            show: "由 $\\ce{2H2 + O2 -> 2H2O}$：生成 2 mol 水需要 2 mol 氫氣（4 g）和 1 mol 氧氣（32 g）。",
            why: "係數比就是莫耳數比：$\\ce{H2} : \\ce{O2} : \\ce{H2O} = 2 : 1 : 2$。",
          },
          {
            show: "檢查：$4 + 32 = 36$ g，反應前後質量相等 ✓",
            why: "這正是質量守恆定律。",
          },
        ],
        takeaway: "**莫耳數 = 質量 ÷ 分子量**；反應式的係數比 = 莫耳數比（不是質量比）。",
      },
      {
        id: "a3",
        kind: "canvas",
        title: "動手畫：反應前後的粒子模型",
        task: "用不同顏色的圓圈代表氫原子和氧原子，畫出 $\\ce{2H2 + O2 -> 2H2O}$ 反應前與反應後的粒子模型，並數一數兩邊各有幾個 H 原子、幾個 O 原子。",
        background: "dots",
        hint: "反應前有 2 個 $\\ce{H2}$ 分子和 1 個 $\\ce{O2}$ 分子；反應後原子重新組合成水分子。",
        reference:
          "反應前：2 個 $\\ce{H2}$（4 個 H）+ 1 個 $\\ce{O2}$（2 個 O）；反應後：2 個 $\\ce{H2O}$（4 個 H、2 個 O）。原子只是**重新排列**，種類與數目都不變，所以質量守恆；但分子數由 3 個變成 2 個。",
        aiFeedback: true,
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：廚房裡的化學",
        scenarioId: "chemistry.junior.s-kitchen",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("r1"), q("r2"), q("r3"), q("r4")],
      },
    ],
  },
  {
    id: n("redox"),
    title: "氧化與還原：燃燒、活性與生鏽",
    grade: 8,
    minutes: 13,
    nodeIds: [n("oxidation"), n("activity"), n("rust")],
    objectives: [
      "能由得失氧判斷氧化與還原反應",
      "能依元素對氧的活性大小推測反應能否發生",
      "能說明鐵生鏽的條件與防鏽方法",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "order",
        title: "排排看：金屬對氧的活性",
        prompt: "把下列金屬依照對氧的活性**由大到小**排列。提示：越容易燃燒、越容易生鏽的越活潑。",
        items: [
          { id: "k", label: "鉀" },
          { id: "mg", label: "鎂" },
          { id: "zn", label: "鋅" },
          { id: "fe", label: "鐵" },
          { id: "cu", label: "銅" },
          { id: "au", label: "金" },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：碳與氧化銅的反應",
        problem:
          "把黑色的氧化銅粉末和碳粉混合加熱，產生紅色的銅，並放出能使澄清石灰水變混濁的氣體。請分析這個反應。",
        steps: [
          {
            show: "反應式：$\\ce{2CuO + C -> 2Cu + CO2}$",
            why: "能使澄清石灰水變混濁的氣體是二氧化碳。",
            predict: {
              question: "產生的氣體是什麼？",
              choices: ["氧氣", "二氧化碳", "氫氣"],
              answer: 1,
            },
          },
          {
            show: "碳**得到氧**變成 $\\ce{CO2}$ → 碳被氧化，是**還原劑**。",
            predict: { question: "哪一個物質被氧化？", choices: ["氧化銅", "碳", "銅"], answer: 1 },
          },
          {
            show: "氧化銅**失去氧**變成銅 → 氧化銅被還原，是**氧化劑**。",
            why: "氧化與還原一定同時發生。",
          },
          {
            show: "碳能搶走氧化銅中的氧，因為**碳對氧的活性比銅大**。",
            why: "同樣的道理，高爐煉鐵用焦炭產生的一氧化碳來還原氧化鐵：$\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$。",
          },
        ],
        takeaway: "得氧 = 氧化、失氧 = 還原；活性大的元素能從活性小的元素的氧化物中奪取氧。",
      },
      {
        id: "a3",
        kind: "hotspot",
        title: "鐵釘生鏽的對照實驗",
        prompt: "四支試管放了相同的鐵釘，一週後觀察。點擊每支試管，找出鐵生鏽需要的條件。",
        viewBox: "0 0 480 300",
        scene: rustScene,
        mode: "explore",
        spots: [
          {
            id: "dry",
            x: 90,
            y: 140,
            title: "甲：乾燥空氣",
            body: "試管中放乾燥劑（如無水氯化鈣）並塞緊，只有空氣、**沒有水**。結果：鐵釘**不生鏽**。",
          },
          {
            id: "boiled",
            x: 190,
            y: 165,
            title: "乙：煮沸過的水＋油層",
            body: "水煮沸可趕走溶在水中的氧氣，上層的油防止空氣再溶入，只有水、**幾乎沒有氧氣**。結果：鐵釘**幾乎不生鏽**。",
          },
          {
            id: "half",
            x: 290,
            y: 150,
            title: "丙：水和空氣都有",
            body: "鐵釘同時接觸水和氧氣，會生鏽，而且**在水面附近**最明顯。結論：鐵生鏽需要**水和氧氣同時存在**。",
          },
          {
            id: "salt",
            x: 390,
            y: 170,
            title: "丁：食鹽水",
            body: "食鹽水是電解質溶液，會**加快**鐵生鏽，所以海邊的鐵製品特別容易生鏽。",
          },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：生活中的氧化還原",
        prompt: "先想想看，再刮開看答案。",
        cards: [
          {
            front: "暖暖包為什麼會發熱？",
            back: "包裡的**鐵粉緩慢氧化**（類似生鏽）放出熱量；食鹽和活性碳能加快反應。",
          },
          {
            front: "鍍鋅鐵（白鐵）為什麼不容易生鏽？",
            back: "鋅的活性比鐵大，會**先被氧化**，因此保護了裡面的鐵。",
          },
          {
            front: "切開的蘋果放久了為什麼會變褐色？",
            back: "果肉中的酚類物質接觸空氣後**被氧化**，生成褐色物質。泡鹽水或檸檬汁可以減緩。",
          },
          {
            front: "鎂帶點燃後放進二氧化碳中，會繼續燃燒嗎？",
            back: "會！鎂的活性很大，能奪取 $\\ce{CO2}$ 中的氧：$\\ce{2Mg + CO2 -> 2MgO + C}$，所以鎂著火不能用二氧化碳滅火器撲滅。",
          },
        ],
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
    id: n("acids-bases"),
    title: "酸鹼鹽與 pH",
    grade: 8,
    minutes: 14,
    nodeIds: [n("acid-base-property"), n("ph"), n("neutralization")],
    objectives: [
      "能以指示劑與 pH 值判斷溶液的酸鹼性",
      "理解酸鹼中和生成鹽和水，並會放出熱量",
      "能說出強酸濺到皮膚時的正確處理方式",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "分類挑戰：生活中的酸鹼",
        prompt: "把生活中常見的水溶液，拖到正確的酸鹼性分類。",
        buckets: [
          { id: "acid", label: "酸性（pH < 7）" },
          { id: "neutral", label: "中性（pH = 7）" },
          { id: "base", label: "鹼性（pH > 7）" },
        ],
        items: [
          { id: "lemon", label: "檸檬汁", bucket: "acid" },
          { id: "vinegar", label: "食醋", bucket: "acid" },
          { id: "gastric", label: "胃液", bucket: "acid" },
          { id: "soda", label: "汽水", bucket: "acid" },
          { id: "water", label: "純水", bucket: "neutral" },
          { id: "salt", label: "食鹽水", bucket: "neutral" },
          { id: "sugar", label: "糖水", bucket: "neutral" },
          { id: "soap", label: "肥皂水", bucket: "base" },
          { id: "baking", label: "小蘇打水", bucket: "base" },
          { id: "lime", label: "石灰水", bucket: "base" },
          { id: "ammonia", label: "氨水", bucket: "base" },
        ],
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿實驗：酸鹼中和",
        prompt:
          "錐形瓶中有 20 mL 鹽酸和幾滴酚酞，逐漸加入**相同濃度**的氫氧化鈉溶液，觀察 pH 值與顏色的變化。",
        params: [
          { key: "v", label: "加入的氫氧化鈉溶液", min: 0, max: 40, step: 1, init: 0, unit: "mL" },
        ],
        plot: {
          x: [0, 40],
          y: [0, 14],
          xLabel: "加入的 NaOH（mL）",
          yLabel: "pH",
          fns: [{ label: "pH 變化", f: (x) => neutralPH(x) }],
          points: (p) => [{ x: p.v, y: neutralPH(p.v), label: `pH ${neutralPH(p.v).toFixed(1)}` }],
        },
        readouts: [
          { label: "pH 值", value: (p) => neutralPH(p.v).toFixed(2) },
          {
            label: "酚酞顏色",
            value: (p) => (neutralPH(p.v) < 8.2 ? "無色" : "紅色"),
          },
          {
            label: "溶液性質",
            value: (p) => {
              const ph = neutralPH(p.v);
              return ph < 6.9 ? "酸性" : ph > 7.1 ? "鹼性" : "中性";
            },
          },
        ],
        goal: {
          text: "加入恰好的氫氧化鈉，使溶液變成**中性**（pH = 7）。",
          test: (p) => p.v === 20,
        },
        insight:
          "鹽酸和氫氧化鈉濃度相同，加入 20 mL 時恰好完全中和：$\\ce{HCl + NaOH -> NaCl + H2O}$。接近中和點時，只要多加一點點鹼，pH 就會急遽上升，酚酞也從無色變成紅色。",
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：常見的酸、鹼、鹽",
        pairs: [
          ["鹽酸", "$\\ce{HCl}$"],
          ["硫酸", "$\\ce{H2SO4}$"],
          ["醋酸", "$\\ce{CH3COOH}$"],
          ["氫氧化鈉", "$\\ce{NaOH}$"],
          ["氫氧化鈣", "$\\ce{Ca(OH)2}$"],
          ["碳酸氫鈉（小蘇打）", "$\\ce{NaHCO3}$"],
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：鹽酸濺到手了！",
        scenarioId: "chemistry.junior.s-lab-safety",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("b1"), q("b2"), q("b4"), q("b5"), q("b7")],
      },
    ],
  },
  {
    id: n("rate-organic"),
    title: "反應速率、平衡與有機化合物",
    grade: 8,
    minutes: 15,
    nodeIds: [n("rate-factors"), n("equilibrium"), n("hydrocarbon"), n("functional")],
    objectives: [
      "能用碰撞學說解釋溫度、濃度、催化劑對反應速率的影響",
      "理解可逆反應與動態平衡",
      "認識常見的有機化合物與酯化反應",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "碰撞實驗室：讓反應快一點",
        prompt:
          "紅色的 A 和藍色的 B 碰撞時，能量夠大才會變成紫色的產物 C。改變溫度、濃度或加入催化劑，觀察反應快慢。",
        load: rateLab,
        insight:
          "**碰撞學說**：粒子必須碰撞，而且能量夠大（超過活化能）才會反應。溫度升高 → 粒子更快、有效碰撞比例變大；濃度變大 → 碰撞次數變多；催化劑 → 降低活化能。三者都能加快反應。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：影響反應速率的因素",
        prompt: "把生活中的例子拖到對應的因素旁。",
        pairs: [
          { id: "temp", left: "溫度", right: "食物放冰箱可以保存比較久" },
          { id: "conc", left: "濃度", right: "線香在純氧中燃燒得比在空氣中劇烈" },
          { id: "area", left: "接觸面積", right: "木屑比整塊木頭容易點燃" },
          { id: "cat", left: "催化劑", right: "雙氧水加入二氧化錳迅速產生氧氣" },
          { id: "nature", left: "反應物的本性", right: "鈉在空氣中很快變暗，金卻能長久保持光澤" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：製造水果香味的酯",
        problem:
          "在試管中加入乙醇、乙酸和幾滴濃硫酸，以熱水浴加熱幾分鐘，再倒入冷水中，會聞到水果香味。這個實驗藏著哪些反應速率與平衡的觀念？",
        steps: [
          {
            show: "反應式：$\\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$（乙酸 + 乙醇 ⇌ 乙酸乙酯 + 水）",
            why: "有機酸與醇反應生成酯和水，稱為**酯化反應**。",
            predict: {
              question: "酸與醇反應，除了水之外還生成什麼？",
              choices: ["鹽", "酯", "烴"],
              answer: 1,
            },
          },
          {
            show: "濃硫酸是**催化劑**，能加快酯化反應。",
            predict: {
              question: "加入濃硫酸的主要目的？",
              choices: ["當作催化劑", "當作反應物", "讓溶液變成中性"],
              answer: 0,
            },
          },
          {
            show: "加熱能**提高反應速率**；用熱水浴而不直接用火加熱，是因為乙醇容易燃燒，比較安全。",
          },
          {
            show: "酯化反應是**可逆反應**，最後達到化學平衡，反應物和生成物同時存在，所以乙酸乙酯的產率不會是 100%。",
            why: "雙箭頭 $\\ce{<=>}$ 表示正、逆反應同時進行。",
          },
          {
            show: "倒入冷水後，乙酸乙酯不易溶於水且密度比水小，浮在水面上，散發水果香味。",
          },
        ],
        takeaway: "催化劑與加熱加快反應；可逆反應會達到**動態平衡**。酯類是許多水果香味的來源。",
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：生活中的有機化合物",
        pairs: [
          ["甲烷 $\\ce{CH4}$", "天然氣的主要成分"],
          ["乙醇 $\\ce{C2H5OH}$", "酒精，可用於消毒與當作燃料"],
          ["乙酸 $\\ce{CH3COOH}$", "食醋中酸味的來源"],
          ["乙酸乙酯", "有水果香味的酯類"],
          ["聚乙烯", "製作塑膠袋的聚合物"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("k1"), q("k2"), q("k5"), q("k6"), q("k8")],
      },
    ],
  },
];

export default lessons;
