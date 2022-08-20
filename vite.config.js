import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    svelte(),
    // Copy tdweb files with dev server support
    // https://github.com/sapphi-red/vite-plugin-static-copy
    viteStaticCopy({
      targets: [
        {
          src: ['tdweb/dist/**/*', '!**/tdweb.js'],
          dest: '.',
        },
      ],
    }),
  ],
  assetsInclude: ['**/*.worker.js, **/*.wasm'],
  optimizeDeps: {
    include: ['tdweb'],
  },
  build: {
    commonjsOptions: {
      include: [/tdweb/, /node_modules/],
    },
  },
});
