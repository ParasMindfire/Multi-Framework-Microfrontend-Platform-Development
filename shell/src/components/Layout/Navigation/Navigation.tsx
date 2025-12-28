import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../../constants'
import './Navigation.css'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path: string): boolean => location.pathname === path

  return (
    <nav className="shell-nav">
      {NAV_ITEMS.map((item) => (
        <Link key={item.path} to={item.path} className={isActive(item.path) ? 'active' : ''}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
