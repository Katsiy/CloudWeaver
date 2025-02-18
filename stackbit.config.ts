// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

const pageModel: Model = {
  name: 'page',
  type: 'page', // 关键标识
  urlPath: '/{slug}',
  fields: [
    { name: 'slug', type: 'string', required: true },
    { name: 'title', type: 'string' },
    { name: 'content', type: 'markdown' }
  ]
};

// 数据模型（不生成页面）
const authorModel: Model = {
  name: 'author',
  type: 'data',
  fields: [
    { name: 'name', type: 'string' },
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
      contentDirs: ['src/content/docs'],
      branch: 'preview',
      models: [postModel] // 必须用数组格式


  siteMap: ({ documents }) => {
    return documents.map(doc => {
      if (doc.modelName === 'post') {
        return {
          urlPath: `/posts/${doc.fields.slug}`,
          document: doc
        };
      }
      return null;
    }).filter(Boolean);
  }
});
