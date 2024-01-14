import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 80,
    watch: {
      usePolling: true,
    },
  },

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '~/*': resolve(__dirname, 'src/*'),
      '~composables': resolve(__dirname, 'src/modules/composables'),
    },
  },

  build: {
    emptyOutDir: false,
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  plugins: [
    Vue(),
    viteSingleFile(),
  ],
});
