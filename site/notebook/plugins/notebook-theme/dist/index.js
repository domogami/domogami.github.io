// site/notebook/theme.inline.ts
var theme_inline_default =
  '"use strict";\n(() => {\n  // site/notebook/navigation.ts\n  function prepareExplorerScroll() {\n    try {\n      if (sessionStorage.getItem("explorerScrollTop") === null) {\n        sessionStorage.setItem("explorerScrollTop", "0");\n      }\n    } catch {\n    }\n    window.addEventListener("pagehide", () => {\n      const tree = document.querySelector(".explorer-ul");\n      if (!tree) return;\n      try {\n        sessionStorage.setItem("explorerScrollTop", String(tree.scrollTop));\n      } catch {\n      }\n    });\n  }\n\n  // site/notebook/theme.inline.ts\n  prepareExplorerScroll();\n  var modes = ["light", "dark", "blended"];\n  var labels = { light: "Light", dark: "Dark", blended: "Hybrid" };\n  var isNotebookMode = (value) => modes.includes(value);\n  var notebookMode = "blended";\n  var readingMode = false;\n  function readPreferences() {\n    try {\n      const saved = localStorage.getItem("notebook-theme");\n      notebookMode = isNotebookMode(saved) ? saved : "blended";\n      readingMode = localStorage.getItem("notebook-reading") === "on";\n    } catch {\n    }\n  }\n  function applyPreferences() {\n    const root = document.documentElement;\n    const themeChanged = root.dataset.notebookTheme !== notebookMode;\n    const theme = notebookMode === "dark" ? "dark" : "light";\n    root.setAttribute("saved-theme", theme);\n    root.dataset.notebookTheme = notebookMode;\n    root.dataset.notebookReading = readingMode ? "on" : "off";\n    const next = modes[(modes.indexOf(notebookMode) + 1) % modes.length];\n    document.querySelectorAll(".notebook-theme").forEach((button) => {\n      button.setAttribute("aria-label", `Theme: ${labels[notebookMode]}. Switch to ${labels[next]}`);\n      button.title = `Switch to ${labels[next]} theme`;\n    });\n    document.querySelectorAll(".notebook-reading").forEach((button) => {\n      const label = readingMode ? "Exit reading mode" : "Enter reading mode";\n      button.setAttribute("aria-label", label);\n      button.setAttribute("aria-pressed", String(readingMode));\n      button.title = label;\n    });\n    if (themeChanged) document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));\n  }\n  function savePreferences() {\n    try {\n      localStorage.setItem("notebook-theme", notebookMode);\n      localStorage.setItem("theme", notebookMode === "dark" ? "dark" : "light");\n      localStorage.setItem("notebook-reading", readingMode ? "on" : "off");\n    } catch {\n    }\n  }\n  function cycleTheme(direction = 1) {\n    notebookMode = modes[(modes.indexOf(notebookMode) + direction + modes.length) % modes.length];\n    applyPreferences();\n    savePreferences();\n  }\n  readPreferences();\n  applyPreferences();\n  document.addEventListener("DOMContentLoaded", applyPreferences, { once: true });\n  document.addEventListener("nav", applyPreferences);\n  window.addEventListener("pageshow", () => {\n    readPreferences();\n    applyPreferences();\n  });\n  window.addEventListener("storage", (event) => {\n    if (event.key === null || ["notebook-theme", "notebook-reading"].includes(event.key)) {\n      readPreferences();\n      applyPreferences();\n    }\n  });\n  document.addEventListener("click", (event) => {\n    if (!(event.target instanceof Element)) return;\n    if (event.target.closest(".notebook-theme")) cycleTheme();\n    if (event.target.closest(".notebook-reading")) {\n      readingMode = !readingMode;\n      applyPreferences();\n      savePreferences();\n    }\n  });\n  document.addEventListener("keydown", (event) => {\n    if (!(event.target instanceof Element) || !event.target.closest(".notebook-theme")) return;\n    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {\n      event.preventDefault();\n      cycleTheme(event.key === "ArrowRight" ? 1 : -1);\n    }\n  });\n})();\n'

// site/notebook/NotebookTheme.tsx
import { jsx, jsxs } from "preact/jsx-runtime"
var NotebookTheme = () =>
  /* @__PURE__ */ jsxs("div", {
    class: "notebook-controls",
    children: [
      /* @__PURE__ */ jsx("button", {
        type: "button",
        class: "notebook-theme",
        "aria-label": "Change notebook theme",
        children: /* @__PURE__ */ jsxs("svg", {
          class: "theme-orbit",
          viewBox: "0 0 32 32",
          "aria-hidden": "true",
          focusable: "false",
          children: [
            /* @__PURE__ */ jsx("g", {
              class: "theme-rays",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.6",
              "stroke-linecap": "round",
              children: /* @__PURE__ */ jsx("path", {
                d: "M16 3v3m0 20v3M3 16h3m20 0h3M7 7l2 2m14 14 2 2M7 25l2-2M23 9l2-2",
              }),
            }),
            /* @__PURE__ */ jsx("circle", {
              class: "theme-disc",
              cx: "16",
              cy: "16",
              r: "8",
              fill: "currentColor",
            }),
            /* @__PURE__ */ jsx("circle", { class: "theme-shade", cx: "16", cy: "16", r: "8" }),
            /* @__PURE__ */ jsx("path", {
              class: "theme-horizon",
              d: "M5 22h22M10 26h12",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.6",
              "stroke-linecap": "round",
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx("button", {
        type: "button",
        class: "notebook-reading",
        "aria-label": "Enter reading mode",
        "aria-pressed": "false",
        title: "Enter reading mode",
        children: /* @__PURE__ */ jsx("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true",
          focusable: "false",
          children: /* @__PURE__ */ jsx("path", {
            d: "M12 5v15M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z",
          }),
        }),
      }),
    ],
  })
NotebookTheme.beforeDOMLoaded = theme_inline_default
var NotebookTheme_default = () => NotebookTheme
export { NotebookTheme_default as NotebookTheme }
