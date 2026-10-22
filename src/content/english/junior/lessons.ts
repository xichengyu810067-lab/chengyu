import type { Lesson, Params } from "../../types";

const classroomScene = () => import("../scenes/ClassroomScene");
const townMap = () => import("../scenes/TownMapScene");
const tlBase = () => import("../scenes/tenseLayers").then((m) => ({ default: m.Base }));
const tlPast = () => import("../scenes/tenseLayers").then((m) => ({ default: m.Past }));
const tlProg = () => import("../scenes/tenseLayers").then((m) => ({ default: m.Progressive }));
const tlFuture = () => import("../scenes/tenseLayers").then((m) => ({ default: m.Future }));
const tlPerfect = () => import("../scenes/tenseLayers").then((m) => ({ default: m.Perfect }));

const q = (s: string) => `english.junior.q-${s}`;
const n = (s: string) => `english.junior.${s}`;

/* 時態時光機拉桿：t = 動作發生在今天的前後幾天，p = 0 簡單式、1 進行式 */
const TIME_WORDS: Record<string, string> = {
  "-3": "three days ago",
  "-2": "the day before yesterday",
  "-1": "yesterday",
  "0": "now / every day",
  "1": "tomorrow",
  "2": "the day after tomorrow",
  "3": "in three days",
};
const timeWord = (t: number) => TIME_WORDS[String(t)] ?? "—";
function tenseName(p: Params): string {
  const prog = p.p >= 1;
  if (p.t < 0) return prog ? "過去進行式" : "過去簡單式";
  if (p.t > 0) return prog ? "未來進行式（高中會再深入）" : "未來式";
  return prog ? "現在進行式" : "現在簡單式（習慣）";
}
function tenseSentence(p: Params): string {
  const prog = p.p >= 1;
  const w = timeWord(p.t);
  if (p.t < 0)
    return prog ? `I was playing basketball at 3 p.m. ${w}.` : `I played basketball ${w}.`;
  if (p.t > 0)
    return prog ? `I will be playing basketball at 3 p.m. ${w}.` : `I will play basketball ${w}.`;
  return prog ? "I am playing basketball now." : "I play basketball every day.";
}

const lessons: Lesson[] = [
  /* ───────────── 1. 教室單字 ───────────── */
  {
    id: n("classroom-vocab"),
    title: "教室單字大搜查",
    grade: 7,
    minutes: 12,
    nodeIds: [n("vocab-daily"), n("vocab-wordclass")],
    objectives: [
      "能聽、說、讀出教室與校園生活的常用單字",
      "能分辨可數名詞與不可數名詞",
      "能正確使用 a / an 與複數形",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        mode: "find",
        title: "教室大搜查：找到英文單字指的東西",
        prompt: "看提示的英文單字，在教室裡點出正確的位置。找到後會出現中文意思和例句。",
        viewBox: "0 0 400 300",
        scene: classroomScene,
        spots: [
          {
            id: "blackboard",
            x: 206,
            y: 98,
            title: "blackboard",
            body: "**blackboard** 黑板\n\nThe teacher writes on the blackboard.",
          },
          {
            id: "clock",
            x: 342,
            y: 55,
            title: "clock",
            body: "**clock** 時鐘（掛在牆上；戴在手上的錶是 watch）\n\nWhat time is it? Look at the clock.",
          },
          {
            id: "window",
            x: 56,
            y: 96,
            title: "window",
            body: "**window** 窗戶\n\nIt's hot. Please open the window.",
          },
          {
            id: "door",
            x: 357,
            y: 200,
            title: "door",
            body: "**door** 門\n\nPlease close the door when you leave.",
          },
          {
            id: "bookshelf",
            x: 46,
            y: 186,
            title: "bookshelf",
            body: "**bookshelf** 書架（複數 bookshelves）\n\nThe dictionaries are on the bookshelf.",
          },
          {
            id: "desk",
            x: 210,
            y: 186,
            title: "desk",
            body: "**desk** 書桌\n\nThere is a notebook on the desk.",
          },
          {
            id: "chair",
            x: 292,
            y: 210,
            title: "chair",
            body: "**chair** 椅子\n\nPlease sit on the chair.",
          },
          {
            id: "backpack",
            x: 124,
            y: 240,
            title: "backpack",
            body: "**backpack** 背包\n\nMy backpack is heavy because I have five books in it.",
          },
        ],
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：文具與學校單字",
        prompt: "先按 🔊 聽發音、自己唸一次，再刮開看意思和例句。",
        cards: [
          {
            front: "eraser",
            back: "橡皮擦\n\nCan I borrow your eraser?",
            speak: "eraser",
          },
          {
            front: "notebook",
            back: "筆記本\n\nPlease open your notebook.",
            speak: "notebook",
          },
          {
            front: "ruler",
            back: "尺\n\nI need a ruler to draw a straight line.",
            speak: "ruler",
          },
          {
            front: "pencil case",
            back: "鉛筆盒\n\nMy pencil case is under the desk.",
            speak: "pencil case",
          },
          {
            front: "scissors",
            back: "剪刀（永遠用複數形）\n\nThese scissors are very sharp.",
            speak: "scissors",
          },
          {
            front: "homework",
            back: "回家作業（不可數名詞）\n\nI have a lot of homework today.",
            speak: "homework",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分一分：可數還是不可數？",
        prompt: "可數名詞可以說 a / an 和加 -s；不可數名詞不行。把卡片拖到正確的籃子裡。",
        buckets: [
          { id: "count", label: "可數名詞（a / an、可加 -s）" },
          { id: "uncount", label: "不可數名詞" },
        ],
        items: [
          { id: "apple", label: "apple", bucket: "count" },
          { id: "chair", label: "chair", bucket: "count" },
          { id: "pencil", label: "pencil", bucket: "count" },
          { id: "egg", label: "egg", bucket: "count" },
          { id: "water", label: "water", bucket: "uncount" },
          { id: "bread", label: "bread", bucket: "uncount" },
          { id: "homework", label: "homework", bucket: "uncount" },
          { id: "money", label: "money", bucket: "uncount" },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：校園生活單字",
        prompt: "翻開兩張牌，把英文單字和中文意思配成一對。",
        pairs: [
          ["library", "圖書館"],
          ["playground", "操場"],
          ["classmate", "同學"],
          ["subject", "科目"],
          ["uniform", "制服"],
          ["principal", "校長"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("v1"), q("v2"), q("v3"), q("v4"), q("v5"), q("v6")],
      },
    ],
  },

  /* ───────────── 2. 點餐與問路 ───────────── */
  {
    id: n("daily-talk"),
    title: "開口說英文：點餐與問路",
    grade: 7,
    minutes: 15,
    nodeIds: [n("b-order"), n("b-direction"), n("b-preference")],
    objectives: [
      "能用 I'd like ..., please. 有禮貌地點餐並詢問價格",
      "能看地圖問路、指路，並用介系詞描述位置",
      "能在情境對話中用完整句子回應",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：生活必備句",
        prompt: "看中文想想英文怎麼說，再刮開對答案，按 🔊 跟著唸。",
        cards: [
          {
            front: "點餐：「我想要一個漢堡。」",
            back: "**I'd like a hamburger, please.**\n\nI'd like = I would like，比 I want 更有禮貌。",
            speak: "I'd like a hamburger, please.",
          },
          {
            front: "問價錢：「這個多少錢？」",
            back: "**How much is it?**\n\n問很多個東西時說 How much are they?",
            speak: "How much is it?",
          },
          {
            front: "問路：「請問車站在哪裡？」",
            back: "**Excuse me. Where is the train station?**\n\n問陌生人之前先說 Excuse me.",
            speak: "Excuse me. Where is the train station?",
          },
          {
            front: "指路：「直走，然後在第二個路口右轉。」",
            back: "**Go straight and turn right at the second intersection.**",
            speak: "Go straight and turn right at the second intersection.",
          },
          {
            front: "打電話：「我可以和 Kevin 說話嗎？」",
            back: "**May I speak to Kevin, please?**\n\n接電話的人可以說 Hold on, please.（請稍等）",
            speak: "May I speak to Kevin, please?",
          },
          {
            front: "表達喜好：「我很喜歡打籃球。」",
            back: "**I really like playing basketball.**\n\nlike / love / enjoy 後面可以接 V-ing。",
            speak: "I really like playing basketball.",
          },
        ],
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "小鎮地圖：問路與位置介系詞",
        prompt:
          "地圖上方是北方。點每個熱點，學習描述位置和指路的說法；點「直走」「右轉」看看路線。",
        viewBox: "0 0 400 300",
        scene: townMap,
        spots: [
          {
            id: "go",
            x: 125,
            y: 212,
            title: "Go straight. 直走",
            body: "**Go straight along First Avenue.**\n\n從星號（You are here）出發，面向北方（地圖上方）沿著 First Avenue 往前走。",
          },
          {
            id: "turn",
            x: 125,
            y: 135,
            title: "Turn right. 右轉",
            body: "**Turn right onto Main Street.**\n\n左轉、右轉要以**走路的人面對的方向**來判斷：面向北方時，右手邊是東方。",
          },
          {
            id: "hospital",
            x: 344,
            y: 58,
            title: "It's on your left. 在你的左手邊",
            body: "**Walk one block. The hospital is on your left.**\n\n沿著 Main Street 往東走一個街區、過了 Second Avenue，醫院就在左手邊。它在 Main Street 和 Second Avenue 的轉角：**on the corner of** Main Street and Second Avenue。",
          },
          {
            id: "next",
            x: 202,
            y: 79,
            title: "next to 在…旁邊",
            body: "**The bank is next to the post office.**\n\n銀行在郵局旁邊。注意 next 後面一定要加 to。",
          },
          {
            id: "across",
            x: 196,
            y: 196,
            title: "across from 在…對面",
            body: "**The park is across from the bank.**\n\n公園在銀行的對面，中間隔著 Main Street。",
          },
          {
            id: "between",
            x: 312,
            y: 218,
            title: "between 在…之間",
            body: "**The bakery is between the bookstore and the supermarket.**\n\n麵包店在書店和超市之間：between A **and** B。",
          },
          {
            id: "corner",
            x: 92,
            y: 102,
            title: "on the corner of 在…的轉角",
            body: "**The school is on the corner of Main Street and First Avenue.**\n\n學校位在兩條路交叉的轉角。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排一排：速食店點餐對話",
        prompt: "把對話依照正確的順序排好（Clerk = 店員，You = 你）。",
        items: [
          { id: "d1", label: "Clerk: Hi! What can I get for you?" },
          { id: "d2", label: "You: I'd like a cheeseburger and fries, please." },
          { id: "d3", label: "Clerk: Anything to drink?" },
          { id: "d4", label: "You: A medium iced tea, please." },
          { id: "d5", label: "Clerk: For here or to go?" },
          { id: "d6", label: "You: To go, please. How much is it?" },
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：在美式餐廳點餐",
        scenarioId: "english.junior.s-restaurant",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c3"), q("c5"), q("c7"), q("c8")],
      },
    ],
  },

  /* ───────────── 3. 時態時光機 ───────────── */
  {
    id: n("tense-timeline"),
    title: "時態時光機：過去、現在、未來",
    grade: 8,
    minutes: 15,
    nodeIds: [n("g-present"), n("g-progressive"), n("g-past"), n("g-future"), n("g-perfect")],
    objectives: [
      "能在時間軸上分辨過去式、進行式、未來式與現在完成式",
      "能依時間詞選出正確時態",
      "能把同一個句子改寫成不同時態",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：時態時間軸",
        prompt: "逐一打開圖層，看看每種時態的動作落在時間軸的哪裡。",
        viewBox: "0 0 400 300",
        base: tlBase,
        layers: [
          {
            id: "past",
            label: "過去簡單式",
            load: tlPast,
            color: "#2563eb",
            on: true,
            note: "動作在過去某個時間點發生並結束：I **played** tennis yesterday.",
          },
          {
            id: "prog",
            label: "現在進行式",
            load: tlProg,
            color: "#e11d48",
            note: "動作此刻正在進行：I **am playing** tennis now.",
          },
          {
            id: "future",
            label: "未來式",
            load: tlFuture,
            color: "#059669",
            note: "動作將在未來發生：I **will play** tennis tomorrow.",
          },
          {
            id: "perfect",
            label: "現在完成式",
            load: tlPerfect,
            color: "#d97706",
            note: "從過去一直延續到現在：I **have played** tennis since 2020.",
          },
        ],
        check: {
          stem: "「I have lived in Kaohsiung for ten years.」在時間軸上應該怎麼畫？",
          choices: ["過去的一個點", "從過去延伸到現在的箭頭", "未來的一個點"],
          answer: 1,
          explain:
            "現在完成式 + for ten years：從十年前一直住到現在，所以是一支從過去延伸到「現在」的箭頭。",
        },
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：時態時光機",
        prompt:
          "拉動「哪一天」決定動作發生的時間，再用「動作狀態」切換簡單式（0）或進行式（1），看看句子怎麼變。",
        params: [
          {
            key: "t",
            label: "哪一天（負數 = 過去，正數 = 未來）",
            min: -3,
            max: 3,
            step: 1,
            init: 0,
          },
          { key: "p", label: "動作狀態（0 簡單式、1 進行式）", min: 0, max: 1, step: 1, init: 0 },
        ],
        plot: {
          x: [-3.5, 3.5],
          y: [-1, 1],
          xLabel: "天數（0 = 今天）",
          vlines: (p) => [
            { x: 0, label: "now", color: "#64748b" },
            { x: p.t, label: "動作", color: "#e11d48" },
          ],
          points: (p) => [{ x: p.t, y: 0, label: timeWord(p.t), color: "#2563eb" }],
        },
        readouts: [
          { label: "時間詞", value: (p) => timeWord(p.t) },
          { label: "時態", value: (p) => tenseName(p) },
          { label: "句子", value: (p) => tenseSentence(p) },
        ],
        goal: {
          text: "讓句子變成**過去進行式**，描述「前天（the day before yesterday）下午三點，我正在打籃球」。",
          test: (p) => p.t === -2 && p.p === 1,
        },
        insight:
          "過去進行式 = **was / were + V-ing**，描述過去某個時間點「正在做」的事：I **was playing** basketball at 3 p.m. the day before yesterday.",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "時間詞分類：看到它就想到哪個時態？",
        buckets: [
          { id: "past", label: "過去簡單式" },
          { id: "prog", label: "現在進行式" },
          { id: "future", label: "未來式" },
          { id: "perfect", label: "現在完成式" },
        ],
        items: [
          { id: "w1", label: "yesterday", bucket: "past" },
          { id: "w2", label: "last summer", bucket: "past" },
          { id: "w3", label: "two days ago", bucket: "past" },
          { id: "w4", label: "now", bucket: "prog" },
          { id: "w5", label: "Look!", bucket: "prog" },
          { id: "w6", label: "at the moment", bucket: "prog" },
          { id: "w7", label: "tomorrow", bucket: "future" },
          { id: "w8", label: "next week", bucket: "future" },
          { id: "w9", label: "already", bucket: "perfect" },
          { id: "w10", label: "since 2020", bucket: "perfect" },
          { id: "w11", label: "for three years", bucket: "perfect" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：一句話變四種時態",
        problem: "依照時間詞，改寫句子：**I eat breakfast at seven.**",
        steps: [
          {
            show: "加上 **yesterday** → I **ate** breakfast at seven yesterday.",
            why: "yesterday 是過去時間 → 過去簡單式；eat 是不規則動詞，過去式是 ate。",
            predict: {
              question: "eat 的過去式是？",
              choices: ["eated", "ate", "eaten"],
              answer: 1,
            },
          },
          {
            show: "加上 **now** → I **am eating** breakfast now.",
            why: "此刻正在做 → 現在進行式 be + V-ing。",
            predict: {
              question: "哪一句正確？",
              choices: [
                "I eat breakfast now.",
                "I eating breakfast now.",
                "I am eating breakfast now.",
              ],
              answer: 2,
            },
          },
          {
            show: "加上 **tomorrow** → I **will eat** breakfast at seven tomorrow.",
            why: "未來 → will + 原形動詞（也可以說 I am going to eat ...）。",
          },
          {
            show: "加上 **already** → I **have already eaten** breakfast.",
            why: "already 強調「已經完成」→ 現在完成式 have / has + 過去分詞。注意：現在完成式不和 at seven yesterday 這種明確的過去時間連用，所以把 at seven 拿掉。",
            predict: {
              question: "eat 的過去分詞是？",
              choices: ["ate", "eaten", "eating"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "先看**時間詞**判斷時態，再決定動詞形式：過去 → 過去式；正在 → be + V-ing；未來 → will + 原形；已經、從…以來 → have / has + 過去分詞。",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("t1"), q("t2"), q("t3"), q("t4"), q("t5"), q("t8"), q("t9")],
      },
    ],
  },

  /* ───────────── 4. 比較級與最高級 ───────────── */
  {
    id: n("comparison"),
    title: "比一比：比較級與最高級",
    grade: 8,
    minutes: 12,
    nodeIds: [n("g-compare")],
    objectives: [
      "能依形容詞長短寫出比較級與最高級",
      "熟記常見的不規則變化",
      "能用比較級、最高級與 as ... as 描述生活中的事物",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "match",
        title: "配對：原級 ↔ 比較級",
        prompt: "把右邊的比較級拖到對應的形容詞旁邊。",
        pairs: [
          { id: "c1", left: "tall", right: "taller" },
          { id: "c2", left: "big", right: "bigger" },
          { id: "c3", left: "happy", right: "happier" },
          { id: "c4", left: "beautiful", right: "more beautiful" },
          { id: "c5", left: "good", right: "better" },
          { id: "c6", left: "bad", right: "worse" },
        ],
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：不規則變化要背熟",
        prompt: "說出比較級和最高級後再刮開，按 🔊 跟著唸三遍。",
        cards: [
          {
            front: "good / well",
            back: "**better → best**\n\nThis is the best day ever!",
            speak: "good, better, best",
          },
          {
            front: "bad",
            back: "**worse → worst**\n\nToday's weather is worse than yesterday's.",
            speak: "bad, worse, worst",
          },
          {
            front: "many / much",
            back: "**more → most**\n\nWho has the most books in our class?",
            speak: "many, more, most",
          },
          {
            front: "little（少量的）",
            back: "**less → least**\n\nI spend less time on games now.",
            speak: "little, less, least",
          },
          {
            front: "far（距離遠）",
            back: "**farther → farthest**\n\nKenting is farther from Taipei than Taichung is.",
            speak: "far, farther, farthest",
          },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：玉山和富士山誰比較高？",
        problem: "玉山約 3,952 公尺，富士山約 3,776 公尺。用英文比一比！",
        steps: [
          {
            show: "比較**兩個**東西 → 用**比較級**。",
            predict: {
              question: "比較兩座山，要用哪一種形式？",
              choices: ["原級", "比較級", "最高級"],
              answer: 1,
            },
          },
          {
            show: "high 是單音節形容詞 → 加 -er：**higher**",
            why: "長的形容詞（如 beautiful）才在前面加 more。",
          },
          {
            show: "比較級後面接 **than**：Mount Jade is **higher than** Mount Fuji.",
            predict: {
              question: "哪一句正確？",
              choices: [
                "Mount Jade is more high than Mount Fuji.",
                "Mount Jade is higher than Mount Fuji.",
                "Mount Jade is highest than Mount Fuji.",
              ],
              answer: 1,
            },
          },
          {
            show: "在某個範圍內「最…」→ 最高級：Mount Jade is **the highest** mountain in Taiwan.",
            why: "最高級前面通常加 the，後面常接 in + 地方，或 of + 一群人／物。",
          },
        ],
        takeaway:
          "兩者比較：**比較級 + than**；三者以上：**the + 最高級**；一樣：**as + 原級 + as**。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：比一比造句",
        task: "畫出三個大小或高矮不同的東西（例如三隻動物或三棟建築），標上英文名字，再寫一句**比較級**和一句**最高級**的英文句子。",
        background: "grid",
        hint: "例如畫 cat、dog、elephant，再寫：The dog is bigger than the cat.",
        reference:
          "範例：The dog is bigger than the cat. The elephant is the biggest of the three animals.\n\n檢查：比較級有沒有 than？最高級前面有沒有 the？big 要重複 g 再加 -er / -est。",
        aiFeedback: true,
      },
      {
        id: "a-set",
        kind: "set",
        title: "素養題組：讀表格用比較級與最高級",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-class-1"), q("set-class-2"), q("set-class-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m3"), q("m4"), q("m5")],
      },
    ],
  },

  /* ───────────── 5. 被動語態、關係子句、不定詞與動名詞 ───────────── */
  {
    id: n("passive-relative"),
    title: "句型進階：被動語態與關係子句",
    grade: 9,
    minutes: 15,
    nodeIds: [n("g-passive"), n("g-relative"), n("g-inf-ger")],
    objectives: [
      "能把主動句改寫成被動句",
      "能用 who、which、that 合併兩個句子",
      "能分辨動詞後面接不定詞或動名詞",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：主動句變被動句",
        problem: "把主動句改成被動句：**Many students use this app.**",
        steps: [
          {
            show: "找出受詞 **this app**，它要變成被動句的主詞。",
            predict: {
              question: "被動句的主詞應該是？",
              choices: ["Many students", "this app", "use"],
              answer: 1,
            },
          },
          {
            show: "決定 be 動詞：主詞 this app 是單數、原句是現在式 → **is**",
            predict: {
              question: "要用哪個 be 動詞？",
              choices: ["is", "are", "was"],
              answer: 0,
            },
          },
          { show: "動詞改成過去分詞：use → **used**" },
          {
            show: "原本的主詞放到 by 後面：**This app is used by many students.**",
            why: "如果動作者不重要或不清楚，by 片語可以省略，例如 English is spoken in many countries.",
          },
        ],
        takeaway:
          "被動語態：**主詞 + be 動詞 + 過去分詞（+ by 動作者）**；be 動詞要配合主詞與時態。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：用關係代名詞合併句子",
        problem: "合併成一句：**I have a friend. She can speak Japanese.**",
        steps: [
          {
            show: "找出兩句中指同一個人的字：**a friend** ＝ **She**",
            predict: {
              question: "She 指的是誰？",
              choices: ["I", "a friend", "Japanese"],
              answer: 1,
            },
          },
          {
            show: "先行詞是「人」→ 用 **who**（或 that）代替 She。",
            predict: {
              question: "要用哪個關係代名詞？",
              choices: ["which", "where", "who"],
              answer: 2,
            },
          },
          {
            show: "關係子句緊跟在先行詞後面：I have a friend **who can speak Japanese**.",
            why: "who 已經代替了 She，所以不能再寫 who she can speak。",
          },
        ],
        takeaway:
          "人用 **who**、事物用 **which**，兩者都可以用 **that**；關係子句要緊跟在它修飾的名詞後面。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "句子重組：關係子句",
        prompt: "把字詞排成正確的句子：「我昨天買的那本書非常有趣。」",
        items: [
          { id: "s1", label: "The book" },
          { id: "s2", label: "that" },
          { id: "s3", label: "I bought" },
          { id: "s4", label: "yesterday" },
          { id: "s5", label: "is" },
          { id: "s6", label: "very interesting." },
        ],
      },
      {
        id: "a4",
        kind: "drag",
        mode: "categorize",
        title: "分一分：後面接 to V 還是 V-ing？",
        buckets: [
          { id: "inf", label: "+ to V（不定詞）" },
          { id: "ger", label: "+ V-ing（動名詞）" },
        ],
        items: [
          { id: "want", label: "want", bucket: "inf" },
          { id: "decide", label: "decide", bucket: "inf" },
          { id: "hope", label: "hope", bucket: "inf" },
          { id: "plan", label: "plan", bucket: "inf" },
          { id: "enjoy", label: "enjoy", bucket: "ger" },
          { id: "finish", label: "finish", bucket: "ger" },
          { id: "practice", label: "practice", bucket: "ger" },
          { id: "mind", label: "mind", bucket: "ger" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p2"), q("p3"), q("p4"), q("p5"), q("p6"), q("p7"), q("p8")],
      },
    ],
  },

  /* ───────────── 6. 節慶文化與閱讀 ───────────── */
  {
    id: n("festivals-reading"),
    title: "節慶文化與閱讀理解",
    grade: 9,
    minutes: 15,
    nodeIds: [n("c-festival"), n("d-reading"), n("d-writing")],
    objectives: [
      "能用英文說出臺灣與西方重要節日的習俗",
      "能讀懂介紹節慶的短文，找出主旨與細節",
      "能寫一張英文節日卡片",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "節慶心智圖",
        root: {
          id: "fest",
          title: "Festivals 節慶",
          children: [
            {
              id: "tw",
              title: "臺灣的節日",
              children: [
                {
                  id: "lny",
                  title: "Lunar New Year 農曆新年",
                  summary: "大掃除、除夕團圓飯（family reunion dinner）、紅包（red envelopes）。",
                },
                {
                  id: "dbf",
                  title: "Dragon Boat Festival 端午節",
                  summary: "吃粽子（rice dumplings／zongzi）、划龍舟（dragon boat races）。",
                },
                {
                  id: "maf",
                  title: "Mid-Autumn Festival 中秋節",
                  summary: "吃月餅（mooncakes）、賞月，很多家庭會烤肉。",
                },
              ],
            },
            {
              id: "west",
              title: "西方的節日",
              children: [
                {
                  id: "hw",
                  title: "Halloween 萬聖節",
                  summary: "10 月 31 日，變裝、雕南瓜燈（jack-o'-lantern），說 Trick or treat!",
                },
                {
                  id: "tg",
                  title: "Thanksgiving 感恩節",
                  summary: "美國在 11 月第四個星期四，家人團聚吃烤火雞，感謝一年的收穫。",
                },
                {
                  id: "xmas",
                  title: "Christmas 聖誕節",
                  summary: "12 月 25 日，裝飾聖誕樹、交換禮物，說 Merry Christmas!",
                },
              ],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "read",
        title: "短文閱讀：Lunar New Year in Taiwan",
        body: "**Lunar New Year in Taiwan**\n\nLunar New Year is the most important holiday in Taiwan. Before the holiday, families clean their homes to sweep away bad luck. On New Year's Eve, family members get together for a big dinner. Children are very happy because they get red envelopes with money inside. Many people stay up late that night. During the holiday, people visit their relatives and say \"Happy New Year!\" to everyone they meet.\n\n閱讀提示：\n\n- 第一句就是**主旨句**：農曆新年是臺灣最重要的節日。\n- 接下來依時間順序說明：節日前（before）→ 除夕（on New Year's Eve）→ 假期中（during）。\n- 生字：sweep away 掃除、relatives 親戚、stay up late 熬夜（守歲）。",
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：節日與習俗",
        pairs: [
          ["Halloween", "Trick or treat!"],
          ["Thanksgiving", "roast turkey"],
          ["Christmas", "Christmas tree and gifts"],
          ["Lunar New Year", "red envelopes"],
          ["Dragon Boat Festival", "dragon boat races"],
          ["Mid-Autumn Festival", "mooncakes"],
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手做：英文節日卡片",
        task: "選一個你喜歡的節日，畫一張卡片：畫上圖案，並用英文寫出稱呼、一兩句祝福和署名。",
        background: "blank",
        hint: "格式：Dear ___, → 祝福（Happy Mid-Autumn Festival! / Merry Christmas!）→ Love, ___",
        reference:
          "範例：\nDear Grandma,\nHappy Mid-Autumn Festival! I hope you enjoy the mooncakes and the full moon tonight.\nLove,\nAmy",
        aiFeedback: true,
      },
      {
        id: "a-set",
        kind: "set",
        title: "素養題組：讀公告回答問題",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-swap-1"), q("set-swap-2"), q("set-swap-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("r1"), q("r2"), q("r3"), q("r4"), q("r5"), q("r6")],
      },
    ],
  },
];

export default lessons;
