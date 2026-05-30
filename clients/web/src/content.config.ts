import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
  }),
});

export const collections = {
  blog,
};
