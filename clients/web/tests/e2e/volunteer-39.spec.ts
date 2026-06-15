import { test, expect } from "@playwright/test"

test.describe("Volunteer 39 — Post-Injection Observation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/volunteer-39")
  })

  test("page loads with title and observation room", async ({ page }) => {
    await expect(page).toHaveTitle(/volunteer.?39|observation/i)
    const room = page.locator("[data-testid='observation-room']")
    await expect(room).toBeVisible()
  })

  test("clock element is visible and shows time", async ({ page }) => {
    const clock = page.locator("[data-testid='clock']")
    await expect(clock).toBeVisible()
    await expect(clock).toContainText(/\d/)
  })

  test("vitals monitor is visible", async ({ page }) => {
    const monitor = page.locator("[data-testid='vitals-monitor']")
    await expect(monitor).toBeVisible()
  })

  test("clock freezes when hovered", async ({ page }) => {
    const clock = page.locator("[data-testid='clock']")
    const box = await clock.boundingBox()
    if (!box) throw new Error("Clock not found")

    // Read initial clock value
    const initialTime = await page.evaluate(() => {
      return (window as any).__clockMinutes ?? 0
    })

    // Hover over clock
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(1500)

    // Clock should be frozen (paused) — time should not have advanced
    const frozenTime = await page.evaluate(() => {
      return (window as any).__clockMinutes ?? 0
    })

    expect(frozenTime).toBe(initialTime)
  })

  test("clock advances when not hovered", async ({ page }) => {
    // Move cursor away from everything
    await page.mouse.move(10, 10)
    await page.waitForTimeout(2000)

    const elapsed = await page.evaluate(() => {
      return (window as any).__clockMinutes ?? 0
    })

    // Should have advanced at least slightly
    expect(elapsed).toBeGreaterThan(0)
  })

  test("hovering objects shows quantum observation effect", async ({ page }) => {
    // Hover over a room object
    const obj = page.locator("[data-testid='room-object']").first()
    await expect(obj).toBeVisible()
    const box = await obj.boundingBox()
    if (!box) throw new Error("Room object not found")

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(300)

    // The hovered element (or its children) should have animations paused
    const isPaused = await obj.evaluate((el: HTMLElement) => {
      const anims = el.getAnimations({ subtree: true })
      return anims.length > 0 && anims.every((a) => a.playState === "paused")
    })
    expect(isPaused).toBe(true)
  })

  test("nurse message appears periodically", async ({ page }) => {
    // Fast-forward to trigger nurse check via exposed helper
    await page.evaluate(() => {
      ;(window as any).__triggerNurseCheck?.()
    })
    await page.waitForTimeout(500)

    const nurse = page.locator("[data-testid='nurse-message']")
    await expect(nurse).toBeVisible({ timeout: 3000 })
  })

  test("discharge message appears when clock reaches 30", async ({ page }) => {
    // Force clock to 30 minutes
    await page.evaluate(() => {
      ;(window as any).__forceClockTo?.(30)
    })
    await page.waitForTimeout(500)

    const discharge = page.locator("[data-testid='discharge-message']")
    await expect(discharge).toBeVisible({ timeout: 3000 })
    await expect(discharge).toContainText(/discharged|free|leave/i)
  })
})
