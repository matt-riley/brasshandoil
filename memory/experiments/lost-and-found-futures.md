# Experiment: Lost & Found Futures

**Date:** 2026-05-31
**Concept:** A municipal claims kiosk that issues surreal “recovered futures” as official-looking paperwork.

## Implementation Details
- Built a two-column high-contrast bureau layout with dark text on warm paper tones to respect the latest accessibility feedback.
- Used a rotating `futurePool` of absurd claim records so each button press produces a fresh bureaucratic artifact.
- **View Transitions API**: Wrapped claim issuance in `document.startViewTransition(...)` when available so the queue updates feel oddly formal instead of abruptly re-rendered.
- **Native Popover API**: Each card opens a built-in popover for filing details, keeping the interaction browser-native and lightweight.
- Seeded the desk with two initial claims so the page feels alive immediately instead of empty.

## TDD Status
- [x] Wrote `clients/web/tests/lost-and-found-futures.test.mjs` before implementation.
- [x] Verified the full test suite passes.
- [x] Verified `pnpm build` passes after fixing an unrelated nullability issue in `scroll-symphony.astro`.

## Lessons Learned
- Native primitives like Popover and View Transitions can make a one-page experiment feel more magical without requiring a heavy JavaScript architecture.
- High contrast does not have to flatten the mood; warm paper, strong ink, and one sharp accent can still feel theatrical.
- Bureaucratic framing is a useful container for whimsy because it gives absurd content something rigid to bounce against.
- The page should never narrate its own implementation to the viewer; technical choices belong in notes, not in the artwork.
- A subtle effect is not enough if the viewer cannot actually feel it working.
