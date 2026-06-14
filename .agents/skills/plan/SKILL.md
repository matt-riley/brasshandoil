---
name: plan
description: >-
  Break down medium-to-large tasks into phased plans in brain/plans/. Planning only — does not
  implement. Use for new features, multi-file refactors, or architectural changes — not small
  fixes. Triggers: "plan this", "break this down".
---

# Plan

Produce implementation plans grounded in project principles. Write plans to `brain/plans/`. **Do NOT implement anything — the plan is the deliverable.**

**Use Tasks to track progress.** Create a task for each step (TaskCreate), mark each in_progress when starting and completed when done (TaskUpdate). Check TaskList after completing each step.

## Step 0 — Triage Complexity

Before running the full planning workflow, assess whether this task actually needs a plan:

**Trivially small (1–2 files, obvious approach):**
Tell the user this task doesn't need a plan and suggest implementing directly without the plan skill. **Stop here — do not implement.**

**Needs planning (proceed to Step 1):**
- The change spans 3+ files or introduces new architecture
- There are multiple valid approaches and the user should weigh in
- The task has unclear scope or cross-cutting concerns
- The user explicitly asks for a plan

## Step 1 — Load Principles

Read `brain/principles.md`. Follow every `[[wikilink]]` and read each linked principle file. These principles govern all plan decisions — refer back to them throughout.

**Do NOT skip this. Do NOT use memorized principle content — always read fresh.**

## Step 2 — Define Scope and Constraints

Use `AskUserQuestion` to resolve ambiguity before exploring the codebase:

- What is in scope vs explicitly out of scope?
- Are there constraints (dependencies, platform requirements, existing patterns to preserve)?
- What does "done" look like?

Frame questions with concrete options. If the request is already clear, confirm scope boundaries briefly and move on.

## Step 3 — Explore Context with Subagents

**Always** delegate exploration to subagents via the `Task` tool. Never do large-scale codebase exploration in the main context.

Spawn exploration agents (subagent_type: `Explore`) to:
- Read existing code in affected areas
- Identify patterns, conventions, and dependencies
- Map architecture relevant to the change
- Find tests, types, and related infrastructure

Run multiple agents in parallel when investigating independent areas.

## Step 4 — Gather Domain Skills

Check installed skills (`.agents/skills/`, `.claude/skills/`) for any that match the plan's domain. **Invoke matched skills** — read their output and incorporate domain guidance into the plan.

## Step 5 — Write the Plan

Create the plan directory and files manually:

1. Create `brain/plans/NN-slug-name/overview.md` (or a single file for simple plans)
2. Create phase files as needed
3. Update `brain/plans/index.md` with a link to the new plan

### Phase sizing

- **1 function/type + tests** per phase, or **1 bug fix** — not "one file" or "one component" (too variable)
- **Max 2-3 files touched** per phase when possible
- **Prefer 8-10 small phases** over 3-4 large ones — small phases keep future options open

For plans with 3+ phases, create a directory:

```
brain/plans/42-mvp/
├── overview.md
├── phase-1-scaffold.md
├── phase-2-layout.md
└── phase-3-drawing.md
```

### Overview file

Must include:
- **Context** — what problem this solves and why
- **Scope** — what's included, what's explicitly excluded
- **Constraints** — technical, platform, dependency, or pattern constraints
- **Phases** — ordered links to phase files: `[[plans/42-mvp/phase-1-scaffold]]`
- **Verification** — project-level verification commands

### Phase files

Each phase file must include:
- Back-link: `Back to [[plans/42-mvp/overview]]`
- **Goal** — what this phase accomplishes
- **Changes** — which files are affected and what changes
- **Verification** — static and runtime checks for this phase

**Keep plans high-level.** Describe *what* and *why*, not *how* at the code level.

## Step 6 — Update Plans Index

Update `brain/plans/index.md` with a wikilink to the new plan's overview.

## Step 7 — Present to User

Summarize the plan: list the phases, scope boundaries, and verification approach. Ask the user to review the plan files in `brain/plans/`.

**Stop here.** Do not begin implementation.
