import type { CurriculumNode } from "../../types";

/** 國中國文（108 課綱第四學習階段）學習內容 */
const mindmap: CurriculumNode = {
  id: "chinese.junior",
  title: "國中國文",
  summary:
    "依 108 課綱國語文「學習內容」分為**文字篇章**、**文本表述**、**文化內涵**三大主題，再加上國中必讀的古典與現代文學體裁。",
  children: [
    {
      id: "chinese.junior.a",
      title: "文字篇章（A）",
      summary: "從一個字、一個詞、一個句子，到整篇文章的結構與主旨。",
      children: [
        {
          id: "chinese.junior.a-char",
          title: "字形・字音・字義與部首",
          grade: 7,
          summary: "認識常用字的形、音、義，學會用部首查字典，分辨形近字與多音字。",
          keyPoints: [
            "部首多半和字義有關：「江、河、湖」都和水有關",
            "部首不一定在左邊：「問」屬口部、「聞」屬耳部",
            "形近字要看部件：「再接再厲」不是「再接再勵」",
          ],
          lessonIds: ["chinese.junior.char-detective"],
        },
        {
          id: "chinese.junior.a-liushu",
          title: "造字原則：象形・指事・會意・形聲",
          grade: 7,
          summary: "漢字的基本造字方法，其中形聲字數量最多。",
          keyPoints: [
            "象形：畫出物體的樣子，如「日、月、山」",
            "指事：用符號標示抽象概念，如「上、下、本、刃」",
            "會意：合兩個以上的字表示新意思，如「休、明、森」",
            "形聲：形符表意＋聲符表音，如「江、河、晴」",
          ],
          lessonIds: ["chinese.junior.char-detective"],
        },
        {
          id: "chinese.junior.a-idiom",
          title: "成語與常用語詞",
          grade: 7,
          summary: "成語多有典故，要理解本義、比喻義與使用場合，避免望文生義。",
          keyPoints: [
            "「差強人意」是大致還能令人滿意，不是很差",
            "「守株待兔」比喻不知變通、妄想不勞而獲",
            "「門可羅雀」形容冷清，不可用來形容生意興隆",
          ],
          lessonIds: ["chinese.junior.char-detective"],
        },
        {
          id: "chinese.junior.a-rhetoric",
          title: "修辭技巧",
          grade: 7,
          summary: "修辭讓文字更生動、更有說服力。辨認修辭時，要先看句子「怎麼說」。",
          lessonIds: ["chinese.junior.rhetoric"],
          children: [
            {
              id: "chinese.junior.rhet-metaphor",
              title: "譬喻",
              summary: "用具體、熟悉的事物比喻抽象、陌生的事物。",
              keyPoints: ["三要素：喻體、喻詞、喻依", "分為明喻、隱喻（暗喻）、略喻、借喻"],
            },
            {
              id: "chinese.junior.rhet-personify",
              title: "轉化",
              summary: "把物當成人寫（擬人）、把人當成物寫（擬物），或把抽象寫成具體（形象化）。",
              keyPoints: ["「春天踮著腳尖走進校園」是擬人"],
            },
            {
              id: "chinese.junior.rhet-exaggerate",
              title: "誇飾",
              summary: "故意誇大或縮小事實，加深印象。",
              keyPoints: ["「白髮三千丈，緣愁似箇長」（李白〈秋浦歌〉）"],
            },
            {
              id: "chinese.junior.rhet-parallel",
              title: "排比與類疊",
              summary:
                "排比：三個以上結構相似的句子並列；類疊：同一字詞或語句連續或隔離地重複出現。",
              keyPoints: [
                "排比：「東市買駿馬，西市買鞍韉，南市買轡頭，北市買長鞭」",
                "類疊：「唧唧復唧唧」",
              ],
            },
            {
              id: "chinese.junior.rhet-question",
              title: "設問",
              summary:
                "故意用問句引起注意，分為提問（自問自答）、激問（答案在問題反面）、懸問（只問不答）。",
            },
            {
              id: "chinese.junior.rhet-contrast",
              title: "映襯",
              summary: "把兩種相反的人、事、物或觀點並列比較，使意思更鮮明。",
              keyPoints: ["「朱門酒肉臭，路有凍死骨」（杜甫）"],
            },
            {
              id: "chinese.junior.rhet-chain",
              title: "頂真",
              summary: "用前一句的結尾作為下一句的開頭，使語氣連貫。",
              keyPoints: ["「軍書十二卷，卷卷有爺名」（〈木蘭詩〉）"],
            },
            {
              id: "chinese.junior.rhet-metonymy",
              title: "借代",
              summary: "不直接說出事物的名稱，而用與它密切相關的事物來代替。",
              keyPoints: ["「汗青」代史冊、「巾幗」代女性、「鬚眉」代男性"],
            },
          ],
        },
        {
          id: "chinese.junior.a-sentence",
          title: "標點符號與句型",
          grade: 7,
          summary: "標點符號能表達語氣與停頓；常見句型有敘事句、有無句、判斷句、表態句。",
          keyPoints: ["引號「」標示引用或特別指稱", "破折號——表示補充說明或語意轉折"],
        },
        {
          id: "chinese.junior.a-structure",
          title: "篇章主旨與結構",
          grade: 8,
          summary: "讀一篇文章，先找主旨，再看段落如何安排（總分、起承轉合、首尾呼應）。",
          keyPoints: ["主旨句常出現在開頭或結尾", "畫出段落大意，就能看見文章骨架"],
          lessonIds: ["chinese.junior.text-types"],
        },
      ],
    },
    {
      id: "chinese.junior.b",
      title: "文本表述（B）",
      summary: "依寫作目的不同，文本可分為記敘、抒情、說明、議論與應用五類。",
      children: [
        {
          id: "chinese.junior.b-narrative",
          title: "記敘文（Ba）",
          grade: 7,
          code: "Ba-Ⅳ-1",
          summary: "敘述人物、事件的經過。常見敘事順序有順敘、倒敘、插敘、補敘。",
          keyPoints: [
            "順敘：依時間先後",
            "倒敘：先寫結果，再回頭說經過",
            "插敘：敘述中途插入相關的事",
          ],
          lessonIds: ["chinese.junior.text-types"],
        },
        {
          id: "chinese.junior.b-lyric",
          title: "抒情文（Bb）",
          grade: 7,
          summary: "抒發情感。可直接抒情，也可藉事、藉景、藉物間接抒情。",
          keyPoints: ["直接抒情：直接說出「我好想念…」", "間接抒情：情感藏在景物與事件裡"],
          lessonIds: ["chinese.junior.text-types"],
        },
        {
          id: "chinese.junior.b-expository",
          title: "說明文（Bc）",
          grade: 8,
          summary: "客觀、清楚地說明事物或道理，常用定義、舉例、分類、比較、數據、圖表等方法。",
          lessonIds: ["chinese.junior.text-types"],
        },
        {
          id: "chinese.junior.b-argument",
          title: "議論文（Bd）",
          grade: 9,
          summary: "提出看法並說服讀者。三要素：論點、論據、論證。",
          keyPoints: [
            "論據分為事實論據（例子、數據）與道理論據（名言、公認道理）",
            "論證方法：舉例、引用、比喻、對比等",
          ],
          lessonIds: ["chinese.junior.text-types"],
        },
        {
          id: "chinese.junior.b-practical",
          title: "應用文（Be）",
          grade: 9,
          summary: "生活中實際使用的文書：書信、便條、題辭、對聯、啟事、自傳等。",
          keyPoints: [
            "書信提稱語：父母用「膝下」、師長用「道鑒」",
            "題辭：「弄璋之喜」賀生男、「弄瓦之喜」賀生女",
            "對聯：上聯末字仄聲、下聯末字平聲",
          ],
          lessonIds: ["chinese.junior.practical-writing"],
        },
      ],
    },
    {
      id: "chinese.junior.c",
      title: "文化內涵（C）",
      summary: "從文本中認識不同時代、不同族群的生活方式、人際關係與思想。",
      children: [
        {
          id: "chinese.junior.c-material",
          title: "物質文化（Ca）",
          summary: "文本中的飲食、服飾、建築、交通、名勝古蹟與節慶，如春聯與年節習俗。",
          lessonIds: ["chinese.junior.practical-writing"],
        },
        {
          id: "chinese.junior.c-social",
          title: "社群文化（Cb）",
          summary: "文本中的親屬稱謂、倫理道德、禮儀風俗，如書信稱謂與題辭的使用場合。",
          lessonIds: ["chinese.junior.practical-writing"],
        },
        {
          id: "chinese.junior.c-spirit",
          title: "精神文化（Cc）",
          summary: "文本中的藝術、信仰與思想，如儒家的君子人格、陶淵明淡泊名利的生活態度。",
          lessonIds: ["chinese.junior.classical-prose"],
        },
      ],
    },
    {
      id: "chinese.junior.lit",
      title: "文學體裁與經典選文",
      summary: "分為韻文（詩、詞、曲）與非韻文（古文、語錄、寓言、小說），以及現代文學。",
      children: [
        {
          id: "chinese.junior.lit-modern",
          title: "新詩與現代散文",
          grade: 7,
          summary: "新詩不受格律限制，重視意象與節奏；現代散文形式自由，常寓情於事、寓理於物。",
          keyPoints: ["讀新詩：找意象、找轉折、找情感"],
        },
        {
          id: "chinese.junior.lit-poetry",
          title: "近體詩：絕句與律詩",
          grade: 8,
          code: "Ad-Ⅳ-3",
          summary:
            "唐代成熟的格律詩。每句五字或七字，絕句四句、律詩八句；偶數句押韻，押平聲韻且一韻到底。",
          keyPoints: [
            "律詩四聯：首聯、頷聯、頸聯、尾聯",
            "律詩的頷聯、頸聯必須對仗",
            "絕句常用起、承、轉、合安排",
          ],
          lessonIds: ["chinese.junior.classical-poetry"],
        },
        {
          id: "chinese.junior.lit-ci",
          title: "宋詞",
          grade: 9,
          summary: "詞又稱長短句、詩餘，依詞牌填寫，句子長短不一；分為婉約與豪放兩大風格。",
          keyPoints: ["婉約派：柳永、李清照", "豪放派：蘇軾、辛棄疾"],
          lessonIds: ["chinese.junior.classical-poetry"],
        },
        {
          id: "chinese.junior.lit-yuefu",
          title: "古體詩與樂府：〈木蘭詩〉",
          grade: 7,
          summary: "〈木蘭詩〉是北朝樂府民歌，敘述木蘭代父從軍的故事，大量運用排比、類疊、頂真。",
          keyPoints: ["「雄兔腳撲朔，雌兔眼迷離」", "古體詩句數、押韻較自由"],
        },
        {
          id: "chinese.junior.lit-lunyu",
          title: "《論語》選",
          grade: 7,
          summary: "孔子弟子及再傳弟子記錄孔子與弟子言行的語錄體著作，為「四書」之一。",
          keyPoints: [
            "「學而不思則罔，思而不學則殆」",
            "「知之為知之，不知為不知，是知也」",
            "「三人行，必有我師焉」",
          ],
        },
        {
          id: "chinese.junior.lit-prose",
          title: "古文名篇",
          grade: 8,
          code: "Ad-Ⅳ-4",
          summary:
            "〈陋室銘〉（唐・劉禹錫）、〈愛蓮說〉（北宋・周敦頤）、〈五柳先生傳〉（東晉・陶淵明）。",
          keyPoints: [
            "銘：刻在器物上自我警惕的韻文",
            "說：說明道理的論說文體",
            "傳：記述人物生平的文體",
          ],
          lessonIds: ["chinese.junior.classical-prose"],
        },
        {
          id: "chinese.junior.lit-fable",
          title: "寓言",
          grade: 7,
          summary:
            "用簡短的故事寄託道理，常用擬人手法，如「揠苗助長」（《孟子》）、「守株待兔」（《韓非子》）。",
        },
      ],
    },
  ],
};

export default mindmap;
