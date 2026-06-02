import { test, expect } from "@playwright/test"

test("backrooms loads with corridor view and step counter", async ({ page }) => {
  await page.goto("/experiments/backrooms")

  await expect(
    page.getByRole("heading", { level: 1, name: /the backrooms/i })
  ).toBeVisible()

  await expect(page.locator("#corridor")).toBeVisible()
  await expect(page.locator("#step-counter")).toContainText(/0/)
})

test("arrow keys increment step counter", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator("#corridor")).toBeVisible()

  const readSteps = async () =>
    parseInt(
      (await page.locator("#step-counter").textContent())?.replace(/[^0-9]/g, "") || "0",
      10
    )

  const before = await readSteps()
  await page.keyboard.press("ArrowUp")
  await page.waitForTimeout(600)
  await page.keyboard.press("ArrowUp")
  await page.waitForTimeout(600)

  const after = await readSteps()
  expect(after).toBeGreaterThan(before)
})

test("corridor contains fluorescent lights", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator(".fluorescent-light").first()).toBeVisible()
})

test("corridor renders visible perspective depth", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator("#corridor")).toBeVisible()
  await page.waitForTimeout(100)

  const depthBands = await page.locator("#corridor").evaluate((canvas) => {
    const context = canvas.getContext("2d")
    const x = Math.floor(canvas.width / 2)
    let bands = 0
    let previous = null

    for (let y = 0; y < canvas.height; y += 4) {
      const current = context.getImageData(x, y, 1, 1).data
      if (
        previous &&
        Math.abs(current[0] - previous[0]) +
          Math.abs(current[1] - previous[1]) +
          Math.abs(current[2] - previous[2]) >
          8
      ) {
        bands++
      }
      previous = current
    }

    return bands
  })

  expect(depthBands).toBeGreaterThan(8)
})

test("corridor fits below the shared site header", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator("#corridor")).toBeVisible()

  const layout = await page.evaluate(() => {
    const header = document.querySelector("body > header")
    const shell = document.querySelector("#backrooms-shell")
    const canvas = document.querySelector("#corridor")

    return {
      headerBottom: header?.getBoundingClientRect().bottom,
      shellTop: shell?.getBoundingClientRect().top,
      shellHeight: shell?.clientHeight,
      canvasCssHeight: canvas?.getBoundingClientRect().height,
    }
  })

  expect(layout.shellTop).toBeGreaterThanOrEqual(layout.headerBottom)
  expect(layout.canvasCssHeight).toBe(layout.shellHeight)
})

test("wall notes appear after enough steps", async ({ page }) => {
  await page.goto("/experiments/backrooms")
  await expect(page.locator("#corridor")).toBeVisible()

  // Take enough steps to trigger a wall note
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("ArrowUp")
    await page.waitForTimeout(600)
  }

  // At least one wall note should exist in the DOM
  const notes = page.locator(".wall-note")
  await expect(notes.first()).toBeAttached({ timeout: 5000 })
})
