// composables/useFlightSubscription.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { eventBus, EVENT_TYPES } from '@skycart/common'
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
    unsubscribe = eventBus.subscribe(EVENT_TYPES.FLIGHT_SELECTED, (data: any) => {
      selectedFlight.value = data.flight
      sessionStorage.setItem(STORAGE_KEYS.SELECTED_FLIGHT, JSON.stringify(data.flight))
      onFlightChange(data.flight)
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
