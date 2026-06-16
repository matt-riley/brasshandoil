import { test, expect } from "@playwright/test"

test("memory tide elevator boots with tide shaft, destinations, and ledger", async ({ page }) => {
  await page.goto("/experiments/memory-tide-elevator")

  await expect(page.getByRole("heading", { level: 1, name: /Memory Tide Elevator/i })).toBeVisible()
  await expect(page.locator("#memory-tide-elevator")).toBeVisible()
  await expect(page.locator("#tide-shaft")).toBeVisible()
  await expect(page.locator("#memory-canvas")).toBeVisible()
  await expect(page.locator(".destination-button")).toHaveCount(3)
  await expect(page.locator("#archived-count")).toHaveText("0")
  await expect(page.locator("#tide-ledger li")).toHaveCount(3)
})

test("destination buttons raise the tide and stamp archives the current memory", async ({ page }) => {
  await page.goto("/experiments/memory-tide-elevator")

  await page.locator(".destination-button").nth(2).click()
  await expect(page.locator(".destination-button").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#tide-level")).toHaveText("82")
  await expect(page.locator("#current-destination")).toHaveText(/upper archive/i)

  await page.locator("#stamp-button").click()
  await expect(page.locator("#archived-count")).toHaveText("1")
  await expect(page.locator("#tide-ledger li").first()).toContainText(/Upper Archive/)
  await expect(page.locator("#memory-tide-elevator")).toHaveAttribute("data-archived", "1")
})

test("keyboard controls select destinations and stamp without moving layout anchors", async ({ page }) => {
  await page.goto("/experiments/memory-tide-elevator")

  const shaft = page.locator("#tide-shaft")
  const button = page.locator(".destination-button").first()
  const shaftBefore = await shaft.boundingBox()
  const buttonBefore = await button.boundingBox()
  expect(shaftBefore).not.toBeNull()
  expect(buttonBefore).not.toBeNull()

  await page.keyboard.press("2")
  await expect(page.locator(".destination-button").nth(1)).toHaveAttribute("aria-pressed", "true")
  await page.keyboard.press("Enter")
  await expect(page.locator("#archived-count")).toHaveText("1")

  const shaftAfter = await shaft.boundingBox()
  const buttonAfter = await button.boundingBox()
  expect(shaftAfter).not.toBeNull()
  expect(buttonAfter).not.toBeNull()
  expect(Math.round(buttonAfter.x - shaftAfter.x)).toBe(Math.round(buttonBefore.x - shaftBefore.x))
  expect(Math.round(buttonAfter.y - shaftAfter.y)).toBe(Math.round(buttonBefore.y - shaftBefore.y))
})

test("canvas renders animated parcels and responds to pointer tide stirring", async ({ page }) => {
  await page.goto("/experiments/memory-tide-elevator")

  await expect
    .poll(async () => {
      return page.locator("#memory-canvas").evaluate((canvas) => {
        const context = canvas.getContext("2d")
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
        let alphaTotal = 0
        for (let index = 3; index < pixels.length; index += 4) {
          alphaTotal += pixels[index]
        }
        return alphaTotal
      })
    })
    .toBeGreaterThan(0)

  await page.locator("#tide-shaft").hover()
  await expect(page.locator("#memory-tide-elevator")).toHaveAttribute("data-stirred", "true")
})

test("narrow screens keep the elevator usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/memory-tide-elevator")

  await expect(page.getByRole("heading", { level: 1, name: /Memory Tide Elevator/i })).toBeVisible()
  await expect(page.locator("#stamp-button")).toBeVisible()
  await expect(page.locator(".destination-button").first()).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
