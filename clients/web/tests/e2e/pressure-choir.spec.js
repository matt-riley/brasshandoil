import { test, expect } from "@playwright/test"

test("pressure choir boots with membrane, controls, and initial readouts", async ({ page }) => {
  await page.goto("/experiments/pressure-choir")

  await expect(
    page.getByRole("heading", { level: 1, name: /Pressure Choir/i })
  ).toBeVisible()
  await expect(page.locator("#pressure-canvas")).toBeVisible()
  await expect(page.locator("#pressure-reading")).toHaveText(/0\.00/)
  await expect(page.locator("#dent-count")).toHaveText("0")
  await expect(page.getByRole("button", { name: /Condense/i })).toBeVisible()
})

test("pressing the membrane raises pressure and records a dent", async ({ page }) => {
  await page.goto("/experiments/pressure-choir")

  const stage = page.locator("#pressure-stage")
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()

  await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.45)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.55, { steps: 8 })

  await expect.poll(async () => {
    const text = await page.locator("#pressure-reading").textContent()
    return parseFloat(text || "0")
  }).toBeGreaterThan(0)
  await expect.poll(async () => {
    const text = await page.locator("#dent-count").textContent()
    return parseInt(text || "0", 10)
  }).toBeGreaterThan(0)
  await expect(stage).toHaveAttribute("data-pressed", "true")

  await page.mouse.up()
})

test("condensing and releasing visibly change the choir state", async ({ page }) => {
  await page.goto("/experiments/pressure-choir")

  await page.getByRole("button", { name: /Condense/i }).click()
  await expect(page.locator("#choir-state")).toHaveText(/held/i)
  await expect.poll(async () => {
    const text = await page.locator("#pressure-reading").textContent()
    return parseFloat(text || "0")
  }).toBeGreaterThan(0)

  await page.getByRole("button", { name: /Release/i }).click()
  await expect(page.locator("#choir-state")).toHaveText(/released/i)
})

test("canvas paints visible pressure interference pixels", async ({ page }) => {
  await page.goto("/experiments/pressure-choir")

  const hasPaint = await page.locator("#pressure-canvas").evaluate((canvas) => {
    const ctx = canvas.getContext("2d")
    const { width, height } = canvas
    const sample = ctx.getImageData(
      Math.floor(width * 0.2),
      Math.floor(height * 0.2),
      Math.max(1, Math.floor(width * 0.6)),
      Math.max(1, Math.floor(height * 0.6))
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

test("narrow screens keep the instrument usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/experiments/pressure-choir")

  await expect(
    page.getByRole("heading", { level: 1, name: /Pressure Choir/i })
  ).toBeVisible()
  await expect(page.getByRole("button", { name: /Condense/i })).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
