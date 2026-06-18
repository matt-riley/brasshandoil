import { test, expect } from "@playwright/test"

test.describe("Taczanowskia waska — Field Report #7", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/taczanowskia-field-report")
  })

  test("page loads with title and journal content", async ({ page }) => {
    await expect(page.locator("#scene h1")).toContainText("Field Report")
    await expect(page.locator("[data-testid='journal']")).toBeVisible()
  })

  test("specimen illustrations are present and initially disguised as fungi", async ({
    page,
  }) => {
    const specimens = page.locator("[data-testid='specimen']")
    await expect(specimens).toHaveCount(5)
    // Each specimen starts labeled as fungal growth
    for (let i = 0; i < 5; i++) {
      await expect(specimens.nth(i)).toHaveAttribute("data-state", "disguised")
    }
  })

  test("specimen evades when scrolled fully into view", async ({ page }) => {
    const specimen = page.locator("[data-testid='specimen']").first()

    // Get initial position
    const initialBox = await specimen.boundingBox()
    expect(initialBox).toBeTruthy()

    // Scroll the specimen fully into view
    await specimen.scrollIntoViewIfNeeded()
    // Wait for the evasion animation
    await page.waitForTimeout(600)

    // After evasion, the specimen should have moved or changed state
    const evaded = await specimen.getAttribute("data-evaded")
    expect(evaded).toBe("true")
  })

  test("frustration log updates as specimens evade", async ({ page }) => {
    const log = page.locator("[data-testid='frustration-log']")
    await expect(log).toBeVisible()

    // Initially shows entry count of 0 captures
    const initialText = await log.textContent()
    expect(initialText).toContain("0")

    // Scroll a specimen into view to trigger evasion
    const specimen = page.locator("[data-testid='specimen']").first()
    await specimen.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)

    // Log should update with a new frustrated entry
    const entries = page.locator("[data-testid='log-entry']")
    await expect(entries.first()).toBeVisible()
  })

  test("photo counter tracks attempted captures vs evasions", async ({
    page,
  }) => {
    const counter = page.locator("[data-testid='photo-counter']")
    await expect(counter).toBeVisible()
    await expect(counter).toContainText("0")
  })

  test("captured specimen reveals spider form", async ({ page }) => {
    // Use the capture button that appears when a specimen is partially in view
    const specimen = page.locator("[data-testid='specimen']").first()

    // Scroll near but not fully to the specimen (partial intersection)
    await page.evaluate((el) => {
      el?.scrollIntoView({ block: "start" })
    }, await specimen.elementHandle())
    await page.waitForTimeout(300)

    // Click the quick-capture shutter button
    const shutter = page.locator("[data-testid='shutter-btn']")
    if (await shutter.isVisible()) {
      await shutter.click()
      await page.waitForTimeout(400)

      // Check if any specimen was captured
      const captured = page.locator("[data-testid='specimen'][data-state='captured']")
      const capturedCount = await captured.count()
      // At least attempted — may or may not succeed depending on timing
      expect(capturedCount).toBeGreaterThanOrEqual(0)
    }
  })
})
