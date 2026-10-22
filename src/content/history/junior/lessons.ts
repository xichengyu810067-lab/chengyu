import type { Lesson, Params } from "../../types";

const timelineLab = () => import("../labs/TimelineScrubberLab");
const zeelandiaScene = () => import("../scenes/ZeelandiaScene");
const colonialTownScene = () => import("../scenes/ColonialTownScene");
const worldBase = () => import("../scenes/voyageLayers").then((m) => ({ default: m.WorldBase }));
const portugalRoute = () =>
  import("../scenes/voyageLayers").then((m) => ({ default: m.PortugalRoute }));
const spainRoute = () => import("../scenes/voyageLayers").then((m) => ({ default: m.SpainRoute }));
const dutchRoute = () => import("../scenes/voyageLayers").then((m) => ({ default: m.DutchRoute }));

const q = (s: string) => `history.junior.q-${s}`;
const n = (s: string) => `history.junior.${s}`;

/** 清帝國年號：[元年的西元年, 年號] */
const QING_REIGNS: [number, string][] = [
  [1662, "康熙"],
  [1723, "雍正"],
  [1736, "乾隆"],
  [1796, "嘉慶"],
  [1821, "道光"],
  [1851, "咸豐"],
  [1862, "同治"],
  [1875, "光緒"],
  [1909, "宣統"],
];

const nth = (k: number) => (k === 1 ? "元" : String(k));

function chinaEra(y: number): string {
  if (y >= 1912) return `民國 ${nth(y - 1911)} 年`;
  let cur: [number, string] | undefined;
  for (const r of QING_REIGNS) if (y >= r[0]) cur = r;
  return cur ? `${cur[1]} ${nth(y - cur[0] + 1)} 年` : "—";
}

function japanEra(y: number): string {
  if (y < 1868) return "—（明治始於 1868 年）";
  if (y < 1912) return `明治 ${nth(y - 1867)} 年`;
  if (y === 1912) return "明治 45 年／大正元年";
  if (y < 1926) return `大正 ${nth(y - 1911)} 年`;
  if (y === 1926) return "大正 15 年／昭和元年";
  if (y < 1989) return `昭和 ${nth(y - 1925)} 年`;
  if (y === 1989) return "昭和 64 年／平成元年";
  if (y < 2019) return `平成 ${nth(y - 1988)} 年`;
  if (y === 2019) return "平成 31 年／令和元年";
  return `令和 ${nth(y - 2018)} 年`;
}

function taiwanPeriod(y: number): string {
  if (y < 1895) return "清帝國時期";
  if (y < 1945) return "日治時期";
  return "戰後臺灣";
}

const century = (y: number) => Math.floor((y - 1) / 100) + 1;

const lessons: Lesson[] = [
  {
    id: n("history-toolkit"),
    title: "歷史偵探入門：時間與史料",
    grade: 7,
    minutes: 12,
    nodeIds: [n("basics-time"), n("basics-sources"), n("basics-perspectives")],
    objectives: [
      "能換算西元、世紀、年號與民國紀年",
      "能分辨一手史料與二手研究",
      "能用「誰寫的、何時、為什麼、可信嗎」判讀史料",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "紀年換算器",
        prompt:
          "拉動年份，觀察同一年在不同紀年方式下的寫法。日治時期的臺灣使用日本年號，戰後則使用民國紀年。",
        params: [{ key: "year", label: "西元年", min: 1700, max: 2025, step: 1, init: 1750 }],
        plot: {
          x: [1700, 2025],
          y: [0, 1],
          xLabel: "西元年",
          vlines: (p: Params) => [{ x: p.year, label: String(p.year), color: "#9a3412" }],
          points: () => [
            { x: 1868, y: 0.3, label: "明治元年", color: "#7c3aed" },
            { x: 1912, y: 0.55, label: "民國元年", color: "#2563eb" },
            { x: 1945, y: 0.8, label: "戰後", color: "#059669" },
          ],
        },
        readouts: [
          { label: "世紀", value: (p) => `${century(p.year)} 世紀` },
          { label: "清帝國年號／民國紀年", value: (p) => chinaEra(p.year) },
          { label: "日本年號", value: (p) => japanEra(p.year) },
          { label: "臺灣當時處於", value: (p) => taiwanPeriod(p.year) },
        ],
        goal: {
          text: "馬關條約簽訂於「**光緒 21 年**」，臺灣從此進入日治時期。找出這是西元哪一年。",
          test: (p) => p.year === 1895,
        },
        insight:
          "年號換算：**西元年 = 元年的西元年 + 年數 − 1**。光緒元年是 1875 年，所以光緒 21 年 = 1875 + 20 = **1895**。民國紀年則是 西元年 − 1911。",
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：時間的單位",
        prompt: "先想想看，再刮開確認。",
        cards: [
          {
            front: "什麼是「世紀」？1624 年是第幾世紀？",
            back: "100 年為一世紀；1601–1700 年是 **17 世紀**。",
          },
          {
            front: "「西元前」怎麼算？",
            back: "以傳統認定的耶穌誕生年為界，之前稱西元前，**數字越大越久遠**。",
          },
          {
            front: "什麼是「年號紀年」？",
            back: "以皇帝年號計年，如康熙、乾隆、光緒；日治時期臺灣使用明治、大正、昭和等日本年號。",
          },
          {
            front: "民國紀年怎麼換算成西元？",
            back: "以 1912 年為民國元年：**西元年 = 民國年 + 1911**。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "史料分一分",
        prompt: "你要研究「日治時期的臺灣」。把下列資料分成一手史料與二手研究。",
        buckets: [
          { id: "primary", label: "一手史料（同時代留下的）" },
          { id: "secondary", label: "二手研究（後人整理的）" },
        ],
        items: [
          { id: "s1", label: "林獻堂在日治時期寫的日記", bucket: "primary" },
          { id: "s2", label: "1905 年總督府的戶口調查報告", bucket: "primary" },
          { id: "s3", label: "日治時期發行的《臺灣日日新報》", bucket: "primary" },
          { id: "s4", label: "當時拍攝的公學校畢業照", bucket: "primary" },
          { id: "s5", label: "現代學者寫的日治時期研究專書", bucket: "secondary" },
          { id: "s6", label: "國中歷史課本", bucket: "secondary" },
          { id: "s7", label: "以日治時期為題材的紀錄片", bucket: "secondary" },
          { id: "s8", label: "網路上整理的歷史懶人包", bucket: "secondary" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：判讀一張明信片",
        problem:
          "假設你在舊書攤找到一張明信片：由臺灣總督府在 1908 年發行，慶祝縱貫鐵路全線通車，畫面是火車與熱鬧繁榮的車站。它能告訴我們什麼？",
        steps: [
          {
            show: "**誰製作的？** 臺灣總督府，也就是殖民政府。",
            predict: {
              question: "這張明信片的製作者是誰？",
              choices: ["臺灣總督府", "一般臺灣農民", "現代的歷史學者"],
              answer: 0,
            },
          },
          {
            show: "**何時製作？** 1908 年，與通車同一時間，屬於**一手史料**。",
            predict: {
              question: "這張明信片屬於哪一類？",
              choices: ["一手史料", "二手研究", "歷史小說"],
              answer: 0,
            },
          },
          {
            show: "**為什麼製作？** 紀念通車、宣傳總督府的建設成果，所以畫面特別強調進步與繁榮。",
            why: "製作目的會影響內容呈現的方式。",
          },
          {
            show: "**可信嗎？** 「1908 年鐵路全線通車」可信；但「臺灣人都因此過得更好」就需要其他史料來驗證。",
            predict: {
              question: "想了解一般臺灣人對鐵路的感受，最適合再找哪一種史料？",
              choices: ["當時臺灣人寫的日記或信件", "總督府的另一張宣傳海報", "現代的火車時刻表"],
              answer: 0,
            },
          },
        ],
        takeaway: "判讀史料四問：**誰寫的？何時？為什麼？可信嗎？** 再找不同立場的史料互相比對。",
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：同一場火災，三份紀錄",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-sources-1"), q("set-sources-2"), q("set-sources-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("b1"), q("b2"), q("b3"), q("b4"), q("b5")],
      },
    ],
  },
  {
    id: n("taiwan-timeline"),
    title: "臺灣歷史長河：時期與同時代的世界",
    grade: 7,
    minutes: 12,
    nodeIds: [n("taiwan"), n("tw-prehistory"), n("tw-pw-politics")],
    objectives: [
      "能依序排列臺灣歷史的各個時期",
      "能把臺灣史放進東亞與世界的時間脈絡中比較",
      "記住臺灣史上的重要年代",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "order",
        title: "臺灣各時期排一排",
        prompt: "把臺灣歷史的各個時期，由**早到晚**排列。",
        items: [
          { id: "pre", label: "史前文化" },
          { id: "voc", label: "大航海時代（荷蘭、西班牙）" },
          { id: "zheng", label: "鄭氏時期" },
          { id: "qing", label: "清帝國時期" },
          { id: "jp", label: "日治時期" },
          { id: "pw", label: "戰後臺灣" },
        ],
      },
      {
        id: "a2",
        kind: "lab",
        title: "時光拉桿：同一年，世界在發生什麼？",
        prompt: "拖曳年份，比較臺灣、中國／東亞與世界在同一時間的狀況，完成三項挑戰。",
        load: timelineLab,
        config: { stage: "junior" },
        insight:
          "把臺灣史放進東亞與世界的脈絡，能看出彼此的關聯：例如荷蘭人來臺是大航海時代的一環，戰後臺灣的戒嚴也與冷戰局勢密切相關。",
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：年代與大事",
        pairs: [
          ["1624 年", "荷蘭人在大員建立據點"],
          ["1662 年", "荷蘭人投降，鄭氏政權開始"],
          ["1684 年", "清帝國設臺灣府"],
          ["1895 年", "馬關條約割讓臺灣"],
          ["1947 年", "二二八事件"],
          ["1987 年", "解除戒嚴"],
        ],
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：陳阿嬤家的年表",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-timeline-1"), q("set-timeline-2"), q("set-timeline-3")],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p2"), q("p4"), q("pw2"), q("pw4")],
      },
    ],
  },
  {
    id: n("maritime-taiwan"),
    title: "大航海時代的臺灣：熱蘭遮城的故事",
    grade: 7,
    minutes: 15,
    nodeIds: [n("tw-maritime"), n("tw-contact"), n("tw-zheng")],
    objectives: [
      "能說出葡萄牙、西班牙、荷蘭來到東亞的航線與目的",
      "理解荷蘭東印度公司在大員的轉口貿易與統治",
      "能從商人、漢人、原住民族等不同角度看荷治時期",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：通往東亞的航線",
        prompt: "逐一打開三條航線，比較它們的起點、經過的地方與終點。",
        viewBox: "0 0 480 280",
        base: worldBase,
        layers: [
          {
            id: "pt",
            label: "葡萄牙航線",
            load: portugalRoute,
            color: "#16a34a",
            note: "繞過非洲南端好望角，經印度果亞、麻六甲到澳門，再前往日本長崎。",
          },
          {
            id: "es",
            label: "西班牙航線",
            load: spainRoute,
            color: "#dc2626",
            note: "橫越大西洋到美洲，再從墨西哥的阿卡普爾科橫渡太平洋到馬尼拉（大帆船貿易）；1626 年北上佔領雞籠。",
          },
          {
            id: "nl",
            label: "荷蘭航線",
            load: dutchRoute,
            color: "#ea580c",
            note: "繞過好望角到巴達維亞（今雅加達），再北上大員，與中國、日本貿易。",
          },
        ],
        check: {
          stem: "三條航線最後都通往哪一個區域？這說明了什麼？",
          choices: [
            "東亞（中國、日本一帶），各國都想參與東亞的貿易",
            "北極，各國都在尋找新漁場",
            "南美洲，各國都在爭奪銀礦",
          ],
          answer: 0,
          explain:
            "歐洲各國想取得中國的生絲、瓷器與日本的白銀，臺灣正好位在這些航線的交會處，因此被捲入大航海時代。",
        },
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "熱區探索：17 世紀的大員",
        prompt: "點擊熱點，認識荷蘭東印度公司在大員的經營。",
        viewBox: "0 0 480 320",
        scene: zeelandiaScene,
        spots: [
          {
            id: "fort",
            x: 168,
            y: 96,
            title: "熱蘭遮城",
            body: "荷蘭東印度公司 1624 年起在大員（今臺南安平）興建的城堡，是公司在臺灣的行政與貿易中心。",
          },
          {
            id: "ship",
            x: 62,
            y: 132,
            title: "公司商船",
            body: "公司經營**轉口貿易**：把中國的生絲、瓷器運往日本與歐洲，再把日本的白銀運回中國。",
          },
          {
            id: "town",
            x: 172,
            y: 214,
            title: "大員市鎮",
            body: "城堡旁的市街住著許多漢人商人與工匠，是各地商品交易的地方。",
          },
          {
            id: "lagoon",
            x: 262,
            y: 150,
            title: "台江內海",
            body: "當時大員與赤崁之間是一片潟湖，船隻在此停泊。後來泥沙淤積，現在大多已成陸地。",
          },
          {
            id: "provintia",
            x: 384,
            y: 92,
            title: "普羅民遮城",
            body: "1652 年郭懷一事件後，公司於 1653 年在赤崁興建此城（今赤崁樓一帶），加強對漢人的控制。",
          },
          {
            id: "village",
            x: 424,
            y: 220,
            title: "原住民族村社與鹿皮",
            body: "原住民族獵鹿，**鹿皮**大量輸往日本。公司也透過傳教、征伐與贌社制度，影響原住民族社會。",
          },
        ],
      },
      {
        id: "a3",
        kind: "dialogue",
        title: "情境對話：訪問東印度公司的商人",
        scenarioId: "history.junior.s-voc-merchant",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：關鍵人物",
        cards: [
          {
            front: "郭懷一",
            back: "1652 年帶領漢人反抗荷蘭東印度公司的苛稅與壓迫，事件遭到鎮壓。",
          },
          { front: "鄭成功", back: "1661 年率軍攻臺，隔年迫使荷蘭人投降，建立鄭氏政權。" },
          { front: "陳永華", back: "鄭經的重要幕僚，興建孔廟、設立學校，推動教育。" },
          { front: "施琅", back: "原為鄭氏部將，後來降清；1683 年率清軍攻下澎湖，鄭克塽投降。" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m3"), q("m4"), q("m5")],
      },
    ],
  },
  {
    id: n("qing-to-colonial"),
    title: "從清帝國到日治：治理的轉變與殖民現代化",
    grade: 7,
    minutes: 15,
    nodeIds: [n("tw-qing-rule"), n("tw-qing-trade"), n("tw-jp-rule"), n("tw-jp-modern")],
    objectives: [
      "能說明清帝國治臺政策轉向積極的原因",
      "認識日治時期的現代化建設與其殖民性質",
      "能把重要事件歸入正確的時期",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：清帝國治臺政策的轉變",
        problem: "清帝國對臺灣的治理，為什麼會從「消極防範」轉向「積極建設」？",
        steps: [
          {
            show: "**初期（1684 年起）**：清廷擔心臺灣再成反清基地，實施渡臺禁令、劃定番界。",
            why: "也有學者認為，清初政策不完全是消極，而是考量統治成本後的選擇。",
            predict: {
              question: "清初限制人民渡臺，主要原因是？",
              choices: ["防止臺灣成為反清基地", "臺灣土地已經開發完畢", "為了保護荷蘭人"],
              answer: 0,
            },
          },
          {
            show: "**1874 年牡丹社事件**：日本以琉球漂流民遭殺害為由出兵恆春半島，清廷驚覺臺灣的戰略地位。",
          },
          {
            show: "**沈葆楨來臺**：推動「開山撫番」、解除渡臺禁令，並增設臺北府等行政區。",
            predict: {
              question: "牡丹社事件後，清廷派誰來臺籌辦防務？",
              choices: ["沈葆楨", "鄭成功", "後藤新平"],
              answer: 0,
            },
          },
          {
            show: "**清法戰爭（1884–1885）**：法軍進攻基隆、淡水與澎湖，臺灣的海防地位更受重視。",
          },
          {
            show: "**1885 年建省**：劉銘傳任首任巡撫，推動鐵路、電報、清丈土地等新政。",
          },
        ],
        takeaway:
          "外力衝擊（牡丹社事件、清法戰爭）使清廷重新認識臺灣的重要性，治臺政策由**防範**轉為**積極建設**。",
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "熱區探索：日治時期的城鎮",
        prompt: "點擊熱點，看看日治時期的現代化建設如何改變生活，又帶有哪些殖民統治的目的。",
        viewBox: "0 0 480 320",
        scene: colonialTownScene,
        spots: [
          {
            id: "railway",
            x: 250,
            y: 291,
            title: "縱貫鐵路",
            body: "1908 年全線通車，北起基隆、南至打狗（高雄）。便利旅行與米、糖運輸，也有利於總督府調動軍警、控制全島。",
          },
          {
            id: "clock",
            x: 266,
            y: 122,
            title: "車站時鐘",
            body: "火車依時刻表運行，學校、工廠按鐘點作息，臺灣人逐漸養成**守時**的現代時間觀念。",
          },
          {
            id: "school",
            x: 392,
            y: 150,
            title: "公學校",
            body: "1898 年起設立，招收臺灣人子弟，教授日語（當時稱「國語」）與算術等；日本人子弟則讀小學校，兩者有差別待遇。",
          },
          {
            id: "sugar",
            x: 82,
            y: 100,
            title: "新式製糖工場",
            body: "1900 年臺灣製糖株式會社成立，以機械大量製糖。糖業由日本資本主導，蔗農收購價格常由會社決定。",
          },
          {
            id: "police",
            x: 400,
            y: 248,
            title: "派出所",
            body: "日治時期警察職權廣泛，除了治安，也協助戶口、衛生、徵稅與推行政令，深入地方生活，臺灣人稱警察為「大人」。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "事件依時期分類",
        prompt: "把下列事件放進正確的時期。",
        buckets: [
          { id: "qing", label: "清帝國時期" },
          { id: "jp", label: "日治時期" },
          { id: "pw", label: "戰後臺灣" },
        ],
        items: [
          { id: "e1", label: "林爽文事件", bucket: "qing" },
          { id: "e2", label: "劉銘傳推動興建鐵路", bucket: "qing" },
          { id: "e3", label: "開港通商，茶葉大量出口", bucket: "qing" },
          { id: "e4", label: "縱貫鐵路全線通車", bucket: "jp" },
          { id: "e5", label: "臺灣文化協會成立", bucket: "jp" },
          { id: "e6", label: "霧社事件", bucket: "jp" },
          { id: "e7", label: "實施耕者有其田", bucket: "pw" },
          { id: "e8", label: "設立加工出口區", bucket: "pw" },
          { id: "e9", label: "解除戒嚴", bucket: "pw" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：人物與貢獻",
        cards: [
          { front: "沈葆楨", back: "牡丹社事件後來臺，推動開山撫番、解除渡臺禁令。" },
          { front: "劉銘傳", back: "首任臺灣巡撫，推動鐵路、電報、清丈土地等新政。" },
          { front: "後藤新平", back: "日治初期的民政長官，推動土地與戶口調查、保甲制度。" },
          { front: "蔣渭水", back: "醫師，參與創立臺灣文化協會與臺灣民眾黨。" },
          { front: "林獻堂", back: "霧峰林家士紳，領導臺灣議會設置請願運動。" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("q1"), q("q4"), q("q5"), q("j2"), q("j6")],
      },
    ],
  },
  {
    id: n("east-asia"),
    title: "東亞的變局：從朝貢體制到現代化",
    grade: 8,
    minutes: 14,
    nodeIds: [n("eastasia"), n("ea-interaction"), n("ea-crisis"), n("ea-modernize")],
    objectives: [
      "能說出中國與東亞史的主要主題",
      "理解鴉片戰爭的因果與影響",
      "能排列晚清的重要事件，並比較東亞各國的改革",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：中國與東亞史",
        root: {
          id: "ea",
          title: "中國與東亞史",
          children: [
            {
              id: "ea-state",
              title: "國家與社會",
              summary: "秦漢大一統、隋唐科舉、宋代以後的士紳與宗族。",
            },
            {
              id: "ea-inter",
              title: "與周邊的互動",
              summary: "朝貢與冊封、絲路與海上貿易、與遊牧民族的戰與和。",
            },
            {
              id: "ea-culture",
              title: "文化交流",
              summary: "佛教東傳，漢字、儒學與律令制度影響朝鮮、日本、越南。",
            },
            {
              id: "ea-crisis",
              title: "近代變局",
              summary: "鴉片戰爭後，條約體制逐漸取代朝貢體制。",
            },
            {
              id: "ea-modern",
              title: "現代化的追求",
              summary: "自強運動、明治維新、辛亥革命：各國走上不同的改革路線。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：鴉片戰爭的來龍去脈",
        problem: "19 世紀中英之間的貿易，為什麼會演變成一場戰爭？",
        steps: [
          {
            show: "英國大量購買中國的茶葉與絲綢，白銀大量流入中國，英國對華貿易長期**逆差**。",
          },
          {
            show: "英國商人把印度生產的鴉片走私到中國，扭轉了貿易局勢，白銀反而從中國外流。",
            predict: {
              question: "英國靠哪一種商品扭轉對華貿易逆差？",
              choices: ["鴉片", "茶葉", "瓷器"],
              answer: 0,
            },
          },
          {
            show: "鴉片造成吸食成癮與白銀外流，1839 年林則徐在廣東查禁鴉片（虎門銷煙）。",
          },
          {
            show: "1840 年英國出兵，清帝國戰敗，1842 年簽訂**南京條約**。",
            predict: {
              question: "南京條約的內容包括？",
              choices: ["割讓香港島、五口通商、賠款", "割讓臺灣、澎湖", "各國在北京駐兵"],
              answer: 0,
            },
          },
          {
            show: "**影響**：東亞傳統的朝貢體制逐漸被條約體制取代，中國被迫開放並走上改革之路。",
          },
        ],
        takeaway:
          "**貿易逆差 → 走私鴉片 → 禁煙衝突 → 戰爭 → 不平等條約**：這是近代東亞變局的開端。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "晚清到民初大事排一排",
        prompt: "把下列事件由**早到晚**排列。",
        items: [
          { id: "opium", label: "鴉片戰爭" },
          { id: "arrow", label: "英法聯軍" },
          { id: "self", label: "自強運動展開" },
          { id: "sino-jp", label: "甲午戰爭" },
          { id: "reform", label: "戊戌變法" },
          { id: "xinhai", label: "辛亥革命" },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：條約與內容",
        pairs: [
          ["南京條約", "割讓香港島、開放五口通商"],
          ["天津條約", "增開通商口岸，包括臺灣"],
          ["馬關條約", "割讓臺灣、澎湖給日本"],
          ["辛丑和約", "鉅額賠款、各國在北京使館區駐兵"],
          ["神奈川條約", "日本對美國開放港口"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e3"), q("e4"), q("e5")],
      },
    ],
  },
  {
    id: n("world"),
    title: "世界史：從古代文明到世界大戰",
    grade: 9,
    minutes: 15,
    nodeIds: [n("world"), n("w-industrial"), n("w-wars")],
    objectives: [
      "能連結古代到近代各文明的重要遺產",
      "能分辨工業革命的原因與影響",
      "能說明第一次世界大戰的成因，並排列二戰重要事件",
    ],
    activities: [
      {
        id: "a1",
        kind: "memory",
        title: "翻牌配對：文明與遺產",
        pairs: [
          ["兩河流域", "楔形文字與漢摩拉比法典"],
          ["古埃及", "象形文字與金字塔"],
          ["雅典", "公民直接參與的民主政治"],
          ["羅馬", "影響後世深遠的羅馬法"],
          ["文藝復興", "人文主義與達文西"],
          ["宗教改革", "馬丁路德批評贖罪券"],
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "工業革命：原因還是影響？",
        buckets: [
          { id: "cause", label: "原因（有利條件）" },
          { id: "effect", label: "影響（帶來的改變）" },
        ],
        items: [
          { id: "c1", label: "英國煤、鐵資源豐富", bucket: "cause" },
          { id: "c2", label: "海外殖民地提供原料與市場", bucket: "cause" },
          { id: "c3", label: "圈地運動使農民流入城市", bucket: "cause" },
          { id: "c4", label: "海外貿易累積大量資本", bucket: "cause" },
          { id: "f1", label: "都市人口快速增加", bucket: "effect" },
          { id: "f2", label: "工廠制度與長時間勞動", bucket: "effect" },
          { id: "f3", label: "童工問題引發立法改革", bucket: "effect" },
          { id: "f4", label: "社會主義思想興起", bucket: "effect" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：一次大戰怎麼爆發的？",
        problem: "1914 年一位皇儲遇刺，為什麼會演變成席捲歐洲的大戰？",
        steps: [
          {
            show: "**長期背景**：列強擴張軍備（軍國主義）、爭奪殖民地（帝國主義）、民族主義高漲。",
          },
          {
            show: "**兩大集團**：德、奧、義組成三國同盟；英、法、俄形成三國協約，彼此猜忌。",
            predict: {
              question: "同盟體系最可能造成什麼結果？",
              choices: ["一國衝突容易牽動盟國參戰", "各國從此不再發生戰爭", "殖民地全部獨立"],
              answer: 0,
            },
          },
          {
            show: "**導火線**：1914 年 6 月，奧匈帝國皇儲在塞拉耶佛遭支持塞爾維亞民族主義的青年刺殺。",
          },
          {
            show: "**連鎖宣戰**：奧匈向塞爾維亞宣戰，俄國支持塞爾維亞，德國支持奧匈，英、法也相繼捲入。",
            predict: {
              question: "奧匈向塞爾維亞宣戰後，哪一國出面支持塞爾維亞？",
              choices: ["俄國", "美國", "日本"],
              answer: 0,
            },
          },
          {
            show: "**結果**：1918 年同盟國戰敗；1919 年凡爾賽條約嚴厲懲罰德國，埋下日後衝突的種子。",
          },
        ],
        takeaway: "**長期原因 + 導火線 + 同盟連鎖反應**，讓一場區域衝突擴大成世界大戰。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：一戰原因概念圖",
        task: "在畫布中央寫「第一次世界大戰」，向外畫出至少四個長期原因與一個導火線，再用箭頭表示它們之間的關係。",
        background: "blank",
        hint: "長期原因可以想想：軍備、同盟、殖民地、民族情緒；導火線是哪一個事件？",
        reference:
          "- 長期原因：**軍國主義**（軍備競賽）、**同盟體系**（三國同盟對三國協約）、**帝國主義**（爭奪殖民地）、**民族主義**（巴爾幹半島的民族衝突）\n- 導火線：1914 年**塞拉耶佛事件**\n- 箭頭示例：民族主義 → 塞拉耶佛事件 → 同盟體系連鎖宣戰 → 世界大戰",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "drag",
        mode: "order",
        title: "二戰重要事件排一排",
        prompt: "把第二次世界大戰的重要事件，由**早到晚**排列。",
        items: [
          { id: "poland", label: "德國入侵波蘭" },
          { id: "ussr", label: "德國進攻蘇聯" },
          { id: "pearl", label: "日本偷襲珍珠港" },
          { id: "normandy", label: "盟軍諾曼第登陸" },
          { id: "germany", label: "德國投降" },
          { id: "japan", label: "日本宣布投降" },
        ],
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w1"), q("w3"), q("w5"), q("w6"), q("w8")],
      },
    ],
  },
];

export default lessons;
