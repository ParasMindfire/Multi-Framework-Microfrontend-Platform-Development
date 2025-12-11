import { useState, useEffect } from 'react'
import { apiClient, eventBus, EVENT_TYPES } from '@skycart/common'
import type { Flight } from '@skycart/common'
import FlightTable from '../../components/FlightTable/FlightTable'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import Pagination from '../../components/Pagination/Pagination'
import SelectedFlightCard from '../../components/SelectedFlightCard/SelectedFlightCard'
import './DashboardPage.css'

type SortField = 'flight_number' | 'departure_time'
type SortOrder = 'asc' | 'desc'

export default function DashboardPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('departure_time')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)

  const itemsPerPage = 10

  useEffect(() => {
    loadFlights()
  }, [])

  const loadFlights = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getFlights()
      setFlights(data.flights)
      setError(null)
    } catch (err) {
      setError('Failed to load flights. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight)
    sessionStorage.setItem('selectedFlight', JSON.stringify(flight))
    eventBus.publish(EVENT_TYPES.FLIGHT_SELECTED, { flight })
    console.log('✈️ Flight selected event published:', flight)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredFlights = flights
    .filter((flight) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        flight.flight_number.toLowerCase().includes(searchLower) ||
        flight.origin.toLowerCase().includes(searchLower) ||
        flight.destination.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      let comparison = 0

      if (sortField === 'flight_number') {
        comparison = a.flight_number.localeCompare(b.flight_number)
      } else if (sortField === 'departure_time') {
        comparison = new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime()
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFlights = filteredFlights.slice(startIndex, startIndex + itemsPerPage)

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading flights...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={loadFlights}>Retry</button>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Flight Dashboard</h2>
        <p>Manage and monitor flight operations</p>
      </header>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={loadFlights}
      />

      <FlightTable
        flights={paginatedFlights}
        selectedFlight={selectedFlight}
        onFlightSelect={handleFlightSelect}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {selectedFlight && <SelectedFlightCard flight={selectedFlight} />}
    </div>
  )
}
