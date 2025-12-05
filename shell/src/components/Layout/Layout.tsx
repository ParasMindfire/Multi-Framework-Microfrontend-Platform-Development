import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import './Layout.css'

export default function Layout() {
  return (
    <div className="shell-container">
      <Header />
      <Navigation />
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  )
}
