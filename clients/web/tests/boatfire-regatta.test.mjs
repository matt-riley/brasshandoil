/**
 * TDD test for the Boatfire Regatta experiment page.
 * Asserts the visible interaction contract and the animation primitives behind it.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/boatfire-regatta.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("boatfire-regatta.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a canvas-backed regatta stage", () => {
  assert.ok(
    source.includes('id="regatta-canvas"') && source.includes("getContext"),
    "Should include a canvas stage and drawing context"
  )
})

test("page launches typed thoughts into the water", () => {
  assert.ok(
    source.includes('id="thought-input"') &&
      source.includes('id="launch-button"') &&
      source.includes("createBoat"),
    "Should include a thought launcher and boat factory"
  )
})

test("page reacts to pointer steering", () => {
  assert.ok(
    source.includes("pointermove") && source.includes("pointerleave"),
    "Should steer the current with pointer movement"
  )
})

test("page animates water, boats, and sparks", () => {
  assert.ok(
    source.includes("requestAnimationFrame") &&
      source.includes("createRadialGradient") &&
      source.includes("createSpark"),
    "Should draw a luminous animated regatta"
  )
})

test("page exposes live launch and chorus readouts", () => {
  assert.ok(
    source.includes('id="launch-count"') &&
      source.includes('id="chorus-line"') &&
      source.includes('aria-live="polite"'),
    "Should expose visible state changes after launch"
  )
})

test("experiments index includes Boatfire Regatta", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']boatfire-regatta["']/i)
  assert.match(indexSource, /title:\s*["']Boatfire Regatta["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
