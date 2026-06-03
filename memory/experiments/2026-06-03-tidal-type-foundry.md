# 2026-06-03 Tidal Type Foundry

## Concept

A moonlit print shop where a tide gauge casts letters into a blackwater tray.
The visitor pulls a moon dial or drags across the stage to make fresh type drift,
cool, and accumulate in a proof rack.

Seed: rotating away from the recent bureau, sports, simulator, and central-specimen
loops toward a compositional type-and-water instrument.

## Test Plan

- Write the source-level contract before the page exists.
- Require a bounded canvas tide engine, semantic controls, live readouts, and
  pointer casting.
- Verify that casting changes both glyph count and the tide report.
- Verify canvas pixels, drag casting, and 390px-wide layout in Playwright.

## What Shipped

- A full-bleed Astro experiment at `/experiments/tidal-type-foundry`.
- A canvas-rendered moving tide with capped floating glyphs.
- A moon range control, press button, live proof count, report text, and recent
  glyph rack.
- An experiments index entry for the new Codex page.

## Feedback To Carry Forward

- Awaiting review.
- Semantic feedback must change on every primary action, not only the artwork.
- The shared site header can be the first `h1`; browser sanity checks should scope
  page-local headings.

## Skills Or Patterns Learned

- Use the node test to assert visible state surfaces, but avoid overfitting it to
  internal variable names.
- In Astro inline scripts, define explicit state object types for animation arrays
  before running `astro check`.
- If a browser-evaluation wrapper blocks direct canvas probing, rely on Playwright
  pixel tests and use the app browser for DOM/layout sanity.

## Next Sparks

- A newspaper compositor where columns physically argue over line breaks.
- A weather vane for fonts where wind direction changes kerning and gravity.
