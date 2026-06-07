# Pointer-Transparent Visual Overlays

Use this when an animated decorative object sits above real controls.

## Signal

- Playwright reports that a visual layer intercepts pointer events.
- A lens, cursor, glow, label, or ornament follows the pointer across buttons.
- The visible affordance should be inspectable but the underlying controls must
  remain the primary hit targets.

## Practice

1. Keep the semantic controls stable and clickable.
2. Put pointer-following spectacle in a separate layer.
3. Set `pointer-events: none` on the spectacle unless it genuinely owns the
   interaction.
4. Preserve keyboard access through the underlying controls, not through a visual
   overlay that only exists for atmosphere.
5. Add an E2E assertion that the control bounds stay fixed after the animated
   layer moves.

## Checks

- Can Playwright click a covered control without `force: true`?
- Does keyboard input reach the same state as pointer input?
- Does the overlay still communicate the effect visually when it cannot receive
  pointer events?
