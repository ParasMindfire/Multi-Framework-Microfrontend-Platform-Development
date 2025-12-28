import type { NavItem, FeatureCardData } from '../types'

export const APP_TITLE = 'SkyCart Operations'

export const USER_NAME = 'Paras'

export const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/dashboard', label: 'Flight Dashboard' },
  { path: '/inventory', label: 'Inventory' },
  { path: '/analytics', label: 'Analytics' },
]

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    icon: '✈️',
    title: 'Flight Dashboard',
    description: 'View and manage flight schedules, filter and sort operations',
  },
  {
    icon: '👥',
    title: 'Crew Management',
    description: 'Assign crew members to flights and manage assignments',
  },
  {
    icon: '📦',
    title: 'Inventory',
    description: 'Track galley items and manage in-flight inventory',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'View real-time charts and operational insights',
  },
]

/**
 * Remote MFE URLs for different environments
 * These are loaded from environment variables
 */
export const REMOTE_URLS = {
  dashboard: import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:4101',
  inventory: import.meta.env.VITE_INVENTORY_URL || 'http://localhost:4300',
  analytics: import.meta.env.VITE_ANALYTICS_URL || 'http://localhost:4400',
} as const
