<!-- mfe-inventory/src/App.vue -->
<template>
  <div class="inventory-app">
    <InventoryPage />
  </div>
</template>

<script setup lang="ts">
import InventoryPage from './pages/InventoryPage/InventoryPage.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.inventory-app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>