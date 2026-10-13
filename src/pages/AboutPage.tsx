import { PageTitle } from "../ui";

const SOURCES = [
  ["國家教育研究院｜十二年國教課程綱要彙整", "https://www.naer.edu.tw/PageSyllabus?fid=52"],
  ["教育部 課程與教學資源整合平臺（CIRN）", "https://cirn.moe.edu.tw/"],
  ["國民及學前教育署｜課綱下載", "https://www.k12ea.gov.tw/"],
  ["大學入學考試中心", "https://www.ceec.edu.tw/"],
  ["國中教育會考", "https://cap.rcpet.edu.tw/"],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageTitle sub="學習星球如何對應十二年國教 108 課綱">📚 課綱與內容說明</PageTitle>
      <section className="card space-y-3 p-5 text-[15px] leading-relaxed">
        <h2 className="text-lg font-bold">課綱依據</h2>
        <p>
          本站內容依據教育部發布之《十二年國民基本教育課程綱要》（108
          課綱）各領域「學習內容」編寫，涵蓋 第四學習階段（國中 7–9 年級）與第五學習階段（普通型高中
          10–12 年級）的部定必修與部分加深加廣選修。 截至 2026 年 10 月，108
          課綱仍為現行課綱；教育部已表示不另訂新課綱，而是在 108 課綱基礎上微調（例如資訊素養、AI
          與海洋教育）。
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            心智圖中的代碼（如 <code>N-8-1</code>、<code>Ea-Ⅳ-1</code>
            ）為課綱學習內容條目編號，僅在確定時標示。
          </li>
          <li>各出版社教科書的單元順序可能不同，請以學校實際進度為準。</li>
          <li>地圖、構造圖均為教學用示意圖，非精確比例。</li>
          <li>若發現內容錯誤，歡迎回報，我們會盡快修正。</li>
        </ul>
      </section>
      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-bold">設計理念</h2>
        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="font-semibold">🎯 提升學習成效</p>
            <p className="text-slate-600 dark:text-slate-300">
              提取練習、即時回饋與詳解、錯題本間隔重複、步驟拆解。
            </p>
          </div>
          <div>
            <p className="font-semibold">🔥 提高學習動機</p>
            <p className="text-slate-600 dark:text-slate-300">
              經驗值與等級、連續天數、徽章、闖關遊戲與每日挑戰。
            </p>
          </div>
          <div>
            <p className="font-semibold">🪜 降低學習門檻</p>
            <p className="text-slate-600 dark:text-slate-300">
              免註冊、5–10 分鐘微課程、視覺化互動、手機友善、字級調整。
            </p>
          </div>
        </div>
      </section>
      <section className="card space-y-2 p-5">
        <h2 className="text-lg font-bold">官方參考資源</h2>
        <ul className="space-y-1 text-sm">
          {SOURCES.map(([name, url]) => (
            <li key={url}>
              🔗{" "}
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand-700 underline-offset-2 hover:underline dark:text-brand-300"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
