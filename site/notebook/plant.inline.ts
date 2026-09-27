document.addEventListener("nav", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  for (const button of document.querySelectorAll<HTMLButtonElement>(".notebook-plant")) {
    const replay = () => {
      if (reducedMotion.matches) return
      const brand = button.closest(".notebook-brand")
      if (!brand) return
      for (const animation of brand.getAnimations({ subtree: true })) {
        animation.cancel()
        animation.play()
      }
    }
    const pointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") replay()
    }
    button.addEventListener("click", replay)
    button.addEventListener("pointerenter", pointerEnter)
    window.addCleanup(() => {
      button.removeEventListener("click", replay)
      button.removeEventListener("pointerenter", pointerEnter)
    })
  }
})
