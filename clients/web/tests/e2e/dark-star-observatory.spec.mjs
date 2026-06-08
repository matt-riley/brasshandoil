import { test, expect } from "@playwright/test"

test.describe("Dark Star Observatory", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/dark-star-observatory")
  })

  test("page loads with title and canvas", async ({ page }) => {
    await expect(page.locator("#hud h1")).toHaveText("Dark Star Observatory")
    await expect(page.locator("canvas#field")).toBeVisible()
  })

  test("displays survey counter starting at zero", async ({ page }) => {
    const counter = page.locator("#found-count")
    await expect(counter).toHaveText("0")
  })

  test("displays total dark star count", async ({ page }) => {
    const total = page.locator("#total-count")
    await expect(total).not.toBeEmpty()
    const text = await total.textContent()
    expect(Number(text)).toBeGreaterThan(0)
  })

  test("instructions are visible on load", async ({ page }) => {
    await expect(page.locator("#instructions")).toBeVisible()
    await expect(page.locator("#instructions")).toContainText("Move your cursor")
  })

  test("background stars are rendered on canvas", async ({ page }) => {
    // Wait for initial render
    await page.waitForTimeout(200)
    const hasPixels = await page.evaluate(() => {
      const canvas = document.getElementById("field")
      if (!(canvas instanceof HTMLCanvasElement)) return false
      const ctx = canvas.getContext("2d")
      if (!ctx) return false
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      // Check that at least some pixels are non-black (stars drawn)
      let nonBlack = 0
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 10 || data[i + 1] > 10 || data[i + 2] > 10) nonBlack++
      }
      return nonBlack > 20
    })
    expect(hasPixels).toBe(true)
  })

  test("mouse movement near dark star triggers lensing distortion", async ({ page }) => {
    // Get a dark star position from the page
    const starPos = await page.evaluate(() => {
      const stars = window["__darkStars"]
      if (!stars || stars.length === 0) return null
      return stars[0]
    })
    expect(starPos).not.toBeNull()

    // Snapshot canvas before mouse move
    await page.evaluate(() => {
      const canvas = document.getElementById("field")
      if (!(canvas instanceof HTMLCanvasElement)) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      window["__beforeData"] = new Uint8Array(imgData)
    })

    // Move mouse to dark star position
    const canvas = page.locator("canvas#field")
    const box = await canvas.boundingBox()
    if (!box || !starPos) return
    // Convert normalized position to viewport coordinates
    await page.mouse.move(box.x + starPos.x * box.width, box.y + starPos.y * box.height)
    await page.waitForTimeout(300)

    // Compare after mouse move
    const changed = await page.evaluate(() => {
      const canvas = document.getElementById("field")
      if (!(canvas instanceof HTMLCanvasElement)) return false
      const ctx = canvas.getContext("2d")
      if (!ctx) return false
      const before = window["__beforeData"]
      if (!before) return false
      const after = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      if (before.length !== after.length) return true
      for (let i = 0; i < before.length; i++) {
        if (before[i] !== after[i]) return true
      }
      return false
    })

    expect(changed).toBe(true)
  })

  test("finding a dark star increments the counter", async ({ page }) => {
    // Get a dark star position
    const starPos = await page.evaluate(() => {
      const stars = window["__darkStars"]
      if (!stars || stars.length === 0) return null
      return stars[0]
    })
    expect(starPos).not.toBeNull()
    if (!starPos) return

    const canvas = page.locator("canvas#field")
    // Move mouse directly onto the dark star and hover, continuously correcting for any layout shifts
    for (let i = 0; i < 15; i++) {
      const box = await canvas.boundingBox()
      if (box) {
        const x = box.x + starPos.x * box.width
        const y = box.y + starPos.y * box.height
        await page.mouse.move(x, y)
      }
      await page.waitForTimeout(200)
    }

    const count = await page.locator("#found-count").textContent()
    expect(Number(count)).toBeGreaterThanOrEqual(1)
  })

  test("touch movement near dark star triggers lensing distortion", async ({ page }) => {
    const starPos = await page.evaluate(() => {
      const stars = window["__darkStars"]
      if (!stars || stars.length === 0) return null
      return stars[0]
    })
    expect(starPos).not.toBeNull()
    if (!starPos) return

    const canvas = page.locator("canvas#field")
    const box = await canvas.boundingBox()
    if (!box) return

    // Snapshot canvas before touch
    await page.evaluate(() => {
      const canvas = document.getElementById("field")
      if (!(canvas instanceof HTMLCanvasElement)) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      window["__beforeDataTouch"] = new Uint8Array(imgData)
    })

    // Dispatch touchstart event
    await page.evaluate(({ x, y }) => {
      const canvas = document.getElementById("field")
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const clientX = rect.left + x
      const clientY = rect.top + y
      
      const touch = new Touch({
        identifier: Date.now(),
        target: canvas,
        clientX,
        clientY,
        screenX: clientX,
        screenY: clientY,
        pageX: clientX,
        pageY: clientY,
      })

      const touchEvent = new TouchEvent("touchstart", {
        cancelable: true,
        bubbles: true,
        touches: [touch],
        targetTouches: [touch],
        changedTouches: [touch],
      })
      canvas.dispatchEvent(touchEvent)
    }, { x: starPos.x * box.width, y: starPos.y * box.height })

    await page.waitForTimeout(300)

    // Compare after touch move
    const changed = await page.evaluate(() => {
      const canvas = document.getElementById("field")
      if (!(canvas instanceof HTMLCanvasElement)) return false
      const ctx = canvas.getContext("2d")
      if (!ctx) return false
      const before = window["__beforeDataTouch"]
      if (!before) return false
      const after = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      if (before.length !== after.length) return true
      for (let i = 0; i < before.length; i++) {
        if (before[i] !== after[i]) return true
      }
      return false
    })

    expect(changed).toBe(true)
  })
})
