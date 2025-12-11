export interface Flight {
  id: number
  flight_number: string
  origin: string
  destination: string
  departure_time: string
  arrival_time: string
}

// in mfe-inventory
export interface InventoryItem {
  id: number
  flight_id: number
  item_name: string
  quantity: number
  category?: string
  unit?: string
  location?: string
  trolley_id?: number | null
  drawer_id?: number | null
}

// in mfe-inventory
export interface Trolley {
  id: number
  name: string
  position: { x: number; y: number }
  isOpen: boolean
  items: InventoryItem[]
  drawers?: { isOpen: boolean }[]
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

export interface InventoryChangedEvent {
  flightId: number
  itemId: number
  quantity: number
  action: 'added' | 'removed' | 'updated'
}
