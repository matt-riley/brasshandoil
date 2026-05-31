import { test, expect } from "@playwright/test"

test("mouse census boots with a field, readouts, and controls", async ({ page }) => {
  await page.goto("/experiments/mouse-census")

  await expect(
    page.getByRole("heading", { level: 1, name: /Regional Mouse Census/i })
  ).toBeVisible()

  await expect(page.locator("#census-canvas")).toBeVisible()
  await expect(page.locator("#mouse-count")).toBeVisible()
  await expect(page.locator("#status-line")).toContainText(/Containment status/i)
  await expect(page.getByRole("button", { name: /Deploy Mitigation/i })).toBeVisible()
})

test("surveying with the mouse breeds more mice (count rises)", async ({ page }) => {
  await page.goto("/experiments/mouse-census")
  await expect(page.locator("#census-canvas")).toBeVisible()

  const readCount = async () =>
    parseInt((await page.locator("#mouse-count").textContent())?.replace(/[^0-9]/g, "") || "0", 10)

  const before = await readCount()

  const box = await page.locator("#census-canvas").boundingBox()
  expect(box).not.toBeNull()
  const b = box ?? { x: 0, y: 0, width: 400, height: 400 }
  await page.mouse.move(b.x + b.width * 0.3, b.y + b.height * 0.5)
  for (let i = 0; i < 30; i++) {
    await page.mouse.move(
      b.x + b.width * (0.3 + 0.4 * Math.random()),
      b.y + b.height * (0.4 + 0.4 * Math.random())
    )
  }
  await page.waitForTimeout(300)

  const after = await readCount()
  expect(after).toBeGreaterThan(before)
})

test("mitigation makes the plague worse, recount restores the baseline", async ({ page }) => {
  await page.goto("/experiments/mouse-census")
  await expect(page.locator("#census-canvas")).toBeVisible()

  const readCount = async () =>
    parseInt((await page.locator("#mouse-count").textContent())?.replace(/[^0-9]/g, "") || "0", 10)

  const before = await readCount()
  await page.getByRole("button", { name: /Deploy Mitigation/i }).click()
  await page.waitForTimeout(200)
  const afterMitigation = await readCount()
  expect(afterMitigation).toBeGreaterThan(before)
  await expect(page.locator("#mc-message")).not.toHaveText("")

  await page.getByRole("button", { name: /Order Official Recount/i }).click()
  await page.waitForTimeout(200)
  const afterRecount = await readCount()
  expect(afterRecount).toBeLessThan(afterMitigation)
})
