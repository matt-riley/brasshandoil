/**
 * TDD contract for the Mercury Quarantine Choir experiment.
 * The page should ship as a sealed metallurgical choir desk where mercury
 * droplets are quarantined into tone wells without layout-dependent controls.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/mercury-quarantine-choir.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("mercury-quarantine-choir.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("mercury-quarantine-choir.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a sealed mercury choir with stable wells and droplets", () => {
  assert.ok(source.includes('id="mercury-choir"'), "Should include the experiment root")
  assert.ok(source.includes('id="quarantine-stage"'), "Should include the interactive stage")
  assert.ok(source.includes('id="mercury-canvas"'), "Should include the mercury droplet canvas")
  assert.ok(source.includes('id="choir-ribbon"'), "Should include the quarantined tone ribbon")
  assert.ok(source.includes('class="tone-well"'), "Should include fixed tone well controls")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate droplet coalescence")
})

test("page exposes semantic readouts and quarantine controls", () => {
  for (const id of [
    "sealed-count",
    "current-tone",
    "vapor-index",
    "choir-state",
    "seal-button",
    "vent-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and normalized coordinates", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("normalizedCursor") &&
      source.includes("quarantineTone") &&
      source.includes("dataset.sealed"),
    "Should support resilient multimodal quarantine and observable sealed state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Mercury Quarantine Choir/i)
  assert.match(source, /mercury/i)
  assert.match(source, /choir/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Mercury Quarantine Choir", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']mercury-quarantine-choir["']/i)
  assert.match(indexSource, /title:\s*["']Mercury Quarantine Choir["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
