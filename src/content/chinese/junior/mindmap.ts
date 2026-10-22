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
          extras: [
            {
              kind: "myth",
              title: "「有邊讀邊」不一定對",
              body: "形聲字的聲符確實能提示讀音，但漢字的讀音經過兩千多年的演變，聲符和整個字的讀音常常已經不一樣。例如「江」從「工」得聲、「河」從「可」得聲，今天讀起來差很多。所以遇到不熟的字，聲符只能當**線索**，仍要查字典確認。",
            },
          ],
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
          extras: [
            {
              kind: "history",
              title: "許慎與《說文解字》",
              body: "東漢的許慎編了《說文解字》，是第一部有系統分析字形的字書，並用「部首」來排列漢字，全書共分五百四十個部首。他在書中說明了「六書」，後人研究古文字時，常把它當作重要依據。",
            },
            {
              kind: "challenge",
              title: "「末」字怎麼造的？",
              body: "「本」是在「木」的下面加一橫，指出樹根的位置。請推想：「末」字是怎麼造出來的？屬於六書中的哪一類？\n\n**提示**：想想樹的哪個部位和「根」相對。\n\n**思路**：在「木」的上面加一橫，指出樹梢，所以「末」的意思是頂端。用符號標示位置，屬於**指事**。",
            },
          ],
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
          extras: [
            {
              kind: "myth",
              title: "「七月流火」不是天氣很熱",
              body: "「七月流火」出自《詩經・豳風・七月》。「火」是指大火星（心宿二），農曆七月的傍晚，它會從天空正南慢慢向西下沉，表示暑氣將退、天氣轉涼。所以這個成語是形容**天氣漸涼**，如果拿來形容盛夏酷熱，就弄反了。",
            },
            {
              kind: "history",
              title: "守株待兔的原文故事",
              body: "「守株待兔」出自《韓非子・五蠹》。故事說宋國有個農夫，看見一隻兔子跑來撞上樹椿、折斷脖子死了，他便放下農具守在樹椿旁，希望再撿到兔子，結果被宋國人取笑。韓非子用它來諷刺想用老辦法治理新時代的人。",
            },
          ],
        },
        {
          id: "chinese.junior.a-rhetoric",
          title: "修辭技巧",
          grade: 7,
          summary: "修辭讓文字更生動、更有說服力。辨認修辭時，要先看句子「怎麼說」。",
          lessonIds: ["chinese.junior.rhetoric"],
          extras: [
            {
              kind: "myth",
              title: "有「像」字就一定是譬喻嗎？",
              body: "「他長得像爸爸」只是說兩個人很相似，沒有拿**不同類**的事物來比，這是比較，不是譬喻。譬喻要有性質不同的兩件事物，例如「時間像流水」：時間和水本來不同類，卻有相似的特點。判斷時別只看喻詞，要看兩件事物是不是同類。",
            },
          ],
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
              extras: [
                {
                  kind: "history",
                  title: "李白的〈秋浦歌〉",
                  body: "「白髮三千丈，緣愁似箇長」出自李白的〈秋浦歌〉組詩（共十七首），秋浦在今天安徽池州一帶。唐代一丈約三公尺，三千丈就是約九公里，頭髮當然不可能這麼長。李白用不可能的數字，把憂愁寫得又深又長。",
                },
              ],
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
          extras: [
            {
              kind: "myth",
              title: "主旨句一定在開頭或結尾嗎？",
              body: "很多文章會把主旨句放在開頭或結尾，但並非一定如此。有些文章把主旨藏在中間，甚至沒有直接說出來。這時可以先寫出每一段的大意，再自己歸納：作者最想讓讀者知道什麼？",
            },
          ],
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
          extras: [
            {
              kind: "cross",
              title: "電影裡的倒敘",
              body: "許多電影一開場先讓觀眾看到結局，例如主角受傷躺在病床上，再回頭說明事情怎麼發生，這就是**倒敘**。好處是先製造懸念，讓人想知道原因。寫作文時也可以學這招：第一句先寫結果，再回頭交代經過。",
            },
          ],
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
          extras: [
            {
              kind: "history",
              title: "弄璋與弄瓦",
              body: "「弄璋之喜」「弄瓦之喜」出自《詩經・小雅・斯干》。古人生了男孩，讓他玩玉器「璋」，期望他將來品德高尚；生了女孩，讓她玩紡錘「瓦」，期望她勤於紡織。這是古代的性別期待，今天使用題辭時，要留意場合與對方的感受。",
            },
          ],
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
          extras: [
            {
              kind: "history",
              title: "最早的春聯？",
              body: "一般認為，五代時後蜀國君孟昶在桃木板上題了「新年納餘慶，嘉節號長春」，是最早的春聯。在這之前，人們在門口掛桃符驅邪；後來才演變成在紅紙上寫吉祥話。春聯就這樣從辟邪物逐漸變成祝福與裝飾。",
            },
          ],
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
          extras: [
            {
              kind: "history",
              title: "陶淵明為什麼辭官？",
              body: "陶淵明曾任彭澤縣令，據史書記載，他只做了八十多天就辭官回鄉。相傳起因是不願為了「五斗米」的俸祿，向上級官員彎腰行禮。此後他過著耕田、飲酒、寫詩的生活，也成了**田園詩**的代表人物。",
            },
          ],
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
          extras: [
            {
              kind: "history",
              title: "《全唐詩》的規模",
              body: "清康熙年間，朝廷下令編成《全唐詩》，收集唐代與五代的詩作，約有四萬八千多首、兩千多位詩人，可見當時寫詩風氣之盛。近體詩的格律也在這個時期成熟，成為後世寫詩的重要標準。",
            },
            {
              kind: "challenge",
              title: "〈登鸛雀樓〉押什麼韻？",
              body: "唐代王之渙〈登鸛雀樓〉：「白日依山盡，黃河入海流。欲窮千里目，更上一層樓。」\n\n請找出押韻的字，並想想：前兩句「白日／黃河」「依山／入海」是不是對仗？\n\n**思路**：偶數句末字「流」「樓」押韻；前兩句詞性與結構相對，屬於對仗。",
            },
          ],
        },
        {
          id: "chinese.junior.lit-ci",
          title: "宋詞",
          grade: 9,
          summary: "詞又稱長短句、詩餘，依詞牌填寫，句子長短不一；分為婉約與豪放兩大風格。",
          keyPoints: ["婉約派：柳永、李清照", "豪放派：蘇軾、辛棄疾"],
          lessonIds: ["chinese.junior.classical-poetry"],
          extras: [
            {
              kind: "myth",
              title: "詞牌不是題目",
              body: "蘇軾的「明月幾時有，把酒問青天」，詞牌是〈水調歌頭〉。詞牌只是規定格式和旋律的曲調名稱，不是詞的內容。蘇軾在序中寫明這是中秋夜歡飲達旦、思念弟弟蘇轍（字子由）所作，結尾「但願人長久，千里共嬋娟」表達對親人的祝福。",
            },
          ],
        },
        {
          id: "chinese.junior.lit-yuefu",
          title: "古體詩與樂府：〈木蘭詩〉",
          grade: 7,
          summary: "〈木蘭詩〉是北朝樂府民歌，敘述木蘭代父從軍的故事，大量運用排比、類疊、頂真。",
          keyPoints: ["「雄兔腳撲朔，雌兔眼迷離」", "古體詩句數、押韻較自由"],
          extras: [
            {
              kind: "history",
              title: "〈木蘭詩〉是誰寫的？",
              body: "〈木蘭詩〉是北朝的民歌，作者不詳，在流傳中不斷被修改，現存文字經過後人潤飾，收錄在宋代郭茂倩編的《樂府詩集》。詩中「雄兔腳撲朔，雌兔眼迷離；雙兔傍地走，安能辨我是雄雌」，用兔子比喻木蘭女扮男裝而不被識破。",
            },
            {
              kind: "challenge",
              title: "東市、西市、南市、北市",
              body: "〈木蘭詩〉寫木蘭準備出征：「東市買駿馬，西市買鞍韉，南市買轡頭，北市買長鞭。」為什麼不直接寫「到市場買齊裝備」？\n\n**提示**：想想排比的節奏，以及它給讀者的感覺。\n\n**思路**：四個方位、四樣東西，節奏明快，表現木蘭準備周全、行動俐落，讀者彷彿跟著她奔走四方。",
            },
          ],
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
          extras: [
            {
              kind: "myth",
              title: "《論語》是孔子寫的嗎？",
              body: "《論語》不是孔子自己寫的，而是孔子的弟子與再傳弟子，記錄孔子和弟子的言行編成的，所以書裡常出現「子曰」（老師說）。它是**語錄體**，一則一則簡短記錄，不像長篇文章，讀的時候可以一則一則慢慢想。",
            },
            {
              kind: "life",
              title: "學而時習之",
              body: "《論語》開篇就說：「學而時習之，不亦說乎？有朋自遠方來，不亦樂乎？人不知而不慍，不亦君子乎？」「說」讀作「悅」。放在今天：學過的東西常練習會有成就感，有朋友一起切磋很快樂，別人不了解自己也不生氣。",
            },
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
          extras: [
            {
              kind: "history",
              title: "蓮是花中君子",
              body: "北宋周敦頤在〈愛蓮說〉說：「菊，花之隱逸者也；牡丹，花之富貴者也；蓮，花之君子者也。」他最愛蓮「出淤泥而不染，濯清漣而不妖」，也就是身處污濁環境仍保持純潔，外表美麗卻不妖媚。",
            },
            {
              kind: "cross",
              title: "替自己寫一篇「傳」",
              body: "〈五柳先生傳〉開頭說：「先生不知何許人也，亦不詳其姓字；宅邊有五柳樹，因以為號焉。」用住處的特色當名號，等於是陶淵明的自畫像。這和現代**自傳**相通：不必寫流水帳，挑出最能表現個性的特徵就好。",
            },
          ],
        },
        {
          id: "chinese.junior.lit-fable",
          title: "寓言",
          grade: 7,
          summary:
            "用簡短的故事寄託道理，常用擬人手法，如「揠苗助長」（《孟子》）、「守株待兔」（《韓非子》）。",
          extras: [
            {
              kind: "challenge",
              title: "兩個宋人",
              body: "「揠苗助長」和「守株待兔」的主角都是宋國人。比較這兩個故事：他們的錯誤有什麼不同？\n\n**思路**：揠苗的人**太急**，用蠻力干擾自然的規律，結果害死禾苗；守株的人**太懶**，把偶然當成必然，不再努力。一個是急於求成，一個是妄想不勞而獲。",
            },
          ],
        },
      ],
    },
  ],
};

export default mindmap;
