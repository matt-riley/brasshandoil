import { test, expect } from "@playwright/test"

test("enhanced browser games boots with onboarding overlay and quiet readings", async ({ page }) => {
  await page.goto("/experiments/enhanced-browser-games")

  await expect(
    page.getByRole("heading", { level: 1, name: /Enhanced Games/i })
  ).toBeVisible()
  
  // Verify onboarding overlay is visible
  await expect(page.locator("#ebg-overlay")).toBeVisible()
  await expect(page.locator("#metric-verdict")).toHaveText(/CLEAN/i)
  await expect(page.locator("#metric-temp")).toHaveText("37°C")
})

test("arming audiometry dismisses overlay and updates status", async ({ page }) => {
  await page.goto("/experiments/enhanced-browser-games")
  
  await page.locator("#arm-button").click()
  await expect(page.locator("#ebg-overlay")).not.toBeVisible()
  await expect(page.locator("#ebg-root")).toHaveAttribute("data-game-status", "armed")
})

test("tab switching displays different minigame panels", async ({ page }) => {
  await page.goto("/experiments/enhanced-browser-games")
  await page.locator("#arm-button").click()

  // Click Slider tab
  await page.locator("#tab-balance").click()
  await expect(page.locator("#panel-balance")).toBeVisible()
  await expect(page.locator("#panel-scroll")).not.toBeVisible()

  // Click Load Lifter tab
  await page.locator("#tab-lifting").click()
  await expect(page.locator("#panel-lifting")).toBeVisible()
  await expect(page.locator("#panel-balance")).not.toBeVisible()
})

test("simulating stimulants affects telemetry metrics", async ({ page }) => {
  await page.goto("/experiments/enhanced-browser-games")
  await page.locator("#arm-button").click()

  // Enable Anabolic rAF
  const rafCard = page.locator("label[for='stim-raf']")
  await rafCard.click()
  await expect(page.locator("#metric-temp")).toHaveText("58°C")
  await expect(page.locator("#metric-verdict")).toHaveText(/DOPED/i)

  // Enable setTimeout Beta-Blocker
  const delayCard = page.locator("label[for='stim-delay']")
  await delayCard.click()
  await expect(page.locator("#metric-temp")).toHaveText("79°C")

  // Purge all injections
  await page.locator("#purge-button").click()
  await expect(page.locator("#metric-temp")).toHaveText("37°C")
  await expect(page.locator("#metric-verdict")).toHaveText(/CLEAN/i)
})

test("load lifter heave increases node count and can stack overflow", async ({ page }) => {
  await page.goto("/experiments/enhanced-browser-games")
  await page.locator("#arm-button").click()
  await page.locator("#tab-lifting").click()

  const heaveBtn = page.locator("#btn-heave")
  
  // Press and hold using mousedown
  await heaveBtn.dispatchEvent("mousedown")
  
  // Wait a short bit to let progress accumulate
  await page.waitForTimeout(300)
  await heaveBtn.dispatchEvent("mouseup")

  // Mass should be non-zero
  await expect.poll(async () => {
    const text = await page.locator("#lift-mass-val").textContent();
    return parseInt(text || "0");
  }).toBeGreaterThan(0)

  // Test Stack Overflow
  // Turn on rAF to speed it up
  await page.locator("label[for='stim-raf']").click()
  await heaveBtn.dispatchEvent("mousedown")
  
  // Let it go over 98% (rAF is fast, so 600ms is plenty)
  await page.waitForTimeout(600)
  
  // Integrity metric should crash, verdict should be SYSTEM CRASH
  await expect(page.locator("#metric-verdict")).toHaveText(/SYSTEM CRASH/i)
  await expect(page.locator(".lifter-log")).toContainText(/RangeError/i)
})

test("narrow screens keep the layout clean without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/enhanced-browser-games")
  
  await page.locator("#arm-button").click()
  await expect(page.locator("#btn-start-scroll")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
