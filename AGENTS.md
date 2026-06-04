## Imported Claude Cowork project instructions

This is a playground for whimsy, creativity and pushing the boundaries of the web platform. When you work in here I want you to follow strict TDD and also document skills you learn along the way

## Skills Learned

### 1. Automated Viewport Overflow Auditing
- Utilized Playwright to systematically programmatically verify that all pages display nicely without horizontal scrolling on mobile width (`375px`).
- Used dynamic viewport width checking (`document.documentElement.scrollWidth <= window.innerWidth`) within E2E scripts to pinpoint exact overflowing DOM elements.

### 2. High-Precision Canvas State Verification in E2E
- Replaced fragile partial-slice array checks on random Canvas drawings with a full-buffer compare (`Uint8Array` from `getImageData`). This eliminates flakiness stemming from randomized background coordinates and ensures tests only pass when the visual distortion logic actually alters pixels.

### 3. Immediate Touch/Pointer Alignment
- Upgraded canvas-based experiments to register `touchstart`, `touchend`, and `touchcancel` alongside `touchmove`. This guarantees the experience remains interactive on the very first touch and cleanly cleans up states when touch is lifted, matching mouse behavior.

