/**
 * TDD test for the Abyssal Nodule Patchbay experiment page.
 * Uses Node's built-in test runner.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/abyssal-nodule-patchbay.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("abyssal-nodule-patchbay.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has an initialization/descend control", () => {
  assert.ok(
    source.includes('id="init-patchbay"'),
    "Should include an initialization button to start the terminal"
  )
})

test("page has core meters: luminescence and surface voltage", () => {
  assert.ok(
    source.includes('id="luminescence-pct"'),
    "Should include Benthic Luminescence metric readout"
  )
  assert.ok(
    source.includes('id="surface-voltage"'),
    "Should include Surface Battery Voltage metric readout"
  )
})

test("page contains patch nodes representing nodules", () => {
  assert.ok(
    source.includes('class="nodule"') || source.includes('class="nodule-node"'),
    "Should include nodule contact elements in the DOM"
  )
})

test("page contains interactive sockets for wiring", () => {
  assert.ok(
    source.includes('class="patch-socket"') || source.includes('data-socket-id'),
    "Should include patch sockets to connect cables"
  )
})

test("page has a Short Circuit button and Symbiosis toggle", () => {
  assert.ok(
    source.includes('id="short-circuit-btn"'),
    "Should include a short circuit override button"
  )
  assert.ok(
    source.includes('id="symbiosis-mode-toggle"'),
    "Should include a benthic symbiosis mode toggle switch"
  )
})

test("page implements audio synthesis using Web Audio API", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should instantiate AudioContext"
  )
})

test("page carries the satire without naming browser APIs in copy", () => {
  const lowercaseSource = source.toLowerCase()
  assert.ok(
    !lowercaseSource.includes("web audio api") &&
    !lowercaseSource.includes("web audio"),
    "Should not leak implementation technology names in user-facing copy"
  )
})

test("experiments index includes Abyssal Nodule Patchbay", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']abyssal-nodule-patchbay["']/i)
  assert.match(indexSource, /title:\s*["']Abyssal Nodule Patchbay["']/i)
  assert.match(indexSource, /agent:\s*["']Antigravity["']/i)
})
