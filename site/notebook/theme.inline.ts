import { prepareExplorerScroll } from "./navigation"

prepareExplorerScroll()

type NotebookMode = "light" | "dark" | "blended"
const modes: NotebookMode[] = ["light", "dark", "blended"]
const labels = { light: "Light", dark: "Dark", blended: "Hybrid" }
const isNotebookMode = (value: string | null): value is NotebookMode =>
  modes.includes(value as NotebookMode)

let notebookMode: NotebookMode = "blended"
let readingMode = false

function readPreferences() {
  try {
    // Quartz seeds its legacy `theme` key with dark even for first-time visitors.
    // Only a notebook preference represents an explicit choice in our three-theme UI.
    const saved = localStorage.getItem("notebook-theme")
    notebookMode = isNotebookMode(saved) ? saved : "blended"
    readingMode = localStorage.getItem("notebook-reading") === "on"
  } catch {
    // Storage can be unavailable; the controls still work for this page.
  }
}

function applyPreferences() {
  const root = document.documentElement
  const themeChanged = root.dataset.notebookTheme !== notebookMode
  const theme = notebookMode === "dark" ? "dark" : "light"
  root.setAttribute("saved-theme", theme)
  root.dataset.notebookTheme = notebookMode
  root.dataset.notebookReading = readingMode ? "on" : "off"
  const next = modes[(modes.indexOf(notebookMode) + 1) % modes.length]
  document.querySelectorAll<HTMLButtonElement>(".notebook-theme").forEach((button) => {
    button.setAttribute("aria-label", `Theme: ${labels[notebookMode]}. Switch to ${labels[next]}`)
    button.title = `Switch to ${labels[next]} theme`
  })
  document.querySelectorAll<HTMLButtonElement>(".notebook-reading").forEach((button) => {
    const label = readingMode ? "Exit reading mode" : "Enter reading mode"
    button.setAttribute("aria-label", label)
    button.setAttribute("aria-pressed", String(readingMode))
    button.title = label
  })
  // Graph colors follow theme changes, including changes from another tab.
  if (themeChanged) document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }))
}

function savePreferences() {
  try {
    localStorage.setItem("notebook-theme", notebookMode)
    localStorage.setItem("theme", notebookMode === "dark" ? "dark" : "light")
    localStorage.setItem("notebook-reading", readingMode ? "on" : "off")
  } catch {
    // Keep the selected state in memory when persistence is unavailable.
  }
}

function cycleTheme(direction = 1) {
  notebookMode = modes[(modes.indexOf(notebookMode) + direction + modes.length) % modes.length]
  applyPreferences()
  savePreferences()
}

// Runs in the head before paint, then refreshes labels when the page exists.
readPreferences()
applyPreferences()
document.addEventListener("DOMContentLoaded", applyPreferences, { once: true })
document.addEventListener("nav", applyPreferences)
window.addEventListener("pageshow", () => {
  readPreferences()
  applyPreferences()
})
window.addEventListener("storage", (event) => {
  if (event.key === null || ["notebook-theme", "notebook-reading"].includes(event.key)) {
    readPreferences()
    applyPreferences()
  }
})

// Delegation binds once per document, avoiding duplicate handlers on navigation.
// Native buttons supply Enter/Space activation; arrows allow reversible cycling.
document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return
  if (event.target.closest(".notebook-theme")) cycleTheme()
  if (event.target.closest(".notebook-reading")) {
    readingMode = !readingMode
    applyPreferences()
    savePreferences()
  }
})
document.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element) || !event.target.closest(".notebook-theme")) return
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault()
    cycleTheme(event.key === "ArrowRight" ? 1 : -1)
  }
})
