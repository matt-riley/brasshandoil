import { test, expect } from "@playwright/test"

test("voyager telemetry recalibrator page boots with overlay and active page-title", async ({ page }) => {
  await page.goto("/experiments/voyager-telemetry-recalibrator")

  await expect(
    page.getByRole("heading", { level: 1, name: /Voyager Telemetry Recalibrator/i })
  ).toBeVisible()

  // Verify onboarding/arming overlay is visible
  await expect(page.locator("#arming-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace and displays static", async ({ page }) => {
  await page.goto("/experiments/voyager-telemetry-recalibrator")
  
  await page.locator("#arm-button").click()
  
  await expect(page.locator("#arming-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
  
  // Frequency display starts at random or detuned value (e.g., not 2114.6 MHz)
  const freqText = await page.locator("#frequency-display").textContent()
  expect(freqText).not.toContain("2114.6 MHz")
  
  await expect(page.locator("#signal-strength-display")).toHaveText("0%")
  await expect(page.locator("#status-display")).toHaveText(/SIGNAL LOST \/\/ FDS FAILURE/i)
})

test("quarantining memory, re-routing, and tuning to 2114.6 MHz restores communication", async ({ page }) => {
  await page.goto("/experiments/voyager-telemetry-recalibrator")
  await page.locator("#arm-button").click()

  // Verify submit button is disabled initially
  await expect(page.locator("#reallocate-btn")).toBeDisabled()

  // Use test hooks to complete the steps
  await page.evaluate(() => {
    if (typeof window.__quarantineCorruptedSector === "function") {
      window.__quarantineCorruptedSector()
    }
    if (typeof window.__setCarrierFrequency === "function") {
      window.__setCarrierFrequency(2114.6)
    }
  })

  // Verify status updates to active and reallocate can be clicked
  await expect(page.locator("#frequency-display")).toHaveText("2114.6 MHz")
  await expect(page.locator("#signal-strength-display")).toHaveText("100%")
  await expect(page.locator("#status-display")).toHaveText(/CARRIER LOCK ESTABLISHED/i)
  await expect(page.locator("#reallocate-btn")).toBeEnabled()
})

test("keyboard navigation supports adjusting the frequency", async ({ page }) => {
  await page.goto("/experiments/voyager-telemetry-recalibrator")
  await page.locator("#arm-button").click()

  // Focus the slider
  await page.locator("#carrier-slider").focus()

  // Set to a known value via evaluate first to make key presses predictable
  await page.evaluate(() => {
    if (typeof window.__setCarrierFrequency === "function") {
      window.__setCarrierFrequency(2114.0)
    }
  })

  // Press ArrowRight to increase the frequency
  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#frequency-display")).toHaveText("2114.1 MHz")

  // Press Shift+ArrowRight to jump by 0.5 MHz
  await page.keyboard.press("Shift+ArrowRight")
  await expect(page.locator("#frequency-display")).toHaveText("2114.6 MHz")
  
  // Signal should hit 100% (or high coherence if quarantined too)
  await page.evaluate(() => {
    if (typeof window.__quarantineCorruptedSector === "function") {
      window.__quarantineCorruptedSector()
    }
  })
  await expect(page.locator("#signal-strength-display")).toHaveText("100%")
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/voyager-telemetry-recalibrator")
  
  await page.locator("#arm-button").click()

  // Verify no horizontal overflow
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
