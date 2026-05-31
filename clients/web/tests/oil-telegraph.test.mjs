/**
 * TDD test for the Oil Telegraph experiment page.
 * Asserts a minimal structure + the core interaction primitives exist in source.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/oil-telegraph.astro")

let source
test("oil-telegraph.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a telegraph stage container", () => {
  assert.ok(
    source.includes('id="telegraph-stage"'),
    "Should include the visual stage container"
  )
})

test("page has a telegraph key control", () => {
  assert.ok(
    source.includes('id="telegraph-key"'),
    "Should include the telegraph key control"
  )
})

test("page contains a readout for decoded signal", () => {
  assert.ok(
    source.includes('id="signal-readout"'),
    "Should include a decoded signal readout"
  )
})

test("page reacts to press + release pointer events", () => {
  assert.ok(
    source.includes("pointerdown") && source.includes("pointerup"),
    "Should listen for pointer down/up"
  )
})

test("page uses Web Audio to generate a tone", () => {
  assert.ok(
    source.includes("AudioContext") && source.includes("OscillatorNode"),
    "Should reference AudioContext + an oscillator"
  )
})

test("page schedules animation frames for UI feedback", () => {
  assert.ok(
    source.includes("requestAnimationFrame"),
    "Should animate press feedback"
  )
})

test("page persists some state between visits", () => {
  assert.ok(
    source.includes("localStorage"),
    "Should persist calibration or history in localStorage"
  )
})

