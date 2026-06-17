/**
 * TDD contract for the Infrasonic Teacup Seismograph experiment.
 * The page should ship as a porcelain tremor desk with fixed cups,
 * normalized stirring input, semantic readouts, and a stamped seismogram.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/infrasonic-teacup-seismograph.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("infrasonic-teacup-seismograph.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("infrasonic-teacup-seismograph.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a porcelain seismograph with fixed cups and a tremor canvas", () => {
  assert.ok(source.includes('id="infrasonic-teacup-seismograph"'), "Should include the root")
  assert.ok(source.includes('id="teacup-table"'), "Should include the interactive table")
  assert.ok(source.includes('id="tremor-canvas"'), "Should include the tremor canvas")
  assert.ok(source.includes('id="porcelain-array"'), "Should include the cup array")
  assert.ok(source.includes('class="cup-key"'), "Should include fixed cup controls")
  assert.ok(source.includes('id="seismogram-ledger"'), "Should include the stamped seismogram")
})

test("page exposes semantic readouts and instrument controls", () => {
  for (const id of [
    "tremor-count",
    "current-cup",
    "amplitude-reading",
    "omen-state",
    "stamp-button",
    "settle-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports normalized pointer, touch, keyboard, and cup state", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("normalizedSpoon") &&
      source.includes("tuneCup") &&
      source.includes("dataset.tremors") &&
      source.includes("requestAnimationFrame"),
    "Should support resilient multimodal tremor tuning and observable state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Infrasonic Teacup Seismograph/i)
  assert.match(source, /porcelain/i)
  assert.match(source, /tremor/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Infrasonic Teacup Seismograph", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']infrasonic-teacup-seismograph["']/i)
  assert.match(indexSource, /title:\s*["']Infrasonic Teacup Seismograph["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
