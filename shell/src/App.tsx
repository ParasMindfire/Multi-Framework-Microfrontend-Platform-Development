import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Header, Navigation } from './components/Layout'
import AppRoutes from './routes/AppRoutes'
import { loadAllRemoteStyles } from './utils/styleLoader'

/**
 * Main Shell Application Component
 * Loads remote MFE stylesheets and renders the application
 */
export default function App() {
  useEffect(() => {
    /**
     * Load all remote MFE stylesheets on mount
     * This ensures proper styling for all federated modules
     */
    loadAllRemoteStyles().catch((error) => {
      console.error('Failed to load remote styles:', error)
    })
  }, [])

  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Header />
        <Navigation />
        <main style={{ padding: '2rem' }}>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}
