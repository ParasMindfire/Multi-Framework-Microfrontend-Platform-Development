import type { Flight, InventoryItem } from './types'

const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    try {
      // @ts-ignore - env might not exist
      return import.meta?.env?.VITE_API_URL || 'http://localhost:5000'
    } catch {
      return 'http://localhost:5000'
    }
  }
  return 'http://localhost:5000'
}

const API_BASE_URL = getApiBaseUrl()

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  async getFlights(): Promise<{ flights: Flight[] }> {
    return this.fetch<{ flights: Flight[] }>('/api/flights')
  }

  async getInventory(flightId: number): Promise<{ inventory: InventoryItem[] }> {
    return this.fetch<{ inventory: InventoryItem[] }>(`/api/inventory/${flightId}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
