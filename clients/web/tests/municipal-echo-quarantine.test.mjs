/**
 * TDD contract for the Municipal Echo Quarantine experiment.
 * The page should ship as a civic acoustic desk where phrases are detained,
 * tuned through resonance controls, and released into a ledger.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/municipal-echo-quarantine.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("municipal-echo-quarantine.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("municipal-echo-quarantine.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders the civic echo quarantine instrument", () => {
  for (const marker of [
    'id="municipal-echo-quarantine"',
    'id="phrase-input"',
    'id="detain-phrase"',
    'id="quarantine-bays"',
    'id="resonance-meter"',
    'id="released-ledger"',
    'class="echo-slip"',
  ]) {
    assert.ok(source.includes(marker), `Should include ${marker}`)
  }
})

test("page exposes semantic controls and live readouts", () => {
  for (const id of [
    "reverb-control",
    "dampening-control",
    "release-pressure-control",
    "detained-count",
    "cleared-count",
    "active-phrase",
    "resonance-score",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports form entry, keyboard flow, pointer tuning, and deterministic hooks", () => {
  assert.ok(
    source.includes("submit") &&
      source.includes("keydown") &&
      source.includes("pointermove") &&
      source.includes("detainPhrase") &&
      source.includes("releaseActiveEcho") &&
      source.includes("__detainEchoForTest") &&
      source.includes("__releaseEchoForTest") &&
      source.includes("requestAnimationFrame"),
    "Should support multimodal phrase detention with observable test hooks"
  )
})

test("visible narrative is distinct and avoids implementation explanation", () => {
  assert.match(source, /Municipal Echo Quarantine/i)
  assert.match(source, /Detain Phrase/i)
  assert.match(source, /Released Ledger/i)
  assert.match(source, /Bay A/i)
  assert.doesNotMatch(source, /web api|pointer events api|playwright|test hook/i)
})

test("experiments index includes Municipal Echo Quarantine", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']municipal-echo-quarantine["']/i)
  assert.match(indexSource, /title:\s*["']Municipal Echo Quarantine["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
