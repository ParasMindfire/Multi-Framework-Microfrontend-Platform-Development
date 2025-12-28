import type { Flight } from '@skycart/common'
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '../constants'

/**
 * Fetches all flights from the API
 * @returns Promise resolving to array of flights
 * @throws Error if the fetch fails
 */
export const fetchFlights = async (): Promise<Flight[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FLIGHTS}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.flights
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
    }
    throw new Error(ERROR_MESSAGES.FETCH_FAILED)
  }
}
