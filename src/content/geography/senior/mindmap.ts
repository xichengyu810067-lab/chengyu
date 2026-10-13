import type { CurriculumNode } from "../../types";

/** 高中地理（108 課綱部定必修，並延伸部分加深加廣選修）學習內容 */
const mindmap: CurriculumNode = {
  id: "geography.senior",
  title: "高中地理",
  summary:
    "以地理技能與觀點為工具，分析自然與人文系統的交互作用，再以議題探討世界各區域，並延伸到探究實作與空間資訊科技。",
  children: [
    {
      id: "geography.senior.skills",
      title: "地理技能與觀點",
      grade: 10,
      summary: "地圖投影、地理資訊系統、遙測與全球衛星定位，是蒐集與分析空間資料的工具。",
      children: [
        {
          id: "geography.senior.projection",
          title: "地圖投影",
          grade: 10,
          summary: "把球面的經緯網轉換到平面上，必然產生變形，需依用途選擇投影。",
          keyPoints: [
            "依投影面分為圓柱、圓錐、平面（方位）投影",
            "正形（等角）投影：局部形狀正確，如麥卡托投影適合航海",
            "等積投影：面積比例正確，適合畫分布圖；正距方位投影：由中心點量距離與方位正確",
          ],
          lessonIds: ["geography.senior.map-gis"],
        },
        {
          id: "geography.senior.gis",
          title: "地理資訊系統（GIS）",
          grade: 10,
          summary: "以圖層方式整合、查詢與分析空間資料，協助決策。",
          keyPoints: [
            "資料格式：向量（點、線、面）與網格（像元）",
            "常用分析：環域分析、疊圖分析、路徑分析",
            "應用：選址、防災、交通、商業與公共服務規劃",
          ],
          lessonIds: ["geography.senior.map-gis"],
        },
        {
          id: "geography.senior.rs-gnss",
          title: "遙測與全球衛星定位",
          grade: 10,
          summary: "遙測從遠距離蒐集地表資訊；全球衛星導航系統（GNSS）提供定位。",
          keyPoints: [
            "不同地物對各波段電磁波的反射不同，健康植物在近紅外光反射強",
            "福衛五號為臺灣自主研製的光學遙測衛星",
            "GNSS 接收器至少需 4 顆衛星訊號才能求得三維位置與時間",
          ],
          lessonIds: ["geography.senior.map-gis"],
        },
        {
          id: "geography.senior.perspective",
          title: "地理觀點",
          grade: 10,
          summary: "以空間、生態（人地關係）與區域三種觀點觀察與解釋世界。",
          keyPoints: [
            "空間觀點：位置、分布、距離與空間交互作用",
            "生態觀點：人類活動與自然環境的相互影響",
            "區域觀點：依特徵劃分區域並比較差異",
          ],
        },
      ],
    },
    {
      id: "geography.senior.physical",
      title: "自然地理",
      grade: 10,
      summary: "地形、氣候、水文、生物與土壤構成相互關聯的自然系統。",
      children: [
        {
          id: "geography.senior.landform",
          title: "地形",
          grade: 10,
          summary: "內營力造成地表高低起伏，外營力的風化、侵蝕、搬運、堆積塑造地形細節。",
          keyPoints: [
            "內營力：板塊運動、褶曲、斷層、火山與地震",
            "外營力：風化、侵蝕、搬運、堆積",
            "侵蝕基準面下降或地殼抬升會使河流「回春」再次下切",
          ],
          lessonIds: ["geography.senior.landforms"],
          children: [
            {
              id: "geography.senior.fluvial",
              title: "河流地形",
              grade: 10,
              summary: "上游下切成 V 形谷，中下游側蝕成曲流，山麓與河口堆積成沖積扇與三角洲。",
              keyPoints: ["曲流外側為切蝕坡、內側為滑走坡", "河階是河流下切後留下的舊河床"],
              lessonIds: ["geography.senior.landforms"],
            },
            {
              id: "geography.senior.coastal",
              title: "海岸地形",
              grade: 10,
              summary: "岩岸以海蝕地形為主，沙岸以海積地形為主。",
              keyPoints: [
                "海蝕：海蝕崖、海蝕平台、海蝕洞、海蝕門、海蝕柱",
                "海積：沙嘴、沙洲、潟湖、陸連島",
                "海蝕平台隆起後成為海階",
              ],
              lessonIds: ["geography.senior.landforms"],
            },
            {
              id: "geography.senior.glacial-karst",
              title: "冰河、風成與喀斯特地形",
              grade: 10,
              summary: "冰河刻蝕出 U 形谷與角峰；乾燥區風蝕風積；石灰岩區溶蝕成喀斯特地形。",
              keyPoints: [
                "冰河地形：U 形谷、冰斗、角峰、峽灣",
                "風成地形：蕈狀岩、新月丘",
                "喀斯特地形：石灰岩洞、鐘乳石、石筍",
              ],
            },
          ],
        },
        {
          id: "geography.senior.climate",
          title: "氣候與柯本氣候分類",
          grade: 10,
          summary: "依氣溫與降水的組合，把世界氣候分為 A、B、C、D、E 五大類。",
          keyPoints: [
            "A 熱帶：最冷月均溫 ≥ 18°C；B 乾燥：蒸發量大於降水量",
            "C 溫帶：最冷月介於 −3°C 與 18°C；D 冷溫帶：最冷月 < −3°C 且最熱月 ≥ 10°C",
            "E 寒帶：最熱月 < 10°C；第二個字母 f 全年有雨、s 夏乾、w 冬乾、m 季風",
          ],
          lessonIds: ["geography.senior.climate"],
        },
        {
          id: "geography.senior.hydrology",
          title: "水文",
          grade: 10,
          summary: "水循環連結海洋、大氣與陸地；河川流量受降水、地形與人為活動影響。",
          keyPoints: [
            "河川流量歷線：降雨後流量上升，都市化使洪峰更高、更早出現",
            "地下水超抽可能造成地層下陷",
          ],
        },
        {
          id: "geography.senior.biosoil",
          title: "生物與土壤",
          grade: 10,
          summary: "植被與土壤隨氣候分布，形成不同的生物群系。",
          keyPoints: ["熱帶雨林土壤因淋溶作用強，表土貧瘠", "溫帶草原土壤富含腐植質，適合穀物生產"],
        },
      ],
    },
    {
      id: "geography.senior.human",
      title: "人文地理",
      grade: 10,
      summary: "人口、聚落、產業與全球化的空間分布與變遷。",
      children: [
        {
          id: "geography.senior.population",
          title: "人口轉型與人口組成",
          grade: 10,
          summary: "出生率與死亡率的變化可分為五個階段，反映在人口金字塔的形狀上。",
          keyPoints: [
            "自然增加率 = 出生率 − 死亡率",
            "扶養比 = （幼年人口 + 老年人口）÷ 青壯年人口 × 100",
            "金字塔型（增長）→ 鐘型（穩定）→ 底部縮小（縮減）",
          ],
          lessonIds: ["geography.senior.population"],
        },
        {
          id: "geography.senior.migration",
          title: "人口遷移",
          grade: 10,
          summary: "推拉理論：原居地的推力與目的地的拉力，加上中間障礙，共同影響遷移。",
          keyPoints: ["推力：就業機會少、災害、戰亂", "拉力：就業機會多、教育與醫療資源佳"],
          lessonIds: ["geography.senior.population"],
        },
        {
          id: "geography.senior.urban",
          title: "都市化與都市發展",
          grade: 10,
          summary: "都市人口比例上升的過程；都市內部有地價、土地利用與通勤的空間差異。",
          keyPoints: [
            "郊區化、都市蔓延、縉紳化（仕紳化）",
            "首要都市：最大都市人口遠多於第二大都市",
            "中地理論：商閾（門檻人口）與商品圈（服務範圍）",
          ],
          lessonIds: ["geography.senior.city-industry"],
        },
        {
          id: "geography.senior.industry",
          title: "產業區位",
          grade: 10,
          summary: "企業考量原料、市場、勞力、技術與聚集經濟等因素選擇區位。",
          keyPoints: [
            "失重原料產業（製糖、水泥）傾向原料指向",
            "增重或易腐產品（飲料、麵包）傾向市場指向",
            "產業群聚可共享設施、降低交易成本並促進技術外溢",
          ],
          lessonIds: ["geography.senior.city-industry"],
        },
        {
          id: "geography.senior.globalization",
          title: "全球化",
          grade: 10,
          summary: "時空壓縮下，商品、資金、資訊與人員跨國流動，形成全球生產網絡。",
          keyPoints: [
            "國際分工與跨國企業",
            "微笑曲線：研發設計與品牌行銷附加價值高，組裝製造較低",
            "全球在地化與反全球化運動",
          ],
          lessonIds: ["geography.senior.global-regions"],
        },
      ],
    },
    {
      id: "geography.senior.regional",
      title: "區域地理與議題",
      grade: 11,
      summary: "以議題為主軸，探討世界各區域的環境與發展。",
      children: [
        {
          id: "geography.senior.monsoon-asia",
          title: "季風亞洲：糧食與人口",
          grade: 11,
          summary: "季風帶來雨熱同季，稻作支撐稠密人口；綠色革命提高產量也帶來環境代價。",
          lessonIds: ["geography.senior.global-regions"],
        },
        {
          id: "geography.senior.dry-world",
          title: "乾燥世界：水資源與石油",
          grade: 11,
          summary: "西亞與北非水資源稀缺，跨國河川與地下水開發引發爭議；石油帶來財富與發展挑戰。",
          lessonIds: ["geography.senior.global-regions"],
        },
        {
          id: "geography.senior.europe",
          title: "歐洲：區域整合",
          grade: 11,
          summary: "歐盟推動商品、人員、資本與服務自由流通，也面臨區域差異與整合挑戰。",
          lessonIds: ["geography.senior.global-regions"],
        },
        {
          id: "geography.senior.sub-saharan",
          title: "漠南非洲：發展議題",
          grade: 11,
          summary: "殖民歷史、單一作物經濟與基礎建設不足影響發展，近年城市與數位經濟快速成長。",
          lessonIds: ["geography.senior.global-regions"],
        },
        {
          id: "geography.senior.americas",
          title: "美洲：產業與環境",
          grade: 11,
          summary: "美國產業重心轉移與科技產業群聚；亞馬遜雨林的開發與保育。",
          lessonIds: ["geography.senior.global-regions"],
        },
      ],
    },
    {
      id: "geography.senior.elective",
      title: "加深加廣選修",
      grade: 11,
      summary: "地理與社會探究、空間資訊科技、社會環境議題。",
      children: [
        {
          id: "geography.senior.inquiry",
          title: "探究與實作",
          grade: 11,
          summary: "從提出問題、蒐集資料（野外實察、訪談、問卷）到分析與發表。",
        },
        {
          id: "geography.senior.spatial-tech",
          title: "空間資訊科技",
          grade: 11,
          summary: "進階運用 GIS、遙測影像與定位資料解決生活與社會問題。",
          lessonIds: ["geography.senior.map-gis"],
        },
        {
          id: "geography.senior.social-env",
          title: "社會環境議題",
          grade: 12,
          summary: "災害風險、能源轉型、氣候變遷調適等議題的空間分析與行動。",
        },
      ],
    },
  ],
};

export default mindmap;
