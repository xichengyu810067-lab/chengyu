import type { Lesson } from "../../types";

const timeZoneLab = () => import("../labs/TimeZoneLab");
const contourLab = () => import("../labs/ContourLab");
const climateLab = () => import("../labs/ClimateGraphLab");
const populationLab = () => import("../labs/PopulationLab");
const contourScene = () => import("../scenes/ContourScene");
const landformScene = () => import("../scenes/LandformScene");
const twBase = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Base }));
const twMountains = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Mountains }));
const twPlains = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Plains }));
const twRivers = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Rivers }));
const twCities = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Cities }));
const twRain = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Rainfall }));
const twPop = () => import("../scenes/taiwanLayers").then((m) => ({ default: m.Population }));

const q = (s: string) => `geography.junior.q-${s}`;

const lessons: Lesson[] = [
  {
    id: "geography.junior.time-zones",
    title: "經緯度與時區：地球上的位置與時間",
    grade: 7,
    minutes: 12,
    nodeIds: ["geography.junior.latlong", "geography.junior.timezone"],
    objectives: [
      "能說出赤道、本初子午線、回歸線與國際換日線的意義",
      "理解經度每差 15° 時間相差 1 小時",
      "能計算兩地的時差與跨越換日線的日期變化",
    ],
    activities: [
      {
        id: "a1",
        kind: "scratch",
        title: "刮刮樂：地球上的重要線",
        prompt: "先想想看答案，再刮開確認。",
        cards: [
          {
            front: "本初子午線",
            back: "經度 **0°**，通過英國倫敦的格林威治，把地球分成東、西半球。",
          },
          { front: "赤道", back: "緯度 **0°**，是最長的緯線，把地球分成南、北半球。" },
          {
            front: "北回歸線",
            back: "約北緯 **23.5°**，夏至時太陽直射的最北界線；通過臺灣的嘉義與花蓮。",
          },
          {
            front: "國際換日線",
            back: "大致沿著 **180°** 經線，為了避開陸地與國界而有曲折；越過時要調整日期。",
          },
        ],
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：轉動地球看時區",
        prompt:
          "拉動「臺北時間」看看太陽照到哪裡；再移動紫色經線，找出符合任務時間的地方。每格代表一個 15° 寬的時區。",
        load: timeZoneLab,
        insight:
          "地球由西向東自轉，**東邊的地方先看到日出，時間比較快**。經度每差 15° 差 1 小時：倫敦（0°）比臺北慢 8 小時，紐約一帶（西經 75°）比臺北慢 13 小時（不計日光節約時間）。",
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：飛越換日線的時差題",
        problem:
          "飛機在臺北時間（UTC+8）**週一上午 10:00** 起飛，飛行 14 小時抵達洛杉磯（UTC−8，不考慮日光節約時間）。抵達時，洛杉磯當地是星期幾、幾點？",
        steps: [
          {
            show: "先求時差：$8 - (-8) = 16$，洛杉磯比臺北**慢 16 小時**。",
            why: "兩地都用相對於格林威治的時區表示，相減就是時差。",
            predict: {
              question: "洛杉磯和臺北相差幾小時？",
              choices: ["8 小時", "16 小時", "0 小時"],
              answer: 1,
            },
          },
          {
            show: "用臺北時間計算抵達時刻：週一 10:00 + 14 小時 = **週二 00:00**（臺北時間）。",
            why: "先全部用同一個地方的時間計算，比較不會出錯。",
          },
          {
            show: "換成洛杉磯時間：週二 00:00 − 16 小時 = **週一 08:00**。",
            predict: {
              question: "抵達時洛杉磯當地時間是？",
              choices: ["週二 00:00", "週一 08:00", "週二 16:00"],
              answer: 1,
            },
          },
          {
            show: "驗算：起飛時洛杉磯是週一 10:00 − 16 小時 = 週日 18:00；再加 14 小時 = 週一 08:00 ✓",
            why: "換用另一地的時間計算，結果相同，表示答案正確。",
          },
        ],
        takeaway:
          "時差題的訣竅：**先統一用同一地的時間計算，最後再換算成當地時間**。這趟往東飛越過換日線，抵達時的當地時間竟然比出發時的臺北時間還早！",
      },
      {
        id: "a4",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("ll1"), q("ll3"), q("tz1"), q("tz2"), q("tz3"), q("tz4")],
      },
    ],
  },
  {
    id: "geography.junior.map-contour",
    title: "地圖與等高線：讀懂地圖的語言",
    grade: 7,
    minutes: 15,
    nodeIds: ["geography.junior.map-elements", "geography.junior.contour"],
    objectives: [
      "能利用比例尺換算圖上距離與實際距離",
      "能由等高線判讀山頂、鞍部、山谷、山脊與坡度陡緩",
      "能由等高線繪製地形剖面圖",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：比例尺換算器",
        prompt:
          "實際距離 = 圖上距離 × 比例尺分母。拉動拉桿，看看同樣的圖上距離在不同比例尺代表多遠。",
        params: [
          { key: "d", label: "圖上距離", min: 1, max: 12, step: 0.5, init: 2, unit: "公分" },
          { key: "s", label: "比例尺分母", min: 1, max: 20, step: 0.5, init: 2.5, unit: "萬" },
        ],
        plot: {
          x: [0, 12],
          y: [0, 24],
          xLabel: "圖上距離（公分）",
          yLabel: "實際距離（公里）",
          fns: [{ label: "實際距離 = 圖上距離 × 分母", f: (x, p) => (x * p.s) / 10 }],
          points: (p) => [{ x: p.d, y: (p.d * p.s) / 10, label: `${(p.d * p.s) / 10} 公里` }],
        },
        readouts: [
          { label: "比例尺", value: (p) => `1 : ${(p.s * 10000).toLocaleString("zh-TW")}` },
          { label: "圖上 1 公分代表", value: (p) => `${p.s / 10} 公里` },
          { label: "實際距離", value: (p) => `${(p.d * p.s) / 10} 公里` },
        ],
        goal: {
          text: "在 **1：50,000** 的地圖上，兩地實際相距 **3 公里**。請調出這個比例尺，並找出圖上應該量到幾公分。",
          test: (p) => p.s === 5 && p.d === 6,
        },
        insight:
          "1：50,000 表示圖上 1 公分＝實際 50,000 公分＝0.5 公里，所以 3 公里在圖上是 $3 \\div 0.5 = 6$ 公分。分母越小、比例尺越大，地圖越詳細。",
      },
      {
        id: "a2",
        kind: "hotspot",
        mode: "find",
        title: "找一找：等高線地形判讀",
        prompt: "依照提示，在等高線圖上找出指定的地形。記得看等高線上的數字判斷高低！",
        viewBox: "0 0 400 300",
        scene: contourScene,
        spots: [
          {
            id: "summit",
            x: 130,
            y: 135,
            title: "山頂",
            body: "最內圈的封閉等高線，四周都比它低，是這一帶的最高點（約 500 公尺）。",
          },
          {
            id: "saddle",
            x: 216,
            y: 129,
            title: "鞍部",
            body: "兩座山頂之間的低凹處，形狀像馬鞍；兩側各有一組封閉等高線，常是翻越山嶺的通道。",
          },
          {
            id: "valley",
            x: 216,
            y: 198,
            title: "山谷",
            body: "等高線呈 V 字形、**尖端指向高處**（凸向高處），是流水匯集的地方。",
          },
          {
            id: "ridge",
            x: 80,
            y: 232,
            title: "山脊",
            body: "等高線**凸向低處**，是從山頂向外延伸的高地稜線，也是兩側流水的分水線。",
          },
          {
            id: "steep",
            x: 318,
            y: 125,
            title: "陡坡",
            body: "等高線非常密集，短距離內高度變化大，坡度陡。",
          },
          {
            id: "gentle",
            x: 42,
            y: 140,
            title: "緩坡",
            body: "等高線稀疏、間距寬，高度變化慢，坡度緩和。",
          },
        ],
      },
      {
        id: "a3",
        kind: "lab",
        title: "實驗：從等高線到剖面圖",
        prompt:
          "上下移動紅色剖面線，右邊會畫出沿著剖面線的地形起伏。先讓剖面線通過山頂，再比較兩側坡度。",
        load: contourLab,
        insight:
          "剖面圖就是沿著一條線把地形「切開」看側面。等高線**越密集**，剖面線上升得越快、坡越陡；等高線稀疏則剖面平緩。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：地形剖面圖",
        task: "想像一座山：山頂高 600 公尺，西側等高線稀疏、東側等高線密集（等高距 100 公尺）。請在方格上畫出由西到東的地形剖面圖，並標出山頂、緩坡與陡坡。",
        background: "grid",
        hint: "橫軸是水平距離、縱軸是高度。先在剖面線與每條等高線的交點做記號，再把點投影到對應的高度，最後用平滑曲線連起來。",
        reference:
          "剖面線從西邊緩緩上升，在山頂達到約 600 公尺，再往東**快速下降**；東側的線段比西側陡。畫剖面圖的步驟：找交點 → 投影到高度 → 平滑連線。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("map1"), q("map2"), q("map3"), q("map4"), q("map5")],
      },
    ],
  },
  {
    id: "geography.junior.taiwan-landforms",
    title: "臺灣的地形、海岸與河川",
    grade: 7,
    minutes: 15,
    nodeIds: [
      "geography.junior.tw-location",
      "geography.junior.tw-landform",
      "geography.junior.tw-coast",
      "geography.junior.tw-hydro",
    ],
    objectives: [
      "能在地圖上指出五大山脈、主要平原、盆地與河川",
      "能說明沖積扇、河階、曲流、三角洲、海蝕平台的形成",
      "能比較臺灣四段海岸的特色",
    ],
    activities: [
      {
        id: "a1",
        kind: "layers",
        title: "圖層疊加：臺灣的山脈、平原與河川",
        prompt: "逐一打開圖層，觀察山脈、平原盆地與河川的位置關係。",
        viewBox: "0 0 300 400",
        base: twBase,
        layers: [
          {
            id: "mountains",
            label: "五大山脈",
            load: twMountains,
            color: "#b45309",
            on: true,
            note: "山脈大致呈**東北—西南**走向；中央山脈最長，是臺灣的脊梁。玉山主峰 3,952 公尺為臺灣最高峰。",
          },
          {
            id: "plains",
            label: "平原、盆地與縱谷",
            load: twPlains,
            color: "#22c55e",
            note: "平原多分布在西部，嘉南平原面積最大；臺北、臺中盆地是重要的都會核心。花東縱谷夾在中央山脈與海岸山脈之間。",
          },
          {
            id: "rivers",
            label: "主要河川",
            load: twRivers,
            color: "#2563eb",
            note: "濁水溪最長、高屏溪流域面積最大。河川多由中央山地向東、西兩側流入海洋。",
          },
        ],
        check: {
          stem: "比較中央山脈東、西兩側的河川，下列敘述何者正確？",
          choices: [
            "中央山脈位置偏東，西部河川較長、流域較廣",
            "東部河川都比西部河川長",
            "臺灣河川大多由南向北流",
          ],
          answer: 0,
          explain:
            "中央山脈（分水嶺）偏向島的東側，所以向西流的河川路程長、流域廣，向東流的河川短而急。",
        },
      },
      {
        id: "a2",
        kind: "hotspot",
        mode: "explore",
        title: "熱區探索：河流從山到海",
        prompt: "沿著河流從上游走到出海口，點擊每個熱點，認識各種地形的形成原因。",
        viewBox: "0 0 480 320",
        scene: landformScene,
        spots: [
          {
            id: "vvalley",
            x: 78,
            y: 42,
            title: "V 形谷",
            body: "上游坡度大、水流急，河流以**向下侵蝕**為主，切出谷壁陡峭、橫剖面像 V 字的河谷。",
          },
          {
            id: "terrace",
            x: 135,
            y: 93,
            title: "河階",
            body: "河流原本在谷底堆積出平坦河床，後來因**地殼抬升**（或侵蝕基準面下降），河流重新向下侵蝕，舊河床被留在高處，形成階梯狀平臺。例：臺中新社河階。",
          },
          {
            id: "fan",
            x: 208,
            y: 152,
            title: "沖積扇",
            body: "河流流出山地，坡度突然變緩、流速變慢，泥沙在谷口堆積成扇形；扇頂顆粒粗、扇端顆粒細。例：濁水溪沖積扇。",
          },
          {
            id: "meander",
            x: 240,
            y: 210,
            title: "曲流",
            body: "平原坡度小，河流以**側蝕**為主，河道左右擺動成蛇行。外側（凹岸）受侵蝕，內側（凸岸）堆積泥沙。",
          },
          {
            id: "delta",
            x: 330,
            y: 275,
            title: "三角洲",
            body: "河流入海時流速驟減，泥沙在河口堆積成三角形的低平地形，常分成多條汊流。例：尼羅河三角洲、湄公河三角洲。",
          },
          {
            id: "platform",
            x: 448,
            y: 301,
            title: "海蝕平台",
            body: "海浪長期拍打岩岸，在崖腳侵蝕出凹壁，上方岩層崩落、海崖後退，留下接近海平面的平坦岩盤。例：北海岸的野柳、和平島一帶。",
          },
        ],
      },
      {
        id: "a3",
        kind: "drag",
        mode: "categorize",
        title: "拖拽：臺灣四段海岸",
        prompt: "把每張特色卡片拖到對應的海岸。",
        buckets: [
          { id: "north", label: "北部：岬灣海岸" },
          { id: "west", label: "西部：沙岸" },
          { id: "south", label: "南部：珊瑚礁海岸" },
          { id: "east", label: "東部：斷層海岸" },
        ],
        items: [
          { id: "c1", label: "岬角與海灣交錯分布", bucket: "north" },
          { id: "c2", label: "野柳的蕈狀岩與海蝕平台", bucket: "north" },
          { id: "c3", label: "海岸平直，沙洲、潟湖發達", bucket: "west" },
          { id: "c4", label: "海埔地與養殖魚塭多", bucket: "west" },
          { id: "c5", label: "墾丁一帶的隆起珊瑚礁", bucket: "south" },
          { id: "c6", label: "海水溫暖清澈，適合造礁珊瑚生長", bucket: "south" },
          { id: "c7", label: "清水斷崖等陡峭海崖", bucket: "east" },
          { id: "c8", label: "山地緊鄰海洋，海岸平原狹小", bucket: "east" },
        ],
      },
      {
        id: "a4",
        kind: "memory",
        title: "翻牌配對：地形與成因",
        pairs: [
          ["V 形谷", "河流向下侵蝕"],
          ["沖積扇", "谷口泥沙堆積"],
          ["河階", "地殼抬升後河流再下切"],
          ["三角洲", "河口泥沙堆積"],
          ["海蝕平台", "海浪侵蝕岩岸"],
          ["沙洲與潟湖", "沿岸流堆積泥沙"],
        ],
      },
      {
        id: "a5",
        kind: "dialogue",
        title: "情境對話：跟著導遊環島",
        scenarioId: "geography.junior.s-island-tour",
      },
      {
        id: "a6",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("tw1"), q("tw2"), q("tw3"), q("tw4"), q("tw5"), q("tw6"), q("tw7")],
      },
    ],
  },
  {
    id: "geography.junior.taiwan-people",
    title: "臺灣的氣候、人口與產業",
    grade: 7,
    minutes: 15,
    nodeIds: [
      "geography.junior.tw-climate",
      "geography.junior.tw-population",
      "geography.junior.tw-industry",
    ],
    objectives: [
      "能用季風與迎風坡、背風坡解釋臺灣降雨的空間差異",
      "能說明臺灣人口分布與地形的關係",
      "理解少子化、高齡化與人口金字塔的變化",
      "能區分一級、二級、三級產業",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：冬天北部為什麼常下雨？",
        problem: "為什麼冬天基隆、宜蘭常常下雨，臺南、高雄卻很少下雨？",
        steps: [
          {
            show: "冬季亞洲大陸內部（蒙古、西伯利亞一帶）冷卻，形成強大的**高氣壓**，風從大陸吹向海洋。",
            why: "風由高氣壓吹向低氣壓。",
          },
          {
            show: "風吹到臺灣時呈**東北風**，稱為東北季風；它經過溫暖的海面，帶來水氣。",
            predict: {
              question: "東北季風吹到臺灣前，經過哪裡而變得潮濕？",
              choices: ["海面", "沙漠", "高山"],
              answer: 0,
            },
          },
          {
            show: "東北季風遇到基隆、宜蘭一帶的山地，空氣被迫抬升、冷卻，水氣凝結成雲而降雨——這裡是**迎風坡**。",
            predict: {
              question: "被山地抬升的空氣會怎樣？",
              choices: ["冷卻，水氣凝結降雨", "增溫，變得乾燥", "沒有變化"],
              answer: 0,
            },
          },
          {
            show: "越過山脈後空氣下沉增溫、變得乾燥；中南部位於**背風側**，冬季雨少，形成乾季。",
          },
        ],
        takeaway:
          "**迎風坡多雨、背風坡少雨**。冬季北部、東北部多雨；夏季的西南季風、梅雨與颱風則帶來全島主要的雨水，所以南部「夏雨冬乾」。",
      },
      {
        id: "a2",
        kind: "layers",
        title: "圖層疊加：雨量、地形與人口",
        prompt: "打開各個圖層並調整透明度，找找看雨量、地形和人口分布之間的關係。",
        viewBox: "0 0 300 400",
        base: twBase,
        layers: [
          {
            id: "rain",
            label: "年雨量多寡",
            load: twRain,
            color: "#1d4ed8",
            on: true,
            note: "山地與東北部迎風坡雨量多；西部沿海與澎湖較少。臺灣平均年雨量約 2,500 公釐，遠高於世界平均。",
          },
          {
            id: "terrain",
            label: "山脈",
            load: twMountains,
            color: "#b45309",
            note: "和雨量圖層比一比：多雨區大多就是山地。",
          },
          {
            id: "pop",
            label: "人口密度",
            load: twPop,
            color: "#dc2626",
            note: "人口集中在西部平原、盆地與都會區；山地與東部地廣人稀。",
          },
          {
            id: "cities",
            label: "主要都市",
            load: twCities,
            color: "#7c3aed",
            note: "大圓點為六都：臺北、新北、桃園、臺中、臺南、高雄，全都位在西部。",
          },
        ],
        check: {
          stem: "觀察圖層，臺灣人口稠密的地區主要分布在哪裡？",
          choices: ["西部的平原與盆地", "中央山脈山區", "東部的海岸山脈"],
          answer: 0,
          explain:
            "西部平原與盆地地勢平坦、交通便利、工商業發達，形成臺北、臺中、高雄等都會區；山地坡陡、交通不便，人口稀疏。",
        },
      },
      {
        id: "a3",
        kind: "lab",
        title: "實驗：人口金字塔變變變",
        prompt: "拖動年份，觀察模擬國家的出生率、死亡率和人口金字塔如何一起變化，完成三個任務。",
        load: populationLab,
        insight:
          "臺灣也走過類似歷程：先是死亡率下降、人口快速成長；之後出生率大幅下降，2020 年起出生數少於死亡數，65 歲以上人口比例逐年升高，人口金字塔的底部越來越窄。",
      },
      {
        id: "a4",
        kind: "drag",
        mode: "categorize",
        title: "拖拽：一級、二級、三級產業",
        prompt: "把每一種經濟活動拖到正確的產業類別。",
        buckets: [
          { id: "p1", label: "一級產業（直接取自自然）" },
          { id: "p2", label: "二級產業（加工製造）" },
          { id: "p3", label: "三級產業（提供服務）" },
        ],
        items: [
          { id: "i1", label: "稻米種植", bucket: "p1" },
          { id: "i2", label: "近海與養殖漁業", bucket: "p1" },
          { id: "i3", label: "茶園採茶", bucket: "p1" },
          { id: "i4", label: "半導體晶圓製造", bucket: "p2" },
          { id: "i5", label: "石化工業", bucket: "p2" },
          { id: "i6", label: "自行車組裝", bucket: "p2" },
          { id: "i7", label: "便利商店零售", bucket: "p3" },
          { id: "i8", label: "觀光旅遊與民宿", bucket: "p3" },
          { id: "i9", label: "金融與網路服務", bucket: "p3" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("cl1"), q("cl2"), q("pop1"), q("pop2"), q("ind1")],
      },
    ],
  },
  {
    id: "geography.junior.asia-monsoon-dry",
    title: "季風亞洲與乾燥亞洲",
    grade: 8,
    minutes: 15,
    nodeIds: [
      "geography.junior.china",
      "geography.junior.southeast-asia",
      "geography.junior.south-asia",
      "geography.junior.west-asia",
    ],
    objectives: [
      "能用「氣溫、雨量、雨季」三步驟判讀溫雨圖",
      "能說明季風對南亞、東南亞與東亞降雨的影響",
      "能比較季風亞洲與乾燥亞洲的自然環境與產業",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：溫雨圖怎麼看？",
        problem:
          "拿到一張溫雨圖，要怎麼判斷氣候類型？以「每月均溫 26～29°C、每個月雨量都超過 100 公釐」的城市為例。",
        steps: [
          {
            show: "**第一步：看氣溫（紅色折線）。**最冷月均溫在 18°C 以上屬於熱帶；最冷月低於 0°C 表示冬季嚴寒。",
            predict: {
              question: "這個城市最冷月約 26°C，屬於哪個溫度帶？",
              choices: ["熱帶", "溫帶", "寒帶"],
              answer: 0,
            },
          },
          {
            show: "**第二步：看年雨量（藍色長條加總）。**年雨量很少的地方多屬乾燥氣候，例如沙漠年雨量常不到 250 公釐。",
          },
          {
            show: "**第三步：看雨季分配。**全年有雨？雨集中在夏季（季風）？還是夏乾冬雨（地中海型）？",
            predict: {
              question: "這個城市每個月都下雨超過 100 公釐，應該是？",
              choices: ["熱帶雨林氣候", "熱帶季風氣候", "沙漠氣候"],
              answer: 0,
            },
          },
          { show: "結論：全年高溫、全年多雨 → **熱帶雨林氣候**，例如新加坡。" },
        ],
        takeaway: "判讀溫雨圖三步驟：**看氣溫 → 看雨量 → 看雨季**。",
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：神秘城市的溫雨圖",
        prompt: "切換城市 A～E，依照溫雨圖判斷每個城市的氣候類型。答對後會揭曉城市名稱。",
        load: climateLab,
        config: { set: "junior" },
        insight:
          "季風亞洲的共同特色是「**雨熱同季**」：夏季風從海洋帶來水氣，雨量集中在夏季；西亞內陸則因位於副熱帶高壓與大陸內部，終年乾燥。",
      },
      {
        id: "a3",
        kind: "drag",
        mode: "match",
        title: "配對：亞洲各地的特色",
        prompt: "把右邊的特色拖到對應的地點旁。",
        pairs: [
          { id: "m1", left: "湄公河三角洲", right: "高溫多雨，重要的稻米產區" },
          { id: "m2", left: "恆河平原", right: "受季風影響、人口稠密的農業區" },
          { id: "m3", left: "波斯灣沿岸", right: "石油蘊藏豐富，經濟仰賴石油出口" },
          { id: "m4", left: "尼羅河谷地", right: "流經沙漠的外來河，提供灌溉水源" },
          { id: "m5", left: "麻六甲海峽", right: "連接太平洋與印度洋的海運要道" },
          { id: "m6", left: "黃土高原", right: "土質疏鬆，使黃河含沙量高" },
        ],
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：南亞的季風",
        task: "畫一個簡單的印度半島輪廓，用兩種顏色的箭頭標出「夏季風」與「冬季風」的方向，並寫出哪一個季節多雨。",
        background: "blank",
        hint: "夏季陸地增溫快、氣壓低，風從海洋吹向陸地；冬季陸地冷、氣壓高，風從陸地吹向海洋。",
        reference:
          "夏季：**西南季風**由印度洋吹向陸地，帶來水氣，6～9 月是雨季。冬季：**東北季風**由大陸吹向海洋，乾燥少雨。印度西海岸的山地迎風坡雨量特別多。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("as1"), q("as2"), q("as3"), q("as4")],
      },
    ],
  },
  {
    id: "geography.junior.world-issues",
    title: "世界各洲與全球議題",
    grade: 9,
    minutes: 14,
    nodeIds: [
      "geography.junior.europe-russia",
      "geography.junior.africa",
      "geography.junior.americas",
      "geography.junior.oceania-poles",
      "geography.junior.warming",
      "geography.junior.food",
      "geography.junior.water",
      "geography.junior.globalization",
    ],
    objectives: [
      "能說出各洲具代表性的自然與人文特色",
      "能說明全球暖化、糧食、水資源與全球化議題的成因與影響",
      "能提出生活中可以實踐的行動",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：全球議題",
        root: {
          id: "gi",
          title: "全球議題",
          children: [
            {
              id: "gi-warm",
              title: "全球暖化",
              summary: "溫室氣體增加 → 海平面上升、極端天氣；減碳（減緩）與適應（調適）並行。",
            },
            {
              id: "gi-food",
              title: "糧食問題",
              summary: "全球糧食總量足夠但分配不均；氣候變遷、戰亂與價格波動影響糧食安全。",
            },
            {
              id: "gi-water",
              title: "水資源",
              summary: "淡水分布不均；「虛擬水」讓我們看見產品背後的用水。",
            },
            {
              id: "gi-glob",
              title: "全球化",
              summary: "國際分工、跨國企業、全球在地化；也可能擴大區域發展差距。",
            },
            {
              id: "gi-link",
              title: "議題彼此相關",
              summary: "暖化改變降雨 → 影響水資源與糧食生產；全球貿易讓各地互相依賴。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "拖拽：這是哪一洲的特色？",
        buckets: [
          { id: "eu", label: "歐洲與俄羅斯" },
          { id: "af", label: "非洲" },
          { id: "am", label: "美洲" },
          { id: "oc", label: "大洋洲與兩極" },
        ],
        items: [
          { id: "w1", label: "北大西洋暖流讓冬季溫和", bucket: "eu" },
          { id: "w2", label: "歐盟推動商品與人員自由流通", bucket: "eu" },
          { id: "w3", label: "撒哈拉沙漠南緣的荒漠化", bucket: "af" },
          { id: "w4", label: "東非大裂谷", bucket: "af" },
          { id: "w5", label: "亞馬遜熱帶雨林", bucket: "am" },
          { id: "w6", label: "大平原的機械化農業", bucket: "am" },
          { id: "w7", label: "大堡礁的珊瑚礁生態", bucket: "oc" },
          { id: "w8", label: "依條約只用於和平與科學研究", bucket: "oc" },
        ],
      },
      {
        id: "a3",
        kind: "scratch",
        title: "刮刮樂：全球議題關鍵詞",
        cards: [
          {
            front: "溫室效應",
            back: "大氣中的溫室氣體吸收地表放出的熱，使地球保持溫暖；溫室氣體過多會造成**全球暖化**。",
          },
          {
            front: "糧食里程",
            back: "食物從產地運到餐桌的距離。里程越長，運輸耗能與碳排放越多，所以鼓勵**在地消費**。",
          },
          {
            front: "虛擬水",
            back: "生產商品過程中耗用、卻看不見的水，例如一杯咖啡、一公斤牛肉背後的用水。",
          },
          {
            front: "公平貿易",
            back: "以合理價格向生產者收購，保障開發中國家農民的收入與勞動條件。",
          },
          {
            front: "全球在地化",
            back: "全球品牌配合各地的文化與口味調整產品，例如速食店推出在地口味的餐點。",
          },
        ],
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：國際志工談水資源",
        scenarioId: "geography.junior.s-water-volunteer",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("wd1"), q("wd2"), q("gl1"), q("gl2"), q("gl3"), q("gl4")],
      },
    ],
  },
];

export default lessons;
