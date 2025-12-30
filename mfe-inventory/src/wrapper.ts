import { createApp, type App as VueApp } from 'vue'
import App from './App.vue'
import './style.css'

class InventoryElement extends HTMLElement {
  private app: VueApp | null = null
  private container: HTMLDivElement | null = null

  connectedCallback() {
    this.container = document.createElement('div')
    this.container.className = 'inventory-root'
    this.appendChild(this.container)

    this.app = createApp(App)
    this.app.mount(this.container)
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.unmount()
    }
    if (this.container && this.contains(this.container)) {
      this.removeChild(this.container)
    }
  }
}

if (!customElements.get('inventory-app')) {
  customElements.define('inventory-app', InventoryElement)
}

export default InventoryElement
