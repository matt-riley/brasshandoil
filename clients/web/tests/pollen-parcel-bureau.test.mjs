/**
 * TDD contract for the Pollen Parcel Bureau experiment.
 * The page should ship as a daylight routing counter where pollen parcels are
 * stamped through fixed postal trays while the animated field stays layout-safe.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/pollen-parcel-bureau.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("pollen-parcel-bureau.astro file exists", () => {
  try {
    source = readFileSync(pagePath, "utf8")
    assert.ok(source.length > 0, "File should not be empty")
  } catch {
    assert.fail("pollen-parcel-bureau.astro does not exist yet. TDD failure expected.")
  }
})

test("page renders a parcel bureau with stable trays and airborne parcels", () => {
  assert.ok(source.includes('id="pollen-bureau"'), "Should include the experiment root")
  assert.ok(source.includes('id="sorting-field"'), "Should include the interactive sorting field")
  assert.ok(source.includes('id="postal-canvas"'), "Should include the pollen parcel canvas")
  assert.ok(source.includes('id="route-ribbon"'), "Should include the visible route ribbon")
  assert.ok(source.includes('class="parcel-tray"'), "Should include fixed parcel tray controls")
  assert.ok(source.includes("requestAnimationFrame"), "Should animate airborne parcel drift")
})

test("page exposes semantic readouts and bureau controls", () => {
  for (const id of [
    "delivery-count",
    "current-route",
    "nectar-index",
    "counter-state",
    "dispatch-button",
    "recall-button",
  ]) {
    assert.ok(source.includes(`id="${id}"`), `Should include #${id}`)
  }
})

test("interaction logic supports pointer, touch, keyboard, and normalized coordinates", () => {
  assert.ok(
    source.includes("pointermove") &&
      source.includes("touchstart") &&
      source.includes("keydown") &&
      source.includes("normalizedCursor") &&
      source.includes("stampParcel") &&
      source.includes("dataset.deliveries"),
    "Should support resilient multimodal sorting and observable delivery state"
  )
})

test("visible narrative is distinct and hides implementation details", () => {
  assert.match(source, /Pollen Parcel Bureau/i)
  assert.match(source, /parcel/i)
  assert.match(source, /route/i)
  assert.doesNotMatch(source, /web api|pointer events api|animation frame|playwright/i)
})

test("experiments index includes Pollen Parcel Bureau", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']pollen-parcel-bureau["']/i)
  assert.match(indexSource, /title:\s*["']Pollen Parcel Bureau["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
