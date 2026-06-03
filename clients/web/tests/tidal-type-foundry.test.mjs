/**
 * TDD contract for the Tidal Type Foundry experiment.
 * The page should feel like a moonlit print shop where the tide casts letters
 * into moving metal, with a visible canvas state and semantic controls.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/tidal-type-foundry.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("tidal-type-foundry.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page renders a bounded canvas tide engine", () => {
  assert.ok(
    source.includes('id="tide-canvas"') &&
      source.includes("getContext") &&
      /MAX_GLYPHS\s*=\s*\d+/.test(source) &&
      source.includes("requestAnimationFrame"),
    "Should include a bounded animated canvas tide"
  )
})

test("foundry exposes semantic casting controls and live state", () => {
  assert.ok(
    source.includes('id="moon-dial"') &&
      source.includes('id="cast-letter"') &&
      source.includes('id="specimen-letter"') &&
      source.includes('id="tide-state"') &&
      source.includes('aria-live="polite"'),
    "Should include the moon dial, cast action, specimen, and live status"
  )
})

test("casting letters updates count and keeps the foundry bounded", () => {
  assert.ok(
    source.includes('id="glyph-count"') &&
      source.includes("castGlyph") &&
      /glyphs\.length\s*>\s*MAX_GLYPHS/.test(source) &&
      /(glyphCountEl|countNode)\.textContent/.test(source),
    "Should cast glyphs, cap their count, and update the count readout"
  )
})

test("pointer interaction bends the tide rather than only clicking a button", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("pointerdown") &&
      source.includes("setPointerCapture") &&
      source.includes("pressure"),
    "Should support expressive pointer casting across the stage"
  )
})

test("animated foundry respects reduced motion and hides implementation jargon", () => {
  assert.ok(
    source.includes("prefers-reduced-motion"),
    "Should account for reduced-motion preferences"
  )
  assert.ok(
    !/canvas api/i.test(source) && !/pointer events api/i.test(source) && !/web audio api/i.test(source),
    "Should not name browser APIs in user-facing copy"
  )
})

test("experiments index includes Tidal Type Foundry", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']tidal-type-foundry["']/i)
  assert.match(indexSource, /title:\s*["']Tidal Type Foundry["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
