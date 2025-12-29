// composables/useEventSubscriptions.ts
import { eventBus } from '@skycart/common'
import type { Flight, EventCallbacks } from '../types'

const EVENT_TYPES = {
  FLIGHT_SELECTED: 'flight:selected',
  CREW_UPDATED: 'crew:updated',
  INVENTORY_CHANGED: 'inventory:changed',
}

export function useEventSubscriptions(callbacks: EventCallbacks) {
  const unsubscribeFlightSelected = eventBus.subscribe(
    EVENT_TYPES.FLIGHT_SELECTED,
    (data: { flight: Flight }) => {
      callbacks.onFlightSelected(data.flight)
    },
  )

  const unsubscribeCrewUpdated = eventBus.subscribe(
    EVENT_TYPES.CREW_UPDATED,
    (data: { action: string }) => {
      callbacks.onCrewUpdated(data.action)
    },
  )

  const unsubscribeInventoryChanged = eventBus.subscribe(
    EVENT_TYPES.INVENTORY_CHANGED,
    (data: { action: string }) => {
      callbacks.onInventoryChanged(data.action)
    },
  )

  function cleanup() {
    unsubscribeFlightSelected()
    unsubscribeCrewUpdated()
    unsubscribeInventoryChanged()
  }

  return { cleanup }
}
