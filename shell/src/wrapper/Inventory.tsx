import { useEffect, useRef } from 'react'

export const Inventory = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let unmount: (() => void) | null = null

    const loadVue = async () => {
      if (!containerRef.current) return

      try {
        const { default: mount } = await import('inventory/App')
        unmount = mount(containerRef.current)
        console.log('Vue MFE mounted')
      } catch (error) {
        console.error('Failed to load Vue MFE:', error)
      }
    }

    loadVue()

    return () => {
      if (unmount) {
        unmount()
        console.log('Vue MFE unmounted')
      }
    }
  }, [])

  return <div ref={containerRef}></div>
}
