import type { Question } from "../../types";

const id = (s: string) => `earth.senior.q-${s}`;
const node = (s: string) => `earth.senior.${s}`;

const questions: Question[] = [
  // 從地球看宇宙
  {
    id: id("u1"),
    type: "single",
    stem: "「光年」是什麼單位？",
    choices: ["距離單位", "時間單位", "亮度單位", "質量單位"],
    answer: 0,
    explain:
      "1 光年是光在真空中一年所走的距離，約 $9.46 \\times 10^{12}$ 公里。名稱有「年」，但它是距離單位。",
    nodeId: node("scale"),
  },
  {
    id: id("u2"),
    type: "numeric",
    stem: "日地平均距離約 $1.5 \\times 10^8$ 公里，光速約 $3 \\times 10^5$ 公里／秒。太陽光到達地球約需幾秒？",
    answer: 500,
    tolerance: 5,
    unit: "秒",
    explain:
      "$t = \\frac{1.5 \\times 10^8}{3 \\times 10^5} = 500$ 秒，約 8 分 20 秒。我們看到的太陽，是它約 8 分鐘前的樣子。",
    nodeId: node("sun"),
  },
  {
    id: id("u3"),
    type: "single",
    stem: "恆星的顏色由藍白、白、黃、橙到紅，代表它們的表面溫度如何變化？",
    choices: ["由高到低", "由低到高", "都一樣", "與顏色無關"],
    answer: 0,
    explain:
      "溫度越高，輻射最強的波長越短、顏色越偏藍；溫度越低越偏紅。太陽表面約 5800 K，呈黃白色。",
    nodeId: node("stars"),
  },
  {
    id: id("u4"),
    type: "tf",
    stem: "星等的數值越大，代表星星看起來越亮。",
    answer: false,
    explain: "星等數值越**小**越亮，甚至可以是負數，例如天狼星的視星等約 −1.5。",
    nodeId: node("stars"),
  },
  {
    id: id("u5"),
    type: "single",
    stem: "一顆 1 等星和一顆 6 等星相比，1 等星的亮度大約是 6 等星的幾倍？",
    choices: ["100 倍", "5 倍", "6 倍", "1000 倍"],
    answer: 0,
    explain:
      "星等相差 5 等，亮度相差 100 倍；每差 1 等約差 2.5 倍（$\\sqrt[5]{100} \\approx 2.512$）。",
    nodeId: node("stars"),
  },
  {
    id: id("u6"),
    type: "single",
    stem: "太陽能夠長期發光發熱，能量主要來自？",
    choices: ["核心的氫核融合成氦", "內部的核分裂反應", "煤炭等化學燃燒", "重力收縮的位能"],
    answer: 0,
    explain: "太陽核心溫度約一千五百萬 K，氫原子核融合成氦，部分質量轉換成能量（$E = mc^2$）。",
    nodeId: node("sun"),
  },
  {
    id: id("u7"),
    type: "single",
    stem: "觀測發現遙遠星系的光譜大多出現**紅移**，而且越遠紅移越大。這表示？",
    choices: [
      "星系正在遠離我們，宇宙正在膨脹",
      "星系正在靠近我們",
      "星系的溫度越來越低",
      "星系裡的恆星都是紅色的",
    ],
    answer: 0,
    explain:
      "光源遠離時譜線往長波（紅端）移動。紅移與距離成正比（哈伯定律），是宇宙膨脹的重要證據。",
    nodeId: node("galaxies"),
  },
  {
    id: id("u8"),
    type: "cloze",
    stem: "依維恩定律，表面溫度越高的恆星，輻射強度最大的波長越＿＿（填「長」或「短」）。",
    accept: ["短", "越短"],
    explain:
      "維恩定律 $\\lambda_{max} T = 2.898 \\times 10^{-3}\\ \\text{m·K}$，溫度與峰值波長成反比。",
    nodeId: node("stars"),
  },
  {
    id: id("u9"),
    type: "multi",
    stem: "質量遠大於太陽的恆星，演化末期可能出現哪些天體或現象？（複選）",
    choices: ["超新星爆炸", "中子星", "黑洞", "白矮星", "主序星"],
    answer: [0, 1, 2],
    explain:
      "大質量恆星以超新星爆炸結束，核心塌縮成中子星或黑洞。類似太陽的恆星則形成行星狀星雲與白矮星。",
    nodeId: node("stars"),
  },
  // 地球的故事
  {
    id: id("g1"),
    type: "single",
    stem: "下列何者**不是**韋格納當年提出大陸漂移說時所用的證據？",
    choices: [
      "海底磁條帶以中洋脊為中心對稱分布",
      "南美洲與非洲的海岸線可以拼合",
      "相隔大洋的大陸上發現相同的古生物化石",
      "熱帶地區發現古代冰川遺跡",
    ],
    answer: 0,
    explain:
      "海底磁條帶是 1960 年代海洋探測的發現，是支持**海底擴張說**的證據，韋格納當時並不知道。",
    nodeId: node("plate-theory"),
  },
  {
    id: id("g2"),
    type: "single",
    stem: "關於海洋地殼的年齡，下列敘述何者正確？",
    choices: [
      "離中洋脊越遠越老",
      "離中洋脊越遠越年輕",
      "各處年齡大致相同",
      "比大陸地殼最古老的岩石還老",
    ],
    answer: 0,
    explain:
      "新的海洋地殼在中洋脊生成後向兩側移動，所以越遠越老；最老的海洋地殼約 2 億年，遠比大陸上數十億年的岩石年輕。",
    nodeId: node("plate-theory"),
  },
  {
    id: id("g3"),
    type: "numeric",
    stem: "某處海洋地殼距離中洋脊 150 公里，定年得知年齡為 300 萬年。這一側板塊的平均移動速率約為每年幾公分？",
    answer: 5,
    tolerance: 0.1,
    unit: "公分／年",
    explain:
      "150 公里 $= 1.5 \\times 10^7$ 公分，$\\frac{1.5 \\times 10^7}{3 \\times 10^6} = 5$ 公分／年。",
    nodeId: node("plate-theory"),
  },
  {
    id: id("g4"),
    type: "single",
    stem: "關於岩石圈與軟流圈，下列敘述何者正確？",
    choices: [
      "岩石圈包含地殼與最上部的地函，軟流圈具可塑性",
      "岩石圈就是地殼，軟流圈就是外核",
      "軟流圈是液態的熔岩海",
      "岩石圈位在軟流圈的下方",
    ],
    answer: 0,
    explain:
      "岩石圈（約 100 公里厚）由地殼與最上部地函組成，剛性較強，分裂成板塊；下方的軟流圈部分熔融、具可塑性，板塊在其上移動。",
    nodeId: node("interior"),
  },
  {
    id: id("g5"),
    type: "tf",
    stem: "S 波無法通過外核，是推論外核為液態的重要證據。",
    answer: true,
    explain:
      "S 波是橫波，只能在固體中傳播。地震發生後，地球另一側有一大片收不到直達 S 波的「S 波陰影區」，表示外核是液態。",
    nodeId: node("interior"),
  },
  {
    id: id("g6"),
    type: "numeric",
    stem: "某木炭樣本中的碳 14 只剩原來的 $\\frac{1}{8}$。若碳 14 的半衰期為 5730 年，這塊木炭約距今幾年？",
    answer: 17190,
    tolerance: 10,
    unit: "年",
    explain:
      "$\\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3$，經過 3 個半衰期：$3 \\times 5730 = 17190$ 年。",
    nodeId: node("geologic-time"),
  },
  {
    id: id("g7"),
    type: "single",
    stem: "地質年代由老到新的排列，何者正確？",
    choices: [
      "前寒武紀 → 古生代 → 中生代 → 新生代",
      "古生代 → 前寒武紀 → 中生代 → 新生代",
      "前寒武紀 → 中生代 → 古生代 → 新生代",
      "新生代 → 中生代 → 古生代 → 前寒武紀",
    ],
    answer: 0,
    explain:
      "前寒武紀占地球歷史的大部分；古生代約自 5.4 億年前開始，中生代約自 2.5 億年前，新生代約自 6600 萬年前。",
    nodeId: node("geologic-time"),
  },
  {
    id: id("g8"),
    type: "single",
    stem: "臺灣東部的海岸山脈，原本屬於什麼？",
    choices: [
      "菲律賓海板塊上的呂宋島弧",
      "歐亞大陸邊緣的沉積層",
      "太平洋板塊上的熱點火山",
      "中洋脊的一部分",
    ],
    answer: 0,
    explain:
      "海岸山脈由呂宋島弧北端的火山岩與沉積岩組成，隨菲律賓海板塊向西北移動，與歐亞大陸邊緣碰撞後拼貼到臺灣。",
    nodeId: node("taiwan-orogeny"),
  },
  {
    id: id("g9"),
    type: "cloze",
    stem: "判斷地層先後時，「切過其他岩層的斷層或侵入岩，比被切的岩層年輕」稱為＿＿定律。",
    accept: ["截切", "截切定律"],
    explain: "截切定律常與疊置定律一起使用，排出地層與地質事件的相對順序。",
    nodeId: node("geologic-time"),
  },
  {
    id: id("g10"),
    type: "multi",
    stem: "海洋板塊隱沒到另一個板塊下方的隱沒帶附近，常見哪些地形或現象？（複選）",
    choices: ["海溝", "火山島弧", "由淺到深排列的地震震源", "中洋脊", "大量新生的海洋地殼"],
    answer: [0, 1, 2],
    explain:
      "隱沒帶有海溝與火山弧，震源沿著下沉的板塊由淺而深分布。中洋脊與新海洋地殼出現在張裂型邊界。",
    nodeId: node("boundaries"),
  },
  // 大氣與海洋
  {
    id: id("m1"),
    type: "single",
    stem: "大氣中的臭氧主要集中在哪一層？",
    choices: ["平流層", "對流層", "中氣層", "增溫層"],
    answer: 0,
    explain: "臭氧主要集中在平流層（約 15～35 公里），吸收太陽紫外線，使平流層氣溫隨高度上升。",
    nodeId: node("atmo-layers"),
  },
  {
    id: id("m2"),
    type: "single",
    stem: "雲、雨、颱風等天氣現象主要發生在哪一層？",
    choices: ["對流層", "平流層", "中氣層", "增溫層"],
    answer: 0,
    explain: "對流層集中了大部分的空氣質量與幾乎全部的水氣，氣溫隨高度下降，對流旺盛。",
    nodeId: node("atmo-layers"),
  },
  {
    id: id("m3"),
    type: "numeric",
    stem: "若對流層中每上升 1 公里氣溫下降 6.5°C，地面氣溫 30°C 時，3 公里高處的氣溫約為幾 °C？",
    answer: 10.5,
    tolerance: 0.2,
    unit: "°C",
    explain: "$30 - 6.5 \\times 3 = 30 - 19.5 = 10.5$°C。",
    nodeId: node("atmo-layers"),
  },
  {
    id: id("m4"),
    type: "single",
    stem: "北半球低緯度（約 0～30 度）地面的盛行風是？",
    choices: ["東北信風", "西南季風", "盛行西風", "極地東風"],
    answer: 0,
    explain: "空氣由副熱帶高壓帶吹向赤道低壓帶，北半球受科氏力向右偏，形成東北信風。",
    nodeId: node("circulation"),
  },
  {
    id: id("m5"),
    type: "tf",
    stem: "在北半球，水平運動的空氣或海水受科氏力影響會向右偏。",
    answer: true,
    explain: "科氏力來自地球自轉，北半球使運動物體向右偏、南半球向左偏，赤道上水平方向的偏向為零。",
    nodeId: node("circulation"),
  },
  {
    id: id("m6"),
    type: "single",
    stem: "聖嬰現象發生時，赤道太平洋最典型的變化是？",
    choices: [
      "東太平洋海溫異常偏高",
      "東太平洋海溫異常偏低",
      "東南信風明顯增強",
      "秘魯沿岸湧升流變得更旺盛",
    ],
    answer: 0,
    explain:
      "聖嬰時信風減弱，溫暖海水向東擴展，東太平洋海溫偏高、湧升流減弱。另外三項比較接近反聖嬰的特徵。",
    nodeId: node("enso"),
  },
  {
    id: id("m7"),
    type: "single",
    stem: "秘魯沿岸湧升流形成的主要原因是？",
    choices: [
      "沿岸風加上科氏力，使表層海水離岸，深層冷水上湧補充",
      "海底火山加熱深層海水，使其上升",
      "河川注入大量淡水",
      "月球引力把深層海水拉上來",
    ],
    answer: 0,
    explain:
      "沿著海岸往赤道吹的風，在南半球經科氏力（向左偏）作用，使表層海水淨向離岸方向移動，富含營養鹽的深層冷水上湧，漁產豐富。",
    nodeId: node("ocean-circulation"),
  },
  {
    id: id("m8"),
    type: "multi",
    stem: "關於溫鹽環流（深層海洋環流），下列哪些正確？（複選）",
    choices: [
      "由海水的密度差異驅動",
      "在北大西洋高緯度等海域，冷而鹹的海水下沉",
      "主要由海面上的風直接推動",
      "能把熱量在全球重新分配",
    ],
    answer: [0, 1, 3],
    explain:
      "溫度低、鹽度高的海水密度大而下沉，帶動全球規模、緩慢的深層環流，影響全球氣候；直接由風推動的是表層環流。",
    nodeId: node("ocean-circulation"),
  },
  {
    id: id("m9"),
    type: "cloze",
    stem: "海洋中，水溫隨深度快速下降的過渡層稱為＿＿（三個字）。",
    accept: ["斜溫層", "溫躍層"],
    explain: "斜溫層位於表層混合層與深層之間，是海水溫度隨深度變化最劇烈的地方。",
    nodeId: node("ocean-structure"),
  },
  {
    id: id("m10"),
    type: "single",
    stem: "臺灣冬季盛行的季風是？",
    choices: ["東北季風", "西南季風", "東南信風", "西北信風"],
    answer: 0,
    explain: "冬季大陸冷高壓強盛，臺灣吹東北季風；夏季則多吹西南季風。",
    nodeId: node("circulation"),
  },
  // 天然災害與全球變遷
  {
    id: id("h1"),
    type: "single",
    stem: "颱風結構中，風雨最強烈的區域是？",
    choices: ["眼牆", "颱風眼", "最外圍的雨帶", "颱風的正後方"],
    answer: 0,
    explain:
      "環繞颱風眼的眼牆由高聳的積雨雲組成，風速最大、雨最大；颱風眼內為下沉氣流，風雨反而微弱。",
    nodeId: node("typhoon"),
  },
  {
    id: id("h2"),
    type: "tf",
    stem: "颱風眼經過時風雨可能暫時停歇，但眼牆再度到來時風雨又會轉強，風向也會改變。",
    answer: true,
    explain: "颱風眼通過後，另一側眼牆隨即到來，風向大致反轉，所以千萬不要在颱風眼經過時外出。",
    nodeId: node("typhoon"),
  },
  {
    id: id("h3"),
    type: "multi",
    stem: "土石流發生需要哪些條件？（複選）",
    choices: ["豐富的鬆散土石", "陡峭的坡度", "充足的水分（如豪雨）", "茂密的森林覆蓋"],
    answer: [0, 1, 2],
    explain:
      "土石流需要大量鬆散土石、足夠的坡度與充足的水分。良好的植被能減少土壤流失，反而有助降低風險。",
    nodeId: node("slope-hazard"),
  },
  {
    id: id("h4"),
    type: "single",
    stem: "地震規模增加 2（例如由 5 變成 7），釋放的能量約增加為幾倍？",
    choices: ["約 1000 倍", "約 2 倍", "約 32 倍", "約 100 倍"],
    answer: 0,
    explain:
      "規模每增加 1，能量約增加 $10^{1.5} \\approx 32$ 倍；增加 2 則約 $32 \\times 32 \\approx 1000$ 倍。",
    nodeId: node("quake-hazard"),
  },
  {
    id: id("h5"),
    type: "single",
    stem: "溫室效應的主要機制是？",
    choices: [
      "溫室氣體吸收地表放出的紅外線，再向四周（包括地面）輻射",
      "溫室氣體反射掉大部分的太陽光",
      "臭氧層破洞讓更多太陽光進來",
      "溫室氣體會自己燃燒放出熱量",
    ],
    answer: 0,
    explain:
      "太陽短波輻射大多能穿過大氣加熱地表；地表放出長波紅外線時，部分被溫室氣體吸收並再輻射回地面，使地表較暖。",
    nodeId: node("radiation"),
  },
  {
    id: id("h6"),
    type: "single",
    stem: "工業革命前，大氣中二氧化碳的濃度大約是多少？",
    choices: ["280 ppm", "28 ppm", "2800 ppm", "28000 ppm"],
    answer: 0,
    explain:
      "冰芯紀錄顯示工業革命前約 280 ppm；近年已超過 420 ppm，主要來自燃燒化石燃料與土地利用改變。",
    nodeId: node("climate-change"),
  },
  {
    id: id("h7"),
    type: "multi",
    stem: "全球暖化可能帶來哪些影響？（複選）",
    choices: ["海平面上升", "極端高溫與強降雨事件增加", "珊瑚白化更頻繁", "南北極的冰量普遍增加"],
    answer: [0, 1, 2],
    explain:
      "暖化使海水膨脹、陸冰融化而海平面上升，極端天氣增加，海水增溫使珊瑚白化；北極海冰面積則呈現減少的趨勢。",
    nodeId: node("climate-change"),
  },
  {
    id: id("h8"),
    type: "cloze",
    stem: "中央氣象署的震度分級為 0 級到＿＿級，其中 5 級與 6 級再細分為強、弱。",
    accept: ["7", "七"],
    explain: "現行震度分為 0、1、2、3、4、5 弱、5 強、6 弱、6 強、7 級，共 10 級。",
    nodeId: node("quake-hazard"),
  },
  {
    id: id("h9"),
    type: "tf",
    stem: "土壤液化較容易發生在地下水位高、由鬆散砂土組成的地區。",
    answer: true,
    explain: "強烈震動使飽含水分的鬆散砂土顆粒失去接觸、像液體一樣流動，可能造成建築物下陷或傾斜。",
    nodeId: node("quake-hazard"),
  },
  {
    id: id("h10"),
    type: "numeric",
    stem: "若氣候敏感度為 3°C（大氣 CO₂ 濃度加倍時，平衡增溫 3°C），CO₂ 由 280 ppm 增加到 1120 ppm，平衡增溫約幾 °C？",
    answer: 6,
    tolerance: 0.1,
    unit: "°C",
    explain:
      "增溫與濃度的**對數**成正比：$1120 = 280 \\times 2^2$，加倍兩次，增溫約 $3 \\times 2 = 6$°C。",
    nodeId: node("climate-change"),
  },
];

export default questions;
