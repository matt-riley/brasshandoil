# Skill: Shared Renovate + Reusable CI Baseline

## Context
- Repository needs org-level consistency for dependency updates and CI behavior.

## Pattern
- Keep `.github/renovate.json` minimal and extend shared presets from `matt-riley/renovate-config`.
- Use reusable workflows from `matt-riley/matt-riley-ci` for repository checks instead of duplicating job steps.

## Applied In This Repo
- Renovate extends:
  - `github>matt-riley/renovate-config`
  - `github>matt-riley/renovate-config:node`
  - `github>matt-riley/renovate-config:astro`
  - `github>matt-riley/renovate-config:github-actions`
- CI workflow uses `matt-riley/matt-riley-ci/.github/workflows/node-ci.yml@v1` for:
  - root test execution
  - `clients/web` build verification

## Why This Helps
- Centralized policy updates with less per-repo maintenance.
- CI behavior stays consistent across repositories while still allowing per-job inputs.
