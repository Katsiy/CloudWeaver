// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

// stackbit.config.ts
const pageModel: Model = {
  name: 'page',
  type: 'page',
  urlPath: '/{slug}',
  file: 'src/content/pages/**/*.mdx',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'layout', type: 'enum', options: ['default', 'full-width'] }
  ]
};

export default defineStackbitConfig({
  // ...
  contentSources: [
    new GitContentSource({
      contentDirs: ['src/content/docs', 'src/content/pages'],
      models: [docModel, pageModel]
    })
  ],
  siteMap: ({ objects }) => [
    ...objects
      .filter(obj => obj.modelName === 'doc')
      .map(doc => ({ urlPath: `/docs/${doc.slug}` })),
    ...objects
      .filter(obj => obj.modelName === 'page')
      .map(page => ({ urlPath: `/${page.slug || 'index'}` }))
  ]
});



export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/docs'],
      branch: 'preview',
      models: [docModel]
    })
  ],
  
  siteMap: ({ objects }) => {
    return objects
      .filter(obj => obj.modelName === 'doc')
      .map(doc => ({
        urlPath: `/docs/${doc.slug}`,  // 对应 Astro 路由结构
        sourceObjectId: doc.id,
        priority: 0.8  // SEO 优化参数
      }));
  }
});
