import { expect, test } from "@playwright/test";

/**
 * 逐堂課爬過所有活動，確認每個活動都能正常顯示（沒有錯誤畫面與 JS 例外）。
 * 只跑單一科目：E2E_SUBJECT=math pnpm e2e tests/e2e/lessons.spec.ts
 */
const SUBJECTS = [
  "chinese",
  "english",
  "math",
  "physics",
  "chemistry",
  "biology",
  "earth",
  "geography",
  "history",
  "civics",
];
const only = process.env.E2E_SUBJECT;

for (const subject of SUBJECTS.filter((s) => !only || s === only)) {
  for (const stage of ["junior", "senior"]) {
    test(`${subject} ${stage}：所有課程活動可正常顯示`, async ({ page, isMobile }) => {
      test.skip(isMobile, "課程巡覽只在桌機跑一次");
      test.setTimeout(240_000);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(`${page.url()} ${e.message}`));
      await page.goto(`/learn/${stage}/${subject}`);
      const lessonLinks = page.locator('[data-testid^="lesson-"]');
      if ((await page.getByText("這個科目內容還在建置中").count()) > 0) {
        test.skip(true, "尚無內容");
      }
      await expect(lessonLinks.first()).toBeVisible();
      const ids = (
        await lessonLinks.evaluateAll((els) => els.map((e) => e.getAttribute("data-testid")))
      ).map((t) => String(t).replace(/^lesson-/, ""));
      expect(ids.length).toBeGreaterThanOrEqual(4);
      for (const id of ids) {
        await page.goto(`/lesson/${id}`);
        const tabs = page.getByRole("list", { name: "活動列表" }).getByRole("button");
        await expect(tabs.first()).toBeVisible();
        const n = await tabs.count();
        for (let i = 0; i < n; i++) {
          await tabs.nth(i).click();
          const section = page.locator('section[data-testid^="activity-"]');
          await expect(section).toBeVisible();
          // 等待延遲載入的元件出現（不再顯示載入中）
          await expect(section.getByRole("status").filter({ hasText: "載入中" })).toHaveCount(0, {
            timeout: 15_000,
          });
          await expect(
            section.getByText("這個互動暫時無法顯示"),
            `${id} 第 ${i + 1} 個活動出錯`,
          ).toHaveCount(0);
          await expect(
            section.getByText(/找不到題目|找不到這個對話情境/),
            `${id} 第 ${i + 1} 個活動資料錯誤`,
          ).toHaveCount(0);
        }
      }
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
}
