// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const docsSchema = z.object({
  title: z.string(),
  slug: z.string()
    .regex(/^[a-z0-9\/-]+$/, "只允许小写字母、数字和短横线")
    .refine(val => !val.startsWith('/'), "slug 不能以斜杠开头"),
  category: z.enum(['guide', 'api', 'tutorial']),
  order: z.number().int().positive().optional()
});

export const collections = {
  docs: defineCollection({
    type: 'content',
    schema: docsSchema
  })
};
