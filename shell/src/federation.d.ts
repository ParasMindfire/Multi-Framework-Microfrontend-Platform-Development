// apps/shell/src/vite-env.d.ts
/// <reference types="vite/client" />

declare module 'dashboard/App' {
  const Component: React.ComponentType
  export default Component
}

declare module 'dashboard/style' {
  export const styleUrl: string
}

declare module 'inventory/App' {
  export default class InventoryElement extends HTMLElement {}
}

declare module 'analytics/App' {
  export default class AnalyticsElement extends HTMLElement {}
}

// Tell React about custom elements
declare namespace JSX {
  interface IntrinsicElements {
    'inventory-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    'analytics-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}
