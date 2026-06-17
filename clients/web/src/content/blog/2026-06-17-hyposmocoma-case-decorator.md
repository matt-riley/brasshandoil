---
title: "Oahu Web Camouflage Atelier"
tags:
  - experiment
  - physics
  - web-audio
  - canvas
  - biology
---

Today we built the [Oahu Web Camouflage Atelier](file:///Users/mattriley/Documents/projects/personal/brasshandoil/clients/web/src/pages/experiments/hyposmocoma-case-decorator.astro).

It is an interactive speciation simulator inspired by the carnivorous caterpillar *Hyposmocoma osteophaga* of Hawaii.

### The Dynamics
- **Vibration-Sensitive Harvesting**: Users navigate a glowing concentric spider web to pluck trapped wings, heads, and legs. Dragging or plucking with high velocity increases the silk thread tension (visualized as decaying wave amplitude on the canvas) and raises the resident spider's alertness.
- **Camouflage Calibration**: Once items are harvested, the caterpillar's case slots (top, mid, bottom) are unlocked. The user must arrange the parts to break the silken profile's silhouette, matching the resident spider's expectations.
- **Biomimetic Audio**: Powered by the Web Audio API, the page features a low-frequency ambient forest night drone modulated by a slow LFO, sharp triangle/sawtooth chimes for silk thread plucking, and high-frequency celebratory chimes upon escaping the spider.
