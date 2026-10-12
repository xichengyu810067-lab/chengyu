import type { CurriculumNode } from "../../types";

const L = (s: string) => `physics.senior.${s}`;

/** 高中物理：部定必修物理與選修物理 I–V 的主要學習內容 */
const mindmap: CurriculumNode = {
  id: "physics.senior",
  title: "高中物理",
  summary:
    "必修物理建立科學方法、物質組成、運動、能量、電磁與量子的整體圖像；選修物理再深入力學、熱學、波動、電磁與近代物理。",
  children: [
    {
      id: L("science"),
      title: "科學的態度與方法",
      grade: 10,
      summary: "物理學透過觀察、假說、實驗與數學描述來理解自然。",
      children: [
        {
          id: L("sci-units"),
          title: "物理量、單位與數量級",
          grade: 10,
          summary: "國際單位制（SI）有 7 個基本量；用科學記號與數量級描述極大與極小的尺度。",
          keyPoints: [
            "基本單位：m、kg、s、A、K、mol、cd",
            "科學記號：$a \\times 10^n$，$1 \\le a < 10$",
            "光速約 $3 \\times 10^8$ m/s；原子大小約 $10^{-10}$ m",
          ],
          lessonIds: [L("matter-interactions")],
        },
        {
          id: L("sci-method"),
          title: "物理學的發展與科學方法",
          grade: 10,
          summary: "從伽利略的實驗與數學方法、牛頓的運動定律與萬有引力，到電磁學與近代物理。",
          keyPoints: ["理論必須能被實驗檢驗", "測量一定有誤差，要注意有效數字"],
        },
      ],
    },
    {
      id: L("matter"),
      title: "物質組成與基本交互作用",
      grade: 10,
      summary: "物質由原子組成，原子由原子核與電子組成；自然界只有四種基本交互作用。",
      children: [
        {
          id: L("matter-scale"),
          title: "原子、原子核與基本粒子",
          grade: 10,
          summary: "原子核由質子與中子組成，質子與中子又由夸克組成。",
          keyPoints: [
            "原子直徑約 $10^{-10}$ m，原子核約 $10^{-15}$～$10^{-14}$ m",
            "電子與夸克目前被視為基本粒子",
          ],
          lessonIds: [L("matter-interactions")],
        },
        {
          id: L("interactions"),
          title: "四種基本交互作用",
          grade: 10,
          summary: "重力、電磁力、強力、弱力；強度由強到弱為強力、電磁力、弱力、重力。",
          keyPoints: [
            "重力與電磁力作用範圍無限遠",
            "強力束縛原子核；弱力與 β 衰變有關",
            "摩擦力、正向力等接觸力本質上是電磁力",
          ],
          lessonIds: [L("matter-interactions")],
        },
      ],
    },
    {
      id: L("mechanics"),
      title: "力學",
      grade: 11,
      summary: "描述運動（運動學），並用力與能量解釋運動（動力學）。",
      children: [
        {
          id: L("linear-motion"),
          title: "直線運動",
          grade: 11,
          summary: "等加速度直線運動的公式與圖形分析。",
          keyPoints: [
            "$v = v_0 + at$",
            "$\\Delta x = v_0 t + \\dfrac{1}{2}at^2$",
            "$v^2 = v_0^2 + 2a\\Delta x$",
          ],
        },
        {
          id: L("projectile"),
          title: "平面運動：拋體運動",
          grade: 11,
          summary: "拋體運動可分解為水平等速度運動與鉛直等加速度運動。",
          keyPoints: [
            "水平：$x = v_0\\cos\\theta \\cdot t$",
            "鉛直：$y = v_0\\sin\\theta \\cdot t - \\dfrac{1}{2}gt^2$",
            "同高度落地的射程 $R = \\dfrac{v_0^2 \\sin 2\\theta}{g}$，45° 時最大",
          ],
          lessonIds: [L("projectile")],
        },
        {
          id: L("circular-motion"),
          title: "等速圓周運動",
          grade: 11,
          summary: "速率不變、方向不斷改變，加速度指向圓心。",
          keyPoints: ["向心加速度 $a_c = \\dfrac{v^2}{r}$", "向心力 $F_c = \\dfrac{mv^2}{r}$"],
        },
        {
          id: L("newton"),
          title: "牛頓運動定律與力圖",
          grade: 11,
          summary: "畫出受力圖、選定坐標軸分解力，再用 $\\Sigma F = ma$ 求解。",
          keyPoints: [
            "斜面上：沿斜面分力 $mg\\sin\\theta$，垂直斜面分力 $mg\\cos\\theta$",
            "動摩擦力 $f_k = \\mu_k N$",
            "靜摩擦力的大小隨外力調整，最大為 $\\mu_s N$",
          ],
          lessonIds: [L("forces")],
        },
        {
          id: L("gravitation"),
          title: "萬有引力與克卜勒定律",
          grade: 11,
          summary: "任兩質點間的引力與質量乘積成正比、與距離平方成反比。",
          keyPoints: [
            "$F = \\dfrac{GMm}{r^2}$",
            "克卜勒第三定律：$\\dfrac{a^3}{T^2}$ = 定值（繞同一中心天體）",
          ],
        },
        {
          id: L("momentum"),
          title: "動量、衝量與碰撞",
          grade: 11,
          summary: "動量 $\\vec{p} = m\\vec{v}$；系統不受外力時總動量守恆。",
          keyPoints: [
            "衝量 = 動量變化：$F\\Delta t = \\Delta p$",
            "彈性碰撞：動量與動能都守恆",
            "完全非彈性碰撞：碰後黏在一起，動能損失最多",
          ],
          lessonIds: [L("momentum-energy")],
        },
        {
          id: L("work-energy"),
          title: "功與能、力學能守恆",
          grade: 11,
          summary: "合力作功等於動能變化（功能定理）；只有保守力作功時力學能守恆。",
          keyPoints: [
            "功能定理：$W_{\\text{net}} = \\Delta K$（合力作功 = 動能變化）",
            "重力位能 $U = mgh$；彈力位能 $U = \\dfrac{1}{2}kx^2$",
          ],
          lessonIds: [L("momentum-energy")],
        },
        {
          id: L("rotation"),
          title: "轉動與角動量",
          grade: 11,
          summary: "力矩改變物體的轉動；不受外力矩時角動量守恆。",
          keyPoints: ["花式滑冰選手收手時轉得更快（角動量守恆）"],
        },
      ],
    },
    {
      id: L("energy"),
      title: "能量的形式與轉換",
      grade: 10,
      summary: "能量有多種形式，可以互相轉換，但總量守恆。",
      children: [
        {
          id: L("energy-forms"),
          title: "能量形式與能量守恆",
          grade: 10,
          summary: "力學能、熱能、電能、化學能、核能、光能等，轉換時總能量不變。",
          keyPoints: ["實際轉換時常有部分能量變成無法再利用的熱能"],
        },
        {
          id: L("mass-energy"),
          title: "質能互換",
          grade: 10,
          summary: "愛因斯坦的質能關係：質量也是能量的一種形式。",
          keyPoints: ["$E = mc^2$", "核分裂與核融合都會釋放能量，反應後總質量減少"],
        },
        {
          id: L("energy-resources"),
          title: "能源與永續",
          grade: 10,
          summary: "化石燃料、核能與再生能源（太陽能、風力、水力等）的優缺點與節能。",
        },
      ],
    },
    {
      id: L("thermal"),
      title: "熱學",
      grade: 12,
      summary: "溫度、熱與氣體的微觀解釋。",
      children: [
        {
          id: L("ideal-gas"),
          title: "理想氣體",
          grade: 12,
          summary: "理想氣體方程式 $PV = nRT$，溫度要用絕對溫度。",
          keyPoints: ["絕對溫度 = 攝氏溫度 + 273（精確值為 273.15），單位克耳文（K）"],
        },
        {
          id: L("kinetic-theory"),
          title: "氣體動力論",
          grade: 12,
          summary: "氣體壓力來自大量分子碰撞器壁；分子平均動能與絕對溫度成正比。",
          keyPoints: ["單原子理想氣體分子平均動能 $\\bar{K} = \\dfrac{3}{2}kT$"],
        },
        {
          id: L("thermo-laws"),
          title: "熱力學定律",
          grade: 12,
          summary: "第一定律是能量守恆；第二定律說明熱不會自發地由低溫傳到高溫。",
        },
      ],
    },
    {
      id: L("waves"),
      title: "波動、光與聲",
      grade: 12,
      summary: "波的傳播、疊加、干涉與繞射，以及都卜勒效應。",
      children: [
        {
          id: L("wave-props"),
          title: "波的反射、折射與疊加",
          grade: 12,
          summary: "波在界面反射與折射；兩波相遇時位移相加（疊加原理），相遇後各自保持原狀。",
          keyPoints: ["$v = f\\lambda$；波由一介質進入另一介質時頻率不變"],
          lessonIds: [L("waves")],
        },
        {
          id: L("interference"),
          title: "干涉與繞射",
          grade: 12,
          summary: "楊氏雙狹縫實驗證明光的波動性；狹縫寬度與波長相近時繞射明顯。",
          keyPoints: [
            "雙狹縫亮紋間距 $\\Delta y = \\dfrac{L\\lambda}{d}$",
            "建設性干涉：波程差 $= n\\lambda$；破壞性干涉：波程差 $= (n + \\frac{1}{2})\\lambda$",
          ],
          lessonIds: [L("waves")],
        },
        {
          id: L("doppler"),
          title: "都卜勒效應",
          grade: 12,
          summary: "波源與觀察者相對運動時，觀察到的頻率改變：接近變高、遠離變低。",
          keyPoints: ["波源接近靜止觀察者：$f' = f\\dfrac{v}{v - v_s}$"],
          lessonIds: [L("waves")],
        },
        {
          id: L("standing-wave"),
          title: "駐波與共鳴",
          grade: 12,
          summary: "兩列反向行進的相同波疊加成駐波；樂器利用駐波發出特定頻率。",
          keyPoints: ["兩端固定的弦：$L = n\\dfrac{\\lambda}{2}$"],
        },
      ],
    },
    {
      id: L("em"),
      title: "電磁學",
      grade: 12,
      summary: "靜電、電流、磁場與電磁感應，最終統一為電磁波。",
      children: [
        {
          id: L("electrostatics"),
          title: "庫侖定律與電場",
          grade: 12,
          summary: "點電荷間的靜電力與電量乘積成正比、與距離平方成反比。",
          keyPoints: ["$F = \\dfrac{kq_1q_2}{r^2}$", "電場 $E = \\dfrac{F}{q}$，單位 N/C"],
        },
        {
          id: L("current-circuit"),
          title: "電流與電路",
          grade: 12,
          summary: "電流是電荷的流動；電動勢、內電阻與克希荷夫定律分析電路。",
          keyPoints: ["$I = \\dfrac{\\Delta Q}{\\Delta t}$", "電功率 $P = IV = I^2R$"],
        },
        {
          id: L("current-magnetism"),
          title: "電流的磁效應",
          grade: 10,
          summary: "厄斯特發現電流產生磁場；載流導線在磁場中受力。",
          keyPoints: ["右手定則判斷磁場方向", "磁場單位：特斯拉（T）"],
        },
        {
          id: L("induction"),
          title: "電磁感應",
          grade: 10,
          summary: "法拉第發現磁通量變化產生感應電動勢；冷次定律決定感應電流方向。",
          keyPoints: [
            "$\\varepsilon = -N\\dfrac{\\Delta \\Phi_B}{\\Delta t}$",
            "感應電流的磁場反抗磁通量的變化",
          ],
          lessonIds: [L("em-quantum")],
        },
        {
          id: L("em-wave"),
          title: "電磁波",
          grade: 10,
          summary: "馬克士威預測電磁波，赫茲以實驗證實；光就是電磁波。",
          keyPoints: [
            "真空中所有電磁波速率都約為 $3 \\times 10^8$ m/s",
            "依頻率由低到高：無線電波、微波、紅外線、可見光、紫外線、X 射線、γ 射線",
          ],
          lessonIds: [L("em-quantum")],
        },
      ],
    },
    {
      id: L("modern"),
      title: "量子現象與近代物理",
      grade: 10,
      summary: "光與物質都同時具有波動性與粒子性；原子能量是量子化的。",
      children: [
        {
          id: L("photoelectric"),
          title: "光電效應",
          grade: 10,
          summary: "愛因斯坦以光量子說解釋光電效應：光子能量 $E = hf$。",
          keyPoints: [
            "光電子最大動能 $K_{max} = hf - W$",
            "頻率低於底限頻率時，光再強也不會放出電子",
            "光的強度只影響光電子數目",
          ],
          lessonIds: [L("em-quantum")],
        },
        {
          id: L("duality"),
          title: "波粒二象性與物質波",
          grade: 10,
          summary: "德布羅意提出物質波：運動的粒子也具有波動性。",
          keyPoints: ["物質波波長 $\\lambda = \\dfrac{h}{p}$", "電子繞射實驗證實了物質波"],
          lessonIds: [L("em-quantum")],
        },
        {
          id: L("atom-model"),
          title: "原子模型與能階",
          grade: 12,
          summary: "拉塞福散射實驗發現原子核；波耳模型以量子化能階解釋氫原子光譜。",
        },
        {
          id: L("nucleus"),
          title: "原子核與放射性",
          grade: 12,
          summary: "α、β、γ 衰變與半衰期；核分裂與核融合。",
        },
      ],
    },
  ],
};

export default mindmap;
