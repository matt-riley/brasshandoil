/**
 * TDD test for the Moth Oracle experiment page.
 * Uses Node's built-in test runner to assert the page structure and core APIs.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/moth-oracle.astro")

let source
test("moth-oracle.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page has an oracle stage container", () => {
  assert.ok(
    source.includes('id="oracle-stage"'),
    "Should include the visual stage container"
  )
})

test("page has a button for asking the oracle", () => {
  assert.ok(
    source.includes("<button") && source.includes("Ask the moths"),
    "Should include an oracle trigger button"
  )
})

test("page reacts to pointer movement", () => {
  assert.ok(
    source.includes("pointermove"),
    "Should listen for pointer movement"
  )
})

test("page animates with requestAnimationFrame", () => {
  assert.ok(
    source.includes("requestAnimationFrame"),
    "Should animate the swarm"
  )
})

test("page generates moth elements dynamically", () => {
  assert.ok(
    source.includes("createElement") && source.includes("mothCount"),
    "Should create moth elements in script"
  )
})

test("page contains a pool of oracle phrases", () => {
  assert.ok(
    source.includes("prophecyPool"),
    "Should include phrases for oracle responses"
  )
})
