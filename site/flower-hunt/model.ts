/** Paths are published URL slugs, never vault paths or Markdown filenames. */
export interface HuntOptions {
  id: string
  hiddenPaths: string[]
  destination: string
  pieces: {
    id: string
    page: string
    label: string
    anchor?: string
    afterParagraph?: number
    message?: string
  }[]
}
export function normalizeSlug(value: string): string {
  return decodeURIComponent(value.split(/[?#]/)[0])
    .replace(/^\/+|\/+$/g, "")
    .replace(/(?:\/index|\.html)$/, "")
}
export function isHidden(slug: string, paths: string[]): boolean {
  const value = normalizeSlug(slug)
  return paths.some((path) => {
    const root = normalizeSlug(path)
    return value === root || value.startsWith(root + "/")
  })
}
export function validateOptions(options: HuntOptions): HuntOptions {
  if (
    !options?.id ||
    !options.hiddenPaths?.length ||
    !options.pieces?.length ||
    options.pieces.length > 8
  )
    throw new Error("Flower Hunt needs an id, hiddenPaths, and 1–8 pieces")
  const paths = [...options.hiddenPaths, options.destination, ...options.pieces.map((p) => p.page)]
  if (
    paths.some(
      (p) => !p || /[?#\\]|(^|\/)\.\.?($|\/)|:/.test(decodeURIComponent(p)) || !normalizeSlug(p),
    )
  )
    throw new Error(
      "Flower Hunt paths must be site-relative URL slugs without queries or traversal",
    )
  if (
    new Set(options.pieces.map((p) => p.id)).size !== options.pieces.length ||
    options.pieces.some((p) => !p.id || !p.label)
  )
    throw new Error("Flower Hunt pieces need unique IDs and accessible labels")
  if (
    !isHidden(options.destination, options.hiddenPaths) ||
    options.pieces.some((p) => isHidden(p.page, options.hiddenPaths))
  )
    throw new Error("Flower Hunt destination must be hidden and all piece pages must be public")
  if (
    options.pieces.some(
      (p) =>
        p.afterParagraph !== undefined &&
        (!Number.isInteger(p.afterParagraph) || p.afterParagraph < 1),
    )
  )
    throw new Error("Flower Hunt afterParagraph must be a positive integer")
  return options
}
export function readProgress(raw: string | null, ids: string[]): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]")
    return Array.isArray(value)
      ? [...new Set(value.filter((id): id is string => typeof id === "string" && ids.includes(id)))]
      : []
  } catch {
    return []
  }
}
