# Sequential Astro Verification

Use this when validating Astro experiments in this repo.

## Signal

- `npm test` includes checks that invoke `pnpm build`.
- A separate `pnpm --dir clients/web build` is also needed before shipping.
- Vite or Astro reports inspector ports already in use during otherwise normal
  verification.

## Practice

1. Run the focused contract test first.
2. Run the focused Playwright spec next.
3. Run `pnpm --dir clients/web build` by itself.
4. Run `npm test` by itself after the build finishes.
5. Treat a port collision from parallel build/test as an orchestration problem,
   not as a product regression, then rerun sequentially before debugging code.

## Checks

- If `cloudflare-build.test.mjs` fails with `EADDRINUSE`, confirm whether
  another build command was running at the same time.
- Keep the dev server separate from production verification; if it selects a
  higher port, report the actual local URL.
- Record existing warnings separately from new errors so daily experiment notes
  stay useful.
