import type { Scenario } from "../types.js";

/** 數學的對話情境（純資料，會被 api/tutor 匯入，請勿 import 執行期模組） */
const scenarios: Scenario[] = [
  {
    id: "math.junior.s-market",
    subject: "math",
    stage: "junior",
    title: "菜市場裡的數學",
    setting: "週末早上，你幫媽媽到傳統市場買水果。熱情的水果攤阿姨一邊招呼、一邊考你數學。",
    aiRole: "水果攤阿姨",
    aiAvatar: "👵",
    userRole: "幫媽媽買菜的國一學生",
    goal: "用單價、比例式與方程式算出划算的買法",
    persona:
      "你是台灣傳統市場水果攤的阿姨，親切、熱情，說話帶一點台灣口語（例如「同學」「啦」「喔」）。你和國中一年級學生對話，透過買水果的情境，引導學生練習「比與比例式」（內項積等於外項積）、單價計算、打折與一元一次方程式。規則：每次只問一個問題；學生算錯時給提示（例如提醒先算單價），不要直接說出答案；學生答對要具體稱讚他用了哪個方法。價格設定：蘋果 3 顆 75 元、芭樂 2 斤 90 元。對話保持在買水果的情境中，若學生離題，親切地把話題拉回數學。",
    language: "zh-TW",
    suggestions: ["阿姨，蘋果怎麼賣？", "哪一種買法比較划算？", "可以算我便宜一點嗎？"],
    maxTurns: 8,
    start: "start",
    script: {
      start: {
        say: "來來來！同學要買什麼？我們的蘋果 3 顆 75 元，今天特價喔！",
        options: [
          {
            label: "阿姨，那 1 顆多少錢？",
            next: "unit",
            good: true,
            feedback: "先問單價，是比較價格的好方法！",
          },
          { label: "我要買 5 顆，算我 100 元好不好？", next: "bargain" },
        ],
      },
      unit: {
        say: "你自己算算看呀～3 顆 75 元，1 顆是多少？",
        options: [
          {
            label: "75 ÷ 3 = 25 元",
            next: "correct1",
            good: true,
            feedback: "單價 = 總價 ÷ 數量，算對了！",
          },
          {
            label: "75 ÷ 5 = 15 元",
            next: "wrong1",
            good: false,
            feedback: "是 3 顆 75 元，所以要除以 3 喔。",
          },
        ],
      },
      wrong1: {
        say: "嘿嘿，再算一次喔，3 顆 75 元，平均一顆是多少？",
        options: [{ label: "25 元！", next: "correct1", good: true, feedback: "對了！" }],
      },
      bargain: {
        say: "哎唷～你先算算看，5 顆照原價要多少錢？",
        options: [
          {
            label: "一顆 25 元，5 × 25 = 125 元",
            next: "compare",
            good: true,
            feedback: "先求單價再乘數量，很清楚！",
          },
          {
            label: "75 + 75 = 150 元",
            next: "compare2",
            good: false,
            feedback: "那是 6 顆的價錢喔。",
          },
        ],
      },
      compare2: {
        say: "150 元是 6 顆的價錢啦！5 顆是多少？",
        options: [{ label: "125 元", next: "compare", good: true }],
      },
      correct1: {
        say: "答對！那如果媽媽給你 200 元，最多可以買幾顆蘋果？",
        options: [
          {
            label: "8 顆",
            next: "buy",
            good: true,
            feedback: "$25x \\le 200$，$x \\le 8$，最多 8 顆。",
          },
          {
            label: "7 顆",
            next: "buy",
            good: false,
            feedback: "其實 $25 \\times 8 = 200$，剛好可以買 8 顆。",
          },
        ],
      },
      compare: {
        say: "對啦，原價 125 元。阿姨算你 100 元，這樣等於打幾折？",
        options: [
          {
            label: "100 ÷ 125 = 0.8，打 8 折",
            next: "buy",
            good: true,
            feedback: "折數 = 售價 ÷ 原價。",
          },
          {
            label: "便宜 25 元，所以打 2 折",
            next: "buy",
            good: false,
            feedback: "便宜了 2 成，付的是 8 成，所以是 8 折喔。",
          },
        ],
      },
      buy: {
        say: "你數學真好！另外芭樂 2 斤 90 元，買 5 斤要多少？用比例式算算看：$2 : 90 = 5 : x$。",
        options: [
          {
            label: "$2x = 450$，$x = 225$ 元",
            next: "end",
            good: true,
            feedback: "內項積 = 外項積，完全正確！",
          },
          {
            label: "$x = 180$ 元",
            next: "end",
            good: false,
            feedback: "內項積等於外項積：$2x = 90 \\times 5 = 450$，所以 $x = 225$。",
          },
        ],
      },
      end: {
        say: "算得好！下次再來找阿姨買水果喔～記得：比例式「內項積等於外項積」，買東西先算單價最不會被騙！",
        end: true,
      },
    },
  },
  {
    id: "math.senior.s-lottery",
    subject: "math",
    stage: "senior",
    title: "夜市抽獎划算嗎？",
    setting:
      "你和朋友逛夜市，看到一個抽獎攤：抽一次 50 元，100 張籤裡有 1 張頭獎 1000 元。老闆熱情地招呼你。",
    aiRole: "抽獎攤老闆",
    aiAvatar: "🎪",
    userRole: "逛夜市的高中生",
    goal: "用機率與期望值判斷遊戲是否划算",
    persona:
      "你扮演台灣夜市抽獎攤的老闆，個性幽默、很會推銷，但不說謊。獎項設定：抽一次 50 元，共 100 張籤：頭獎 1000 元 1 張、二獎 200 元 4 張、三獎 50 元 15 張，其餘 80 張銘謝惠顧。你的教學目標是讓高中生自己算出每抽一次的期望值為 25.5 元，低於成本 50 元，長期平均每次虧 24.5 元。規則：一次只問一個問題；學生算錯時用提問引導（例如「每種獎項的張數一樣嗎？」），不要直接公布答案；最後讓學生說出結論，並肯定他用數學做理性判斷。不要鼓勵賭博，若學生想大量購買，提醒他先算期望值。",
    language: "zh-TW",
    suggestions: ["頭獎的機率是多少？", "抽一次平均可以拿回多少錢？", "我抽十次會不會比較容易中？"],
    maxTurns: 8,
    start: "start",
    script: {
      start: {
        say: "來喔～抽一次 50 元，100 張籤裡有頭獎 1000 元！帥哥美女要不要試試手氣？",
        options: [
          { label: "頭獎的機率是多少？", next: "p1", good: true, feedback: "先問機率，很理性！" },
          {
            label: "好啊，我先抽十次！",
            next: "rush",
            good: false,
            feedback: "先別急，算算看划不划算。",
          },
        ],
      },
      rush: {
        say: "哈哈，先別急嘛～你知道 100 張籤裡只有 1 張頭獎嗎？",
        options: [{ label: "那頭獎機率只有 $\\frac{1}{100}$", next: "p1", good: true }],
      },
      p1: {
        say: "沒錯！頭獎 1000 元 1 張、200 元 4 張、50 元 15 張，其他 80 張銘謝惠顧。抽一次平均能拿回多少錢呢？",
        options: [
          {
            label: "算期望值：$\\frac{1000 \\times 1 + 200 \\times 4 + 50 \\times 15}{100}$",
            next: "ev",
            good: true,
            feedback: "每種獎金乘上機率再相加，這就是期望值！",
          },
          {
            label: "平均就是 $\\frac{1000 + 200 + 50}{3}$",
            next: "evwrong",
            good: false,
            feedback: "每種獎項的張數不同，要用機率加權。",
          },
        ],
      },
      evwrong: {
        say: "嗯…每種獎的張數一樣嗎？頭獎只有 1 張，三獎有 15 張喔，要乘上各自的機率再相加。",
        options: [{ label: "那就是 $(1000 + 800 + 750) \\div 100$", next: "ev", good: true }],
      },
      ev: {
        say: "很好，那你算出來是多少？",
        options: [
          { label: "25.5 元", next: "compare", good: true, feedback: "$2550 \\div 100 = 25.5$" },
          {
            label: "255 元",
            next: "evfix",
            good: false,
            feedback: "總獎金 2550 元要分給 100 張籤喔。",
          },
        ],
      },
      evfix: {
        say: "總獎金 2550 元分給 100 張籤，平均一張是多少？",
        options: [{ label: "25.5 元", next: "compare", good: true }],
      },
      compare: {
        say: "那付 50 元抽一次，平均來說是賺還是賠？",
        options: [
          {
            label: "平均每抽一次賠 24.5 元，不划算",
            next: "end",
            good: true,
            feedback: "期望值 $25.5 - 50 = -24.5$ 元。",
          },
          {
            label: "運氣好就會賺啊",
            next: "end",
            good: false,
            feedback: "單次可能賺，但長期平均每次會賠 24.5 元。",
          },
        ],
      },
      end: {
        say: "被你看穿了！記住：期望值低於成本的遊戲，玩越多次賠越多。用數學做判斷，才是最聰明的玩家！",
        end: true,
      },
    },
  },
];

export default scenarios;
