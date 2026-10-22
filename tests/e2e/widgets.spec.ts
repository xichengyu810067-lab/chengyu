import { expect, type Page, test } from "@playwright/test";

/** 逐一操作 /gallery 中的每種互動形式，確認可以完成 */

async function section(page: Page, id: string) {
  const s = page.getByTestId(`demo-${id}`);
  await s.scrollIntoViewIfNeeded();
  return s;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { name: /互動元件展示/ })).toBeVisible();
});

test("心智圖：展開節點並完成", async ({ page }) => {
  const s = await section(page, "mindmap");
  await s.getByRole("button", { name: /數與量/ }).click();
  await s.getByRole("button", { name: /負數與數線/ }).click();
  await expect(s.getByText("認識負數，並在數線上表示。")).toBeVisible();
  await s.getByText("電梯的地下樓層").click();
  await expect(s.getByText(/B1、B2/)).toBeVisible();
  await s.getByRole("button", { name: /代數/ }).first().click();
  await s.getByRole("button", { name: /我懂了/ }).click();
  await expect(page.getByTestId("done-mindmap")).toBeVisible();
});

test("拉桿：調到目標參數即完成", async ({ page }) => {
  const s = await section(page, "slider");
  const sliders = s.getByRole("slider");
  await sliders.nth(0).fill("-1");
  await sliders.nth(1).fill("2");
  await sliders.nth(2).fill("-1");
  await expect(s.getByText("頂點 (2, -1)").first()).toBeVisible();
  await expect(page.getByTestId("done-slider")).toBeVisible();
});

test("互動實驗：擲硬幣超過 100 次", async ({ page }) => {
  const s = await section(page, "lab");
  await s.getByRole("slider").fill("100");
  await s.getByRole("button", { name: /擲硬幣/ }).click();
  await expect(page.getByTestId("done-lab")).toBeVisible();
});

test("拖拽分類：點選放置模式", async ({ page }) => {
  const s = await section(page, "drag-cat");
  const place = async (item: string, bucket: string) => {
    await s.getByTestId(`drag-item-${item}`).click();
    await s.getByTestId(`drop-${bucket}`).getByRole("button", { name: /放入/ }).click();
  };
  await place("wall", "plant");
  await place("chloro", "plant");
  await place("membrane", "both");
  await place("nucleus", "both");
  await place("mito", "both");
  await s.getByRole("button", { name: "檢查答案" }).click();
  await expect(s.getByText(/全部正確/)).toBeVisible();
  await expect(page.getByTestId("done-drag-cat")).toBeVisible();
});

test("拖拽排序：用滑鼠拖曳與按鈕排序", async ({ page, isMobile }) => {
  const s = await section(page, "drag-order");
  const want = ["水星", "金星", "地球", "火星"];
  await expect(s.locator("ol > li")).toHaveCount(4);
  for (let target = 0; target < want.length; target++) {
    const rows = s.locator("ol > li");
    const labels = await rows.allInnerTexts();
    const from = labels.findIndex((t) => t.includes(want[target]));
    if (from === target) continue;
    if (!isMobile && target === 0) {
      // 真正的指標拖曳
      const src = s.getByTestId(`order-item-${["me", "ve", "ea", "ma"][target]}`);
      const dst = rows.nth(target);
      await dst.scrollIntoViewIfNeeded();
      const a = await src.boundingBox();
      const b = await dst.boundingBox();
      if (!a || !b) throw new Error("no box");
      await page.mouse.move(a.x + 20, a.y + a.height / 2);
      await page.mouse.down();
      await page.mouse.move(a.x + 30, a.y + a.height / 2 + 10, { steps: 3 });
      await page.mouse.move(b.x + 40, b.y + b.height / 2, { steps: 8 });
      await page.mouse.up();
    } else {
      for (let i = from; i > target; i--)
        await rows.nth(i).getByRole("button", { name: "上移" }).click();
    }
  }
  await expect(s.locator("ol > li").first()).toContainText("水星");
  await s.getByRole("button", { name: "檢查順序" }).click();
  await expect(page.getByTestId("done-drag-order")).toBeVisible();
});

test("拖拽配對", async ({ page }) => {
  const s = await section(page, "drag-match");
  for (const id of ["p1", "p2", "p3"]) {
    await s.getByTestId(`drag-item-${id}`).click();
    await s.getByTestId(`drop-L-${id}`).getByRole("button").first().click();
  }
  await s.getByRole("button", { name: "檢查答案" }).click();
  await expect(page.getByTestId("done-drag-match")).toBeVisible();
});

test("熱區：點完所有熱點", async ({ page }) => {
  const s = await section(page, "hotspot");
  for (const id of ["wall", "nucleus", "vacuole", "chloroplast"]) {
    await s.getByTestId(`hotspot-${id}`).click();
  }
  await expect(s.getByRole("heading", { name: "葉綠體" })).toBeVisible();
  await expect(page.getByTestId("done-hotspot")).toBeVisible();
});

test("圖層疊加：開關圖層並回答", async ({ page }) => {
  const s = await section(page, "layers");
  for (const id of ["mountain", "river", "city"]) await s.getByTestId(`layer-${id}`).check();
  await s.getByRole("button", { name: /河川下游的平原/ }).click();
  await s.getByRole("button", { name: /我懂了/ }).click();
  await expect(page.getByTestId("done-layers")).toBeVisible();
});

test("步驟拆解：猜下一步", async ({ page }) => {
  const s = await section(page, "steps");
  await s.getByTestId("step-next").click();
  await s.getByTestId("predict-0").click();
  await s.getByTestId("step-next").click();
  await s.getByTestId("step-next").click();
  await expect(s.getByText(/重點整理/)).toBeVisible();
  await s.getByRole("button", { name: /看懂了/ }).click();
  await expect(page.getByTestId("done-steps")).toBeVisible();
});

test("刮刮樂：刮開與直接揭曉", async ({ page, isMobile }) => {
  const s = await section(page, "scratch");
  const card0 = s.getByTestId("scratch-card-0");
  if (!isMobile) {
    const canvas = card0.locator("canvas");
    await canvas.scrollIntoViewIfNeeded();
    const box = await canvas.boundingBox();
    if (!box) throw new Error("no canvas");
    await page.mouse.move(box.x + 5, box.y + 8);
    await page.mouse.down();
    for (let y = 8; y < box.height; y += 18) {
      await page.mouse.move(box.x + box.width - 5, box.y + y, { steps: 6 });
      await page.mouse.move(box.x + 5, box.y + y + 9, { steps: 6 });
    }
    await page.mouse.up();
  } else {
    await card0.getByRole("button", { name: "直接揭曉" }).click();
  }
  await expect(card0.getByText("環境（n.）")).toBeVisible();
  await expect(card0.locator("canvas")).toHaveCount(0);
  await s.getByTestId("scratch-card-1").getByRole("button", { name: "直接揭曉" }).click();
  await expect(page.getByTestId("done-scratch")).toBeVisible();
});

test("沙盒畫布：畫線後可完成（滑鼠／觸控）", async ({ page, isMobile }) => {
  const s = await section(page, "canvas");
  const canvas = s.getByTestId("doodle-canvas");
  await canvas.scrollIntoViewIfNeeded();
  const box = await canvas.boundingBox();
  if (!box) throw new Error("no canvas");
  if (isMobile) {
    const cdp = await page.context().newCDPSession(page);
    const pt = (x: number, y: number) => [{ x: box.x + x, y: box.y + y }];
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: pt(30, 30) });
    for (let i = 1; i <= 10; i++) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: pt(30 + i * 15, 30 + i * 6),
      });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } else {
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 120, { steps: 10 });
    await page.mouse.up();
  }
  await expect(canvas).toHaveAttribute("aria-label", /已畫 1 筆/);
  await s.getByRole("button", { name: /復原/ }).click();
  await expect(canvas).toHaveAttribute("aria-label", /已畫 0 筆/);
  await s.getByRole("button", { name: /重做/ }).click();
  await s.getByRole("button", { name: /畫好了/ }).click();
  await expect(page.getByTestId("done-canvas")).toBeVisible();
});

test("練習題：五種題型", async ({ page }) => {
  const s = await section(page, "quiz");
  await s.getByTestId("choice-1").click(); // 單選 x=4
  await s.getByTestId("quiz-next").click();
  await s.getByTestId("tf-true").click();
  await s.getByTestId("quiz-next").click();
  await s.getByTestId("answer-input").fill("5");
  await s.getByRole("button", { name: "確認" }).click();
  await s.getByTestId("quiz-next").click();
  await s.getByTestId("answer-input").fill(" h2o ");
  await s.getByRole("button", { name: "確認" }).click();
  await expect(s.getByText("🎉 答對了！")).toBeVisible();
  await s.getByTestId("quiz-next").click();
  await s.getByTestId("choice-0").click();
  await s.getByTestId("choice-2").click();
  await s.getByRole("button", { name: "確認" }).click();
  await s.getByTestId("quiz-next").click();
  await expect(s.getByText(/答對 5 \/ 5 題/)).toBeVisible();
  await expect(page.getByTestId("done-quiz")).toBeVisible();
});

test("素養題組：共用材料只顯示一次、各題作答", async ({ page }) => {
  const s = await section(page, "set");
  await expect(s.getByTestId("question-context")).toHaveCount(1);
  await expect(s.getByRole("cell", { name: "氣溫" })).toBeVisible();
  const qs = s.getByTestId("question");
  await qs.nth(0).getByTestId("choice-2").click();
  await qs.nth(1).getByTestId("answer-input").fill("29");
  await qs.nth(1).getByRole("button", { name: "確認" }).click();
  await expect(s.getByTestId("set-result")).toContainText("答對 2 / 2");
  await expect(page.getByTestId("done-set")).toBeVisible();
});

test("翻牌配對", async ({ page }) => {
  const s = await section(page, "memory");
  for (let i = 0; i < 4; i++) {
    await s.getByTestId(`memory-${i}a`).click();
    await s.getByTestId(`memory-${i}b`).click();
  }
  await expect(page.getByTestId("done-memory")).toBeVisible();
});

test("闖關遊戲：作答並結束", async ({ page }) => {
  const game = page.locator("#demo-game");
  await game.scrollIntoViewIfNeeded();
  await game.getByTestId("game-start").click();
  for (let i = 0; i < 5; i++) {
    const q = game.getByTestId("question");
    await expect(q).toBeVisible();
    const tf = q.getByTestId("tf-true");
    if (await tf.count()) await tf.click();
    else if (await q.getByTestId("answer-input").count()) {
      await q.getByTestId("answer-input").fill("0");
      await q.getByRole("button", { name: "確認" }).click();
    } else if (await q.getByRole("button", { name: "確認" }).count()) {
      await q.getByTestId("choice-0").click();
      await q.getByRole("button", { name: "確認" }).click();
    } else await q.getByTestId("choice-0").click();
    await game.getByTestId("game-next").click();
    if (await game.getByTestId("game-over").count()) break;
  }
  await expect(game.getByTestId("game-over")).toBeVisible();
});
