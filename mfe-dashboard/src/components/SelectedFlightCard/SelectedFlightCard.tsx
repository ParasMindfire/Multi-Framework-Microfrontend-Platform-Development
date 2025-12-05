import { formatTime } from '@skycart/common'
import type { Flight } from '@skycart/common'
import './SelectedFlightCard.css'

interface SelectedFlightCardProps {
  flight: Flight
}

export default function SelectedFlightCard({ flight }: SelectedFlightCardProps) {
  return (
    <div className="selected-flight-card">
      <h3>Selected Flight</h3>
      <div className="flight-details">
        <div className="detail-item">
          <strong>Flight Number</strong>
          <p>{flight.flight_number}</p>
        </div>
        <div className="detail-item">
          <strong>Route</strong>
          <p>
            {flight.origin} → {flight.destination}
          </p>
        </div>
        <div className="detail-item">
          <strong>Departure</strong>
          <p>{formatTime(flight.departure_time)}</p>
        </div>
        <div className="detail-item">
          <strong>Arrival</strong>
          <p>{formatTime(flight.arrival_time)}</p>
        </div>
      </div>
    </div>
  )
}
