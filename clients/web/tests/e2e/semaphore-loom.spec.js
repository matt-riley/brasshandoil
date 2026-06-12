import { test, expect } from "@playwright/test"

test("loom boots with color keys, signal threads, and unwoven counters", async ({ page }) => {
  await page.goto("/experiments/semaphore-loom")

  await expect(
    page.getByRole("heading", { level: 1, name: /Semaphore Loom for Stray Colors/i })
  ).toBeVisible()
  await expect(page.locator("#semaphore-loom")).toBeVisible()
  await expect(page.locator("#signal-rig")).toBeVisible()
  await expect(page.locator("#phrase-ribbon")).toBeVisible()
  await expect(page.locator(".loom-key")).toHaveCount(6)
  await expect(page.locator(".signal-thread")).toHaveCount(6)
  await expect(page.locator("#woven-count")).toHaveText("0")
  await expect(page.locator("#broadcast-state")).toHaveText(/unwoven/i)
})

test("pointer drift wakes the rig without moving color key controls", async ({ page }) => {
  await page.goto("/experiments/semaphore-loom")

  const rig = page.locator("#signal-rig")
  const key = page.locator(".loom-key").first()
  const rigBefore = await rig.boundingBox()
  const keyBefore = await key.boundingBox()
  expect(rigBefore).not.toBeNull()
  expect(keyBefore).not.toBeNull()

  await rig.hover()
  const box = await rig.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box.x + box.width * 0.16, box.y + box.height * 0.74)
  await page.mouse.move(box.x + box.width * 0.86, box.y + box.height * 0.22, { steps: 12 })

  await expect(rig).toHaveAttribute("data-awake", "true")
  await expect.poll(async () => Number(await page.locator("#resonance-index").textContent())).toBeGreaterThan(0)

  const rigAfter = await rig.boundingBox()
  const keyAfter = await key.boundingBox()
  expect(rigAfter).not.toBeNull()
  expect(keyAfter).not.toBeNull()
  expect(Math.round(keyAfter.x - rigAfter.x)).toBe(Math.round(keyBefore.x - rigBefore.x))
  expect(Math.round(keyAfter.y - rigAfter.y)).toBe(Math.round(keyBefore.y - rigBefore.y))
})

test("clicking color keys weaves the phrase and lights matching threads", async ({ page }) => {
  await page.goto("/experiments/semaphore-loom")

  await page.locator(".loom-key").nth(3).click()
  await expect(page.locator(".loom-key").nth(3)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#current-glyph")).toHaveText(/green hush/i)
  await expect(page.locator("#signal-rig")).toHaveAttribute("data-woven", "1")
  await expect(page.locator("#woven-count")).toHaveText("1")
  await expect(page.locator(".signal-thread").nth(3)).toHaveAttribute("data-lit", "true")

  await page.locator(".loom-key").nth(5).click()
  await expect(page.locator("#woven-count")).toHaveText("2")
  await expect(page.locator("#phrase-ribbon")).toContainText(/green hush/i)
  await expect(page.locator("#phrase-ribbon")).toContainText(/violet afterimage/i)
})

test("keyboard weaving, broadcast, and unweave are deterministic", async ({ page }) => {
  await page.goto("/experiments/semaphore-loom")

  await page.locator(".loom-key").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".loom-key").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.locator("#broadcast-button").click()
  await expect(page.locator("#broadcast-state")).toHaveText(/broadcasting/i)
  await expect.poll(async () => Number(await page.locator("#resonance-index").textContent())).toBeGreaterThan(20)

  await page.locator("#unweave-button").click()
  await expect(page.locator("#woven-count")).toHaveText("0")
  await expect(page.locator("#resonance-index")).toHaveText("0")
  await expect(page.locator("#broadcast-state")).toHaveText(/unwoven/i)
})

test("narrow screens keep the loom usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/semaphore-loom")

  await expect(
    page.getByRole("heading", { level: 1, name: /Semaphore Loom for Stray Colors/i })
  ).toBeVisible()
  await expect(page.locator("#broadcast-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
