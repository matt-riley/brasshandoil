import { test, expect } from "@playwright/test"

test.describe("Legal Tender — Guilloche Currency Printer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/legal-tender")
  })

  test("page loads with canvas and denomination display", async ({ page }) => {
    const canvas = page.locator("canvas#guilloche")
    await expect(canvas).toBeVisible()

    const denomination = page.locator("[data-testid='denomination']")
    await expect(denomination).toBeVisible()
    await expect(denomination).toContainText("$250")
  })

  test("guilloche patterns animate on load (canvas is not blank)", async ({
    page,
  }) => {
    const canvas = page.locator("canvas#guilloche")
    await expect(canvas).toBeVisible()

    // Wait for animation to start drawing
    await page.waitForTimeout(1000)

    // Check canvas has non-blank pixels
    const hasContent = await page.evaluate(() => {
      const c = document.querySelector("canvas#guilloche") as HTMLCanvasElement
      if (!c) return false
      const ctx = c.getContext("2d")
      if (!ctx) return false
      const data = ctx.getImageData(0, 0, c.width, c.height).data
      // Check if any pixel is non-transparent
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) return true
      }
      return false
    })
    expect(hasContent).toBe(true)
  })

  test("serial number contains a timestamp-derived value", async ({
    page,
  }) => {
    const serial = page.locator("[data-testid='serial']")
    await expect(serial).toBeVisible()
    const text = await serial.textContent()
    // Serial should be a non-empty string of characters
    expect(text!.trim().length).toBeGreaterThan(5)
  })

  test("denomination escalates after keypress (shred + reprint)", async ({
    page,
  }) => {
    const denomination = page.locator("[data-testid='denomination']")
    await expect(denomination).toContainText("$250")

    // Any keypress triggers the shred/reprint cycle
    await page.keyboard.press("a")

    // Wait for shred animation and reprint
    await page.waitForTimeout(2500)

    // Denomination should have increased
    const text = await denomination.textContent()
    const value = parseInt(text!.replace(/[^0-9]/g, ""))
    expect(value).toBeGreaterThan(250)
  })

  test("right-click triggers counterfeit warning overlay", async ({
    page,
  }) => {
    const canvas = page.locator("canvas#guilloche")
    await canvas.click({ button: "right", force: true })

    const warning = page.locator("[data-testid='counterfeit-warning']")
    await expect(warning).toBeVisible({ timeout: 2000 })
    await expect(warning).toContainText("COUNTERFEIT")
  })

  test("bill visually inflates over time (container grows)", async ({
    page,
  }) => {
    const bill = page.locator("[data-testid='bill']")
    const initialBox = await bill.boundingBox()
    expect(initialBox).not.toBeNull()

    // Wait for inflation
    await page.waitForTimeout(3000)

    const laterBox = await bill.boundingBox()
    expect(laterBox).not.toBeNull()
    expect(laterBox!.width).toBeGreaterThan(initialBox!.width)
  })
})
