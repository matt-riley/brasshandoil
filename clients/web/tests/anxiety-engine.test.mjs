/**
 * TDD test for the Anxiety Engine experiment page.
 * Uses CSS @property (registered custom properties) for animated gradients.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/anxiety-engine.astro")

let source
test("anxiety-engine.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page uses CSS @property for registered custom properties", () => {
  assert.ok(
    source.includes("@property"),
    "Should use CSS @property for animatable custom properties"
  )
})

test("page has a calm-down button", () => {
  assert.ok(
    source.includes("calm-down") || source.includes("CALM DOWN"),
    "Should include a CALM DOWN button"
  )
})

test("page has anxiety gauge elements", () => {
  assert.ok(
    source.includes("gauge") || source.includes("meter") || source.includes("progress"),
    "Should include anxiety gauge/meter elements"
  )
})

test("page has absurd anxiety categories", () => {
  assert.ok(
    source.includes("stove") || source.includes("email") || source.includes("unread"),
    "Should include absurd everyday anxiety categories"
  )
})

test("calm-down button makes things worse", () => {
  assert.ok(
    source.includes("worse") || source.includes("escalat") || source.includes("amplif") || source.includes("increas"),
    "Should escalate anxiety on calm-down click"
  )
})

test("page animates with CSS transitions or keyframes", () => {
  assert.ok(
    source.includes("@keyframes") || source.includes("transition"),
    "Should use CSS animation"
  )
})

test("page has a report / official-looking structure", () => {
  assert.ok(
    source.includes("Department") || source.includes("Bureau") || source.includes("Report") || source.includes("Official"),
    "Should have bureaucratic framing"
  )
})
