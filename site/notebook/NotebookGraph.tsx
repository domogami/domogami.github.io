import { Graph, type GraphOptions } from "@quartz-community/graph"
import { enhanceGraph } from "./graph/enhance"

/**
 * Keep the community component's markup, navigation and lifecycle. Version 0.1.0
 * has no renderer extension API, so these four checked seams install our small
 * renderer enhancement. Fail at build time if an upstream update changes them.
 * See graph/README.md before upgrading the graph package.
 */
export default function NotebookGraph(options?: GraphOptions) {
  const component = Graph(options)
  let script = component.afterDOMLoaded as string
  const replaceOnce = (needle: string, replacement: string) => {
    if (script.split(needle).length !== 2) {
      throw new Error("NotebookGraph: upstream renderer changed; review graph/README.md")
    }
    script = script.replace(needle, () => replacement)
  }
  // Upstream strips /index but retains its slash, while the current page URL
  // has no trailing slash. Normalize both forms so folder notes keep their edges.
  replaceOnce(
    'function Fu(u){let e=_t(ft(u,"index"),!0);',
    'function Fu(u){let e=_t(ft(u,"index"),!1);',
  )
  replaceOnce(
    "if(fu){var Je=",
    `var notebookGraph=(${enhanceGraph.toString()})({container:d,app:Z,nodes:L,simulation:au,d3:a,width:R,height:O,global:Vu<0,scale:qu,transform:()=>P});if(fu){var Je=`,
  )
  replaceOnce(
    "a.select(Z.canvas).call(et)",
    "a.select(Z.canvas).call(et).call(et.transform,a.zoomIdentity.translate(notebookGraph.x,notebookGraph.y).scale(notebookGraph.k))",
  )
  replaceOnce("se=!0,au.stop();", "se=!0,au.stop();notebookGraph.cleanup();")
  component.afterDOMLoaded = script
  return component
}
