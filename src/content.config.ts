import { defineCollection, z } from 'astro:content';

const docsSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9/-]+$/),
  category: z.enum(['overview', 'guide', 'api']),
  order: z.number().optional()
});

const pagesSchema = z.object({
  title: z.string()
});

export const collections = {
  docs: defineCollection({ schema: docsSchema }),
  pages: defineCollection({ schema: pagesSchema })
};
