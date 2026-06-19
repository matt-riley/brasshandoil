# Header-Aware Instrument Framing

Generated concepts often assume the experiment owns the entire viewport, but
this site keeps a shared header above every page. Account for that during design
translation so the first viewport still feels like a playable instrument.

## When To Use

- A concept screenshot shows a full-screen app, dashboard, or instrument.
- The implementation lives under the shared Astro `Base` layout.
- The first viewport risks becoming only title and setup instead of the actual
  experiment.

## Pattern

- Keep the title expressive, but cap its width and line-height so controls land
  beside or immediately below it.
- Put the primary input/action in the heading row on desktop and immediately
  under the title on mobile.
- Make the active stage and control panel visible before secondary explanatory
  material.
- Treat ledger/history areas as useful but lower-priority if vertical space is
  tight.

## Test Guidance

- Add a mobile no-horizontal-overflow Playwright check at 375px.
- Capture desktop and mobile screenshots after implementation; compare against
  the concept for anatomy rather than exact top offset when the shared header is
  present.
- Prefer real controls with stable dimensions over animated targets near the
  top of the viewport.
