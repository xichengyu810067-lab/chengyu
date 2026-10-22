import type { Lesson } from "../../types";

const gasLab = () => import("../labs/GasLab");
const titrationLab = () => import("../labs/TitrationLab");
const vseprScene = () => import("../scenes/VseprScene");
const titrationScene = () => import("../scenes/TitrationScene");
const ptBase = () => import("../scenes/periodicLayers").then((m) => ({ default: m.Base }));
const ptBlocks = () => import("../scenes/periodicLayers").then((m) => ({ default: m.Blocks }));
const ptRadius = () => import("../scenes/periodicLayers").then((m) => ({ default: m.RadiusTrend }));
const ptEN = () => import("../scenes/periodicLayers").then((m) => ({ default: m.ENTrend }));

const q = (s: string) => `chemistry.senior.q-${s}`;
const n = (s: string) => `chemistry.senior.${s}`;

/* ───────── 馬克士威－波茲曼能量分布（相對單位，kT = T） ───────── */

/** 互補誤差函數（Abramowitz & Stegun 7.1.26，x ≥ 0） */
function erfc(x: number): number {
  const t = 1 / (1 + 0.3275911 * x);
  const y =
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;
  return y * Math.exp(-x * x);
}
/** 能量分布函數 f(E) */
const mb = (e: number, t: number) =>
  e < 0 ? 0 : 2 * Math.sqrt(e / Math.PI) * t ** -1.5 * Math.exp(-e / t);
/** 能量 ≥ Ea 的分子比例 */
const above = (ea: number, t: number) => {
  const a = ea / t;
  return erfc(Math.sqrt(a)) + 2 * Math.sqrt(a / Math.PI) * Math.exp(-a);
};
const BASE_FRACTION = above(6, 1);

/* ───────── H2 + I2 ⇌ 2HI 的反應商 ───────── */
const K_HI = 50;
const quotient = (hi: number, h2: number, i2: number) => (hi * hi) / (h2 * i2);

const lessons: Lesson[] = [
  {
    id: n("mole-gas"),
    title: "莫耳、化學計量與氣體",
    grade: 10,
    minutes: 15,
    nodeIds: [n("mole"), n("stoichiometry"), n("gas")],
    objectives: [
      "能進行質量、莫耳數、粒子數之間的換算",
      "能判斷限量試劑並計算生成物的量",
      "能用理想氣體方程式 PV = nRT 分析氣體狀態的變化",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：莫耳是化學家的「打」",
        problem:
          "4.4 g 的二氧化碳（$\\ce{CO2}$）中含有多少莫耳分子？多少個分子？多少個氧原子？（C = 12，O = 16，$N_A = 6.02 \\times 10^{23}$）",
        steps: [
          {
            show: "莫耳質量：$M = 12 + 2 \\times 16 = 44$ g/mol",
            predict: {
              question: "$\\ce{CO2}$ 的莫耳質量是？",
              choices: ["28", "44", "60"],
              answer: 1,
            },
          },
          {
            show: "莫耳數：$n = \\frac{m}{M} = \\frac{4.4}{44} = 0.10$ mol",
            why: "莫耳數 = 質量 ÷ 莫耳質量。",
          },
          {
            show: "分子數：$0.10 \\times 6.02 \\times 10^{23} = 6.02 \\times 10^{22}$ 個",
            why: "粒子數 = 莫耳數 × 亞佛加厥數。",
          },
          {
            show: "氧原子數：每個 $\\ce{CO2}$ 有 2 個 O，共 $2 \\times 6.02 \\times 10^{22} = 1.204 \\times 10^{23}$ 個",
            predict: {
              question: "氧原子的莫耳數是多少？",
              choices: ["0.10 mol", "0.20 mol", "0.05 mol"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "**質量 ⇄ 莫耳數 ⇄ 粒子數**：除以莫耳質量、乘以亞佛加厥數。莫耳就像「一打」，只是數量是 $6.02 \\times 10^{23}$。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：誰先用完？限量試劑",
        problem:
          "將 4.0 g 氫氣與 16.0 g 氧氣混合點燃：$\\ce{2H2 + O2 -> 2H2O}$。哪一個是限量試劑？最多生成多少克水？（H = 1，O = 16）",
        steps: [
          {
            show: "換算莫耳數：$\\ce{H2}$ = $4.0 \\div 2 = 2.0$ mol；$\\ce{O2}$ = $16.0 \\div 32 = 0.50$ mol",
            why: "計量一定要先換成莫耳數，不能直接比較質量。",
          },
          {
            show: "0.50 mol $\\ce{O2}$ 需要 $0.50 \\times 2 = 1.0$ mol $\\ce{H2}$，而氫氣有 2.0 mol，足夠 → **氧氣是限量試劑**",
            predict: {
              question: "哪一個是限量試劑？",
              choices: ["氫氣（質量比較少）", "氧氣", "兩者剛好完全反應"],
              answer: 1,
            },
          },
          {
            show: "生成水：$0.50 \\times 2 = 1.0$ mol = 18 g",
            why: "由限量試劑計算產物：$\\ce{O2} : \\ce{H2O} = 1 : 2$。",
          },
          {
            show: "剩下氫氣 $2.0 - 1.0 = 1.0$ mol = 2.0 g；檢查 $4.0 + 16.0 = 18 + 2.0$ ✓",
            why: "質量守恆可用來驗算。",
          },
        ],
        takeaway: "比較「現有莫耳數 ÷ 係數」，比值最小的就是**限量試劑**，產物的量由它決定。",
      },
      {
        id: "a3",
        kind: "lab",
        title: "氣體粒子盒：PV = nRT",
        prompt: "推動活塞、加熱或灌入更多氣體，觀察粒子撞擊器壁的情形與壓力變化。",
        load: gasLab,
        insight:
          "氣體壓力來自粒子撞擊器壁。**體積變小**→ 撞擊更頻繁；**溫度升高**→ 粒子更快、撞得更用力也更頻繁；**粒子變多**→ 撞擊次數增加。三者整合成 $PV = nRT$。注意溫度要用**絕對溫度（K）**！",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：計量的關鍵數字",
        cards: [
          { front: "亞佛加厥數 $N_A$ = ?", back: "$6.02 \\times 10^{23}$ 個/mol" },
          {
            front: "0 °C、1 atm 下，1 mol 理想氣體的體積？",
            back: "約 **22.4 L**（25 °C、1 atm 下約 24.5 L）",
          },
          {
            front: "體積莫耳濃度的定義？",
            back: "$C_M = \\frac{\\text{溶質莫耳數}}{\\text{溶液體積（L）}}$，單位 M（mol/L）",
          },
          { front: "理想氣體常數 R = ?", back: "$0.082$ atm·L/(mol·K)" },
          {
            front: "產率怎麼算？",
            back: "$\\frac{\\text{實際產量}}{\\text{理論產量}} \\times 100\\%$",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("n1"), q("n3"), q("n4"), q("n5"), q("n6")],
      },
    ],
  },
  {
    id: n("atomic-structure"),
    title: "原子結構、電子組態與週期性",
    grade: 11,
    minutes: 15,
    nodeIds: [n("atom-structure"), n("electron-config"), n("radioactivity")],
    objectives: [
      "能依構築原理寫出原子的電子組態",
      "能由價電子組態判斷元素在週期表中的位置",
      "能說明原子半徑、游離能與電負度的週期趨勢",
      "認識放射性與原子核的衰變",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：週期表的趨勢地圖",
        prompt: "逐一打開圖層，觀察週期表的分區與各種性質的變化趨勢。",
        viewBox: "0 0 640 290",
        base: ptBase,
        layers: [
          {
            id: "blocks",
            label: "s、p、d 區",
            load: ptBlocks,
            color: "#93c5fd",
            note: "最後一個電子填入的軌域決定元素所在的區：第 1、2 族（與 He）為 s 區、第 13～18 族為 p 區、第 3～12 族為 d 區（過渡元素）。",
          },
          {
            id: "radius",
            label: "原子半徑趨勢",
            load: ptRadius,
            color: "#e11d48",
            note: "同族由上而下，電子層數增加 → 半徑變大。同週期由左而右，有效核電荷增加、電子被拉得更近 → 半徑變小。",
          },
          {
            id: "en",
            label: "電負度與游離能趨勢",
            load: ptEN,
            color: "#2563eb",
            note: "大致往**右上方**增大：氟的電負度最大。游離能在同週期由左而右大致增加（有 Be > B、N > O 等例外）；惰性氣體的游離能最大，一般不討論其電負度。",
          },
        ],
        check: {
          stem: "依圖層的趨勢，Li、Na、K、Br 中原子半徑最大的是？",
          choices: ["Li", "Na", "K", "Br"],
          answer: 2,
          explain:
            "K 在第 4 週期最左邊，電子層數最多且在同週期中半徑最大；Br 雖在第 4 週期，但位於右側，半徑較小。",
        },
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：鉀的電子組態",
        problem: "寫出鉀（K，原子序 19）的基態電子組態，並判斷它在週期表中的位置與常見離子。",
        steps: [
          {
            show: "依**構築原理**由低能量填起：1s → 2s → 2p → 3s → 3p → 4s → 3d …",
            predict: {
              question: "3p 填滿後，下一個電子填入哪裡？",
              choices: ["3d", "4s", "4p"],
              answer: 1,
            },
          },
          {
            show: "$1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,4s^1$（$2 + 2 + 6 + 2 + 6 + 1 = 19$）",
            why: "每個 s 副層最多 2 個電子、p 副層最多 6 個。",
          },
          {
            show: "簡寫為 $[\\mathrm{Ar}]\\,4s^1$：最外層主量子數 $n = 4$ → **第 4 週期**；價電子 $4s^1$ → **第 1 族（鹼金屬）**",
          },
          {
            show: "失去 4s 電子形成 $\\ce{K+}$，電子組態與氬相同，所以鉀常見 +1 價。",
            predict: {
              question: "$\\ce{K+}$ 的電子組態與哪一個惰性氣體相同？",
              choices: ["氖 Ne", "氬 Ar", "氪 Kr"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "價電子組態決定元素在週期表的位置與化學性質：$ns^1$ → 第 1 族、$ns^2np^5$ → 第 17 族。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "match",
        title: "配對：元素 ↔ 電子組態",
        prompt: "把電子組態拖到對應的元素旁。",
        pairs: [
          { id: "c", left: "碳 C（6）", right: "$[\\mathrm{He}]\\,2s^2\\,2p^2$" },
          { id: "o", left: "氧 O（8）", right: "$[\\mathrm{He}]\\,2s^2\\,2p^4$" },
          { id: "na", left: "鈉 Na（11）", right: "$[\\mathrm{Ne}]\\,3s^1$" },
          { id: "mg", left: "鎂 Mg（12）", right: "$[\\mathrm{Ne}]\\,3s^2$" },
          { id: "cl", left: "氯 Cl（17）", right: "$[\\mathrm{Ne}]\\,3s^2\\,3p^5$" },
          { id: "ar", left: "氬 Ar（18）", right: "$[\\mathrm{Ne}]\\,3s^2\\,3p^6$" },
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：與居禮夫人談放射性",
        scenarioId: "chemistry.senior.s-curie",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e3"), q("e5"), q("e7")],
      },
    ],
  },
  {
    id: n("bonding"),
    title: "化學鍵、分子形狀與有機分子",
    grade: 10,
    minutes: 15,
    nodeIds: [n("bonding"), n("shape"), n("functional-group")],
    objectives: [
      "能分辨離子鍵、共價鍵與金屬鍵",
      "能畫出簡單分子的路易斯結構",
      "能用 VSEPR 判斷分子形狀與極性",
      "認識常見的有機官能基",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "分類挑戰：物質中的化學鍵",
        prompt:
          "依物質中主要的化學鍵類型分類。提示：金屬 + 非金屬 → 離子鍵；非金屬 + 非金屬 → 共價鍵。",
        buckets: [
          { id: "ionic", label: "離子鍵" },
          { id: "covalent", label: "共價鍵" },
          { id: "metallic", label: "金屬鍵" },
        ],
        items: [
          { id: "nacl", label: "氯化鈉 $\\ce{NaCl}$", bucket: "ionic" },
          { id: "mgo", label: "氧化鎂 $\\ce{MgO}$", bucket: "ionic" },
          { id: "cacl2", label: "氯化鈣 $\\ce{CaCl2}$", bucket: "ionic" },
          { id: "h2o", label: "水 $\\ce{H2O}$", bucket: "covalent" },
          { id: "co2", label: "二氧化碳 $\\ce{CO2}$", bucket: "covalent" },
          { id: "ch4", label: "甲烷 $\\ce{CH4}$", bucket: "covalent" },
          { id: "diamond", label: "鑽石 $\\ce{C}$", bucket: "covalent" },
          { id: "cu", label: "銅 $\\ce{Cu}$", bucket: "metallic" },
          { id: "fe", label: "鐵 $\\ce{Fe}$", bucket: "metallic" },
          { id: "al", label: "鋁 $\\ce{Al}$", bucket: "metallic" },
        ],
      },
      {
        id: "a2",
        kind: "canvas",
        title: "動手畫：路易斯結構",
        task: "畫出 $\\ce{H2O}$、$\\ce{NH3}$ 與 $\\ce{CO2}$ 的路易斯結構（電子點式），用線或成對的點表示鍵結電子對，並標出每個原子的孤對電子。",
        background: "grid",
        hint: "先數價電子總數（$\\ce{H2O}$ 有 8 個、$\\ce{NH3}$ 有 8 個、$\\ce{CO2}$ 有 16 個），再讓 H 以外的原子周圍都有 8 個電子。",
        reference:
          "- $\\ce{H2O}$：O 有 2 個鍵結電子對、2 對孤對電子\n- $\\ce{NH3}$：N 有 3 個鍵結電子對、1 對孤對電子\n- $\\ce{CO2}$：$\\ce{O=C=O}$ 兩個雙鍵，C 沒有孤對電子，每個 O 各有 2 對孤對電子\n\n除了 H 只需 2 個電子，其他原子周圍都有 8 個電子（八隅體規則）。",
        aiFeedback: true,
      },
      {
        id: "a3",
        kind: "hotspot",
        title: "分子形狀博物館（VSEPR）",
        prompt: "中心原子周圍的電子對會彼此遠離。點擊每個分子，看看電子對如何決定形狀與極性。",
        viewBox: "0 0 500 300",
        scene: vseprScene,
        mode: "explore",
        spots: [
          {
            id: "co2",
            x: 24,
            y: 24,
            title: "二氧化碳：直線形",
            body: "中心 C 周圍有 **2 個電子對區域**（兩個雙鍵各算一區），相距最遠時成直線，鍵角 180°。兩個 C=O 鍵的極性互相抵消，$\\ce{CO2}$ 是**非極性分子**。",
          },
          {
            id: "bf3",
            x: 188,
            y: 24,
            title: "三氟化硼：平面三角形",
            body: "中心 B 形成 3 個 B–F 鍵、**沒有孤對電子**，排成平面三角形，鍵角 120°，是非極性分子。B 周圍只有 6 個電子，是八隅體規則的例外。",
          },
          {
            id: "ch4",
            x: 352,
            y: 24,
            title: "甲烷：四面體",
            body: "中心 C 有 4 個鍵結電子對，在空間中排成四面體，鍵角 109.5°，結構對稱，是非極性分子。（實心楔形表示朝向你、虛線表示遠離你。）",
          },
          {
            id: "nh3",
            x: 106,
            y: 180,
            title: "氨：三角錐形",
            body: "中心 N 有 3 個鍵結電子對和 **1 對孤對電子**。4 個電子對大致成四面體排列，但只看原子位置是三角錐形；孤對電子排斥力較大，使鍵角縮小為約 107°。$\\ce{NH3}$ 是極性分子。",
          },
          {
            id: "h2o",
            x: 272,
            y: 180,
            title: "水：角形",
            body: "中心 O 有 2 個鍵結電子對和 **2 對孤對電子**，分子呈角形，鍵角約 104.5°。分子不對稱，是極性分子，這也是水能溶解許多離子化合物的原因之一。",
          },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：有機官能基",
        prompt: "碳能形成四個共價鍵，接上不同的官能基就變成性質不同的有機物。",
        pairs: [
          ["羥基 $-\\mathrm{OH}$", "醇：乙醇 $\\ce{C2H5OH}$"],
          ["羧基 $-\\mathrm{COOH}$", "羧酸：乙酸 $\\ce{CH3COOH}$"],
          ["醛基 $-\\mathrm{CHO}$", "醛：甲醛 $\\ce{HCHO}$"],
          ["酯基 $-\\mathrm{COO}-$", "酯：乙酸乙酯 $\\ce{CH3COOC2H5}$"],
          ["胺基 $-\\mathrm{NH_2}$", "胺：甲胺 $\\ce{CH3NH2}$"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c3"), q("c5"), q("c8")],
      },
    ],
  },
  {
    id: n("energy-rate"),
    title: "反應熱與反應速率",
    grade: 11,
    minutes: 13,
    nodeIds: [n("thermo"), n("kinetics")],
    objectives: [
      "能分辨吸熱與放熱反應，並用赫斯定律計算反應熱",
      "能用能量分布與活化能解釋溫度和催化劑對反應速率的影響",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "分類挑戰：吸熱還是放熱？",
        buckets: [
          { id: "exo", label: "放熱（$\\Delta H < 0$）" },
          { id: "endo", label: "吸熱（$\\Delta H > 0$）" },
        ],
        items: [
          { id: "burn", label: "甲烷燃燒", bucket: "exo" },
          { id: "neutral", label: "鹽酸與氫氧化鈉中和", bucket: "exo" },
          { id: "naoh", label: "氫氧化鈉固體溶於水", bucket: "exo" },
          { id: "breath", label: "細胞呼吸作用", bucket: "exo" },
          { id: "melt", label: "冰熔化成水", bucket: "endo" },
          { id: "photo", label: "光合作用", bucket: "endo" },
          { id: "nh4no3", label: "硝酸銨溶於水（冰敷袋）", bucket: "endo" },
          { id: "electro", label: "電解水", bucket: "endo" },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：赫斯定律",
        problem:
          "已知：(1) $\\ce{C(s) + O2(g) -> CO2(g)}$，$\\Delta H_1 = -393.5$ kJ；(2) $\\ce{CO(g) + 1/2 O2(g) -> CO2(g)}$，$\\Delta H_2 = -283.0$ kJ。求 $\\ce{C(s) + 1/2 O2(g) -> CO(g)}$ 的 $\\Delta H$。",
        steps: [
          {
            show: "目標反應中 C 在左邊 → 直接使用 (1)。",
            why: "先看目標反應中每個物質應該出現在哪一邊。",
          },
          {
            show: "CO 要在右邊 → 把 (2) 反寫：$\\ce{CO2(g) -> CO(g) + 1/2 O2(g)}$，$\\Delta H = +283.0$ kJ",
            predict: {
              question: "反應式反寫後，$\\Delta H$ 變成？",
              choices: ["$-283.0$ kJ", "$+283.0$ kJ", "$-566.0$ kJ"],
              answer: 1,
            },
          },
          {
            show: "(1) + (2 反寫)：兩邊的 $\\ce{CO2}$ 消去、$\\ce{O2}$ 抵消一半 → $\\ce{C(s) + 1/2 O2(g) -> CO(g)}$",
          },
          {
            show: "$\\Delta H = -393.5 + 283.0 = -110.5$ kJ",
            predict: {
              question: "所求的 $\\Delta H$ 是？",
              choices: ["$-676.5$ kJ", "$-110.5$ kJ", "$+110.5$ kJ"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "**赫斯定律**：反應熱只與始態、終態有關，與途徑無關。反應式反寫，$\\Delta H$ 變號；乘以倍數，$\\Delta H$ 也乘相同倍數。",
      },
      {
        id: "a3",
        kind: "slider",
        title: "拉桿：能量分布與活化能",
        prompt:
          "曲線表示分子動能的分布，虛線是活化能 $E_a$。只有能量超過 $E_a$ 的分子碰撞後才可能反應。（相對單位）",
        params: [
          { key: "t", label: "溫度（相對值）", min: 1, max: 3, step: 0.1, init: 1 },
          { key: "ea", label: "活化能 Ea（相對值）", min: 2, max: 8, step: 0.5, init: 6 },
        ],
        plot: {
          x: [0, 10],
          y: [0, 0.6],
          xLabel: "分子動能",
          yLabel: "分子比例",
          fns: [
            { label: "初始溫度的分布", f: (x) => mb(x, 1), color: "#cbd5e1" },
            { label: "目前溫度的分布", f: (x, p) => mb(x, p.t), color: "#4f46e5" },
          ],
          vlines: (p) => [{ x: p.ea, label: "Ea", color: "#e11d48" }],
        },
        readouts: [
          {
            label: "能量 ≥ Ea 的分子比例",
            value: (p) => `${(above(p.ea, p.t) * 100).toFixed(2)}%`,
          },
          {
            label: "相對於初始條件",
            value: (p) => `× ${(above(p.ea, p.t) / BASE_FRACTION).toFixed(1)}`,
          },
        ],
        goal: {
          text: "讓能量超過活化能的分子比例達到 **10% 以上**。（可以升溫，也可以模擬加入催化劑降低 Ea）",
          test: (p) => above(p.ea, p.t) >= 0.1,
        },
        insight:
          "升溫時曲線變矮、變寬並往右移，超過 $E_a$ 的分子比例大增；加入催化劑則是讓 $E_a$ 這條線往左移。兩者都增加**有效碰撞**的比例，使反應變快。曲線下的總面積（分子總數）始終不變。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("t1"), q("t2"), q("t3"), q("t4"), q("t5")],
      },
    ],
  },
  {
    id: n("equilibrium"),
    title: "化學平衡與勒沙特列原理",
    grade: 11,
    minutes: 14,
    nodeIds: [n("k"), n("le-chatelier")],
    objectives: [
      "能寫出平衡常數表示式並計算 K 值",
      "能比較 Q 與 K 判斷反應進行的方向",
      "能用勒沙特列原理預測平衡移動的方向",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：Q 與 K 的比賽",
        prompt:
          "對 $\\ce{H2(g) + I2(g) <=> 2HI(g)}$，某溫度下 $K = 50$。調整三種物質的濃度，比較反應商 $Q = \\frac{[\\ce{HI}]^2}{[\\ce{H2}][\\ce{I2}]}$ 與 K。",
        params: [
          { key: "h2", label: "[H₂]", min: 0.1, max: 1, step: 0.1, init: 0.5, unit: "M" },
          { key: "i2", label: "[I₂]", min: 0.1, max: 1, step: 0.1, init: 0.5, unit: "M" },
          { key: "hi", label: "[HI]", min: 0.1, max: 3, step: 0.1, init: 1, unit: "M" },
        ],
        plot: {
          x: [0, 3],
          y: [0, 120],
          xLabel: "[HI]（M）",
          yLabel: "Q",
          fns: [
            { label: "Q（目前的 [H₂]、[I₂]）", f: (x, p) => quotient(x, p.h2, p.i2) },
            { label: "K = 50", f: () => K_HI, color: "#e11d48" },
          ],
          points: (p) => [{ x: p.hi, y: Math.min(120, quotient(p.hi, p.h2, p.i2)), label: "Q" }],
        },
        readouts: [
          { label: "Q", value: (p) => quotient(p.hi, p.h2, p.i2).toFixed(1) },
          {
            label: "反應方向",
            value: (p) => {
              const r = quotient(p.hi, p.h2, p.i2) / K_HI;
              if (Math.abs(r - 1) < 0.03) return "Q = K：已達平衡";
              return r < 1 ? "Q < K：向右（生成 HI）" : "Q > K：向左（分解 HI）";
            },
          },
        ],
        goal: {
          text: "調出一組**已經達到平衡**的濃度（Q 與 K 相差 3% 以內）。",
          test: (p) => Math.abs(quotient(p.hi, p.h2, p.i2) / K_HI - 1) < 0.03,
        },
        insight:
          "例如 $[\\ce{H2}] = 0.1$、$[\\ce{I2}] = 0.2$、$[\\ce{HI}] = 1.0$ 時，$Q = \\frac{1.0^2}{0.1 \\times 0.2} = 50 = K$。平衡濃度有無限多組，但它們的 Q 都等於 K。Q < K 時反應向右進行，Q > K 時向左進行，直到 Q = K。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：用 ICE 表求 K",
        problem:
          "在 1.0 L 容器中放入 1.0 mol $\\ce{H2}$ 和 1.0 mol $\\ce{I2}$，加熱達平衡時測得 HI 為 1.56 mol。求平衡常數 K。",
        steps: [
          {
            show: "初始（I）：$[\\ce{H2}] = 1.0$、$[\\ce{I2}] = 1.0$、$[\\ce{HI}] = 0$（M）",
          },
          {
            show: "變化（C）：$\\ce{H2}$、$\\ce{I2}$ 各減少 $x$，HI 增加 $2x$；$2x = 1.56$，$x = 0.78$",
            why: "變化量的比 = 係數比 1 : 1 : 2。",
            predict: { question: "$x$ 是多少？", choices: ["1.56", "0.78", "0.22"], answer: 1 },
          },
          {
            show: "平衡（E）：$[\\ce{H2}] = [\\ce{I2}] = 1.0 - 0.78 = 0.22$ M，$[\\ce{HI}] = 1.56$ M",
          },
          {
            show: "$K = \\frac{[\\ce{HI}]^2}{[\\ce{H2}][\\ce{I2}]} = \\frac{1.56^2}{0.22 \\times 0.22} \\approx 50$",
            why: "代入平衡濃度，不是初始濃度。",
          },
        ],
        takeaway: "ICE 表：**初始 → 變化（依係數比）→ 平衡**，再把平衡濃度代入 K。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "勒沙特列原理：平衡往哪裡移？",
        prompt:
          "對已達平衡的 $\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$（$\\Delta H < 0$），下列改變會使平衡如何移動？",
        buckets: [
          { id: "right", label: "向右移動（$\\ce{NH3}$ 增加）" },
          { id: "left", label: "向左移動（$\\ce{NH3}$ 減少）" },
          { id: "none", label: "不移動" },
        ],
        items: [
          { id: "addn2", label: "加入 $\\ce{N2}$", bucket: "right" },
          { id: "removenh3", label: "移走 $\\ce{NH3}$", bucket: "right" },
          { id: "compress", label: "壓縮體積（加壓）", bucket: "right" },
          { id: "cool", label: "降低溫度", bucket: "right" },
          { id: "heat", label: "升高溫度", bucket: "left" },
          { id: "expand", label: "增大體積（減壓）", bucket: "left" },
          { id: "addnh3", label: "加入 $\\ce{NH3}$", bucket: "left" },
          { id: "cat", label: "加入催化劑", bucket: "none" },
          { id: "he", label: "定容下加入氦氣", bucket: "none" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：平衡的觀念",
        cards: [
          {
            front: "平衡常數 K 會因為什麼而改變？",
            back: "**只受溫度影響**；改變濃度、壓力或加入催化劑，K 都不變。",
          },
          {
            front: "催化劑對平衡有什麼影響？",
            back: "同時加快正、逆反應，**縮短達到平衡的時間**，但不改變平衡組成。",
          },
          {
            front: "哈柏法製氨為什麼不用很低的溫度？",
            back: "低溫雖然使平衡偏向 $\\ce{NH3}$，但反應太慢。工業上採用約 450 °C、約 200 atm 並加入鐵催化劑，在產率與速率之間取得平衡。",
          },
          {
            front: "定容下加入氦氣，平衡為何不移動？",
            back: "各反應物與生成物的濃度（分壓）都沒有改變，所以 Q 仍等於 K。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("q1"), q("q2"), q("q3"), q("q4"), q("q5")],
      },
      {
        id: "a6",
        kind: "set",
        title: "素養題組：氨合成的平衡數據",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-haber-1"), q("set-haber-2"), q("set-haber-3")],
      },
    ],
  },
  {
    id: n("acid-base-redox"),
    title: "酸鹼滴定與電化學",
    grade: 11,
    minutes: 15,
    nodeIds: [n("acid-base"), n("titration"), n("electrochem")],
    objectives: [
      "能說出滴定器材的名稱、用法與安全注意事項",
      "能由滴定曲線找出當量點，比較強酸與弱酸的滴定",
      "能分析鋅銅電池的電極反應與電子流向",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "滴定器材大搜查",
        prompt: "依照上方的提示，在圖中找出每一項滴定器材，並閱讀使用要點與安全提醒。",
        viewBox: "0 0 400 320",
        scene: titrationScene,
        mode: "find",
        spots: [
          {
            id: "buret",
            x: 156,
            y: 130,
            title: "滴定管",
            body: "先用蒸餾水洗，再用少量**待裝的標準溶液潤洗** 2～3 次，避免濃度被稀釋。讀數時視線與液面凹處最低點平齊，讀到小數點後第二位（0.01 mL）。",
          },
          {
            id: "stopcock",
            x: 156,
            y: 225,
            title: "活栓",
            body: "通常左手控制活栓、右手搖動錐形瓶；接近當量點時要**一滴一滴**慢慢加入。",
          },
          {
            id: "flask",
            x: 156,
            y: 284,
            title: "錐形瓶",
            body: "裝入定量的待測溶液並加 2～3 滴指示劑。錐形瓶**只需用蒸餾水洗，不可用待測液潤洗**，否則待測物會變多，使結果偏高。",
          },
          {
            id: "paper",
            x: 104,
            y: 299,
            title: "白紙",
            body: "在錐形瓶下墊白紙（或白瓷板），較容易看出指示劑顏色的變化。",
          },
          {
            id: "goggles",
            x: 366,
            y: 290,
            title: "護目鏡",
            body: "操作酸、鹼溶液一定要戴護目鏡。若溶液濺入眼睛，立刻用洗眼器以大量清水沖洗至少 15 分鐘，並報告老師。",
          },
          {
            id: "wash",
            x: 308,
            y: 262,
            title: "洗瓶",
            body: "用少量蒸餾水把沾在錐形瓶內壁的溶液沖下去。加水不會改變待測物的莫耳數，所以不影響滴定結果。",
          },
        ],
      },
      {
        id: "a2",
        kind: "lab",
        title: "虛擬滴定：找出當量點",
        prompt:
          "用 0.100 M NaOH 分別滴定 25.0 mL、0.100 M 的鹽酸與醋酸。慢慢加入鹼，觀察 pH 曲線與酚酞顏色，在當量點按下標記。",
        load: titrationLab,
        insight:
          "兩者都在 25.0 mL 達當量點（酸的莫耳數相同），但曲線不同：醋酸起始 pH 較高（約 2.9），滴到一半（12.5 mL）時 $\\mathrm{pH} = \\mathrm{p}K_a \\approx 4.74$，當量點因醋酸根水解而呈鹼性（約 8.7）。強酸強鹼的當量點則是 pH = 7。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：鋅銅電池",
        problem:
          "鋅片插入 $\\ce{ZnSO4}$ 溶液、銅片插入 $\\ce{CuSO4}$ 溶液，兩杯以鹽橋連接，再用導線接上燈泡。分析這個電池。（$E^\\circ$：$\\ce{Zn^2+/Zn} = -0.76$ V，$\\ce{Cu^2+/Cu} = +0.34$ V）",
        steps: [
          {
            show: "鋅較活潑、還原電位較低 → 鋅失去電子：$\\ce{Zn -> Zn^2+ + 2e-}$（氧化，負極／陽極）",
            predict: {
              question: "哪一極發生氧化？",
              choices: ["鋅極", "銅極", "兩極都發生"],
              answer: 0,
            },
          },
          {
            show: "銅離子得到電子：$\\ce{Cu^2+ + 2e- -> Cu}$（還原，正極／陰極），銅極上析出銅",
          },
          {
            show: "電子經導線由**鋅極流向銅極**；鹽橋中的陰離子移向鋅極那一杯、陽離子移向銅極那一杯，維持電中性。",
            predict: {
              question: "電子在導線中如何流動？",
              choices: ["由銅流向鋅", "由鋅流向銅", "不會流動"],
              answer: 1,
            },
          },
          {
            show: "全反應：$\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$；電動勢 $= 0.34 - (-0.76) = 1.10$ V",
          },
        ],
        takeaway:
          "電池：**負極（陽極）氧化、正極（陰極）還原**，電子由負極經導線流向正極，鹽橋讓離子流動形成通路。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p2"), q("p3"), q("p5"), q("p6")],
      },
      {
        id: "a5",
        kind: "set",
        title: "素養題組：酸鹼滴定曲線",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-titration-1"), q("set-titration-2"), q("set-titration-3")],
      },
    ],
  },
];

export default lessons;
