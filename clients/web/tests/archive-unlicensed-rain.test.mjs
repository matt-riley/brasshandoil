/**
 * TDD contract for the Archive of Unlicensed Rain experiment.
 * The page should act like a tactile weather-clerk desk where drops can be
 * stamped into paperwork using pointer or keyboard interactions.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/archive-unlicensed-rain.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("archive-unlicensed-rain.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("archive-unlicensed-rain.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a rain archive desk with stamped drops", () => {
  assert.ok(source.includes('id="rain-archive"'), "Should include the root archive")
  assert.ok(source.includes('id="storm-pane"'), "Should include the interactive storm pane")
  assert.ok(source.includes('id="stamp-pad"'), "Should include a stamp target")
  assert.ok(source.includes('class="rain-drop"'), "Should include rain drop controls")
  assert.ok(source.includes('class="permit-slip"'), "Should include generated permit slips")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate the rain field")
})

test("page exposes semantic counters and controls", () => {
  for (const id of [
    "licensed-count",
    "storm-debt",
    "current-drop",
    "archive-status",
    "stamp-current",
    "reset-archive",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports normalized pointer, touch, keyboard, and drag state", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("normalizedCursor") &&
      source.includes("licenseDrop") &&
      source.includes("dataset.licensed"),
    "Should support resilient multimodal interaction and observable licensed state"
  )
})

test("visible narrative is distinct and avoids implementation language", () => {
  assert.match(source, /Archive of Unlicensed Rain/i)
  assert.match(source, /stamp/i)
  assert.match(source, /permit/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Archive of Unlicensed Rain", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']archive-unlicensed-rain["']/i)
  assert.match(indexSource, /title:\s*["']Archive of Unlicensed Rain["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
