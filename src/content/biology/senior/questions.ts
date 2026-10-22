import type { Question } from "../../types";

const id = (s: string) => `biology.senior.q-${s}`;
const node = (s: string) => `biology.senior.${s}`;

const CODON_SET = `下表節錄部分密碼子的對照（為真實的遺傳密碼）。某段基因（**教學用假設**）轉錄出的正常 mRNA 為：5'-AUG UUU GAA AAA UGG UAA-3'

| 密碼子 | AUG | UUU | GAA | GAG | AAA | UGG | UAA |
|---|---|---|---|---|---|---|---|
| 意義 | 甲硫胺酸（起始） | 苯丙胺酸 | 麩胺酸 | 麩胺酸 | 離胺酸 | 色胺酸 | 終止 |

突變株甲：第 3 個密碼子由 GAA 變成 GAG。
突變株乙：第 4 個密碼子由 AAA 變成 UAA。`;

const DEER_SET = `某座沒有天敵的島嶼上引入 20 隻鹿，生態學家每兩年調查一次族群大小（以下為**教學用的假設資料**）。

| 年 | 0 | 2 | 4 | 6 | 8 | 10 | 12 |
|---|---|---|---|---|---|---|---|
| 鹿的數量（隻） | 20 | 50 | 120 | 240 | 330 | 370 | 380 |`;

const questions: Question[] = [
  // 細胞與膜運輸
  {
    id: id("m1"),
    type: "single",
    stem: "氧氣由肺泡進入微血管，主要透過哪一種方式？",
    choices: ["簡單擴散", "主動運輸", "胞吞作用", "胞吐作用"],
    answer: 0,
    explain:
      "氧是小型非極性分子，可直接穿過磷脂雙層，由高濃度往低濃度移動，屬於**簡單擴散**，不消耗 ATP。",
    difficulty: 1,
    nodeId: node("membrane-transport"),
  },
  {
    id: id("m2"),
    type: "single",
    stem: "把人類紅血球放入蒸餾水中，會發生什麼現象？",
    choices: ["失水皺縮", "形狀不變", "吸水膨脹，甚至破裂", "發生質壁分離"],
    answer: 2,
    explain:
      "蒸餾水對紅血球而言是**低張溶液**，水分子以滲透作用進入細胞，使紅血球膨脹甚至破裂（溶血）。質壁分離只會發生在有細胞壁的細胞。",
    difficulty: 1,
    nodeId: node("membrane-transport"),
  },
  {
    id: id("m3"),
    type: "multi",
    stem: "下列哪些物質運輸的過程需要消耗能量？（複選）",
    choices: [
      "鈉鉀幫浦把 $\\ce{Na+}$ 運出細胞",
      "白血球以胞吞作用吞噬細菌",
      "胰臟細胞以胞吐作用分泌胰島素",
      "葡萄糖經載體蛋白順濃度梯度進入紅血球",
      "$\\ce{CO2}$ 擴散出細胞",
    ],
    answer: [0, 1, 2],
    explain: "主動運輸、胞吞與胞吐都需要消耗能量；促進性擴散與簡單擴散屬於被動運輸，不消耗 ATP。",
    difficulty: 2,
    nodeId: node("membrane-transport"),
  },
  {
    id: id("m4"),
    type: "tf",
    stem: "原核細胞沒有核膜包圍的細胞核，也沒有粒線體等膜狀胞器，但具有核糖體。",
    answer: true,
    explain: "原核細胞（如細菌）的 DNA 位於類核區，沒有核膜；但所有細胞都有核糖體來合成蛋白質。",
    difficulty: 1,
    nodeId: node("cell-structure"),
  },
  {
    id: id("m5"),
    type: "single",
    stem: "下列何者**不是**細胞學說的主要內容？",
    choices: [
      "所有生物都由細胞構成",
      "細胞是生物構造與功能的基本單位",
      "細胞來自原有的細胞",
      "所有細胞都具有細胞壁",
    ],
    answer: 3,
    explain: "動物細胞沒有細胞壁，這不是細胞學說的內容。其餘三項是細胞學說的核心。",
    difficulty: 1,
    nodeId: node("cell-theory"),
  },
  {
    id: id("m6"),
    type: "cloze",
    stem: "細胞的「能量貨幣」，分子中含有三個磷酸根，其英文縮寫是＿＿＿。",
    accept: ["ATP", "腺苷三磷酸", "三磷酸腺苷"],
    explain: "**ATP**（腺苷三磷酸）水解為 ADP 與磷酸時釋出能量，供細胞的各種生命活動使用。",
    difficulty: 1,
    nodeId: node("atp-enzyme"),
  },
  {
    id: id("m7"),
    type: "single",
    stem: "胰臟細胞製造並分泌消化酵素時，負責將蛋白質修飾、分類並包裝成分泌小泡的胞器是？",
    choices: ["溶體", "高基氏體", "粒線體", "中心粒"],
    answer: 1,
    explain: "蛋白質在粗糙內質網上的核糖體合成，再送到**高基氏體**修飾、包裝，最後以胞吐作用分泌。",
    difficulty: 2,
    nodeId: node("cell-structure"),
  },

  // 能量代謝
  {
    id: id("r1"),
    type: "single",
    stem: "細胞呼吸中的糖解作用發生在細胞的哪個部位？",
    choices: ["細胞質", "粒線體基質", "粒線體內膜", "葉綠體基質"],
    answer: 0,
    explain: "糖解作用在**細胞質**進行，把一分子葡萄糖分解成兩分子丙酮酸，不需要氧。",
    difficulty: 1,
    nodeId: node("respiration"),
  },
  {
    id: id("r2"),
    type: "single",
    stem: "在有氧呼吸中，氧氣扮演什麼角色？",
    choices: [
      "在糖解作用中分解葡萄糖",
      "作為電子傳遞鏈最終的電子接受者，生成水",
      "與碳結合直接生成二氧化碳",
      "在克氏循環中合成葡萄糖",
    ],
    answer: 1,
    explain:
      "氧是**電子傳遞鏈最終的電子接受者**，與電子及 $\\ce{H+}$ 結合生成水。缺氧時電子傳遞鏈停擺，只能靠發酵產生少量 ATP。呼吸作用釋出的 $\\ce{CO2}$ 來自丙酮酸氧化與克氏循環。",
    difficulty: 2,
    nodeId: node("respiration"),
  },
  {
    id: id("r3"),
    type: "tf",
    stem: "人體肌肉在缺氧時進行乳酸發酵，這個過程不會產生二氧化碳。",
    answer: true,
    explain:
      "乳酸發酵把丙酮酸還原成乳酸，不釋出 $\\ce{CO2}$；酵母菌的酒精發酵則會產生酒精與 $\\ce{CO2}$。",
    difficulty: 2,
    nodeId: node("respiration"),
  },
  {
    id: id("r4"),
    type: "single",
    stem: "光反應的產物中，哪些會被送到碳反應使用？",
    choices: ["$\\ce{O2}$ 與水", "ATP 與 NADPH", "葡萄糖與 $\\ce{CO2}$", "ADP 與 $\\ce{NADP+}$"],
    answer: 1,
    explain:
      "光反應產生的 **ATP 與 NADPH** 提供碳反應固定 $\\ce{CO2}$ 、合成醣類所需的能量與還原力。",
    difficulty: 2,
    nodeId: node("photosynthesis"),
  },
  {
    id: id("r5"),
    type: "single",
    stem: "光合作用釋出的氧氣，來自下列哪一種原料？",
    choices: ["二氧化碳", "水", "葡萄糖", "葉綠素"],
    answer: 1,
    explain: "以同位素標記實驗證實，光反應中**水**被分解，釋出的氧氣來自水分子。",
    difficulty: 2,
    nodeId: node("photosynthesis"),
  },
  {
    id: id("r6"),
    type: "multi",
    stem: "下列哪些反應發生在葉綠體的**基質**？（複選）",
    choices: ["固定 $\\ce{CO2}$", "卡爾文循環", "水的分解", "葉綠素吸收光能"],
    answer: [0, 1],
    explain:
      "碳反應（卡爾文循環）在基質中固定 $\\ce{CO2}$；水的分解與光能吸收屬於光反應，發生在類囊體膜。",
    difficulty: 2,
    nodeId: node("photosynthesis"),
  },
  {
    id: id("r7"),
    type: "single",
    stem: "「光補償點」是指哪一種情況下的光強度？",
    choices: [
      "光合作用速率達到最大值",
      "光合作用速率等於呼吸作用速率",
      "植物停止呼吸作用",
      "葉綠素開始被破壞",
    ],
    answer: 1,
    explain:
      "在光補償點，光合作用吸收的 $\\ce{CO2}$ 恰好等於呼吸作用釋出的量，**淨光合作用速率為 0**。",
    difficulty: 2,
    nodeId: node("limiting-factors"),
  },

  // 遺傳
  {
    id: id("d1"),
    type: "numeric",
    stem: "某雙股 DNA 分子中，腺嘌呤（A）占全部鹼基的 30%，則鳥糞嘌呤（G）占多少百分比？",
    answer: 20,
    unit: "%",
    explain: "A = T = 30%，A + T = 60%；剩下的 40% 由 G 與 C 平分，所以 G = **20%**。",
    difficulty: 2,
    nodeId: node("dna"),
  },
  {
    id: id("d2"),
    type: "single",
    stem: "「DNA 半保留複製」的意思是什麼？",
    choices: [
      "只有一半的 DNA 會被複製",
      "每個新的 DNA 分子都保留一股原來的舊股",
      "複製後舊 DNA 被分解成一半",
      "兩個新 DNA 分子，一個全新、一個全舊",
    ],
    answer: 1,
    explain: "複製時雙股分開，各自作為模板合成新股，所以每個子代 DNA 都含**一股舊股、一股新股**。",
    difficulty: 1,
    nodeId: node("dna"),
  },
  {
    id: id("d3"),
    type: "cloze",
    stem: "DNA 模板股的序列為 3′-TAC-5′，轉錄出的 mRNA 密碼子為何？（依 5′→3′ 寫出三個鹼基）",
    accept: ["AUG", "5'-AUG-3'", "5′-AUG-3′"],
    explain: "依互補配對且 RNA 以 U 取代 T：T→A、A→U、C→G，得 5′-**AUG**-3′，也就是起始密碼子。",
    difficulty: 2,
    nodeId: node("expression"),
  },
  {
    id: id("d4"),
    type: "single",
    stem: "在真核細胞中，轉錄與轉譯分別主要發生在哪裡？",
    choices: [
      "都在細胞核",
      "轉錄在細胞核，轉譯在細胞質的核糖體",
      "轉錄在核糖體，轉譯在細胞核",
      "都在粒線體",
    ],
    answer: 1,
    explain:
      "DNA 位於細胞核，轉錄在**細胞核**進行；mRNA 經核孔進入細胞質，在**核糖體**上轉譯成多肽鏈。",
    difficulty: 1,
    nodeId: node("expression"),
  },
  {
    id: id("d5"),
    type: "single",
    stem: "兩對基因位於不同對染色體上，AaBb 與 AaBb 交配，子代的表現型比例為何？（A、B 皆為完全顯性）",
    choices: ["3 : 1", "1 : 1 : 1 : 1", "9 : 3 : 3 : 1", "1 : 2 : 1"],
    answer: 2,
    explain: "兩對性狀獨立分配：$(3:1) \\times (3:1) = 9:3:3:1$。",
    difficulty: 2,
    nodeId: node("mendel"),
  },
  {
    id: id("d6"),
    type: "numeric",
    stem: "兩對基因獨立分配。AaBb 與 aabb 交配，子代基因型為 aabb 的機率是多少百分比？",
    answer: 25,
    unit: "%",
    explain:
      "Aa × aa 得 aa 的機率 $\\frac{1}{2}$；Bb × bb 得 bb 的機率 $\\frac{1}{2}$。兩者相乘為 $\\frac{1}{4}$ = **25%**。",
    difficulty: 2,
    nodeId: node("mendel"),
  },
  {
    id: id("d7"),
    type: "single",
    stem: "聚合酶連鎖反應（PCR）的主要用途是什麼？",
    choices: [
      "依大小分離 DNA 片段",
      "在試管中大量複製特定的 DNA 片段",
      "把 DNA 轉譯成蛋白質",
      "在特定序列切割 DNA",
    ],
    answer: 1,
    explain:
      "PCR 反覆進行「變性 → 黏合 → 延長」的循環，使目標 DNA 片段呈倍數增加。依大小分離是膠體電泳，切割 DNA 是限制酶。",
    difficulty: 1,
    nodeId: node("biotech"),
  },
  {
    id: id("d8"),
    type: "tf",
    stem: "一個密碼子是由 mRNA 上相鄰的三個核苷酸所組成。",
    answer: true,
    explain: "mRNA 每 3 個相鄰的鹼基構成一個**密碼子**，對應一種胺基酸或終止訊號。",
    difficulty: 1,
    nodeId: node("expression"),
  },
  {
    id: id("d9"),
    type: "single",
    stem: "大腸桿菌的乳糖操縱組（lac operon）中，當環境**沒有乳糖**時，會發生什麼事？",
    choices: [
      "抑制蛋白與操作子結合，阻止乳糖分解酵素基因的轉錄",
      "乳糖分解酵素被大量合成",
      "RNA 聚合酶分解抑制蛋白",
      "DNA 被分解成核苷酸",
    ],
    answer: 0,
    explain:
      "沒有乳糖時，抑制蛋白結合在**操作子**上，擋住 RNA 聚合酶，相關基因不轉錄；有乳糖時，乳糖衍生物與抑制蛋白結合使其離開，基因才開始表現，避免浪費能量。",
    difficulty: 3,
    nodeId: node("regulation"),
  },

  // 植物與動物
  {
    id: id("p1"),
    type: "single",
    stem: "高大樹木體內的水分能由根部上升到樹梢，主要的動力是什麼？",
    choices: [
      "韌皮部的壓力流",
      "葉片蒸散作用產生的拉力，加上水分子的內聚力",
      "根部細胞主動把水泵上去",
      "大氣壓力把水壓上去",
    ],
    answer: 1,
    explain:
      "依**內聚力—張力學說**，葉片蒸散失水產生拉力，水分子之間的內聚力使木質部中的水柱連續不斷而被往上拉。",
    difficulty: 2,
    nodeId: node("plant-water"),
  },
  {
    id: id("p2"),
    type: "single",
    stem: "植物在乾旱缺水時，哪一種激素會促使氣孔關閉以減少水分散失？",
    choices: ["生長素", "吉貝素", "離層酸", "乙烯"],
    answer: 2,
    explain:
      "**離層酸**在缺水時增加，使保衛細胞失水、氣孔關閉。乙烯促進果實成熟，生長素促進細胞伸長。",
    difficulty: 2,
    nodeId: node("plant-hormone"),
  },
  {
    id: id("i1"),
    type: "single",
    stem: "體液免疫中，能大量分泌抗體的細胞是哪一種？",
    choices: ["巨噬細胞", "漿細胞", "胞毒性 T 細胞", "紅血球"],
    answer: 1,
    explain:
      "B 細胞受到抗原刺激並經輔助性 T 細胞活化後，分化成**漿細胞**分泌抗體，以及能長期存在的記憶細胞。",
    difficulty: 2,
    nodeId: node("immunity"),
  },
  {
    id: id("i2"),
    type: "single",
    stem: "接種疫苗能預防疾病，主要原理是什麼？",
    choices: [
      "直接把抗體注入體內，屬於被動免疫",
      "讓身體產生針對該病原體的記憶細胞，屬於主動免疫",
      "疫苗會殺死體內所有細菌",
      "疫苗使紅血球數量增加",
    ],
    answer: 1,
    explain:
      "疫苗含有減毒、不活化的病原體或其成分（或可讓細胞製造抗原的遺傳物質），誘發**主動免疫**並產生**記憶細胞**；日後遇到真正的病原體時能快速反應。",
    difficulty: 2,
    nodeId: node("immunity"),
  },
  {
    id: id("i3"),
    type: "single",
    stem: "神經元產生動作電位時，膜電位迅速由負轉正（去極化），主要是因為哪一種離子大量流入細胞？",
    choices: ["$\\ce{K+}$", "$\\ce{Na+}$", "$\\ce{Cl-}$", "$\\ce{Ca^2+}$"],
    answer: 1,
    explain:
      "達到閾值時，電位依賴型 $\\ce{Na+}$ 通道打開，$\\ce{Na+}$ 大量流入造成**去極化**；隨後 $\\ce{K+}$ 流出使膜電位回復（再極化）。",
    difficulty: 2,
    nodeId: node("neuron"),
  },
  {
    id: id("i4"),
    type: "tf",
    stem: "神經元處於靜止狀態時，細胞膜內相對於膜外為負電位，約為 −70 mV。",
    answer: true,
    explain: "靜止膜電位主要由鈉鉀幫浦與 $\\ce{K+}$ 的外漏所維持，膜內約 −70 mV。",
    difficulty: 1,
    nodeId: node("neuron"),
  },
  {
    id: id("i5"),
    type: "single",
    stem: "化學突觸中，訊息只能單向傳遞的原因是什麼？",
    choices: [
      "神經傳導物質只由突觸前的軸突末梢釋放，受體位於突觸後膜",
      "突觸後細胞沒有細胞膜",
      "動作電位只能往樹突方向傳",
      "突觸間隙中沒有液體",
    ],
    answer: 0,
    explain:
      "突觸小泡只存在於**軸突末梢**，而神經傳導物質的**受體**位於突觸後膜，因此訊息只能由突觸前傳向突觸後。",
    difficulty: 2,
    nodeId: node("synapse"),
  },

  // 演化
  {
    id: id("v1"),
    type: "single",
    stem: "下列哪一組屬於**同源構造**？",
    choices: [
      "鳥的翼與蝴蝶的翅",
      "人的手臂、鯨的鰭肢、蝙蝠的翼",
      "魚的鰭與章魚的觸手",
      "鯊魚的體型與海豚的體型",
    ],
    answer: 1,
    explain:
      "人的手臂、鯨的鰭肢、蝙蝠的翼骨骼排列相似、來源相同，只是功能不同，是**同源構造**，顯示有共同祖先。鳥翼與蝴蝶翅是同功構造。",
    difficulty: 2,
    nodeId: node("evidence"),
  },
  {
    id: id("v2"),
    type: "single",
    stem: "關於「遺傳漂變」的敘述，何者正確？",
    choices: [
      "族群越大，影響越明顯",
      "對偶基因頻率因機率而隨機改變，在小族群中影響較大",
      "一定使有利的對偶基因頻率增加",
      "是個體為了適應環境而改變基因",
    ],
    answer: 1,
    explain:
      "遺傳漂變是**隨機**的，與適應無關；族群越小，機率造成的波動越大，例如瓶頸效應與創始者效應。",
    difficulty: 2,
    nodeId: node("mechanism"),
  },
  {
    id: id("v3"),
    type: "tf",
    stem: "長頸鹿因為常常伸長脖子吃高處的葉子，脖子變長，並把長脖子遺傳給後代——這是現代演化理論的核心觀點。",
    answer: false,
    explain:
      "這是拉馬克的「用進廢退、獲得性遺傳」。現代演化理論認為：族群中原本就有脖子長短的可遺傳變異，經**天擇**後長脖子個體留下較多後代。",
    difficulty: 1,
    nodeId: node("mechanism"),
  },
  {
    id: id("v4"),
    type: "single",
    stem: "依據分子證據，生物可分為三域。下列何者正確？",
    choices: [
      "細菌域、古細菌域、真核生物域",
      "原核域、真菌域、動植物域",
      "植物域、動物域、微生物域",
      "細菌域、病毒域、真核生物域",
    ],
    answer: 0,
    explain: "三域為**細菌域、古細菌域、真核生物域**。病毒沒有細胞構造，不屬於三域中的任何一域。",
    difficulty: 1,
    nodeId: node("domains"),
  },
  {
    id: id("v5"),
    type: "cloze",
    stem: "兩個族群即使相遇也無法交配，或無法產生具生殖能力的後代，這種現象稱為＿＿＿。",
    accept: ["生殖隔離"],
    explain: "**生殖隔離**使族群之間不再有基因交流，是判定不同物種的重要依據。",
    difficulty: 2,
    nodeId: node("speciation"),
  },
  {
    id: id("v6"),
    type: "numeric",
    stem: "某族群符合哈地－溫伯格平衡，隱性表現型（aa）個體占 9%。異型合子（Aa）約占多少百分比？",
    answer: 42,
    unit: "%",
    explain:
      "$q^2 = 0.09$，$q = 0.3$，$p = 0.7$；$2pq = 2 \\times 0.7 \\times 0.3 = 0.42$，即 **42%**。",
    difficulty: 3,
    nodeId: node("mechanism"),
  },

  // 生態
  {
    id: id("e1"),
    type: "single",
    stem: "族群呈邏輯斯諦（S 型）成長時，族群數量 N 為多少時成長速率最快？",
    choices: ["N 很小時", "$N = \\frac{K}{2}$", "$N = K$", "N 超過 K 時"],
    answer: 1,
    explain:
      "成長速率 $\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)$，在 $N = \\frac{K}{2}$ 時達到最大。",
    difficulty: 2,
    nodeId: node("population"),
  },
  {
    id: id("e2"),
    type: "numeric",
    stem: "某湖泊中魚的環境負荷量 K = 1000 尾。若族群呈 S 型成長，族群數量為多少尾時成長最快？",
    answer: 500,
    unit: "尾",
    explain: "S 型成長在 $N = \\frac{K}{2} = 500$ 尾時成長速率最大。",
    difficulty: 1,
    nodeId: node("population"),
  },
  {
    id: id("e3"),
    type: "multi",
    stem: "下列哪些是溫室氣體？（複選）",
    choices: ["$\\ce{CO2}$", "$\\ce{CH4}$", "$\\ce{N2O}$", "$\\ce{N2}$", "$\\ce{O2}$"],
    answer: [0, 1, 2],
    explain:
      "二氧化碳、甲烷、氧化亞氮（以及水氣等）能吸收地表放出的紅外線，屬於溫室氣體；氮氣與氧氣則不是。",
    difficulty: 2,
    nodeId: node("global-change"),
  },
  {
    id: id("e4"),
    type: "multi",
    stem: "外來入侵種可能對當地生態造成哪些影響？（複選）",
    choices: [
      "與原生種競爭食物與棲地",
      "捕食原生物種",
      "傳播疾病或寄生蟲",
      "一定會增加當地的生物多樣性",
    ],
    answer: [0, 1, 2],
    explain:
      "入侵種常因缺乏天敵而大量繁殖，透過競爭、捕食、傳播疾病等方式壓迫原生種，反而可能**降低**生物多樣性。",
    difficulty: 1,
    nodeId: node("conservation"),
  },
  {
    id: id("e5"),
    type: "single",
    stem: "下列哪一個地點最可能發生**次級演替**？",
    choices: [
      "剛冷卻的火山熔岩",
      "冰河退去後裸露的岩石",
      "森林大火後仍保有土壤的山坡",
      "新形成的火山島",
    ],
    answer: 2,
    explain:
      "次級演替發生在原有群集被破壞、但**土壤仍保留**的地方，如火災後的森林或廢耕農地；其他選項沒有土壤，屬於初級演替。",
    difficulty: 2,
    nodeId: node("community"),
  },
  {
    id: id("e6"),
    type: "tf",
    stem: "生態系中的能量可以在生產者、消費者與分解者之間不斷循環使用。",
    answer: false,
    explain:
      "能量沿食物鏈**單向流動**，每一階層都有大量能量以熱的形式散失，無法循環；可以循環的是碳、氮等物質。",
    difficulty: 1,
    nodeId: node("ecosystem"),
  },

  // 素養題組：密碼子與突變
  {
    id: id("set-codon-1"),
    type: "cloze",
    context: CODON_SET,
    stem: "正常 mRNA 在轉譯時，遇到哪一個密碼子會停止？（請填三個字母）",
    accept: ["UAA"],
    explain:
      "表中 UAA 的意義是「終止」，核糖體遇到終止密碼子時不再接上胺基酸，多肽鏈合成結束。終止密碼子本身不對應任何胺基酸。",
    difficulty: 1,
    nodeId: node("expression"),
  },
  {
    id: id("set-codon-2"),
    type: "single",
    context: CODON_SET,
    stem: "突變株甲製造出的蛋白質，與正常蛋白質相比，最可能有什麼變化？",
    choices: [
      "胺基酸序列完全相同，因為 GAA 與 GAG 都對應麩胺酸",
      "少了一個胺基酸",
      "蛋白質在第 3 個胺基酸後提早終止",
      "第 3 個胺基酸變成離胺酸",
    ],
    answer: 0,
    explain:
      "遺傳密碼具有簡併性，不同的密碼子可以對應同一種胺基酸。GAA 與 GAG 都是麩胺酸，所以這個鹼基改變沒有造成胺基酸改變，稱為**同義突變**。",
    difficulty: 2,
    nodeId: node("expression"),
  },
  {
    id: id("set-codon-3"),
    type: "numeric",
    context: CODON_SET,
    stem: "突變株乙轉譯出的多肽鏈含有幾個胺基酸？",
    answer: 3,
    unit: "個",
    explain:
      "第 4 個密碼子變成 UAA（終止密碼子），轉譯在這裡就停止。前面只有 AUG、UUU、GAA 三個密碼子，對應甲硫胺酸、苯丙胺酸、麩胺酸，共 3 個胺基酸。這種突變稱為**無義突變**，通常使蛋白質失去功能。",
    difficulty: 2,
    nodeId: node("expression"),
  },
  // 素養題組：島上鹿群的成長
  {
    id: id("set-deer-1"),
    type: "single",
    context: DEER_SET,
    stem: "這群鹿的族群成長最接近哪一種曲線？",
    choices: [
      "J 型曲線：持續快速增加，沒有上限",
      "S 型（邏輯斯）曲線：先快速增加，後來趨緩並接近上限",
      "族群數量持續下降",
      "族群數量上下劇烈震盪",
    ],
    answer: 1,
    explain:
      "資料顯示數量先快速上升，到第 8 年之後增加變慢，並接近 380 隻，呈現 S 型曲線，表示環境資源與空間限制了族群繼續成長。",
    difficulty: 1,
    nodeId: node("population"),
  },
  {
    id: id("set-deer-2"),
    type: "numeric",
    context: DEER_SET,
    stem: "根據資料，這座島嶼的環境負荷量最接近多少隻？",
    answer: 380,
    tolerance: 20,
    unit: "隻",
    explain:
      "環境負荷量是環境能長期維持的最大族群大小。後幾次調查的數量（370、380）幾乎不再增加，表示已接近上限，約為 380 隻。",
    difficulty: 2,
    nodeId: node("population"),
  },
  {
    id: id("set-deer-3"),
    type: "single",
    context: DEER_SET,
    stem: "哪一段兩年期間，鹿群**增加的隻數**最多？",
    choices: ["第 0 年到第 2 年", "第 2 年到第 4 年", "第 4 年到第 6 年", "第 8 年到第 10 年"],
    answer: 2,
    explain:
      "各段增加的隻數分別是：0–2 年 +30、2–4 年 +70、4–6 年 +120、6–8 年 +90、8–10 年 +40。第 4 到第 6 年增加最多（120 隻），之後環境阻力變大，增加量就減少。",
    difficulty: 2,
    nodeId: node("population"),
  },
];

export default questions;
