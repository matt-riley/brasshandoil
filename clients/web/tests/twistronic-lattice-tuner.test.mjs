/**
 * TDD test for the Twistronic Lattice Tuner experiment page.
 * Asserts page structure, calibration dials, and AudioContext presence.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/twistronic-lattice-tuner.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("twistronic-lattice-tuner.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a calibration root container", () => {
  assert.ok(
    source.includes('id="calibration-root"'),
    "Should include the main calibration root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has a rotary dial or controller", () => {
  assert.ok(
    source.includes('id="rotary-dial"') || source.includes('class="rotary-dial"'),
    "Should include a rotary dial element for twisting layers"
  )
})

test("page uses Web Audio API for sonic depth and FM synthesis", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the ambient/coherent tones"
  )
})

test("page has pattern selectors for honeycomb, fresnel, and penrose lattices", () => {
  assert.ok(
    source.includes('data-pattern="honeycomb"') &&
    source.includes('data-pattern="fresnel"') &&
    source.includes('data-pattern="penrose"'),
    "Should support at least honeycomb, fresnel, and penrose lattice options"
  )
})

test("page contains the magic angle calibration target", () => {
  assert.ok(
    source.includes("1.1") || source.includes("magic-angle"),
    "Should mention or target the magic angle of 1.1 degrees"
  )
})

test("experiments index contains reference to twistronic-lattice-tuner", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("twistronic-lattice-tuner"),
    "Should register the new slug in the experiments list"
  )
})
