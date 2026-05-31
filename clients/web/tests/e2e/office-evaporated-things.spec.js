import { test, expect } from "@playwright/test"

test("office of evaporated things renders the watchfulness register and inventory", async ({ page }) => {
  await page.goto("/experiments/office-evaporated-things")

  await expect(
    page.getByRole("heading", { level: 1, name: /OFFICE OF EVAPORATED THINGS/i })
  ).toBeVisible()

  await expect(page.locator("#watchfulness-register")).toBeVisible()
  await expect(page.locator(".inventory-item")).not.toHaveCount(0)
  await expect(page.locator("#deficit-readout")).toHaveText(/0\.00/)
})

test("demonstrate evaporation removes one inventory item and files it in the ledger", async ({ page }) => {
  await page.goto("/experiments/office-evaporated-things")

  const initialCount = await page.locator(".inventory-item").count()
  expect(initialCount).toBeGreaterThan(0)

  await expect(page.locator("#evaporation-ledger .ledger-entry")).toHaveCount(0)

  await page.getByRole("button", { name: /DEMONSTRATE EVAPORATION/i }).click()

  await expect(page.locator(".inventory-item")).toHaveCount(initialCount - 1)
  await expect(page.locator("#evaporation-ledger .ledger-entry")).toHaveCount(1)
})

test("looking away (visibilitychange hidden) updates the document title with a plea", async ({ page }) => {
  await page.goto("/experiments/office-evaporated-things")

  await expect(
    page.getByRole("heading", { level: 1, name: /OFFICE OF EVAPORATED THINGS/i })
  ).toBeVisible()

  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    })
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true })
    document.dispatchEvent(new Event("visibilitychange"))
  })

  await page.waitForTimeout(1200)

  const title = await page.title()
  expect(title).not.toBe("Brass Hand Oil")
  expect(title.length).toBeGreaterThan(0)
})

test("returning after a long absence evaporates many items and writes a return notice", async ({ page }) => {
  await page.goto("/experiments/office-evaporated-things")

  const initialCount = await page.locator(".inventory-item").count()

  await page.evaluate(() => {
    // Pretend we left 9 seconds ago.
    window.__officeSimulateReturn(9)
  })

  // 9 seconds at the default 2s-per-item rate = 4 evaporations.
  await expect(page.locator(".inventory-item")).toHaveCount(initialCount - 4)
  await expect(page.locator("#evaporation-ledger .ledger-entry")).toHaveCount(4)
  await expect(page.locator("#return-notice")).toBeVisible()
  await expect(page.locator("#return-notice")).toContainText(/9/)
})
