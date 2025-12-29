<!-- components/ErrorState.vue -->
<template>
  <div class="error">
    <p>{{ error }}</p>
    <button @click="onRetry">Retry</button>
  </div>
</template>

<script setup lang="ts">
import type { ErrorStateProps } from '../types/inventory'

defineProps<ErrorStateProps>()
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
}

.error p {
  color: #ef4444;
  font-size: 1rem;
}

.error button {
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.error button:hover {
  background: #059669;
}
</style>
