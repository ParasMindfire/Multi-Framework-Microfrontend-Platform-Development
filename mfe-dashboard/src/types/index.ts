import type { Flight } from '@skycart/common'

export type SortField = 'flight_number' | 'departure_time'
export type SortOrder = 'asc' | 'desc'

export interface FlightTableProps {
  flights: Flight[]
  selectedFlight: Flight | null
  onFlightSelect: (flight: Flight) => void
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
}

export interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface SelectedFlightCardProps {
  flight: Flight
}

export interface UsePaginationResult {
  currentPage: number
  totalPages: number
  paginatedData: Flight[]
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
}

export interface UseFlightsResult {
  flights: Flight[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}
