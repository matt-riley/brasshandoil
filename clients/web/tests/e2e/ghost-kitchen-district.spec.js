import { test, expect } from "@playwright/test"

test("ghost kitchen district boots with storefronts, metrics, and ordering", async ({ page }) => {
  await page.goto("/experiments/ghost-kitchen-district")

  await expect(
    page.getByRole("heading", { level: 1, name: /Ghost Kitchen District/i })
  ).toBeVisible()

  await expect(page.locator("#steam-canvas")).toBeVisible()
  await expect(page.locator("#kitchen-count")).toHaveText(/\d+/)
  await expect(page.locator("#meal-count")).toHaveText("0")
  await expect(page.getByRole("button", { name: /Place Another Order/i })).toBeVisible()
})

test("ordering reveals aliases and dispatches couriers but never dinner", async ({ page }) => {
  await page.goto("/experiments/ghost-kitchen-district")

  const readCount = async (selector) =>
    parseInt((await page.locator(selector).textContent())?.replace(/[^0-9]/g, "") || "0", 10)

  const kitchensBefore = await readCount("#kitchen-count")
  const couriersBefore = await page.locator(".gkd-courier").count()
  const dispatchBefore = await page.locator("#dispatch-line").textContent()

  await page.getByRole("button", { name: /Place Another Order/i }).click()

  await expect.poll(() => readCount("#kitchen-count")).toBeGreaterThan(kitchensBefore)
  await expect.poll(() => page.locator(".gkd-courier").count()).toBeGreaterThan(couriersBefore)
  await expect(page.locator("#meal-count")).toHaveText("0")
  await expect(page.locator("#dispatch-line")).not.toHaveText(dispatchBefore ?? "")
})

test("narrow screens keep the district readable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/experiments/ghost-kitchen-district")

  await expect(
    page.getByRole("heading", { level: 1, name: /Ghost Kitchen District/i })
  ).toBeVisible()
  await expect(page.getByRole("button", { name: /Place Another Order/i })).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
