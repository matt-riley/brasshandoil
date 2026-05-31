# 2026-05-31 Chrono-Spatial Calibration

## Concept

A high-contrast temporal resonance desk for regulating quantum dimensional drift in parallel timelines. The desk represents an official control interface from the "Bureau of Chrono-Spatial Logistics" with a centered gravity singularity core and floating timeline anchors. As the user drags the mouse, they distort gravity, bending and warping the timeline anchors. Hovering over anchors reveals detailed telemetry inside a popover panel dynamically tethered next to the node using CSS Anchor Positioning, and triggers spatial FM synthesiser chimes.

## Test Plan

- **Unit Checks (TDD First)**:
  - Astro page exists.
  - Page has a centered singularity core element.
  - Page contains floating temporal anchors (`TL-902`, `TL-314`, `TL-042`, `TL-777`).
  - Native popover exists with interactive trigger targets.
  - Web Audio Context initializes and implements spatial panning.
  - Page avoids technical stack descriptions in user-facing UI.
- **End-to-End Checks**:
  - Verify that clicking the audio activation overlay starts the session.
  - Verify that hovering over a temporal anchor displays the tethered popover with its specific timeline name.
  - Verify that clicking "Stabilize Matrix" changes button state to "STABILIZING..." and calibrates drift values.

## What Shipped

- **Dynamic Anchor Positioning**: Leverages CSS Anchor Positioning to bind a single floating HUD popover panel to the active hovered anchor by setting the `--active-anchor` custom property dynamically in JS.
- **Anti-Jitter Physics**: Anchors the nodes to fractional percentages and updates their visual offsets solely using GPU-friendly `translate3d` transforms during a `requestAnimationFrame` loop, preventing flickering from hover coordinates collision.
- **Web Audio FM Chimes**: Implements a modular frequency modulation (FM) synthesizer chime that routes through a stereo panner, shifting the sound's spatial panning dynamically based on the anchor's horizontal coordinate in the viewport. Also adds a background low-drone synthesizer modulated by an LFO that sweeps frequencies matching the Gravity Intensity and Scan Frequency settings.

## Feedback To Carry Forward

- Accessibly high contrast text is standard. Neon nodes (`oklch(75% 0.2 190)`, `#ffffff`) on `#06050b` backgrounds meet legibility standards.
- Interactions must feel tangible and responsive; utilizing physical/gravitational equations (`F = G / r^2` and linear interpolation/lerping) provides fluid, organic feedback.

## Skills Or Patterns Learned

- **Dynamic Anchor Binding**: You can position a single popover element relative to multiple anchors by binding its `position-anchor` property to a CSS variable (e.g. `var(--active-anchor)`), then changing that variable in JavaScript on hover.
- **Resilient Fallbacks for Popovers**: By setting a default centering layout with `position: fixed` and `inset: 50%`, the popover remains fully functional and accessible in browsers that do not yet support native CSS Anchor Positioning.
- **Stereo Spatial panning in FM synth**: Directing synthesized FM frequencies (carrier modulated by modulator) to `StereoPannerNode` provides highly satisfying and immersive audio responses as nodes move relative to the viewport.

## Next Sparks

- Explore CSS Anchor Positioning in combination with container queries to adapt popover layouts based on the available space next to the anchor.
- Investigate SVG filter warp/displacement grids for rendering gravitational distortion visual wave effects.
