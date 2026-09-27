import type { HuntOptions } from "./model"
import { normalizeSlug, readProgress } from "./model"
import { flowerSvg, petalSvg } from "./art"

declare global {
  interface Window {
    __flowerOptions: HuntOptions
    __flowerHuntStarted?: boolean
  }
}
const options = window.__flowerOptions
if (!window.__flowerHuntStarted) {
  window.__flowerHuntStarted = true
  const key = `garden-flower:${options.id}`
  const ids = options.pieces.map((p) => p.id)
  const read = (name: string) => {
    try {
      const value = localStorage.getItem(name)
      if (value !== null) return value
    } catch {
      /* Fall back to session storage. */
    }
    try {
      return sessionStorage.getItem(name)
    } catch {
      return null
    }
  }
  const write = (name: string, value: string) => {
    try {
      localStorage.setItem(name, value)
    } catch {
      /* Fall back to session storage. */
      try {
        sessionStorage.setItem(name, value)
      } catch {
        /* Continue for this page only. */
      }
    }
  }
  let found = readProgress(read(key), ids)
  let unlocked = read(key + ":complete") === "true" || found.length === ids.length
  if (unlocked) document.documentElement.setAttribute("data-flower-unlocked", "")
  // Quartz's pre-script runs before fetchData is initialized. Only redirect its
  // exact same-origin content index request; all other fetches remain untouched.
  const nativeFetch = window.fetch.bind(window)
  window.fetch = (input, init) => {
    const raw = input instanceof Request ? input.url : String(input)
    const url = new URL(raw, document.baseURI)
    if (
      unlocked &&
      url.origin === location.origin &&
      url.pathname.endsWith("/static/contentIndex.json")
    ) {
      url.pathname = url.pathname.replace(/contentIndex\.json$/, "garden-flower-index.json")
      return nativeFetch(input instanceof Request ? new Request(url, input) : url, init)
    }
    return nativeFetch(input, init)
  }
  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches
  let collector: HTMLElement
  let toggle: HTMLButtonElement
  let live: HTMLElement
  let busy = false
  const siteLink = (slug: string) =>
    `${document.body.dataset.basepath ?? ""}/${normalizeSlug(slug)}`
  const art = () => flowerSvg(ids.length, unlocked ? ids : found, ids)
  function paint() {
    collector.toggleAttribute("data-complete", unlocked)
    toggle.innerHTML = `${art()}<span class="flower-count" aria-hidden="true">${unlocked ? ids.length : found.length}/${ids.length}</span>`
    toggle.disabled = !unlocked
    toggle.setAttribute(
      "aria-label",
      unlocked
        ? "Open the hidden garden"
        : `Your flower: ${found.length} of ${ids.length} petals found`,
    )
  }
  function mount() {
    if (!document.body || document.getElementById("flower-collector")) return
    collector = document.createElement("aside")
    collector.id = "flower-collector"
    collector.className = "flower-collector"
    collector.setAttribute("aria-label", "Garden flower collection")
    toggle = document.createElement("button")
    toggle.type = "button"
    toggle.onclick = () => {
      if (unlocked) location.assign(siteLink(options.destination))
    }
    live = document.createElement("span")
    live.className = "flower-sr"
    live.setAttribute("role", "status")
    live.setAttribute("aria-live", "polite")
    collector.tabIndex = -1
    collector.append(toggle, live)
    document.body.append(collector)
    paint()
    const page = normalizeSlug(document.body.dataset.slug ?? "")
    for (const [i, piece] of options.pieces.entries()) {
      if (normalizeSlug(piece.page) !== page) continue
      const button = document.createElement("button")
      button.type = "button"
      button.className = "flower-piece"
      button.dataset.pieceId = piece.id
      button.innerHTML = petalSvg(i)
      button.style.setProperty("--petal-tilt", `${[-12, 9, -6, 14, -3][i % 5]}deg`)
      if (piece.message) {
        const caption = document.createElement("span")
        caption.className = "flower-piece-note"
        caption.textContent = piece.message
        button.append(caption)
      }
      button.setAttribute("aria-label", `Collect ${piece.label}`)
      button.hidden = found.includes(piece.id) || unlocked
      button.disabled = button.hidden
      button.onclick = async () => {
        if (busy || found.includes(piece.id)) return
        busy = true
        button.disabled = true
        // Merge other-tab progress so simultaneous discoveries do not overwrite it.
        found = [...new Set([...readProgress(read(key), ids), ...found, piece.id])]
        write(key, JSON.stringify(found))
        const from = button.querySelector("svg")!.getBoundingClientRect()
        const to = toggle.getBoundingClientRect()
        // On mobile the flower lives below the footer. Keep feedback at the
        // discovered petal when that destination is offscreen; never move the reader.
        const collectorVisible = to.top >= 0 && to.bottom <= innerHeight
        if (!reducedMotion()) {
          const flight = document.createElement("div")
          flight.className = "flower-flight"
          flight.innerHTML = button.querySelector("svg")!.outerHTML
          flight.style.left = `${from.x}px`
          flight.style.top = `${from.y}px`
          document.body.append(flight)
          try {
            await flight.animate(
              [
                { transform: "translate(0,0) rotate(-15deg)", opacity: 1 },
                {
                  transform: collectorVisible
                    ? `translate(${to.x - from.x + 15}px,${to.y - from.y + 10}px) rotate(${120 + i * 20}deg) scale(.55)`
                    : "translate(0,-24px) rotate(25deg) scale(.55)",
                  opacity: collectorVisible ? 0.7 : 0,
                },
              ],
              { duration: 650, easing: "cubic-bezier(.3,.05,.2,1)" },
            ).finished
          } catch {
            /* Navigation may cancel an animation. */
          } finally {
            flight.remove()
          }
        }
        unlocked = found.length === ids.length
        if (unlocked) write(key + ":complete", "true")
        paint()
        button.hidden = true
        live.textContent = unlocked
          ? "Your flower is complete. The hidden garden is open."
          : `${piece.label} collected. ${found.length} of ${ids.length} petals found.`
        collector.classList.remove("is-collecting", "is-blooming")
        void collector.offsetWidth
        collector.classList.add(unlocked ? "is-blooming" : "is-collecting")
        busy = false
        if (unlocked) {
          // Reload once after the bloom to rebuild Explorer, search and graph from
          // the unlocked index together, without duplicating Quartz listeners.
          const animations = toggle.getAnimations()
          await Promise.allSettled(animations.map((animation) => animation.finished))
          if (read(key + ":complete") === "true") {
            try {
              sessionStorage.setItem(key + ":celebrate", String(scrollY))
            } catch {
              /* Optional presentation state. */
            }
            location.reload()
          } else {
            document.documentElement.setAttribute("data-flower-unlocked", "")
          }
        } else {
          collector.focus({ preventScroll: true })
        }
      }
      const article =
        document.querySelector("article.popover-hint") ?? document.querySelector(".center article")
      const anchor = piece.anchor ? document.getElementById(piece.anchor) : null
      let placement = anchor && article?.contains(anchor) ? anchor : null
      if (piece.afterParagraph && article) {
        // Count paragraphs only within the selected heading's section, or the
        // whole article when no heading is configured. Never alter source notes.
        const children = placement
          ? [...placement.parentElement!.children]
          : [...article.querySelectorAll("h1, h2, h3, h4, h5, h6, p")]
        const start = placement ? children.indexOf(placement) + 1 : 0
        const section = children.slice(start)
        const end = placement ? section.findIndex((node) => /^H[1-6]$/.test(node.tagName)) : -1
        const paragraphs = (end < 0 ? section : section.slice(0, end)).filter(
          (node) => node.tagName === "P",
        )
        placement = (paragraphs[piece.afterParagraph - 1] as HTMLElement) ?? placement
      }
      if (placement) placement.insertAdjacentElement("afterend", button)
      else article?.append(button)
    }
    try {
      const celebration = sessionStorage.getItem(key + ":celebrate")
      if (celebration !== null) {
        sessionStorage.removeItem(key + ":celebrate")
        requestAnimationFrame(() => scrollTo(0, Number(celebration) || 0))
        collector.classList.add("is-blooming")
        live.textContent = "Your flower is complete. The hidden garden is open."
        toggle.focus({ preventScroll: true })
      }
    } catch {
      /* No optional session state. */
    }
  }
  document.addEventListener("DOMContentLoaded", mount, { once: true })
  document.addEventListener("nav", mount)
  if (document.readyState !== "loading") mount()
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === key + ":complete") {
      const completed = read(key + ":complete") === "true"
      if (completed !== unlocked) location.reload()
      else {
        found = readProgress(read(key), ids)
        if (collector?.isConnected) paint()
      }
    }
  })
}
