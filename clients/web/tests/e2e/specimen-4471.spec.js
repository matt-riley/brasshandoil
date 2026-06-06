import { test, expect } from "@playwright/test"

test.describe("Specimen 4471 experiment", () => {
  test("page loads with clinical inspection heading and CLEAR status", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    await expect(
      page.getByRole("heading", { level: 2, name: /specimen.*4471/i })
    ).toBeVisible()

    const status = page.locator("#specimen-status")
    await expect(status).toContainText("CLEAR")
  })

  test("SVG turbulence filter exists for distortion effect", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    const turbulence = page.locator("feTurbulence").first()
    await expect(turbulence).toBeAttached()

    const displacement = page.locator("feDisplacementMap").first()
    await expect(displacement).toBeAttached()
  })

  test("UV inspection lamp follows cursor over specimen area", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    const lamp = page.locator("#uv-lamp")
    await expect(lamp).toBeAttached()

    const specimen = page.locator("#specimen-area")
    await specimen.hover()
    await page.waitForTimeout(200)

    const transform = await lamp.evaluate((el) => el.style.transform)
    expect(transform).toContain("translate")
  })

  test("hovering over specimen area increases infestation level", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    await page.waitForFunction(
      () => typeof window.__specimenReady === "boolean" && window.__specimenReady
    )

    const initial = await page.evaluate(() => window.__infestationLevel?.())
    expect(initial).toBe(0)

    // Hover over the specimen area to trigger inspection
    const specimen = page.locator("#specimen-area")
    await specimen.hover()
    await page.waitForTimeout(1500)

    const after = await page.evaluate(() => window.__infestationLevel?.())
    expect(after).toBeGreaterThan(0)
  })

  test("status escalates as infestation grows", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    await page.waitForFunction(
      () => typeof window.__specimenReady === "boolean" && window.__specimenReady
    )

    // Force escalation to check status progression
    await page.evaluate(() => window.__setInfestation?.(0.3))
    await page.waitForTimeout(100)

    const status1 = await page.locator("#specimen-status").textContent()
    expect(status1).toMatch(/SUSPECT/i)

    await page.evaluate(() => window.__setInfestation?.(0.6))
    await page.waitForTimeout(100)

    const status2 = await page.locator("#specimen-status").textContent()
    expect(status2).toMatch(/CONFIRMED/i)

    await page.evaluate(() => window.__setInfestation?.(0.9))
    await page.waitForTimeout(100)

    const status3 = await page.locator("#specimen-status").textContent()
    expect(status3).toMatch(/QUARANTINE FAILURE/i)
  })

  test("text elements get displaced as infestation spreads", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    await page.waitForFunction(
      () => typeof window.__specimenReady === "boolean" && window.__specimenReady
    )

    // At high infestation, text should have filter applied
    await page.evaluate(() => window.__setInfestation?.(0.8))
    await page.waitForTimeout(200)

    const hasFilter = await page.evaluate(() => {
      const el = document.querySelector(".infectable")
      if (!el) return false
      const style = getComputedStyle(el)
      return style.filter !== "none" && style.filter !== ""
    })
    expect(hasFilter).toBe(true)
  })

  test("page has USDA-style clinical framing", async ({ page }) => {
    await page.goto("/experiments/specimen-4471")

    const body = await page.textContent("body")
    expect(body).toMatch(/ANIMAL AND PLANT HEALTH INSPECTION/i)
    expect(body).toMatch(/specimen/i)
  })
})
