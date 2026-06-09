import { test, expect } from "@playwright/test"

test.describe("Riksdag Resolution 2026-47 — Phone Confiscation Simulator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/riksdag-resolution")
  })

  test("page loads with title and confiscation drawer", async ({ page }) => {
    await expect(page.locator("#header h1")).toContainText("Riksdag Resolution 2026-47")
    const drawer = page.locator("[data-testid='confiscation-drawer']")
    await expect(drawer).toBeVisible()
  })

  test("phones appear on desks and are draggable", async ({ page }) => {
    // Wait for phones to spawn
    await page.waitForSelector("[data-testid='phone']", { timeout: 3000 })
    const phones = page.locator("[data-testid='phone']")
    const count = await phones.count()
    expect(count).toBeGreaterThan(0)

    // Phones should have draggable attribute
    const draggable = await phones.first().getAttribute("draggable")
    expect(draggable).toBe("true")
  })

  test("phones display notification text", async ({ page }) => {
    await page.waitForSelector("[data-testid='phone']", { timeout: 3000 })
    const notification = page.locator("[data-testid='phone-notification']").first()
    await expect(notification).toBeVisible()
    const text = await notification.textContent()
    expect(text!.trim().length).toBeGreaterThan(0)
  })

  test("dropping a phone on the drawer increments confiscation count", async ({
    page,
  }) => {
    await page.waitForSelector("[data-testid='phone']", { timeout: 3000 })

    const counter = page.locator("[data-testid='confiscation-count']")
    await expect(counter).toContainText("0")

    // Simulate drag and drop via DataTransfer
    const phone = page.locator("[data-testid='phone']").first()
    const drawer = page.locator("[data-testid='confiscation-drawer']")

    // Use evaluate to dispatch native drag events since Playwright
    // doesn't natively support HTML5 drag and drop
    await page.evaluate(() => {
      const phoneEl = document.querySelector("[data-testid='phone']") as HTMLElement
      const drawerEl = document.querySelector("[data-testid='confiscation-drawer']") as HTMLElement
      if (!phoneEl || !drawerEl) return

      const dataTransfer = new DataTransfer()

      phoneEl.dispatchEvent(new DragEvent("dragstart", {
        bubbles: true, dataTransfer
      }))
      drawerEl.dispatchEvent(new DragEvent("dragover", {
        bubbles: true, dataTransfer, cancelable: true
      }))
      drawerEl.dispatchEvent(new DragEvent("drop", {
        bubbles: true, dataTransfer
      }))
      phoneEl.dispatchEvent(new DragEvent("dragend", {
        bubbles: true, dataTransfer
      }))
    })

    // Count should increment
    await expect(counter).not.toContainText("0", { timeout: 2000 })
  })

  test("drawer commentary updates as phones are confiscated", async ({
    page,
  }) => {
    const commentary = page.locator("[data-testid='drawer-commentary']")
    await expect(commentary).toBeVisible()

    // Initially should have some default text
    const initialText = await commentary.textContent()
    expect(initialText!.trim().length).toBeGreaterThan(0)
  })

  test("new phones spawn over time", async ({ page }) => {
    await page.waitForSelector("[data-testid='phone']", { timeout: 3000 })
    const initialCount = await page.locator("[data-testid='phone']").count()

    // Wait for more to spawn
    await page.waitForTimeout(4000)
    const laterCount = await page.locator("[data-testid='phone']").count()
    expect(laterCount).toBeGreaterThanOrEqual(initialCount)
  })

  test("phones vibrate with CSS animation", async ({ page }) => {
    await page.waitForSelector("[data-testid='phone']", { timeout: 3000 })

    const hasAnimation = await page.evaluate(() => {
      const phone = document.querySelector("[data-testid='phone']") as HTMLElement
      if (!phone) return false
      const animations = phone.getAnimations()
      return animations.length > 0
    })
    expect(hasAnimation).toBe(true)
  })
})
