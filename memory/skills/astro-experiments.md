# Astro Experiment Skills

## Current Patterns

- Keep experiments discoverable from the `/experiments` index.
- Favor one self-contained page per experiment so the daily work stays shippable within an hour.
- Use Node's built-in test runner for structural TDD checks when full browser automation would be overkill.
- Build around one clear interaction loop per page, then push the atmosphere hard with gradients, motion, and copy.

## Open Questions

- Decide when experiments should graduate from structural tests to richer interaction tests.
- Track which visual ideas are worth extracting into shared components versus staying one-off and strange.
- Revisit browser-based visual QA once the local Playwright browser binary is installed, especially for motion-heavy pages.
