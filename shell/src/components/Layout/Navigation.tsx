import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="shell-nav">
      <Link to="/" className={isActive('/') ? 'active' : ''}>
        Home
      </Link>
      <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
        Flight Dashboard
      </Link>
      <Link to="/crew" className={isActive('/crew') ? 'active' : ''}>
        Crew Management
      </Link>
      <Link to="/inventory" className={isActive('/inventory') ? 'active' : ''}>
        Inventory
      </Link>
      <Link to="/analytics" className={isActive('/analytics') ? 'active' : ''}>
        Analytics
      </Link>
      <Link to="/settings" className={isActive('/settings') ? 'active' : ''}>
        Settings
      </Link>
    </nav>
  )
}
