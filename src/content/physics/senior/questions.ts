import type { Question } from "../../types";

const id = (s: string) => `physics.senior.q-${s}`;
const node = (s: string) => `physics.senior.${s}`;

/** 素養題組：光電效應實驗紀錄 */
const CTX_PHOTO_DATA =
  "某實驗室用不同的單色光照射同一片金屬板（假設的實驗紀錄），並測量有沒有光電流。已知這片金屬的功函數為 2.3 eV，普朗克常數 $h = 4.14\\times10^{-15}$ eV·s。\n\n| 光 | 頻率（$10^{14}$ Hz） | 相對強度 | 結果 |\n|---|---|---|---|\n| 甲 | 4.0 | 1 | 無光電流 |\n| 乙 | 4.0 | 10 | 無光電流 |\n| 丙 | 7.0 | 1 | 有光電流 |\n| 丁 | 7.0 | 2 | 光電流是丙的 2 倍 |";

/** 素養題組：空氣軌道上的碰撞 */
const CTX_CART_COLLISION =
  "某班在水平的空氣軌道上做碰撞實驗（假設的數據）。滑車 A 質量 0.50 kg，以 0.80 m/s 向右運動，撞上靜止的滑車 B（質量 0.30 kg）。碰撞後，測得 A 的速度為向右 0.20 m/s。軌道摩擦可忽略，以向右為正。";

const questions: Question[] = [
  // 科學方法、物質組成與基本交互作用
  {
    id: id("b1"),
    type: "single",
    stem: "四種基本交互作用中，強度最強的是哪一種？",
    choices: ["重力", "電磁力", "強力", "弱力"],
    answer: 2,
    explain:
      "強度由強到弱依序為：強力 > 電磁力 > 弱力 > 重力。重力雖然最弱，但作用範圍無限遠且只有吸引，所以主宰天體運動。",
    nodeId: node("interactions"),
  },
  {
    id: id("b2"),
    type: "single",
    stem: "推箱子時地面對箱子的摩擦力，本質上屬於哪一種基本交互作用？",
    choices: ["重力", "電磁力", "強力", "弱力"],
    answer: 1,
    explain: "摩擦力、正向力、張力等接觸力，來自兩物體表面原子之間的電磁作用。",
    nodeId: node("interactions"),
  },
  {
    id: id("b3"),
    type: "multi",
    stem: "下列哪些是國際單位制（SI）的**基本單位**？（複選）",
    choices: ["公尺（m）", "公斤（kg）", "牛頓（N）", "安培（A）", "焦耳（J）"],
    answer: [0, 1, 3],
    explain:
      "牛頓 $= \\text{kg} \\cdot \\text{m/s}^2$、焦耳 $= \\text{N} \\cdot \\text{m}$ 都是由基本單位組合而成的導出單位。",
    nodeId: node("sci-units"),
  },
  {
    id: id("b4"),
    type: "tf",
    stem: "原子核中的質子彼此帶正電而互相排斥，原子核卻不會散開，這是因為有強力把核子束縛在一起。",
    answer: true,
    explain:
      "在原子核的尺度（約 $10^{-15}$ m）內，強力遠大於質子間的靜電斥力，因此能把質子與中子結合在一起。",
    nodeId: node("interactions"),
  },
  {
    id: id("b5"),
    type: "single",
    stem: "原子的直徑約為 $10^{-10}$ m，原子核直徑的數量級約為多少？",
    choices: ["$10^{-6}$ m", "$10^{-8}$ m", "$10^{-15}$ m", "$10^{-25}$ m"],
    answer: 2,
    explain:
      "原子核直徑約 $10^{-15}$～$10^{-14}$ m，比原子小了約 1 萬到 10 萬倍，原子內部大部分是空的。",
    nodeId: node("matter-scale"),
  },
  {
    id: id("b6"),
    type: "cloze",
    stem: "原子核的 β 衰變（例如中子轉變為質子）是由哪一種基本交互作用造成的？____",
    accept: ["弱力", "弱作用", "弱交互作用", "弱作用力", "弱核力"],
    explain: "弱力（弱交互作用）能改變粒子的種類，造成 β 衰變；它的作用範圍極短。",
    nodeId: node("interactions"),
  },
  // 運動學與拋體運動（g = 10 m/s²）
  {
    id: id("k1"),
    type: "numeric",
    stem: "從離地 20 m 高處，以 15 m/s 的速率水平拋出一顆球（$g = 10$ m/s²，忽略空氣阻力），落地點與拋出點的水平距離是多少公尺？",
    answer: 30,
    unit: "m",
    explain:
      "鉛直方向：$20 = \\dfrac{1}{2} \\times 10 \\times t^2$，$t = 2$ s；水平方向：$x = 15 \\times 2 = 30$ m。",
    nodeId: node("projectile"),
  },
  {
    id: id("k2"),
    type: "numeric",
    stem: "以 20 m/s 的初速、仰角 30° 斜向拋出一顆球（$g = 10$ m/s²），球上升的最大高度是多少公尺？",
    answer: 5,
    unit: "m",
    explain:
      "鉛直初速 $v_0\\sin 30° = 10$ m/s，最大高度 $H = \\dfrac{(v_0\\sin\\theta)^2}{2g} = \\dfrac{100}{20} = 5$ m。",
    nodeId: node("projectile"),
  },
  {
    id: id("k3"),
    type: "single",
    stem: "忽略空氣阻力，從地面以相同初速拋出物體並落回地面，哪一個仰角的水平射程最大？",
    choices: ["30°", "45°", "60°", "90°"],
    answer: 1,
    explain:
      "$R = \\dfrac{v_0^2\\sin 2\\theta}{g}$，當 $2\\theta = 90°$ 即 $\\theta = 45°$ 時 $\\sin 2\\theta = 1$ 最大。",
    nodeId: node("projectile"),
  },
  {
    id: id("k4"),
    type: "tf",
    stem: "斜拋物體到達最高點時，速度為零。",
    answer: false,
    explain: "最高點只有鉛直分量為零，水平分量 $v_0\\cos\\theta$ 仍然存在，所以速度不為零。",
    nodeId: node("projectile"),
  },
  {
    id: id("k5"),
    type: "single",
    stem: "以相同初速從地面拋出，仰角 30° 與仰角 60° 的兩顆球落回地面時，水平射程的關係為何？",
    choices: ["30° 較遠", "60° 較遠", "兩者相同", "條件不足，無法判斷"],
    answer: 2,
    explain:
      "$\\sin 60° = \\sin 120°$，所以 $R_{30°} = R_{60°}$。互為餘角的兩個仰角射程相同，但 60° 飛得較高、時間較長。",
    nodeId: node("projectile"),
  },
  {
    id: id("k6"),
    type: "numeric",
    stem: "汽車以 20 m/s 行駛，煞車後以 5 m/s² 的加速度等減速直到停止，煞車距離是多少公尺？",
    answer: 40,
    unit: "m",
    explain:
      "$v^2 = v_0^2 + 2a\\Delta x$：$0 = 20^2 - 2 \\times 5 \\times \\Delta x$，$\\Delta x = 40$ m。",
    nodeId: node("linear-motion"),
  },
  {
    id: id("k7"),
    type: "numeric",
    stem: "物體以 4 m/s 的速率在半徑 2 m 的圓周上做等速圓周運動，向心加速度的量值是多少 m/s²？",
    answer: 8,
    unit: "m/s²",
    explain: "$a_c = \\dfrac{v^2}{r} = \\dfrac{16}{2} = 8$ m/s²，方向指向圓心。",
    nodeId: node("circular-motion"),
  },
  // 牛頓定律、力圖與萬有引力
  {
    id: id("n1"),
    type: "numeric",
    stem: "物體在傾角 37° 的光滑斜面上由靜止下滑，加速度是多少 m/s²？（$g = 10$ m/s²，$\\sin 37° \\approx 0.6$）",
    answer: 6,
    unit: "m/s²",
    explain:
      "光滑斜面上只有 $mg\\sin\\theta$ 沿斜面，$a = g\\sin\\theta = 10 \\times 0.6 = 6$ m/s²，與質量無關。",
    nodeId: node("newton"),
  },
  {
    id: id("n2"),
    type: "numeric",
    stem: "質量 2 kg 的物體放在水平面上，受 10 N 的水平拉力而滑動，動摩擦係數 0.2（$g = 10$ m/s²），加速度是多少 m/s²？",
    answer: 3,
    unit: "m/s²",
    explain:
      "摩擦力 $f = \\mu mg = 0.2 \\times 2 \\times 10 = 4$ N，$a = \\dfrac{10 - 4}{2} = 3$ m/s²。",
    nodeId: node("newton"),
  },
  {
    id: id("n3"),
    type: "single",
    stem: "一木塊靜止在粗糙斜面上，斜面對木塊的靜摩擦力方向為何？",
    choices: ["沿斜面向上", "沿斜面向下", "垂直斜面向外", "鉛直向上"],
    answer: 0,
    explain:
      "重力的分量 $mg\\sin\\theta$ 使木塊有沿斜面下滑的趨勢，靜摩擦力與此趨勢相反，所以沿斜面向上。",
    nodeId: node("newton"),
  },
  {
    id: id("n4"),
    type: "tf",
    stem: "物體放在傾角 θ 的斜面上時，斜面給它的正向力大小等於 $mg$。",
    answer: false,
    explain:
      "正向力垂直斜面，只與重力垂直斜面的分量平衡：$N = mg\\cos\\theta < mg$（$\\theta \\ne 0$ 時）。",
    nodeId: node("newton"),
  },
  {
    id: id("n5"),
    type: "numeric",
    stem: "兩物體之間的距離變為原來的 2 倍，彼此間的萬有引力變為原來的幾倍？",
    answer: 0.25,
    tolerance: 0.001,
    explain:
      "$F = \\dfrac{GMm}{r^2}$，距離加倍時引力變為 $\\dfrac{1}{2^2} = \\dfrac{1}{4} = 0.25$ 倍。",
    nodeId: node("gravitation"),
  },
  {
    id: id("n6"),
    type: "single",
    stem: "小明站在電梯內的磅秤上。電梯**向上加速**時，磅秤讀數與他的體重相比如何？",
    choices: ["大於體重", "等於體重", "小於體重", "等於零"],
    answer: 0,
    explain: "$N - mg = ma$，所以 $N = m(g + a) > mg$；磅秤讀數就是正向力，因此大於體重。",
    nodeId: node("newton"),
  },
  {
    id: id("n7"),
    type: "numeric",
    stem: "某行星繞太陽運轉的軌道半長軸是地球的 4 倍，它的公轉週期是地球的幾倍？",
    answer: 8,
    explain:
      "克卜勒第三定律 $T^2 \\propto a^3$：$T \\propto 4^{3/2} = 8$，所以週期是地球的 8 倍（約 8 年）。",
    nodeId: node("gravitation"),
  },
  // 動量與能量
  {
    id: id("mo1"),
    type: "numeric",
    stem: "質量 0.5 kg 的球以 10 m/s 垂直撞牆後，以 8 m/s 反彈。球的動量變化量值是多少 kg·m/s？",
    answer: 9,
    unit: "kg·m/s",
    explain:
      "取反彈方向為正：$\\Delta p = 0.5 \\times 8 - 0.5 \\times (-10) = 9$ kg·m/s。方向改變時要注意正負號！",
    nodeId: node("momentum"),
  },
  {
    id: id("mo2"),
    type: "numeric",
    stem: "質量 0.01 kg 的子彈以 400 m/s 射入靜止於光滑水平面上、質量 1.99 kg 的木塊並嵌在其中，兩者的共同速度是多少 m/s？",
    answer: 2,
    unit: "m/s",
    explain: "動量守恆：$0.01 \\times 400 = (0.01 + 1.99)V$，$V = \\dfrac{4}{2} = 2$ m/s。",
    nodeId: node("momentum"),
  },
  {
    id: id("mo3"),
    type: "single",
    stem: "兩球在光滑水平面上發生**彈性碰撞**，下列敘述何者正確？",
    choices: [
      "總動量與總動能都守恆",
      "總動量守恆，總動能不守恆",
      "總動能守恆，總動量不守恆",
      "總動量與總動能都不守恆",
    ],
    answer: 0,
    explain: "只要外力合力為零，任何碰撞的總動量都守恆；彈性碰撞的定義就是碰撞前後總動能也不變。",
    nodeId: node("momentum"),
  },
  {
    id: id("mo4"),
    type: "tf",
    stem: "完全非彈性碰撞中，兩物體碰後黏在一起，所以系統的總動量不守恆。",
    answer: false,
    explain: "完全非彈性碰撞損失的是**動能**；只要外力合力為零，總動量仍然守恆。",
    nodeId: node("momentum"),
  },
  {
    id: id("mo5"),
    type: "numeric",
    stem: "小球從高 0.8 m 處，沿光滑曲面由靜止滑下（$g = 10$ m/s²），到達底端時的速率是多少 m/s？",
    answer: 4,
    unit: "m/s",
    explain:
      "力學能守恆：$mgh = \\dfrac{1}{2}mv^2$，$v = \\sqrt{2gh} = \\sqrt{16} = 4$ m/s，與曲面形狀無關。",
    nodeId: node("work-energy"),
  },
  {
    id: id("mo6"),
    type: "numeric",
    stem: "一個 10 N 的定力作用在物體上 0.3 s，這個力給物體的衝量是多少 N·s？",
    answer: 3,
    unit: "N·s",
    explain: "衝量 $J = F\\Delta t = 10 \\times 0.3 = 3$ N·s，等於物體動量的變化。",
    nodeId: node("momentum"),
  },
  {
    id: id("mo7"),
    type: "multi",
    stem: "下列哪些情況中，系統的力學能守恆？（複選）",
    choices: [
      "忽略空氣阻力的自由落體",
      "忽略阻力的單擺擺動",
      "物體沿粗糙斜面下滑",
      "在光滑水平面上振動的彈簧與木塊",
    ],
    answer: [0, 1, 3],
    explain:
      "只有重力、彈力等保守力作功時力學能守恆；粗糙斜面的摩擦力作負功，力學能會轉換成熱能而減少。",
    nodeId: node("work-energy"),
  },
  {
    id: id("mo8"),
    type: "numeric",
    stem: "質量 2 kg 的物體速率由 3 m/s 增加到 5 m/s，合力對它作了多少焦耳的功？",
    answer: 16,
    unit: "J",
    explain: "功能定理：$W = \\Delta K = \\dfrac{1}{2} \\times 2 \\times (5^2 - 3^2) = 16$ J。",
    nodeId: node("work-energy"),
  },
  // 熱學
  {
    id: id("t1"),
    type: "single",
    stem: "密閉容器中的理想氣體體積不變，溫度由 27°C 升高到 127°C，壓力變為原來的幾倍？",
    choices: ["$\\dfrac{4}{3}$ 倍", "$\\dfrac{127}{27}$ 倍", "2 倍", "$\\dfrac{3}{4}$ 倍"],
    answer: 0,
    explain:
      "定容時 $P \\propto T$（絕對溫度）：$\\dfrac{127 + 273}{27 + 273} = \\dfrac{400}{300} = \\dfrac{4}{3}$。不可以直接用攝氏溫度相除！",
    nodeId: node("ideal-gas"),
  },
  {
    id: id("t2"),
    type: "tf",
    stem: "依照氣體動力論，理想氣體分子的平均動能只與絕對溫度有關。",
    answer: true,
    explain: "單原子理想氣體分子的平均動能 $\\bar{K} = \\dfrac{3}{2}kT$，只由絕對溫度 $T$ 決定。",
    nodeId: node("kinetic-theory"),
  },
  {
    id: id("t3"),
    type: "cloze",
    stem: "絕對溫度 0 K 相當於攝氏 ____ °C。",
    accept: ["-273.15", "−273.15", "-273", "−273", "負273.15", "負273"],
    explain: "$0 \\text{ K} = -273.15$°C，通常近似為 $-273$°C，稱為絕對零度。",
    nodeId: node("ideal-gas"),
  },
  {
    id: id("t4"),
    type: "single",
    stem: "「熱不會自發地由低溫物體傳到高溫物體」是哪一個定律的內容？",
    choices: ["熱力學第零定律", "熱力學第一定律", "熱力學第二定律", "牛頓冷卻定律"],
    answer: 2,
    explain:
      "熱力學第二定律說明自然過程的方向性；冰箱能把熱由低溫處送到高溫處，是因為外界消耗電能作功。",
    nodeId: node("thermo-laws"),
  },
  // 波動
  {
    id: id("w1"),
    type: "numeric",
    stem: "波長 500 nm 的光通過間距 0.25 mm 的雙狹縫，屏幕距離狹縫 1 m，相鄰亮紋的間距是多少毫米（mm）？",
    answer: 2,
    tolerance: 0.01,
    unit: "mm",
    explain:
      "$\\Delta y = \\dfrac{L\\lambda}{d} = \\dfrac{1 \\times 5 \\times 10^{-7}}{2.5 \\times 10^{-4}} = 2 \\times 10^{-3}$ m = 2 mm。",
    nodeId: node("interference"),
  },
  {
    id: id("w2"),
    type: "single",
    stem: "救護車鳴笛朝你駛來，再從你身邊離開。你聽到的鳴笛聲音調如何變化？",
    choices: ["接近時較高，離開時較低", "接近時較低，離開時較高", "始終不變", "接近與離開時都較高"],
    answer: 0,
    explain: "都卜勒效應：波源接近時波長被壓縮、頻率變高；遠離時波長被拉長、頻率變低。",
    nodeId: node("doppler"),
  },
  {
    id: id("w3"),
    type: "numeric",
    stem: "聲源以 34 m/s 的速率朝靜止的觀察者接近，聲源頻率 900 Hz，聲速 340 m/s。觀察者聽到的頻率是多少 Hz？",
    answer: 1000,
    unit: "Hz",
    explain: "$f' = f\\dfrac{v}{v - v_s} = 900 \\times \\dfrac{340}{306} = 1000$ Hz。",
    nodeId: node("doppler"),
  },
  {
    id: id("w4"),
    type: "tf",
    stem: "兩列波相遇後會互相改變，各自無法保持原來的形狀繼續前進。",
    answer: false,
    explain:
      "相遇時位移依疊加原理相加，但相遇後兩列波會各自保持原來的波形與速度繼續前進（波的獨立性）。",
    nodeId: node("wave-props"),
  },
  {
    id: id("w5"),
    type: "single",
    stem: "水波通過狹縫時，在什麼情況下繞射現象最明顯？",
    choices: ["狹縫寬度遠大於波長", "狹縫寬度與波長相近或更小", "波的振幅很大", "波的頻率很高"],
    answer: 1,
    explain:
      "狹縫（或障礙物）的大小與波長相近或更小時，繞射最明顯；這也是聲波容易繞過門口、光卻不容易的原因。",
    nodeId: node("interference"),
  },
  {
    id: id("w6"),
    type: "multi",
    stem: "下列哪些現象是光具有**波動性**的證據？（複選）",
    choices: [
      "雙狹縫實驗出現明暗相間的干涉條紋",
      "光通過極細狹縫後產生繞射",
      "光電效應中，紅光再強也無法使鋅板放出電子",
      "肥皂薄膜出現彩色條紋",
    ],
    answer: [0, 1, 3],
    explain:
      "干涉與繞射是波特有的現象；光電效應則顯示光的能量是一份一份的（光子），是粒子性的證據。",
    nodeId: node("interference"),
  },
  {
    id: id("w7"),
    type: "cloze",
    stem: "兩列波的波峰與波峰相遇時振幅相加變大，稱為 ____ 干涉。",
    accept: ["建設性", "建設", "相長"],
    explain: "波峰遇波峰為建設性干涉；波峰遇波谷互相抵消，稱為破壞性干涉。",
    nodeId: node("interference"),
  },
  // 電磁學與量子現象
  {
    id: id("e1"),
    type: "single",
    stem: "將磁棒的 N 極插入線圈時，線圈靠近磁棒的那一端會形成什麼磁極？",
    choices: ["N 極", "S 極", "不形成磁極", "N、S 極交替變化"],
    answer: 0,
    explain:
      "冷次定律：感應電流的磁場要反抗磁通量的增加，所以靠近磁棒的一端形成 N 極，排斥插入的 N 極。",
    nodeId: node("induction"),
  },
  {
    id: id("e2"),
    type: "numeric",
    stem: "100 匝的線圈中，每匝的磁通量在 0.5 s 內由 0.02 Wb 均勻增加到 0.07 Wb，平均感應電動勢的量值是多少伏特？",
    answer: 10,
    unit: "V",
    explain:
      "$|\\varepsilon| = N\\dfrac{\\Delta\\Phi_B}{\\Delta t} = 100 \\times \\dfrac{0.05}{0.5} = 10$ V。",
    nodeId: node("induction"),
  },
  {
    id: id("e3"),
    type: "single",
    stem: "所有電磁波在真空中的傳播速率約為多少？",
    choices: ["340 m/s", "$3 \\times 10^5$ m/s", "$3 \\times 10^8$ m/s", "與頻率成正比"],
    answer: 2,
    explain:
      "真空中所有電磁波（無線電波、可見光、X 射線……）的速率都等於光速，約 $3 \\times 10^8$ m/s。",
    nodeId: node("em-wave"),
  },
  {
    id: id("e4"),
    type: "single",
    stem: "下列電磁波中，頻率最高的是哪一種？",
    choices: ["微波", "紅外線", "可見光", "γ 射線"],
    answer: 3,
    explain: "依頻率由低到高：無線電波、微波、紅外線、可見光、紫外線、X 射線、γ 射線。",
    nodeId: node("em-wave"),
  },
  {
    id: id("e5"),
    type: "numeric",
    stem: "能量 5.0 eV 的光子照射功函數 2.3 eV 的金屬，放出的光電子最大動能是多少 eV？",
    answer: 2.7,
    tolerance: 0.01,
    unit: "eV",
    explain: "$K_{max} = hf - W = 5.0 - 2.3 = 2.7$ eV。",
    nodeId: node("photoelectric"),
  },
  {
    id: id("e6"),
    type: "tf",
    stem: "光電效應中，只要光的強度夠強、照射夠久，任何頻率的光都能使金屬放出電子。",
    answer: false,
    explain:
      "每個電子一次只吸收一個光子。光子能量 $hf$ 小於功函數時，光再強、照再久都不會放出電子——這正是波動說無法解釋的地方。",
    nodeId: node("photoelectric"),
  },
  {
    id: id("e7"),
    type: "single",
    stem: "以頻率高於底限頻率的光照射金屬。若頻率不變、只把光的強度加倍，會有什麼結果？",
    choices: [
      "光電子數目增加，最大動能不變",
      "光電子數目不變，最大動能加倍",
      "光電子數目與最大動能都加倍",
      "不再放出光電子",
    ],
    answer: 0,
    explain:
      "強度加倍代表每秒射到的光子數加倍，所以光電子數目增加；每個光子的能量 $hf$ 不變，最大動能也不變。",
    nodeId: node("photoelectric"),
  },
  {
    id: id("e8"),
    type: "cloze",
    stem: "光子的能量 $E = hf$，其中 $h$ 稱為 ____ 常數。",
    accept: ["普朗克", "普朗克常數", "蒲朗克", "蒲朗克常數", "Planck"],
    explain: "普朗克常數 $h \\approx 6.63 \\times 10^{-34}$ J·s，是量子物理最基本的常數之一。",
    nodeId: node("photoelectric"),
  },
  {
    id: id("e9"),
    type: "numeric",
    stem: "波長 620 nm 的紅光，每個光子的能量是多少 eV？（$hc \\approx 1240$ eV·nm）",
    answer: 2,
    tolerance: 0.01,
    unit: "eV",
    explain: "$E = \\dfrac{hc}{\\lambda} = \\dfrac{1240}{620} = 2.0$ eV。",
    nodeId: node("photoelectric"),
  },
  {
    id: id("e10"),
    type: "single",
    stem: "兩個點電荷之間的距離變為原來的 2 倍，靜電力變為原來的多少？",
    choices: ["2 倍", "4 倍", "$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$"],
    answer: 3,
    explain: "庫侖定律 $F = \\dfrac{kq_1q_2}{r^2}$，距離加倍，靜電力變為 $\\dfrac{1}{4}$。",
    nodeId: node("electrostatics"),
  },
  {
    id: id("e11"),
    type: "numeric",
    stem: "電量 $2 \\times 10^{-6}$ C 的點電荷在某處受到 0.06 N 的靜電力，該處電場的量值是多少 N/C？",
    answer: 30000,
    unit: "N/C",
    explain: "$E = \\dfrac{F}{q} = \\dfrac{0.06}{2 \\times 10^{-6}} = 3 \\times 10^4$ N/C。",
    nodeId: node("electrostatics"),
  },
  {
    id: "physics.senior.q-set-photo-data-1",
    type: "single",
    context: CTX_PHOTO_DATA,
    stem: "乙光的強度是甲光的 10 倍，卻仍然沒有光電流，最合理的解釋是？",
    choices: [
      "乙光的頻率低於這片金屬的截止頻率，每個光子的能量都不足以打出電子",
      "乙光太亮，把電子都吸收掉了",
      "光的強度越大，光電流會越小",
      "金屬板在實驗前還沒有充電",
    ],
    answer: 0,
    explain:
      "能否打出電子由光子能量 $hf$ 決定。$4.0\\times10^{14}$ Hz 的光子能量約 $1.66$ eV，小於功函數 $2.3$ eV，所以不論多亮都打不出電子；光的強度只影響光子數量。",
    difficulty: 2,
    nodeId: "physics.senior.photoelectric",
  },
  {
    id: "physics.senior.q-set-photo-data-2",
    type: "numeric",
    context: CTX_PHOTO_DATA,
    stem: "丙光打出的光電子，最大動能約是多少 eV？",
    answer: 0.6,
    tolerance: 0.02,
    unit: "eV",
    explain:
      "光子能量 $hf=4.14\\times10^{-15}\\times7.0\\times10^{14}\\approx2.90$ eV，最大動能 $K_{max}=hf-W=2.90-2.3\\approx0.60$ eV。",
    difficulty: 3,
    nodeId: "physics.senior.photoelectric",
  },
  {
    id: "physics.senior.q-set-photo-data-3",
    type: "tf",
    context: CTX_PHOTO_DATA,
    stem: "丁光打出的光電子，其最大動能是丙光的 2 倍。",
    answer: false,
    explain:
      "丙、丁頻率相同，光子能量相同，所以光電子的最大動能相同；丁光強度為 $2$ 倍，只讓光子數與光電子數變成 $2$ 倍，因此光電流加倍。",
    difficulty: 2,
    nodeId: "physics.senior.photoelectric",
  },
  {
    id: "physics.senior.q-set-cart-collision-1",
    type: "numeric",
    context: CTX_CART_COLLISION,
    stem: "碰撞後，滑車 B 的速度是多少（向右為正）？",
    answer: 1,
    tolerance: 0.01,
    unit: "m/s",
    explain:
      "碰撞前後總動量守恆：$0.50\\times0.80=0.50\\times0.20+0.30\\,v_B$，即 $0.40=0.10+0.30\\,v_B$，得 $v_B=1.0$ m/s。",
    difficulty: 2,
    nodeId: "physics.senior.momentum",
  },
  {
    id: "physics.senior.q-set-cart-collision-2",
    type: "single",
    context: CTX_CART_COLLISION,
    stem: "比較碰撞前後的總動能，這次碰撞屬於哪一種？",
    choices: [
      "動能前後相等，是彈性碰撞",
      "動能變小，是非彈性碰撞",
      "動能變大，是爆炸",
      "資料不足，無法判斷",
    ],
    answer: 0,
    explain:
      "碰前動能 $\\frac{1}{2}\\times0.50\\times0.80^2=0.16$ J；碰後 $\\frac{1}{2}\\times0.50\\times0.20^2+\\frac{1}{2}\\times0.30\\times1.0^2=0.01+0.15=0.16$ J。總動能不變，是彈性碰撞。",
    difficulty: 3,
    nodeId: "physics.senior.momentum",
  },
  {
    id: "physics.senior.q-set-cart-collision-3",
    type: "numeric",
    context: CTX_CART_COLLISION,
    stem: "若改成兩車碰撞後黏在一起，一起運動的速度是多少？",
    answer: 0.5,
    tolerance: 0.01,
    unit: "m/s",
    explain:
      "完全非彈性碰撞，動量仍守恆：$0.50\\times0.80=(0.50+0.30)\\,v$，得 $v=0.50$ m/s。此時動能只剩 $0.10$ J，少掉的 $0.06$ J 轉成熱和形變。",
    difficulty: 2,
    nodeId: "physics.senior.momentum",
  },
];

export default questions;
