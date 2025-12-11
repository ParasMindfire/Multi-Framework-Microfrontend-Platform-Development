import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { federation } from '@module-federation/vite'

export default defineConfig({
  server: {
    port: 4400,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 4400,
    cors: true,
    strictPort: true,
  },
  base: '/',
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
    svelte(),
    federation({
      name: 'analytics',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/wrapper.ts',
      },
      shared: {
        svelte: {
          singleton: true,
          requiredVersion: '^5.0.0',
        },
      },
    }),
  ],
})
