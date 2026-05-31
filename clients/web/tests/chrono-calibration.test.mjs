/**
 * TDD test for the Chrono-Spatial Calibration experiment.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/chrono-calibration.astro")

let source
test("chrono-calibration.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page contains a singularity-core element", () => {
  assert.ok(
    source.includes("singularity-core") || source.includes("singularity"),
    "Should include a singularity-core or singularity element"
  )
})

test("page contains temporal-anchor elements", () => {
  assert.ok(
    source.includes("temporal-anchor") || source.includes("anchor-node"),
    "Should include temporal-anchor elements"
  )
})

test("page uses requestAnimationFrame for physics smoothing", () => {
  assert.ok(
    source.includes("requestAnimationFrame"),
    "Should use requestAnimationFrame for smooth interaction and physics"
  )
})

test("page initializes Web Audio API for spatial resonance", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize AudioContext for audio synthesis"
  )
  assert.ok(
    source.includes("panner") || source.includes("PannerNode") || source.includes("stereoPanner") || source.includes("StereoPannerNode"),
    "Should include spatial panning logic for spatial resonance"
  )
})

test("page uses native Popover API for HUD display", () => {
  assert.ok(
    source.includes("popover") && source.includes("popovertarget"),
    "Should use native Popover API to show anchor details"
  )
})

test("page uses CSS Anchor Positioning patterns", () => {
  assert.ok(
    source.includes("position-anchor") || source.includes("anchorName") || source.includes("anchor("),
    "Should use CSS Anchor Positioning properties or its polyfill configuration"
  )
})

test("page has a Bureau or official calibration structure and style", () => {
  assert.ok(
    source.includes("Calibration") || source.includes("Bureau") || source.includes("Chrono"),
    "Should have official chrono-spatial calibration styling and branding"
  )
})

test("page does not explain implementation details in the interface", () => {
  const lowercaseSource = source.toLowerCase()
  assert.ok(
    !lowercaseSource.includes("this page uses the web audio api") &&
    !lowercaseSource.includes("this is built with css anchor positioning"),
    "Should stand alone as an artwork without explaining its technical stack in the UI"
  )
})
