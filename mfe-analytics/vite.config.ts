import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { federation } from '@module-federation/vite'

export default defineConfig({
  server: {
    port: 4400,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
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
