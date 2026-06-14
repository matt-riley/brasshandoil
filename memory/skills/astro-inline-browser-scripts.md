# Astro Inline Browser Scripts

Use `script is:inline` for self-contained experiment logic that is intentionally
plain browser JavaScript and does not need Astro's module processing.

## Why

- Processed Astro scripts are checked like TypeScript, so `querySelector`,
  event callbacks, canvas contexts, and `dataset` writes require substantial
  narrowing even for quick art experiments.
- Inline scripts preserve literal browser behavior and avoid build-only
  diagnostics when the code is already covered by focused E2E tests.

## Pattern

- Keep the inline script after the markup it queries.
- Retain stable `id`, `class`, and `data-*` hooks for Node contract tests and
  Playwright state assertions.
- Still run `pnpm --dir clients/web build`; this catches markup and integration
  issues that source-string tests cannot see.

## Watch Outs

- Inline scripts cannot import npm modules or rely on Astro processing.
- If the script grows shared logic, switch to a processed module and add proper
  DOM type assertions instead of leaving a large untyped block.
