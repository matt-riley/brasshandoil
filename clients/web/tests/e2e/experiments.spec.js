import { test, expect } from "@playwright/test"

test("anxiety engine renders and calm down updates the report", async ({ page }) => {
  await page.goto("/experiments/anxiety-engine")

  await expect(
    page.getByRole("heading", { level: 1, name: "The Anxiety Engine" })
  ).toBeVisible()
  await expect(page.locator("#ae-threat")).toHaveText(/ELEVATED|HIGH|CRITICAL|MAXIMUM DREAD|MANAGEABLE/)

  await page.getByRole("button", { name: "CALM DOWN" }).click()
  await expect(page.locator("#ae-message")).not.toHaveText("")
})

test("boatfire regatta launches a thought and changes its chorus", async ({ page }) => {
  await page.goto("/experiments/boatfire-regatta")

  await expect(
    page.getByRole("heading", { level: 1, name: "Boatfire Regatta" })
  ).toBeVisible()

  const chorus = page.locator("#chorus-line")
  const initialChorus = await chorus.textContent()

  await page.getByRole("textbox", { name: "Thought for the water" }).fill("unfinished weather")
  await page.getByRole("button", { name: "Launch thought" }).click()

  await expect(page.locator("#launch-count")).toHaveText("1")
  await expect(chorus).not.toHaveText(initialChorus ?? "")
})

test("red card bloom tugs the braid into a visible warning", async ({ page }) => {
  await page.goto("/experiments/red-card-bloom")

  await expect(
    page.getByRole("heading", { level: 1, name: "Red Card Bloom" })
  ).toBeVisible()

  const state = page.locator("#bloom-state")
  await expect(state).toHaveText("The pitch is breathing softly.")

  await page.getByRole("button", { name: "Pull the braid" }).click()

  await expect(page.locator("#tug-count")).toHaveText("1")
  await expect(state).not.toHaveText("The pitch is breathing softly.")
})

test("red card bloom flowers red cards after a deep drag", async ({ page }) => {
  await page.goto("/experiments/red-card-bloom")

  const handle = page.getByRole("button", { name: "Pull the braid" })
  const bounds = await handle.boundingBox()
  if (!bounds) throw new Error("Expected the braid handle to be visible")

  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
  await page.mouse.down()
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2 + 170,
    { steps: 8 }
  )
  await page.mouse.up()

  await expect(page.locator("#tug-count")).toHaveText("1")
  await expect(page.locator("#bloom-state")).toHaveText(
    "Red card weather. The pitch is flowering warnings."
  )
})

test("lost and found futures issues a claim and opens its filed details", async ({
  page,
}) => {
  await page.goto("/experiments/lost-and-found-futures")

  await expect(
    page.getByRole("heading", { level: 1, name: "Lost & Found Futures" })
  ).toBeVisible()

  const initialClaims = await page.locator(".claim-card").count()
  await page.getByRole("button", { name: "Issue a future" }).click()
  await expect(page.locator(".claim-card")).toHaveCount(initialClaims + 1)

  const newestClaim = page.locator(".claim-card").first()
  await newestClaim.getByRole("button", { name: "Inspect claim" }).click()
  await expect(page.locator("#future-popover")).toBeVisible()
  await expect(page.locator("#popover-title")).not.toHaveText("Pending claim")
})

test("moth oracle dispenses a new prophecy", async ({ page }) => {
  await page.goto("/experiments/moth-oracle")

  await expect(
    page.getByRole("heading", { level: 1, name: "Moth Oracle" })
  ).toBeVisible()

  const response = page.locator("#oracle-response")
  const initialResponse = await response.textContent()

  await page.getByRole("button", { name: "Ask the moths" }).click()
  await expect(response).not.toHaveText(initialResponse ?? "")
})

test("orbital harmonics launches a typed word into orbit", async ({ page }) => {
  await page.goto("/experiments/orbital-harmonics")

  await expect(
    page.getByRole("heading", { level: 1, name: "Orbital Harmonics" })
  ).toBeVisible()

  await page.getByRole("textbox", { name: "Word launcher" }).fill("Comet")
  await page.getByRole("button", { name: "Launch" }).click()
  await expect(page.locator(".orbital-word", { hasText: "Comet" })).toBeVisible()
})

test("scroll symphony responds to scroll progress in the rendered page", async ({
  page,
}) => {
  await page.goto("/experiments/scroll-symphony")

  await expect(page.locator("#instruction-hud")).toContainText("Scroll Symphony")
  await expect(page.locator("#progress-bar")).toHaveCSS("width", "0px")

  await page.evaluate(() => {
    const scrollTarget = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo(0, scrollTarget)
    window.dispatchEvent(new Event("scroll"))
  })

  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await expect
    .poll(async () => {
      const width = await page.locator("#progress-bar").evaluate((element) => {
        return Number.parseFloat(getComputedStyle(element).width)
      })

      return width
    })
    .toBeGreaterThan(0)
})

test("sentient monolith renders reactive text in the browser", async ({ page }) => {
  await page.goto("/experiments/sentient-monolith")

  await expect(page.locator("#monolith")).toContainText("The machine is learning to breathe.")

  const wordCount = await page.locator(".reactive-word").count()
  expect(wordCount).toBeGreaterThan(20)
})

test("theremin boots from the overlay and shows live note info", async ({ page }) => {
  await page.goto("/experiments/theremin")

  await expect(
    page.getByRole("heading", { level: 1, name: "Theremin" })
  ).toBeVisible()
  await expect(page.locator("#overlay")).toBeVisible()

  await page.locator("#overlay").click()
  await expect(page.locator("#overlay")).toBeHidden()

  await page.mouse.move(200, 120)
  await expect(page.locator("#info")).not.toHaveText("—")
})

test("chrono calibration boots from overlay, hovers anchor to open popover, and triggers stabilization", async ({ page }) => {
  await page.goto("/experiments/chrono-calibration")

  await expect(
    page.getByRole("heading", { level: 1, name: "Chrono-Spatial Calibration Desk" })
  ).toBeVisible()

  await expect(page.locator("#audio-overlay")).toBeVisible()
  await page.getByRole("button", { name: "ACTIVATE CORE" }).click()
  await expect(page.locator("#audio-overlay")).toBeHidden()

  // Hover over the first temporal anchor to open the popover
  const anchor = page.locator("#anchor-tl-902")
  await anchor.hover({ force: true })

  // Popover should be visible
  const popover = page.locator("#chrono-popover")
  await expect(popover).toBeVisible()
  await expect(page.locator("#popover-title")).toContainText("TIMELINE ALPHA-902")

  // Trigger stabilization
  const stabilizeBtn = page.locator("#stabilize-btn")
  await stabilizeBtn.click()
  await expect(stabilizeBtn).toHaveText("STABILIZING...")
  
  // Drift variance should align to 0.00%
  await expect(page.locator("#popover-drift-val")).toHaveText("0.00%")
})
