import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@context': '/src/context',
      '@hooks': '/src/hooks',
      src: path.resolve(__dirname, 'src'),
    },
  },
});
