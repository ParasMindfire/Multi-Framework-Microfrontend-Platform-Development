import App from './App.svelte'
import { mount as svelteMount, unmount as svelteUnmount } from 'svelte'

type LegacyInstance = {
  $destroy?: () => void
  $$?: { destroy: () => void }
}

type ModernInstance = {}

type SvelteInstance = LegacyInstance | ModernInstance

export default function mountApp(target: HTMLElement, props: Record<string, unknown> = {}) {
  if (target) target.innerHTML = ''

  let instance: SvelteInstance

  try {
    instance = svelteMount(App as never, { target, props }) as SvelteInstance
  } catch {
    instance = new (App as unknown as new (args: unknown) => SvelteInstance)({
      target,
      props,
    })
  }

  return {
    destroy() {
      try {
        cleanup(instance)
      } finally {
        target.innerHTML = ''
      }
    },
  }
}

function cleanup(instance: SvelteInstance) {
  try {
    svelteUnmount(instance as never)
    return
  } catch {}

  if ('$destroy' in instance && typeof instance.$destroy === 'function') {
    instance.$destroy()
    return
  }

  if ('$$' in instance && instance.$$?.destroy) {
    instance.$$.destroy()
  }
}
