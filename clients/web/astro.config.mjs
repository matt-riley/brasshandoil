import { defineConfig, passthroughImageService } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  image: {
    service: passthroughImageService(),
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
