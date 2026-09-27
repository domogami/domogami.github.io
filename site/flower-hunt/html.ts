import { fromHtml } from "hast-util-from-html"
import { toHtml } from "hast-util-to-html"
import type { Element, Root } from "hast"
import { isHidden, type HuntOptions } from "./model"

const element = (
  tagName: string,
  properties: Element["properties"],
  children: Element["children"] = [],
): Element => ({ type: "element", tagName, properties, children })
/** Decorate emitted HTML without patching Quartz's renderer or changing notes. */
export function decorateHtml(
  html: string,
  slug: string,
  options: HuntOptions,
  baseUrl: string,
  hiddenPaths = options.hiddenPaths,
): string {
  const tree = fromHtml(html)
  let body: Element | undefined
  let head: Element | undefined
  const classes = (node: Element) =>
    Array.isArray(node.properties.className) ? node.properties.className : []
  const walk = (node: Root | Element, ancestors: Element[] = []) => {
    for (const child of node.children) {
      if (child.type !== "element") continue
      if (child.tagName === "body") body = child
      if (child.tagName === "head") head = child
      // Idempotent for Quartz's incremental builds.
      if (child.properties.dataFlowerGenerated !== undefined) continue
      if (child.tagName === "a" && typeof child.properties.href === "string") {
        const origin = new URL(`https://${baseUrl.replace(/\/$/, "")}/`)
        const url = new URL(child.properties.href, new URL(slug, origin))
        const basePath = origin.pathname.replace(/\/$/, "")
        if (
          url.origin === origin.origin &&
          url.pathname.startsWith(basePath + "/") &&
          isHidden(url.pathname.slice(basePath.length), hiddenPaths)
        ) {
          child.properties.dataFlowerHidden = ""
          const row = [...ancestors].reverse().find((parent) => parent.tagName === "li")
          // Hide list rows, including their dates/bullets; inline prose stays intact.
          if (row) row.properties.dataFlowerHidden = ""
          const embed = [...ancestors]
            .reverse()
            .find((parent) => classes(parent).includes("transclude"))
          if (embed) embed.properties.dataFlowerHidden = ""
        }
      }
      walk(child, [...ancestors, child])
    }
  }
  walk(tree)
  if (isHidden(slug, hiddenPaths)) {
    if (
      head &&
      !head.children.some((node) => node.type === "element" && node.properties.name === "robots")
    )
      head.children.push(
        element("meta", {
          name: "robots",
          content: "noindex, nofollow, noarchive",
          dataFlowerGenerated: "",
        }),
      )
    if (body) {
      body.properties.dataFlowerPage = ""
      const addGate = (node: Element) => {
        if (
          classes(node).includes("center") &&
          !node.children.some((n) => n.type === "element" && classes(n).includes("flower-gate"))
        ) {
          node.children.unshift(
            element("section", {
              className: ["flower-gate"],
              dataFlowerGenerated: "",
              ariaLabel: "Hidden garden",
            }),
          )
        }
        for (const child of node.children) if (child.type === "element") addGate(child)
      }
      addGate(body)
    }
  }
  // Folder counts should match what is visible before and after discovering the flower.
  const fixCounts = (node: Root | Element) => {
    if (node.type === "element" && classes(node).includes("page-listing")) {
      const rows: Element[] = []
      const collect = (n: Element) => {
        for (const c of n.children)
          if (c.type === "element") {
            if (classes(c).includes("section-li")) rows.push(c)
            else collect(c)
          }
      }
      collect(node)
      const hidden = rows.filter((row) => row.properties.dataFlowerHidden !== undefined).length
      const count = node.children.find((c) => c.type === "element" && c.tagName === "p") as
        Element | undefined
      if (hidden && count && count.properties.dataFlowerGenerated === undefined) {
        const original = count.children
        count.children = [
          element("span", { dataFlowerLocked: "" }, [
            {
              type: "text",
              value: `${rows.length - hidden} ${rows.length - hidden === 1 ? "item" : "items"} under this folder.`,
            },
          ]),
          element("span", { dataFlowerHidden: "" }, original),
        ]
        count.properties.dataFlowerGenerated = ""
      }
    }
    for (const child of node.children) if (child.type === "element") fixCounts(child)
  }
  fixCounts(tree)
  return toHtml(tree, { allowDangerousHtml: true })
}
