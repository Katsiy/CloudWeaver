// stackbit.config.js
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/posts'], // 确保此路径存在
      branch: 'preview',
      models: {
        post: { // 模型名称需与文件名匹配，如 `src/content/posts/post.md`
          type: 'page',
          urlPath: '/posts/{slug}',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'content', type: 'markdown', required: true }
          ]
        }
      }
    })
  ]
});

// stackbit.config.js
module.exports = {
  stackbitVersion: '0.5.4',
  ssgName: 'astro',       # 明确指定 Astro
  nodeVersion: '18',
  contentSources: [{
    type: 'git',
    rootPath: './',       # 从根目录开始扫描
    branch: 'preview',
    contentDirs: ['src/content']  # 显式声明内容目录
  }]
};
