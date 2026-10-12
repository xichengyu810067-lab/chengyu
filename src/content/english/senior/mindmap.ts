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
            },
          ],
        },
      ],
    },
  ],
};

export default mindmap;
