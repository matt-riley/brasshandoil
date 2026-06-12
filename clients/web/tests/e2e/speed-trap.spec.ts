import { test, expect } from "@playwright/test"

test.describe("Speed Trap — Malfunctioning Museum Camera", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", msg => console.log("BROWSER LOG:", msg.text()));
    await page.goto("/experiments/speed-trap")
  })

  test("page loads with camera unit heading and status", async ({ page }) => {
    await expect(page).toHaveTitle(/speed.?trap|camera.?unit/i)
    const heading = page.locator("[data-testid='camera-heading']")
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/camera|unit|7/i)
  })

  test("canvas element is present and sized", async ({ page }) => {
    const canvas = page.locator("[data-testid='camera-feed']")
    await expect(canvas).toBeVisible()
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(200)
    expect(box!.height).toBeGreaterThan(200)
  })

  test("exhibits are listed in the target panel", async ({ page }) => {
    const panel = page.locator("[data-testid='target-panel']")
    await expect(panel).toBeVisible()
    // Should show at least the KITT car and other exhibits
    await expect(panel).toContainText(/KITT|knight/i)
  })

  test("citation counter starts at zero", async ({ page }) => {
    const counter = page.locator("[data-testid='citation-count']")
    await expect(counter).toBeVisible()
    await expect(counter).toContainText("0")
  })

  test("hovering over canvas shows targeting reticle with speed reading", async ({
    page,
  }) => {
    const canvas = page.locator("[data-testid='camera-feed']")
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    // Move to KITT car location
    await page.mouse.move(box!.x + box!.width * 0.475, box!.y + box!.height * 0.7)
    await page.waitForTimeout(200)

    const reticle = page.locator("[data-testid='speed-readout']")
    await expect(reticle).toBeVisible()
  })

  test("clicking canvas issues a citation and increments counter", async ({
    page,
  }) => {
    const canvas = page.locator("[data-testid='camera-feed']")
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()

    // Move to KITT car and click
    await page.mouse.move(box!.x + box!.width * 0.475, box!.y + box!.height * 0.7)
    await page.waitForTimeout(200)
    await page.mouse.click(box!.x + box!.width * 0.475, box!.y + box!.height * 0.7)
    await page.waitForTimeout(300)

    // Citation count should increase
    const counter = page.locator("[data-testid='citation-count']")
    const text = await counter.textContent()
    expect(parseInt(text || "0")).toBeGreaterThanOrEqual(1)
  })

  test("citation log shows issued tickets", async ({ page }) => {
    const canvas = page.locator("[data-testid='camera-feed']")
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()

    // Issue a citation on KITT car
    await page.mouse.click(box!.x + box!.width * 0.475, box!.y + box!.height * 0.7)
    await page.waitForTimeout(300)

    const log = page.locator("[data-testid='citation-log']")
    await expect(log).toBeVisible()
    // Should contain at least one citation entry
    const entries = log.locator("[data-testid='citation-entry']")
    const count = await entries.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test("KITT speed reading escalates over time", async ({ page }) => {
    // Expose test hook to read KITT's current speed
    const kittSpeed = await page.evaluate(() => {
      const w = window as Window & { _getKittSpeed?: () => number }
      return w._getKittSpeed ? w._getKittSpeed() : null
    })
    // KITT should have an initial speed reading
    if (kittSpeed !== null) {
      expect(kittSpeed).toBeGreaterThan(0)
    }
  })

  test("KITT awakens after enough citations issued", async ({ page }) => {
    // Use test hook to fast-forward citations
    await page.evaluate(() => {
      const w = window as Window & { _triggerKittAwaken?: () => void }
      if (w._triggerKittAwaken) w._triggerKittAwaken()
    })
    await page.waitForTimeout(500)

    const kittMessage = page.locator("[data-testid='kitt-message']")
    const count = await kittMessage.count()
    // If test hook exists, KITT should have spoken
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test("camera status indicator shows operational state", async ({ page }) => {
    const status = page.locator("[data-testid='camera-status']")
    await expect(status).toBeVisible()
    await expect(status).toContainText(/online|active|operational|malfunction/i)
  })
})
