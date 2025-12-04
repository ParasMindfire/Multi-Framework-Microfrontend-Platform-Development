declare module 'dashboard/App' {
  const Component: React.ComponentType
  export default Component
}

declare module 'inventory/App' {
  const mount: (el: HTMLElement) => () => void
  export default mount
}

declare module 'analytics/App' {
  const mount: (target: HTMLElement) => { destroy: () => void }
  export default mount
}
