# Pointer Pressure Interfaces

## When To Use

- Use pointer pressure when an experiment should feel tactile, instrument-like,
  or materially responsive.
- Treat pressure as an enhancement. Mouse and touch visitors still need a
  fallback value that makes the interaction visibly work.

## Pattern

1. Store the visible pressed state in the DOM, such as `data-pressed`, so tests
   and assistive technology can observe the state change.
2. Normalize `event.pressure` with a fallback based on `event.buttons`, then
   clamp it to a useful range.
3. Reflect pressure into at least one semantic readout and one visual effect.
4. If pressure drives audio, create short-lived voices and release them quickly
   so repeated drags do not leak nodes.
5. In Astro scripts, annotate actor arrays, pointer ids, and audio contexts
   explicitly. The checker will otherwise infer broad `any` types in animation
   loops.

## Review Questions

- Does the first press change the screen within one frame?
- Does a standard mouse still produce a satisfying result?
- Can a test assert the state without inspecting canvas internals only?
- Does the interaction avoid naming browser mechanisms in the artwork copy?
