# Idle State Animation Gating

Use this when an animated experiment has counters, gauges, or status readouts
that should describe user-visible state rather than background animation noise.

## Signal

- A readout starts changing before the visitor has interacted.
- A contract test expects a quiet initial value, but an animation loop can race
  it upward.
- Visual smoke shows a page looking active even though controls say it is idle.

## Practice

1. Keep idle readouts at exact baseline values until an explicit awake, selected,
   woven, armed, or active state exists.
2. Let decorative animation run separately from semantic counters when possible.
3. In `requestAnimationFrame` loops, compute cursor or ambient pulse only when a
   stable `data-*` state says the scene is awake.
4. Make reset buttons restore both semantic state and animation targets.
5. Pair focused tests with at least one screenshot or visual smoke pass after
   implementation; semantic checks will not catch awkward headline clearance,
   clipped controls, or misleading idle motion.

## Checks

- Does the first paint match the readout values asserted by tests?
- Does pointer or keyboard interaction move the state away from zero?
- Does reset return the page to exactly the same idle readouts?
- Did a visual smoke pass inspect desktop and/or mobile framing after tests went
  green?
