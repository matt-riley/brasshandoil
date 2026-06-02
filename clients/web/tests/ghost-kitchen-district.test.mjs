/**
 * TDD contract for the Ghost Kitchen District experiment.
 * Ordering dinner should reveal more storefront aliases while never producing
 * a meal, turning a city block into a haunted delivery-app satire.
 */
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/experiments/ghost-kitchen-district.astro")
const indexPath = resolve(__dirname, "../src/pages/experiments/index.astro")

let source
test("ghost-kitchen-district.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("page renders a canvas-backed midnight district", () => {
  assert.ok(
    source.includes('id="steam-canvas"') &&
      source.includes("getContext") &&
      /MAX_STEAM\s*=\s*\d+/.test(source),
    "Should include a bounded steam canvas"
  )
})

test("district exposes the storefront aliases and order control", () => {
  assert.ok(
    source.includes('id="kitchen-block"') &&
      source.includes('id="place-order"') &&
      source.includes('id="dispatch-line"') &&
      source.includes('aria-live="polite"'),
    "Should include the street, order button, and live dispatch result"
  )
})

test("placing an order reveals kitchens without delivering dinner", () => {
  assert.ok(
    source.includes('id="kitchen-count"') &&
      source.includes('id="meal-count"') &&
      source.includes("addGhostKitchen") &&
      /kitchenCount\s*=\s*Math\.min/.test(source) &&
      /MAX_KITCHENS\s*=\s*\d+/.test(source) &&
      /mealCount\s*=\s*0/.test(source),
    "Ordering should reveal bounded aliases while delivered meals remain zero"
  )
})

test("couriers multiply as orders become less real", () => {
  assert.ok(
    source.includes('id="courier-lane"') &&
      source.includes("addCourier") &&
      /MAX_COURIERS\s*=\s*\d+/.test(source),
    "Should dispatch a bounded courier swarm"
  )
})

test("animated district respects reduced motion", () => {
  assert.ok(
    source.includes("requestAnimationFrame") &&
      source.includes("prefers-reduced-motion"),
    "Should animate the steam cheaply and account for reduced motion"
  )
})

test("page keeps the ghost-kitchen satire inside the scene", () => {
  assert.ok(
    /ghost/i.test(source) && /kitchen/i.test(source) && /meal/i.test(source),
    "Should frame the page as a meal-delivery haunting"
  )
  assert.ok(
    !/canvas api/i.test(source) && !/pointer events api/i.test(source),
    "Should not name browser APIs in user-facing copy"
  )
})

test("experiments index includes Ghost Kitchen District", () => {
  const indexSource = readFileSync(indexPath, "utf8")
  assert.match(indexSource, /slug:\s*["']ghost-kitchen-district["']/i)
  assert.match(indexSource, /title:\s*["']Ghost Kitchen District["']/i)
  assert.match(indexSource, /agent:\s*["']Codex["']/i)
})
