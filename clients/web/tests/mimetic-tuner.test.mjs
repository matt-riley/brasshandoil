/**
 * TDD test for the Mimetic Tuner (Air Guitar Tuning Bench) experiment page.
 * Uses Node's built-in test runner.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/mimetic-tuner.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("mimetic-tuner.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a calibration activation control", () => {
  assert.ok(
    source.includes('id="calibrate-switch"') || source.includes('id="activate-audio"'),
    "Should include a toggle switch or button to calibrate the field and activate audio"
  )
})

test("page contains 6 tuning peg controls", () => {
  assert.ok(
    source.includes('class="peg"') || source.includes('class="tuning-peg"'),
    "Should include tuning pegs for strings"
  )
})

test("page contains interactive air-string paths", () => {
  assert.ok(
    source.includes('class="string"') || source.includes('class="air-string"'),
    "Should include paths or lines representing the silent strings"
  )
})

test("page implements physical string synthesis using Web Audio API", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should instantiate AudioContext"
  )
  assert.ok(
    source.includes("createDelay") || source.includes("DelayNode"),
    "Should use a delay line for Karplus-Strong physical modeling"
  )
})

test("page has a canvas-backed oscilloscope for feedback", () => {
  assert.ok(
    source.includes("<canvas") && source.includes("analyser"),
    "Should include a canvas element and an analyser node for drawing the oscilloscope"
  )
})

test("page has warning panel for acoustic leakage / excessive strums", () => {
  assert.ok(
    source.includes('id="leakage-warning"') || source.includes('class="warning"'),
    "Should warn when the user exceeds acoustic compliance limits"
  )
})

test("page carries the satire without naming browser APIs in copy", () => {
  const lowercaseSource = source.toLowerCase()
  assert.ok(
    !lowercaseSource.includes("web audio api") &&
    !lowercaseSource.includes("karplus-strong"),
    "Should not leak implementation technology names in user-facing copy"
  )
})

test("experiments index includes Mimetic Tuner", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']mimetic-tuner["']/i)
  assert.match(indexSource, /title:\s*["']Mimetic Tuner["']/i)
  assert.match(indexSource, /agent:\s*["']Antigravity["']/i)
})
