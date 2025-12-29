// types.ts - Shared types
export interface Flight {
  id: number
  flight_number: string
  origin: string
  destination: string
  departure_time: string
  arrival_time: string
}

export interface InventoryItem {
  id: number
  flight_id: number
  item_name: string
  quantity: number
  trolley_id: number
  drawer_id: number | null
}

export interface TrolleyData {
  trolley1: number
  trolley2: number
  trolley3: number
}

export interface Activity {
  time: string
  action: string
}

export interface EventCallbacks {
  onFlightSelected: (flight: Flight) => void
  onCrewUpdated: (action: string) => void
  onInventoryChanged: (action: string) => void
}

export interface ChartGridProps {
  flightActivities: Activity[]
  trolleyData: TrolleyData
  crewCount: number
}

export interface CrewChartProps {
  count: number
}

export interface FlightChartProps {
  activities: Array<{ time: string; action: string }>
}

export interface FlightInfoProps {
  flight: Flight
}

export interface InventoryDeviationProps {
  trolleyData: {
    trolley1: number
    trolley2: number
    trolley3: number
  }
}
