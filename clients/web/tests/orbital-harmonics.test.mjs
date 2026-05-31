/**
 * TDD test for the Orbital Harmonics experiment page.
 * Uses Node's built-in test runner to assert the page structure and core APIs.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/orbital-harmonics.astro")

let source
test("orbital-harmonics.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a gravity well stage or container", () => {
  assert.ok(
    source.includes('id="gravity-stage"') || source.includes('class="gravity-stage"'),
    "Should include a gravity stage container"
  )
})

test("page listens for keydown events to release words", () => {
  assert.ok(
    source.includes("keydown") || source.includes('id="text-input"'),
    "Should listen for keydown or have a text input for releasing words"
  )
})

test("page listens for pointer movement", () => {
  assert.ok(
    source.includes("pointermove"),
    "Should track pointer for gravity well coordinates"
  )
})

test("page uses requestAnimationFrame for orbital physics", () => {
  assert.ok(
    source.includes("requestAnimationFrame"),
    "Should animate orbitals in a physics loop"
  )
})

test("page uses Web Audio API for spatial audio chimes", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize AudioContext"
  )
})

test("page utilizes spatial chimes via gain nodes or panning", () => {
  assert.ok(
    source.includes("StereoPanner") || source.includes("panner") || source.includes("createGain"),
    "Should create sound modifiers (gain, panner) for spatial feedback"
  )
})

test("page positions elements using GPU-friendly translate transforms", () => {
  assert.ok(
    source.includes("translate3d") || source.includes("translate("),
    "Should use performant CSS transforms to avoid layout reflows (avoid layout-jitter)"
  )
})
