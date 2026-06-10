/**
 * TDD contract for the Glacier Stone Concierge experiment.
 * The page should behave like a glacial monument-routing concierge where
 * selecting waypoints stamps a frozen itinerary without layout drift.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/glacier-stone-concierge.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("glacier-stone-concierge.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("glacier-stone-concierge.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a glacial route stage with checkpoint stamps", () => {
  assert.ok(source.includes('id="gsc-stage"'), "Should include the glacial stage")
  assert.ok(source.includes('id="gsc-stone"'), "Should include the travelling stone")
  assert.ok(source.includes('class="gsc-waypoint"'), "Should include waypoint controls")
  assert.ok(source.includes('class="gsc-stamp"'), "Should include stamp slots")
  assert.ok(source.includes("<svg"), "Should include an SVG terrain map")
  assert.ok(source.includes("clip-path"), "Should use clipped/planar geology rather than cards")
})

test("page exposes semantic readouts and route controls", () => {
  for (const id of [
    "route-count",
    "drift-reading",
    "current-checkpoint",
    "delivery-state",
    "dispatch-button",
    "refreeze-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and normalized coordinates", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("selectWaypoint") &&
      source.includes("normalizedIce") &&
      source.includes("dataset.routeCount") &&
      source.includes("requestAnimationFrame"),
    "Should support resilient route movement and observable itinerary state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Glacier Stone Concierge/i)
  assert.match(source, /Altar Stone/i)
  assert.match(source, /itinerary/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright|e2e/i)
})

test("experiments index includes Glacier Stone Concierge", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']glacier-stone-concierge["']/i)
  assert.match(indexSource, /title:\s*["']Glacier Stone Concierge["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
