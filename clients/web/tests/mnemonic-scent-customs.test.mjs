/**
 * TDD contract for the Mnemonic Scent Customs experiment.
 * The page should ship as a chromatograph customs desk with selectable scent
 * vials, memory gates, semantic readouts, and a stamped smell ledger.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/mnemonic-scent-customs.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("mnemonic-scent-customs.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("mnemonic-scent-customs.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a chromatograph customs desk with vials and ledger", () => {
  assert.ok(source.includes('id="mnemonic-scent-customs"'), "Should include the root")
  assert.ok(source.includes('id="scent-stage"'), "Should include the interactive scent stage")
  assert.ok(source.includes('id="chromatograph-curtain"'), "Should include the chromatograph curtain")
  assert.ok(source.includes('class="scent-vial"'), "Should include selectable scent vials")
  assert.ok(source.includes('id="memory-gates"'), "Should include memory gate controls")
  assert.ok(source.includes('id="scent-ledger"'), "Should include the smell ledger")
})

test("page exposes semantic readouts and customs controls", () => {
  for (const id of [
    "cleared-count",
    "tariff-reading",
    "current-note",
    "stamp-selected-scent",
    "clear-ledger",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and deterministic stamping", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("selectVial") &&
      source.includes("stampSelectedScent") &&
      source.includes("__stampScentForTest") &&
      source.includes("requestAnimationFrame"),
    "Should support resilient multimodal vial sorting and observable test hooks"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Mnemonic Scent Customs/i)
  assert.match(source, /chromatograph curtain/i)
  assert.match(source, /stamp ledger/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Mnemonic Scent Customs", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']mnemonic-scent-customs["']/i)
  assert.match(indexSource, /title:\s*["']Mnemonic Scent Customs["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
