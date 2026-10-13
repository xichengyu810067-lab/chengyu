import type { CurriculumNode } from "../../types";

/** 國中公民（108 課綱社會領域・公民與社會，第四學習階段）學習內容 */
const mindmap: CurriculumNode = {
  id: "civics.junior",
  title: "國中公民",
  summary:
    "依 108 課綱「公民身分認同及社群」「社會生活的組織及制度」「社會的運作、治理及參與實踐」「民主社會的理想及現實」四大主題，常見編排為：七年級個人與社會、八年級政治與法律、九年級經濟與全球化。",
  children: [
    {
      id: "civics.junior.society",
      title: "個人、家庭與社會",
      grade: 7,
      summary: "從認識自己出發，理解人性尊嚴、性別平等、家庭、學校、社區與多元文化。",
      children: [
        {
          id: "civics.junior.dignity",
          title: "自我成長與人性尊嚴",
          grade: 7,
          summary: "每個人都有不可被剝奪的價值，應被當作「目的」而不是「工具」來對待。",
          keyPoints: [
            "人性尊嚴是一切人權的基礎",
            "尊重他人的身體、隱私、名譽與自主決定",
            "霸凌、歧視、羞辱都是侵害人性尊嚴的行為",
          ],
          lessonIds: ["civics.junior.dignity-gender-family"],
        },
        {
          id: "civics.junior.gender",
          title: "性別平等",
          grade: 7,
          summary: "辨識性別刻板印象與偏見，尊重多元的性別特質、性別認同與性傾向。",
          keyPoints: [
            "刻板印象：用單一印象概括某一群人（例如「男生不能哭」）",
            "《性別平等教育法》保障學生不因性別而受差別待遇",
            "職場有《性別平等工作法》，禁止性別歧視與性騷擾",
          ],
          lessonIds: ["civics.junior.dignity-gender-family"],
        },
        {
          id: "civics.junior.family",
          title: "家庭與親屬",
          grade: 7,
          summary: "家庭的功能與型態、親屬關係與親等計算，以及家庭暴力的防治。",
          keyPoints: [
            "民法上的親屬包括配偶、血親（直系、旁系）與姻親",
            "直系血親數世代；旁系血親數到共同祖先再往下數",
            "遭遇家庭暴力可撥打 113 保護專線求助",
          ],
          lessonIds: ["civics.junior.dignity-gender-family"],
        },
        {
          id: "civics.junior.school-community",
          title: "校園民主與社區參與",
          grade: 7,
          summary: "班會、學生自治與社區營造，都是練習民主與公共參與的場域。",
          keyPoints: [
            "民主程序：提案 → 討論 → 表決 → 執行與檢討",
            "多數決之外，也要保障少數意見的表達",
            "社區營造：居民共同關心並改善生活環境",
          ],
          lessonIds: ["civics.junior.community-culture"],
        },
        {
          id: "civics.junior.groups",
          title: "社會團體與志願服務",
          grade: 7,
          summary:
            "人們為了共同目標組成團體，可分為營利與非營利團體；志願服務則是不求報酬的公共參與。",
          keyPoints: [
            "營利團體：公司、商號，以賺取利潤為目的",
            "非營利組織（NPO）：基金會、公益社團，以公共利益為目的",
            "志願服務出於自由意願、不以報酬為目的",
          ],
          lessonIds: ["civics.junior.community-culture"],
        },
        {
          id: "civics.junior.culture",
          title: "文化與多元社會",
          grade: 7,
          summary:
            "臺灣是多族群社會，包含原住民族、閩南、客家、戰後移入者與新住民等，應尊重彼此文化。",
          keyPoints: [
            "我族中心主義：以自己的文化為標準評價他人",
            "文化相對論：在其文化脈絡中理解他人的做法",
            "政府認定的原住民族有 17 族（2026 年西拉雅族獲核定為第 17 族，其他平埔族群仍在申請中）",
          ],
          lessonIds: ["civics.junior.community-culture"],
        },
      ],
    },
    {
      id: "civics.junior.politics",
      title: "民主政治與政府",
      grade: 8,
      summary: "認識國家與民主政治、憲法對人權的保障、中央與地方政府的分工，以及公民參與的方式。",
      children: [
        {
          id: "civics.junior.state",
          title: "國家與民主政治",
          grade: 8,
          summary: "國家由人民、領土、政府與主權組成；民主政治以國民主權、法治與權力分立為原則。",
          keyPoints: [
            "國民主權：國家權力來自全體人民",
            "法治：政府的權力受法律約束（依法行政）",
            "權力分立與制衡：避免權力集中而被濫用",
          ],
          lessonIds: ["civics.junior.democracy-government"],
        },
        {
          id: "civics.junior.constitution",
          title: "憲法與基本人權",
          grade: 8,
          summary: "憲法是國家的根本大法，規定政府組織並保障人民基本權利。",
          keyPoints: ["憲法位階最高，法律、命令牴觸憲法者無效"],
          lessonIds: ["civics.junior.constitution-rights"],
          children: [
            {
              id: "civics.junior.rights-types",
              title: "基本權利的種類",
              grade: 8,
              summary: "常見分為平等權、自由權、受益權與參政權。",
              keyPoints: [
                "平等權：法律之前人人平等，也重視實質平等",
                "自由權：人身、言論、宗教、居住遷徙、集會結社等自由",
                "受益權：請求國家給付或保護，如受國民教育、訴願、訴訟",
                "參政權：選舉、罷免、創制、複決、應考試、服公職",
              ],
              lessonIds: ["civics.junior.constitution-rights"],
            },
            {
              id: "civics.junior.rights-limits",
              title: "人權的限制（憲法第 23 條）",
              grade: 8,
              summary:
                "為防止妨礙他人自由、避免緊急危難、維持社會秩序或增進公共利益所必要者，才能以法律限制人民的自由權利。",
              keyPoints: [
                "要有正當目的",
                "要以法律限制（法律保留）",
                "手段必要、造成的損害最小（比例原則）",
              ],
              lessonIds: ["civics.junior.constitution-rights"],
            },
          ],
        },
        {
          id: "civics.junior.central-gov",
          title: "中央政府體制（總統與五院）",
          grade: 8,
          summary: "我國中央政府包括總統與行政、立法、司法、考試、監察五院，彼此分工並相互制衡。",
          keyPoints: [
            "總統是國家元首，由人民直接選舉，任期 4 年，連選得連任一次",
            "行政院是國家最高行政機關，院長由總統任命",
            "立法院議決法律案、預算案；立法委員由人民選出",
            "司法院大法官組成憲法法庭，審理憲法訴訟案件",
            "考試院掌理考試與公務人員銓敘；監察院行使彈劾、糾舉與審計權",
          ],
          lessonIds: ["civics.junior.democracy-government"],
        },
        {
          id: "civics.junior.local-gov",
          title: "地方自治",
          grade: 8,
          summary: "地方居民選出首長與議員，自行處理地方事務。",
          keyPoints: [
            "直轄市、縣（市）、鄉（鎮、市）為地方自治團體",
            "行政機關（市政府、縣政府、公所）負責執行",
            "立法機關（議會、代表會）制定自治條例、審議預算",
          ],
          lessonIds: ["civics.junior.democracy-government"],
        },
        {
          id: "civics.junior.participation",
          title: "選舉與公民參與",
          grade: 8,
          summary: "公民可透過選舉、罷免、公民投票、陳情請願與參加公聽會等方式參與公共事務。",
          keyPoints: [
            "選舉四原則：普通、平等、直接、無記名（秘密）投票",
            "憲法規定年滿 20 歲有選舉權（2022 年下修為 18 歲的修憲案未獲複決通過）；公民投票的投票年齡為 18 歲",
            "公民參與也包括關心議題、理性討論與監督政府",
          ],
          lessonIds: ["civics.junior.democracy-government"],
        },
      ],
    },
    {
      id: "civics.junior.law",
      title: "法律與生活",
      grade: 8,
      summary: "法律規範人與人、人與國家之間的關係，並提供權利受侵害時的救濟管道。",
      children: [
        {
          id: "civics.junior.law-basics",
          title: "法律的意義與位階",
          grade: 8,
          summary: "法律須經立法院通過、總統公布；位階為憲法 ＞ 法律 ＞ 命令。",
          keyPoints: [
            "法律名稱：法、律、條例、通則",
            "命令由行政機關訂定，不得牴觸憲法與法律",
            "社會規範還包括道德、宗教、習俗，但只有法律以國家強制力為後盾",
          ],
          lessonIds: ["civics.junior.law-life"],
        },
        {
          id: "civics.junior.civil-law",
          title: "民法：行為能力、契約與侵權",
          grade: 8,
          summary: "民法處理私人之間的財產與身分關係，例如買賣、租賃、損害賠償、婚姻與繼承。",
          keyPoints: [
            "未滿 7 歲：無行為能力",
            "7 歲以上未滿 18 歲：限制行為能力",
            "18 歲以上：成年，有完全行為能力（2023 年 1 月 1 日起）",
            "因故意或過失不法侵害他人權利，要負損害賠償責任",
          ],
          lessonIds: ["civics.junior.law-life"],
        },
        {
          id: "civics.junior.criminal-law",
          title: "刑法：罪刑法定與刑罰",
          grade: 8,
          summary: "刑法規定哪些行為是犯罪及其刑罰；行為時法律沒有明文規定處罰者，不能處罰。",
          keyPoints: [
            "罪刑法定原則：行為之處罰，以行為時之法律有明文規定者為限",
            "主刑：死刑、無期徒刑、有期徒刑、拘役、罰金",
            "未滿 14 歲不罰；14 歲以上未滿 18 歲得減輕其刑",
          ],
          lessonIds: ["civics.junior.law-life"],
        },
        {
          id: "civics.junior.juvenile",
          title: "少年事件處理與兒少保護",
          grade: 8,
          summary: "12 歲以上未滿 18 歲的少年觸法，由少年法院（庭）以保護、教育為優先處理。",
          keyPoints: [
            "少年事件分為少年保護事件與少年刑事案件",
            "《兒童及少年福利與權益保障法》保護兒少身心健全發展",
            "遇到危險或不當對待，可向師長、社工或 113 保護專線求助",
          ],
          lessonIds: ["civics.junior.law-life"],
        },
        {
          id: "civics.junior.admin-law",
          title: "行政法與權利救濟",
          grade: 8,
          summary: "行政機關依法行政；人民不服行政處分可提起訴願、行政訴訟，民事糾紛可調解或訴訟。",
          keyPoints: [
            "行政罰的「罰鍰」不同於刑罰的「罰金」",
            "訴願：不服行政處分，30 日內提起",
            "鄉（鎮、市、區）調解委員會可免費調解民事與告訴乃論的刑事案件",
          ],
          lessonIds: ["civics.junior.law-life"],
        },
      ],
    },
    {
      id: "civics.junior.economy",
      title: "經濟生活與全球化",
      grade: 9,
      summary: "從選擇與機會成本出發，理解市場、貨幣、勞動、貿易與全球化對生活的影響。",
      children: [
        {
          id: "civics.junior.choice",
          title: "選擇與機會成本",
          grade: 9,
          summary: "資源有限而慾望無窮，因此必須選擇；選擇的代價是放棄的選項中價值最高的那一個。",
          keyPoints: [
            "稀少性：資源相對於慾望是有限的",
            "機會成本 = 放棄的其他選擇中，價值最高者",
            "理性選擇：比較效益與成本",
          ],
          lessonIds: ["civics.junior.economy-market"],
        },
        {
          id: "civics.junior.market",
          title: "市場供需與價格",
          grade: 9,
          summary: "需求與供給共同決定均衡價格與數量；價格像訊號，引導資源分配。",
          keyPoints: [
            "需求法則：其他條件不變，價格上升，需求量減少",
            "供給法則：其他條件不變，價格上升，供給量增加",
            "需求增加 → 價格上升、數量增加；供給減少 → 價格上升、數量減少",
          ],
          lessonIds: ["civics.junior.economy-market"],
        },
        {
          id: "civics.junior.money",
          title: "貨幣與金融",
          grade: 9,
          summary: "貨幣讓交易更方便；銀行等金融機構把資金從存款人帶到需要資金的人手上。",
          keyPoints: [
            "貨幣功能：交易媒介、計價單位、價值儲存、延期支付",
            "直接金融：發行股票、債券；間接金融：透過銀行存放款",
            "信用卡是「先消費、後付款」，要量入為出",
          ],
        },
        {
          id: "civics.junior.labor",
          title: "勞動與就業",
          grade: 9,
          summary: "勞動者受《勞動基準法》等法律保障，享有工資、工時、休假等基本權益。",
          keyPoints: [
            "工資不得低於依《最低工資法》公告的最低工資",
            "正常工作時間每日不超過 8 小時、每週不超過 40 小時",
            "失業類型：摩擦性、結構性、循環性失業",
          ],
        },
        {
          id: "civics.junior.trade",
          title: "國際貿易與比較利益",
          grade: 9,
          summary: "各國專業生產機會成本較低（具比較利益）的產品再進行交換，雙方都能得到更多。",
          keyPoints: [
            "絕對利益：生產同樣產品花費的資源較少",
            "比較利益：生產該產品的機會成本較低",
            "貿易障礙：關稅、配額等",
          ],
          lessonIds: ["civics.junior.economy-market"],
        },
        {
          id: "civics.junior.sustainability",
          title: "全球化與永續發展",
          grade: 9,
          summary: "全球化讓商品、資金、人才與資訊跨國流動，也帶來環境與分配的挑戰。",
          keyPoints: [
            "全球化的影響：產業分工、文化交流、跨國疾病與汙染",
            "公平貿易：讓生產者得到合理報酬",
            "永續發展：滿足當代需求，又不損及後代滿足其需求的能力",
          ],
        },
      ],
    },
  ],
};

export default mindmap;
