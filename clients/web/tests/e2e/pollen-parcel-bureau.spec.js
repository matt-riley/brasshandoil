import { test, expect } from "@playwright/test"

test("bureau boots with parcel canvas, trays, and unstamped counters", async ({ page }) => {
  await page.goto("/experiments/pollen-parcel-bureau")

  await expect(page.getByRole("heading", { level: 1, name: /Pollen Parcel Bureau/i })).toBeVisible()
  await expect(page.locator("#pollen-bureau")).toBeVisible()
  await expect(page.locator("#sorting-field")).toBeVisible()
  await expect(page.locator("#postal-canvas")).toBeVisible()
  await expect(page.locator("#route-ribbon")).toContainText(/awaiting parcel/i)
  await expect(page.locator(".parcel-tray")).toHaveCount(6)
  await expect(page.locator("#delivery-count")).toHaveText("0")
  await expect(page.locator("#counter-state")).toHaveText(/unstamped/i)
})

test("canvas renders visible airborne parcels", async ({ page }) => {
  await page.goto("/experiments/pollen-parcel-bureau")

  await expect
    .poll(async () => {
      return page.locator("#postal-canvas").evaluate((canvas) => {
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

test("pointer drift wakes the sorting field without moving tray controls", async ({ page }) => {
  await page.goto("/experiments/pollen-parcel-bureau")

  const field = page.locator("#sorting-field")
  const tray = page.locator(".parcel-tray").first()
  const fieldBefore = await field.boundingBox()
  const trayBefore = await tray.boundingBox()
  expect(fieldBefore).not.toBeNull()
  expect(trayBefore).not.toBeNull()

  await field.hover()
  const box = await field.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.68)
  await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.26, { steps: 10 })

  await expect(field).toHaveAttribute("data-awake", "true")

  const fieldAfter = await field.boundingBox()
  const trayAfter = await tray.boundingBox()
  expect(fieldAfter).not.toBeNull()
  expect(trayAfter).not.toBeNull()
  expect(Math.round(trayAfter.x - fieldAfter.x)).toBe(Math.round(trayBefore.x - fieldBefore.x))
  expect(Math.round(trayAfter.y - fieldAfter.y)).toBe(Math.round(trayBefore.y - fieldBefore.y))
})

test("clicking trays stamps parcels and dispatches the route ribbon", async ({ page }) => {
  await page.goto("/experiments/pollen-parcel-bureau")

  await page.locator(".parcel-tray").nth(2).click()
  await expect(page.locator(".parcel-tray").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#current-route")).toHaveText(/Blue Ledger/i)
  await expect(page.locator("#sorting-field")).toHaveAttribute("data-deliveries", "1")
  await expect(page.locator("#delivery-count")).toHaveText("1")
  await expect(page.locator("#route-ribbon")).toContainText(/BL parcel/i)

  await page.locator("#dispatch-button").click()
  await expect(page.locator("#counter-state")).toHaveText(/dispatched/i)

  await page.locator("#recall-button").click()
  await expect(page.locator("#delivery-count")).toHaveText("0")
  await expect(page.locator("#counter-state")).toHaveText(/unstamped/i)
})

test("keyboard controls stamp numbered routes and move the normalized cursor", async ({ page }) => {
  await page.goto("/experiments/pollen-parcel-bureau")

  await page.keyboard.press("3")
  await expect(page.locator(".parcel-tray").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#delivery-count")).toHaveText("1")

  const before = await page.locator("#sorting-field").evaluate((field) =>
    getComputedStyle(field).getPropertyValue("--cursor-x")
  )
  await page.keyboard.press("ArrowRight")
  const after = await page.locator("#sorting-field").evaluate((field) =>
    getComputedStyle(field).getPropertyValue("--cursor-x")
  )
  expect(after).not.toBe(before)
})

test("narrow screens keep the parcel bureau usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/pollen-parcel-bureau")

  await expect(page.getByRole("heading", { level: 1, name: /Pollen Parcel Bureau/i })).toBeVisible()
  await expect(page.locator("#dispatch-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
