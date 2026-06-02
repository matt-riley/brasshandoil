# Skill: E2E Mobile Viewport Testing and Touch Gesture Mitigation

**Origin:** Site-Wide Mobile Responsiveness Remediation

When adapting complex interactive experiments (canvas rendering, pointer-tracking, dragging) for mobile devices, two major issues arise: horizontal layout overflow and page scrolling during drag gestures. 

## 1. Automated Mobile Viewport Testing (Playwright TDD)
Rather than manually inspecting 20+ pages on a mobile device, we can run E2E assertions for horizontal overflow on a mobile viewport layout.

### Implementation Pattern:
In Playwright, we navigate to each page under a simulated mobile device size and check that the element scrollable width fits inside the viewport:
```javascript
import { test, expect, devices } from '@playwright/test';

const PAGES = ['/', '/experiments/theremin', ...];

test.use(devices['iPhone X']); // 375x812 viewport

for (const path of PAGES) {
  test(`page ${path} does not have horizontal overflow on mobile viewport`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');

    const dimensions = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      };
    });

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);
  });
}
```

## 2. Touch Drag Scroll Prevention (`touch-action: none`)
On touchscreens, dragging a finger to interact with a canvas or tracking area (e.g. steering a caterpillar, playing a theremin, directing a light) triggers the browser's default scroll/pan behaviors, making interactions janky.

### How to avoid:
- **`touch-action: none`**: Apply this CSS rule to the interactive zone or container element. This tells the browser to skip default scroll/pan actions for touch events inside that container, allowing JavaScript to handle touch drags cleanly.
- **Tailwind class**: Use the `touch-none` utility class.
- **Logical Ledger wrap**: For multi-column CSS grids (`grid-template-columns: auto auto 1fr auto`), switch to a 2-column or wrapping stack on screens under `600px` to prevent text layout squishing and horizontal scroll triggers.
