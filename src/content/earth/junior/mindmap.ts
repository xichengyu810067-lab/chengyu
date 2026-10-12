import type { CurriculumNode } from "../../types";

/** 國中地球科學（108 課綱第四學習階段自然科學領域中的地球科學內容） */
const mindmap: CurriculumNode = {
  id: "earth.junior",
  title: "國中地球科學",
  summary:
    "從腳下的岩石到頭頂的星空：認識地球的構造與變動、天氣與海洋，以及地球、月球和太陽的運動。",
  children: [
    {
      id: "earth.junior.structure",
      title: "地球的組成與構造",
      summary: "地球由外而內分層；地表由岩石組成，岩石又由礦物組成。",
      children: [
        {
          id: "earth.junior.layers",
          title: "地球的分層",
          grade: 9,
          summary: "依組成可分為**地殼、地函、地核**；地核又分為液態的外核與固態的內核。",
          keyPoints: [
            "地殼最薄：大陸地殼平均約 35 公里，海洋地殼約 5～10 公里",
            "地殼與地函的交界稱為**莫氏不連續面**",
            "地函約到地下 2900 公里；外核為液態，內核因壓力極大而呈固態",
            "地球平均半徑約 6370 公里",
          ],
          lessonIds: ["earth.junior.earth-structure"],
        },
        {
          id: "earth.junior.minerals",
          title: "礦物",
          grade: 9,
          summary: "礦物是自然形成、具有固定化學成分與晶體結構的固體，是組成岩石的基本單位。",
          keyPoints: [
            "可用顏色、條痕、光澤、硬度、解理等特徵辨認",
            "摩氏硬度：滑石 1 最軟、鑽石 10 最硬，石英為 7",
            "方解石遇稀鹽酸會冒出氣泡",
          ],
          lessonIds: ["earth.junior.earth-structure"],
        },
        {
          id: "earth.junior.rocks",
          title: "三大類岩石",
          grade: 9,
          summary: "依成因分為火成岩、沉積岩與變質岩。",
          keyPoints: [
            "**火成岩**：岩漿冷卻凝固，如花崗岩、玄武岩、安山岩",
            "**沉積岩**：沉積物壓密膠結，有層理、常含化石，如砂岩、頁岩、石灰岩",
            "**變質岩**：原有岩石受高溫高壓改變，如大理岩、板岩、片岩",
          ],
          lessonIds: ["earth.junior.earth-structure"],
        },
        {
          id: "earth.junior.rock-cycle",
          title: "岩石循環",
          grade: 9,
          summary: "三類岩石可經由熔融、冷卻、風化侵蝕、沉積、變質等作用互相轉換。",
          keyPoints: ["任何岩石熔融後冷卻都會變成火成岩", "岩石循環的能量來自地球內部熱能與太陽能"],
          lessonIds: ["earth.junior.earth-structure"],
        },
      ],
    },
    {
      id: "earth.junior.change",
      title: "地表與地殼的變動",
      summary: "外營力（風化、侵蝕）削平地表，內營力（板塊運動）使地殼隆起、產生地震與火山。",
      children: [
        {
          id: "earth.junior.weathering",
          title: "風化、侵蝕、搬運與沉積",
          grade: 9,
          summary:
            "岩石在原地破碎分解是風化；被水、風、冰川、海浪帶走是侵蝕與搬運；在低處堆積是沉積。",
          keyPoints: [
            "風化分為物理（機械）風化與化學風化",
            "河流上游多侵蝕（V 形谷），出山口堆積成沖積扇，河口形成三角洲",
            "野柳的女王頭是差異侵蝕形成的蕈狀岩",
          ],
          lessonIds: ["earth.junior.surface-history"],
        },
        {
          id: "earth.junior.strata",
          title: "地層與化石",
          grade: 9,
          summary: "地層與化石記錄了地球的歷史，可用來推論地層先後與古代環境。",
          keyPoints: [
            "**疊置定律**：未受擾動的地層，下層比上層老",
            "**截切定律**：切過地層的斷層或侵入岩比被切的地層年輕",
            "珊瑚化石代表溫暖清澈的淺海環境",
            "地質年代：前寒武紀 → 古生代 → 中生代 → 新生代",
          ],
          lessonIds: ["earth.junior.surface-history"],
        },
        {
          id: "earth.junior.fold-fault",
          title: "褶皺與斷層",
          grade: 9,
          summary: "岩層受擠壓彎曲形成褶皺；岩層破裂且兩側相對錯動形成斷層。",
          keyPoints: [
            "受張力常形成正斷層，受擠壓常形成逆斷層",
            "近期仍可能再活動的斷層稱為活動斷層，如車籠埔斷層",
          ],
          lessonIds: ["earth.junior.surface-history"],
        },
        {
          id: "earth.junior.plates",
          title: "板塊構造",
          grade: 9,
          summary: "地球表面由多個板塊拼成，板塊在軟流圈上緩慢移動，邊界分為張裂、聚合、錯動三型。",
          keyPoints: [
            "**張裂型**：中洋脊、裂谷，產生新的海洋地殼",
            "**聚合型**：海溝、島弧、造山帶，如喜馬拉雅山",
            "**錯動型**：兩板塊水平錯開，如美國加州的聖安地列斯斷層",
            "板塊每年移動約數公分",
          ],
          lessonIds: ["earth.junior.plates-quakes"],
        },
        {
          id: "earth.junior.earthquake",
          title: "地震",
          grade: 9,
          summary: "岩層突然錯動釋放能量而產生地震；地震波由震源向四周傳播。",
          keyPoints: [
            "震源正上方的地表位置稱為**震央**",
            "**規模**代表地震釋放的能量，一次地震只有一個值",
            "**震度**代表各地搖晃程度，中央氣象署分為 0～7 級（5、6 級再分強弱）",
            "P 波比 S 波快，可由兩者到達的時間差推算距離",
          ],
          lessonIds: ["earth.junior.plates-quakes"],
        },
        {
          id: "earth.junior.volcano",
          title: "火山",
          grade: 9,
          summary: "地底岩漿沿裂隙上升噴出地表形成火山，多分布在板塊邊界附近。",
          keyPoints: [
            "火山噴發物包含熔岩、火山碎屑（火山灰、火山彈）與火山氣體",
            "臺灣北部的大屯火山群有溫泉與噴氣孔，學者持續監測",
            "環太平洋火山帶又稱「火環」",
          ],
          lessonIds: ["earth.junior.plates-quakes"],
        },
        {
          id: "earth.junior.taiwan-geology",
          title: "臺灣的地質",
          grade: 9,
          summary:
            "臺灣位於**歐亞板塊與菲律賓海板塊**的聚合邊界，兩板塊擠壓使臺灣隆起成高山，也帶來頻繁的地震。",
          keyPoints: [
            "東北外海：菲律賓海板塊隱沒到歐亞板塊之下（琉球海溝）",
            "南部外海：歐亞板塊隱沒到菲律賓海板塊之下（馬尼拉海溝）",
            "花東縱谷是兩板塊的交界帶，海岸山脈原屬菲律賓海板塊",
            "造就臺灣高山的造山運動稱為蓬萊造山運動，至今仍在進行",
          ],
          lessonIds: ["earth.junior.plates-quakes"],
        },
      ],
    },
    {
      id: "earth.junior.weather",
      title: "天氣與氣候",
      summary: "大氣中的冷熱、氣壓與水氣變化造成各種天氣，臺灣四季各有代表性的天氣系統。",
      children: [
        {
          id: "earth.junior.weather-elements",
          title: "天氣要素",
          grade: 9,
          summary: "氣溫、氣壓、溼度、風、雲量與降水是描述天氣的要素。",
          keyPoints: [
            "海平面平均氣壓約 1013 百帕",
            "風由高氣壓吹向低氣壓；等壓線越密，風越強",
            "北半球：高氣壓順時針向外吹出，低氣壓逆時針向內吹入",
          ],
          lessonIds: ["earth.junior.weather-map"],
        },
        {
          id: "earth.junior.clouds",
          title: "雲與降水",
          grade: 9,
          summary: "空氣上升膨脹冷卻，溫度降到露點以下時，水氣凝結成雲；雲滴長大後落下成為降水。",
          keyPoints: [
            "高氣壓多下沉氣流、天氣晴朗；低氣壓多上升氣流、容易成雲致雨",
            "積雨雲常帶來雷雨、閃電與強陣風",
          ],
          lessonIds: ["earth.junior.weather-map"],
        },
        {
          id: "earth.junior.fronts",
          title: "氣團與鋒面",
          grade: 9,
          summary: "性質不同的冷、暖氣團相遇的交界稱為鋒面，常帶來雲雨與天氣變化。",
          keyPoints: [
            "**冷鋒**：冷氣團推動暖氣團，過境後氣溫下降、氣壓上升",
            "**暖鋒**：暖氣團推動冷氣團",
            "**滯留鋒**：冷暖氣團勢均力敵，鋒面徘徊不前，如梅雨鋒面",
          ],
          lessonIds: ["earth.junior.weather-map"],
        },
        {
          id: "earth.junior.taiwan-weather",
          title: "臺灣的天氣",
          grade: 9,
          summary:
            "冬季東北季風與寒流、春末夏初梅雨、夏季午後雷陣雨與颱風、秋季颱風與東北季風的共伴效應。",
          keyPoints: [
            "梅雨：5～6 月滯留鋒在臺灣附近徘徊",
            "颱風：近中心最大風速達每秒 17.2 公尺以上的熱帶性低氣壓",
            "寒流：強烈大陸冷高壓南下，氣溫驟降；中央氣象署以臺北測站最低氣溫降到 10°C 以下為標準",
          ],
          lessonIds: ["earth.junior.weather-map"],
        },
        {
          id: "earth.junior.forecast",
          title: "天氣圖與天氣預報",
          grade: 9,
          summary:
            "地面天氣圖以等壓線、高低氣壓與鋒面符號呈現天氣系統；衛星雲圖與雷達回波圖輔助預報。",
          keyPoints: ["H 表示高氣壓、L 表示低氣壓", "冷鋒符號為三角形，暖鋒符號為半圓形"],
          lessonIds: ["earth.junior.weather-map"],
        },
      ],
    },
    {
      id: "earth.junior.ocean",
      title: "海洋",
      summary: "海水的流動包含洋流、波浪與潮汐，影響氣候、漁業與海岸地形。",
      children: [
        {
          id: "earth.junior.currents",
          title: "洋流",
          grade: 9,
          summary: "表層洋流主要由盛行風吹送形成，分為暖流與寒流。",
          keyPoints: [
            "**黑潮**是流經臺灣東部的暖流，水色深藍、透明度高",
            "暖流使沿岸氣候較溫暖溼潤，寒流使沿岸較涼爽乾燥",
          ],
          lessonIds: ["earth.junior.ocean"],
        },
        {
          id: "earth.junior.waves",
          title: "波浪",
          grade: 9,
          summary: "波浪主要由風吹拂海面產生；海水主要在原地做圓周運動，傳遞的是能量。",
          keyPoints: ["波浪接近海岸時，因水深變淺而變高、破碎", "海嘯多由海底地震引起"],
          lessonIds: ["earth.junior.ocean"],
        },
        {
          id: "earth.junior.tides",
          title: "潮汐",
          grade: 9,
          summary: "月球與太陽的引力使海面週期性升降，大多數地方一天約有兩次滿潮與兩次乾潮。",
          keyPoints: [
            "滿潮時刻每天約延後 50 分鐘",
            "朔、望（農曆初一、十五前後）為**大潮**；上、下弦（初七、八與廿二、廿三前後）為**小潮**",
          ],
          lessonIds: ["earth.junior.ocean"],
        },
      ],
    },
    {
      id: "earth.junior.astronomy",
      title: "地球與太空",
      summary: "地球自轉造成晝夜，公轉與地軸傾斜造成四季；月球繞地球造成月相與日月食。",
      children: [
        {
          id: "earth.junior.rotation",
          title: "自轉與晝夜",
          grade: 9,
          summary: "地球由西向東自轉，約 24 小時一圈，造成晝夜交替與太陽、星星東升西落。",
          lessonIds: ["earth.junior.sky"],
        },
        {
          id: "earth.junior.seasons",
          title: "公轉與四季",
          grade: 9,
          summary:
            "地球自轉軸傾斜約 23.5 度並繞太陽公轉，太陽直射點在南北回歸線之間移動，造成四季。",
          keyPoints: [
            "夏至太陽直射北回歸線，北半球晝最長；北回歸線以北地區正午太陽最高",
            "四季的主因是**地軸傾斜**，不是地球與太陽的距離",
            "北回歸線通過嘉義與花蓮",
          ],
          lessonIds: ["earth.junior.sky"],
        },
        {
          id: "earth.junior.moon-phases",
          title: "月相",
          grade: 9,
          summary: "月球本身不發光，隨著日、地、月相對位置改變，我們看到的亮面形狀也跟著變化。",
          keyPoints: [
            "週期約 29.5 天：新月 → 上弦月 → 滿月 → 下弦月 → 新月",
            "上弦月（農曆初七、八）右半邊亮；下弦月（廿二、廿三）左半邊亮",
          ],
          lessonIds: ["earth.junior.sky"],
        },
        {
          id: "earth.junior.eclipses",
          title: "日食與月食",
          grade: 9,
          summary:
            "日食時月球在太陽與地球之間（發生在朔）；月食時地球在太陽與月球之間（發生在望）。",
          keyPoints: [
            "月球公轉軌道面與地球公轉軌道面夾約 5 度，所以不是每個月都有日月食",
            "月全食時月球常呈紅銅色",
          ],
          lessonIds: ["earth.junior.sky"],
        },
        {
          id: "earth.junior.solar-system",
          title: "太陽系",
          grade: 9,
          summary: "太陽系有八大行星：水、金、地、火（類地行星）與木、土、天王、海王（類木行星）。",
          keyPoints: ["類地行星體積小、密度大、以岩石為主", "類木行星體積大、密度小、以氣體為主"],
          lessonIds: ["earth.junior.sky"],
        },
      ],
    },
  ],
};

export default mindmap;
