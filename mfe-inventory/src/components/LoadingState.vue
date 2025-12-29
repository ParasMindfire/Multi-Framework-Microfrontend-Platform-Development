<!-- components/LoadingState.vue -->
<template>
  <div class="loading">
    <div class="spinner"></div>
    <p>{{ message || MESSAGES.LOADING_INVENTORY }}</p>
  </div>
</template>

<script setup lang="ts">
import type { LoadingStateProps } from '../types/inventory'
import { MESSAGES, ANIMATION_DURATIONS } from '../constants/inventory'

withDefaults(defineProps<LoadingStateProps>(), {
  message: MESSAGES.LOADING_INVENTORY,
})
</script>

<style scoped>
.loading {
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
  animation: spin v-bind('ANIMATION_DURATIONS.SPINNER') linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
