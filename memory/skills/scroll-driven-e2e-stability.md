# Skill: Scroll-Driven E2E Stability

**Origin:** Scroll Symphony flaky Playwright coverage

When an experiment derives UI state from page scroll, the test needs to use the same scroll metric as the production code. Mixing `document.body.scrollHeight` in the test with `document.documentElement.scrollHeight` in the page can create false negatives where the page never actually advances enough to update the UI.

## Durable pattern

- Scroll using `document.documentElement.scrollHeight - window.innerHeight` when the page logic reads from `document.documentElement`.
- After programmatic scrolls, dispatch a `scroll` event when the experiment is wired to a scroll listener and the assertion depends on that listener having run.
- Assert on meaningful state with polling instead of a brittle negative CSS check.

## Playwright example

```javascript
await page.evaluate(() => {
  const scrollTarget = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo(0, scrollTarget)
  window.dispatchEvent(new Event("scroll"))
})

await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
await expect
  .poll(async () => {
    return page.locator("#progress-bar").evaluate((element) => {
      return Number.parseFloat(getComputedStyle(element).width)
    })
  })
  .toBeGreaterThan(0)
```

## Smell to watch for

If an E2E passes in isolation but fails intermittently in the full suite, check for mismatched geometry sources and event timing before assuming the interactive page itself is broken.
