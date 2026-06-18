# Headless-Stable Animated Controls

Continuous motion on the same element that receives clicks can make Playwright
locator actions wait until timeout because the element never becomes stable.

## When To Use

- Absolute-positioned buttons, vials, tags, cards, or draggable-looking controls
  animated with `requestAnimationFrame`.
- Tests that use normal `locator.click()` and fail with "element is not stable".
- Interfaces where visual drift is atmospheric, not essential to the state
  transition under test.

## Pattern

- Keep semantic controls as real buttons or inputs.
- Put decorative motion on a child or pseudo-element when possible.
- If the clickable element itself must move, disable the perpetual transform loop
  in headless automation:

```ts
if (!navigator.webdriver && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  requestAnimationFrame(animate)
}
```

## Test Guidance

- Let E2E use a normal click, not `{ force: true }`, for the core interaction.
- Assert durable state after the click: `aria-pressed`, `data-*`, live counter,
  or ledger/list mutation.
- Keep a deterministic window hook for long or timing-heavy state transitions,
  but do not use it as a substitute for proving at least one real click path.
