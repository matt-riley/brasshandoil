# Astro blog as feedback journal

## What worked
- Reuse Astro content collections (`getCollection("blog")`) for a simple feedback blog index and dynamic post route (`/blog/[slug]`).
- In the post route, generate static paths from blog entries and render content with `render(entry)`.
- Keep feedback as authored markdown posts rather than interactive comments.

## Why this is useful here
- Daily experiments need lightweight review flow.
- Writing feedback posts keeps commentary durable, versioned, and easy to search in git history.

## Reuse checklist
- Add a blog post entry in `clients/web/src/content/blog/` for each daily experiment review.
- Link the experiment route inside the post body so feedback has direct context.
- Use consistent tags (for example: `feedback`, `accessibility`, `interaction`) so trends are easy to filter.
- Model the blog post as a follow-up stage after `execute` so every completed experiment automatically gets a written summary.
