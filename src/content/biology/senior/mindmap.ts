import type { CurriculumNode } from "../../types";

/** 高中生物（108 課綱：部定必修生物，並納入加深加廣選修生物的重點）學習內容 */
const mindmap: CurriculumNode = {
  id: "biology.senior",
  title: "高中生物",
  summary:
    "必修聚焦細胞、遺傳、演化與生態；選修深入細胞與遺傳、植物體與動物體的構造與功能，以及生態、演化與生物多樣性。",
  children: [
    {
      id: "biology.senior.cell",
      title: "細胞的構造與功能",
      summary: "細胞是生命的基本單位；細胞膜控制物質進出，ATP 提供生命活動所需的能量。",
      children: [
        {
          id: "biology.senior.cell-theory",
          title: "細胞學說",
          grade: 10,
          summary: "所有生物都由細胞構成，細胞是生物構造與功能的基本單位，細胞來自原有的細胞。",
          keyPoints: [
            "1665 年虎克（Hooke）觀察軟木塞，命名 cell",
            "許來登（Schleiden）與許旺（Schwann）提出細胞學說",
            "菲爾紹（Virchow）補充：細胞來自原有的細胞",
          ],
          lessonIds: ["biology.senior.cell-membrane"],
        },
        {
          id: "biology.senior.cell-structure",
          title: "原核細胞與真核細胞",
          grade: 10,
          summary: "原核細胞沒有核膜包圍的細胞核與膜狀胞器；真核細胞有細胞核與多種胞器分工。",
          keyPoints: [
            "原核與真核細胞都有細胞膜、核糖體與 DNA",
            "核糖體：合成蛋白質；內質網與高基氏體：修飾、運送與包裝蛋白質",
            "溶體含水解酵素，分解老舊胞器與吞入的物質",
          ],
          lessonIds: ["biology.senior.cell-membrane"],
        },
        {
          id: "biology.senior.membrane-transport",
          title: "細胞膜與物質運輸",
          grade: 10,
          summary: "細胞膜以磷脂雙層為骨架，鑲嵌多種蛋白質（流體鑲嵌模型），具選擇性通透。",
          keyPoints: [
            "**被動運輸**：簡單擴散、促進性擴散、滲透，順濃度梯度、不耗 ATP",
            "**主動運輸**：藉幫浦蛋白消耗 ATP，逆濃度梯度運送",
            "胞吞作用與胞吐作用：以膜泡運送大分子",
          ],
          lessonIds: ["biology.senior.cell-membrane"],
        },
        {
          id: "biology.senior.atp-enzyme",
          title: "ATP 與酵素",
          grade: 10,
          summary: "ATP 是細胞的能量貨幣；酵素降低反應所需的活化能。",
          keyPoints: [
            "ATP 水解成 ADP 與磷酸時釋出能量",
            "酵素具專一性，活性受溫度、pH、受質濃度等影響",
          ],
        },
      ],
    },
    {
      id: "biology.senior.metabolism",
      title: "細胞的能量轉換（選修）",
      summary: "光合作用把光能轉為化學能；細胞呼吸把養分中的化學能轉存到 ATP。",
      children: [
        {
          id: "biology.senior.respiration",
          title: "細胞呼吸與發酵",
          grade: 11,
          summary: "有氧呼吸分為糖解作用、克氏循環與電子傳遞鏈；缺氧時進行發酵。",
          keyPoints: [
            "糖解作用在細胞質；克氏循環在粒線體基質；電子傳遞鏈在粒線體內膜",
            "氧是電子傳遞鏈最終的電子接受者，生成水",
            "乳酸發酵（肌肉、乳酸菌）與酒精發酵（酵母菌）只產生少量 ATP",
          ],
          lessonIds: ["biology.senior.cell-energy"],
        },
        {
          id: "biology.senior.photosynthesis",
          title: "光合作用：光反應與碳反應",
          grade: 11,
          summary: "光反應在類囊體膜產生 ATP、NADPH 並釋出氧；碳反應在基質固定二氧化碳合成醣類。",
          keyPoints: [
            "$\\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$（需光能）",
            "釋出的氧氣來自**水**的分解",
            "碳反應又稱卡爾文循環",
          ],
          lessonIds: ["biology.senior.cell-energy"],
        },
        {
          id: "biology.senior.limiting-factors",
          title: "影響光合作用的因素",
          grade: 11,
          summary: "光強度、二氧化碳濃度與溫度都可能成為限制因子。",
          keyPoints: [
            "**光補償點**：光合作用速率等於呼吸作用速率時的光強度",
            "**光飽和點**：光強度再增加，速率也不再上升",
          ],
          lessonIds: ["biology.senior.cell-energy"],
        },
      ],
    },
    {
      id: "biology.senior.genetics",
      title: "遺傳",
      summary: "從孟德爾的遺傳法則到 DNA 的分子機制與生物技術。",
      children: [
        {
          id: "biology.senior.mendel",
          title: "孟德爾遺傳法則",
          grade: 10,
          summary: "分離律與獨立分配律（自由配合律）說明性狀如何由親代傳給子代。",
          keyPoints: [
            "單性狀雜交：子二代表現型 3 : 1",
            "兩性狀雜交（兩對基因位於不同對染色體）：9 : 3 : 3 : 1",
            "試交：與隱性同型合子交配，以判斷未知個體的基因型",
          ],
        },
        {
          id: "biology.senior.chromosome",
          title: "染色體與遺傳",
          grade: 11,
          summary: "基因位於染色體上；位於同一條染色體上的基因會聯鎖遺傳。",
          keyPoints: [
            "減數分裂時同源染色體分離、互換，增加遺傳多樣性",
            "性聯遺傳：基因位於 X 染色體上，例如紅綠色盲",
          ],
        },
        {
          id: "biology.senior.dna",
          title: "DNA 的構造與複製",
          grade: 10,
          summary: "DNA 是由兩股反向平行的核苷酸鏈組成的雙股螺旋。",
          keyPoints: [
            "鹼基互補配對：A–T（2 個氫鍵）、G–C（3 個氫鍵）",
            "**半保留複製**：每個新 DNA 分子保留一股舊股",
            "DNA 聚合酶只能從 5′ 往 3′ 方向延長新股",
          ],
          lessonIds: ["biology.senior.dna-expression"],
        },
        {
          id: "biology.senior.expression",
          title: "基因表現：轉錄與轉譯",
          grade: 10,
          summary: "中心法則：DNA →（轉錄）→ RNA →（轉譯）→ 蛋白質。",
          keyPoints: [
            "真核細胞的轉錄在細胞核，轉譯在細胞質的核糖體",
            "mRNA 上每 3 個相鄰鹼基為一個密碼子；AUG 為起始密碼子",
            "tRNA 以反密碼子與密碼子配對，攜入對應的胺基酸",
          ],
          lessonIds: ["biology.senior.dna-expression"],
        },
        {
          id: "biology.senior.regulation",
          title: "基因表現的調控",
          grade: 11,
          summary: "細胞依需要開啟或關閉基因；多細胞生物的細胞分化來自不同基因的表現。",
          keyPoints: [
            "乳糖操縱組：無乳糖時，抑制蛋白與操作子結合，阻止轉錄",
            "真核細胞以轉錄因子等多層次方式調控基因表現",
          ],
        },
        {
          id: "biology.senior.biotech",
          title: "生物技術",
          grade: 10,
          summary: "利用限制酶、DNA 連接酶、載體、PCR 與基因編輯等工具改造或分析 DNA。",
          keyPoints: [
            "PCR：在試管中大量複製特定 DNA 片段",
            "膠體電泳：依 DNA 片段大小分離",
            "應用：基因轉殖作物、生產藥物、親子與刑事鑑定，並需考量倫理與安全",
          ],
          lessonIds: ["biology.senior.dna-expression"],
        },
      ],
    },
    {
      id: "biology.senior.plant",
      title: "植物體的構造與功能（選修）",
      summary: "植物以根、莖、葉吸收、運輸與製造養分，並以激素調節生長。",
      children: [
        {
          id: "biology.senior.plant-tissue",
          title: "植物的組織與器官",
          grade: 11,
          summary: "分生組織使植物持續生長；表皮、基本組織與維管束組織分工合作。",
          keyPoints: [
            "頂端分生組織使根、莖延長；形成層使雙子葉植物的莖加粗",
            "葉的氣孔由一對保衛細胞控制開閉",
          ],
        },
        {
          id: "biology.senior.plant-water",
          title: "水分與養分的運輸",
          grade: 11,
          summary: "水分靠蒸散拉力沿木質部上升；養分經韌皮部由「源」運到「庫」。",
          keyPoints: [
            "內聚力—張力學說：水分子間的內聚力使水柱不斷，被蒸散作用往上拉",
            "壓力流學說：韌皮部中養分由濃度高的源流向庫",
          ],
        },
        {
          id: "biology.senior.plant-hormone",
          title: "植物激素與環境反應",
          grade: 11,
          summary: "植物激素在低濃度下就能調節生長、發育與對環境的反應。",
          keyPoints: [
            "生長素：促進細胞伸長，與向光性有關",
            "離層酸：缺水時促使氣孔關閉",
            "乙烯：促進果實成熟",
          ],
        },
      ],
    },
    {
      id: "biology.senior.animal",
      title: "動物體的構造與功能（選修）",
      summary: "神經、內分泌與免疫系統協調身體運作並抵禦病原體。",
      children: [
        {
          id: "biology.senior.neuron",
          title: "神經元與神經衝動",
          grade: 11,
          summary: "神經衝動以動作電位的形式沿軸突傳導。",
          keyPoints: [
            "靜止膜電位約 −70 mV（膜內為負）",
            "達到閾值後 $\\ce{Na+}$ 流入產生去極化，$\\ce{K+}$ 流出使再極化",
            "全有全無律；有髓鞘神經以跳躍式傳導，速度較快",
          ],
          lessonIds: ["biology.senior.nerve-immune"],
        },
        {
          id: "biology.senior.synapse",
          title: "突觸傳遞",
          grade: 11,
          summary: "軸突末梢釋放神經傳導物質，與下一個細胞上的受體結合。",
          keyPoints: ["化學突觸的傳遞是單向的", "藥物或毒素可能影響神經傳導物質的釋放、結合或回收"],
          lessonIds: ["biology.senior.nerve-immune"],
        },
        {
          id: "biology.senior.immunity",
          title: "免疫系統",
          grade: 11,
          summary: "非專一性防禦與專一性防禦（體液免疫、細胞免疫）共同保護身體。",
          keyPoints: [
            "第一道防線：皮膚與黏膜；第二道防線：發炎反應、吞噬細胞",
            "B 細胞分化成漿細胞分泌抗體；胞毒性 T 細胞破壞被感染的細胞",
            "疫苗誘發主動免疫，產生記憶細胞",
          ],
          lessonIds: ["biology.senior.nerve-immune"],
        },
        {
          id: "biology.senior.hormone-feedback",
          title: "內分泌與恆定",
          grade: 11,
          summary: "下視丘與腦垂腺調控多種內分泌腺，多以負回饋維持恆定。",
          keyPoints: ["甲狀腺素過多時，會抑制下視丘與腦垂腺的分泌", "血糖由胰島素與升糖素拮抗調節"],
        },
      ],
    },
    {
      id: "biology.senior.evolution",
      title: "演化與生物多樣性",
      summary: "族群中對偶基因頻率的改變就是演化；演化造就了今日的生物多樣性。",
      children: [
        {
          id: "biology.senior.evidence",
          title: "演化的證據",
          grade: 10,
          summary: "化石、比較解剖、胚胎發育與分子生物學都支持生物有共同祖先。",
          keyPoints: [
            "同源構造：構造來源相同、功能可能不同（人的手、鯨的鰭肢、蝙蝠的翼）",
            "同功構造：功能相似、來源不同（鳥翼與昆蟲翅）",
            "親緣越近，DNA 與蛋白質序列越相似",
          ],
          lessonIds: ["biology.senior.evolution-diversity"],
        },
        {
          id: "biology.senior.mechanism",
          title: "演化的機制",
          grade: 10,
          summary: "天擇、突變、遺傳漂變、基因流動等都會改變族群的對偶基因頻率。",
          keyPoints: [
            "天擇：適應環境的表現型留下較多後代",
            "遺傳漂變：小族群中對偶基因頻率因機率而改變",
            "哈地－溫伯格平衡：$p^2 + 2pq + q^2 = 1$",
          ],
          lessonIds: ["biology.senior.evolution-diversity"],
        },
        {
          id: "biology.senior.speciation",
          title: "物種形成",
          grade: 11,
          summary: "生殖隔離使族群之間不再有基因交流，逐漸形成新物種。",
          keyPoints: [
            "地理隔離 → 各自演化 → 生殖隔離（異域種化）",
            "生殖隔離：無法交配，或無法產生具生殖力的後代",
          ],
        },
        {
          id: "biology.senior.domains",
          title: "三域與生物多樣性",
          grade: 10,
          summary: "依分子證據，生物分為細菌域、古細菌域與真核生物域。",
          keyPoints: [
            "古細菌常生活在高溫、高鹽等極端環境，部分特徵與真核生物較接近",
            "生物多樣性包含遺傳、物種與生態系多樣性",
          ],
          lessonIds: ["biology.senior.evolution-diversity"],
        },
      ],
    },
    {
      id: "biology.senior.ecology",
      title: "生態與環境",
      summary: "從族群、群集到生態系與全球，理解生物與環境的交互作用。",
      children: [
        {
          id: "biology.senior.population",
          title: "族群生態",
          grade: 10,
          summary: "資源充足時族群呈指數成長（J 型）；受環境限制時呈邏輯斯諦成長（S 型）。",
          keyPoints: [
            "**環境負荷量 K**：環境所能維持的最大族群數量",
            "S 型成長在 $N = \\frac{K}{2}$ 時成長最快",
          ],
          lessonIds: ["biology.senior.population-ecosystem"],
        },
        {
          id: "biology.senior.community",
          title: "群集與演替",
          grade: 10,
          summary: "群集中的物種有競爭、掠食、共生等交互作用，並隨時間發生演替。",
          keyPoints: [
            "初級演替：從沒有土壤的地方開始，如火山熔岩",
            "次級演替：原有土壤仍在，如森林火災或廢耕農地",
          ],
        },
        {
          id: "biology.senior.ecosystem",
          title: "能量流動與物質循環",
          grade: 10,
          summary: "能量單向流動、逐級遞減；碳、氮等物質在生態系中循環。",
          keyPoints: [
            "生態塔：能量塔一定是正立的",
            "碳循環：光合作用吸收 $\\ce{CO2}$；呼吸作用、分解作用與燃燒釋出 $\\ce{CO2}$",
          ],
          lessonIds: ["biology.senior.population-ecosystem"],
        },
        {
          id: "biology.senior.global-change",
          title: "全球變遷",
          grade: 10,
          summary: "人類活動改變了大氣成分與土地利用，影響全球氣候與生態系。",
          keyPoints: [
            "溫室氣體：$\\ce{CO2}$、$\\ce{CH4}$、$\\ce{N2O}$ 等",
            "海水吸收過多 $\\ce{CO2}$ 造成海洋酸化，影響珊瑚與貝類",
          ],
          lessonIds: ["biology.senior.population-ecosystem"],
        },
        {
          id: "biology.senior.conservation",
          title: "生物多樣性保育",
          grade: 10,
          summary: "棲地破壞、外來入侵種、過度利用、汙染與氣候變遷威脅生物多樣性。",
          keyPoints: [
            "外來種在野外自行繁殖、擴散並造成危害，即成為入侵種",
            "保育策略：棲地保護、移除入侵種、源頭管理（不棄養、不放生）",
          ],
          lessonIds: ["biology.senior.population-ecosystem"],
        },
      ],
    },
  ],
};

export default mindmap;
