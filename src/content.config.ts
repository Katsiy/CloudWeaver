import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const docsSchema = z.object({
  title: z.string().min(1),
  slug: z.string()
    .regex(/^[a-z0-9/-]*$/, "只能包含小写字母、数字和短横线")
    .transform(val => val || 'index'), // 空 slug 自动转为 index
  // Starlight 必需字段
  template: z.literal('doc').default('doc'),
  editUrl: z.string().url().optional(),
  // Stackbit 分类字段
  category: z.enum(['overview', 'guide', 'reference']).default('overview')
});


export const collections = {
  docs: defineCollection({ schema: docsSchema })
};
