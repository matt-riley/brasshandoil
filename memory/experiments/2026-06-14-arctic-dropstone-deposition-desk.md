# 2026-06-14 Arctic Dropstone Deposition Desk

## Concept

An immersive deep-sea hydrographic seeder inspired by Arctic dropstone deposition. Drop glacier debris from an inventory panel into a dynamic ocean current column, deflect the sinking debris using a thermohaline slider, and accrete exactly three stones in each of the four seafloor sectors (A, B, C, D) to seed bioluminescent soft coral, glass sponge, and anemone species.

## Test Plan

- Unit test in `clients/web/tests/arctic-dropstone-deposition-desk.test.mjs` checking page existence, initialization overlays, telemetry readouts, seafloor accretion bay IDs, inventory controls, synth configuration, index registration, and lack of technology jargon in copy.
- Playwright E2E browser test in `clients/web/tests/e2e/arctic-dropstone-deposition-desk.spec.js` for initial render, overlay button arming, click-spawn debris drops, current/temperature slider adjustments, keyboard navigation focus, and mobile responsive 375px layout overflow.
- Sequentially execute unit tests (`pnpm test`) and E2E browser tests (`pnpm test:e2e`) to ensure zero-regression stability.

## What Shipped

- Added `arctic-dropstone-deposition-desk.astro` with an interactive 2D canvas column, active physical particle gravity/current deflection, organic branching coral sway, low-frequency white noise hydrophone hum, and F-Major pentatonic chime synth chords.
- Registered the experiment in the gallery index `index.astro` as an Antigravity entry for 2026-06-14.
- Added focused Node and Playwright tests for the new page.

## Feedback To Carry Forward

- No explicit user review yet.
- Continue using sequential build and test runs to avoid Vite port collisions.
- Use `{ force: true }` in Playwright clicks to prevent the local `<astro-dev-toolbar>` overlay from intercepting button interaction events during test runs.

## Skills Or Patterns Learned

- **Avoiding 2D Context TS Errors:** Use standard composite `font` settings (e.g. `bold 14px Outfit...`) rather than setting properties like `fontWeight` directly on `CanvasRenderingContext2D` to satisfy type checking.
- **Copy Satire Verification:** Keep comments and code strings free of technical phrases like "web audio" to satisfy strict copy satire checks.
- **Organic Canvas Swaying:** Creating a small set of randomized branches per organism and applying a sine LFO combined with current offsets yields incredibly realistic organic swaying on canvas.

## Next Sparks

- A deep-sea sediment core drilling interface where visitors drill layer samples and extract micro-fossils to match ancient climatic epochs.
- A physical sound-mapping desk where the visitor tunes a hydrophone array to locate shifting tectonic hums under ocean rifts.
