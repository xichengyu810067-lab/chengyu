import type { CurriculumNode } from "../../types";

/** 國中生物（108 課綱第四學習階段・自然科學領域生物部分）學習內容 */
const mindmap: CurriculumNode = {
  id: "biology.junior",
  title: "國中生物",
  summary:
    "從細胞出發，認識生物如何取得養分、運輸物質、協調與維持恆定、生殖與遺傳，再放大到演化與生態系。",
  children: [
    {
      id: "biology.junior.life",
      title: "生命的基本單位",
      summary: "生物都由細胞構成；用顯微鏡觀察細胞，並認識生物體的組成層次。",
      children: [
        {
          id: "biology.junior.life-features",
          title: "生命現象與生物的特徵",
          grade: 7,
          summary: "生物能進行新陳代謝、生長、生殖、對刺激產生反應，並維持體內恆定。",
          keyPoints: [
            "生物都由細胞構成",
            "**新陳代謝**：生物體內所有化學反應的總稱",
            "能感應環境變化並產生反應，例如含羞草受觸碰後葉片閉合",
          ],
          lessonIds: ["biology.junior.cell-world"],
        },
        {
          id: "biology.junior.microscope",
          title: "顯微鏡的使用",
          grade: 7,
          summary: "複式顯微鏡可觀察細胞；解剖顯微鏡適合觀察較大、立體的物體。",
          keyPoints: [
            "放大倍率 = 目鏡倍率 × 物鏡倍率",
            "換高倍物鏡後：視野變暗、範圍變小、看到的細胞數變少",
            "複式顯微鏡的影像上下左右顛倒，影像偏哪邊，玻片就往哪邊移",
          ],
          lessonIds: ["biology.junior.cell-world"],
        },
        {
          id: "biology.junior.cell-structure",
          title: "細胞的構造與功能",
          grade: 7,
          summary: "細胞膜、細胞質、細胞核是基本構造；植物細胞另有細胞壁、葉綠體與大型液胞。",
          keyPoints: [
            "**細胞核**：含遺傳物質，控制細胞的生命活動",
            "**粒線體**：進行細胞呼吸，釋放能量",
            "**葉綠體**：進行光合作用（植物綠色部位的細胞）",
            "**細胞壁**：支持與保護植物細胞",
          ],
          lessonIds: ["biology.junior.cell-world"],
        },
        {
          id: "biology.junior.cell-division",
          title: "細胞分裂",
          grade: 7,
          summary: "染色體在分裂前先複製，再平均分配到兩個子細胞。",
          keyPoints: [
            "子細胞與母細胞的染色體數目相同",
            "單細胞生物靠細胞分裂繁殖；多細胞生物靠細胞分裂生長與修補",
          ],
        },
        {
          id: "biology.junior.levels",
          title: "生物體的組成層次",
          grade: 7,
          summary: "多細胞生物由細胞組成組織、器官、器官系統，最後成為個體。",
          keyPoints: [
            "動物：細胞 → 組織 → 器官 → 器官系統 → 個體",
            "植物：細胞 → 組織 → 器官 → 個體（**沒有器官系統**）",
            "動物的四大組織：上皮、結締、肌肉、神經組織",
          ],
          lessonIds: ["biology.junior.cell-world"],
        },
      ],
    },
    {
      id: "biology.junior.nutrition",
      title: "生物體的營養",
      summary: "酵素幫助生物體進行化學反應；植物行光合作用製造養分，動物攝食並消化吸收。",
      children: [
        {
          id: "biology.junior.enzyme",
          title: "酵素",
          grade: 7,
          summary: "酵素是生物體內的催化劑，可加快化學反應，大多由蛋白質構成。",
          keyPoints: [
            "具**專一性**：一種酵素通常只作用於特定的物質",
            "反應前後酵素本身不改變，可重複使用",
            "受溫度與 pH 值影響；高溫會使酵素變性而失去活性",
          ],
          lessonIds: ["biology.junior.nutrients"],
        },
        {
          id: "biology.junior.photosynthesis",
          title: "光合作用",
          grade: 7,
          summary: "植物利用葉綠體吸收光能，把二氧化碳和水合成葡萄糖，並釋出氧氣。",
          keyPoints: [
            "二氧化碳 + 水 →（光能、葉綠體）→ 葡萄糖 + 氧",
            "葡萄糖可轉變成澱粉儲存",
            "光強度、二氧化碳濃度與溫度都會影響光合作用速率",
          ],
          lessonIds: ["biology.junior.nutrients"],
        },
        {
          id: "biology.junior.digestion",
          title: "人體的消化與吸收",
          grade: 7,
          summary: "食物經消化道分解成小分子，主要在小腸被吸收。",
          keyPoints: [
            "消化道：口腔 → 咽 → 食道 → 胃 → 小腸 → 大腸 → 肛門",
            "消化腺：唾腺、胃腺、肝臟、胰臟、腸腺",
            "小腸內壁有許多**絨毛**，增加吸收的表面積",
          ],
          lessonIds: ["biology.junior.nutrients"],
        },
      ],
    },
    {
      id: "biology.junior.transport",
      title: "生物體的運輸",
      summary: "植物靠維管束運輸水分與養分；人體靠循環系統把物質送到全身細胞。",
      children: [
        {
          id: "biology.junior.plant-transport",
          title: "植物的運輸作用",
          grade: 7,
          summary: "維管束由木質部與韌皮部組成。",
          keyPoints: [
            "**木質部**（導管）：運輸水分與礦物質，由下往上",
            "**韌皮部**（篩管）：運輸葉片製造的養分，可上可下",
            "**蒸散作用**是水分向上運輸的主要動力",
          ],
          lessonIds: ["biology.junior.blood-flow"],
        },
        {
          id: "biology.junior.circulation",
          title: "人體的循環系統",
          grade: 7,
          summary: "心臟、血管與血液組成循環系統，分為體循環與肺循環。",
          keyPoints: [
            "心臟四腔：左、右心房與左、右心室；**左心室壁最厚**",
            "動脈把血液帶離心臟；靜脈把血液帶回心臟；微血管進行物質交換",
            "肺動脈流缺氧血、肺靜脈流充氧血",
          ],
          lessonIds: ["biology.junior.blood-flow"],
        },
        {
          id: "biology.junior.blood",
          title: "血液與淋巴",
          grade: 7,
          summary: "血液由血漿與血球組成；淋巴系統收集組織液並參與防禦。",
          keyPoints: [
            "紅血球含血紅素，運輸氧氣（人類成熟紅血球沒有細胞核）",
            "白血球參與防禦；血小板幫助凝血",
            "血漿運輸養分、激素與代謝廢物",
          ],
          lessonIds: ["biology.junior.blood-flow"],
        },
      ],
    },
    {
      id: "biology.junior.coordination",
      title: "生物體的協調作用",
      summary: "神經系統與內分泌系統合作，讓身體對環境變化做出適當反應。",
      children: [
        {
          id: "biology.junior.nervous",
          title: "神經系統",
          grade: 7,
          summary: "神經元是神經系統的基本單位；中樞神經包括腦與脊髓。",
          keyPoints: [
            "反應路徑：受器 → 感覺神經元 → 中樞 → 運動神經元 → 動器",
            "**反射**：不經大腦思考、快速的反應，例如縮手反射（中樞在脊髓）",
            "大腦：思考與意識；小腦：平衡與協調；腦幹：呼吸、心跳等基本生命活動",
          ],
          lessonIds: ["biology.junior.body-balance"],
        },
        {
          id: "biology.junior.endocrine",
          title: "內分泌系統",
          grade: 7,
          summary: "內分泌腺分泌激素，經由血液運送到目標器官發揮作用。",
          keyPoints: [
            "內分泌腺沒有導管，激素直接進入血液",
            "激素作用較慢但較持久；神經傳導快速而短暫",
            "例：胰島素、甲狀腺素、生長激素、腎上腺素",
          ],
          lessonIds: ["biology.junior.body-balance"],
        },
        {
          id: "biology.junior.tropism",
          title: "植物的感應",
          grade: 7,
          summary: "植物受環境刺激而產生的生長反應稱為向性，例如向光性與向地性。",
          keyPoints: [
            "莖具向光性：背光側生長素較多、生長較快，因此彎向光源",
            "根具向地性；莖具背地性",
            "含羞草的觸發運動與向性不同，是細胞膨壓改變造成的",
          ],
        },
      ],
    },
    {
      id: "biology.junior.homeostasis",
      title: "恆定性",
      summary: "生物體能把體內的狀態維持在穩定範圍內，稱為恆定性。",
      children: [
        {
          id: "biology.junior.gas-exchange",
          title: "呼吸與氣體的恆定",
          grade: 7,
          summary: "氧氣與二氧化碳在肺泡與微血管之間以擴散作用交換。",
          keyPoints: [
            "呼吸道：鼻腔 → 咽 → 喉 → 氣管 → 支氣管 → 肺泡",
            "吸氣時橫膈收縮下降、肋骨上舉，胸腔變大",
            "血液中二氧化碳增加時，呼吸會變快變深",
          ],
        },
        {
          id: "biology.junior.excretion",
          title: "排泄與水分的恆定",
          grade: 7,
          summary: "腎臟過濾血液形成尿液，排出含氮廢物並調節水分與鹽類。",
          keyPoints: [
            "泌尿系統：腎臟 → 輸尿管 → 膀胱 → 尿道",
            "尿素在肝臟形成，由腎臟排出",
            "流汗也能排出少量的水分、鹽類與尿素",
          ],
        },
        {
          id: "biology.junior.temp-sugar",
          title: "體溫與血糖的恆定",
          grade: 7,
          summary: "人體透過神經與激素調節，讓體溫與血糖維持在穩定範圍。",
          keyPoints: [
            "**胰島素**使血糖降低；**升糖素**使血糖升高",
            "熱時流汗增加、皮膚血管擴張；冷時皮膚血管收縮、肌肉顫抖產熱",
          ],
          lessonIds: ["biology.junior.body-balance"],
        },
      ],
    },
    {
      id: "biology.junior.reproduction",
      title: "生殖",
      summary: "生物藉由生殖產生後代，分為無性生殖與有性生殖。",
      children: [
        {
          id: "biology.junior.asexual",
          title: "無性生殖",
          grade: 7,
          summary: "不經配子結合產生後代，子代與親代的遺傳組成幾乎相同。",
          keyPoints: [
            "分裂生殖（細菌、草履蟲）、出芽生殖（酵母菌、水螅）",
            "孢子繁殖（黴菌、蕨類）",
            "營養器官繁殖：馬鈴薯塊莖、甘藷塊根、落地生根的葉",
          ],
        },
        {
          id: "biology.junior.meiosis",
          title: "減數分裂與有性生殖",
          grade: 7,
          summary: "形成配子時進行減數分裂，染色體數目減半；受精後恢復成原來的數目。",
          keyPoints: [
            "人體細胞有 46 條（23 對）染色體，精子與卵各有 23 條",
            "有性生殖使子代具有多樣的遺傳組合",
          ],
          lessonIds: ["biology.junior.heredity"],
        },
        {
          id: "biology.junior.flower",
          title: "花的構造與植物的有性生殖",
          grade: 7,
          summary: "花是被子植物的生殖器官；受精後子房發育成果實、胚珠發育成種子。",
          keyPoints: ["雄蕊：花藥產生花粉粒；雌蕊：柱頭、花柱、子房", "花粉落到柱頭上稱為**授粉**"],
          lessonIds: ["biology.junior.heredity"],
        },
      ],
    },
    {
      id: "biology.junior.genetics",
      title: "遺傳",
      summary: "親代的性狀透過基因傳給子代。",
      children: [
        {
          id: "biology.junior.mendel",
          title: "孟德爾的遺傳法則",
          grade: 7,
          summary: "孟德爾以豌豆實驗發現性狀由成對的遺傳因子控制，形成配子時彼此分離。",
          keyPoints: [
            "純品系高莖 × 矮莖 → 第一子代全為高莖（高莖為顯性）",
            "第一子代自花授粉 → 第二子代高莖 : 矮莖 ≈ 3 : 1",
            "基因型（如 Tt）決定表現型（如高莖）",
          ],
          lessonIds: ["biology.junior.heredity"],
        },
        {
          id: "biology.junior.gene",
          title: "基因、染色體與 DNA",
          grade: 7,
          summary: "基因位於染色體上；染色體主要由 DNA 與蛋白質組成。",
          keyPoints: [
            "成對染色體相同位置上控制同一性狀的基因稱為**對偶基因**",
            "基因的本質是 DNA 上的特定片段",
          ],
        },
        {
          id: "biology.junior.sex-linked",
          title: "性別決定與性聯遺傳",
          grade: 7,
          summary: "人類男性為 XY、女性為 XX；位在 X 染色體上的基因造成性聯遺傳。",
          keyPoints: [
            "子女的性別由父親的精子帶 X 或 Y 決定",
            "紅綠色盲、血友病是 X 染色體上的隱性遺傳，男性患者較多",
          ],
          lessonIds: ["biology.junior.heredity"],
        },
        {
          id: "biology.junior.human-genetics",
          title: "人類的遺傳與遺傳疾病",
          grade: 7,
          summary: "ABO 血型由複對偶基因控制；部分疾病與基因或染色體異常有關。",
          keyPoints: [
            "ABO 血型：$I^A$、$I^B$ 對 $i$ 為顯性，$I^A$ 與 $I^B$ 為等顯性（共顯性）",
            "海洋性貧血（地中海型貧血）為體染色體隱性遺傳，在臺灣較常見",
            "唐氏症：第 21 號染色體多一條",
          ],
        },
        {
          id: "biology.junior.biotech",
          title: "基因轉殖與生物技術",
          grade: 7,
          summary: "把某種生物的基因送入另一種生物，使牠表現新的性狀。",
          keyPoints: [
            "例：讓細菌生產人類胰島素",
            "例：抗蟲的基因轉殖作物、會發出螢光的基因轉殖魚",
            "需評估對生態與健康的影響，並遵守相關規範",
          ],
        },
      ],
    },
    {
      id: "biology.junior.evolution",
      title: "演化與分類",
      summary: "化石記錄了生物的變化；天擇推動演化；分類幫助我們整理生物多樣性。",
      children: [
        {
          id: "biology.junior.fossil",
          title: "化石與地球上生物的變遷",
          grade: 7,
          summary: "化石是保存在地層中的古代生物遺骸或活動痕跡。",
          keyPoints: [
            "未受擾動的地層，越下層通常越古老",
            "始祖鳥兼具爬蟲類與鳥類的特徵",
            "三葉蟲、恐龍等生物已經滅絕",
          ],
        },
        {
          id: "biology.junior.natural-selection",
          title: "天擇與演化",
          grade: 7,
          summary: "達爾文提出天擇說：適應環境的個體有較多機會存活並留下後代。",
          keyPoints: [
            "族群中的個體有**變異**，且變異可以遺傳",
            "生物產生的後代多於環境所能容納，個體間有生存競爭",
            "例：長期濫用抗生素使抗藥性細菌比例增加",
          ],
          lessonIds: ["biology.junior.eco-web"],
        },
        {
          id: "biology.junior.classification",
          title: "分類階層與命名",
          grade: 7,
          summary: "依親緣關係與特徵把生物分類；學名採用林奈的二名法。",
          keyPoints: [
            "分類階層：界、門、綱、目、科、屬、種",
            "**二名法**：屬名 + 種小名，例如人類的學名為 Homo sapiens（屬名與種小名以斜體書寫）",
          ],
          lessonIds: ["biology.junior.eco-web"],
        },
        {
          id: "biology.junior.kingdoms",
          title: "五界與三域",
          grade: 7,
          summary: "五界：原核生物界、原生生物界、真菌界、植物界、動物界。",
          keyPoints: [
            "原核生物沒有細胞核膜，如細菌、藍綠菌",
            "真菌不能行光合作用，例如香菇、酵母菌、黴菌",
            "三域：細菌域、古細菌域、真核生物域",
          ],
          lessonIds: ["biology.junior.eco-web"],
        },
      ],
    },
    {
      id: "biology.junior.ecology",
      title: "生物與環境",
      summary: "生物與環境互相影響，形成族群、群集與生態系。",
      children: [
        {
          id: "biology.junior.population",
          title: "族群與群集",
          grade: 7,
          summary: "同一區域同種生物的集合是族群；同一區域所有族群合稱群集。",
          keyPoints: [
            "族群大小受出生、死亡、遷入、遷出影響",
            "生物間的交互作用：掠食、競爭、寄生、片利共生、互利共生",
          ],
        },
        {
          id: "biology.junior.ecosystem",
          title: "生態系與食物網",
          grade: 7,
          summary: "生態系包含生物與非生物環境；生物間的食物關係交織成食物網。",
          keyPoints: [
            "**生產者**：能行光合作用製造養分",
            "**消費者**：直接或間接以生產者為食",
            "**分解者**：細菌與真菌，分解遺體與排遺",
          ],
          lessonIds: ["biology.junior.eco-web"],
        },
        {
          id: "biology.junior.energy-matter",
          title: "能量流動與物質循環",
          grade: 7,
          summary: "能量沿食物鏈單向流動並逐級遞減；碳、氮、水等物質在生態系中循環。",
          keyPoints: [
            "生態系的能量來源是太陽",
            "每經過一個營養階層，大約只有 10% 的能量傳到下一層",
            "碳以二氧化碳、醣類等形式在生物與環境之間循環",
          ],
          lessonIds: ["biology.junior.eco-web"],
        },
        {
          id: "biology.junior.biodiversity",
          title: "生物多樣性與保育",
          grade: 7,
          summary: "生物多樣性包含遺傳、物種與生態系多樣性。",
          keyPoints: [
            "威脅：棲地破壞、外來入侵種、過度利用、汙染、氣候變遷",
            "臺灣的外來入侵種例：綠鬣蜥、小花蔓澤蘭",
            "保育行動：設立保護區、不棄養寵物、減少汙染",
          ],
        },
      ],
    },
  ],
};

export default mindmap;
