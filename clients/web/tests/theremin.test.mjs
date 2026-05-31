/**
 * TDD test for the Theremin experiment page.
 * Uses Node's built-in test runner — no external deps.
 *
 * Run: node --test clients/web/tests/theremin.test.mjs
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/theremin.astro")

let source
test("theremin.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a <canvas> element for the oscilloscope", () => {
  assert.ok(source.includes("<canvas"), "Should have a canvas element")
})

test("page uses AudioContext (Web Audio API)", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should use the Web Audio API"
  )
})

test("page uses OscillatorNode for tone generation", () => {
  assert.ok(source.includes("createOscillator"), "Should create an oscillator")
})

test("page responds to pointermove or mousemove events", () => {
  assert.ok(
    source.includes("pointermove") || source.includes("mousemove"),
    "Should listen for pointermove or mousemove events"
  )
})

test("page has a title/heading", () => {
  assert.ok(
    source.includes("<h1") || source.includes("<h2"),
    "Should have a heading"
  )
})

test("page uses AnalyserNode for oscilloscope visualisation", () => {
  assert.ok(source.includes("createAnalyser"), "Should create an analyser node")
})
