# 2026-06-05 Abyssal Nodule Patchbay

## Concept

Based on the scientific discovery of "dark oxygen" production by polymetallic nodules on the abyssal seafloor (acting as natural galvanic batteries), this experiment is a modular electrological terminal monitoring deep-sea mineral nodules. 

The visitor plays the role of a Benthic Electrologist who must patch cables between six mineral nodule nodes (Node Alpha through Zeta) to harvest current for the surface grid. However, doing so drains the ambient bioluminescent ecosystem. 

As cables are connected:
- The surface battery voltage charges up.
- Benthic luminescence drops.
- Bioluminescent deep-sea creatures (glass sponges, jellyfish, isopods) dim and flicker.
- A low detuned electric drone intensifies.

The user can toggle **Benthic Symbiosis Mode** to reverse the flow, sending power back to the seafloor, restoring the bioluminescence, and launching rapid bubbles accompanied by watery, rising synth pops.

## Test Plan

- **Unit Tests (`clients/web/tests/abyssal-nodule-patchbay.test.mjs`)**:
  - Verify page exists and is not empty.
  - Check presence of initialization button (`id="init-patchbay"`).
  - Verify core metrics (`id="luminescence-pct"`, `id="surface-voltage"`) are in the DOM.
  - Verify presence of nodules and sockets (`class="patch-socket"`).
  - Verify overload button and symbiosis toggle.
  - Check Web Audio implementation.
  - Ensure no tech leaks (e.g. "Web Audio API") in user-facing copy.
  - Verify registration in experiments index.
- **E2E Integration (`clients/web/tests/e2e/abyssal-nodule-patchbay.spec.js`)**:
  - Page boots, completes onboarding by clicking button, and displays 100% initial luminescence and 0V initial charge.
  - Toggling symbiosis mode changes style and activates symbiosis states.
  - Clicking "Trigger Overload" resets connections and voltage back to initial state.
  - Tab navigation focuses sockets.
  - Layout does not overflow horizontally on a narrow `375px` mobile viewport.

## What Shipped

- **Abyssal Patchbay UI**: A high-contrast marine-navy dashboard with a grid layout representing the deep ocean floor.
- **Responsive SVG Backdrop**: Elegant vector bioluminescent outline art of deep-sea creatures and mineral nodules that scale seamlessly.
- **Dynamic Catenary Cables**: SVG-rendered sagging wires drawn between connected sockets using quadratic Bezier curves, complete with animated flow particles.
- **Bi-modal Operation**: 
  - *Extractive Mode*: Harvests voltage, drains luminescence, and produces detuned industrial hums.
  - *Symbiosis Mode*: Drains voltage, restores luminescence, and triggers watery pop chimes.
- **Tactile Sound Synthesis**: Sonar pings, electrical hums, and wet bubble pop effects generated entirely client-side using native oscillators and filters.
- **Dual Gesture Fallbacks**: Support for click-to-connect (first socket select, second socket connect) alongside mouse/touch drag-and-drop patching.
- **Mobile/Keyboard Accessibility**: Native keyboard focus cycle on sockets, space/enter triggers, and explicit `touch-action: none` wrapper configurations to support seamless mobile interactions.

## Feedback To Carry Forward

- **Tech Leak Comments**: Avoid placing technical names (like "Web Audio API") even in code comments, as global file checks may fail assertions checking for tech leaking to user-facing copy.
- **Custom CSS Toggles in E2E**: Custom toggles often hide the underlying input checkbox element. In E2E tests, direct interactions should target the visible companion `<label>` element rather than the hidden input to avoid visibility failures.

## Skills Or Patterns Learned

- **Coordinate Mapping**: Translation of relative DOM coordinates to SVG viewBox coordinate spaces using container bounding rectangle scale ratios.
- **Lightweight Cable Curves**: Utilizing SVG quadratic Bezier curves (`M x1 y1 Q midX (midY + sag) x2 y2`) to approximate catenary physics curves for interactive cables.
- **Watery Audio Pops**: Generating wet bubble sound textures by sweeping sine wave oscillators rapidly upward in pitch (e.g., from 400Hz to 950Hz) over a 60ms exponential amplitude decay.
