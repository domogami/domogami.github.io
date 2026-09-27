// site/notebook/NotebookGraph.tsx
import { Graph } from "@quartz-community/graph"

// site/notebook/graph/enhance.ts
function enhanceGraph(context) {
  const { container, app, nodes, simulation, d3, width, height } = context
  const attraction = context.global ? 0.1 : 0.08
  simulation.force("notebook-x", d3.forceX().strength(attraction))
  simulation.force("notebook-y", d3.forceY().strength(attraction))
  nodes.forEach(({ simulationData: node }, index) => {
    const angle = index * Math.PI * (3 - Math.sqrt(5))
    const radius = 8 * Math.sqrt(index)
    node.x = Math.cos(angle) * radius
    node.y = Math.sin(angle) * radius
    node.vx = node.vy = 0
  })
  simulation.tick(240)
  simulation.alpha(0.03)
  const xs = nodes.map(({ simulationData }) => simulationData.x)
  const ys = nodes.map(({ simulationData }) => simulationData.y)
  const left = Math.min(0, ...xs),
    right = Math.max(0, ...xs)
  const top = Math.min(0, ...ys),
    bottom = Math.max(0, ...ys)
  const k =
    Math.max(
      0.25,
      Math.min(
        1.8,
        (width - 56) / Math.max(1, right - left),
        (height - 56) / Math.max(1, bottom - top),
      ),
    ) * context.scale
  const tooltip = document.createElement("div")
  tooltip.className = "notebook-graph-label"
  tooltip.setAttribute("role", "tooltip")
  tooltip.hidden = true
  container.append(tooltip)
  let hovered
  const hide = () => {
    hovered = void 0
    tooltip.hidden = true
  }
  const position = () => {
    if (!hovered) return
    const transform = context.transform()
    const x = (hovered.simulationData.x + width / 2) * transform.k + transform.x
    const y = (hovered.simulationData.y + height / 2) * transform.k + transform.y
    if (x < 0 || x > width || y < 0 || y > height) {
      tooltip.hidden = true
      return
    }
    tooltip.hidden = false
    const w = tooltip.offsetWidth,
      h = tooltip.offsetHeight
    tooltip.style.left = `${Math.max(8, Math.min(width - w - 8, x - w / 2))}px`
    tooltip.style.top = `${Math.max(8, Math.min(height - h - 8, y - h - 14 < 8 ? y + 16 : y - h - 14))}px`
  }
  for (const node of nodes) {
    node.label.visible = false
    node.gfx.on("pointerover", () => {
      hovered = node
      tooltip.textContent = node.simulationData.text
      position()
    })
    node.gfx.on("pointerleave", hide)
  }
  container.addEventListener("pointerleave", hide)
  container.addEventListener("pointerdown", hide)
  app.ticker.add(position)
  return {
    k,
    x: width / 2 - ((left + right) / 2 + width / 2) * k,
    y: height / 2 - ((top + bottom) / 2 + height / 2) * k,
    cleanup() {
      app.ticker.remove(position)
      container.removeEventListener("pointerleave", hide)
      container.removeEventListener("pointerdown", hide)
      tooltip.remove()
    },
  }
}

// site/notebook/NotebookGraph.tsx
function NotebookGraph(options) {
  const component = Graph(options)
  let script = component.afterDOMLoaded
  const replaceOnce = (needle, replacement) => {
    if (script.split(needle).length !== 2) {
      throw new Error("NotebookGraph: upstream renderer changed; review graph/README.md")
    }
    script = script.replace(needle, () => replacement)
  }
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
export { NotebookGraph }
