import { test, expect } from "@playwright/test"

test("static orchard boots with antenna, trees, and initial readouts", async ({ page }) => {
  await page.goto("/experiments/static-orchard-switchboard")

  await expect(
    page.getByRole("heading", { level: 1, name: /Static Orchard Switchboard/i })
  ).toBeVisible()
  await expect(page.locator("#static-orchard")).toBeVisible()
  await expect(page.locator(".signal-tree")).toHaveCount(7)
  await expect(page.locator("#signal-reading")).toHaveText("0.00")
  await expect(page.locator("#jar-count")).toHaveText("0")
  await expect(page.locator("#orchard-state")).toHaveText(/untuned/i)
})

test("pointer tuning moves the antenna and raises the signal", async ({ page }) => {
  await page.goto("/experiments/static-orchard-switchboard")

  const stage = page.locator("#orchard-stage")
  const box = await stage.boundingBox()
  expect(box).not.toBeNull()

  await page.mouse.move(box.x + box.width * 0.72, box.y + box.height * 0.42)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width * 0.28, box.y + box.height * 0.6, { steps: 10 })
  await page.mouse.up()

  await expect(stage).toHaveAttribute("data-tuned", "true")
  await expect.poll(async () => {
    const text = await page.locator("#signal-reading").textContent()
    return parseFloat(text || "0")
  }).toBeGreaterThan(0)
  await expect(page.locator("#active-tree")).not.toHaveText("none")
})

test("keyboard tuning and bottling updates harvest state", async ({ page }) => {
  await page.goto("/experiments/static-orchard-switchboard")

  await page.locator("#antenna-probe").focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowDown")
  await page.keyboard.press("Space")

  await expect(page.locator("#jar-count")).toHaveText("1")
  await expect(page.locator("#orchard-stage")).toHaveAttribute("data-harvests", "1")
  await expect(page.locator("#orchard-state")).toHaveText(/bottled/i)
})

test("tune, bottle, and reset controls are deterministic", async ({ page }) => {
  await page.goto("/experiments/static-orchard-switchboard")

  await page.locator("#tune-button").click()
  await expect.poll(async () => {
    const text = await page.locator("#signal-reading").textContent()
    return parseFloat(text || "0")
  }).toBeGreaterThan(0)

  await page.locator("#bottle-button").click()
  await expect(page.locator("#jar-count")).toHaveText("1")

  await page.locator("#reset-button").click()
  await expect(page.locator("#signal-reading")).toHaveText("0.00")
  await expect(page.locator("#jar-count")).toHaveText("0")
  await expect(page.locator("#orchard-state")).toHaveText(/untuned/i)
})

test("narrow screens keep the switchboard usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/static-orchard-switchboard")

  await expect(
    page.getByRole("heading", { level: 1, name: /Static Orchard Switchboard/i })
  ).toBeVisible()
  await expect(page.locator("#bottle-button")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
