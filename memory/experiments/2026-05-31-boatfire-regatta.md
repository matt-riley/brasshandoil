# 2026-05-31 Boatfire Regatta

## Concept

A midnight canal where unfinished thoughts become paper boats. Pointer movement bends the
water, flame buoys light passing boats, and every launch changes the canal's odd little chorus.

Seeded by the BBC Sport story
["Boats, fire and an AI song - inside Arsenal's title win"](https://www.bbc.co.uk/sport/football/articles/c9v3jx1jmrwo).
The extracted constraints were **boat**, **fire**, and **song**; the artwork keeps the source
out of the interface.

## Test Plan

- Write a failing source-level test before the route exists.
- Assert the canvas stage, thought launcher, pointer steering, animation loop, luminous
  gradient drawing, spark generation, and visible readouts.
- Assert the experiments index exposes the new route.
- Add a Playwright flow that launches one thought and checks the counter and chorus change.

## What Shipped

- New experiment: `/experiments/boatfire-regatta`.
- Full-canvas night water with animated currents, stars, paper boats, flame buoys, and sparks.
- Pointer-driven water distortion and boat steering.
- A high-contrast launcher overlay with an immediate visible response.
- An experiments index entry and both structural and browser-level coverage.

## Feedback To Carry Forward

- The creative full-canvas direction landed well and successfully moved beyond the box-like
  Oil Telegraph presentation.
- Future experiments should become more satirical while preserving visual invention.
- A news seed should supply a point of view, not only attractive props.

## Skills Or Patterns Learned

- A canvas spectacle stays testable when it exposes a small DOM contract: one input, one
  action, and one live readout.
- Immediate text feedback can make a longer visual journey legible without flattening the
  artwork into an instructional dashboard.
- Validate DOM nodes into fresh aliases before helpers capture them; Astro's TypeScript
  checker otherwise reports possible-null errors inside closures.

## Next Sparks

- Add a tide that remembers prior launches in `localStorage`.
- Try one experiment where sparks become an actual generated chord after the visual language
  is proven.
