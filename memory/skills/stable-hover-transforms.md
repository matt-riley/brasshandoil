# Stable Hover Transforms For Absolute Controls

When an interactive element is positioned with `transform` (for example
`translate(-50%, -50%) rotate(...)`), hover and selected states must preserve
that full transform or move the animated effect to a child element.

## Why It Matters

Playwright and real pointers hover before clicking. If `:hover` replaces the
base transform with a small effect like `translateY(-1px)`, the clickable region
can jump away between pointerdown and click. The symptom is an apparently
visible, enabled control that does not receive the intended click.

## Reuse

- Put visual lift on a child or pseudo-element when the parent owns positioning.
- If the parent must animate, repeat the complete positioning transform in every
  state.
- Add an E2E check that a normal click, not a forced click, changes the semantic
  state (`aria-pressed`, `data-*`, or a live counter).
