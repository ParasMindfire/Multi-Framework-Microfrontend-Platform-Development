// constants/inventory.ts - All inventory-related constants

export const STORAGE_KEYS = {
  SELECTED_FLIGHT: 'selectedFlight',
} as const

export const API_ENDPOINTS = {
  INVENTORY: (flightId: number) => `http://localhost:5000/api/inventory/${flightId}`,
} as const

export const MESSAGES = {
  NO_FLIGHT_SELECTED: 'No flight selected. Please select a flight from Dashboard.',
  LOADING_INVENTORY: 'Loading inventory...',
  FAILED_TO_LOAD: 'Failed to load inventory. Please try again.',
  FAILED_TO_ADD: 'Failed to add item',
  FAILED_TO_REMOVE: 'Failed to remove item',
  FAILED_TO_UPDATE: 'Failed to update quantity',
} as const

export const DEFAULT_TROLLEYS = [
  { id: 1, name: 'Trolley A', position: { x: 50, y: 100 }, isOpen: false, items: [] },
  { id: 2, name: 'Trolley B', position: { x: 250, y: 100 }, isOpen: false, items: [] },
  { id: 3, name: 'Trolley C', position: { x: 450, y: 100 }, isOpen: false, items: [] },
] as const

export const INVENTORY_ACTIONS = {
  LOADED: 'loaded',
  ADDED: 'added',
  REMOVED: 'removed',
  UPDATED: 'updated',
} as const

export const DEFAULT_ITEM_CATEGORY = 'food' as const

export const ANIMATION_DURATIONS = {
  SPINNER: '1s',
} as const
