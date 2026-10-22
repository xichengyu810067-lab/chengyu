import type { CurriculumNode } from "../../types";

const L = (s: string) => `english.senior.${s}`;

/** 高中英文（108 課綱英語文第五學習階段，普通型高中）學習內容 */
const mindmap: CurriculumNode = {
  id: "english.senior",
  title: "高中英文",
  summary:
    "延續國中的四大類學習內容，高中加深**字彙與構詞**、**進階文法**，並強化**閱讀策略**、**翻譯與寫作**，銜接學測題型。",
  children: [
    {
      id: "english.senior.a",
      title: "語言知識（A）",
      summary: "擴充字彙量、掌握構詞規則，並能理解與運用較複雜的句構。",
      children: [
        {
          id: "english.senior.a-vocab",
          title: "字彙與構詞",
          summary: "把長單字拆成字首、字根、字尾，就能猜字義、一次記一整組字。",
          children: [
            {
              id: "english.senior.vocab-levels",
              title: "大考參考詞彙 Level 1–6",
              grade: 10,
              summary:
                "大考中心的《高中英文參考詞彙表》依難度分為六個級別（Level 1–6），級別越高越少見。",
              keyPoints: [
                "先打穩 Level 1–3 的基礎字，再往高級字邁進",
                "同一個字要認識不同詞性：decide（v.）→ decision（n.）→ decisive（adj.）",
                "在文章中反覆遇到，比單看字表更容易記住",
              ],
            },
            {
              id: "english.senior.vocab-prefix",
              title: "字首（prefix）",
              grade: 10,
              summary: "字首放在字的前面，通常改變**意思**。",
              keyPoints: [
                "否定：un-（unhappy）、dis-（dislike）、in- / im-（impossible）",
                "位置與方向：pre-（之前）、inter-（之間）、trans-（橫越）、ex-（向外）",
                "re- 表示「再、回」：rewrite、return",
              ],
              lessonIds: [L("word-formation")],
              extras: [
                {
                  kind: "myth",
                  title: "in- 不一定是否定",
                  body: "inflammable 的 in- 來自 inflame（使燃燒）的 in-，不是否定，所以它和 flammable 一樣是「易燃的」，容易讓人誤會，因此標示上常改用 flammable。另一個例子是 invaluable：它不是「沒價值」，而是「價值高到無法衡量」。看到字首，要連同整個字的意思一起想。",
                },
              ],
            },
            {
              id: "english.senior.vocab-root",
              title: "字根（root）",
              grade: 10,
              summary: "字根是單字的核心意思，常來自拉丁文或希臘文。",
              keyPoints: [
                "port 拿、運送：export、portable",
                "dict 說：predict、dictation",
                "spect 看：inspect、respect",
                "rupt 破裂：interrupt、disrupt",
              ],
              lessonIds: [L("word-formation")],
              extras: [
                {
                  kind: "history",
                  title: "quarantine 的四十天",
                  body: "quarantine（隔離檢疫）來自義大利語的 quaranta giorni，意思是「四十天」。中世紀歐洲的港口城市，曾要求來自疫區的船隻先停泊一段時間，確認船上沒有人生病才可上岸，這段時間後來被訂為四十天。從字的來源，可以看到人類對抗疫病的歷史。",
                },
                {
                  kind: "cross",
                  title: "scope：看的工具",
                  body: "字根 scope 來自希臘文，意思是「看、觀察」，和不同字首結合，就變成自然課常見的儀器：tele-（遠）+ scope = telescope（望遠鏡）、micro-（微小）+ scope = microscope（顯微鏡）、peri-（周圍）+ scope = periscope（潛望鏡）。拆開來記，一次就能記住一整組。",
                },
              ],
            },
            {
              id: "english.senior.vocab-suffix",
              title: "字尾與詞性轉換",
              grade: 10,
              summary: "字尾放在字的後面，通常改變**詞性**。",
              keyPoints: [
                "名詞：-tion / -sion、-ment、-ness、-er / -or（人）",
                "形容詞：-able、-ful、-less、-ive、-ous",
                "動詞：-ize、-en；副詞：-ly",
              ],
              lessonIds: [L("word-formation")],
              extras: [
                {
                  kind: "myth",
                  title: "-ly 一定是副詞嗎？",
                  body: "friendly、lovely、lonely、elderly 都以 -ly 結尾，卻是**形容詞**：She is a friendly girl. 反過來，有些副詞沒有 -ly，例如 fast、hard、late。判斷詞性不能只看字尾，要看它在句中修飾什麼：修飾名詞的是形容詞，修飾動詞的是副詞。",
                },
              ],
            },
            {
              id: "english.senior.vocab-collocation",
              title: "搭配詞與片語",
              grade: 11,
              summary: "英文有固定的字詞搭配，背單字時要連同搭配一起記。",
              keyPoints: [
                "pay attention to、make a decision、take action",
                "have an impact on、play a role in",
              ],
              extras: [
                {
                  kind: "myth",
                  title: "為什麼不是 strong rain",
                  body: "中文說「大雨」，英文是 heavy rain，不是 big rain 或 strong rain；中文說「濃茶」，英文卻是 strong tea。這就是搭配詞：字詞之間有固定的搭配習慣，不一定能用邏輯推出來。背單字時連同常見搭配一起記，寫作與中譯英才不容易出現生硬的中式英文。",
                },
              ],
            },
          ],
        },
        {
          id: "english.senior.a-grammar",
          title: "進階文法",
          summary: "子句、假設語氣與特殊句構，讓句子更精準、更有變化。",
          children: [
            {
              id: "english.senior.g-noun-clause",
              title: "名詞子句",
              grade: 10,
              summary: "由 that、whether / if、疑問詞引導的子句，可以當主詞、受詞或補語。",
              keyPoints: [
                "間接問句用直述句語序：Do you know **where he lives**?",
                "當主詞時用 whether，不用 if：**Whether** he will come is unknown.",
                "what = the thing(s) that：**What you said** is true.",
              ],
              lessonIds: [L("clauses")],
              extras: [
                {
                  kind: "challenge",
                  title: "兩句合成一句",
                  body: "請把 I don't know. 和 Where did she go? 合成一句；Did she go home? 也試試看。\n\n**解答**：I don't know where she went. 以及 I don't know whether (if) she went home. 疑問詞子句要用直述句語序，助動詞 did 消失，動詞改回過去式 went。",
                },
              ],
            },
            {
              id: "english.senior.g-rel-adverb",
              title: "關係副詞",
              grade: 10,
              summary: "where、when、why 引導形容詞子句，等於「介系詞 + which」。",
              keyPoints: [
                "where（地點）= in / at which：the town **where** I grew up",
                "when（時間）= on / in which：the day **when** we met",
                "why（原因）= for which：the reason **why** she left",
                "the way 和 how 不連用，二選一",
              ],
              lessonIds: [L("clauses")],
            },
            {
              id: "english.senior.g-subjunctive",
              title: "假設語氣",
              grade: 11,
              summary: "描述與事實相反或不太可能發生的情況，動詞要「往過去退一格」。",
              keyPoints: [
                "與現在事實相反：If + 過去式（be 用 were），would + 原形",
                "與過去事實相反：If + had p.p.，would have + p.p.",
                "I wish / as if / It's time + 假設語氣",
              ],
              lessonIds: [L("subjunctive")],
              extras: [
                {
                  kind: "history",
                  title: "為什麼是 If I were",
                  body: "為什麼說 If I were a rich man，而不是 was？因為 were 是古英語留下來的假設語氣形式，用來表示「與事實相反」。音樂劇《屋頂上的提琴手》有一首名曲就叫 If I Were a Rich Man。口語中有人會說 If I was，但考試與正式寫作請用 were。",
                },
                {
                  kind: "life",
                  title: "用 I wish 說出遺憾",
                  body: "寫日記或傳訊息時，常用假設語氣表達遺憾：I wish I had studied harder. 重點是事實：當時沒有認真讀書。wish 後面的動詞要「退一格」：與現在事實相反用過去式，與過去事實相反用 had + p.p.。",
                },
              ],
            },
            {
              id: "english.senior.g-participle",
              title: "分詞構句",
              grade: 11,
              summary: "主詞相同時，把副詞子句化簡為分詞片語。",
              keyPoints: [
                "主動用 V-ing：**Hearing** the news, she cried.",
                "被動用 p.p.：**Written** in simple English, the book is easy to read.",
                "主詞不同不能直接化簡（避免懸垂分詞）",
              ],
              lessonIds: [L("sentence-transform")],
              extras: [
                {
                  kind: "myth",
                  title: "懸垂分詞",
                  body: "Walking along the river, the sunset looked beautiful. 這句有問題：Walking 的動作者應該是人，但後面的主詞卻是 the sunset，變成「夕陽在河邊散步」。改成 Walking along the river, I saw a beautiful sunset. 才對。分詞構句省略的主詞，必須和主要子句的主詞相同。",
                },
              ],
            },
            {
              id: "english.senior.g-inversion",
              title: "倒裝句",
              grade: 11,
              summary: "否定副詞或 Only 片語放句首時，助動詞要移到主詞前面。",
              keyPoints: [
                "**Never have I** seen such a beautiful sunset.",
                "**Not until** midnight **did she** go to bed.",
                "省略 if 的假設語氣：**Had I known**, I would have told you.",
              ],
              lessonIds: [L("sentence-transform")],
              extras: [
                {
                  kind: "cross",
                  title: "文言文的倒裝",
                  body: "英文的倒裝句，像 Never have I seen such a view.，把否定副詞提到句首來強調。中文的文言文也有類似的「賓語前置」：〈師說〉的「句讀之不知」，就是「不知句讀」的倒裝。不同的語言，都會用調換語序來強調想突顯的資訊。",
                },
              ],
            },
            {
              id: "english.senior.g-cleft",
              title: "強調句",
              grade: 11,
              summary: "用 It is / was ... that ... 把要強調的部分放在中間。",
              keyPoints: [
                "**It was** in 2019 **that** I first visited Japan.",
                "強調人時也可用 who：It was my brother who broke the window.",
              ],
              lessonIds: [L("sentence-transform")],
              extras: [
                {
                  kind: "challenge",
                  title: "三種強調",
                  body: "用強調句分別強調 Tom broke the window yesterday. 的三個部分。\n\n**解答**：It was Tom who broke the window yesterday. / It was the window that Tom broke yesterday. / It was yesterday that Tom broke the window.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "english.senior.b",
      title: "溝通功能（B）",
      summary: "在討論、簡報與面試中清楚表達觀點，並能有禮貌地回應不同意見。",
      children: [
        {
          id: "english.senior.b-discussion",
          title: "表達意見與討論",
          grade: 11,
          summary: "提出看法、給理由、同意或委婉地表示不同意。",
          keyPoints: [
            "In my opinion, ... / I believe ... because ...",
            "I see your point, but ... / I'm not sure I agree.",
          ],
        },
        {
          id: "english.senior.b-interview",
          title: "面試與口語表達",
          grade: 12,
          summary: "以完整句子回答問題，用具體經驗支持自己的說法。",
          keyPoints: [
            "自我介紹：姓名 → 學校 → 興趣與目標",
            "回答架構：觀點 → 理由 → 例子 → 小結",
            "聽不清楚時：Could you repeat the question, please?",
          ],
          lessonIds: [L("opinion-writing")],
          extras: [
            {
              kind: "life",
              title: "用 STAR 回答面試問題",
              body: "回答面試問題時，可以用 STAR 架構組織想法：Situation（情境）、Task（任務）、Action（行動）、Result（結果）。例如被問到團隊合作的經驗，先說當時的活動，再說你負責什麼、做了什麼，最後說成果。這個架構能讓回答具體、有順序。",
            },
          ],
        },
      ],
    },
    {
      id: "english.senior.c",
      title: "文化與習俗（C）",
      summary: "理解多元文化與國際議題，並能用英文介紹臺灣。",
      children: [
        {
          id: "english.senior.c-global",
          title: "跨文化理解與國際議題",
          grade: 11,
          summary: "比較不同文化的價值觀與習慣，關心環境、科技等全球議題。",
          keyPoints: ["用英文介紹臺灣的飲食、節慶與景點", "閱讀國際新聞時，注意不同觀點與文化背景"],
          extras: [
            {
              kind: "history",
              title: "tea 與 cha",
              body: "英文的 tea 和許多歐洲語言的「茶」，來自閩南語的 te，因為早期茶葉從福建廈門一帶經海路運往歐洲；而經陸路傳到俄羅斯、土耳其、印度等地的茶，名稱接近 cha（如俄語的 chai）。從一個字的發音，就能看出茶的傳播路線，語言和貿易常常有關。",
            },
          ],
        },
      ],
    },
    {
      id: "english.senior.d",
      title: "思考能力（D）",
      summary: "運用閱讀策略分析文章，並能組織想法寫出結構清楚的段落。",
      children: [
        {
          id: "english.senior.d-reading",
          title: "閱讀策略",
          summary: "先抓架構、再找細節，善用線索推論與猜字義。",
          children: [
            {
              id: "english.senior.read-main",
              title: "主旨與標題",
              grade: 11,
              summary: "找出主題句，判斷全文或段落的重點。",
              keyPoints: ["主題句常在段落開頭或結尾", "選項太細（只是細節）或太廣都不是主旨"],
              lessonIds: [L("reading-exam")],
            },
            {
              id: "english.senior.read-inference",
              title: "推論",
              grade: 11,
              summary: "根據文中線索加上合理常識，推出作者沒有直接說的事。",
              keyPoints: ["答案要有文本根據", "避免過度推論或與原文矛盾"],
              lessonIds: [L("reading-exam")],
              extras: [
                {
                  kind: "myth",
                  title: "推論不是亂猜",
                  body: "閱讀測驗的推論題，答案一定要能從文章找到**根據**，而不是「我覺得可能」。如果選項用了 always、never、all 這類絕對字眼，文章卻只提過 sometimes，通常就是過度推論。先畫出線索，再問自己：作者有說到嗎？",
                },
              ],
            },
            {
              id: "english.senior.read-reference",
              title: "指涉",
              grade: 11,
              summary: "判斷代名詞（it、they、this）或同義替換所指的對象。",
              keyPoints: ["往前找最近、且單複數與語意相符的名詞", "把答案代回句子檢查"],
              lessonIds: [L("reading-exam")],
            },
            {
              id: "english.senior.read-context",
              title: "上下文猜字義",
              grade: 11,
              summary: "利用定義、舉例、對比與因果線索推測生字的意思。",
              keyPoints: ["冒號、破折號後常是解釋", "but、however 提示意思相反"],
              lessonIds: [L("reading-exam")],
            },
          ],
        },
        {
          id: "english.senior.d-exam",
          title: "學測題型",
          summary: "熟悉學測英文各題型的考法與作答策略。",
          children: [
            {
              id: "english.senior.exam-vocab",
              title: "詞彙題",
              grade: 12,
              summary: "單句挖空，考字義與搭配詞。",
              keyPoints: ["先讀懂整句、找出關鍵線索字，再看選項"],
              lessonIds: [L("reading-exam")],
            },
            {
              id: "english.senior.exam-cloze",
              title: "綜合測驗",
              grade: 12,
              summary: "短文挖空，綜合考字彙、文法、轉折語與上下文邏輯。",
              keyPoints: ["空格前後各讀一句，判斷語意是順接還是轉折"],
              lessonIds: [L("reading-exam")],
            },
            {
              id: "english.senior.exam-fill",
              title: "文意選填",
              grade: 12,
              summary: "一篇文章有多個空格，從一組共用的字詞選項中選出最適合的填入。",
              keyPoints: ["先依詞性把選項分組", "每個選項最多用一次，先填有把握的"],
              lessonIds: [L("reading-exam")],
            },
            {
              id: "english.senior.exam-reading",
              title: "閱讀測驗",
              grade: 12,
              summary: "讀長篇文章，回答主旨、細節、推論、指涉等問題。",
              keyPoints: ["先看題目再讀文章，帶著問題找答案"],
              lessonIds: [L("reading-exam")],
            },
            {
              id: "english.senior.exam-mixed",
              title: "混合題",
              grade: 12,
              summary: "同一篇文章結合選擇題與簡答、填寫等非選擇題。",
              keyPoints: ["簡答要用文中的字詞，注意拼字與詞性"],
              lessonIds: [L("reading-exam")],
            },
          ],
        },
        {
          id: "english.senior.d-writing",
          title: "翻譯與寫作",
          summary: "中譯英要先找句型；作文要有清楚的段落結構與轉折。",
          children: [
            {
              id: "english.senior.write-translation",
              title: "中譯英",
              grade: 12,
              summary: "辨識中文句子的句型，拆解後轉成正確的英文句構。",
              keyPoints: [
                "越…越… → The + 比較級, the + 比較級",
                "花時間 → It takes + 人 + 時間 + to V",
              ],
              lessonIds: [L("opinion-writing")],
              extras: [
                {
                  kind: "cross",
                  title: "中英語序大不同",
                  body: "中文習慣先說時間、地點，再說動作：「我昨天在圖書館讀書」；英文通常先說主詞和動詞，再把地點、時間放在後面：I studied in the library yesterday. 中譯英時，先找出「誰做什麼」，再補上時間、地點，就不容易寫出前後顛倒的句子。",
                },
              ],
            },
            {
              id: "english.senior.write-paragraph",
              title: "段落結構",
              grade: 12,
              summary: "主題句 → 支持句（理由與例子）→ 結論句。",
              keyPoints: ["一段只談一個重點", "結論句呼應主題句，但換句話說"],
              lessonIds: [L("opinion-writing")],
            },
            {
              id: "english.senior.write-transition",
              title: "轉折語",
              grade: 12,
              summary: "用轉折語連接句子，讓文章前後邏輯清楚。",
              keyPoints: [
                "補充：In addition、Moreover",
                "對比：However、On the other hand",
                "因果：Therefore、As a result",
                "舉例：For example、For instance",
              ],
              lessonIds: [L("opinion-writing")],
              extras: [
                {
                  kind: "myth",
                  title: "however 不是連接詞",
                  body: "It was raining, however, we went out. 這句有問題。however 是**副詞**，不能像 but 一樣只靠逗號連接兩個完整的句子。改法：It was raining, but we went out. 或 It was raining; however, we went out. 或分成兩句，用句號加 However,。",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default mindmap;
