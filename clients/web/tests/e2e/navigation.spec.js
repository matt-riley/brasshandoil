import { test, expect } from "@playwright/test"

test("homepage renders primary navigation and GitHub link", async ({ page }) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", { name: /Creative Web Experiments/i })
  ).toBeVisible()
  await expect(page.getByRole("link", { name: "Experiments" })).toBeVisible()
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    /github\.com\/matt-riley\/brasshandoil/
  )
})

test("experiments index navigates into a rendered experiment and back out", async ({
  page,
}) => {
  await page.goto("/experiments")

  await expect(
    page.getByRole("main").getByRole("heading", { level: 1, name: "Experiments" })
  ).toBeVisible()

  const firstCard = page.locator(".experiment-card").first()
  await expect(firstCard).toBeVisible()
  const title = await firstCard.locator(".experiment-title").textContent()
  await firstCard.click()

  await expect(page).toHaveURL(/\/experiments\/[^/]+$/)
  await expect(
    page.getByRole("heading", { level: 1, name: new RegExp(title.trim(), "i") })
  ).toBeVisible()

  await page.getByRole("link", { name: "Experiments" }).click()
  await expect(page).toHaveURL(/\/experiments\/?$/)
})
