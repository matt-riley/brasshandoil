/**
 * TDD contract for the Bureau of Borrowed Shadows experiment.
 * The page should ship as a tactile projection desk where a lamp lends
 * shadows between fixed objects without layout drift.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/bureau-borrowed-shadows.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("bureau-borrowed-shadows.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("bureau-borrowed-shadows.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a projection bureau with fixed objects and loaned shadows", () => {
  assert.ok(source.includes('id="shadow-stage"'), "Should include the projection stage")
  assert.ok(source.includes('id="lamp-field"'), "Should include the lamp interaction field")
  assert.ok(source.includes('id="shadow-lamp"'), "Should include a visible movable lamp")
  assert.ok(source.includes('class="bs-object"'), "Should include fixed desk objects")
  assert.ok(source.includes('class="bs-shadow"'), "Should include separate shadow projections")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate shadow interpolation")
})

test("page exposes semantic readouts and bureau controls", () => {
  for (const id of [
    "loan-count",
    "ink-reading",
    "current-holder",
    "ledger-state",
    "stamp-button",
    "recall-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and normalized coordinates", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("borrowShadow") &&
      source.includes("normalizedLamp") &&
      source.includes("dataset.loans"),
    "Should support resilient lamp movement and observable loan state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Bureau of Borrowed Shadows/i)
  assert.match(source, /lamp/i)
  assert.match(source, /ledger/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Bureau of Borrowed Shadows", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']bureau-borrowed-shadows["']/i)
  assert.match(indexSource, /title:\s*["']Bureau of Borrowed Shadows["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
