/**
 * TDD test for the Voyager Telemetry Recalibrator experiment page.
 * Asserts page structure, calibration elements, and AudioContext presence.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/voyager-telemetry-recalibrator.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("voyager-telemetry-recalibrator.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a telemetry root container", () => {
  assert.ok(
    source.includes('id="telemetry-root"'),
    "Should include the main telemetry root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has a memory grid visualization", () => {
  assert.ok(
    source.includes('id="memory-grid"') || source.includes('class="memory-grid"'),
    "Should include a FDS memory grid element"
  )
})

test("page uses Web Audio API for telemetry static and tone synthesis", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the ambient/coherent tones"
  )
})

test("page has a carrier frequency dial/slider", () => {
  assert.ok(
    source.includes('id="frequency-slider"') || source.includes('id="carrier-slider"'),
    "Should include a dial or slider to tune carrier frequency"
  )
})

test("page contains the remapping button", () => {
  assert.ok(
    source.includes('id="remap-btn"') || source.includes('id="reallocate-btn"'),
    "Should include a button to remap the corrupted memory partition"
  )
})

test("experiments index contains reference to voyager-telemetry-recalibrator", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("voyager-telemetry-recalibrator"),
    "Should register the new slug in the experiments list"
  )
})
