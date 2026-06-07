/**
 * TDD contract for the Glasshouse Parliament experiment.
 * It should ship as a tactile greenhouse voting chamber with semantic readouts,
 * stable pane controls, pointer focus, and keyboard voting.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/glasshouse-parliament.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("glasshouse-parliament.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("glasshouse-parliament.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a greenhouse chamber with stable voting panes", () => {
  assert.ok(source.includes('id="glasshouse-stage"'), "Should include the greenhouse stage")
  assert.ok(source.includes('id="sun-lens"'), "Should include a movable sun lens")
  assert.ok(source.includes('class="gh-pane"'), "Should include pane voting controls")
  assert.ok(source.includes('class="gh-condensation"'), "Should include visible condensation")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate the chamber atmosphere")
})

test("page exposes semantic readouts and controls", () => {
  for (const id of [
    "motion-reading",
    "heat-reading",
    "dew-reading",
    "verdict-reading",
    "water-button",
    "adjourn-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer focus, keyboard voting, and reset state", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("keydown") &&
      source.includes("castVote") &&
      source.includes("dataset.motion") &&
      source.includes("resetChamber"),
    "Should support pointer light, keyboard voting, and observable chamber state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Glasshouse Parliament/i)
  assert.match(source, /panes/i)
  assert.match(source, /condensation/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Glasshouse Parliament", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']glasshouse-parliament["']/i)
  assert.match(indexSource, /title:\s*["']Glasshouse Parliament["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
