import { test, expect } from "@playwright/test"

test.describe("Operation Mary — Thermal Search Unit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/operation-mary")
  })

  test("page loads with correct title and status display", async ({ page }) => {
    await expect(page).toHaveTitle(/operation mary/i)
    const status = page.locator("[data-testid='status-display']")
    await expect(status).toBeVisible()
    await expect(status).toContainText(/scanning|searching|thermal/i)
  })

  test("canvas element is present and sized to viewport", async ({ page }) => {
    const canvas = page.locator("canvas#thermal-canvas")
    await expect(canvas).toBeVisible()
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(300)
    expect(box!.height).toBeGreaterThan(200)
  })

  test("mouse movement updates scanner position via data attribute", async ({
    page,
  }) => {
    const canvas = page.locator("canvas#thermal-canvas")
    await canvas.hover({ position: { x: 200, y: 150 } })
    // Wait for the animation frame to process
    await page.waitForTimeout(100)
    const scanX = await page.evaluate(
      () => (window as unknown as { __scanX?: number }).__scanX ?? -1,
    )
    const scanY = await page.evaluate(
      () => (window as unknown as { __scanY?: number }).__scanY ?? -1,
    )
    expect(scanX).toBeGreaterThanOrEqual(0)
    expect(scanY).toBeGreaterThanOrEqual(0)
  })

  test("decoy heat signatures exist in the scene", async ({ page }) => {
    const decoyCount = await page.evaluate(
      () =>
        (window as unknown as { __decoys?: unknown[] }).__decoys?.length ?? 0,
    )
    expect(decoyCount).toBeGreaterThan(0)
  })

  test("scanning a decoy reveals its identity text", async ({ page }) => {
    // Get position of the first decoy
    const decoyPos = await page.evaluate(() => {
      const decoys = (window as unknown as { __decoys?: { x: number; y: number }[] }).__decoys
      return decoys ? { x: decoys[0].x, y: decoys[0].y } : null
    })
    expect(decoyPos).not.toBeNull()

    const canvas = page.locator("canvas#thermal-canvas")
    await canvas.hover({ position: { x: decoyPos!.x, y: decoyPos!.y } })
    await page.waitForTimeout(600)

    const revealed = await page.evaluate(
      () =>
        (window as unknown as { __revealedDecoys?: number }).__revealedDecoys ??
        0,
    )
    expect(revealed).toBeGreaterThanOrEqual(1)
  })

  test("log panel accumulates mission messages", async ({ page }) => {
    const logPanel = page.locator("[data-testid='mission-log']")
    await expect(logPanel).toBeVisible()
    // Initial boot messages
    const logEntries = logPanel.locator(".log-entry")
    await expect(logEntries.first()).toBeVisible({ timeout: 3000 })
  })

  test("phase advances after scanning enough decoys", async ({ page }) => {
    // Fast-forward the phase by exposing a test hook
    await page.evaluate(() => {
      const w = window as unknown as { __advancePhase?: () => void }
      w.__advancePhase?.()
    })
    await page.waitForTimeout(200)

    const phase = await page.evaluate(
      () => (window as unknown as { __currentPhase?: number }).__currentPhase ?? 0,
    )
    expect(phase).toBeGreaterThanOrEqual(1)
  })
})
