import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types"
// @ts-ignore
import script from "./theme.inline"

// One continuous sun/moon silhouette; CSS animates its shade, rays and horizon.
const NotebookTheme: QuartzComponent = () => (
  <div class="notebook-controls">
    <button type="button" class="notebook-theme" aria-label="Change notebook theme">
      <svg class="theme-orbit" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <g
          class="theme-rays"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        >
          <path d="M16 3v3m0 20v3M3 16h3m20 0h3M7 7l2 2m14 14 2 2M7 25l2-2M23 9l2-2" />
        </g>
        <circle class="theme-disc" cx="16" cy="16" r="8" fill="currentColor" />
        <circle class="theme-shade" cx="16" cy="16" r="8" />
        <path
          class="theme-horizon"
          d="M5 22h22M10 26h12"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <button
      type="button"
      class="notebook-reading"
      aria-label="Enter reading mode"
      aria-pressed="false"
      title="Enter reading mode"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 5v15M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z" />
      </svg>
    </button>
  </div>
)

NotebookTheme.beforeDOMLoaded = script
export default (() => NotebookTheme) satisfies QuartzComponentConstructor
