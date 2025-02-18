// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

// 文档模型
// stackbit.config.ts
const docModel = {
  name: 'doc',
  type: 'page',
  file: 'src/content/docs/**/*.{md,mdx}',
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      constraints: { required: true, unique: true }
    },
    { name: 'category', type: 'enum', options: ['overview', 'guide', 'api'] }
  ]
};

const pageModel = {
  name: 'page',
  type: 'page',
  file: 'src/content/docs/**/*.md',
  fields: [
    { name: 'title', type: 'string', required: true }
  ]
};

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      contentDirs: ['src/content/docs', 'src/content/pages'],
      models: [docModel, pageModel]
    })
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
      models: [docModel] // 确保数组闭合
    })
  ],
  
  siteMap: ({ objects }) => {
    return objects?.map(obj => ({
      urlPath: `/docs/${obj.slug}`,
      sourceObjectId: obj.id
    })) || [];
  }
});
