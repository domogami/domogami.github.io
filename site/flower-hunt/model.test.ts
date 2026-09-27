import test from "node:test"
import assert from "node:assert/strict"
import { isHidden, normalizeSlug, readProgress, validateOptions, type HuntOptions } from "./model"
import { decorateHtml } from "./html"
const options: HuntOptions = {
  id: "test",
  hiddenPaths: ["experiences/growth"],
  destination: "experiences/growth",
  pieces: [{ id: "one", page: "experiences/college", label: "Beginnings" }],
}
test("matches exact hidden directory and descendants, never adjacent names", () => {
  for (const slug of [
    "experiences/growth",
    "/experiences/growth/",
    "experiences/growth/index",
    "experiences/growth/note#heading",
    "experiences/%67rowth/note",
  ])
    assert.ok(isHidden(slug, options.hiddenPaths), slug)
  for (const slug of ["experiences/growthful", "experiences", "other/experiences/growth"])
    assert.equal(isHidden(slug, options.hiddenPaths), false, slug)
  assert.equal(normalizeSlug("/experiences/growth/index"), "experiences/growth")
})
test("progress ignores corrupt, duplicate and unknown IDs", () => {
  assert.deepEqual(readProgress("{bad", ["one"]), [])
  assert.deepEqual(readProgress('{"one":true}', ["one"]), [])
  assert.deepEqual(readProgress('["one","one","unknown",false]', ["one"]), ["one"])
})
test("rejects impossible hunts and unsafe paths", () => {
  assert.doesNotThrow(() => validateOptions(options))
  assert.throws(() =>
    validateOptions({
      ...options,
      pieces: [{ ...options.pieces[0], page: "experiences/growth/note" }],
    }),
  )
  assert.throws(() => validateOptions({ ...options, hiddenPaths: ["../anything"] }))
  assert.throws(() =>
    validateOptions({ ...options, pieces: [options.pieces[0], options.pieces[0]] }),
  )
})
test("gates hidden list rows and backlinks, corrects counts, preserves ordinary links", () => {
  const source =
    '<html><head></head><body><main class="center"><div class="page-listing"><p>2 items under this folder.</p><ul><li class="section-li"><a href="./growth/">Hidden</a></li><li class="section-li"><a href="./college">Public</a></li></ul></div></main></body></html>'
  const result = decorateHtml(source, "experiences/index", options, "example.test")
  assert.match(result, /class="section-li" data-flower-hidden/)
  assert.match(result, /1 item under this folder/)
  assert.match(result, /<a href="\.\/college">Public/)
  assert.equal(decorateHtml(result, "experiences/index", options, "example.test"), result)
})
test("adds crawler exclusion and locked-page gate, including base paths", () => {
  const source =
    '<html><head></head><body><main class="center"><article>Original note</article></main></body></html>'
  const result = decorateHtml(source, "experiences/growth/note", options, "example.test/garden")
  assert.match(result, /name="robots" content="noindex, nofollow, noarchive"/)
  assert.match(result, /data-flower-page/)
  assert.match(result, /class="flower-gate"/)
  assert.doesNotMatch(result, /Start wandering|Collect the petals/)
  assert.match(result, /Original note/)
  assert.equal(
    decorateHtml(result, "experiences/growth/note", options, "example.test/garden"),
    result,
  )
})
