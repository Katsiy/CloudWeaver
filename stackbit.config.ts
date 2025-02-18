import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import type { Model } from '@stackbit/types';

const docModel: Model = {
  name: 'doc',
  type: 'page',
  label: 'Documentation Page',
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
      }
    },
    { 
      name: 'category',
      type: 'enum',
      options: ['guide', 'reference', 'overview'],
      controlType: 'dropdown'
    },
    { 
      name: 'featured', 
      type: 'boolean',
      default: false
    }
  ]
};

const homePageModel: Model = {
  name: 'home',
  type: 'page',
  singleInstance: true,
  label: 'Home Page',
  urlPath: '/',
  file: 'src/content/docs/index.mdx',
  fields: [
    { 
      name: 'heroTitle', 
      type: 'string', 
      required: true 
    },
    { 
      name: 'showToc', 
      type: 'boolean',
      default: true
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
      models: [docModel, homePageModel],
      branch: 'preview'
    })
  ],
  
  siteMap: ({ objects }) => {
    return objects?.map(obj => ({
      urlPath: obj.modelName === 'home' ? 
        '/' : 
        `/docs/${obj.slug.replace(/^index$/, '')}`,
      sourceObjectId: obj.id
    })) || [];
  }
});
