/** Animate the standard Explorer toggle without replacing its state or handlers. */
export function mountExplorerMotion(reduced: MediaQueryList, enabled: boolean) {
  const running = new Map<HTMLElement, Animation[]>()
  const reset = (panel: HTMLElement) => {
    const animations = running.get(panel)
    running.delete(panel)
    animations?.forEach((animation) => animation.cancel())
    delete panel.dataset.notebookExplorerMotion
    panel.inert = panel.parentElement?.classList.contains("collapsed") ?? false
  }
  const finish = () => running.forEach((_, panel) => reset(panel))
  const toggle = (event: MouseEvent) => {
    const button = (event.target as Element).closest?.(".explorer-toggle")
    const explorer = button?.closest<HTMLElement>(".explorer")
    const panel = explorer?.querySelector<HTMLElement>(":scope > .explorer-content")
    if (!explorer || !panel) return
    const wasCollapsed = explorer.classList.contains("collapsed")
    const previousHeight = panel.getBoundingClientRect().height
    const previousStyle = getComputedStyle(panel)
    const previousPadding = previousStyle.paddingBlock
    const previousMargin = previousStyle.marginBlock

    // Capture runs before Quartz's handler; this runs after its class update.
    queueMicrotask(() => {
      if (!panel.isConnected || wasCollapsed === explorer.classList.contains("collapsed")) return
      reset(panel)
      const opening = !explorer.classList.contains("collapsed")
      panel.inert = !opening
      if (!enabled || reduced.matches || typeof panel.animate !== "function") return
      const naturalStyle = getComputedStyle(panel)
      const targetHeight = opening ? panel.getBoundingClientRect().height : 0
      const padding = naturalStyle.paddingBlock
      const margin = naturalStyle.marginBlock
      panel.dataset.notebookExplorerMotion = opening ? "opening" : "closing"
      const animations: Animation[] = []
      running.set(panel, animations)
      animations.push(
        panel.animate(
          [
            {
              height: `${previousHeight}px`,
              paddingBlock: previousHeight ? previousPadding : "0px",
              marginBlock: previousHeight ? previousMargin : "0px",
            },
            {
              height: `${targetHeight}px`,
              paddingBlock: opening ? padding : "0px",
              marginBlock: opening ? margin : "0px",
            },
          ],
          { duration: opening ? 320 : 230, easing: "cubic-bezier(.22,.8,.25,1)", fill: "both" },
        ),
      )

      // Only animate visible top-level rows; nested folder state stays untouched.
      const rows = [...panel.querySelectorAll<HTMLElement>(":scope > .explorer-ul > li")].filter(
        (row) => !row.classList.contains("overflow-end"),
      )
      rows.forEach((row, index) => {
        const delay = Math.min(
          opening ? index * 18 : (rows.length - index - 1) * 10,
          opening ? 108 : 50,
        )
        animations.push(
          row.animate(
            opening
              ? [
                  { opacity: 0, transform: "translate(-7px, -3px) rotate(-.4deg)" },
                  { opacity: 1, transform: "translate(1px, 0) rotate(.1deg)", offset: 0.8 },
                  { opacity: 1, transform: "none" },
                ]
              : [
                  { opacity: 1, transform: "none" },
                  { opacity: 0, transform: "translate(-5px, -2px)" },
                ],
            { duration: opening ? 210 : 130, delay, easing: "ease-out", fill: "both" },
          ),
        )
      })
      void Promise.all(animations.map((animation) => animation.finished.catch(() => {}))).then(
        () => {
          if (running.get(panel) === animations) reset(panel)
        },
      )
    })
  }
  document.addEventListener("click", toggle, true)
  reduced.addEventListener("change", finish)
  window.addEventListener("resize", finish)
  window.addEventListener("beforeprint", finish)
  return () => {
    finish()
    document.removeEventListener("click", toggle, true)
    reduced.removeEventListener("change", finish)
    window.removeEventListener("resize", finish)
    window.removeEventListener("beforeprint", finish)
  }
}
