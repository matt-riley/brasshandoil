---
name: review
description: >-
  Principle-grounded review of code changes, PRs, or plans. Use when asked to review, critique,
  or assess quality of work — "review", "review this", "code review", "check this".
---

# Review

Thorough review grounded in project principles. **Do NOT make changes — the review is the deliverable.**

**Use Tasks to track progress.** Create a task for each step below (TaskCreate), mark each in_progress when starting and completed when done (TaskUpdate). Check TaskList after each step.

## Step 1 — Load Principles

Read `brain/principles.md`. Follow every `[[wikilink]]` and read each linked principle file. These principles govern review judgments — refer back to them when evaluating issues.

**Do NOT skip this. Do NOT use memorized principle content — always read fresh.**

## Step 2 — Determine Scope

Infer what to review from context — the user's message, recent diffs, or referenced plans/PRs. If genuinely ambiguous (nothing to infer), ask.

Auto-detect review mode from change size:
- **BIG CHANGE** (50+ lines changed, 3+ files, or new architecture) — all sections, at most 4 top issues per section
- **SMALL CHANGE** (under those thresholds) — one issue per section

## Step 3 — Gather Context

For **SMALL CHANGE** reviews, read files directly in the main context.

For **BIG CHANGE** reviews, delegate exploration to subagents via the `Task` tool.

## Step 4 — Assessment Pipeline

Work through all sections in order. For each section, check against loaded principles.

### 1. Scope Check

Flag files changed outside the plan phase's stated scope as scope violations.

### 2. Architecture
- System design and component boundaries
- Dependency graph and coupling
- Security architecture (auth, data access, API boundaries)

### 3. Code Quality
- DRY violations — be aggressive
- Error handling patterns and missing edge cases
- Over-engineering or under-engineering relative to principles

### 4. Tests
- Coverage gaps (unit, integration, e2e)
- Missing edge case coverage — be thorough
- New behavior must have new tests

### 5. Performance
- N+1 queries and database access patterns
- Memory-usage concerns

## Step 5 — Issue Format

**NUMBER** each issue (1, 2, 3...). For every issue:

- Describe the problem concretely with file and line references
- Assign severity: **high** (blocks acceptance), **medium** (worth fixing), **low** (style/minor)
- Present 2–3 options with **LETTERS** (A, B, C), including "do nothing" where reasonable
- Give a recommended option and why, mapped to principles

## Step 6 — Verdict

- **Accept**: All checks pass, scope clean, tests present and passing.
- **Accept with notes**: Low-severity issues only.
- **Revise**: High-severity issues found.
