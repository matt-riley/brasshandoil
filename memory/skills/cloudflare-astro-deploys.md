# Astro Cloudflare Deploys

- When Astro is upgraded on a Cloudflare project, upgrade `@astrojs/cloudflare` and `wrangler` with it instead of leaving the adapter on an older major line.
- Astro 6-era Cloudflare builds no longer want Wrangler `main` pointing at a built `dist/_worker.js` file. Use `@astrojs/cloudflare/entrypoints/server` and let Astro emit the deployable server manifest into `dist/server/`.
- If the site does not use `astro:assets` image transforms, set `image.service` to `passthroughImageService()` so Sharp never becomes a runtime dependency by accident.
- If you do want Astro's pre-Astro-6 behavior on Cloudflare, set `adapter: cloudflare({ imageService: "compile" })` explicitly.
- A good regression test for this stack is: run a clean build, then assert the generated `dist/server/*.mjs` files do not contain Sharp runtime markers like `requireSharp`, `detect-libc`, or `astro/assets/services/sharp`.
- Some sandboxed environments disallow binding listen sockets entirely; if `pnpm build` (via Cloudflare/Vite internals) throws EPERM on `listen()`, gate the build test behind a quick “can bind an ephemeral port” preflight and skip when it’s not allowed.
