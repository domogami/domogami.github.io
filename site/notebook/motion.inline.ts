import { MotionController } from "./motion/controller"
import { motion, targets } from "./motion/config"
import { decorateBanner, bannerReveal } from "./motion/banner"
import { prepareInk, writeInk } from "./motion/ink"
import { prepareTasks } from "./motion/tasks"
import { mountExplorerMotion } from "./motion/explorer"

let dispose: (() => void) | undefined

function mountMotion() {
  dispose?.()
  const marker = document.querySelector<HTMLElement>("[data-notebook-motion-page]")
  if (!marker) return
  const reduced = matchMedia("(prefers-reduced-motion: reduce)")
  const disposeExplorer = mountExplorerMotion(reduced, marker.dataset.notebookMotionPage !== "off")
  const controller = new MotionController()
  const enabled =
    marker.dataset.notebookMotionPage !== "off" &&
    !reduced.matches &&
    !location.hash &&
    typeof Element.prototype.animate === "function" &&
    typeof Intl.Segmenter === "function"

  const scan = () => {
    for (const { input, label } of prepareTasks()) {
      if (!enabled || !input.checked || label.closest(targets.optOut)) continue
      controller.observe(label, (delay, animate) => {
        if (!input.checked) return
        animate(label, [{ backgroundSize: "0% 1.5px" }, { backgroundSize: "100% 1.5px" }], {
          duration: motion.taskStrike,
          delay,
          easing: "ease-out",
        })
      })
    }
    for (const heading of document.querySelectorAll<HTMLElement>(targets.banner)) {
      const label = decorateBanner(heading) // Reduced motion still gets the finished ribbon.
      if (enabled && !heading.closest(targets.optOut) && !heading.dataset.notebookMotionSeen) {
        controller.observe(heading, bannerReveal(heading, label))
      }
    }
    if (!enabled) return
    for (const annotation of document.querySelectorAll<HTMLElement>(targets.annotation)) {
      if (annotation.closest(targets.optOut) || annotation.dataset.notebookMotionSeen) continue
      controller.observe(annotation, (delay, animate) => {
        writeInk(prepareInk(annotation), delay, animate)
      })
    }
    for (const header of document.querySelectorAll<HTMLElement>(targets.entrance)) {
      if (header.closest(targets.optOut)) continue
      controller.observe(header, (delay, animate) =>
        animate(header, [{ opacity: 0.7 }, { opacity: 1 }], {
          duration: motion.entrance,
          delay,
          easing: "ease-out",
        }),
      )
    }
  }
  const finish = () => controller.finish()
  const preference = () => {
    if (reduced.matches) finish()
  }
  const find = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") finish()
  }
  document.addEventListener("render", scan)
  document.addEventListener("focusin", finish)
  document.addEventListener("keydown", find)
  window.addEventListener("hashchange", finish)
  window.addEventListener("beforeprint", finish)
  reduced.addEventListener("change", preference)
  dispose = () => {
    disposeExplorer()
    finish()
    document.removeEventListener("render", scan)
    document.removeEventListener("focusin", finish)
    document.removeEventListener("keydown", find)
    window.removeEventListener("hashchange", finish)
    window.removeEventListener("beforeprint", finish)
    reduced.removeEventListener("change", preference)
  }
  window.addCleanup(dispose)
  scan()
}

document.addEventListener("nav", mountMotion)
