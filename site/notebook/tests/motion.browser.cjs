/* Integration checks against built local previews; no vault access or publishing. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright")
const assert = require("node:assert/strict")
const base = process.env.QUARTZ_PREVIEW_URL || "http://localhost:8080"
const examples = process.env.QUARTZ_EXAMPLES_URL || "http://localhost:8081"

async function run() {
  const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL || "chrome",
    headless: true,
  })
  const errors = []
  async function page(options = {}) {
    const p = await browser.newPage({ viewport: { width: 1440, height: 1000 }, ...options })
    p.on("pageerror", (error) => errors.push(error.message))
    return p
  }
  async function complete(p, selector) {
    await p.waitForFunction(
      (s) => document.querySelector(s)?.dataset.notebookMotionState === "complete",
      selector,
    )
  }
  try {
    const p = await page()
    await p.goto(base, { waitUntil: "domcontentloaded" })
    await p.waitForFunction(
      () => document.querySelector(".notebook-banner")?.dataset.notebookMotionState === "running",
    )
    const timing = await p.locator(".notebook-banner").evaluate((el) => {
      const face = el.querySelector(".notebook-banner-face")
      const phases = face
        .getAnimations()
        .map((a) => ({ keys: a.effect.getKeyframes()[0], ...a.effect.getTiming() }))
      const ink = el.querySelector(".notebook-ink-letter").getAnimations()[0].effect.getTiming()
      return { phases, ink }
    })
    const outline = timing.phases.find((p) => "strokeDashoffset" in p.keys)
    const fill = timing.phases.find((p) => "fillOpacity" in p.keys)
    assert.ok(fill.delay >= outline.delay + outline.duration)
    assert.ok(timing.ink.delay >= fill.delay + fill.duration)
    await complete(p, ".notebook-banner")
    await complete(p, '[data-callout="annotation"] .callout-title-inner')
    assert.equal(await p.getByRole("heading", { name: "Graph View", exact: true }).count(), 1)
    assert.equal(await p.locator(".notebook-banner-label").textContent(), "Graph View")
    assert.equal(
      await p.locator(".notebook-banner").evaluate((e) => getComputedStyle(e).color),
      "rgb(43, 48, 52)",
    )
    const count = await p.locator(".notebook-ink-letter").count()
    await p.evaluate(() => {
      document.dispatchEvent(new CustomEvent("render"))
      document.dispatchEvent(new CustomEvent("render"))
    })
    assert.equal(await p.locator(".notebook-ink-letter").count(), count)
    assert.equal(await p.locator(".notebook-banner > svg").count(), 1)
    assert.equal(
      await p
        .locator(".notebook-banner")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    )
    await p.locator(".global-graph-icon").click()
    await p.waitForSelector(".global-graph-outer.active canvas")
    await p.keyboard.press("Escape")
    console.log(
      "PASS banner sequence, heading accessibility, cleanup, repeated render, expanded graph",
    )

    const fixture = await page({ viewport: { width: 900, height: 350 } })
    await fixture.goto(examples, { waitUntil: "networkidle" })
    const rich = fixture.locator('[data-callout="annotation"] .callout-title-inner').nth(4)
    const original = await rich.textContent()
    assert.equal(await rich.getAttribute("data-notebook-motion-state"), "waiting")
    assert.equal(await rich.locator(".notebook-ink-letter").count(), 0)
    await rich.scrollIntoViewIfNeeded()
    await fixture.waitForFunction(
      () =>
        document.querySelectorAll('[data-callout="annotation"] .callout-title-inner')[4].dataset
          .notebookMotionState === "complete",
    )
    assert.equal(await rich.textContent(), original)
    assert.equal(await rich.locator("strong").innerText(), "note")
    assert.equal(await rich.getByRole("link", { name: "a link", exact: true }).count(), 1)
    assert.equal(await rich.locator(".notebook-ink-letter").filter({ hasText: "👩‍💻" }).count(), 1)
    await fixture.evaluate(() => scrollTo(0, 0))
    await rich.scrollIntoViewIfNeeded()
    assert.equal(await rich.evaluate((e) => e.getAnimations({ subtree: true }).length), 0)
    assert.equal(
      await fixture.locator('[data-callout-metadata~="static"] .notebook-ink-letter').count(),
      0,
    )
    await fixture.setViewportSize({ width: 320, height: 600 })
    await fixture.reload({ waitUntil: "networkidle" })
    await rich.scrollIntoViewIfNeeded()
    assert.ok(await fixture.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    console.log(
      "PASS first-view only, lazy lettering, rich Markdown, intact Unicode and text, inline opt-out, mobile wrapping",
    )

    await fixture.goto(`${examples}/static`, { waitUntil: "networkidle" })
    assert.equal(await fixture.locator('[data-notebook-motion-page="off"]').count(), 1)
    assert.equal(await fixture.locator(".notebook-ink-letter").count(), 0)
    assert.equal(await fixture.locator(".notebook-banner > svg").count(), 1)

    const reduced = await page({ reducedMotion: "reduce" })
    await reduced.goto(base, { waitUntil: "networkidle" })
    assert.equal(await reduced.locator(".notebook-ink-letter").count(), 0)
    assert.equal(
      await reduced
        .locator(".notebook-banner")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    )
    for (const mode of ["light", "dark", "blended"]) {
      while ((await reduced.locator("html").getAttribute("data-notebook-theme")) !== mode) {
        await reduced.locator(".notebook-theme").click()
      }
      assert.ok(await reduced.locator(".notebook-banner-label").isVisible())
    }
    const raw = await page({ javaScriptEnabled: false })
    await raw.goto(base, { waitUntil: "networkidle" })
    assert.equal(await raw.getByRole("heading", { name: "Graph View" }).count(), 1)
    assert.match(await raw.locator('[data-callout="annotation"]').innerText(), /taking root/)
    console.log("PASS page opt-out, initial reduced motion, theme changes, no-JavaScript content")

    const early = await page()
    await early.goto(base, { waitUntil: "domcontentloaded" })
    await early.waitForFunction(
      () => document.querySelector(".notebook-banner")?.dataset.notebookMotionState === "running",
    )
    await early.emulateMedia({ reducedMotion: "reduce" })
    assert.equal(
      await early
        .locator(".notebook-banner")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    )
    await early.emulateMedia({ reducedMotion: "no-preference" })
    await early.reload({ waitUntil: "domcontentloaded" })
    await early.waitForSelector(".notebook-banner")
    await early.locator(".search-button").focus()
    assert.equal(
      await early
        .locator(".notebook-banner")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    )
    await early.goto(`${base}/#welcome-friend`, { waitUntil: "networkidle" })
    assert.equal(
      await early
        .locator(".notebook-banner")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    )
    await early.emulateMedia({ media: "print" })
    assert.equal(
      await early
        .locator(".notebook-ink-letter")
        .evaluateAll((els) => els.every((e) => getComputedStyle(e).opacity === "1")),
      true,
    )
    const fallback = await page()
    // Exercise our fallback in isolation: Quartz's upstream TOC itself requires IO.
    const { NotebookMotion } = await import("../plugins/notebook-motion/dist/index.js")
    await fallback.setContent(
      '<span hidden data-notebook-motion-page="on"></span><div class="graph"><h3>Graph View</h3></div>',
    )
    await fallback.evaluate(() => {
      delete window.IntersectionObserver
      window.addCleanup = () => {}
    })
    await fallback.addScriptTag({ content: NotebookMotion().afterDOMLoaded })
    await fallback.evaluate(() => document.dispatchEvent(new CustomEvent("nav")))
    assert.equal(
      await fallback
        .locator(".notebook-banner")
        .evaluate((e) => e.getAnimations({ subtree: true }).length),
      0,
    )
    assert.deepEqual(errors, [])
    console.log(
      "PASS live reduced-motion change, focus, hash navigation, print, missing observer fallback, no browser errors",
    )
  } finally {
    await browser.close()
  }
}
run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
