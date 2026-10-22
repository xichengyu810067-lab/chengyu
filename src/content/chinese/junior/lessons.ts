import type { Lesson } from "../../types";

const poetryLab = () => import("../labs/PoetryFormLab");
const articleScene = () => import("../scenes/ArticleStructureScene");
const coupletScene = () => import("../scenes/SpringCoupletScene");
const poemBase = () => import("../scenes/poemLayers").then((m) => ({ default: m.PoemBase }));
const lianLayer = () => import("../scenes/poemLayers").then((m) => ({ default: m.LianLayer }));
const rhymeLayer = () => import("../scenes/poemLayers").then((m) => ({ default: m.RhymeLayer }));
const duiLayer = () => import("../scenes/poemLayers").then((m) => ({ default: m.DuiLayer }));

const q = (s: string) => `chinese.junior.q-${s}`;

const lessons: Lesson[] = [
  {
    id: "chinese.junior.char-detective",
    title: "字詞偵探：六書、部首與成語",
    grade: 7,
    minutes: 12,
    nodeIds: ["chinese.junior.a-liushu", "chinese.junior.a-char", "chinese.junior.a-idiom"],
    objectives: [
      "能說出象形、指事、會意、形聲四種造字方法",
      "能利用形符與聲符推測字義與讀音",
      "能正確理解並使用常見成語",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：漢字是怎麼造出來的？",
        prompt: "先在心裡猜猜看，再刮開確認答案。",
        cards: [
          {
            front: "「日、月、山、水」是怎麼造出來的？",
            back: "**象形**：照著物體的樣子畫出來。例如「山」就像三座並立的山峰。",
          },
          {
            front: "「上、下」沒辦法畫成圖，古人怎麼辦？",
            back: "**指事**：在線條上加符號標示位置。「本」在「木」下方加一橫，指樹根。",
          },
          {
            front: "人靠在樹旁邊是哪個字？",
            back: "「休」——**會意**：把兩個字的意思合起來。「人＋言」是「信」，三個「木」是「森」。",
          },
          {
            front: "「江、河、湖、海」為什麼都有「氵」？",
            back: "**形聲**：「氵」是形符，表示和水有關；「工、可、胡、每」是聲符，提示讀音。漢字中形聲字最多。",
          },
          {
            front: "「問」和「聞」都有「門」，部首也是「門」嗎？",
            back: "不是！「問」是**口部**（用嘴問），「聞」是**耳部**（用耳聽），「門」是聲符。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "造字方法大分類",
        prompt: "把每個字拖到正確的造字方法。",
        buckets: [
          { id: "xiang", label: "象形" },
          { id: "zhi", label: "指事" },
          { id: "hui", label: "會意" },
          { id: "xing", label: "形聲" },
        ],
        items: [
          { id: "w1", label: "日", bucket: "xiang" },
          { id: "w2", label: "山", bucket: "xiang" },
          { id: "w3", label: "上", bucket: "zhi" },
          { id: "w4", label: "刃", bucket: "zhi" },
          { id: "w5", label: "明", bucket: "hui" },
          { id: "w6", label: "森", bucket: "hui" },
          { id: "w7", label: "晴", bucket: "xing" },
          { id: "w8", label: "媽", bucket: "xing" },
        ],
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：成語與意思",
        prompt: "翻開兩張牌，找出成語和它的意思。",
        pairs: [
          ["虎頭蛇尾", "開始盛大，結尾草率"],
          ["對牛彈琴", "說話不看對象"],
          ["杯弓蛇影", "疑神疑鬼，自相驚擾"],
          ["守株待兔", "不知變通，妄想不勞而獲"],
          ["畫蛇添足", "多此一舉，反而壞事"],
          ["井底之蛙", "見識狹小"],
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "形聲字工廠",
        task: "以「青」為聲符，替它加上不同的形符（例如「日、氵、言、目、忄」），寫出至少 4 個形聲字，並在旁邊寫出每個字的意思。",
        background: "grid",
        hint: "想想看：太陽出來的天氣、乾淨的水、說話請求、眼睛、心裡的感受……",
        reference:
          "晴（日：天氣晴朗）、清（氵：水清澈）、請（言：請求）、睛（目：眼珠）、情（忄：感情）、蜻（虫：蜻蜓）。聲符「青」提示讀音，形符決定意義類別。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c3"), q("c4"), q("i2"), q("i3")],
      },
    ],
  },
  {
    id: "chinese.junior.rhetoric",
    title: "修辭魔法師：讓句子活起來",
    grade: 7,
    minutes: 14,
    nodeIds: ["chinese.junior.a-rhetoric"],
    objectives: [
      "能辨認譬喻、轉化、誇飾、設問、排比、類疊、映襯、頂真、借代",
      "能分析譬喻的喻體、喻詞、喻依",
      "能在寫作中運用修辭使句子更生動",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：修辭家族",
        root: {
          id: "rh",
          title: "修辭技巧",
          children: [
            {
              id: "rh-shape",
              title: "讓畫面更鮮明",
              summary: "把抽象寫成具體，讓讀者「看得見」。",
              children: [
                { id: "rh-pi", title: "譬喻", summary: "用相似的事物來比方：A 像 B。" },
                { id: "rh-zhuan", title: "轉化", summary: "物變人、人變物、抽象變具體。" },
                { id: "rh-kua", title: "誇飾", summary: "故意誇大或縮小，加深印象。" },
              ],
            },
            {
              id: "rh-rhythm",
              title: "讓節奏更有力",
              summary: "安排句子形式，產生節奏感。",
              children: [
                { id: "rh-pai", title: "排比", summary: "三句以上結構相似的句子並列。" },
                { id: "rh-lei", title: "類疊", summary: "同一字詞或句子重複出現。" },
                { id: "rh-ding", title: "頂真", summary: "上句的結尾作下句的開頭。" },
              ],
            },
            {
              id: "rh-thought",
              title: "讓意思更深刻",
              summary: "透過對照、提問或替代，引人思考。",
              children: [
                { id: "rh-ying", title: "映襯", summary: "把相反的事物並列對照。" },
                { id: "rh-she", title: "設問", summary: "提問、激問、懸問。" },
                { id: "rh-jie", title: "借代", summary: "用相關事物代替本名，如「汗青」代史冊。" },
              ],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "修辭分類挑戰",
        prompt: "讀讀看每個句子，把它拖到主要使用的修辭。",
        buckets: [
          { id: "pi", label: "譬喻" },
          { id: "zhuan", label: "轉化" },
          { id: "kua", label: "誇飾" },
          { id: "she", label: "設問" },
        ],
        items: [
          { id: "s1", label: "月亮像一艘小船，停在夜空的湖面上。", bucket: "pi" },
          { id: "s2", label: "時間是一條不會回頭的河。", bucket: "pi" },
          { id: "s3", label: "風輕輕敲著窗，想進來和我聊天。", bucket: "zhuan" },
          { id: "s4", label: "春天踮著腳尖，悄悄走進校園。", bucket: "zhuan" },
          { id: "s5", label: "白髮三千丈，緣愁似箇長。", bucket: "kua" },
          { id: "s6", label: "他的嗓門大得能把屋頂掀開。", bucket: "kua" },
          { id: "s7", label: "什麼是幸福？幸福就是一家人一起吃晚餐。", bucket: "she" },
          { id: "s8", label: "難道我們能眼睜睜看著海洋被汙染嗎？", bucket: "she" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：譬喻的三要素",
        problem: "分析句子：「她的笑容像春天的陽光。」並試著把它改寫成不同類型的譬喻。",
        steps: [
          {
            show: "**喻體**（被比喻的事物）：笑容",
            why: "先找出這句話真正要描寫的對象。",
            predict: {
              question: "這句話真正要描寫的對象（喻體）是？",
              choices: ["笑容", "像", "春天的陽光"],
              answer: 0,
            },
          },
          {
            show: "**喻詞**（連接的詞）：像",
            why: "常見喻詞：像、如、似、好比、彷彿。",
          },
          {
            show: "**喻依**（用來比喻的事物）：春天的陽光",
            why: "喻依和喻體要有相似點：都讓人覺得溫暖、舒服。",
          },
          {
            show: "三者俱全 → **明喻**。把「像」換成「是」：「她的笑容是春天的陽光。」",
            predict: {
              question: "喻詞換成「是」之後，變成哪一種譬喻？",
              choices: ["明喻", "隱喻（暗喻）", "借喻"],
              answer: 1,
            },
            why: "喻詞改為「是、成了、變成」等，稱為隱喻（暗喻）。",
          },
          {
            show: "省略喻詞：「她的笑容，春天的陽光。」→ **略喻**；只留喻依：「那道春天的陽光走進教室，大家都笑了。」→ **借喻**",
            why: "借喻最含蓄，讀者要從上下文判斷「春天的陽光」指的是她的笑容。",
          },
        ],
        takeaway:
          "譬喻四種：**明喻**（三者俱全）、**隱喻**（喻詞改為「是」）、**略喻**（省略喻詞）、**借喻**（只剩喻依）。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "配對：修辭與例句",
        prompt: "把右邊的例句拖到對應的修辭旁。",
        pairs: [
          { id: "m1", left: "排比", right: "東市買駿馬，西市買鞍韉，南市買轡頭，北市買長鞭。" },
          { id: "m2", left: "類疊", right: "唧唧復唧唧，木蘭當戶織。" },
          { id: "m3", left: "映襯", right: "他的外表冷漠，內心卻比誰都溫暖。" },
          { id: "m4", left: "頂真", right: "要養成閱讀的習慣，習慣一旦養成，就會受益一生。" },
          { id: "m5", left: "借代", right: "巾幗不讓鬚眉。" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("r1"), q("r2"), q("r3"), q("r4"), q("r5"), q("r7")],
      },
    ],
  },
  {
    id: "chinese.junior.text-types",
    title: "讀懂四種文本：記敘・抒情・說明・議論",
    grade: 8,
    minutes: 13,
    nodeIds: [
      "chinese.junior.b-narrative",
      "chinese.junior.b-argument",
      "chinese.junior.a-structure",
    ],
    objectives: [
      "能分辨記敘、抒情、說明、議論四種表述方式",
      "能依時間順序重組記敘段落",
      "能指出議論文的論點、論據與結論",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "這句話在做什麼？",
        prompt: "判斷每個句子主要的表述方式。",
        buckets: [
          { id: "ji", label: "記敘：說一件事" },
          { id: "shu", label: "抒情：表達感受" },
          { id: "shuo", label: "說明：介紹知識" },
          { id: "yi", label: "議論：提出主張" },
        ],
        items: [
          { id: "e1", label: "放學後，我和弟弟沿著河堤騎腳踏車回家。", bucket: "ji" },
          { id: "e2", label: "那天下午，奶奶第一次教我包粽子。", bucket: "ji" },
          { id: "e3", label: "想起離開的老狗阿黃，我的心就隱隱作痛。", bucket: "shu" },
          { id: "e4", label: "啊，多麼希望時間能停在那個夏天！", bucket: "shu" },
          { id: "e5", label: "颱風是一種強烈的熱帶氣旋，中心附近風力最強。", bucket: "shuo" },
          { id: "e6", label: "使用滅火器時，要先拉插銷，再瞄準火源底部壓下握把。", bucket: "shuo" },
          { id: "e7", label: "閱讀能拓展視野，因此每個人都應該養成閱讀習慣。", bucket: "yi" },
          { id: "e8", label: "網路資訊未必正確，我們應該先查證再轉傳。", bucket: "yi" },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "段落重組：大隊接力",
        prompt: "這篇記敘文用**順敘**寫成，請依時間順序排好段落。",
        items: [
          { id: "o1", label: "國二那年的運動會，我被選為大隊接力的最後一棒。" },
          { id: "o2", label: "比賽前一週，我每天放學都留在操場練習交棒。" },
          { id: "o3", label: "比賽當天，前一棒在彎道跌倒，我們一下子落到最後。" },
          { id: "o4", label: "接過棒子的那一刻，我什麼也沒想，只是拚命往前衝。" },
          { id: "o5", label: "雖然最後只得到第三名，全班卻圍著我歡呼。" },
          { id: "o6", label: "那天我明白：盡全力的過程，比名次更值得驕傲。" },
        ],
      },
      {
        id: "a3",
        kind: "hotspot",
        title: "解剖一篇議論文",
        prompt: "點擊左側的熱點，看看一篇議論文的每個部分各在做什麼。",
        viewBox: "0 0 400 300",
        scene: articleScene,
        spots: [
          {
            id: "title",
            x: 40,
            y: 32,
            title: "標題",
            body: "標題點出**論題**（閱讀）和作者的立場方向（讓世界變大）。",
          },
          {
            id: "thesis",
            x: 40,
            y: 74,
            title: "論點",
            body: "開門見山提出**論點**：閱讀能讓我們看見更大的世界。整篇文章都在證明這句話。",
          },
          {
            id: "fact",
            x: 40,
            y: 120,
            title: "事實論據（舉例論證）",
            body: "用一個具體的**例子**支持論點：讀了天文書而愛上觀星。真實事例、數據都屬於事實論據。",
          },
          {
            id: "reason",
            x: 40,
            y: 166,
            title: "道理論據（引用論證）",
            body: "引用杜甫的名句「讀書破萬卷，下筆如有神」，用**公認的道理**增加說服力。",
          },
          {
            id: "contrast",
            x: 40,
            y: 212,
            title: "反面論證（對比）",
            body: "從**反面**說明不讀書的結果，和前面形成對比，讓論點更有力。",
          },
          {
            id: "conclusion",
            x: 40,
            y: 261,
            title: "結論",
            body: "總結全文、**呼應**開頭的論點，並向讀者提出呼籲。",
          },
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "畫出文章的骨架",
        task: "選一篇你最近讀過的課文，畫出它的架構心智筆記：中間寫篇名與主旨，向外畫出每一段的段落大意，再用箭頭標出段落之間的關係（例如：舉例、轉折、呼應）。",
        background: "dots",
        hint: "先找出主旨句（常在開頭或結尾），再用一句話寫出每段在說什麼。",
        reference:
          "一份好的架構筆記包含：**主旨**（中心）、**段落大意**（分支）、**段落關係**（箭頭）。例如：第一段提出主旨 → 第二、三段舉例說明 → 第四段轉折 → 第五段呼應開頭。",
        aiFeedback: true,
      },
      {
        id: "a-set",
        kind: "set",
        title: "素養題組：讀短文辨說明方法",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-rain-1"), q("set-rain-2"), q("set-rain-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("t1"), q("t2"), q("t3"), q("t4"), q("t5")],
      },
    ],
  },
  {
    id: "chinese.junior.classical-poetry",
    title: "古典詩詞：絕句、律詩與宋詞",
    grade: 8,
    minutes: 15,
    nodeIds: ["chinese.junior.lit-poetry", "chinese.junior.lit-ci"],
    objectives: [
      "能依句數與字數判斷五絕、七絕、五律、七律",
      "能說出律詩的四聯名稱、押韻與對仗規則",
      "能認識詞的特色與代表詞人",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：近體詩格式探測器",
        prompt:
          "拖動拉桿改變「每句字數」與「全詩句數」，找出四種近體詩，並觀察押韻字（黃色）與對仗聯（綠色）。",
        load: poetryLab,
        insight:
          "近體詩的格式很固定：**每句五字或七字**；**絕句四句、律詩八句**；偶數句押韻（首句可押可不押）；律詩的**頷聯、頸聯必須對仗**。",
      },
      {
        id: "a2",
        kind: "layers",
        title: "圖層疊加：拆解〈春望〉",
        prompt: "逐一打開圖層，看看一首五言律詩的「聯」、「韻腳」與「對仗」。",
        viewBox: "0 0 400 280",
        base: poemBase,
        layers: [
          {
            id: "lian",
            label: "四聯名稱",
            load: lianLayer,
            color: "#7c3aed",
            note: "律詩每兩句為一聯，依序為**首聯、頷聯、頸聯、尾聯**。",
          },
          {
            id: "rhyme",
            label: "韻腳",
            load: rhymeLayer,
            color: "#d97706",
            note: "偶數句末字押韻：深、心、金、簪。「簪」今讀ㄗㄢ，但在古代和其他三字同韻。首句末字「在」不入韻。",
          },
          {
            id: "dui",
            label: "對仗",
            load: duiLayer,
            color: "#059669",
            note: "頷聯、頸聯上下句**詞性相對**：感時／恨別、花／鳥、濺淚／驚心；烽火／家書、連／抵、三月／萬金。〈春望〉的首聯其實也對仗。",
          },
        ],
        check: {
          stem: "〈春望〉的韻腳是哪幾個字？",
          choices: ["深、心、金、簪", "在、淚、月、短", "國、感、烽、白"],
          answer: 0,
          explain: "近體詩偶數句押韻，〈春望〉第二、四、六、八句的末字是深、心、金、簪。",
        },
      },
      {
        id: "a3",
        kind: "scratch",
        title: "刮刮樂：詩與詞小常識",
        cards: [
          {
            front: "近體詩押韻有哪些規則？",
            back: "**偶數句押韻**（首句可押可不押）、押**平聲韻**、**一韻到底**不換韻。",
          },
          {
            front: "絕句常用哪四個字安排內容？",
            back: "**起、承、轉、合**：第一句起頭、第二句承接、第三句轉折、第四句收合。",
          },
          {
            front: "「詞」還有哪些別名？",
            back: "**長短句**（句子長短不一）、**詩餘**、**曲子詞**（原本配合音樂歌唱）。",
          },
          {
            front: "〈水調歌頭〉〈念奴嬌〉是詞的題目嗎？",
            back: "不是，它們是**詞牌**：規定曲調、字數、句數的格式名稱，內容不一定和詞牌有關。",
          },
          {
            front: "一首詞常分成兩段，叫做什麼？",
            back: "**上片、下片**（也稱上闋、下闋）。",
          },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：詩人與詞人",
        pairs: [
          ["李白", "詩仙"],
          ["杜甫", "詩聖"],
          ["王維", "詩佛"],
          ["孟浩然", "春眠不覺曉，處處聞啼鳥"],
          ["蘇軾", "但願人長久，千里共嬋娟"],
          ["李清照", "婉約派女詞人"],
        ],
      },
      {
        id: "a-set",
        kind: "set",
        title: "素養題組：讀詩判斷體裁與韻腳",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-poem-1"), q("set-poem-2"), q("set-poem-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("l1"), q("l2"), q("l3"), q("l10")],
      },
    ],
  },
  {
    id: "chinese.junior.classical-prose",
    title: "古文名篇：陋室、蓮花與五柳先生",
    grade: 8,
    minutes: 15,
    nodeIds: ["chinese.junior.lit-prose", "chinese.junior.c-spirit"],
    objectives: [
      "能逐句理解〈陋室銘〉開頭的文意與字詞",
      "能說出〈愛蓮說〉中菊、牡丹、蓮的象徵",
      "能體會〈五柳先生傳〉淡泊名利的人生態度",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "逐句拆解〈陋室銘〉",
        problem:
          "唐・劉禹錫〈陋室銘〉：「山不在高，有仙則名；水不在深，有龍則靈。斯是陋室，惟吾德馨。」",
        steps: [
          {
            show: "「山不在高，有仙則名」：山不在於高，有仙人住就會**出名**。",
            predict: {
              question: "「有仙則名」的「名」是什麼意思？",
              choices: ["名字", "出名、有名", "名聲很差"],
              answer: 1,
            },
            why: "「名」原是名詞，在這裡當動詞用，意思是「出名」。",
          },
          {
            show: "「水不在深，有龍則靈」：水不在於深，有龍就會顯得**神奇靈異**。",
            why: "上下兩句句式相同，是對偶。",
          },
          {
            show: "「斯是陋室」：**這**是一間簡陋的屋子。",
            predict: {
              question: "「斯是陋室」的「斯」是什麼意思？",
              choices: ["這", "撕開", "斯文"],
              answer: 0,
            },
          },
          {
            show: "「惟吾德馨」：只因為我的品德美好（使它充滿香氣）。",
            why: "「馨」是能傳得很遠的香氣，用來比喻德行美好。",
          },
          {
            show: "先寫山、水，再引出陋室：山因仙而名、水因龍而靈，**陋室因主人有德而不陋**。結尾引孔子「何陋之有？」點明主旨。",
            predict: {
              question: "作者先寫山和水，目的是什麼？",
              choices: ["介紹家附近的風景", "用類比引出「陋室不陋」", "炫耀自己見過仙人和龍"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "「銘」是刻在器物上，用來警惕自己或稱述功德的韻文，〈陋室銘〉多處押韻（名、靈、馨、青、丁、經、形、亭）。主旨：**居室簡陋不要緊，主人品德高潔才重要**。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "〈愛蓮說〉：三種花，三種人",
        prompt: "北宋周敦頤用三種花比喻三種人。把原文句子拖到對應的花。",
        buckets: [
          { id: "ju", label: "菊：隱逸者" },
          { id: "mu", label: "牡丹：富貴者" },
          { id: "lian", label: "蓮：君子" },
        ],
        items: [
          { id: "f1", label: "晉陶淵明獨愛", bucket: "ju" },
          { id: "f2", label: "花之隱逸者也", bucket: "ju" },
          { id: "f3", label: "自李唐來，世人甚愛", bucket: "mu" },
          { id: "f4", label: "宜乎眾矣", bucket: "mu" },
          { id: "f5", label: "出淤泥而不染", bucket: "lian" },
          { id: "f6", label: "中通外直，不蔓不枝", bucket: "lian" },
          { id: "f7", label: "可遠觀而不可褻玩焉", bucket: "lian" },
        ],
      },
      {
        id: "a3",
        kind: "scratch",
        title: "刮刮樂：文言字詞",
        prompt: "看原文猜意思，再刮開對答案。",
        cards: [
          {
            front: "〈陋室銘〉「無案牘之勞形」",
            back: "沒有官府公文來勞累身體。**案牘**：官府的公文。",
          },
          {
            front: "〈五柳先生傳〉「閑靜少言，不慕榮利」",
            back: "安靜少說話，**不羨慕**榮華與名利。",
          },
          {
            front: "〈五柳先生傳〉「每有會意，便欣然忘食」",
            back: "每當**領會**書中的意旨，就高興得忘了吃飯。",
          },
          {
            front: "〈五柳先生傳〉「簞瓢屢空，晏如也」",
            back: "盛飯的竹器、舀水的瓢**常常是空的**，他卻**安然自在**。",
          },
          {
            front: "〈愛蓮說〉「香遠益清」",
            back: "香氣傳得越遠，**更加**清香。**益**：更加。",
          },
        ],
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "配對：作品與作者",
        pairs: [
          { id: "p1", left: "〈陋室銘〉", right: "唐・劉禹錫" },
          { id: "p2", left: "〈愛蓮說〉", right: "北宋・周敦頤" },
          { id: "p3", left: "〈五柳先生傳〉", right: "東晉・陶淵明" },
          { id: "p4", left: "〈木蘭詩〉", right: "北朝民歌（作者不詳）" },
          { id: "p5", left: "《論語》", right: "孔子弟子及再傳弟子記錄" },
        ],
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "穿越時空：訪問陶淵明",
        scenarioId: "chinese.junior.s-tao-yuanming",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("l4"), q("l5"), q("l6"), q("l7"), q("l8")],
      },
    ],
  },
  {
    id: "chinese.junior.practical-writing",
    title: "應用文：書信、題辭與春聯",
    grade: 9,
    minutes: 14,
    nodeIds: ["chinese.junior.b-practical", "chinese.junior.c-social", "chinese.junior.c-material"],
    objectives: [
      "能依對象選用正確的書信用語",
      "能依場合選用合適的題辭",
      "能判斷對聯的上聯、下聯與張貼位置",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "match",
        title: "題辭配對：送對祝福",
        prompt: "把題辭拖到適用的場合。",
        pairs: [
          { id: "t1", left: "弄璋之喜", right: "恭賀生男" },
          { id: "t2", left: "弄瓦之喜", right: "恭賀生女" },
          { id: "t3", left: "百年好合", right: "恭賀新婚" },
          { id: "t4", left: "美輪美奐", right: "恭賀新居落成" },
          { id: "t5", left: "杏林春暖", right: "讚揚醫師" },
          { id: "t6", left: "春風化雨", right: "感謝師長" },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：寫一封信給國小老師",
        problem: "國中生林小明想寫信給國小導師王老師，報告上國中後的近況。信要怎麼寫才得體？",
        steps: [
          {
            show: "**稱謂＋提稱語**：「王老師道鑒：」",
            predict: {
              question: "寫給老師，提稱語應該用？",
              choices: ["膝下", "道鑒", "如晤"],
              answer: 1,
            },
            why: "「膝下」用於父母、「道鑒」用於師長、「如晤」用於晚輩。",
          },
          {
            show: "**開頭應酬語**：「國小畢業轉眼一年，常常想起您在課堂上說的故事。」",
            why: "先問候、寒暄，再進入正題。",
          },
          {
            show: "**正文**：報告近況——參加了合唱團、數學進步了、交到新朋友。",
            why: "正文要條理清楚，一段說一件事。",
          },
          {
            show: "**結尾應酬語**與**結尾敬辭**：「改天再回學校探望您。肅此」",
            why: "「肅此」是寫給長輩時的結尾敬辭。",
          },
          {
            show: "**申候語**：「敬請　教安」",
            predict: {
              question: "寫給老師的問候語應該用？",
              choices: ["敬請　教安", "順頌　時祺", "即問　近好"],
              answer: 0,
            },
            why: "「教安」用於教育界；「時祺」用於平輩；「近好」用於晚輩。",
          },
          {
            show: "**自稱、署名、末啟詞**與**日期**：「學生　林小明　敬上　○月○日」",
            why: "自稱要謙虛，末啟詞「敬上」表示恭敬。",
          },
        ],
        takeaway:
          "書信順序：**稱謂提稱語 → 開頭應酬語 → 正文 → 結尾應酬語與敬辭 → 申候語 → 署名末啟詞 → 日期**。用語要依「對象」選擇。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "上聯還是下聯？",
        prompt: "看每一句的**最後一個字**：仄聲（三、四聲）是上聯，平聲（一、二聲）是下聯。",
        buckets: [
          { id: "up", label: "上聯（末字仄聲）" },
          { id: "down", label: "下聯（末字平聲）" },
        ],
        items: [
          { id: "c1", label: "天增歲月人增壽", bucket: "up" },
          { id: "c2", label: "春滿乾坤福滿門", bucket: "down" },
          { id: "c3", label: "一元復始", bucket: "up" },
          { id: "c4", label: "萬象更新", bucket: "down" },
          { id: "c5", label: "爆竹一聲除舊", bucket: "up" },
          { id: "c6", label: "桃符萬戶更新", bucket: "down" },
          { id: "c7", label: "海闊憑魚躍", bucket: "up" },
          { id: "c8", label: "天高任鳥飛", bucket: "down" },
        ],
      },
      {
        id: "a4",
        kind: "hotspot",
        title: "春聯貼對了嗎？",
        prompt: "依照提示，在大門上找出春聯的每個部分。",
        viewBox: "0 0 400 300",
        scene: coupletScene,
        mode: "find",
        spots: [
          {
            id: "upper",
            x: 325,
            y: 180,
            title: "上聯",
            body: "面對大門時，**上聯貼在右邊**。「天增歲月人增壽」末字「壽」是仄聲。",
          },
          {
            id: "lower",
            x: 75,
            y: 180,
            title: "下聯",
            body: "**下聯貼在左邊**。「春滿乾坤福滿門」末字「門」是平聲。",
          },
          {
            id: "top",
            x: 292,
            y: 64,
            title: "橫批",
            body: "貼在門楣上方，用四個字**概括**整副對聯的主旨。",
          },
          {
            id: "square",
            x: 200,
            y: 180,
            title: "斗方",
            body: "貼在門上的菱形方紙，常寫「春」「福」等吉祥字。",
          },
        ],
      },
      {
        id: "a5",
        kind: "canvas",
        title: "設計我家的春聯",
        task: "畫出你家的大門，替它設計一副春聯：上聯、下聯字數相同、詞性相對，**上聯末字仄聲、下聯末字平聲**，再加上四個字的橫批。",
        background: "blank",
        hint: "可以從家人的願望出發，例如健康、學業、平安。記得上聯貼右、下聯貼左！",
        reference:
          "範例：上聯「書香滿室添新趣」（趣：仄），下聯「笑語盈門迎好春」（春：平），橫批「家和人安」。檢查：字數相同、詞性相對（書香／笑語、滿室／盈門）。",
        aiFeedback: true,
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p2"), q("p3"), q("p4"), q("p5")],
      },
    ],
  },
];

export default lessons;
