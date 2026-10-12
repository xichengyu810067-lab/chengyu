import type { Question } from "../../types";

const id = (s: string) => `civics.senior.q-${s}`;

const questions: Question[] = [
  // 人性尊嚴與人權
  {
    id: id("h1"),
    type: "single",
    stem: "「第一代人權」主要是指哪一類權利？",
    choices: [
      "公民與政治權利，如人身自由、言論自由、參政權",
      "經濟、社會與文化權利，如工作權、社會保障",
      "集體權，如環境權、發展權",
      "國家要求人民納稅的權力",
    ],
    answer: 0,
    explain:
      "第一代人權源自 17、18 世紀對抗專制的經驗，要求國家不得任意干涉個人自由，並保障人民參與政治，屬於公民與政治權利。",
    nodeId: "civics.senior.rights-generations",
    difficulty: 1,
  },
  {
    id: id("h2"),
    type: "single",
    stem: "「國家應提供失業救助，並保障每個人受教育的機會」，主要屬於哪一代人權的主張？",
    choices: ["第一代人權", "第二代人權", "第三代人權", "不屬於人權"],
    answer: 1,
    explain:
      "第二代人權是經濟、社會與文化權利，回應工業化後的貧富差距，要求國家積極提供給付，如工作權、社會保障、受教育權。",
    nodeId: "civics.senior.rights-generations",
  },
  {
    id: id("h3"),
    type: "single",
    stem: "環境權、發展權與和平權，常被歸類為哪一種人權？",
    choices: [
      "第一代人權（自由權）",
      "第二代人權（社會權）",
      "第三代人權（集體權、連帶權）",
      "參政權",
    ],
    answer: 2,
    explain: "第三代人權強調群體與國際合作才能實現的權利，例如享有健康環境、發展與和平的權利。",
    nodeId: "civics.senior.rights-generations",
  },
  {
    id: id("h4"),
    type: "tf",
    stem: "我國於 2009 年制定施行法，使《公民與政治權利國際公約》及《經濟社會文化權利國際公約》所揭示的人權保障規定具有國內法律效力。",
    answer: true,
    explain:
      "我國雖然不是聯合國會員國，但透過「兩公約施行法」讓兩公約具有國內法律效力，各級政府機關應依公約規定保障人權。",
    nodeId: "civics.senior.dignity",
    difficulty: 2,
  },
  {
    id: id("h5"),
    type: "multi",
    stem: "比例原則包含哪些子原則？（複選）",
    choices: [
      "適當性：手段有助於達成目的",
      "必要性：選擇侵害最小的手段",
      "衡量性：手段造成的損害不可大於所欲達成的利益",
      "多數決：多數人贊成即可限制",
    ],
    answer: [0, 1, 2],
    explain:
      "比例原則包含適當性、必要性與衡量性（狹義比例原則）。多數決是民主的決策方式，但不能作為限制人權的正當理由。",
    nodeId: "civics.senior.proportionality",
    difficulty: 2,
  },
  {
    id: id("h6"),
    type: "single",
    stem: "某機關為了防止考試作弊，規定「應試者一律不得攜帶手機進入考場所在的整棟大樓」。如果只要「考試時統一保管手機」就能達到同樣效果，這項規定最可能違反比例原則的哪一項？",
    choices: ["適當性", "必要性", "法律優位", "罪刑法定"],
    answer: 1,
    explain:
      "禁止攜帶手機有助於防止作弊（符合適當性），但如果有同樣有效、侵害更小的手段（統一保管），卻選擇侵害較大的手段，就不符合必要性。",
    nodeId: "civics.senior.proportionality",
    difficulty: 3,
  },
  {
    id: id("h7"),
    type: "single",
    stem: "政府為原住民族學生、身心障礙者提供升學或就業的保障名額，主要是為了追求哪一種平等？",
    choices: ["形式平等", "實質平等", "齊頭式平等", "絕對平等"],
    answer: 1,
    explain: "實質平等考量不同群體在起點上的差異，給予合理的差別待遇，讓弱勢者也能有公平的機會。",
    nodeId: "civics.senior.equality",
    difficulty: 1,
  },
  {
    id: id("h8"),
    type: "cloze",
    stem: "「人應被當作目的，而不只是手段」，強調的是人性 ____。",
    accept: ["尊嚴"],
    explain:
      "人性尊嚴是人權的基礎：每個人都有自主決定與被尊重的價值，不能只被當作達成他人目的的工具。",
    nodeId: "civics.senior.dignity",
  },
  // 政府體制
  {
    id: id("g1"),
    type: "single",
    stem: "下列哪一項是「內閣制」的主要特徵？",
    choices: [
      "總統由人民直選，並擔任最高行政首長",
      "行政首長由國會多數產生，內閣對國會負責",
      "行政與立法嚴格分立，國會不能倒閣",
      "國家只能有一個合法政黨",
    ],
    answer: 1,
    explain:
      "內閣制中，國會多數黨（或聯盟）組成內閣，閣員多由國會議員兼任；國會可以對內閣提出不信任案，內閣也可以解散國會。",
    nodeId: "civics.senior.gov-systems",
    difficulty: 1,
  },
  {
    id: id("g2"),
    type: "single",
    stem: "下列哪一個國家是「總統制」的典型代表？",
    choices: ["英國", "美國", "日本", "德國"],
    answer: 1,
    explain:
      "美國是總統制的代表：總統由選民選出、任期固定，國會不能倒閣，總統也不能解散國會。英國、日本、德國都採內閣制。",
    nodeId: "civics.senior.gov-systems",
  },
  {
    id: id("g3"),
    type: "tf",
    stem: "我國總統可以隨時主動解散立法院。",
    answer: false,
    explain:
      "我國總統只能「被動」解散立法院：在立法院通過對行政院院長的不信任案後 10 日內，經諮詢立法院院長，才得宣告解散。",
    nodeId: "civics.senior.taiwan-gov",
    difficulty: 2,
  },
  {
    id: id("g4"),
    type: "single",
    stem: "立法院通過對行政院院長的不信任案後，依憲法增修條文，接下來會怎樣？",
    choices: [
      "行政院院長應於 10 日內提出辭職，並得同時呈請總統解散立法院",
      "總統必須立即下台",
      "由司法院院長代理行政院院長",
      "不信任案須再交付公民投票",
    ],
    answer: 0,
    explain:
      "不信任案需全體立法委員二分之一以上贊成才通過。通過後行政院院長應於 10 日內辭職，並得同時呈請總統解散立法院，讓人民透過改選做最後決定。",
    nodeId: "civics.senior.taiwan-gov",
    difficulty: 2,
  },
  {
    id: id("g5"),
    type: "multi",
    stem: "行政院對立法院決議的哪些案件，如認為窒礙難行，得經總統核可移請立法院覆議？（複選）",
    choices: ["法律案", "預算案", "條約案", "總統彈劾案"],
    answer: [0, 1, 2],
    explain:
      "依憲法增修條文，行政院對立法院決議的法律案、預算案、條約案可移請覆議；覆議時如經全體立法委員二分之一以上決議維持原案，行政院院長應即接受。",
    nodeId: "civics.senior.taiwan-gov",
    difficulty: 3,
  },
  {
    id: id("g6"),
    type: "numeric",
    stem: "我國立法委員的總席次是多少席？",
    answer: 113,
    unit: "席",
    explain:
      "立法委員共 113 席：區域 73 席、平地與山地原住民各 3 席、全國不分區及僑居國外國民 34 席。",
    nodeId: "civics.senior.elections",
  },
  {
    id: id("g7"),
    type: "cloze",
    stem: "憲法修正案經立法院提出、公告半年後，要交由中華民國自由地區的 ____ 投票複決，有效同意票超過總額半數才算通過。",
    accept: ["選舉人", "公民", "人民", "全體選舉人"],
    explain:
      "依憲法增修條文，修憲須經立法委員 1/4 提議、3/4 出席、出席委員 3/4 決議提出，公告半年後由自由地區選舉人投票複決，有效同意票超過選舉人總額之半數即通過。",
    nodeId: "civics.senior.taiwan-gov",
    difficulty: 2,
  },
  // 選舉制度與媒體識讀
  {
    id: id("e1"),
    type: "single",
    stem: "我國立法委員選舉採「單一選區兩票制」，選民手上的兩票分別投給誰？",
    choices: [
      "一票投區域立委候選人，一票投政黨",
      "兩票都投給同一位候選人",
      "一票投總統，一票投立委",
      "一票投立委，一票投公民投票案",
    ],
    answer: 0,
    explain:
      "第一票投給所在選區的區域立委候選人（每區當選 1 人）；第二票投給政黨，決定全國不分區及僑居國外國民立委的席次分配。",
    nodeId: "civics.senior.elections",
    difficulty: 1,
  },
  {
    id: id("e2"),
    type: "numeric",
    stem: "政黨的政黨票得票率至少要達到百分之多少，才能分配全國不分區立委席次？",
    answer: 5,
    unit: "%",
    explain:
      "依法，得票率未達 5% 的政黨不分配不分區席次，以避免小黨林立，這個門檻也稱為「政黨門檻」。",
    nodeId: "civics.senior.elections",
  },
  {
    id: id("e3"),
    type: "single",
    stem: "全國不分區共 34 席。已達 5% 門檻的政黨得票合計為 80%，其中甲黨得票率為 20%。甲黨的「理論席次」（尚未處理小數）為多少？",
    choices: ["6.8 席", "8.5 席", "10 席", "20 席"],
    answer: 1,
    explain:
      "未達門檻政黨的票不列入計算，所以要重新計算比率：20% ÷ 80% = 0.25，0.25 × 34 = 8.5 席。之後先分配整數 8 席，再依小數大小分配剩餘席次（最大餘數法）。",
    nodeId: "civics.senior.elections",
    difficulty: 3,
  },
  {
    id: id("e4"),
    type: "tf",
    stem: "依憲法增修條文，各政黨的全國不分區及僑居國外國民立委當選名單中，婦女不得低於二分之一。",
    answer: true,
    explain: "這是婦女保障名額的規定，目的是提高女性在國會中的代表性。",
    nodeId: "civics.senior.elections",
  },
  {
    id: id("e5"),
    type: "single",
    stem: "依政治學常見的觀察，「單一選區相對多數制」較容易形成哪一種政黨體系？",
    choices: ["兩大黨競爭", "眾多小黨林立", "一黨專政", "沒有政黨"],
    answer: 0,
    explain:
      "單一選區只有得票最多的一人當選，小黨很難勝選，選民也可能把票集中給較有希望的候選人，因此容易形成兩大黨競爭（杜瓦傑法則）。比例代表制則較有利於多黨並存。",
    nodeId: "civics.senior.elections",
    difficulty: 2,
  },
  {
    id: id("e6"),
    type: "single",
    stem: "下列哪一句屬於「意見評論」，而不是「事實陳述」？",
    choices: [
      "這部電影上映首週票房突破一億元",
      "這部電影是今年最感人、最值得看的作品",
      "這部電影由三位新人演員主演",
      "這部電影片長 125 分鐘",
    ],
    answer: 1,
    explain: "事實陳述可以被查證真假；「最感人、最值得看」是個人的評價與判斷，屬於意見。",
    nodeId: "civics.senior.media",
    difficulty: 1,
  },
  {
    id: id("e7"),
    type: "multi",
    stem: "在網路上看到驚人的消息時，下列哪些是良好的查證習慣？（複選）",
    choices: [
      "確認消息來源與發布時間",
      "比對多個可信的媒體或查核資訊",
      "看到情緒性標題就立刻轉傳提醒親友",
      "留意圖片或影片是否被移花接木",
    ],
    answer: [0, 1, 3],
    explain:
      "查證來源、交叉比對、檢查圖片影片是否被竄改，都是媒體識讀的基本功；情緒性標題更要冷靜查證後再決定是否分享。",
    nodeId: "civics.senior.media",
  },
  {
    id: id("e8"),
    type: "single",
    stem: "一份民調的抽樣誤差為正負 3 個百分點（信賴水準 95%），甲的支持度 42%、乙 40%。下列解讀何者最恰當？",
    choices: [
      "甲一定領先乙 2 個百分點",
      "兩人差距在抽樣誤差範圍內，無法確定誰領先",
      "乙一定會落選",
      "抽樣誤差代表民調造假",
    ],
    answer: 1,
    explain:
      "甲的真實支持度可能落在約 39%～45%，乙約 37%～43%，兩個區間重疊，差距在誤差範圍內，不能斷言誰領先。",
    nodeId: "civics.senior.media",
    difficulty: 3,
  },
  {
    id: id("e9"),
    type: "single",
    stem: "政黨與利益團體最主要的差別是什麼？",
    choices: [
      "政黨以推出候選人、取得或影響執政為目的；利益團體不以取得政權為目的",
      "利益團體一定是營利公司",
      "政黨不能參與選舉",
      "利益團體可以直接制定法律",
    ],
    answer: 0,
    explain:
      "政黨透過選舉爭取執政；利益團體（如環保團體、職業公會）則以遊說、倡議、動員輿論等方式影響政策，不直接爭取政權。",
    nodeId: "civics.senior.parties",
  },
  // 契約、侵權與消費者保護
  {
    id: id("c1"),
    type: "single",
    stem: "小安網購一件外套，收到後試穿覺得不喜歡。依《消費者保護法》，他可以怎麼做？",
    choices: [
      "收到商品後 7 日內，可以不說明理由解除契約，無須負擔任何費用",
      "只有商品有瑕疵時才能退貨",
      "只要拆封就不能退貨",
      "必須支付三成手續費才能退貨",
    ],
    answer: 0,
    explain:
      "通訊交易的消費者，得於收受商品後 7 日內，以退回商品或書面通知的方式解除契約，無須說明理由及負擔任何費用或對價（法令另有合理例外者除外）。",
    nodeId: "civics.senior.contract",
    difficulty: 1,
  },
  {
    id: id("c2"),
    type: "multi",
    stem: "依規定，下列哪些通訊交易的商品，業者通常可以排除 7 日內無理由解除契約？（複選）",
    choices: [
      "易於腐敗的生鮮食品",
      "依消費者要求客製化的商品",
      "經消費者拆封的影音商品或電腦軟體",
      "一般成衣",
    ],
    answer: [0, 1, 2],
    explain:
      "主管機關訂有合理例外情事，例如易腐敗或保存期限較短的商品、客製化給付、報紙期刊、經拆封的影音商品或電腦軟體、已拆封的個人衛生用品等。一般成衣不在例外之列。",
    nodeId: "civics.senior.contract",
    difficulty: 2,
  },
  {
    id: id("c3"),
    type: "tf",
    stem: "依「契約自由原則」，只要雙方都同意，約定任何內容都有效。",
    answer: false,
    explain: "契約自由有界限：違反法律強制或禁止規定、或違背公共秩序善良風俗的約定無效。",
    nodeId: "civics.senior.contract",
  },
  {
    id: id("c4"),
    type: "numeric",
    stem: "依住宅租賃的相關規定，押金最多不得超過幾個月的租金總額？",
    answer: 2,
    unit: "個月",
    explain:
      "《租賃住宅市場發展及管理條例》規定，押金不得超過 2 個月租金的總額；租約終止返還租屋時，房東應返還押金或抵充後的餘額。",
    nodeId: "civics.senior.contract",
    difficulty: 2,
  },
  {
    id: id("c5"),
    type: "cloze",
    stem: "民法規定：租賃物的修繕，除契約另有訂定或另有習慣外，由 ____ 負擔。",
    accept: ["出租人", "房東"],
    explain:
      "民法第 429 條：租賃物之修繕，除契約另有訂定或另有習慣外，由出租人負擔。所以設備自然老化故障，原則上由房東修繕。",
    nodeId: "civics.senior.contract",
  },
  {
    id: id("c6"),
    type: "single",
    stem: "下列何者「不是」一般侵權行為的成立要件？",
    choices: ["行為人有故意或過失", "有損害發生", "行為與損害之間有因果關係", "加害人必須已經成年"],
    answer: 3,
    explain:
      "一般侵權行為要件包括：故意或過失、不法侵害他人權利、發生損害、因果關係。未成年人只要行為時有識別能力，也要負責，並與法定代理人連帶負損害賠償責任。",
    nodeId: "civics.senior.tort",
    difficulty: 2,
  },
  {
    id: id("c7"),
    type: "single",
    stem: "16 歲的阿明騎腳踏車時滑手機，撞傷行人。行人可以向誰請求損害賠償？",
    choices: [
      "只能向阿明的學校請求",
      "阿明（行為時有識別能力）與其法定代理人連帶負責",
      "因為阿明未成年，所以沒有人需要負責",
      "只能向警察局請求",
    ],
    answer: 1,
    explain:
      "民法第 187 條：限制行為能力人不法侵害他人權利，以行為時有識別能力為限，與其法定代理人連帶負損害賠償責任。",
    nodeId: "civics.senior.tort",
    difficulty: 2,
  },
  {
    id: id("c8"),
    type: "single",
    stem: "刑事訴訟中，代表國家偵查犯罪、並向法院提起公訴的是誰？",
    choices: ["法官", "檢察官", "律師", "立法委員"],
    answer: 1,
    explain: "檢察官負責偵查犯罪並提起公訴；法官負責審判；律師為被告辯護或為當事人提供法律協助。",
    nodeId: "civics.senior.criminal",
  },
  {
    id: id("c9"),
    type: "tf",
    stem: "依無罪推定原則，被告在依法審判、判決有罪確定之前，應被推定為無罪。",
    answer: true,
    explain:
      "無罪推定要求由檢察官負舉證責任，證明被告犯罪；媒體與社會也應避免在判決前就把嫌疑人當成罪犯。",
    nodeId: "civics.senior.criminal",
  },
  // 勞動權益與救濟
  {
    id: id("w1"),
    type: "single",
    stem: "平日延長工作時間，前 2 小時的工資至少應按平日每小時工資額加給多少？",
    choices: ["1/4", "1/3", "1/2", "2/3"],
    answer: 1,
    explain:
      "《勞動基準法》第 24 條：延長工作時間在 2 小時以內者，按平日每小時工資額加給 1/3 以上；再延長 2 小時以內者，加給 2/3 以上。",
    nodeId: "civics.senior.labor-rights",
    difficulty: 1,
  },
  {
    id: id("w2"),
    type: "numeric",
    stem: "假設工讀生時薪 210 元，某個平日做滿正常工時 8 小時後，又延長工作 2 小時。這 2 小時的工資至少是多少元？",
    answer: 560,
    unit: "元",
    explain:
      "前 2 小時加給 1/3：每小時 210 × (1 + 1/3) = 280 元，2 小時共 560 元。（時薪 210 元僅為計算用的假設數字。）",
    nodeId: "civics.senior.labor-rights",
    difficulty: 2,
  },
  {
    id: id("w3"),
    type: "tf",
    stem: "在適用《勞動基準法》的行業中，部分工時的工讀生同樣受到最低工資、延長工時工資等規定的保障。",
    answer: true,
    explain:
      "適用勞基法的勞工，不因全職或部分工時而有不同的保障；打工族同樣享有最低工資、超過法定正常工時（每日 8 小時）的延長工時工資等權益，雇主也應依《勞工退休金條例》為其提繳退休金。",
    nodeId: "civics.senior.labor-rights",
  },
  {
    id: id("w4"),
    type: "single",
    stem: "店長因為工讀生不小心打破杯子，直接從薪水裡扣錢當賠償。依《勞動基準法》，這樣做對嗎？",
    choices: [
      "可以，雇主有權自行扣薪",
      "不可以，雇主不得預扣勞工工資作為違約金或賠償費用",
      "可以，只要扣不到一半薪水",
      "可以，只要事先在店內公告",
    ],
    answer: 1,
    explain:
      "勞基法第 26 條：雇主不得預扣勞工工資作為違約金或賠償費用。若真有損害，應另外依民法處理，而不是自行扣薪。",
    nodeId: "civics.senior.labor-rights",
    difficulty: 2,
  },
  {
    id: id("w5"),
    type: "single",
    stem: "依《勞工退休金條例》，雇主每月為勞工提繳到個人退休金專戶的金額，不得低於工資的多少？",
    choices: ["2%", "6%", "10%", "12%"],
    answer: 1,
    explain: "雇主應按月提繳不低於勞工每月工資 6% 的退休金；勞工也可以在工資 6% 範圍內自願提繳。",
    nodeId: "civics.senior.labor-rights",
  },
  {
    id: id("w6"),
    type: "numeric",
    stem: "人民不服行政處分，應自行政處分達到或公告期滿之次日起幾日內提起訴願？",
    answer: 30,
    unit: "日",
    explain: "依《訴願法》，訴願應於 30 日內提起；不服訴願決定，可以再向行政法院提起行政訴訟。",
    nodeId: "civics.senior.admin-remedy",
  },
  {
    id: id("w7"),
    type: "cloze",
    stem: "公務員執行職務時故意或過失不法侵害人民權利，人民可以依《____ 法》向國家請求賠償。",
    accept: ["國家賠償", "國賠"],
    explain:
      "國家賠償法讓人民可直接向國家（賠償義務機關）請求賠償，先以書面向機關請求，協議不成再向法院起訴。",
    nodeId: "civics.senior.admin-remedy",
  },
  // 市場、失靈與財政
  {
    id: id("m1"),
    type: "single",
    stem: "政府設定的價格上限「低於」均衡價格時，市場會出現什麼現象？",
    choices: [
      "短缺（需求量大於供給量）",
      "過剩（供給量大於需求量）",
      "市場不受影響",
      "價格自動上升到均衡價格",
    ],
    answer: 0,
    explain:
      "價格被壓低時，買方想買更多、賣方願意賣更少，需求量大於供給量，形成短缺，可能出現排隊或黑市。",
    nodeId: "civics.senior.price-control",
    difficulty: 1,
  },
  {
    id: id("m2"),
    type: "single",
    stem: "政府以高於市場均衡的價格保證收購某種農產品（價格下限），依供需模型推論，最可能出現？",
    choices: ["農產品短缺", "農產品過剩", "均衡數量不變", "需求曲線向右移"],
    answer: 1,
    explain: "價格下限高於均衡價格時，供給量大於需求量，形成過剩，政府常需收購並儲存多出來的產量。",
    nodeId: "civics.senior.price-control",
  },
  {
    id: id("m3"),
    type: "numeric",
    stem: "某商品價格由 50 元漲到 55 元（上漲 10%），需求量由 1000 個減少為 800 個（減少 20%）。需求價格彈性（取絕對值）是多少？",
    answer: 2,
    explain:
      "需求價格彈性 = 需求量變動百分比 ÷ 價格變動百分比 = 20% ÷ 10% = 2，大於 1，屬於富有彈性。",
    nodeId: "civics.senior.elasticity",
    difficulty: 2,
  },
  {
    id: id("m4"),
    type: "single",
    stem: "承上題，這家店漲價後的總收入會？",
    choices: ["增加", "減少", "不變", "無法判斷"],
    answer: 1,
    explain:
      "漲價前 50 × 1000 = 50,000 元；漲價後 55 × 800 = 44,000 元。需求富有彈性時，漲價會使總收入減少。",
    nodeId: "civics.senior.elasticity",
    difficulty: 2,
  },
  {
    id: id("m5"),
    type: "single",
    stem: "下列哪一項最符合「公共財」的特性（非敵對性、非排他性）？",
    choices: ["便當", "國防", "收費的串流影音平臺", "公海的漁獲"],
    answer: 1,
    explain:
      "國防保護全體國民，多一人受保護不會減少他人的保障（非敵對），也無法排除未付費者（非排他）。便當是私有財；收費串流平臺可排他；公海漁獲有敵對性，屬於共有資源。",
    nodeId: "civics.senior.market-failure",
    difficulty: 2,
  },
  {
    id: id("m6"),
    type: "single",
    stem: "工廠生產時排放廢水，汙染下游的農田，但工廠不必負擔這些成本。若政府不介入，市場的產量會？",
    choices: ["低於社會最適產量", "高於社會最適產量", "剛好等於社會最適產量", "變成零"],
    answer: 1,
    explain: "這是負外部性：工廠只考慮私人成本，忽略了社會成本，因此生產過多，高於社會最適產量。",
    nodeId: "civics.senior.market-failure",
    difficulty: 2,
  },
  {
    id: id("m7"),
    type: "multi",
    stem: "政府想改善負外部性（如汙染）問題，下列哪些是可行的政策工具？（複選）",
    choices: [
      "對汙染課稅或徵收汙染費",
      "訂定排放標準並加以管制",
      "建立排放權交易制度",
      "補貼汙染者使其擴大生產",
    ],
    answer: [0, 1, 2],
    explain:
      "課稅（皮古稅）、管制、排放權交易都能讓汙染成本反映在生產決策中；補貼汙染者擴產只會讓汙染更嚴重。",
    nodeId: "civics.senior.market-failure",
  },
  {
    id: id("m8"),
    type: "single",
    stem: "下列哪一種稅屬於「間接稅」（稅負容易轉嫁給消費者）？",
    choices: ["綜合所得稅", "營業稅", "房屋稅", "遺產稅"],
    answer: 1,
    explain:
      "營業稅由營業人繳納，但通常包含在售價中轉嫁給消費者，屬於間接稅；所得稅、房屋稅、遺產稅則較難轉嫁，屬於直接稅。",
    nodeId: "civics.senior.public-finance",
    difficulty: 2,
  },
  {
    id: id("m9"),
    type: "tf",
    stem: "累進稅率是指所得越高，適用的稅率也越高。",
    answer: true,
    explain:
      "累進稅率依「量能課稅」原則，讓負擔能力較高者繳較高比例的稅，我國綜合所得稅即採累進稅率。",
    nodeId: "civics.senior.public-finance",
  },
  {
    id: id("m10"),
    type: "single",
    stem: "全民健康保險屬於哪一類社會福利？",
    choices: ["社會保險", "社會救助", "福利服務", "國際援助"],
    answer: 0,
    explain:
      "全民健保由政府、雇主與被保險人共同負擔保費，透過風險分攤保障就醫，屬於社會保險。社會救助則是針對低收入戶等經濟弱勢的補助。",
    nodeId: "civics.senior.welfare",
  },
  {
    id: id("m11"),
    type: "single",
    stem: "羅爾斯提出「無知之幕」的思想實驗：人們在不知道自己將來的身分、能力與處境時選擇社會規則。他認為人們會同意哪一種主張？",
    choices: [
      "社會的不平等安排，應使處境最不利者獲得最大利益",
      "完全依市場競爭分配，政府不介入",
      "只要追求最大多數人的最大快樂即可",
      "依血統決定社會地位",
    ],
    answer: 0,
    explain:
      "羅爾斯的「差異原則」主張：不平等只有在能讓最不利者得到最大利益時才可被接受，所以重視社會安全網與機會平等。",
    nodeId: "civics.senior.welfare",
    difficulty: 3,
  },
  {
    id: id("m12"),
    type: "tf",
    stem: "資訊不對稱（例如二手車買家不清楚車況，賣家卻很清楚）也可能造成市場失靈。",
    answer: true,
    explain:
      "一方掌握較多資訊時，交易可能無法有效率地進行，例如好車賣不到好價格、劣車充斥市場。政府可透過資訊揭露、檢驗標章等方式改善。",
    nodeId: "civics.senior.market-failure",
  },
  {
    id: id("m13"),
    type: "single",
    stem: "世界貿易組織（WTO）的主要功能是什麼？",
    choices: [
      "推動貿易自由化並處理會員間的貿易爭端",
      "發行全球共同貨幣",
      "維持國際和平並派遣維和部隊",
      "審判戰爭罪犯",
    ],
    answer: 0,
    explain:
      "WTO 制定國際貿易規則、推動降低關稅與貿易障礙，並設有爭端解決機制。我國以「臺澎金馬個別關稅領域」名義於 2002 年加入。",
    nodeId: "civics.senior.globalization",
  },
];

export default questions;
