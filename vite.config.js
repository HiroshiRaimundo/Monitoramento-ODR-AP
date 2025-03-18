
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query'
          ],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: "::",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
