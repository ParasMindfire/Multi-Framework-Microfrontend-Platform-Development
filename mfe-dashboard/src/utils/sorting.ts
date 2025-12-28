import type { Flight } from '@skycart/common'
import type { SortField, SortOrder } from '../types'

/**
 * Sorts an array of flights based on the specified field and order
 * @param flights - Array of flights to sort
 * @param field - Field to sort by
 * @param order - Sort order (ascending or descending)
 * @returns Sorted array of flights
 */
export const sortFlights = (flights: Flight[], field: SortField, order: SortOrder): Flight[] => {
  if (!Array.isArray(flights)) return []

  const sortedFlights = [...flights].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })

  return sortedFlights
}

/**
 * Filters flights based on search term
 * Searches in flight_number, origin, and destination fields
 * @param flights - Array of flights to filter
 * @param searchTerm - Term to search for
 * @returns Filtered array of flights
 */
export const filterFlights = (flights: Flight[], searchTerm: string): Flight[] => {
  if (!searchTerm.trim()) {
    return flights
  }

  const lowerSearchTerm = searchTerm.toLowerCase()

  return flights.filter(
    (flight) =>
      flight.flight_number.toLowerCase().includes(lowerSearchTerm) ||
      flight.origin.toLowerCase().includes(lowerSearchTerm) ||
      flight.destination.toLowerCase().includes(lowerSearchTerm),
  )
}
