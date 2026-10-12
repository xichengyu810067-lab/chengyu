import type { Lesson } from "../../types";

const photosynthesisLab = () => import("../labs/PhotosynthesisLab");
const populationLab = () => import("../labs/PopulationLab");
const membraneScene = () => import("../scenes/MembraneScene");
const dnaScene = () => import("../scenes/DNAScene");
const neuronScene = () => import("../scenes/NeuronScene");

const q = (s: string) => `biology.senior.q-${s}`;
const n = (s: string) => `biology.senior.${s}`;

/* 紅血球在不同濃度食鹽水中的相對體積（示意：約 40% 體積不參與滲透） */
const cellVolume = (c: number) => (c > 0 ? 0.4 + (0.6 * 0.9) / c : Number.NaN);

/* 天擇：深色對偶基因 A 為顯性，淺色個體（aa）的適應度為 1 − s */
function freqA(gen: number, s: number, p0: number): number {
  let qa = 1 - p0;
  const g = Math.max(0, Math.round(gen));
  for (let i = 0; i < g; i++) {
    const w = 1 - s * qa * qa;
    if (w <= 0) return Number.NaN;
    qa = (qa * (1 - s * qa)) / w;
  }
  return 1 - qa;
}

/* 動作電位（示意）：刺激使膜電位上升 s mV，達閾值 −55 mV 才產生固定大小的動作電位 */
function membranePotential(t: number, s: number): number {
  if (t < 1) return -70;
  if (s < 15) {
    if (t < 1.3) return -70 + (s * (t - 1)) / 0.3;
    return -70 + s * Math.exp(-(t - 1.3));
  }
  if (t < 1.3) return -70 + (15 * (t - 1)) / 0.3;
  if (t < 2) return -55 + 90 * Math.sin(((t - 1.3) / 0.7) * (Math.PI / 2));
  if (t < 3.2) return 35 - 115 * Math.sin(((t - 2) / 1.2) * (Math.PI / 2));
  return -70 - 10 * Math.exp(-(t - 3.2) / 1.2);
}

const lessons: Lesson[] = [
  {
    id: "biology.senior.cell-membrane",
    title: "細胞與細胞膜：物質如何進出細胞",
    grade: 10,
    minutes: 14,
    nodeIds: [n("cell-theory"), n("cell-structure"), n("membrane-transport")],
    objectives: [
      "能說出細胞學說的內容與發展",
      "能描述細胞膜的流體鑲嵌模型",
      "能區分簡單擴散、促進性擴散、主動運輸與膜泡運輸",
      "能預測細胞在不同濃度溶液中的變化",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：細胞學說與細胞的種類",
        cards: [
          {
            front: "誰最早用「cell」稱呼細胞？",
            back: "**虎克**（Hooke）在 1665 年觀察軟木塞薄片，看到許多小空格（其實是死細胞留下的細胞壁）。",
          },
          {
            front: "細胞學說由誰提出？",
            back: "**許來登**（Schleiden，研究植物）與**許旺**（Schwann，研究動物）在 1838～1839 年提出：生物都由細胞構成。",
          },
          {
            front: "「細胞來自原有的細胞」是誰強調的？",
            back: "**菲爾紹**（Virchow，也譯作魏修）在 1855 年提出，補足了細胞學說。",
          },
          {
            front: "原核細胞與真核細胞最大的差別？",
            back: "原核細胞**沒有核膜**包圍的細胞核，也沒有膜狀胞器；但兩者都有細胞膜、核糖體與 DNA。",
          },
          {
            front: "ATP 怎麼提供能量？",
            back: "ATP 水解成 ADP 與磷酸時釋出能量；細胞呼吸再把 ADP 與磷酸合成 ATP，如同充電。",
          },
        ],
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "熱區探索：細胞膜的構造與運輸",
        prompt: "點擊熱點，認識細胞膜上的各種構造，以及物質進出細胞的方式。",
        viewBox: "0 0 480 280",
        scene: membraneScene,
        mode: "explore",
        spots: [
          {
            id: "bilayer",
            x: 44,
            y: 140,
            title: "磷脂雙層",
            body: "細胞膜的基本骨架。磷脂的**親水性頭部**朝向膜兩側的水環境，**疏水性尾部**朝向膜的中間。膜上的分子可以側向移動，稱為**流體鑲嵌模型**。",
          },
          {
            id: "channel",
            x: 110,
            y: 140,
            title: "通道蛋白",
            body: "形成貫穿細胞膜的通道，讓特定離子或水分子（經水通道蛋白）順濃度梯度通過，屬於**促進性擴散**，不消耗 ATP。",
          },
          {
            id: "diffusion",
            x: 172,
            y: 140,
            title: "簡單擴散",
            body: "$\\ce{O2}$、$\\ce{CO2}$ 等小型非極性分子，由**高濃度往低濃度**直接穿過磷脂雙層，不需蛋白質協助，也不消耗 ATP。",
          },
          {
            id: "carrier",
            x: 225,
            y: 170,
            title: "載體蛋白",
            body: "與特定分子（如葡萄糖）結合後改變形狀，把分子運到膜的另一側。此圖中為順濃度梯度的**促進性擴散**。",
          },
          {
            id: "pump",
            x: 345,
            y: 150,
            title: "幫浦（主動運輸）",
            body: "消耗 ATP，把物質由**低濃度往高濃度**運送。例如鈉鉀幫浦每消耗 1 個 ATP，把 3 個 $\\ce{Na+}$ 送出細胞、2 個 $\\ce{K+}$ 送入細胞。",
          },
          {
            id: "glyco",
            x: 426,
            y: 66,
            title: "醣蛋白",
            body: "蛋白質接上醣鏈，位於細胞膜的外側，與**細胞辨識**有關，例如免疫系統辨認「自己」與「外來物」。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分類：物質運輸的方式",
        prompt: "判斷每個例子屬於哪一種運輸方式。",
        buckets: [
          { id: "passive", label: "被動運輸（不消耗 ATP）" },
          { id: "active", label: "主動運輸（消耗 ATP，逆濃度梯度）" },
          { id: "bulk", label: "胞吞或胞吐（膜泡運輸，消耗能量）" },
        ],
        items: [
          { id: "t1", label: "$\\ce{O2}$ 由肺泡進入微血管", bucket: "passive" },
          { id: "t2", label: "水分子經水通道蛋白進入細胞", bucket: "passive" },
          { id: "t3", label: "葡萄糖經載體蛋白順濃度梯度進入紅血球", bucket: "passive" },
          { id: "t4", label: "鈉鉀幫浦把 $\\ce{Na+}$ 運出神經細胞", bucket: "active" },
          { id: "t5", label: "根毛細胞從土壤吸收濃度較低的礦物質離子", bucket: "active" },
          { id: "t6", label: "白血球吞噬細菌", bucket: "bulk" },
          { id: "t7", label: "胰臟細胞分泌胰島素", bucket: "bulk" },
        ],
      },
      {
        id: "a4",
        kind: "slider",
        title: "拉桿實驗：紅血球與滲透作用",
        prompt: "把紅血球放進不同濃度的食鹽水（NaCl）中。調整濃度，觀察紅血球的體積變化。",
        params: [
          { key: "c", label: "食鹽水濃度", min: 0.1, max: 2, step: 0.1, init: 0.3, unit: "%" },
        ],
        plot: {
          x: [0.1, 2],
          y: [0, 3],
          xLabel: "食鹽水濃度（%）",
          yLabel: "紅血球相對體積",
          fns: [
            { label: "紅血球相對體積", color: "#dc2626", f: (x) => cellVolume(x) },
            { label: "原本體積", color: "#cbd5e1", f: () => 1 },
            { label: "可能破裂的體積", color: "#f59e0b", f: () => 1.7 },
          ],
          points: (p) => [{ x: p.c, y: cellVolume(p.c), label: `${p.c.toFixed(1)}%` }],
        },
        readouts: [
          {
            label: "溶液類型（相對於紅血球）",
            value: (p) => (p.c < 0.85 ? "低張溶液" : p.c <= 0.95 ? "等張溶液" : "高張溶液"),
          },
          {
            label: "紅血球的變化",
            value: (p) => {
              const v = cellVolume(p.c);
              if (v > 1.7) return "吸水膨脹而破裂（溶血）";
              if (p.c < 0.85) return "吸水膨脹";
              if (p.c <= 0.95) return "水分進出平衡，形狀不變";
              return "失水皺縮";
            },
          },
          { label: "相對體積", value: (p) => cellVolume(p.c).toFixed(2) },
        ],
        goal: {
          text: "找出讓紅血球**既不膨脹也不皺縮**的食鹽水濃度。",
          test: (p) => Math.abs(p.c - 0.9) < 0.05,
        },
        insight:
          "0.9% 食鹽水與血漿等張，稱為**生理食鹽水**。紅血球在低張溶液中吸水膨脹甚至破裂，在高張溶液中失水皺縮。植物細胞有細胞壁，在低張溶液中不會破裂；在高張溶液中則會發生**質壁分離**。（圖為示意模型）",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m3"), q("m4"), q("m5"), q("m7")],
      },
    ],
  },
  {
    id: "biology.senior.dna-expression",
    title: "DNA、基因表現與生物技術",
    grade: 10,
    minutes: 15,
    nodeIds: [n("dna"), n("expression"), n("biotech")],
    objectives: [
      "能描述 DNA 雙股螺旋的構造與鹼基配對原則",
      "能由 DNA 序列推出 mRNA 與胺基酸序列",
      "能說出常見生物技術工具的用途",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "熱區探索：DNA 的構造",
        prompt: "為了看清楚，把雙股螺旋「拉直」成梯子。點擊熱點認識各部位。",
        viewBox: "0 0 420 320",
        scene: dnaScene,
        mode: "explore",
        spots: [
          {
            id: "phosphate",
            x: 84,
            y: 100,
            title: "磷酸",
            body: "與去氧核糖交替連接，構成 DNA 的**糖—磷酸骨架**，就像梯子的扶手。",
          },
          {
            id: "sugar",
            x: 98,
            y: 190,
            title: "去氧核糖",
            body: "一種五碳糖。一個磷酸 + 一個去氧核糖 + 一個含氮鹼基 = 一個**核苷酸**，是 DNA 的基本單位。",
          },
          {
            id: "base",
            x: 148,
            y: 250,
            title: "含氮鹼基",
            body: "有 A（腺嘌呤）、T（胸腺嘧啶）、G（鳥糞嘌呤）、C（胞嘧啶）四種。**A 與 T 配對、G 與 C 配對**，鹼基的排列順序就是遺傳訊息。",
          },
          {
            id: "hbond",
            x: 210,
            y: 130,
            title: "氫鍵",
            body: "兩股之間的鹼基以氫鍵相連：A–T 之間有 2 個、G–C 之間有 3 個。複製或轉錄時，氫鍵斷開使雙股分開。",
          },
          {
            id: "ends",
            x: 58,
            y: 160,
            title: "5′ 端與 3′ 端",
            body: "兩股的方向相反，稱為**反向平行**。DNA 聚合酶只能把新的核苷酸接在 3′ 端，所以新股由 5′ 往 3′ 方向延長。",
          },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：從 DNA 到蛋白質",
        problem: "某基因的模板股序列為 3′-TAC CGA AAG ATT-5′。請推出 mRNA 序列與胺基酸序列。",
        steps: [
          {
            show: "**轉錄**：RNA 聚合酶以模板股為依據，依互補配對合成 mRNA，但 RNA 以 **U（尿嘧啶）** 取代 T。",
            predict: {
              question: "模板股上的 A，會對應到 mRNA 上的哪個鹼基？",
              choices: ["T", "U", "G"],
              answer: 1,
            },
          },
          {
            show: "mRNA：5′-AUG GCU UUC UAA-3′",
            why: "T→A、A→U、C→G、G→C，方向與模板股相反。",
            predict: {
              question: "模板股 3′-TAC-5′ 會轉錄成？",
              choices: ["5′-AUG-3′", "5′-ATG-3′", "5′-UAC-3′"],
              answer: 0,
            },
          },
          {
            show: "**轉譯**：核糖體從**起始密碼子 AUG** 開始，每 3 個鹼基讀一個密碼子：AUG｜GCU｜UUC｜UAA。",
          },
          {
            show: "tRNA 以反密碼子配對並攜入胺基酸：AUG → 甲硫胺酸（Met）、GCU → 丙胺酸（Ala）、UUC → 苯丙胺酸（Phe）。",
          },
          {
            show: "UAA 是**終止密碼子**，不對應任何胺基酸，多肽鏈釋出：Met–Ala–Phe。",
            predict: {
              question: "這段 mRNA 會轉譯出幾個胺基酸？",
              choices: ["3 個", "4 個", "12 個"],
              answer: 0,
            },
          },
        ],
        takeaway:
          "**中心法則**：DNA →（轉錄）→ RNA →（轉譯）→ 蛋白質。密碼子在 mRNA 上，反密碼子在 tRNA 上。",
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：DNA 與 RNA",
        pairs: [
          ["DNA 的五碳糖", "去氧核糖"],
          ["RNA 的五碳糖", "核糖"],
          ["RNA 特有的鹼基", "尿嘧啶（U）"],
          ["DNA 的複製方式", "半保留複製"],
          ["攜帶胺基酸到核糖體", "tRNA"],
          ["把遺傳密碼帶到核糖體", "mRNA"],
        ],
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "配對：生物技術的工具箱",
        pairs: [
          { id: "b1", left: "限制酶", right: "在特定的鹼基序列切割 DNA" },
          { id: "b2", left: "DNA 連接酶", right: "把 DNA 片段接合起來" },
          { id: "b3", left: "質體", right: "攜帶外源基因進入細菌的載體" },
          { id: "b4", left: "PCR", right: "在試管中大量複製特定 DNA 片段" },
          { id: "b5", left: "膠體電泳", right: "依大小分離 DNA 片段" },
          { id: "b6", left: "CRISPR-Cas9", right: "精準剪切並編輯特定的基因序列" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("d1"), q("d2"), q("d3"), q("d4"), q("d5"), q("d7")],
      },
    ],
  },
  {
    id: "biology.senior.cell-energy",
    title: "光合作用與細胞呼吸：能量的轉換",
    grade: 11,
    minutes: 15,
    nodeIds: [n("photosynthesis"), n("limiting-factors"), n("respiration")],
    objectives: [
      "能分辨光反應與碳反應的場所、原料與產物",
      "能用限制因子的概念解釋光合作用速率的變化",
      "能說出有氧呼吸三個階段的場所與產物",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：光合作用的限制因子",
        prompt: "調整光強度、CO₂ 濃度與溫度，觀察總光合作用與淨光合作用速率的變化，完成兩個任務。",
        load: photosynthesisLab,
        insight:
          "**淨光合作用 = 總光合作用 − 呼吸作用**。光弱時光強度是限制因子；光夠強時，速率受 CO₂ 濃度或溫度限制。溫度過高時，酵素活性下降、呼吸作用卻增加，淨光合作用反而變小。（圖為示意模型）",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "分類：光反應還是碳反應？",
        buckets: [
          { id: "light", label: "光反應" },
          { id: "carbon", label: "碳反應（卡爾文循環）" },
        ],
        items: [
          { id: "l1", label: "在類囊體膜上進行", bucket: "light" },
          { id: "l2", label: "葉綠素吸收光能", bucket: "light" },
          { id: "l3", label: "水分解並釋出 $\\ce{O2}$", bucket: "light" },
          { id: "l4", label: "產生 ATP 與 NADPH", bucket: "light" },
          { id: "c1", label: "在葉綠體基質中進行", bucket: "carbon" },
          { id: "c2", label: "固定 $\\ce{CO2}$", bucket: "carbon" },
          { id: "c3", label: "消耗 ATP 與 NADPH", bucket: "carbon" },
          { id: "c4", label: "合成三碳醣，進而形成葡萄糖等醣類", bucket: "carbon" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：有氧呼吸的三個階段",
        problem: "一分子葡萄糖在有氧的情況下，如何被完全分解並產生 ATP？",
        steps: [
          {
            show: "**糖解作用**（細胞質）：葡萄糖 → 2 分子丙酮酸，淨產生 2 個 ATP 與 2 個 NADH。",
            why: "這一步不需要氧，有氧呼吸與發酵都會進行。",
            predict: {
              question: "糖解作用發生在哪裡？",
              choices: ["細胞質", "粒線體基質", "粒線體內膜"],
              answer: 0,
            },
          },
          {
            show: "丙酮酸進入**粒線體**，轉變為乙醯輔酶 A，並釋出 $\\ce{CO2}$。",
          },
          {
            show: "**克氏循環**（粒線體基質）：乙醯輔酶 A 被完全氧化，釋出 $\\ce{CO2}$，產生 NADH、$\\ce{FADH2}$ 與少量 ATP。",
          },
          {
            show: "**電子傳遞鏈**（粒線體內膜）：NADH 與 $\\ce{FADH2}$ 的電子沿著膜上的蛋白質傳遞，最後交給 $\\ce{O2}$ 生成水，同時合成大量 ATP。",
            predict: {
              question: "電子最後交給誰？",
              choices: ["$\\ce{O2}$", "$\\ce{CO2}$", "葡萄糖"],
              answer: 0,
            },
          },
          {
            show: "總反應：$\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$，每分子葡萄糖約可產生 30～32 個 ATP。",
            why: "早期教材多寫 36～38 個 ATP；依實際測量修正後，一般估計約 30～32 個。",
          },
        ],
        takeaway:
          "缺氧時只能進行糖解作用，再經**發酵**（乳酸發酵或酒精發酵）讓糖解作用持續，每分子葡萄糖只得到 2 個 ATP。",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("r1"), q("r2"), q("r3"), q("r4"), q("r5"), q("r7")],
      },
    ],
  },
  {
    id: "biology.senior.nerve-immune",
    title: "神經傳導與免疫",
    grade: 11,
    minutes: 15,
    nodeIds: [n("neuron"), n("synapse"), n("immunity")],
    objectives: [
      "能指出神經元各部位並說明功能",
      "能說明動作電位的閾值與全有全無律",
      "能依序說出突觸傳遞的過程",
      "能說出主要免疫細胞的功能與疫苗的原理",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "找找看：神經元的構造",
        prompt: "依照提示，在神經元上點出正確的位置。",
        viewBox: "0 0 480 240",
        scene: neuronScene,
        mode: "find",
        spots: [
          {
            id: "dendrite",
            x: 36,
            y: 80,
            title: "樹突",
            body: "由細胞本體伸出、短而多分支的突起，負責**接收**其他神經元或受器傳來的訊息。",
          },
          {
            id: "soma",
            x: 100,
            y: 142,
            title: "細胞本體",
            body: "含細胞核，是神經元代謝的中心，並整合由樹突傳來的訊息。",
          },
          {
            id: "myelin",
            x: 164,
            y: 120,
            title: "髓鞘",
            body: "包覆軸突的絕緣構造（周圍神經由許旺細胞形成），可加快神經衝動的傳導。",
          },
          {
            id: "node",
            x: 254,
            y: 120,
            title: "蘭氏結",
            body: "髓鞘之間裸露的軸突。神經衝動在蘭氏結之間**跳躍式傳導**，速度比無髓鞘神經快得多。",
          },
          {
            id: "axon",
            x: 386,
            y: 120,
            title: "軸突",
            body: "通常較長，把神經衝動從細胞本體**傳出**到下一個細胞。",
          },
          {
            id: "terminal",
            x: 449,
            y: 120,
            title: "軸突末梢",
            body: "軸突末端膨大處，與下一個細胞形成**突觸**，釋放神經傳導物質。",
          },
        ],
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿實驗：閾值與全有全無律",
        prompt:
          "在 t = 1 毫秒時給神經元一個刺激，使膜電位上升 s mV。調整刺激強度，觀察膜電位隨時間的變化。",
        params: [
          { key: "s", label: "刺激造成的去極化 s", min: 0, max: 40, step: 1, init: 5, unit: "mV" },
        ],
        plot: {
          x: [0, 8],
          y: [-90, 50],
          xLabel: "時間（毫秒）",
          yLabel: "膜電位（mV）",
          fns: [
            { label: "膜電位", color: "#7c3aed", f: (x, p) => membranePotential(x, p.s) },
            { label: "閾值 −55 mV", color: "#f59e0b", f: () => -55 },
            { label: "靜止膜電位 −70 mV", color: "#cbd5e1", f: () => -70 },
          ],
        },
        readouts: [
          { label: "刺激後的膜電位", value: (p) => `${-70 + p.s} mV` },
          {
            label: "是否產生動作電位",
            value: (p) => (p.s >= 15 ? "是，峰值約 +35 mV" : "否，未達閾值"),
          },
          {
            label: "主要的離子流動",
            value: (p) =>
              p.s >= 15 ? "Na⁺ 流入（去極化）→ K⁺ 流出（再極化）" : "局部電位逐漸消退",
          },
        ],
        goal: {
          text: "找出**剛好**能引發動作電位的最小刺激強度。",
          test: (p) => p.s === 15,
        },
        insight:
          "膜電位要達到**閾值**（約 −55 mV）才會產生動作電位；超過閾值後，刺激再強，動作電位的大小也不變，稱為**全有全無律**。較強的刺激會以提高動作電位的**頻率**來表現。（圖為示意模型）",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排序：突觸傳遞",
        prompt: "把化學突觸傳遞訊息的過程依序排好。",
        items: [
          { id: "y1", label: "動作電位傳到軸突末梢" },
          { id: "y2", label: "末梢的鈣離子通道打開，$\\ce{Ca^2+}$ 流入" },
          { id: "y3", label: "突觸小泡與細胞膜融合，以胞吐作用釋出神經傳導物質" },
          { id: "y4", label: "神經傳導物質擴散通過突觸間隙" },
          { id: "y5", label: "神經傳導物質與突觸後膜上的受體結合" },
          { id: "y6", label: "突觸後細胞的離子通道打開，膜電位改變" },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：免疫細胞",
        pairs: [
          ["巨噬細胞", "吞噬病原體並呈現抗原"],
          ["輔助性 T 細胞", "分泌細胞激素，活化其他免疫細胞"],
          ["胞毒性 T 細胞", "直接破壞被病毒感染的細胞"],
          ["漿細胞", "大量分泌抗體"],
          ["記憶細胞", "再次遇到相同抗原時快速反應"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("i1"), q("i2"), q("i3"), q("i4"), q("i5")],
      },
    ],
  },
  {
    id: "biology.senior.evolution-diversity",
    title: "演化與生物多樣性",
    grade: 10,
    minutes: 15,
    nodeIds: [n("evidence"), n("mechanism"), n("domains")],
    objectives: [
      "能舉例說明支持演化的證據",
      "能用模擬觀察天擇如何改變對偶基因頻率",
      "能應用哈地－溫伯格平衡計算基因型頻率",
      "能把生物歸入三域",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：演化的證據",
        cards: [
          {
            front: "化石",
            back: "保存在地層中的古生物遺骸或遺跡，可看出生物隨時間的變化，例如始祖鳥兼具爬蟲類與鳥類的特徵。",
          },
          {
            front: "同源構造",
            back: "構造與來源相同、功能可能不同，例如人的手、鯨的鰭肢、蝙蝠的翼，顯示具有共同祖先。",
          },
          {
            front: "同功構造",
            back: "功能相似、來源不同，例如鳥的翼與昆蟲的翅，是適應相似環境的結果。",
          },
          {
            front: "痕跡構造",
            back: "在祖先中有功能、現今已退化的構造，例如鯨與蟒蛇體內退化的後肢骨。",
          },
          {
            front: "分子證據",
            back: "比較 DNA 或蛋白質序列：親緣關係越近的物種，序列差異越小。",
          },
        ],
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿實驗：樺尺蛾與天擇",
        prompt:
          "工業革命時，英國的樹幹被煤煙燻黑，淺色樺尺蛾（aa）容易被鳥發現。深色對偶基因 A 為顯性。調整天擇的強度與 A 的起始頻率，觀察 A 在 100 代間的變化。",
        params: [
          { key: "s", label: "淺色蛾額外被捕食的比例 s", min: 0, max: 0.5, step: 0.05, init: 0.05 },
          {
            key: "p0",
            label: "深色對偶基因 A 的起始頻率",
            min: 0.01,
            max: 0.5,
            step: 0.01,
            init: 0.05,
          },
        ],
        plot: {
          x: [0, 100],
          y: [0, 1],
          xLabel: "世代",
          yLabel: "頻率",
          fns: [
            { label: "對偶基因 A 的頻率", color: "#1e293b", f: (x, p) => freqA(x, p.s, p.p0) },
            {
              label: "淺色蛾（aa）的比例",
              color: "#d97706",
              f: (x, p) => (1 - freqA(x, p.s, p.p0)) ** 2,
            },
          ],
          points: (p) => [
            { x: 50, y: freqA(50, p.s, p.p0), label: freqA(50, p.s, p.p0).toFixed(2) },
          ],
          vlines: () => [{ x: 50, label: "第 50 代", color: "#94a3b8" }],
        },
        readouts: [
          { label: "第 50 代 A 的頻率", value: (p) => freqA(50, p.s, p.p0).toFixed(3) },
          {
            label: "第 50 代淺色蛾比例",
            value: (p) => `${((1 - freqA(50, p.s, p.p0)) ** 2 * 100).toFixed(1)}%`,
          },
          { label: "第 100 代 a 的頻率", value: (p) => (1 - freqA(100, p.s, p.p0)).toFixed(3) },
        ],
        goal: {
          text: "讓深色對偶基因 A 在**第 50 代**的頻率超過 0.9。",
          test: (p) => freqA(50, p.s, p.p0) > 0.9,
        },
        insight:
          "天擇直接作用在**表現型**：淺色蛾被捕食得越多，A 的頻率上升越快。但即使天擇很強，隱性的 a 也很難完全消失，因為它可以藏在異型合子（Aa）中而不被淘汰。後來英國空氣品質改善，淺色蛾的比例又回升了。（圖為示意模型）",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：哈地－溫伯格平衡",
        problem:
          "某族群符合哈地－溫伯格平衡。已知隱性表現型（aa）個體占 16%，求對偶基因 a、A 的頻率，以及異型合子（Aa）所占的比例。",
        steps: [
          {
            show: "設 A 的頻率為 $p$、a 的頻率為 $q$，$p + q = 1$；平衡時基因型頻率為 $p^2 + 2pq + q^2 = 1$。",
          },
          {
            show: "$q^2 = 0.16$，所以 $q = 0.4$。",
            predict: {
              question: "a 的頻率 $q$ 是多少？",
              choices: ["0.16", "0.4", "0.84"],
              answer: 1,
            },
          },
          { show: "$p = 1 - 0.4 = 0.6$" },
          {
            show: "Aa 的比例 $= 2pq = 2 \\times 0.6 \\times 0.4 = 0.48$，即 48%。",
            predict: { question: "Aa 占多少？", choices: ["24%", "36%", "48%"], answer: 2 },
          },
          { show: "驗算：$p^2 = 0.36$，$0.36 + 0.48 + 0.16 = 1$ ✓" },
        ],
        takeaway:
          "哈溫平衡的條件：族群夠大、隨機交配、沒有突變、沒有遷移、沒有天擇。只要有任一條件不成立，對偶基因頻率就可能改變——也就是發生了**演化**。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "categorize",
        title: "分類：三域系統",
        buckets: [
          { id: "bacteria", label: "細菌域" },
          { id: "archaea", label: "古細菌域" },
          { id: "eukarya", label: "真核生物域" },
        ],
        items: [
          { id: "o1", label: "大腸桿菌", bucket: "bacteria" },
          { id: "o2", label: "藍綠菌", bucket: "bacteria" },
          { id: "o3", label: "乳酸菌", bucket: "bacteria" },
          { id: "o4", label: "甲烷菌", bucket: "archaea" },
          { id: "o5", label: "極端嗜鹽菌", bucket: "archaea" },
          { id: "o6", label: "酵母菌", bucket: "eukarya" },
          { id: "o7", label: "草履蟲", bucket: "eukarya" },
          { id: "o8", label: "臺灣杉", bucket: "eukarya" },
          { id: "o9", label: "人類", bucket: "eukarya" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("v1"), q("v2"), q("v3"), q("v4"), q("v6")],
      },
    ],
  },
  {
    id: "biology.senior.population-ecosystem",
    title: "族群、生態系與全球變遷",
    grade: 10,
    minutes: 15,
    nodeIds: [n("population"), n("ecosystem"), n("global-change"), n("conservation")],
    objectives: [
      "能比較指數成長與邏輯斯諦成長，並說明環境負荷量",
      "能用族群與群集的觀念分析外來入侵種的問題",
      "能畫出碳循環，並說明人類活動對全球變遷的影響",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：生態學的層次",
        root: {
          id: "lv",
          title: "生態學的層次",
          children: [
            {
              id: "lv-pop",
              title: "族群",
              summary: "同種生物個體的集合；受出生、死亡、遷入、遷出影響。",
            },
            {
              id: "lv-com",
              title: "群集",
              summary: "同一區域的所有族群；有競爭、掠食、共生、寄生等交互作用。",
            },
            {
              id: "lv-eco",
              title: "生態系",
              summary: "群集加上非生物環境；能量流動、物質循環。",
            },
            {
              id: "lv-bio",
              title: "生物圈",
              summary: "地球上所有的生態系；全球變遷在這個層次發生。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：族群成長曲線",
        prompt: "比較 J 型與 S 型成長，調整內在成長率 r 與環境負荷量 K，完成兩個任務。",
        load: populationLab,
        insight:
          "資源無限時族群呈**指數成長**（J 型）；現實中食物、空間、天敵等限制使族群呈**邏輯斯諦成長**（S 型），最後接近**環境負荷量 K**。成長速率在 $N = \\frac{K}{2}$ 時最大。",
      },
      {
        id: "a3",
        kind: "dialogue",
        title: "情境對話：綠鬣蜥入侵記",
        scenarioId: "biology.senior.s-iguana",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：碳循環",
        task: "畫出碳循環示意圖，包含大氣中的 $\\ce{CO2}$、植物、動物、分解者與化石燃料，並用箭頭標出光合作用、呼吸作用、分解作用與燃燒。",
        background: "blank",
        hint: "先把「大氣中的 $\\ce{CO2}$」放在中間，再想想哪些過程把碳帶進生物體、哪些過程把碳送回大氣。",
        reference:
          "- 大氣 $\\ce{CO2}$ →（光合作用）→ 植物\n- 植物 →（被攝食）→ 動物\n- 植物、動物 →（呼吸作用）→ 大氣 $\\ce{CO2}$\n- 遺體與排遺 → 分解者 →（分解作用）→ 大氣 $\\ce{CO2}$\n- 化石燃料 →（燃燒）→ 大氣 $\\ce{CO2}$\n\n人類大量燃燒化石燃料、砍伐森林，使大氣 $\\ce{CO2}$ 濃度上升，加劇全球暖化與海洋酸化。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e3"), q("e4"), q("e5"), q("e6")],
      },
    ],
  },
];

export default lessons;
