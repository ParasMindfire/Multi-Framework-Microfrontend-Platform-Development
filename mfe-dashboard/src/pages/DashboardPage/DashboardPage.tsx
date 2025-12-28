import { useState, useMemo } from 'react'
import type { Flight } from '@skycart/common'
import type { SortField, SortOrder } from '../../types'
import { useFlights, usePagination } from '../../hooks'
import { sortFlights, filterFlights } from '../../utils/sorting'
import { FlightTable, SearchFilter, Pagination, SelectedFlightCard } from '../../components'
import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER, UI_TEXT } from '../../constants'
import './DashboardPage.css'

/**
 * Main Dashboard Page Component
 * Displays flight data with search, sort, pagination, and selection features
 */
export default function DashboardPage() {
  const { flights, loading, error, refetch } = useFlights()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>(DEFAULT_SORT_FIELD)
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  /**
   * Processes flights: filters by search term, then sorts
   */
  const processedFlights = useMemo(() => {
    const filtered = filterFlights(flights, searchTerm)
    return sortFlights(filtered, sortField, sortOrder)
  }, [flights, searchTerm, sortField, sortOrder])

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination(processedFlights)

  /**
   * Handles sorting when a column header is clicked
   * Toggles sort order if same field is clicked
   */
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight)
    sessionStorage.setItem('selectedFlight', JSON.stringify(flight))
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="spinner" />
          <p>{UI_TEXT.LOADING}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={refetch}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>{UI_TEXT.DASHBOARD_TITLE}</h2>
        <p>{UI_TEXT.DASHBOARD_SUBTITLE}</p>
      </div>

      <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} onRefresh={refetch} />

      {processedFlights.length === 0 ? (
        <p>{UI_TEXT.NO_FLIGHTS}</p>
      ) : (
        <>
          <FlightTable
            flights={paginatedData}
            selectedFlight={selectedFlight}
            onFlightSelect={handleFlightSelect}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          />

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

          {selectedFlight && <SelectedFlightCard flight={selectedFlight} />}
        </>
      )}
    </div>
  )
}
