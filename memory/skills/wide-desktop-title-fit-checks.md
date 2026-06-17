# Wide Desktop Title Fit Checks

Use this when a first-viewport experiment pairs oversized editorial type with a
large adjacent stage.

## Signal

- Mobile overflow tests pass, but desktop screenshots show the title, intro, or
readout column clipped by the stage.
- The heading contains a long unbreakable word that is wider than the grid
column at the chosen display size.
- The page uses `overflow: hidden` or `overflow: clip` on the first-viewport
shell.

## Practice

1. Keep automated mobile overflow checks, but add a desktop screenshot pass at a
   wide viewport such as `1440x950`.
2. Inspect the longest heading word against the actual grid column, not only the
   page scroll width.
3. Increase the console column or lower the heading max size before adjusting
   stage scale.
4. Prefer stable grid dimensions over letting the text intrude into the stage.

## Checks

- No title letters are hidden at the right edge of the console column.
- Intro copy wraps before the stage begins.
- Readout cards and action buttons remain fully visible at desktop and mobile
  sizes.
