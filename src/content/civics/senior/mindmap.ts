import type { CurriculumNode } from "../../types";

/** 高中公民與社會（108 課綱部定必修，含部分加深加廣）學習內容 */
const mindmap: CurriculumNode = {
  id: "civics.senior",
  title: "高中公民與社會",
  summary:
    "延續國中的四大主題，以「探究與實作」的精神，分析人權保障、民主治理、法律與經濟制度如何影響公共生活。",
  children: [
    {
      id: "civics.senior.identity",
      title: "公民身分與人權",
      summary: "公民身分不只是國籍，也包含參與公共生活的能力與責任；人權保障是民主社會的核心。",
      children: [
        {
          id: "civics.senior.citizenship",
          title: "公民身分與社群",
          grade: 10,
          summary: "公民身分包含法律地位、權利義務與對社群的認同；現代人同時屬於多重社群。",
          keyPoints: [
            "公民德行：關心公共事務、理性溝通、尊重差異",
            "多重認同：家庭、學校、族群、國家乃至全球社群",
            "世界公民：關注跨國議題，如氣候變遷、難民人權",
          ],
        },
        {
          id: "civics.senior.dignity",
          title: "人性尊嚴與人權保障",
          grade: 10,
          summary: "人性尊嚴是人權的根源：人應被當作目的，而不只是手段。",
          keyPoints: [
            "人權具有普遍性，不因國籍、性別、族群而不同",
            "2009 年制定兩公約施行法，使兩公約具國內法律效力",
            "國家負有尊重、保護與實現人權的義務",
          ],
          lessonIds: ["civics.senior.human-rights"],
          children: [
            {
              id: "civics.senior.rights-generations",
              title: "人權的演進（三代人權）",
              grade: 10,
              summary: "人權概念隨歷史擴展：從要求國家不干涉，到要求國家給付，再到集體的連帶權利。",
              keyPoints: [
                "第一代：公民與政治權利（自由權、參政權）",
                "第二代：經濟、社會與文化權利（工作權、受教權、社會保障）",
                "第三代：集體權（發展權、環境權、和平權）",
              ],
              lessonIds: ["civics.senior.human-rights"],
            },
            {
              id: "civics.senior.proportionality",
              title: "人權限制與比例原則",
              grade: 10,
              summary: "限制人權須有法律依據，且通過比例原則的檢驗。",
              keyPoints: [
                "適當性：手段有助於達成目的",
                "必要性：在有效的手段中選擇侵害最小者",
                "衡量性（狹義比例）：造成的損害不可大於所欲達成的利益",
              ],
              lessonIds: ["civics.senior.human-rights"],
            },
          ],
        },
        {
          id: "civics.senior.equality",
          title: "平等與多元",
          grade: 10,
          summary: "從形式平等走向實質平等，關注性別、族群、身心障礙者等弱勢群體的處境。",
          keyPoints: [
            "形式平等：相同的人相同對待",
            "實質平等：考量差異，給予合理的差別待遇（如保障名額）",
            "消除歧視：性別平等、原住民族權利、無障礙環境",
          ],
          lessonIds: ["civics.senior.human-rights"],
        },
      ],
    },
    {
      id: "civics.senior.democracy",
      title: "國家與民主治理",
      summary: "比較不同的政府體制與選舉制度，理解權力如何被授與、行使與監督。",
      children: [
        {
          id: "civics.senior.state",
          title: "國家與政府",
          grade: 10,
          summary: "國家的構成與功能；政府須依憲法行使權力，並受人民監督。",
          keyPoints: [
            "國家要素：人民、領土、政府、主權",
            "憲政主義：以憲法限制政府權力、保障人權",
            "民主治理重視透明、課責與公民參與",
          ],
        },
        {
          id: "civics.senior.gov-systems",
          title: "政府體制比較",
          grade: 10,
          summary: "內閣制、總統制、雙首長制（半總統制）在行政與立法關係上各有特色。",
          keyPoints: [
            "內閣制：行政首長由國會多數產生，內閣對國會負責（如英國、日本）",
            "總統制：總統由人民選出，行政與立法分立，國會不能倒閣（如美國）",
            "雙首長制：民選總統與對國會負責的總理並存（如法國）",
          ],
          lessonIds: ["civics.senior.government-systems"],
        },
        {
          id: "civics.senior.taiwan-gov",
          title: "我國中央政府體制與權力制衡",
          grade: 10,
          summary:
            "總統直選並任命行政院院長；行政院對立法院負責；立法院可提不信任案，總統可被動解散立法院。",
          keyPoints: [
            "總統任命行政院院長，不需立法院同意",
            "覆議：行政院認為立法院決議窒礙難行時，經總統核可移請覆議",
            "不信任案通過，行政院院長應辭職，並得呈請總統解散立法院",
            "憲法法庭審理法規範憲法審查、總統副總統彈劾等案件",
          ],
          lessonIds: ["civics.senior.government-systems"],
        },
        {
          id: "civics.senior.elections",
          title: "選舉制度",
          grade: 10,
          summary: "選舉制度影響政黨體系與代表性；我國立法委員選舉採單一選區兩票制。",
          keyPoints: [
            "立法委員共 113 席：區域 73、原住民 6、全國不分區及僑居國外國民 34",
            "不分區席次依政黨票分配，得票率未達 5% 的政黨不分配",
            "各政黨不分區當選名單中，婦女不得低於二分之一",
            "單一選區相對多數制容易形成兩大黨競爭",
          ],
          lessonIds: ["civics.senior.elections-media"],
        },
        {
          id: "civics.senior.parties",
          title: "政黨、利益團體與公民參與",
          grade: 10,
          summary:
            "政黨以推出候選人、取得執政為目的；利益團體透過遊說影響政策；公民可透過多元管道參與。",
          keyPoints: [
            "政黨：匯集民意、推薦候選人、組織政府或監督執政",
            "利益團體：不以取得政權為目的，透過遊說、倡議影響決策",
            "公民參與：投票、公民投票、連署、公聽會、參與式預算",
          ],
          lessonIds: ["civics.senior.elections-media"],
        },
        {
          id: "civics.senior.media",
          title: "公共意見與媒體識讀",
          grade: 10,
          summary: "民意透過媒體形成與傳播；公民要能分辨事實與意見、查證訊息並解讀民意調查。",
          keyPoints: [
            "區分事實陳述與意見評論",
            "注意置入性行銷、假訊息與演算法造成的同溫層",
            "民調要看抽樣方法、樣本數與抽樣誤差",
          ],
          lessonIds: ["civics.senior.elections-media"],
        },
      ],
    },
    {
      id: "civics.senior.law",
      title: "法律與生活",
      summary: "從契約、侵權、刑事程序到勞動與行政救濟，理解法律如何保障權利、解決糾紛。",
      children: [
        {
          id: "civics.senior.rule-of-law",
          title: "法治原則與法律體系",
          grade: 11,
          summary: "法治國家要求依法行政、權力受法律拘束，並提供有效的權利救濟。",
          keyPoints: [
            "法律優位：命令不得牴觸法律",
            "法律保留：限制人民權利須有法律依據",
            "公法（憲法、行政法、刑法）與私法（民法）",
          ],
        },
        {
          id: "civics.senior.contract",
          title: "契約自由與消費者保護",
          grade: 11,
          summary:
            "私人可自由締約，但不得違反強制禁止規定或公序良俗；消費者保護法補強交易中弱勢的一方。",
          keyPoints: [
            "通訊交易（如網購）可於收受商品後 7 日內無理由解除契約",
            "定型化契約條款顯失公平者無效",
            "住宅租賃押金不得超過 2 個月租金總額",
          ],
          lessonIds: ["civics.senior.contract-tort"],
        },
        {
          id: "civics.senior.tort",
          title: "侵權責任與損害賠償",
          grade: 11,
          summary: "因故意或過失不法侵害他人權利，要負損害賠償責任。",
          keyPoints: [
            "成立要件：故意或過失、不法侵害權利、發生損害、因果關係",
            "未成年人有識別能力時，與法定代理人連帶負責",
            "損害賠償以回復原狀為原則，也可請求金錢賠償",
          ],
          lessonIds: ["civics.senior.contract-tort"],
        },
        {
          id: "civics.senior.criminal",
          title: "刑法原則與刑事程序",
          grade: 11,
          summary: "罪刑法定、無罪推定與正當法律程序，是刑事司法保障人權的關鍵。",
          keyPoints: [
            "檢察官偵查並提起公訴，法院審判",
            "無罪推定：判決有罪確定前，推定被告無罪",
            "告訴乃論之罪須於知悉犯人之時起 6 個月內告訴",
          ],
        },
        {
          id: "civics.senior.labor-rights",
          title: "勞動權益",
          grade: 11,
          summary: "《勞動基準法》規範工資、工時、休假與退休等最低勞動條件，打工者同樣受保障。",
          keyPoints: [
            "平日延長工時：前 2 小時加給 1/3 以上，再延長 2 小時以內加給 2/3 以上",
            "雇主不得預扣工資作為違約金或賠償費用",
            "雇主每月提繳不低於工資 6% 的勞工退休金",
            "勞資爭議可向地方勞工主管機關申請調解",
          ],
          lessonIds: ["civics.senior.labor-remedy"],
        },
        {
          id: "civics.senior.admin-remedy",
          title: "行政救濟與司法救濟",
          grade: 11,
          summary:
            "不服行政處分可訴願、行政訴訟；公務員違法造成損害可請求國家賠償；民事糾紛可調解或訴訟。",
          keyPoints: [
            "訴願：行政處分達到之次日起 30 日內提起",
            "不服訴願決定 → 向行政法院提起行政訴訟",
            "國家賠償法：公務員違法執行職務致人民受損",
          ],
          lessonIds: ["civics.senior.labor-remedy"],
        },
      ],
    },
    {
      id: "civics.senior.economy",
      title: "經濟與社會",
      summary: "市場能有效分配資源，但也會失靈；政府透過財政、管制與社會福利追求效率與公平。",
      children: [
        {
          id: "civics.senior.market",
          title: "市場機制與價格",
          grade: 11,
          summary: "價格由供需決定，引導生產與消費；政府干預價格會改變市場結果。",
          lessonIds: ["civics.senior.market-failure"],
          children: [
            {
              id: "civics.senior.elasticity",
              title: "需求與供給彈性",
              grade: 11,
              summary: "需求價格彈性 = 需求量變動百分比 ÷ 價格變動百分比（取絕對值）。",
              keyPoints: [
                "彈性 > 1：富有彈性，漲價使總收入減少",
                "彈性 < 1：缺乏彈性，漲價使總收入增加",
                "必需品、替代品少的商品通常缺乏彈性",
              ],
              lessonIds: ["civics.senior.market-failure"],
            },
            {
              id: "civics.senior.price-control",
              title: "價格管制",
              grade: 11,
              summary: "價格上限低於均衡價格會造成短缺；價格下限高於均衡價格會造成過剩。",
              keyPoints: [
                "價格上限例：政府限定民生物資售價上限",
                "價格下限例：農產品保證價格收購",
                "管制可能伴隨排隊、黑市或囤積等現象",
              ],
              lessonIds: ["civics.senior.market-failure"],
            },
          ],
        },
        {
          id: "civics.senior.market-failure",
          title: "市場失靈（外部性與公共財）",
          grade: 11,
          summary: "外部性、公共財、資訊不對稱與獨占，都可能使市場無法達到社會最適的結果。",
          keyPoints: [
            "負外部性（如汙染）→ 產量過多；正外部性（如疫苗）→ 產量過少",
            "公共財：非敵對、非排他，容易有搭便車問題",
            "矯正方式：課稅、補貼、管制、排放權交易",
          ],
          lessonIds: ["civics.senior.market-failure"],
        },
        {
          id: "civics.senior.public-finance",
          title: "國家財政與租稅",
          grade: 11,
          summary: "政府透過預算與租稅提供公共服務，並兼顧量能課稅與公平。",
          keyPoints: [
            "直接稅：納稅人難以轉嫁，如所得稅、房屋稅",
            "間接稅：可轉嫁給消費者，如營業稅、貨物稅",
            "累進稅率：所得越高，適用稅率越高（如綜合所得稅）",
          ],
        },
        {
          id: "civics.senior.welfare",
          title: "公平正義與社會福利",
          grade: 11,
          summary: "不同的正義觀對財富分配有不同主張；社會福利保障人民的基本生活。",
          keyPoints: [
            "羅爾斯：在「無知之幕」後選擇正義原則，重視最不利者",
            "社會保險：全民健康保險、勞工保險、國民年金",
            "社會救助：協助低收入戶等經濟弱勢",
          ],
        },
        {
          id: "civics.senior.globalization",
          title: "全球化與國際關係",
          grade: 11,
          summary: "全球化深化各國經濟與社會的相互依賴，也帶來分配不均、跨國治理等議題。",
          keyPoints: [
            "世界貿易組織（WTO）推動貿易自由化並處理貿易爭端",
            "區域經濟整合：自由貿易協定、區域貿易協定",
            "跨國議題：氣候變遷、傳染病、難民與人權",
          ],
        },
      ],
    },
  ],
};

export default mindmap;
