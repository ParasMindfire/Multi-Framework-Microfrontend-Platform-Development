// apps/shell/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  server: { port: 3000 },
  build: {
    target: 'esnext',
  },
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        dashboard: {
          type: 'module',
          name: 'dashboard',
          entry: 'http://localhost:4101/remoteEntry.js',
          entryGlobalName: 'dashboard',
          shareScope: 'default',
        },
        inventory: {
          type: 'module',
          name: 'inventory',
          entry: 'http://localhost:4300/remoteEntry.js',
          entryGlobalName: 'inventory',
          shareScope: 'default',
        },
        analytics: {
          type: 'module',
          name: 'analytics',
          entry: 'http://localhost:4400/remoteEntry.js',
          entryGlobalName: 'analytics',
          shareScope: 'default',
        },
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
      },
    }),
  ],
})
