import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

export default defineConfig({
  server: {
    port: 4300,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
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
    }) as any,
  ] as any,
})
