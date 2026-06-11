import { test, expect } from "@playwright/test"

test("twistronic lattice tuner page boots with overlay and active page-title", async ({ page }) => {
  await page.goto("/experiments/twistronic-lattice-tuner")

  await expect(
    page.getByRole("heading", { level: 1, name: /Twistronic Lattice Tuner/i })
  ).toBeVisible()

  // Verify onboarding/arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace and starts at 0.0 degrees", async ({ page }) => {
  await page.goto("/experiments/twistronic-lattice-tuner")
  
  await page.locator("#arm-button").click()
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
  
  // Angle display starts at 0.0°
  await expect(page.locator("#angle-display")).toHaveText("0.0°")
  await expect(page.locator("#coherence-display")).toHaveText("0%")
  await expect(page.locator("#status-display")).toHaveText(/DISORDERED LATTICE/i)
})

test("changing twist angle to 1.1 degrees achieves superconductive coherence", async ({ page }) => {
  await page.goto("/experiments/twistronic-lattice-tuner")
  await page.locator("#arm-button").click()

  // Verify initial state
  await expect(page.locator("#angle-display")).toHaveText("0.0°")
  await expect(page.locator("#submit-btn")).toBeDisabled()

  // Use the exposed window test hook to set the angle exactly to 1.1 degrees
  await page.evaluate(() => {
    if (typeof window.__setTwistAngle === "function") {
      window.__setTwistAngle(1.1)
    }
  })

  // Verify state updates to magic angle
  await expect(page.locator("#angle-display")).toHaveText("1.1°")
  await expect(page.locator("#coherence-display")).toHaveText("100%")
  await expect(page.locator("#status-display")).toHaveText(/SUPERCONDUCTIVE COHERENCE/i)
  await expect(page.locator("#submit-btn")).toBeEnabled()
})

test("keyboard navigation supports adjusting the angle", async ({ page }) => {
  await page.goto("/experiments/twistronic-lattice-tuner")
  await page.locator("#arm-button").click()

  // Focus the dial by pressing Tab or focusing explicitly
  await page.locator("#rotary-dial").focus()

  // Press ArrowRight to increase the angle
  await page.keyboard.press("ArrowRight")
  
  // Angle should increase by 0.1°
  await expect(page.locator("#angle-display")).toHaveText("0.1°")

  // Press Shift+ArrowRight to increase by 1.0°
  await page.keyboard.press("Shift+ArrowRight")
  await expect(page.locator("#angle-display")).toHaveText("1.1°")
  
  // Coherence should hit 100% since it's 1.1°
  await expect(page.locator("#coherence-display")).toHaveText("100%")
})

test("switching patterns updates active pattern state", async ({ page }) => {
  await page.goto("/experiments/twistronic-lattice-tuner")
  await page.locator("#arm-button").click()

  const fresnelBtn = page.locator('button[data-pattern="fresnel"]')
  await fresnelBtn.click()

  await expect(fresnelBtn).toHaveClass(/active/)
  
  // Check that the root container data attribute updates
  const root = page.locator("#calibration-root")
  await expect(root).toHaveAttribute("data-pattern", "fresnel")
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/twistronic-lattice-tuner")
  
  await page.locator("#arm-button").click()

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
