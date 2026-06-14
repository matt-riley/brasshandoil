---
name: ruminate
description: >-
  Mine past Claude Code conversations for uncaptured patterns, corrections, and knowledge.
  Cross-references with existing brain content. Triggers: "ruminate", "mine my history".
---

# Ruminate

Mine conversation history for brain-worthy knowledge that was never captured. Complements `reflect` (current session) and `meditate` (brain vault audit) by looking at the full archive of past conversations.

## Process

### 1. Read the brain

Build a brain snapshot: `sh .agents/skills/meditate/scripts/snapshot.sh brain/ /tmp/brain-snapshot-ruminate.md`. Pass the snapshot path to each analysis agent. This avoids loading the full brain into the ruminate orchestrator's context.

### 2. Locate conversations

Find the project conversation directory:

```
~/.claude/projects/-<cwd-with-dashes-replacing-slashes>/
```

### 3. Extract conversations

Run the extraction script to parse JSONL conversation files into readable text and split into batches:

```bash
python3 .agents/skills/ruminate/scripts/extract-conversations.py "$CONV_DIR" "$OUT_DIR" --batches N
```

Choose N based on the number of conversations found: ~1 batch per 20 conversations, minimum 2, maximum 10.

### 4. Spawn analysis team

Create an agent team (TeamCreate) with N agents (one per batch), each with `subagent_type: general-purpose` and `model: opus`. Run all N in parallel.

Each agent's prompt should include:

- The batch manifest path (`$OUT_DIR/batches/batch_N.txt`)
- The output path (`$OUT_DIR/findings_N.md`)
- The list of topics **already captured** in the brain (compiled from step 1) — so agents skip known knowledge
- Instructions to extract from each conversation:
  - **User corrections**: times the user corrected the assistant's approach, code, or understanding
  - **Recurring preferences**: things the user explicitly asked for or pushed back on repeatedly
  - **Technical learnings**: codebase-specific knowledge, gotchas, patterns discovered
  - **Workflow patterns**: how the user prefers to work
  - **Frustrations**: friction points, wasted effort, things that went wrong
  - **Skills wished for**: capabilities the user expressed wanting

Agents write structured findings to their output files.

### 5. Synthesize

After all agents complete, read all findings files. Cross-reference with existing brain content. Deduplicate across batches.

**Filter by frequency and impact.** Apply these filters before presenting:

- **Frequency**: Did this come up in multiple conversations, or was the user correcting the same mistake repeatedly?
- **Factual accuracy**: Is something in the brain now wrong? These are always worth fixing.
- **Impact**: Would failing to capture this cause repeated wasted effort in future sessions?

**Discard aggressively.** It's better to present 3 high-signal findings than 9 that include noise.

### 6. Present and apply

Present findings to the user in a table with columns: finding, frequency/evidence, and proposed action.

**Route skill-specific learnings.** Check if any findings are about how a specific skill should work. Update the skill's SKILL.md directly.

Apply only the changes the user approves. Follow brain writing conventions.

### 7. Clean up

Remove the temporary extraction directory:

```bash
rm -rf "$OUT_DIR"
```

## Guidelines

- **Filter aggressively.** Most conversations will have low signal.
- **Prefer reduction.** If a finding is a special case of an existing brain principle, update the existing note.
- **Quote the user.** When a finding stems from a direct user correction, include the user's words.
- **Shut down agents** when analysis is complete.
