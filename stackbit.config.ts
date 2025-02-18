import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import path from 'path';

const starlightModel = {
  name: 'doc',
  type: 'page',
  urlPath: '/docs/{slug}',
  file: path.join(process.cwd(), 'src/content/docs/**/*.mdx'),
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constraints: { 
        pattern: '^[a-z0-9/-]+$',
        unique: true
      }
    },
    {
      name: 'category',
      type: 'enum',
      options: ['guide', 'reference', 'overview'],
      controlType: 'dropdown'
    }
  ]
};

export default defineStackbitConfig({
  stackbitVersion: '\~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  
  contentSources: [
    new GitContentSource({
      rootPath: process.cwd(),
      contentDirs: [path.join(process.cwd(), 'src/content/docs')],
      models: [starlightModel]
    })
  ],
  
  siteMap: ({ objects }) => {
    return objects?.map(obj => {
      // Starlight 路由规则适配
      const slugPath = obj.slug === 'index' ? '' : obj.slug;
      return {
        urlPath: `/docs/${slugPath}`.replace(/\/$/, ''), // 自动处理尾部斜杠
        sourceObjectId: obj.id
    })) || [];
  }
});
