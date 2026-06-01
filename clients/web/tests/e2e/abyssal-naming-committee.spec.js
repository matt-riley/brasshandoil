import { test, expect } from "@playwright/test"

test("abyssal committee boots with specimen, readouts, and classification control", async ({ page }) => {
  await page.goto("/experiments/abyssal-naming-committee")

  await expect(
    page.getByRole("heading", { level: 1, name: /Abyssal Naming Committee/i })
  ).toBeVisible()

  await expect(page.locator("#abyss-canvas")).toBeVisible()
  await expect(page.locator("#certainty-value")).toHaveText(/\d+%/)
  await expect(page.locator("#sibling-count")).toHaveText(/\d+/)
  await expect(page.getByRole("button", { name: /Apply Confident Taxonomy/i })).toBeVisible()
})

test("classification lowers certainty and reveals inconvenient siblings", async ({ page }) => {
  await page.goto("/experiments/abyssal-naming-committee")

  const readPercent = async () =>
    parseInt((await page.locator("#certainty-value").textContent())?.replace(/[^0-9]/g, "") || "0", 10)
  const readCount = async () =>
    parseInt((await page.locator("#sibling-count").textContent())?.replace(/[^0-9]/g, "") || "0", 10)

  const certaintyBefore = await readPercent()
  const siblingsBefore = await readCount()
  const classificationBefore = await page.locator("#classification-line").textContent()

  await page.getByRole("button", { name: /Apply Confident Taxonomy/i }).click()

  await expect.poll(readPercent).toBeLessThan(certaintyBefore)
  await expect.poll(readCount).toBeGreaterThan(siblingsBefore)
  await expect(page.locator("#classification-line")).not.toHaveText(classificationBefore ?? "")
})

test("moving through the water steers the research spotlight", async ({ page }) => {
  await page.goto("/experiments/abyssal-naming-committee")

  const canvas = page.locator("#abyss-canvas")
  const box = await canvas.boundingBox()
  expect(box).not.toBeNull()

  await page.mouse.move((box?.x ?? 0) + 80, (box?.y ?? 0) + 120)
  await expect(page.locator(".anc-shell")).toHaveAttribute("style", /--spot-x:/)
  await expect(page.locator(".anc-shell")).toHaveAttribute("style", /--spot-y:/)
})
