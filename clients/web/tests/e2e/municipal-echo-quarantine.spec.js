import { test, expect } from "@playwright/test"

test("municipal echo quarantine boots with bays, controls, meter, and ledger", async ({ page }) => {
  await page.goto("/experiments/municipal-echo-quarantine")

  await expect(
    page.getByRole("heading", { level: 1, name: /Municipal Echo Quarantine/i })
  ).toBeVisible()
  await expect(page.locator("#quarantine-bays .echo-bay")).toHaveCount(3)
  await expect(page.locator(".echo-slip")).toHaveCount(3)
  await expect(page.locator("#resonance-meter")).toBeVisible()
  await expect(page.locator("#released-ledger")).toContainText(/No echoes released/i)
})

test("detaining and releasing a phrase updates the ledger", async ({ page }) => {
  await page.goto("/experiments/municipal-echo-quarantine")

  await page.locator("#phrase-input").fill("stairwell apology")
  await page.locator("#detain-phrase").click()

  await expect(page.locator("#detained-count")).toHaveText("4")
  await expect(page.locator("#active-phrase")).toContainText(/stairwell apology/i)

  await page.locator("#release-active-echo").click()
  await expect(page.locator("#municipal-echo-quarantine")).toHaveAttribute("data-cleared", "1")
  await expect(page.locator("#cleared-count")).toHaveText("1")
  await expect(page.locator("#released-ledger .ledger-slip")).toHaveCount(1)
  await expect(page.locator("#released-ledger")).toContainText(/stairwell apology/i)
})

test("keyboard controls and deterministic hooks clear detained echoes", async ({ page }) => {
  await page.goto("/experiments/municipal-echo-quarantine")

  await page.locator("#phrase-input").focus()
  await page.keyboard.type("misplaced elevator hum")
  await page.keyboard.press("Enter")
  await expect(page.locator("#active-phrase")).toContainText(/misplaced elevator hum/i)

  await page.waitForFunction(() => typeof window.__detainEchoForTest === "function")
  await page.evaluate(() => {
    window.__detainEchoForTest("wet tile announcement")
    window.__releaseEchoForTest()
  })

  await expect(page.locator("#cleared-count")).toHaveText("1")
  await expect(page.locator("#released-ledger")).toContainText(/wet tile announcement/i)
})

test("narrow viewport keeps the acoustic desk usable without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/experiments/municipal-echo-quarantine")

  await expect(
    page.getByRole("heading", { level: 1, name: /Municipal Echo Quarantine/i })
  ).toBeVisible()
  await expect(page.locator("#detain-phrase")).toBeVisible()

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  )
  expect(hasHorizontalOverflow).toBe(false)
})
