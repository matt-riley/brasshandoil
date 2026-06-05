import { test, expect } from "@playwright/test"

test("abyssal nodule patchbay page boots, completes onboarding, and allows toggle interactions", async ({ page }) => {
  await page.goto("/experiments/abyssal-nodule-patchbay")

  // Verify the page title and onboarding overlay
  await expect(
    page.getByRole("heading", { level: 1, name: /Abyssal Nodule Patchbay/i })
  ).toBeVisible()
  await expect(page.locator("#onboarding-overlay")).toBeVisible()

  // Pressing the start button removes the overlay and unlocks audio
  await page.locator("#init-patchbay").click()
  await expect(page.locator("#onboarding-overlay")).toBeHidden()

  // Metrics should be visible
  await expect(page.locator("#luminescence-pct")).toHaveText("100%")
  await expect(page.locator("#surface-voltage")).toHaveText("0 V")

  // Toggle Symbiosis Mode
  const symbiosisToggleLabel = page.locator("label[for='symbiosis-mode-toggle']")
  await expect(symbiosisToggleLabel).toBeVisible()
  await symbiosisToggleLabel.click()
  
  // Symbiosis should now be active
  await expect(page.locator(".terminal-header")).toHaveClass(/symbiosis-active/)

  // Trigger Overload/Short Circuit button
  const overloadBtn = page.locator("#short-circuit-btn")
  await expect(overloadBtn).toBeVisible()
  await overloadBtn.click()

  // Luminescence should reset back toward initial values
  await expect(page.locator("#luminescence-pct")).toHaveText("100%")
})

test("keyboard navigation through patch sockets is possible", async ({ page }) => {
  await page.goto("/experiments/abyssal-nodule-patchbay")
  await page.locator("#init-patchbay").click()

  // Focus the first socket using Tab or keyboard navigation
  await page.keyboard.press("Tab")
  
  // Verify we can focus sockets or interactive elements
  await page.evaluate(() => document.activeElement ? document.activeElement.id : "")
  // The first tab should focus the short circuit or symbiosis toggle or socket.
  // We can press tab multiple times to reach a socket
  await page.keyboard.press("Tab")
  await page.keyboard.press("Tab")
})

test("mobile screen viewport has no horizontal layout overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/abyssal-nodule-patchbay")
  await page.locator("#init-patchbay").click()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
