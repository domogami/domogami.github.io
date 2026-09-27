import { motion } from "./config"

export type Animate = (
  element: Element,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
) => void
export type Reveal = (delay: number, animate: Animate) => void

/** One observer and one owned animation registry per page. Styles are visible by default. */
export class MotionController {
  private observer: IntersectionObserver | undefined
  private jobs = new Map<HTMLElement, Reveal>()
  private animations = new Set<Animation>()
  private stopped = false

  constructor() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting)
          visible.sort((a, b) =>
            a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
          )
          visible.forEach((entry, index) => {
            const target = entry.target as HTMLElement
            this.observer?.unobserve(target)
            this.run(target, Math.min(index * motion.stagger, motion.maxStagger))
          })
        },
        { threshold: 0.15 },
      )
    }
  }

  observe(element: HTMLElement, reveal: Reveal) {
    if (this.stopped || element.dataset.notebookMotionSeen || this.jobs.has(element)) return
    if (!this.observer) {
      element.dataset.notebookMotionSeen = "true"
      return // Unsupported browser: retain the completed content.
    }
    this.jobs.set(element, reveal)
    element.dataset.notebookMotionState = "waiting"
    this.observer.observe(element)
  }

  private run(element: HTMLElement, delay: number) {
    const reveal = this.jobs.get(element)
    this.jobs.delete(element)
    if (!reveal || this.stopped) return
    element.dataset.notebookMotionSeen = "true"
    element.dataset.notebookMotionState = "running"
    const batch: Animation[] = []
    const animate: Animate = (target, frames, options) => {
      const animation = target.animate(frames, { fill: "backwards", ...options })
      batch.push(animation)
      this.animations.add(animation)
      // Default CSS is the completed state; remove finished effects and their resources.
      void animation.finished.then(
        () => {
          this.animations.delete(animation)
          animation.cancel()
        },
        () => {
          this.animations.delete(animation)
        },
      )
    }
    try {
      reveal(delay, animate)
    } catch {
      batch.forEach((animation) => animation.cancel())
    }
    void Promise.allSettled(batch.map((animation) => animation.finished)).then(() => {
      element.dataset.notebookMotionState = "complete"
    })
  }

  /** Also used for reduced motion, print, focus, Find, and hash navigation. */
  finish() {
    this.stopped = true
    this.observer?.disconnect()
    for (const element of this.jobs.keys()) element.dataset.notebookMotionState = "complete"
    this.jobs.clear()
    for (const animation of this.animations) animation.cancel()
    this.animations.clear()
  }
}
