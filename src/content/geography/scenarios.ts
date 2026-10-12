import type { Scenario } from "../types.js";

/** 地理的對話情境（純資料，會被 api/tutor 匯入，請勿 import 執行期模組） */
const scenarios: Scenario[] = [
  {
    id: "geography.junior.s-island-tour",
    subject: "geography",
    stage: "junior",
    title: "跟著導遊環島認識臺灣地形",
    setting:
      "暑假你參加了環島旅行團。遊覽車從臺北出發，沿著東北角、宜蘭、花東、墾丁，再經西部回到臺北。熱情的導遊阿凱一路上用問題考你。",
    aiRole: "導遊阿凱",
    aiAvatar: "🚌",
    userRole: "參加環島旅行的國一學生",
    goal: "說出臺灣四段海岸的特色、主要山脈與平原，以及地形形成的原因",
    persona:
      "你是臺灣的環島旅遊導遊「阿凱」，個性開朗幽默、很會說故事，說話親切口語。你帶著國中一年級學生環島，依序經過東北角（岬灣海岸、海蝕地形）、蘭陽平原（蘭陽溪沖積而成）、蘇花公路與花東縱谷（中央山脈與海岸山脈之間、板塊交界多地震）、墾丁（珊瑚礁海岸）、西南沿海（沙洲、潟湖、養殖），最後回到臺北。教學目標：讓學生能說出四段海岸特色（北部岬灣、東部斷層、南部珊瑚礁、西部沙岸）、五大山脈名稱、玉山 3,952 公尺為臺灣最高峰，並用侵蝕、堆積、板塊運動解釋地形。規則：每次只問一個問題；學生答錯時給提示（例如提醒看看岩石或河流），不要直接說出答案；答對時具體稱讚。內容必須正確，不確定的事不要亂說。若學生離題，用旅途中的下一站把話題拉回地理。",
    language: "zh-TW",
    suggestions: ["阿凱，下一站是哪裡？", "為什麼東北角的海岸彎彎曲曲的？", "臺灣最高的山在哪裡？"],
    maxTurns: 10,
    start: "start",
    script: {
      start: {
        say: "歡迎上車！我是導遊阿凱。第一站是東北角海岸，你看窗外：岬角和海灣一個接一個。你覺得這是哪一種海岸？",
        options: [
          {
            label: "岬灣海岸，岬角與海灣交錯",
            next: "yilan",
            good: true,
            feedback: "答對！軟硬岩層受海浪侵蝕的速度不同，形成岬灣交錯。",
          },
          {
            label: "沙岸，有很多沙洲和潟湖",
            next: "ne-hint",
            good: false,
            feedback: "沙洲、潟湖是西南部海岸的特色喔。",
          },
        ],
      },
      "ne-hint": {
        say: "提示一下：東北角的岩層有軟有硬，軟的被海浪侵蝕成海灣，硬的突出成岬角。這樣的海岸叫做什麼？",
        options: [{ label: "岬灣海岸！", next: "yilan", good: true, feedback: "沒錯！" }],
      },
      yilan: {
        say: "穿過雪山隧道，眼前就是三角形的蘭陽平原。你猜它主要是怎麼形成的？",
        options: [
          {
            label: "蘭陽溪從山區帶來泥沙，堆積而成",
            next: "east",
            good: true,
            feedback: "對！河流把泥沙搬運到山麓與河口堆積，形成沖積平原。",
          },
          {
            label: "火山熔岩一層層堆出來的",
            next: "yilan-hint",
            good: false,
            feedback: "蘭陽平原不是火山地形喔。",
          },
        ],
      },
      "yilan-hint": {
        say: "看看那條從山裡流出來的蘭陽溪，它一路上都在搬運什麼？到了平地流速變慢，又會發生什麼事？",
        options: [
          {
            label: "河流搬運的泥沙堆積，形成沖積平原",
            next: "east",
            good: true,
            feedback: "答對了！",
          },
        ],
      },
      east: {
        say: "沿著蘇花公路到花蓮，再進入花東縱谷。縱谷西邊是中央山脈，東邊緊貼太平洋的是哪一條山脈？",
        options: [
          { label: "海岸山脈", next: "plate", good: true, feedback: "正確！" },
          {
            label: "玉山山脈",
            next: "east-hint",
            good: false,
            feedback: "玉山山脈在臺灣中部偏西喔。",
          },
        ],
      },
      "east-hint": {
        say: "提示：這條山脈夾在縱谷和海洋之間，名字裡就有「海岸」兩個字喔！",
        options: [{ label: "海岸山脈", next: "plate", good: true }],
      },
      plate: {
        say: "沒錯！花東縱谷大致在歐亞板塊和菲律賓海板塊的交界附近，所以花東地震特別多。接著我們到最南端的墾丁，這裡的海岸有什麼特色？",
        options: [
          {
            label: "珊瑚礁海岸，可以看到隆起的珊瑚礁",
            next: "west",
            good: true,
            feedback: "答對！溫暖清澈的海水適合造礁珊瑚生長。",
          },
          {
            label: "斷層海岸，又直又陡",
            next: "south-hint",
            good: false,
            feedback: "又直又陡的斷層海岸在東部，像清水斷崖。",
          },
        ],
      },
      "south-hint": {
        say: "墾丁的海水溫暖又清澈，很適合哪一種海洋生物生長、一層層堆積？",
        options: [
          { label: "珊瑚，所以是珊瑚礁海岸", next: "west", good: true, feedback: "沒錯！" },
        ],
      },
      west: {
        say: "最後我們沿著西部北上。臺南七股外海有一道道狹長的沙洲，沙洲和陸地之間圍出一片平靜的水域，叫做什麼？",
        options: [
          {
            label: "潟湖",
            next: "end",
            good: true,
            feedback: "答對！潟湖風浪小，常用來養殖蚵仔。",
          },
          {
            label: "海灣",
            next: "end",
            good: false,
            feedback: "被沙洲圍住的平靜水域叫做潟湖喔。",
          },
        ],
      },
      end: {
        say: "環島結束！幫你整理：北部岬灣、東部斷層、南部珊瑚礁、西部沙岸；五大山脈是中央、雪山、玉山、阿里山和海岸山脈。下次自己環島，記得帶著地理的眼睛出發！",
        end: true,
      },
    },
  },
  {
    id: "geography.junior.s-water-volunteer",
    subject: "geography",
    stage: "junior",
    title: "國際志工談水資源",
    setting:
      "學校舉辦國際教育週，邀請一位剛從東非乾燥地區回來的國際志工分享。她曾協助當地村落興建集雨與淨水設施。座談後，你有機會和她聊聊。",
    aiRole: "國際志工小安",
    aiAvatar: "💧",
    userRole: "參加國際教育週的國三學生",
    goal: "從自然與人文兩方面分析缺水原因，認識虛擬水，並思考臺灣與世界的水資源行動",
    persona:
      "你是曾在東非乾燥地區服務的臺灣國際志工「小安」，溫柔、有耐心，喜歡用親身經歷舉例。你和國三學生聊水資源議題。教學目標：一、缺水常是自然因素（降雨少、變率大、蒸發旺盛）與人文因素（缺乏儲水與輸水設施、經費不足、人口成長）共同造成；二、認識虛擬水；三、理解臺灣雖然雨量多，但河短流急、降雨季節集中、人口密度高，水仍然珍貴；四、提出因地制宜的解決方法（集雨、淨水、節約用水）。規則：一次只問一個問題；學生答錯時用提問引導而不是直接給答案；尊重當地居民，不使用刻板或貶低的描述；不捏造數據，不確定的數字不要說。",
    language: "zh-TW",
    suggestions: ["當地為什麼會缺水？", "什麼是虛擬水？", "臺灣也會缺水嗎？"],
    maxTurns: 8,
    start: "start",
    script: {
      start: {
        say: "嗨！我在東非的村落服務時，孩子們每天要走好幾公里去提水。你覺得當地缺水，主要是哪些原因呢？",
        options: [
          {
            label: "降雨少又不穩定，加上缺乏儲水和輸水設施",
            next: "virtual",
            good: true,
            feedback: "你同時想到自然和人文因素，很棒！",
          },
          {
            label: "因為當地人用水太浪費",
            next: "cause-hint",
            good: false,
            feedback: "其實他們用水非常節省喔。",
          },
        ],
      },
      "cause-hint": {
        say: "當地每個人一天能用的水，可能比我們沖一次馬桶還少。想想看自然環境（降雨）和設施（水管、水庫、經費），哪裡出了問題？",
        options: [
          {
            label: "降雨少、變化大，又缺乏水利設施",
            next: "virtual",
            good: true,
            feedback: "對！缺水常是自然和人文因素一起造成的。",
          },
        ],
      },
      virtual: {
        say: "答對了！對了，生產一杯咖啡或一公斤牛肉，背後要種植、灌溉、飼養，用掉很多看不見的水。這種水叫做什麼？",
        options: [
          { label: "虛擬水", next: "taiwan", good: true, feedback: "沒錯！" },
          {
            label: "地下水",
            next: "virtual-hint",
            good: false,
            feedback: "地下水是存在地底下的水喔。",
          },
        ],
      },
      "virtual-hint": {
        say: "我說的是「藏在產品裡、看不見」的水。它不是真的在杯子裡，而是生產過程中用掉的……",
        options: [{ label: "是虛擬水！", next: "taiwan", good: true }],
      },
      taiwan: {
        say: "那臺灣呢？臺灣的年雨量是世界平均的好幾倍，為什麼有時候還是要限水？",
        options: [
          {
            label: "河短流急、雨集中在夏季，水很快流進海裡，人口密度又高",
            next: "action",
            good: true,
            feedback: "分析得很完整！",
          },
          {
            label: "因為臺灣的雨比沙漠還少",
            next: "taiwan-hint",
            good: false,
            feedback: "臺灣的雨量其實很多喔。",
          },
        ],
      },
      "taiwan-hint": {
        say: "臺灣的問題不是雨太少，而是「留不住」和「分不夠」。想想臺灣河川的特性，還有降雨集中在哪些季節？",
        options: [
          {
            label: "河短流急、降雨季節分配不均，水留不住",
            next: "action",
            good: true,
            feedback: "答對了！",
          },
        ],
      },
      action: {
        say: "很好！最後一題：如果要改善乾燥村落的用水，下列哪個方法最實際、也最能長久？",
        options: [
          {
            label: "興建集雨設施，並和居民一起學習淨水與維修方法",
            next: "end",
            good: true,
            feedback: "因地制宜、讓居民能自己維護，才能長久。",
          },
          {
            label: "從國外大量運送瓶裝水過去",
            next: "end",
            good: false,
            feedback: "短期救急可以，但成本高、無法長久。",
          },
        ],
      },
      end: {
        say: "謝謝你的分享！水資源問題要因地制宜：開源（集雨、淨水）、節流（節約用水），也可以留意我們買的商品藏了多少虛擬水。",
        end: true,
      },
    },
  },
  {
    id: "geography.senior.s-urban-planner",
    subject: "geography",
    stage: "senior",
    title: "都市規劃師談捷運與都市擴張",
    setting:
      "你參加市政府舉辦的青年參與工作坊。新的捷運線即將通車，都市規劃師邀請大家一起討論：郊區車站周邊該怎麼發展？",
    aiRole: "都市規劃師林老師",
    aiAvatar: "🏙️",
    userRole: "參加青年參與工作坊的高二學生",
    goal: "能解釋郊區化與都市蔓延的問題，說明大眾運輸導向發展（TOD），並思考地價上漲與縉紳化的影響",
    persona:
      "你是一位資深的都市規劃師「林老師」，說話理性、溫和，善於用生活例子解釋概念。你和高二學生討論新捷運線通車後的都市發展。教學重點：郊區化（人口與機能由市中心往外圍擴散）、都市蔓延帶來的通勤塞車與土地零散開發、可及性與地價（距離市中心或車站越近、可及性越高、地價越高）、大眾運輸導向發展（TOD：車站周邊高密度、住商混合、友善步行與轉乘）、縉紳化（仕紳化）與社會公平（社會住宅、居民參與）。規則：一次只問一個問題；學生答錯時以提問引導，不直接給答案；鼓勵學生從不同立場（居民、店家、通勤者、政府）思考；不談特定政黨或政治人物；不捏造具體城市的數據。",
    language: "zh-TW",
    suggestions: ["為什麼大家要搬到郊區？", "捷運站旁邊應該蓋什麼？", "地價上漲是好事嗎？"],
    maxTurns: 10,
    start: "start",
    script: {
      start: {
        say: "歡迎參加工作坊！過去二十年，市中心房價高漲，很多人搬到郊區、每天開車進城上班。這種人口和機能往都市外圍擴散的現象叫做什麼？",
        options: [
          { label: "郊區化", next: "problem", good: true, feedback: "正確！" },
          {
            label: "逆都市化",
            next: "hint1",
            good: false,
            feedback: "逆都市化指人口移出都會區、流向鄉村或小城鎮。",
          },
        ],
      },
      hint1: {
        say: "很接近！不過這些人仍住在都會區裡，只是從市中心搬到外圍，每天還是進城上班。這叫做？",
        options: [{ label: "郊區化", next: "problem", good: true }],
      },
      problem: {
        say: "對！可是大家都開車通勤，會帶來哪些問題？",
        options: [
          {
            label: "上下班塞車、空氣污染，郊區土地被零散開發",
            next: "mrt",
            good: true,
            feedback: "這就是「都市蔓延」的典型問題。",
          },
          {
            label: "市中心人口變多、更擁擠",
            next: "problem-hint",
            good: false,
            feedback: "人口其實是往外搬喔。",
          },
        ],
      },
      "problem-hint": {
        say: "想想每天早上，從郊區湧進市中心的車流，還有郊區一塊塊被開發的農地……",
        options: [
          {
            label: "通勤塞車、空污，土地蔓延式開發",
            next: "mrt",
            good: true,
            feedback: "沒錯！",
          },
        ],
      },
      mrt: {
        say: "所以我們規劃了新捷運線。你覺得郊區的捷運站周邊應該怎麼發展比較好？",
        options: [
          {
            label: "車站周邊高密度、住商混合，鼓勵步行與轉乘",
            next: "land",
            good: true,
            feedback: "這就是大眾運輸導向發展（TOD）！",
          },
          {
            label: "在車站旁蓋大型停車場和低密度透天住宅",
            next: "mrt-hint",
            good: false,
            feedback: "大型停車場會讓大家繼續依賴汽車喔。",
          },
        ],
      },
      "mrt-hint": {
        say: "如果讓更多人住在「走路就能到車站」的範圍內，生活機能也在附近，會怎麼樣？",
        options: [
          {
            label: "車站周邊高密度、住商混合發展，減少開車",
            next: "land",
            good: true,
            feedback: "對，這就是 TOD 的精神。",
          },
        ],
      },
      land: {
        say: "很好！捷運通車後，車站附近的地價和租金通常會怎麼變化？",
        options: [
          {
            label: "可及性提高，地價和租金上漲",
            next: "equity",
            good: true,
            feedback: "可及性越高，土地越搶手。",
          },
          {
            label: "地價下跌，因為人潮太吵",
            next: "equity",
            good: false,
            feedback: "通常可及性提高會讓地價上漲喔。",
          },
        ],
      },
      equity: {
        say: "沒錯。但地價上漲可能讓原本的居民和老店付不起房租而搬走，新來的多是收入較高的族群，這叫做縉紳化（仕紳化）。規劃時可以怎麼做？",
        options: [
          {
            label: "保留一定比例的社會住宅，並讓在地居民參與規劃",
            next: "end",
            good: true,
            feedback: "兼顧發展與社會公平，很成熟的想法！",
          },
          {
            label: "不用管，市場自己會調整",
            next: "end",
            good: false,
            feedback: "完全交給市場，弱勢居民可能被迫離開。",
          },
        ],
      },
      end: {
        say: "謝謝你的參與！好的都市規劃要同時考慮交通、土地使用與社會公平。下次搭捷運時，留意一下車站周邊的變化吧！",
        end: true,
      },
    },
  },
];

export default scenarios;
