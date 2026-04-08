import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updateDate: z.string().optional(),
    author: z.string().default("card.oriz.in"),
    category: z.string(),
    tags: z.array(z.string()),
    featuredImage: z.string().optional(),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/glossary" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    relatedTerms: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, glossary };
