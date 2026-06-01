import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  page.on("pageerror", (err) => {
    console.error("BROWSER PAGE ERROR:", err.stack || err.message)
  })
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("BROWSER CONSOLE ERROR:", msg.text())
    }
  })
})

test("complaint received renders the department portal", async ({ page }) => {
  await page.goto("/experiments/complaint-received?test=true")

  await expect(
    page.getByRole("heading", { level: 1, name: /COMPLAINT RECEIVED/i })
  ).toBeVisible()

  await expect(page.locator("#complaint-form")).toBeVisible()
  await expect(page.locator("#complaint-input")).toBeVisible()
  await expect(page.locator("#submit-btn")).toBeVisible()
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

  await page.goto("/experiments/complaint-received?test=true")

  // Fill in a complaint
  await page.locator("#complaint-input").fill("My shadow has started arriving before me.")

  // Submit
  await page.locator("#submit-btn").click()

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

  await page.goto("/experiments/complaint-received?test=true")

  await page.locator("#complaint-input").fill("I have misplaced Tuesday.")
  await page.locator("#submit-btn").click()
  await expect(page.locator("#complaint-response")).toBeVisible({ timeout: 6000 })
  const firstCase = await page.locator("#case-number").textContent()

  // Submit again
  await page.locator("#complaint-input").fill("My reflection disagrees with me.")
  await page.locator("#submit-btn").click()
  await expect(page.locator("#complaint-response")).toBeVisible({ timeout: 6000 })
  const secondCase = await page.locator("#case-number").textContent()

  expect(firstCase).not.toBe(secondCase)
})

test("quick-fill buttons populate the complaint textarea", async ({ page }) => {
  await page.goto("/experiments/complaint-received?test=true")

  const firstQuickFill = page.locator(".quick-fill").first()
  const quickText = await firstQuickFill.textContent()
  await firstQuickFill.click()

  const inputValue = await page.locator("#complaint-input").inputValue()
  expect(inputValue.length).toBeGreaterThan(0)
})
