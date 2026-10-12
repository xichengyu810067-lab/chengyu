import type { Lesson } from "../../types";

const seatLab = () => import("../labs/SeatLab");
const priceControlLab = () => import("../labs/PriceControlLab");
const centralGovScene = () => import("../scenes/CentralGovScene");
const communityScene = () => import("../scenes/CommunityScene");
const extAxes = () => import("../scenes/externalityLayers").then((m) => ({ default: m.Axes }));
const extDemand = () => import("../scenes/externalityLayers").then((m) => ({ default: m.Demand }));
const extPrivate = () =>
  import("../scenes/externalityLayers").then((m) => ({ default: m.PrivateCost }));
const extSocial = () =>
  import("../scenes/externalityLayers").then((m) => ({ default: m.SocialCost }));
const extCompare = () =>
  import("../scenes/externalityLayers").then((m) => ({ default: m.Compare }));

const q = (s: string) => `civics.senior.q-${s}`;

const lessons: Lesson[] = [
  {
    id: "civics.senior.human-rights",
    title: "人性尊嚴與人權保障",
    grade: 10,
    minutes: 15,
    nodeIds: [
      "civics.senior.dignity",
      "civics.senior.rights-generations",
      "civics.senior.proportionality",
      "civics.senior.equality",
    ],
    objectives: [
      "說明人性尊嚴與人權的關係",
      "分辨三代人權的內涵",
      "運用比例原則檢驗限制人權的措施",
      "認識我國透過施行法納入的國際人權公約",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：人權保障體系",
        root: {
          id: "hr",
          title: "人權保障",
          children: [
            {
              id: "hr-root",
              title: "人性尊嚴",
              summary: "人權的根源：人是目的，不只是手段。",
            },
            {
              id: "hr-gen",
              title: "三代人權",
              children: [
                { id: "hr-g1", title: "第一代：公民與政治權利", summary: "要求國家不任意干涉。" },
                { id: "hr-g2", title: "第二代：經濟社會文化權利", summary: "要求國家積極給付。" },
                { id: "hr-g3", title: "第三代：集體權", summary: "發展權、環境權、和平權。" },
              ],
            },
            {
              id: "hr-duty",
              title: "國家義務",
              summary: "尊重（不侵害）、保護（防止第三人侵害）、實現（提供制度與資源）。",
            },
            {
              id: "hr-limit",
              title: "人權的限制",
              summary: "須有法律依據（法律保留），並符合比例原則。",
            },
            {
              id: "hr-intl",
              title: "國際人權公約國內法化",
              summary: "兩公約、CEDAW、兒童權利公約、身心障礙者權利公約等，皆已制定施行法。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "三代人權分一分",
        prompt: "把每項權利拖到它所屬的「世代」。",
        buckets: [
          { id: "g1", label: "第一代：公民與政治權利" },
          { id: "g2", label: "第二代：經濟、社會與文化權利" },
          { id: "g3", label: "第三代：集體權（連帶權）" },
        ],
        items: [
          { id: "h1", label: "不受任意逮捕、拘禁", bucket: "g1" },
          { id: "h2", label: "言論與新聞自由", bucket: "g1" },
          { id: "h3", label: "選舉與被選舉的權利", bucket: "g1" },
          { id: "h4", label: "享有公平合理的工作條件", bucket: "g2" },
          { id: "h5", label: "接受教育的權利", bucket: "g2" },
          { id: "h6", label: "享有社會保障（如失業給付）", bucket: "g2" },
          { id: "h7", label: "享有健康、永續的環境", bucket: "g3" },
          { id: "h8", label: "民族自決與發展的權利", bucket: "g3" },
          { id: "h9", label: "和平權", bucket: "g3" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：用比例原則檢驗",
        problem:
          "某市議會通過自治條例：「住宅區晚上 10 點到隔天早上 6 點，禁止使用擴音設備唱卡拉 OK，違者處以罰鍰。」這樣限制人民的自由，合乎比例原則嗎？",
        steps: [
          {
            show: "**法律依據**：由市議會通過的自治條例規定，並非行政機關片面決定。",
            why: "限制人民權利須有法律或經民意機關通過的自治法規作為依據。",
          },
          {
            show: "**目的**：維護居民夜間安寧與健康，屬於正當的公共利益。",
          },
          {
            show: "**適當性**：禁止夜間使用擴音設備，確實有助於減少噪音。",
            predict: {
              question: "「適當性」檢驗的是什麼？",
              choices: ["手段能不能幫助達成目的", "多數人是否贊成", "罰鍰金額是否夠高"],
              answer: 0,
            },
          },
          {
            show: "**必要性**：只限夜間、只限住宅區、只限擴音設備，比「全天禁止唱歌」侵害更小。",
            predict: {
              question: "如果改成「住宅區全天 24 小時禁止唱歌」，最可能不符合哪一項？",
              choices: ["適當性", "必要性", "法律保留"],
              answer: 1,
            },
          },
          {
            show: "**衡量性**：居民睡眠與健康的利益，大於夜間無法用擴音設備唱歌的不便。",
          },
          {
            show: "**結論**：目的正當、有法規依據、手段適當且侵害最小、利益大於損害，大致合乎比例原則。",
          },
        ],
        takeaway: "比例原則三步驟：**適當性 → 必要性 → 衡量性**。目的正當，不代表任何手段都可以。",
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：國際人權公約",
        prompt: "我國已透過制定施行法，讓這些公約具有國內法效力。把公約和它保障的重點配成一對。",
        pairs: [
          ["公民與政治權利國際公約", "生命權、人身自由、表意自由等"],
          ["經濟社會文化權利國際公約", "工作權、社會保障、受教育權等"],
          ["消除對婦女一切形式歧視公約", "消除對女性的歧視、促進性別平等"],
          ["兒童權利公約", "以兒童及少年的最佳利益為優先"],
          ["身心障礙者權利公約", "身心障礙者的平等參與與無障礙"],
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("h1"), q("h2"), q("h5"), q("h6"), q("h7")],
      },
    ],
  },
  {
    id: "civics.senior.government-systems",
    title: "政府體制與權力制衡",
    grade: 10,
    minutes: 15,
    nodeIds: ["civics.senior.gov-systems", "civics.senior.taiwan-gov"],
    objectives: [
      "比較內閣制與總統制的特徵",
      "說明我國總統、行政院、立法院之間的互動",
      "理解不信任案與修憲的程序",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "內閣制還是總統制？",
        prompt: "判斷每項特徵屬於哪一種典型的政府體制。",
        buckets: [
          { id: "parl", label: "內閣制（如英國）" },
          { id: "pres", label: "總統制（如美國）" },
        ],
        items: [
          { id: "f1", label: "行政首長（首相）通常由國會多數黨領袖擔任", bucket: "parl" },
          { id: "f2", label: "國會可以對內閣提出不信任案", bucket: "parl" },
          { id: "f3", label: "閣員多由國會議員兼任", bucket: "parl" },
          { id: "f4", label: "內閣可以解散國會、提前改選", bucket: "parl" },
          { id: "f5", label: "總統由人民選出，兼任國家元首與最高行政首長", bucket: "pres" },
          { id: "f6", label: "國會不能用不信任案讓總統下台", bucket: "pres" },
          { id: "f7", label: "總統可以否決國會通過的法案", bucket: "pres" },
          { id: "f8", label: "行政官員不得兼任國會議員", bucket: "pres" },
        ],
      },
      {
        id: "a2",
        kind: "hotspot",
        title: "我國中央政府的互動關係",
        prompt: "點擊每個熱點，看看機關之間如何分工與制衡。",
        viewBox: "0 0 480 320",
        scene: centralGovScene,
        mode: "explore",
        spots: [
          {
            id: "president",
            x: 140,
            y: 40,
            title: "總統",
            body: "國家元首，由人民直接選舉，任期 4 年、連選得連任一次。可任命行政院院長，並提名大法官、考試委員、監察委員（須經立法院同意）。",
          },
          {
            id: "appoint",
            x: 240,
            y: 52,
            title: "任命行政院院長",
            body: "依憲法增修條文，行政院院長由總統任命，**不需要**立法院同意。",
          },
          {
            id: "reconsider",
            x: 360,
            y: 100,
            title: "覆議",
            body: "行政院認為立法院決議的法律案、預算案、條約案窒礙難行時，可經總統核可，移請立法院覆議；若全體立委二分之一以上決議維持原案，行政院院長應即接受。",
          },
          {
            id: "noconf",
            x: 420,
            y: 100,
            title: "不信任案與質詢",
            body: "行政院對立法院負責，立委可以質詢；立法院可對行政院院長提出不信任案，全體立委二分之一以上贊成即通過，行政院院長應於 10 日內辭職。",
          },
          {
            id: "dissolve",
            x: 214,
            y: 102,
            title: "被動解散立法院",
            body: "總統只能在立法院通過不信任案後 10 日內，經諮詢立法院院長，宣告解散立法院；之後 60 日內重新選舉，由人民決定。",
          },
          {
            id: "review",
            x: 200,
            y: 182,
            title: "違憲審查",
            body: "司法院大法官組成**憲法法庭**，可審查法律與命令是否違憲，也審理總統、副總統彈劾案及政黨違憲解散案等。",
          },
          {
            id: "vote",
            x: 286,
            y: 276,
            title: "人民",
            body: "人民是主權者，直接選出總統與立法委員，也可以透過罷免、公民投票、修憲複決等方式參與。",
          },
          {
            id: "control",
            x: 136,
            y: 276,
            title: "監察院",
            body: "行使彈劾、糾舉、糾正與審計權，監督公務人員與政府機關。監察委員由總統提名，經立法院同意任命。",
          },
          {
            id: "exam",
            x: 436,
            y: 276,
            title: "考試院",
            body: "掌理公務人員的考試、銓敘、保障、撫卹與退休等事項，讓政府用人公平、依法。",
          },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：不信任案怎麼走？",
        problem: "立法院不滿行政院院長的施政，想讓他下台。依憲法增修條文，程序怎麼走？",
        steps: [
          {
            show: "**提出**：全體立法委員三分之一以上連署，對行政院院長提出不信任案。",
          },
          {
            show: "**表決時間**：提出 72 小時後，應在 48 小時內以記名投票表決。",
            why: "留一段冷靜期，避免倉促決定；記名投票讓選民知道每位立委的立場。",
          },
          {
            show: "**通過門檻**：全體立法委員二分之一以上贊成。以 113 席計算，至少要 57 票。",
            predict: {
              question: "立法院共 113 席，不信任案至少要幾票贊成才通過？",
              choices: ["38 票", "57 票", "76 票"],
              answer: 1,
            },
          },
          {
            show: "**通過後**：行政院院長應於 10 日內提出辭職，並得同時呈請總統解散立法院。",
          },
          {
            show: "**解散與改選**：總統經諮詢立法院院長後，得宣告解散立法院；60 日內舉行立委選舉，讓人民做最後決定。",
            predict: {
              question: "這個設計讓政治僵局最後由誰來決定？",
              choices: ["大法官", "人民（透過改選）", "監察院"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "「倒閣 ↔ 解散國會」原本是內閣制的設計；我國把它引入，讓行政與立法的衝突可以回到選民手中解決。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "order",
        title: "排一排：修憲的程序",
        prompt: "依憲法增修條文，把修憲步驟依序排列。",
        items: [
          { id: "c1", label: "立法委員四分之一提議" },
          { id: "c2", label: "四分之三出席、出席委員四分之三決議，提出憲法修正案" },
          { id: "c3", label: "公告半年" },
          { id: "c4", label: "中華民國自由地區選舉人投票複決" },
          { id: "c5", label: "有效同意票超過選舉人總額半數，修憲通過" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("g1"), q("g2"), q("g3"), q("g4"), q("g5"), q("g7")],
      },
    ],
  },
  {
    id: "civics.senior.elections-media",
    title: "選舉制度與媒體識讀",
    grade: 10,
    minutes: 15,
    nodeIds: ["civics.senior.elections", "civics.senior.parties", "civics.senior.media"],
    objectives: [
      "說明單一選區兩票制與政黨門檻",
      "能用最大餘數法計算不分區席次",
      "分辨事實與意見，並具備查證訊息的習慣",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：政黨票怎麼變成席次？",
        prompt: "調整五個政黨的政黨票，觀察 5% 門檻與最大餘數法如何決定 34 席不分區立委。",
        load: seatLab,
        insight:
          "得票率未達 5% 的政黨不分配席次，它的選票等於沒有轉換成代表，其他政黨的「理論席次」因此變大。門檻能避免小黨林立，但也可能讓部分選民的意見無法進入國會，這是制度設計的取捨。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：手算不分區席次",
        problem:
          "全國不分區共 34 席，各黨政黨票得票率：甲 45%、乙 35%、丙 10%、丁 6%、戊 4%。各黨分得幾席？",
        steps: [
          {
            show: "**門檻**：戊黨 4% 未達 5%，不分配席次。",
            predict: {
              question: "哪一個政黨無法分配席次？",
              choices: ["丁黨（6%）", "戊黨（4%）", "沒有，全部都能分配"],
              answer: 1,
            },
          },
          {
            show: "**重新計算比率**：過門檻政黨合計 45 + 35 + 10 + 6 = 96（%），各黨比率為 45/96、35/96、10/96、6/96。",
          },
          {
            show: "**乘以 34**：甲 ≈ 15.94、乙 ≈ 12.40、丙 ≈ 3.54、丁 = 2.125。",
          },
          {
            show: "**先分整數**：15 + 12 + 3 + 2 = 32 席，還剩 2 席。",
            predict: {
              question: "分完整數後還剩幾席？",
              choices: ["1 席", "2 席", "3 席"],
              answer: 1,
            },
          },
          {
            show: "**依小數大小分配剩餘席次**：甲（.94）、丙（.54）最大，各加 1 席。結果：甲 16、乙 12、丙 4、丁 2。",
            why: "這就是「最大餘數法」。",
          },
        ],
        takeaway: "不分區席次計算：**扣除未過門檻者 → 重算比率 × 34 → 先分整數 → 餘數大者優先**。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "事實陳述還是意見評論？",
        prompt: "事實可以被查證真假；意見是個人的評價與判斷。",
        buckets: [
          { id: "fact", label: "事實陳述" },
          { id: "opinion", label: "意見評論" },
        ],
        items: [
          { id: "t1", label: "本市今年上半年共發生 120 起交通事故", bucket: "fact" },
          { id: "t2", label: "立法院本週三讀通過某法案的修正", bucket: "fact" },
          { id: "t3", label: "這間餐廳每週一公休", bucket: "fact" },
          { id: "t4", label: "這項政策是史上最糟糕的決定", bucket: "opinion" },
          { id: "t5", label: "這位候選人看起來最有領導魅力", bucket: "opinion" },
          { id: "t6", label: "這間餐廳是全臺最好吃的", bucket: "opinion" },
        ],
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：媒體識讀關鍵字",
        cards: [
          {
            front: "置入性行銷",
            back: "把商品或政策宣傳包裝成新聞、節目內容，讓閱聽人不容易察覺是廣告。",
          },
          {
            front: "同溫層（回音室效應）",
            back: "演算法與社群讓人只接觸相似觀點，原有想法被不斷強化，更難理解不同意見。",
          },
          {
            front: "假訊息",
            back: "刻意製造或散布的錯誤、不實訊息。看到驚人消息先查證來源、交叉比對，再決定是否分享。",
          },
          {
            front: "守門人",
            back: "決定哪些消息能被報導、如何呈現的編輯或平臺，會影響我們看到的世界。",
          },
          {
            front: "抽樣誤差",
            back: "民調用樣本推估母體的誤差範圍。候選人差距若在誤差範圍內，不能斷言誰領先。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e3"), q("e5"), q("e6"), q("e8")],
      },
    ],
  },
  {
    id: "civics.senior.contract-tort",
    title: "契約、侵權與消費者保護",
    grade: 11,
    minutes: 15,
    nodeIds: ["civics.senior.contract", "civics.senior.tort"],
    objectives: [
      "說明契約自由的內涵與界限",
      "分析侵權行為的成立要件與責任主體",
      "運用民法與租賃相關規定處理租屋糾紛",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：契約與消費者保護",
        cards: [
          {
            front: "契約什麼時候成立？",
            back: "當事人互相表示意思一致（要約 ＋ 承諾）時成立；原則上口頭約定也有效，但書面較有保障。",
          },
          {
            front: "契約自由有哪些界限？",
            back: "違反法律強制或禁止規定、或違背公共秩序善良風俗的約定，**無效**。",
          },
          {
            front: "什麼是定型化契約？",
            back: "業者事先擬定、供多數人使用的契約條款。消費者應有合理審閱期間，顯失公平的條款無效。",
          },
          {
            front: "網購（通訊交易）的特別保護？",
            back: "收受商品後 **7 日內**可無理由解除契約，無須負擔任何費用；但易腐敗、客製化等商品有合理例外。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：法律概念與生活案例",
        pairs: [
          { id: "k1", left: "要約", right: "商店把商品標價陳列在貨架上" },
          { id: "k2", left: "定型化契約", right: "健身房事先印好、讓所有會員簽的會員條款" },
          { id: "k3", left: "債務不履行", right: "付了錢，賣家卻遲遲不交貨" },
          { id: "k4", left: "侵權行為", right: "騎車不專心撞傷路人，要賠醫藥費" },
          { id: "k5", left: "法定代理人連帶責任", right: "未成年人闖禍，父母也要一起負賠償責任" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "案例分析：騎車滑手機撞傷人",
        problem:
          "17 歲的阿明騎腳踏車時低頭滑手機，撞傷行人陳太太，陳太太因此花了醫藥費。陳太太可以向誰請求賠償？",
        steps: [
          {
            show: "**事實**：阿明騎車滑手機、未注意前方，撞傷陳太太，造成醫藥費支出。",
          },
          {
            show: "**檢查侵權要件**：有過失（騎車滑手機）、不法侵害身體健康、發生損害（醫藥費）、行為與損害有因果關係。",
            predict: {
              question: "阿明的主觀心態屬於？",
              choices: ["故意", "過失", "無過失"],
              answer: 1,
            },
          },
          {
            show: "**責任主體**：阿明 17 歲是限制行為能力人；行為時有識別能力，應與其法定代理人（父母）**連帶**負損害賠償責任。",
            why: "民法第 187 條，兼顧被害人的求償與對未成年人的監督責任。",
            predict: {
              question: "陳太太可以向誰請求？",
              choices: ["只能向阿明", "阿明與其法定代理人", "因為阿明未成年，所以沒人要負責"],
              answer: 1,
            },
          },
          {
            show: "**結論**：陳太太可請求醫藥費等損害賠償，也可能請求精神慰撫金；雙方可以先和解或調解，不成再提起民事訴訟。",
          },
          {
            show: "**延伸**：撞傷人也可能構成刑法的過失傷害罪，這屬於告訴乃論之罪，由被害人決定是否提出告訴。",
            why: "同一個行為，可能同時產生民事責任與刑事責任。",
          },
        ],
        takeaway:
          "侵權四要件：**故意或過失、不法侵害權利、損害、因果關係**；未成年人有識別能力時，與法定代理人連帶負責。",
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：租屋大小事",
        prompt: "熱水器壞了誰修？退租押金怎麼算？和房東陳先生好好談一談。",
        scenarioId: "civics.senior.s-rental-deposit",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c2"), q("c3"), q("c5"), q("c6"), q("c7")],
      },
    ],
  },
  {
    id: "civics.senior.labor-remedy",
    title: "勞動權益與權利救濟",
    grade: 11,
    minutes: 15,
    nodeIds: ["civics.senior.labor-rights", "civics.senior.admin-remedy"],
    objectives: [
      "能計算延長工時工資",
      "知道打工族的基本勞動權益",
      "依序說出行政救濟的程序",
      "遇到權益受損時，知道該向哪裡求助",
    ],
    activities: [
      {
        id: "a1",
        kind: "dialogue",
        title: "情境對話：打工族的加班費",
        prompt: "多做的兩小時沒有加班費、打破杯子要扣薪？試著和店長理性溝通。",
        scenarioId: "civics.senior.s-overtime-pay",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：一天的工資怎麼算？",
        problem:
          "工讀生約定時薪 210 元（假設數字）。某個平日，他工作了 12 小時，其中 8 小時是正常工時、4 小時是延長工時。這天的工資至少是多少？",
        steps: [
          {
            show: "**正常工時**：210 × 8 = 1,680 元。",
          },
          {
            show: "**延長工時前 2 小時**：每小時加給 1/3，210 × 4/3 = 280 元，2 小時共 560 元。",
            predict: {
              question: "延長工時前 2 小時，每小時至少多少元？",
              choices: ["210 元", "280 元", "420 元"],
              answer: 1,
            },
          },
          {
            show: "**再延長的 2 小時（第 3、4 小時）**：每小時加給 2/3，210 × 5/3 = 350 元，2 小時共 700 元。",
            predict: {
              question: "第 3、4 小時每小時至少多少元？",
              choices: ["280 元", "350 元", "420 元"],
              answer: 1,
            },
          },
          {
            show: "**合計**：1,680 + 560 + 700 = **2,940 元**。",
          },
          {
            show: "**提醒**：正常工時加延長工時，一天不得超過 12 小時。",
            why: "勞基法限制工時上限，保護勞工的健康。",
          },
        ],
        takeaway:
          "平日延長工時：**前 2 小時加給 1/3 以上、再 2 小時加給 2/3 以上**。實際最低工資依《最低工資法》每年公告。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排一排：行政救濟的流程",
        prompt: "對行政機關的處分不服時，救濟流程依序是？",
        items: [
          { id: "v1", label: "行政機關作成行政處分（如開出罰鍰）" },
          { id: "v2", label: "處分達到的次日起 30 日內提起訴願" },
          { id: "v3", label: "訴願審議委員會作成訴願決定" },
          { id: "v4", label: "不服訴願決定，於 2 個月內向行政法院提起行政訴訟" },
          { id: "v5", label: "行政法院審理並判決" },
        ],
      },
      {
        id: "a4",
        kind: "hotspot",
        title: "遇到問題，該去哪裡？",
        prompt: "依照提示，在社區地圖中找出可以尋求協助的地方。",
        viewBox: "0 0 480 320",
        scene: communityScene,
        mode: "find",
        spots: [
          {
            id: "hall",
            x: 166,
            y: 126,
            title: "和樓上鄰居因漏水起糾紛，想先免費調解",
            body: "**區公所**設有調解委員會，可以免費調解民事事件與告訴乃論的刑事事件，調解成立經法院核定後，與確定判決有同一效力。",
          },
          {
            id: "govt",
            x: 85,
            y: 124,
            title: "老闆積欠工資，想申請勞資爭議調解",
            body: "可以向**直轄市、縣（市）政府**的勞工主管機關（如勞工局）申訴或申請勞資爭議調解。記得保留班表、打卡與薪資紀錄。",
          },
          {
            id: "court",
            x: 237,
            y: 88,
            title: "調解不成，想提起民事訴訟請求賠償",
            body: "向**地方法院**提起民事訴訟。金額不高的案件可適用較簡便的小額訴訟程序。",
          },
          {
            id: "police",
            x: 350,
            y: 126,
            title: "機車被偷了，想要報案",
            body: "到**警察局**（派出所）報案。竊盜是刑事案件，由警察與檢察官偵查。",
          },
          {
            id: "school",
            x: 452,
            y: 124,
            title: "在學校遭受霸凌，想要尋求協助",
            body: "向**學校**的導師、輔導室或學務處反映，學校須依規定調查處理；若涉及性別事件，由性別平等教育委員會處理。",
          },
        ],
      },
      {
        id: "a5",
        kind: "memory",
        title: "翻牌配對：權利救濟管道",
        pairs: [
          ["訴願", "不服行政處分，請求上級機關審查"],
          ["行政訴訟", "不服訴願決定，向行政法院起訴"],
          ["國家賠償", "公務員違法執行職務致人民受損，由國家賠償"],
          ["勞資爭議調解", "由地方勞工主管機關協助勞雇雙方協商"],
          ["鄉鎮市區調解", "免費調解民事與告訴乃論的刑事事件"],
        ],
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("w1"), q("w2"), q("w3"), q("w4"), q("w6"), q("w7")],
      },
    ],
  },
  {
    id: "civics.senior.market-failure",
    title: "市場機制、價格管制與市場失靈",
    grade: 11,
    minutes: 15,
    nodeIds: [
      "civics.senior.market",
      "civics.senior.price-control",
      "civics.senior.elasticity",
      "civics.senior.market-failure",
    ],
    objectives: [
      "說明價格上限與價格下限造成的短缺與過剩",
      "計算需求價格彈性並判斷總收入的變化",
      "以排他性與敵對性區分財貨類型",
      "用圖形說明負外部性造成的過度生產",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：價格管制的後果",
        prompt: "切換「價格上限」或「價格下限」並調整管制價格，完成兩個任務。",
        load: priceControlLab,
        insight:
          "價格上限低於均衡價格會造成**短缺**，可能出現排隊、黑市；價格下限高於均衡價格會造成**過剩**。管制常有照顧特定族群的目的，評估政策時要同時考慮效率與公平。",
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：需求價格彈性",
        problem:
          "一家飲料店把飲料從 50 元漲到 55 元，每天的銷售量從 1,000 杯減少為 800 杯。需求價格彈性是多少？漲價後總收入會增加還是減少？",
        steps: [
          {
            show: "**價格變動率**：(55 − 50) ÷ 50 = 10%。",
          },
          {
            show: "**需求量變動率**：(800 − 1,000) ÷ 1,000 = −20%。",
          },
          {
            show: "**需求價格彈性** = 需求量變動百分比 ÷ 價格變動百分比 = 20% ÷ 10% = **2**（取絕對值）。",
            predict: {
              question: "彈性為 2，代表這項商品的需求？",
              choices: ["富有彈性（大於 1）", "缺乏彈性（小於 1）", "單位彈性（等於 1）"],
              answer: 0,
            },
          },
          {
            show: "**總收入**：漲價前 50 × 1,000 = 50,000 元；漲價後 55 × 800 = 44,000 元，總收入**減少**。",
            predict: {
              question: "需求富有彈性時，漲價會讓總收入？",
              choices: ["增加", "減少", "不變"],
              answer: 1,
            },
          },
        ],
        takeaway:
          "需求富有彈性（> 1）時，漲價使總收入減少；缺乏彈性（< 1）時，漲價使總收入增加。替代品多的商品通常較有彈性。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "財貨四分類",
        prompt:
          "用「能不能排除沒付錢的人（排他性）」與「一人使用會不會減少他人可用的量（敵對性）」來分類。",
        buckets: [
          { id: "private", label: "私有財（排他、敵對）" },
          { id: "public", label: "公共財（非排他、非敵對）" },
          { id: "common", label: "共有資源（非排他、敵對）" },
          { id: "club", label: "俱樂部財（排他、非敵對）" },
        ],
        items: [
          { id: "g1", label: "一個便當", bucket: "private" },
          { id: "g2", label: "一件衣服", bucket: "private" },
          { id: "g3", label: "國防", bucket: "public" },
          { id: "g4", label: "路燈照明", bucket: "public" },
          { id: "g5", label: "公海裡的魚", bucket: "common" },
          { id: "g6", label: "不收費但很擁擠的道路", bucket: "common" },
          { id: "g7", label: "收費的串流影音平臺", bucket: "club" },
          { id: "g8", label: "有線電視頻道", bucket: "club" },
        ],
      },
      {
        id: "a4",
        kind: "layers",
        title: "圖層疊加：負外部性",
        prompt:
          "一家工廠生產時排放汙水，下游居民承擔了汙染成本。逐一打開圖層，比較市場結果與社會最適結果。",
        viewBox: "0 0 400 300",
        base: extAxes,
        layers: [
          {
            id: "demand",
            label: "需求（社會邊際利益）",
            load: extDemand,
            color: "#2563eb",
            on: true,
          },
          {
            id: "private",
            label: "供給（私人邊際成本）",
            load: extPrivate,
            color: "#059669",
            on: true,
            note: "工廠只考慮自己的生產成本，市場在需求與私人成本的交點成交。",
          },
          {
            id: "social",
            label: "社會邊際成本",
            load: extSocial,
            color: "#e11d48",
            note: "加上由他人承擔的汙染成本（外部成本），社會成本線位在供給線上方。",
          },
          {
            id: "compare",
            label: "市場產量 vs 社會最適",
            load: extCompare,
            color: "#9f1239",
            note: "市場產量 Qm 大於社會最適產量 Q*，多生產的部分造成社會福利損失。",
          },
        ],
        check: {
          stem: "有負外部性時，若政府不介入，市場的產量會如何？",
          choices: ["高於社會最適產量", "低於社會最適產量", "等於社會最適產量"],
          answer: 0,
          explain:
            "生產者忽略外部成本，覺得生產「比較便宜」，因此生產過多。政府可對汙染課稅或收費，讓私人成本接近社會成本。",
        },
      },
      {
        id: "a5",
        kind: "canvas",
        title: "動手畫：正外部性",
        task: "接種疫苗不只保護自己，也降低他人被傳染的機會（正外部性）。在坐標軸上畫出：供給曲線、私人邊際利益（需求）曲線，以及位置較高的社會邊際利益曲線；標出市場數量與社會最適數量，並寫下政府可以怎麼做。",
        background: "axes",
        hint: "社會邊際利益 = 私人邊際利益 + 外部利益，所以這條線在需求曲線的上方。",
        reference:
          "社會邊際利益曲線與供給曲線的交點，數量比市場均衡更多：有正外部性時，市場產量**低於**社會最適。政府可以補貼、提供免費接種或宣導，提高接種數量。",
        aiFeedback: true,
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("m1"), q("m2"), q("m3"), q("m4"), q("m5"), q("m6"), q("m7")],
      },
    ],
  },
];

export default lessons;
