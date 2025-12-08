// mfe-inventory/src/types.ts
export interface InventoryItem {
  id: number
  flight_id: number
  item_name: string
  quantity: number
  category?: string
  unit?: string
  location?: string
  trolley_id?: number | null
}

export interface Trolley {
  id: number
  name: string
  position: { x: number; y: number }
  isOpen: boolean
  items: InventoryItem[]
  drawers?: { isOpen: boolean }[]
}
