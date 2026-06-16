import { test, expect } from "@playwright/test"

test("gladiator tag rubbing page boots with overlay and page-title", async ({ page }) => {
  await page.goto("/experiments/gladiator-tag-rubbing")

  await expect(
    page.getByRole("heading", { level: 1, name: /Tessera Gladiatoria/i })
  ).toBeVisible()

  // Verify arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace", async ({ page }) => {
  await page.goto("/experiments/gladiator-tag-rubbing")
  
  await page.locator("#arm-button").click({ force: true })
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
})

test("test reveal-all helper unlocks translation console and lets user win", async ({ page }) => {
  await page.goto("/experiments/gladiator-tag-rubbing")
  await page.locator("#arm-button").click({ force: true })

  // Workspace is visible, success screen is hidden
  await expect(page.locator("#success-screen")).not.toBeVisible()

  // Expose and invoke the revealAll helper
  await page.waitForFunction(() => typeof window.__revealAll === "function")
  await page.evaluate(() => {
    window.__revealAll()
  })

  // Decoder panel is enabled or active
  const decPanel = page.locator("#decoder-panel")
  await expect(decPanel).toBeVisible()

  // Select the correct translation values
  await page.selectOption("#select-gladiator", "subagent")
  await page.selectOption("#select-owner", "deepmind")
  await page.selectOption("#select-sprint", "sp7")
  await page.selectOption("#select-consuls", "js-cpp")

  // The submit button should now be enabled
  const submitBtn = page.locator("#release-btn")
  await expect(submitBtn).toBeEnabled()

  // Click submit to trigger success screen
  await submitBtn.click({ force: true })
  await expect(page.locator("#success-screen")).toBeVisible()
  await expect(page.locator("#success-screen")).toContainText("RELEASED TO PROD")
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/gladiator-tag-rubbing")
  
  await page.locator("#arm-button").click({ force: true })

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
