import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { createServer } from "node:net"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, "..")
const workerBundlePath = resolve(projectRoot, "dist/server")

function getMjsFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true })

  return entries.flatMap((entry) => {
    const fullPath = resolve(directory, entry.name)

    if (entry.isDirectory()) {
      return getMjsFiles(fullPath)
    }

    return fullPath.endsWith(".mjs") ? [fullPath] : []
  })
}

function canBindEphemeralPort() {
  try {
    const server = createServer()
    return new Promise((resolvePromise) => {
      server.once("error", () => resolvePromise(false))
      server.listen(0, "127.0.0.1", () => {
        server.close(() => resolvePromise(true))
      })
    })
  } catch {
    return Promise.resolve(false)
  }
}

test("cloudflare worker bundle avoids runtime sharp usage", async (t) => {
  if (process.env.CI !== "true") {
    // Some sandboxed/dev environments disallow opening listen sockets at all (EPERM),
    // which can break Cloudflare/Vite internals during `pnpm build`. Skip locally.
    const ok = await canBindEphemeralPort()
    if (!ok) {
      t.skip("Environment disallows network listen")
      return
    }
  }

  rmSync(resolve(projectRoot, "dist"), { force: true, recursive: true })

  execFileSync("pnpm", ["build"], {
    cwd: projectRoot,
    stdio: "pipe",
  })

  assert.ok(existsSync(workerBundlePath), "Expected Astro build to emit server output")

  const filesToCheck = getMjsFiles(workerBundlePath)

  for (const filePath of filesToCheck) {
    const bundle = readFileSync(filePath, "utf8")

    assert.doesNotMatch(
      bundle,
      /getReport\(\)|requireSharp|sharp\/lib\/libvips|detect-libc|astro\/assets\/services\/sharp/i,
      `Worker bundle should not include Cloudflare-incompatible sharp runtime code: ${filePath}`
    )
  }
})
