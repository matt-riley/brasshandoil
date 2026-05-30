# 2026-05-31 Moth Oracle

## Concept

A lantern-lit consultation chamber where a swarm of glowing moths circles your pointer and dispenses poetic advice on command.

## Test Plan

- Confirm the experiment page exists.
- Confirm the page includes a dedicated oracle stage.
- Confirm the page includes a button for triggering a prophecy.
- Confirm the page reacts to pointer movement.
- Confirm the swarm animates with `requestAnimationFrame`.
- Confirm moth elements are generated dynamically.

## What Shipped

- A new interactive experiment at `/experiments/moth-oracle`.
- A swarm scene with a moving light anchor, atmospheric gradients, and an advice button.
- An experiments index entry for discovery.
- Structural TDD coverage in `clients/web/tests/moth-oracle.test.mjs`.

## Feedback To Carry Forward

- Awaiting first review.

## Skills Or Patterns Learned

- Self-contained spectacle pages work well for the one-hour cadence when the effect is driven by one clear interactive loop.
- Source-level tests are enough to guard the presence of creative scaffolding before moving to richer visual QA.

## Next Sparks

- Let the oracle phrases evolve based on prior feedback notes.
- Explore when a future experiment should combine motion, sound, and text instead of choosing only one dominant medium.
