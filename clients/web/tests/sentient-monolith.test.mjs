/**
 * TDD test for the Sentient Monolith experiment page.
 * Uses Node's built-in test runner to assert the page structure and core APIs.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/sentient-monolith.astro")

let source
test("sentient-monolith.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a monolith container", () => {
  assert.ok(
    source.includes('id="monolith"'),
    "Should include the main monolith container"
  )
})

test("page listens for pointer movement", () => {
  assert.ok(
    source.includes("pointermove"),
    "Should track pointer for interactions"
  )
})

test("page uses variable font properties", () => {
  assert.ok(
    source.includes("font-variation-settings"),
    "Should use variable font properties like wght or wdth"
  )
})

test("page uses Web Audio API", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the hum"
  )
})

test("page creates an oscillator node", () => {
  assert.ok(
    source.includes("createOscillator"),
    "Should create an oscillator for the hum sound"
  )
})
