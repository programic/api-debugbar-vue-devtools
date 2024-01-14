import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    Vue({
      script: {
        defineModel: true,
      },
    }),
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '~/*': resolve(__dirname, 'src/*'),
      '~components': resolve(__dirname, 'src/modules/components'),
      '~layouts': resolve(__dirname, 'src/modules/layouts'),
      '~composables': resolve(__dirname, 'src/modules/composables'),
      '~icons': resolve(__dirname, 'src/modules/icons'),
      '~plugins': resolve(__dirname, 'src/modules/plugins'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
  },
});
