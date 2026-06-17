/**
 * TDD test for the Hyposmocoma Case Decorator experiment page.
 * Asserts page structure, interactive canvas, Web Audio initialization, and index registration.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/hyposmocoma-case-decorator.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source = ""

test("hyposmocoma-case-decorator.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch (err) {
    assert.fail("Astro file must be created: " + err.message)
  }
})

test("page has a hyposmocoma root container", () => {
  assert.ok(
    source.includes('id="case-decorator-root"'),
    "Should include the main case decorator root container"
  )
})

test("page has an explicit arming interaction overlay", () => {
  assert.ok(
    source.includes('id="arming-overlay"'),
    "Should include an onboarding/arming overlay to activate the Web Audio Context"
  )
})

test("page has an interactive canvas for the spider web", () => {
  assert.ok(
    source.includes('id="web-canvas"') || source.includes('canvas'),
    "Should include a canvas element for rendering the spider web"
  )
})

test("page uses Web Audio API for interactive audio synthesis", () => {
  assert.ok(
    source.includes("AudioContext") || source.includes("webkitAudioContext"),
    "Should initialize an audio context for the web thread tension and pluck sounds"
  )
})

test("page has a spider profile panel", () => {
  assert.ok(
    source.includes('id="spider-profile"') || source.includes('profile'),
    "Should support spider profile reference panel"
  )
})

test("experiments index contains reference to hyposmocoma-case-decorator", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.ok(
    indexSource.includes("hyposmocoma-case-decorator"),
    "Should register the new slug in the experiments list"
  )
})
