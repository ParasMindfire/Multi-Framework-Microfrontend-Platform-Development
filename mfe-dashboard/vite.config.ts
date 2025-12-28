// apps/dashboard/vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  base: './',
  server: {
    port: 4101,
    cors: true,
    strictPort: true,
    origin: 'http://localhost:4101',
    headers: {
      // Prevent caching during development
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
  preview: {
    port: 4101,
    cors: true,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'es',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'assets/index.css'
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  plugins: [
    react(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App.tsx', './style': './src/style-url.ts' },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@skycart/common': { singleton: true },
      },
    }),
  ],
})
