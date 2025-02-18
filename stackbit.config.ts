// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

// 文档模型
const docModel: Model = {
  name: 'doc',
  type: 'page',
  singleInstance: false,  // 明确声明非单例模型
  label: 'Documentation Page',
  urlPath: '/docs/{slug}',
  file: 'src/content/docs/**/*.md',
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constraints: {  // 正确字段名
+       unique: true,
+       required: true
+     }
    },
    { name: 'title', type: 'string', required: true },
    { name: 'category', type: 'enum', options: ['guide', 'api'] }
  ]
};

// 页面模型
const pageModel: Model = {
  name: 'page',
  type: 'page',
  singleInstance: false,
  label: 'Basic Page',
  urlPath: '/{slug}',
  file: 'src/content/docs/**/*.mdx',
  fields: [
    { name: 'title', type: 'string', required: true }
  ]
};

// 核心修复点：确保配置对象完整闭合
export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/docs'],
      branch: 'preview',
      models: [docModel, pageModel]  // 注意数组闭合
    }) // <- 补全这个闭合括号
  ],
  
siteMap: ({ objects }) => {
  // 添加安全校验
  if (!objects) return [];
  
  return objects
    .filter(obj => obj?.modelName && ['doc', 'page'].includes(obj.modelName))
    .map(obj => {
      if (obj.modelName === 'doc') {
        return {
          urlPath: `/docs/${obj.slug}`,
          sourceObjectId: obj.id
        };
      }
      return {
        urlPath: `/${obj.slug || 'index'}`,
        sourceObjectId: obj.id
      };
    });
}

      }));
  }
}); // <- 确保配置整体闭合
