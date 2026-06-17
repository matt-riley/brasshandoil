import { test, expect } from "@playwright/test"

test("seismograph boots with cup keys, canvas, and quiet readouts", async ({ page }) => {
  await page.goto("/experiments/infrasonic-teacup-seismograph")

  await expect(
    page.getByRole("heading", { level: 1, name: /Infrasonic Teacup Seismograph/i })
  ).toBeVisible()
  await expect(page.locator("#infrasonic-teacup-seismograph")).toBeVisible()
  await expect(page.locator("#teacup-table")).toBeVisible()
  await expect(page.locator("#tremor-canvas")).toBeVisible()
  await expect(page.locator("#porcelain-array")).toBeVisible()
  await expect(page.locator(".cup-key")).toHaveCount(6)
  await expect(page.locator("#tremor-count")).toHaveText("0")
  await expect(page.locator("#omen-state")).toHaveText(/waiting/i)
})

test("canvas renders visible porcelain tremor traces", async ({ page }) => {
  await page.goto("/experiments/infrasonic-teacup-seismograph")

  await expect
    .poll(async () => {
      return page.locator("#tremor-canvas").evaluate((canvas) => {
        const context = canvas.getContext("2d")
        const sample = context.getImageData(0, 0, canvas.width, canvas.height).data
        let total = 0
        for (let index = 3; index < sample.length; index += 4) {
          total += sample[index]
        }
        return total
      })
    })
    .toBeGreaterThan(0)
})

test("pointer stirring wakes amplitude without moving cup controls", async ({ page }) => {
  await page.goto("/experiments/infrasonic-teacup-seismograph")

  const table = page.locator("#teacup-table")
  const cup = page.locator(".cup-key").first()
  const tableBefore = await table.boundingBox()
  const cupBefore = await cup.boundingBox()
  expect(tableBefore).not.toBeNull()
  expect(cupBefore).not.toBeNull()

  await table.hover()
  const box = await table.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.72)
  await page.mouse.move(box.x + box.width * 0.78, box.y + box.height * 0.28, { steps: 14 })

  await expect(table).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#amplitude-reading").textContent())).toBeGreaterThan(20)

  const tableAfter = await table.boundingBox()
  const cupAfter = await cup.boundingBox()
  expect(tableAfter).not.toBeNull()
  expect(cupAfter).not.toBeNull()
  expect(Math.round(cupAfter.x - tableAfter.x)).toBe(Math.round(cupBefore.x - tableBefore.x))
  expect(Math.round(cupAfter.y - tableAfter.y)).toBe(Math.round(cupBefore.y - tableBefore.y))
})

test("cup keys tune tremors and stamp seismogram slips", async ({ page }) => {
  await page.goto("/experiments/infrasonic-teacup-seismograph")

  await page.locator(".cup-key").nth(2).click()
  await expect(page.locator(".cup-key").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#current-cup")).toHaveText(/blue saucer/i)
  await expect(page.locator("#omen-state")).toHaveText(/window/i)

  await page.locator("#stamp-button").click()
  await expect(page.locator("#teacup-table")).toHaveAttribute("data-tremors", "1")
  await expect(page.locator("#tremor-count")).toHaveText("1")
  await expect(page.locator("#seismogram-ledger")).toContainText(/BS logged/i)

  await page.locator("#settle-button").click()
  await expect(page.locator("#tremor-count")).toHaveText("0")
  await expect(page.locator("#omen-state")).toHaveText(/waiting/i)
})

test("keyboard controls select cups, move the normalized spoon, and stamp", async ({ page }) => {
  await page.goto("/experiments/infrasonic-teacup-seismograph")

  await page.keyboard.press("4")
  await expect(page.locator(".cup-key").nth(3)).toHaveAttribute("aria-pressed", "true")

  const before = await page.locator("#teacup-table").evaluate((table) =>
    getComputedStyle(table).getPropertyValue("--spoon-x")
  )
  await page.keyboard.press("ArrowRight")
  const after = await page.locator("#teacup-table").evaluate((table) =>
    getComputedStyle(table).getPropertyValue("--spoon-x")
  )
  expect(after).not.toBe(before)

  await page.keyboard.press("Enter")
  await expect(page.locator("#tremor-count")).toHaveText("1")
})

test("narrow screens keep the seismograph usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/infrasonic-teacup-seismograph")

  await expect(
    page.getByRole("heading", { level: 1, name: /Infrasonic Teacup Seismograph/i })
  ).toBeVisible()
  await expect(page.locator("#stamp-button")).toBeVisible()
  await expect(page.locator(".cup-key").first()).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
