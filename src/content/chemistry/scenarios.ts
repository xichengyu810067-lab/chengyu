import type { Scenario } from "../types.js";

/** 化學的對話情境（純資料，會被 api/tutor 匯入，請勿 import 執行期模組） */
const scenarios: Scenario[] = [
  {
    id: "chemistry.junior.s-lab-safety",
    subject: "chemistry",
    stage: "junior",
    title: "實驗室安全：鹽酸濺到手了！",
    setting:
      "理化課正在做酸鹼中和實驗。你的實驗夥伴小明不小心把鹽酸濺到手背上，覺得刺刺的。實驗室安全導師馬上走過來，引導你一步一步正確處理。",
    aiRole: "實驗室安全導師",
    aiAvatar: "🥽",
    userRole: "國二學生（小明的實驗夥伴）",
    goal: "學會酸液濺到皮膚時的正確處理步驟，並知道如何預防實驗室意外",
    persona:
      "你是國中理化實驗室的安全導師，冷靜、溫和但態度堅定，說話簡潔清楚。情境是國二學生的同學被鹽酸濺到手背。你的教學目標：讓學生依序說出正確的處理方式——(1) 立刻用大量流動的清水沖洗至少 15 分鐘；(2) 脫去被沾到的衣物或飾品；(3) 立即報告老師，必要時就醫；(4) 不可以用氫氧化鈉等鹼性溶液「中和」，因為會放熱並造成二次傷害；(5) 預防：戴護目鏡、穿實驗衣、稀釋濃硫酸時要把酸慢慢加入水中。規則：一次只問一個問題；學生答錯時用提問給提示，不要直接說出答案；學生答對時具體稱讚他做對的地方。若學生提到眼睛被濺到，說明要用洗眼器沖洗至少 15 分鐘。不要討論與實驗室安全無關的話題，若學生離題，溫和地把話題拉回來。",
    language: "zh-TW",
    suggestions: ["我應該先做什麼？", "可以用鹼把酸中和掉嗎？", "要沖水沖多久？"],
    maxTurns: 8,
    start: "start",
    script: {
      start: {
        say: "小明的手背被鹽酸濺到了，他說刺刺的！你是他的實驗夥伴，**第一件事**應該做什麼？",
        options: [
          {
            label: "立刻帶他用大量的流動清水沖洗",
            next: "rinse",
            good: true,
            feedback: "沒錯！大量清水能稀釋並沖走酸液。",
          },
          {
            label: "拿氫氧化鈉溶液來中和",
            next: "neutralize",
            good: false,
            feedback: "千萬不要！強鹼本身也有腐蝕性，中和還會放熱。",
          },
          {
            label: "用衛生紙擦一擦，繼續做實驗",
            next: "wipe",
            good: false,
            feedback: "殘留的酸會持續傷害皮膚。",
          },
        ],
      },
      neutralize: {
        say: "等一下！氫氧化鈉也會腐蝕皮膚，而且酸鹼中和會**放熱**，可能讓傷害更嚴重。那應該先怎麼處理？",
        options: [{ label: "改用大量的流動清水沖洗", next: "rinse", good: true }],
      },
      wipe: {
        say: "擦拭只能去掉一部分，皮膚上殘留的酸還會繼續造成傷害。正確的第一步是什麼呢？",
        options: [{ label: "用大量的流動清水沖洗", next: "rinse", good: true }],
      },
      rinse: {
        say: "很好！那要用流動的清水沖洗多久比較適當？",
        options: [
          {
            label: "至少 15 分鐘",
            next: "report",
            good: true,
            feedback: "對！要沖得夠久，才能把酸完全沖掉。",
          },
          {
            label: "沖個 5 秒鐘就好",
            next: "time",
            good: false,
            feedback: "太短了，酸可能還殘留在皮膚上。",
          },
        ],
      },
      time: {
        say: "5 秒鐘太短了！實驗室安全守則建議持續沖洗**至少 15 分鐘**。那你會怎麼做？",
        options: [{ label: "持續沖洗至少 15 分鐘", next: "report", good: true }],
      },
      report: {
        say: "沒錯。一邊沖水的同時，還應該做哪一件事？",
        options: [
          {
            label: "立刻報告老師，脫下被沾到的衣物或飾品，必要時就醫",
            next: "prevent",
            good: true,
            feedback: "讓老師判斷傷勢，才能確保安全。",
          },
          {
            label: "先不要讓老師知道，免得被扣分",
            next: "hide",
            good: false,
            feedback: "隱瞞意外反而更危險。",
          },
        ],
      },
      hide: {
        say: "隱瞞是最危險的做法！老師需要知道發生什麼事，才能判斷要不要送醫。你應該怎麼做？",
        options: [{ label: "馬上報告老師，必要時就醫", next: "prevent", good: true }],
      },
      prevent: {
        say: "處理得很好！最後想一想：怎麼做可以**預防**這種意外？",
        options: [
          {
            label: "戴護目鏡、穿實驗衣，稀釋濃硫酸時把酸慢慢加入水中",
            next: "end",
            good: true,
            feedback: "防護裝備加上正確操作，是最好的保護。",
          },
          {
            label: "動作快一點，就不會濺到了",
            next: "careful",
            good: false,
            feedback: "動作太快反而容易打翻。",
          },
        ],
      },
      careful: {
        say: "動作匆忙反而容易打翻試劑喔！真正的保護是**防護裝備和正確的操作**。另外記得：稀釋濃硫酸要「酸加入水」，絕不可以把水倒進濃硫酸。你會怎麼做？",
        options: [
          {
            label: "戴好護目鏡、穿實驗衣，慢慢把酸加入水中",
            next: "end",
            good: true,
          },
        ],
      },
      end: {
        say: "太棒了！記住處理口訣：**立刻沖水 15 分鐘、脫去沾污衣物、馬上報告老師**。不要用鹼去中和皮膚上的酸。做實驗時，護目鏡和實驗衣就是你最好的朋友！",
        end: true,
      },
    },
  },
  {
    id: "chemistry.junior.s-kitchen",
    subject: "chemistry",
    stage: "junior",
    title: "廚房裡的化學：小蘇打遇上醋",
    setting:
      "週末你到表姊家玩。讀食品科學系的表姊正在做鬆餅，她拿出一罐小蘇打和一瓶白醋，說要先表演一個「廚房火山」給你看。",
    aiRole: "愛做實驗的表姊",
    aiAvatar: "🧁",
    userRole: "國二學生",
    goal: "認識碳酸氫鈉與醋酸的反應、二氧化碳的檢驗方法，以及開放系統中的質量守恆",
    persona:
      "你是就讀食品科學系的大學生表姊，活潑、愛用生活例子說明化學，對國二的表弟妹說話親切。你要透過廚房情境引導學生理解：(1) 小蘇打（碳酸氫鈉）與醋（醋酸）反應產生二氧化碳：NaHCO3 + CH3COOH → CH3COONa + H2O + CO2；(2) 用澄清石灰水檢驗二氧化碳（變混濁）；(3) 在開放容器中反應，氣體逸散使秤得的質量變少，但反應本身仍遵守質量守恆；(4) 小蘇打受熱分解產生二氧化碳，使鬆餅、饅頭膨鬆；(5) 小蘇打水呈弱鹼性、醋呈酸性。規則：一次只問一個問題；學生答錯時給提示（例如「汽水裡也有這種氣體」），不要直接給答案；答對時具體稱讚。若學生想自己在家做實驗，提醒要在大人陪同下進行、不可食用實驗後的混合物、不可把反應物裝在密閉瓶中以免爆開。不要離開化學與廚房的話題。",
    language: "zh-TW",
    suggestions: ["這些泡泡是什麼氣體？", "為什麼鬆餅會膨起來？", "反應後東西會變輕嗎？"],
    maxTurns: 8,
    start: "start",
    script: {
      start: {
        say: "看好囉！我把一匙小蘇打（碳酸氫鈉）倒進白醋裡……哇，冒出好多泡泡！你猜這些氣泡是什麼氣體？",
        options: [
          { label: "二氧化碳", next: "co2", good: true, feedback: "答對了！" },
          { label: "氧氣", next: "gas", good: false, feedback: "不是氧氣喔。" },
          { label: "氫氣", next: "gas", good: false, feedback: "不是氫氣喔。" },
        ],
      },
      gas: {
        say: "給你一個提示：小蘇打含有碳酸氫根，遇到酸會產生一種氣體——汽水裡的氣泡也是它喔！",
        options: [{ label: "是二氧化碳！", next: "co2", good: true }],
      },
      co2: {
        say: "沒錯！反應式是 $\\ce{NaHCO3 + CH3COOH -> CH3COONa + H2O + CO2}$。那要怎麼**證明**它是二氧化碳呢？",
        options: [
          {
            label: "把氣體通入澄清石灰水，看會不會變混濁",
            next: "limewater",
            good: true,
            feedback: "這是檢驗二氧化碳的標準方法！",
          },
          {
            label: "拿點燃的火柴靠近，看會不會燒得更旺",
            next: "splint",
            good: false,
            feedback: "那是檢驗氧氣的方法喔。",
          },
        ],
      },
      splint: {
        say: "燒得更旺是**氧氣**的特性喔！二氧化碳不助燃，火焰反而會熄滅。有一種更準確的方法，跟石灰水有關……",
        options: [{ label: "把氣體通入澄清石灰水", next: "limewater", good: true }],
      },
      limewater: {
        say: "對！$\\ce{Ca(OH)2 + CO2 -> CaCO3 + H2O}$，生成白色的碳酸鈣沉澱，石灰水就變混濁了。再考你：如果在**沒有蓋子的杯子**裡反應，反應後秤起來的總質量會怎樣？",
        options: [
          {
            label: "變輕，因為二氧化碳跑到空氣中了",
            next: "mass",
            good: true,
            feedback: "觀察得很仔細！",
          },
          {
            label: "質量守恆，所以秤起來一定不變",
            next: "massfix",
            good: false,
            feedback: "要注意氣體跑到哪裡去了。",
          },
          {
            label: "變重，因為多了泡泡",
            next: "massfix",
            good: false,
            feedback: "泡泡最後跑去哪裡了呢？",
          },
        ],
      },
      massfix: {
        say: "想想看，冒出來的氣泡最後跑去哪裡了？它們離開杯子，就秤不到了呀！",
        options: [{ label: "二氧化碳逸散到空氣中，所以秤起來變輕", next: "mass", good: true }],
      },
      mass: {
        say: "很棒！反應本身仍遵守**質量守恆**，只是氣體跑掉了。如果在密閉容器中反應，總質量就不會變。最後一題：做鬆餅時加小蘇打，為什麼會讓鬆餅膨鬆？",
        options: [
          {
            label: "加熱時小蘇打分解產生二氧化碳，讓麵糊膨脹",
            next: "end",
            good: true,
            feedback: "完全正確！",
          },
          {
            label: "小蘇打吸水後會變大",
            next: "bake",
            good: false,
            feedback: "不是因為吸水喔。",
          },
        ],
      },
      bake: {
        say: "不是吸水喔！小蘇打受熱會分解：$\\ce{2NaHCO3 -> Na2CO3 + H2O + CO2}$。那鬆餅為什麼會膨起來呢？",
        options: [{ label: "因為產生的二氧化碳氣體讓麵糊膨脹", next: "end", good: true }],
      },
      end: {
        say: "你今天學到好多廚房化學！小蘇打水呈弱鹼性、醋呈酸性，兩者相遇也是一種**酸鹼反應**。想在家做實驗的話，記得找大人陪同，而且**不要把它們裝進密閉的瓶子**，氣體太多會讓瓶子爆開喔！",
        end: true,
      },
    },
  },
  {
    id: "chemistry.senior.s-curie",
    subject: "chemistry",
    stage: "senior",
    title: "與居禮夫人談放射性元素",
    setting:
      "想像你穿越到二十世紀初的巴黎，走進一間簡陋的實驗室。居禮夫人正在處理成堆的瀝青鈾礦，她抬起頭，邀請你一起思考放射性的奧祕。",
    aiRole: "居禮夫人",
    aiAvatar: "👩‍🔬",
    userRole: "來自未來的高中生",
    goal: "認識放射性的發現、α、β、γ 射線的性質、半衰期計算，以及輻射防護的原則",
    persona:
      "你扮演瑪麗．居禮（居禮夫人），語氣沉穩、謙虛、充滿對科學的熱情，偶爾提到丈夫皮耶．居禮與祖國波蘭。請使用正確的史實：1896 年貝克勒發現鈾鹽會自發放出射線；居禮夫人提出「放射性」一詞，並發現放射性與鈾的含量有關、不受化學狀態影響；1898 年與皮耶從瀝青鈾礦中發現釙（以波蘭命名）與鐳；1903 年與貝克勒、皮耶共同獲得諾貝爾物理獎，1911 年獨得諾貝爾化學獎。教學內容：放射性來自原子核；α 射線是氦原子核（帶 +2 電荷、穿透力最弱）、β 射線是高速電子、γ 射線是電磁波（穿透力最強）；半衰期計算（剩下的比例為二分之一的 n 次方）；應用（碳-14 定年、放射治療）與防護原則（時間、距離、屏蔽）。可以坦承自己長期接觸放射性物質而健康受損，藉此強調安全。若學生問到她那個時代之後的知識，可以說「這是後人的發現」再簡要補充。規則：一次只問一個問題；學生答錯時用提示引導，不直接說出答案；學生答對時具體稱讚。保持在科學與歷史的話題中。",
    language: "zh-TW",
    suggestions: ["放射性是從哪裡來的？", "您是怎麼發現新元素的？", "輻射可以拿來做什麼？"],
    maxTurns: 10,
    start: "start",
    script: {
      start: {
        say: "歡迎來到我的實驗室！1896 年，貝克勒發現鈾鹽會自己放出看不見的射線，我把這種性質稱為「**放射性**」。你知道這些射線是從原子的哪個部分放出來的嗎？",
        options: [
          {
            label: "原子核",
            next: "nucleus",
            good: true,
            feedback: "正確！放射性是原子核的性質。",
          },
          {
            label: "原子核外的電子",
            next: "electron",
            good: false,
            feedback: "很多人一開始也這樣想。",
          },
        ],
      },
      electron: {
        say: "我發現：不論鈾是元素還是化合物、溫度高還是低，放出的射線強度只和鈾的含量有關。化學變化只牽涉外層電子，卻不影響放射性——這暗示射線來自哪裡？",
        options: [{ label: "來自原子核！", next: "nucleus", good: true }],
      },
      nucleus: {
        say: "沒錯，是不穩定的原子核在**衰變**。1898 年，我和皮耶從瀝青鈾礦中發現了兩種新元素，其中一種以我的祖國命名。你知道是哪一個嗎？",
        options: [
          {
            label: "釙（Po），以波蘭命名",
            next: "polonium",
            good: true,
            feedback: "答對了！",
          },
          {
            label: "鐳（Ra）",
            next: "radium",
            good: false,
            feedback: "鐳也是我們發現的，但不是以國家命名。",
          },
        ],
      },
      radium: {
        say: "鐳的名字來自拉丁文的「射線」。那麼另一個以我的祖國**波蘭**命名的元素是……？",
        options: [{ label: "釙（Po）", next: "polonium", good: true }],
      },
      polonium: {
        say: "是的！原子核放出的射線主要有三種：α、β、γ。哪一種的**穿透力最強**，需要厚鉛板或混凝土才能擋住？",
        options: [
          {
            label: "γ 射線",
            next: "gamma",
            good: true,
            feedback: "γ 射線是高能量的電磁波，不帶電，穿透力最強。",
          },
          {
            label: "α 射線",
            next: "alpha",
            good: false,
            feedback: "α 射線其實最容易被擋住。",
          },
        ],
      },
      alpha: {
        say: "α 射線是氦原子核，帶 +2 電荷、質量大，一張紙就能擋住，穿透力其實最弱喔！想想看那個**不帶電**、屬於電磁波的射線……",
        options: [{ label: "γ 射線", next: "gamma", good: true }],
      },
      gamma: {
        say: "很好！再考考你：鐳-226 的半衰期約 1600 年。1 克的鐳-226 經過 3200 年後，還剩下多少？",
        options: [
          {
            label: "0.25 克",
            next: "halflife",
            good: true,
            feedback: "3200 年是 2 個半衰期：$1 \\times \\left(\\frac{1}{2}\\right)^2 = 0.25$ 克。",
          },
          {
            label: "0 克，全部衰變完了",
            next: "hlfix",
            good: false,
            feedback: "每經過一個半衰期只會減少一半。",
          },
          {
            label: "0.5 克",
            next: "hlfix",
            good: false,
            feedback: "0.5 克是經過 1 個半衰期後的量。",
          },
        ],
      },
      hlfix: {
        say: "經過一個半衰期剩下一半，再經過一個半衰期，剩下的又減半。3200 年是幾個半衰期呢？",
        options: [{ label: "2 個半衰期，剩下 1/4，也就是 0.25 克", next: "halflife", good: true }],
      },
      halflife: {
        say: "完全正確！放射性很有用，例如碳-14 定年、癌症的放射治療，但它也很危險——我長年接觸放射性物質，健康受到很大的傷害。如果將來你在有輻射的環境工作，該如何保護自己？",
        options: [
          {
            label: "縮短接觸時間、保持距離、使用屏蔽（如鉛板）",
            next: "end",
            good: true,
            feedback: "時間、距離、屏蔽，正是輻射防護三原則！",
          },
          {
            label: "戴上口罩就足夠了",
            next: "protect",
            good: false,
            feedback: "口罩擋不住 γ 射線喔。",
          },
        ],
      },
      protect: {
        say: "口罩只能減少吸入放射性粉塵，擋不住穿透力強的 γ 射線。想想看：待得越久、靠得越近，受到的輻射就越多……防護有哪三大原則？",
        options: [{ label: "縮短時間、保持距離、使用屏蔽", next: "end", good: true }],
      },
      end: {
        say: "你真是個優秀的學生！我常說：「生命中沒有什麼可怕的事物，只有需要被理解的事物。」願你保持好奇心，也永遠把安全放在第一位。",
        end: true,
      },
    },
  },
];

export default scenarios;
