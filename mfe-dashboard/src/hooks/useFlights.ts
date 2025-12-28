import { useState, useEffect, useCallback } from 'react'
import type { Flight } from '@skycart/common'
import type { UseFlightsResult } from '../types'
import { fetchFlights } from '../services/api'

/**
 * Custom hook to fetch and manage flights data
 * @returns Object containing flights, loading state, error, and refetch function
 */
export const useFlights = (): UseFlightsResult => {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFlights = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchFlights()
      console.log('set data ', data)
      setFlights(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFlights()
  }, [loadFlights])

  return {
    flights,
    loading,
    error,
    refetch: loadFlights,
  }
}
