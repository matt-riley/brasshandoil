/**
 * TDD contract for the Semaphore Loom for Stray Colors experiment.
 * The page should behave like a signal loom where color keys weave a broadcast
 * without moving the primary hit targets.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/semaphore-loom.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("semaphore-loom.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("semaphore-loom.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a color signal loom with stable keys and threads", () => {
  assert.ok(source.includes('id="semaphore-loom"'), "Should include the experiment root")
  assert.ok(source.includes('id="signal-rig"'), "Should include the interactive signal rig")
  assert.ok(source.includes('id="phrase-ribbon"'), "Should include the woven phrase ribbon")
  assert.ok(source.includes('class="loom-key"'), "Should include color key controls")
  assert.ok(source.includes('class="signal-thread"'), "Should include visible signal threads")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate signal resonance")
})

test("page exposes semantic counters and broadcast controls", () => {
  for (const id of [
    "woven-count",
    "current-glyph",
    "resonance-index",
    "broadcast-state",
    "broadcast-button",
    "unweave-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and normalized coordinates", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("normalizedCursor") &&
      source.includes("weaveSignal") &&
      source.includes("dataset.woven"),
    "Should support resilient multimodal weaving and observable woven state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Semaphore Loom for Stray Colors/i)
  assert.match(source, /signal/i)
  assert.match(source, /color/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Semaphore Loom for Stray Colors", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']semaphore-loom["']/i)
  assert.match(indexSource, /title:\s*["']Semaphore Loom for Stray Colors["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
