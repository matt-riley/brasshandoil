import { test, expect } from "@playwright/test"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pagesDir = path.resolve(__dirname, "../../src/pages")
const blogContentDir = path.resolve(__dirname, "../../src/content/blog")

const pages = ["/", "/blog", "/experiments"]

// Dynamically add blog posts
if (fs.existsSync(blogContentDir)) {
  const files = fs.readdirSync(blogContentDir)
  for (const file of files) {
    if (file.endsWith(".md") || file.endsWith(".mdx")) {
      const slug = file.replace(/\.mdx?$/, "")
      pages.push(`/blog/${slug}`)
    }
  }
}

// Dynamically add experiments
const experimentsDir = path.join(pagesDir, "experiments")
if (fs.existsSync(experimentsDir)) {
  const files = fs.readdirSync(experimentsDir)
  // Sort them to keep test runs ordered
  files.sort().forEach((file) => {
    if (file.endsWith(".astro") && file !== "index.astro") {
      const name = file.replace(/\.astro$/, "")
      pages.push(`/experiments/${name}`)
    }
  })
}


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
