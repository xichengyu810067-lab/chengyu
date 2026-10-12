import { expect, test } from "@playwright/test";

/** 以 page.route 模擬 /api/tutor，驗證前端串流顯示、退路與錯誤處理 */

const ndjson = (events: unknown[]) => events.map((e) => JSON.stringify(e)).join("\n") + "\n";

test("AI 家教：可用時串流顯示回覆", async ({ page }) => {
  await page.route("**/api/tutor", async (route) => {
    if (route.request().method() === "GET") {
      return route.fulfill({ json: { available: true, accessCodeRequired: false } });
    }
    const body = route.request().postDataJSON();
    expect(body.mode).toBe("tutor");
    return route.fulfill({
      status: 200,
      contentType: "application/x-ndjson",
      body: ndjson([
        { t: "text", v: "好問題！先想想：" },
        { t: "text", v: "$2$ 有幾個因數？" },
        { t: "done", stop: "end_turn" },
      ]),
    });
  });
  await page.goto("/tutor?subject=math&stage=junior");
  await page.getByTestId("chat-input").fill("什麼是質數？");
  await page.getByRole("button", { name: "送出" }).click();
  await expect(page.getByTestId("chat-list")).toContainText("好問題！先想想：");
  await expect(page.getByTestId("chat-list").locator(".katex").first()).toBeVisible();
});

test("AI 家教：未開啟時顯示說明", async ({ page }) => {
  await page.route("**/api/tutor", (route) =>
    route.fulfill({ json: { available: false, accessCodeRequired: false } }),
  );
  await page.goto("/tutor");
  await expect(page.getByTestId("ai-unavailable")).toBeVisible();
});

test("情境對話：AI 不可用時自動使用腳本模式並可完成", async ({ page }) => {
  await page.goto("/lesson/math.junior.linear-equation");
  await page.getByRole("list", { name: "活動列表" }).getByRole("button").nth(3).click();
  const options = page.getByTestId("script-options");
  await expect(options).toBeVisible();
  for (let i = 0; i < 8; i++) {
    if ((await options.count()) === 0) break;
    await options.getByRole("button").first().click();
  }
  await expect(page.getByText(/對話結束/)).toBeVisible();
  await page.getByRole("button", { name: "完成這段對話" }).click();
  await expect(page.getByRole("button", { name: /✓/ }).nth(0)).toBeVisible();
});

test("情境對話：AI 模式串流，錯誤時顯示提示並保留輸入能力", async ({ page }) => {
  let calls = 0;
  await page.route("**/api/tutor", async (route) => {
    if (route.request().method() === "GET")
      return route.fulfill({ json: { available: true, accessCodeRequired: false } });
    calls++;
    if (calls === 1) {
      const body = route.request().postDataJSON();
      expect(body.scenarioId).toBe("math.junior.s-market");
      return route.fulfill({
        contentType: "application/x-ndjson",
        body: ndjson([{ t: "text", v: "一顆 25 元喔！" }, { t: "done" }]),
      });
    }
    return route.fulfill({
      status: 429,
      json: { error: "rate_limited", message: "問得太快了，休息一下再試。" },
    });
  });
  await page.goto("/lesson/math.junior.linear-equation");
  await page.getByRole("list", { name: "活動列表" }).getByRole("button").nth(3).click();
  await page.getByTestId("chat-input").fill("蘋果一顆多少？");
  await page.getByRole("button", { name: "送出" }).click();
  await expect(page.getByTestId("chat-list")).toContainText("一顆 25 元喔！");
  await page.getByTestId("chat-input").fill("那 5 顆呢？");
  await page.getByRole("button", { name: "送出" }).click();
  await expect(page.getByTestId("chat-list")).toContainText("問得太快了");
  await expect(page.getByTestId("chat-input")).toBeEnabled();
});
