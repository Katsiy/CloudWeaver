import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const docsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  // Starlight 必要字段
  template: z.enum(['doc']).default('doc'),
  editUrl: z.string().optional(),
  // Stackbit 兼容字段
  slug: z.string().regex(/^[a-z0-9/-]+$/),
  category: z.enum(['guide', 'reference', 'overview'])
});

export const collections = {
  docs: defineCollection({ schema: docsSchema })
};
