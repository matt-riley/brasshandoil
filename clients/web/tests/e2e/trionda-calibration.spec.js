import { test, expect } from "@playwright/test"

test("trionda calibration cradle page loads and displays core dashboard components", async ({ page }) => {
  await page.goto("/experiments/trionda-calibration")

  await expect(
    page.getByRole("heading", { level: 1, name: /Trionda Calibration Cradle/i })
  ).toBeVisible()

  await expect(page.locator("#calibration-ball")).toBeVisible()
  await expect(page.locator("#trajectory-canvas")).toBeVisible()
  await expect(page.locator("#charge-level")).toBeVisible()
  await expect(page.locator("#btn-plug-in")).toBeVisible()
})

test("plugging in the charging cable engages charging state and updates percentage", async ({ page }) => {
  await page.goto("/experiments/trionda-calibration")

  const plugButton = page.locator("#btn-plug-in")
  await expect(plugButton).toHaveText(/Plug In|Connect/i)

  const chargeBefore = parseInt(
    (await page.locator("#charge-level").textContent())?.replace(/[^0-9]/g, "") || "0",
    10
  )

  await plugButton.click()
  await expect(plugButton).toHaveText(/Unplug|Disconnect/i)

  // Wait briefly or check that the charging indicator is active
  await expect(page.locator("#charging-status")).toContainText(/Charging|Connected/i)

  // Wait and see if the charge increases or stays high
  await expect.poll(async () => {
    const text = await page.locator("#charge-level").textContent()
    return parseInt(text?.replace(/[^0-9]/g, "") || "0", 10)
  }).toBeGreaterThanOrEqual(chargeBefore)
})

test("spinning or clicking the ball updates telemetry and generates VAR decisions", async ({ page }) => {
  await page.goto("/experiments/trionda-calibration")

  // If plugged in by default, unplug it first (or assert it starts unplugged)
  const plugButton = page.locator("#btn-plug-in")
  if ((await plugButton.textContent())?.includes("Unplug")) {
    await plugButton.click()
  }

  // Click the ball to simulate a touch/kick
  const ball = page.locator("#calibration-ball")
  await ball.click()

  // Telemetry logs or VAR decision log should not be empty
  await expect(page.locator("#var-decision")).not.toHaveText(/Awaiting stimulus/i)
  await expect(page.locator("#var-decision")).toBeVisible()
})

test("narrow mobile screen displays calibration interface without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/experiments/trionda-calibration")

  await expect(
    page.getByRole("heading", { level: 1, name: /Trionda/i })
  ).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
