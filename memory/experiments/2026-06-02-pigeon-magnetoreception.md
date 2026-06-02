# 2026-06-02 Pigeon Magnetoreception Simulator

## Concept

An avian navigation desk exploring the scientific discovery of iron-filled cells in pigeon livers acting as ferromagnetic compasses. The user navigates a blind pigeon home through an invisible, dynamic magnetic field. While moving, the user relies on their "LIVER SIGNAL" gauge, which pulses and glows green as they approach home, alongside a vague directional compass readout.

## Test Plan

- **Static / Verification**:
  - Verify page renders under `/experiments/pigeon-magnetoreception`.
  - Verify flight area, canvas, HUD signal bar, and onboarding cards are present.
- **E2E Integration**:
  - Verify click-to-fly successfully changes status text and initiates flight mode.
  - Verify manual mousemove triggers coordinate updates and trail logging.
  - Verify teleportation test hook (`window.__pigeonArriveHome`) successfully completes the flight and renders the academic publication arrival popup.

## What Shipped

- A midnight-themed grid field utilizing an animated, undulating canvas to represent force fields.
- An onboarding directive card centered in the flight area showing clear game layout, targets, and control options.
- An accessible, responsive multi-input steering system:
  - **Pointer Lock**: Classic desktop flight using relative raw mouse movement.
  - **Drag-to-Steer**: Tap and drag or click and drag towards a coordinate on mobile/trackpads.
  - **Keyboard**: Full Arrow key and WASD navigation support.
- A high-contrast vintage paper certificate popup on arrival with flight statistics and abstract details.

## Feedback To Carry Forward

- **Onboarding is Key**: Do not leave interactions abstract; provide a dedicated instruction screen on load to explain goals and controls.
- **Multi-Input Fallbacks**: Never assume pointer lock is accessible or functional. Always support touch dragging, key event listeners, and drag fallbacks to prevent user blockages.

## Skills Or Patterns Learned

- Implementing touch gesture dragging and coordinate interpolation to allow smooth canvas movement without scroll collisions (`touch-action: none`).
- Mapping multiple input structures (Pointer Lock delta-based changes vs drag target-based steering vs keyboard ticks) onto a single animation physics loop.

## Next Sparks

- An organic wind currents simulator where birds must align their flight angles to aerodynamic vector visualizers.
- A sonar navigation lab where echoing pings synthesized via browser AudioContext are used to map dark cave walls.
