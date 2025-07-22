// @ts-check

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import remarkCustomDirectives from './src/plugins/remarkCustomDirectives';

// https://astro.build/config
export default defineConfig({
  srcDir: './src',
  outDir: './dist',
  cacheDir: './.cache/astro',
  publicDir: './public',
  compressHTML: false,
  build: {
    format: 'file',
  },
  server: {
    open: '/',
  },
  devToolbar: {
    enabled: false
  },

  /**
   * インテグレーション
   */
  integrations: [
    mdx({
      remarkPlugins: [remarkDirective, remarkCustomDirectives],
      extendMarkdownConfig: false,
      gfm: true,
    }),
  ],

  /**
   * Viteの設定
   */
  vite: {
    build: {
      minify: false,
    },
    cacheDir: './.cache/vite',
    plugins: [
      // @ts-ignore 2025-07-17時点ではエラーだが、公式のガイドに従う
      tailwindcss(),
    ],
  },
});
