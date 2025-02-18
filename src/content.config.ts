import { defineCollection, z } from 'astro:content';

const docsSchema = z.object({
  title: z.string(),
  slug: z.string()
    .regex(/^[a-z0-9\/-]+$/)
    .default('index'),
  category: z.enum(['guide', 'reference', 'overview']).default('overview'),
  order: z.number().optional(),
  featured: z.boolean().optional()
});

export const collections = {
  docs: defineCollection({
    type: 'content',
    schema: ({ image }) => docsSchema.extend({
      cover: image().optional()
    })
  })
};
