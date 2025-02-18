import { GitContentSource } from '@stackbit/cms-git';

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
