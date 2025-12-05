import { useEffect, useRef } from 'react'

export const Analytics = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let destroy: { destroy: () => void } | null = null

    const loadSvelte = async () => {
      if (!containerRef.current) return

      try {
        const { default: mount } = await import('analytics/App')
        destroy = mount(containerRef.current)
        console.log('Svelte MFE mounted')
      } catch (error) {
        console.error('Failed to load Svelte MFE:', error)
      }
    }

    loadSvelte()

    return () => {
      if (destroy) {
        destroy.destroy()
        console.log('Svelte MFE unmounted')
      }
    }
  }, [])

  return <div ref={containerRef}></div>
}
