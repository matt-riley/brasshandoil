---
title: "Brackish Groundwater Choir"
tags:
  - experiment
  - sound
  - web-audio
  - canvas
---

Today we built the [Brackish Groundwater Choir](file:///Users/mattriley/Documents/projects/personal/brasshandoil/clients/web/src/pages/experiments/brackish-groundwater-choir.astro).

It is a coastal hydrologic terminal representing the fragile boundary between freshwater recharge and seawater intrusion.

### The Dynamics
- **Hydraulic Head Balance**: The freshwater inflow (adjusted via a vertical slider) balances the ocean's hydrostatic pressure. Toggling municipal extraction wells increases drawdowns and pulls the seawater wedge inland.
- **Salt Crust Growth**: If salinity increases beyond 25%, salt crystals dynamically grow in a branching structure on the well tips.
- **Choral Soundscape**: Powered by the Web Audio API, the terminal generates clean C2, G3, D4 choral sine tones when balanced. As salinity increases, the sound becomes muffled through a lowpass filter, detuned, and a sawtooth crackle node kicks in to simulate the physical pop of crystallizing salt.
