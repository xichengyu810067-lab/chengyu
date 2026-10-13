// 開發用：node scripts/screenshot.mjs <url> <out.png> [mobile]
import { chromium, devices } from "@playwright/test";

const [, , url, out, mobile] = process.argv;
const browser = await chromium.launch();
const ctx = await browser.newContext(
  mobile ? { ...devices["Pixel 7"] } : { viewport: { width: 1280, height: 900 } },
);
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: true });
console.log(JSON.stringify({ errors }));
await browser.close();
