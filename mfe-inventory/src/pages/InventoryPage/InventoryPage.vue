// Inventory.vue - Main container component
<template>
  <div class="inventory-container">
    <InventoryHeader :selected-flight="selectedFlight" />

    <LoadingState v-if="loading" />

    <ErrorState v-else-if="error" :error="error" :on-retry="() => loadInventory(selectedFlight!)" />

    <InventoryContent
      v-else-if="selectedFlight"
      :trolleys="trolleys"
      :inventory-items="inventoryItems"
      :selected-trolley="selectedTrolley"
      :on-toggle-trolley="toggleTrolley"
      :on-trolley-click="selectTrolley"
      :on-add-item="handleAddItem"
      :on-remove-item="handleRemoveItem"
      :on-update-quantity="handleUpdateQuantity"
      :on-back-click="clearSelection"
    />
  </div>
</template>

<script setup lang="ts">
import InventoryHeader from '../../components/InventoryHeader.vue'
import LoadingState from '../../components/LoadingState.vue'
import ErrorState from '../../components/ErrorState.vue'
import InventoryContent from '../../components/InventoryContent.vue'
import { useFlightSubscription } from '../../composables/useFlightSubscription'
import { useInventoryData } from '../../composables/useInventoryData'
import { useTrolleyManagement } from '../../composables/useTrolleyManagement'
import type { InventoryItem } from '../../types/inventory'

const { inventoryItems, loading, error, loadInventory, addItem, removeItem, updateQuantity } =
  useInventoryData()

const {
  trolleys,
  selectedTrolley,
  distributeItemsToTrolleys,
  toggleTrolley,
  selectTrolley,
  clearSelection,
} = useTrolleyManagement(inventoryItems)

const { selectedFlight } = useFlightSubscription((flight) => {
  loadInventory(flight)
  distributeItemsToTrolleys()
})

const handleAddItem = async (item: Omit<InventoryItem, 'id' | 'flight_id'>) => {
  if (!selectedFlight.value) return
  try {
    await addItem(selectedFlight.value, item)
    distributeItemsToTrolleys()
  } catch (err) {
    alert((err as Error).message)
  }
}

const handleRemoveItem = async (itemId: number) => {
  if (!selectedFlight.value) return
  try {
    await removeItem(selectedFlight.value, itemId)
    distributeItemsToTrolleys()
  } catch (err) {
    alert((err as Error).message)
  }
}

const handleUpdateQuantity = async (itemId: number, quantity: number) => {
  if (!selectedFlight.value) return
  try {
    await updateQuantity(selectedFlight.value, itemId, quantity)
  } catch (err) {
    alert((err as Error).message)
  }
}
</script>

<style scoped>
.inventory-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}
</style>
