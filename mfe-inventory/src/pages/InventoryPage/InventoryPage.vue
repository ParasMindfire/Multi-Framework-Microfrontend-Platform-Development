<template>
  <div class="inventory-container">
    <header class="inventory-header">
      <h2>Inventory & Galley Management</h2>
      <p v-if="selectedFlight">
        Flight: <strong>{{ selectedFlight.flight_number }}</strong> ({{ selectedFlight.origin }} →
        {{ selectedFlight.destination }})
      </p>
      <p v-else class="no-flight">No flight selected. Please select a flight from Dashboard.</p>
    </header>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading inventory...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadInventory">Retry</button>
    </div>

    <div v-else-if="selectedFlight" class="inventory-content">
      <div class="galley-section">
        <h3>Galley Layout</h3>
        <GalleyLayout
          :trolleys="trolleys"
          @toggle-trolley="toggleTrolley"
          @trolley-click="selectTrolley"
        />
      </div>

      <div class="inventory-section">
        <div v-if="selectedTrolley" class="back-button-container">
          <button @click="selectedTrolley = null" class="back-btn">← Back to All Items</button>
        </div>

        <InventoryList
          :items="inventoryItems"
          :selected-trolley="selectedTrolley"
          @add-item="handleAddItem"
          @remove-item="handleRemoveItem"
          @update-quantity="handleUpdateQuantity"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventBus, EVENT_TYPES, apiClient } from '@skycart/common'
import type { Flight } from '@skycart/common'
import type { InventoryItem, Trolley } from '../../types'
import GalleyLayout from '../../components/GalleyLayout/GalleyLayout.vue'
import InventoryList from '../../components/InventoryList/InventoryList.vue'

const selectedFlight = ref<Flight | null>(null)
const inventoryItems = ref<InventoryItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const selectedTrolley = ref<Trolley | null>(null)

const trolleys = ref<Trolley[]>([
  { id: 1, name: 'Trolley A', position: { x: 50, y: 100 }, isOpen: false, items: [] },
  { id: 2, name: 'Trolley B', position: { x: 250, y: 100 }, isOpen: false, items: [] },
  { id: 3, name: 'Trolley C', position: { x: 450, y: 100 }, isOpen: false, items: [] },
])

let unsubscribe: (() => void) | null = null

onMounted(() => {
  const storedFlight = sessionStorage.getItem('selectedFlight')
  if (storedFlight) {
    selectedFlight.value = JSON.parse(storedFlight)
    loadInventory()
  }

  unsubscribe = eventBus.subscribe(EVENT_TYPES.FLIGHT_SELECTED, (data: any) => {
    selectedFlight.value = data.flight
    loadInventory()
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})

const loadInventory = async () => {
  if (!selectedFlight.value) return

  try {
    loading.value = true
    error.value = null

    const response = await fetch(`http://localhost:5000/api/inventory/${selectedFlight.value.id}`)

    if (!response.ok) {
      throw new Error('Failed to load inventory')
    }

    const data = await response.json()
    inventoryItems.value = data.inventory

    distributeItemsToTrolleys()

    // Publish initial inventory
    const totalQuantity = inventoryItems.value.reduce((sum, item) => sum + item.quantity, 0)

    eventBus.publish(EVENT_TYPES.INVENTORY_CHANGED, {
      flightId: selectedFlight.value.id,
      quantity: totalQuantity,
      action: 'loaded',
    })
  } catch (err) {
    error.value = 'Failed to load inventory. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

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

const handleAddItem = async (item: InventoryItem) => {
  try {
    const response = await apiClient.addInventoryItem(selectedFlight.value!.id, {
      item_name: item.item_name,
      quantity: item.quantity,
      trolley_id: item.trolley_id || null,
      category: 'food',
      unit: '',
      location: '',
    })
    inventoryItems.value.push(response.item)
    distributeItemsToTrolleys()
    eventBus.publish(EVENT_TYPES.INVENTORY_CHANGED, {
      flightId: selectedFlight.value?.id,
      itemId: response.item.id,
      quantity: response.item.quantity,
      action: 'added',
    })
  } catch (err) {
    console.error('Failed to add item:', err)
    alert('Failed to add item')
  }
}

const handleRemoveItem = async (itemId: number) => {
  try {
    await apiClient.deleteInventoryItem(selectedFlight.value!.id, itemId)
    const index = inventoryItems.value.findIndex((item) => item.id === itemId)
    if (index > -1) {
      inventoryItems.value.splice(index, 1)
      distributeItemsToTrolleys()
    }
  } catch (err) {
    console.error('Failed to remove item:', err)
    alert('Failed to remove item')
  }
}

const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
  try {
    const item = inventoryItems.value.find((i) => i.id === itemId)
    if (!item) return

    await apiClient.updateInventoryItem(selectedFlight.value!.id, itemId, {
      quantity: newQuantity,
      trolley_id: item.trolley_id === null ? undefined : item.trolley_id,
    })
    item.quantity = newQuantity
  } catch (err) {
    console.error('Failed to update quantity:', err)
    alert('Failed to update quantity')
  }
}
</script>

<style scoped>
.back-button-container {
  margin-bottom: 1rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.back-btn:hover {
  background: #4b5563;
}

.inventory-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.inventory-header h2 {
  color: #24292e;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
}

.inventory-header p {
  color: #586069;
  margin-bottom: 1rem;
}

.no-flight {
  color: #f59e0b;
  font-weight: 500;
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #10b981;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error button {
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.error button:hover {
  background: #059669;
}

.inventory-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.galley-section h3,
.inventory-section h3 {
  color: #24292e;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.item-card {
  /* existing styles */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.item-card:hover {
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  border-color: #10b981;
}

.summary {
  /* existing styles */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

@media (max-width: 1024px) {
  .inventory-content {
    grid-template-columns: 1fr;
  }
}
</style>
