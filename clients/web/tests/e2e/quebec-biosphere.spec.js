import { test, expect } from "@playwright/test"

test("Quebec Biosphere page boots, completes onboarding, and allows grid manipulation", async ({ page }) => {
  await page.goto("/experiments/quebec-biosphere")

  // 1. Verify the page title and onboarding overlay
  await expect(
    page.getByRole("heading", { level: 1, name: /Québec Biosphere/i })
  ).toBeVisible()
  await expect(page.locator("#onboarding-overlay")).toBeVisible()

  // 2. Dismiss onboarding overlay
  await page.locator("#init-button").click()
  await expect(page.locator("#onboarding-overlay")).toBeHidden()

  // 3. Verify initial telemetry readouts
  await expect(page.locator("#symbiosis-index")).toHaveText("0%")
  await expect(page.locator("#active-grid-lines")).toHaveText("0")
  await expect(page.locator("#spore-blooms")).toHaveText("0")

  // 4. Draw on the Grid pane (CAD board)
  // Let's click at specific coordinates relative to the CAD grid
  const gridPane = page.locator("#cad-grid")
  await expect(gridPane).toBeVisible()
  
  const box = await gridPane.boundingBox()
  if (box) {
    // Drag to draw a route
    await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.3)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5)
    await page.mouse.up()
  }

  // Active grid elements should update
  await expect.poll(async () => {
    const txt = await page.locator("#active-grid-lines").textContent()
    return parseInt(txt || "0", 10)
  }).toBeGreaterThan(0)

  // 5. Test keyboard support
  // Press arrow keys and place a substation
  await page.keyboard.press("ArrowDown")
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Digit2") // Places Substation

  // Check state update
  const statusText = await page.locator("#telemetry-status").textContent()
  expect(statusText).toContain("Substation")

  // 6. Test Quick Bloom button to trigger high-growth phase
  const bloomBtn = page.locator("#quick-bloom-btn")
  await expect(bloomBtn).toBeVisible()
  await bloomBtn.click()

  // Spore blooms should increase
  await expect.poll(async () => {
    const txt = await page.locator("#spore-blooms").textContent()
    return parseInt(txt || "0", 10)
  }).toBeGreaterThan(0)

  // Symbiosis Index should increase
  await expect.poll(async () => {
    const txt = await page.locator("#symbiosis-index").textContent()
    return parseInt(txt || "0", 10)
  }).toBeGreaterThan(0)
})

test("Quebec Biosphere does not have horizontal overflow on mobile viewports", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/quebec-biosphere")
  await page.locator("#init-button").click()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
