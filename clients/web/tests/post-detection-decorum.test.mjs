/**
 * TDD test for the Post-Detection Decorum experiment.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/post-detection-decorum.astro")

let source
test("post-detection-decorum.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page contains the validation-wheel element", () => {
  assert.ok(
    source.includes("validation-wheel") || source.includes("selector-wheel"),
    "Should include a validation-wheel element for signal tuning"
  )
})

test("page contains validator-node elements representing independent validation agencies", () => {
  assert.ok(
    source.includes("validator-node") || source.includes("agency-node"),
    "Should include validator-node elements"
  )
})

test("page uses requestAnimationFrame for rotation and physics smoothing", () => {
  assert.ok(
    source.includes("requestAnimationFrame"),
    "Should use requestAnimationFrame for smooth wheel inertia/rotation"
  )
})

test("page uses AudioContext for interstellar signal feedback", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize AudioContext for audio feedback"
  )
})

test("page supports keyboard navigation controls", () => {
  assert.ok(
    source.includes("ArrowLeft") && source.includes("ArrowRight"),
    "Should support rotating the wheel via keyboard arrow keys"
  )
  assert.ok(
    source.includes("Space") || source.includes("Enter") || source.includes("keydown"),
    "Should support locking alignment via Space or Enter keyboard events"
  )
})

test("page includes diplomatic mad-libs template options", () => {
  assert.ok(
    source.includes("select") || source.includes("dropdown") || source.includes("madlib"),
    "Should include custom or native select dropdowns for sanitizing the message"
  )
  assert.ok(
    source.includes("sanitize") || source.includes("override") || source.includes("clean"),
    "Should implement auto-sanitization of custom message content to avoid panic"
  )
})

test("page does not explain implementation details in the interface", () => {
  const lowercaseSource = source.toLowerCase()
  assert.ok(
    !lowercaseSource.includes("this page uses the web audio api") &&
    !lowercaseSource.includes("built with astro") &&
    !lowercaseSource.includes("using requestanimationframe"),
    "Should stand alone as an artwork without explaining its technical stack in the UI"
  )
})
