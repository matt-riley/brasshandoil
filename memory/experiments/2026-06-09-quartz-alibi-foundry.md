# 2026-06-09 Quartz Alibi Foundry

## Concept

A mineral testimony bench where a roaming lens heats quartz witnesses into
contradictory alibis. Shard controls record testimony, a forge action makes the
verdict temporarily coherent, and cooling resets the kiln.

## Test Plan

- Wrote the source contract first for page existence, fixed `.qa-shard` controls,
  `.qa-echo` visual layers, semantic readouts, pointer/touch/keyboard logic,
  normalized lens coordinates, and the experiments index entry.
- Wrote the browser spec before implementation for boot state, pointer lens
  movement without target drift, shard testimony updates, keyboard operation,
  forge/cool determinism, and 375px mobile overflow.

## What Shipped

- Added `/experiments/quartz-alibi-foundry` with an SVG mineral field, seven
  fixed shard buttons, seven resonance echoes, an interpolated roaming lens,
  semantic verdict readouts, and deterministic controls.
- Registered the experiment at the top of the experiments index while preserving
  existing uncommitted 2026-06-09 entries.

## Feedback To Carry Forward

- Awaiting review.
- Browser-source contracts that assert exact class hooks work best when
  positioning variants live in `data-*` attributes instead of extra classes.
- The in-app browser refused the localhost smoke route under URL policy, so
  focused Playwright plus `pnpm build` remained the verification surface.

## Skills Or Patterns Learned

- Use exact shared class hooks for tests and data attributes for per-item layout
  variants when source tests depend on literal hook strings.
- Keep decorative SVG fields, beams, lenses, and echo layers pointer-transparent
  so the actual controls remain stable and easy to test.

## Next Sparks

- A customs office where gradients are inspected as contraband.
- A courthouse where CSS counters are called as unreliable witnesses.
