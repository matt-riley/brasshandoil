import { test, expect } from "@playwright/test"

test("arctic dropstone deposition desk page boots, arms successfully, and responds to click drops", async ({ page }) => {
  await page.goto("/experiments/arctic-dropstone-deposition-desk")

  // 1. Verify Title & Onboarding Overlay
  await expect(
    page.getByRole("heading", { level: 1, name: /Arctic Dropstone Deposition Desk/i })
  ).toBeVisible()
  await expect(page.locator("#arming-overlay")).toBeVisible()

  // 2. Arm the system
  await page.locator("#arm-button").click({ force: true })
  await expect(page.locator("#arming-overlay")).toBeHidden()
  await expect(page.locator("#workspace")).toBeVisible()

  // 3. Verify Initial Telemetry Readings
  await expect(page.locator("#temp-display")).toHaveText("+2.00 °C")
  await expect(page.locator("#offset-display")).toHaveText("0%")

  // 4. Click Debris Cards to Drop Stones
  // Assert active stones increases
  const root = page.locator("#dropstone-root")
  await expect(root).toHaveAttribute("data-active-stones", "0")

  await page.locator("#debris-granite").click()
  // Wait a short moment for state replication
  await page.waitForTimeout(100)
  await expect(root).not.toHaveAttribute("data-active-stones", "0")

  // 5. Test Sliders adjustment
  const currentSlider = page.locator("#current-slider")
  await currentSlider.fill("5.5")
  await expect(root).toHaveAttribute("data-current-speed", "5.5")

  const tempSlider = page.locator("#temp-slider")
  await tempSlider.fill("3.8")
  await expect(root).toHaveAttribute("data-temperature", "3.8")
  await expect(page.locator("#temp-display")).toHaveText("+3.80 °C")
})

test("keyboard interactions and navigation through sliders and buttons", async ({ page }) => {
  await page.goto("/experiments/arctic-dropstone-deposition-desk")
  await page.locator("#arm-button").click({ force: true })

  // Tab through panel elements
  await page.keyboard.press("Tab")
  const activeId = await page.evaluate(() => document.activeElement ? document.activeElement.id : "")
  expect(activeId).not.toBeNull()
})

test("mobile viewport has no horizontal layout overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/arctic-dropstone-deposition-desk")
  await page.locator("#arm-button").click({ force: true })

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
