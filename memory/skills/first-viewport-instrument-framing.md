# First-Viewport Instrument Framing

## Pattern

For single-screen interactive experiments, the first viewport should show at
least a preview of the actual instrument or stage on both desktop and mobile.
Readouts and narrative copy are support surfaces; they should not consume the
entire mobile opening view.

## Practical Checks

- Capture `1280x720` and `375x812` screenshots after E2E tests pass.
- Look for long title words crossing into the stage, especially serif headings
  with text shadows.
- On mobile, keep readouts compact enough that the stage begins before the
  bottom of the first viewport.
- Use static dimensions, responsive grid tracks, and smaller mobile ledger
  heights so controls do not shift or push the canvas out of view.

## Reusable Fixes

- Increase the desktop sidebar track before shrinking the stage if the title
  is a key visual element.
- Reduce only the heading max size at desktop first; avoid viewport-width type
  scaling that makes intermediate widths worse.
- Preserve two-column readout/action grids on narrow screens when the labels
  are short enough to remain legible.
