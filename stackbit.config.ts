// stackbit.config.ts
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

const starlightModel: Model = {
  name: 'starlight-doc',
  type: 'page',
  label: '文档页面',
  urlPath: '/docs/{slug}',
  file: 'src/content/docs/**/*.{md,mdx}',
  fields: [
    { 
      name: 'slug', 
      type: 'string', 
      required: true,
      constraints: {
        pattern: '^[a-z0-9/-]+$',
        unique: true
      },
      controlType: 'slug'  // 启用智能路径生成
    },
    { 
      name: 'sidebar_label',  // 对应 Starlight 的侧边栏标签
      type: 'string',
      required: false,
      description: '覆盖自动生成的侧边栏标签'
    },
    {
      name: 'category',
      type: 'enum',
      options: ['overview', 'guides', 'reference'],
      group: 'classification'  // 在编辑器中进行分组
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
      models: [starlightModel]
    })
  ],
  
  siteMap: ({ objects }) => {
    return objects?.map(obj => ({
      urlPath: obj.slug === 'index' ? 
        '/docs' : 
        `/docs/${obj.slug}`,
      sourceObjectId: obj.id,
      label: obj.sidebar_label || obj.title  // 优先使用自定义标签
    })) || [];
  }
});
