// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

// 文档模型
const docModel: Model = {
  name: 'doc',
  type: 'page',
  singleInstance: false,
  label: 'Documentation Page',
  urlPath: '/docs/{slug}',
  file: 'src/content/docs/**/*.md',
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constraints: {
        required: true,
        unique: true
      }
    }, // 注意逗号
    { 
      name: 'title', 
      type: 'string', 
      required: true 
    }, // 注意逗号
    { 
      name: 'category', 
      type: 'enum', 
      options: ['guide', 'api'] 
    }
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
