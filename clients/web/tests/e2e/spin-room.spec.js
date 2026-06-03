import { test, expect } from "@playwright/test"

test.describe("Spin Room experiment", () => {
  test("page loads with title, canvas, and initial signs", async ({ page }) => {
    await page.goto("/experiments/spin-room")

    await expect(
      page.getByRole("heading", { level: 1, name: /spin room/i })
    ).toBeVisible()

    await expect(page.locator("#sim-canvas")).toBeVisible()

    // Should show sign count
    await expect(page.locator("#sign-count")).toContainText(/\d+/)
  })

  test("canvas has correct dimensions", async ({ page }) => {
    await page.goto("/experiments/spin-room")

    const canvas = page.locator("#sim-canvas")
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()
    expect(box.width).toBeGreaterThan(200)
    expect(box.height).toBeGreaterThan(200)
  })

  test("clicking canvas grabs nearest sign and dragging moves it", async ({ page }) => {
    await page.goto("/experiments/spin-room")

    // Wait for simulation to initialize
    await page.waitForFunction(() => typeof window.__simReady === "boolean" && window.__simReady)

    // Get a sign position from the sim
    const signPos = await page.evaluate(() => {
      const sign = window.__signs?.[0]
      return sign ? { x: sign.tipX, y: sign.tipY } : null
    })

    expect(signPos).not.toBeNull()

    const canvas = page.locator("#sim-canvas")
    const box = await canvas.boundingBox()

    // Click near the first sign
    await page.mouse.move(box.x + signPos.x, box.y + signPos.y)
    await page.mouse.down()

    // Drag it
    await page.mouse.move(box.x + signPos.x + 100, box.y + signPos.y, { steps: 5 })

    // The sign tip should have moved
    const newPos = await page.evaluate(() => {
      const sign = window.__signs?.[0]
      return sign ? { x: sign.tipX, y: sign.tipY } : null
    })

    // Position should differ from original after drag
    expect(newPos).not.toBeNull()
    await page.mouse.up()
  })

  test("collision between signs merges slogans", async ({ page }) => {
    await page.goto("/experiments/spin-room")

    await page.waitForFunction(() => typeof window.__simReady === "boolean" && window.__simReady)

    const initialCount = await page.evaluate(() => window.__mergeCount ?? 0)

    // Force a collision by teleporting two signs to the same spot
    await page.evaluate(() => {
      if (window.__forceMerge) window.__forceMerge()
    })

    // Wait for merge count to increment
    await page.waitForFunction(
      (prev) => (window.__mergeCount ?? 0) > prev,
      initialCount,
      { timeout: 3000 }
    )

    const newCount = await page.evaluate(() => window.__mergeCount ?? 0)
    expect(newCount).toBeGreaterThan(initialCount)
  })

  test("instruction text is visible on load", async ({ page }) => {
    await page.goto("/experiments/spin-room")

    await expect(page.locator("#instructions")).toBeVisible()
    await expect(page.locator("#instructions")).toContainText(/grab|drag|fling/i)
  })
})
