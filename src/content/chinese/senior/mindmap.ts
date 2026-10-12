import type { CurriculumNode } from "../../types";

/** 高中國文（108 課綱第五學習階段，部定必修）學習內容 */
const mindmap: CurriculumNode = {
  id: "chinese.senior",
  title: "高中國文",
  summary:
    "高中國文課文的文言文比例為 35%–45%，並有 15 篇核心古文推薦選文。學習重點：文言文閱讀、經典選文、中國文學史、國學常識，以及學測國寫的知性與情意寫作。",
  children: [
    {
      id: "chinese.senior.wenyan",
      title: "文言文閱讀",
      summary: "讀懂文言文的三把鑰匙：虛字、詞義變化、特殊句式。",
      children: [
        {
          id: "chinese.senior.wenyan-function",
          title: "文言虛字",
          grade: 10,
          summary:
            "虛字本身沒有實在意義，卻決定句子的語氣與關係。常見：之、而、以、其、於、乎、者、也。",
          keyPoints: [
            "之：代詞（他、它）、助詞（的）、動詞（往）、用在主語與謂語之間（無義）",
            "而：順承（然後）、轉折（卻）、修飾",
            "於：在、從、比、被",
            "其：他的、那、大概（表推測）、難道（表反問）",
          ],
          lessonIds: ["chinese.senior.function-words"],
        },
        {
          id: "chinese.senior.wenyan-ancient",
          title: "古今異義與詞類活用",
          grade: 10,
          summary: "同一個詞，古代和現代的意思可能不同；名詞、形容詞也可能臨時當動詞用。",
          keyPoints: [
            "「阡陌交通」：交錯相通（今義：運輸往來）",
            "「無論魏晉」：更不必說（今義：不管）",
            "「漁人甚異之」：以之為異，對它感到驚奇（意動用法）",
          ],
          lessonIds: ["chinese.senior.taohuayuan"],
        },
        {
          id: "chinese.senior.wenyan-syntax",
          title: "特殊句式",
          grade: 10,
          summary: "判斷句、倒裝句、被動句、省略句是文言文常見的特殊句式。",
          keyPoints: [
            "判斷句：「師者，所以傳道、受業、解惑也」（者……也）",
            "賓語前置：「句讀之不知，惑之不解」＝不知句讀，不解惑",
            "被動句：「不拘於時」＝不被時俗拘束",
          ],
          lessonIds: ["chinese.senior.function-words"],
        },
      ],
    },
    {
      id: "chinese.senior.classics",
      title: "核心古文 15 篇",
      summary: "108 課綱推薦的 15 篇文言選文，從先秦到清代，並包含臺灣古典散文。",
      children: [
        {
          id: "chinese.senior.classics-qinhan",
          title: "先秦兩漢",
          summary: "史傳與說理散文：善用說辭、刻畫人物。",
          children: [
            {
              id: "chinese.senior.zhuzhiwu",
              title: "〈燭之武退秦師〉",
              grade: 10,
              summary:
                "出自《左傳》。秦、晉圍鄭，燭之武夜縋出城，以「亡鄭無益於秦、存鄭有利於秦、晉國不可信」說服秦穆公退兵。",
              keyPoints: ["「越國以鄙遠，君知其難也」", "「東道主」一詞的由來"],
              lessonIds: ["chinese.senior.hongmen"],
            },
            {
              id: "chinese.senior.datong",
              title: "〈大同與小康〉",
              grade: 11,
              summary:
                "出自《禮記・禮運》。孔子描繪「天下為公」的大同世界，以及「天下為家」、以禮義為紀綱的小康社會。",
              keyPoints: ["「大道之行也，天下為公，選賢與能，講信修睦」"],
            },
            {
              id: "chinese.senior.zhuke",
              title: "〈諫逐客書〉",
              grade: 11,
              summary:
                "秦・李斯。秦王下令驅逐客卿，李斯上書，以秦國歷代任用客卿而強盛為例，說明逐客不利於秦，秦王因此撤銷逐客令。",
              keyPoints: ["「泰山不讓土壤，故能成其大；河海不擇細流，故能就其深」"],
            },
            {
              id: "chinese.senior.hongmenyan",
              title: "〈鴻門宴〉",
              grade: 11,
              summary:
                "出自西漢司馬遷《史記・項羽本紀》。范增欲殺劉邦，項伯、張良、樊噲相助，劉邦終得脫身，人物性格鮮明。",
              keyPoints: ["「項莊拔劍舞，其意常在沛公也」", "「人方為刀俎，我為魚肉」"],
              lessonIds: ["chinese.senior.hongmen"],
            },
          ],
        },
        {
          id: "chinese.senior.classics-tang",
          title: "三國至唐",
          summary: "奏議、記體與說體散文，以及唐代傳奇小說。",
          children: [
            {
              id: "chinese.senior.chushibiao",
              title: "〈出師表〉",
              grade: 11,
              summary:
                "三國蜀漢・諸葛亮。北伐前上表後主劉禪，勸他親賢遠佞、廣開言路，並自述受先帝三顧之恩的忠誠。",
              keyPoints: ["「親賢臣，遠小人，此先漢所以興隆也」"],
            },
            {
              id: "chinese.senior.taohuayuanji",
              title: "〈桃花源記〉",
              grade: 10,
              summary: "東晉・陶淵明。武陵漁人誤入與世隔絕的桃花源，寄託作者對理想社會的嚮往。",
              keyPoints: ["「土地平曠，屋舍儼然」", "「不足為外人道也」"],
              lessonIds: ["chinese.senior.taohuayuan"],
            },
            {
              id: "chinese.senior.shishuo",
              title: "〈師說〉",
              grade: 10,
              summary:
                "唐・韓愈，古文運動領袖。針對士大夫「恥學於師」的風氣，說明從師的重要，提出「師者，所以傳道、受業、解惑也」。",
              keyPoints: ["「聞道有先後，術業有專攻」", "寫給學生李蟠"],
              lessonIds: ["chinese.senior.function-words"],
            },
            {
              id: "chinese.senior.qiuran",
              title: "〈虯髯客傳〉",
              grade: 11,
              summary:
                "唐傳奇代表作，一般認為作者是杜光庭。描寫李靖、紅拂女、虯髯客「風塵三俠」；虯髯客見到李世民後，自知天下有歸，轉往海外發展。",
            },
          ],
        },
        {
          id: "chinese.senior.classics-songqing",
          title: "宋明清",
          summary: "文賦、小品文、抒情散文與文言小說。",
          children: [
            {
              id: "chinese.senior.chibifu",
              title: "〈赤壁賦〉",
              grade: 11,
              summary:
                "北宋・蘇軾。貶謫黃州時夜遊赤壁，藉主客問答，以水與月說明「變與不變」，展現曠達的人生觀。文體為文賦。",
              keyPoints: [
                "「逝者如斯，而未嘗往也；盈虛者如彼，而卒莫消長也」",
                "情感：樂 → 悲 → 喜",
              ],
              lessonIds: ["chinese.senior.chibi"],
            },
            {
              id: "chinese.senior.liuqiao",
              title: "〈晚遊六橋待月記〉",
              grade: 11,
              summary:
                "明・袁宏道，公安派代表，主張「獨抒性靈，不拘格套」。描寫西湖春景與月景之美。",
            },
            {
              id: "chinese.senior.xiangji",
              title: "〈項脊軒志〉",
              grade: 12,
              summary: "明・歸有光。藉書齋項脊軒的變遷，追憶母親、祖母與妻子，情感真摯動人。",
              keyPoints: ["「庭有枇杷樹，吾妻死之年所手植也，今已亭亭如蓋矣」"],
            },
            {
              id: "chinese.senior.laoshan",
              title: "〈勞山道士〉",
              grade: 10,
              summary:
                "清・蒲松齡《聊齋誌異》。王生上勞山學道卻怕吃苦，只學了穿牆術，回家炫耀時撞牆跌倒，諷刺好逸惡勞、投機取巧。",
            },
          ],
        },
        {
          id: "chinese.senior.classics-taiwan",
          title: "臺灣古典散文",
          summary: "清代至日治時期臺灣文人以文言寫下的土地與生活。",
          children: [
            {
              id: "chinese.senior.quanhe",
              title: "〈勸和論〉",
              grade: 11,
              summary:
                "清・鄭用錫（有「開臺進士」之稱）。針對臺灣的分類械鬥，勸勉不同族群和睦相處。",
            },
            {
              id: "chinese.senior.lugang",
              title: "〈鹿港乘桴記〉",
              grade: 12,
              summary:
                "洪繻（洪棄生），彰化鹿港人。文中寫鹿港港道淤淺、由盛轉衰，作者並批評日治時期的海關、鹽田等政策；也記與友人乘竹筏（桴）遊覽海濱的見聞，寄寓今昔盛衰之感。",
            },
            {
              id: "chinese.senior.huaju",
              title: "〈畫菊自序〉",
              grade: 12,
              summary:
                "張李德和，日治時期嘉義的女詩人、畫家，詩書畫兼擅。以駢文寫成，自述畫菊的緣由與志趣。",
            },
          ],
        },
      ],
    },
    {
      id: "chinese.senior.history",
      title: "中國文學史",
      summary:
        "王國維說「一代有一代之文學」：楚騷、漢賦、六朝駢文、唐詩、宋詞、元曲；到了明清，則以小說最為興盛。",
      lessonIds: ["chinese.senior.lit-history"],
      children: [
        {
          id: "chinese.senior.hist-preqin",
          title: "先秦：《詩經》與《楚辭》",
          summary:
            "《詩經》是中國第一部詩歌總集，收錄西周初年至春秋中葉的詩歌 305 篇，分風、雅、頌，以四言為主，寫實；《楚辭》以屈原作品為主，多用「兮」字，浪漫奔放。",
          keyPoints: [
            "《詩經》：北方文學、寫實；表現手法賦、比、興",
            "《楚辭》：南方文學、浪漫；代表作〈離騷〉",
          ],
          lessonIds: ["chinese.senior.lit-history"],
        },
        {
          id: "chinese.senior.hist-han",
          title: "兩漢：漢賦與樂府",
          summary:
            "漢賦鋪陳排比、辭藻華麗，如司馬相如〈子虛賦〉；漢武帝設立樂府採集民歌，樂府詩「感於哀樂，緣事而發」，長篇敘事詩〈孔雀東南飛〉是代表。",
        },
        {
          id: "chinese.senior.hist-weijin",
          title: "魏晉南北朝：詩歌與小說萌芽",
          summary:
            "陶淵明開創田園詩，謝靈運開創山水詩；駢文盛行；志人小說《世說新語》、志怪小說《搜神記》出現；北朝民歌〈木蘭詩〉。",
        },
        {
          id: "chinese.senior.hist-tang",
          title: "唐：詩歌高峰與古文運動",
          summary:
            "近體詩格律成熟。李白（詩仙）、杜甫（詩聖）、王維與孟浩然（山水田園）、高適與岑參（邊塞）；韓愈、柳宗元提倡古文運動，反對駢文；唐傳奇興起。",
          lessonIds: ["chinese.senior.lit-history"],
        },
        {
          id: "chinese.senior.hist-song",
          title: "宋：詞",
          summary:
            "詞又稱長短句，依詞牌填寫。婉約派以柳永、李清照為代表；豪放派以蘇軾、辛棄疾為代表。",
        },
        {
          id: "chinese.senior.hist-yuan",
          title: "元：曲",
          summary:
            "元曲包括散曲（小令、套數）與雜劇。元曲四大家：關漢卿、馬致遠、白樸、鄭光祖；關漢卿《竇娥冤》、馬致遠〈天淨沙・秋思〉。",
        },
        {
          id: "chinese.senior.hist-mingqing",
          title: "明清：小說",
          summary:
            "章回小說：《三國演義》（羅貫中）、《水滸傳》（施耐庵）、《西遊記》（吳承恩）、《紅樓夢》（曹雪芹）、《儒林外史》（吳敬梓）；文言短篇小說《聊齋誌異》（蒲松齡）。",
          lessonIds: ["chinese.senior.lit-history"],
        },
      ],
    },
    {
      id: "chinese.senior.sinology",
      title: "國學常識",
      summary: "認識漢字的造字與用字原則、古籍的分類，以及先秦諸子的思想。",
      children: [
        {
          id: "chinese.senior.sino-liushu",
          title: "六書",
          grade: 10,
          summary:
            "東漢許慎《說文解字》系統說明六書：象形、指事、會意、形聲是造字法，轉注、假借是用字法（清代戴震稱為「四體二用」）。",
          lessonIds: ["chinese.senior.lit-history"],
        },
        {
          id: "chinese.senior.sino-sibu",
          title: "經史子集四部",
          grade: 11,
          summary:
            "古籍四部分類：經（儒家經典）、史（史書）、子（諸子百家）、集（文學作品集）。《隋書・經籍志》正式以經史子集命名，清代《四庫全書》依此編排。",
          keyPoints: [
            "經：《論語》《孟子》《詩經》",
            "史：《史記》《漢書》",
            "子：《莊子》《韓非子》",
            "集：《楚辭》《昭明文選》",
          ],
          lessonIds: ["chinese.senior.lit-history"],
        },
        {
          id: "chinese.senior.sino-zhuzi",
          title: "先秦諸子",
          grade: 11,
          summary:
            "儒家（孔子、孟子、荀子）重仁義禮；道家（老子、莊子）主張自然無為；墨家（墨子）主張兼愛、非攻；法家（韓非集大成）重法、術、勢。",
          keyPoints: ["孟子主張性善，荀子主張性惡"],
        },
      ],
    },
    {
      id: "chinese.senior.writing",
      title: "寫作與學測國寫",
      summary: "學測國語文寫作能力測驗分為知性題與情意題，考驗統整判斷與感受抒發。",
      children: [
        {
          id: "chinese.senior.writ-zhixing",
          title: "知性統整",
          grade: 12,
          summary: "閱讀文章、圖表等資料，擷取重點、比較分析、統整判斷，提出有根據的觀點。",
          keyPoints: ["先整理資料重點，再提出自己的判斷", "觀點要有資料支持"],
          lessonIds: ["chinese.senior.essay-writing"],
        },
        {
          id: "chinese.senior.writ-qingyi",
          title: "情意抒發",
          grade: 12,
          summary: "從題目引導出發，結合自身經驗，具體描寫並抒發感受與體悟。",
          keyPoints: ["用具體的人、事、物、景承載情感", "結尾寫出成長或體悟"],
          lessonIds: ["chinese.senior.essay-writing"],
        },
        {
          id: "chinese.senior.writ-argument",
          title: "議論文寫作",
          grade: 12,
          summary: "審題 → 立論 → 選論據 → 安排論證 → 結論呼應。論點明確、論據充分、論證合理。",
          keyPoints: ["事實論據＋道理論據", "正反對照，讓論點更有說服力"],
          lessonIds: ["chinese.senior.essay-writing"],
        },
      ],
    },
  ],
};

export default mindmap;
