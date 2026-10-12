import { PageTitle } from "../ui";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageTitle>🔒 隱私與 AI 使用說明</PageTitle>
      <section className="card space-y-3 p-5 text-[15px] leading-relaxed">
        <h2 className="text-lg font-bold">學習資料存在哪裡？</h2>
        <p>
          學習星球不需要註冊帳號。你的學習進度、暱稱與設定只儲存在
          <strong>你這台裝置的瀏覽器（localStorage）</strong>，
          不會上傳到我們的伺服器。清除瀏覽器資料會讓進度消失，建議定期到「我的」頁面匯出備份。
        </p>
        <h2 className="text-lg font-bold">AI 家教與情境對話</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            使用 AI 功能時，你輸入的文字（或畫布圖片）會傳送給 Anthropic 的 Claude 模型產生回覆。
          </li>
          <li>本站不儲存對話內容，也不會把對話與你的身分連結。</li>
          <li>請不要輸入姓名、電話、地址、學校等個人資料。</li>
          <li>AI 可能出錯，請把它當成學習夥伴，重要觀念請與課本和老師確認。</li>
          <li>AI 只回答學科學習相關問題。</li>
        </ul>
        <h2 className="text-lg font-bold">需要幫忙嗎？</h2>
        <p>
          如果你心情低落或遇到困難，請找信任的大人聊聊，或撥打：
          <strong>安心專線 1925</strong>、<strong>張老師專線 1980</strong>、
          <strong>生命線 1995</strong>、<strong>保護專線 113</strong>。
        </p>
      </section>
    </div>
  );
}
