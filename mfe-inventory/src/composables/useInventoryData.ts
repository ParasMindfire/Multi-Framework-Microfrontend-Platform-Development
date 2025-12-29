// composables/useInventoryData.ts
import { ref } from 'vue'
import { eventBus, EVENT_TYPES, apiClient } from '@skycart/common'
import type { Flight, InventoryItem, AddInventoryItemPayload } from '../types/inventory'
import {
  API_ENDPOINTS,
  MESSAGES,
  INVENTORY_ACTIONS,
  DEFAULT_ITEM_CATEGORY,
} from '../constants/inventory'

export function useInventoryData() {
  const inventoryItems = ref<InventoryItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadInventory = async (flight: Flight) => {
    if (!flight) return

    try {
      loading.value = true
      error.value = null

      const response = await fetch(API_ENDPOINTS.INVENTORY(flight.id))

      if (!response.ok) {
        throw new Error(MESSAGES.FAILED_TO_LOAD)
      }

      const data = await response.json()
      inventoryItems.value = data.inventory

      // Publish initial inventory
      const totalQuantity = inventoryItems.value.reduce((sum, item) => sum + item.quantity, 0)

      eventBus.publish(EVENT_TYPES.INVENTORY_CHANGED, {
        flightId: flight.id,
        quantity: totalQuantity,
        action: INVENTORY_ACTIONS.LOADED,
      })
    } catch (err) {
      error.value = MESSAGES.FAILED_TO_LOAD
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const addItem = async (flight: Flight, item: Omit<InventoryItem, 'id' | 'flight_id'>) => {
    try {
      const payload: AddInventoryItemPayload = {
        item_name: item.item_name,
        quantity: item.quantity,
        trolley_id: item.trolley_id ?? null,
        category: item.category ?? DEFAULT_ITEM_CATEGORY,
        unit: item.unit ?? '',
        location: item.location ?? '',
      }

      const response = await apiClient.addInventoryItem(flight.id, payload)

      inventoryItems.value.push(response.item as InventoryItem)

      eventBus.publish(EVENT_TYPES.INVENTORY_CHANGED, {
        flightId: flight.id,
        itemId: response.item.id,
        quantity: response.item.quantity,
        action: INVENTORY_ACTIONS.ADDED,
      })

      return response.item
    } catch (err) {
      console.error(MESSAGES.FAILED_TO_ADD, err)
      throw new Error(MESSAGES.FAILED_TO_ADD)
    }
  }

  const removeItem = async (flight: Flight, itemId: number) => {
    try {
      await apiClient.deleteInventoryItem(flight.id, itemId)

      const index = inventoryItems.value.findIndex((item) => item.id === itemId)
      if (index > -1) {
        inventoryItems.value.splice(index, 1)
      }

      eventBus.publish(EVENT_TYPES.INVENTORY_CHANGED, {
        flightId: flight.id,
        itemId,
        action: INVENTORY_ACTIONS.REMOVED,
      })
    } catch (err) {
      console.error(MESSAGES.FAILED_TO_REMOVE, err)
      throw new Error(MESSAGES.FAILED_TO_REMOVE)
    }
  }

  const updateQuantity = async (flight: Flight, itemId: number, newQuantity: number) => {
    try {
      const item = inventoryItems.value.find((i) => i.id === itemId)
      if (!item) return

      await apiClient.updateInventoryItem(flight.id, itemId, {
        quantity: newQuantity,
        trolley_id: item.trolley_id ?? undefined,
      })

      item.quantity = newQuantity

      eventBus.publish(EVENT_TYPES.INVENTORY_CHANGED, {
        flightId: flight.id,
        itemId,
        quantity: newQuantity,
        action: INVENTORY_ACTIONS.UPDATED,
      })
    } catch (err) {
      console.error(MESSAGES.FAILED_TO_UPDATE, err)
      throw new Error(MESSAGES.FAILED_TO_UPDATE)
    }
  }

  return {
    inventoryItems,
    loading,
    error,
    loadInventory,
    addItem,
    removeItem,
    updateQuantity,
  }
}
