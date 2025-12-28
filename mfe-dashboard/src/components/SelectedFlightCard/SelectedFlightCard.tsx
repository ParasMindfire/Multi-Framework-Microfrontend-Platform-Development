import { formatTime } from '@skycart/common'
import type { SelectedFlightCardProps } from '../../types'
import { UI_TEXT } from '../../constants'
import './SelectedFlightCard.css'

export default function SelectedFlightCard({ flight }: SelectedFlightCardProps) {
  return (
    <div className="selected-flight-card">
      <h3>{UI_TEXT.SELECTED_FLIGHT_TITLE}</h3>
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
