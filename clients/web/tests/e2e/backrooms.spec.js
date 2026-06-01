import { test, expect } from "@playwright/test"

test("backrooms loads with corridor view and step counter", async ({ page }) => {
  await page.goto("/experiments/backrooms")

  await expect(
    page.getByRole("heading", { level: 1, name: /the backrooms/i })
  ).toBeVisible()

  await expect(page.locator("#corridor")).toBeVisible()
  await expect(page.locator("#step-counter")).toContainText(/0/)
})

test("arrow keys increment step counter", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator("#corridor")).toBeVisible()

  const readSteps = async () =>
    parseInt(
      (await page.locator("#step-counter").textContent())?.replace(/[^0-9]/g, "") || "0",
      10
    )

  const before = await readSteps()
  await page.keyboard.press("ArrowUp")
  await page.waitForTimeout(600)
  await page.keyboard.press("ArrowUp")
  await page.waitForTimeout(600)

  const after = await readSteps()
  expect(after).toBeGreaterThan(before)
})

test("corridor contains fluorescent lights", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator(".fluorescent-light").first()).toBeVisible()
})

test("wall notes appear after enough steps", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator("#corridor")).toBeVisible()

  // Take enough steps to trigger a wall note
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("ArrowUp")
    await page.waitForTimeout(600)
  }

  // At least one wall note should exist in the DOM
  const notes = page.locator(".wall-note")
  await expect(notes.first()).toBeAttached({ timeout: 5000 })
})
