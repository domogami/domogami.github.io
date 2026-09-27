// site/flower-hunt/index.ts
import { ContentIndex } from "@quartz-community/content-index"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

// site/flower-hunt/model.ts
function normalizeSlug(value) {
  return decodeURIComponent(value.split(/[?#]/)[0])
    .replace(/^\/+|\/+$/g, "")
    .replace(/(?:\/index|\.html)$/, "")
}
function isHidden(slug, paths) {
  const value = normalizeSlug(slug)
  return paths.some((path2) => {
    const root = normalizeSlug(path2)
    return value === root || value.startsWith(root + "/")
  })
}
function validateOptions(options) {
  if (
    !options?.id ||
    !options.hiddenPaths?.length ||
    !options.pieces?.length ||
    options.pieces.length > 8
  )
    throw new Error("Flower Hunt needs an id, hiddenPaths, and 1\u20138 pieces")
  const paths = [...options.hiddenPaths, options.destination, ...options.pieces.map((p) => p.page)]
  if (
    paths.some(
      (p) => !p || /[?#\\]|(^|\/)\.\.?($|\/)|:/.test(decodeURIComponent(p)) || !normalizeSlug(p),
    )
  )
    throw new Error(
      "Flower Hunt paths must be site-relative URL slugs without queries or traversal",
    )
  if (
    new Set(options.pieces.map((p) => p.id)).size !== options.pieces.length ||
    options.pieces.some((p) => !p.id || !p.label)
  )
    throw new Error("Flower Hunt pieces need unique IDs and accessible labels")
  if (
    !isHidden(options.destination, options.hiddenPaths) ||
    options.pieces.some((p) => isHidden(p.page, options.hiddenPaths))
  )
    throw new Error("Flower Hunt destination must be hidden and all piece pages must be public")
  if (
    options.pieces.some(
      (p) =>
        p.afterParagraph !== void 0 &&
        (!Number.isInteger(p.afterParagraph) || p.afterParagraph < 1),
    )
  )
    throw new Error("Flower Hunt afterParagraph must be a positive integer")
  return options
}

// site/flower-hunt/html.ts
import { fromHtml } from "hast-util-from-html"
import { toHtml } from "hast-util-to-html"
var element = (tagName, properties, children = []) => ({
  type: "element",
  tagName,
  properties,
  children,
})
function decorateHtml(html, slug, options, baseUrl, hiddenPaths = options.hiddenPaths) {
  const tree = fromHtml(html)
  let body
  let head
  const classes = (node) =>
    Array.isArray(node.properties.className) ? node.properties.className : []
  const walk = (node, ancestors = []) => {
    for (const child of node.children) {
      if (child.type !== "element") continue
      if (child.tagName === "body") body = child
      if (child.tagName === "head") head = child
      if (child.properties.dataFlowerGenerated !== void 0) continue
      if (child.tagName === "a" && typeof child.properties.href === "string") {
        const origin = new URL(`https://${baseUrl.replace(/\/$/, "")}/`)
        const url = new URL(child.properties.href, new URL(slug, origin))
        const basePath = origin.pathname.replace(/\/$/, "")
        if (
          url.origin === origin.origin &&
          url.pathname.startsWith(basePath + "/") &&
          isHidden(url.pathname.slice(basePath.length), hiddenPaths)
        ) {
          child.properties.dataFlowerHidden = ""
          const row = [...ancestors].reverse().find((parent) => parent.tagName === "li")
          if (row) row.properties.dataFlowerHidden = ""
          const embed = [...ancestors]
            .reverse()
            .find((parent) => classes(parent).includes("transclude"))
          if (embed) embed.properties.dataFlowerHidden = ""
        }
      }
      walk(child, [...ancestors, child])
    }
  }
  walk(tree)
  if (isHidden(slug, hiddenPaths)) {
    if (
      head &&
      !head.children.some((node) => node.type === "element" && node.properties.name === "robots")
    )
      head.children.push(
        element("meta", {
          name: "robots",
          content: "noindex, nofollow, noarchive",
          dataFlowerGenerated: "",
        }),
      )
    if (body) {
      body.properties.dataFlowerPage = ""
      const addGate = (node) => {
        if (
          classes(node).includes("center") &&
          !node.children.some((n) => n.type === "element" && classes(n).includes("flower-gate"))
        ) {
          node.children.unshift(
            element("section", {
              className: ["flower-gate"],
              dataFlowerGenerated: "",
              ariaLabel: "Hidden garden",
            }),
          )
        }
        for (const child of node.children) if (child.type === "element") addGate(child)
      }
      addGate(body)
    }
  }
  const fixCounts = (node) => {
    if (node.type === "element" && classes(node).includes("page-listing")) {
      const rows = []
      const collect = (n) => {
        for (const c of n.children)
          if (c.type === "element") {
            if (classes(c).includes("section-li")) rows.push(c)
            else collect(c)
          }
      }
      collect(node)
      const hidden = rows.filter((row) => row.properties.dataFlowerHidden !== void 0).length
      const count = node.children.find((c) => c.type === "element" && c.tagName === "p")
      if (hidden && count && count.properties.dataFlowerGenerated === void 0) {
        const original = count.children
        count.children = [
          element("span", { dataFlowerLocked: "" }, [
            {
              type: "text",
              value: `${rows.length - hidden} ${rows.length - hidden === 1 ? "item" : "items"} under this folder.`,
            },
          ]),
          element("span", { dataFlowerHidden: "" }, original),
        ]
        count.properties.dataFlowerGenerated = ""
      }
    }
    for (const child of node.children) if (child.type === "element") fixCounts(child)
  }
  fixCounts(tree)
  return toHtml(tree, { allowDangerousHtml: true })
}

// site/flower-hunt/styles.css
var styles_default = `/* Scoped to the hunt. Palette follows Quartz's active light, dark, or hybrid scope. */
html:not([data-flower-unlocked]) [data-flower-hidden] {
  display: none !important;
}
html:not([data-flower-unlocked]) body[data-flower-page] .center > :not(.flower-gate),
html:not([data-flower-unlocked]) body[data-flower-page] .sidebar.right {
  display: none !important;
}
html[data-flower-unlocked] .flower-gate {
  display: none;
}
.flower-collector {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 25;
}
.flower-collector > button {
  display: block;
  position: relative;
  width: 64px;
  height: 86px;
  padding: 3px 5px 23px;
  color: var(--dark);
  background: transparent;
  border: 0;
  box-shadow: none;
  cursor: pointer;
}
.flower-collector > button:disabled {
  opacity: 1;
  cursor: default;
}
.flower-count {
  position: absolute;
  bottom: 4px;
  inset-inline: 0;
  text-align: center;
  font:
    600 20px/1 var(--flower-handwriting, "Notebook Caveat"),
    cursive;
}
.hunt-flower {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.hunt-stem {
  stroke: var(--secondary);
  stroke-width: 2;
  fill: color-mix(in srgb, var(--secondary) 16%, var(--light));
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hunt-petal path {
  stroke: var(--gray);
  stroke-width: 1.7;
  stroke-dasharray: 0.05 0.05;
  opacity: 0.3;
}
.hunt-petal.found path {
  fill: color-mix(in srgb, var(--tertiary) 35%, var(--light));
  stroke: var(--tertiary);
  stroke-dasharray: 1;
  opacity: 1;
}
.hunt-heart {
  fill: var(--light);
  stroke: var(--secondary);
  stroke-width: 2;
}
.hunt-ground {
  stroke: var(--gray);
  stroke-width: 1.5;
  stroke-linecap: round;
}
.flower-collector[data-complete] .hunt-heart {
  fill: var(--secondary);
}
.flower-piece {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  max-width: 100%;
  min-height: 52px;
  margin: 1.25rem 0;
  padding: 5px;
  background: transparent;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  color: var(--secondary);
  text-align: left;
}
.flower-piece[hidden] {
  display: none;
}
.flower-piece svg {
  width: 44px;
  height: 50px;
  flex: none;
  transform: rotate(var(--petal-tilt, -8deg));
  transition: transform 0.3s ease;
  overflow: visible;
  fill: color-mix(in srgb, var(--tertiary) 35%, var(--light));
  stroke: var(--tertiary);
  stroke-width: 2;
}
.flower-piece:hover svg {
  transform: rotate(calc(var(--petal-tilt, -8deg) + 9deg)) translateY(-3px);
}
.flower-piece-note {
  font:
    500 1.35rem/1.2 var(--flower-handwriting, "Notebook Caveat"),
    cursive;
}
:is(.flower-piece, .flower-flight) .petal-paper {
  fill: color-mix(in srgb, var(--tertiary) 24%, var(--light));
  stroke: var(--tertiary);
  stroke-width: 1.7;
  stroke-linejoin: round;
}
:is(.flower-piece, .flower-flight) :is(.petal-vein, .petal-pencil, .petal-spark) {
  fill: none;
  stroke: var(--tertiary);
  stroke-width: 1.2;
  stroke-linecap: round;
}
:is(.flower-piece, .flower-flight) .petal-pencil {
  opacity: 0.45;
}
:is(.flower-piece, .flower-flight) .petal-spark {
  stroke: var(--secondary);
}
.flower-piece:disabled {
  cursor: default;
  opacity: 0.65;
  transform: none;
}
.flower-piece:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 5px;
  border-radius: 12px;
}
/* Keep keyboard focus visible as ink on the drawing, without a box. */
.flower-collector > button:focus-visible {
  outline: none;
}
.flower-collector > button:focus-visible .hunt-ground {
  stroke: var(--secondary);
  stroke-width: 4;
}
.flower-collector > button:focus-visible .flower-count {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.flower-flight {
  position: fixed;
  pointer-events: none;
  z-index: 100;
  width: 35px;
  height: 42px;
}
.flower-flight svg {
  width: 100%;
  height: 100%;
  fill: var(--tertiary);
  stroke: var(--secondary);
  stroke-width: 2;
}
.flower-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
}
.flower-collector.is-blooming > button {
  animation: flower-bloom 0.9s ease-out;
}
/* Ink each petal in sequence during the final bloom, whatever the piece count. */
.flower-collector.is-blooming .hunt-petal.found path {
  animation: flower-ink 0.6s ease-out both;
  animation-delay: calc(var(--petal-index) * 45ms);
}
.flower-collector.is-collecting .hunt-petal.found path {
  animation: flower-ink 0.6s ease-out;
}
@keyframes flower-bloom {
  0% {
    transform: scale(0.8) rotate(-12deg);
  }
  45% {
    transform: scale(1.18) rotate(6deg);
  }
  75% {
    transform: scale(0.98) rotate(-2deg);
  }
  100% {
    transform: none;
  }
}
@keyframes flower-ink {
  from {
    stroke-dashoffset: 1;
    fill-opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    fill-opacity: 1;
  }
}
/* Match the garden's mobile layout. The collector already follows .page in the
   document, so its own bottom row cannot cover prose or footer links. */
@media (max-width: 800px) {
  .flower-collector {
    position: relative;
    inset: auto;
    width: fit-content;
    margin: 1rem max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) auto;
    z-index: auto;
  }
  .flower-collector > button {
    width: 50px;
    height: 75px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .flower-collector *,
  .flower-piece,
  .flower-piece svg {
    animation: none !important;
    transition: none !important;
  }
}
@media print {
  .flower-collector,
  .flower-piece,
  .flower-gate {
    display: none !important;
  }
}
html[data-flower-unlocked] [data-flower-locked] {
  display: none !important;
}
`

// flower:client
var client_default =
  '"use strict";\n(() => {\n  // site/flower-hunt/model.ts\n  function normalizeSlug(value) {\n    return decodeURIComponent(value.split(/[?#]/)[0]).replace(/^\\/+|\\/+$/g, "").replace(/(?:\\/index|\\.html)$/, "");\n  }\n  function readProgress(raw, ids) {\n    try {\n      const value = JSON.parse(raw ?? "[]");\n      return Array.isArray(value) ? [...new Set(value.filter((id) => typeof id === "string" && ids.includes(id)))] : [];\n    } catch {\n      return [];\n    }\n  }\n\n  // site/flower-hunt/art.ts\n  function petalSvg(index) {\n    const outlines = [\n      "M25 46C9 38 6 20 17 11C29 1 44 15 39 29Q35 41 25 46Z",\n      "M24 46C9 33 8 16 21 9C36 2 45 19 37 32Q33 42 24 46Z",\n      "M24 46C13 40 5 24 14 13C25 0 43 10 40 25Q36 40 24 46Z",\n      "M25 46C7 36 9 17 20 10C34 1 45 17 38 31Q33 40 25 46Z",\n      "M25 46C13 39 6 22 17 12C30 0 44 13 39 28Q34 41 25 46Z"\n    ];\n    return `<svg viewBox="0 0 52 58" aria-hidden="true">\n    <path class="petal-paper" d="${outlines[index % outlines.length]}"/>\n    <path class="petal-vein" d="M25 44Q24 31 29 19M25 35l-7-8M25 29l7-5"/>\n    <path class="petal-pencil" d="M15 17Q10 27 17 36"/>\n    <path class="petal-spark" d="M43 7v6m-3-3h6M7 40l-3 3m40 0 2 2"/>\n  </svg>`;\n  }\n  function flowerSvg(count, found, ids) {\n    return `<svg viewBox="0 0 120 144" fill="none" aria-hidden="true" class="hunt-flower">\n  <path class="hunt-stem" d="M60 127Q65 107 60 80L60 62M61 111Q37 115 32 94Q53 94 61 111M62 98Q84 96 87 77Q67 80 62 98"/>\n  ${ids.map((id, i) => `<g class="hunt-petal ${found.includes(id) ? "found" : ""}" data-petal="${i}" style="--petal-index: ${i}" transform="rotate(${i * 360 / count} 60 48)"><path pathLength="1" d="M60 47C40 35 42 12 57 9C75 6 81 28 60 47Z"/></g>`).join("")}\n  <circle class="hunt-heart" cx="60" cy="48" r="10"/>\n  <path class="hunt-ground" d="M42 130Q60 133 78 129"/></svg>`;\n  }\n\n  // site/flower-hunt/client.ts\n  var options = window.__flowerOptions;\n  if (!window.__flowerHuntStarted) {\n    let paint = function() {\n      collector.toggleAttribute("data-complete", unlocked);\n      toggle.innerHTML = `${art()}<span class="flower-count" aria-hidden="true">${unlocked ? ids.length : found.length}/${ids.length}</span>`;\n      toggle.disabled = !unlocked;\n      toggle.setAttribute(\n        "aria-label",\n        unlocked ? "Open the hidden garden" : `Your flower: ${found.length} of ${ids.length} petals found`\n      );\n    }, mount = function() {\n      if (!document.body || document.getElementById("flower-collector")) return;\n      collector = document.createElement("aside");\n      collector.id = "flower-collector";\n      collector.className = "flower-collector";\n      collector.setAttribute("aria-label", "Garden flower collection");\n      toggle = document.createElement("button");\n      toggle.type = "button";\n      toggle.onclick = () => {\n        if (unlocked) location.assign(siteLink(options.destination));\n      };\n      live = document.createElement("span");\n      live.className = "flower-sr";\n      live.setAttribute("role", "status");\n      live.setAttribute("aria-live", "polite");\n      collector.tabIndex = -1;\n      collector.append(toggle, live);\n      document.body.append(collector);\n      paint();\n      const page = normalizeSlug(document.body.dataset.slug ?? "");\n      for (const [i, piece] of options.pieces.entries()) {\n        if (normalizeSlug(piece.page) !== page) continue;\n        const button = document.createElement("button");\n        button.type = "button";\n        button.className = "flower-piece";\n        button.dataset.pieceId = piece.id;\n        button.innerHTML = petalSvg(i);\n        button.style.setProperty("--petal-tilt", `${[-12, 9, -6, 14, -3][i % 5]}deg`);\n        if (piece.message) {\n          const caption = document.createElement("span");\n          caption.className = "flower-piece-note";\n          caption.textContent = piece.message;\n          button.append(caption);\n        }\n        button.setAttribute("aria-label", `Collect ${piece.label}`);\n        button.hidden = found.includes(piece.id) || unlocked;\n        button.disabled = button.hidden;\n        button.onclick = async () => {\n          if (busy || found.includes(piece.id)) return;\n          busy = true;\n          button.disabled = true;\n          found = [.../* @__PURE__ */ new Set([...readProgress(read(key), ids), ...found, piece.id])];\n          write(key, JSON.stringify(found));\n          const from = button.querySelector("svg").getBoundingClientRect();\n          const to = toggle.getBoundingClientRect();\n          const collectorVisible = to.top >= 0 && to.bottom <= innerHeight;\n          if (!reducedMotion()) {\n            const flight = document.createElement("div");\n            flight.className = "flower-flight";\n            flight.innerHTML = button.querySelector("svg").outerHTML;\n            flight.style.left = `${from.x}px`;\n            flight.style.top = `${from.y}px`;\n            document.body.append(flight);\n            try {\n              await flight.animate(\n                [\n                  { transform: "translate(0,0) rotate(-15deg)", opacity: 1 },\n                  {\n                    transform: collectorVisible ? `translate(${to.x - from.x + 15}px,${to.y - from.y + 10}px) rotate(${120 + i * 20}deg) scale(.55)` : "translate(0,-24px) rotate(25deg) scale(.55)",\n                    opacity: collectorVisible ? 0.7 : 0\n                  }\n                ],\n                { duration: 650, easing: "cubic-bezier(.3,.05,.2,1)" }\n              ).finished;\n            } catch {\n            } finally {\n              flight.remove();\n            }\n          }\n          unlocked = found.length === ids.length;\n          if (unlocked) write(key + ":complete", "true");\n          paint();\n          button.hidden = true;\n          live.textContent = unlocked ? "Your flower is complete. The hidden garden is open." : `${piece.label} collected. ${found.length} of ${ids.length} petals found.`;\n          collector.classList.remove("is-collecting", "is-blooming");\n          void collector.offsetWidth;\n          collector.classList.add(unlocked ? "is-blooming" : "is-collecting");\n          busy = false;\n          if (unlocked) {\n            const animations = toggle.getAnimations();\n            await Promise.allSettled(animations.map((animation) => animation.finished));\n            if (read(key + ":complete") === "true") {\n              try {\n                sessionStorage.setItem(key + ":celebrate", String(scrollY));\n              } catch {\n              }\n              location.reload();\n            } else {\n              document.documentElement.setAttribute("data-flower-unlocked", "");\n            }\n          } else {\n            collector.focus({ preventScroll: true });\n          }\n        };\n        const article = document.querySelector("article.popover-hint") ?? document.querySelector(".center article");\n        const anchor = piece.anchor ? document.getElementById(piece.anchor) : null;\n        let placement = anchor && article?.contains(anchor) ? anchor : null;\n        if (piece.afterParagraph && article) {\n          const children = placement ? [...placement.parentElement.children] : [...article.querySelectorAll("h1, h2, h3, h4, h5, h6, p")];\n          const start = placement ? children.indexOf(placement) + 1 : 0;\n          const section = children.slice(start);\n          const end = placement ? section.findIndex((node) => /^H[1-6]$/.test(node.tagName)) : -1;\n          const paragraphs = (end < 0 ? section : section.slice(0, end)).filter(\n            (node) => node.tagName === "P"\n          );\n          placement = paragraphs[piece.afterParagraph - 1] ?? placement;\n        }\n        if (placement) placement.insertAdjacentElement("afterend", button);\n        else article?.append(button);\n      }\n      try {\n        const celebration = sessionStorage.getItem(key + ":celebrate");\n        if (celebration !== null) {\n          sessionStorage.removeItem(key + ":celebrate");\n          requestAnimationFrame(() => scrollTo(0, Number(celebration) || 0));\n          collector.classList.add("is-blooming");\n          live.textContent = "Your flower is complete. The hidden garden is open.";\n          toggle.focus({ preventScroll: true });\n        }\n      } catch {\n      }\n    };\n    paint2 = paint, mount2 = mount;\n    window.__flowerHuntStarted = true;\n    const key = `garden-flower:${options.id}`;\n    const ids = options.pieces.map((p) => p.id);\n    const read = (name) => {\n      try {\n        const value = localStorage.getItem(name);\n        if (value !== null) return value;\n      } catch {\n      }\n      try {\n        return sessionStorage.getItem(name);\n      } catch {\n        return null;\n      }\n    };\n    const write = (name, value) => {\n      try {\n        localStorage.setItem(name, value);\n      } catch {\n        try {\n          sessionStorage.setItem(name, value);\n        } catch {\n        }\n      }\n    };\n    let found = readProgress(read(key), ids);\n    let unlocked = read(key + ":complete") === "true" || found.length === ids.length;\n    if (unlocked) document.documentElement.setAttribute("data-flower-unlocked", "");\n    const nativeFetch = window.fetch.bind(window);\n    window.fetch = (input, init) => {\n      const raw = input instanceof Request ? input.url : String(input);\n      const url = new URL(raw, document.baseURI);\n      if (unlocked && url.origin === location.origin && url.pathname.endsWith("/static/contentIndex.json")) {\n        url.pathname = url.pathname.replace(/contentIndex\\.json$/, "garden-flower-index.json");\n        return nativeFetch(input instanceof Request ? new Request(url, input) : url, init);\n      }\n      return nativeFetch(input, init);\n    };\n    const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;\n    let collector;\n    let toggle;\n    let live;\n    let busy = false;\n    const siteLink = (slug) => `${document.body.dataset.basepath ?? ""}/${normalizeSlug(slug)}`;\n    const art = () => flowerSvg(ids.length, unlocked ? ids : found, ids);\n    document.addEventListener("DOMContentLoaded", mount, { once: true });\n    document.addEventListener("nav", mount);\n    if (document.readyState !== "loading") mount();\n    window.addEventListener("storage", (event) => {\n      if (event.key === key || event.key === key + ":complete") {\n        const completed = read(key + ":complete") === "true";\n        if (completed !== unlocked) location.reload();\n        else {\n          found = readProgress(read(key), ids);\n          if (collector?.isConnected) paint();\n        }\n      }\n    });\n  }\n  var paint2;\n  var mount2;\n})();\n'

// site/flower-hunt/index.ts
var FlowerHunt = (settings) => {
  const options = validateOptions(settings)
  const component = () => null
  component.css = styles_default
  component.beforeDOMLoaded = `window.__flowerOptions=${JSON.stringify(options).replace(/</g, "\\u003c")};
${client_default}`
  const index = ContentIndex({ enableSiteMap: true, enableRSS: true, rssFullHtml: false })
  const emit = async (ctx, content, resources) => {
    if (ctx.cfg.configuration.enableSPA)
      throw new Error(
        "Flower Hunt currently requires enableSPA: false so all discovery surfaces refresh together",
      )
    if (ctx.cfg.plugins.emitters.some((plugin) => plugin.name === "ContentIndex"))
      throw new Error("Disable the standard ContentIndex emitter when using Flower Hunt")
    const slugs = content.map(([, file]) => normalizeSlug(file.data.slug ?? ""))
    for (const hiddenPath of options.hiddenPaths)
      if (!slugs.some((slug) => isHidden(slug, [hiddenPath])))
        throw new Error(`Flower Hunt hidden path does not exist: ${hiddenPath}`)
    for (const piece of options.pieces)
      if (!slugs.includes(normalizeSlug(piece.page)))
        throw new Error(`Flower Hunt piece page does not exist: ${piece.page}`)
    if (!slugs.includes(normalizeSlug(options.destination)))
      throw new Error(`Flower Hunt destination does not exist: ${options.destination}`)
    const visibleTags = /* @__PURE__ */ new Set()
    const hiddenTags = /* @__PURE__ */ new Set()
    for (const [, file] of content)
      for (const tag of file.data.frontmatter?.tags ?? []) {
        const target = isHidden(file.data.slug ?? "", options.hiddenPaths)
          ? hiddenTags
          : visibleTags
        const parts = tag.split("/")
        for (let i = 1; i <= parts.length; i++) target.add(parts.slice(0, i).join("/"))
      }
    const hiddenPaths = [
      ...options.hiddenPaths,
      ...[...hiddenTags].filter((tag) => !visibleTags.has(tag)).map((tag) => `tags/${tag}`),
    ]
    const publicContent = content
      .filter(([, file]) => !isHidden(file.data.slug ?? "", hiddenPaths))
      .map(([tree, file]) => [
        tree,
        {
          ...file,
          data: {
            ...file.data,
            links: (file.data.links ?? []).filter((link) => !isHidden(link, hiddenPaths)),
          },
        },
      ])
    const outputs = await index.emit(ctx, publicContent, resources)
    const fullIndex = Object.fromEntries(
      content
        .filter(([, file]) => file.data.unlisted !== true)
        .map(([, { data }]) => [
          data.slug,
          {
            slug: data.slug,
            filePath: data.relativePath,
            title: data.frontmatter?.title ?? "",
            links: data.links ?? [],
            tags: data.frontmatter?.tags ?? [],
            content: data.text ?? "",
          },
        ]),
    )
    const fullPath = path.join(ctx.argv.output, "static/garden-flower-index.json")
    await mkdir(path.dirname(fullPath), { recursive: true })
    await writeFile(fullPath, JSON.stringify(fullIndex))
    outputs.push(fullPath)
    for (const [, file] of content) {
      const slug = file.data.slug
      if (!slug) continue
      const filename = path.join(ctx.argv.output, `${slug}.html`)
      let html
      try {
        html = await readFile(filename, "utf8")
      } catch (error) {
        if (error.code === "ENOENT") continue
        throw error
      }
      await writeFile(
        filename,
        decorateHtml(
          html,
          slug,
          options,
          ctx.cfg.configuration.baseUrl ?? "localhost",
          hiddenPaths,
        ),
      )
      outputs.push(filename)
    }
    return outputs
  }
  return {
    name: "FlowerHunt",
    getQuartzComponents: () => [component],
    emit,
    partialEmit: (ctx, content, resources) => emit(ctx, content, resources),
  }
}
export { FlowerHunt }
