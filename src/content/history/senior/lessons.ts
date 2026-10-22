import type { Lesson } from "../../types";

const timelineLab = () => import("../labs/TimelineScrubberLab");
const landDeedScene = () => import("../scenes/LandDeedScene");
const taiwanBase = () =>
  import("../scenes/settlementLayers").then((m) => ({ default: m.TaiwanBase }));
const earlyQing = () =>
  import("../scenes/settlementLayers").then((m) => ({ default: m.EarlyQing }));
const western = () => import("../scenes/settlementLayers").then((m) => ({ default: m.Western }));
const northEast = () =>
  import("../scenes/settlementLayers").then((m) => ({ default: m.NorthEast }));
const eastCoast = () =>
  import("../scenes/settlementLayers").then((m) => ({ default: m.EastCoast }));
const boundary = () => import("../scenes/settlementLayers").then((m) => ({ default: m.Boundary }));

const q = (s: string) => `history.senior.q-${s}`;
const n = (s: string) => `history.senior.${s}`;

/** 米糖相剋教學模型（數值為示意）：每甲收益 */
const riceProfit = (rice: number) => (6 * rice) / 5 - 60;
const caneProfit = (cane: number) => cane - 20;

const lessons: Lesson[] = [
  {
    id: n("source-inquiry"),
    title: "像史家一樣思考：史料判讀與歷史解釋",
    grade: 11,
    minutes: 14,
    nodeIds: [n("basics-sources"), n("basics-interpretation"), n("inquiry"), n("inq-steps")],
    objectives: [
      "能區分史實陳述與歷史解釋",
      "能從來源、時間、目的判讀史料的價值與限制",
      "能比對不同立場的史料，提出有證據的解釋",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：史學關鍵詞",
        prompt: "先試著用自己的話解釋，再刮開核對。",
        cards: [
          {
            front: "一手史料 vs 二手研究",
            back: "一手史料是同時代留下的日記、公文、照片、契約；二手研究是後人根據史料寫成的著作。",
          },
          {
            front: "時代錯置",
            back: "用後來的觀念或標準理解過去，例如責怪清代人「沒有環保意識」。",
          },
          {
            front: "後見之明",
            back: "知道結果後，就認為事情「本來就注定如此」，忽略當時人面對的不確定性。",
          },
          {
            front: "沉默的聲音",
            back: "史料中較少留下紀錄的人群，如女性、底層、原住民族；可用口述歷史、考古等方法補足。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "史實陳述還是歷史解釋？",
        prompt:
          "史實陳述可以直接查證；歷史解釋是對原因、動機、意義的判斷，需要證據支持，也可能有不同看法。",
        buckets: [
          { id: "fact", label: "史實陳述" },
          { id: "interp", label: "歷史解釋" },
        ],
        items: [
          { id: "f1", label: "1624 年荷蘭東印度公司在大員建立據點", bucket: "fact" },
          { id: "f2", label: "1895 年清帝國與日本簽訂馬關條約", bucket: "fact" },
          { id: "f3", label: "1908 年縱貫鐵路全線通車", bucket: "fact" },
          { id: "f4", label: "1987 年政府宣布解除戒嚴", bucket: "fact" },
          { id: "i1", label: "荷蘭人來臺，主要是想取得對中國、日本貿易的轉運站", bucket: "interp" },
          { id: "i2", label: "日治時期的鐵路建設，主要服務殖民統治的需要", bucket: "interp" },
          { id: "i3", label: "開港通商是臺灣經濟重心北移的關鍵原因", bucket: "interp" },
          { id: "i4", label: "解嚴是國內外壓力共同促成的結果", bucket: "interp" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：比對兩則霧社事件史料",
        problem:
          "關於 1930 年的霧社事件，有兩類說法：\n- **史料甲**：事件後殖民官方的報告，把事件描述為原住民的暴亂，著重記載軍警如何「討伐」。\n- **史料乙**：數十年後賽德克族人的口述，提到長期被迫勞役、工資被剋扣、傳統文化受壓制，以及與日本警察的衝突。\n\n請一步步判讀這兩則史料。",
        steps: [
          {
            show: "**來源**：甲是殖民政府的官方紀錄；乙是賽德克族後代的口述歷史。",
            predict: {
              question: "哪一則史料是由事件中「統治者」一方產生的？",
              choices: ["史料甲", "史料乙", "兩者都是"],
              answer: 0,
            },
          },
          {
            show: "**時間**：甲在事件後不久寫成，細節較多；乙相隔數十年，可能受記憶與後來的詮釋影響，但保留了官方紀錄缺少的族人觀點。",
            why: "時間接近不代表一定正確；時間較遠也不代表沒有價值。",
          },
          {
            show: "**目的與立場**：官方報告需要說明鎮壓的正當性，可能淡化統治本身的問題；口述歷史則可能強調族人受到的壓迫與抵抗的意義。",
            predict: {
              question: "官方報告最可能淡化的是什麼？",
              choices: ["軍警討伐的過程", "殖民統治造成的不滿", "事件發生的地點"],
              answer: 1,
            },
          },
          {
            show: "**交叉比對**：兩者都證實事件發生並遭到鎮壓；對「原因」的說法不同，需要再找其他史料（當時的報紙、日記、後來的調查研究）互相印證。",
          },
          {
            show: "**形成解釋**：較完整的解釋可能是——長期的勞役、文化壓制與衝突累積了不滿，最終爆發武力抗爭。",
            why: "解釋要有證據支持，並交代不同觀點與史料的限制。",
          },
        ],
        takeaway:
          "判讀史料四問：**誰寫的？何時寫？為什麼寫？可信嗎？** 再用多則不同立場的史料交叉比對，才能提出有根據的歷史解釋。",
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：三份資料看開墾",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-frontier-1"), q("set-frontier-2"), q("set-frontier-3")],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("s1"), q("s2"), q("s3"), q("s4"), q("s5")],
      },
    ],
  },
  {
    id: n("ethnic-society"),
    title: "多元族群社會的形成：清帝國時期的移墾",
    grade: 10,
    minutes: 15,
    nodeIds: [n("tw-ethnic"), n("tw-ethnic-migration"), n("tw-ethnic-land")],
    objectives: [
      "能說出清帝國時期漢人移墾範圍擴展的大致方向",
      "能從土地契約讀出族群互動與土地制度的線索",
      "能從漢人移民與平埔族群兩種角度理解移墾",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：漢人移墾範圍的擴展",
        prompt: "依時間順序打開圖層，觀察漢人移墾範圍如何擴大，以及番界的位置。",
        viewBox: "0 0 300 400",
        base: taiwanBase,
        layers: [
          {
            id: "early",
            label: "17 世紀末：府城周邊",
            load: earlyQing,
            color: "#dc2626",
            on: true,
            note: "1684 年設一府三縣，漢人主要聚居在臺南府城附近的西南部平原。",
          },
          {
            id: "west",
            label: "18 世紀：西部平原",
            load: western,
            color: "#ea580c",
            note: "移民大量湧入，開墾範圍向北擴展到中部、北部平原，以及南部的屏東平原；1723 年增設彰化縣與淡水廳。",
          },
          {
            id: "border",
            label: "番界（土牛溝）",
            load: boundary,
            color: "#1e293b",
            note: "18 世紀中葉清廷劃定番界，部分地段挖溝堆土（土牛溝），區隔漢人與原住民族。但越界開墾的情形仍常見。",
          },
          {
            id: "ne",
            label: "19 世紀前期：噶瑪蘭與埔里",
            load: northEast,
            color: "#7c3aed",
            note: "吳沙等人入墾蘭陽平原，1812 年設噶瑪蘭廳；中部平埔族群則在 19 世紀前期陸續遷入埔里盆地。",
          },
          {
            id: "east",
            label: "1875 年後：後山",
            load: eastCoast,
            color: "#059669",
            note: "牡丹社事件後，清廷推動開山撫番、解除渡臺禁令，國家力量與移民進入花東地區。",
          },
        ],
        check: {
          stem: "依時間打開圖層後，漢人移墾範圍大致呈現什麼趨勢？",
          choices: ["由南而北、由西而東", "由北而南、由東而西", "從山區逐漸移向海岸"],
          answer: 0,
          explain:
            "漢人移墾大致從西南部的府城一帶向北擴展到西部平原，再越過山區或沿海進入宜蘭、花東。對原住民族而言，這也是土地逐漸流失的過程。",
        },
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "熱區探索：讀一張清代土地契約",
        prompt:
          "這是一張依清代常見格式製作的**示意契約**（直書，由右至左讀）。點擊熱點，看看契約裡藏了哪些歷史線索。",
        viewBox: "0 0 480 320",
        scene: landDeedScene,
        spots: [
          {
            id: "title",
            x: 456,
            y: 62,
            title: "契約名稱與立契人",
            body: "「杜賣盡根」表示賣斷、不能再贖回；立契人林德是賣方，土地是「承父遺下」，說明了產權來源。",
          },
          {
            id: "bounds",
            x: 368,
            y: 206,
            title: "四至",
            body: "用東、西、南、北的地標（溪、大路、鄰田、圳岸）界定土地範圍，也是重建當時地景的好線索。",
          },
          {
            id: "price",
            x: 305,
            y: 276,
            title: "價金",
            body: "「佛銀」是當時流通的外國銀元，「大員」在這裡是銀元的計量單位。比較各地契約的價格，可以研究地價變化。",
          },
          {
            id: "dazu",
            x: 280,
            y: 24,
            title: "番大租",
            body: "這塊地每年仍要向番社繳納「番大租」，表示土地原屬平埔族群，漢人承墾後須繳租。契約因此成為研究**族群土地關係**的重要史料。",
          },
          {
            id: "formula",
            x: 243,
            y: 262,
            title: "固定套語",
            body: "「二比甘願，各無反悔」「口恐無憑，立契為照」是契約常見格式，強調雙方自願與契約的效力。",
          },
          {
            id: "witnesses",
            x: 172,
            y: 156,
            title: "中人、代筆人與知見人",
            body: "中人居間說合；代筆人代為書寫（不少立契人不識字）；知見人常是家屬，表示家族同意這筆交易。",
          },
          {
            id: "date",
            x: 110,
            y: 194,
            title: "年號紀年",
            body: "光緒元年是 1875 年，所以「光緒拾年」是西元 **1884 年**。",
          },
          {
            id: "seal",
            x: 70,
            y: 282,
            title: "印記",
            body: "立契人蓋章或按指印表示同意。印記、紙張與筆跡，都是判斷契約真偽的線索。",
          },
        ],
      },
      {
        id: "a3",
        kind: "dialogue",
        title: "情境對話：與清代移民聊開墾",
        scenarioId: "history.senior.s-qing-settler",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("t1"), q("t2"), q("t3"), q("t4"), q("t5")],
      },
    ],
  },
  {
    id: n("economy"),
    title: "經濟與文化的多樣性：從米糖到科技島",
    grade: 10,
    minutes: 14,
    nodeIds: [n("tw-economy"), n("tw-econ-colonial"), n("tw-econ-postwar")],
    objectives: [
      "能用簡化模型說明日治時期的「米糖相剋」",
      "能說出戰後臺灣經濟發展的主要階段與背景",
      "能以時間軸整理臺灣經濟的轉變",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿模型：米糖相剋",
        prompt:
          "這是**簡化的教學模型**（數值為示意）：農民比較種稻與種甘蔗的每甲收益，選擇較有利的作物。綠線是種稻收益（隨米價變化），橘線是種蔗收益（由製糖會社的收購價決定）。",
        params: [
          { key: "rice", label: "米價（示意指數）", min: 60, max: 150, step: 5, init: 100 },
          { key: "cane", label: "甘蔗收購價（示意指數）", min: 60, max: 150, step: 5, init: 70 },
        ],
        plot: {
          x: [60, 150],
          y: [0, 140],
          xLabel: "米價（示意指數）",
          yLabel: "每甲收益（示意）",
          fns: [
            { label: "種稻收益", color: "#16a34a", f: (x) => riceProfit(x) },
            { label: "種蔗收益", color: "#d97706", f: (_x, p) => caneProfit(p.cane) },
          ],
          vlines: (p) => [{ x: p.rice, label: "目前米價", color: "#64748b" }],
          points: (p) => [
            { x: p.rice, y: riceProfit(p.rice), label: "稻", color: "#16a34a" },
            { x: p.rice, y: caneProfit(p.cane), label: "蔗", color: "#d97706" },
          ],
        },
        readouts: [
          { label: "種稻每甲收益", value: (p) => String(riceProfit(p.rice)) },
          { label: "種蔗每甲收益", value: (p) => String(caneProfit(p.cane)) },
          {
            label: "農民傾向",
            value: (p) => {
              const d = riceProfit(p.rice) - caneProfit(p.cane);
              return d > 5 ? "改種稻米" : d < -5 ? "種甘蔗" : "兩者差不多";
            },
          },
          {
            label: "製糖會社的原料",
            value: (p) =>
              caneProfit(p.cane) >= riceProfit(p.rice) ? "甘蔗供應充足" : "甘蔗不足（米糖相剋）",
          },
        ],
        goal: {
          text: "1920 年代蓬萊米熱銷：先把**米價調到 130 以上**；再扮演製糖會社，調整甘蔗收購價，讓種蔗收益**不低於**種稻。",
          test: (p) => p.rice >= 130 && caneProfit(p.cane) >= riceProfit(p.rice),
        },
        insight:
          "米價上漲時，農民傾向改種稻米，糖廠收不到足夠甘蔗，這就是**米糖相剋**。製糖會社因此參照米價調整甘蔗收購價格（米價比準法）。農民的選擇、會社的利潤與總督府的政策，在殖民地經濟中互相牽動。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：戰後經濟的四個階段",
        problem: "戰後臺灣如何從農業社會走向工業化與高科技產業？依時間拆解每一步的政策與背景。",
        steps: [
          {
            show: "**1950 年代：穩定與進口替代**——土地改革提高農業生產，美援提供物資與資金；政府限制進口，扶植紡織等民生工業。",
            predict: {
              question: "發展民生工業時，政府為什麼要限制外國商品進口？",
              choices: ["保護剛起步的本地產業", "因為外國不願意出口", "為了發展觀光"],
              answer: 0,
            },
          },
          {
            show: "**1960 年代：出口擴張**——頒布獎勵投資條例，1966 年設立高雄加工出口區，吸引外資加工出口。",
            predict: {
              question: "加工出口區吸引外資，主要利用臺灣的什麼條件？",
              choices: ["充沛且相對低廉的勞動力", "豐富的石油", "廣大的國內市場"],
              answer: 0,
            },
          },
          {
            show: "**1970 年代：十大建設與重化工業**——面對石油危機與外交挫折，推動交通、港口、鋼鐵、石化與核能等建設。",
          },
          {
            show: "**1980 年代以後：高科技產業**——1980 年設立新竹科學園區，半導體與電子資訊產業逐漸成為經濟主力。",
          },
          {
            show: "**代價與反思**——快速工業化也帶來環境污染、勞動條件與城鄉差距等問題，1980 年代環保運動與勞工運動隨之興起。",
          },
        ],
        takeaway:
          "戰後經濟大致是 **進口替代 → 出口擴張 → 重化工業 → 高科技產業**，每一步都與國內外情勢密切相關。",
      },
      {
        id: "a3",
        kind: "canvas",
        title: "動手畫：臺灣經濟發展時間軸",
        task: "畫一條由左到右的時間軸（1900–2010），標出至少五個臺灣經濟發展的關鍵事件，並在每個事件旁寫一句它的影響。",
        background: "grid",
        hint: "可以從日治時期的米糖經濟開始，經過土地改革、加工出口區、十大建設，到科學園區與加入世界貿易組織。",
        reference:
          "- 1920 年代：蓬萊米外銷、米糖相剋\n- 1930 年：嘉南大圳完工，擴大灌溉面積\n- 1953 年：耕者有其田，自耕農增加\n- 1966 年：高雄加工出口區，出口擴張\n- 1974–1979 年：十大建設，奠定重化工業基礎\n- 1980 年：新竹科學園區，邁向高科技產業\n- 2002 年：加入世界貿易組織，更深入全球市場",
        aiFeedback: true,
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：出口品比重的變化",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-export-1"), q("set-export-2"), q("set-export-3")],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c3"), q("c4"), q("c6")],
      },
    ],
  },
  {
    id: n("modern-state"),
    title: "現代國家的形塑：從殖民統治到民主化",
    grade: 10,
    minutes: 12,
    nodeIds: [n("tw-state"), n("tw-state-colonial"), n("tw-state-democracy")],
    objectives: [
      "能區分日治時期三個階段的統治方針",
      "認識 1920 年代臺灣人的政治社會運動",
      "能依序排列戰後臺灣走向民主化的重要事件",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "日治時期統治方針分類",
        prompt: "把各項措施歸入正確的統治階段。",
        buckets: [
          { id: "early", label: "特別統治（1895–1919）" },
          { id: "assim", label: "同化政策（1919–1937）" },
          { id: "kominka", label: "皇民化運動（1937–1945）" },
        ],
        items: [
          { id: "e1", label: "六三法授權總督發布律令", bucket: "early" },
          { id: "e2", label: "實施保甲制度", bucket: "early" },
          { id: "e3", label: "進行土地調查與舊慣調查", bucket: "early" },
          { id: "a1", label: "首任文官總督田健治郎上任", bucket: "assim" },
          { id: "a2", label: "推行「內地延長主義」", bucket: "assim" },
          { id: "a3", label: "1922 年新臺灣教育令，中等以上學校日臺共學", bucket: "assim" },
          { id: "k1", label: "推動「國語家庭」", bucket: "kominka" },
          { id: "k2", label: "鼓勵臺灣人改用日本姓名", bucket: "kominka" },
          { id: "k3", label: "實施志願兵制度", bucket: "kominka" },
        ],
      },
      {
        id: "a2",
        kind: "scratch",
        title: "刮刮樂：1920 年代的政治社會運動",
        cards: [
          {
            front: "臺灣議會設置請願運動",
            back: "1921–1934 年，林獻堂等人向日本帝國議會請願，要求設立由臺灣人選出的議會，前後 15 次皆未成功。",
          },
          {
            front: "臺灣文化協會",
            back: "1921 年成立，以演講、讀報社、夏季學校推動文化啟蒙；1927 年因路線分歧而分裂。",
          },
          {
            front: "治警事件",
            back: "1923 年總督府以違反《治安警察法》逮捕請願運動人士，蔣渭水、蔡培火等人被判刑。",
          },
          {
            front: "臺灣民眾黨",
            back: "1927 年由蔣渭水等人成立，是臺灣人成立的第一個政黨，1931 年遭總督府禁止。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "戰後政治發展排一排",
        prompt: "把下列事件由**早到晚**排列，觀察臺灣從戒嚴體制走向民主化的過程。",
        items: [
          { id: "p228", label: "二二八事件" },
          { id: "martial", label: "實施戒嚴" },
          { id: "un", label: "退出聯合國" },
          { id: "formosa", label: "美麗島事件" },
          { id: "lift", label: "解除戒嚴" },
          { id: "vote", label: "首次總統直選" },
        ],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("d1"), q("d2"), q("d3"), q("d4"), q("d5")],
      },
    ],
  },
  {
    id: n("east-asia"),
    title: "東亞史：交會、移動與現代化",
    grade: 10,
    minutes: 14,
    nodeIds: [n("eastasia"), n("ea-encounter"), n("ea-mobility"), n("ea-modern")],
    objectives: [
      "能說出東亞史的四大主題",
      "能把臺灣、東亞與世界的事件放在同一條時間軸上比較",
      "能解釋朝貢體制、條約體制等關鍵概念",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：東亞史四大主題",
        root: {
          id: "ea",
          title: "東亞史",
          children: [
            {
              id: "encounter",
              title: "中國與東亞的交會",
              summary: "朝貢與冊封、漢字文化圈、農耕與遊牧民族的互動。",
            },
            {
              id: "state",
              title: "國家與社會",
              summary: "中國的科舉與士紳、日本的武家政治、朝鮮的兩班社會。",
            },
            {
              id: "mobility",
              title: "人群的移動與交流",
              summary: "下南洋的移民、近代留學生、戰爭與難民。",
            },
            {
              id: "modern",
              title: "現代化的歷程",
              summary: "條約體制、明治維新與自強運動、殖民與戰爭、冷戰下的東亞。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "lab",
        title: "時光拉桿：東西方的同時性",
        prompt: "拖曳年份，比較臺灣、中國／東亞與世界的同時發展，完成三項挑戰。",
        load: timelineLab,
        config: { stage: "senior" },
        insight:
          "「同時性」能幫助我們跳出單一國家的視角：東亞各國面對西方衝擊的不同回應，與世界上的工業化、帝國主義、世界大戰彼此牽動。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "match",
        title: "配對：東亞史關鍵概念",
        prompt: "把右邊的說明拖到對應的概念旁。",
        pairs: [
          { id: "m1", left: "朝貢體制", right: "周邊國家向中國稱臣納貢、接受冊封" },
          { id: "m2", left: "條約體制", right: "以條約規範國際關係，開放通商口岸" },
          { id: "m3", left: "科舉制度", right: "以考試選拔官員，形塑東亞的士人社會" },
          { id: "m4", left: "漢字文化圈", right: "日本、朝鮮、越南曾長期使用漢字書寫" },
          { id: "m5", left: "下南洋", right: "閩粵人民大量前往東南亞謀生" },
        ],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e3"), q("e5"), q("e6")],
      },
    ],
  },
  {
    id: n("modern-world"),
    title: "歐洲文化與現代世界：從啟蒙到冷戰",
    grade: 11,
    minutes: 15,
    nodeIds: [
      n("world"),
      n("w-europe-enlightenment"),
      n("w-europe-revolution"),
      n("w-modern-coldwar"),
    ],
    objectives: [
      "能說出啟蒙思想家的主要主張",
      "能分析工業革命從英國開始的條件，並從勞工角度理解其影響",
      "能分辨冷戰兩大陣營的組織與國家",
    ],
    activities: [
      {
        id: "a1",
        kind: "memory",
        title: "翻牌配對：啟蒙思想家",
        pairs: [
          ["洛克", "生命、自由、財產是天賦權利"],
          ["孟德斯鳩", "三權分立，權力互相制衡"],
          ["盧梭", "社會契約，主權屬於人民"],
          ["伏爾泰", "宗教寬容與言論自由"],
          ["亞當斯密", "《國富論》主張自由市場"],
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：工業革命為什麼從英國開始？",
        problem: "18 世紀中葉，為什麼是英國率先發生工業革命？逐步拆解有利的條件。",
        steps: [
          {
            show: "**資本**：海外貿易與殖民地帶來財富，銀行與股份公司提供投資資金。",
          },
          {
            show: "**勞動力**：農業改良與圈地運動，使許多農民離開農村，成為城市工廠的工人。",
            predict: {
              question: "圈地運動對工業革命最直接的幫助是？",
              choices: ["提供大量勞動力", "增加貴族人數", "讓城市人口減少"],
              answer: 0,
            },
          },
          {
            show: "**資源**：英國煤、鐵礦藏豐富，是蒸汽機與機器的燃料與原料。",
          },
          {
            show: "**市場**：殖民地與海外市場對棉布等商品需求龐大，刺激改良生產技術。",
          },
          {
            show: "**技術與制度**：專利制度保障發明，政治相對穩定，有利工商業發展。",
            predict: {
              question: "瓦特對蒸汽機的貢獻是？",
              choices: ["改良蒸汽機，大幅提高效率", "第一個發明蒸汽機", "發明了火車"],
              answer: 0,
            },
          },
        ],
        takeaway:
          "工業革命是 **資本、勞力、資源、市場、技術與制度** 多重條件匯聚的結果，而不是單一發明造成的。",
      },
      {
        id: "a3",
        kind: "dialogue",
        title: "情境對話：曼徹斯特紡織女工的一天",
        scenarioId: "history.senior.s-mill-worker",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "categorize",
        title: "冷戰兩大陣營",
        buckets: [
          { id: "west", label: "美國為首的陣營" },
          { id: "east", label: "蘇聯為首的陣營" },
        ],
        items: [
          { id: "w1", label: "北大西洋公約組織", bucket: "west" },
          { id: "w2", label: "馬歇爾計畫", bucket: "west" },
          { id: "w3", label: "西德（德意志聯邦共和國）", bucket: "west" },
          { id: "e1", label: "華沙公約組織", bucket: "east" },
          { id: "e2", label: "經濟互助委員會", bucket: "east" },
          { id: "e3", label: "東德（德意志民主共和國）", bucket: "east" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w2"), q("w3"), q("w4"), q("w5"), q("w6")],
      },
    ],
  },
];

export default lessons;
