import { createApp } from 'vue'
import App from './App.vue'

export default function mount(el: HTMLElement) {
  const app = createApp(App)
  app.mount(el)

  return () => {
    app.unmount()
  }
}
