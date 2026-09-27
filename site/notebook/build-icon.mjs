import sharp from "sharp"
import { fileURLToPath } from "node:url"

// Keep the portable SVG as the source of truth. Quartz's standard head and
// favicon emitter consume icon.png; a full site build regenerates favicon.ico.
const source = fileURLToPath(new URL("../../quartz/static/garden-logo.svg", import.meta.url))
const target = fileURLToPath(new URL("../../quartz/static/icon.png", import.meta.url))
await sharp(source).resize(512, 512).png().toFile(target)
console.log("Generated garden favicon from garden-logo.svg")
