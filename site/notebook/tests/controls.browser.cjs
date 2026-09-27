/* Local UI integration: no vault access, note changes, or publishing. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright")
const assert = require("node:assert/strict")
const base = process.env.QUARTZ_PREVIEW_URL || "http://localhost:8080"
async function run() {
  const browser = await chromium.launch({ channel: "chrome", headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  })
  const page = await context.newPage()
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))
  const theme = page.locator(".notebook-theme")
  const reader = page.locator(".notebook-reading")
  const noOverflow = async () =>
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    )
  try {
    await page.goto(base, { waitUntil: "domcontentloaded" })
    await reader.waitFor()
    await page.evaluate(() => {
      localStorage.setItem("notebook-theme", "blended")
      localStorage.setItem("notebook-reading", "off")
    })
    await page.reload({ waitUntil: "domcontentloaded" })
    await reader.waitFor()
    assert.equal(await page.locator(".sidebar.left > .flex-component button").count(), 3)
    assert.equal(await theme.textContent(), "")
    for (const width of [1440, 1024, 801, 800, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.reload({ waitUntil: "domcontentloaded" })
      await reader.waitFor()
      console.log("Checking width", width)
      for (const mode of ["light", "dark", "blended"]) {
        await theme.click()
        assert.equal(await page.locator("html").getAttribute("data-notebook-theme"), mode)
        await noOverflow()
        const boxes = await Promise.all(
          [page.locator(".search-button"), theme, reader].map((e) => e.boundingBox()),
        )
        assert(
          boxes.every((b) => b.height === 44 && Math.abs(b.y - boxes[0].y) < 1),
          JSON.stringify(boxes),
        )
        await reader.click()
        assert.equal(await reader.getAttribute("aria-pressed"), "true")
        assert.equal(await page.locator(".notebook-brand").isVisible(), true)
        assert.equal(await page.locator(".explorer").isVisible(), false)
        assert.equal(await page.locator(".sidebar.right").isVisible(), false)
        assert.equal(await reader.isVisible(), true)
        await noOverflow()
        await page.locator(".search-button").click()
        await page.locator(".search-bar").waitFor({ state: "visible" })
        await page.keyboard.press("Escape")
        await reader.press("Enter")
        assert.equal(await reader.getAttribute("aria-pressed"), "false")
        assert.equal(await page.locator(".notebook-brand").isVisible(), true)
      }
    }
    await reader.press("Space")
    await page.reload({ waitUntil: "domcontentloaded" })
    await reader.waitFor()
    assert.equal(await reader.getAttribute("aria-pressed"), "true")
    await page.goto(base + "/recipes/prime-rib", { waitUntil: "domcontentloaded" })
    await reader.waitFor()
    assert.equal(await reader.getAttribute("aria-pressed"), "true")
    const second = await context.newPage()
    await second.goto(base, { waitUntil: "domcontentloaded" })
    await second.locator(".notebook-reading").waitFor()
    await reader.click()
    await second.waitForFunction(() => document.documentElement.dataset.notebookReading === "off")
    await theme.press("ArrowLeft")
    await second.waitForFunction(() => document.documentElement.dataset.notebookTheme === "dark")
    await second.close()
    await theme.press("ArrowRight")
    assert.equal(
      await theme.locator(".theme-shade").evaluate((el) => getComputedStyle(el).transitionDuration),
      "0s",
    )
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto(base, { waitUntil: "domcontentloaded" })
    await page.locator(".notebook-banner").waitFor()
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: "/tmp/garden-three-controls.png" })
    await reader.click()
    await page.screenshot({ path: "/tmp/garden-reading-mode.png" })
    await reader.click()
    assert.deepEqual(errors, [])
    console.log(
      "Passed: three aligned controls, all themes at 320–1440px, hidden sidebars, reachable exit, search in reading mode, keyboard, navigation persistence, cross-tab sync and reduced motion.",
    )
  } finally {
    await browser.close()
  }
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
