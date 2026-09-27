// Keep date parsing and rendered dates consistent on laptops and GitHub Actions.
// An IANA zone handles daylight saving time; do not replace it with a fixed offset.
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { verifyFlowerBuild } from "./flower-hunt/verify-build.mjs"

const root = fileURLToPath(new URL("../", import.meta.url))
const child = spawn(
  process.execPath,
  ["quartz/bootstrap-cli.mjs", "build", ...process.argv.slice(2)],
  {
    cwd: root,
    env: { ...process.env, TZ: "America/Los_Angeles" },
    stdio: "inherit",
  },
)

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal))
}

child.on("error", (error) => {
  console.error(error)
  process.exitCode = 1
})
child.on("exit", async (code, signal) => {
  process.exitCode = code ?? (signal === "SIGINT" ? 130 : 1)
  if (code === 0 && !process.argv.includes("--serve")) {
    const args = process.argv.slice(2)
    const outputFlag = args.findIndex((arg) => arg === "--output" || arg === "-o")
    const output =
      args.find((arg) => arg.startsWith("--output="))?.slice(9) ??
      (outputFlag >= 0 ? args[outputFlag + 1] : "public")
    try {
      await verifyFlowerBuild(root, path.resolve(root, output))
    } catch (error) {
      console.error(error)
      process.exitCode = 1
    }
  }
})
