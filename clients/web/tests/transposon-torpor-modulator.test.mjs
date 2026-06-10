/**
 * TDD test for the Transposon Torpor Modulator experiment page.
 * Asserts page structure, canvas requirements, and AudioContext presence.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/transposon-torpor-modulator.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("transposon-torpor-modulator.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a modulator dashboard root container", () => {
  assert.ok(
    source.includes('id="modulator-root"'),
    "Should include the main modulator root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="torpor-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has a canvas element for cellular energy particles", () => {
  assert.ok(
    source.includes("<canvas") && source.includes("getContext"),
    "Should include a canvas element and script context reference"
  )
})

test("page uses Web Audio API for sonic depth", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the ambient/heartbeat tones"
  )
})

test("page contains transposon/jumping-gene layout elements", () => {
  assert.ok(
    source.includes("transposon") || source.includes("jumping-gene"),
    "Should include references to transposon nodes or CSS classes"
  )
})

test("page has a button that promises acceleration but worsens torpor", () => {
  assert.ok(
    source.includes('id="reset-btn"') || source.includes("ACCELERATE") || source.includes("OVERCLOCK"),
    "Should include a button that claims to accelerate metabolic rate"
  )
})

test("experiments index contains reference to transposon-torpor-modulator", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("transposon-torpor-modulator"),
    "Should register the new slug in the experiments list"
  )
})
