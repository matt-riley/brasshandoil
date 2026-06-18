import { test, expect } from "@playwright/test"

test("mnemonic scent customs boots with curtain, vials, gates, and ledger", async ({ page }) => {
  await page.goto("/experiments/mnemonic-scent-customs")

  await expect(
    page.getByRole("heading", { level: 1, name: /Mnemonic Scent Customs/i })
  ).toBeVisible()
  await expect(page.locator("#chromatograph-curtain")).toBeVisible()
  await expect(page.locator(".scent-vial")).toHaveCount(5)
  await expect(page.locator("#memory-gates input")).toHaveCount(3)
  await expect(page.locator("#cleared-count")).toHaveText("0")
  await expect(page.locator("#current-note")).toContainText(/cedar|rain|ozone|paper|citrus/i)
})

test("selecting and stamping a scent updates the smell ledger", async ({ page }) => {
  await page.goto("/experiments/mnemonic-scent-customs")

  await page.locator(".scent-vial").nth(2).click()
  await expect(page.locator(".scent-vial").nth(2)).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("#active-vial")).toContainText(/ozone/i)

  await page.locator("#stamp-selected-scent").click()
  await expect(page.locator("#mnemonic-scent-customs")).toHaveAttribute("data-cleared", "1")
  await expect(page.locator("#cleared-count")).toHaveText("1")
  await expect(page.locator("#scent-ledger .ledger-slip")).toHaveCount(1)
})

test("keyboard selection and deterministic test hook stamp scents", async ({ page }) => {
  await page.goto("/experiments/mnemonic-scent-customs")

  await page.locator(".scent-vial").first().focus()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(page.locator(".scent-vial").nth(1)).toHaveAttribute("aria-pressed", "true")

  await page.waitForFunction(() => typeof window.__stampScentForTest === "function")
  await page.evaluate(() => {
    window.__stampScentForTest("citrus static")
  })

  await expect(page.locator("#cleared-count")).toHaveText("1")
  await expect(page.locator("#scent-ledger")).toContainText(/citrus static/i)
})

test("narrow viewport keeps the customs bench usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/mnemonic-scent-customs")

  await expect(
    page.getByRole("heading", { level: 1, name: /Mnemonic Scent Customs/i })
  ).toBeVisible()
  await expect(page.locator("#stamp-selected-scent")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
