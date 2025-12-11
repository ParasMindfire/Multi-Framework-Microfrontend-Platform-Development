// mfe-inventory/src/wrapper.ts
import { createApp } from 'vue'
import App from './App.vue'

class InventoryElement extends HTMLElement {
  private app: any

  connectedCallback() {
    this.app = createApp(App)
    this.app.mount(this)
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.unmount()
    }
  }
}

// Register the web component
if (!customElements.get('inventory-app')) {
  customElements.define('inventory-app', InventoryElement)
}

export default InventoryElement
