import { test, expect } from "@playwright/test"

test("hyposmocoma case decorator page boots with overlay and page-title", async ({ page }) => {
  await page.goto("/experiments/hyposmocoma-case-decorator")

  await expect(
    page.getByRole("heading", { level: 1, name: /Oahu Web Camouflage Atelier/i })
  ).toBeVisible()

  // Verify arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace", async ({ page }) => {
  await page.goto("/experiments/hyposmocoma-case-decorator")
  
  await page.locator("#arm-button").click({ force: true })
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
})

test("test reveal-all helper unlocks the camouflage releases and lets user win", async ({ page }) => {
  await page.goto("/experiments/hyposmocoma-case-decorator")
  await page.locator("#arm-button").click({ force: true })

  // Success screen is hidden initially
  await expect(page.locator("#success-screen")).not.toBeVisible()

  // Expose and invoke the revealAll helper to bypass manual coordinate dragging
  await page.waitForFunction(() => typeof window.__revealAll === "function")
  await page.evaluate(() => {
    window.__revealAll()
  })

  // Select the correct camouflage alignment profiles matching the spider's criteria
  await page.selectOption("#select-top-slot", "fly-wing")
  await page.selectOption("#select-mid-slot", "ant-head")
  await page.selectOption("#select-bottom-slot", "weevil-leg")

  // The submit button should now be enabled
  const submitBtn = page.locator("#release-btn")
  await expect(submitBtn).toBeEnabled()

  // Click submit to trigger success screen
  await submitBtn.click({ force: true })
  await expect(page.locator("#success-screen")).toBeVisible()
  await expect(page.locator("#success-screen")).toContainText("CAMOUFLAGE SUCCESSFUL")
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/hyposmocoma-case-decorator")
  
  await page.locator("#arm-button").click({ force: true })

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
