import type { CurriculumNode } from "../../types";

const L = (s: string) => `chemistry.senior.${s}`;

/** 高中化學（108 課綱部定必修與加深加廣選修）學習內容 */
const mindmap: CurriculumNode = {
  id: "chemistry.senior",
  title: "高中化學",
  summary:
    "必修化學建立物質組成、原子結構、化學鍵與化學計量的基礎；選修化學深入物質與能量、物質構造與反應速率、化學平衡、酸鹼與氧化還原，以及有機化學與應用科技。",
  children: [
    {
      id: "chemistry.senior.core",
      title: "必修化學",
      summary: "物質的組成與特性、原子量與莫耳、原子結構與週期表、化學鍵、化學計量與生活中的化學。",
      children: [
        {
          id: "chemistry.senior.composition",
          title: "物質的組成與特性",
          grade: 10,
          summary: "以粒子觀點描述物質，並用各種濃度表示溶液的組成。",
          keyPoints: [
            "重量百分濃度、百萬分點（ppm）、體積莫耳濃度 $C_M = \\frac{n}{V}$（mol/L，記為 M）",
            "混合物可依沸點、溶解度等性質差異分離",
          ],
        },
        {
          id: "chemistry.senior.mole",
          title: "原子量與莫耳",
          grade: 10,
          summary: "以碳-12 為標準的相對原子質量；1 莫耳含有亞佛加厥數個粒子。",
          keyPoints: [
            "$N_A = 6.02 \\times 10^{23}\\ \\text{mol}^{-1}$",
            "莫耳數 $n = \\frac{m}{M}$（質量 ÷ 莫耳質量）",
            "原子量是同位素質量依天然含量的加權平均，例如 Cl = 35.5",
          ],
          lessonIds: [L("mole-gas")],
        },
        {
          id: "chemistry.senior.stoichiometry",
          title: "化學式與化學計量",
          grade: 10,
          summary: "由組成求實驗式與分子式；依反應式的係數比計算反應物與生成物的量。",
          keyPoints: [
            "實驗式表示原子數的最簡整數比，例如葡萄糖 $\\ce{C6H12O6}$ 的實驗式為 $\\ce{CH2O}$",
            "限量試劑先用完，決定產物的最大量",
            "產率 = 實際產量 ÷ 理論產量 × 100%",
          ],
          lessonIds: [L("mole-gas")],
        },
        {
          id: "chemistry.senior.atom-structure",
          title: "原子結構與週期表",
          grade: 10,
          summary: "原子由原子核與電子組成；週期表依原子序排列，元素性質呈現週期性。",
          keyPoints: [
            "原子序 = 質子數；質量數 = 質子數 + 中子數",
            "同族元素價電子數相同，化學性質相似",
            "原子半徑：同族由上而下變大、同週期由左而右變小",
          ],
          lessonIds: [L("atomic-structure")],
        },
        {
          id: "chemistry.senior.radioactivity",
          title: "原子核與放射性",
          grade: 10,
          summary: "不穩定的原子核會自發放出射線而衰變，衰變速率以半衰期表示。",
          keyPoints: [
            "α 射線：氦原子核；β 射線：高速電子；γ 射線：電磁波",
            "經過 $n$ 個半衰期，剩下 $\\left(\\frac{1}{2}\\right)^n$",
            "應用：碳-14 定年、醫學診斷與放射治療",
          ],
          lessonIds: [L("atomic-structure")],
        },
        {
          id: "chemistry.senior.bonding",
          title: "化學鍵",
          grade: 10,
          summary: "原子以離子鍵、共價鍵或金屬鍵結合，形成性質不同的物質。",
          keyPoints: [
            "離子鍵：陽離子與陰離子的靜電吸引，如 $\\ce{NaCl}$",
            "共價鍵：原子共用電子對，如 $\\ce{H2O}$、鑽石",
            "金屬鍵：金屬陽離子與可自由移動的價電子，使金屬能導電",
            "路易斯結構與八隅體規則",
          ],
          lessonIds: [L("bonding")],
        },
        {
          id: "chemistry.senior.daily",
          title: "生活中的化學",
          grade: 10,
          summary: "化學在能源、材料、醫藥、環境中的應用，以及綠色化學的觀念。",
          keyPoints: [
            "化石燃料燃燒產生 $\\ce{CO2}$，與全球暖化有關",
            "綠色化學：減少有害物質、提高原子使用效率",
          ],
        },
      ],
    },
    {
      id: "chemistry.senior.energy",
      title: "物質與能量",
      summary: "氣體的性質、溶液的性質，以及化學反應中的能量變化。",
      children: [
        {
          id: "chemistry.senior.gas",
          title: "氣體",
          grade: 11,
          summary: "理想氣體方程式 $PV = nRT$ 整合了波以耳、查理與亞佛加厥定律。",
          keyPoints: [
            "$R = 0.082\\ \\text{atm·L/(mol·K)}$",
            "0 °C、1 atm 時，1 mol 理想氣體約 22.4 L",
            "道耳頓分壓定律：$P_{\\text{總}} = P_A + P_B + \\cdots$",
          ],
          lessonIds: [L("mole-gas")],
        },
        {
          id: "chemistry.senior.solution-prop",
          title: "溶液的性質",
          grade: 11,
          summary: "溶液的蒸氣壓下降、沸點上升、凝固點下降與滲透壓只與溶質粒子數有關（依數性質）。",
          keyPoints: ["海水比純水難結冰", "電解質解離後粒子數變多，依數性質更明顯"],
        },
        {
          id: "chemistry.senior.thermo",
          title: "熱化學",
          grade: 11,
          summary: "反應熱 $\\Delta H$ 等於生成物與反應物的熱含量差；赫斯定律可計算未知反應熱。",
          keyPoints: [
            "$\\Delta H < 0$ 放熱、$\\Delta H > 0$ 吸熱",
            "反應式反寫，$\\Delta H$ 變號；係數乘以 $k$，$\\Delta H$ 也乘以 $k$",
            "莫耳生成熱、莫耳燃燒熱",
          ],
          lessonIds: [L("energy-rate")],
        },
      ],
    },
    {
      id: "chemistry.senior.structure",
      title: "物質構造與反應速率",
      summary: "以電子組態解釋週期性與鍵結，以分子形狀解釋極性；以碰撞學說解釋反應速率。",
      children: [
        {
          id: "chemistry.senior.electron-config",
          title: "電子組態",
          grade: 11,
          summary: "依構築原理、包立不相容原理與洪德定則，把電子填入 s、p、d 軌域。",
          keyPoints: [
            "填入順序：1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p …",
            "每個軌域最多 2 個自旋相反的電子",
            "例：$\\ce{K}$：$1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,4s^1$",
          ],
          lessonIds: [L("atomic-structure")],
        },
        {
          id: "chemistry.senior.shape",
          title: "分子形狀與極性",
          grade: 11,
          summary: "價殼層電子對互斥理論（VSEPR）：中心原子周圍的電子對彼此遠離，決定分子形狀。",
          keyPoints: [
            "$\\ce{CO2}$ 直線形、$\\ce{BF3}$ 平面三角形、$\\ce{CH4}$ 四面體",
            "$\\ce{NH3}$ 三角錐形、$\\ce{H2O}$ 角形",
            "鍵有極性但形狀對稱時，分子可能是非極性",
          ],
          lessonIds: [L("bonding")],
        },
        {
          id: "chemistry.senior.kinetics",
          title: "反應速率",
          grade: 11,
          summary: "速率定律 $r = k[\\mathrm{A}]^m[\\mathrm{B}]^n$；溫度與催化劑影響速率常數。",
          keyPoints: [
            "反應級數須由實驗決定，不一定等於係數",
            "活化能越低，反應越快",
            "溫度升高，能超越活化能的分子比例增加",
          ],
          lessonIds: [L("energy-rate")],
        },
      ],
    },
    {
      id: "chemistry.senior.equilibrium",
      title: "化學平衡",
      summary: "可逆反應達平衡時，正逆反應速率相等，以平衡常數 K 描述平衡狀態。",
      children: [
        {
          id: "chemistry.senior.k",
          title: "平衡常數",
          grade: 11,
          summary:
            "$a\\mathrm{A} + b\\mathrm{B} \\rightleftharpoons c\\mathrm{C} + d\\mathrm{D}$，$K = \\frac{[\\mathrm{C}]^c[\\mathrm{D}]^d}{[\\mathrm{A}]^a[\\mathrm{B}]^b}$。",
          keyPoints: [
            "純固體與純液體不寫入 K",
            "K 只隨溫度改變",
            "比較反應商 Q 與 K 可判斷反應方向",
          ],
          lessonIds: [L("equilibrium")],
        },
        {
          id: "chemistry.senior.le-chatelier",
          title: "勒沙特列原理",
          grade: 11,
          summary: "對平衡系統施加改變，平衡會向抵消這個改變的方向移動。",
          keyPoints: [
            "增加反應物濃度 → 向右移動",
            "加壓（縮小體積）→ 向氣體分子數較少的一方移動",
            "升溫 → 向吸熱方向移動；催化劑不使平衡移動",
          ],
          lessonIds: [L("equilibrium")],
        },
        {
          id: "chemistry.senior.ksp",
          title: "溶解平衡",
          grade: 11,
          summary: "難溶鹽在飽和溶液中達成溶解平衡，以溶度積 $K_{sp}$ 表示。",
          keyPoints: [
            "$\\ce{AgCl(s) <=> Ag+(aq) + Cl-(aq)}$，$K_{sp} = [\\ce{Ag+}][\\ce{Cl-}]$",
            "同離子效應使溶解度變小",
          ],
        },
      ],
    },
    {
      id: "chemistry.senior.reactions",
      title: "酸鹼與氧化還原",
      summary: "以質子轉移觀點認識酸鹼，以電子轉移觀點認識氧化還原與電化學。",
      children: [
        {
          id: "chemistry.senior.acid-base",
          title: "酸鹼理論與 pH",
          grade: 11,
          summary:
            "布忍斯特－洛瑞酸鹼：酸是質子提供者、鹼是質子接受者；弱酸部分解離，以 $K_a$ 表示強度。",
          keyPoints: [
            "$\\mathrm{pH} = -\\log[\\ce{H+}]$；25 °C 時 $K_w = [\\ce{H+}][\\ce{OH-}] = 1.0 \\times 10^{-14}$",
            "醋酸 $K_a = 1.8 \\times 10^{-5}$",
            "緩衝溶液能抵抗少量酸鹼造成的 pH 變化",
          ],
          lessonIds: [L("acid-base-redox")],
        },
        {
          id: "chemistry.senior.titration",
          title: "酸鹼滴定",
          grade: 11,
          summary: "以已知濃度的標準溶液滴定待測溶液，在當量點時酸鹼恰好完全反應。",
          keyPoints: [
            "當量點：$n_{\\ce{H+}} = n_{\\ce{OH-}}$",
            "強酸強鹼當量點 pH = 7；弱酸強鹼當量點 pH > 7",
            "指示劑的變色範圍要涵蓋當量點附近的 pH 急遽變化區",
          ],
          lessonIds: [L("acid-base-redox")],
        },
        {
          id: "chemistry.senior.redox-number",
          title: "氧化數與氧化還原",
          grade: 11,
          summary: "失去電子（氧化數增加）為氧化，得到電子（氧化數減少）為還原。",
          keyPoints: [
            "化合物中各元素氧化數總和為 0",
            "常見氧化劑：$\\ce{KMnO4}$、$\\ce{Cl2}$；常見還原劑：活潑金屬、$\\ce{H2}$",
          ],
        },
        {
          id: "chemistry.senior.electrochem",
          title: "電化學",
          grade: 12,
          summary: "化學電池把化學能轉為電能；電解把電能轉為化學能。",
          keyPoints: [
            "鋅銅電池：鋅為負極（陽極，氧化），銅為正極（陰極，還原），電動勢約 1.10 V",
            "鹽橋維持兩半電池的電中性",
            "電解水：陰極產生 $\\ce{H2}$、陽極產生 $\\ce{O2}$",
          ],
          lessonIds: [L("acid-base-redox")],
        },
      ],
    },
    {
      id: "chemistry.senior.organic",
      title: "有機化學與應用科技",
      summary: "碳原子能形成四個共價鍵並彼此連結，形成種類繁多的有機化合物。",
      children: [
        {
          id: "chemistry.senior.functional-group",
          title: "官能基與有機化合物",
          grade: 12,
          summary: "官能基決定有機化合物的主要性質，例如醇、醛、酮、羧酸、酯、胺。",
          keyPoints: [
            "羥基 $-\\mathrm{OH}$、醛基 $-\\mathrm{CHO}$、羧基 $-\\mathrm{COOH}$",
            "酯化：羧酸 + 醇 ⇌ 酯 + 水",
            "烷類（單鍵）、烯類（雙鍵）、炔類（參鍵）",
          ],
          lessonIds: [L("bonding")],
        },
        {
          id: "chemistry.senior.isomer",
          title: "同分異構物",
          grade: 12,
          summary: "分子式相同、結構不同的化合物，性質可能差異很大。",
          keyPoints: ["乙醇與甲醚：分子式都是 $\\ce{C2H6O}$", "丁烷有正丁烷與異丁烷兩種結構"],
        },
        {
          id: "chemistry.senior.polymer",
          title: "聚合物與材料",
          grade: 12,
          summary: "小分子單體經加成聚合或縮合聚合形成聚合物。",
          keyPoints: [
            "加成聚合：乙烯 → 聚乙烯",
            "縮合聚合：形成耐綸、聚酯並脫去小分子（如水）",
            "天然聚合物：澱粉、纖維素、蛋白質",
          ],
        },
      ],
    },
  ],
};

export default mindmap;
