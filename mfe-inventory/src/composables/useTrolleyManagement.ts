// composables/useTrolleyManagement.ts
import { ref, watch } from 'vue'
import type { Trolley, InventoryItem } from '../types/inventory'
import { DEFAULT_TROLLEYS } from '../constants/inventory'

export function useTrolleyManagement(inventoryItems: { value: InventoryItem[] }) {
  const trolleys = ref<Trolley[]>(DEFAULT_TROLLEYS.map((t) => ({ ...t, items: [] })))
  const selectedTrolley = ref<Trolley | null>(null)

  const distributeItemsToTrolleys = () => {
    trolleys.value.forEach((trolley) => {
      trolley.items = inventoryItems.value.filter((item) => item.trolley_id === trolley.id)
    })
  }

  const toggleTrolley = (trolleyId: number) => {
    const trolley = trolleys.value.find((t) => t.id === trolleyId)
    if (trolley) {
      trolley.isOpen = !trolley.isOpen

      if (trolley.isOpen) {
        selectedTrolley.value = trolley
      } else {
        if (selectedTrolley.value?.id === trolleyId) {
          selectedTrolley.value = null
        }
      }
    }
  }

  const selectTrolley = (trolley: Trolley) => {
    selectedTrolley.value = trolley
  }

  const clearSelection = () => {
    selectedTrolley.value = null
  }

  // Watch inventory changes and redistribute
  watch(
    () => inventoryItems.value,
    () => {
      distributeItemsToTrolleys()
    },
    { deep: true },
  )

  return {
    trolleys,
    selectedTrolley,
    distributeItemsToTrolleys,
    toggleTrolley,
    selectTrolley,
    clearSelection,
  }
}
