# 2026-06-07 Glasshouse Parliament

## Concept

A greenhouse chamber where fixed glass panes vote under a roaming sun lens.
Condensation, heat, and the verdict change as the canopy is argued into or out
of breathing.

Nearest gallery neighbors: `lichen-ledger` for plant systems, `pressure-choir`
for tactile readouts, and `static-orchard-switchboard` for light/probe tuning.
This one rotates away from central instruments and sorting loops by using a
full greenhouse roof as the interface, with stable pane votes and decorative
atmosphere layers.

## Test Plan

- Wrote the Node contract first for page existence, index registration, stable
  voting panes, semantic readouts, pointer/keyboard logic, and copy boundaries.
- Wrote the Playwright spec before implementation for boot state, pointer light,
  stable pane bounds, click voting, keyboard voting, mist, adjournment, and
  375px overflow.
- Confirmed the first Node run failed red because the page and index entry did
  not exist yet.

## What Shipped

- Added `/experiments/glasshouse-parliament`.
- Added an animated greenhouse roof with eight pane buttons, a roaming sun lens,
  condensation drips, heat/dew/motion readouts, mist, and adjourn controls.
- Registered the experiment on the experiments index.

## Feedback To Carry Forward

- Awaiting review.
- The in-app browser refused the local dev URL under its URL policy, so visual
  smoke was limited to Playwright browser assertions rather than an emitted
  screenshot.

## Skills Or Patterns Learned

- Decorative overlays that follow the pointer should usually be
  `pointer-events: none` when stable controls sit underneath.
- Keep animated atmosphere separate from click targets, then assert both stable
  target bounds and semantic readouts in E2E.
- Inline Astro scripts in this project are type-checked by `astro check`; annotate
  helper parameters up front to avoid build-only red after focused tests pass.

## Next Sparks

- A page that treats CSS grid auto-placement as a weird civic seating chart.
- A print-like experiment where a native details/summary stack physically folds
  the page into new testimony.
