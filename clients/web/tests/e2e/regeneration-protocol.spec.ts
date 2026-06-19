import { test, expect } from "@playwright/test"

test.describe("The Regeneration Protocol", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/regeneration-protocol")
  })

  test("page loads with title and lab notebook layout", async ({ page }) => {
    await expect(page).toHaveTitle(/regeneration|protocol/i)
    const notebook = page.locator("[data-testid='lab-notebook']")
    await expect(notebook).toBeVisible()
  })

  test("displays scarred tissue sections with fibrotic text", async ({ page }) => {
    const sections = page.locator("[data-testid='tissue-section']")
    await expect(sections).toHaveCount(5)
    // Each section should initially be in scarred state
    const first = sections.first()
    await expect(first).toHaveAttribute("data-state", "scarred")
  })

  test("displays a progress panel showing treatment status", async ({ page }) => {
    const panel = page.locator("[data-testid='treatment-panel']")
    await expect(panel).toBeVisible()
    await expect(panel).toContainText(/0.*\/.*5/i)
  })

  test("selecting scarred text triggers FGF2 phase (visual transformation)", async ({
    page,
  }) => {
    const section = page.locator("[data-testid='tissue-section']").first()

    // Triple-click to select all text in the section
    await section.click({ clickCount: 3 })
    await page.waitForTimeout(500)

    // Section should enter the transforming/fgf2 state
    const state = await section.getAttribute("data-state")
    expect(state).toMatch(/fgf2|transforming/)
  })

  test("releasing selection triggers BMP2 phase and completes regeneration", async ({
    page,
  }) => {
    const section = page.locator("[data-testid='tissue-section']").first()

    // Select text in section
    await section.click({ clickCount: 3 })
    await page.waitForTimeout(600)

    // Click elsewhere to release selection (triggers BMP2)
    await page.locator("[data-testid='lab-notebook']").click({ position: { x: 10, y: 10 } })
    await page.waitForTimeout(1000)

    // Section should be regenerated
    await expect(section).toHaveAttribute("data-state", "regenerated")
  })

  test("regenerated section shows real text instead of scar tissue", async ({
    page,
  }) => {
    const section = page.locator("[data-testid='tissue-section']").first()
    const scarText = await section.textContent()

    // Regenerate it
    await section.click({ clickCount: 3 })
    await page.waitForTimeout(600)
    await page.locator("[data-testid='lab-notebook']").click({ position: { x: 10, y: 10 } })
    await page.waitForTimeout(1000)

    const healedText = await section.textContent()
    expect(healedText).not.toBe(scarText)
  })

  test("progress panel updates as sections are regenerated", async ({ page }) => {
    const section = page.locator("[data-testid='tissue-section']").first()

    // Regenerate first section
    await section.click({ clickCount: 3 })
    await page.waitForTimeout(600)
    await page.locator("[data-testid='lab-notebook']").click({ position: { x: 10, y: 10 } })
    await page.waitForTimeout(1000)

    const panel = page.locator("[data-testid='treatment-panel']")
    await expect(panel).toContainText(/1.*\/.*5/)
  })

  test("regenerating all sections reveals the final discovery", async ({ page }) => {
    const sections = page.locator("[data-testid='tissue-section']")
    const count = await sections.count()

    for (let i = 0; i < count; i++) {
      const section = sections.nth(i)
      await section.click({ clickCount: 3 })
      await page.waitForTimeout(600)
      await page.locator("[data-testid='lab-notebook']").click({ position: { x: 10, y: 10 } })
      await page.waitForTimeout(1000)
    }

    const finale = page.locator("[data-testid='final-discovery']")
    await expect(finale).toBeVisible({ timeout: 3000 })
  })

  test("each tissue section has a unique tissue type label", async ({ page }) => {
    const labels = page.locator("[data-testid='tissue-label']")
    await expect(labels).toHaveCount(5)
    const texts = await labels.allTextContents()
    const unique = new Set(texts)
    expect(unique.size).toBe(5)
  })
})
