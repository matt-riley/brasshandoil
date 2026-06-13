import { test, expect } from "@playwright/test"

test.describe("Deer Ked — Voluntary Blindness Protocol", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/deer-ked-protocol")
  })

  test("page loads with title and genome panel", async ({ page }) => {
    await expect(page).toHaveTitle(/deer.?ked|blindness|protocol/i)
    const genome = page.locator("[data-testid='genome-panel']")
    await expect(genome).toBeVisible()
  })

  test("displays all vision genes as selectable rows", async ({ page }) => {
    const genes = page.locator("[data-testid='gene-row']")
    await expect(genes).toHaveCount(6)
    // Each gene should show its name and status
    const first = genes.first()
    await expect(first).toContainText(/ACTIVE/i)
  })

  test("clicking a gene row deactivates it and applies visual effect", async ({
    page,
  }) => {
    const firstGene = page.locator("[data-testid='gene-row']").first()

    // Click to deactivate
    await firstGene.click()
    await page.waitForTimeout(300)

    // Status should change
    await expect(firstGene).toContainText(/SILENCED/i)

    // The page body should have a degradation class or filter
    const body = page.locator("[data-testid='world']")
    const filter = await body.evaluate(el => getComputedStyle(el).filter)
    expect(filter).not.toBe("none")
  })

  test("deactivating a gene activates a corresponding feeding gene", async ({
    page,
  }) => {
    const feedingGenes = page.locator("[data-testid='feeding-gene']")
    // Initially all feeding genes should be dormant
    const initialCount = await feedingGenes.filter({ hasText: /ACTIVE/i }).count()
    expect(initialCount).toBe(0)

    // Deactivate first vision gene
    await page.locator("[data-testid='gene-row']").first().click()
    await page.waitForTimeout(500)

    // A feeding gene should now be active
    const activeCount = await feedingGenes.filter({ hasText: /ACTIVE/i }).count()
    expect(activeCount).toBe(1)
  })

  test("deactivating all genes shows final state", async ({ page }) => {
    const genes = page.locator("[data-testid='gene-row']")
    const count = await genes.count()

    for (let i = 0; i < count; i++) {
      await genes.nth(i).click()
      await page.waitForTimeout(200)
    }

    // Final state should be visible
    const finalState = page.locator("[data-testid='final-state']")
    await expect(finalState).toBeVisible({ timeout: 3000 })
  })

  test("scene contains visible deer before landing", async ({ page }) => {
    const deer = page.locator("[data-testid='deer']")
    await expect(deer).toBeVisible()
  })

  test("wings are shown initially and detach after first gene deactivation", async ({
    page,
  }) => {
    const wings = page.locator("[data-testid='wings']")
    await expect(wings.locator(".wing")).toHaveCount(2)
    await expect(wings.locator(".left-wing")).toBeVisible()
    await expect(wings.locator(".right-wing")).toBeVisible()

    // Deactivate first gene
    await page.locator("[data-testid='gene-row']").first().click()
    await page.waitForTimeout(1500)

    // Wings should have the detached class
    await expect(wings).toHaveClass(/detached/)
  })
})
