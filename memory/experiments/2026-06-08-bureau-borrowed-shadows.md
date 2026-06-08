# 2026-06-08 Bureau of Borrowed Shadows

## Concept

An after-hours projection desk where fixed desk objects lend their shadows to a
paper ledger. The lamp leaves an ink trace, selected objects make the ledger
unbalanced, and stamping certifies the loan.

## Test Plan

- Wrote the source contract first for page existence, stage elements, stable
  `.bs-object` / `.bs-shadow` hooks, semantic readouts, keyboard/pointer/touch
  logic, and the experiments index entry.
- Wrote the browser spec before implementation for boot state, pointer lamp
  movement, click borrowing, keyboard borrowing, stamping, recall, and 375px
  mobile overflow.

## What Shipped

- Added `/experiments/bureau-borrowed-shadows` with a CSS/SVG-like DOM stage,
  six fixed object controls, six transform-only shadow projections, animated lamp
  interpolation, and semantic ledger readouts.
- Added the experiment card to the index without disturbing existing 2026-06-08
  uncommitted entries.
- Captured a desktop smoke screenshot at
  `tmp/bureau-borrowed-shadows-smoke.png`.

## Feedback To Carry Forward

- Awaiting review.
- Visual smoke checks are still necessary after green E2E tests; the first pass
  exposed desktop console text painting under the stage.

## Skills Or Patterns Learned

- Compare element geometry relative to the stage after `locator.hover()` because
  hover can scroll the page and change absolute viewport coordinates.
- For plain DOM-heavy Astro experiment scripts, `script is:inline` avoids strict
  TS DOM-narrowing noise when no build-time processing is needed.

## Next Sparks

- A customs office where gradients are inspected as contraband.
- A rain gauge that accepts only rumors and overflows when corrected.
