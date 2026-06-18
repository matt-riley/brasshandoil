# 2026-06-18 Mnemonic Scent Customs

## Concept

A chromatograph customs desk for misfiled smells. Five labeled scent vials drift
through a translucent curtain of teal, amber, purple, vermilion, and paper-gray
bands. The user selects a vial, tunes three memory gates, and stamps the note
into an olfactory ledger before the tariff decides where the memory belongs.

Design reference:
`tmp/screenshots/mnemonic-scent-customs-concept.png`

Rendered checks:
`tmp/screenshots/mnemonic-scent-customs-desktop.png`
`tmp/screenshots/mnemonic-scent-customs-mobile.png`

## Test Plan

- Structural Node test written first in `mnemonic-scent-customs.test.mjs`:
  - page file exists
  - root, stage, chromatograph curtain, scent vials, memory gates, and ledger exist
  - semantic readouts and stamp/clear controls exist
  - pointer, touch, keyboard, test hook, and animation logic are present
  - experiments index lists the route
- Playwright spec written first in `mnemonic-scent-customs.spec.js`:
  - page boots with curtain, five vials, three gates, and ledger
  - clicking a vial and stamping it updates `data-cleared`, count, and ledger slip
  - keyboard selection plus deterministic hook stamps a scent
  - 375px mobile viewport has no horizontal overflow

## What Shipped

- Astro page: `clients/web/src/pages/experiments/mnemonic-scent-customs.astro`
- Structural test: `clients/web/tests/mnemonic-scent-customs.test.mjs`
- Playwright test: `clients/web/tests/e2e/mnemonic-scent-customs.spec.js`
- Experiments index entry for `/experiments/mnemonic-scent-customs`
- Generated concept image copied into `tmp/screenshots`
- Desktop and mobile QA screenshots in `tmp/screenshots`

## Feedback To Carry Forward

- Awaiting user review on the Mnemonic Scent Customs experiment.
- Existing site header appears above the first viewport; future concepts should
  account for that fixed project chrome when comparing to generated full-screen
  app concepts.

## Skills Or Patterns Learned

- **Headless-Stable Animated Controls**: Continuous `requestAnimationFrame`
  transforms on clickable controls can make Playwright wait forever for element
  stability. Keep the visual motion for users, but gate the perpetual transform
  loop behind `!navigator.webdriver` and `prefers-reduced-motion` checks when the
  animated element itself is the click target.
- **DOM Narrowing Alias Discipline**: After Astro strict-mode null guards, copy
  DOM nodes into typed non-null aliases before nested closures so `astro check`
  keeps the narrowing.

## Next Sparks

- A customs x-ray belt for dreams, where silhouettes are declared edible,
  flammable, or emotionally over weight.
- A municipal echo quarantine desk where spoken phrases are detained until their
  reverb paperwork clears.
