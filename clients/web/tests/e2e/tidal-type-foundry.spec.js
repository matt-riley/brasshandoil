import { test, expect } from "@playwright/test"

test("tidal type foundry boots with canvas, controls, and readouts", async ({ page }) => {
  await page.goto("/experiments/tidal-type-foundry")

  await expect(
    page.getByRole("heading", { level: 1, name: /Tidal Type Foundry/i })
  ).toBeVisible()

  await expect(page.locator("#tide-canvas")).toBeVisible()
  await expect(page.locator("#moon-dial")).toBeVisible()
  await expect(page.locator("#glyph-count")).toHaveText(/\d+/)
  await expect(page.getByRole("button", { name: /Cast Letter/i })).toBeVisible()
})

test("casting a letter increases the glyph count and changes the tide report", async ({ page }) => {
  await page.goto("/experiments/tidal-type-foundry")

  const count = page.locator("#glyph-count")
  const report = page.locator("#tide-state")
  const before = parseInt((await count.textContent())?.replace(/[^0-9]/g, "") || "0", 10)
  const reportBefore = await report.textContent()

  await page.getByRole("button", { name: /Cast Letter/i }).click()

  await expect.poll(async () => {
    return parseInt((await count.textContent())?.replace(/[^0-9]/g, "") || "0", 10)
  }).toBeGreaterThan(before)
  await expect(report).not.toHaveText(reportBefore ?? "")
})

test("dragging across the foundry stage casts additional tidal glyphs", async ({ page }) => {
  await page.goto("/experiments/tidal-type-foundry")

  const stage = page.locator("#foundry-stage")
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()
  const before = await page.locator(".ttf-glyph-chip").count()

  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.55)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.35, { steps: 6 })
  await page.mouse.up()

  await expect.poll(() => page.locator(".ttf-glyph-chip").count()).toBeGreaterThan(before)
})

test("canvas paints visible tide pixels", async ({ page }) => {
  await page.goto("/experiments/tidal-type-foundry")

  const hasPaint = await page.locator("#tide-canvas").evaluate((canvas) => {
    const ctx = canvas.getContext("2d")
    const { width, height } = canvas
    const sample = ctx.getImageData(
      Math.floor(width * 0.3),
      Math.floor(height * 0.3),
      Math.max(1, Math.floor(width * 0.4)),
      Math.max(1, Math.floor(height * 0.4))
    ).data

    for (let i = 3; i < sample.length; i += 4) {
      if (sample[i] > 0 && (sample[i - 1] > 20 || sample[i - 2] > 20 || sample[i - 3] > 20)) {
        return true
      }
    }
    return false
  })

  expect(hasPaint).toBe(true)
})

test("narrow screens keep the foundry usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/experiments/tidal-type-foundry")

  await expect(
    page.getByRole("heading", { level: 1, name: /Tidal Type Foundry/i })
  ).toBeVisible()
  await expect(page.getByRole("button", { name: /Cast Letter/i })).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
