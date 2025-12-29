<!-- components/InventoryHeader.vue -->
<template>
  <header class="inventory-header">
    <h2>Inventory & Galley Management</h2>
    <p v-if="selectedFlight">
      Flight: <strong>{{ selectedFlight.flight_number }}</strong> ({{ selectedFlight.origin }} →
      {{ selectedFlight.destination }})
    </p>
    <p v-else class="no-flight">
      {{ MESSAGES.NO_FLIGHT_SELECTED }}
    </p>
  </header>
</template>

<script setup lang="ts">
import type { InventoryHeaderProps } from '../types/inventory'
import { MESSAGES } from '../constants/inventory'

defineProps<InventoryHeaderProps>()
</script>

<style scoped>
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
</style>
