/**
 * TDD test for the Red Card Bloom experiment page.
 * Asserts the visible tug interaction and the SVG animation primitives behind it.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/red-card-bloom.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("red-card-bloom.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has an SVG strand field with a luminous filter", () => {
  assert.ok(
    source.includes('id="bloom-field"') &&
      source.includes("feTurbulence") &&
      source.includes("feGaussianBlur"),
    "Should include an SVG stage with atmospheric filter primitives"
  )
})

test("page exposes a semantic braid tug action and live state", () => {
  assert.ok(
    source.includes('id="tug-handle"') &&
      source.includes('aria-label="Pull the braid"') &&
      source.includes('id="bloom-state"') &&
      source.includes('aria-live="polite"'),
    "Should expose a usable braid handle and visible bloom state"
  )
})

test("page supports pointer capture and keyboard activation", () => {
  assert.ok(
    source.includes("setPointerCapture") &&
      source.includes("pointermove") &&
      source.includes("pointerup") &&
      source.includes("keydown"),
    "Should support both pointer tugging and keyboard activation"
  )
})

test("page completes a tug when release lands outside the knot", () => {
  assert.ok(
    source.includes('window.addEventListener("pointerup", finishTug)'),
    "Should finish a captured tug even if release is observed outside the knot"
  )
})

test("page animates strands and red-card petals", () => {
  assert.ok(
    source.includes("requestAnimationFrame") &&
      source.includes("createElementNS") &&
      source.includes("animate(") &&
      source.includes("red-card-petal"),
    "Should animate a living SVG strand field and card-petal bloom"
  )
})

test("experiments index includes Red Card Bloom", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']red-card-bloom["']/i)
  assert.match(indexSource, /title:\s*["']Red Card Bloom["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
