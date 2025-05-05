import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from '@tailwindcss/vite';
import { URL, fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue(), tailwind()],
  clearScreen: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    target: 'esnext',
  },
});
