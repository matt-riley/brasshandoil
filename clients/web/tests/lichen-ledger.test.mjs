/**
 * TDD contract for the Lichen Ledger experiment.
 * It asserts that the file exists, has a ledger element,
 * can be inoculated, and does not leak API terminology in the copy.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/lichen-ledger.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("lichen-ledger.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch (err) {
    assert.fail("lichen-ledger.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a canvas-backed lichen overlay", () => {
  assert.ok(
    source.includes('id="lichen-canvas"') &&
      source.includes("getContext") &&
      source.includes("requestAnimationFrame"),
    "Should include an interactive lichen canvas with animation loop"
  )
})

test("ledger contains asset entries and rewild controls", () => {
  assert.ok(
    source.includes('id="ledger-table"') &&
      source.includes('id="symbiosis-pct"') &&
      source.includes('id="spore-count"'),
    "Should include the main ledger table and dynamic symbiosis readouts"
  )
  assert.ok(
    source.includes('class="asset-row"') &&
      source.includes('data-ticker='),
    "Should include asset rows with tickers"
  )
})

test("page features onboarding overlay and spore controls", () => {
  assert.ok(
    source.includes('id="onboarding-overlay"') &&
      source.includes('id="init-button"'),
    "Should include an onboarding overlay to start the experiment and activate audio"
  )
  assert.ok(
    source.includes('id="spore-bomb-btn"'),
    "Should have a general rewild spore bomb trigger"
  )
})

test("page contains custom audio node synthesis logic", () => {
  assert.ok(
    source.includes("AudioContext") &&
      source.includes("OscillatorNode") || source.includes("createOscillator") || source.includes("createBufferSource"),
    "Should leverage Web Audio API for organic squelch/growth sounds"
  )
})

test("page maintains satirical narrative and hides implementation details", () => {
  assert.ok(
    /biodiversity/i.test(source) && /symbiosis/i.test(source) && /extinction/i.test(source),
    "Should frame the page as a corporate biodiversity/extinction satire"
  )
  assert.ok(
    !/pointer events api/i.test(source) && !/web audio api/i.test(source),
    "Should not name browser APIs in user-facing copy"
  )
})

test("experiments index includes Lichen Ledger", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']lichen-ledger["']/i)
  assert.match(indexSource, /title:\s*["']Lichen Ledger["']/i)
  assert.match(indexSource, /agent:\s*["']Antigravity["']/i)
})
