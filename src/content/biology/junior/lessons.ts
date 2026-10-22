import type { Lesson } from "../../types";

const punnettLab = () => import("../labs/PunnettLab");
const cellScene = () => import("../scenes/CellScene");
const heartScene = () => import("../scenes/HeartScene");
const flowerScene = () => import("../scenes/FlowerScene");
const body = () => import("../scenes/bodyLayers").then((m) => ({ default: m.Body }));
const skeletal = () => import("../scenes/bodyLayers").then((m) => ({ default: m.Skeletal }));
const respiratory = () => import("../scenes/bodyLayers").then((m) => ({ default: m.Respiratory }));
const circulatory = () => import("../scenes/bodyLayers").then((m) => ({ default: m.Circulatory }));
const digestive = () => import("../scenes/bodyLayers").then((m) => ({ default: m.Digestive }));
const nervous = () => import("../scenes/bodyLayers").then((m) => ({ default: m.Nervous }));

const q = (s: string) => `biology.junior.q-${s}`;
const n = (s: string) => `biology.junior.${s}`;

/* 酵素活性的示意模型：溫度在最適溫度以上時下降得較快（變性） */
const tempFactor = (t: number, opt: number) =>
  t <= opt ? Math.exp(-(((t - opt) / 18) ** 2)) : Math.exp(-(((t - opt) / 8) ** 2));
const phFactor = (ph: number, opt: number, w: number) => Math.exp(-(((ph - opt) / w) ** 2));
const amylase = (t: number, ph: number) => 100 * tempFactor(t, 37) * phFactor(ph, 7, 1.5);
const pepsin = (t: number, ph: number) => 100 * tempFactor(t, 37) * phFactor(ph, 2, 1.2);
const pct = (v: number) => `${Math.round(v)}%`;

const lessons: Lesson[] = [
  {
    id: "biology.junior.cell-world",
    title: "細胞：生命的基本單位",
    grade: 7,
    minutes: 14,
    nodeIds: [n("cell-structure"), n("microscope"), n("levels"), n("life-features")],
    objectives: [
      "能指出動、植物細胞的構造並說明功能",
      "能依正確步驟操作複式顯微鏡",
      "能說出生物體的組成層次，並認識人體的器官系統",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "熱區探索：植物細胞與動物細胞",
        prompt: "點擊每個閃爍的熱點，比較植物細胞和動物細胞的構造。",
        viewBox: "0 0 480 300",
        scene: cellScene,
        mode: "explore",
        spots: [
          {
            id: "wall",
            x: 20,
            y: 150,
            title: "細胞壁",
            body: "位於植物細胞最外層，主要成分是**纖維素**，可支持與保護細胞。動物細胞**沒有**細胞壁。",
          },
          {
            id: "membrane",
            x: 458,
            y: 155,
            title: "細胞膜",
            body: "包在細胞質外的薄膜，能**控制物質進出**細胞。動、植物細胞都有；植物的細胞膜緊貼在細胞壁內側。",
          },
          {
            id: "nucleus",
            x: 350,
            y: 145,
            title: "細胞核",
            body: "含有遺傳物質（DNA），控制細胞的生長、代謝與分裂等生命活動。動、植物細胞都有。",
          },
          {
            id: "cytoplasm",
            x: 395,
            y: 235,
            title: "細胞質",
            body: "細胞膜以內、細胞核以外的部分，含有各種胞器，許多化學反應在這裡進行。",
          },
          {
            id: "chloroplast",
            x: 95,
            y: 66,
            title: "葉綠體",
            body: "含**葉綠素**，是進行**光合作用**的場所。主要存在於葉肉等綠色部位的細胞；根部細胞通常沒有葉綠體。",
          },
          {
            id: "vacuole",
            x: 122,
            y: 170,
            title: "液胞",
            body: "由膜包圍，儲存水分、養分、色素與廢物。成熟的植物細胞常有一個很大的**中央液胞**，可維持細胞的飽滿。",
          },
          {
            id: "mito",
            x: 300,
            y: 205,
            title: "粒線體",
            body: "進行**細胞呼吸**的主要場所，分解養分、釋放能量供細胞使用。動、植物細胞都有。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：胞器與功能",
        prompt: "把右邊的功能拖到對應的構造旁。",
        pairs: [
          { id: "m1", left: "細胞核", right: "含遺傳物質，控制細胞的生命活動" },
          { id: "m2", left: "粒線體", right: "進行細胞呼吸，釋放能量" },
          { id: "m3", left: "葉綠體", right: "進行光合作用，製造養分" },
          { id: "m4", left: "細胞膜", right: "控制物質進出細胞" },
          { id: "m5", left: "細胞壁", right: "支持與保護植物細胞" },
          { id: "m6", left: "液胞", right: "儲存水分、養分、色素與廢物" },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排序：複式顯微鏡的操作步驟",
        prompt: "把操作步驟依正確順序排好。",
        items: [
          { id: "s1", label: "取鏡：一手握鏡臂、一手托鏡座，平穩放在桌上" },
          { id: "s2", label: "轉動旋轉盤，讓**低倍物鏡**對準通光孔" },
          { id: "s3", label: "調整光源與光圈，使視野明亮" },
          { id: "s4", label: "把玻片標本放在載物台上，用壓片夾固定" },
          { id: "s5", label: "從**側面**注視，轉粗調節輪使物鏡接近玻片（不可碰到）" },
          { id: "s6", label: "看著目鏡，轉粗調節輪使物鏡**遠離**玻片，看到影像後用細調節輪調清楚" },
          { id: "s7", label: "把要觀察的部分移到視野中央，換**高倍物鏡**，只用細調節輪微調" },
        ],
      },
      {
        id: "a4",
        kind: "layers",
        title: "圖層疊加：人體的器官系統",
        prompt: "器官系統是組成層次中最大的一層。逐一打開圖層，看看各系統的器官位在身體哪裡。",
        viewBox: "0 0 320 420",
        base: body,
        layers: [
          {
            id: "skeletal",
            label: "骨骼系統",
            load: skeletal,
            color: "#475569",
            on: true,
            note: "支撐身體、保護內臟，並與肌肉合作產生運動。",
          },
          {
            id: "respiratory",
            label: "呼吸系統",
            load: respiratory,
            color: "#0284c7",
            note: "氣管把空氣送到肺，在**肺泡**進行氣體交換。",
          },
          {
            id: "circulatory",
            label: "循環系統",
            load: circulatory,
            color: "#dc2626",
            note: "心臟推動血液，經動脈（紅）送出、靜脈（藍）流回。",
          },
          {
            id: "digestive",
            label: "消化系統",
            load: digestive,
            color: "#d97706",
            note: "食道、胃、小腸、大腸組成消化道；肝臟是重要的消化腺。",
          },
          {
            id: "nervous",
            label: "神經系統",
            load: nervous,
            color: "#ca8a04",
            note: "腦與脊髓是中樞，神經把訊息傳遍全身。",
          },
        ],
        check: {
          stem: "同時打開骨骼、呼吸與循環圖層：心臟和肺主要受到哪個構造保護？",
          choices: ["頭骨", "肋骨（胸廓）", "骨盆", "股骨"],
          answer: 1,
          explain: "心臟與肺位於胸腔，由肋骨、胸骨與脊椎構成的**胸廓**保護。頭骨保護腦。",
        },
      },
      {
        id: "a5",
        kind: "scratch",
        title: "刮刮樂：生命與細胞重點",
        prompt: "先想一想答案，再刮開確認。",
        cards: [
          {
            front: "生物共同的特徵有哪些？",
            back: "由細胞構成、會進行新陳代謝、能生長與生殖、能對刺激產生反應、能維持體內恆定。",
          },
          {
            front: "動物體的組成層次？",
            back: "細胞 → 組織 → 器官 → 器官系統 → 個體",
          },
          {
            front: "植物體的組成層次和動物有什麼不同？",
            back: "植物**沒有器官系統**：細胞 → 組織 → 器官 → 個體。",
          },
          {
            front: "細胞分裂後，子細胞的染色體數目會怎樣？",
            back: "與母細胞**相同**，因為染色體在分裂前已先複製，再平均分配。",
          },
        ],
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c3"), q("c5"), q("c7")],
      },
    ],
  },
  {
    id: "biology.junior.nutrients",
    title: "養分：酵素、消化與光合作用",
    grade: 7,
    minutes: 15,
    nodeIds: [n("enzyme"), n("digestion"), n("photosynthesis")],
    objectives: [
      "能說明溫度與 pH 值如何影響酵素活性",
      "能依序說出食物通過消化道的路徑與各消化液的作用",
      "能設計對照實驗，證明光合作用會產生澱粉",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿實驗：酵素的最適溫度與 pH",
        prompt:
          "圖中是兩種消化酵素在不同溫度下的活性曲線（以目前的 pH 計算）。調整溫度與 pH，觀察活性如何變化。",
        params: [
          { key: "t", label: "溫度", min: 0, max: 80, step: 1, init: 20, unit: "°C" },
          { key: "ph", label: "pH 值", min: 1, max: 13, step: 0.5, init: 7 },
        ],
        plot: {
          x: [0, 80],
          y: [0, 110],
          xLabel: "溫度（°C）",
          yLabel: "活性（%）",
          fns: [
            { label: "唾液澱粉酶", color: "#2563eb", f: (x, p) => amylase(x, p.ph) },
            { label: "胃蛋白酶", color: "#e11d48", f: (x, p) => pepsin(x, p.ph) },
          ],
          points: (p) => [
            { x: p.t, y: amylase(p.t, p.ph), color: "#2563eb" },
            { x: p.t, y: pepsin(p.t, p.ph), color: "#e11d48" },
          ],
          vlines: (p) => [{ x: p.t, label: `${p.t}°C`, color: "#64748b" }],
        },
        readouts: [
          { label: "唾液澱粉酶活性", value: (p) => pct(amylase(p.t, p.ph)) },
          { label: "胃蛋白酶活性", value: (p) => pct(pepsin(p.t, p.ph)) },
          {
            label: "環境",
            value: (p) => (p.ph < 6.5 ? "酸性" : p.ph > 7.5 ? "鹼性" : "接近中性"),
          },
          {
            label: "溫度狀態",
            value: (p) => (p.t > 50 ? "過熱：酵素變性" : p.t < 15 ? "偏冷：活性降低" : "適中"),
          },
        ],
        goal: {
          text: "調整溫度與 pH，讓**胃蛋白酶**的活性達到 90% 以上。",
          test: (p) => pepsin(p.t, p.ph) >= 90,
        },
        insight:
          "每種酵素都有自己的**最適溫度**與**最適 pH**。人體酵素的最適溫度約 37°C；胃蛋白酶在強酸性（pH 約 2）的胃中最活躍，唾液澱粉酶則在接近中性時最好。高溫會使酵素**變性**、無法恢復；低溫只是暫時降低活性。（圖為示意模型）",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "排序：食物的旅程",
        prompt: "一口飯吃下肚後，會依序經過哪些器官？由先到後排列。",
        items: [
          { id: "d1", label: "口腔" },
          { id: "d2", label: "咽" },
          { id: "d3", label: "食道" },
          { id: "d4", label: "胃" },
          { id: "d5", label: "小腸" },
          { id: "d6", label: "大腸" },
          { id: "d7", label: "肛門" },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "match",
        title: "配對：消化液的作用",
        pairs: [
          { id: "j1", left: "唾液", right: "含唾液澱粉酶，把澱粉分解成麥芽糖" },
          { id: "j2", left: "胃液", right: "呈強酸性，含胃蛋白酶，初步分解蛋白質" },
          { id: "j3", left: "膽汁", right: "由肝臟製造，不含酵素，能乳化脂肪" },
          { id: "j4", left: "胰液", right: "由胰臟分泌，含分解醣類、蛋白質與脂質的酵素" },
          { id: "j5", left: "腸液", right: "由小腸腺分泌，協助完成最後的消化" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：證明光合作用產生澱粉",
        problem: "如何用實驗證明「葉片照光後會製造澱粉」？",
        steps: [
          {
            show: "把盆栽放在**暗處約一天**。",
            why: "讓葉片中原有的澱粉被消耗或運走，避免干擾結果。",
            predict: {
              question: "為什麼要先把盆栽放在暗處？",
              choices: ["讓葉片原有的澱粉被消耗掉", "讓葉片吸收更多水分", "讓葉綠素增加"],
              answer: 0,
            },
          },
          {
            show: "用鋁箔紙遮住一片葉子的一部分，再照光數小時。",
            why: "遮光部分是**對照組**；同一片葉子上，只有「有沒有照光」不同。",
          },
          {
            show: "摘下葉片，放入酒精中**隔水加熱**，使葉片褪成白色。",
            why: "酒精能溶解葉綠素，方便觀察顏色變化；酒精易燃，不可以直接用火加熱。",
            predict: {
              question: "為什麼要「隔水」加熱？",
              choices: ["酒精易燃，直接加熱很危險", "讓澱粉溶出來", "讓酒精變成碘液"],
              answer: 0,
            },
          },
          {
            show: "用清水沖洗葉片，滴上**碘液**。",
            why: "碘液遇到澱粉會變成**藍黑色**。",
          },
          {
            show: "結果：照光部分呈藍黑色，遮光部分沒有變成藍黑色。",
            predict: {
              question: "哪個部分會變成藍黑色？",
              choices: ["照光的部分", "遮光的部分", "兩者都會"],
              answer: 0,
            },
          },
        ],
        takeaway:
          "光合作用需要**光**，產生的葡萄糖可轉變成**澱粉**儲存。好的實驗要有**對照組**，一次只改變一個變因。",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("n1"), q("n3"), q("n4"), q("n5"), q("n7")],
      },
      {
        id: "a6",
        kind: "set",
        title: "素養題組：唾液澱粉酶與溫度",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-amylase-1"), q("set-amylase-2"), q("set-amylase-3")],
      },
    ],
  },
  {
    id: "biology.junior.blood-flow",
    title: "運輸：植物的維管束與人體的血液循環",
    grade: 7,
    minutes: 14,
    nodeIds: [n("plant-transport"), n("circulation"), n("blood")],
    objectives: [
      "能區分木質部與韌皮部的功能",
      "能指出心臟四個腔室與相連的血管",
      "能說出體循環與肺循環的路徑",
      "能說明血液各成分的功能",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "分類：木質部還是韌皮部？",
        prompt: "把每張卡片拖到正確的維管束組織。",
        buckets: [
          { id: "xylem", label: "木質部" },
          { id: "phloem", label: "韌皮部" },
        ],
        items: [
          { id: "x1", label: "運輸水分", bucket: "xylem" },
          { id: "x2", label: "運輸礦物質（無機鹽）", bucket: "xylem" },
          { id: "x3", label: "主要由導管負責運輸", bucket: "xylem" },
          { id: "x4", label: "運輸方向主要由根往上", bucket: "xylem" },
          { id: "p1", label: "運輸葉片製造的養分", bucket: "phloem" },
          { id: "p2", label: "主要由篩管負責運輸", bucket: "phloem" },
          { id: "p3", label: "可向上也可向下運輸", bucket: "phloem" },
          { id: "p4", label: "樹皮環狀剝除後，切口上方膨大", bucket: "phloem" },
        ],
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "找找看：心臟的構造",
        prompt:
          "依照提示，在心臟縱切圖上點出正確的位置。注意：圖的**左側是人體的右側**；藍色代表缺氧血、紅色代表充氧血。",
        viewBox: "0 0 400 340",
        scene: heartScene,
        mode: "find",
        spots: [
          {
            id: "ra",
            x: 137,
            y: 141,
            title: "右心房",
            body: "接收由上、下大靜脈流回的**缺氧血**（來自全身）。心房與心室之間有瓣膜，防止血液倒流。",
          },
          {
            id: "rv",
            x: 148,
            y: 240,
            title: "右心室",
            body: "收縮時把缺氧血經**肺動脈**送到肺部進行氣體交換（肺循環的起點）。",
          },
          {
            id: "la",
            x: 263,
            y: 141,
            title: "左心房",
            body: "接收由**肺靜脈**流回的**充氧血**（來自肺部）。",
          },
          {
            id: "lv",
            x: 252,
            y: 245,
            title: "左心室",
            body: "把充氧血經主動脈送往全身（體循環的起點），肌肉壁**最厚**、收縮力最強。",
          },
          {
            id: "aorta",
            x: 218,
            y: 100,
            title: "主動脈",
            body: "人體最粗的動脈，由左心室發出，把充氧血送往全身。基部有瓣膜防止血液倒流回心室。",
          },
          {
            id: "pa",
            x: 182,
            y: 150,
            title: "肺動脈",
            body: "由右心室發出，把缺氧血送到肺部。它是**動脈，卻流著缺氧血**。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排序：血液繞一圈",
        prompt: "從左心室出發，依序排出血液流經的路徑，最後回到左心房。",
        items: [
          { id: "b1", label: "左心室" },
          { id: "b2", label: "主動脈" },
          { id: "b3", label: "全身各處的微血管" },
          { id: "b4", label: "上、下大靜脈" },
          { id: "b5", label: "右心房" },
          { id: "b6", label: "右心室" },
          { id: "b7", label: "肺動脈" },
          { id: "b8", label: "肺部的微血管" },
          { id: "b9", label: "肺靜脈" },
          { id: "b10", label: "左心房" },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：血液與淋巴",
        pairs: [
          ["紅血球", "含血紅素，運輸氧氣"],
          ["白血球", "對抗病原體，參與防禦"],
          ["血小板", "幫助血液凝固"],
          ["血漿", "運輸養分、激素與廢物"],
          ["淋巴", "收集組織液並送回血液循環"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("t1"), q("t2"), q("t3"), q("t4"), q("t5"), q("t7")],
      },
    ],
  },
  {
    id: "biology.junior.body-balance",
    title: "協調與恆定：身體的自動控制",
    grade: 7,
    minutes: 15,
    nodeIds: [n("nervous"), n("endocrine"), n("temp-sugar")],
    objectives: [
      "能說出反射的路徑並舉例",
      "能配對常見激素與分泌腺體",
      "能說明胰島素與升糖素如何維持血糖恆定",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "order",
        title: "排序：縮手反射的路徑",
        prompt: "手碰到燙的東西立刻縮回。把訊息傳遞的順序排好。",
        items: [
          { id: "r1", label: "皮膚的**受器**感受到高溫刺激" },
          { id: "r2", label: "**感覺神經元**把訊息傳入" },
          { id: "r3", label: "**脊髓**（反射中樞）處理訊息" },
          { id: "r4", label: "**運動神經元**把命令傳出" },
          { id: "r5", label: "手臂肌肉（**動器**）收縮，把手縮回" },
        ],
      },
      {
        id: "a2",
        kind: "memory",
        title: "翻牌配對：激素與腺體",
        pairs: [
          ["胰島素", "胰臟分泌，使血糖降低"],
          ["甲狀腺素", "甲狀腺分泌，促進新陳代謝"],
          ["生長激素", "腦垂腺分泌，促進生長"],
          ["腎上腺素", "腎上腺分泌，緊急時使心跳加快"],
          ["睪固酮", "睪丸分泌，促進男性第二性徵"],
          ["動情素", "卵巢分泌，促進女性第二性徵"],
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：飯後的血糖調節",
        problem: "小明吃完一大碗飯後，身體如何讓升高的血糖回到正常範圍？",
        steps: [
          {
            show: "米飯中的澱粉在消化道被分解成**葡萄糖**，由小腸吸收進入血液，血糖上升。",
          },
          {
            show: "胰臟中的**胰島**偵測到血糖上升，分泌**胰島素**進入血液。",
            predict: {
              question: "這時胰臟會分泌哪一種激素？",
              choices: ["胰島素", "升糖素", "腎上腺素"],
              answer: 0,
            },
          },
          {
            show: "胰島素促進身體細胞吸收葡萄糖，並使**肝臟**把葡萄糖合成**肝醣**儲存。",
            why: "血液中的葡萄糖被移走，血糖因此下降。",
          },
          {
            show: "血糖回到正常範圍後，胰島素的分泌隨之減少。",
            why: "變化的結果反過來抑制原本的變化，這種調節方式稱為**負回饋**。",
            predict: {
              question: "血糖回到正常後，胰島素的分泌會怎樣？",
              choices: ["持續增加", "減少", "不受影響"],
              answer: 1,
            },
          },
          {
            show: "若空腹太久、血糖偏低，胰島改分泌**升糖素**，促使肝醣分解成葡萄糖釋入血液。",
          },
        ],
        takeaway: "胰島素（降血糖）與升糖素（升血糖）作用相反，透過**負回饋**讓血糖維持**恆定**。",
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：衛教師的血糖小教室",
        scenarioId: "biology.junior.s-blood-sugar",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("h1"), q("h2"), q("h3"), q("h4"), q("h5")],
      },
    ],
  },
  {
    id: "biology.junior.heredity",
    title: "生殖與遺傳：孟德爾的豌豆",
    grade: 7,
    minutes: 15,
    nodeIds: [n("flower"), n("meiosis"), n("mendel"), n("sex-linked")],
    objectives: [
      "能說出花的構造與受精後的發育",
      "能用棋盤方格法推算子代的基因型與表現型比例",
      "能解釋性聯遺傳中男性色盲較多的原因",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "熱區探索：花的構造",
        prompt: "花是被子植物的生殖器官。點擊熱點，認識各部位與有性生殖的關係。",
        viewBox: "0 0 400 320",
        scene: flowerScene,
        mode: "explore",
        spots: [
          {
            id: "petal",
            x: 95,
            y: 145,
            title: "花瓣",
            body: "常有鮮豔的顏色或香味，可吸引昆蟲等動物前來幫忙傳粉。",
          },
          {
            id: "sepal",
            x: 258,
            y: 226,
            title: "花萼",
            body: "位於花的最外層，通常是綠色，在花苞時期保護花的內部構造。",
          },
          {
            id: "anther",
            x: 246,
            y: 112,
            title: "花藥",
            body: "雄蕊頂端，能產生**花粉粒**；花粉粒內含精細胞。",
          },
          {
            id: "filament",
            x: 235,
            y: 170,
            title: "花絲",
            body: "支撐花藥的細柄。花藥與花絲合稱**雄蕊**。",
          },
          {
            id: "stigma",
            x: 200,
            y: 104,
            title: "柱頭",
            body: "雌蕊頂端，常有黏液可黏住花粉。花粉落到柱頭上稱為**授粉**。",
          },
          {
            id: "ovary",
            x: 172,
            y: 206,
            title: "子房",
            body: "雌蕊基部膨大的部分。受精後，子房發育成**果實**。",
          },
          {
            id: "ovule",
            x: 218,
            y: 204,
            title: "胚珠",
            body: "位於子房內，含有卵細胞。精細胞與卵細胞結合（受精）後，胚珠發育成**種子**。",
          },
        ],
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：遺傳名詞",
        cards: [
          {
            front: "顯性與隱性",
            back: "純品系高莖 × 矮莖，子代只表現高莖：高莖是**顯性**，矮莖是**隱性**。",
          },
          {
            front: "基因型與表現型",
            back: "基因型是基因的組成（如 Tt）；表現型是表現出來的性狀（如高莖）。",
          },
          {
            front: "對偶基因",
            back: "位於成對染色體相同位置、控制同一性狀的一對基因，例如 T 與 t。",
          },
          {
            front: "減數分裂",
            back: "產生配子時，染色體數目減半。人類的精子與卵各有 23 條染色體。",
          },
          {
            front: "人類的性別由誰決定？",
            back: "女性 XX、男性 XY。卵只帶 X，所以由**父親的精子**帶 X 或 Y 決定。",
          },
        ],
      },
      {
        id: "a3",
        kind: "lab",
        title: "實驗：棋盤方格法",
        prompt: "選擇兩個親代的基因型，觀察子代的基因型與表現型比例，完成兩個任務。",
        load: punnettLab,
        insight:
          "形成配子時，成對的對偶基因會**分離**，每個配子只帶一個（孟德爾的分離律）。Tt × Tt → 3 : 1；Tt × tt → 1 : 1。",
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：紅綠色盲的遺傳",
        problem:
          "色覺正常的男性，與色覺正常但**帶有色盲基因**的女性結婚。子女罹患紅綠色盲的情形為何？（以 $X^B$ 表示正常、$X^b$ 表示色盲）",
        steps: [
          {
            show: "父親的基因型為 $X^BY$；母親為 $X^BX^b$。",
            why: "紅綠色盲基因位在 X 染色體上，是隱性；男性只有一條 X 染色體。",
            predict: {
              question: "色覺正常的父親，基因型是？",
              choices: ["$X^BY$", "$X^bY$", "$X^BX^b$"],
              answer: 0,
            },
          },
          {
            show: "父親的精子帶 $X^B$ 或 $Y$；母親的卵帶 $X^B$ 或 $X^b$，各占一半。",
          },
          {
            show: "子代組合：$X^BX^B$、$X^BX^b$、$X^BY$、$X^bY$，各占 $\\frac{1}{4}$。",
          },
          {
            show: "女兒都色覺正常（其中一半是帶因者）；兒子有 $\\frac{1}{2}$ 的機率是色盲（$X^bY$）。",
            predict: {
              question: "他們的兒子是色盲的機率是多少？",
              choices: ["0", "$\\frac{1}{4}$", "$\\frac{1}{2}$", "1"],
              answer: 2,
            },
          },
        ],
        takeaway:
          "兒子的 X 染色體一定來自母親。男性只要一個 $X^b$ 就會表現色盲，所以**男性色盲的比例比女性高**。",
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：豌豆園裡的孟德爾",
        scenarioId: "biology.junior.s-mendel",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("g1"), q("g2"), q("g3"), q("g4"), q("g6"), q("g7")],
      },
    ],
  },
  {
    id: "biology.junior.eco-web",
    title: "演化、分類與生態系",
    grade: 7,
    minutes: 15,
    nodeIds: [
      n("natural-selection"),
      n("kingdoms"),
      n("classification"),
      n("ecosystem"),
      n("energy-matter"),
    ],
    objectives: [
      "能用天擇說解釋抗藥性細菌的出現",
      "能把常見生物歸入五界",
      "能畫出食物網，並說明能量流動與物質循環",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：生態系的組成",
        root: {
          id: "eco",
          title: "生態系",
          children: [
            {
              id: "eco-bio",
              title: "生物部分",
              children: [
                { id: "eco-p", title: "生產者", summary: "綠色植物、藻類等，行光合作用製造養分。" },
                {
                  id: "eco-c",
                  title: "消費者",
                  summary: "直接或間接以生產者為食，例如草食與肉食動物。",
                },
                { id: "eco-d", title: "分解者", summary: "細菌與真菌，把遺體與排遺分解成無機物。" },
              ],
            },
            {
              id: "eco-abio",
              title: "非生物部分",
              summary: "陽光、空氣、水、土壤、溫度等。",
            },
            {
              id: "eco-flow",
              title: "能量流動",
              summary: "能量來自太陽，沿食物鏈單向流動、逐級遞減。",
            },
            {
              id: "eco-cycle",
              title: "物質循環",
              summary: "碳、氮、水在生物與環境之間循環使用。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：抗藥性細菌從哪裡來？",
        problem: "為什麼長期濫用抗生素，會讓具抗藥性的細菌越來越多？",
        steps: [
          {
            show: "細菌族群中，個體之間本來就有**變異**，少數細菌恰好帶有抗藥性。",
            why: "變異是隨機產生的（例如突變），不是接觸抗生素之後才「學會」抗藥。",
            predict: {
              question: "抗藥性是怎麼來的？",
              choices: [
                "細菌接觸藥物後主動產生",
                "族群中原本就有少數帶抗藥性的個體",
                "抗生素把細菌變成抗藥性細菌",
              ],
              answer: 1,
            },
          },
          { show: "使用抗生素時，不具抗藥性的細菌大多被殺死。" },
          {
            show: "具抗藥性的細菌存活下來並大量繁殖，把抗藥性基因傳給後代。",
            why: "環境把較適合的個體「選擇」出來，這就是**天擇**。",
          },
          {
            show: "一再濫用抗生素後，族群中抗藥性細菌的比例越來越高。",
            predict: {
              question: "怎樣做可以減緩抗藥性細菌的出現？",
              choices: [
                "遵照醫師指示使用抗生素，不自行購買或濫用",
                "一感冒就吃抗生素",
                "藥量越多越好",
              ],
              answer: 0,
            },
          },
        ],
        takeaway:
          "天擇的要素：個體有**變異**且可遺傳、生物**過度繁殖**而有生存競爭、適合環境的個體**存活並留下較多後代**。發生演化的是族群，而不是單一個體。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分類：五界大挑戰",
        prompt: "把每種生物拖到牠所屬的界。",
        buckets: [
          { id: "monera", label: "原核生物界" },
          { id: "protista", label: "原生生物界" },
          { id: "fungi", label: "真菌界" },
          { id: "plantae", label: "植物界" },
          { id: "animalia", label: "動物界" },
        ],
        items: [
          { id: "k1", label: "大腸桿菌", bucket: "monera" },
          { id: "k2", label: "藍綠菌", bucket: "monera" },
          { id: "k3", label: "草履蟲", bucket: "protista" },
          { id: "k4", label: "矽藻", bucket: "protista" },
          { id: "k5", label: "變形蟲", bucket: "protista" },
          { id: "k6", label: "香菇", bucket: "fungi" },
          { id: "k7", label: "酵母菌", bucket: "fungi" },
          { id: "k8", label: "地錢", bucket: "plantae" },
          { id: "k9", label: "筆筒樹", bucket: "plantae" },
          { id: "k10", label: "水稻", bucket: "plantae" },
          { id: "k11", label: "珊瑚", bucket: "animalia" },
          { id: "k12", label: "臺灣藍鵲", bucket: "animalia" },
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：稻田的食物網",
        task: "用下列生物畫出一個食物網，以箭頭表示「被吃者 → 捕食者」：水稻、蝗蟲、麻雀、青蛙、蛇、老鷹。",
        background: "blank",
        hint: "箭頭方向就是能量流動的方向，例如「水稻 → 蝗蟲」。一種生物可以吃好幾種食物。",
        reference:
          "可能的食物網：水稻 → 蝗蟲 → 青蛙 → 蛇 → 老鷹；水稻 → 麻雀；蝗蟲 → 麻雀；麻雀 → 蛇；麻雀 → 老鷹。\n\n水稻是**生產者**；老鷹位在最高營養階層，能獲得的能量最少。若蛇大量減少，青蛙可能先增加，進而影響蝗蟲的數量。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e4"), q("e5"), q("e6"), q("e9")],
      },
      {
        id: "a6",
        kind: "set",
        title: "素養題組：湖泊食物鏈的能量與毒物",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-foodchain-1"), q("set-foodchain-2"), q("set-foodchain-3")],
      },
    ],
  },
];

export default lessons;
