/**
 * TDD test for the Lost & Found Futures experiment page.
 * Verifies the page uses a modern browser interaction stack with strong structure.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(
  __dirname,
  "../src/pages/experiments/lost-and-found-futures.astro"
)

let source
test("lost-and-found-futures.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a bureau or kiosk framing", () => {
  assert.ok(
    source.includes("Lost & Found Futures") ||
      source.includes("Bureau") ||
      source.includes("Claims Desk"),
    "Should frame the experience like an official bureau"
  )
})

test("page includes a claim button", () => {
  assert.ok(
    source.includes("<button") && source.includes("Issue a future"),
    "Should include a primary trigger button"
  )
})

test("page uses the Popover API", () => {
  assert.ok(
    source.includes("popover") || source.includes("showPopover"),
    "Should use the native Popover API for card details"
  )
})

test("page uses View Transitions when available", () => {
  assert.ok(
    source.includes("startViewTransition"),
    "Should use document.startViewTransition for card refreshes"
  )
})

test("page generates surreal future inventory from a phrase pool", () => {
  assert.ok(
    source.includes("futurePool") &&
      (source.includes("createElement") || source.includes("innerHTML")),
    "Should generate items from a phrase pool"
  )
})

test("page assigns stable per-claim ids rather than reusing a global transition name", () => {
  assert.ok(
    source.includes("claim.id") && source.includes("transitionInFlight"),
    "Should scope transitions to stable claim ids and guard overlapping transitions"
  )
})

test("page maintains high-contrast styling cues", () => {
  assert.ok(
    source.includes("#0") || source.includes("#f") || source.includes("--ink"),
    "Should define explicit strong-contrast colors"
  )
})

test("page does not explain its implementation in user-facing copy", () => {
  assert.ok(
    !source.includes("Queue updates via View Transitions and native Popover"),
    "Should avoid explaining the underlying APIs in visible copy"
  )
})
