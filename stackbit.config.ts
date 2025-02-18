// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

const docModel: Model = {
  name: 'doc',
  type: 'page',
  label: 'Documentation Page',
  urlPath: '/docs/{slug}',
  file: 'src/content/docs/**/*.md',  // 使用 glob 模式匹配集合文件
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constrains: { unique: true }
    },
    { name: 'title', type: 'string', required: true },
    { name: 'category', type: 'enum', options: ['guide', 'api'] },
    { name: 'content', type: 'markdown' }
  ]
};

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
