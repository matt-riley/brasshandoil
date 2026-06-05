/**
 * TDD contract for the Receipt Rain Choir experiment.
 * It should ship as a sortable thermal-receipt storm with semantic totals,
 * keyboard-accessible bins, and visible copy that stays inside the fiction.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/receipt-rain-choir.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("receipt-rain-choir.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("receipt-rain-choir.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a storm of sortable receipt strips", () => {
  assert.ok(source.includes('id="receipt-field"'), "Should include the receipt field")
  assert.ok(source.includes('class="receipt-strip"'), "Should include receipt strips")
  assert.ok(source.includes('data-bin='), "Should model receipt destinations")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate the receipt weather")
})

test("page exposes semantic totals and bin controls", () => {
  for (const id of [
    "sorted-total",
    "unsorted-total",
    "choir-mode",
    "bin-archive",
    "bin-shred",
    "bin-audit",
    "summon-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer and keyboard sorting", () => {
  assert.ok(
    source.includes("pointerdown") &&
      source.includes("keydown") &&
      source.includes("aria-pressed") &&
      source.includes("sortReceipt"),
    "Should support pointer sorting, keyboard sorting, and observable bin state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Receipt Rain Choir/i)
  assert.match(source, /thermal/i)
  assert.match(source, /archive/i)
  assert.doesNotMatch(source, /web audio api|pointer events api|drag api/i)
})

test("experiments index includes Receipt Rain Choir", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']receipt-rain-choir["']/i)
  assert.match(indexSource, /title:\s*["']Receipt Rain Choir["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
