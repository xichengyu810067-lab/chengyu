import type { CurriculumNode } from "../../types";

const L = (s: string) => `chemistry.junior.${s}`;

/** 國中理化・化學（108 課綱第四學習階段自然科學領域）學習內容 */
const mindmap: CurriculumNode = {
  id: "chemistry.junior",
  title: "國中理化・化學",
  summary:
    "依 108 課綱自然科學領域，從物質的組成與分類、原子與週期表，到化學反應、氧化還原、酸鹼鹽、反應速率與平衡，以及生活中的有機化合物。",
  children: [
    {
      id: "chemistry.junior.matter",
      title: "物質的性質與分類",
      summary: "依組成把物質分成純物質與混合物，再依能否用化學方法分解分成元素與化合物。",
      children: [
        {
          id: "chemistry.junior.pure-mixture",
          title: "純物質與混合物",
          grade: 8,
          summary: "純物質有固定的組成與性質；混合物由兩種以上物質混合，組成比例不固定。",
          keyPoints: [
            "純物質有固定的熔點與沸點，例如純水在 1 大氣壓下 100 °C 沸騰",
            "混合物可分為均勻混合物（空氣、糖水、合金）與不均勻混合物（泥水）",
            "混合物可用物理方法分離",
          ],
          lessonIds: [L("substances")],
        },
        {
          id: "chemistry.junior.element-compound",
          title: "元素與化合物",
          grade: 8,
          summary: "元素只含一種原子；化合物由兩種以上元素以固定比例化合而成。",
          keyPoints: [
            "元素例：$\\ce{O2}$、$\\ce{Fe}$、$\\ce{C}$（鑽石、石墨）",
            "化合物例：$\\ce{H2O}$、$\\ce{CO2}$、$\\ce{NaCl}$",
            "化合物可用化學方法（如電解）分解，例如 $\\ce{2H2O -> 2H2 + O2}$",
          ],
          lessonIds: [L("substances")],
        },
        {
          id: "chemistry.junior.change",
          title: "物理變化與化學變化",
          grade: 8,
          summary: "物理變化只改變狀態或外形，沒有新物質產生；化學變化會產生新物質。",
          keyPoints: [
            "物理變化：冰熔化、酒精揮發、糖溶於水",
            "化學變化：燃燒、生鏽、食物腐敗",
            "化學變化常伴隨顏色改變、產生氣體或沉澱、放熱或吸熱",
          ],
        },
        {
          id: "chemistry.junior.separation",
          title: "混合物的分離",
          grade: 8,
          summary: "利用各成分性質的差異，以過濾、蒸餾、結晶、層析等方法分離混合物。",
          keyPoints: [
            "過濾：分離不溶性固體與液體（粒子大小不同）",
            "蒸餾：利用沸點不同，例如由海水得到純水",
            "濾紙層析：利用各成分在濾紙上移動速率不同，例如分離墨水色素",
            "結晶：使溶劑蒸發或降低溫度，讓溶質析出，例如由海水晒鹽（使水分蒸發）",
          ],
          lessonIds: [L("substances")],
        },
      ],
    },
    {
      id: "chemistry.junior.solution",
      title: "水溶液",
      summary: "溶質溶在溶劑中形成溶液；以濃度表示溶質的多寡。",
      children: [
        {
          id: "chemistry.junior.concentration",
          title: "重量百分濃度與 ppm",
          grade: 8,
          summary: "重量百分濃度 = 溶質質量 ÷ 溶液質量 × 100%；極稀的溶液用百萬分點（ppm）表示。",
          keyPoints: [
            "溶液質量 = 溶質質量 + 溶劑質量",
            "$1\\ \\text{ppm} = \\frac{1}{10^6}$，例如 1 公斤水中含 1 毫克物質",
            "稀釋前後溶質的質量不變",
          ],
          lessonIds: [L("substances")],
        },
        {
          id: "chemistry.junior.solubility",
          title: "溶解度與飽和溶液",
          grade: 8,
          summary: "定溫下，100 g 水最多能溶解的溶質克數稱為溶解度；達到溶解度的溶液為飽和溶液。",
          keyPoints: [
            "大多數固體的溶解度隨溫度升高而變大",
            "氣體的溶解度隨溫度升高而變小（汽水溫度高容易冒氣泡）",
          ],
        },
        {
          id: "chemistry.junior.electrolyte",
          title: "電解質與離子",
          grade: 8,
          summary: "溶於水後能導電的化合物稱為電解質，它們在水中會解離出陽離子與陰離子。",
          keyPoints: [
            "酸、鹼、鹽類是電解質；糖、酒精是非電解質",
            "$\\ce{NaCl -> Na+ + Cl-}$",
            "溶液中陽離子總電量 = 陰離子總電量，溶液呈電中性",
          ],
        },
      ],
    },
    {
      id: "chemistry.junior.atom",
      title: "原子與週期表",
      summary: "物質由原子組成；週期表依原子序排列元素，呈現元素性質的週期性。",
      children: [
        {
          id: "chemistry.junior.atom-model",
          title: "原子結構",
          grade: 8,
          summary: "原子由帶正電的原子核（質子、中子）與帶負電的電子組成。",
          keyPoints: [
            "原子序 = 質子數；中性原子的電子數 = 質子數",
            "質量數 = 質子數 + 中子數",
            "原子模型的發展：道耳頓 → 湯姆森 → 拉塞福 → 波耳",
          ],
          lessonIds: [L("atoms-periodic")],
        },
        {
          id: "chemistry.junior.isotope",
          title: "同位素與離子",
          grade: 8,
          summary: "質子數相同、中子數不同的原子互為同位素；原子得失電子形成離子。",
          keyPoints: [
            "碳-12 與碳-14 互為同位素",
            "失去電子形成陽離子（如 $\\ce{Na+}$），得到電子形成陰離子（如 $\\ce{Cl-}$）",
          ],
          lessonIds: [L("atoms-periodic")],
        },
        {
          id: "chemistry.junior.periodic",
          title: "週期表",
          grade: 8,
          summary: "橫列稱為週期、直行稱為族；同族元素化學性質相似。",
          keyPoints: [
            "金屬位於週期表左方與中間，非金屬多在右上方",
            "第 1 族鹼金屬、第 2 族鹼土金屬、第 17 族鹵素、第 18 族惰性氣體",
            "惰性氣體化學性質很不活潑",
          ],
          lessonIds: [L("atoms-periodic")],
        },
        {
          id: "chemistry.junior.symbol",
          title: "元素符號與化學式",
          grade: 8,
          summary:
            "用元素符號與數字表示物質的組成，例如 $\\ce{H2O}$ 表示 1 個水分子含 2 個 H 與 1 個 O。",
          keyPoints: [
            "元素符號第一個字母大寫，第二個字母小寫，如 $\\ce{Na}$、$\\ce{Cl}$",
            "分子式：$\\ce{O2}$、$\\ce{CO2}$；離子化合物以簡單整數比表示，如 $\\ce{NaCl}$",
          ],
          lessonIds: [L("atoms-periodic")],
        },
      ],
    },
    {
      id: "chemistry.junior.reaction",
      title: "化學反應",
      summary: "化學反應是原子的重新排列，以化學反應式表示，遵守質量守恆定律。",
      children: [
        {
          id: "chemistry.junior.conservation",
          title: "質量守恆定律",
          grade: 8,
          summary: "化學反應前後，原子的種類與數目不變，所以反應物總質量等於生成物總質量。",
          keyPoints: [
            "在開放容器中若有氣體逸散，秤得的質量會改變，但反應本身仍守恆",
            "拉瓦節以密閉容器實驗確立質量守恆定律",
          ],
          lessonIds: [L("equations")],
        },
        {
          id: "chemistry.junior.equation",
          title: "化學反應式與係數平衡",
          grade: 8,
          summary: "反應物寫在箭頭左邊、生成物寫在右邊，以係數使兩邊各原子數目相等。",
          keyPoints: [
            "$\\ce{CH4 + 2O2 -> CO2 + 2H2O}$",
            "只能改係數，不能改化學式的下標",
            "係數比 = 分子數比 = 莫耳數比",
          ],
          lessonIds: [L("equations")],
        },
        {
          id: "chemistry.junior.mole",
          title: "原子量、分子量與莫耳",
          grade: 8,
          summary: "原子量是原子之間的相對質量；1 莫耳粒子約有 $6 \\times 10^{23}$ 個。",
          keyPoints: [
            "以碳-12 的質量定為 12 作為原子量的比較標準",
            "莫耳數 = 質量 ÷ 原子量（或分子量）",
            "例：18 g 水 = 1 mol，約含 $6 \\times 10^{23}$ 個水分子",
          ],
          lessonIds: [L("equations")],
        },
        {
          id: "chemistry.junior.energy",
          title: "反應中的能量變化",
          grade: 8,
          summary: "化學反應常伴隨吸熱或放熱。",
          keyPoints: ["放熱：燃燒、酸鹼中和、暖暖包", "吸熱：電解水、光合作用"],
        },
      ],
    },
    {
      id: "chemistry.junior.redox",
      title: "氧化與還原",
      summary: "狹義定義：物質得到氧為氧化、失去氧為還原，兩者同時發生。",
      children: [
        {
          id: "chemistry.junior.oxidation",
          title: "燃燒與氧化還原",
          grade: 8,
          summary: "燃燒是劇烈的氧化反應；奪走氧的物質是還原劑，提供氧的物質是氧化劑。",
          keyPoints: [
            "$\\ce{2Mg + O2 -> 2MgO}$：鎂被氧化",
            "$\\ce{2CuO + C -> 2Cu + CO2}$：碳被氧化、氧化銅被還原",
            "煉鐵：$\\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$",
          ],
          lessonIds: [L("redox")],
        },
        {
          id: "chemistry.junior.activity",
          title: "金屬對氧的活性",
          grade: 8,
          summary: "活性大的元素容易與氧結合，能從活性小的元素的氧化物中奪取氧。",
          keyPoints: [
            "活性大致為：鉀 > 鈉 > 鈣 > 鎂 > 鋁 > 碳 > 鋅 > 鐵 > 錫 > 鉛 > 氫 > 銅 > 汞 > 銀 > 鉑 > 金",
            "$\\ce{Zn + CuSO4 -> ZnSO4 + Cu}$：鋅比銅活潑",
          ],
          lessonIds: [L("redox")],
        },
        {
          id: "chemistry.junior.rust",
          title: "生鏽與防鏽",
          grade: 8,
          summary: "鐵生鏽需要同時接觸氧氣與水，食鹽等電解質會加速生鏽。",
          keyPoints: [
            "鐵鏽的主要成分是含水的氧化鐵",
            "防鏽：塗漆、塗油、鍍鋅（白鐵）、鍍錫（馬口鐵）、做成不鏽鋼",
          ],
          lessonIds: [L("redox")],
        },
      ],
    },
    {
      id: "chemistry.junior.acid-base",
      title: "酸、鹼、鹽",
      summary: "酸在水中解離出 $\\ce{H+}$，鹼解離出 $\\ce{OH-}$；酸鹼中和生成鹽和水。",
      children: [
        {
          id: "chemistry.junior.acid-base-property",
          title: "酸與鹼的性質",
          grade: 8,
          summary: "酸性溶液有酸味、能與活潑金屬反應產生氫氣；鹼性溶液有澀味、摸起來滑滑的。",
          keyPoints: [
            "常見的酸：鹽酸 $\\ce{HCl}$、硫酸 $\\ce{H2SO4}$、硝酸 $\\ce{HNO3}$、醋酸 $\\ce{CH3COOH}$",
            "常見的鹼：氫氧化鈉 $\\ce{NaOH}$、氫氧化鈣 $\\ce{Ca(OH)2}$、氨水",
            "酸與大理石反應產生二氧化碳：$\\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$",
            "稀釋濃硫酸：把酸慢慢加入水中，不可把水倒入濃硫酸",
          ],
          lessonIds: [L("acids-bases")],
        },
        {
          id: "chemistry.junior.ph",
          title: "pH 值與指示劑",
          grade: 8,
          summary:
            "25 °C 時，pH < 7 為酸性、pH = 7 為中性、pH > 7 為鹼性；pH 每差 1，$[\\ce{H+}]$ 差 10 倍。",
          keyPoints: [
            "石蕊：酸紅鹼藍；酚酞：酸性與中性無色、鹼性呈紅色",
            "廣用試紙可大致測出 pH 值",
          ],
          lessonIds: [L("acids-bases")],
        },
        {
          id: "chemistry.junior.neutralization",
          title: "中和反應與鹽類",
          grade: 8,
          summary: "酸與鹼反應生成鹽和水，並放出熱量。",
          keyPoints: [
            "$\\ce{HCl + NaOH -> NaCl + H2O}$",
            "本質：$\\ce{H+ + OH- -> H2O}$",
            "常見的鹽：氯化鈉、碳酸鈣（大理石）、碳酸氫鈉（小蘇打）",
          ],
          lessonIds: [L("acids-bases")],
        },
      ],
    },
    {
      id: "chemistry.junior.rate",
      title: "反應速率與平衡",
      summary: "粒子必須發生有效碰撞才會反應；可逆反應最後會達到動態平衡。",
      children: [
        {
          id: "chemistry.junior.rate-factors",
          title: "影響反應速率的因素",
          grade: 8,
          summary: "反應物本性、濃度、溫度、接觸面積、催化劑都會影響反應速率。",
          keyPoints: [
            "溫度越高、濃度越大、接觸面積越大，反應越快",
            "催化劑能改變反應速率，本身在反應前後不變",
            "例：雙氧水加二氧化錳迅速產生氧氣 $\\ce{2H2O2 -> 2H2O + O2}$",
          ],
          lessonIds: [L("rate-organic")],
        },
        {
          id: "chemistry.junior.equilibrium",
          title: "可逆反應與化學平衡",
          grade: 8,
          summary: "正、逆反應同時進行且速率相等時，各物質的量不再改變，稱為化學平衡。",
          keyPoints: ["化學平衡是動態平衡，反應並沒有停止", "改變溫度或濃度，平衡會移動"],
          lessonIds: [L("rate-organic")],
        },
      ],
    },
    {
      id: "chemistry.junior.organic",
      title: "有機化合物",
      summary: "含碳的化合物大多是有機化合物（但 $\\ce{CO}$、$\\ce{CO2}$、碳酸鹽等除外）。",
      children: [
        {
          id: "chemistry.junior.hydrocarbon",
          title: "烴類",
          grade: 8,
          summary: "只含碳和氫的化合物稱為烴，例如甲烷、丙烷。",
          keyPoints: [
            "天然氣主要成分是甲烷 $\\ce{CH4}$",
            "液化石油氣主要成分是丙烷 $\\ce{C3H8}$ 與丁烷 $\\ce{C4H10}$",
            "烴完全燃燒生成 $\\ce{CO2}$ 和 $\\ce{H2O}$",
          ],
          lessonIds: [L("rate-organic")],
        },
        {
          id: "chemistry.junior.functional",
          title: "醇、有機酸與酯",
          grade: 8,
          summary: "乙醇含羥基、乙酸含羧基；酸與醇反應生成酯和水（酯化反應）。",
          keyPoints: [
            "乙醇 $\\ce{C2H5OH}$：酒精，75% 酒精可消毒",
            "乙酸 $\\ce{CH3COOH}$：食醋的主要酸性成分",
            "酯類常有水果香味，例如乙酸乙酯",
          ],
          lessonIds: [L("rate-organic")],
        },
        {
          id: "chemistry.junior.polymer",
          title: "聚合物與清潔劑",
          grade: 8,
          summary: "許多小分子連接成的大分子稱為聚合物；油脂與鹼反應製成肥皂（皂化反應）。",
          keyPoints: [
            "天然聚合物：澱粉、纖維素、蛋白質",
            "合成聚合物：聚乙烯（PE）、聚氯乙烯（PVC）、尼龍",
            "肥皂分子一端親水、一端親油，能把油汙包起來",
          ],
        },
      ],
    },
  ],
};

export default mindmap;
