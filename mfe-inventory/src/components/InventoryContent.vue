<template>
  <div class="inventory-content">
    <BackButton v-if="selectedTrolley" :onClick="onBackClick" />

    <div class="layout-grid">
      <div class="layout-section">
        <GalleyLayout
          :trolleys="trolleys"
          @toggleTrolley="onToggleTrolley"
          @trolleyClick="onTrolleyClick"
        />
      </div>

      <div class="list-section">
        <InventoryList
          :items="inventoryItems"
          :selectedTrolley="selectedTrolley"
          @addItem="onAddItem"
          @removeItem="onRemoveItem"
          @updateQuantity="onUpdateQuantity"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GalleyLayout from './GalleyLayout.vue'
import InventoryList from './InventoryList.vue'
import BackButton from './BackButton.vue'
import type { InventoryContentProps } from '../types/inventory'

// Define the props based on your existing interfaces
defineProps<InventoryContentProps>()
</script>

<style scoped>
.inventory-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

.layout-section,
.list-section {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}
</style>
