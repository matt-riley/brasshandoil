import { test, expect } from "@playwright/test"

test("choir boots with mercury canvas, tone wells, and unsealed counters", async ({ page }) => {
  await page.goto("/experiments/mercury-quarantine-choir")

  await expect(page.getByRole("heading", { level: 1, name: /Mercury Quarantine Choir/i })).toBeVisible()
  await expect(page.locator("#mercury-choir")).toBeVisible()
  await expect(page.locator("#quarantine-stage")).toBeVisible()
  await expect(page.locator("#mercury-canvas")).toBeVisible()
  await expect(page.locator("#choir-ribbon")).toContainText(/awaiting tone/i)
  await expect(page.locator(".tone-well")).toHaveCount(6)
  await expect(page.locator("#sealed-count")).toHaveText("0")
  await expect(page.locator("#choir-state")).toHaveText(/unsealed/i)
})

test("canvas renders visible metallic droplets", async ({ page }) => {
  await page.goto("/experiments/mercury-quarantine-choir")

  await expect
    .poll(async () => {
      return page.locator("#mercury-canvas").evaluate((canvas) => {
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

test("pointer movement wakes vapor without shifting tone wells", async ({ page }) => {
  await page.goto("/experiments/mercury-quarantine-choir")

  const stage = page.locator("#quarantine-stage")
  const well = page.locator(".tone-well").first()
  const stageBefore = await stage.boundingBox()
  const wellBefore = await well.boundingBox()
  expect(stageBefore).not.toBeNull()
  expect(wellBefore).not.toBeNull()

  await stage.hover()
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.22, box.y + box.height * 0.72)
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3, { steps: 12 })

  await expect(stage).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#vapor-index").textContent())).toBeGreaterThan(0)

  const stageAfter = await stage.boundingBox()
  const wellAfter = await well.boundingBox()
  expect(stageAfter).not.toBeNull()
  expect(wellAfter).not.toBeNull()
  expect(Math.round(wellAfter.x - stageAfter.x)).toBe(Math.round(wellBefore.x - stageBefore.x))
  expect(Math.round(wellAfter.y - stageAfter.y)).toBe(Math.round(wellBefore.y - stageBefore.y))
})

test("clicking tone wells quarantines tones and seals the choir", async ({ page }) => {
  await page.goto("/experiments/mercury-quarantine-choir")

  await page.locator(".tone-well").nth(2).click()
  await expect(page.locator(".tone-well").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#current-tone")).toHaveText(/tin alto/i)
  await expect(page.locator("#quarantine-stage")).toHaveAttribute("data-sealed", "1")
  await expect(page.locator("#sealed-count")).toHaveText("1")
  await expect(page.locator("#choir-ribbon")).toContainText(/TA vial/i)

  await page.locator("#seal-button").click()
  await expect(page.locator("#choir-state")).toHaveText(/sealed/i)

  await page.locator("#vent-button").click()
  await expect(page.locator("#sealed-count")).toHaveText("0")
  await expect(page.locator("#choir-state")).toHaveText(/unsealed/i)
})

test("keyboard controls quarantine numbered tones and move the normalized cursor", async ({ page }) => {
  await page.goto("/experiments/mercury-quarantine-choir")

  await page.keyboard.press("3")
  await expect(page.locator(".tone-well").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#sealed-count")).toHaveText("1")

  const before = await page.locator("#quarantine-stage").evaluate((stage) =>
    getComputedStyle(stage).getPropertyValue("--cursor-x")
  )
  await page.keyboard.press("ArrowRight")
  const after = await page.locator("#quarantine-stage").evaluate((stage) =>
    getComputedStyle(stage).getPropertyValue("--cursor-x")
  )
  expect(after).not.toBe(before)
})

test("narrow screens keep the mercury desk usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/mercury-quarantine-choir")

  await expect(page.getByRole("heading", { level: 1, name: /Mercury Quarantine Choir/i })).toBeVisible()
  await expect(page.locator("#seal-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
