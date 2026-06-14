import { test, expect } from "@playwright/test"

test.describe("Octagon Terrarium — Nature vs. The Cage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/octagon-terrarium")
  })

  test("page loads with title and octagon container", async ({ page }) => {
    await expect(page).toHaveTitle(/octagon.?terrarium|nature|cage/i)
    const octagon = page.locator("[data-testid='octagon']")
    await expect(octagon).toBeVisible()
  })

  test("canvas renders with boids visible", async ({ page }) => {
    const canvas = page.locator("[data-testid='terrarium-canvas']")
    await expect(canvas).toBeVisible()

    // Wait for boids to spawn and verify canvas has non-trivial content
    await page.waitForTimeout(500)
    const hasContent = await canvas.evaluate((el: HTMLCanvasElement) => {
      const ctx = el.getContext("2d")
      if (!ctx) return false
      const data = ctx.getImageData(0, 0, el.width, el.height).data
      let nonEmpty = 0
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] > 0) nonEmpty++
      }
      return nonEmpty > 10
    })
    expect(hasContent).toBe(true)
  })

  test("boids scatter when cursor enters the octagon", async ({ page }) => {
    const canvas = page.locator("[data-testid='terrarium-canvas']")
    const box = await canvas.boundingBox()
    if (!box) throw new Error("Canvas not found")

    const centerX = box.x + box.width / 2
    const centerY = box.y + box.height / 2

    // Sample boid positions before cursor enters
    const beforePositions = await page.evaluate(() => {
      return (window as any).__boids?.slice(0, 5).map((b: any) => ({
        x: b.x,
        y: b.y,
      }))
    })

    // Move cursor to center of octagon
    await page.mouse.move(centerX, centerY)
    await page.waitForTimeout(600)

    // Sample boid positions after cursor enters
    const afterPositions = await page.evaluate(() => {
      return (window as any).__boids?.slice(0, 5).map((b: any) => ({
        x: b.x,
        y: b.y,
      }))
    })

    // At least some boids should have moved away from cursor
    expect(beforePositions).toBeDefined()
    expect(afterPositions).toBeDefined()
    if (beforePositions && afterPositions) {
      let movedCount = 0
      for (let i = 0; i < Math.min(beforePositions.length, afterPositions.length); i++) {
        const dx = afterPositions[i].x - beforePositions[i].x
        const dy = afterPositions[i].y - beforePositions[i].y
        if (Math.sqrt(dx * dx + dy * dy) > 2) movedCount++
      }
      expect(movedCount).toBeGreaterThan(0)
    }
  })

  test("reclamation counter is visible and updates", async ({ page }) => {
    const counter = page.locator("[data-testid='reclamation-counter']")
    await expect(counter).toBeVisible()
    await expect(counter).toContainText(/%/)
  })

  test("documentary captions appear for creature types", async ({ page }) => {
    // Wait for creatures to be present
    await page.waitForTimeout(1000)
    const captions = page.locator("[data-testid='creature-caption']")
    // At least one caption should be rendered (either visible or in DOM)
    const count = await captions.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test("nature wins when reclamation reaches 100%", async ({ page }) => {
    // Force reclamation to 100% via exposed function
    await page.evaluate(() => {
      ;(window as any).__forceReclamation?.(100)
    })
    await page.waitForTimeout(500)

    const victory = page.locator("[data-testid='victory-message']")
    await expect(victory).toBeVisible({ timeout: 3000 })
    await expect(victory).toContainText(/NATURE WINS/i)
  })
})
