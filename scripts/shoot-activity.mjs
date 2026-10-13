// 開發用：node scripts/shoot-activity.mjs <lessonUrl> <activityIndex> <out.png> [mobile]
import { chromium, devices } from "@playwright/test";

const [, , url, idx, out, mobile] = process.argv;
const browser = await chromium.launch();
const ctx = await browser.newContext(
  mobile ? { ...devices["Pixel 7"] } : { viewport: { width: 1280, height: 900 } },
);
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
const tabs = page.getByRole("list", { name: "活動列表" }).getByRole("button");
await tabs.nth(Number(idx)).click();
await page.waitForTimeout(1200);
await page.locator('section[data-testid^="activity-"]').screenshot({ path: out });
console.log(JSON.stringify({ errors }));
await browser.close();
