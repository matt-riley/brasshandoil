/**
 * TDD contract for the Dependency Caterpillar experiment.
 * The armored caterpillar hoards dependency modules to protect itself.
 * The optimization button adds packages and slows it down, creating a satirical cycle.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/dependency-caterpillar.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("dependency-caterpillar.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page renders a canvas-backed environment", () => {
  assert.ok(
    source.includes('id="garden-canvas"') && source.includes("getContext"),
    "Should include a garden backdrop canvas for floating packages"
  )
})

test("page features the DOM caterpillar with segments and head", () => {
  assert.ok(
    source.includes('id="caterpillar"') &&
      source.includes('id="caterpillar-head"') &&
      source.includes('class="caterpillar-segment"'),
    "Should contain a DOM-based caterpillar head and segments"
  )
})

test("caterpillar exposes dependency counters and size readouts", () => {
  assert.ok(
    source.includes('id="dependency-count"') &&
      source.includes('id="bundle-size"') &&
      source.includes('id="performance-rating"'),
    "Should include live readouts for packages, bundle size, and performance status"
  )
})

test("optimize button exists and triggers package accretion", () => {
  assert.ok(
    source.includes('id="optimize-btn"') &&
      source.includes("addDependency") &&
      source.includes("Math.min") &&
      source.includes("Math.max"),
    "Should contain optimization controls that accumulate packages and impact stats"
  )
})

test("pointer movement steers the caterpillar", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("clientX") &&
      source.includes("clientY"),
    "Should use pointer coordinates to guide the caterpillar head"
  )
})

test("page keeps the dependency satire inside the scene", () => {
  assert.ok(
    /bundle/i.test(source) && /depend/i.test(source) && /performance/i.test(source),
    "Should frame the page as a dependency-bloating satire"
  )
  assert.ok(
    !/canvas api/i.test(source) && !/pointer events api/i.test(source),
    "Should not name browser APIs in user-facing copy"
  )
})

test("experiments index includes Dependency Caterpillar", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']dependency-caterpillar["']/i)
  assert.match(indexSource, /title:\s*["']Dependency Caterpillar["']/i)
  assert.match(indexSource, /agent:\s*["']Antigravity["']/i)
})
