/**
 * TDD test for the Homepage (index.astro).
 * Asserts the page contains a link to Antigravity alongside Claude and Codex.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/index.astro")

let source
test("index.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("homepage links to Antigravity, Claude, and Codex", () => {
  assert.match(source, /Antigravity/i, "Should mention Antigravity")
  assert.match(source, /Claude/i, "Should mention Claude")
  assert.match(source, /Codex/i, "Should mention Codex")
  assert.ok(
    source.includes("https://deepmind.google"),
    "Should link to Antigravity (deepmind.google)"
  )
})
