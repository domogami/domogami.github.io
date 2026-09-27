// Quartz Explorer calls activeLink.scrollIntoView() when this session value is absent.
// That scrolls the document as well as the tree on full-page navigation. Initialize its
// supported restoration path before Explorer mounts; never reset the document scroll,
// so fragment links and the browser's Back/Forward restoration remain native.
export function prepareExplorerScroll() {
  try {
    if (sessionStorage.getItem("explorerScrollTop") === null) {
      sessionStorage.setItem("explorerScrollTop", "0")
    }
  } catch {
    // Storage may be unavailable. Navigation itself should remain functional.
  }
  window.addEventListener("pagehide", () => {
    const tree = document.querySelector<HTMLElement>(".explorer-ul")
    if (!tree) return
    try {
      sessionStorage.setItem("explorerScrollTop", String(tree.scrollTop))
    } catch {
      // Keep ordinary navigation working when session storage is unavailable.
    }
  })
}
