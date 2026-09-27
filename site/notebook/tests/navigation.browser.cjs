/* Local navigation regressions: no vault access or publishing. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright")
const assert = require("node:assert/strict")
;(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true })
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1000 },
    reducedMotion: "reduce",
  })
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  try {
    await page.goto(process.env.QUARTZ_PREVIEW_URL || "http://localhost:8080", {
      waitUntil: "domcontentloaded",
    })
    await page.evaluate(() => {
      localStorage.setItem("notebook-theme", "blended")
      localStorage.setItem("notebook-reading", "off")
    })
    for (const width of [1440, 1024, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.reload({ waitUntil: "domcontentloaded" })
      await page.locator(".explorer .folder-container").first().waitFor({ state: "attached" })
      await page.waitForFunction(
        () => !document.querySelector(".mobile-explorer").classList.contains("hide-until-loaded"),
      )
      for (let i = 0; i < 3; i++) {
        const reader = page.locator(".notebook-reading")
        if (width > 800) {
          await page.locator(".desktop-explorer").click()
          assert.equal(await page.locator(".explorer-content").isVisible(), false)
          const bounds = await page.locator(".explorer").evaluate((e) => ({
            outer: e.getBoundingClientRect().toJSON(),
            title: e.querySelector(".desktop-explorer h2").getBoundingClientRect().toJSON(),
          }))
          assert(bounds.title.bottom <= bounds.outer.bottom + 1, "Explorer heading clipped")
          await page.locator(".desktop-explorer").click()
          assert.equal(await page.locator(".explorer-content").isVisible(), true)
          await page.locator(".toc-header").click()
          assert.equal(await page.locator(".toc-content").isVisible(), false)
          assert.equal(await page.locator(".toc-header").getAttribute("aria-expanded"), "false")
          await page.locator(".toc-header").click()
          assert.equal(await page.locator(".toc-content").isVisible(), true)
        } else {
          await page.locator(".mobile-explorer").click()
          assert.equal(await page.locator(".explorer-content").isVisible(), true)
          const boxes = await page.evaluate(() => ({
            tree: document.querySelector(".explorer-content").getBoundingClientRect().toJSON(),
            toolbar: document
              .querySelector(".sidebar.left > .flex-component")
              .getBoundingClientRect()
              .toJSON(),
            header: document.querySelector(".sidebar.left").getBoundingClientRect().toJSON(),
            article: document.querySelector(".center").getBoundingClientRect().toJSON(),
            overflow: document.documentElement.scrollWidth > innerWidth,
          }))
          assert(boxes.tree.top >= boxes.toolbar.bottom, "Menu covers toolbar")
          assert(boxes.article.top >= boxes.header.bottom, "Menu covers article")
          assert(!boxes.overflow)
          assert(boxes.tree.width >= width - 40, "Menu wastes width")
          await page.locator(".search-button").click()
          await page.locator(".search-bar").waitFor({ state: "visible" })
          await page.keyboard.press("Escape")
          if (width === 390 && i === 0) {
            await page.evaluate(() => scrollTo(0, 0))
            await page.screenshot({ path: "/tmp/garden-mobile-inline-menu.png" })
          }
          await page.locator(".mobile-explorer").click()
          assert.equal(await page.locator(".explorer-content").isVisible(), false)
        }
        await reader.click()
        assert.equal(await page.locator(".notebook-brand").isVisible(), true)
        assert.equal(await page.locator(".explorer-content").isVisible(), false)
        assert.equal(await page.locator(".sidebar.right").isVisible(), false)
        assert.equal(
          await page.locator(".sidebar.left").evaluate((e) => getComputedStyle(e).position),
          "static",
        )
        await page.evaluate(() => scrollTo(0, 600))
        assert(
          (await page.locator(".sidebar.left").boundingBox()).y < 0,
          "Reading header remains fixed",
        )
        await page.evaluate(() => scrollTo(0, 0))
        if (width === 1440 && i === 0)
          await page.screenshot({ path: "/tmp/garden-reading-logo.png" })
        await reader.click()
        await page.locator(".notebook-theme").click()
      }
      console.log("Navigation passed", width)
    }
    assert.deepEqual(errors, [])
  } finally {
    await browser.close()
  }
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
