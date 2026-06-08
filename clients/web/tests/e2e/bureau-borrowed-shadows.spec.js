import { test, expect } from "@playwright/test"

test("bureau boots with objects, shadows, and quiet ledger readings", async ({ page }) => {
  await page.goto("/experiments/bureau-borrowed-shadows")

  await expect(
    page.getByRole("heading", { level: 1, name: /Bureau of Borrowed Shadows/i })
  ).toBeVisible()
  await expect(page.locator("#shadow-stage")).toBeVisible()
  await expect(page.locator("#shadow-lamp")).toBeVisible()
  await expect(page.locator(".bs-object")).toHaveCount(6)
  await expect(page.locator(".bs-shadow")).toHaveCount(6)
  await expect(page.locator("#loan-count")).toHaveText("0")
  await expect(page.locator("#ledger-state")).toHaveText(/balanced/i)
})

test("pointer lamp wakes the bureau without moving the object controls", async ({ page }) => {
  await page.goto("/experiments/bureau-borrowed-shadows")

  const stage = page.locator("#shadow-stage")
  const object = page.locator(".bs-object").first()
  const stageBefore = await stage.boundingBox()
  const before = await object.boundingBox()
  expect(stageBefore).not.toBeNull()
  expect(before).not.toBeNull()

  await stage.hover()
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.25)
  await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.6, { steps: 10 })

  await expect(stage).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#ink-reading").textContent())).toBeGreaterThan(0)

  const after = await object.boundingBox()
  const stageAfter = await stage.boundingBox()
  expect(after).not.toBeNull()
  expect(stageAfter).not.toBeNull()
  expect(Math.round(after.x - stageAfter.x)).toBe(Math.round(before.x - stageBefore.x))
  expect(Math.round(after.y - stageAfter.y)).toBe(Math.round(before.y - stageBefore.y))
})

test("clicking objects borrows shadows and updates the ledger", async ({ page }) => {
  await page.goto("/experiments/bureau-borrowed-shadows")

  await page.locator(".bs-object").nth(1).click()
  await expect(page.locator(".bs-object").nth(1)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#shadow-stage")).toHaveAttribute("data-loans", "1")
  await expect(page.locator("#current-holder")).toHaveText(/umbrella/i)
  await expect(page.locator("#ledger-state")).toHaveText(/unbalanced/i)

  await page.locator(".bs-object").nth(4).click()
  await expect(page.locator("#shadow-stage")).toHaveAttribute("data-loans", "2")
  await expect(page.locator("#loan-count")).toHaveText("2")
})

test("keyboard borrowing, stamping, and recall are deterministic", async ({ page }) => {
  await page.goto("/experiments/bureau-borrowed-shadows")

  await page.locator(".bs-object").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".bs-object").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.locator("#stamp-button").click()
  await expect(page.locator("#ledger-state")).toHaveText(/certified/i)
  await expect.poll(async () => Number(await page.locator("#ink-reading").textContent())).toBeGreaterThan(30)

  await page.locator("#recall-button").click()
  await expect(page.locator("#loan-count")).toHaveText("0")
  await expect(page.locator("#ink-reading")).toHaveText("0")
  await expect(page.locator("#ledger-state")).toHaveText(/balanced/i)
})

test("narrow screens keep the projection desk usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/bureau-borrowed-shadows")

  await expect(
    page.getByRole("heading", { level: 1, name: /Bureau of Borrowed Shadows/i })
  ).toBeVisible()
  await expect(page.locator("#stamp-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
