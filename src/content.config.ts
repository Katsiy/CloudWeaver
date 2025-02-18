// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.string().optional(),
    order: z.number().default(0)
  })
});

export const collections = {
  'docs': docsCollection
};
