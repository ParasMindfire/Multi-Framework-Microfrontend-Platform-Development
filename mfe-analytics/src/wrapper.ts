// mfe-analytics/src/wrapper.ts
import App from './App.svelte'
import { mount, unmount } from 'svelte'

class AnalyticsElement extends HTMLElement {
  private instance: any

  connectedCallback() {
    this.instance = mount(App, { target: this })
  }

  disconnectedCallback() {
    if (this.instance) {
      unmount(this.instance)
    }
  }
}

// Register the web component
if (!customElements.get('analytics-app')) {
  customElements.define('analytics-app', AnalyticsElement)
}

export default AnalyticsElement
