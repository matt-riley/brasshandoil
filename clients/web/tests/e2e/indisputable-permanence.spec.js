import { test, expect } from "@playwright/test"

test("indisputable permanence page loads with Swiss poster layout and control buttons", async ({ page }) => {
  await page.goto("/experiments/indisputable-permanence")

  // Check the title / main heading
  await expect(
    page.getByRole("heading", { level: 1, name: /Indisputable Permanence/i })
  ).toBeVisible()

  // Check controls
  await expect(page.getByRole("button", { name: /Deconstruct/i })).toBeVisible()
  await expect(page.getByRole("button", { name: /Restore Order/i })).toBeVisible()
  await expect(page.getByRole("button", { name: /Agitate/i })).toBeVisible()
})

test("deconstructing and applying gravity causes words to move and scatter, and restoring order resets them", async ({ page }) => {
  await page.goto("/experiments/indisputable-permanence")

  // Wait for the word nodes to be rendered
  const firstWord = page.locator(".phys-word").first()
  await expect(firstWord).toBeVisible()

  // Get initial bounding box of the first word
  const boxBefore = await firstWord.boundingBox()
  expect(boxBefore).not.toBeNull()

  // Click deconstruct
  await page.getByRole("button", { name: /Deconstruct/i }).click()
  
  // Toggle gravity/wind or wait a moment for physics updates
  await page.waitForTimeout(500)

  // Verify bounding box has changed (it fell or moved)
  const boxAfter = await firstWord.boundingBox()
  expect(boxAfter).not.toBeNull()
  expect(boxAfter.y).not.toBe(boxBefore.y)

  // Click restore order
  await page.getByRole("button", { name: /Restore Order/i }).click()
  await page.waitForTimeout(600) // Wait for transition duration

  // Verify bounding box returns to near initial coordinates
  const boxRestored = await firstWord.boundingBox()
  expect(boxRestored).not.toBeNull()
  expect(Math.abs(boxRestored.y - boxBefore.y)).toBeLessThan(5)
  expect(Math.abs(boxRestored.x - boxBefore.x)).toBeLessThan(5)
})
