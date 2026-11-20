import assert from "node:assert/strict";

export async function checkStudentMotion(page, base) {
  const server = { base: base.endsWith("/") ? base : base + "/" };
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(new URL("student/assistant", server.base).href);
  await page.locator("[data-liquid-ready]").waitFor();
  const header = await page.locator(".masthead").boundingBox();
  const assistant = await page.locator(".assistant-workspace").boundingBox();
  const controls = await page.locator(".header-tools").boundingBox();
  assert(
    assistant.width > 1800 && Math.abs(assistant.width - header.width) < 1,
  );
  assert(Math.abs(controls.x + controls.width - header.x - header.width) < 1);
  await page.screenshot({
    path: "/tmp/student-assistant-wide.png",
    fullPage: true,
  });

  await page
    .getByRole("link", { name: "Dashboard", exact: true })
    .first()
    .click();
  await page.waitForURL("**/student/dashboard");
  await page.waitForFunction(() =>
    document
      .querySelector(".nav-liquid-indicator")
      ?.getAnimations()
      .some((a) => a.playState === "running"),
  );
  await page.waitForFunction(() =>
    document
      .querySelector(".study-fill")
      ?.getAnimations()
      .some((a) => a.playState === "running"),
  );
  await page.waitForFunction(() =>
    document
      .querySelector(".hours-widget")
      ?.getAnimations()
      .some((a) => a.playState === "running"),
  );
  await page.waitForFunction(() =>
    document
      .querySelector(".cal-day")
      ?.getAnimations()
      .some((a) => a.playState === "running"),
  );
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: "/tmp/student-dashboard-motion.png",
    fullPage: true,
  });

  const selectedTab = await page
    .locator(".nav-tab[aria-current='page']")
    .boundingBox();
  const settledPill = await page.locator(".nav-liquid-indicator").boundingBox();
  assert(
    Math.abs(selectedTab.x - settledPill.x) < 1 &&
      Math.abs(selectedTab.y - settledPill.y) < 1,
  );
  assert(
    Math.abs(selectedTab.width - settledPill.width) < 1 &&
      Math.abs(selectedTab.height - settledPill.height) < 1,
  );
  await page.locator(".study-widget").hover();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".study-fill")).translate !==
      "none",
  );
  await page.locator(".discovery-row").first().hover();
  await page.waitForFunction(
    () =>
      getComputedStyle(
        document.querySelector(".discovery-row .lucide-arrow-up-right"),
      ).transform !== "none",
  );
  await page.locator(".cal-day").first().hover();
  await page.waitForFunction(
    () =>
      Number(getComputedStyle(document.querySelector(".cal-day")).scale) > 1,
  );
  await page.selectOption("#study-period", "Month");
  await page.selectOption("#activity-week", "1");
  await page.locator(".cal-day").first().click();
  assert(await page.locator(".day-detail").isVisible());

  // Reduced motion disables both the JS morph/reveal and CSS movement.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .getByRole("link", { name: "Assistant", exact: true })
    .first()
    .click();
  await page.waitForURL("**/student/assistant");
  await page.locator("[data-liquid-ready]").waitFor();
  assert.equal(
    await page
      .locator(".nav-liquid-indicator")
      .evaluate((el) => el.getAnimations().length),
    0,
  );
  await page
    .getByRole("link", { name: "Dashboard", exact: true })
    .first()
    .click();
  await page.waitForURL("**/student/dashboard");
  await page.locator("[data-liquid-ready]").waitFor();
  assert.equal(
    await page
      .locator(".study-fill")
      .first()
      .evaluate((el) => el.getAnimations().length),
    0,
  );
  await page.locator(".discovery-row").first().hover();
  assert.equal(
    await page
      .locator(".discovery-row .lucide-arrow-up-right")
      .first()
      .evaluate((el) => getComputedStyle(el).transform),
    "none",
  );
  for (const width of [320, 360, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL("student/assistant", server.base).href);
    assert(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
            document.documentElement.clientWidth <=
          2,
      ),
    );
    const tools = await page.locator(".header-tools").boundingBox();
    const masthead = await page.locator(".masthead").boundingBox();
    assert(Math.abs(tools.x + tools.width - masthead.x - masthead.width) < 1);
  }
  await page.setViewportSize({ width: 360, height: 900 });
  await page.screenshot({
    path: "/tmp/student-assistant-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log(
    "Passed full-width layout, header alignment, navigation morph, dashboard/arrow motion and reduced-motion checks.",
  );
}
