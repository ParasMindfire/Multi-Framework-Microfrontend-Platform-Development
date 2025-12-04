import React, { Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Dashboard = React.lazy(() => import('dashboard/App'))

// Vue Wrapper Component
function Inventory() {
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

    // Cleanup function
    return () => {
      if (unmount) {
        unmount()
        console.log('Vue MFE unmounted')
      }
    }
  }, []) // Empty deps = mount once

  return <div ref={containerRef}></div>
}

// Svelte Wrapper Component
function Analytics() {
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

    // Cleanup function
    return () => {
      if (destroy) {
        destroy.destroy()
        console.log('Svelte MFE unmounted')
      }
    }
  }, []) // Empty deps = mount once

  return <div ref={containerRef}></div>
}

function Home() {
  return (
    <div>
      <h2>Welcome to SkyCart</h2>
      <p>Choose a microfrontend from the navigation above</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <header style={{ background: '#0066cc', color: 'white', padding: '1rem' }}>
          <h1 style={{ margin: 0 }}>🛫 SkyCart Shell</h1>
        </header>

        <nav style={{ background: '#f5f5f5', padding: '1rem', borderBottom: '1px solid #ddd' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>
            Home
          </Link>{' '}
          |
          <Link to="/dashboard" style={{ margin: '0 1rem' }}>
            Dashboard
          </Link>{' '}
          |
          <Link to="/inventory" style={{ margin: '0 1rem' }}>
            Inventory
          </Link>{' '}
          |
          <Link to="/analytics" style={{ margin: '0 1rem' }}>
            Analytics
          </Link>
        </nav>

        <main style={{ padding: '2rem' }}>
          <Suspense fallback={<div>Loading MFE…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}
