import { test, expect } from "@playwright/test"

test("harpsichord boots with fog canvas, register keys, and civic counters", async ({ page }) => {
  await page.goto("/experiments/civic-fog-harpsichord")

  await expect(page.getByRole("heading", { level: 1, name: /Civic Fog Harpsichord/i })).toBeVisible()
  await expect(page.locator("#civic-fog-harpsichord")).toBeVisible()
  await expect(page.locator("#fog-basin")).toBeVisible()
  await expect(page.locator("#fog-canvas")).toBeVisible()
  await expect(page.locator("#harpsichord-frame")).toBeVisible()
  await expect(page.locator(".register-key")).toHaveCount(6)
  await expect(page.locator("#chord-count")).toHaveText("0")
  await expect(page.locator("#ordinance-state")).toHaveText(/drafting/i)
})

test("canvas renders visible drifting fog", async ({ page }) => {
  await page.goto("/experiments/civic-fog-harpsichord")

  await expect
    .poll(async () => {
      return page.locator("#fog-canvas").evaluate((canvas) => {
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

test("pointer movement wakes fog without shifting register keys", async ({ page }) => {
  await page.goto("/experiments/civic-fog-harpsichord")

  const basin = page.locator("#fog-basin")
  const key = page.locator(".register-key").first()
  const basinBefore = await basin.boundingBox()
  const keyBefore = await key.boundingBox()
  expect(basinBefore).not.toBeNull()
  expect(keyBefore).not.toBeNull()

  await basin.hover()
  const box = await basin.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.24, box.y + box.height * 0.66)
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.25, { steps: 12 })

  await expect(basin).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#fog-density").textContent())).toBeGreaterThan(18)

  const basinAfter = await basin.boundingBox()
  const keyAfter = await key.boundingBox()
  expect(basinAfter).not.toBeNull()
  expect(keyAfter).not.toBeNull()
  expect(Math.round(keyAfter.x - basinAfter.x)).toBe(Math.round(keyBefore.x - basinBefore.x))
  expect(Math.round(keyAfter.y - basinAfter.y)).toBe(Math.round(keyBefore.y - basinBefore.y))
})

test("register keys tune fog and stamp civic chords", async ({ page }) => {
  await page.goto("/experiments/civic-fog-harpsichord")

  await page.locator(".register-key").nth(1).click()
  await expect(page.locator(".register-key").nth(1)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#current-register")).toHaveText(/canal tenor/i)
  await expect(page.locator("#ordinance-state")).toHaveText(/brackish third/i)

  await page.locator("#stamp-button").click()
  await expect(page.locator("#fog-basin")).toHaveAttribute("data-chords", "1")
  await expect(page.locator("#chord-count")).toHaveText("1")
  await expect(page.locator("#stamp-ledger")).toContainText(/CT stamped/i)

  await page.locator("#clear-button").click()
  await expect(page.locator("#chord-count")).toHaveText("0")
  await expect(page.locator("#ordinance-state")).toHaveText(/drafting/i)
})

test("stamp ledger lists the newest civic chord first", async ({ page }) => {
  await page.goto("/experiments/civic-fog-harpsichord")

  await page.locator(".register-key").nth(0).click()
  await page.locator("#stamp-button").click()
  await page.locator(".register-key").nth(3).click()
  await page.locator("#stamp-button").click()

  const ledgerItems = page.locator("#stamp-ledger li")
  await expect(ledgerItems).toHaveCount(2)
  await expect(ledgerItems.first()).toContainText(/LW stamped/i)
  await expect(ledgerItems.nth(1)).toContainText(/BI stamped/i)
})

test("keyboard controls tune numbered registers and move the normalized cursor", async ({ page }) => {
  await page.goto("/experiments/civic-fog-harpsichord")

  await page.keyboard.press("2")
  await expect(page.locator(".register-key").nth(1)).toHaveAttribute("aria-pressed", "true")

  const before = await page.locator("#fog-basin").evaluate((basin) =>
    getComputedStyle(basin).getPropertyValue("--cursor-x")
  )
  await page.keyboard.press("ArrowRight")
  const after = await page.locator("#fog-basin").evaluate((basin) =>
    getComputedStyle(basin).getPropertyValue("--cursor-x")
  )
  expect(after).not.toBe(before)

  await page.keyboard.press("Enter")
  await expect(page.locator("#chord-count")).toHaveText("1")
})

test("narrow screens keep the fog instrument usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/civic-fog-harpsichord")

  await expect(page.getByRole("heading", { level: 1, name: /Civic Fog Harpsichord/i })).toBeVisible()
  await expect(page.locator("#stamp-button")).toBeVisible()
  await expect(page.locator(".register-key").first()).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
