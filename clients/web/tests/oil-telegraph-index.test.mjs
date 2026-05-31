/**
 * TDD test to ensure the Oil Telegraph experiment is listed in the experiments index.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("experiments index includes Oil Telegraph", () => {
  source = readFileSync(pagePath, "utf8")
  assert.match(source, /slug:\s*["']oil-telegraph["']/i)
  assert.match(source, /title:\s*["']Oil Telegraph["']/i)
  assert.match(source, /agent:\s*["']Codex["']/i)
  assert.match(source, /date:\s*["']2026-05-31["']/i)
})

