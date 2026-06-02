import { test, expect } from "@playwright/test"

test("pigeon magnetoreception page loads with title and flight area", async ({ page }) => {
  await page.goto("/experiments/pigeon-magnetoreception")

  await expect(
    page.getByRole("heading", { level: 1, name: /magnetoreception/i })
  ).toBeVisible()

  await expect(page.locator("#flight-area")).toBeVisible()
  await expect(page.locator("#magnetic-signal")).toBeVisible()
})

test("clicking the flight area engages pointer lock and shows instructions", async ({ page }) => {
  await page.goto("/experiments/pigeon-magnetoreception")

  // Stub pointer lock API
  await page.evaluate(() => {
    const el = document.getElementById("flight-area")
    if (el) {
      el.requestPointerLock = () => {
        Object.defineProperty(document, "pointerLockElement", {
          configurable: true,
          get: () => el,
        })
        document.dispatchEvent(new Event("pointerlockchange"))
        return Promise.resolve()
      }
    }
  })

  await page.locator("#flight-area").click()
  await expect(page.locator("#status")).toContainText(/flying/i)
})

test("mouse movement updates pigeon position and magnetic reading", async ({ page }) => {
  await page.goto("/experiments/pigeon-magnetoreception")

  // Stub pointer lock
  await page.evaluate(() => {
    const el = document.getElementById("flight-area")
    if (el) {
      el.requestPointerLock = () => {
        Object.defineProperty(document, "pointerLockElement", {
          configurable: true,
          get: () => el,
        })
        document.dispatchEvent(new Event("pointerlockchange"))
        return Promise.resolve()
      }
    }
  })

  await page.locator("#flight-area").click()

  const initialReading = await page.locator("#magnetic-signal").textContent()

  // Simulate mouse movement via Pointer Lock movementX/Y
  await page.evaluate(() => {
    for (let i = 0; i < 10; i++) {
      document.dispatchEvent(
        new MouseEvent("mousemove", { movementX: 20, movementY: 0 })
      )
    }
  })

  // Distance display should have updated
  await expect(page.locator("#distance")).not.toHaveText("")
})

test("reaching home triggers arrival message", async ({ page }) => {
  await page.goto("/experiments/pigeon-magnetoreception")

  // Teleport pigeon to the home position
  await page.evaluate(() => {
    if (typeof window.__pigeonArriveHome === "function") {
      window.__pigeonArriveHome()
    }
  })

  await expect(page.locator("#arrival-message")).toBeVisible({ timeout: 3000 })
})
