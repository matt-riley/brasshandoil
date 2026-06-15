/**
 * TDD contract for the Civic Fog Harpsichord experiment.
 * The page should ship as a municipal instrument where fog banks are tuned
 * through stable register keys, normalized stage input, and semantic readouts.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/civic-fog-harpsichord.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("civic-fog-harpsichord.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("civic-fog-harpsichord.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a municipal fog instrument with stable stage regions", () => {
  assert.ok(source.includes('id="civic-fog-harpsichord"'), "Should include the experiment root")
  assert.ok(source.includes('id="fog-basin"'), "Should include the interactive fog basin")
  assert.ok(source.includes('id="fog-canvas"'), "Should include the fog canvas")
  assert.ok(source.includes('id="harpsichord-frame"'), "Should include the civic harpsichord frame")
  assert.ok(source.includes('class="register-key"'), "Should include fixed brass register keys")
  assert.ok(source.includes('id="stamp-ledger"'), "Should include the stamped civic ledger")
})

test("page exposes semantic readouts and civic tuning controls", () => {
  for (const id of [
    "chord-count",
    "current-register",
    "fog-density",
    "ordinance-state",
    "stamp-button",
    "clear-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports normalized pointer, touch, keyboard, and fog tuning state", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("normalizedCursor") &&
      source.includes("tuneRegister") &&
      source.includes("dataset.chords") &&
      source.includes("requestAnimationFrame"),
    "Should support resilient multimodal fog tuning and observable chord state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Civic Fog Harpsichord/i)
  assert.match(source, /fog/i)
  assert.match(source, /register/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Civic Fog Harpsichord", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']civic-fog-harpsichord["']/i)
  assert.match(indexSource, /title:\s*["']Civic Fog Harpsichord["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
