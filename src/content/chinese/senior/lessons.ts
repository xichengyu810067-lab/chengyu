import type { Lesson } from "../../types";

const taohuaScene = () => import("../scenes/TaohuayuanScene");
const hongmenScene = () => import("../scenes/HongmenScene");
const chibiBase = () => import("../scenes/chibiLayers").then((m) => ({ default: m.ChibiBase }));
const sceneryLayer = () =>
  import("../scenes/chibiLayers").then((m) => ({ default: m.SceneryLayer }));
const emotionLayer = () =>
  import("../scenes/chibiLayers").then((m) => ({ default: m.EmotionLayer }));
const philosophyLayer = () =>
  import("../scenes/chibiLayers").then((m) => ({ default: m.PhilosophyLayer }));
const timelineBase = () =>
  import("../scenes/historyLayers").then((m) => ({ default: m.TimelineBase }));
const dynastyLayer = () =>
  import("../scenes/historyLayers").then((m) => ({ default: m.DynastyLayer }));
const genreLayer = () => import("../scenes/historyLayers").then((m) => ({ default: m.GenreLayer }));
const authorLayer = () =>
  import("../scenes/historyLayers").then((m) => ({ default: m.AuthorLayer }));

const q = (s: string) => `chinese.senior.q-${s}`;

/* 〈赤壁賦〉月相拉桿：農曆初一為朔，約 29.5 天一循環 */
const lit = (d: number) => 50 * (1 - Math.cos((2 * Math.PI * (d - 1)) / 29.5));
function phaseName(d: number): string {
  if (d <= 1) return "朔（初一）";
  if (d <= 6) return "眉月";
  if (d <= 8) return "上弦月";
  if (d <= 14) return "盈凸月";
  if (d === 15) return "望（十五）";
  if (d === 16) return "既望（十六）";
  if (d <= 21) return "虧凸月";
  if (d <= 23) return "下弦月";
  if (d <= 29) return "殘月";
  return "晦（月底）";
}

const lessons: Lesson[] = [
  {
    id: "chinese.senior.function-words",
    title: "文言虛字解碼：之、而、以、其、於",
    grade: 10,
    minutes: 13,
    nodeIds: [
      "chinese.senior.wenyan-function",
      "chinese.senior.wenyan-syntax",
      "chinese.senior.shishuo",
    ],
    objectives: [
      "能辨別「之、而、以、其、於」在句中的常見用法",
      "能逐句翻譯〈師說〉開頭並說明判斷句的結構",
      "能利用上下文推敲虛字的意思",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：虛字百變",
        prompt: "先想想畫線字的意思，再刮開確認。",
        cards: [
          {
            front: "〈師說〉「吾從而**師之**」的「之」",
            back: "**代詞**：他（指那位聞道在先的人）。「師」是名詞當動詞，意思是「以……為師」。",
          },
          {
            front: "〈燭之武退秦師〉「越國**以**鄙遠」的「以」",
            back: "**連詞**：來、而。越過晉國來把遠方的鄭國當作邊境。",
          },
          {
            front: "〈師說〉「其可怪也歟」的「其」",
            back: "**語氣詞**：表示感嘆，可譯為「真是」——這真是奇怪啊！",
          },
          {
            front: "〈出師表〉「受任**於**敗軍之際」的「於」",
            back: "**介詞**：在。在軍隊潰敗的時候接受任命。",
          },
          {
            front: "〈師說〉「不拘**於**時」的「於」",
            back: "**介詞**：被，表示被動。不被當時的風氣所拘束。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "「之」字四種身分",
        prompt: "同一個「之」，在不同句子裡身分不同。把句子拖到對應的用法。",
        buckets: [
          { id: "pron", label: "代詞（他、它、此）" },
          { id: "de", label: "助詞（的）" },
          { id: "go", label: "動詞（往）" },
          { id: "none", label: "主謂之間（不譯）" },
        ],
        items: [
          { id: "z1", label: "吾從而師之", bucket: "pron" },
          { id: "z2", label: "漁人甚異之", bucket: "pron" },
          { id: "z3", label: "古之學者必有師", bucket: "de" },
          { id: "z4", label: "受任於敗軍之際", bucket: "de" },
          { id: "z5", label: "吾欲之南海", bucket: "go" },
          { id: "z6", label: "輟耕之壟上", bucket: "go" },
          { id: "z7", label: "臣之壯也，猶不如人", bucket: "none" },
          { id: "z8", label: "師道之不傳也久矣", bucket: "none" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "逐句翻譯〈師說〉",
        problem:
          "唐・韓愈〈師說〉：「古之學者必有師。師者，所以傳道、受業、解惑也。人非生而知之者，孰能無惑？」",
        steps: [
          {
            show: "「古之學者必有師」：古代求學的人一定有老師。",
            why: "「之」是助詞「的」；「學者」指求學的人，不是今天的專家學者（古今異義）。",
          },
          {
            show: "「師者，……也」：老師，是……的人。",
            predict: {
              question: "「者……也」的句式表示什麼？",
              choices: ["判斷", "疑問", "被動"],
              answer: 0,
            },
            why: "「……者，……也」是文言文最典型的**判斷句**。",
          },
          {
            show: "「所以傳道、受業、解惑」：**用來**傳授道理、傳授學業、解答疑惑的人。",
            predict: {
              question: "這裡的「所以」是什麼意思？",
              choices: ["因此", "用來……的（憑藉）", "所有"],
              answer: 1,
            },
            why: "文言的「所以」常表示憑藉或方法，和白話的「因此」不同；「受」通「授」。",
          },
          {
            show: "「人非生而知之者」：人不是一生下來就懂得道理的。",
            why: "「而」表順承，連接「生」和「知之」。",
          },
          {
            show: "「孰能無惑？」：誰能沒有疑惑呢？",
            predict: {
              question: "這句話的語氣是？",
              choices: ["真的在問「誰」", "反問：人人都有疑惑", "感嘆：疑惑真可怕"],
              answer: 1,
            },
            why: "「孰」是「誰」。用反問加強語氣：每個人都會有疑惑，所以需要老師。",
          },
        ],
        takeaway:
          "翻譯文言文三步驟：**認虛字**（之、而、所以）→ **辨句式**（者……也是判斷句）→ **通語氣**（反問句要說出真正的意思）。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "配對：虛字的意思",
        prompt: "把右邊的解釋拖到對應的句子旁（注意畫線虛字）。",
        pairs: [
          { id: "x1", left: "師不必賢**於**弟子", right: "比" },
          { id: "x2", left: "惑**而**不從師", right: "卻（表轉折）" },
          { id: "x3", left: "**其**皆出於此乎", right: "大概、恐怕" },
          { id: "x4", left: "竊**以為**過矣", right: "認為" },
          { id: "x5", left: "月出**於**東山之上", right: "從" },
        ],
      },
      {
        id: "a-set",
        kind: "set",
        title: "素養題組：〈師說〉節選",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-shishuo-1"), q("set-shishuo-2"), q("set-shishuo-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("f1"), q("f2"), q("f3"), q("f4"), q("f6"), q("f7")],
      },
    ],
  },
  {
    id: "chinese.senior.taohuayuan",
    title: "〈桃花源記〉：漁人的奇幻旅程",
    grade: 10,
    minutes: 13,
    nodeIds: ["chinese.senior.taohuayuanji", "chinese.senior.wenyan-ancient"],
    objectives: [
      "能依原文描述說出漁人進出桃花源的路線",
      "能理解「交通」「無論」等古今異義詞",
      "能說明桃花源寄託的理想社會",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "跟著漁人走一趟",
        prompt: "依照原文描述，在地圖上找出每一個地點。",
        viewBox: "0 0 400 300",
        scene: taohuaScene,
        mode: "find",
        spots: [
          {
            id: "boat",
            x: 56,
            y: 252,
            title: "緣溪行的漁船",
            body: "「晉太元中，武陵人捕魚為業。緣溪行，忘路之遠近。」漁人沿著溪水划船，忘了走了多遠。",
          },
          {
            id: "peach",
            x: 150,
            y: 208,
            title: "夾岸桃花林",
            body: "「忽逢桃花林，夾岸數百步，中無雜樹，芳草鮮美，落英繽紛。」美得不像人間，漁人「甚異之」。",
          },
          {
            id: "mouth",
            x: 244,
            y: 140,
            title: "山有小口，彷彿若有光",
            body: "「林盡水源，便得一山。山有小口，彷彿若有光。」「初極狹，纔通人；復行數十步，豁然開朗。」",
          },
          {
            id: "village",
            x: 334,
            y: 58,
            title: "屋舍儼然",
            body: "「土地平曠，屋舍儼然。」房屋整整齊齊，村人「黃髮垂髫，並怡然自樂」。",
          },
          {
            id: "field",
            x: 346,
            y: 105,
            title: "良田美池，阡陌交通",
            body: "「有良田、美池、桑竹之屬。阡陌交通，雞犬相聞。」田間小路縱橫交錯，到處聽得見雞鳴狗叫。",
          },
          {
            id: "city",
            x: 366,
            y: 262,
            title: "郡城（詣太守）",
            body: "「既出，得其船，便扶向路，處處誌之。及郡下，詣太守，說如此。」太守派人跟去，「遂迷，不復得路」。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "情節排序",
        prompt: "把〈桃花源記〉的情節依發生順序排好。",
        items: [
          { id: "p1", label: "漁人緣溪而行，忽逢桃花林" },
          { id: "p2", label: "林盡水源，從山口進入" },
          { id: "p3", label: "看見土地平曠、屋舍儼然" },
          { id: "p4", label: "村人設酒殺雞款待，自云先世避秦時亂" },
          { id: "p5", label: "辭去時，村人說「不足為外人道也」" },
          { id: "p6", label: "漁人處處誌之，回郡城報告太守" },
          { id: "p7", label: "太守派人尋找，迷路不得" },
          { id: "p8", label: "劉子驥欣然規往，未果，尋病終" },
        ],
      },
      {
        id: "a3",
        kind: "scratch",
        title: "刮刮樂：古今大不同",
        prompt: "這些詞今天也在用，但在〈桃花源記〉裡意思不一樣！",
        cards: [
          { front: "「落英繽紛」的「英」", back: "**花**。落花紛紛飄落。" },
          { front: "「屋舍儼然」的「儼然」", back: "**整齊的樣子**。今天多指「很像」。" },
          {
            front: "「阡陌交通」的「交通」",
            back: "**交錯相通**。今天指運輸往來。",
          },
          {
            front: "「黃髮垂髫」指誰？",
            back: "**老人與小孩**（借代）：老人頭髮變黃，小孩頭髮下垂。",
          },
          { front: "「便要還家」的「要」", back: "通「**邀**」，邀請。" },
          {
            front: "「無論魏晉」的「無論」",
            back: "**更不必說**。今天指「不管」。",
          },
          {
            front: "「後遂無問津者」的「問津」",
            back: "本指**詢問渡口**，引申為探訪、探求。",
          },
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "畫出桃花源路線圖",
        task: "根據原文，畫出漁人的路線：溪流 → 桃花林 → 山口 → 桃花源村落 → 回程做記號 → 郡城。在每個地點旁寫一句原文。",
        background: "blank",
        hint: "想一想：為什麼漁人「處處誌之」，太守派人去卻還是找不到？可以在圖上標出你的推理。",
        reference:
          "路線：緣溪行 → 夾岸桃花林 → 林盡水源，山有小口 → 豁然開朗的村落 → 處處誌之 → 詣太守 → 尋向所誌，遂迷。找不到的安排，暗示桃花源是**可遇不可求的理想世界**。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s8"), q("f8"), q("s14")],
      },
    ],
  },
  {
    id: "chinese.senior.hongmen",
    title: "說服與權謀：〈燭之武退秦師〉與〈鴻門宴〉",
    grade: 11,
    minutes: 15,
    nodeIds: [
      "chinese.senior.zhuzhiwu",
      "chinese.senior.hongmenyan",
      "chinese.senior.classics-qinhan",
    ],
    objectives: [
      "能分析燭之武說服秦穆公的論證步驟",
      "能從鴻門宴的座次看出人物的地位與關係",
      "能辨認核心古文中的名句出處",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "拆解燭之武的說服術",
        problem:
          "秦、晉聯軍包圍鄭國，年邁的燭之武夜裡用繩子縋出城，去見秦穆公。他只說了一段話，秦國就退兵了。他是怎麼辦到的？",
        steps: [
          {
            show: "**先示弱，站在對方的立場**：「秦、晉圍鄭，鄭既知亡矣。若亡鄭而有益於君，敢以煩執事。」",
            why: "不求饒，而是從「對秦有沒有好處」談起，讓秦穆公願意聽下去。",
          },
          {
            show: "**亡鄭對秦無益**：「越國以鄙遠，君知其難也，焉用亡鄭以陪鄰？鄰之厚，君之薄也。」",
            predict: {
              question: "燭之武說「越國以鄙遠，君知其難也」，是在提醒秦國什麼？",
              choices: ["鄭國軍隊很強大", "秦隔著晉國，很難管理遙遠的鄭地", "晉國會送土地給秦"],
              answer: 1,
            },
            why: "鄭國在晉國東邊，滅鄭只會讓鄰國晉更強，等於削弱秦。",
          },
          {
            show: "**存鄭對秦有利**：「若舍鄭以為東道主，行李之往來，共其乏困，君亦無所害。」",
            why: "留下鄭國，可以當秦國在東方的接待站——這就是「東道主」的由來。",
          },
          {
            show: "**晉國不可信**：「君嘗為晉君賜矣，許君焦、瑕，朝濟而夕設版焉。」",
            why: "舉晉君過去背約的例子：早上渡河回國，晚上就築牆防秦。",
          },
          {
            show: "**晉國貪得無厭，下一個就是秦**：「既東封鄭，又欲肆其西封，若不闕秦，將焉取之？」",
            predict: {
              question: "這一步主要訴諸秦穆公的哪一種心理？",
              choices: ["同情鄭國", "擔心自身安全", "想要結交朋友"],
              answer: 1,
            },
          },
          {
            show: "結果：「秦伯說，與鄭人盟」，並派兵替鄭國守城，自己撤軍回國。",
          },
        ],
        takeaway:
          "燭之武的說服順序：**站在對方立場 → 指出害處 → 提出好處 → 舉證對手不可信 → 點出潛在威脅**。全程只談「秦的利益」，這是說服的關鍵。",
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "鴻門宴座次大解密",
        prompt: "古代室內以「坐西朝東」（東嚮）為最尊貴的座位。點擊每個人物，看看座位透露了什麼。",
        viewBox: "0 0 400 300",
        scene: hongmenScene,
        spots: [
          {
            id: "xiangwang",
            x: 95,
            y: 112,
            title: "項王（項羽）：東嚮坐",
            body: "「項王、項伯東嚮坐」——坐在西側、面朝東，是最尊貴的位置，顯示項羽以主人和尊者自居。范增暗示他動手時，他「默然不應」。",
          },
          {
            id: "xiangbo",
            x: 95,
            y: 192,
            title: "項伯：東嚮坐",
            body: "項羽的叔父（季父），與張良交好。前一晚私下向張良通風報信；宴中也拔劍起舞，「常以身翼蔽沛公」。",
          },
          {
            id: "fanzeng",
            x: 190,
            y: 72,
            title: "范增（亞父）：南嚮坐",
            body: "被項羽尊為「亞父」，座位僅次於項羽。他多次「舉所佩玉玦以示之者三」，暗示項羽當機立斷殺劉邦。",
          },
          {
            id: "peigong",
            x: 190,
            y: 228,
            title: "沛公（劉邦）：北嚮坐",
            body: "身為賓客，座位卻比范增還低，可見劉邦當時處於弱勢，必須低聲下氣地謝罪。",
          },
          {
            id: "zhangliang",
            x: 300,
            y: 128,
            title: "張良：西嚮侍",
            body: "「侍」表示陪坐，地位最低。發現項莊舞劍時，他到軍門找樊噲：「今者項莊拔劍舞，其意常在沛公也。」",
          },
          {
            id: "xiangzhuang",
            x: 190,
            y: 150,
            title: "項莊舞劍",
            body: "范增要項莊以舞劍助興為名，伺機刺殺沛公。「項莊舞劍，意在沛公」後來成為成語，比喻表面上做一件事，真正目的另有所圖。",
          },
          {
            id: "fankuai",
            x: 300,
            y: 214,
            title: "樊噲：披帷西嚮立",
            body: "沛公的參乘（護衛）。帶劍擁盾闖入，「瞋目視項王，頭髮上指，目眥盡裂」，以一番話讓項羽無言以對。",
          },
        ],
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：鴻門宴人物",
        pairs: [
          ["范增", "三次舉玦，暗示動手"],
          ["項伯", "項羽叔父，暗中護劉邦"],
          ["樊噲", "沛公參乘，闖帳護主"],
          ["項莊", "拔劍起舞，意在沛公"],
          ["張良", "沛公謀士，西嚮侍坐"],
        ],
      },
      {
        id: "a4",
        kind: "drag",
        mode: "match",
        title: "名句出處配對",
        prompt: "這些名句都出自核心古文，把篇名拖到對應的句子旁。",
        pairs: [
          { id: "n1", left: "越國以鄙遠，君知其難也", right: "〈燭之武退秦師〉" },
          { id: "n2", left: "今者項莊拔劍舞，其意常在沛公也", right: "〈鴻門宴〉" },
          { id: "n3", left: "泰山不讓土壤，故能成其大", right: "〈諫逐客書〉" },
          { id: "n4", left: "親賢臣，遠小人，此先漢所以興隆也", right: "〈出師表〉" },
          { id: "n5", left: "大道之行也，天下為公", right: "〈大同與小康〉" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s1"), q("s2"), q("s3"), q("s4"), q("s5"), q("s7")],
      },
    ],
  },
  {
    id: "chinese.senior.chibi",
    title: "〈赤壁賦〉：變與不變的哲思",
    grade: 11,
    minutes: 15,
    nodeIds: ["chinese.senior.chibifu"],
    objectives: [
      "能說出〈赤壁賦〉樂、悲、喜的情感轉折",
      "能用水與月解釋「變與不變」",
      "能體會蘇軾面對逆境的曠達",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：景・情・理",
        prompt: "〈赤壁賦〉由景生情、由情入理。逐一打開圖層，看看三者怎麼交織。",
        viewBox: "0 0 400 300",
        base: chibiBase,
        layers: [
          {
            id: "jing",
            label: "景：清風明月",
            load: sceneryLayer,
            color: "#0891b2",
            on: true,
            note: "開頭寫清風、明月、江水，營造空靈的意境，「浩浩乎如馮虛御風」。",
          },
          {
            id: "qing",
            label: "情：樂 → 悲 → 喜",
            load: emotionLayer,
            color: "#e11d48",
            note: "泛舟飲酒而**樂**；客吹洞簫、感嘆人生短暫而**悲**；聽完蘇子的道理後「客喜而笑」轉為**喜**。",
          },
          {
            id: "li",
            label: "理：水與月",
            load: philosophyLayer,
            color: "#7c3aed",
            note: "蘇子就地取材，用眼前的水與月說明「變與不變」，化解客的悲傷。",
          },
        ],
        check: {
          stem: "〈赤壁賦〉全文情感的轉折順序是？",
          choices: ["樂 → 悲 → 喜", "悲 → 樂 → 喜", "喜 → 悲 → 樂"],
          answer: 0,
          explain: "泛舟之樂 → 客之悲（人生須臾）→ 蘇子開解後客喜而笑。",
        },
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：盈虛者如彼",
        prompt: "拖動農曆日期，觀察月亮「看得見的亮面」怎麼變化，而月球本身的大小有沒有改變。",
        params: [{ key: "d", label: "農曆日期", min: 1, max: 30, step: 1, init: 1, unit: "日" }],
        plot: {
          x: [1, 30],
          y: [0, 115],
          xLabel: "農曆日期",
          yLabel: "%",
          fns: [
            { label: "看得見的亮面（%）", color: "#d97706", f: (x) => lit(x) },
            { label: "月球本身大小（%）", color: "#7c3aed", f: () => 100 },
          ],
          points: (p) => [{ x: p.d, y: lit(p.d), label: phaseName(p.d) }],
          vlines: (p) => [{ x: p.d, color: "#94a3b8" }],
        },
        readouts: [
          { label: "月相", value: (p) => phaseName(p.d) },
          { label: "看得見的亮面", value: (p) => `約 ${Math.round(lit(p.d))}%` },
          { label: "月球本身", value: () => "大小不變" },
        ],
        goal: {
          text: "〈赤壁賦〉開頭寫「七月**既望**」。把日期拉到「既望」那一天。",
          test: (p) => p.d === 16,
        },
        insight:
          "「望」是農曆十五，「既望」是十六，月亮正圓。月亮看起來有盈有虛（**變**），但月球本身「卒莫消長」（**不變**）——這正是蘇軾說的「盈虛者如彼，而卒莫消長也」。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "客的悲嘆 vs. 蘇子的開解",
        prompt: "〈赤壁賦〉用主客問答展開。把句子分到說話的人。",
        buckets: [
          { id: "ke", label: "客：悲嘆人生" },
          { id: "su", label: "蘇子：曠達開解" },
        ],
        items: [
          { id: "k1", label: "寄蜉蝣於天地，渺滄海之一粟", bucket: "ke" },
          { id: "k2", label: "哀吾生之須臾，羨長江之無窮", bucket: "ke" },
          { id: "k3", label: "固一世之雄也，而今安在哉", bucket: "ke" },
          { id: "k4", label: "知不可乎驟得，託遺響於悲風", bucket: "ke" },
          { id: "k5", label: "逝者如斯，而未嘗往也", bucket: "su" },
          { id: "k6", label: "自其不變者而觀之，則物與我皆無盡也", bucket: "su" },
          { id: "k7", label: "苟非吾之所有，雖一毫而莫取", bucket: "su" },
          { id: "k8", label: "取之無禁，用之不竭", bucket: "su" },
        ],
      },
      {
        id: "a4",
        kind: "steps",
        title: "逐句讀懂「變與不變」",
        problem:
          "蘇子回答客：「蓋將自其變者而觀之，則天地曾不能以一瞬；自其不變者而觀之，則物與我皆無盡也，而又何羨乎？」",
        steps: [
          {
            show: "「自其變者而觀之」：從**變化**的角度來看。",
            why: "蘇子提出兩種觀看世界的角度，先談「變」。",
          },
          {
            show: "「則天地曾不能以一瞬」：那麼天地萬物**竟然**連一眨眼的時間都不能保持不變。",
            predict: {
              question: "「曾不能以一瞬」的「曾」是什麼意思？",
              choices: ["曾經", "竟然、簡直（加強語氣）", "增加"],
              answer: 1,
            },
          },
          {
            show: "「自其不變者而觀之，則物與我皆無盡也」：從**不變**的角度來看，萬物和我都是無窮無盡的。",
            why: "就像江水不斷流逝，長江卻始終存在。",
          },
          {
            show: "「而又何羨乎？」：那又何必羨慕（長江的無窮）呢？",
            predict: {
              question: "這句話的語氣是？",
              choices: ["真心發問", "反問：其實是說「不必羨慕」", "讚美長江"],
              answer: 1,
            },
            why: "回應客的「羨長江之無窮」：換個角度看，人生同樣無盡，不必羨慕。",
          },
        ],
        takeaway:
          "蘇軾的智慧：**同一件事，換個角度就有不同的意義**。他不否認人生短暫，而是用「不變」的眼光化解悲傷，再享受眼前「取之無禁，用之不竭」的清風明月。",
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：與蘇軾同遊赤壁",
        scenarioId: "chinese.senior.s-su-shi-chibi",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s10"), q("s11"), q("s13"), q("s12")],
      },
    ],
  },
  {
    id: "chinese.senior.lit-history",
    title: "文學史長河與國學常識",
    grade: 11,
    minutes: 15,
    nodeIds: ["chinese.senior.history", "chinese.senior.sino-liushu", "chinese.senior.sino-sibu"],
    objectives: [
      "能依時代排列中國主要文學體裁",
      "能說出各時代的代表作家與作品",
      "能說明六書與經史子集四部分類",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：文學史時間軸",
        prompt: "打開「文體」與「作家作品」圖層，看看每個朝代最具代表性的文學。",
        viewBox: "0 0 480 300",
        base: timelineBase,
        layers: [
          {
            id: "dynasty",
            label: "朝代",
            load: dynastyLayer,
            color: "#dc2626",
            on: true,
            note: "從先秦到明清，每個時代都有新的文學形式出現。",
          },
          {
            id: "genre",
            label: "代表文體",
            load: genreLayer,
            color: "#16a34a",
            note: "王國維：「一代有一代之文學」——楚騷、漢賦、六朝駢文、唐詩、宋詞、元曲。",
          },
          {
            id: "author",
            label: "代表作家作品",
            load: authorLayer,
            color: "#7c3aed",
            note: "屈原〈離騷〉是《楚辭》代表；李白、杜甫是唐詩雙峰；《紅樓夢》是章回小說的巔峰。",
          },
        ],
        check: {
          stem: "依照「一代有一代之文學」，下列配對何者正確？",
          choices: ["唐→詩、宋→詞、元→曲", "唐→詞、宋→曲、元→詩", "漢→詩、唐→賦、宋→曲"],
          answer: 0,
          explain: "漢賦、唐詩、宋詞、元曲，各是那個時代最具代表性的文學。",
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "文體接力賽",
        prompt: "依照興盛的時代，把文學體裁由早到晚排好。",
        items: [
          { id: "g1", label: "《詩經》" },
          { id: "g2", label: "《楚辭》" },
          { id: "g3", label: "漢賦" },
          { id: "g4", label: "唐詩" },
          { id: "g5", label: "宋詞" },
          { id: "g6", label: "元曲" },
          { id: "g7", label: "明清章回小說" },
        ],
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：作品與作者",
        pairs: [
          ["〈離騷〉", "屈原"],
          ["《史記》", "司馬遷"],
          ["《竇娥冤》", "關漢卿"],
          ["〈天淨沙・秋思〉", "馬致遠"],
          ["《紅樓夢》", "曹雪芹"],
          ["《聊齋誌異》", "蒲松齡"],
        ],
      },
      {
        id: "a4",
        kind: "drag",
        mode: "categorize",
        title: "圖書館分類員：經史子集",
        prompt: "古代把書分成經、史、子、集四部。把每本書放進正確的書櫃。",
        buckets: [
          { id: "jing", label: "經：儒家經典" },
          { id: "shi", label: "史：史書" },
          { id: "zi", label: "子：諸子百家" },
          { id: "ji", label: "集：文學作品集" },
        ],
        items: [
          { id: "b1", label: "《論語》", bucket: "jing" },
          { id: "b2", label: "《詩經》", bucket: "jing" },
          { id: "b3", label: "《史記》", bucket: "shi" },
          { id: "b4", label: "《資治通鑑》", bucket: "shi" },
          { id: "b5", label: "《莊子》", bucket: "zi" },
          { id: "b6", label: "《韓非子》", bucket: "zi" },
          { id: "b7", label: "《楚辭》", bucket: "ji" },
          { id: "b8", label: "《昭明文選》", bucket: "ji" },
        ],
      },
      {
        id: "a5",
        kind: "scratch",
        title: "刮刮樂：許慎說六書",
        prompt: "東漢許慎《說文解字・敘》為六書下了定義。先猜是哪一書，再刮開。",
        cards: [
          { front: "「畫成其物，隨體詰詘」，日、月是也", back: "**象形**：照物體的形狀畫出來。" },
          { front: "「視而可識，察而見意」，上、下是也", back: "**指事**：用符號表示抽象概念。" },
          { front: "「比類合誼，以見指撝」，武、信是也", back: "**會意**：合併字義表示新義。" },
          { front: "「以事為名，取譬相成」，江、河是也", back: "**形聲**：形符表意、聲符表音。" },
          { front: "「建類一首，同意相受」，考、老是也", back: "**轉注**：意義相同的字互相解釋。" },
          { front: "「本無其字，依聲託事」，令、長是也", back: "**假借**：借用同音字表示新義。" },
        ],
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("h1"), q("h2"), q("h4"), q("h5"), q("g1"), q("g3")],
      },
    ],
  },
  {
    id: "chinese.senior.essay-writing",
    title: "學測國寫：知性統整與情意抒發",
    grade: 12,
    minutes: 14,
    nodeIds: [
      "chinese.senior.writ-zhixing",
      "chinese.senior.writ-qingyi",
      "chinese.senior.writ-argument",
    ],
    objectives: [
      "能分辨知性題與情意題的寫作要求",
      "能依步驟規劃一篇議論文",
      "能安排論點、論據與結論的順序",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "這題要考什麼？",
        prompt: "判斷每個寫作任務屬於知性題還是情意題。",
        buckets: [
          { id: "zhi", label: "知性題：統整判斷" },
          { id: "qing", label: "情意題：感受抒發" },
        ],
        items: [
          { id: "t1", label: "比較兩則手機使用時間的統計，分析差異並提出看法", bucket: "zhi" },
          {
            id: "t2",
            label: "評估兩位作者對「城市綠地」的主張，判斷何者較有說服力",
            bucket: "zhi",
          },
          { id: "t3", label: "根據圖表說明近十年閱讀習慣的變化，並推論可能原因", bucket: "zhi" },
          { id: "t4", label: "評估學校是否應禁用一次性餐具，並提出理由", bucket: "zhi" },
          { id: "t5", label: "以「窗」為題，寫一段觸動你的生活經驗與感受", bucket: "qing" },
          { id: "t6", label: "描寫一個讓你感到安心的角落，並說明它對你的意義", bucket: "qing" },
          { id: "t7", label: "從一則祖孫相處的短文出發，抒發你對家人的體會", bucket: "qing" },
          { id: "t8", label: "寫一次你從失落中重新站起來的經驗", bucket: "qing" },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "議論文規劃五步驟",
        problem: "題目：「挫折是成長的養分嗎？」請規劃一篇議論文。",
        steps: [
          {
            show: "**審題**：圈出關鍵詞「挫折」「成長」「養分」，確認題目要你表明立場並說理。",
            predict: {
              question: "拿到題目，第一步應該做什麼？",
              choices: ["立刻開始寫", "圈出關鍵詞、確認題目要求", "先想一個漂亮的結尾"],
              answer: 1,
            },
          },
          {
            show: "**立論**：提出明確的論點，例如「挫折本身不是養分，從挫折中反省才是」。",
            why: "好的論點要清楚、有自己的見解，而且可以被證明。",
          },
          {
            show: "**選論據**：事實論據（自己或他人的經驗）＋道理論據（如《孟子》「生於憂患而死於安樂」）。",
            predict: {
              question: "引用《孟子》「生於憂患而死於安樂」屬於哪一種論據？",
              choices: ["事實論據", "道理論據", "數據論據"],
              answer: 1,
            },
          },
          {
            show: "**安排結構**：開頭提出論點 → 正面舉例 → 反面對照 → 結論呼應。",
            why: "正反對照能預先回應反方意見，讓論證更周延。",
          },
          {
            show: "**結論**：總結論點、呼應題目，並提出具體的行動或期許。",
          },
        ],
        takeaway:
          "議論文＝**論點明確 ＋ 論據充分 ＋ 論證合理**。先規劃再下筆，才不會寫到一半離題。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "段落排序：一篇議論文",
        prompt: "把這篇議論文的段落排成合理的順序。",
        items: [
          { id: "o1", label: "挫折本身不會讓人成長，真正讓人成長的，是面對挫折後的反省。" },
          {
            id: "o2",
            label: "籃球員投失關鍵球後，若能回看影片、調整姿勢，下一次出手就更有把握。",
          },
          { id: "o3", label: "孟子說「生於憂患而死於安樂」，正說明困境能激發人的潛能。" },
          { id: "o4", label: "反之，若只會抱怨運氣不好、不願面對錯誤，同樣的挫折只會一再重演。" },
          { id: "o5", label: "因此，與其害怕挫折，不如學會問自己：我能從中學到什麼？" },
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "國寫構思圖",
        task: "以「我們需要留白嗎？」為題，畫出你的議論文構思圖：中心寫論點，向外畫出 2 個論據（1 個事實、1 個道理）、1 個反方觀點與你的回應，最後寫出結論。",
        background: "dots",
        hint: "「留白」可以是時間的留白、畫面的留白、人際關係的留白……先決定你要談哪一種。",
        reference:
          "範例：論點「適度留白，才能看見重要的事」→ 事實論據：考前停止熬夜反而表現更好 → 道理論據：中國畫講究留白，空白處引人想像 → 反方：「留白是浪費時間」→ 回應：留白不是空轉，而是整理與沉澱 → 結論：替生活保留一點空白。",
        aiFeedback: true,
      },
      {
        id: "a-set",
        kind: "set",
        title: "素養題組：讀表格做統整判斷",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-reading-1"), q("set-reading-2"), q("set-reading-3")],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w1"), q("w2"), q("w3"), q("w4")],
      },
    ],
  },
];

export default lessons;
