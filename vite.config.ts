import react from '@vitejs/plugin-react';
import path from 'path';
import eslint from 'vite-plugin-eslint2';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@context': '/src/context',
      src: path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
