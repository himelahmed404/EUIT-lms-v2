import assert from "node:assert/strict";

export async function checkStudentComponents(page, base) {
  const server = { base: base.endsWith("/") ? base : base + "/" };
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  async function open(route) {
    await page.goto(new URL(`student/${route}`, server.base).href);
    await page.waitForFunction(() =>
      [...document.querySelectorAll("template")].every(
        (template) => template.content.childElementCount > 0,
      ),
    );
  }
  await open("help");
  assert.equal(await page.locator("[data-faq-list] > li").count(), 21);
  assert.equal(await page.locator("template[id^='rvlook']").count(), 21);
  for (const answer of await page.locator("[data-faq-list] > li").all()) {
    const body = answer.locator(".hp-a");
    const before = await body.evaluate((node) => node.hidden);
    const button = answer.locator(".hp-q");
    const title = await button.locator("strong").textContent();
    await button.click();
    assert.equal(await body.evaluate((node) => node.hidden), !before);
    assert.equal(await button.locator("strong").textContent(), title);
    await button.click();
    assert.equal(await body.evaluate((node) => node.hidden), before);
  }

  await open("projects");
  for (const [filter, count] of [
    ["To submit", 2],
    ["In review", 2],
    ["Marked", 1],
    ["All", 5],
  ]) {
    await page.getByRole("button", { name: filter, exact: true }).click();
    await page.waitForFunction(
      (expected) =>
        document.querySelectorAll("[data-region='filtered-2'] article")
          .length === expected,
      count,
    );
  }

  await open("quizzes");
  await page
    .getByRole("button", { name: "Graphic Design · B9", exact: true })
    .click();
  await page.waitForFunction(() =>
    document
      .querySelector("#gate-title")
      ?.textContent.includes("Layout for social media"),
  );
  await page
    .getByRole("button", { name: "WordPress · B14", exact: true })
    .click();
  await page.waitForFunction(() =>
    document.querySelector("#gate-title")?.textContent.includes("WooCommerce"),
  );
  assert.equal(
    await page.locator("[data-region='course-3'] > section").count(),
    3,
  );

  await open("quiz");
  assert.equal(await page.locator("template[data-state^='q']").count(), 10);
  for (const number of [1, 10, 4]) {
    await page
      .locator(`[data-region='quiz'] [data-show-state='q${number}']`)
      .click();
    await page.waitForFunction(
      (expected) =>
        document
          .querySelector("[data-region='quiz'] .p-eyebrow")
          ?.textContent.includes(`Question ${expected} of 10`),
      number,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    "Passed FAQ toggles, project filters, quiz course switching and question navigation.",
  );
}
