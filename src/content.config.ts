// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 文档集合
const docsSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9\/-]+$/),
  category: z.enum(['guide', 'api']),
  order: z.number().optional()
});

// 页面集合（允许更灵活的字段）
const pagesSchema = z.object({
  title: z.string(),
  layout: z.enum(['default', 'full-width']).default('default')
});

export const collections = {
  docs: defineCollection({ type: 'content', schema: docsSchema }),
  pages: defineCollection({ type: 'content', schema: pagesSchema })
};
