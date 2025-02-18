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
  file: 'src/content/docs/**/*.{md,mdx}',
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constraints: {
        required: true,
        unique: true
      }
    },
    { 
      name: 'category', 
      type: 'enum', 
      options: ['overview', 'guide', 'api'],
      required: true
    }
  ]
};

// 页面模型
const pageModel: Model = {
  name: 'page',
  type: 'page',
  singleInstance: false,
  label: 'Basic Page',
  urlPath: '/{slug}',
  file: 'src/content/docs/**/*.md',  // 修正路径匹配
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      required: true 
    }
  ]
};

// 合并后的单一配置
export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/docs'],
      branch: 'preview',
      models: [docModel, pageModel]  // 包含所有模型
    })
  ],
  
  siteMap: ({ objects }) => {
    return (objects || []).map(obj => {
      if (obj.modelName === 'doc') {
        return {
          urlPath: `/docs/${obj.slug}`,
          sourceObjectId: obj.id
        };
      }
      if (obj.modelName === 'page') {
        return {
          urlPath: `/${obj.slug || 'index'}`,
          sourceObjectId: obj.id
        };
      }
      return null;
    }).filter(Boolean);
  }
});
