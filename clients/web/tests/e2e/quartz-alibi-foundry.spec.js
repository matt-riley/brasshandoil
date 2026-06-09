import { test, expect } from "@playwright/test"

test("foundry boots with shards, echoes, and neutral testimony", async ({ page }) => {
  await page.goto("/experiments/quartz-alibi-foundry")

  await expect(
    page.getByRole("heading", { level: 1, name: /Quartz Alibi Foundry/i })
  ).toBeVisible()
  await expect(page.locator("#qa-stage")).toBeVisible()
  await expect(page.locator("#qa-lens")).toBeVisible()
  await expect(page.locator(".qa-shard")).toHaveCount(7)
  await expect(page.locator(".qa-echo")).toHaveCount(7)
  await expect(page.locator("#testimony-count")).toHaveText("0")
  await expect(page.locator("#verdict-state")).toHaveText(/unheated/i)
})

test("pointer lens wakes the foundry without moving shard controls", async ({ page }) => {
  await page.goto("/experiments/quartz-alibi-foundry")

  const stage = page.locator("#qa-stage")
  const shard = page.locator(".qa-shard").first()
  const stageBefore = await stage.boundingBox()
  const before = await shard.boundingBox()
  expect(stageBefore).not.toBeNull()
  expect(before).not.toBeNull()

  await stage.hover()
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.18, box.y + box.height * 0.72)
  await page.mouse.move(box.x + box.width * 0.76, box.y + box.height * 0.28, { steps: 12 })

  await expect(stage).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#phase-reading").textContent())).toBeGreaterThan(0)

  const after = await shard.boundingBox()
  const stageAfter = await stage.boundingBox()
  expect(after).not.toBeNull()
  expect(stageAfter).not.toBeNull()
  expect(Math.round(after.x - stageAfter.x)).toBe(Math.round(before.x - stageBefore.x))
  expect(Math.round(after.y - stageAfter.y)).toBe(Math.round(before.y - stageBefore.y))
})

test("clicking shards records testimony and updates the verdict", async ({ page }) => {
  await page.goto("/experiments/quartz-alibi-foundry")

  await page.locator(".qa-shard").nth(2).click()
  await expect(page.locator(".qa-shard").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#qa-stage")).toHaveAttribute("data-testimony", "1")
  await expect(page.locator("#current-witness")).toHaveText(/selenite clerk/i)
  await expect(page.locator("#verdict-state")).toHaveText(/contradictory/i)

  await page.locator(".qa-shard").nth(5).click()
  await expect(page.locator("#qa-stage")).toHaveAttribute("data-testimony", "2")
  await expect(page.locator("#testimony-count")).toHaveText("2")
})

test("keyboard testimony, forging, and cooling are deterministic", async ({ page }) => {
  await page.goto("/experiments/quartz-alibi-foundry")

  await page.locator(".qa-shard").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".qa-shard").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.locator("#forge-button").click()
  await expect(page.locator("#verdict-state")).toHaveText(/temporarily coherent/i)
  await expect.poll(async () => Number(await page.locator("#phase-reading").textContent())).toBeGreaterThan(30)

  await page.locator("#cool-button").click()
  await expect(page.locator("#testimony-count")).toHaveText("0")
  await expect(page.locator("#phase-reading")).toHaveText("0")
  await expect(page.locator("#verdict-state")).toHaveText(/unheated/i)
})

test("narrow screens keep the foundry usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/quartz-alibi-foundry")

  await expect(
    page.getByRole("heading", { level: 1, name: /Quartz Alibi Foundry/i })
  ).toBeVisible()
  await expect(page.locator("#forge-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
