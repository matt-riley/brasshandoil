# Copilot Instructions

## Commands

- `npm test` runs the root Node test suite plus the structural Astro tests in `clients/web/tests/*.test.mjs`.
- `node --test tests/experiment-memory-structure.test.mjs` runs the root memory-structure test only.
- `node --test clients/web/tests/theremin.test.mjs` runs a single structural test for one experiment page. Swap the file name for the page you are changing.
- `cd clients/web && pnpm build` runs `astro check && astro build` for the Cloudflare-targeted Astro app.
- `cd clients/web && pnpm test:e2e` runs the full Playwright browser suite.
- `cd clients/web && pnpm exec playwright test tests/e2e/navigation.spec.js` runs a single Playwright spec file.
- `cd clients/web && pnpm exec playwright test tests/e2e/experiments.spec.js -g "theremin boots"` runs one named Playwright test.

## High-level architecture

- The repository has two main layers:
  - the root project, which owns the daily experiment workflow, repo memory, and the Node-based structural test suite
  - `clients/web`, which is the actual Astro site
- `clients/web` is an Astro 6 app configured for Cloudflare server output with the Cloudflare adapter, MDX support, Tailwind CSS v4, and strict TypeScript settings.
- `clients/web/src/layouts/Base.astro` is the shared shell for nearly everything. It imports the global stylesheet, renders the shared header, enables Astro client-side transitions, and installs cleanup hooks for `AudioContext`, `requestAnimationFrame`, and document/window event listeners before route swaps.
- The site is mostly a set of standalone experiment pages under `clients/web/src/pages/experiments/*.astro`. Each experiment is a self-contained route with its own markup, styles, and inline browser script rather than a component-heavy app architecture.
- The experiments index at `clients/web/src/pages/experiments/index.astro` is a hand-maintained registry of shipped pieces. New experiment pages are not auto-discovered there; they must be added manually.
- Repo memory is part of the product workflow, not side documentation. `memory/experiments/`, `memory/feedback-log.md`, `memory/skills/`, and `memory/templates/` are checked by the root test suite and should stay in sync with shipped work.

## Key conventions

- Follow strict TDD for experiment work. This repo uses two test layers:
  - fast structural assertions with Node's built-in runner in `clients/web/tests/*.test.mjs`
  - Playwright browser coverage in `clients/web/tests/e2e/*.spec.js` for behavior that only matters in a real browser
- Keep each experiment shippable as one self-contained Astro page. Reach for shared components only when something is clearly cross-cutting; most experiment-specific code should stay local to the page.
- When you add or rename an experiment page, update `clients/web/src/pages/experiments/index.astro` as part of the same change so the experiment stays discoverable from `/experiments`.
- New experiments should import `@layouts/Base.astro` and use the existing path aliases from `clients/web/tsconfig.json` (`@layouts/*`, `@components/*`, `@content/*`) instead of long relative paths.
- If an experiment creates long-lived browser resources such as audio contexts, animation frames, or global listeners, make sure they work with the cleanup model already established in `Base.astro` so Astro client-router navigation does not leak runtime state between experiments.
- Keep the visible experience focused on the artwork, not on the implementation. The memory skill notes and tests reinforce two standing expectations: key text and controls must remain legible against the visuals, and the page copy should not explain which browser APIs power the effect.
- Shipping work usually means updating repo memory too: record the experiment in `memory/experiments/`, append review outcomes to `memory/feedback-log.md`, and promote durable lessons into `memory/skills/` when they become reusable.
