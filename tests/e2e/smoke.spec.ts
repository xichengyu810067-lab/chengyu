import { expect, test } from "@playwright/test";

test("首頁可以開啟並顯示 10 個科目", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/學習星球/);
  await expect(page.getByRole("heading", { name: "選擇科目" })).toBeVisible();
  for (const name of [
    "國文",
    "英文",
    "數學",
    "物理",
    "化學",
    "生物",
    "地球科學",
    "地理",
    "歷史",
    "公民",
  ]) {
    await expect(
      page.locator("#subjects").getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  }
});

test("深層連結與 404 頁面", async ({ page }) => {
  await page.goto("/this/does/not/exist");
  await expect(page.getByRole("heading", { name: /找不到這個頁面/ })).toBeVisible();
});

test("切換學段會被記住", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subjects").getByRole("button", { name: "高中" }).click();
  await expect(page.getByText("目前學段：高中")).toBeVisible();
  await page.reload();
  await expect(page.getByText("目前學段：高中")).toBeVisible();
});
