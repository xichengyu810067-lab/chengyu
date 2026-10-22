import type { Question } from "../../types";

const id = (s: string) => `english.senior.q-${s}`;
const node = (s: string) => `english.senior.${s}`;

const QUIET_CONTEXT = `Read the passage (a made-up story) and answer the questions.

Last year, the small seaside town of Brightwater began "Quiet Sunday." On the first Sunday of each month, cars are not allowed in the town center from 9 a.m. to 3 p.m. At first, many shop owners worried that business would suffer. However, the opposite happened. Without noisy traffic, more families walked to the center, sat outside cafés, and stayed for hours. One baker said, "People used to rush past my window. Now they stop and smell the bread." Some residents still complain that it is hard to reach the center, but most agree that the town feels friendlier.`;

const LEO_CONTEXT = `Read Leo's message to his friend.

I missed the last train because I stayed at school to chat. Now I'm stuck at the station. If I had left ten minutes earlier, I would have caught it. I wish I had checked the timetable! But I'm not too sad—the waiting room is warm, and I'm reading a good book.`;

const questions: Question[] = [
  // ── 字彙與構詞 ──
  {
    id: id("w1"),
    type: "single",
    stem: "The prefix **pre-** in *preview* and *predict* means ____.",
    choices: ["再一次", "之前、預先", "相反", "在…之間"],
    answer: 1,
    explain:
      "**pre-** = before（之前、預先）：preview 預習、predict 預測（pre 之前 + dict 說）、prepare 準備。",
    difficulty: 1,
    nodeId: node("vocab-prefix"),
  },
  {
    id: id("w2"),
    type: "single",
    stem: "The root **spect** in *inspect* and *spectator* means ____.",
    choices: ["說", "拿、運送", "看", "寫"],
    answer: 2,
    explain:
      "**spect** = look（看）：inspect 檢查（往裡面看）、spectator 觀眾（看的人）、respect 尊敬。",
    difficulty: 1,
    nodeId: node("vocab-root"),
  },
  {
    id: id("w3"),
    type: "cloze",
    stem: "Scientists use data to ____ the weather.（提示：pre + dict）",
    accept: ["predict"],
    explain: "pre（之前）+ dict（說）= **predict** 預測：事先說出會發生什麼。",
    difficulty: 1,
    nodeId: node("vocab-root"),
  },
  {
    id: id("w4"),
    type: "multi",
    stem: "下列哪些字的 **dis-** 表示「否定、相反」？（複選）",
    choices: ["dislike", "dishonest", "disagree", "discuss"],
    answer: [0, 1, 2],
    explain:
      "dislike（不喜歡）、dishonest（不誠實的）、disagree（不同意）的 dis- 都表示否定。discuss（討論）是一個完整的字，它的 dis- 不是「否定」，不能拆成 dis + cuss。",
    difficulty: 2,
    nodeId: node("vocab-prefix"),
  },
  {
    id: id("w5"),
    type: "single",
    stem: 'Which word means "a person who is employed（受僱的人）"?',
    choices: ["employer", "employee", "employment", "employable"],
    answer: 1,
    explain:
      "字尾 **-ee** 表示「被…的人」：employee 員工；**-er** 表示「做…的人」：employer 雇主；-ment 是名詞（employment 僱用），-able 是形容詞。",
    difficulty: 2,
    nodeId: node("vocab-suffix"),
  },
  {
    id: id("w6"),
    type: "single",
    stem: "*unbelievable* = un + believe + able，它的意思是？",
    choices: ["可相信的", "相信的人", "難以置信的", "不相信"],
    answer: 2,
    explain: "un（不）+ believe（相信）+ able（可…的）→ 無法相信的、**難以置信的**。",
    difficulty: 1,
    nodeId: node("vocab-suffix"),
  },
  {
    id: id("w7"),
    type: "tf",
    stem: "字尾 -less 表示「沒有…的」，例如 careless、homeless。",
    answer: true,
    explain:
      "**-less** = without：careless 粗心的（沒有小心）、homeless 無家可歸的、useless 沒用的。",
    difficulty: 1,
    nodeId: node("vocab-suffix"),
  },
  {
    id: id("w8"),
    type: "single",
    stem: "The new policy had a huge ____ on small businesses; many of them had to close.",
    choices: ["instinct", "impact", "incident", "interval"],
    answer: 1,
    explain:
      "**have an impact on** 對…有影響，是常考搭配詞。instinct 本能、incident 事件、interval 間隔，都不合句意。",
    difficulty: 2,
    nodeId: node("vocab-collocation"),
  },
  {
    id: id("w9"),
    type: "single",
    stem: "Jenny is very ____. She always thinks carefully before she makes a decision.",
    choices: ["generous", "curious", "cautious", "furious"],
    answer: 2,
    explain:
      "後句「做決定前總是仔細思考」是線索 → **cautious 謹慎的**。generous 慷慨的、curious 好奇的、furious 狂怒的。",
    difficulty: 2,
    nodeId: node("vocab-levels"),
  },
  {
    id: id("w10"),
    type: "cloze",
    stem: "Please pay ____ to the safety instructions before the plane takes off.（填入一個名詞）",
    accept: ["attention"],
    explain: "**pay attention to** 注意…，是固定搭配。",
    difficulty: 1,
    nodeId: node("vocab-collocation"),
  },

  // ── 名詞子句與關係副詞 ──
  {
    id: id("n1"),
    type: "single",
    stem: "Do you know where ____?",
    choices: ["does he live", "he lives", "lives he", "he does live"],
    answer: 1,
    explain: "間接問句（名詞子句）要用**直述句語序**：疑問詞 + 主詞 + 動詞 → where **he lives**。",
    difficulty: 1,
    nodeId: node("g-noun-clause"),
  },
  {
    id: id("n2"),
    type: "single",
    stem: "____ he will come to the party is still unknown.",
    choices: ["If", "Which", "Whether", "What"],
    answer: 2,
    explain:
      "「他是否會來」當主詞，要用 **Whether**；if 引導「是否」的名詞子句不能放在句首當主詞。",
    difficulty: 2,
    nodeId: node("g-noun-clause"),
  },
  {
    id: id("n3"),
    type: "single",
    stem: "This is the town ____ my father grew up.",
    choices: ["which", "when", "where", "why"],
    answer: 2,
    explain:
      "先行詞 the town 是地點，子句 my father grew up 已經完整，缺的是「在那裡」→ 關係副詞 **where**（= in which）。",
    difficulty: 1,
    nodeId: node("g-rel-adverb"),
  },
  {
    id: id("n4"),
    type: "single",
    stem: "I still remember the day ____ we first met.",
    choices: ["when", "where", "which", "why"],
    answer: 0,
    explain: "先行詞 the day 是時間，子句完整 → 關係副詞 **when**（= on which）。",
    difficulty: 1,
    nodeId: node("g-rel-adverb"),
  },
  {
    id: id("n5"),
    type: "cloze",
    stem: "Nobody knows the reason ____ she quit her job.（填入一個關係副詞）",
    accept: ["why"],
    explain:
      "先行詞 the reason 表示原因 → 關係副詞 **why**（= for which）。口語中也常用 that 或省略。",
    difficulty: 1,
    nodeId: node("g-rel-adverb"),
  },
  {
    id: id("n6"),
    type: "tf",
    stem: "「I don't know what does he want.」是正確的句子。",
    answer: false,
    explain: "名詞子句不可以用疑問句倒裝，要用直述句語序：I don't know **what he wants**.",
    difficulty: 2,
    nodeId: node("g-noun-clause"),
  },

  // ── 假設語氣 ──
  {
    id: id("s1"),
    type: "single",
    stem: "If I ____ you, I would apologize to her.",
    choices: ["am", "were", "had been", "will be"],
    answer: 1,
    explain:
      "與現在事實相反（我不是你）：If + 過去式，be 動詞一律用 **were**；主要子句 would + 原形。",
    difficulty: 1,
    nodeId: node("g-subjunctive"),
  },
  {
    id: id("s2"),
    type: "single",
    stem: "If she had left home earlier, she ____ the train.",
    choices: ["would catch", "will catch", "would have caught", "had caught"],
    answer: 2,
    explain:
      "if 子句是 had left → 與**過去**事實相反，主要子句用 would have + p.p.：**would have caught**。",
    difficulty: 2,
    nodeId: node("g-subjunctive"),
  },
  {
    id: id("s3"),
    type: "tf",
    stem: "「I wish I could fly.」表示說話者其實不會飛。",
    answer: true,
    explain: "**I wish + 過去式**表示與現在事實相反的願望：希望能飛，但事實上不會飛。",
    difficulty: 1,
    nodeId: node("g-subjunctive"),
  },
  {
    id: id("s4"),
    type: "single",
    stem: "If I had gone to bed earlier last night, I ____ so tired now.",
    choices: ["wouldn't have been", "wouldn't be", "won't be", "am not"],
    answer: 1,
    explain:
      "**混合假設**：條件是過去（last night → had gone），結果是現在（now）→ 主要子句用 would + 原形：**wouldn't be**。",
    difficulty: 3,
    nodeId: node("g-subjunctive"),
  },
  {
    id: id("s5"),
    type: "cloze",
    stem: "____ I known the truth, I would have told you.（省略 if 的倒裝句，填入一個字）",
    accept: ["Had"],
    explain: "If I had known ... 省略 if 後，把 had 移到主詞前面：**Had** I known the truth, ...",
    difficulty: 2,
    nodeId: node("g-inversion"),
  },
  {
    id: id("s6"),
    type: "single",
    stem: "It's almost midnight. It's high time we ____ home.",
    choices: ["go", "will go", "went", "have gone"],
    answer: 2,
    explain: "**It's (high) time + 主詞 + 過去式**：表示「早該…了」，雖然用過去式，意思是現在。",
    difficulty: 2,
    nodeId: node("g-subjunctive"),
  },

  // ── 分詞構句、倒裝、強調句 ──
  {
    id: id("pc1"),
    type: "single",
    stem: "____ the news, she burst into tears.",
    choices: ["Heard", "Hearing", "To hear", "Hear"],
    answer: 1,
    explain:
      "原句 When she heard the news, ...；主詞相同、she 是「主動」聽到 → 分詞構句用 V-ing：**Hearing** the news, ...",
    difficulty: 2,
    nodeId: node("g-participle"),
  },
  {
    id: id("pc2"),
    type: "single",
    stem: "____ in simple English, the book is easy for beginners.",
    choices: ["Writing", "Wrote", "Written", "To write"],
    answer: 2,
    explain:
      "書是「被寫成」簡單英文 → 被動用過去分詞：**Written** in simple English, ...（= Because it is written ...）",
    difficulty: 2,
    nodeId: node("g-participle"),
  },
  {
    id: id("pc3"),
    type: "tf",
    stem: "「Walking to school, the rain started.」是正確的分詞構句。",
    answer: false,
    explain:
      "分詞構句的主詞必須和主要子句相同；這句的主詞變成 the rain，意思成了「雨走路去上學」，是**懸垂分詞**。應改為 While I was walking to school, it started to rain.",
    difficulty: 2,
    nodeId: node("g-participle"),
  },
  {
    id: id("iv1"),
    type: "single",
    stem: "Never ____ such a beautiful sunset.",
    choices: ["I have seen", "have I seen", "I saw", "did I saw"],
    answer: 1,
    explain: "否定副詞 Never 放句首 → 助動詞移到主詞前：Never **have I seen** ...",
    difficulty: 2,
    nodeId: node("g-inversion"),
  },
  {
    id: id("iv2"),
    type: "single",
    stem: "Only after the meeting ____ the truth.",
    choices: ["he learned", "he did learn", "did he learn", "learned he"],
    answer: 2,
    explain:
      "Only + 副詞片語放句首要倒裝；原句沒有助動詞，借用 did，動詞還原：Only after the meeting **did he learn** the truth.",
    difficulty: 3,
    nodeId: node("g-inversion"),
  },
  {
    id: id("iv3"),
    type: "cloze",
    stem: "Not until midnight ____ she go to bed.（填入一個助動詞）",
    accept: ["did"],
    explain: "Not until ... 放句首要倒裝；過去式且沒有助動詞 → 借 **did**，後面動詞用原形 go。",
    difficulty: 2,
    nodeId: node("g-inversion"),
  },
  {
    id: id("cf1"),
    type: "single",
    stem: "It was in 2019 ____ I first visited Japan.",
    choices: ["which", "that", "where", "what"],
    answer: 1,
    explain: "強調句型 **It is / was + 強調部分 + that + 其餘部分**，被強調的是 in 2019。",
    difficulty: 2,
    nodeId: node("g-cleft"),
  },
  {
    id: id("cf2"),
    type: "tf",
    stem: "強調句「It is / was ... that ...」去掉 It is / was 和 that 之後，剩下的部分仍是完整的句子。",
    answer: true,
    explain:
      "這是判斷強調句的好方法：It was in 2019 that I first visited Japan. → In 2019 I first visited Japan. 仍然完整。",
    difficulty: 2,
    nodeId: node("g-cleft"),
  },

  // ── 閱讀策略 ──
  {
    id: id("rd1"),
    type: "single",
    stem: "閱讀短文後回答問題。\n\nMany teenagers feel they never have enough time. However, the problem is often not a lack of time but a lack of planning. Students who write a simple to-do list each evening usually finish more tasks and feel less stressed. Some also find that putting their phones in another room helps them focus. Small changes in daily habits, it seems, can make a big difference.\n\nWhat is the main idea of the passage?",
    choices: [
      "Teenagers should never use phones.",
      "Students have too much homework.",
      "Simple planning habits can help students manage their time.",
      "To-do lists make students feel more stressed.",
    ],
    answer: 2,
    explain:
      "第二句（However 之後）點出重點：問題在於**缺乏規劃**；後面舉 to-do list 和收手機為例，最後一句總結小習慣能帶來大改變。選項 A 太絕對，B 文中沒提，D 與原文相反。",
    difficulty: 2,
    nodeId: node("read-main"),
  },
  {
    id: id("rd2"),
    type: "single",
    stem: "閱讀短文後回答問題。\n\nWhen Leo got home, the front door was open, the lights were off, and his dog was hiding under the bed. Muddy footprints led from the door to the kitchen, where the refrigerator was wide open.\n\nWhat can be inferred from the passage?",
    choices: [
      "Leo's dog was happy to see him.",
      "Someone had probably entered the house while Leo was away.",
      "Leo forgot to buy food for dinner.",
      "The house was bright and tidy.",
    ],
    answer: 1,
    explain:
      "門開著、狗躲起來、泥巴腳印一路到廚房、冰箱被打開——這些線索都指向**有人趁 Leo 不在時進了屋子**。燈是關的、地上有泥巴，所以「明亮整齊」與原文矛盾。",
    difficulty: 2,
    nodeId: node("read-inference"),
  },
  {
    id: id("rd3"),
    type: "single",
    stem: "閱讀短文後回答問題。\n\nSea turtles return to the beach where they were born to lay their eggs. Scientists believe **they** use the Earth's magnetic field like a map.\n\nWhat does **they** refer to?",
    choices: ["scientists", "sea turtles", "eggs", "beaches"],
    answer: 1,
    explain:
      "把選項代回去檢查：用地球磁場「像地圖一樣」找路回到出生海灘的是 **sea turtles（海龜）**，不是科學家。指涉題要找語意說得通的名詞，不一定是最靠近的那個。",
    difficulty: 2,
    nodeId: node("read-reference"),
  },
  {
    id: id("rd4"),
    type: "single",
    stem: "The hikers were **exhausted** after walking for ten hours; they could hardly keep their eyes open.\n\nThe word **exhausted** is closest in meaning to ____.",
    choices: ["very excited", "very hungry", "very tired", "very angry"],
    answer: 2,
    explain:
      "線索：走了十小時、眼睛幾乎睜不開 → **exhausted 筋疲力盡的** = very tired。分號後面的句子常是對前面的補充說明。",
    difficulty: 1,
    nodeId: node("read-context"),
  },

  // ── 學測題型、翻譯與寫作、面試 ──
  {
    id: id("ex1"),
    type: "single",
    stem: "I wanted to go hiking this weekend. ____, it rained all day.",
    choices: ["Therefore", "For example", "However", "In addition"],
    answer: 2,
    explain: "想去爬山，「但是」整天下雨 → 前後語意相反，用表示對比的 **However**。",
    difficulty: 1,
    nodeId: node("write-transition"),
  },
  {
    id: id("ex2"),
    type: "multi",
    stem: "下列哪些轉折語表示「因果」？（複選）",
    choices: ["As a result", "Therefore", "Consequently", "Nevertheless", "In contrast"],
    answer: [0, 1, 2],
    explain:
      "As a result、Therefore、Consequently 都表示「因此、結果」。Nevertheless（然而）與 In contrast（相對地）表示對比。",
    difficulty: 2,
    nodeId: node("write-transition"),
  },
  {
    id: id("ex3"),
    type: "tf",
    stem: "英文段落的主題句（topic sentence）常放在段落開頭，點出整段的重點。",
    answer: true,
    explain: "主題句通常放在段首，後面的支持句提供理由與例子，最後以結論句收尾。",
    difficulty: 1,
    nodeId: node("write-paragraph"),
  },
  {
    id: id("ex4"),
    type: "single",
    stem: "「我花了三個小時完成這份報告。」最適當的英譯是？",
    choices: [
      "I spent three hours to finish the report.",
      "It spent me three hours to finish the report.",
      "It took me three hours to finish the report.",
      "It took three hours for me finishing the report.",
    ],
    answer: 2,
    explain:
      "**It takes + 人 + 時間 + to V**：It took me three hours to finish the report. 若用 spend，要說 I spent three hours **finishing** the report（spend + 時間 + V-ing）。",
    difficulty: 2,
    nodeId: node("write-translation"),
  },
  {
    id: id("ex5"),
    type: "single",
    stem: "學測英文的「文意選填」是哪一種題型？",
    choices: [
      "看中文句子，翻譯成英文",
      "一篇文章中有多個空格，從一組共用的字詞選項中選出最適合的填入",
      "依照題目提示寫一篇英文作文",
      "單一句子挖一個空格，從四個選項中選出最適合的字",
    ],
    answer: 1,
    explain:
      "**文意選填**是整篇文章挖多個空格、共用一組選項，每個選項最多用一次。單句四選一是「詞彙題」，翻譯是「中譯英」。",
    difficulty: 1,
    nodeId: node("exam-fill"),
  },
  {
    id: id("ex6"),
    type: "cloze",
    stem: "I studied hard for the test; ____, I didn't pass it.（填入一個表示「然而」的轉折副詞）",
    accept: ["however", "nevertheless", "nonetheless"],
    explain: "用功卻沒通過，前後語意相反 → **however**（或 nevertheless）。注意分號與逗號的用法。",
    difficulty: 1,
    nodeId: node("exam-cloze"),
  },
  {
    id: id("ex7"),
    type: "single",
    stem: "英文面試時，面試官說：「Could you briefly introduce yourself?」下列哪個回答最適當？",
    choices: [
      "Kevin.",
      "Why do you want to know?",
      "My name is Kevin Lin. I'm a senior at a high school in Hsinchu, and I'm interested in computer science.",
      "I don't know what to say.",
    ],
    answer: 2,
    explain:
      "好的自我介紹用**完整句子**，依序說出姓名、學校與興趣，簡短又清楚；只說名字太簡略，反問則不禮貌。",
    difficulty: 1,
    nodeId: node("b-interview"),
  },

  // 素養題組：短文閱讀（主旨、猜字義、推論）
  {
    id: id("set-quiet-1"),
    type: "single",
    context: QUIET_CONTEXT,
    stem: "What is the main idea of the passage?",
    choices: [
      "Quiet Sunday made the center of Brightwater livelier and friendlier, despite some complaints.",
      "Shop owners in Brightwater plan to close their shops on Sundays.",
      "Cars are not allowed in Brightwater on any day of the week.",
      "The bakers in Brightwater make the best bread in the country.",
    ],
    answer: 0,
    explain:
      "全文談 Quiet Sunday 的效果：店家原本擔心，結果更多家庭來逛，多數人覺得小鎮更友善。B、D 文中沒有提到；C 只有每月第一個星期日、九點到三點禁車。",
    difficulty: 2,
    nodeId: node("read-main"),
  },
  {
    id: id("set-quiet-2"),
    type: "single",
    context: QUIET_CONTEXT,
    stem: 'In the passage, the phrase "business would suffer" is closest in meaning to ______.',
    choices: [
      "business would improve",
      "business would get worse",
      "business would stay the same",
      "business would become famous",
    ],
    answer: 1,
    explain:
      "線索在下一句：However, the opposite happened（然而情況正好相反）。結果是更多人來逛、生意變好，所以原本擔心的是生意會**變差**（get worse）。",
    difficulty: 2,
    nodeId: node("read-context"),
  },
  {
    id: id("set-quiet-3"),
    type: "single",
    context: QUIET_CONTEXT,
    stem: "What can we infer from the baker's words?",
    choices: [
      "Quiet Sunday brought him more attention from people passing by.",
      "He wants to stop selling bread.",
      "He dislikes families who stay for hours.",
      "He believes traffic is good for his business.",
    ],
    answer: 0,
    explain:
      "麵包師傅說以前大家匆匆走過櫥窗，現在會停下來聞麵包香，可推論禁車後路人更注意到他的店。他的話沒有表達不想賣麵包、討厭家庭或喜歡車流。",
    difficulty: 3,
    nodeId: node("read-inference"),
  },

  // 素養題組：假設語氣（訊息情境）
  {
    id: id("set-leo-1"),
    type: "single",
    context: LEO_CONTEXT,
    stem: "Which statement about Leo is TRUE?",
    choices: [
      "He caught the last train.",
      "He did not leave school early enough.",
      "He checked the timetable before leaving.",
      "He is waiting outside in the cold.",
    ],
    answer: 1,
    explain:
      "他留在學校聊天而錯過末班車，並說 If I had left ten minutes earlier，表示當時沒有早點離開。他沒趕上車、沒看時刻表，也是在溫暖的候車室。",
    difficulty: 1,
    nodeId: node("g-subjunctive"),
  },
  {
    id: id("set-leo-2"),
    type: "cloze",
    context: LEO_CONTEXT,
    stem: "If Leo had left ten minutes earlier, he ____ have caught the train.（填入一個助動詞）",
    accept: ["would", "could", "might"],
    explain:
      "與過去事實相反的假設語氣：If + had p.p., 主句用 would / could / might have + p.p.。原文用的是 would。",
    difficulty: 2,
    nodeId: node("g-subjunctive"),
  },
  {
    id: id("set-leo-3"),
    type: "single",
    context: LEO_CONTEXT,
    stem: 'What does "I wish I had checked the timetable" tell us?',
    choices: [
      "Leo checked the timetable carefully.",
      "Leo did not check the timetable, and he regrets it.",
      "Leo will check the timetable tomorrow.",
      "Leo wants someone else to check it.",
    ],
    answer: 1,
    explain: "I wish + had p.p. 表示對過去事實的遺憾：事實是他**沒有**查時刻表，現在後悔了。",
    difficulty: 2,
    nodeId: node("g-subjunctive"),
  },
];

export default questions;
