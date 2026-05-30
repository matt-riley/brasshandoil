import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const repoRoot = process.cwd()

const requiredFiles = [
  "memory/README.md",
  "memory/feedback-log.md",
  "memory/skills/README.md",
  "memory/skills/astro-experiments.md",
  "memory/experiments/README.md",
  "memory/experiments/2026-05-31-theremin.md",
  "memory/templates/daily-experiment-entry.md",
  "memory/templates/feedback-entry.md",
  "README.md",
]

test("experiment memory files exist", () => {
  for (const file of requiredFiles) {
    assert.ok(existsSync(resolve(repoRoot, file)), `${file} should exist`)
  }
})

test("memory README documents the daily loop", () => {
  const readme = readFileSync(resolve(repoRoot, "memory/README.md"), "utf8")

  assert.match(readme, /Daily Loop/, "Should describe the daily loop")
  assert.match(readme, /feedback/i, "Should explain feedback capture")
  assert.match(readme, /skills/i, "Should explain skill capture")
})

test("daily experiment template captures TDD and learning", () => {
  const template = readFileSync(
    resolve(repoRoot, "memory/templates/daily-experiment-entry.md"),
    "utf8"
  )

  assert.match(template, /Test Plan/, "Template should include a test plan")
  assert.match(template, /Feedback To Carry Forward/, "Template should capture carry-forward feedback")
  assert.match(template, /Skills Or Patterns Learned/, "Template should capture learned skills")
})

test("feedback log template is append-friendly", () => {
  const feedbackLog = readFileSync(
    resolve(repoRoot, "memory/feedback-log.md"),
    "utf8"
  )

  assert.match(feedbackLog, /## Feedback Entries/, "Feedback log should have an entries section")
  assert.match(feedbackLog, /Date:/, "Feedback log should provide an easy template")
})
