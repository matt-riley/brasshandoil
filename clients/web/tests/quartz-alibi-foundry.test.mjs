/**
 * TDD contract for the Quartz Alibi Foundry experiment.
 * The page should behave like a mineral testimony bench where a roaming
 * lens anneals shards without layout drift or hidden implementation prose.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/quartz-alibi-foundry.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("quartz-alibi-foundry.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("quartz-alibi-foundry.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a mineral foundry with fixed shards and echo geometry", () => {
  assert.ok(source.includes('id="qa-stage"'), "Should include the foundry stage")
  assert.ok(source.includes('id="qa-lens"'), "Should include a visible roaming lens")
  assert.ok(source.includes('class="qa-shard"'), "Should include fixed shard controls")
  assert.ok(source.includes('class="qa-echo"'), "Should include separate resonance echoes")
  assert.ok(source.includes("<svg"), "Should include an SVG mineral field")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate lens interpolation")
})

test("page exposes semantic readouts and foundry controls", () => {
  for (const id of [
    "testimony-count",
    "phase-reading",
    "current-witness",
    "verdict-state",
    "forge-button",
    "cool-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and normalized coordinates", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("toggleShard") &&
      source.includes("normalizedLens") &&
      source.includes("dataset.testimony"),
    "Should support resilient lens movement and observable testimony state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Quartz Alibi Foundry/i)
  assert.match(source, /quartz/i)
  assert.match(source, /verdict/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Quartz Alibi Foundry", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']quartz-alibi-foundry["']/i)
  assert.match(indexSource, /title:\s*["']Quartz Alibi Foundry["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
