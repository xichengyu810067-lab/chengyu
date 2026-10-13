# 學習星球 — 國高中互動式學習平台

依據**十二年國教 108 課綱**設計，涵蓋國中與普通高中的**國文、英文、數學、物理、化學、生物、地球科學、地理、歷史、公民**，用互動方式降低學習門檻、提高動機與成效。

## 特色

- **十種互動學習方式**：心智圖、小遊戲（計時闖關、翻牌配對）、拉桿實驗、拖拽（分類／排序／配對）、熱區微動畫、圖層疊加、步驟拆解（先猜再揭曉）、刮刮樂、對話式情境（Claude AI 角色扮演＋選項腳本）、沙盒塗鴉畫布（可請 AI 看圖回饋）。
- **課綱心智圖**：每科每學段一張，節點標示課綱學習內容並直接連到互動課程。
- **學習動機**：經驗值與等級、連續學習天數、徽章、每日挑戰。
- **學習成效**：即時回饋與詳解、錯題本（間隔重複 1→3→7→14→30 天）。
- **低門檻**：免註冊，進度存在瀏覽器（可匯出／匯入備份）；手機觸控友善、鍵盤可操作、深色模式、字級調整、英文朗讀。
- **AI 家教**：蘇格拉底式引導、情境角色扮演、畫布作品回饋；含來源檢查、限流、危機訊息攔截。

## 技術

Vite + React 19 + TypeScript + react-router + Tailwind CSS 4 + zustand；Vercel Functions（`api/`）以 `@anthropic-ai/sdk` 串流呼叫 Claude。測試：Vitest、Playwright；格式與 lint：Biome。

```
src/content/<科目>/{meta,scenarios}.ts、junior/、senior/、labs/、scenes/   # 課程內容
src/widgets/                                                         # 互動元件
src/pages/                                                           # 頁面
api/tutor.ts、api/_lib/                                              # AI 家教 API
docs/CONTENT_GUIDE.md                                                # 內容撰寫指南
```

## 開發

```bash
pnpm install
pnpm dev                    # http://localhost:5173
pnpm verify                 # typecheck + lint + 單元/內容測試 + build + e2e
pnpm check:subject math     # 檢查單一科目內容
```

## 部署（Vercel）與設定

推送到 `main` 會自動部署。AI 功能需要在 **Vercel → Project → Settings → Environment Variables** 設定：

| 變數 | 必填 | 說明 |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI 功能必填 | 未設定時 AI 自動關閉，情境對話改用選項腳本模式，其餘功能不受影響。設定後需重新部署。 |
| `AI_ACCESS_CODE` | 選填 | 設定後，學生需在「我的」頁輸入老師提供的通行碼才能使用 AI。 |
| `TUTOR_MODEL` | 選填 | 預設 `claude-opus-5-5`。 |
| `AI_DAILY_LIMIT` / `AI_GLOBAL_DAILY_LIMIT` | 選填 | 每個 IP／全站每日次數上限（預設 60／3000，依執行個體盡力計算）。 |
| `ALLOWED_ORIGINS` | 選填 | 額外允許呼叫 API 的網域（逗號分隔）。 |

> 建議同時在 Anthropic Console 設定每月花費上限，作為成本的最終防線。

## 隱私

不需帳號；學習進度只存在使用者瀏覽器。使用 AI 時，輸入內容會送至 Anthropic 產生回覆，本站不儲存對話。詳見網站「隱私與 AI 使用說明」頁。
