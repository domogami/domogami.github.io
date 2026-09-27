import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types"
import { pathToRoot } from "@quartz-community/utils"
import { NotebookName } from "./NotebookName"
// @ts-ignore
import script from "./plant.inline"

// SVG geometry and drawing sequence adapted from the portfolio's GardenPlant.
const NotebookBrand: QuartzComponent = ({ fileData, cfg }) => (
  <div class="page-title notebook-brand">
    <button
      type="button"
      class="notebook-plant"
      aria-label="Replay plant and name drawing animation"
    >
      <svg viewBox="0 0 120 144" fill="none" aria-hidden="true" focusable="false">
        <path
          class="plant-stem"
          pathLength="1"
          d="M59 104Q65 91 61 77Q64 65 61 57Q59 53 59 49Q55 40 61 33Q61 21 67 13M61 77Q44 69 23 53M61 57Q80 45 92 26"
        />
        <path class="plant-leaf leaf-one" pathLength="1" d="M59 49Q35 46 35 20Q60 20 59 49Z" />
        <path class="plant-leaf leaf-two" pathLength="1" d="M61 57Q61 30 92 26Q94 50 61 57Z" />
        <path class="plant-leaf leaf-three" pathLength="1" d="M61 77Q32 79 23 53Q52 51 61 77Z" />
        <path class="plant-leaf leaf-four" pathLength="1" d="M61 33Q57 11 79 6Q85 25 61 33Z" />
        <path
          class="plant-pot"
          pathLength="1"
          d="M34 103Q61 100 87 103L80 134Q60 139 42 134ZM31 94Q60 91 90 94L89 103Q60 106 32 103Z"
        />
        <path class="plant-detail" pathLength="1" d="M47 113 50 126M37 140Q61 143 85 140" />
      </svg>
    </button>
    <a href={fileData.slug ? pathToRoot(fileData.slug) : "."} aria-label={cfg.pageTitle}>
      <NotebookName />
    </a>
  </div>
)
NotebookBrand.afterDOMLoaded = script
export default (() => NotebookBrand) satisfies QuartzComponentConstructor
