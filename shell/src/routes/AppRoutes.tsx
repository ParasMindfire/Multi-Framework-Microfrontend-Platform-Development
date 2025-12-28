import { Suspense, lazy, createElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import { Loading } from '../components/common'

/**
 * Lazy load the Dashboard MFE
 * This is a React component that's imported via Module Federation
 */
const Dashboard = lazy(() => import('dashboard/App'))

/**
 * Web component MFEs are imported to register them
 * They don't need to be lazily loaded as they're already code-split
 */
import('analytics/App')
import('inventory/App')

/**
 * Wrapper components for Web Components
 * These allow us to use custom elements in React
 */
const Analytics = () => createElement('analytics-app')
const Inventory = () => createElement('inventory-app')

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading message="Loading application..." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  )
}
