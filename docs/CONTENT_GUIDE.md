# 學習星球 內容撰寫指南

這份指南說明如何為一個科目撰寫課程內容。**數學（`src/content/math/`）是完整範本**，撰寫前請先讀過它的每個檔案。

## 1. 檔案結構（每科一個資料夾，只能修改自己的資料夾）

```
src/content/<subject>/
  meta.ts                 # 已建立，不要修改
  scenarios.ts            # 對話情境（純資料；只能 `import type`，相對路徑要寫 .js）
  junior/                 # 國中（7–9 年級）
    index.ts              # export default { mindmap, lessons, questions } as TrackData
    mindmap.ts            # 課綱心智圖
    lessons.ts            # 互動課程
    questions.ts          # 題庫
  senior/                 # 高中（10–12 年級），結構同上
  labs/*.tsx              # 客製互動實驗（React 元件，選用）
  scenes/*.tsx            # SVG 場景（熱區、圖層用）
```

`registry.ts` 會自動找到 `<subject>/<stage>/index.ts`，**不需要也不可以**修改任何共用檔案（`types.ts`、`registry.ts`、`widgets/`、`package.json` 等）。如果需要框架新增功能，請在回報中列出。

## 2. ID 規則

| 物件 | 格式 | 例 |
|---|---|---|
| 心智圖根節點 | `<subject>.<stage>` | `physics.junior` |
| 心智圖節點 | `<subject>.<stage>.<slug>` | `physics.junior.force` |
| 課程 | `<subject>.<stage>.<slug>` | `physics.junior.buoyancy` |
| 題目 | `<subject>.<stage>.q-<slug>` | `physics.junior.q-f1` |
| 情境 | `<subject>.<stage>.s-<slug>` | `physics.senior.s-lab-safety` |
| 活動 | 課程內唯一，如 `a1`、`a2` | |

slug 用小寫英文、數字與連字號。

## 3. 數量要求（`pnpm check:subject <id>` 會自動檢查）

每個學段（junior、senior 各自）：
- **心智圖**：至少 20 個節點、至少 3 層；涵蓋該學段 108 課綱的主要學習內容。
- **課程**：至少 4 堂（建議 5–6 堂），每堂 2–6 個活動，至少一個不是 `read`／`quiz` 的互動活動；每堂課都要掛在心智圖某個節點的 `lessonIds` 上。
- **題庫**：至少 24 題、至少 3 種題型，每題都要有詳解 `explain`。
- 每個學段至少使用 5 種不同的活動 kind。

每個科目（兩學段合計）：
- 至少 1 個對話情境，腳本至少 6 個節點、從 start 一定走得到 `end: true` 的結尾。
- 使用者要求的 10 種教學形式至少用到 8 種；**數學、物理、化學、生物、地科、地理必須 10 種全用**：
  心智圖（mindmap）、小遊戲（quiz 或 memory）、拉桿（slider 或 lab）、拖拽（drag）、熱區微動畫（hotspot）、圖層疊加（layers）、步驟拆解（steps）、刮刮樂（scratch）、對話式情境（dialogue）、沙盒塗鴉畫布（canvas）。

## 4. 課綱與用語

- 依據**十二年國教 108 課綱**各領域的「學習內容」。國中為第四學習階段（7–9 年級），高中為普通型高中部定必修，可加入部分加深加廣選修。
- `code`（課綱學習內容代碼，如 `N-8-1`、`Ea-Ⅳ-1`、`歷Ba-Ⅳ-1`）**只在確定時才填**，不確定就省略。格式檢查：`^[歷地公]?[A-Za-z]{1,4}-(Ⅳ|Ⅴ[a-z]?|數字)-數字$`。
- 使用**臺灣繁體中文與臺灣用語**（資訊、網路、影片、軟體、品質、質數、坐標…），不可出現簡體字（測試會擋常見簡體字）。
- 內容需正確：數字、年代、化學式、公式請再三確認；不確定的事實寧可不寫。
- 不要大段抄錄教科書；古典詩文（已屬公共領域）可以引用原文。
- 不可包含任何外部網址或外部圖片。

## 5. 文字格式（`Rich`）

所有說明文字欄位支援：
- `**粗體**`
- 行內公式 `$x^2 + 1$`、區塊公式 `$$...$$`（KaTeX）；化學式 `$\\ce{H2O}$`、`$\\ce{2H2 + O2 -> 2H2O}$`
- 以 `- ` 開頭的條列、空白行分段
- 表格：一段文字中每一行都以 `|` 開頭與結尾；第二行寫 `|---|---|` 時第一行為表頭

在 TypeScript 字串中反斜線要寫兩次：`"$\\frac{1}{2}$"`。公式以外的一般中文不要放進 `$...$`。

## 6. 活動種類（`Activity`，詳見 `src/content/types.ts`）

| kind | 用途 | 重點欄位 |
|---|---|---|
| `mindmap` | 小型概念圖 | `root`（至少 4 個節點，id 只需在該圖內唯一） |
| `slider` | 資料驅動的拉桿實驗 | `params`、`plot`（`fns`、`points`、`vlines`）、`readouts`、`goal`、`insight` |
| `lab` | 客製互動元件 | `load: () => import("../labs/X")`、`insight` |
| `drag` | 拖拽：`categorize` 分類、`order` 排序（依正確順序列出）、`match` 配對 | 分類至少 2 組 4 張；排序至少 3 項；配對至少 3 組 |
| `hotspot` | 熱區微動畫 | `viewBox`、`scene`、`spots`（座標在 viewBox 內，至少 3 個）、`mode: "explore" \| "find"` |
| `layers` | 圖層疊加 | `viewBox`、`base`、`layers`（至少 2 層）、`check`（思考題，選填） |
| `steps` | 步驟拆解 | `problem`、`steps`（可加 `predict` 讓學生先猜）、`takeaway` |
| `scratch` | 刮刮樂記憶卡 | `cards`（至少 2 張；英文可加 `speak` 朗讀） |
| `dialogue` | 對話式情境 | `scenarioId`（指向本科 `scenarios.ts`） |
| `canvas` | 沙盒塗鴉畫布 | `task`、`background`（blank/grid/axes/dots）、`hint`、`reference`、`aiFeedback` |
| `quiz` | 課內練習題 | `questionIds`（同學段題庫內的 id） |
| `set` | 素養題組（一份材料配多題） | `questionIds`（2–4 題，題目的 `context` 必須完全相同；和 `quiz` 一樣不算互動活動） |
| `memory` | 翻牌配對小遊戲 | `pairs`（至少 3 組，所有文字不可重複） |
| `read` | 短文閱讀 | `body`（少用，每堂最多一個） |

**slider 注意**：`goal.test` 在初始參數時必須為 `false`；所有函式在初始參數下不可丟出錯誤；不合法的值回傳 `Number.NaN`。

**loader 注意**：lab／scene 的 loader 要宣告成檔案層級常數再引用（見數學 `lessons.ts` 開頭），具名匯出用 `() => import("../scenes/x").then((m) => ({ default: m.Name }))`。

## 7. SVG 場景（`scenes/*.tsx`）

- 元件型別 `(props: SceneProps) => JSX`，**只回傳 SVG 子元素**（`<g>…</g>`），外層 `<svg viewBox>` 由元件庫提供；hotspot 的 `active` 是目前被點選的熱點 id，可用來強調該部位。
- 第一個元素請畫一個填滿 viewBox 的淺色背景 `<rect>`，確保深色模式下也清楚。
- 只用基本圖形（rect、circle、ellipse、path、polygon、text），風格簡潔、色彩柔和；地圖或構造圖都是「示意圖」，不需精確。
- 文字用 `fontSize` 10–16，顏色用深色（如 `#1e293b`）。

## 8. 客製實驗（`labs/*.tsx`）

- 預設匯出 `function XLab({ onComplete, config }: LabProps)`。
- 可使用 `../../../widgets/kit` 的 `Plot`、`ParamSlider`、`fmt`，以及 `../../../ui` 的 `Feedback`。
- 設計一個明確的**任務目標**，學生達成時呼叫一次 `onComplete()`。
- 只用 React 與 SVG，不可新增套件；所有狀態都放在元件內。
- 參考：`math/labs/PythagorasLab.tsx`、`DiceLab.tsx`、`UnitCircleLab.tsx`、`VectorLab.tsx`。

## 9. 對話情境（`scenarios.ts`）

- `persona` 是給 AI 的角色扮演指示：角色個性、知識範圍、教學目標、「一次只問一個問題」、「學生答錯時給提示而非答案」、不離題。至少 40 字，建議 150–300 字。
- `language`：英文情境用 `"en"`（AI 會用英文對話），其餘 `"zh-TW"`。
- `script` 是沒有 AI 時的選項式對話：每個非結尾節點都要有 `options`；每個選項 `next` 必須存在；用 `good: true/false` 標記較佳選擇，`feedback` 給即時回饋。
- `script[start].say` 也是 AI 模式的開場白。

## 10. 題目（`questions.ts`）

題型：`single`（單選）、`multi`（複選）、`tf`（是非）、`numeric`（數值，可設 `tolerance`、`unit`）、`cloze`（填空，`accept` 列出所有可接受答案）。
- 選項不可重複；答案索引從 0 開始。
- `cloze` 的答案要簡短明確（比對時會忽略大小寫、空白與常見標點）。
- 每題附 `nodeId` 對應心智圖節點（建議）。
- 題組：同一組題目把共用的情境／資料放在 `context`（建議先宣告成檔案層級常數再引用），再用 `set` 活動串起來。題目單獨出現在闖關、每日挑戰或錯題本時，也會顯示這段材料。

## 10.5 課外補充（心智圖節點的 `extras`）

在心智圖節點加上 `extras`，學生點開節點或進入相關課程時可以展開閱讀。每則：`kind`、`title`、`body`（Rich，至少 20 字）。

| kind | 顯示 | 寫什麼 |
|---|---|---|
| `life` | 🏠 生活應用 | 這個概念在日常生活、科技或新聞中的實例 |
| `history` | 📜 科學史與人物 | 概念怎麼被發現、背後的人物與故事 |
| `cross` | 🔗 跨科連結 | 和其他科目的關聯（例如數學的指數與化學的半衰期） |
| `myth` | 🤔 常見迷思 | 學生常有的錯誤想法，以及為什麼錯 |
| `challenge` | 🚀 挑戰一下 | 超出課本一點點的思考題，附提示或解答思路 |

- 補充是「課本之外」的延伸：用自己的話寫，不要抄教科書或參考書，也不要提及任何出版社或特定版本的章節。
- 事實（年代、人名、數據）要再三確認；不確定就不寫。

## 11. 驗證

```bash
pnpm check:subject <id>            # 型別、lint、內容測試、建置、課程巡覽 e2e
E2E_PORT=4180 pnpm check:subject <id>   # 多個工作區同時跑時，請用不同埠號
pnpm format                        # 自動排版（只會動到格式）
```

全部通過才算完成。
