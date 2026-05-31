/**
 * TDD test for the Office of Evaporated Things experiment page.
 * Asserts a minimal structure + the core interaction primitives exist in source.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/office-evaporated-things.astro")

let source
test("office-evaporated-things.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has a watchfulness register", () => {
  assert.ok(
    source.includes('id="watchfulness-register"'),
    "Should include watchfulness register element"
  )
})

test("page has an inventory container", () => {
  assert.ok(
    source.includes('id="inventory"'),
    "Should include inventory container element"
  )
})

test("page listens to visibilitychange events", () => {
  assert.ok(
    source.includes("visibilitychange"),
    "Should track tab visibilitychange"
  )
})

test("page updates deficit readout", () => {
  assert.ok(
    source.includes('id="deficit-readout"'),
    "Should have deficit readout element"
  )
})
