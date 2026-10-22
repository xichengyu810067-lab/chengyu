import type { Question } from "../../types";

const id = (s: string) => `english.junior.q-${s}`;
const node = (s: string) => `english.junior.${s}`;

const SWAP_CONTEXT = `閱讀下面的公告，回答問題。

**Book Swap Day**

Hello, everyone! Our class is holding a Book Swap Day next Friday. Bring one or two books that you have finished reading, and you can take home the same number of books from other students. Please do not bring magazines or comic books. The event starts at 12:30 in the library and lasts for forty minutes. Mr. Chen, our English teacher, will give a small card to the student who brings the most books. Don't miss it!`;

const CLASS_CONTEXT = `以下是某班四位同學的資料（為假設的情境）：

| Student | Height (cm) | Minutes to school |
|---|---|---|
| Amy | 158 | 10 |
| Ben | 165 | 25 |
| Cathy | 160 | 15 |
| David | 172 | 20 |`;

const BEN =
  "閱讀短文後回答問題。\n\nBen is from Canada. Last year, he came to Taiwan to study Chinese. At first, he could not read the menus at night markets, so he always pointed at the pictures. Now he can order food in Chinese, and he even teaches his classmates how to make pancakes. He says living in Taiwan has changed him a lot.";

const MIA =
  "閱讀短文後回答問題。\n\nMia has a small plant on her desk. She waters it every morning, and it grows a little every week. Her brother thinks the plant is boring, but Mia loves it because her grandma gave it to her.";

const questions: Question[] = [
  // ── 字詞 ──
  {
    id: id("v1"),
    type: "single",
    stem: "Please put the dictionary back on the ____. 請把字典放回＿＿上。",
    choices: ["blackboard", "clock", "bookshelf", "backpack"],
    answer: 2,
    explain:
      "字典要放回 **bookshelf（書架）**。blackboard 是黑板、clock 是時鐘、backpack 是背包，都不是放書的地方。",
    difficulty: 1,
    nodeId: node("vocab-daily"),
  },
  {
    id: id("v2"),
    type: "single",
    stem: "Which word is **uncountable**? 下列哪一個是不可數名詞？",
    choices: ["apple", "chair", "egg", "water"],
    answer: 3,
    explain:
      "**water（水）**沒辦法一個一個數，是不可數名詞；要數量時用容器，如 a glass of water。apple、chair、egg 都可以加 -s。",
    difficulty: 1,
    nodeId: node("vocab-wordclass"),
  },
  {
    id: id("v3"),
    type: "multi",
    stem: "下列哪些名詞是**不可數名詞**？（複選）",
    choices: ["rice", "bread", "pencil", "information", "banana"],
    answer: [0, 1, 3],
    explain:
      "rice（米飯）、bread（麵包）、information（資訊）都是不可數名詞，不能說 an information；pencil 和 banana 可數，可以說 two pencils、three bananas。",
    difficulty: 2,
    nodeId: node("vocab-wordclass"),
  },
  {
    id: id("v4"),
    type: "cloze",
    stem: "There ____ some milk in the bottle.（填入適當的 be 動詞）",
    accept: ["is"],
    explain: "milk 是不可數名詞，要用單數動詞：There **is** some milk in the bottle.",
    difficulty: 1,
    nodeId: node("vocab-wordclass"),
  },
  {
    id: id("v5"),
    type: "tf",
    stem: "「a hour」是正確的寫法。",
    answer: false,
    explain:
      "hour 的 h 不發音，開頭唸起來是母音，所以要用 **an hour**。a / an 看的是「發音」而不是字母。",
    difficulty: 1,
    nodeId: node("vocab-wordclass"),
  },
  {
    id: id("v6"),
    type: "single",
    stem: "I need ____ to cut the paper.",
    choices: ["a scissors", "scissors", "an eraser", "a notebook"],
    answer: 1,
    explain:
      "剪紙要用剪刀 **scissors**，它永遠是複數形，不能說 a scissors；要數的話說 a pair of scissors。",
    difficulty: 2,
    nodeId: node("vocab-daily"),
  },

  // ── 溝通功能 ──
  {
    id: id("c1"),
    type: "single",
    stem: "在餐廳點餐時，下列哪一句最適當、最有禮貌？",
    choices: [
      "Give me a cheeseburger.",
      "I like a cheeseburger.",
      "I'd like a cheeseburger, please.",
      "Cheeseburger, now.",
    ],
    answer: 2,
    explain:
      "**I'd like ..., please.**（= I would like）是禮貌的點餐句型。I like ... 是「我喜歡」，不是點餐；命令句聽起來不禮貌。",
    difficulty: 1,
    nodeId: node("b-order"),
  },
  {
    id: id("c2"),
    type: "single",
    stem: "A: How much is this T-shirt?\nB: ____",
    choices: ["It's very big.", "It's 350 dollars.", "I have three.", "It's red and white."],
    answer: 1,
    explain: "**How much** 問價錢，回答金額：It's 350 dollars.",
    difficulty: 1,
    nodeId: node("b-order"),
  },
  {
    id: id("c3"),
    type: "cloze",
    stem: "Excuse me. ____ is the nearest MRT station?（填入一個問「地點」的疑問詞）",
    accept: ["Where"],
    explain: "問地點用 **Where**：Excuse me. Where is the nearest MRT station?",
    difficulty: 1,
    nodeId: node("b-direction"),
  },
  {
    id: id("c4"),
    type: "single",
    stem: "（打電話）Hello, ____ I speak to Kevin, please?",
    choices: ["Do", "Am", "Will", "May"],
    answer: 3,
    explain: "電話中禮貌地找人：**May I speak to Kevin, please?**（也可以說 Can I speak to ...?）",
    difficulty: 1,
    nodeId: node("b-phone"),
  },
  {
    id: id("c5"),
    type: "single",
    stem: "The bakery is ____ the bookstore and the supermarket.",
    choices: ["next", "between", "across", "behind of"],
    answer: 1,
    explain:
      "**between A and B**：在 A 和 B 之間。next 要寫成 next to，across 要寫成 across from，behind 後面不加 of。",
    difficulty: 2,
    nodeId: node("b-direction"),
  },
  {
    id: id("c6"),
    type: "tf",
    stem: "打電話時說「This is Amy speaking.」，意思是「我是 Amy」。",
    answer: true,
    explain: "電話中表明身分習慣說 **This is Amy (speaking).**，而不說 I am Amy.",
    difficulty: 1,
    nodeId: node("b-phone"),
  },
  {
    id: id("c7"),
    type: "single",
    stem: "A: Do you like playing basketball?\nB: ____",
    choices: [
      "Yes, I am.",
      "Yes, I like.",
      "Yes, I do. I play it every weekend.",
      "No, I'm not like it.",
    ],
    answer: 2,
    explain:
      "用 **Do** 問，就用 **do** 回答：Yes, I do. / No, I don't. 再補一句理由或細節，對話會更自然。",
    difficulty: 1,
    nodeId: node("b-preference"),
  },
  {
    id: id("c8"),
    type: "single",
    stem: "A: Hi, I'm Jenny. Nice to meet you.\nB: ____",
    choices: ["Nice to meet you, too.", "You're welcome.", "I'm fine, thank you.", "See you."],
    answer: 0,
    explain:
      "第一次見面互相問候：Nice to meet you. → **Nice to meet you, too.** You're welcome 是回應道謝。",
    difficulty: 1,
    nodeId: node("b-intro"),
  },

  // ── 時態 ──
  {
    id: id("t1"),
    type: "single",
    stem: "Look! My brother ____ TV in the living room.",
    choices: ["watches", "is watching", "watched", "will watch"],
    answer: 1,
    explain: "**Look!** 表示「此刻正在發生」，用現在進行式 be + V-ing：is watching。",
    difficulty: 1,
    nodeId: node("g-progressive"),
  },
  {
    id: id("t2"),
    type: "single",
    stem: "We ____ to Tainan last weekend.",
    choices: ["go", "will go", "went", "have gone"],
    answer: 2,
    explain: "**last weekend** 是明確的過去時間，用過去簡單式；go 的過去式是不規則的 **went**。",
    difficulty: 1,
    nodeId: node("g-past"),
  },
  {
    id: id("t3"),
    type: "cloze",
    stem: "She ____ (study) English every day.（填入正確的動詞形式）",
    accept: ["studies"],
    explain:
      "every day 表示習慣 → 現在簡單式；主詞 She 是第三人稱單數，study 字尾是「子音 + y」，去 y 加 ies：**studies**。",
    difficulty: 2,
    nodeId: node("g-present"),
  },
  {
    id: id("t4"),
    type: "single",
    stem: "I ____ in Taipei since 2020.",
    choices: ["have lived", "lived", "am living", "will live"],
    answer: 0,
    explain: "**since 2020** 表示從 2020 年持續到現在，用現在完成式 have + 過去分詞：have lived。",
    difficulty: 2,
    nodeId: node("g-perfect"),
  },
  {
    id: id("t5"),
    type: "multi",
    stem: "下列哪些時間詞常和**過去簡單式**一起使用？（複選）",
    choices: ["yesterday", "last year", "tomorrow", "two days ago", "since 2019"],
    answer: [0, 1, 3],
    explain:
      "yesterday、last year、two days ago 都是明確的過去時間。tomorrow 用於未來式；since 2019 用於現在完成式。",
    difficulty: 2,
    nodeId: node("g-past"),
  },
  {
    id: id("t6"),
    type: "tf",
    stem: "「I am going to visit my grandma tomorrow.」表示未來的計畫。",
    answer: true,
    explain: "**be going to + 原形動詞** 表示事先計畫好、即將要做的事，是未來式的一種。",
    difficulty: 1,
    nodeId: node("g-future"),
  },
  {
    id: id("t7"),
    type: "cloze",
    stem: "He has already ____ (finish) his homework.（填入正確的動詞形式）",
    accept: ["finished"],
    explain: "has already + **過去分詞** = 現在完成式；finish 是規則動詞，過去分詞是 finished。",
    difficulty: 1,
    nodeId: node("g-perfect"),
  },
  {
    id: id("t8"),
    type: "single",
    stem: "____ you ever been to Japan?",
    choices: ["Did", "Are", "Have", "Do"],
    answer: 2,
    explain: "問「有沒有去過」是經驗，用現在完成式：**Have** you ever **been** to Japan?",
    difficulty: 2,
    nodeId: node("g-perfect"),
  },
  {
    id: id("t9"),
    type: "single",
    stem: "Tom ____ a video game when his mom came home.",
    choices: ["is playing", "plays", "has played", "was playing"],
    answer: 3,
    explain:
      "媽媽回家（過去的一個時間點）時，Tom「正在」玩遊戲 → 過去進行式 was / were + V-ing：**was playing**。",
    difficulty: 2,
    nodeId: node("g-progressive"),
  },
  {
    id: id("t10"),
    type: "single",
    stem: "My parents ____ teachers.",
    choices: ["is", "am", "are", "be"],
    answer: 2,
    explain: "My parents 是複數主詞，be 動詞用 **are**。",
    difficulty: 1,
    nodeId: node("g-present"),
  },

  // ── 比較級與最高級 ──
  {
    id: id("m1"),
    type: "single",
    stem: "Taipei 101 is ____ than my school building.",
    choices: ["tall", "taller", "tallest", "more tall"],
    answer: 1,
    explain: "有 **than**，兩者比較用比較級；tall 是短形容詞，加 -er：**taller**。",
    difficulty: 1,
    nodeId: node("g-compare"),
  },
  {
    id: id("m2"),
    type: "single",
    stem: "This is the ____ movie I have ever seen.",
    choices: ["better", "good", "most good", "best"],
    answer: 3,
    explain: "the + 最高級；good 是不規則變化：good → better → **best**。",
    difficulty: 1,
    nodeId: node("g-compare"),
  },
  {
    id: id("m3"),
    type: "cloze",
    stem: "For me, math is ____ (difficult) than music.（填入比較級，可以是兩個字）",
    accept: ["more difficult"],
    explain: "difficult 是三音節的長形容詞，比較級要在前面加 more：**more difficult**。",
    difficulty: 2,
    nodeId: node("g-compare"),
  },
  {
    id: id("m4"),
    type: "tf",
    stem: "big 的比較級是 bigger。",
    answer: true,
    explain:
      "「短母音 + 單一子音」結尾的單音節形容詞，要重複字尾子音再加 -er：big → **bigger** → biggest；hot → hotter。",
    difficulty: 1,
    nodeId: node("g-compare"),
  },
  {
    id: id("m5"),
    type: "single",
    stem: "Amy is as ____ as her sister.",
    choices: ["tall", "taller", "tallest", "more tall"],
    answer: 0,
    explain: "**as + 原級 + as** 表示「一樣…」，中間用形容詞原級：as tall as。",
    difficulty: 1,
    nodeId: node("g-compare"),
  },

  // ── 被動語態、關係子句、不定詞與動名詞、連接詞、附加問句 ──
  {
    id: id("p1"),
    type: "single",
    stem: "This bridge ____ in 1990.",
    choices: ["built", "was built", "is building", "has built"],
    answer: 1,
    explain: "橋是「被建造」的，而且 in 1990 是過去 → 過去式被動：**was built**。",
    difficulty: 2,
    nodeId: node("g-passive"),
  },
  {
    id: id("p2"),
    type: "cloze",
    stem: "English ____ spoken in many countries.（填入適當的 be 動詞）",
    accept: ["is"],
    explain:
      "英語「被說」→ 被動語態 be + 過去分詞；主詞 English 是單數、陳述事實用現在式：**is** spoken。",
    difficulty: 2,
    nodeId: node("g-passive"),
  },
  {
    id: id("p3"),
    type: "single",
    stem: "The girl ____ is singing on the stage is my cousin.",
    choices: ["which", "who", "where", "what"],
    answer: 1,
    explain: "先行詞 the girl 是「人」，關係代名詞用 **who**（也可用 that）。",
    difficulty: 2,
    nodeId: node("g-relative"),
  },
  {
    id: id("p4"),
    type: "single",
    stem: "I bought a bag ____ has many pockets.",
    choices: ["who", "where", "which", "what"],
    answer: 2,
    explain: "先行詞 a bag 是「物」，關係代名詞用 **which**（也可用 that）。",
    difficulty: 2,
    nodeId: node("g-relative"),
  },
  {
    id: id("p5"),
    type: "single",
    stem: "My sister enjoys ____ to music.",
    choices: ["listening", "to listen", "listen", "listened"],
    answer: 0,
    explain: "**enjoy + V-ing**（動名詞）：enjoys listening to music。",
    difficulty: 2,
    nodeId: node("g-inf-ger"),
  },
  {
    id: id("p6"),
    type: "single",
    stem: "I decided ____ harder this year.",
    choices: ["studying", "study", "studied", "to study"],
    answer: 3,
    explain: "**decide + to V**（不定詞）：decided to study harder。",
    difficulty: 2,
    nodeId: node("g-inf-ger"),
  },
  {
    id: id("p7"),
    type: "single",
    stem: "You are a student, ____?",
    choices: ["are you", "aren't you", "don't you", "isn't it"],
    answer: 1,
    explain:
      "前面是肯定句（You are），附加問句用否定，且沿用 be 動詞與代名詞主詞：**aren't you**。",
    difficulty: 2,
    nodeId: node("g-tag"),
  },
  {
    id: id("p8"),
    type: "cloze",
    stem: "Kevin can't swim, ____ he?（填入一個字完成附加問句）",
    accept: ["can"],
    explain: "前面是否定（can't），附加問句用肯定，並沿用助動詞 can：Kevin can't swim, **can** he?",
    difficulty: 2,
    nodeId: node("g-tag"),
  },
  {
    id: id("p9"),
    type: "single",
    stem: "I stayed home ____ it was raining.",
    choices: ["but", "so", "because", "or"],
    answer: 2,
    explain:
      "下雨是待在家的**原因**，用 **because**。若用 so，要寫成 It was raining, so I stayed home.",
    difficulty: 1,
    nodeId: node("g-conj"),
  },
  {
    id: id("p10"),
    type: "tf",
    stem: "「The cake was made by my mom.」是被動語態的句子。",
    answer: true,
    explain:
      "主詞 the cake 是被做出來的，句型是 be 動詞（was）+ 過去分詞（made）+ by 動作者，是被動語態。",
    difficulty: 1,
    nodeId: node("g-passive"),
  },

  // ── 文化與閱讀 ──
  {
    id: id("r1"),
    type: "single",
    stem: 'Which festival is on October 31, when children say "Trick or treat!"?',
    choices: ["Thanksgiving", "Christmas", "Halloween", "Easter"],
    answer: 2,
    explain:
      "**Halloween（萬聖節）** 在 10 月 31 日，孩子們會打扮成各種角色，挨家挨戶說 Trick or treat! 討糖果。",
    difficulty: 1,
    nodeId: node("c-festival"),
  },
  {
    id: id("r2"),
    type: "single",
    stem: "美國的 Thanksgiving（感恩節）在哪一個月？",
    choices: ["九月", "十月", "十一月", "十二月"],
    answer: 2,
    explain: "美國的感恩節在**十一月的第四個星期四**，家人團聚，傳統上會吃烤火雞（roast turkey）。",
    difficulty: 1,
    nodeId: node("c-festival"),
  },
  {
    id: id("r3"),
    type: "tf",
    stem: "農曆新年期間，臺灣的長輩常把紅包（red envelopes）送給小孩。",
    answer: true,
    explain:
      "Lunar New Year 時，長輩會給小孩**紅包（red envelopes）**，代表祝福與好運；除夕晚上全家會一起吃團圓飯。",
    difficulty: 1,
    nodeId: node("c-festival"),
  },
  {
    id: id("r4"),
    type: "single",
    stem: `${BEN}\n\nWhat is the passage mainly about?`,
    choices: [
      "How to make pancakes",
      "How Ben's life changed after he came to Taiwan",
      "Night markets in Canada",
      "Why Chinese is hard to learn",
    ],
    answer: 1,
    explain:
      "全文從 Ben 剛來臺灣看不懂菜單，寫到現在會用中文點餐、教同學做煎餅，最後一句總結 living in Taiwan has changed him a lot，主旨是**他來臺灣後的改變**。其他選項只是細節或文中沒提到。",
    difficulty: 2,
    nodeId: node("d-reading"),
  },
  {
    id: id("r5"),
    type: "single",
    stem: `${BEN}\n\nWhich of the following is TRUE about Ben?`,
    choices: [
      "He never goes to night markets.",
      "He teaches Chinese in Canada.",
      "His Chinese has improved.",
      "He doesn't like Taiwanese food.",
    ],
    answer: 2,
    explain:
      "以前看不懂菜單（could not read the menus），現在 can order food in Chinese → 他的中文**進步了**。其他選項都和文章矛盾或沒有提到。",
    difficulty: 2,
    nodeId: node("d-reading"),
  },
  {
    id: id("r6"),
    type: "single",
    stem: `${MIA}\n\nIn the sentence "her grandma gave **it** to her," what does **it** refer to?`,
    choices: ["the desk", "the plant", "the morning", "her brother"],
    answer: 1,
    explain:
      "往前找 it 代替的名詞：奶奶送給 Mia 的是 **the plant（植物）**，所以 Mia 很喜歡它。代名詞題要找「單複數相符、意思說得通」的名詞。",
    difficulty: 2,
    nodeId: node("d-reading"),
  },

  // 素養題組：讀公告
  {
    id: id("set-swap-1"),
    type: "single",
    context: SWAP_CONTEXT,
    stem: "What can students do on Book Swap Day?",
    choices: [
      "Buy new books from the library.",
      "Exchange books they have already read.",
      "Borrow comic books from Mr. Chen.",
      "Read magazines for forty minutes.",
    ],
    answer: 1,
    explain:
      "公告說 Bring books that you have finished reading, and you can take home the same number of books：帶來**已讀完**的書，換回同樣數量的別人的書，所以是交換書。",
    difficulty: 1,
    nodeId: node("d-reading"),
  },
  {
    id: id("set-swap-2"),
    type: "single",
    context: SWAP_CONTEXT,
    stem: "Amy brings two books to the event. How many books can she take home?",
    choices: ["One.", "Two.", "Three.", "As many as she wants."],
    answer: 1,
    explain:
      "take home **the same number of** books：帶幾本來，就能帶幾本回去。Amy 帶兩本，所以是兩本。",
    difficulty: 2,
    nodeId: node("d-reading"),
  },
  {
    id: id("set-swap-3"),
    type: "tf",
    context: SWAP_CONTEXT,
    stem: "Everyone who joins the event will get a small card from Mr. Chen.",
    answer: false,
    explain:
      "只有 the student who brings the most books（帶最多書的同學）才會拿到小卡片，不是每個人都有。",
    difficulty: 2,
    nodeId: node("d-reading"),
  },

  // 素養題組：讀表格用比較級與最高級
  {
    id: id("set-class-1"),
    type: "single",
    context: CLASS_CONTEXT,
    stem: "Which sentence is TRUE?",
    choices: [
      "Ben is taller than David.",
      "Cathy is taller than Amy but shorter than Ben.",
      "Amy lives the farthest from school.",
      "David takes the most time to get to school.",
    ],
    answer: 1,
    explain:
      "Cathy 160 公分，比 Amy（158）高、比 Ben（165）矮，所以 B 正確。Ben 比 David（172）矮；Amy 通勤只要 10 分鐘，是最近的；花最多時間的是 Ben（25 分鐘）。",
    difficulty: 2,
    nodeId: node("g-compare"),
  },
  {
    id: id("set-class-2"),
    type: "cloze",
    context: CLASS_CONTEXT,
    stem: "Ben spends the ____ time getting to school among the four students.（填入一個字）",
    accept: ["most"],
    explain: "Ben 的 25 分鐘最長。many / much 的最高級是 **most**：the most time。",
    difficulty: 2,
    nodeId: node("g-compare"),
  },
  {
    id: id("set-class-3"),
    type: "numeric",
    context: CLASS_CONTEXT,
    stem: "David is ____ cm taller than Amy.（填入數字）",
    answer: 14,
    unit: "cm",
    explain: "David 172 公分、Amy 158 公分，172 − 158 = 14，所以 David 比 Amy 高 14 公分。",
    difficulty: 1,
    nodeId: node("g-compare"),
  },
];

export default questions;
