import type { CurriculumNode } from "../../types";

/** 國中數學（108 課綱第四學習階段）學習內容 */
const mindmap: CurriculumNode = {
  id: "math.junior",
  title: "國中數學",
  summary: "依 108 課綱分為數與量、代數、函數、空間與形狀、坐標幾何、資料與不確定性六大主題。",
  children: [
    {
      id: "math.junior.n",
      title: "數與量（N）",
      summary: "從整數、負數到根號與數列，建立完整的數系概念。",
      children: [
        {
          id: "math.junior.n-prime",
          title: "質數與質因數分解",
          grade: 7,
          code: "N-7-2",
          summary: "100 以內的質數，以及把正整數寫成質因數連乘的標準分解式。",
          keyPoints: [
            "質數只有 1 和自己兩個因數",
            "標準分解式例：$360 = 2^3 \\times 3^2 \\times 5$",
            "可用來求最大公因數與最小公倍數",
          ],
          extras: [
            {
              kind: "life",
              title: "網路加密靠大質數",
              body: "許多網路加密方法（例如 RSA）的核心想法是：把兩個很大的質數相乘很容易，但要把乘積拆回質因數卻非常費時。當質數大到幾百位數，連電腦都算不完。你學的質因數分解，其實就藏在網路安全的背後。",
            },
            {
              kind: "myth",
              title: "1 是質數嗎？",
              body: "質數要恰好有兩個不同的正因數，而 $1$ 只有一個正因數（它自己），所以 $1$ 不是質數。這不是人為挑剔：若 $1$ 算質數，$6 = 2 \\times 3 = 1 \\times 2 \\times 3 = 1 \\times 1 \\times 2 \\times 3$，質因數分解就不再只有一種寫法了。",
            },
          ],
        },
        {
          id: "math.junior.n-negative",
          title: "負數與數線",
          grade: 7,
          code: "N-7-3",
          summary: "負數的意義、數線表示法、絕對值與四則運算。",
          keyPoints: [
            "數線上越右邊的數越大",
            "絕對值 = 到原點的距離",
            "減去一個數 = 加上它的相反數",
          ],
          lessonIds: ["math.junior.negative-numbers"],
          extras: [
            {
              kind: "history",
              title: "古代算籌的正與負",
              body: "古代中國用算籌計算，《九章算術》裡已有「正負術」，處理正數與負數的加減。據劉徽的註解，算籌以紅色代表正數、黑色代表負數。今天「赤字」一詞指的是虧損，習慣和古代算籌的顏色剛好相反，是不是很有趣？",
            },
            {
              kind: "challenge",
              title: "兩段距離的和",
              body: "數線上的點 $x$ 到 $2$ 的距離是 $|x-2|$，到 $-3$ 的距離是 $|x+3|$。請問 $|x-2|+|x+3|$ 最小是多少？提示：想像你在 $-3$ 與 $2$ 之間走動，到兩端的距離和會怎麼變？**思路**：只要 $x$ 落在 $-3$ 到 $2$ 之間，距離和就等於兩點相距 $5$，所以最小值是 $5$。",
            },
          ],
        },
        {
          id: "math.junior.n-exponent",
          title: "指數律與科學記號",
          grade: 7,
          summary: "以指數表示連乘，用科學記號表示很大或很小的數。",
          keyPoints: ["$a^m \\times a^n = a^{m+n}$", "科學記號：$a \\times 10^n$，$1 \\le a < 10$"],
          extras: [
            {
              kind: "challenge",
              title: "紙要對折幾次才到月亮",
              body: "一張紙厚約 $0.1$ 公釐，每對折一次厚度變 $2$ 倍。地球到月球平均約 $3.84 \\times 10^5$ 公里，要折幾次才夠？**思路**：折 $41$ 次約 $2.2 \\times 10^5$ 公里，折 $42$ 次約 $4.4 \\times 10^5$ 公里，所以需要 $42$ 次（當然，真實的紙折不了這麼多次）。",
            },
            {
              kind: "myth",
              title: "2 的 0 次方是 0 嗎？",
              body: "$2^0$ 等於幾？有人會答 $0$，但答案是 $1$。理由：$2^3 \\div 2^3 = 1$，另一方面依指數律 $2^3 \\div 2^3 = 2^{3-3} = 2^0$，所以 $2^0 = 1$。同理，只要 $a \\neq 0$，就有 $a^0 = 1$。",
            },
          ],
        },
        {
          id: "math.junior.n-ratio",
          title: "比與比例式",
          grade: 7,
          code: "N-7-9",
          summary: "比的意義、比例式的性質（內項積 = 外項積）與正比、反比。",
          keyPoints: ["$a : b = c : d \\Rightarrow ad = bc$", "正比：$y = kx$；反比：$xy = k$"],
          extras: [
            {
              kind: "life",
              title: "地圖比例尺怎麼用",
              body: "地圖的比例尺 $1 : 50000$ 表示圖上 $1$ 公分代表實際 $50000$ 公分。圖上量得 $2$ 公分，實際就是 $2 \\times 50000 = 100000$ 公分，也就是 $1$ 公里。看登山地圖時，先算出一公分代表多遠，路程就不會估錯。",
            },
          ],
        },
        {
          id: "math.junior.n-root",
          title: "平方根與近似值",
          grade: 8,
          code: "N-8-1",
          summary: "二次方根的意義、根式的化簡與四則運算、估算近似值。",
          keyPoints: [
            "$\\sqrt{a}$ 是平方後等於 $a$ 的非負數",
            "$\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$（$a, b \\ge 0$）",
            "$\\sqrt{2} \\approx 1.414$",
          ],
          extras: [
            {
              kind: "life",
              title: "A4 紙為什麼是這個形狀",
              body: "常見的 A4 紙約 $210 \\times 297$ 公釐。把長邊對折，得到的 A5 和原來的形狀一模一樣。設長寬比 $a : b$，對折後是 $b : \\frac{a}{2}$，兩者相等得 $a^2 = 2b^2$，所以 $a : b = \\sqrt{2} : 1$。驗算：$210 \\times \\sqrt{2} \\approx 297$。",
            },
            {
              kind: "myth",
              title: "根號可以拆開相加嗎？",
              body: "$\\sqrt{9+16}$ 等於 $\\sqrt{9}+\\sqrt{16}$ 嗎？前者是 $\\sqrt{25}=5$，後者是 $3+4=7$，並不相等。根號只對乘除好用：$\\sqrt{ab}=\\sqrt{a}\\sqrt{b}$，對加減沒有類似的拆法。所以 $\\sqrt{a^2+b^2}$ 不能化成 $a+b$。",
            },
          ],
        },
        {
          id: "math.junior.n-sequence",
          title: "等差數列與等差級數",
          grade: 8,
          code: "N-8-4",
          summary: "等差數列的一般項與等差級數求和。",
          keyPoints: ["$a_n = a_1 + (n-1)d$", "$S_n = \\dfrac{n(a_1 + a_n)}{2}$"],
          extras: [
            {
              kind: "history",
              title: "高斯的快速加法",
              body: "相傳高斯小學時，老師要全班算 $1+2+\\cdots+100$，他很快就寫出 $5050$：把頭尾配對，$1+100$、$2+99$……每對都是 $101$，共 $50$ 對，所以是 $50 \\times 101 = 5050$。這正是等差級數公式 $\\frac{n(a_1+a_n)}{2}$ 的來源。",
            },
            {
              kind: "challenge",
              title: "奇數的和",
              body: "請不用逐項相加，算出 $1+3+5+\\cdots+99$。提示：這是首項 $1$、公差 $2$ 的等差數列，先算有幾項。**思路**：由 $99 = 1+(n-1)\\times 2$ 得 $n=50$，和為 $\\frac{50\\times(1+99)}{2}=2500$，剛好等於 $50^2$。",
            },
          ],
        },
      ],
    },
    {
      id: "math.junior.a",
      title: "代數（A）",
      summary: "用符號表示數量關係，解方程式與不等式。",
      children: [
        {
          id: "math.junior.a-linear",
          title: "一元一次方程式",
          grade: 7,
          code: "A-7-3",
          summary: "利用等量公理與移項法則解一元一次方程式，並解決應用問題。",
          keyPoints: ["等號兩邊同加、減、乘、除（不為 0）同一數，等式仍成立", "移項要變號"],
          lessonIds: ["math.junior.linear-equation"],
          extras: [
            {
              kind: "history",
              title: "等號從哪裡來",
              body: "等號 $=$ 是 1557 年英國的雷科德（Robert Recorde）在書中提出的，他的理由是：沒有兩樣東西比兩條平行線更相等。在這之前，數學家多半用文字寫「等於」。有了好用的符號，列方程式才變得又快又清楚。",
            },
          ],
        },
        {
          id: "math.junior.a-system",
          title: "二元一次聯立方程式",
          grade: 7,
          code: "A-7-5",
          summary: "代入消去法與加減消去法。",
          keyPoints: ["兩條直線的交點就是聯立方程式的解"],
          extras: [
            {
              kind: "history",
              title: "雞兔同籠",
              body: "《孫子算經》有一題：雉（雞）兔同籠，上有三十五頭，下有九十四足，問雞兔各幾隻？設雞 $x$ 隻、兔 $y$ 隻：$x+y=35$、$2x+4y=94$，解得雞 $23$ 隻、兔 $12$ 隻。古人也有不用代數的巧算：先假設全是雞，會有 $70$ 隻腳，少的 $24$ 隻腳要靠兔子補，每隻兔多 $2$ 隻腳。",
            },
          ],
        },
        {
          id: "math.junior.a-inequality",
          title: "一元一次不等式",
          grade: 7,
          code: "A-7-8",
          summary: "不等式的解與數線表示，乘除負數要變號。",
          keyPoints: ["不等號兩邊同乘以負數，不等號方向改變"],
          extras: [
            {
              kind: "myth",
              title: "為什麼乘負數要變號",
              body: "不等式兩邊乘（或除）負數，不等號要反向。為什麼？因為 $3>2$ 是對的，兩邊乘 $-1$ 後，$-3$ 在數線上跑到 $-2$ 的左邊，所以是 $-3<-2$。解 $-2x>6$ 時，兩邊除以 $-2$ 得 $x<-3$。可以代 $x=-4$ 檢查：$-2\\times(-4)=8>6$。",
            },
          ],
        },
        {
          id: "math.junior.a-formula",
          title: "乘法公式",
          grade: 8,
          code: "A-8-1",
          summary: "和的平方、差的平方、平方差公式。",
          keyPoints: [
            "$(a+b)^2 = a^2 + 2ab + b^2$",
            "$(a-b)^2 = a^2 - 2ab + b^2$",
            "$(a+b)(a-b) = a^2 - b^2$",
          ],
          lessonIds: ["math.junior.factorization"],
          extras: [
            {
              kind: "life",
              title: "用乘法公式心算",
              body: "乘法公式可以幫你心算。例如 $97 \\times 103 = (100-3)(100+3) = 100^2 - 3^2 = 9991$。再試試 $51^2 = (50+1)^2 = 2500+100+1 = 2601$。數字接近整十或整百時，就是用公式的好時機。",
            },
          ],
        },
        {
          id: "math.junior.a-factor",
          title: "因式分解",
          grade: 8,
          summary: "提出公因式、利用乘法公式、十字交乘法。",
          keyPoints: ["$x^2 + 5x + 6 = (x+2)(x+3)$"],
          lessonIds: ["math.junior.factorization"],
        },
        {
          id: "math.junior.a-quadratic-eq",
          title: "一元二次方程式",
          grade: 8,
          summary: "因式分解法、配方法、公式解與判別式。",
          keyPoints: [
            "$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
            "判別式 $D = b^2 - 4ac$ 決定根的個數",
          ],
          extras: [
            {
              kind: "cross",
              title: "拋球的兩個時間點",
              body: "把球以 $20$ 公尺／秒往上拋，取 $g \\approx 10$ 公尺／秒²，高度約為 $h = 20t - 5t^2$（公尺）。何時高度是 $15$ 公尺？列出 $5t^2 - 20t + 15 = 0$，即 $t^2 - 4t + 3 = 0$，得 $t=1$ 或 $t=3$ 秒：一次在上升途中，一次在下降途中。兩個根都有物理意義。",
            },
          ],
        },
      ],
    },
    {
      id: "math.junior.f",
      title: "函數（F）",
      summary: "用函數描述兩個變量之間的對應關係。",
      children: [
        {
          id: "math.junior.f-linear",
          title: "一次函數與圖形",
          grade: 8,
          code: "F-8-1",
          summary: "$y = ax + b$ 的圖形是一條直線，$a$ 是斜率，$b$ 是 $y$ 截距。",
          keyPoints: ["$a > 0$ 時圖形往右上升", "常數函數 $y = c$ 是水平線"],
          extras: [
            {
              kind: "cross",
              title: "攝氏與華氏的一次函數",
              body: "攝氏與華氏的換算是一次函數：$F = \\frac{9}{5}C + 32$。水結冰時 $0$ °C 對應 $32$ °F，水沸騰時 $100$ °C 對應 $212$ °F。有沒有一個溫度，兩種溫標的數字相同？令 $C=\\frac{9}{5}C+32$，解得 $C=-40$，也就是 $-40$ °C 等於 $-40$ °F。",
            },
          ],
        },
        {
          id: "math.junior.f-quadratic",
          title: "二次函數與圖形",
          grade: 9,
          code: "F-9-1",
          summary: "$y = a(x-h)^2 + k$ 的圖形是拋物線，頂點 $(h, k)$。",
          keyPoints: ["$a > 0$ 開口向上、有最小值", "$|a|$ 越大開口越窄", "對稱軸 $x = h$"],
          lessonIds: ["math.junior.quadratic-function"],
          extras: [
            {
              kind: "life",
              title: "拋物面反射器",
              body: "手電筒、汽車大燈與衛星天線的反射面常做成拋物面（拋物線繞軸旋轉）。拋物線有個特性：從焦點射出的光，反射後全部平行射出；反過來，平行來的訊號會匯聚到焦點。這就是衛星天線能把微弱訊號集中到接收器的原理。",
            },
            {
              kind: "myth",
              title: "a 越大，開口越大？",
              body: "有人以為「$a$ 越大，開口越大」，其實相反：$y=ax^2$ 中 $|a|$ 越大，同樣的 $x$ 會算出越大的 $y$，圖形升得越快，開口反而越窄。比較 $y=x^2$ 與 $y=3x^2$：$x=1$ 時 $y$ 分別是 $1$ 和 $3$，後者的拋物線比較「瘦」。",
            },
          ],
        },
      ],
    },
    {
      id: "math.junior.s",
      title: "空間與形狀（S）",
      summary: "認識平面與立體圖形的性質，學習推理與證明。",
      children: [
        {
          id: "math.junior.s-congruent",
          title: "三角形全等",
          grade: 8,
          summary: "SSS、SAS、ASA、AAS、RHS 全等性質。",
          keyPoints: ["SSA 不一定全等"],
        },
        {
          id: "math.junior.s-pythagoras",
          title: "畢氏定理",
          grade: 8,
          code: "S-8-6",
          summary: "直角三角形兩股的平方和等於斜邊的平方。",
          keyPoints: ["$a^2 + b^2 = c^2$", "常見勾股數：3-4-5、5-12-13、8-15-17"],
          lessonIds: ["math.junior.pythagoras"],
          extras: [
            {
              kind: "history",
              title: "勾三股四弦五",
              body: "中國古籍《周髀算經》記載了商高與周公的對話，談到「勾三股四弦五」的直角三角形，用於測量與天文計算。西方稱此關係為畢氏定理，但很多古文明都早就觀察到它，並非某一個人獨創。這個定理的證明方法已有數百種，其中不少是面積拼圖。",
            },
            {
              kind: "life",
              title: "螢幕尺寸是對角線",
              body: "螢幕尺寸（例如 27 吋）指的是對角線長。若長寬比是 $16 : 9$，設寬 $16k$、高 $9k$，對角線為 $\\sqrt{(16k)^2+(9k)^2}=\\sqrt{337}\\,k \\approx 18.36k$。對角線 $27$ 吋時 $k\\approx 1.47$，寬約 $23.5$ 吋、高約 $13.2$ 吋。",
            },
          ],
        },
        {
          id: "math.junior.s-similar",
          title: "相似形",
          grade: 9,
          code: "S-9-1",
          summary: "相似多邊形對應角相等、對應邊成比例；AA、SAS、SSS 相似。",
          keyPoints: ["相似比 $k$ 時，面積比為 $k^2$"],
          extras: [
            {
              kind: "myth",
              title: "披薩直徑加倍，份量是幾倍",
              body: "直徑 $30$ 公分的披薩，比直徑 $15$ 公分的「大一倍」嗎？直徑是 $2$ 倍，但面積比是 $2^2 = 4$ 倍，所以大披薩的份量約是小披薩的 $4$ 倍。相似比為 $k$ 時，面積比是 $k^2$；立體圖形的體積比則是 $k^3$。別被「長度加倍」騙了。",
            },
          ],
        },
        {
          id: "math.junior.s-circle",
          title: "圓的性質",
          grade: 9,
          summary: "圓心角、圓周角、弦、切線的性質。",
          keyPoints: ["圓周角是同弧所對圓心角的一半", "切線垂直於過切點的半徑"],
          extras: [
            {
              kind: "history",
              title: "祖沖之的圓周率",
              body: "祖沖之（南北朝時代）算出圓周率介於 $3.1415926$ 與 $3.1415927$ 之間，並提出約率 $\\frac{22}{7}$ 與密率 $\\frac{355}{113}$。$\\frac{355}{113}\\approx 3.14159292$，只用三位整數就準確到小數點後第六位，在當時的世界領先很長一段時間。",
            },
          ],
        },
        {
          id: "math.junior.s-centers",
          title: "三角形的三心",
          grade: 9,
          summary: "外心（中垂線交點）、內心（角平分線交點）、重心（中線交點）。",
          keyPoints: ["重心把中線分成 2 : 1", "直角三角形的外心在斜邊中點"],
          extras: [
            {
              kind: "life",
              title: "用一根手指頂住重心",
              body: "均勻的三角形紙板，可以用一根手指頂在「重心」讓它保持平衡。重心是三條中線的交點，並把每條中線分成 $2 : 1$（靠頂點那段較長）。想試試？在紙板上畫出中線，交點就是平衡點。物理上，重心是物體重量的「平均位置」。",
            },
          ],
        },
      ],
    },
    {
      id: "math.junior.g",
      title: "坐標幾何（G）",
      children: [
        {
          id: "math.junior.g-plane",
          title: "直角坐標平面",
          grade: 7,
          code: "G-7-1",
          summary: "點的坐標表示與四個象限。",
          keyPoints: ["第二象限：$x < 0, y > 0$"],
          extras: [
            {
              kind: "history",
              title: "笛卡兒與蒼蠅",
              body: "相傳笛卡兒躺在床上看天花板上的蒼蠅，想到只要用「離兩面牆的距離」就能描述蒼蠅的位置，於是有了坐標系。這個故事的真假無法確定，但笛卡兒在 1637 年的著作中確實把代數與幾何結合起來，所以直角坐標平面也稱為「笛卡兒坐標」。",
            },
          ],
        },
        {
          id: "math.junior.g-distance",
          title: "兩點距離公式",
          grade: 8,
          code: "G-8-1",
          summary: "由畢氏定理推得兩點距離 $\\sqrt{(x_1-x_2)^2 + (y_1-y_2)^2}$。",
          extras: [
            {
              kind: "challenge",
              title: "計程車距離",
              body: "在方格狀街區中，計程車只能沿橫向或縱向街道行駛。從 $(0,0)$ 到 $(3,4)$，直線距離是 $\\sqrt{3^2+4^2}=5$，但車子至少要走 $3+4=7$ 個街區。想想看：有幾條不同的 $7$ 步最短路線？**提示**：7 步中選出 3 步向東，高中會學到組合數 $C^7_3 = 35$。",
            },
          ],
        },
      ],
    },
    {
      id: "math.junior.d",
      title: "資料與不確定性（D）",
      children: [
        {
          id: "math.junior.d-stats",
          title: "統計圖表與統計量",
          grade: 7,
          code: "D-7-2",
          summary: "平均數、中位數、眾數的意義與使用時機。",
          keyPoints: ["極端值對平均數影響大，對中位數影響小"],
          extras: [
            {
              kind: "myth",
              title: "平均薪資代表一般人嗎",
              body: "某小公司 $5$ 位員工月薪（千元）為 $30, 32, 33, 35, 170$（假設的例子）。平均是 $60$，但五人中有四人低於平均，中位數 $33$ 才比較像「一般員工」。極端值會拉動平均數，卻幾乎不影響中位數。看到「平均薪資」時，記得問：中位數是多少？",
            },
          ],
        },
        {
          id: "math.junior.d-box",
          title: "四分位數與盒狀圖",
          grade: 9,
          code: "D-9-1",
          summary: "以 $Q_1$、$Q_2$、$Q_3$ 描述資料分布，四分位距 $IQR = Q_3 - Q_1$。",
        },
        {
          id: "math.junior.d-prob",
          title: "機率",
          grade: 9,
          summary:
            "古典機率：每個結果出現機會相等時，$P(A) = \\dfrac{A\\text{ 的結果數}}{\\text{全部結果數}}$。",
          keyPoints: ["機率介於 0 到 1 之間", "實驗次數越多，相對次數越接近機率"],
          lessonIds: ["math.junior.probability"],
          extras: [
            {
              kind: "myth",
              title: "連續正面後會換反面嗎",
              body: "連續擲出 $5$ 次正面後，下一次比較容易出現反面嗎？不會。硬幣沒有記憶，每次出現正面的機率仍是 $\\frac{1}{2}$。「前面正面太多，後面該補反面」是常見的賭徒謬誤。長期而言比例會接近 $\\frac{1}{2}$，是因為次數變多、早期的偏差被稀釋，而不是被「補回來」。",
            },
          ],
        },
      ],
    },
  ],
};

export default mindmap;
