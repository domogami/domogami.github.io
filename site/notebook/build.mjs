import { build } from "esbuild"
import { format, resolveConfig } from "prettier"
import { readFile, mkdir, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("./", import.meta.url))
const entries = {
  "notebook-brand": "NotebookBrand",
  "notebook-theme": "NotebookTheme",
  "notebook-motion": "NotebookMotion",
  "notebook-graph": "NotebookGraph",
}
for (const [name, exportName] of Object.entries(entries)) {
  const directory = `${root}plugins/${name}`
  await mkdir(`${directory}/dist`, { recursive: true })
  const component = {
    name,
    displayName: exportName,
    description: "Personal notebook component for Dom Lee's digital garden",
    version: "1.0.0",
  }
  const manifest = {
    name: `@domlee/${name}`,
    version: "1.0.0",
    private: true,
    type: "module",
    exports: {
      ".": { types: "./dist/index.d.ts", import: "./dist/index.js" },
      "./components": { types: "./dist/index.d.ts", import: "./dist/index.js" },
    },
    quartz: {
      ...component,
      category: ["component"],
      quartzVersion: ">=5.0.0 <6.0.0",
      components: { [exportName]: component },
    },
  }
  await writeFile(`${directory}/package.json`, JSON.stringify(manifest, null, 2) + "\n")
  await writeFile(
    `${directory}/dist/index.d.ts`,
    `import type { QuartzComponentConstructor } from "@quartz-community/types"\nexport declare const ${exportName}: QuartzComponentConstructor\n`,
  )
  await build({
    stdin: {
      contents: `export { default as ${exportName} } from "./${exportName}.tsx"`,
      resolveDir: root,
      sourcefile: `${name}.ts`,
      loader: "ts",
    },
    outfile: `${directory}/dist/index.js`,
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    packages: "external",
    jsx: "automatic",
    jsxImportSource: "preact",
    plugins: [
      {
        name: "notebook-inline-scripts",
        setup(bundler) {
          bundler.onResolve({ filter: /\.inline$/ }, (args) => ({
            path: `${args.resolveDir}/${args.path}.ts`,
          }))
          bundler.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
            const script = await build({
              entryPoints: [args.path],
              bundle: true,
              write: false,
              format: "iife",
              platform: "browser",
              target: "es2022",
            })
            return { contents: script.outputFiles[0].text, loader: "text" }
          })
        },
      },
    ],
  })
  for (const file of ["index.js", "index.d.ts"]) {
    const filepath = `${directory}/dist/${file}`
    await writeFile(
      filepath,
      await format(await readFile(filepath, "utf8"), {
        ...(await resolveConfig(filepath)),
        filepath,
      }),
    )
  }
}
console.log(`Built ${Object.keys(entries).length} local notebook components`)
