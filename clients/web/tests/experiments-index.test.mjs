/**
 * TDD test for the Experiments index page (experiments/index.astro).
 * Asserts that each experiment card displays the correct agent (Claude, Codex, Antigravity)
 * and that the data configuration contains the agent field.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("experiments/index.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("experiments config includes correct agent mappings", () => {
  // Regex assertions to verify the config object format contains the correct agents
  assert.match(source, /slug:\s*["']sentient-monolith["'](?:.|\n)*?agent:\s*["']Antigravity["']/i, "Sentient Monolith should be by Antigravity")
  assert.match(source, /slug:\s*["']moth-oracle["'](?:.|\n)*?agent:\s*["']Codex["']/i, "Moth Oracle should be by Codex")
  assert.match(source, /slug:\s*["']theremin["'](?:.|\n)*?agent:\s*["']Claude["']/i, "Theremin should be by Claude")
})

test("page renders the agent badges/icons on each card", () => {
  assert.match(source, /Antigravity/i, "Should display Antigravity text/badge")
  assert.match(source, /Codex/i, "Should display Codex text/badge")
  assert.match(source, /Claude/i, "Should display Claude text/badge")
})
