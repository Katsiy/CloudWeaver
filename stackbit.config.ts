// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

const postModel: Model = {
  name: 'post',
  type: 'page',
  urlPath: '/posts/{slug}',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'content', type: 'markdown', required: true }
  ]
};

export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/posts'],
      branch: 'preview',
      models: [postModel] // 必须用数组格式
    })
  ]
});
