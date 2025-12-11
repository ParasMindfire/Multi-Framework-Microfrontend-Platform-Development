import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

export default defineConfig({
  server: {
    port: 4300,
    cors: true,
    strictPort: true,
  },
  preview: {
    port: 4300,
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
    vue(),
    federation({
      name: 'inventory',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/wrapper.ts',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.4.0',
        },
        '@skycart/common': { singleton: true },
      },
    }),
  ],
})
