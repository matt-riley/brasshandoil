import { test, expect } from "@playwright/test"

test.describe("KQ14 Orbital Deposition Hearing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experiments/kq14-deposition")
  })

  test("page loads with courtroom title and case number", async ({ page }) => {
    await expect(page).toHaveTitle(/kq14|deposition|orbital/i)
    const heading = page.locator("[data-testid='case-heading']")
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/2023 KQ14/i)
  })

  test("defendant chair is present and labeled Planet Nine", async ({
    page,
  }) => {
    const chair = page.locator("[data-testid='defendant-chair']")
    await expect(chair).toBeVisible()
    await expect(chair).toContainText(/Planet Nine|Absent|Defendant/i)
  })

  test("witness KBOs orbit the courtroom using offset-path", async ({
    page,
  }) => {
    const witnesses = page.locator("[data-testid='witness-kbo']")
    await expect(witnesses.first()).toBeVisible({ timeout: 3000 })
    const count = await witnesses.count()
    expect(count).toBeGreaterThanOrEqual(3)

    // Verify CSS motion path is applied
    const hasOffsetPath = await witnesses.first().evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.offsetPath !== "none" && style.offsetPath !== ""
    })
    expect(hasOffsetPath).toBe(true)
  })

  test("clicking a witness stabilizes their orbit", async ({ page }) => {
    const witness = page.locator("[data-testid='witness-kbo']").first()
    await expect(witness).toBeVisible({ timeout: 3000 })

    // Click to stabilize
    await witness.click()
    await page.waitForTimeout(500)

    // Witness should gain stabilized class or data attribute
    await expect(witness).toHaveAttribute("data-stabilized", "true")
  })

  test("stabilization count updates in the transcript", async ({ page }) => {
    const counter = page.locator("[data-testid='stabilization-count']")
    await expect(counter).toContainText("0")

    const witness = page.locator("[data-testid='witness-kbo']").first()
    await expect(witness).toBeVisible({ timeout: 3000 })
    await witness.click()
    await page.waitForTimeout(500)

    await expect(counter).not.toContainText("0")
  })

  test("transcript log accumulates courtroom entries", async ({ page }) => {
    const transcript = page.locator("[data-testid='transcript']")
    await expect(transcript).toBeVisible()
    const entries = transcript.locator(".transcript-entry")
    await expect(entries.first()).toBeVisible({ timeout: 3000 })
  })

  test("stabilizing all witnesses triggers verdict", async ({ page }) => {
    // Use test hook to fast-forward
    await page.evaluate(() => {
      const w = window as unknown as { __triggerVerdict?: () => void }
      w.__triggerVerdict?.()
    })
    await page.waitForTimeout(500)

    const verdict = page.locator("[data-testid='verdict']")
    await expect(verdict).toBeVisible({ timeout: 3000 })
    await expect(verdict).toContainText(/dismissed|acquitted|insufficient/i)
  })
})
