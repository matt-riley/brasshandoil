# Stable DOM Targets In Animated Scenes

Use this when an experiment is built from animated DOM objects that users need to
click, focus, drag, or sort.

## Signal

- Playwright clicks time out because an element is "not stable".
- The visual concept wants motion, but the primary interaction target is also moving.
- Mobile/touch users need to hit small objects reliably.

## Practice

1. Keep the clickable element's bounding box stable whenever possible.
2. Put motion on the surrounding field, background gradients, pseudo-elements,
   shadows, filters, or non-interactive children.
3. If an object must relocate after a user action, do it after the click has been
   accepted and assert a semantic state change rather than clicking it again.
4. Pair animated visual feedback with stable `data-*`, class, or text states so E2E
   tests do not depend on frame-perfect screenshots.
5. Re-run the focused Playwright spec after changing animation primitives; bounding
   box stability regressions show up quickly.

## Checks

- Can Playwright click the target without `force: true`?
- Does keyboard interaction reach the same state as pointer interaction?
- Does the mobile overflow test still pass after the object changes state?
