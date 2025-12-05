export interface Flight {
  id: number
  flight_number: string
  origin: string
  destination: string
  departure_time: string
  arrival_time: string
}

export interface Crew {
  id: number
  name: string
  role: 'pilot' | 'co-pilot' | 'flight-attendant' | 'purser'
  flight_id?: number
  status: 'available' | 'assigned' | 'off-duty'
}

export interface InventoryItem {
  id: number
  flight_id: number
  item_name: string
  category: 'food' | 'beverage' | 'amenity' | 'safety'
  quantity: number
  unit: string
  location: string
}

export const EVENT_TYPES = {
  FLIGHT_SELECTED: 'flight:selected',
  CREW_UPDATED: 'crew:updated',
  INVENTORY_CHANGED: 'inventory:changed',
  THEME_CHANGED: 'theme:changed',
} as const

export interface FlightSelectedEvent {
  flight: Flight
}

export interface CrewUpdatedEvent {
  crewId: number
  flightId: number
  action: 'assigned' | 'unassigned'
}

export interface InventoryChangedEvent {
  flightId: number
  itemId: number
  quantity: number
  action: 'added' | 'removed' | 'updated'
}
