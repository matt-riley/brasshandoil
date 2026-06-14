/**
 * TDD test for the Arctic Dropstone Deposition Desk experiment page.
 * Uses Node's built-in test runner.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/arctic-dropstone-deposition-desk.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("arctic-dropstone-deposition-desk.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has an initialization overlay and button", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an arming overlay wrapper"
  )
  assert.ok(
    source.includes('id="arm-button"'),
    "Should include an initialization button to start the system"
  )
})

test("page has core meters and offset displays", () => {
  assert.ok(
    source.includes('id="temp-display"'),
    "Should include a Heat Index telemetry display"
  )
  assert.ok(
    source.includes('id="melt-rate-display"'),
    "Should include Glacial Runoff telemetry display"
  )
  assert.ok(
    source.includes('id="offset-display"'),
    "Should include Biodiversity Offset percentage display"
  )
})

test("page has four accretion bay indicator elements for Playwright TDD", () => {
  assert.ok(source.includes('id="bay-indicator-A"'), "Should contain Bay A")
  assert.ok(source.includes('id="bay-indicator-B"'), "Should contain Bay B")
  assert.ok(source.includes('id="bay-indicator-C"'), "Should contain Bay C")
  assert.ok(source.includes('id="bay-indicator-D"'), "Should contain Bay D")
})

test("page has clickable inventory cards to drop debris", () => {
  assert.ok(source.includes('id="debris-granite"'), "Should include Granite Erratic card")
  assert.ok(source.includes('id="debris-basalt"'), "Should include Basalt Nodule card")
  assert.ok(source.includes('id="debris-shale"'), "Should include Shale card")
  assert.ok(source.includes('id="debris-silt"'), "Should include Glacial Silt card")
})

test("page implements audio synthesis using Web Audio API", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should instantiate AudioContext"
  )
})

test("page carries the satire without naming browser APIs in copy", () => {
  const lowercaseSource = source.toLowerCase()
  assert.ok(
    !lowercaseSource.includes("web audio api") &&
    !lowercaseSource.includes("web audio"),
    "Should not leak implementation technology names in user-facing copy"
  )
})

test("experiments index includes Arctic Dropstone Deposition Desk", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']arctic-dropstone-deposition-desk["']/i)
  assert.match(indexSource, /title:\s*["']Arctic Dropstone Deposition Desk["']/i)
  assert.match(indexSource, /agent:\s*["']Antigravity["']/i)
})
