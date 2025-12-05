import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import { EventBusProvider } from '@skycart/common'
import Header from './components/Layout/Header'
import Navigation from './components/Layout/Navigation'
import { Analytics } from './wrapper/Analytics'
import { Inventory } from './wrapper/Inventory'
import { Dashboard } from './wrapper/Dashboard'

export default function App() {
  return (
    <EventBusProvider>
      <BrowserRouter>
        <div style={{ fontFamily: 'system-ui, sans-serif' }}>
          <Header />
          <Navigation />
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
    </EventBusProvider>
  )
}
