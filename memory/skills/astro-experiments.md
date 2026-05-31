# Astro Experiment Skills

## Current Patterns

- Keep experiments discoverable from the `/experiments` index.
- Favor one self-contained page per experiment so the daily work stays shippable within an hour.
- Use Node's built-in test runner for structural TDD checks when full browser automation would be overkill.
- Every shipped experiment page should also have at least one Playwright browser test that proves the rendered experience loads and its core interaction loop still works.
- Add a thin Playwright smoke layer for shared navigation and rendered-page regressions; reserve deeper interaction coverage for the experiments whose behavior actually depends on browser runtime.
- Build around one clear interaction loop per page, then push the atmosphere hard with gradients, motion, and copy.
- However strange the page gets, body text, controls, and key labels must maintain legible contrast against their backgrounds.
- Treat accessibility contrast as part of the creative brief up front, especially for text layered over gradients, haze, or animated lighting.
- Native browser primitives like Popover and View Transitions are good candidates for whimsy because they add surprise without demanding a complex app shell.
- Do not explain the implementation inside the experiment's visible copy; the piece should stand on its own as an experience.
- Effects should be judged by whether they read clearly to a human in the browser, not just by whether the underlying API is technically present.
- User feedback should always be recorded in repo memory and promoted into reusable skills when it becomes a pattern.
- In inline Astro scripts, guard required DOM nodes once with `instanceof` checks, then copy them into explicitly typed non-null aliases (`const x: HTMLDivElement = rawX`) so TypeScript keeps the narrowing across nested closures and helper functions.
- When exposing debug/test hooks on `window` (for example `__officeSimulateReturn`), cast `window` to a narrow local type (`Window & { hook?: fn }`) instead of relying on implicit `any`.

## Open Questions

- Decide which experiments justify richer browser assertions beyond nav and page-load smoke coverage.
- Track which visual ideas are worth extracting into shared components versus staying one-off and strange.
