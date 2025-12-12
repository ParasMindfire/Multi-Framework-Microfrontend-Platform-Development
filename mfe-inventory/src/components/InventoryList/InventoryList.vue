<template>
  <div class="inventory-list">
    <div class="list-header">
      <h3>
        {{ selectedTrolley ? `${selectedTrolley.name} Items` : 'All Items' }}
      </h3>
      <button @click="showAddForm = !showAddForm" class="add-btn">
        {{ showAddForm ? '✕ Cancel' : '+ Add Item' }}
      </button>
    </div>

<div v-if="showAddForm" class="add-form">
  <input
    v-model="newItem.item_name"
    type="text"
    placeholder="Item name"
    class="form-input"
  />
  <input
    v-model.number="newItem.quantity"
    type="number"
    placeholder="Quantity"
    class="form-input"
    min="1"
  />

  <select 
    v-if="!selectedTrolley" 
    v-model="newItem.trolley_id" 
    class="form-input"
  >
    <option :value="null">Unassigned</option>
    <option :value="1">Trolley A</option>
    <option :value="2">Trolley B</option>
    <option :value="3">Trolley C</option>
  </select>
  
  <button @click="handleAdd" class="submit-btn">Add</button>
</div>
    <div class="items-container">
      <div
        v-for="item in displayedItems"
        :key="item.id"
        class="item-card"
      >
        <div class="item-info">
          <h4>{{ item.item_name }}</h4>
          <div class="quantity-controls">
            <button
              @click="decrementQuantity(item)"
              class="qty-btn"
              :disabled="item.quantity <= 1"
            >
              −
            </button>
            <input
              v-model.number="item.quantity"
              type="number"
              class="qty-input"
              min="1"
              @change="handleQuantityChange(item)"
            />
            <button
              @click="incrementQuantity(item)"
              class="qty-btn"
            >
              +
            </button>
          </div>
        </div>
        
        <button
          @click="handleRemove(item.id)"
          class="remove-btn"
          title="Remove item"
        >
          🗑️
        </button>
      </div>

      <p v-if="displayedItems.length === 0" class="no-items">
        No items in inventory
      </p>
    </div>

    <div v-if="showConfirmModal" class="modal-overlay" @click.self="cancelRemove">
      <div class="modal">
        <h4>Remove item</h4>
        <p>Are you sure you want to remove this item from inventory?</p>

        <div class="modal-actions">
          <button @click="cancelRemove" class="btn-cancel">Cancel</button>
          <button @click="confirmRemove" class="btn-confirm">Remove</button>
        </div>
      </div>
    </div>


    <div class="summary">
      <p><strong>Total Items:</strong> {{ displayedItems.length }}</p>
      <p><strong>Total Quantity:</strong> {{ totalQuantity }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { InventoryItem, Trolley } from '../../types'

const props = defineProps<{
  items: InventoryItem[]
  selectedTrolley: Trolley | null
}>()

const emit = defineEmits<{
  addItem: [item: InventoryItem]
  removeItem: [itemId: number]
  updateQuantity: [itemId: number, quantity: number]
}>()

const showAddForm = ref(false)
const showConfirmModal = ref(false)
const itemToRemove = ref<number | null>(null)

const newItem = ref({
  item_name: '',
  quantity: 1,
  trolley_id: null as number | null,
})

const displayedItems = computed(() => {
  if (props.selectedTrolley) {
    return props.selectedTrolley.items
  }
  return props.items
})

const totalQuantity = computed(() => {
  return displayedItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const handleAdd = () => {
  if (!newItem.value.item_name.trim()) {
    alert('Please enter an item name')
    return
  }

  const item: InventoryItem = {
    id: Date.now(),
    flight_id: 0,
    item_name: newItem.value.item_name,
    quantity: newItem.value.quantity,
    trolley_id: props.selectedTrolley?.id || newItem.value.trolley_id,
  }

  emit('addItem', item)

  newItem.value = {
    item_name: '',
    quantity: 1,
    trolley_id: null, 
  }
  showAddForm.value = false
}

const handleRemove = (itemId: number) => {
  itemToRemove.value = itemId
  showConfirmModal.value = true
}

const cancelRemove = () => {
  itemToRemove.value = null
  showConfirmModal.value = false
}

const confirmRemove = () => {
  if (itemToRemove.value !== null) {
    emit('removeItem', itemToRemove.value)
  }
  cancelRemove()
}

const incrementQuantity = (item: InventoryItem) => {
  item.quantity++
  emit('updateQuantity', item.id, item.quantity)
}

const decrementQuantity = (item: InventoryItem) => {
  if (item.quantity > 1) {
    item.quantity--
    emit('updateQuantity', item.id, item.quantity)
  }
}

const handleQuantityChange = (item: InventoryItem) => {
  if (item.quantity < 1) {
    item.quantity = 1
  }
  emit('updateQuantity', item.id, item.quantity)
}
</script>

<style scoped>
.inventory-list {
  background: #f6f8fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.list-header h3 {
  color: #24292e;
  font-size: 1.25rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #059669;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
}

.submit-btn {
  padding: 0.5rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.submit-btn:hover {
  background: #059669;
}

.items-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.item-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.item-info {
  flex: 1;
}

.item-info h4 {
  color: #24292e;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 30px;
  height: 30px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background: #059669;
}

.qty-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.qty-input {
  width: 60px;
  padding: 0.25rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.9rem;
}

.qty-input:focus {
  outline: none;
  border-color: #10b981;
}

.remove-btn {
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.remove-btn:hover {
  transform: scale(1.2);
}

.no-items {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
  font-style: italic;
}

.summary {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-around;
  border-top: 2px solid #10b981;
}

.summary p {
  color: #24292e;
  font-size: 0.95rem;
}

.summary strong {
  color: #10b981;
}

.remove-btn {
  padding: 0.5rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fcc;
  transform: scale(1.2);
  border-color: #f99;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 1000;
}

.modal {
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.modal h4 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}

.modal p {
  margin: 0 0 1rem;
  color: #374151;
  font-size: 0.95rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #e5e7eb;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-confirm {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
}

</style>