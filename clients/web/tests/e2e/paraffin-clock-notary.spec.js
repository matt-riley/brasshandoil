import { test, expect } from "@playwright/test"

test("paraffin clock notary boots with candles, controls, and ledger", async ({ page }) => {
  await page.goto("/experiments/paraffin-clock-notary")

  await expect(
    page.getByRole("heading", { level: 1, name: /Paraffin Clock Notary/i })
  ).toBeVisible()
  await expect(page.locator("#candle-stage .wax-column")).toHaveCount(4)
  await expect(page.locator("#wick-control")).toBeVisible()
  await expect(page.locator("#draft-control")).toBeVisible()
  await expect(page.locator("#seal-pressure-control")).toBeVisible()
  await expect(page.locator("#wax-ledger")).toContainText(/No seconds have been notarized/i)
})

test("notarizing a selected candle updates the ledger and readouts", async ({ page }) => {
  await page.goto("/experiments/paraffin-clock-notary")

  await page.locator(".wax-column").nth(2).click()
  await expect(page.locator("#selected-candle")).toHaveText("wick C")

  await page.locator("#notarize-second").click()
  await expect(page.locator("#paraffin-clock-notary")).toHaveAttribute("data-notarized", "1")
  await expect(page.locator("#notarized-count")).toHaveText("1")
  await expect(page.locator("#wax-ledger .ledger-seal")).toHaveCount(1)
  await expect(page.locator("#wax-ledger")).toContainText(/second 31 \/ wick C notarized/i)
})

test("keyboard controls and deterministic hooks select and notarize wax seconds", async ({ page }) => {
  await page.goto("/experiments/paraffin-clock-notary")

  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#selected-candle")).toHaveText("wick B")

  await page.waitForFunction(() => typeof window.__selectParaffinCandleForTest === "function")
  await page.evaluate(() => {
    window.__selectParaffinCandleForTest(3)
    window.__notarizeSecondForTest()
  })

  await expect(page.locator("#notarized-count")).toHaveText("1")
  await expect(page.locator("#wax-ledger")).toContainText(/second 44 \/ wick D notarized/i)
})

test("cooling the ledger clears wax seals for another minute", async ({ page }) => {
  await page.goto("/experiments/paraffin-clock-notary")

  await page.locator("#notarize-second").click()
  await expect(page.locator("#wax-ledger .ledger-seal")).toHaveCount(1)

  await page.keyboard.press("Escape")
  await expect(page.locator("#paraffin-clock-notary")).toHaveAttribute("data-notarized", "0")
  await expect(page.locator("#notarized-count")).toHaveText("0")
  await expect(page.locator("#wax-ledger")).toContainText(/No seconds have been notarized/i)
})

test("narrow viewport keeps the wax desk usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/paraffin-clock-notary")

  await expect(
    page.getByRole("heading", { level: 1, name: /Paraffin Clock Notary/i })
  ).toBeVisible()
  await expect(page.locator("#notarize-second")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
