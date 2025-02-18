import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "astro",
    "contentSources": [],
    "postInstallCommand": "npm i --no-save @stackbit/types"
})
#import { GitContentSource } from '@stackbit/cms-git';

export default {
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content/posts'], // 你的Markdown内容目录
      models: {
        post: {
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
};
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
