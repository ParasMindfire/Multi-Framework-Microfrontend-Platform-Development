// types/inventory.ts - All inventory-related types

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
  trolley_id: number | null
  drawer_id?: number | null
  category?: string
  unit?: string
  location?: string
}

export interface AddInventoryItemPayload {
  item_name: string
  quantity: number
  trolley_id: number | null
  category: string
  unit: string
  location: string
}

export interface Trolley {
  id: number
  name: string
  position: { x: number; y: number }
  isOpen: boolean
  items: InventoryItem[]
}

// Component Props Interfaces

export interface InventoryHeaderProps {
  selectedFlight: Flight | null
}

export interface LoadingStateProps {
  message?: string
}

export interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export interface GalleyLayoutProps {
  trolleys: Trolley[]
  onToggleTrolley: (trolleyId: number) => void
  onTrolleyClick: (trolley: Trolley) => void
}

export interface InventoryListProps {
  items: InventoryItem[]
  selectedTrolley: Trolley | null
  onAddItem: (item: Omit<InventoryItem, 'id' | 'flight_id'>) => void
  onRemoveItem: (itemId: number) => void
  onUpdateQuantity: (itemId: number, quantity: number) => void
}

export interface InventoryContentProps {
  trolleys: Trolley[]
  inventoryItems: InventoryItem[]
  selectedTrolley: Trolley | null
  onToggleTrolley: (trolleyId: number) => void
  onTrolleyClick: (trolley: Trolley) => void
  onAddItem: (item: Omit<InventoryItem, 'id' | 'flight_id'>) => void
  onRemoveItem: (itemId: number) => void
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onBackClick: () => void
}

export interface BackButtonProps {
  onClick: () => void
}
