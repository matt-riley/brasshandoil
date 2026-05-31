# 2026-05-31 Red Card Bloom

## Concept

A moonlit football pitch has grown a field of luminous hair. Pulling the central gold braid makes
the strands lean toward the decision and releases a bloom of red-card petals.

News seed:
- BBC Sport, [Three red cards for hair pulling in 2026 - is it time to change law?](https://www.bbc.co.uk/sport/football/articles/cgkp15ejk5lo)
- Extracted constraint: **hair** (object), **pitch** (place), **pull** (verb).

## Test Plan

- Added `clients/web/tests/red-card-bloom.test.mjs` before implementation.
- Verified the absent page and index entry failed first.
- Tested for an SVG stage, filter primitives, a semantic tug handle, pointer capture, keyboard
  activation, outside-handle release completion, strand animation, card-petal animation, and the
  experiments index card.
- Added an end-to-end interaction contract: tapping the braid increments the count and changes the
  visible weather reading. A deep 170px drag must enter red-card weather.

## What Shipped

- An SVG-first spectacle with generated flowing path strands and a hand-authored moonlit pitch.
- A drag-capable, keyboard-accessible gold knot with immediate visible status changes.
- Web Animations card petals at warning strength and above.
- A satirical visual response to a rules debate rather than a literal headline illustration.
- Window-level pointer release handling so a captured drag completes cleanly off the knot.

## Feedback To Carry Forward

- The concept and core idea landed; the result was interesting and fairly well executed.
- The dragging/pulling interaction felt constrained in scope and maximum distance.
- The scene needs a stronger combination of realism and absurdity.
- Mobile performance is poor; even on a top-of-the-range iPhone it feels very sluggish.
- Future primary gestures should have a larger expressive envelope and a more dramatic consequence.
- Ground surreal scenes in convincing physical detail, then exaggerate the payoff further.

## Skills Or Patterns Learned

- Promote the generated SVG strand-field pattern into `memory/skills/svg-strand-fields.md`.
- Keep semantic HTML readouts above SVG visuals so expressive scenes remain testable and accessible.

## Next Sparks

- Use SVG filters to make a museum diorama react to breath or microphone volume.
- Explore a Web Animations flower field where individual petals preserve pointer momentum.
