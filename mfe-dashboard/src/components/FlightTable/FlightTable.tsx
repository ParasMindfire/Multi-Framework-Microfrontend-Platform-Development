import { formatTime } from '@skycart/common'
import type { FlightTableProps } from '../../types'
import { UI_TEXT } from '../../constants'
import './FlightTable.css'

export default function FlightTable({
  flights,
  selectedFlight,
  onFlightSelect,
  sortField,
  sortOrder,
  onSort,
}: FlightTableProps) {
  const getSortIndicator = (field: string) => {
    if (sortField !== field) return ''
    return sortOrder === 'asc' ? ' ↑' : ' ↓'
  }

  return (
    <div className="flights-table-container">
      <table className="flights-table">
        <thead>
          <tr>
            <th onClick={() => onSort('flight_number')} className="sortable">
              Flight{getSortIndicator('flight_number')}
            </th>
            <th>Origin</th>
            <th>Destination</th>
            <th onClick={() => onSort('departure_time')} className="sortable">
              Departure{getSortIndicator('departure_time')}
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
                  {UI_TEXT.SELECT_BUTTON}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
