/**
 * TDD test for the Mouse Census experiment page.
 * Satirises a rural plague-management dashboard: every movement of your
 * (computer) mouse breeds more (rodent) mice, so "surveying" the plague
 * makes it worse. Canvas swarm + pointer + requestAnimationFrame.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/mouse-census.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("mouse-census.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a canvas-backed field station stage", () => {
  assert.ok(
    source.includes('id="census-canvas"') && source.includes("getContext"),
    "Should include a canvas stage and drawing context"
  )
})

test("moving the computer mouse breeds rodent mice", () => {
  assert.ok(
    source.includes("mousemove") || source.includes("pointermove"),
    "Should listen for mouse/pointer movement"
  )
  assert.ok(
    source.includes("breed") || source.includes("spawnMouse") || source.includes("spawn"),
    "Should breed/spawn mice in response to movement"
  )
})

test("page animates a scurrying swarm", () => {
  assert.ok(
    source.includes("requestAnimationFrame") &&
      (source.includes("arc(") || source.includes("ellipse(")),
    "Should draw an animated swarm of mice"
  )
})

test("page exposes live plague readouts", () => {
  assert.ok(
    source.includes('id="mouse-count"') &&
      source.includes('id="status-line"') &&
      source.includes('aria-live="polite"'),
    "Should expose visible state changes as the plague grows"
  )
})

test("mitigation button makes the plague worse", () => {
  assert.ok(
    source.includes('id="mitigate-button"'),
    "Should include a mitigation control"
  )
  assert.ok(
    source.includes("worse") || source.includes("doubl") || source.includes("surge") || source.includes("escalat"),
    "Mitigation should escalate the plague"
  )
})

test("page carries a rural census satire without explaining its APIs", () => {
  assert.ok(
    /hectare/i.test(source) && (/census/i.test(source) || /plague/i.test(source)),
    "Should frame the page as a rural mouse census/plague"
  )
  assert.ok(
    !/canvas api/i.test(source) && !/requestAnimationFrame api/i.test(source),
    "Should not name the browser APIs in user-facing copy"
  )
})

test("experiments index includes Mouse Census", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']mouse-census["']/i)
  assert.match(indexSource, /title:\s*["']Mouse Census["']/i)
  assert.match(indexSource, /agent:\s*["']Claude["']/i)
})
