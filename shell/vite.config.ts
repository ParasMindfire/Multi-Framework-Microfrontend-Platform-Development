import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const dashboardUrl = env.VITE_DASHBOARD_URL || 'http://localhost:4101'
  const inventoryUrl = env.VITE_INVENTORY_URL || 'http://localhost:4300'
  const analyticsUrl = env.VITE_ANALYTICS_URL || 'http://localhost:4400'

  return {
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
            entry: `${dashboardUrl}/remoteEntry.js`,
            entryGlobalName: 'dashboard',
            shareScope: 'default',
          },
          inventory: {
            type: 'module',
            name: 'inventory',
            entry: `${inventoryUrl}/remoteEntry.js`,
            entryGlobalName: 'inventory',
            shareScope: 'default',
          },
          analytics: {
            type: 'module',
            name: 'analytics',
            entry: `${analyticsUrl}/remoteEntry.js`,
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
          '@skycart/common': { singleton: true },
        },
      }),
    ],
  }
})
