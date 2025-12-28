// apps/shell/src/App.tsx
import { Suspense, lazy, createElement, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Layout/Header'
import Navigation from './components/Layout/Navigation'

// Get URLs from environment variables
const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:4101'
const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL || 'http://localhost:4400'
const INVENTORY_URL = import.meta.env.VITE_INVENTORY_URL || 'http://localhost:4300'

const Dashboard = lazy(() => import('dashboard/App'))

// Import to register web components
import('analytics/App')
import('inventory/App')

// Wrapper component that loads CSS
const DashboardWithStyles = () => {
  return <Dashboard />
}

const Analytics = () => createElement('analytics-app')
const Inventory = () => createElement('inventory-app')

// Helper function to load CSS
const loadRemoteCSS = (url: string, id: string) => {
  // Check if already loaded
  if (document.getElementById(id)) return

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = url
  link.onerror = () => {
    console.error(`Failed to load CSS from ${url}`)
  }
  document.head.appendChild(link)
}

export default function App() {
  useEffect(() => {
    // Load all remote CSS files
    loadRemoteCSS(`${DASHBOARD_URL}/assets/index.css`, 'dashboard-styles')
    loadRemoteCSS(`${ANALYTICS_URL}/assets/index.css`, 'analytics-styles')
    loadRemoteCSS(`${INVENTORY_URL}/assets/index.css`, 'inventory-styles')
  }, [])

  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Header />
        <Navigation />
        <main style={{ padding: '2rem' }}>
          <Suspense fallback={<div>Loading MFE…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardWithStyles />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}
