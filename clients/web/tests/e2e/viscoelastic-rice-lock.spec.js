import { test, expect } from "@playwright/test"

test("viscoelastic rice lock page boots with overlay and active page-title", async ({ page }) => {
  await page.goto("/experiments/viscoelastic-rice-lock")

  await expect(
    page.getByRole("heading", { level: 1, name: /Viscoelastic Rice Lock/i })
  ).toBeVisible()

  // Verify onboarding/arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace and starts in solid phase", async ({ page }) => {
  await page.goto("/experiments/viscoelastic-rice-lock")
  
  await page.locator("#arm-button").click({ force: true })
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
  
  // Phase starts as solid, hubs connected starts at 0
  await expect(page.locator("#phase-status")).toHaveText(/STABLE MATRIX/i)
  await expect(page.locator("#speed-display")).toHaveText("0.0 px/f")
  await expect(page.locator("#status-display")).toHaveText(/CALIBRATION INCOMPLETE/i)
})

test("shearing velocity changes phase to liquid", async ({ page }) => {
  await page.goto("/experiments/viscoelastic-rice-lock")
  await page.locator("#arm-button").click({ force: true })

  // Verify initial solid state
  const root = page.locator("#viscoelastic-root")
  await expect(root).toHaveAttribute("data-phase", "solid")
  await page.waitForFunction(() => typeof window.__setShearVelocity === "function")

  // Use the exposed window test hook to set velocity above threshold (e.g., 15 px/f)
  await page.evaluate(() => {
    window.__setShearVelocity(15.0)
  })

  // Verify state updates to liquid
  await expect(root).toHaveAttribute("data-phase", "liquid")
  await expect(page.locator("#phase-status")).toHaveText(/SHEARED \(LIQUID\)/i)
})

test("connecting hubs via test hook activates lock button", async ({ page }) => {
  await page.goto("/experiments/viscoelastic-rice-lock")
  await page.locator("#arm-button").click({ force: true })

  await expect(page.locator("#lock-btn")).toBeDisabled()

  // Connect hubs using exposed hook
  await page.evaluate(() => {
    if (typeof window.__connectCalibrationHubs === "function") {
      window.__connectCalibrationHubs()
    }
  })

  // Verify hub cards are active and submit is enabled
  await expect(page.locator("#viscoelastic-root")).toHaveAttribute("data-hubs-connected", "4")
  await expect(page.locator("#lock-btn")).toBeEnabled()

  // Click lock button and verify success screen
  await page.locator("#lock-btn").click()
  await expect(page.locator("#success-screen")).toBeVisible()
  await expect(page.locator("#success-screen")).toContainText("Actuator Lock Stabilized")
})

test("density selection updates data attribute", async ({ page }) => {
  await page.goto("/experiments/viscoelastic-rice-lock")
  await page.locator("#arm-button").click({ force: true })

  const denseBtn = page.locator('button[data-density="dense"]')
  await denseBtn.click()

  await expect(denseBtn).toHaveClass(/active/)
  
  // Check that the root container data attribute updates
  const root = page.locator("#viscoelastic-root")
  await expect(root).toHaveAttribute("data-density", "dense")
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/viscoelastic-rice-lock")
  
  await page.locator("#arm-button").click({ force: true })

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
