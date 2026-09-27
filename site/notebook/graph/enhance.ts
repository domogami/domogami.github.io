// Minimal structural types for the CDN-owned D3/Pixi objects. No second copy of
// either renderer is bundled. This function is serialized; keep it self-contained.
interface GraphNode {
  simulationData: { x: number; y: number; vx: number; vy: number; text: string }
  label: { visible: boolean }
  gfx: { on(event: string, callback: () => void): void }
}
interface Context {
  container: HTMLElement
  app: { ticker: { add(callback: () => void): void; remove(callback: () => void): void } }
  nodes: GraphNode[]
  simulation: {
    force(name: string, force: unknown): Context["simulation"]
    tick(iterations: number): void
    alpha(value: number): Context["simulation"]
  }
  d3: {
    forceX(): { strength(value: number): unknown }
    forceY(): { strength(value: number): unknown }
  }
  width: number
  height: number
  global: boolean
  scale: number
  transform(): { x: number; y: number; k: number }
}

export function enhanceGraph(context: Context) {
  const { container, app, nodes, simulation, d3, width, height } = context
  // Centering translates a whole network; x/y forces also bring disconnected
  // notes inward. Keep those notes discoverable instead of filtering them out.
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
  // Settle before first paint: no explosion from random viewport-wide positions.
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

  // A DOM label stays crisp and the same size at every zoom. It is above all
  // canvas edges, wraps long titles, and never intercepts dragging or clicking.
  const tooltip = document.createElement("div")
  tooltip.className = "notebook-graph-label"
  tooltip.setAttribute("role", "tooltip")
  tooltip.hidden = true
  container.append(tooltip)
  let hovered: GraphNode | undefined
  const hide = () => {
    hovered = undefined
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
