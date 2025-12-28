/**
 * API Configuration
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export const API_ENDPOINTS = {
  FLIGHTS: '/api/flights',
} as const

/**
 * Pagination Configuration
 */
export const ITEMS_PER_PAGE = 10

/**
 * Sort Configuration
 */
export const DEFAULT_SORT_FIELD = 'departure_time' as const
export const DEFAULT_SORT_ORDER = 'asc' as const

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to load flights. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const

/**
 * UI Text
 */
export const UI_TEXT = {
  DASHBOARD_TITLE: 'Flight Dashboard',
  DASHBOARD_SUBTITLE: 'Manage and monitor all flight operations',
  LOADING: 'Loading flights...',
  NO_FLIGHTS: 'No flights found',
  SEARCH_PLACEHOLDER: 'Search by flight number, origin, or destination...',
  REFRESH_BUTTON: '↻ Refresh',
  SELECT_BUTTON: 'Select',
  SELECTED_FLIGHT_TITLE: 'Selected Flight',
} as const
