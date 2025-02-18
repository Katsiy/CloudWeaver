// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'CloudWeaver Docs',
      customCss: ['/src/assets/custom.css'],
      social: {
        github: 'https://github.com/Katsiy/CloudWeaver',
        discord: 'https://astro.build/chat'
      },
      sidebar: [
        {
          label: '开始',
          autogenerate: { directory: 'overview' }
        },
        {
          label: '操作指南',
          autogenerate: { directory: 'guides' }
        },
        {
          label: 'API 参考',
          autogenerate: { directory: 'reference' }
        }
      ],
      components: {
        PageTitle: './src/components/CustomPageTitle.astro'
      }
    })
  ],
  redirects: {
    '/docs/index': '/docs',
    '/index': '/'
  }
});
