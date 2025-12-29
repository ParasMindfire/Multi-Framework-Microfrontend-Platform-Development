// components/BackButton.vue
<template>
  <div class="back-button-container">
    <button @click="onClick" class="back-btn">← Back to All Items</button>
  </div>
</template>

<script setup lang="ts">
import type { BackButtonProps } from '../types/inventory'

defineProps<BackButtonProps>()
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
  transition: background 0.2s;
}

.back-btn:hover {
  background: #4b5563;
}
</style>
