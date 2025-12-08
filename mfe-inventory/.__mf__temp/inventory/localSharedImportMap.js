// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

import { loadShare } from '@module-federation/runtime'
const importMap = {
  '@skycart/common': async () => {
    let pkg =
      await import('__mf__virtual/inventory__prebuild___mf_0_skycart_mf_1_common__prebuild__.js')
    return pkg
  },
  vue: async () => {
    let pkg = await import('__mf__virtual/inventory__prebuild__vue__prebuild__.js')
    return pkg
  },
}
const usedShared = {
  '@skycart/common': {
    name: '@skycart/common',
    version: '1.0.0',
    scope: ['default'],
    loaded: false,
    from: 'inventory',
    async get() {
      if (false) {
        throw new Error(`Shared module '${'@skycart/common'}' must be provided by host`)
      }
      usedShared['@skycart/common'].loaded = true
      const { '@skycart/common': pkgDynamicImport } = importMap
      const res = await pkgDynamicImport()
      const exportModule = { ...res }
      // All npm packages pre-built by vite will be converted to esm
      Object.defineProperty(exportModule, '__esModule', {
        value: true,
        enumerable: false,
      })
      return function () {
        return exportModule
      }
    },
    shareConfig: {
      singleton: true,
      requiredVersion: '^1.0.0',
    },
  },
  vue: {
    name: 'vue',
    version: '3.5.25',
    scope: ['default'],
    loaded: false,
    from: 'inventory',
    async get() {
      if (false) {
        throw new Error(`Shared module '${'vue'}' must be provided by host`)
      }
      usedShared['vue'].loaded = true
      const { vue: pkgDynamicImport } = importMap
      const res = await pkgDynamicImport()
      const exportModule = { ...res }
      // All npm packages pre-built by vite will be converted to esm
      Object.defineProperty(exportModule, '__esModule', {
        value: true,
        enumerable: false,
      })
      return function () {
        return exportModule
      }
    },
    shareConfig: {
      singleton: true,
      requiredVersion: '^3.4.0',
    },
  },
}
const usedRemotes = []
export { usedShared, usedRemotes }
