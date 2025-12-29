import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // Import global styles

class InventoryElement extends HTMLElement {
  private app: any
  private container: HTMLDivElement | null = null

  connectedCallback() {
    // Create a container div - this is KEY for Vue styles to work
    this.container = document.createElement('div')
    this.container.className = 'inventory-root'
    this.appendChild(this.container)

    // Mount to the container, not to 'this'
    this.app = createApp(App)
    this.app.mount(this.container) // ✅ Styles will work
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
