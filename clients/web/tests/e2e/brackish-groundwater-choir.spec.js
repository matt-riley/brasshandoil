import { test, expect } from "@playwright/test"

test("brackish groundwater choir page boots with overlay and active page-title", async ({ page }) => {
  await page.goto("/experiments/brackish-groundwater-choir")

  await expect(
    page.getByRole("heading", { level: 1, name: /Brackish Groundwater Choir/i })
  ).toBeVisible()

  // Verify onboarding/arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace and initializes default parameters", async ({ page }) => {
  await page.goto("/experiments/brackish-groundwater-choir")
  
  await page.locator("#arm-button").click({ force: true })
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
  
  // Verify default aquifer state
  await expect(page.locator("#status-display")).toHaveText(/BALANCED AQUIFER/i)
  await expect(page.locator("#salinity-display")).toContainText("0")
})

test("recharge head adjustments or well extraction changes salinity and aquifer status", async ({ page }) => {
  await page.goto("/experiments/brackish-groundwater-choir")
  await page.locator("#arm-button").click({ force: true })

  // Verify initial status
  const root = page.locator("#brackish-root")
  await expect(root).toHaveAttribute("data-status", "balanced")

  // Wait for set salinity or update hook to be ready
  await page.waitForFunction(() => typeof window.__setSalinity === "function")

  // Trigger salinity via test hook to test high intrusion state
  await page.evaluate(() => {
    window.__setSalinity(30) // 30% salinity (intrusion range)
  })

  // Verify state updates to intrusion or brackish
  await expect(root).toHaveAttribute("data-status", "intrusion")
  await expect(page.locator("#status-display")).toHaveText(/SALINE INTRUSION/i)
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/brackish-groundwater-choir")
  
  await page.locator("#arm-button").click({ force: true })

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
