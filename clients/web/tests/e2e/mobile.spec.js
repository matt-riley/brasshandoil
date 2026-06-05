import { test, expect } from "@playwright/test"

const pages = [
  "/",
  "/blog",
  "/blog/post-1",
  "/experiments",
  "/experiments/abyssal-naming-committee",
  "/experiments/anxiety-engine",
  "/experiments/backrooms",
  "/experiments/boatfire-regatta",
  "/experiments/chrono-calibration",
  "/experiments/complaint-received",
  "/experiments/dependency-caterpillar",
  "/experiments/ghost-kitchen-district",
  "/experiments/lost-and-found-futures",
  "/experiments/mimetic-tuner",
  "/experiments/moth-oracle",
  "/experiments/mouse-census",
  "/experiments/office-evaporated-things",
  "/experiments/oil-telegraph",
  "/experiments/orbital-harmonics",
  "/experiments/red-card-bloom",
  "/experiments/scroll-symphony",
  "/experiments/sentient-monolith",
  "/experiments/theremin",
  "/experiments/indisputable-permanence",
  "/experiments/pigeon-magnetoreception",
  "/experiments/spin-room",
  "/experiments/tidal-type-foundry",
  "/experiments/trionda-calibration",
  "/experiments/dark-star-observatory",
  "/experiments/pressure-choir",
  "/experiments/abyssal-nodule-patchbay",
  "/experiments/lichen-ledger",
  "/experiments/love-in-the-west",
  "/experiments/receipt-rain-choir",
]

test.use({
  viewport: { width: 375, height: 812 },
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",
})

for (const url of pages) {
  test(`page ${url} does not have horizontal overflow on mobile viewport`, async ({ page }) => {
    await page.goto(url)
    // Wait for the page to fully load and run any initial client scripts/canvas setup
    await page.waitForTimeout(1000)

    const overflowDetails = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth
      const innerWidth = window.innerWidth
      
      // Find elements that are wider than window.innerWidth to help diagnose which element causes overflow
      const overflowingElements = []
      if (scrollWidth > innerWidth) {
        const allElements = document.querySelectorAll("*")
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.right > innerWidth) {
            overflowingElements.push({
              tagName: el.tagName,
              id: el.id,
              className: el.className,
              rectRight: rect.right,
              rectWidth: rect.width,
              parentTagName: el.parentElement?.tagName,
            })
          }
        })
      }

      return {
        scrollWidth,
        innerWidth,
        overflowingElements: overflowingElements.slice(0, 5), // return top 5 for debugging
      }
    })

    console.log(`URL: ${url} -> scrollWidth: ${overflowDetails.scrollWidth}, innerWidth: ${overflowDetails.innerWidth}`)
    if (overflowDetails.scrollWidth > overflowDetails.innerWidth) {
      console.log("Overflowing elements:", JSON.stringify(overflowDetails.overflowingElements, null, 2))
    }

    expect(overflowDetails.scrollWidth).toBeLessThanOrEqual(overflowDetails.innerWidth)
  })
}
