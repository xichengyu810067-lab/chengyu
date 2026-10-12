import type { Lesson } from "../../types";

const climateLab = () => import("../labs/ClimateGraphLab");
const populationLab = () => import("../labs/PopulationLab");
const coastScene = () => import("../scenes/CoastScene");
const gisBase = () => import("../scenes/gisLayers").then((m) => ({ default: m.Base }));
const gisSlope = () => import("../scenes/gisLayers").then((m) => ({ default: m.Slope }));
const gisFlood = () => import("../scenes/gisLayers").then((m) => ({ default: m.Flood }));
const gisRoads = () => import("../scenes/gisLayers").then((m) => ({ default: m.Roads }));
const gisLandUse = () => import("../scenes/gisLayers").then((m) => ({ default: m.LandUse }));
const gisSites = () => import("../scenes/gisLayers").then((m) => ({ default: m.Sites }));
const climBase = () => import("../scenes/climateLayers").then((m) => ({ default: m.Base }));
const climA = () => import("../scenes/climateLayers").then((m) => ({ default: m.Tropical }));
const climB = () => import("../scenes/climateLayers").then((m) => ({ default: m.Dry }));
const climC = () => import("../scenes/climateLayers").then((m) => ({ default: m.Temperate }));
const climD = () => import("../scenes/climateLayers").then((m) => ({ default: m.Cold }));
const climE = () => import("../scenes/climateLayers").then((m) => ({ default: m.Polar }));

const q = (s: string) => `geography.senior.q-${s}`;
const r2 = (n: number) => String(Math.round(n * 100) / 100);
const rad = (deg: number) => (deg * Math.PI) / 180;

const lessons: Lesson[] = [
  {
    id: "geography.senior.map-gis",
    title: "地圖投影與空間資訊科技",
    grade: 10,
    minutes: 15,
    nodeIds: [
      "geography.senior.projection",
      "geography.senior.gis",
      "geography.senior.rs-gnss",
      "geography.senior.spatial-tech",
    ],
    objectives: [
      "理解地圖投影必然產生變形，能依用途選擇投影",
      "能說明麥卡托投影的面積變形與緯度的關係",
      "能運用 GIS 圖層疊合與環域概念進行選址分析",
      "能說明遙測與全球衛星定位的原理與應用",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：麥卡托投影的放大鏡",
        prompt:
          "麥卡托投影把經線畫成等距的平行直線，緯度 $\\varphi$ 處的東西方向被拉長 $\\dfrac{1}{\\cos\\varphi}$ 倍；為了保持形狀，南北方向也拉長同樣倍數。",
        params: [{ key: "lat", label: "緯度 φ", min: 0, max: 80, step: 5, init: 0, unit: "°" }],
        plot: {
          x: [0, 85],
          y: [0, 35],
          xLabel: "緯度（°）",
          yLabel: "放大倍數",
          fns: [
            {
              label: "面積放大倍數 1/cos²φ",
              color: "#e11d48",
              f: (x) => 1 / Math.cos(rad(x)) ** 2,
            },
            { label: "長度放大倍數 1/cosφ", color: "#2563eb", f: (x) => 1 / Math.cos(rad(x)) },
          ],
          points: (p) => [
            {
              x: p.lat,
              y: 1 / Math.cos(rad(p.lat)) ** 2,
              label: `${r2(1 / Math.cos(rad(p.lat)) ** 2)} 倍`,
            },
          ],
        },
        readouts: [
          { label: "長度放大", value: (p) => `${r2(1 / Math.cos(rad(p.lat)))} 倍` },
          { label: "面積放大", value: (p) => `${r2(1 / Math.cos(rad(p.lat)) ** 2)} 倍` },
        ],
        goal: {
          text: "找出面積被放大成赤道附近 **4 倍**的緯度。",
          test: (p) => p.lat === 60,
        },
        insight:
          "$\\cos 60° = 0.5$，所以北緯 60° 的面積放大 $\\dfrac{1}{0.5^2} = 4$ 倍。格陵蘭位於高緯度，面積被放大十倍以上；實際上非洲面積約是格陵蘭的 14 倍，在麥卡托地圖上卻看起來差不多大。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：投影與用途",
        prompt: "每種投影都有「保留」與「犧牲」的性質，把用途配對到合適的投影。",
        pairs: [
          { id: "p1", left: "麥卡托投影", right: "正形圓柱投影，恆向線為直線，適合航海" },
          { id: "p2", left: "等積投影", right: "面積比例正確，適合繪製分布圖" },
          { id: "p3", left: "正距方位投影", right: "由中心點量出的距離與方位正確，適合航空" },
          { id: "p4", left: "圓錐投影", right: "適合表示東西延伸的中緯度地區" },
        ],
      },
      {
        id: "a3",
        kind: "layers",
        title: "GIS 疊圖分析：新醫院要蓋在哪？",
        prompt:
          "縣政府要興建一座區域醫院，條件是：**坡度平緩、不在洪泛區、不在保護區，並靠近主要道路**。打開每個圖層，用疊圖分析找出最適合的候選地。",
        viewBox: "0 0 400 300",
        base: gisBase,
        layers: [
          {
            id: "sites",
            label: "候選地 A、B、C",
            load: gisSites,
            color: "#e11d48",
            on: true,
            note: "三個候選地的位置。",
          },
          {
            id: "slope",
            label: "坡度（由數值地形模型計算）",
            load: gisSlope,
            color: "#d97706",
            note: "東北側丘陵坡度大，不利大型建築與救護車進出。",
          },
          {
            id: "flood",
            label: "河川與洪泛區（環域）",
            load: gisFlood,
            color: "#3b82f6",
            note: "以河道為中心劃出的環域，代表豪雨時可能淹水的範圍。",
          },
          {
            id: "roads",
            label: "主要道路",
            load: gisRoads,
            color: "#475569",
            note: "醫院需要方便救護車與民眾抵達。",
          },
          {
            id: "landuse",
            label: "土地利用",
            load: gisLandUse,
            color: "#16a34a",
            note: "住宅區已密集開發；森林保護區不可開發；農地／空地可依法變更使用。",
          },
        ],
        check: {
          stem: "疊合所有圖層後，哪一個候選地最適合興建醫院？",
          choices: ["A", "B", "C"],
          answer: 2,
          explain:
            "A 位在河川洪泛區內，B 位在陡坡與森林保護區；C 地勢平坦、遠離洪泛區，又緊鄰兩條主要道路，同時符合所有條件。",
        },
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：空間資訊關鍵詞",
        cards: [
          {
            front: "遙測（RS）",
            back: "不直接接觸地物，利用衛星、飛機或空拍機上的感測器，蒐集地表反射或放射的電磁波資訊。",
          },
          {
            front: "GNSS",
            back: "全球衛星導航系統的統稱，包括美國的 GPS、歐盟的 Galileo、俄羅斯的 GLONASS、中國的北斗等。",
          },
          {
            front: "環域分析",
            back: "以點、線、面為中心劃出一定距離的範圍，例如捷運站周邊 500 公尺、河川兩側的洪泛範圍。",
          },
          {
            front: "疊圖分析",
            back: "把不同主題的圖層疊合，找出同時符合多個條件的地點，常用於選址與土地適宜性分析。",
          },
          {
            front: "向量與網格",
            back: "向量用點、線、面表示地物（如道路、行政區）；網格用規則方格（像元）儲存數值（如衛星影像）。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [
          q("pj1"),
          q("pj2"),
          q("pj3"),
          q("gis1"),
          q("gis2"),
          q("gis3"),
          q("rs1"),
          q("rs2"),
        ],
      },
    ],
  },
  {
    id: "geography.senior.landforms",
    title: "地形：內營力與外營力的拉鋸",
    grade: 10,
    minutes: 15,
    nodeIds: ["geography.senior.landform", "geography.senior.fluvial", "geography.senior.coastal"],
    objectives: [
      "能區分內營力與外營力，並說明地形是兩者交互作用的結果",
      "能辨認海蝕與海積地形並說明成因",
      "能說明河階與曲流的形成過程",
    ],
    activities: [
      {
        id: "a1",
        kind: "memory",
        title: "翻牌配對：地形與營力",
        pairs: [
          ["U 形谷", "冰河刻蝕"],
          ["新月丘", "風力堆積"],
          ["鐘乳石", "石灰岩溶蝕後再沉積"],
          ["曲流", "河流側蝕與堆積"],
          ["海蝕門", "海浪侵蝕岬角"],
          ["斷層崖", "地殼斷裂錯動"],
        ],
      },
      {
        id: "a2",
        kind: "hotspot",
        mode: "find",
        title: "找一找：海岸地形",
        prompt: "上半部是岩岸的側面示意，下半部是沙岸的俯視示意。依提示找出每一種地形。",
        viewBox: "0 0 480 340",
        scene: coastScene,
        spots: [
          {
            id: "terrace",
            x: 100,
            y: 48,
            title: "海階",
            body: "原本接近海平面的海蝕平台，因地殼抬升（或海平面下降）而高出海面，成為海岸邊的平坦階面。",
          },
          {
            id: "cliff",
            x: 156,
            y: 86,
            title: "海蝕崖",
            body: "海浪侵蝕崖腳，掏出凹壁與海蝕洞，上方岩層失去支撐而崩落，形成陡峭的海崖並逐漸後退。",
          },
          {
            id: "platform",
            x: 212,
            y: 121,
            title: "海蝕平台",
            body: "海崖後退後，在崖前留下接近海平面的平坦岩盤，退潮時露出水面。",
          },
          {
            id: "arch",
            x: 326,
            y: 96,
            title: "海蝕門",
            body: "海浪從岬角兩側侵蝕，把海蝕洞打穿，形成拱門狀的地形。",
          },
          {
            id: "stack",
            x: 405,
            y: 120,
            title: "海蝕柱",
            body: "海蝕門頂部崩塌，或岬角被切斷後，留下孤立在海中的岩柱。",
          },
          {
            id: "spit",
            x: 100,
            y: 266,
            title: "沙嘴",
            body: "沿岸流搬運的泥沙在海岸轉折處向海延伸堆積，一端連著陸地、一端伸入海中，末端常向內彎曲。",
          },
          {
            id: "lagoon",
            x: 262,
            y: 266,
            title: "潟湖",
            body: "與海岸平行的沙洲圍出的平靜水域，風浪小，常用於養殖；臺南七股潟湖是著名例子。",
          },
          {
            id: "tombolo",
            x: 424,
            y: 284,
            title: "陸連島",
            body: "島嶼與陸地之間因泥沙堆積成連島沙洲而相連，原本的島嶼就成為陸連島。",
          },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：河階是怎麼形成的？",
        problem: "臺中新社一帶的大甲溪兩岸，有好幾層階梯狀的平坦地形。它們是怎麼形成的？",
        steps: [
          {
            show: "河流在谷底側蝕、堆積，形成寬廣平坦的**河床（谷底平原）**。",
          },
          {
            show: "**地殼抬升**（或侵蝕基準面下降），河床與基準面的高差變大，河流的位能增加。",
            predict: {
              question: "河流的位能增加後，會以哪一種作用為主？",
              choices: ["向下侵蝕（下切）", "大量堆積", "停止流動"],
              answer: 0,
            },
          },
          {
            show: "河流**回春**向下切割，在原本的河床上切出新河道；舊河床被留在高處，成為**河階面**，階面與新河床之間的陡坡稱為**階崖**。",
          },
          {
            show: "抬升與下切反覆發生，就形成**多層河階**，位置越高的階面年代越老。",
            predict: {
              question: "多層河階中，哪一層形成的年代最早？",
              choices: ["最高的階面", "最低的階面", "現在的河床"],
              answer: 0,
            },
          },
        ],
        takeaway:
          "河階＝**堆積出平坦河床 → 抬升或基準面下降 → 河流下切**。河階面平坦又靠近水源，常成為聚落與農業用地。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：曲流與牛軛湖",
        task: "畫一段曲流的俯視圖：標出切蝕坡與滑走坡，用箭頭表示水流最快的位置；再畫出曲流頸被截斷後形成的牛軛湖。",
        background: "blank",
        hint: "彎道外側水流快、侵蝕旺盛；內側水流慢、泥沙堆積。",
        reference:
          "外側（凹岸）為**切蝕坡**，河岸陡峭；內側（凸岸）為**滑走坡**，坡度平緩並有沙洲堆積。曲流越來越彎，洪水時河水截穿最窄的曲流頸取直，被遺棄的舊河道就成為**牛軛湖**。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("lf1"), q("lf2"), q("lf3"), q("lf4"), q("lf5"), q("lf6")],
      },
    ],
  },
  {
    id: "geography.senior.climate",
    title: "氣候：柯本氣候分類與溫雨圖",
    grade: 10,
    minutes: 15,
    nodeIds: ["geography.senior.climate"],
    objectives: [
      "能依柯本氣候分類的判讀順序判定氣候類型",
      "能從溫雨圖讀出氣溫與降雨的特徵",
      "能解釋假想大陸上各氣候類型的分布規律",
    ],
    activities: [
      {
        id: "a1",
        kind: "steps",
        title: "步驟拆解：柯本分類的判讀順序",
        problem:
          "某城市最熱月均溫 24.5°C、最冷月 7.5°C，年雨量約 800 公釐；7 月雨量不到 20 公釐，11 月超過 110 公釐。請用柯本氣候分類判斷它的氣候類型。",
        steps: [
          {
            show: "**先看是否為 E**：最熱月均溫低於 10°C 才是寒帶。最熱月 24.5°C → 不是 E。",
          },
          {
            show: "**再看是否為 B**：年雨量約 800 公釐，降水量並未明顯少於蒸發量 → 不是乾燥氣候。",
          },
          {
            show: "**用最冷月判斷 A、C、D**：最冷月 7.5°C，介於 −3°C 與 18°C 之間 → **C 溫帶**。",
            predict: {
              question: "最冷月 7.5°C 屬於哪一大類？",
              choices: ["A", "C", "D"],
              answer: 1,
            },
          },
          {
            show: "**看降雨季節**：夏季（7 月）雨量很少、冬季多雨 → 加上 **s（夏乾）**。",
            predict: {
              question: "夏乾冬雨要加上哪一個字母？",
              choices: ["f", "s", "w"],
              answer: 1,
            },
          },
          { show: "結論：**Cs 地中海型氣候**（例如羅馬）；最熱月高於 22°C，可再細分為 Csa。" },
        ],
        takeaway:
          "柯本判讀順序：**E（看最熱月）→ B（看乾燥程度）→ A／C／D（看最冷月）→ f／s／w（看降雨季節）**。",
      },
      {
        id: "a2",
        kind: "lab",
        title: "實驗：用溫雨圖判讀柯本氣候",
        prompt: "切換城市 A～H，依溫雨圖判斷柯本氣候類型。答對後會揭曉城市名稱與判讀理由。",
        load: climateLab,
        config: { set: "senior" },
        insight:
          "同樣是溫帶（C），羅馬夏乾（Cs）、倫敦全年有雨且夏季涼爽（Cfb）、臺北全年有雨且夏季炎熱（Cfa）。**最冷月決定大類，降雨季節決定第二個字母**。",
      },
      {
        id: "a3",
        kind: "layers",
        title: "圖層疊加：假想大陸的氣候分布",
        prompt:
          "柯本用一塊「假想大陸」說明氣候分布的規律。逐一打開 A～E 圖層，留意大陸**西岸、東岸與內陸**的差別。",
        viewBox: "0 0 400 320",
        base: climBase,
        layers: [
          {
            id: "a",
            label: "A 熱帶",
            load: climA,
            color: "#059669",
            on: true,
            note: "赤道兩側全年高溫；靠近赤道為熱帶雨林（Af），向外為乾濕季分明的熱帶莽原（Aw）。",
          },
          {
            id: "b",
            label: "B 乾燥",
            load: climB,
            color: "#f59e0b",
            note: "副熱帶高壓籠罩的大陸**西岸**最乾燥，並向內陸延伸；中緯度大陸內部也因遠離海洋而乾燥。",
          },
          {
            id: "c",
            label: "C 溫帶",
            load: climC,
            color: "#3b82f6",
            note: "西岸 30°～40° 為地中海型（Cs）、40°～60° 為溫帶海洋性（Cfb）；東岸為溫帶濕潤（Cfa）。",
          },
          {
            id: "d",
            label: "D 冷溫帶",
            load: climD,
            color: "#8b5cf6",
            note: "只出現在北半球中高緯度的大陸內部與東側，冬季嚴寒。",
          },
          {
            id: "e",
            label: "E 寒帶",
            load: climE,
            color: "#94a3b8",
            note: "高緯度地區，最熱月均溫不到 10°C。",
          },
        ],
        check: {
          stem: "為什麼假想大陸的南半球幾乎沒有 D（冷溫帶）氣候？",
          choices: [
            "南半球中高緯度陸地狹小、海洋廣大，冬季不會太冷",
            "南半球接收的太陽輻射比較強",
            "南半球沒有季風",
          ],
          answer: 0,
          explain:
            "D 氣候需要冬季嚴寒，這是大陸內部遠離海洋才有的特徵。南半球 40°～70° 幾乎都是海洋，海洋調節使冬季不會太冷，所以沒有 D 氣候。",
        },
      },
      {
        id: "a4",
        kind: "drag",
        mode: "categorize",
        title: "拖拽：氣候類型歸大類",
        buckets: [
          { id: "A", label: "A 熱帶" },
          { id: "B", label: "B 乾燥" },
          { id: "C", label: "C 溫帶" },
          { id: "D", label: "D 冷溫帶" },
          { id: "E", label: "E 寒帶" },
        ],
        items: [
          { id: "k1", label: "熱帶雨林氣候（Af）", bucket: "A" },
          { id: "k2", label: "熱帶莽原氣候（Aw）", bucket: "A" },
          { id: "k3", label: "沙漠氣候（BW）", bucket: "B" },
          { id: "k4", label: "草原氣候（BS）", bucket: "B" },
          { id: "k5", label: "地中海型氣候（Cs）", bucket: "C" },
          { id: "k6", label: "溫帶海洋性氣候（Cfb）", bucket: "C" },
          { id: "k7", label: "冷溫帶濕潤氣候（Df）", bucket: "D" },
          { id: "k8", label: "苔原氣候（ET）", bucket: "E" },
          { id: "k9", label: "冰原氣候（EF）", bucket: "E" },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("cl1"), q("cl2"), q("cl3"), q("cl4"), q("cl5")],
      },
    ],
  },
  {
    id: "geography.senior.population",
    title: "人口轉型與人口遷移",
    grade: 10,
    minutes: 15,
    nodeIds: ["geography.senior.population", "geography.senior.migration"],
    objectives: [
      "能說明人口轉型五個階段的出生率、死亡率變化",
      "能由人口金字塔判斷人口結構，並計算扶養比與老化指數",
      "能以推拉理論解釋人口遷移",
    ],
    activities: [
      {
        id: "a1",
        kind: "lab",
        title: "實驗：人口轉型時光機",
        prompt: "拖動年份，觀察模擬國家的出生率、死亡率曲線與人口金字塔如何連動，完成三個任務。",
        load: populationLab,
        insight:
          "人口轉型的關鍵是**死亡率先降、出生率後降**：兩者的時間差造成人口快速成長；出生率長期偏低後，老年人口比例快速上升，最後出生數少於死亡數，人口開始減少。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "order",
        title: "排序：人口轉型的五個階段",
        prompt: "依照人口轉型的先後順序排列。",
        items: [
          { id: "s1", label: "高出生、高死亡：人口成長緩慢" },
          { id: "s2", label: "死亡率快速下降、出生率仍高：人口快速成長" },
          { id: "s3", label: "出生率明顯下降：成長趨緩" },
          { id: "s4", label: "低出生、低死亡：成長停滯" },
          { id: "s5", label: "出生率低於死亡率：人口自然減少" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：扶養比與老化指數",
        problem:
          "某國人口結構：0–14 歲 12%、15–64 歲 68%、65 歲以上 20%。請計算扶養比與老化指數，並說明它們代表的意義。",
        steps: [
          {
            show: "扶養比 $= \\dfrac{\\text{幼年} + \\text{老年}}{\\text{青壯年}} \\times 100 = \\dfrac{12 + 20}{68} \\times 100$",
            predict: {
              question: "扶養比的分母是哪一群人？",
              choices: ["15–64 歲青壯年人口", "0–14 歲幼年人口", "總人口"],
              answer: 0,
            },
          },
          {
            show: "$\\approx 47.1$：每 100 位青壯年人口，約要扶養 47 位幼年與老年人口。",
          },
          {
            show: "老化指數 $= \\dfrac{\\text{老年}}{\\text{幼年}} \\times 100 = \\dfrac{20}{12} \\times 100 \\approx 166.7$",
            predict: {
              question: "老化指數超過 100 代表什麼？",
              choices: ["老年人口多於幼年人口", "人口正在快速成長", "青壯年人口最多"],
              answer: 0,
            },
          },
          {
            show: "65 歲以上占 20%，已達**超高齡社會**的門檻；醫療、長期照顧與年金的負擔加重，勞動力也可能不足。",
          },
        ],
        takeaway:
          "扶養比看「負擔」、老化指數看「老化程度」。少子化初期幼年人口減少，扶養比可能先下降（人口紅利）；之後老年人口增加，扶養比會再度上升。",
      },
      {
        id: "a4",
        kind: "scratch",
        title: "刮刮樂：人口關鍵詞",
        cards: [
          {
            front: "高齡化社會、高齡社會、超高齡社會",
            back: "65 歲以上人口比例分別達到 **7%、14%、20%**。臺灣於 1993 年、2018 年先後跨過前兩個門檻，並在 2025 年前後邁入超高齡社會。",
          },
          {
            front: "總生育率",
            back: "一位婦女一生平均生育的子女數；約 **2.1** 是讓人口長期維持不增不減的替代水準。",
          },
          {
            front: "推拉理論",
            back: "原居地的**推力**、目的地的**拉力**，加上距離、法規等**中間障礙**，共同影響人口遷移。",
          },
          {
            front: "人口紅利",
            back: "青壯年人口比例高、扶養負擔輕的時期，勞動力充足，有利經濟成長。",
          },
        ],
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("pp1"), q("pp2"), q("pp3"), q("pp4")],
      },
    ],
  },
  {
    id: "geography.senior.city-industry",
    title: "都市擴張與產業區位",
    grade: 11,
    minutes: 15,
    nodeIds: ["geography.senior.urban", "geography.senior.industry"],
    objectives: [
      "能以運費模型說明原料指向與市場指向",
      "能分析高科技產業群聚的區位因素",
      "能說明郊區化、大眾運輸導向發展與縉紳化",
    ],
    activities: [
      {
        id: "a1",
        kind: "slider",
        title: "拉桿：工廠該蓋在哪裡？",
        prompt:
          "原料地在左端（0）、市場在右端（10）。每生產 1 噸成品要運入 $w$ 噸原料，成品 1 噸運到市場。運費＝重量 × 距離，找出總運費最低的位置。",
        params: [
          { key: "x", label: "工廠位置（離原料地的距離）", min: 0, max: 10, step: 1, init: 5 },
          {
            key: "w",
            label: "每噸成品需要的原料 w",
            min: 0.5,
            max: 3,
            step: 0.5,
            init: 1,
            unit: "噸",
          },
        ],
        plot: {
          x: [0, 10],
          y: [0, 32],
          xLabel: "工廠位置（0＝原料地，10＝市場）",
          yLabel: "運費",
          fns: [
            { label: "原料運費 = w × 位置", color: "#d97706", f: (x, p) => p.w * x },
            { label: "成品運費 = 10 − 位置", color: "#2563eb", f: (x) => 10 - x },
            { label: "總運費", color: "#e11d48", f: (x, p) => p.w * x + 10 - x },
          ],
          points: (p) => [
            { x: p.x, y: p.w * p.x + 10 - p.x, label: `總運費 ${r2(p.w * p.x + 10 - p.x)}` },
          ],
          vlines: (p) => [{ x: p.x, label: "工廠", color: "#7c3aed" }],
        },
        readouts: [
          { label: "原料運費", value: (p) => r2(p.w * p.x) },
          { label: "成品運費", value: (p) => r2(10 - p.x) },
          { label: "總運費", value: (p) => r2(p.w * p.x + 10 - p.x) },
          {
            label: "運費最低的位置",
            value: (p) =>
              p.w > 1 ? "原料地（原料指向）" : p.w < 1 ? "市場（市場指向）" : "任何位置都一樣",
          },
        ],
        goal: {
          text: "某失重產業（如製糖）每生產 1 噸成品要用掉 **3 噸**原料。請把 $w$ 設為 3，再把工廠移到總運費最低的位置。",
          test: (p) => p.w === 3 && p.x === 0,
        },
        insight:
          "$w > 1$（原料比成品重）時，總運費隨距離原料地越遠而增加，工廠應設在**原料地**；$w < 1$（如飲料加入各地都有的水，成品變重）時則應靠近**市場**。實際選址還要考慮勞力、技術、政策與聚集經濟。",
      },
      {
        id: "a2",
        kind: "drag",
        mode: "categorize",
        title: "拖拽：產業的區位指向",
        buckets: [
          { id: "raw", label: "原料指向" },
          { id: "market", label: "市場指向" },
          { id: "labor", label: "勞力指向" },
          { id: "tech", label: "技術（知識）指向" },
        ],
        items: [
          { id: "f1", label: "製糖業", bucket: "raw" },
          { id: "f2", label: "水泥業", bucket: "raw" },
          { id: "f3", label: "啤酒與飲料", bucket: "market" },
          { id: "f4", label: "麵包與鮮乳", bucket: "market" },
          { id: "f5", label: "成衣縫製", bucket: "labor" },
          { id: "f6", label: "鞋類組裝", bucket: "labor" },
          { id: "f7", label: "晶圓製造", bucket: "tech" },
          { id: "f8", label: "IC 設計", bucket: "tech" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：半導體為什麼聚集在新竹？",
        problem: "為什麼臺灣的半導體產業會在新竹一帶形成群聚？請從產業區位的角度分析。",
        steps: [
          {
            show: "**人才與研發**：鄰近大學與工業技術研究院等研究機構，提供研發能量與工程人才。",
            predict: {
              question: "半導體這類知識密集產業，最重視哪一項區位因素？",
              choices: ["高素質人才與研發能力", "大量廉價原料", "靠近消費市場"],
              answer: 0,
            },
          },
          {
            show: "**政策**：1980 年政府設立新竹科學園區，提供土地、租稅優惠與行政服務。",
          },
          {
            show: "**交通**：鄰近高速公路，與桃園國際機場往來方便；晶片體積小、價值高，適合空運。",
          },
          {
            show: "**聚集經濟**：設計、製造、封裝測試與設備材料等上下游廠商集中，降低交易成本、加速技術交流。",
            predict: {
              question: "廠商聚集在一起所帶來的好處稱為什麼？",
              choices: ["聚集經濟", "規模不經濟", "時空壓縮"],
              answer: 0,
            },
          },
        ],
        takeaway:
          "高科技產業屬於**技術（知識）指向**，重視人才、研發、政策與群聚；群聚形成後又吸引更多廠商進駐，產生正向循環。",
      },
      {
        id: "a4",
        kind: "dialogue",
        title: "情境對話：都市規劃師談捷運",
        scenarioId: "geography.senior.s-urban-planner",
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("ub1"), q("ub2"), q("ub3"), q("in1"), q("in2"), q("in3")],
      },
    ],
  },
  {
    id: "geography.senior.global-regions",
    title: "全球化與區域議題",
    grade: 11,
    minutes: 14,
    nodeIds: [
      "geography.senior.globalization",
      "geography.senior.monsoon-asia",
      "geography.senior.dry-world",
      "geography.senior.europe",
      "geography.senior.sub-saharan",
      "geography.senior.americas",
    ],
    objectives: [
      "能說明全球化的面向與全球生產網絡的分工",
      "能用微笑曲線解釋附加價值的差異",
      "能連結世界各區域與其代表性議題",
    ],
    activities: [
      {
        id: "a1",
        kind: "mindmap",
        title: "先看全貌：全球化的面向",
        root: {
          id: "glb",
          title: "全球化",
          children: [
            {
              id: "glb-eco",
              title: "經濟全球化",
              summary: "跨國企業、國際分工、全球生產網絡；商品與資金快速流動。",
            },
            {
              id: "glb-cul",
              title: "文化全球化",
              summary: "流行文化與飲食跨國傳播；全球在地化讓產品融入地方文化。",
            },
            {
              id: "glb-env",
              title: "環境議題",
              summary: "氣候變遷、跨國污染需要國際合作，例如 2015 年通過的巴黎協定。",
            },
            {
              id: "glb-gap",
              title: "發展差距",
              summary: "核心與邊陲的差距可能擴大；公平貿易嘗試改善生產者處境。",
            },
            {
              id: "glb-tw",
              title: "臺灣的角色",
              summary: "以半導體與資通訊產業深度參與全球供應鏈。",
            },
          ],
        },
      },
      {
        id: "a2",
        kind: "drag",
        mode: "match",
        title: "配對：區域與議題",
        prompt: "把右邊的議題拖到對應的區域旁。",
        pairs: [
          { id: "r1", left: "季風亞洲", right: "稻作支撐稠密人口，綠色革命提高糧食產量" },
          { id: "r2", left: "西亞與北非", right: "水資源稀缺，石油帶來財富也帶來依賴" },
          { id: "r3", left: "漠南非洲", right: "殖民遺緒與單一作物經濟影響發展" },
          { id: "r4", left: "歐洲", right: "歐盟推動商品、人員、資本與服務自由流通" },
          { id: "r5", left: "拉丁美洲", right: "亞馬遜雨林開發與保育的拉鋸" },
          { id: "r6", left: "東南亞", right: "東協推動區域經濟整合，承接製造業移入" },
        ],
      },
      {
        id: "a3",
        kind: "steps",
        title: "步驟拆解：一支手機的全球旅程",
        problem:
          "一支智慧型手機從構想到你手上，經過哪些環節？為什麼參與其中的不同國家，分到的利潤差很多？",
        steps: [
          {
            show: "**研發設計**：品牌企業投入研發、設計外觀與晶片架構，多在技術與人才集中的地區進行。",
          },
          {
            show: "**關鍵零組件**：處理器、記憶體、面板等由各國的專業廠商生產，臺灣的晶圓代工就是重要的一環。",
          },
          {
            show: "**組裝製造**：在勞力相對充足、成本較低的地區組裝成品。",
            predict: {
              question: "在微笑曲線中，組裝製造位於哪個位置？",
              choices: [
                "曲線中間的低點，附加價值較低",
                "曲線左端，附加價值最高",
                "曲線右端，附加價值最高",
              ],
              answer: 0,
            },
          },
          {
            show: "**品牌行銷與服務**：透過全球通路銷售，並提供軟體與售後服務。",
          },
          {
            show: "附加價值呈「**微笑曲線**」：兩端（研發設計、品牌行銷）高、中間（組裝製造）低，所以掌握技術與品牌的企業分到較多利潤。",
          },
        ],
        takeaway:
          "全球生產網絡依各地的**技術、勞力、成本與市場**分工。想提高附加價值，就要往微笑曲線的兩端移動，也就是產業升級。",
      },
      {
        id: "a4",
        kind: "canvas",
        title: "動手畫：全球商品鏈",
        task: "選一樣身邊的商品（例如球鞋、手機或巧克力），畫出它從原料、設計、生產、運輸到銷售的流程圖，並在每個環節旁寫上可能的國家或地區。",
        background: "blank",
        hint: "用箭頭連接各環節，也可以在旁邊標示「附加價值高／低」。",
        reference:
          "以巧克力為例：可可豆多產自西非與中南美洲的熱帶地區 → 多在歐美等地加工製成巧克力 → 透過品牌行銷在全球銷售。原料生產端的附加價值低、加工與品牌端較高；公平貿易認證希望讓可可農獲得合理的收入。",
        aiFeedback: true,
      },
      {
        id: "a5",
        kind: "quiz",
        title: "小試身手",
        questionIds: [q("gb1"), q("gb2"), q("rg1"), q("rg2")],
      },
    ],
  },
];

export default lessons;
