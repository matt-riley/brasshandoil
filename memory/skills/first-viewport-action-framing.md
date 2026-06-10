# First-Viewport Action Framing

When an experiment has primary actions, verify they are comfortably inside the
initial desktop viewport as well as merely "visible" to Playwright.

## Pattern

- Capture a 1280x720 screenshot from the dev server after the first green E2E run.
- Check that primary buttons, active meters, and any bottom-right status widgets
  are fully framed, not clipped by the browser edge.
- If the page has a fixed site header, budget vertical space against the real
  remaining viewport, not `100vh` alone.
- Prefer tightening local scale, gap, and stage height before adding scroll-only
  access to primary controls.

## Why It Helped

`Glacier Stone Concierge` passed automated visibility checks while the action
row was still clipped in a desktop screenshot. A quick scale pass made the page
feel intentional without changing the interaction contract.
