import sharp from "sharp"
import { fileURLToPath } from "node:url"

// The standalone SVG is the editable source. Export a PNG because messaging
// link previews need a raster image, without browser/font/network dependencies.
const source = fileURLToPath(new URL("../../quartz/static/garden-preview.svg", import.meta.url))
const output = fileURLToPath(new URL("../../quartz/static/og-image.png", import.meta.url))
await sharp(source).resize(1200, 630).png().toFile(output)
console.log("Generated static/og-image.png (1200 × 630) from garden-preview.svg")
