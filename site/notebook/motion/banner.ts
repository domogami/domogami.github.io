import { motion } from "./config"
import type { Reveal } from "./controller"
import { prepareInk, writeInk } from "./ink"

// Folded ribbon geometry from the portfolio's DrawnBanner, kept separate from animation logic.
const paths = [
  ["tail", "M57 30 4 30 24 49 5 72 81 72 81 55M263 30 316 30 296 49 315 72 239 72 239 55"],
  ["fold", "M57 55 81 72 81 55ZM263 55 239 72 239 55Z"],
  ["face", "M57 8Q157 5 263 8L263 55Q157 52 57 55Z"],
] as const

export function decorateBanner(heading: HTMLElement): HTMLElement {
  const existing = heading.querySelector<HTMLElement>(".notebook-banner-label")
  if (existing) return existing
  heading.classList.add("notebook-banner")
  const label = document.createElement("span")
  label.className = "notebook-banner-label"
  label.append(...heading.childNodes)
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("viewBox", "0 0 320 80")
  svg.setAttribute("preserveAspectRatio", "none")
  svg.setAttribute("aria-hidden", "true")
  svg.setAttribute("focusable", "false")
  for (const [part, geometry] of paths) {
    const path = document.createElementNS(svg.namespaceURI, "path")
    path.setAttribute("class", `notebook-banner-${part}`)
    path.setAttribute("d", geometry)
    path.setAttribute("pathLength", "1")
    svg.append(path)
  }
  heading.append(svg, label)
  return label
}

export function bannerReveal(heading: HTMLElement, label: HTMLElement): Reveal {
  const letters = prepareInk(label)
  return (delay, animate) => {
    for (const path of heading.querySelectorAll<SVGPathElement>("svg path")) {
      animate(path, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
        duration: motion.outline,
        delay,
        easing: "ease-out",
      })
      animate(
        path,
        [
          { fillOpacity: 0 },
          { fillOpacity: path.classList.contains("notebook-banner-fold") ? 0.3 : 1 },
        ],
        {
          duration: motion.fill,
          delay: delay + motion.outline,
          easing: "ease-out",
        },
      )
    }
    writeInk(letters, delay + motion.labelStart, animate)
  }
}
