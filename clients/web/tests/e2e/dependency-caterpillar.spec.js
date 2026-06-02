import { test, expect } from "@playwright/test"

test("dependency caterpillar boots with initial readouts, stage, and action button", async ({ page }) => {
  await page.goto("/experiments/dependency-caterpillar")

  await expect(
    page.getByRole("heading", { level: 1, name: /Dependency Caterpillar/i })
  ).toBeVisible()

  await expect(page.locator("#garden-canvas")).toBeVisible()
  await expect(page.locator("#dependency-count")).toHaveText(/\d+/)
  await expect(page.locator("#bundle-size")).toHaveText(/\d+(\.\d+)?\s*MB/)
  await expect(page.locator("#performance-rating")).toHaveText(/Excellent/i)
  await expect(page.getByRole("button", { name: /Optimize Project/i })).toBeVisible()
})

test("optimization adds dependencies, grows bundle size, and degrades performance rating", async ({ page }) => {
  await page.goto("/experiments/dependency-caterpillar")

  const readCount = async () =>
    parseInt((await page.locator("#dependency-count").textContent()) || "0", 10)
  
  const readSize = async () =>
    parseFloat((await page.locator("#bundle-size").textContent())?.replace(/[^0-9.]/g, "") || "0")

  const countBefore = await readCount()
  const sizeBefore = await readSize()

  await page.getByRole("button", { name: /Optimize Project/i }).click()
  await page.getByRole("button", { name: /Optimize Project/i }).click()
  await page.getByRole("button", { name: /Optimize Project/i }).click()

  await expect.poll(readCount).toBeGreaterThan(countBefore)
  await expect.poll(readSize).toBeGreaterThan(sizeBefore)
  await expect(page.locator("#status-line")).not.toHaveText(/lightweight/i)
})

test("moving the mouse guides the caterpillar", async ({ page }) => {
  await page.goto("/experiments/dependency-caterpillar")

  const container = page.locator(".dc-shell")
  const box = await container.boundingBox()
  expect(box).not.toBeNull()

  // Steer cursor
  await page.mouse.move((box?.x ?? 0) + 150, (box?.y ?? 0) + 200)
  
  // Verify pointer position style vars
  await expect(page.locator(".dc-shell")).toHaveAttribute("style", /--pointer-x:/)
  await expect(page.locator(".dc-shell")).toHaveAttribute("style", /--pointer-y:/)
})
