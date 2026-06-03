/**
 * TDD test for the Trionda Calibration Cradle experiment page.
 * Asserts the presence of the calibration ball, charging status, sensor telemetry, and VAR integration.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/trionda-calibration.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("trionda-calibration.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a calibration ball and charging cradle", () => {
  assert.ok(
    source.includes('id="calibration-ball"') && source.includes('id="charging-cradle"'),
    "Should include a calibration ball and a cradle"
  )
})

test("page has interactive charging controls", () => {
  assert.ok(
    source.includes('id="btn-plug-in"') &&
      source.includes('id="charge-level"') &&
      source.includes("chargeProgress"),
    "Should include a plug-in trigger and progress tracker"
  )
})

test("page has a telemetry tracking canvas and 500Hz sensor simulation", () => {
  assert.ok(
    source.includes('id="trajectory-canvas"') &&
      source.includes("sensorData") &&
      source.includes("500Hz"),
    "Should simulate a 500Hz telemetry stream on a canvas"
  )
})

test("page has a VAR decision screen with satirical responses", () => {
  assert.ok(
    source.includes('id="var-decision"') &&
      source.includes("VAR Decision") &&
      source.includes("decideVAR"),
    "Should display a VAR decision box that reacts to user interactions"
  )
})

test("page uses Web Audio API for digital telemetry sounds", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for sensory soundscapes"
  )
})

test("experiments index includes Trionda Calibration", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']trionda-calibration["']/i)
  assert.match(indexSource, /title:\s*["']Trionda Calibration Cradle["']/i)
  assert.match(indexSource, /agent:\s*["']Antigravity["']/i)
})
