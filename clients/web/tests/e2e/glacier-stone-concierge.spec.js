import { test, expect } from "@playwright/test"

test("concierge boots with waypoints, stamps, and an unstamped itinerary", async ({ page }) => {
  await page.goto("/experiments/glacier-stone-concierge")

  await expect(
    page.getByRole("heading", { level: 1, name: /Glacier Stone Concierge/i })
  ).toBeVisible()
  await expect(page.locator("#gsc-stage")).toBeVisible()
  await expect(page.locator("#gsc-stone")).toBeVisible()
  await expect(page.locator(".gsc-waypoint")).toHaveCount(5)
  await expect(page.locator(".gsc-stamp")).toHaveCount(5)
  await expect(page.locator("#route-count")).toHaveText("0")
  await expect(page.locator("#delivery-state")).toHaveText(/awaiting ice/i)
})

test("pointer drift wakes the ice map without moving waypoint controls", async ({ page }) => {
  await page.goto("/experiments/glacier-stone-concierge")

  const stage = page.locator("#gsc-stage")
  const waypoint = page.locator(".gsc-waypoint").first()
  const stageBefore = await stage.boundingBox()
  const before = await waypoint.boundingBox()
  expect(stageBefore).not.toBeNull()
  expect(before).not.toBeNull()

  await stage.hover()
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.78)
  await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.26, { steps: 10 })

  await expect(stage).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#drift-reading").textContent())).toBeGreaterThan(0)

  const after = await waypoint.boundingBox()
  const stageAfter = await stage.boundingBox()
  expect(after).not.toBeNull()
  expect(stageAfter).not.toBeNull()
  expect(Math.round(after.x - stageAfter.x)).toBe(Math.round(before.x - stageBefore.x))
  expect(Math.round(after.y - stageAfter.y)).toBe(Math.round(before.y - stageBefore.y))
})

test("clicking waypoints stamps the route and advances the stone", async ({ page }) => {
  await page.goto("/experiments/glacier-stone-concierge")

  await page.locator(".gsc-waypoint").nth(1).click()
  await expect(page.locator(".gsc-waypoint").nth(1)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#gsc-stage")).toHaveAttribute("data-route-count", "1")
  await expect(page.locator("#current-checkpoint")).toHaveText(/morainal passport/i)
  await expect(page.locator("#delivery-state")).toHaveText(/partly escorted/i)

  await page.locator(".gsc-waypoint").nth(3).click()
  await expect(page.locator("#route-count")).toHaveText("2")
  await expect(page.locator(".gsc-stamp").nth(3)).toHaveAttribute("data-stamped", "true")
})

test("keyboard routing, dispatch, and refreeze are deterministic", async ({ page }) => {
  await page.goto("/experiments/glacier-stone-concierge")

  await page.locator(".gsc-waypoint").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".gsc-waypoint").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.locator("#dispatch-button").click()
  await expect(page.locator("#delivery-state")).toHaveText(/delivered to arguing chalk/i)
  await expect.poll(async () => Number(await page.locator("#drift-reading").textContent())).toBeGreaterThan(30)

  await page.locator("#refreeze-button").click()
  await expect(page.locator("#route-count")).toHaveText("0")
  await expect(page.locator("#drift-reading")).toHaveText("0")
  await expect(page.locator("#delivery-state")).toHaveText(/awaiting ice/i)
})

test("narrow screens keep the concierge usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/glacier-stone-concierge")

  await expect(
    page.getByRole("heading", { level: 1, name: /Glacier Stone Concierge/i })
  ).toBeVisible()
  await expect(page.locator("#dispatch-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
