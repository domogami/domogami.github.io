// Quartz logs emitter failures without always returning a failing exit code.
// This independent artifact check makes a broken hunt fail CI instead of shipping.
import { readFile } from "node:fs/promises"
import path from "node:path"
import assert from "node:assert/strict"
import YAML from "yaml"

export async function verifyFlowerBuild(root, output) {
  const config = YAML.parse(await readFile(path.join(root, "quartz.config.yaml"), "utf8"))
  const plugin = config.plugins.find(
    (entry) => entry.source === "./site/flower-hunt/plugin" && entry.enabled !== false,
  )
  if (!plugin) return
  const { options } = plugin
  const normalize = (slug) =>
    decodeURIComponent(slug)
      .replace(/^\/+|\/+$/g, "")
      .replace(/\/index$/, "")
  const hidden = (slug) =>
    options.hiddenPaths.some(
      (p) => normalize(slug) === normalize(p) || normalize(slug).startsWith(normalize(p) + "/"),
    )
  const index = JSON.parse(await readFile(path.join(output, "static/contentIndex.json"), "utf8"))
  const full = JSON.parse(
    await readFile(path.join(output, "static/garden-flower-index.json"), "utf8"),
  )
  assert(Object.keys(full).some(hidden), "Flower Hunt: unlocked index is missing hidden pages")
  assert(
    !Object.entries(index).some(([slug, page]) => hidden(slug) || page.links?.some(hidden)),
    "Flower Hunt: hidden nodes or edges leaked into the public index",
  )
  for (const name of ["sitemap.xml", "index.xml"]) {
    const xml = await readFile(path.join(output, name), "utf8")
    for (const slug of Object.keys(full).filter(hidden))
      assert(!xml.includes(`/${slug}</`), `Flower Hunt: hidden page in ${name}`)
  }
  for (const slug of Object.keys(full).filter(hidden)) {
    const html = await readFile(path.join(output, slug + ".html"), "utf8")
    assert(
      html.includes('name="robots" content="noindex, nofollow, noarchive"'),
      `Flower Hunt: missing noindex on ${slug}`,
    )
    assert(html.includes("data-flower-page"), `Flower Hunt: missing page gate on ${slug}`)
  }
  console.log(
    "Flower Hunt verified: locked index, graph edges, sitemap, feed, and hidden-page gates",
  )
}
