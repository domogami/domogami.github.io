import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types"
// @ts-ignore -- bundled into a browser script by build.mjs
import script from "./motion.inline"

const NotebookMotion: QuartzComponent = ({ fileData }) => (
  <span
    hidden
    data-notebook-motion-page={fileData.frontmatter?.notebookMotion === false ? "off" : "on"}
  />
)
NotebookMotion.afterDOMLoaded = script
export default (() => NotebookMotion) satisfies QuartzComponentConstructor
