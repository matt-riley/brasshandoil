/**
 * TDD test for the Specimen 4471 experiment page.
 * Inspired by the flesh-eating screwworm fly confirmed in Texas (June 2026).
 * A USDA inspection report that becomes infested — SVG feTurbulence + feDisplacementMap
 * create writhing organic distortion that spreads from specimen into the document.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/specimen-4471.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("specimen-4471.astro file exists and is non-empty", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has SVG feTurbulence filter for organic writhing", () => {
  assert.ok(
    source.includes("feTurbulence") && source.includes("feDisplacementMap"),
    "Should use SVG turbulence + displacement for distortion"
  )
  assert.ok(
    source.includes('id="turb"') || source.includes('id="writhe'),
    "Should have an identifiable turbulence element"
  )
})

test("page has a specimen inspection area with UV lamp", () => {
  assert.ok(
    source.includes('id="specimen-area"'),
    "Should have a specimen inspection area"
  )
  assert.ok(
    source.includes('id="uv-lamp"'),
    "Should have a UV inspection lamp element"
  )
})

test("UV lamp follows cursor via pointermove", () => {
  assert.ok(
    source.includes("pointermove"),
    "Should track pointer movement over specimen"
  )
  assert.ok(
    source.includes("transform"),
    "Should update lamp position via transform"
  )
})

test("infestation grows while hovering over specimen", () => {
  assert.ok(
    source.includes("isHovering") || source.includes("hovering"),
    "Should track hover state"
  )
  assert.ok(
    source.includes("infestation") && source.includes("Math.min"),
    "Should increment infestation with a cap"
  )
})

test("status escalates through CLEAR > SUSPECT > CONFIRMED > QUARANTINE FAILURE", () => {
  assert.ok(source.includes("CLEAR"), "Should have CLEAR status")
  assert.ok(source.includes("SUSPECT"), "Should have SUSPECT status")
  assert.ok(source.includes("CONFIRMED"), "Should have CONFIRMED status")
  assert.ok(source.includes("QUARANTINE FAILURE"), "Should have QUARANTINE FAILURE status")
  assert.ok(
    source.includes('id="specimen-status"'),
    "Should have a status display element"
  )
})

test("text elements get SVG filter distortion as infestation spreads", () => {
  assert.ok(
    source.includes("infectable"),
    "Should have infectable text elements"
  )
  assert.ok(
    source.includes("text-writhe") || source.includes("text-displace"),
    "Should have a separate text distortion filter"
  )
})

test("inspector notes escalate with infestation level", () => {
  assert.ok(
    source.includes('id="inspector-notes"'),
    "Should have inspector notes element"
  )
  assert.ok(
    source.includes("notesProgression") || source.includes("threshold"),
    "Should have progressive notes that change with infestation"
  )
})

test("turbulence seed animates for writhing effect", () => {
  assert.ok(
    source.includes("setAttribute") && source.includes("seed"),
    "Should animate the turbulence seed each frame"
  )
  assert.ok(
    source.includes("requestAnimationFrame"),
    "Should use rAF for continuous animation"
  )
})

test("page has USDA clinical inspection framing", () => {
  assert.ok(
    /ANIMAL AND PLANT HEALTH INSPECTION/i.test(source),
    "Should reference APHIS"
  )
  assert.ok(
    /specimen/i.test(source) && /inspector/i.test(source),
    "Should use clinical inspection language"
  )
  assert.ok(
    !/feTurbulence api/i.test(source) && !/SVG filter api/i.test(source),
    "Should not name the browser APIs in user-facing copy"
  )
})

test("page exposes test hooks for infestation control", () => {
  assert.ok(
    source.includes("__specimenReady"),
    "Should expose readiness flag"
  )
  assert.ok(
    source.includes("__infestationLevel"),
    "Should expose infestation level getter"
  )
  assert.ok(
    source.includes("__setInfestation"),
    "Should expose infestation setter for testing"
  )
})

test("experiments index includes Specimen 4471", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']specimen-4471["']/i)
  assert.match(indexSource, /agent:\s*["']Claude["']/i)
})
