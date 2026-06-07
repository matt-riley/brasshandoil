import { test, expect } from "@playwright/test"

test("glasshouse parliament boots with panes, lens, and quiet readings", async ({ page }) => {
  await page.goto("/experiments/glasshouse-parliament")

  await expect(
    page.getByRole("heading", { level: 1, name: /Glasshouse Parliament/i })
  ).toBeVisible()
  await expect(page.locator("#glasshouse-stage")).toBeVisible()
  await expect(page.locator("#sun-lens")).toBeVisible()
  await expect(page.locator(".gh-pane")).toHaveCount(8)
  await expect(page.locator("#motion-reading")).toHaveText("0")
  await expect(page.locator("#verdict-reading")).toHaveText(/not seated/i)
})

test("pointer light wakes the chamber without moving the voting panes", async ({ page }) => {
  await page.goto("/experiments/glasshouse-parliament")

  const stage = page.locator("#glasshouse-stage")
  const firstPane = page.locator(".gh-pane").first()
  const before = await firstPane.boundingBox()
  expect(before).not.toBeNull()

  const box = await stage.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.24, box.y + box.height * 0.28)
  await page.mouse.move(box.x + box.width * 0.76, box.y + box.height * 0.62, { steps: 8 })

  await expect(stage).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#motion-reading").textContent())).toBeGreaterThan(0)

  const after = await firstPane.boundingBox()
  expect(after).not.toBeNull()
  expect(Math.round(after.x)).toBe(Math.round(before.x))
  expect(Math.round(after.y)).toBe(Math.round(before.y))
})

test("clicking panes casts votes and changes the verdict", async ({ page }) => {
  await page.goto("/experiments/glasshouse-parliament")

  await page.locator(".gh-pane").nth(2).click()
  await expect(page.locator(".gh-pane").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#glasshouse-stage")).toHaveAttribute("data-motion", "1")
  await expect(page.locator("#verdict-reading")).toHaveText(/opened/i)

  await page.locator(".gh-pane").nth(5).click()
  await expect(page.locator("#glasshouse-stage")).toHaveAttribute("data-motion", "2")
  await expect.poll(async () => Number(await page.locator("#heat-reading").textContent())).toBeGreaterThan(0)
})

test("keyboard voting, watering, and adjournment are deterministic", async ({ page }) => {
  await page.goto("/experiments/glasshouse-parliament")

  await page.locator(".gh-pane").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".gh-pane").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.locator("#water-button").click()
  await expect.poll(async () => Number(await page.locator("#dew-reading").textContent())).toBeGreaterThan(0)
  await expect(page.locator("#verdict-reading")).toHaveText(/mist/i)

  await page.locator("#adjourn-button").click()
  await expect(page.locator("#motion-reading")).toHaveText("0")
  await expect(page.locator("#heat-reading")).toHaveText("0")
  await expect(page.locator("#dew-reading")).toHaveText("0")
  await expect(page.locator("#verdict-reading")).toHaveText(/not seated/i)
})

test("narrow screens keep the greenhouse chamber usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/glasshouse-parliament")

  await expect(
    page.getByRole("heading", { level: 1, name: /Glasshouse Parliament/i })
  ).toBeVisible()
  await expect(page.locator("#water-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
