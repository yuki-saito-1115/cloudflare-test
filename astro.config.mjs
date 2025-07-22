// @ts-check

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

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
    enabled: false,
  },

  output: 'static',
  adapter: cloudflare(),

  /**
   * インテグレーション
   */
  integrations: [],

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
