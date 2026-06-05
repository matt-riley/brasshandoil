import { test, expect } from "@playwright/test"

test("receipt rain choir boots with receipts, bins, and initial totals", async ({ page }) => {
  await page.goto("/experiments/receipt-rain-choir")

  await expect(
    page.getByRole("heading", { level: 1, name: /Receipt Rain Choir/i })
  ).toBeVisible()
  await expect(page.locator("#receipt-field")).toBeVisible()
  await expect(page.locator(".receipt-strip")).toHaveCount(9)
  await expect(page.locator("#sorted-total")).toHaveText("$0.00")
  await expect(page.locator("#unsorted-total")).toHaveText(/\$/)
  await expect(page.getByRole("button", { name: /Summon receipt weather/i })).toBeVisible()
})

test("clicking a receipt and a bin sorts the strip and updates the choir", async ({ page }) => {
  await page.goto("/experiments/receipt-rain-choir")

  await page.locator(".receipt-strip").first().click()
  await expect(page.locator(".receipt-strip").first()).toHaveAttribute("aria-pressed", "true")
  await page.locator("#bin-archive").click()

  await expect(page.locator(".receipt-strip.sorted").first()).toHaveAttribute("data-bin", "archive")
  await expect(page.locator("#choir-mode")).toHaveText(/archival/i)
  await expect.poll(async () => {
    const text = await page.locator("#sorted-total").textContent()
    return parseFloat((text || "0").replace(/[$,]/g, ""))
  }).toBeGreaterThan(0)
})

test("keyboard sorting can select a receipt and send it to shredding", async ({ page }) => {
  await page.goto("/experiments/receipt-rain-choir")

  await page.locator(".receipt-strip").nth(1).focus()
  await page.keyboard.press("Enter")
  await page.keyboard.press("2")

  await expect(page.locator(".receipt-strip").nth(1)).toHaveClass(/sorted/)
  await expect(page.locator(".receipt-strip").nth(1)).toHaveAttribute("data-bin", "shred")
  await expect(page.locator("#choir-mode")).toHaveText(/confetti/i)
})

test("summoning receipt weather restores unsorted strips", async ({ page }) => {
  await page.goto("/experiments/receipt-rain-choir")

  await page.locator(".receipt-strip").first().click()
  await page.locator("#bin-audit").click()
  await expect(page.locator(".receipt-strip.sorted")).toHaveCount(1)

  await page.locator("#summon-button").click()
  await expect(page.locator(".receipt-strip.sorted")).toHaveCount(0)
  await expect(page.locator("#sorted-total")).toHaveText("$0.00")
})

test("narrow screens keep the receipt desk usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/receipt-rain-choir")

  await expect(
    page.getByRole("heading", { level: 1, name: /Receipt Rain Choir/i })
  ).toBeVisible()
  await expect(page.locator("#bin-archive")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
