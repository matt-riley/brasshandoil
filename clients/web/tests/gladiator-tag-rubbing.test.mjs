/**
 * TDD test for the Gladiator Tag Rubbing experiment page.
 * Asserts page structure, interactive canvas, Web Audio initialization, and index registration.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/gladiator-tag-rubbing.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("gladiator-tag-rubbing.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch (err) {
    assert.fail("Astro file must be created: " + err.message)
  }
})

test("page has a gladiator root container", () => {
  assert.ok(
    source.includes('id="gladiator-tag-root"'),
    "Should include the main gladiator tag root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has an interactive canvas for rubbing/scraping", () => {
  assert.ok(
    source.includes('id="rubbing-canvas"') || source.includes('canvas'),
    "Should include a canvas element for rendering the mud scratching"
  )
})

test("page uses Web Audio API for interactive audio synthesis", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the ambient/scratching sound effects"
  )
})

test("page has a decryption/decoder panel", () => {
  assert.ok(
    source.includes('id="decoder-panel"') || source.includes('decrypt') || source.includes('decode'),
    "Should support translation decoding dials or panels"
  )
})

test("experiments index contains reference to gladiator-tag-rubbing", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("gladiator-tag-rubbing"),
    "Should register the new slug in the experiments list"
  )
})
