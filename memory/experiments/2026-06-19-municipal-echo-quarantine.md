# 2026-06-19 Municipal Echo Quarantine

## Concept

A civic audio laboratory where typed phrases are detained as paper echo slips in
three municipal quarantine bays. The user tunes reverb, dampening, and release
pressure, then clears the active phrase into a released ledger once the
resonance meter looks stable.

Design reference:
`tmp/screenshots/municipal-echo-quarantine-concept.png`

Rendered checks:
`tmp/screenshots/municipal-echo-quarantine-desktop.png`
`tmp/screenshots/municipal-echo-quarantine-mobile.png`

## Test Plan

- Structural Node test written first in `municipal-echo-quarantine.test.mjs`:
  - page file exists
  - root, phrase input, detain action, bays, resonance meter, ledger, and echo
    slips exist
  - reverb, dampening, release pressure, active phrase, detained count, cleared
    count, and resonance score readouts exist
  - submit, keyboard, pointer tuning, animation, and deterministic hooks are
    present
  - experiments index lists the route
- Playwright spec written first in `municipal-echo-quarantine.spec.js`:
  - page boots with three bays, three slips, meter, controls, and ledger
  - detaining and releasing a phrase updates counts, root state, and ledger
  - Enter-key phrase detention plus deterministic release hook works
  - 375px mobile viewport has no horizontal overflow

## What Shipped

- Astro page: `clients/web/src/pages/experiments/municipal-echo-quarantine.astro`
- Structural test: `clients/web/tests/municipal-echo-quarantine.test.mjs`
- Playwright test: `clients/web/tests/e2e/municipal-echo-quarantine.spec.js`
- Experiments index entry for `/experiments/municipal-echo-quarantine`
- Generated concept image copied into `tmp/screenshots`
- Desktop and mobile QA screenshots in `tmp/screenshots`

## Feedback To Carry Forward

- Awaiting user review on the Municipal Echo Quarantine experiment.
- Generated full-screen concepts need an explicit allowance for the persistent
  site header; otherwise title and instrument density must be tightened in the
  implementation viewport.

## Skills Or Patterns Learned

- **Header-Aware Instrument Framing**: When the shared site header is always
  present, make the first viewport an instrument-first composition with compact
  title, input, active stage, and side controls instead of copying a full-screen
  mockup verbatim.
- **Stable Paper-Slip Workflows**: Paper slips make good whimsical controls
  because they can be real buttons with durable `aria-pressed`, `data-phrase`,
  count, and ledger state while still carrying strong visual texture.

## Next Sparks

- A municipal echo appeals court where released echoes come back with redacted
  transcripts.
- A basement resonance inspector where leaking pipes are cross-examined by
  tuning forks.
