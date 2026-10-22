import type { CurriculumNode } from "../../types";

/** 普通型高中數學（108 課綱第五學習階段）：高一共同必修、高二數A／數B、高三數甲／數乙 */
const mindmap: CurriculumNode = {
  id: "math.senior",
  title: "高中數學",
  summary: "高一學共同必修；高二依志向選數A（理工）或數B（人文社會）；高三加深加廣選數甲或數乙。",
  children: [
    {
      id: "math.senior.y10",
      title: "高一 共同必修",
      children: [
        {
          id: "math.senior.numbers",
          title: "數與式",
          grade: 10,
          summary: "實數的性質、絕對值、乘法公式與根式運算。",
          keyPoints: [
            "$|x - a| < r \\Leftrightarrow a - r < x < a + r$",
            "算幾不等式 $\\frac{a+b}{2} \\ge \\sqrt{ab}$（$a, b \\ge 0$）",
          ],
          extras: [
            {
              kind: "challenge",
              title: "固定周長，面積最大",
              body: "用 $20$ 公尺的籬笆圍一塊長方形菜園，長 $a$、寬 $b$ 滿足 $a+b=10$。面積 $ab$ 最大是多少？提示：用算幾不等式 $\\frac{a+b}{2}\\ge\\sqrt{ab}$。**思路**：$5 \\ge \\sqrt{ab}$，所以 $ab \\le 25$，等號在 $a=b=5$ 時成立。結論：周長固定時，正方形的面積最大。",
            },
            {
              kind: "myth",
              title: "根號下的平方等於本身嗎",
              body: "$\\sqrt{x^2}$ 等於 $x$ 嗎？不一定。取 $x=-3$：$\\sqrt{(-3)^2}=\\sqrt{9}=3$，不是 $-3$。正確寫法是 $\\sqrt{x^2}=|x|$。根號代表「非負的平方根」，所以結果不會是負的。這個小細節常是絕對值與根式題的陷阱。",
            },
          ],
        },
        {
          id: "math.senior.line-circle",
          title: "直線與圓",
          grade: 10,
          summary: "斜率、直線方程式、圓方程式，以及直線與圓的關係。",
          keyPoints: ["點斜式 $y - y_0 = m(x - x_0)$", "圓 $(x-h)^2 + (y-k)^2 = r^2$"],
          extras: [
            {
              kind: "cross",
              title: "定位其實是圓的交點",
              body: "定位的基本想法之一，是知道自己到幾個已知位置的距離。到一個基地台距離為 $r$，你就在以它為圓心、半徑 $r$ 的圓上；再加上第二、第三個基地台，三個圓交於一點，就是你的位置。實際的 GPS 在三維空間運作，還要修正時鐘誤差，所以至少需要 $4$ 顆衛星。",
            },
          ],
        },
        {
          id: "math.senior.polynomial",
          title: "多項式函數",
          grade: 10,
          summary: "多項式除法、餘式定理、因式定理、三次函數圖形與多項式不等式。",
          keyPoints: ["餘式定理：$f(x)$ 除以 $x - a$ 的餘式為 $f(a)$"],
          extras: [
            {
              kind: "history",
              title: "三次方程式的爭議",
              body: "三次方程式的公式解，是 16 世紀義大利數學界的一場風波。費羅最早解出某一類三次方程式，塔爾塔利亞獨立找到更一般的解法，卡爾達諾得知後在 1545 年的著作《大術》中公開發表，因而引發爭議。後來阿貝爾證明，五次以上的一般方程式沒有根式公式解。",
            },
          ],
        },
        {
          id: "math.senior.exp-log",
          title: "指數與對數",
          grade: 10,
          summary: "指數律推廣到實數指數、常用對數與對數律。",
          keyPoints: ["$\\log_a MN = \\log_a M + \\log_a N$", "$\\log 2 \\approx 0.3010$"],
          lessonIds: ["math.senior.exp-log"],
          extras: [
            {
              kind: "life",
              title: "地震規模與對數",
              body: "地震規模每差 $1$，地面振幅差 $10$ 倍，釋放的能量約差 $10^{1.5}\\approx 31.6$ 倍。所以規模 $7$ 的地震比規模 $6$ 的，能量大約是 $32$ 倍，而不是只大一點。這就是對數刻度：用小小的數字，壓縮非常大的範圍。",
            },
            {
              kind: "history",
              title: "納皮爾與對數表",
              body: "蘇格蘭的納皮爾在 1614 年發表對數表。當時天文學家要做大量乘除，很容易出錯。對數把乘法變成加法：$\\log(MN)=\\log M+\\log N$，查表相加再查回去，就完成了。後來出現的計算尺也是靠對數刻度，工程師用了幾百年，直到電子計算機普及。",
            },
            {
              kind: "challenge",
              title: "2 的 100 次方有幾位數",
              body: "$2^{100}$ 是幾位數？不用計算機也能算。提示：正整數 $N$ 的位數等於 $\\lfloor\\log N\\rfloor+1$。**思路**：$\\log 2^{100}=100\\times 0.3010=30.10$，所以 $2^{100}\\approx 10^{30.10}$，整數部分是 $30$，位數是 $31$。",
            },
          ],
        },
        {
          id: "math.senior.sequence",
          title: "數列與級數",
          grade: 10,
          summary: "等差、等比數列與級數，$\\Sigma$ 符號與數學歸納法。",
          extras: [
            {
              kind: "history",
              title: "棋盤上的麥粒",
              body: "流傳的故事說，國王要獎賞發明西洋棋的人，他只要求：第 $1$ 格放 $1$ 粒麥子，第 $2$ 格放 $2$ 粒，第 $3$ 格放 $4$ 粒……每格是前一格的 $2$ 倍，放滿 $64$ 格。總數是等比級數 $1+2+4+\\cdots+2^{63}=2^{64}-1\\approx 1.8\\times 10^{19}$ 粒，大到根本不可能辦到。",
            },
          ],
        },
        {
          id: "math.senior.counting",
          title: "排列組合",
          grade: 10,
          summary: "加法原理、乘法原理、排列 $P^n_k$ 與組合 $C^n_k$、二項式定理。",
          lessonIds: ["math.senior.counting-probability"],
          extras: [
            {
              kind: "life",
              title: "密碼為什麼要長",
              body: "$4$ 位數字密碼有 $10^4=10000$ 種組合；若改成 $8$ 碼、每碼可以是大小寫英文字母或數字（共 $62$ 種），組合數是 $62^8\\approx 2.2\\times 10^{14}$。長度每加一碼，組合數就乘以 $62$，這就是好密碼要長、要混用字元的原因。",
            },
            {
              kind: "challenge",
              title: "圍圓桌的坐法",
              body: "$6$ 個人圍著圓桌坐，只看相對位置（旋轉後相同視為同一種），有幾種坐法？提示：先固定一人的位置當作基準。**思路**：其餘 $5$ 人排在剩下的 $5$ 個位置，共 $5!=120$ 種。一般地，$n$ 人圍圓桌有 $(n-1)!$ 種坐法。",
            },
          ],
        },
        {
          id: "math.senior.probability",
          title: "古典機率",
          grade: 10,
          summary: "樣本空間、事件、機率的性質與期望值。",
          lessonIds: ["math.senior.counting-probability"],
          extras: [
            {
              kind: "myth",
              title: "生日問題",
              body: "一個班有 $23$ 人，至少有兩人生日相同的機率，居然超過 $50\\%$（約 $50.7\\%$）。直覺上很難相信，但算「全部都不同」比較容易：$1\\times\\frac{364}{365}\\times\\frac{363}{365}\\times\\cdots\\times\\frac{343}{365}\\approx 0.493$，再用 $1$ 減去它。關鍵是 $23$ 人之間的「配對」有 $C^{23}_2=253$ 組，比人數多很多。",
            },
          ],
        },
        {
          id: "math.senior.data",
          title: "數據分析",
          grade: 10,
          summary: "一維數據的平均與標準差；二維數據的散布圖、相關係數與迴歸直線。",
          lessonIds: ["math.senior.data-analysis"],
          extras: [
            {
              kind: "myth",
              title: "相關不等於因果",
              body: "夏天冰淇淋銷量和海邊溺水人數常常一起上升，兩者呈現正相關。難道吃冰淇淋會害人溺水嗎？當然不是：兩者都受「天氣炎熱」影響。相關係數只描述「一起變動」的程度，不能證明因果。看到強相關時，請多問一句：有沒有第三個共同因素？",
            },
            {
              kind: "history",
              title: "迴歸一詞的由來",
              body: "「迴歸」這個詞來自英國的高爾頓（Galton）。他在 19 世紀研究父母與子女的身高，發現特別高的父母，子女平均也偏高，但通常沒那麼高；特別矮的則相反。子女身高有往平均「回歸」的傾向，這就是名稱的由來，如今迴歸直線已被用在各種預測。",
            },
          ],
        },
        {
          id: "math.senior.trig-ratio",
          title: "三角比",
          grade: 10,
          summary: "廣義角、正弦定理與餘弦定理、三角測量。",
          keyPoints: ["$\\frac{a}{\\sin A} = 2R$", "$c^2 = a^2 + b^2 - 2ab\\cos C$"],
          extras: [
            {
              kind: "history",
              title: "用影子量地球",
              body: "約西元前 240 年，埃拉托斯特尼發現夏至正午時，南方賽伊尼的陽光能直射井底，北方亞歷山卓的竿子卻有影子，夾角約為圓周的 $\\frac{1}{50}$（約 $7.2°$）。再配上兩城的距離，就能推算出地球周長。當時距離單位的長度有不同說法，所以換算成今天的公里只能說相當接近。",
            },
          ],
        },
      ],
    },
    {
      id: "math.senior.y11",
      title: "高二 數A／數B",
      children: [
        {
          id: "math.senior.trig-func",
          title: "三角函數",
          grade: 11,
          summary: "弧度、單位圓定義的三角函數、圖形與週期、和角公式。",
          keyPoints: ["$\\sin^2\\theta + \\cos^2\\theta = 1$", "$y = \\sin x$ 週期 $2\\pi$"],
          lessonIds: ["math.senior.trig-unit-circle"],
          extras: [
            {
              kind: "life",
              title: "插座裡的正弦波",
              body: "台灣家用市電是交流電，電壓隨時間做正弦變化，頻率為 $60$ Hz，也就是每秒完成 $60$ 個週期，週期是 $\\frac{1}{60}\\approx 0.0167$ 秒。使用傳統安定器的日光燈，每秒其實明暗 $120$ 次，只是人眼看不出來。三角函數的週期性，就藏在每個插座裡。",
            },
            {
              kind: "challenge",
              title: "正弦加餘弦的最大值",
              body: "$\\sin x+\\cos x$ 的最大值是多少？提示：把它寫成單一個正弦函數。**思路**：$\\sin x+\\cos x=\\sqrt{2}\\sin\\left(x+\\frac{\\pi}{4}\\right)$，而正弦最大是 $1$，所以最大值為 $\\sqrt{2}$，發生在 $x=\\frac{\\pi}{4}+2k\\pi$（$k$ 為整數）時。",
            },
          ],
        },
        {
          id: "math.senior.exp-func",
          title: "指數與對數函數",
          grade: 11,
          summary: "$y = a^x$ 與 $y = \\log_a x$ 的圖形互為反函數，對稱於 $y = x$。",
          extras: [
            {
              kind: "cross",
              title: "碳-14 的半衰期",
              body: "碳-14 的半衰期約 $5730$ 年，剩餘量可寫成 $N = N_0\\left(\\frac{1}{2}\\right)^{t/5730}$，這是底數小於 $1$ 的指數函數。考古學家量出木頭或骨頭中碳-14 剩多少，再用對數反推 $t$，就能估計年代。若剩下四分之一，表示經過兩個半衰期，約 $11460$ 年。",
            },
            {
              kind: "myth",
              title: "指數成長前期很慢",
              body: "池塘的水草每天面積增加一倍，第 $30$ 天蓋滿整個池塘。哪一天蓋滿一半？不是第 $15$ 天，而是第 $29$ 天。指數成長前期看起來很慢，最後一天卻增加最多，所以疫情擴散、複利等現象，等到「看起來很嚴重」時，往往已經來不及。",
            },
          ],
        },
        {
          id: "math.senior.vector",
          title: "平面向量",
          grade: 11,
          summary: "向量的加減、係數積、內積與夾角，以及面積公式。",
          keyPoints: ["$\\vec{u} \\cdot \\vec{v} = |\\vec{u}||\\vec{v}|\\cos\\theta$"],
          lessonIds: ["math.senior.vectors"],
          extras: [
            {
              kind: "life",
              title: "飛機的地速",
              body: "飛機的「地速」是空速加上風速的向量和。假設飛機空速 $200$ km/h 向東，另有 $150$ km/h 的風向北吹，兩個互相垂直的向量相加，地速大小為 $\\sqrt{200^2+150^2}=250$ km/h，方向由正東偏北約 $37°$。領航員必須把風的影響算進航向裡。",
            },
            {
              kind: "cross",
              title: "內積與物理的功",
              body: "物理的「功」是力與位移的內積：$W=\\vec{F}\\cdot\\vec{s}=|\\vec{F}||\\vec{s}|\\cos\\theta$。提著行李水平走路，手的力向上、位移向前，夾角 $90°$，$\\cos 90°=0$，所以提力對行李沒有作功。數學的內積，剛好解釋了這個看似違反直覺的物理結論。",
            },
          ],
        },
        {
          id: "math.senior.space",
          title: "空間向量、平面與直線（數A）",
          grade: 11,
          summary: "空間坐標、外積、平面方程式與空間直線。",
          extras: [
            {
              kind: "life",
              title: "3D 遊戲的光影",
              body: "電腦遊戲和 3D 動畫中，每個表面的「法向量」決定光線照上去的明暗。兩個向量 $\\vec{u}$、$\\vec{v}$ 的外積 $\\vec{u}\\times\\vec{v}$ 會垂直於這兩個向量，因此三角形的兩條邊做外積，就得到這個面的法向量。你在遊戲裡看到的立體光影，背後大量用到這樣的計算。",
            },
          ],
        },
        {
          id: "math.senior.matrix",
          title: "矩陣",
          grade: 11,
          summary: "矩陣運算、反方陣、線性變換與轉移矩陣（數B 偏重資料表的應用）。",
          extras: [
            {
              kind: "life",
              title: "網頁排名與轉移矩陣",
              body: "搜尋引擎早期的 PageRank 概念可以想成：一個人隨機點網頁連結，每次點到各連結的機率寫成「轉移矩陣」。經過很多步之後，停留在各網頁的機率會趨於穩定，機率越大的網頁越重要。這是矩陣連乘在現實中的一個著名應用。",
            },
          ],
        },
        {
          id: "math.senior.cond-prob",
          title: "條件機率與貝氏定理",
          grade: 11,
          summary: "$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$，以及獨立事件。",
          extras: [
            {
              kind: "myth",
              title: "檢驗陽性就是生病嗎",
              body: "假設某疾病盛行率為 $1\\%$，某檢驗對有病者 $99\\%$ 呈陽性，對沒病者有 $5\\%$ 偽陽性。隨機一人驗出陽性，真的有病的機率是多少？以 $10000$ 人估算：有病 $100$ 人，其中 $99$ 人陽性；沒病 $9900$ 人，偽陽性 $495$ 人。所以機率是 $\\frac{99}{99+495}=\\frac{1}{6}\\approx 16.7\\%$，遠低於直覺。",
            },
          ],
        },
      ],
    },
    {
      id: "math.senior.y12",
      title: "高三 數甲／數乙",
      children: [
        {
          id: "math.senior.random-var",
          title: "隨機變數與二項分布",
          grade: 12,
          summary: "離散隨機變數的期望值、變異數與二項分布。",
          extras: [
            {
              kind: "myth",
              title: "剛好一半正面很常見嗎",
              body: "擲一枚公平硬幣 $10$ 次，剛好 $5$ 次正面的機率是多少？很多人覺得「大概一定會」，其實是 $\\frac{C^{10}_5}{2^{10}}=\\frac{252}{1024}\\approx 24.6\\%$，還不到四分之一。二項分布告訴我們：期望值是 $5$ 次，但實際結果會在附近波動，剛好等於期望值並不常見。",
            },
          ],
        },
        {
          id: "math.senior.complex",
          title: "複數與極式（數甲）",
          grade: 12,
          summary: "複數平面、極式與棣美弗定理。",
          extras: [
            {
              kind: "history",
              title: "不可能的數",
              body: "$\\sqrt{-1}$ 一開始被認為是「不可能的數」。16 世紀解三次方程式時，卡爾達諾的公式在中間步驟會冒出負數的平方根，邦貝利大膽地把它們當成數來運算，最後得到正確的實數解。18 世紀歐拉開始以 $i$ 表示 $\\sqrt{-1}$，並得到 $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$，代入 $\\theta=\\pi$ 就是 $e^{i\\pi}+1=0$。",
            },
          ],
        },
        {
          id: "math.senior.limit",
          title: "極限與函數",
          grade: 12,
          summary: "數列與函數的極限、連續性。",
          lessonIds: ["math.senior.calculus-intro"],
          extras: [
            {
              kind: "myth",
              title: "0.999… 等於 1 嗎",
              body: "$0.999\\ldots$ 會等於 $1$ 嗎？會。把它看成無窮等比級數：$0.9+0.09+0.009+\\cdots=\\frac{0.9}{1-0.1}=1$。也可以這樣想：$\\frac{1}{3}=0.333\\ldots$，乘以 $3$ 就得 $0.999\\ldots=1$。「永遠差一點點」的感覺，來自把無窮多項當成逐項逼近，而極限正是處理這件事的工具。",
            },
          ],
        },
        {
          id: "math.senior.calculus",
          title: "微分與積分",
          grade: 12,
          summary: "導數是切線斜率；用導數判斷遞增遞減與極值；積分求面積。",
          lessonIds: ["math.senior.calculus-intro"],
          extras: [
            {
              kind: "history",
              title: "牛頓與萊布尼茲",
              body: "17 世紀後期，牛頓與萊布尼茲各自發展出微積分，後來還爆發誰先發明的爭議。今天課本裡的 $\\frac{dy}{dx}$ 與積分符號 $\\int$ 來自萊布尼茲，牛頓則把微積分用在解釋行星運動與力學。兩人的出發點不同，卻發現了同一件事：微分與積分互為逆運算。",
            },
            {
              kind: "cross",
              title: "位置、速度、加速度",
              body: "物理中，位置 $x(t)$ 對時間的導數是速度，速度的導數是加速度。例如 $x(t)=5t^2$（公尺），則 $v=10t$（公尺／秒）、$a=10$（公尺／秒²）。反過來，從速度求位置就要用積分。學了微積分，才能用一條公式處理「一直在變」的運動。",
            },
          ],
        },
        {
          id: "math.senior.lp",
          title: "線性規劃（數乙）",
          grade: 12,
          summary: "在可行解區域的頂點找最大值或最小值。",
          extras: [
            {
              kind: "history",
              title: "單形法的誕生",
              body: "線性規劃的發展與二戰後的後勤調度有關。1947 年左右，丹齊格（George Dantzig）提出「單形法」（simplex method），能在多個限制條件下，系統化地找出最佳配置。今天航空公司排班、工廠生產規劃、飲食搭配等，都會用到線性規劃的想法。",
            },
          ],
        },
      ],
    },
  ],
};

export default mindmap;
