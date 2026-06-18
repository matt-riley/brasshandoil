---
title: "Dinoflagellate Bioluminescent Shear Reactor"
tags:
  - experiment
  - fluid-dynamics
  - web-audio
  - canvas
  - biology
---

Today we built the [Dinoflagellate Bioluminescent Shear Reactor](file:///Users/mattriley/Documents/projects/personal/brasshandoil/clients/web/src/pages/experiments/bioluminescent-shear-reactor.astro).

It is an interactive marine biology petri-dish simulation inspired by the mechanical stimulation of dinoflagellate algae cells (*Pyrocystis fusiformis*).

### The Dynamics
- **Shear Stress Stimulation**: Users stir the fluid chamber by dragging/swiping with their pointer or steering a virtual magnetic stirrer using the keyboard arrow keys. The shear rate (spatial gradient of fluid velocity) is calculated dynamically based on input speed and fluid viscosity.
- **Bioluminescent Flash Cascade**: When local shear exceeds the dinoflagellates' trigger threshold, algae cells flash a neon blue-green, slowly decaying back to a dormant state. Excessive shear rates (>3.5 Pa) damage algae health, introducing a delicate operational trade-off.
- **Multimodal Audio Synthesis**: Synthesized using Web Audio API, the page outputs a muffled low-frequency bubbling hum (modulated by stirrer speed) and high-frequency glass-like chime tones triggered during cellular excitation cascades.
- **Calibrated Media Density**: Users select between culture media (nutrient water, agar, glycerol) to scale the fluid's viscosity, shifting the mechanical shear rates generated at identical stirrer speeds.
