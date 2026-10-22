import type { Lesson } from "../../types";

const communityScene = () => import("../scenes/CommunityScene");
const tradeLab = () => import("../labs/TradeLab");
const govBase = () => import("../scenes/governmentLayers").then((m) => ({ default: m.Base }));
const govPresident = () =>
  import("../scenes/governmentLayers").then((m) => ({ default: m.President }));
const govFive = () => import("../scenes/governmentLayers").then((m) => ({ default: m.FiveYuan }));
const govLocal = () => import("../scenes/governmentLayers").then((m) => ({ default: m.Local }));
const govVote = () => import("../scenes/governmentLayers").then((m) => ({ default: m.Vote }));

const q = (s: string) => `civics.junior.q-${s}`;

/* 供需拉桿：需求 Qd = 16 + d − P，供給 Qs = P − 2 + g（d、g 為曲線向右移動的量） */
const eqP = (d: number, g: number) => (18 + d - g) / 2;
const eqQ = (d: number, g: number) => (14 + d + g) / 2;

const lessons: Lesson[] = [
  {
    id: "civics.junior.dignity-gender-family",
    title: "人性尊嚴、性別平等與家庭",
    grade: 7,
    minutes: 12,
    nodeIds: ["civics.junior.dignity", "civics.junior.gender", "civics.junior.family"],
    objectives: [
      "說明人性尊嚴的意義，辨識侵害尊嚴的行為",
      "分辨性別刻板印象與尊重多元的做法",
      "能計算親等，並知道家庭暴力的求助管道",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：從「我」到社會",
        prompt: "點開每個節點，看看這堂課會談到哪些主題。",
        root: {
          id: "me",
          title: "我與社會",
          children: [
            {
              id: "me-dignity",
              title: "人性尊嚴",
              summary: "每個人都有不可被剝奪的價值，應被當作目的，而不是工具。",
            },
            {
              id: "me-gender",
              title: "性別平等",
              summary: "不因性別、性別特質、性別認同或性傾向而受到歧視。",
              children: [
                { id: "me-stereo", title: "刻板印象", summary: "用單一印象概括一群人。" },
                {
                  id: "me-law",
                  title: "性別平等教育法",
                  summary: "保障學生享有性別平等的學習環境。",
                },
              ],
            },
            {
              id: "me-family",
              title: "家庭",
              summary: "家庭是個人最早接觸的社會團體。",
              children: [
                {
                  id: "me-kin",
                  title: "親屬與親等",
                  summary: "配偶、血親（直系、旁系）與姻親。",
                },
                { id: "me-dv", title: "家庭暴力防治", summary: "遇到家暴可撥打 113 保護專線。" },
              ],
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "刻板印象，還是尊重多元？",
        prompt: "把每句話拖到正確的分類。",
        buckets: [
          { id: "stereo", label: "性別刻板印象或偏見" },
          { id: "respect", label: "尊重多元、性別平等" },
        ],
        items: [
          { id: "i1", label: "「男生要有男子氣概，哭就是軟弱」", bucket: "stereo" },
          { id: "i2", label: "「女生的數理能力天生比較差」", bucket: "stereo" },
          { id: "i3", label: "「家事本來就是媽媽的工作」", bucket: "stereo" },
          { id: "i4", label: "「笑同學娘娘腔，只是開玩笑而已」", bucket: "stereo" },
          { id: "i5", label: "「只要有興趣，男生也可以學芭蕾舞」", bucket: "respect" },
          { id: "i6", label: "「家務由家人依時間和能力一起分擔」", bucket: "respect" },
          { id: "i7", label: "「選社團幹部看能力與意願，不看性別」", bucket: "respect" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：我和表姊是幾親等？",
        problem: "小安想知道：自己和表姊（媽媽的姊姊的女兒）是幾親等的親屬？",
        steps: [
          {
            show: "表姊和小安有共同的祖先（外祖父母），但彼此不是上下代關係，所以是**旁系血親**。",
            predict: {
              question: "小安和表姊屬於哪一種親屬關係？",
              choices: ["直系血親", "旁系血親", "姻親"],
              answer: 1,
            },
          },
          {
            show: "先從自己往上數到共同祖先：小安 → 媽媽（1）→ 外祖父母（2）。",
            why: "民法規定，每差一個世代算一親等。",
          },
          {
            show: "再從共同祖先往下數到表姊：外祖父母 → 阿姨（3）→ 表姊（4）。",
          },
          {
            show: "總共 4 個世代，所以是**四親等旁系血親**。",
            predict: {
              question: "小安和表姊是幾親等？",
              choices: ["二親等", "三親等", "四親等"],
              answer: 2,
            },
          },
          {
            show: "民法禁止六親等以內的旁系血親結婚，所以堂、表兄弟姊妹之間不能結婚。",
            why: "近親結婚可能影響後代健康，也涉及家庭倫理。",
          },
        ],
        takeaway:
          "**直系血親**：上下數世代；**旁系血親**：先往上數到共同祖先，再往下數，總數就是親等。",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：家庭與親屬",
        prompt: "先想一想，再刮開看答案。",
        cards: [
          {
            front: "什麼是「直系血親」？",
            back: "生育自己的（父母、祖父母）或自己所生的（子女、孫子女）血親。",
          },
          {
            front: "什麼是「旁系血親」？",
            back: "和自己出自同一祖先、但不是上下代的血親，例如兄弟姊妹、叔伯、舅舅、堂表兄弟姊妹。",
          },
          {
            front: "「姻親」包括哪些人？",
            back: "血親的配偶（如嫂嫂）、配偶的血親（如公婆、岳父母）、配偶的血親的配偶。",
          },
          {
            front: "遇到家庭暴力，可以怎麼求助？",
            back: "告訴信任的師長、社工或警察，或撥打 **113 保護專線**（24 小時服務）。",
          },
          {
            front: "家庭有哪些功能？",
            back: "生育、養育與保護、經濟、教育與社會化、情感支持等。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("d1"), q("g1"), q("f1"), q("f3"), q("f4")],
      },
    ],
  },
  {
    id: "civics.junior.community-culture",
    title: "社區參與、社會團體與多元文化",
    grade: 7,
    minutes: 12,
    nodeIds: ["civics.junior.school-community", "civics.junior.groups", "civics.junior.culture"],
    objectives: [
      "認識社區中的公共設施與參與管道",
      "分辨營利組織與非營利組織",
      "以文化相對論的態度理解不同文化",
    ],
    activities: [
      {
        id: "a1",
        kind: "hotspot",
        title: "逛逛我們的社區",
        prompt: "點擊每個閃爍的熱點，看看社區裡的人們如何一起生活、參與公共事務。",
        viewBox: "0 0 480 320",
        scene: communityScene,
        mode: "explore",
        spots: [
          {
            id: "center",
            x: 168,
            y: 248,
            title: "社區活動中心",
            body: "社區發展協會在這裡舉辦長青食堂、課後陪讀等活動。居民一起討論、改善社區，就是**社區營造**。",
          },
          {
            id: "hall",
            x: 166,
            y: 126,
            title: "區公所",
            body: "地方行政的第一線，辦理社會福利、兵役等業務；公所設有**調解委員會**，可以免費調解鄰里間的糾紛。",
          },
          {
            id: "school",
            x: 452,
            y: 124,
            title: "學校",
            body: "透過班會、學生自治練習民主；假日開放操場給居民運動，也是社區的一部分。",
          },
          {
            id: "library",
            x: 72,
            y: 246,
            title: "圖書館",
            body: "人人都能免費使用的**公共設施**，許多志工在這裡協助借還書、為小朋友說故事。",
          },
          {
            id: "park",
            x: 244,
            y: 232,
            title: "社區公園",
            body: "公共空間屬於大家，需要共同維護；居民也可以透過連署、陳情，向公所反映改善的建議。",
          },
          {
            id: "temple",
            x: 362,
            y: 254,
            title: "廟宇",
            body: "宗教信仰與廟會、遶境等民俗活動，是地方文化的一部分，也常是居民交流的中心。",
          },
          {
            id: "shop",
            x: 452,
            y: 254,
            title: "新住民小吃店",
            body: "東南亞料理與多語招牌，展現臺灣的**多元文化**。認識不同文化、避免刻板印象，才能相互尊重。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "營利組織還是非營利組織？",
        prompt: "想一想：這個組織成立的主要目的是賺取利潤，還是追求公共利益？",
        buckets: [
          { id: "profit", label: "營利組織" },
          { id: "npo", label: "非營利組織" },
        ],
        items: [
          { id: "o1", label: "連鎖便利商店公司", bucket: "profit" },
          { id: "o2", label: "手機製造公司", bucket: "profit" },
          { id: "o3", label: "巷口的早餐店", bucket: "profit" },
          { id: "o4", label: "關懷流浪動物的協會", bucket: "npo" },
          { id: "o5", label: "提供急難救助的慈善基金會", bucket: "npo" },
          { id: "o6", label: "社區發展協會", bucket: "npo" },
          { id: "o7", label: "推動環境保護的公益團體", bucket: "npo" },
        ],
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：文化與多元",
        prompt: "把名詞和它的意思配成一對。",
        pairs: [
          ["我族中心主義", "以自己的文化為標準評價其他文化"],
          ["文化相對論", "放在對方的文化脈絡中理解其做法"],
          ["刻板印象", "用簡化的印象概括某一群人"],
          ["多元文化", "不同族群的文化平等共存、相互尊重"],
          ["歧視", "因身分特徵而給予不公平的對待"],
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "畫出我的社區地圖",
        task: "畫一張你家或學校附近的簡易地圖，標出至少 3 個公共設施（如公園、圖書館、公所、活動中心），再寫下一個你覺得可以改善的地方，以及你可以怎麼參與。",
        background: "grid",
        hint: "先畫主要道路，再用不同顏色標出公共設施；可以用文字工具寫下改善建議。",
        reference:
          "好的社區地圖會標示道路與重要地標。改善建議例如：「公園的路燈不夠亮 → 可以向里長反映，或在公所舉辦的說明會提出意見」。關心、提案、行動，就是社區參與。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("c1"), q("c3"), q("c5"), q("c6")],
      },
    ],
  },
  {
    id: "civics.junior.democracy-government",
    title: "民主政治與政府組織",
    grade: 8,
    minutes: 15,
    nodeIds: [
      "civics.junior.state",
      "civics.junior.central-gov",
      "civics.junior.local-gov",
      "civics.junior.participation",
    ],
    objectives: [
      "說出總統與五院的主要職權",
      "認識中央與地方政府的分工",
      "依序說出法律案的立法程序",
      "在班會情境中練習民主程序",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：我國政府的組成",
        prompt: "逐一打開圖層，看看政府是怎麼組成的，又有哪些職位由人民選出。",
        viewBox: "0 0 480 320",
        base: govBase,
        layers: [
          {
            id: "president",
            label: "總統",
            load: govPresident,
            color: "#b45309",
            on: true,
            note: "總統是國家元首，任期 4 年，連選得連任一次。",
          },
          {
            id: "five",
            label: "五院",
            load: govFive,
            color: "#2563eb",
            note: "行政、立法、司法、考試、監察五院分工合作，也互相制衡。",
          },
          {
            id: "local",
            label: "地方政府",
            load: govLocal,
            color: "#0d9488",
            note: "直轄市、縣（市）、鄉（鎮、市）都設有行政機關與立法機關，處理地方事務。",
          },
          {
            id: "vote",
            label: "人民選出的職位",
            load: govVote,
            color: "#e11d48",
            note: "總統、立法委員、地方首長與地方民意代表，都由人民直接選舉產生。",
          },
        ],
        check: {
          stem: "打開「人民選出的職位」圖層。下列哪一個機關的成員由人民直接選出？",
          choices: ["立法院的立法委員", "司法院的大法官", "監察院的監察委員", "考試院的考試委員"],
          answer: 0,
          explain:
            "立法委員由人民直接選出；大法官、監察委員、考試委員則由總統提名，經立法院同意後任命。",
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：五院與職權",
        prompt: "把每個機關拖到它的主要職權旁。",
        pairs: [
          { id: "p1", left: "行政院", right: "國家最高行政機關，執行政策" },
          { id: "p2", left: "立法院", right: "議決法律案、預算案" },
          { id: "p3", left: "司法院", right: "大法官組成憲法法庭，審理憲法訴訟" },
          { id: "p4", left: "考試院", right: "舉辦國家考試、掌理公務人員銓敘" },
          { id: "p5", left: "監察院", right: "行使彈劾、糾舉、糾正與審計權" },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "order",
        title: "排一排：法律是怎麼誕生的？",
        prompt: "把法律案的立法程序，依照先後順序排好。",
        items: [
          { id: "s1", label: "提案：行政院、立法委員等提出法律案" },
          { id: "s2", label: "一讀：在院會朗讀標題" },
          { id: "s3", label: "委員會審查" },
          { id: "s4", label: "二讀：廣泛討論與逐條討論" },
          { id: "s5", label: "三讀：文字修正，全案付表決" },
          { id: "s6", label: "總統公布" },
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：班會大作戰",
        prompt: "你是班會主席，和林老師一起練習民主程序。",
        scenarioId: "civics.junior.s-class-meeting",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("p1"), q("p3"), q("p4"), q("p6"), q("p8")],
      },
    ],
  },
  {
    id: "civics.junior.constitution-rights",
    title: "憲法與人權保障",
    grade: 8,
    minutes: 12,
    nodeIds: [
      "civics.junior.constitution",
      "civics.junior.rights-types",
      "civics.junior.rights-limits",
    ],
    objectives: [
      "分辨平等權、自由權、受益權、參政權",
      "依憲法第 23 條檢驗限制人權的措施",
      "說明國民主權、法律保留、比例原則等概念",
    ],
    activities: [
      {
        id: "a1",
        kind: "drag",
        mode: "categorize",
        title: "這是哪一種權利？",
        prompt: "把生活中的例子拖到對應的基本權利。",
        buckets: [
          { id: "eq", label: "平等權" },
          { id: "free", label: "自由權" },
          { id: "benefit", label: "受益權" },
          { id: "pol", label: "參政權" },
        ],
        items: [
          { id: "r1", label: "不論性別、宗教、種族，在法律上一律平等", bucket: "eq" },
          { id: "r2", label: "原住民族學生升學有保障名額", bucket: "eq" },
          { id: "r3", label: "在網路上發表對公共政策的看法", bucket: "free" },
          { id: "r4", label: "選擇信仰任何宗教，或不信仰宗教", bucket: "free" },
          { id: "r5", label: "搬家到另一個縣市居住", bucket: "free" },
          { id: "r6", label: "不服行政處分而提起訴願", bucket: "benefit" },
          { id: "r7", label: "接受國民教育", bucket: "benefit" },
          { id: "r8", label: "年滿 20 歲投票選出總統", bucket: "pol" },
          { id: "r9", label: "參加國家考試，成為公務人員", bucket: "pol" },
        ],
      },
      {
        id: "a2",
        kind: "steps",
        title: "步驟拆解：這樣限制人權合憲嗎？",
        problem:
          "法律規定：騎機車一定要戴安全帽，否則處以罰鍰。這限制了人民「想怎麼騎車就怎麼騎」的自由，可以嗎？用憲法第 23 條一步步檢驗。",
        steps: [
          {
            show: "**1. 限制了什麼權利？** 限制了人民決定自己行為方式的一般行為自由。",
            why: "先確認受到影響的權利，才知道要保護什麼。",
          },
          {
            show: "**2. 目的正當嗎？** 減少車禍時騎士的頭部傷害、保護生命，也減少重傷帶來的醫療與社會成本，屬於「增進公共利益」。",
            predict: {
              question: "這項規定的目的，最符合憲法第 23 條的哪一種情形？",
              choices: [
                "增進公共利益（保護生命、減少社會成本）",
                "讓政府增加收入",
                "多數人看不慣不戴安全帽",
              ],
              answer: 0,
            },
          },
          {
            show: "**3. 有法律依據嗎？** 由立法院通過的法律規定（道路交通管理處罰條例），符合「法律保留」。",
            why: "限制人民的自由權利，要由代表人民的立法院通過法律，不能由行政機關任意決定。",
          },
          {
            show: "**4. 手段合乎比例嗎？** 戴安全帽能有效降低頭部傷害（適當）；沒有其他同樣有效、對人民負擔更小的方法，違規也只處小額罰鍰（必要）；保護生命的利益遠大於戴安全帽的不便（衡量）。",
            predict: {
              question: "如果改成「沒戴安全帽就沒收機車」，最可能違反什麼？",
              choices: ["比例原則（手段過度）", "罪刑法定原則", "國民主權原則"],
              answer: 0,
            },
          },
          {
            show: "**結論**：目的正當、有法律依據、手段合乎比例，這項限制可以被認為是合理的。",
          },
        ],
        takeaway:
          "限制人權要通過三道關卡：**目的正當 → 以法律規定 → 手段合乎比例**。最後由憲法法庭判斷法令是否違憲。",
      },
      {
        id: "a3",
        kind: "memory",
        title: "翻牌配對：憲法的重要原則",
        pairs: [
          ["國民主權", "國家權力屬於全體國民"],
          ["權力分立", "把國家權力分給不同機關、互相制衡"],
          ["法律保留", "限制人民權利須由法律規定"],
          ["比例原則", "限制人權的手段要必要且損害最小"],
          ["違憲審查", "由憲法法庭判斷法令是否牴觸憲法"],
        ],
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：夜市管理與人權限制",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [q("set-night-market-1"), q("set-night-market-2"), q("set-night-market-3")],
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("r1"), q("r2"), q("r3"), q("r4"), q("r5")],
      },
    ],
  },
  {
    id: "civics.junior.law-life",
    title: "法律與生活：民法、刑法、行政法",
    grade: 8,
    minutes: 15,
    nodeIds: [
      "civics.junior.law-basics",
      "civics.junior.civil-law",
      "civics.junior.criminal-law",
      "civics.junior.juvenile",
      "civics.junior.admin-law",
    ],
    objectives: [
      "說出民法的行為能力與刑法的責任年齡",
      "分辨民事、刑事、行政案件",
      "用「事實 → 法律 → 結論」分析生活案例",
      "知道網購消費糾紛的處理方式",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：年齡與法律",
        prompt: "法律會依年齡給予不同的保護與責任。先猜猜看，再刮開。",
        cards: [
          {
            front: "民法：未滿 7 歲的人？",
            back: "**無行為能力人**，法律行為要由法定代理人（通常是父母）代為處理。",
          },
          {
            front: "民法：7 歲以上未滿 18 歲的人？",
            back: "**限制行為能力人**，重要的法律行為要經法定代理人允許或承認；日常生活所必需的小額消費則可以自己做。",
          },
          {
            front: "民法：18 歲以上的人？",
            back: "**成年人**，有完全行為能力（2023 年 1 月 1 日起民法成年年齡為 18 歲）。",
          },
          {
            front: "刑法：未滿 14 歲的人觸法？",
            back: "**行為不罰**；但 12 歲以上的少年仍可能由少年法院（庭）依少年事件處理法處理。",
          },
          {
            front: "刑法：14 歲以上未滿 18 歲的人犯罪？",
            back: "要負刑事責任，但**得減輕其刑**；少年觸法原則上先由少年法院（庭）以保護、教育為優先處理。",
          },
        ],
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "民事、刑事還是行政？",
        prompt: "判斷每個事件主要屬於哪一類法律問題。",
        buckets: [
          { id: "civil", label: "民事（民法）" },
          { id: "criminal", label: "刑事（刑法）" },
          { id: "admin", label: "行政（行政法）" },
        ],
        items: [
          { id: "c1", label: "房東遲遲不退還押金", bucket: "civil" },
          { id: "c2", label: "不小心打破鄰居窗戶，鄰居要求賠償", bucket: "civil" },
          { id: "c3", label: "網購商品一直沒出貨，要求退款", bucket: "civil" },
          { id: "c4", label: "在超商偷竊商品", bucket: "criminal" },
          { id: "c5", label: "持刀傷人", bucket: "criminal" },
          { id: "c6", label: "以假投資騙取他人金錢", bucket: "criminal" },
          { id: "c7", label: "餐廳違反食品衛生規定，被衛生局處罰鍰", bucket: "admin" },
          { id: "c8", label: "騎機車沒戴安全帽被開罰單", bucket: "admin" },
          { id: "c9", label: "申請建築執照被市政府駁回", bucket: "admin" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "案例分析：15 歲買手機，契約有效嗎？",
        problem:
          "15 歲的小傑沒有告訴父母，自己到通訊行簽約，用分期付款買了一支 3 萬元的新手機。父母知道後很生氣。這份契約有效嗎？",
        steps: [
          {
            show: "**事實**：小傑 15 歲，未經父母同意，簽下 3 萬元的分期付款契約。",
          },
          {
            show: "**判斷身分**：7 歲以上未滿 18 歲，是限制行為能力人。",
            predict: {
              question: "15 歲的小傑在民法上屬於？",
              choices: ["無行為能力人", "限制行為能力人", "完全行為能力人"],
              answer: 1,
            },
          },
          {
            show: "**適用法律**：限制行為能力人訂立契約，原則上要得到法定代理人的允許；未經允許的契約，須經法定代理人**承認**才生效。",
            why: "法律保護未成年人，避免他們因思慮不周而承擔沉重的義務。",
          },
          {
            show: "**檢查例外**：純獲法律上利益（如單純接受贈與），或依年齡、身分屬日常生活所必需者，可以自己做。3 萬元的分期付款手機兩者都不是。",
            predict: {
              question: "小傑買手機屬於例外嗎？",
              choices: [
                "是，手機是生活必需品",
                "不是，金額高又要負擔分期付款的義務",
                "是，因為小傑已滿 14 歲",
              ],
              answer: 1,
            },
          },
          {
            show: "**結論**：契約**效力未定**。父母承認 → 有效；父母拒絕承認 → 無效，雙方互相返還手機與已付款項。",
          },
        ],
        takeaway: "法律案例分析三步驟：**事實 → 適用法律 → 結論**，並記得檢查有沒有例外。",
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：網購退貨",
        prompt: "賣家說拆封就不能退？和法律系的表姊一起想想看。",
        scenarioId: "civics.junior.s-online-return",
      },
      {
        id: "set1",
        kind: "set",
        title: "素養題組：小安的三件事",
        prompt: "先讀材料，再回答下面每一題。",
        questionIds: [
          q("set-minor-contract-1"),
          q("set-minor-contract-2"),
          q("set-minor-contract-3"),
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("l1"), q("l2"), q("l3"), q("l4"), q("l7")],
      },
    ],
  },
  {
    id: "civics.junior.economy-market",
    title: "經濟生活：選擇、市場與貿易",
    grade: 9,
    minutes: 15,
    nodeIds: ["civics.junior.choice", "civics.junior.market", "civics.junior.trade"],
    objectives: [
      "能找出一個選擇的機會成本",
      "能用供需變動解釋價格與數量的變化",
      "理解比較利益與分工如何讓雙方都獲益",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：選擇的代價",
        problem:
          "小美週六下午有三個選擇：打工（可賺 1,200 元）、參加補習（她估計價值 1,000 元）、在家休息（她估計價值 800 元）。如果她選擇打工，機會成本是多少？",
        steps: [
          {
            show: "列出所有選項：打工 1,200 元、補習 1,000 元、休息 800 元。",
            why: "時間有限，只能三選一，這就是「稀少性」帶來的選擇。",
          },
          {
            show: "選擇打工，被放棄的是**補習**和**休息**。",
            predict: {
              question: "選擇打工時，被放棄的選項是哪些？",
              choices: ["打工與補習", "補習與休息", "只有休息"],
              answer: 1,
            },
          },
          {
            show: "機會成本 = 被放棄的選項中**價值最高**的那一個：補習，1,000 元。",
            predict: {
              question: "機會成本是多少？",
              choices: ["1,800 元（全部加起來）", "1,000 元（價值最高者）", "800 元"],
              answer: 1,
            },
          },
          {
            show: "打工的價值 1,200 元 ＞ 機會成本 1,000 元，所以選擇打工是理性的決定。",
          },
        ],
        takeaway:
          "機會成本不是把所有放棄的選項加起來，而是**放棄的選項中價值最高者**。效益大於機會成本，才是划算的選擇。",
      },
      {
        id: "a2",
        kind: "slider",
        title: "拉桿：供需移動，價格怎麼變？",
        prompt:
          "這是某種蔬菜的市場。拉動拉桿讓需求或供給曲線左右移動（正數 = 向右移，代表增加），觀察均衡點 E 的變化。灰色線是原本的曲線。",
        params: [
          { key: "d", label: "需求變動（＋增加／－減少）", min: -4, max: 4, step: 1, init: 0 },
          { key: "g", label: "供給變動（＋增加／－減少）", min: -4, max: 4, step: 1, init: 0 },
        ],
        plot: {
          x: [0, 16],
          y: [0, 16],
          xLabel: "數量",
          yLabel: "價格",
          fns: [
            { label: "原需求", f: (x) => 16 - x, color: "#cbd5e1" },
            { label: "原供給", f: (x) => x + 2, color: "#cbd5e1" },
            { label: "需求 D", f: (x, p) => 16 + p.d - x, color: "#2563eb" },
            { label: "供給 S", f: (x, p) => x + 2 - p.g, color: "#059669" },
          ],
          points: (p) => [
            { x: 7, y: 9, color: "#94a3b8" },
            { x: eqQ(p.d, p.g), y: eqP(p.d, p.g), label: "E", color: "#e11d48" },
          ],
        },
        readouts: [
          { label: "均衡價格", value: (p) => `${eqP(p.d, p.g)}（原本 9）` },
          { label: "均衡數量", value: (p) => `${eqQ(p.d, p.g)}（原本 7）` },
          {
            label: "變化",
            value: (p) => {
              const dp = eqP(p.d, p.g) - 9;
              const dq = eqQ(p.d, p.g) - 7;
              const t = (v: number) => (v > 0 ? "上升" : v < 0 ? "下降" : "不變");
              return `價格${t(dp)}、數量${t(dq)}`;
            },
          },
        ],
        goal: {
          text: "颱風過後，菜價「上漲」、交易量卻「減少」。調整拉桿重現這個情況。",
          test: (p) => eqP(p.d, p.g) > 9 && eqQ(p.d, p.g) < 7,
        },
        insight:
          "颱風使蔬菜**供給減少**，供給曲線向左移：均衡價格上升、數量減少。若是需求增加（曲線右移），價格和數量則會**一起上升**。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "珍珠奶茶市場：需求變動還是供給變動？",
        prompt: "下列事件會讓哪一條曲線移動？",
        buckets: [
          { id: "demand", label: "需求曲線移動" },
          { id: "supply", label: "供給曲線移動" },
        ],
        items: [
          { id: "m1", label: "網紅推薦，珍奶變得更受歡迎", bucket: "demand" },
          { id: "m2", label: "消費者的所得普遍提高", bucket: "demand" },
          { id: "m3", label: "替代品咖啡大漲價", bucket: "demand" },
          { id: "m4", label: "原料木薯粉價格上漲", bucket: "supply" },
          { id: "m5", label: "新的封口機讓製作速度變快", bucket: "supply" },
          { id: "m6", label: "許多新的飲料店開張", bucket: "supply" },
        ],
      },
      {
        id: "a4",
        kind: "lab",
        title: "實驗：比較利益與分工",
        prompt:
          "甲國兩種產品都比乙國會做，兩國還需要分工嗎？調整兩國的工時分配，看看合計產量的變化。",
        load: tradeLab,
        insight:
          "甲國生產晶片的機會成本（0.5 單位稻米）比乙國（2 單位稻米）低，所以甲國在晶片具有**比較利益**；乙國則在稻米具有比較利益。各自專業生產再貿易，總產量增加，雙方都能得到更多。",
      },
      {
        id: "a5",
        kind: "canvas",
        title: "動手畫供需圖",
        task: "在坐標軸上畫出一條向右下的需求曲線 D 和一條向右上的供給曲線 S，標出均衡點 E；再畫出「需求增加」後的新需求曲線 D'，標出新的均衡點 E'。",
        background: "axes",
        hint: "橫軸是數量、縱軸是價格。需求增加時，整條需求曲線向右移。",
        reference:
          "D' 在 D 的右邊，與 S 的新交點 E' 比原本的 E 更高、更右：均衡價格上升、均衡數量增加。",
        aiFeedback: true,
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("e1"), q("e2"), q("e5"), q("e6"), q("e10")],
      },
    ],
  },
];

export default lessons;
