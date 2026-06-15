---
name: experiment-blog-post
description: >-
  Draft a blog post for a finished daily experiment. Uses the experiment note and the
  existing blog collection conventions to create or update a post under
  clients/web/src/content/blog/.
schedule: "Follow-up stage after execute. Runs after a daily experiment is complete and drafts the matching blog post."
---

# Experiment Blog Post

Write the blog post that documents the completed experiment.

## Inputs

- Read the finished experiment note in `memory/experiments/`.
- Read the existing blog content in `clients/web/src/content/blog/` for tone and structure.
- If the experiment already has a related post, update it instead of creating a duplicate.

## Output

- Create one post per experiment in `clients/web/src/content/blog/`.
- Use the blog collection schema: `title`, `tags`, and optional `image`.
- Keep the post concise and useful. Capture:
  - what the experiment was
  - what changed or shipped
  - notable interaction or visual details
  - any follow-up thoughts worth carrying forward
- Include a link back to the experiment route when one exists.

## Style

- Write for future you, not for marketing.
- Prefer clear tags such as `experiment`, `feedback`, and one topic-specific tag.
- Avoid duplicating the memory note. The blog post should be a readable summary, not a full log.
