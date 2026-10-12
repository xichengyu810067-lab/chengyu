import type { Lesson } from "../../types";

const wordBuilderLab = () => import("../labs/WordBuilderLab");
const readingScene = () => import("../scenes/ReadingPassageScene");
const sjBase = () => import("../scenes/subjunctiveLayers").then((m) => ({ default: m.Base }));
const sjPresent = () =>
  import("../scenes/subjunctiveLayers").then((m) => ({ default: m.PresentUnreal }));
const sjPast = () => import("../scenes/subjunctiveLayers").then((m) => ({ default: m.PastUnreal }));
const sjFuture = () =>
  import("../scenes/subjunctiveLayers").then((m) => ({ default: m.FutureUnlikely }));
const sjMixed = () => import("../scenes/subjunctiveLayers").then((m) => ({ default: m.Mixed }));

const q = (s: string) => `english.senior.q-${s}`;
const n = (s: string) => `english.senior.${s}`;

const lessons: Lesson[] = [
  /* ───────────── 1. 構詞拆解 ───────────── */
  {
    id: n("word-formation"),
    title: "構詞拆解：字首、字根、字尾",
    grade: 10,
    minutes: 15,
    nodeIds: [n("vocab-prefix"), n("vocab-root"), n("vocab-suffix")],
    objectives: [
      "能說出常見字首、字根、字尾的意思",
      "能拆解長單字並推測字義",
      "能用字尾判斷與轉換詞性",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "構詞實驗室：組出真正的單字",
        prompt: "選一個字根，再搭配字首和字尾，看看能組出哪些英文單字。",
        load: wordBuilderLab,
        insight:
          "同一個字根可以長出一整個「字族」：port（運送）→ export、import、transport、portable、reporter。記住字根，等於一次記住好幾個字！",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：字根 ↔ 意思",
        prompt: "把右邊的意思拖到對應的字根旁邊。",
        pairs: [
          { id: "r1", left: "port", right: "拿、運送（portable 可攜帶的）" },
          { id: "r2", left: "dict", right: "說（predict 預測）" },
          { id: "r3", left: "spect", right: "看（inspect 檢查）" },
          { id: "r4", left: "ject", right: "丟、投擲（reject 拒絕）" },
          { id: "r5", left: "rupt", right: "破裂（interrupt 打斷）" },
          { id: "r6", left: "scrib / script", right: "寫（describe 描述）" },
        ],
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：字首 ↔ 意思",
        pairs: [
          ["pre-", "之前、預先"],
          ["re-", "再、回"],
          ["inter-", "在…之間"],
          ["trans-", "橫越、轉移"],
          ["mis-", "錯誤地"],
          ["un-", "不、相反"],
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：拆解高級單字",
        prompt: "先自己拆拆看、猜意思，再刮開對答案。按 🔊 聽發音。",
        cards: [
          {
            front: "unforgettable",
            back: "un（不）+ forget（忘記）+ able（可…的）→ **難忘的**\n\nOur graduation trip was unforgettable.",
            speak: "unforgettable",
          },
          {
            front: "international",
            back: "inter（之間）+ nation（國家）+ al（形容詞）→ **國際的**\n\nEnglish is an international language.",
            speak: "international",
          },
          {
            front: "independence",
            back: "in（不）+ depend（依賴）+ ence（名詞）→ **獨立**\n\nMoving out gave her a sense of independence.",
            speak: "independence",
          },
          {
            front: "misunderstand",
            back: "mis（錯誤地）+ understand（理解）→ **誤解**\n\nPlease don't misunderstand me.",
            speak: "misunderstand",
          },
          {
            front: "rearrange",
            back: "re（再）+ arrange（安排）→ **重新安排**\n\nLet's rearrange the desks for the group discussion.",
            speak: "rearrange",
          },
          {
            front: "environmentalist",
            back: "environment（環境）+ al（形容詞）+ ist（人）→ **環保人士**\n\nThe environmentalist spoke about plastic pollution.",
            speak: "environmentalist",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w1"), q("w2"), q("w3"), q("w4"), q("w5"), q("w6"), q("w7")],
      },
    ],
  },

  /* ───────────── 2. 名詞子句與關係副詞 ───────────── */
  {
    id: n("clauses"),
    title: "子句大集合：名詞子句與關係副詞",
    grade: 10,
    minutes: 12,
    nodeIds: [n("g-noun-clause"), n("g-rel-adverb")],
    objectives: [
      "能把直接問句改寫成間接問句（名詞子句）",
      "能分辨 that、whether / if、wh- 引導的名詞子句",
      "能依先行詞選用 where、when、why",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：直接問句 → 間接問句",
        problem: "把問句放進句子裡：**Where does Ms. Lin live?** → Do you know ...?",
        steps: [
          {
            show: "名詞子句要用**直述句語序**：疑問詞 + 主詞 + 動詞。",
            why: "它已經不是問句，而是句子裡的受詞。",
          },
          {
            show: "拿掉助動詞 does，動詞依主詞變化：does ... live → **lives**",
            predict: {
              question: "子句應該寫成？",
              choices: ["where does Ms. Lin live", "where Ms. Lin lives", "where Ms. Lin live"],
              answer: 1,
            },
          },
          { show: "完成：Do you know **where Ms. Lin lives**?" },
          {
            show: "Yes/No 問句則用 whether / if 引導：Is he coming? → I wonder **whether he is coming**.",
            why: "放在句首當主詞時只能用 whether：Whether he is coming is still unclear.",
          },
        ],
        takeaway:
          "名詞子句 = 引導詞（that / whether / if / wh-）+ **主詞 + 動詞**，不要再用疑問句的倒裝語序。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：用關係副詞合併句子",
        problem: "合併：**This is the house. My grandfather was born in the house.**",
        steps: [
          {
            show: "兩句共同的名詞：the house（先行詞）",
          },
          {
            show: "in the house 表示**地點** → 用關係副詞 **where**（= in which）",
            predict: {
              question: "要用哪一個？",
              choices: ["which", "where", "when"],
              answer: 1,
            },
          },
          { show: "This is the house **where my grandfather was born**." },
          {
            show: "也可以寫成：This is the house **in which** my grandfather was born.",
            why: "或保留介系詞在句尾：This is the house (that / which) my grandfather was born in.",
          },
        ],
        takeaway:
          "關係副詞 = 介系詞 + which：**where**（地點）、**when**（時間）、**why**（原因）。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分一分：where、when 還是 why？",
        prompt: "看先行詞，判斷空格要填哪個關係副詞。",
        buckets: [
          { id: "where", label: "where（地點）" },
          { id: "when", label: "when（時間）" },
          { id: "why", label: "why（原因）" },
        ],
        items: [
          { id: "i1", label: "the city ___ I was born", bucket: "where" },
          { id: "i2", label: "the restaurant ___ we had dinner", bucket: "where" },
          { id: "i3", label: "the year ___ the war ended", bucket: "when" },
          { id: "i4", label: "the moment ___ he saw her", bucket: "when" },
          { id: "i5", label: "the reason ___ she quit", bucket: "why" },
          { id: "i6", label: "the reason ___ prices went up", bucket: "why" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：名詞子句三兄弟",
        cards: [
          {
            front: "that 子句當主詞",
            back: "**That he passed the exam** surprised everyone.\n\n常改用虛主詞：It surprised everyone **that he passed the exam**.",
          },
          {
            front: "whether 和 if 的差別",
            back: "都表示「是否」，但**放句首當主詞**、緊接 **or not**、或放在介系詞後面時，只能用 **whether**。",
          },
          {
            front: "what 引導名詞子句",
            back: "what = the thing(s) that\n\n**What you said** is true.（你說的話是真的。）",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("n1"), q("n2"), q("n3"), q("n4"), q("n5"), q("n6")],
      },
    ],
  },

  /* ───────────── 3. 假設語氣 ───────────── */
  {
    id: n("subjunctive"),
    title: "假設語氣：如果時光可以倒流",
    grade: 11,
    minutes: 15,
    nodeIds: [n("g-subjunctive")],
    objectives: [
      "能分辨與現在、過去事實相反的假設語氣",
      "能把事實句改寫成假設語氣",
      "能使用 I wish、as if、It's time 等句型",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：假設語氣時間軸",
        prompt: "打開每個圖層，觀察假設的「時間」和動詞形式的關係：動詞都往**過去退一格**。",
        viewBox: "0 0 400 300",
        base: sjBase,
        layers: [
          {
            id: "present",
            label: "與現在事實相反",
            load: sjPresent,
            color: "#e11d48",
            on: true,
            note: "If + **過去式**（be 用 were），主要子句 would / could + **原形**。",
          },
          {
            id: "past",
            label: "與過去事實相反",
            load: sjPast,
            color: "#2563eb",
            note: "If + **had p.p.**，主要子句 would / could + **have p.p.**。",
          },
          {
            id: "future",
            label: "幾乎不可能的未來",
            load: sjFuture,
            color: "#7c3aed",
            note: "If + **were to V**（或 should + V），主要子句 would + 原形。",
          },
          {
            id: "mixed",
            label: "混合假設",
            load: sjMixed,
            color: "#d97706",
            note: "過去的條件影響現在的結果：If + **had p.p.**，主要子句 would + **原形** + now。",
          },
        ],
        check: {
          stem: "「If I had brought an umbrella, I wouldn't be wet now.」屬於哪一種？",
          choices: ["與現在事實相反", "與過去事實相反", "混合假設"],
          answer: 2,
          explain:
            "條件 had brought 是過去（剛才沒帶傘），結果 wouldn't be wet now 是現在 → **混合假設**。",
        },
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：事實 → 假設",
        problem:
          "把事實改寫成假設語氣：**I didn't have enough money, so I couldn't buy the concert ticket.**",
        steps: [
          {
            show: "判斷時間：didn't、couldn't → 這是**過去**的事實。",
            predict: {
              question: "這是哪個時間的事實？",
              choices: ["現在", "過去", "未來"],
              answer: 1,
            },
          },
          {
            show: "與過去事實相反 → if 子句用 **had + p.p.**：If I **had had** enough money,",
            why: "第一個 had 是助動詞，第二個 had 是 have 的過去分詞。",
            predict: {
              question: "if 子句應該是？",
              choices: [
                "If I had enough money",
                "If I had had enough money",
                "If I have had enough money",
              ],
              answer: 1,
            },
          },
          {
            show: "主要子句用 **could have + p.p.**：I **could have bought** the concert ticket.",
          },
          {
            show: "肯定、否定要和事實相反：事實「沒錢、買不到」→ 假設「有錢、買得到」。\n\n完成：If I had had enough money, I could have bought the concert ticket.",
          },
        ],
        takeaway: "改寫假設語氣三步驟：**判斷時間 → 動詞往過去退一格 → 肯定否定對調**。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分一分：是哪一種假設？",
        buckets: [
          { id: "present", label: "與現在事實相反" },
          { id: "past", label: "與過去事實相反" },
          { id: "mixed", label: "混合假設" },
        ],
        items: [
          {
            id: "i1",
            label: "If I were taller, I would join the basketball team.",
            bucket: "present",
          },
          { id: "i2", label: "If I knew her number, I would call her.", bucket: "present" },
          { id: "i3", label: "If it had not rained, we would have gone hiking.", bucket: "past" },
          { id: "i4", label: "If you had told me, I could have helped you.", bucket: "past" },
          {
            id: "i5",
            label: "If I had studied harder, I would be in college now.",
            bucket: "mixed",
          },
          {
            id: "i6",
            label: "If she had taken the job, she would live in Tokyo now.",
            bucket: "mixed",
          },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：假設語氣的好朋友",
        cards: [
          {
            front: "I wish（與現在相反）",
            back: "I wish I **were** taller.\n\n希望現在的情況不同 → 用過去式。",
            speak: "I wish I were taller.",
          },
          {
            front: "I wish（與過去相反）",
            back: "I wish I **had studied** harder.\n\n後悔過去的事 → 用 had p.p.。",
            speak: "I wish I had studied harder.",
          },
          {
            front: "as if",
            back: "He talks **as if** he **knew** everything.\n\n說得好像什麼都知道（其實不然）。",
            speak: "He talks as if he knew everything.",
          },
          {
            front: "It's high time ...",
            back: "It's high time we **left**.\n\n早就該走了 → 主詞後用過去式。",
            speak: "It's high time we left.",
          },
          {
            front: "省略 if 的倒裝",
            back: "**Had I known** the truth, I would have told you.\n\n= If I had known the truth, ...",
            speak: "Had I known the truth, I would have told you.",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s1"), q("s2"), q("s3"), q("s4"), q("s5"), q("s6")],
      },
    ],
  },

  /* ───────────── 4. 分詞構句、倒裝與強調句 ───────────── */
  {
    id: n("sentence-transform"),
    title: "句型變身術：分詞構句、倒裝與強調句",
    grade: 11,
    minutes: 15,
    nodeIds: [n("g-participle"), n("g-inversion"), n("g-cleft")],
    objectives: [
      "能把副詞子句化簡為分詞構句，並避免懸垂分詞",
      "能在否定副詞與 Only 片語放句首時正確倒裝",
      "能用 It is / was ... that ... 強調句子的某一部分",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：化簡為分詞構句",
        problem: "化簡：**When she heard the news, she burst into tears.**",
        steps: [
          {
            show: "確認兩個子句的主詞相同：she = she，才可以化簡。",
            predict: {
              question: "可以化簡為分詞構句的條件是？",
              choices: ["兩個子句主詞相同", "兩個子句時態不同", "句子裡要有 because"],
              answer: 0,
            },
          },
          {
            show: "刪去連接詞 When 與主詞 she。",
            why: "若想保留「當…時」的語意，也可以留下連接詞：When hearing the news, ...",
          },
          {
            show: "她「主動」聽到 → 動詞改成 V-ing：**Hearing the news**, she burst into tears.",
            predict: {
              question: "哪一個正確？",
              choices: ["Heard the news, ...", "Hearing the news, ...", "To hear the news, ..."],
              answer: 1,
            },
          },
          {
            show: "被動語意則用過去分詞：Because the book is written in simple English, it is easy to read. → **Written in simple English**, the book is easy to read.",
          },
        ],
        takeaway:
          "分詞構句：**主詞相同** → 刪連接詞與主詞 → 主動用 V-ing、被動用 p.p.。主詞不同不能直接化簡。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：否定副詞倒裝",
        problem: "強調「從未」：**I have never seen such a beautiful sunset.**",
        steps: [
          { show: "把否定副詞 **Never** 移到句首。" },
          {
            show: "句首是否定詞 → **助動詞移到主詞前面**：have I",
            predict: {
              question: "哪一個語序正確？",
              choices: ["Never I have seen", "Never have I seen", "Never did I have seen"],
              answer: 1,
            },
          },
          { show: "完成：**Never have I seen** such a beautiful sunset." },
          {
            show: "原句沒有助動詞時要借 do / does / did：He rarely complains. → **Rarely does he complain.**",
            why: "借了 does 之後，動詞要還原成原形 complain。",
          },
        ],
        takeaway:
          "Never、Seldom、Rarely、Hardly、Little、Not until ...、Only + 副詞片語放句首 → **助動詞 + 主詞**倒裝。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "句子重組：強調句",
        prompt: "排出強調「是我哥哥」打破窗戶的句子。",
        items: [
          { id: "c1", label: "It was" },
          { id: "c2", label: "my brother" },
          { id: "c3", label: "who" },
          { id: "c4", label: "broke" },
          { id: "c5", label: "the window" },
          { id: "c6", label: "yesterday." },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：倒裝句首的關鍵字",
        pairs: [
          ["Seldom", "很少"],
          ["Hardly", "幾乎不"],
          ["Not until", "直到…才"],
          ["Never", "從未"],
          ["Little", "一點也不（常接 know / realize）"],
          ["Only then", "只有在那時才"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [
          q("pc1"),
          q("pc2"),
          q("pc3"),
          q("iv1"),
          q("iv2"),
          q("iv3"),
          q("cf1"),
          q("cf2"),
        ],
      },
    ],
  },

  /* ───────────── 5. 閱讀策略與學測題型 ───────────── */
  {
    id: n("reading-exam"),
    title: "閱讀策略與學測題型",
    grade: 11,
    minutes: 15,
    nodeIds: [
      n("read-main"),
      n("read-inference"),
      n("read-reference"),
      n("read-context"),
      n("exam-reading"),
    ],
    objectives: [
      "認識學測英文各題型的考法",
      "能找出主題句、判斷指涉、從上下文猜字義",
      "能根據文本線索做合理推論",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "學測英文題型地圖",
        root: {
          id: "gsat",
          title: "學測英文",
          children: [
            {
              id: "mc",
              title: "選擇題",
              children: [
                { id: "vocab", title: "詞彙題", summary: "單句挖空，考字義與搭配詞。" },
                {
                  id: "cloze",
                  title: "綜合測驗",
                  summary: "短文挖空，考文法、轉折語與上下文邏輯。",
                },
                {
                  id: "fill",
                  title: "文意選填",
                  summary: "整篇文章多個空格、共用一組選項；先依詞性分組。",
                },
                {
                  id: "reading",
                  title: "閱讀測驗",
                  summary: "主旨、細節、推論、指涉、字義題。",
                },
              ],
            },
            {
              id: "mixed",
              title: "混合題",
              summary: "同一篇文章結合選擇與簡答，簡答要用文中的字詞並注意拼字。",
            },
            {
              id: "write",
              title: "非選擇題",
              children: [
                { id: "trans", title: "中譯英", summary: "先找句型，再拆解翻譯。" },
                { id: "essay", title: "英文作文", summary: "段落結構清楚，善用轉折語。" },
              ],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "熱區：拆解一篇短文",
        prompt: "點旁邊的熱點，看看閱讀策略怎麼用在這篇短文上，相關句子會以黃色標出。",
        viewBox: "0 0 480 320",
        scene: readingScene,
        spots: [
          {
            id: "topic",
            x: 36,
            y: 82,
            title: "主題句 Topic sentence",
            body: "第一句 **Bubble tea was born in Taiwan in the 1980s, and today it is enjoyed all over the world.** 點出全文主題：珍珠奶茶從臺灣紅到全世界。主旨題先找**主題句**，常在第一段的開頭或結尾。",
          },
          {
            id: "it",
            x: 36,
            y: 109,
            title: "指涉 Reference：it",
            body: "第二行的 **it** 指的是前面的 **bubble tea**。指涉題要往前找、並把答案代回去檢查語意是否通順。",
          },
          {
            id: "inference",
            x: 444,
            y: 136,
            title: "推論 Inference",
            body: "文中沒有直接說珍奶在倫敦、紐約「非常搶手、需求很大」，但 **people wait in long lines just to buy a cup** 這個線索，讓我們可以**推論**出這一點。",
          },
          {
            id: "appeal",
            x: 36,
            y: 163,
            title: "猜字義 Context clue：appeal",
            body: "不認識 **appeal**？冒號後面說明顧客可以自選甜度、冰塊和配料——這是它**吸引人的地方**，所以 appeal 是「吸引力」。",
          },
          {
            id: "however",
            x: 444,
            y: 190,
            title: "轉折語 However",
            body: "**However** 表示**對比**，語氣從優點轉向缺點：大多數飲料含糖量很高。轉折語後面常是作者想強調的重點。",
          },
          {
            id: "conclusion",
            x: 444,
            y: 244,
            title: "結論句 In short",
            body: "**In short**（簡而言之）帶出**結論句**，呼應主題句：小小一杯茶，已成為重要的文化輸出（cultural export）。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "分一分：這是哪一種閱讀題？",
        prompt: "看題目的問法，判斷它在考哪一種能力。",
        buckets: [
          { id: "main", label: "主旨題" },
          { id: "detail", label: "細節題" },
          { id: "infer", label: "推論題" },
          { id: "ref", label: "指涉題" },
        ],
        items: [
          { id: "q1", label: "What is the passage mainly about?", bucket: "main" },
          { id: "q2", label: "Which of the following is the best title?", bucket: "main" },
          {
            id: "q3",
            label: "According to the passage, when did the event start?",
            bucket: "detail",
          },
          { id: "q4", label: "Which of the following is NOT mentioned?", bucket: "detail" },
          { id: "q5", label: "What can be inferred from the passage?", bucket: "infer" },
          { id: "q6", label: "The author would most likely agree that ...", bucket: "infer" },
          { id: "q7", label: 'What does "it" in line 3 refer to?', bucket: "ref" },
          { id: "q8", label: 'In paragraph 2, "they" refers to ...', bucket: "ref" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "步驟拆解：推論題怎麼解？",
        problem:
          "短文：Mia checked the weather app three times before leaving. She packed an umbrella, put on her rain boots, and left home early because the buses are always crowded on such days.\n\n問題：What can be inferred about that day?",
        steps: [
          { show: "線索 1：**checked the weather app three times** → 她很在意當天的天氣。" },
          {
            show: "線索 2：**umbrella、rain boots** → 都和下雨有關。",
            predict: {
              question: "這些線索最可能指向？",
              choices: ["那天可能會下雨", "那天天氣晴朗", "Mia 要去游泳"],
              answer: 0,
            },
          },
          {
            show: "線索 3：**buses are always crowded on such days** → 在「這種日子」（下雨天）公車很擠，所以她提早出門。",
          },
          {
            show: "合理推論：**It was probably going to rain that day.**",
            why: "不要過度推論，例如「Mia 討厭搭公車」在文中沒有根據。",
          },
        ],
        takeaway:
          "推論 = **文中線索 + 合理常識**；正確選項一定找得到根據，不能過度延伸或和原文矛盾。",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("rd1"), q("rd2"), q("rd3"), q("rd4"), q("ex5")],
      },
    ],
  },

  /* ───────────── 6. 段落寫作與面試 ───────────── */
  {
    id: n("opinion-writing"),
    title: "表達觀點：段落寫作、翻譯與面試",
    grade: 12,
    minutes: 15,
    nodeIds: [
      n("write-paragraph"),
      n("write-transition"),
      n("write-translation"),
      n("b-interview"),
    ],
    objectives: [
      "能依功能使用轉折語",
      "能寫出主題句、支持句、結論句完整的段落",
      "能拆解中譯英的句型",
      "能在英文面試中用完整句子與具體例子回答",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "分一分：轉折語的功能",
        buckets: [
          { id: "add", label: "補充" },
          { id: "contrast", label: "對比" },
          { id: "cause", label: "因果" },
          { id: "example", label: "舉例" },
        ],
        items: [
          { id: "t1", label: "In addition", bucket: "add" },
          { id: "t2", label: "Moreover", bucket: "add" },
          { id: "t3", label: "However", bucket: "contrast" },
          { id: "t4", label: "On the other hand", bucket: "contrast" },
          { id: "t5", label: "Therefore", bucket: "cause" },
          { id: "t6", label: "As a result", bucket: "cause" },
          { id: "t7", label: "For example", bucket: "example" },
          { id: "t8", label: "For instance", bucket: "example" },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "排一排：組出完整段落",
        prompt: "依照「主題句 → 支持句 → 例子 → 結論句」排出段落，轉折語是最好的線索。",
        items: [
          {
            id: "p1",
            label: "Reading for pleasure is one of the best habits a teenager can develop.",
          },
          { id: "p2", label: "First, it helps students learn new words in a natural way." },
          {
            id: "p3",
            label: "In addition, a good story can reduce stress after a long day at school.",
          },
          {
            id: "p4",
            label:
              "For example, my cousin reads a few pages of a novel every night, and he says it helps him relax.",
          },
          {
            id: "p5",
            label: "Therefore, I believe every student should spend some time reading for fun.",
          },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：中譯英",
        problem: "翻譯：**我們越早開始存錢，就越有可能實現夢想。**",
        steps: [
          {
            show: "辨識句型：「越…就越…」→ **The + 比較級 ..., the + 比較級 ...**",
            predict: {
              question: "要用哪一個句型？",
              choices: [
                "so ... that ...",
                "The + 比較級 ..., the + 比較級 ...",
                "not only ... but also ...",
              ],
              answer: 1,
            },
          },
          {
            show: "前半句：我們越早開始存錢 → **The earlier we start saving money,**",
            why: "start 後面接 V-ing 或 to V 都可以。",
          },
          {
            show: "後半句：就越有可能實現夢想 → **the more likely we are to achieve our dreams.**",
            why: "be likely to V（可能…）；likely 的比較級是 more likely，要移到前面。",
          },
          {
            show: "檢查：一般事實用現在式；兩個半句用逗號分開；搭配詞 achieve / realize a dream。",
          },
        ],
        takeaway: "中譯英三步驟：**找句型 → 拆成小段翻譯 → 檢查時態、標點與搭配詞**。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "畫出段落架構",
        task: "以「What I Learned from a Failure」為題，畫出你的段落架構：中間寫主題句，旁邊連出 2–3 個支持句（各附一個例子），最後寫結論句，並標出每一步要用的轉折語。",
        background: "blank",
        hint: "可以用方框代表句子、箭頭表示順序；轉折語用不同顏色標記，例如 First、In addition、For example、Therefore。",
        reference:
          "架構範例：\n\n- 主題句：Failing my first speech contest taught me the value of preparation.\n- 支持句 1（First）：I realized I had not practiced enough.\n- 支持句 2（In addition）：I learned to ask my teacher for feedback.\n- 例子（For example）：I practiced in front of my family every night before the next contest.\n- 結論句（Therefore）：Failure can be a great teacher if we learn from it.",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：大學申請面試",
        scenarioId: "english.senior.s-interview",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("ex1"), q("ex2"), q("ex3"), q("ex4"), q("ex6"), q("ex7")],
      },
    ],
  },
];

export default lessons;
