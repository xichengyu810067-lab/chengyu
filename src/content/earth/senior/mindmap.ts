import type { CurriculumNode } from "../../types";

/** 普通型高中地球科學（108 課綱第五學習階段）：高一部定必修，加上加深加廣選修 */
const mindmap: CurriculumNode = {
  id: "earth.senior",
  title: "高中地球科學",
  summary:
    "必修地科從宇宙尺度一路談到地球的故事、大氣與海洋，以及天然災害與全球變遷；選修再深入地質與環境，以及大氣、海洋與天文。",
  children: [
    {
      id: "earth.senior.universe",
      title: "從地球看宇宙",
      summary: "用光年、天文單位描述宇宙的尺度，從恆星的光認識它們的溫度、亮度與演化。",
      children: [
        {
          id: "earth.senior.scale",
          title: "宇宙的尺度",
          grade: 10,
          summary: "由地月系、太陽系、銀河系到星系團，宇宙具有階層結構。",
          keyPoints: [
            "1 天文單位（AU）≈ $1.5 \\times 10^8$ 公里，是日地平均距離",
            "1 光年 ≈ $9.46 \\times 10^{12}$ 公里，是光在一年中行進的距離",
            "銀河系直徑約 10 萬光年；仙女座星系距離我們約 250 萬光年",
          ],
          lessonIds: ["earth.senior.universe"],
        },
        {
          id: "earth.senior.stars",
          title: "恆星的性質與演化",
          grade: 10,
          summary: "恆星的顏色反映表面溫度，星等表示亮度；恆星一生的命運由質量決定。",
          keyPoints: [
            "表面溫度高的恆星偏藍白、溫度低的偏紅",
            "星等數值越小越亮，相差 5 等亮度相差 100 倍",
            "類似太陽的恆星最後成為白矮星；大質量恆星以超新星爆炸結束，留下中子星或黑洞",
          ],
          lessonIds: ["earth.senior.universe"],
        },
        {
          id: "earth.senior.galaxies",
          title: "星系與宇宙膨脹",
          grade: 10,
          summary: "星系依形狀分為螺旋、橢圓與不規則星系；遙遠星系的光譜紅移顯示宇宙正在膨脹。",
          keyPoints: [
            "哈伯定律：星系遠離的速度與距離成正比（$v = H_0 d$）",
            "宇宙膨脹與宇宙微波背景輻射支持大霹靂理論，宇宙年齡約 138 億年",
          ],
          lessonIds: ["earth.senior.universe"],
        },
        {
          id: "earth.senior.sun",
          title: "太陽與太陽系",
          grade: 10,
          summary: "太陽核心進行氫融合成氦的核融合反應；太陽活動會影響地球的太空環境。",
          keyPoints: [
            "太陽光約 8 分 20 秒到達地球",
            "太陽黑子、閃焰與日冕物質拋射可能干擾通訊、衛星與電網",
          ],
          lessonIds: ["earth.senior.universe"],
        },
      ],
    },
    {
      id: "earth.senior.solid-earth",
      title: "地球的故事",
      summary: "從地震波認識地球內部，從大陸漂移到板塊構造學說，再用地層與定年讀出地球的歷史。",
      children: [
        {
          id: "earth.senior.interior",
          title: "地震波與地球內部構造",
          grade: 10,
          summary: "地震波速度在不連續面突然改變，科學家據此推論地球的分層。",
          keyPoints: [
            "P 波可通過固體與液體；S 波只能通過固體",
            "S 波無法通過外核，因此推論外核為液態",
            "岩石圈（地殼加最上部地函）為剛性；其下的軟流圈具可塑性",
          ],
          lessonIds: ["earth.senior.earthquake"],
        },
        {
          id: "earth.senior.plate-theory",
          title: "板塊構造學說的發展",
          grade: 10,
          summary: "由韋格納的大陸漂移說、海底擴張說，發展為解釋地震、火山與造山的板塊構造學說。",
          keyPoints: [
            "大陸漂移的證據：海岸線吻合、化石分布、古冰川遺跡、岩層與山脈相連",
            "海底擴張的證據：中洋脊兩側磁條帶對稱、海洋地殼離中洋脊越遠越老",
            "最古老的海洋地殼約 2 億年，遠比大陸地殼年輕",
          ],
          lessonIds: ["earth.senior.plate-tectonics"],
        },
        {
          id: "earth.senior.boundaries",
          title: "板塊邊界與地形",
          grade: 10,
          summary: "張裂、聚合與錯動邊界各有特徵地形與地震、火山分布。",
          keyPoints: [
            "隱沒帶：海溝、火山島弧，震源由淺到深排列成傾斜帶",
            "轉形斷層：連接錯開的中洋脊段落",
            "熱點火山（如夏威夷）位於板塊內部",
          ],
          lessonIds: ["earth.senior.plate-tectonics"],
        },
        {
          id: "earth.senior.taiwan-orogeny",
          title: "臺灣的造山運動",
          grade: 10,
          summary:
            "呂宋島弧隨菲律賓海板塊與歐亞大陸邊緣碰撞，形成臺灣島，這次造山運動稱為蓬萊造山運動。",
          keyPoints: [
            "花東縱谷是兩板塊的縫合帶，海岸山脈原為島弧",
            "臺灣仍持續抬升，同時快速被侵蝕",
          ],
          lessonIds: ["earth.senior.plate-tectonics"],
        },
        {
          id: "earth.senior.geologic-time",
          title: "地質年代與定年",
          grade: 10,
          summary: "相對定年判斷先後，放射性定年測定絕對年齡，兩者共同建立地質年代表。",
          keyPoints: [
            "相對定年：疊置定律、截切定律、化石層序",
            "放射性定年：母元素每經過一個半衰期剩下一半；碳 14 半衰期約 5730 年",
            "地球約 46 億歲；生物曾經歷多次大滅絕",
          ],
          lessonIds: ["earth.senior.plate-tectonics"],
        },
      ],
    },
    {
      id: "earth.senior.atmo-ocean",
      title: "大氣與海洋",
      summary: "太陽輻射在地表分布不均，驅動大氣與海洋的循環，把熱量從低緯度送往高緯度。",
      children: [
        {
          id: "earth.senior.atmo-layers",
          title: "大氣的組成與垂直結構",
          grade: 10,
          summary: "依氣溫隨高度的變化，大氣由下而上分為對流層、平流層、中氣層與增溫層。",
          keyPoints: [
            "乾空氣主要成分：氮約 78%、氧約 21%、氬約 0.9%",
            "對流層平均每上升 1 公里氣溫約降 6.5°C，天氣現象多發生於此",
            "平流層的臭氧吸收紫外線，使氣溫隨高度上升",
          ],
          lessonIds: ["earth.senior.atmosphere"],
        },
        {
          id: "earth.senior.radiation",
          title: "輻射平衡與溫室效應",
          grade: 10,
          summary:
            "地球吸收太陽短波輻射、放出長波紅外線；溫室氣體吸收紅外線並向下輻射，使地表保持溫暖。",
          keyPoints: [
            "若沒有溫室效應，地表平均溫度約 −18°C，實際約 15°C",
            "主要溫室氣體：水氣、二氧化碳、甲烷、氧化亞氮",
          ],
          lessonIds: ["earth.senior.atmosphere", "earth.senior.climate-hazards"],
        },
        {
          id: "earth.senior.circulation",
          title: "大氣環流與季風",
          grade: 10,
          summary: "三胞環流與科氏力形成信風、西風與極地東風；海陸受熱差異形成季風。",
          keyPoints: [
            "北半球運動中的空氣受科氏力向右偏",
            "赤道低壓帶多雨；副熱帶高壓帶（約南北緯 30 度）乾燥，多沙漠",
            "臺灣冬季吹東北季風、夏季吹西南季風",
          ],
          lessonIds: ["earth.senior.atmosphere"],
        },
        {
          id: "earth.senior.ocean-structure",
          title: "海水的性質與分層",
          grade: 10,
          summary: "海水依溫度分為混合層、斜溫層與深層；鹽度平均約 35‰。",
          keyPoints: ["斜溫層中水溫隨深度快速下降", "密度由溫度與鹽度決定：越冷、越鹹越重"],
          lessonIds: ["earth.senior.ocean-enso"],
        },
        {
          id: "earth.senior.ocean-circulation",
          title: "海洋環流",
          grade: 10,
          summary: "表層環流主要由風驅動；深層的溫鹽環流由海水密度差異驅動，連接全球海洋。",
          keyPoints: [
            "北半球副熱帶環流呈順時針；黑潮是北太平洋的西方邊界流",
            "沿岸風與科氏力使表層海水離岸，深層冷水上湧形成湧升流，漁產豐富",
          ],
          lessonIds: ["earth.senior.ocean-enso"],
        },
        {
          id: "earth.senior.enso",
          title: "聖嬰與反聖嬰現象",
          grade: 10,
          summary:
            "赤道太平洋大氣與海洋的交互作用（ENSO），使東、西太平洋的海溫與降雨型態年際變化。",
          keyPoints: [
            "聖嬰：信風減弱，東太平洋海溫異常偏高、湧升流減弱",
            "反聖嬰：信風增強，東太平洋海溫偏低",
          ],
          lessonIds: ["earth.senior.ocean-enso"],
        },
      ],
    },
    {
      id: "earth.senior.hazards",
      title: "天然災害與全球變遷",
      summary: "認識地震、颱風、坡地災害的成因與防災，並理解人類活動造成的氣候變遷。",
      children: [
        {
          id: "earth.senior.quake-hazard",
          title: "地震災害與防災",
          grade: 10,
          summary: "規模代表能量、震度代表搖晃程度；地震可能引發山崩、土壤液化與海嘯。",
          keyPoints: [
            "規模每增加 1，釋放能量約增加 32 倍",
            "中央氣象署震度分為 0～7 級，5、6 級再分強、弱",
            "強震即時警報利用 P 波較早到達的特性，爭取數秒到數十秒的應變時間",
          ],
          lessonIds: ["earth.senior.earthquake"],
        },
        {
          id: "earth.senior.typhoon",
          title: "颱風",
          grade: 10,
          summary: "颱風由溫暖海面供應能量，具有颱風眼、眼牆與螺旋雨帶；地形會大幅改變降雨分布。",
          keyPoints: [
            "北半球颱風逆時針旋轉，移動方向右側的風通常較強",
            "颱風與東北季風的共伴效應、颱風引進的西南氣流，都可能造成豪雨",
          ],
          lessonIds: ["earth.senior.climate-hazards"],
        },
        {
          id: "earth.senior.slope-hazard",
          title: "坡地災害",
          grade: 10,
          summary: "豪雨或地震可能引發山崩與土石流，臺灣地形陡峭、岩層破碎，坡地災害風險高。",
          keyPoints: ["土石流三要素：豐富的鬆散土石、陡峭的坡度、充足的水分"],
          lessonIds: ["earth.senior.climate-hazards"],
        },
        {
          id: "earth.senior.climate-change",
          title: "全球暖化與氣候變遷",
          grade: 10,
          summary: "燃燒化石燃料使大氣二氧化碳濃度上升，增強溫室效應，造成全球暖化與極端天氣增加。",
          keyPoints: [
            "大氣二氧化碳濃度由工業革命前約 280 ppm 上升到 420 ppm 以上",
            "海平面上升來自海水受熱膨脹與陸冰融化",
            "因應：減緩（減少排放）與調適（提升韌性）",
          ],
          lessonIds: ["earth.senior.climate-hazards"],
        },
      ],
    },
    {
      id: "earth.senior.electives",
      title: "加深加廣選修",
      summary: "選修「地球科學」分為「地質與環境」，以及「大氣、海洋及天文」兩部分。",
      children: [
        {
          id: "earth.senior.resources",
          title: "地質與環境：礦產與水資源",
          summary: "認識礦產、能源與地下水的形成與分布，以及開發利用對環境的影響。",
        },
        {
          id: "earth.senior.forecast",
          title: "大氣與海洋：天氣預報",
          summary: "由觀測（地面站、探空、衛星、雷達）到數值天氣預報，了解預報的方法與不確定性。",
        },
        {
          id: "earth.senior.celestial",
          title: "天文：天體運動與觀測",
          summary: "天球坐標、星體的周日與周年運動，以及望遠鏡與多波段觀測。",
        },
      ],
    },
  ],
};

export default mindmap;
