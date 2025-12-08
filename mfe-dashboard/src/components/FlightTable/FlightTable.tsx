import { formatTime } from '@skycart/common'
import type { Flight } from '@skycart/common'
import './FlightTable.css'

type SortField = 'flight_number' | 'departure_time'
type SortOrder = 'asc' | 'desc'

interface FlightTableProps {
  flights: Flight[]
  selectedFlight: Flight | null
  onFlightSelect: (flight: Flight) => void
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField) => void
}

export default function FlightTable({
  flights,
  selectedFlight,
  onFlightSelect,
  sortField,
  sortOrder,
  onSort,
}: FlightTableProps) {
  return (
    <div className="flights-table-container">
      <table className="flights-table">
        <thead>
          <tr>
            <th onClick={() => onSort('flight_number')} className="sortable">
              Flight {sortField === 'flight_number' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Origin</th>
            <th>Destination</th>
            <th onClick={() => onSort('departure_time')} className="sortable">
              Departure {sortField === 'departure_time' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>Arrival</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id} className={selectedFlight?.id === flight.id ? 'selected' : ''}>
              <td className="flight-number">{flight.flight_number}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{formatTime(flight.departure_time)}</td>
              <td>{formatTime(flight.arrival_time)}</td>
              <td>
                <button onClick={() => onFlightSelect(flight)} className="select-btn">
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
