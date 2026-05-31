/**
 * TDD test for the Scroll Symphony experiment page.
 * Uses Node's built-in test runner to assert the page structure and core APIs.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/scroll-symphony.astro")

let source
test("scroll-symphony.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a large scrollable area or container", () => {
  assert.ok(
    source.includes('class="scroll-area"') || source.includes('class="scroll-shell"'),
    "Should include a large scrollable container"
  )
})

test("page uses Scroll-Driven Animations CSS timeline properties", () => {
  assert.ok(
    source.includes("animation-timeline") || source.includes("scroll("),
    "Should specify scroll animation timelines"
  )
})

test("page uses starting-style for smooth entries", () => {
  assert.ok(
    source.includes("@starting-style"),
    "Should use @starting-style CSS feature for discrete transitions"
  )
})

test("page tracks scroll events or animation frames in script", () => {
  assert.ok(
    source.includes("scroll") || source.includes("requestAnimationFrame"),
    "Should track scrolling or animation frame ticks for dynamic audio modulation"
  )
})

test("page initializes Web Audio context and modulation nodes", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize AudioContext for synthesizing chimes/drones"
  )
  assert.ok(
    source.includes("BiquadFilterNode") || source.includes("createBiquadFilter") || source.includes("createGain"),
    "Should construct audio modulation filters or gain control"
  )
})
