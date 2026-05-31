import { test, expect } from "@playwright/test"

test("complaint received renders the department portal", async ({ page }) => {
  await page.goto("/experiments/complaint-received")

  await expect(
    page.getByRole("heading", { level: 1, name: /COMPLAINT RECEIVED/i })
  ).toBeVisible()

  await expect(page.locator("#complaint-form")).toBeVisible()
  await expect(page.locator("#complaint-input")).toBeVisible()
  await expect(page.getByRole("button", { name: /SUBMIT COMPLAINT/i })).toBeVisible()
})

test("submitting a complaint produces an official response", async ({ page }) => {
  // Stub speechSynthesis so the test doesn't error in headless
  await page.addInitScript(() => {
    window.speechSynthesis = {
      speak: () => {},
      cancel: () => {},
      getVoices: () => [],
      speaking: false,
      pending: false,
      paused: false,
    }
    window.SpeechSynthesisUtterance = class {
      constructor(text) { this.text = text }
    }
  })

  await page.goto("/experiments/complaint-received")

  // Fill in a complaint
  await page.locator("#complaint-input").fill("My shadow has started arriving before me.")

  // Submit
  await page.getByRole("button", { name: /SUBMIT COMPLAINT/i }).click()

  // Response should appear
  await expect(page.locator("#complaint-response")).toBeVisible({ timeout: 6000 })
  await expect(page.locator("#complaint-response")).not.toHaveText("")

  // Case number should be visible
  await expect(page.locator("#case-number")).toBeVisible()
})

test("each submission generates a new case number", async ({ page }) => {
  await page.addInitScript(() => {
    window.speechSynthesis = {
      speak: () => {},
      cancel: () => {},
      getVoices: () => [],
      speaking: false,
      pending: false,
      paused: false,
    }
    window.SpeechSynthesisUtterance = class {
      constructor(text) { this.text = text }
    }
  })

  await page.goto("/experiments/complaint-received")

  await page.locator("#complaint-input").fill("I have misplaced Tuesday.")
  await page.getByRole("button", { name: /SUBMIT COMPLAINT/i }).click()
  await expect(page.locator("#complaint-response")).toBeVisible({ timeout: 6000 })
  const firstCase = await page.locator("#case-number").textContent()

  // Submit again
  await page.locator("#complaint-input").fill("My reflection disagrees with me.")
  await page.getByRole("button", { name: /SUBMIT COMPLAINT/i }).click()
  await expect(page.locator("#complaint-response")).toBeVisible({ timeout: 6000 })
  const secondCase = await page.locator("#case-number").textContent()

  expect(firstCase).not.toBe(secondCase)
})

test("quick-fill buttons populate the complaint textarea", async ({ page }) => {
  await page.goto("/experiments/complaint-received")

  const firstQuickFill = page.locator(".quick-fill").first()
  const quickText = await firstQuickFill.textContent()
  await firstQuickFill.click()

  const inputValue = await page.locator("#complaint-input").inputValue()
  expect(inputValue.length).toBeGreaterThan(0)
})
