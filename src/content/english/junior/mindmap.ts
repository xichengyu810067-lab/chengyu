import type { CurriculumNode } from "../../types";

const L = (s: string) => `english.junior.${s}`;

/** 國中英文（108 課綱英語文第四學習階段）學習內容 */
const mindmap: CurriculumNode = {
  id: "english.junior",
  title: "國中英文",
  summary:
    "依 108 課綱英語文的學習內容，分為**語言知識**（字詞、句構）、**溝通功能**、**文化與習俗**、**思考能力**四大類。",
  children: [
    {
      id: "english.junior.a",
      title: "語言知識（A）",
      summary: "字詞與句構：能聽、讀、說、寫基本字詞，並靈活運用國中文法句型。",
      children: [
        {
          id: "english.junior.a-vocab",
          title: "字詞",
          summary: "依生活主題累積字彙，認識詞性與名詞的特性，並把發音和拼字連結起來。",
          children: [
            {
              id: "english.junior.vocab-daily",
              title: "生活主題字詞",
              grade: 7,
              code: "Ac-Ⅳ-4",
              summary:
                "國中階段要能聽、讀、說、寫最基本的 1,200 字詞（參考字詞表約 2,000 字），以學校、家庭、食物、交通等生活主題為主。",
              keyPoints: [
                "依主題記單字（教室、餐廳、城市）比依字母順序死背更有效",
                "記單字也要記搭配詞與例句，如 **do homework**、**take a bus**",
                "看到單字先唸出來，聽、說、讀、寫一起練",
              ],
              lessonIds: [L("classroom-vocab")],
              extras: [
                {
                  kind: "history",
                  title: "星期幾的名字怎麼來",
                  body: "英文的星期名稱藏著神話：Sunday 是太陽日，Monday 是月亮日；Wednesday 來自古英語的 Wōdnesdæg，是北歐神話主神沃登（Woden，即奧丁）之日；Thursday 和雷神索爾（Thor）有關；Tuesday 與 Friday 也對應北歐神祇，Saturday 則來自羅馬農神 Saturn。",
                },
              ],
            },
            {
              id: "english.junior.vocab-wordclass",
              title: "詞性與可數、不可數名詞",
              grade: 7,
              summary: "名詞、動詞、形容詞、副詞各有功能；名詞又分可數與不可數。",
              keyPoints: [
                "可數名詞：單數前加 a / an，複數加 -s / -es（box → boxes）",
                "不可數名詞：water、bread、money、homework、information，不能直接加 a 或 -s",
                "an 用在**母音開頭的音**前：an apple、an hour（h 不發音）",
              ],
              lessonIds: [L("classroom-vocab")],
              extras: [
                {
                  kind: "myth",
                  title: "news 是複數嗎？",
                  body: "news 看起來像複數，但它是**不可數名詞**，動詞用單數：The news is good. 同樣常被誤用的還有 information、advice、homework，都不能加 -s，也不能直接加 a。要表示「一則」，可以說 a piece of news、a piece of advice。",
                },
              ],
            },
            {
              id: "english.junior.vocab-phonics",
              title: "發音、拼字與語調",
              grade: 7,
              summary: "運用字母拼讀規則看字讀音、聽音拼字，並注意重音與語調。",
              keyPoints: [
                "字尾不發音的 e 會讓前面的母音唸字母音：cap → cape、kit → kite",
                "Yes/No 問句語調通常上揚，Wh- 問句通常下降",
              ],
              extras: [
                {
                  kind: "myth",
                  title: "英文不是「看字就會唸」",
                  body: "through、though、tough、cough 都有 ough，卻分別唸成不同的音（光是 through 和 tough 的母音就不一樣）。這是因為英文拼字大多保留了古代的樣子，發音卻一直在改變。所以遇到新字，最好查發音或聽示範，而不是只靠猜。",
                },
              ],
            },
          ],
        },
        {
          id: "english.junior.a-grammar",
          title: "句構與文法",
          code: "Ad-Ⅳ-1",
          summary: "國中階段所學的文法句型：時態、比較、被動、不定詞與動名詞、子句等。",
          children: [
            {
              id: "english.junior.g-tense",
              title: "時態",
              summary:
                "用動詞的形式表示動作發生的**時間**（過去、現在、未來）與**狀態**（簡單、進行、完成）。",
              children: [
                {
                  id: "english.junior.g-present",
                  title: "be 動詞與現在簡單式",
                  grade: 7,
                  summary: "be 動詞（am / is / are）與一般動詞現在式，描述事實與習慣。",
                  keyPoints: [
                    "I **am**、you / we / they **are**、he / she / it **is**",
                    "主詞是第三人稱單數，動詞加 -s / -es：She **studies** English every day.",
                    "否定與疑問借助 do / does：Does he like math?",
                  ],
                  lessonIds: [L("tense-timeline")],
                  extras: [
                    {
                      kind: "cross",
                      title: "科學事實用現在簡單式",
                      body: "描述不會改變的科學事實，英文用現在簡單式，例如：Water boils at 100°C at sea level. 或 The Earth goes around the Sun. 寫自然科學的說明時，這是很常用的句型。主詞是第三人稱單數時別忘了加 s：boils、goes。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-progressive",
                  title: "進行式",
                  grade: 7,
                  summary: "be 動詞 + V-ing，表示某個時刻正在進行的動作。",
                  keyPoints: [
                    "現在進行式常搭配 now、right now、Look!、Listen!",
                    "過去進行式 was / were + V-ing：I **was reading** when you called.",
                  ],
                  lessonIds: [L("tense-timeline")],
                  extras: [
                    {
                      kind: "myth",
                      title: "I am knowing？",
                      body: "know、like、want、love 這類表示**狀態或想法**的動詞，通常不用進行式：不說 I am knowing the answer，要說 I know the answer。不過某速食廣告的標語 I'm lovin' it 是刻意的口語用法，目的是營造輕鬆的感覺，不是考試的標準答案。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-past",
                  title: "過去簡單式",
                  grade: 7,
                  summary: "描述過去某個時間發生且已結束的動作。",
                  keyPoints: [
                    "規則動詞加 -ed；不規則動詞要熟記：go → went、eat → ate、buy → bought",
                    "常搭配 yesterday、last week、two days ago、in 2020",
                  ],
                  lessonIds: [L("tense-timeline")],
                  extras: [
                    {
                      kind: "history",
                      title: "go 的過去式為什麼是 went",
                      body: "went 看起來和 go 完全不像，原因是它其實借用了另一個舊動詞 wend（前往）的過去式。這種把兩個詞「合併」成同一組變化的情形，叫做補充法（suppletion）。be 動詞的 am、is、are、was、were 也是類似的例子，所以不規則動詞要靠多唸、多用來記。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-future",
                  title: "未來式",
                  grade: 8,
                  summary: "will + 原形動詞，或 be going to + 原形動詞，表示未來的事。",
                  keyPoints: [
                    "be going to 常用於事先計畫好的事：We **are going to** visit Tainan.",
                    "常搭配 tomorrow、next week、in two days",
                  ],
                  lessonIds: [L("tense-timeline")],
                },
                {
                  id: "english.junior.g-perfect",
                  title: "現在完成式",
                  grade: 8,
                  summary: "have / has + 過去分詞，表示經驗、已完成，或從過去持續到現在。",
                  keyPoints: [
                    "since + 時間點（since 2020）、for + 一段時間（for three years）",
                    "問經驗：**Have** you ever **been** to Japan?",
                    "不和 yesterday、last year 等明確的過去時間連用",
                  ],
                  lessonIds: [L("tense-timeline")],
                  extras: [
                    {
                      kind: "myth",
                      title: "has gone to 和 has been to",
                      body: "He has been to Japan. 表示他去過日本，現在已經回來了；He has gone to Japan. 則表示他去日本了，人現在還在那邊或在路上。所以不能說 I have gone to Japan twice，因為說話的人就在這裡。想說「去過」，請用 have been to。",
                    },
                    {
                      kind: "challenge",
                      title: "since 還是 for？",
                      body: "請判斷空格要填 since 還是 for：\n- I have lived here ___ 2019.\n- I have lived here ___ five years.\n\n**提示**：後面接的是「時間點」還是「一段時間」？\n\n**解答**：第一句是時間點，用 since；第二句是一段時間，用 for。",
                    },
                  ],
                },
              ],
            },
            {
              id: "english.junior.g-structure",
              title: "句型",
              summary: "把句子變長、變豐富的句型工具。",
              children: [
                {
                  id: "english.junior.g-compare",
                  title: "比較級與最高級",
                  grade: 8,
                  summary: "兩者比較用比較級 + than；三者以上用 the + 最高級。",
                  keyPoints: [
                    "短形容詞加 -er / -est：tall → taller → tallest；big → bigger → biggest",
                    "長形容詞加 more / most：more beautiful、the most beautiful",
                    "不規則：good → better → best；bad → worse → worst",
                    "as + 原級 + as：一樣…",
                  ],
                  lessonIds: [L("comparison")],
                  extras: [
                    {
                      kind: "myth",
                      title: "不能說 more better",
                      body: "better 已經是 good 的比較級，所以不能再加 more，要說 This one is better，不說 more better。最高級也一樣，不說 the most best。另外 farther 和 further 常可互換，談實際距離時多用 farther；further 還可表示「進一步的」，例如 further information。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-inf-ger",
                  title: "不定詞與動名詞",
                  grade: 8,
                  summary: "to + 原形動詞（不定詞）與 V-ing（動名詞）可以當名詞使用。",
                  keyPoints: [
                    "want、decide、hope、plan + **to V**",
                    "enjoy、finish、practice、mind + **V-ing**",
                    "動名詞當主詞：**Swimming** is good exercise.",
                  ],
                  lessonIds: [L("passive-relative")],
                  extras: [
                    {
                      kind: "challenge",
                      title: "stop to read 還是 stop reading？",
                      body: "兩個句子差一個字，意思卻不同：\n- I stopped to read.\n- I stopped reading.\n\n請想想各是什麼意思。\n\n**解答**：stop to read 是「停下手邊的事，去讀書」（to read 表示目的）；stop reading 是「不再讀了」（動名詞是被停止的事）。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-conj",
                  title: "連接詞",
                  grade: 8,
                  summary: "用連接詞把兩個句子接起來，表示並列、轉折、因果、時間或條件。",
                  keyPoints: [
                    "and（而且）、but（但是）、or（或者）、so（所以）",
                    "because（因為）、when（當…時）、if（如果）、although（雖然）",
                    "because 和 so 不同時出現；although 和 but 不同時出現",
                  ],
                },
                {
                  id: "english.junior.g-passive",
                  title: "被動語態",
                  grade: 9,
                  summary: "主詞是動作的「接受者」時，用 be 動詞 + 過去分詞。",
                  keyPoints: [
                    "This app **is used** by many students.",
                    "過去式被動：The bridge **was built** in 1990.",
                    "動作者不重要或不清楚時，by 片語可以省略",
                  ],
                  lessonIds: [L("passive-relative")],
                  extras: [
                    {
                      kind: "life",
                      title: "Made in Taiwan",
                      body: "商品上的 Made in Taiwan 其實是被動語態，完整的說法是 This product was made in Taiwan。標示、告示常省略主詞和 be 動詞，像 Made in Taiwan、Sold out（已售完）。只要看到過去分詞，主詞又是物品，就可以想到被動。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-relative",
                  title: "關係子句",
                  grade: 9,
                  summary: "用 who、which、that 引導的子句修飾前面的名詞。",
                  keyPoints: [
                    "人用 who，事物用 which，兩者都能用 that",
                    "I have a friend **who can speak Japanese**.",
                  ],
                  lessonIds: [L("passive-relative")],
                  extras: [
                    {
                      kind: "cross",
                      title: "中文放前面，英文放後面",
                      body: "中文把修飾語放在名詞前面：「會說日語的朋友」；英文則把關係子句放在名詞後面：a friend who can speak Japanese。這個語序差異是翻譯時的常見難點。可以記成：中文「先修飾，再講人」，英文「先講人，再補充」。",
                    },
                  ],
                },
                {
                  id: "english.junior.g-tag",
                  title: "附加問句",
                  grade: 9,
                  summary: "在句尾加上簡短問句，向對方確認：前肯定後否定、前否定後肯定。",
                  keyPoints: [
                    "You are a student, **aren't you**?",
                    "Kevin can't swim, **can he**?",
                    "附加問句的主詞要用代名詞",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "english.junior.b",
      title: "溝通功能（B）",
      summary: "在日常生活情境中，用學過的字詞與句型和別人溝通。",
      children: [
        {
          id: "english.junior.b-intro",
          title: "問候與自我介紹",
          grade: 7,
          code: "B-Ⅳ-1",
          summary: "介紹自己、家人與朋友，並和別人打招呼。",
          keyPoints: [
            "Hi, I'm Amy. I'm in the seventh grade.",
            "Nice to meet you. → Nice to meet you, too.",
          ],
        },
        {
          id: "english.junior.b-order",
          title: "點餐與購物",
          grade: 7,
          summary: "用禮貌的句型點餐、詢問價格與付款。",
          keyPoints: [
            "I'd like a hamburger, please. / Can I have an iced tea?",
            "How much is it? / It's 50 dollars.",
            "For here or to go?",
          ],
          lessonIds: [L("daily-talk")],
        },
        {
          id: "english.junior.b-direction",
          title: "問路與指路",
          grade: 8,
          summary: "問地點、說明路線，並用介系詞描述位置。",
          keyPoints: [
            "Excuse me. Where is the post office?",
            "Go straight. / Turn left. / It's on your right.",
            "next to、across from、between ... and ...、on the corner of ...",
          ],
          lessonIds: [L("daily-talk")],
        },
        {
          id: "english.junior.b-phone",
          title: "打電話",
          grade: 8,
          summary: "電話中自我介紹、找人與留言的慣用說法。",
          keyPoints: [
            "May I speak to Kevin, please?",
            "This is Amy (speaking). → 電話中說「我是 Amy」",
            "Can I take a message?",
          ],
          extras: [
            {
              kind: "history",
              title: "第一通電話",
              body: "1876 年，亞歷山大・格拉漢姆・貝爾（Alexander Graham Bell）取得電話專利。據他的實驗筆記記載，他對隔壁房間的助手華生說了：Mr. Watson, come here. I want to see you. 這被視為第一通電話的內容。今天電話中說 Hello，也是電話普及之後才流行起來的習慣。",
            },
          ],
        },
        {
          id: "english.junior.b-preference",
          title: "表達喜好與意見",
          grade: 8,
          summary: "說出喜歡什麼、不喜歡什麼，並說明理由。",
          keyPoints: [
            "I like / love / enjoy + V-ing",
            "I prefer tea to coffee.",
            "I think ... because ...",
          ],
          lessonIds: [L("daily-talk")],
        },
      ],
    },
    {
      id: "english.junior.c",
      title: "文化與習俗（C）",
      summary: "認識國內外節慶與生活習俗，尊重文化差異。",
      children: [
        {
          id: "english.junior.c-festival",
          title: "國內外節慶",
          grade: 9,
          code: "C-Ⅳ-1",
          summary: "用英文介紹臺灣與西方的重要節日與習俗。",
          keyPoints: [
            "Halloween（10 月 31 日）：Trick or treat!",
            "Thanksgiving（美國，11 月第四個星期四）：吃火雞、感謝家人",
            "Lunar New Year：red envelopes、family reunion dinner",
          ],
          lessonIds: [L("festivals-reading")],
          extras: [
            {
              kind: "history",
              title: "萬聖夜的起源",
              body: "一般認為，Halloween 和古代凱爾特人在秋收結束時舉行的 Samhain 節有關。基督教的萬聖節（All Saints' Day）在 11 月 1 日，前一晚稱為 All Hallows' Eve，縮短後就變成 Halloween。Hallow 的意思是「神聖的」。",
            },
            {
              kind: "myth",
              title: "感恩節是哪一天？",
              body: "美國的感恩節（Thanksgiving）不是固定日期，而是 11 月的**第四個星期四**。1863 年林肯總統宣布了全國感恩日，到了 1941 年國會立法，才正式確定是 11 月第四個星期四，所以每年的日期都不太一樣。",
            },
          ],
        },
        {
          id: "english.junior.c-custom",
          title: "生活習俗與禮儀",
          grade: 9,
          summary: "了解英語國家的日常禮儀，並和臺灣的習慣比較。",
          keyPoints: [
            "在美國的餐廳用餐，通常要另外給服務生小費（tip）",
            "別人打噴嚏時，常會說 Bless you!",
            "收到禮物時，常當面打開並道謝",
          ],
          extras: [
            {
              kind: "life",
              title: "小費怎麼算",
              body: "在美國的餐廳，服務生的收入有一部分靠小費，常見做法是給帳單金額的 15% 到 20%。例如餐費 40 美元，給 20% 就是 8 美元。不過各國習慣不同，有些地方服務費已經包含在帳單裡，出國前最好先查一下當地的習慣。",
            },
          ],
        },
      ],
    },
    {
      id: "english.junior.d",
      title: "思考能力（D）",
      summary: "運用策略理解文章，並組織自己的想法寫成短文。",
      children: [
        {
          id: "english.junior.d-reading",
          title: "閱讀理解",
          grade: 9,
          summary: "找主旨、抓細節、判斷代名詞指的是誰，並根據線索合理推測。",
          keyPoints: [
            "主旨常在第一句或最後一句",
            "代名詞（he、it、they）往前找它代替的名詞",
            "不認識的字，從上下文猜意思",
          ],
          lessonIds: [L("festivals-reading")],
          extras: [
            {
              kind: "cross",
              title: "國文與英文的主旨策略",
              body: "找主旨的策略，國文和英文是相通的：先看標題與第一、最後一段，再把每段濃縮成一句話。英文文章常用主題句（topic sentence）開頭，一段只談一個重點，所以先讀每段的第一句，大致就能掌握文章的骨架。",
            },
          ],
        },
        {
          id: "english.junior.d-writing",
          title: "卡片與短文寫作",
          grade: 9,
          summary: "寫卡片、電子郵件與簡短段落，注意格式與標點。",
          keyPoints: [
            "書信格式：稱呼（Dear Amy,）→ 內文 → 結尾（Love, / Best wishes,）＋署名",
            "段落：主題句 → 支持句 → 結論句",
          ],
          lessonIds: [L("festivals-reading")],
          extras: [
            {
              kind: "life",
              title: "Dear 與 Hi",
              body: "寫給老師、長輩或陌生人的 email，開頭用 Dear Mr. Lin, 或 Dear Ms. Chen,，結尾用 Best regards, 或 Sincerely,；寫給好朋友就可以輕鬆些：Hi Amy, ... See you!。主旨欄（Subject）也要簡短清楚，例如 Question about homework。選對語氣，就是溝通的第一步。",
            },
          ],
        },
      ],
    },
  ],
};

export default mindmap;
