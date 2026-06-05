# Skill: Playwright Browser Smoke Tests for Astro

**Origin:** Shared site navigation and rendered-page regression coverage

## When to use

- Use Playwright when a regression would only show up in a real browser: routing, hydration, focus, external links, rendered headings, or client-side transitions.
- Keep the default layer thin for this project. Daily experiments are short, so browser tests should protect shared flows first and only go deeper where runtime behavior is the point of the piece.

## Current project pattern

- Keep structural TDD checks in `clients/web/tests/*.test.mjs` using Node's built-in runner.
- Put browser coverage in `clients/web/tests/e2e/*.spec.js`.
- Let Playwright boot Astro through `webServer` so the suite can run from a clean checkout without a separately managed dev server.
- Prefer stable user-facing selectors such as roles, headings, and link names before falling back to class selectors.
- Start with navigation smoke tests:
  - homepage renders
  - shared nav is present
  - experiments index opens a real experiment page
  - the user can navigate back out

## Guardrails

- Keep the browser suite small enough that it still gets run during one-hour sessions.
- Avoid testing animation internals unless the animation itself is the feature under review.
- If a test must target an icon-only control, give the control an accessible name first and assert through that.
- **Custom CSS Toggles**: Custom toggles often hide the underlying native `<input>` element. In E2E tests, target the visible companion `<label>` element for clicks and visibility assertions rather than the hidden input to avoid false failures.
