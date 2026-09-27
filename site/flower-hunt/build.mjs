import { build } from "esbuild"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { format, resolveConfig } from "prettier"
import { fileURLToPath } from "node:url"
const root = fileURLToPath(new URL("./", import.meta.url))
const client = await build({
  entryPoints: [root + "client.ts"],
  bundle: true,
  write: false,
  format: "iife",
  platform: "browser",
  target: "es2022",
})
await mkdir(root + "plugin/dist", { recursive: true })
await build({
  entryPoints: [root + "index.ts"],
  outfile: root + "plugin/dist/index.js",
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2022",
  packages: "external",
  loader: { ".css": "text" },
  plugins: [
    {
      name: "client",
      setup(builder) {
        builder.onResolve({ filter: /^flower-hunt:client$/ }, () => ({
          path: "client",
          namespace: "flower",
        }))
        builder.onLoad({ filter: /.*/, namespace: "flower" }, () => ({
          contents: `export default ${JSON.stringify(client.outputFiles[0].text)}`,
        }))
      },
    },
  ],
})
await writeFile(
  root + "plugin/dist/index.d.ts",
  // Quartz discovers exports from a declaration export list, including the index types
  // its file tree expects even when the standard ContentIndex emitter is disabled.
  'import type { QuartzEmitterPlugin } from "@quartz-community/types"\nimport type { ContentDetails, ContentIndexMap } from "@quartz-community/content-index"\ninterface HuntOptions { id: string; hiddenPaths: string[]; destination: string; pieces: { id: string; page: string; label: string; anchor?: string; afterParagraph?: number; message?: string }[] }\ndeclare const FlowerHunt: QuartzEmitterPlugin<HuntOptions>\nexport { FlowerHunt, type HuntOptions, type ContentDetails, type ContentIndexMap }\n',
)
for (const file of ["index.js", "index.d.ts"]) {
  const filepath = root + "plugin/dist/" + file
  await writeFile(
    filepath,
    await format(await readFile(filepath, "utf8"), {
      ...(await resolveConfig(filepath)),
      filepath,
    }),
  )
}
console.log("Built Flower Hunt plugin")
