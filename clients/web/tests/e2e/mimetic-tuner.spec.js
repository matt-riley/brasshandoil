import { test, expect } from "@playwright/test"

test("mimetic tuner page loads with bridge, readouts, and controls", async ({ page }) => {
  await page.goto("/experiments/mimetic-tuner")

  await expect(
    page.getByRole("heading", { level: 1, name: /Mimetic Tuner/i })
  ).toBeVisible()

  await expect(page.locator("#bridge-svg")).toBeVisible()
  await expect(page.locator("#scope-canvas")).toBeVisible()
  await expect(page.locator("#calibrate-switch")).toBeVisible()
  await expect(page.locator("#damp-button")).toBeVisible()
  await expect(page.locator("#recalibrate-button")).toBeVisible()
})

test("calibration button toggles the compliance status", async ({ page }) => {
  await page.goto("/experiments/mimetic-tuner")

  const btn = page.locator("#calibrate-switch")
  const led = page.locator("#calibration-led")
  const msg = page.locator("#calibration-message")

  // Starts off
  await expect(led).toHaveClass(/led-off/)
  await expect(msg).toContainText(/muted/i)

  // Toggle on
  await btn.click()
  await expect(led).toHaveClass(/led-on/)
  await expect(msg).toContainText(/online/i)

  // Toggle off
  await btn.click()
  await expect(led).toHaveClass(/led-off/)
  await expect(msg).toContainText(/muted/i)
})

test("turning pegs alters alignment displays", async ({ page }) => {
  await page.goto("/experiments/mimetic-tuner")
  await page.locator("#calibrate-switch").click()

  // Verify alignment starts flat/off-calibrate or as unstable before context starts, and changes on rotation
  const devCell = page.locator("#row-0 .str-dev")
  await expect(devCell).toContainText(/ALIGNED/i) // Starts standard calibrated at 0deg

  // Click peg-0 to tune it sharp (+15deg)
  const peg = page.locator("#peg-0")
  await peg.click()

  // Wait a small moment for state update
  await page.waitForTimeout(100)
  await expect(devCell).toContainText(/▲ 15°/i)
})

test("strumming strings accumulates compliance leakage", async ({ page }) => {
  await page.goto("/experiments/mimetic-tuner")
  await page.locator("#calibrate-switch").click()

  const meterVal = page.locator("#leakage-value")
  await expect(meterVal).toHaveText("0%")

  // Move pointer over a string hover zone to trigger a pluck
  const stringHover = page.locator('.air-string-hover[data-string="2"]')
  const box = await stringHover.boundingBox()
  expect(box).not.toBeNull()
  const b = box ?? { x: 0, y: 0, width: 20, height: 400 }

  // Hover over the string zone
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2)
  await page.waitForTimeout(100)

  // Meter value should have increased
  const valText = await meterVal.textContent()
  const val = parseInt(valText?.replace("%", "") || "0", 10)
  expect(val).toBeGreaterThan(0)
})
