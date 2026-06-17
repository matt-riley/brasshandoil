# 2026-06-17 Infrasonic Teacup Seismograph

## Concept

A porcelain breakfast observatory where a spoon probe stirs microscopic tremors
through fixed teacups. Each cup acts as a witness with its own code and omen;
the visitor tunes cups, stamps seismogram slips, and watches a canvas draw
infrasonic traces across the table.

## Test Plan

- Source contract first in `clients/web/tests/infrasonic-teacup-seismograph.test.mjs`.
- Confirm the page does not exist and the index does not contain the slug before implementation.
- E2E contract in `clients/web/tests/e2e/infrasonic-teacup-seismograph.spec.js` for boot state, canvas pixels, pointer stirring, keyboard controls, stamping, and mobile overflow.
- Visual screenshot pass at desktop and mobile sizes against the local dev server.

## What Shipped

- Astro page: `clients/web/src/pages/experiments/infrasonic-teacup-seismograph.astro`.
- Experiment index entry for `infrasonic-teacup-seismograph`.
- Source and Playwright tests covering semantic structure, canvas rendering, multimodal interaction, deterministic keyboard controls, stamped state, and narrow-screen overflow.
- Responsive two-panel layout with a fixed porcelain cup array and normalized spoon coordinates.

## Feedback To Carry Forward

- Awaiting user review of the Infrasonic Teacup Seismograph page.
- Visual inspection caught a desktop heading/intro clipping issue that tests did not catch; keep screenshot review in the loop for wide compositions.

## Skills Or Patterns Learned

- **Wide Desktop Title Fit Checks**: Long serif experiment titles can pass mobile overflow tests while clipping against adjacent first-viewport stages on desktop. Capture a desktop screenshot and verify the longest unbreakable word fits the allocated grid column.
- **CSS Trig Cup Arrays**: CSS `sin()`/`cos()` can position circular control arrays cleanly while keeping buttons real, focusable elements for Playwright and keyboard control.

## Next Sparks

- A cracked sugar-bowl accelerometer that translates breakfast impacts into legal depositions.
- A cabinet-resonance tuner where drawers become low-frequency filters for household tremors.
