/**
 * TDD contract for the Abyssal Naming Committee experiment.
 * Every confident attempt to classify an ocean-floor golden orb should make
 * the specimen less certain and more numerous.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/abyssal-naming-committee.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("abyssal-naming-committee.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page renders a canvas-backed abyssal stage", () => {
  assert.ok(
    source.includes('id="abyss-canvas"') && source.includes("getContext"),
    "Should include an underwater canvas and drawing context"
  )
})

test("committee can classify the golden specimen", () => {
  assert.ok(
    source.includes('id="classify-specimen"') &&
      source.includes('id="classification-line"') &&
      source.includes('aria-live="polite"'),
    "Should include a classification control and live result"
  )
})

test("classification makes the evidence less convenient", () => {
  assert.ok(
    source.includes('id="certainty-value"') &&
      source.includes('id="sibling-count"') &&
      /certainty\s*=\s*Math\.max/.test(source) &&
      /siblings\s*\+=/.test(source),
    "Classifying should lower certainty and add sibling specimens"
  )
})

test("pointer movement steers the submersible spotlight", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("--spot-x") &&
      source.includes("--spot-y"),
    "Should use pointer movement to steer a spotlight"
  )
})

test("animated debris stays bounded and respects reduced motion", () => {
  assert.ok(
    /MAX_MOTES\s*=\s*\d+/.test(source) &&
      source.includes("requestAnimationFrame") &&
      source.includes("prefers-reduced-motion"),
    "Should cap the animated field and account for reduced motion"
  )
})

test("page keeps the taxonomy satire inside the scene", () => {
  assert.ok(
    /abyss/i.test(source) && /classif/i.test(source) && /specimen/i.test(source),
    "Should frame the page as an abyssal classification exercise"
  )
  assert.ok(
    !/canvas api/i.test(source) && !/pointer events api/i.test(source),
    "Should not name browser APIs in user-facing copy"
  )
})

test("experiments index includes Abyssal Naming Committee", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']abyssal-naming-committee["']/i)
  assert.match(indexSource, /title:\s*["']Abyssal Naming Committee["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
