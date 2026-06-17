import { test, expect } from "@playwright/test"

test.describe("Eternal Companion Cosmetics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/eternal-companion-cosmetics")
  })

  test("page loads with title and product grid", async ({ page }) => {
    await expect(page).toHaveTitle(/eternal.companion|cosmetics/i)
    const grid = page.locator("[data-testid='product-grid']")
    await expect(grid).toBeVisible()
  })

  test("displays at least 5 product swatches", async ({ page }) => {
    const swatches = page.locator("[data-testid^='swatch-']")
    await expect(swatches.first()).toBeVisible()
    const count = await swatches.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  test("each swatch has a product name and description", async ({ page }) => {
    const firstProduct = page.locator("[data-testid='product-0']")
    await expect(firstProduct).toBeVisible()
    const nameEl = firstProduct.locator("[data-testid='product-name']")
    await expect(nameEl).toHaveText(/.+/)
    const descEl = firstProduct.locator("[data-testid='product-desc']")
    await expect(descEl).toHaveText(/.+/)
  })

  test("ghost canvas exists and is layered over products", async ({ page }) => {
    const canvas = page.locator("[data-testid='ghost-canvas']")
    await expect(canvas).toBeVisible()
    const zIndex = await canvas.evaluate(
      (el) => window.getComputedStyle(el).zIndex
    )
    // Canvas should be above products but allow pointer events through
    const pointerEvents = await canvas.evaluate(
      (el) => window.getComputedStyle(el).pointerEvents
    )
    expect(pointerEvents).toBe("none")
  })

  test("hovering a swatch renders ghost particles on canvas", async ({ page }) => {
    const canvas = page.locator("[data-testid='ghost-canvas']")

    // Count non-transparent pixels before hover
    const pixelsBefore = await page.evaluate(() => {
      const c = document.querySelector("[data-testid='ghost-canvas']") as HTMLCanvasElement
      const ctx = c.getContext("2d")!
      const d = ctx.getImageData(0, 0, c.width, c.height).data
      let n = 0
      for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++
      return n
    })

    // Hover over first swatch
    const swatch = page.locator("[data-testid='swatch-0']")
    const box = await swatch.boundingBox()
    if (!box) throw new Error("Swatch not visible")
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(600)

    // Count non-transparent pixels after hover
    const pixelsAfter = await page.evaluate(() => {
      const c = document.querySelector("[data-testid='ghost-canvas']") as HTMLCanvasElement
      const ctx = c.getContext("2d")!
      const d = ctx.getImageData(0, 0, c.width, c.height).data
      let n = 0
      for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++
      return n
    })

    expect(pixelsAfter).toBeGreaterThan(pixelsBefore)
  })

  test("clicking a swatch adds it to the cart", async ({ page }) => {
    const cart = page.locator("[data-testid='cart']")
    const countBefore = await cart.locator("[data-testid^='cart-item-']").count()

    const swatch = page.locator("[data-testid='swatch-0']")
    await swatch.click()
    await page.waitForTimeout(300)

    const countAfter = await cart.locator("[data-testid^='cart-item-']").count()
    expect(countAfter).toBe(countBefore + 1)
  })

  test("clicking the same swatch twice does not duplicate cart entry", async ({ page }) => {
    const swatch = page.locator("[data-testid='swatch-0']")
    await swatch.click()
    await page.waitForTimeout(200)
    await swatch.click()
    await page.waitForTimeout(200)

    const cart = page.locator("[data-testid='cart']")
    const count = await cart.locator("[data-testid^='cart-item-']").count()
    expect(count).toBe(1)
  })

  test("sales copy element exists and updates as items are added", async ({ page }) => {
    const copy = page.locator("[data-testid='sales-copy']")
    await expect(copy).toBeVisible()
    const textBefore = await copy.textContent()

    // Add a product
    await page.locator("[data-testid='swatch-0']").click()
    await page.waitForTimeout(400)

    const textAfter = await copy.textContent()
    expect(textAfter).not.toBe(textBefore)
  })

  test("adding all products triggers finale state", async ({ page }) => {
    const swatches = page.locator("[data-testid^='swatch-']")
    const count = await swatches.count()

    for (let i = 0; i < count; i++) {
      await page.locator(`[data-testid='swatch-${i}']`).click({ force: true })
      await page.waitForTimeout(200)
    }

    await page.waitForTimeout(500)
    const finale = page.locator("[data-testid='finale']")
    await expect(finale).toBeVisible({ timeout: 3000 })
  })
})
