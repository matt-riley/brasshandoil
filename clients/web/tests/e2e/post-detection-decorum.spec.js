import { test, expect } from "@playwright/test"

test("post-detection-decorum boots with wheel, validator nodes, and quiet status", async ({ page }) => {
  await page.goto("/experiments/post-detection-decorum")

  await expect(
    page.getByRole("heading", { level: 1, name: /Post-Detection Decorum/i })
  ).toBeVisible()
  await expect(page.locator("#validation-wheel")).toBeVisible()
  await expect(page.locator(".validator-node")).toHaveCount(3)
  await expect(page.locator("#system-status")).toContainText(/awaiting verification/i)
  await expect(page.locator("#lock-btn")).toBeDisabled()
})

test("keyboard navigation rotates the wheel and updates alignment focus", async ({ page }) => {
  await page.goto("/experiments/post-detection-decorum")

  const wheel = page.locator("#validation-wheel")
  await wheel.focus()

  // Initial angle attribute
  await expect(wheel).toHaveAttribute("data-angle", "0")

  // Press ArrowRight to rotate right
  await page.keyboard.press("ArrowRight")
  await expect(wheel).toHaveAttribute("data-angle", "5")

  // Press ArrowLeft to rotate left
  await page.keyboard.press("ArrowLeft")
  await expect(wheel).toHaveAttribute("data-angle", "0")
})

test("locks nodes when aligned and allows transmission after all verified", async ({ page }) => {
  await page.goto("/experiments/post-detection-decorum")

  // Wait for the script to load and set the window helper
  await page.waitForFunction(() => typeof window.__setAngleAndLock === 'function')

  // We will expose a test helper on window to set the angle and lock nodes instantly in tests
  await page.evaluate(() => {
    // Force align to first node and click lock
    window.__setAngleAndLock(45) // First validator angle
  })
  await expect(page.locator(".validator-node").nth(0)).toHaveClass(/verified/)

  await page.evaluate(() => {
    window.__setAngleAndLock(180) // Second validator angle
  })
  await expect(page.locator(".validator-node").nth(1)).toHaveClass(/verified/)

  await page.evaluate(() => {
    window.__setAngleAndLock(300) // Third validator angle
  })
  await expect(page.locator(".validator-node").nth(2)).toHaveClass(/verified/)

  // Once all three are verified, the transmission button should be enabled
  await expect(page.locator("#lock-btn")).toBeEnabled()
  await page.locator("#lock-btn").click()

  // Verify the system transitions to draft stage
  await expect(page.locator("#draft-container")).toBeVisible()

  // Interact with custom text area sanitization
  const customTextArea = page.locator("#custom-note")
  await customTextArea.fill("A".repeat(56))
  // Should auto sanitize
  await expect(customTextArea).toHaveValue(/Protocol 4b/i)
})

test("narrow screens keep the interface usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/post-detection-decorum")

  await expect(
    page.getByRole("heading", { level: 1, name: /Post-Detection Decorum/i })
  ).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
