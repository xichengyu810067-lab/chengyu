// 開發用：截取科目頁的心智圖分頁
import { chromium } from "@playwright/test";

const [, , url, out] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /課綱心智圖/ }).click();
await page.getByRole("button", { name: "全部展開" }).click();
await page.getByRole("button", { name: /畢氏定理/ }).click();
await page.waitForTimeout(600);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
