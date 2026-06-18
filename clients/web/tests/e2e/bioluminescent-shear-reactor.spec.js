import { test, expect } from "@playwright/test"

test("bioluminescent shear reactor page boots with overlay and page-title", async ({ page }) => {
  await page.goto("/experiments/bioluminescent-shear-reactor")

  await expect(
    page.getByRole("heading", { level: 1, name: /Bioluminescent Shear Reactor/i })
  ).toBeVisible()

  // Verify arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace", async ({ page }) => {
  await page.goto("/experiments/bioluminescent-shear-reactor")
  
  await page.locator("#arm-button").click({ force: true })
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
})

test("test trigger shear helper lets user stabilize the reactor and win", async ({ page }) => {
  await page.goto("/experiments/bioluminescent-shear-reactor")
  await page.locator("#arm-button").click({ force: true })

  // Success screen is hidden initially
  await expect(page.locator("#success-screen")).not.toBeVisible()

  // Expose and invoke the triggerShear helper to bypass manual canvas dragging/keyboard inputs
  await page.waitForFunction(() => typeof window.__triggerShear === "function")
  await page.evaluate(() => {
    window.__triggerShear()
  })

  // The success screen should become visible once the calibration succeeds
  await expect(page.locator("#success-screen")).toBeVisible({ timeout: 10000 })
  await expect(page.locator("#success-screen")).toContainText("REACTOR CALIBRATION SUCCESSFUL")
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/bioluminescent-shear-reactor")
  
  await page.locator("#arm-button").click({ force: true })

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
