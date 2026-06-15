/**
 * TDD test for the Brackish Groundwater Choir experiment page.
 * Asserts page structure, hydrologic controls, Web Audio initialization, and registration.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/brackish-groundwater-choir.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("brackish-groundwater-choir.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch (err) {
    assert.fail("Astro file must be created: " + err.message)
  }
})

test("page has a brackish root container", () => {
  assert.ok(
    source.includes('id="brackish-root"'),
    "Should include the main brackish root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has an interactive canvas for aquifer simulation", () => {
  assert.ok(
    source.includes('id="aquifer-canvas"'),
    "Should include a canvas element for rendering the groundwater table and saltwater wedge"
  )
})

test("page uses Web Audio API for harmonic choir synthesis", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the ambient/saline drone voices"
  )
})

test("page has controls for hydraulic head recharge and well extraction", () => {
  assert.ok(
    source.includes('id="recharge-slider"') || source.includes('recharge'),
    "Should support hydraulic head recharge control"
  )
  assert.ok(
    source.includes('class="well-switch"') || source.includes('well'),
    "Should support well extraction switches"
  )
})

test("page contains salinity thresholds or calculations", () => {
  assert.ok(
    source.includes("salinity") || source.includes("intrusion") || source.includes("halocline"),
    "Should model salinity / saltwater intrusion physics"
  )
})

test("experiments index contains reference to brackish-groundwater-choir", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("brackish-groundwater-choir"),
    "Should register the new slug in the experiments list"
  )
})
