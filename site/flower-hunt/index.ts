import { ContentIndex } from "@quartz-community/content-index"
// Preserve the index types Quartz's generated plugin registry exposes to its file tree.
export type { ContentDetails, ContentIndexMap } from "@quartz-community/content-index"
import type { QuartzEmitterPlugin, QuartzComponent, FilePath } from "@quartz-community/types"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { isHidden, normalizeSlug, validateOptions, type HuntOptions } from "./model"
import { decorateHtml } from "./html"
// @ts-ignore — embedded by build.mjs
import css from "./styles.css"
// @ts-ignore — bundled browser entry, embedded by build.mjs
import browserScript from "flower-hunt:client"

/** One configurable emitter owns discovery indexes, HTML decoration, and resources. */
export const FlowerHunt: QuartzEmitterPlugin<HuntOptions> = (settings) => {
  const options = validateOptions(settings!)
  const component: QuartzComponent = () => null
  component.css = css
  component.beforeDOMLoaded = `window.__flowerOptions=${JSON.stringify(options).replace(/</g, "\\u003c")};\n${browserScript}`
  const index = ContentIndex({ enableSiteMap: true, enableRSS: true, rssFullHtml: false })
  const emit: ReturnType<typeof FlowerHunt>["emit"] = async (ctx, content, resources) => {
    if (ctx.cfg.configuration.enableSPA)
      throw new Error(
        "Flower Hunt currently requires enableSPA: false so all discovery surfaces refresh together",
      )
    if (
      (ctx.cfg.plugins as { emitters: { name: string }[] }).emitters.some(
        (plugin) => plugin.name === "ContentIndex",
      )
    )
      throw new Error("Disable the standard ContentIndex emitter when using Flower Hunt")
    const slugs = content.map(([, file]) => normalizeSlug(file.data.slug ?? ""))
    for (const hiddenPath of options.hiddenPaths)
      if (!slugs.some((slug) => isHidden(slug, [hiddenPath])))
        throw new Error(`Flower Hunt hidden path does not exist: ${hiddenPath}`)
    for (const piece of options.pieces)
      if (!slugs.includes(normalizeSlug(piece.page)))
        throw new Error(`Flower Hunt piece page does not exist: ${piece.page}`)
    if (!slugs.includes(normalizeSlug(options.destination)))
      throw new Error(`Flower Hunt destination does not exist: ${options.destination}`)
    // Hide tag pages whose only members belong to the hidden area as well.
    const visibleTags = new Set<string>()
    const hiddenTags = new Set<string>()
    for (const [, file] of content)
      for (const tag of file.data.frontmatter?.tags ?? []) {
        const target = isHidden(file.data.slug ?? "", options.hiddenPaths)
          ? hiddenTags
          : visibleTags
        const parts = tag.split("/")
        for (let i = 1; i <= parts.length; i++) target.add(parts.slice(0, i).join("/"))
      }
    const hiddenPaths = [
      ...options.hiddenPaths,
      ...[...hiddenTags].filter((tag) => !visibleTags.has(tag)).map((tag) => `tags/${tag}`),
    ]
    const publicContent = content
      .filter(([, file]) => !isHidden(file.data.slug ?? "", hiddenPaths))
      .map(
        ([tree, file]) =>
          [
            tree,
            {
              ...file,
              data: {
                ...file.data,
                links: (file.data.links ?? []).filter((link) => !isHidden(link, hiddenPaths)),
              },
            },
          ] as (typeof content)[number],
      )
    const outputs = (await index.emit(ctx, publicContent, resources)) as FilePath[]
    // Publicly readable by design, requested only after browser-local completion.
    // Mirror the community ContentIndex fields; exclude independently unlisted notes.
    const fullIndex = Object.fromEntries(
      content
        .filter(([, file]) => file.data.unlisted !== true)
        .map(([, { data }]) => [
          data.slug,
          {
            slug: data.slug,
            filePath: data.relativePath,
            title: data.frontmatter?.title ?? "",
            links: data.links ?? [],
            tags: data.frontmatter?.tags ?? [],
            content: data.text ?? "",
          },
        ]),
    )
    const fullPath = path.join(ctx.argv.output, "static/garden-flower-index.json") as FilePath
    await mkdir(path.dirname(fullPath), { recursive: true })
    await writeFile(fullPath, JSON.stringify(fullIndex))
    outputs.push(fullPath)
    // Quartz 5 emits pages before other emitters, including during incremental builds.
    // Decorate only generated page files; never read or mutate the source vault.
    for (const [, file] of content) {
      const slug = file.data.slug
      if (!slug) continue
      const filename = path.join(ctx.argv.output, `${slug}.html`) as FilePath
      let html: string
      try {
        html = await readFile(filename, "utf8")
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") continue
        throw error
      }
      await writeFile(
        filename,
        decorateHtml(
          html,
          slug,
          options,
          ctx.cfg.configuration.baseUrl ?? "localhost",
          hiddenPaths,
        ),
      )
      outputs.push(filename)
    }
    return outputs
  }
  return {
    name: "FlowerHunt",
    getQuartzComponents: () => [component],
    emit,
    partialEmit: (ctx, content, resources) => emit(ctx, content, resources) as Promise<FilePath[]>,
  }
}
