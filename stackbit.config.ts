// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

// 定义页面模型
const pageModel: Model = {
  name: 'page',
  type: 'page', // 必须标记为 page 类型
  urlPath: '/{slug}',
  file: 'src/content/docs/{{slug}}.md', // 明确文件路径模板
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constrains: {
        unique: true // 强制唯一标识
      }
    },
    { name: 'title', type: 'string', required: true },
    { name: 'content', type: 'markdown' }
  ]
};

// 定义作者模型（数据模型）
const authorModel: Model = {
  name: 'author',
  type: 'data', // 非页面内容
  file: 'src/content/authors/{{name}}.md',
  fields: [
    { name: 'name', type: 'string', required: true },
    { name: 'bio', type: 'markdown' }
  ]
};

export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/docs'], // 确保此目录存在内容文件
      branch: 'preview',
      models: [pageModel, authorModel] // 包含所有模型
    }) // 补全缺失的括号
  ],
  
  // 修正后的站点地图函数
  siteMap: ({ objects }) => {
    return objects
      .filter(obj => obj.modelName === 'page')
      .map(page => ({
        urlPath: `/${page.slug}`, // 直接使用解构字段
        sourceObjectId: page.id
      }));
  }
});
