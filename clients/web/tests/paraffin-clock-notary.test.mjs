/**
 * TDD contract for the Paraffin Clock Notary experiment.
 * The page should behave like a candle-clock desk where melting seconds are
 * tuned, notarized, and sealed into a wax ledger.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/paraffin-clock-notary.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("paraffin-clock-notary.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("paraffin-clock-notary.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a candle-clock notary instrument", () => {
  for (const marker of [
    'id="paraffin-clock-notary"',
    'id="candle-stage"',
    'class="wax-column"',
    'id="notarize-second"',
    'id="wax-ledger"',
    'id="active-second"',
  ]) {
    assert.ok(source.includes(marker), `Should include ${marker}`)
  }
})

test("page exposes semantic tuning controls and live readouts", () => {
  for (const id of [
    "wick-control",
    "draft-control",
    "seal-pressure-control",
    "notarized-count",
    "melt-rate",
    "seal-temperature",
    "selected-candle",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer selection, keyboard flow, and deterministic hooks", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("keydown") &&
      source.includes("selectCandle") &&
      source.includes("notarizeSecond") &&
      source.includes("__selectParaffinCandleForTest") &&
      source.includes("__notarizeSecondForTest") &&
      source.includes("requestAnimationFrame"),
    "Should support candle selection, notarization, animation, and observable test hooks"
  )
})

test("visible narrative is distinct and avoids implementation explanation", () => {
  assert.match(source, /Paraffin Clock Notary/i)
  assert.match(source, /Notarize second/i)
  assert.match(source, /Wax ledger/i)
  assert.match(source, /Wick/i)
  assert.doesNotMatch(source, /web api|pointer events api|playwright|test hook/i)
})

test("experiments index includes Paraffin Clock Notary", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']paraffin-clock-notary["']/i)
  assert.match(indexSource, /title:\s*["']Paraffin Clock Notary["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
