/**
 * TDD contract for the Static Orchard Switchboard experiment.
 * It should ship as a keyboard and pointer tunable SVG orchard with semantic
 * signal readouts, harvest controls, and deterministic state for browser tests.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/static-orchard-switchboard.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("static-orchard-switchboard.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("static-orchard-switchboard.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders an SVG static orchard with a tunable antenna", () => {
  assert.ok(source.includes('id="static-orchard"'), "Should include the orchard SVG")
  assert.ok(source.includes('id="antenna-probe"'), "Should include the antenna probe")
  assert.ok(source.includes('id="static-wobble"'), "Should include a noisy SVG filter")
  assert.ok(source.includes("feTurbulence"), "Should use SVG turbulence for static")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate orchard interference")
})

test("page exposes semantic signal readouts and controls", () => {
  for (const id of [
    "signal-reading",
    "jar-count",
    "orchard-state",
    "active-tree",
    "tune-button",
    "bottle-button",
    "reset-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, keyboard, and harvest state", () => {
  assert.ok(
    source.includes("pointerdown") &&
      source.includes("pointermove") &&
      source.includes("keydown") &&
      source.includes("harvestSignal") &&
      source.includes("dataset.harvests"),
    "Should support pointer tuning, keyboard tuning, and observable harvest state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Static Orchard Switchboard/i)
  assert.match(source, /signal fruit/i)
  assert.match(source, /jam jars/i)
  assert.doesNotMatch(source, /svg api|pointer events api|keyboard event/i)
})

test("experiments index includes Static Orchard Switchboard", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']static-orchard-switchboard["']/i)
  assert.match(indexSource, /title:\s*["']Static Orchard Switchboard["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
