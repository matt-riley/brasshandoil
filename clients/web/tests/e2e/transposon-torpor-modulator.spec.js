import { test, expect } from "@playwright/test"

test("transposon torpor modulator page boots with overlay and active page-title", async ({ page }) => {
  await page.goto("/experiments/transposon-torpor-modulator")

  await expect(
    page.getByRole("heading", { level: 1, name: /Transposon Torpor Modulator/i })
  ).toBeVisible()

  // Verify onboarding/arming overlay is visible
  await expect(page.locator("#torpor-overlay")).toBeVisible()
  
  // Workspace is hidden initially
  await expect(page.locator("#workspace")).not.toBeVisible()
})

test("clicking arm button reveals workspace and starts at 60Hz", async ({ page }) => {
  await page.goto("/experiments/transposon-torpor-modulator")
  
  await page.locator("#arm-button").click()
  
  await expect(page.locator("#torpor-overlay")).not.toBeVisible()
  await expect(page.locator("#workspace")).toBeVisible()
  
  // Frequency display starts at 60Hz
  await expect(page.locator("#freq-display")).toHaveText("60.0 Hz")
  await expect(page.locator("#equilibrium-display")).toHaveText(/ACCELERATION/i)
})

test("interacting with a transposon gene decreases metabolic rate", async ({ page }) => {
  await page.goto("/experiments/transposon-torpor-modulator")
  await page.locator("#arm-button").click()

  // Verify initial state
  await expect(page.locator("#freq-display")).toHaveText("60.0 Hz")

  // Find a transposon bead (index 2 or 5 initially)
  const transposonBead = page.locator('.gene-bead[data-transposon="true"]').first()
  // Click to trigger transposition (using click to avoid hover stability waits on floating nodes)
  await transposonBead.click({ force: true })
  
  // Metabolic rate should slow to 30.0 Hz
  await expect(page.locator("#freq-display")).toHaveText("30.0 Hz")

  // Click the next transposon bead (it should have jumped)
  const nextTransposon = page.locator('.gene-bead[data-transposon="true"]').first()
  await nextTransposon.click({ force: true })

  // Frequency drops to 15.0 Hz
  await expect(page.locator("#freq-display")).toHaveText("15.0 Hz")
})

test("keyboard navigation supports focusing and activating beads", async ({ page }) => {
  await page.goto("/experiments/transposon-torpor-modulator")
  await page.locator("#arm-button").click()

  // Initially Locus 1 is focused. Let's press ArrowRight twice to reach Locus 3 (which is a transposon)
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowRight")

  // Press Enter to interact with the gene
  await page.keyboard.press("Enter")

  // Frequency should drop to 30Hz because we triggered Locus 3 transposon
  await expect(page.locator("#freq-display")).toHaveText("30.0 Hz")
})

test("emergency accelerate button triggers rapid transposon leaps and speeds up torpor", async ({ page }) => {
  await page.goto("/experiments/transposon-torpor-modulator")
  await page.locator("#arm-button").click()

  // Reset/overclock button click
  await page.locator("#reset-btn").click()

  // Frequency should decrease lower than initial 60Hz due to the cascade
  await expect.poll(async () => {
    const freqText = await page.locator("#freq-display").textContent()
    const freqVal = parseFloat(freqText || "60.0")
    return freqVal
  }).toBeLessThan(30.0)
})

test("narrow viewport mobile rendering prevents horizontal scroll overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/transposon-torpor-modulator")
  
  await page.locator("#arm-button").click()

  // Make sure beads wrapper fits screen
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
