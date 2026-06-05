import { test, expect } from "@playwright/test"

test.describe("Love in the West experiment", () => {
  test("page loads with title and both planets", async ({ page }) => {
    await page.goto("/experiments/love-in-the-west")

    await expect(
      page.getByRole("heading", { level: 1, name: /love in the west/i })
    ).toBeVisible()

    await expect(page.locator("#venus")).toBeVisible()
    await expect(page.locator("#jupiter")).toBeVisible()
  })

  test("telescope lens follows the cursor", async ({ page }) => {
    await page.goto("/experiments/love-in-the-west")

    const lens = page.locator("#telescope-lens")
    await expect(lens).toBeAttached()

    // Move mouse to a known position
    await page.mouse.move(400, 300)
    await page.waitForTimeout(100)

    const transform = await lens.evaluate((el) => el.style.transform)
    expect(transform).toContain("translate")
  })

  test("love letters exist but are hidden without telescope", async ({ page }) => {
    await page.goto("/experiments/love-in-the-west")

    const letters = page.locator(".love-letter")
    const count = await letters.count()
    expect(count).toBeGreaterThan(0)

    // Letters should have very low opacity by default
    const opacity = await letters.first().evaluate((el) =>
      parseFloat(getComputedStyle(el).opacity)
    )
    expect(opacity).toBeLessThanOrEqual(0.05)
  })

  test("planets drift closer over time", async ({ page }) => {
    await page.goto("/experiments/love-in-the-west")

    await page.waitForFunction(
      () => typeof window.__simReady === "boolean" && window.__simReady
    )

    const initialDist = await page.evaluate(() => window.__planetDistance?.())
    expect(initialDist).toBeGreaterThan(0)

    // Fast-forward the simulation
    await page.evaluate(() => window.__fastForward?.(5000))
    await page.waitForTimeout(100)

    const newDist = await page.evaluate(() => window.__planetDistance?.())
    expect(newDist).toBeLessThan(/** @type {number} */ (initialDist))
  })

  test("conjunction triggers merge state", async ({ page }) => {
    await page.goto("/experiments/love-in-the-west")

    await page.waitForFunction(
      () => typeof window.__simReady === "boolean" && window.__simReady
    )

    // Force conjunction
    await page.evaluate(() => window.__forceConjunction?.())
    await page.waitForTimeout(300)

    const merged = await page.evaluate(() => window.__conjunctionOccurred)
    expect(merged).toBe(true)
  })

  test("stars are rendered in the sky", async ({ page }) => {
    await page.goto("/experiments/love-in-the-west")

    const stars = page.locator(".star")
    const count = await stars.count()
    expect(count).toBeGreaterThanOrEqual(50)
  })
})
