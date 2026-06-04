# 2026-06-04 Lichen Ledger

## Concept

Based on the Intergovernmental Platform on Biodiversity (IPBES) 2026 report warning that corporate entities risk extinction unless they protect the environment, this experiment is an interactive corporate asset spreadsheet slowly digested by an organic, bioluminescent lichen. The user starts with a sterile dark-mode ledger of corporate asset rows (Global Carbon Futures, Monoculture Agri-Corp, etc.). Dragging the cursor/pointer sweeps across the ledger, painting organic mycelial threads onto a canvas overlay, while mutating the underlying rows. Corporate names scramble into botanical lichen species, yield rates turn into counting spore values, and status flags convert to "SYMBIOTIC", all accompanied by squelchy, wet generative Audio synthesis.

## Test Plan

- **Static / Verification**:
  - Verify page loads at `/experiments/lichen-ledger`.
  - Verify ledger wrapper, canvas, and onboarding overlay are in the DOM.
- **Unit / Structure Tests**:
  - Check the page includes `id="lichen-canvas"`, `id="ledger-table"`, `id="symbiosis-pct"`, and `id="spore-count"`.
  - Check that the page includes `id="onboarding-overlay"`, `id="init-button"`, and `id="spore-bomb-btn"`.
  - Check that the page contains Web Audio oscillator/synthesis references.
- **E2E Integration**:
  - Clicking "Initialize Spore Sweep" closes the onboarding overlay.
  - Clicking a row's inoculation button composts that row, updating its style and text, and incrementing symbiosis percentages.
  - Clicking the "Spore Bomb" button inoculates all rows at once, taking symbiosis to 100.0%.
  - Pressing arrow keys selects and Enter/Space inoculates row buttons.
  - Narrow viewports display without horizontal layout overflow.

## What Shipped

- An onboarding splash overlay describing the corporate environmental crisis and rewilding instructions.
- A dark, glowing ledger grid mimicking an Excel-like financial portal.
- An organic canvas animation loop rendering moss-green/golden-yellow radial gradients that branch and grow outward based on cursor dragging.
- Dynamic Scramble Text animation that deconstructs standard characters into ancient glyphs before resolving into Latin botanical taxonomies (e.g. *Lobaria pulmonaria*).
- An interactive spore generator that runs a local intervals loop per row, incrementing spore output rates after rewilding is achieved.
- A Web Audio synthesizer generating wet, bubbling, crackling cellular noises by sweeping triangle/sine wave oscillators down in pitch and amplitude over milliseconds.
- Complete keyboard accessibility: ArrowDown/ArrowUp moves focus through row buttons, Enter/Space triggers inoculation.
- Responsive design collapsing the multi-column desktop grid into a 2-column flex block on small mobile viewports.

## Feedback To Carry Forward

- **Accessible Color Contrasts**: Use high-contrast color combinations (like neon yellow-green `#adff2f` on `#030804` dark green-black background) as a baseline from day one.
- **`touch-action: none`**: Always add this to dragging zones to disable default scroll gestures on mobile touchscreens, ensuring drag simulation feels native.
- **Dynamic DOM Inspection**: Using `document.elementFromPoint(x, y)` provides a robust way to bridge pixel coordinates from mouse/canvas dragging to structural DOM node queries.

## Skills Or Patterns Learned

- Implementing character-by-character scrambling morph effects via `setInterval` arrays.
- Leveraging `document.elementFromPoint` for high-frequency collision checking between freeform painting strokes and coordinate-based DOM table structures.
- Synthesizing wet cellular textures (squelches, crackles) using sub-100ms oscillator sweeps.

## Next Sparks

- A weather balloon atmospheric calibration workbench that measures pressure/altitude and plays shifting wind chimes.
- A geothermal drilling sensor map where users adjust cooling values to avoid seismic ruptures.
