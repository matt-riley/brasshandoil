import { test, expect } from "@playwright/test"

test.describe("Byssus Loom — Structural Color Weaving", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/byssus-loom")
  })

  test("page loads with title and canvas", async ({ page }) => {
    await expect(page).toHaveTitle(/byssus|loom|sea.?silk/i)
    const canvas = page.locator("[data-testid='weave-canvas']")
    await expect(canvas).toBeVisible()
  })

  test("scroll container is taller than viewport", async ({ page }) => {
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    const viewportHeight = await page.evaluate(() => window.innerHeight)
    expect(scrollHeight).toBeGreaterThan(viewportHeight * 2)
  })

  test("scrolling produces threads on canvas", async ({ page }) => {
    const canvas = page.locator("[data-testid='weave-canvas']")

    // Sample canvas pixels before scroll
    const pixelsBefore = await page.evaluate(() => {
      const c = document.querySelector("[data-testid='weave-canvas']") as HTMLCanvasElement
      const ctx = c.getContext("2d")!
      const data = ctx.getImageData(0, 0, c.width, c.height).data
      let nonEmpty = 0
      for (let i = 3; i < data.length; i += 4) {
        if (data[i - 3] > 0 || data[i - 2] > 0 || data[i - 1] > 0) nonEmpty++
      }
      return nonEmpty
    })

    // Move mouse to center and scroll down
    const box = await canvas.boundingBox()
    if (!box) throw new Error("Canvas not visible")
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.wheel(0, 800)
    await page.waitForTimeout(500)

    // Sample canvas pixels after scroll
    const pixelsAfter = await page.evaluate(() => {
      const c = document.querySelector("[data-testid='weave-canvas']") as HTMLCanvasElement
      const ctx = c.getContext("2d")!
      const data = ctx.getImageData(0, 0, c.width, c.height).data
      let nonEmpty = 0
      for (let i = 3; i < data.length; i += 4) {
        if (data[i - 3] > 0 || data[i - 2] > 0 || data[i - 1] > 0) nonEmpty++
      }
      return nonEmpty
    })

    expect(pixelsAfter).toBeGreaterThan(pixelsBefore)
  })

  test("mouse X position influences thread path", async ({ page }) => {
    const canvas = page.locator("[data-testid='weave-canvas']")
    const box = await canvas.boundingBox()
    if (!box) throw new Error("Canvas not visible")

    // Weave with cursor on the left side
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2)
    await page.mouse.wheel(0, 400)
    await page.waitForTimeout(300)

    const leftPixels = await page.evaluate(() => {
      const c = document.querySelector("[data-testid='weave-canvas']") as HTMLCanvasElement
      const ctx = c.getContext("2d")!
      const w = c.width
      const data = ctx.getImageData(0, 0, Math.floor(w / 2), c.height).data
      let filled = 0
      for (let i = 3; i < data.length; i += 4) {
        if (data[i - 3] > 0 || data[i - 2] > 0 || data[i - 1] > 0) filled++
      }
      return filled
    })

    const rightPixels = await page.evaluate(() => {
      const c = document.querySelector("[data-testid='weave-canvas']") as HTMLCanvasElement
      const ctx = c.getContext("2d")!
      const w = c.width
      const data = ctx.getImageData(Math.floor(w / 2), 0, w - Math.floor(w / 2), c.height).data
      let filled = 0
      for (let i = 3; i < data.length; i += 4) {
        if (data[i - 3] > 0 || data[i - 2] > 0 || data[i - 1] > 0) filled++
      }
      return filled
    })

    // With cursor on left side, left half should have more thread pixels
    expect(leftPixels).toBeGreaterThan(rightPixels)
  })

  test("depth gauge reflects scroll position", async ({ page }) => {
    const gauge = page.locator("[data-testid='depth-gauge']")
    await expect(gauge).toBeVisible()

    const initialText = await gauge.textContent()

    await page.mouse.wheel(0, 1500)
    await page.waitForTimeout(500)

    const scrolledText = await gauge.textContent()
    expect(scrolledText).not.toBe(initialText)
  })

  test("clam element is present at bottom", async ({ page }) => {
    const clam = page.locator("[data-testid='clam']")
    await expect(clam).toBeAttached()
  })

  test("thread color changes with scroll speed", async ({ page }) => {
    const canvas = page.locator("[data-testid='weave-canvas']")
    const box = await canvas.boundingBox()
    if (!box) throw new Error("Canvas not visible")

    // Slow scroll — should produce warm/gold threads
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 50)
      await page.waitForTimeout(150)
    }

    const slowColor = await page.evaluate(() => {
      return (window as any).__lastThreadHue ?? -1
    })

    // Fast scroll — should produce cooler threads
    await page.mouse.wheel(0, 2000)
    await page.waitForTimeout(200)

    const fastColor = await page.evaluate(() => {
      return (window as any).__lastThreadHue ?? -1
    })

    // Slow scroll should produce different hue from fast scroll
    // (warm/gold ~40-60 vs cool/violet ~240-280)
    expect(slowColor).not.toBe(fastColor)
  })
})
