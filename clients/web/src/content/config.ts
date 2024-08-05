import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
  }),
});

export const collections = {
  blog,
};
