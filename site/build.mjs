// Keep date parsing and rendered dates consistent on laptops and GitHub Actions.
// An IANA zone handles daylight saving time; do not replace it with a fixed offset.
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"

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
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal === "SIGINT" ? 130 : 1)
})
