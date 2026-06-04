/**
 * TDD contract for the Pressure Choir experiment.
 * It should ship as a playable canvas membrane with pressure readouts,
 * condensation controls, and no browser-API terminology in the visible copy.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/pressure-choir.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("pressure-choir.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("pressure-choir.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a canvas pressure membrane with animation", () => {
  assert.ok(
    source.includes('id="pressure-canvas"') &&
      source.includes("getContext") &&
      source.includes("requestAnimationFrame"),
    "Should include an animated pressure membrane canvas"
  )
  assert.match(source, /PointerEvent|pointerdown|pointermove/i)
})

test("page exposes semantic choir readouts and controls", () => {
  for (const id of [
    "pressure-reading",
    "dent-count",
    "choir-state",
    "condense-button",
    "release-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic responds to pressure and creates voices", () => {
  assert.ok(
    source.includes(".pressure") &&
      source.includes("createOscillator") &&
      source.includes("dataset.pressed"),
    "Should use pointer pressure, audio voices, and an observable pressed state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Pressure Choir/i)
  assert.match(source, /barometer/i)
  assert.match(source, /condensation/i)
  assert.doesNotMatch(source, /web audio api|pointer events api|canvas api/i)
})

test("experiments index includes Pressure Choir", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']pressure-choir["']/i)
  assert.match(indexSource, /title:\s*["']Pressure Choir["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
