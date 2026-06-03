# 2026-06-03 Trionda Calibration Cradle

## Concept

A satirical simulation of the 2026 FIFA World Cup match ball technology (TRIONDA). In real tournaments, official match balls contain 500Hz sensors suspended in the center, which must be charged via induction cradles on the sideline. The user operates a calibration desk where they drag a physical USB-C charging tether into the match ball's port, spin the ball in 3D (updating gyroscopic telemetry lines on a live oscilloscope), and trigger VAR decision-making alerts (testing offsides, goals, and gyroscopic violations) using realistic referee whistle synthesis.

## Test Plan

- **Static / Verification**:
  - Verify page loads at `/experiments/trionda-calibration`.
  - Verify cradle system, draggable plug, and canvas oscilloscope are in the DOM.
- **Unit / Structure Tests**:
  - Check the page includes `id="btn-plug-in"`, `id="charge-level"`, and `chargeProgress`.
  - Check the page includes `id="var-decision"`, `VAR Decision`, and `decideVAR`.
  - Check the page includes `id="trajectory-canvas"`, `sensorData`, and `500Hz`.
- **E2E Integration**:
  - Dragging or plugging in the cable transitions status to "CHARGING" and starts battery accretion.
  - Clicking/spinning the ball triggers 500Hz gyroscopic waves on the canvas and triggers randomized VAR decisions.
  - Narrow viewports display without horizontal overflow.

## What Shipped

- A beautiful dark-theme laboratory dashboard with dynamic grid scanlines and neon cyan/lime styling.
- A interactive SVG cable path that computes a realistic hanging curve between a fixed base and the draggable USB-C plug.
- A 3D-feeling CSS ball sphere with a custom soccer texture that rotates dynamically in response to drag-and-spin gestures.
- A 3-channel canvas oscilloscope displaying live simulated telemetry waveforms (X, Y, Z sensor paths) reacting to physics spin decay and charging frequencies.
- A realistic Web Audio soundscape:
  - An electrical charging hum modulated at 3Hz using an LFO and low-pass filter.
  - A dual-oscillator synthetic referee whistle with fast vibrato for VAR decisions.
  - Telemetry pings for impacts and interface interactions.
- A satirical VAR console displaying randomized rule decisions (e.g. "OFFSIDE DETECTED: ball trajectory outline 0.04mm beyond defender's boot").

## Feedback To Carry Forward

- **TS Types & AudioContext**: When compiling clientside JavaScript inside Astro components under strict TypeScript mode, always cast `window` references to `any` (or pull into a separate `win` variable) to prevent compiler issues with `webkitAudioContext` and dynamic tests.
- **TDD String Assertions**: Align development variables early with TDD tests to avoid assertion mismatches (`chargeProgress`, `decideVAR`, etc.).

## Skills Or Patterns Learned

- Generating a dynamic quadratic bezier curve SVG path (`M Q`) in real-time coordinates to simulate physical cables tethered to a user-draggable element.
- Simulating multi-channel sensor feeds (X, Y, Z coordinates) on a canvas using overlaid sine waves with frequency and amplitude scaling based on angular friction decay.
- Designing a dual-oscillator referee trill sound using FM modulation and frequency offsets to create beat patterns.

## Next Sparks

- An atmospheric seismograph laboratory where users trigger micro-quakes to map underground mineral strata.
- A light-refraction workbench using WebGL or canvas paths to align optical prisms and split light beams.
