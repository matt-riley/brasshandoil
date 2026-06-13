/**
 * TDD test for the Viscoelastic Rice Lock experiment page.
 * Asserts page structure, calibration hubs, and AudioContext presence.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/viscoelastic-rice-lock.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("viscoelastic-rice-lock.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a viscoelastic root container", () => {
  assert.ok(
    source.includes('id="viscoelastic-root"'),
    "Should include the main viscoelastic root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has interactive canvases for starch simulation and background", () => {
  assert.ok(
    source.includes('id="interaction-canvas"') || source.includes('id="starch-canvas"'),
    "Should include canvas elements for visual representation of starch particles"
  )
})

test("page uses Web Audio API for non-Newtonian sloshing and resonant chords", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the ambient/coherent tones"
  )
})

test("page has density structure selectors for medium, dense, and oatmeal states", () => {
  assert.ok(
    source.includes('data-density="medium"') &&
    source.includes('data-density="dense"') &&
    source.includes('data-density="oatmeal"'),
    "Should support medium, dense, and oatmeal density modes"
  )
})

test("page contains shear velocity calibration checks", () => {
  assert.ok(
    source.includes("SPEED_LIMIT") || source.includes("shear") || source.includes("velocity"),
    "Should track and evaluate shear velocity limits"
  )
})

test("experiments index contains reference to viscoelastic-rice-lock", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("viscoelastic-rice-lock"),
    "Should register the new slug in the experiments list"
  )
})
