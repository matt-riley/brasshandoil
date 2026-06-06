# 2026-06-06 Québec City Biosphere Symbiosis

## Concept

An interactive dual-pane simulation commemorating UNESCO's June 2026 designation of Québec City as a biosphere reserve. 

- **Left Pane ("THE GRID")**: A minimalist, architectural vector CAD layout (dark cyan blueprint) representing urban infrastructure. The user drafts power lines, sub-stations, paved zones, and transit routes.
- **Right Pane ("THE BIOME")**: A lush, dark-green cellular canvas simulating organic mycelial growth. Spores grow towards target nodes (Spores) but are repelled by power lines, blocked by paved zones, attracted by transit paths, and electrified by substations.
- **Sound**: High-frequency grid humming for urban placement, and low-frequency resonant wooden chimes for symbiotic fungal blooms.
- **TDD Hook**: The page exposes explicit status readouts (`#symbiosis-index`, `#active-grid-lines`, `#spore-blooms`) updated dynamically so tests can verify interaction state.

## Comparison with Nearest Neighbors

- **Nearest Neighbors**:
  - `abyssal-nodule-patchbay` (patching cables in a single UI panel to siphon energy).
  - `lichen-ledger` (painting lichen spores directly onto a spreadsheet grid).
- **Why this is structurally different**:
  - Instead of a single screen overlay, it introduces a **dual-pane coordinate-mapped bridge**. The user's vector drawings on the left directly project forcefields (repulsion, attraction, blockage) onto a separate canvas growth simulation on the right.
  - The goal is a delicate equilibrium: satisfying urban grid targets without clipping the natural flow of the fungal network.

## Test Plan

- **Bootstrap & Onboarding**: Verify page loads, displays title, shows overlay, clicking "Initialize Coexistence" unlocks AudioContext and hides overlay.
- **Grid Drawing**: Verify mouse/touch interaction on the CAD board creates lines/nodes, updating `#active-grid-lines`.
- **Keyboard Navigation**: WASD/Arrows move a grid cursor, number keys place items, verifying keyboard accessibility.
- **Simulation Feedback**: Verify that placing a roadblock blocks mycelial growth, and connecting two spores triggers a symbiotic bloom and increases `#spore-blooms` count.
- **Mobile Audit**: Verify no horizontal overflow on a 375px wide viewport.

## What Shipped

- **Interactive Dual Pane Blueprint & Biome**:
  - Left pane renders an interactive SVG coordinate planner representing the urban CAD grid.
  - Right pane runs a canvas-based directed random-walk simulation of growing mycelial spores.
  - Spores react in real-time to the placed grid entities (Power lines repel, transit corridors align, paved zones block, substations attract and branch).
- **Audio Synthesis**:
  - Substation and route placements trigger low-frequency sawtooth hums filtered through lowpass/bandpass filters.
  - Spore connections at target hubs trigger lush pentatonic chimes using combined sine/triangle oscillators.
- **Accessibility Fallbacks**:
  - Implemented keyboard navigation: arrow keys control a virtual crosshair, space/enter places routes, and numbers 1-4 switch active tools.
- **Responsive Layout**:
  - Uses CSS Grid to stack vertically on narrow viewports, preventing horizontal overflow, while preserving full scaling capability of both the SVG and canvas components.

## Feedback To Carry Forward

*(To be updated after user review)*

## Skills Or Patterns Learned

- **Coordinate-Mapped Dual Pane Framework**: Mapping pointer positions as normalized `[0, 1]` coordinates relative to boundingClientRect allows syncing SVG CAD overlays with a canvas-based coordinate simulation robustly.
- **Accessible Canvas/SVG Crosshairs**: Adding keydown listeners and SVG crosshair overlays enables fully accessible drawing interaction without complex mouse-drag dependencies.

## Next Sparks

- **Sub-harmonic mycelium networks**: Generating full base drone synths whose frequencies shift depending on real-time distances between spores.
- **Historical city blueprints**: Seeding simulations from actual architectural blueprints (e.g., historical maps of old towns) loaded as paths.
