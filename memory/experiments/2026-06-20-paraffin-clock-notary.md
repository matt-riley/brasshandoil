# 2026-06-20 Paraffin Clock Notary

## Concept

A candle-clock notary desk where four wax columns hold pending seconds. The
user tunes wick, draft, and seal pressure, notarizes the active second into a
wax ledger, and can cool the ledger back to an empty minute with Escape.

Design reference:
`tmp/screenshots/paraffin-clock-notary-concept.png`

Rendered checks:
`tmp/screenshots/paraffin-clock-notary-desktop.png`
`tmp/screenshots/paraffin-clock-notary-mobile.png`

## Test Plan

- Structural Node test written first in `paraffin-clock-notary.test.mjs`:
  - page file exists
  - root, candle stage, wax columns, active second, controls, readouts, and
    ledger exist
  - pointer, keyboard, animation, notarization, and deterministic hooks exist
  - experiments index lists the route
- Playwright spec written before the final reset behavior:
  - page boots with four candles, controls, and empty ledger
  - clicking a selected candle and notarizing updates count, root state, and
    ledger
  - keyboard selection and deterministic hooks work
  - Escape cools the ledger and clears wax seals
  - 375px mobile viewport has no horizontal overflow

## What Shipped

- Astro page: `clients/web/src/pages/experiments/paraffin-clock-notary.astro`
- Structural test: `clients/web/tests/paraffin-clock-notary.test.mjs`
- Playwright test: `clients/web/tests/e2e/paraffin-clock-notary.spec.js`
- Experiments index entry for `/experiments/paraffin-clock-notary`
- Generated concept image copied into `tmp/screenshots`
- Desktop and mobile QA screenshots in `tmp/screenshots`

## Feedback To Carry Forward

- Awaiting user review on the Paraffin Clock Notary experiment.
- The concept again assumed a full viewport; implementation had to compress the
  title and place the live readout beside it so the instrument remained visible
  under the shared header.
- A keyboard reset made the ledger workflow easier to retest and made the
  interaction feel more complete without adding another visible control.

## Skills Or Patterns Learned

- **Ledger Cooling Reset Hooks**: Ledger-style experiments benefit from a
  keyboard-only reset plus a deterministic hook so E2E can prove both creation
  and clearing without depending on page reloads.

## Next Sparks

- A postal wax refinery where seals are melted back into new stamps.
- A courtroom hourglass where each grain files a sworn correction.
