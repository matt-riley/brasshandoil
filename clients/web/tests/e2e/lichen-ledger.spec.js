import { test, expect } from "@playwright/test"

test("lichen ledger page boots, completes onboarding, and inoculates assets", async ({ page }) => {
  await page.goto("/experiments/lichen-ledger")

  // Verify the page title and onboarding overlay
  await expect(
    page.getByRole("heading", { level: 1, name: /Lichen Ledger/i })
  ).toBeVisible()
  await expect(page.locator("#onboarding-overlay")).toBeVisible()

  // Pressing the start button removes the overlay and unlocks audio
  await page.locator("#init-button").click()
  await expect(page.locator("#onboarding-overlay")).toBeHidden()

  // Metrics should be visible
  await expect(page.locator("#symbiosis-pct")).toHaveText("0.0%")
  await expect(page.locator("#spore-count")).toHaveText("0")

  // Select first row spore button and click it to inoculate
  const firstRowBtn = page.locator(".spore-row-btn").first()
  await firstRowBtn.click()

  // Verify symbiosis pct increases and row changes to composted state
  await expect.poll(async () => {
    const text = await page.locator("#symbiosis-pct").textContent()
    return parseFloat(text || "0")
  }).toBeGreaterThan(0)

  // Verify the row text gets mutated or contains a lichen name
  // The first row was originally Global Carbon Futures, check that its state becomes symbiotic
  await expect(page.locator(".asset-row").first()).toHaveClass(/composted/)
})

test("spore bomb button inoculates the entire ledger at once", async ({ page }) => {
  await page.goto("/experiments/lichen-ledger")
  await page.locator("#init-button").click()

  // Verify symbiosis is not 100% initially
  await expect(page.locator("#symbiosis-pct")).not.toHaveText("100.0%")

  // Click the spore bomb button
  await page.locator("#spore-bomb-btn").click()

  // Symbiosis should now be 100%
  await expect(page.locator("#symbiosis-pct")).toHaveText("100.0%")
  await expect(page.locator(".asset-row.composted")).toHaveCount(5)
})

test("keyboard controls allow navigation and inoculation", async ({ page }) => {
  await page.goto("/experiments/lichen-ledger")
  await page.locator("#init-button").click()

  // Pressing down key focuses first row or its button, and Enter inoculates it
  await page.keyboard.press("ArrowDown")
  await page.keyboard.press("Enter")

  // Symbiosis pct should increase
  await expect.poll(async () => {
    const text = await page.locator("#symbiosis-pct").textContent()
    return parseFloat(text || "0")
  }).toBeGreaterThan(0)
})

test("narrow screens keep the ledger readable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/lichen-ledger")
  await page.locator("#init-button").click()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
