import { test, expect } from "@playwright/test"

test("archive boots with rain drops, permit slips, and quiet counters", async ({ page }) => {
  await page.goto("/experiments/archive-unlicensed-rain")

  await expect(
    page.getByRole("heading", { level: 1, name: /Archive of Unlicensed Rain/i })
  ).toBeVisible()
  await expect(page.locator("#rain-archive")).toBeVisible()
  await expect(page.locator("#storm-pane")).toBeVisible()
  await expect(page.locator("#stamp-pad")).toBeVisible()
  await expect(page.locator(".rain-drop")).toHaveCount(7)
  await expect(page.locator(".permit-slip")).toHaveCount(7)
  await expect(page.locator("#licensed-count")).toHaveText("0")
  await expect(page.locator("#archive-status")).toHaveText(/unfiled/i)
})

test("pointer movement wakes the storm without shifting drop controls", async ({ page }) => {
  await page.goto("/experiments/archive-unlicensed-rain")

  const pane = page.locator("#storm-pane")
  const drop = page.locator(".rain-drop").first()
  const paneBefore = await pane.boundingBox()
  const dropBefore = await drop.boundingBox()
  expect(paneBefore).not.toBeNull()
  expect(dropBefore).not.toBeNull()

  await pane.hover()
  const box = await pane.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.18, box.y + box.height * 0.28)
  await page.mouse.move(box.x + box.width * 0.78, box.y + box.height * 0.66, { steps: 8 })

  await expect(pane).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#storm-debt").textContent())).toBeGreaterThan(0)

  const paneAfter = await pane.boundingBox()
  const dropAfter = await drop.boundingBox()
  expect(paneAfter).not.toBeNull()
  expect(dropAfter).not.toBeNull()
  expect(Math.round(dropAfter.x - paneAfter.x)).toBe(Math.round(dropBefore.x - paneBefore.x))
  expect(Math.round(dropAfter.y - paneAfter.y)).toBe(Math.round(dropBefore.y - paneBefore.y))
})

test("clicking a drop and stamping it updates the archive", async ({ page }) => {
  await page.goto("/experiments/archive-unlicensed-rain")

  await page.locator(".rain-drop").nth(2).click()
  await expect(page.locator(".rain-drop").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#current-drop")).toHaveText(/gutters/i)

  await page.locator("#stamp-current").click()
  await expect(page.locator("#storm-pane")).toHaveAttribute("data-licensed", "1")
  await expect(page.locator("#licensed-count")).toHaveText("1")
  await expect(page.locator("#archive-status")).toHaveText(/provisional/i)
  await expect(page.locator(".permit-slip").nth(2)).toHaveAttribute("data-stamped", "true")
})

test("keyboard selection, stamp pad activation, and reset are deterministic", async ({ page }) => {
  await page.goto("/experiments/archive-unlicensed-rain")

  await page.locator(".rain-drop").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".rain-drop").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.locator("#stamp-pad").click()
  await expect(page.locator("#storm-pane")).toHaveAttribute("data-licensed", "1")
  await expect(page.locator("#licensed-count")).toHaveText("1")

  await page.locator("#reset-archive").click()
  await expect(page.locator("#licensed-count")).toHaveText("0")
  await expect(page.locator("#storm-debt")).toHaveText("0")
  await expect(page.locator("#archive-status")).toHaveText(/unfiled/i)
})

test("narrow screens keep the rain archive usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/archive-unlicensed-rain")

  await expect(
    page.getByRole("heading", { level: 1, name: /Archive of Unlicensed Rain/i })
  ).toBeVisible()
  await expect(page.locator("#stamp-current")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
