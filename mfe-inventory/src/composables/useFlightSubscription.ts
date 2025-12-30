// composables/useFlightSubscription.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { eventBus, EVENT_TYPES, type FlightSelectedEvent } from '@skycart/common'
import type { Flight } from '../types/inventory'
import { STORAGE_KEYS } from '../constants/inventory'

export function useFlightSubscription(onFlightChange: (flight: Flight) => void) {
  const selectedFlight = ref<Flight | null>(null)
  let unsubscribe: (() => void) | null = null

  onMounted(() => {
    // Load from sessionStorage
    const storedFlight = sessionStorage.getItem(STORAGE_KEYS.SELECTED_FLIGHT)
    if (storedFlight) {
      selectedFlight.value = JSON.parse(storedFlight)
      onFlightChange(selectedFlight.value!)
    }

    // Subscribe to flight selection events
    unsubscribe = eventBus.subscribe(EVENT_TYPES.FLIGHT_SELECTED, (data: unknown) => {
      const eventData = data as FlightSelectedEvent
      selectedFlight.value = eventData.flight
      sessionStorage.setItem(STORAGE_KEYS.SELECTED_FLIGHT, JSON.stringify(eventData.flight))
      onFlightChange(eventData.flight)
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    selectedFlight,
  }
}
