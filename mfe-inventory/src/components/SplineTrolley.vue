<template>
  <div class="spline-wrapper">
    <canvas ref="splineCanvas" class="spline-canvas"></canvas>
    <div v-if="loading" class="loading-overlay">Loading 3D Model...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Application } from '@splinetool/runtime'

const props = defineProps<{
  splineUrl: string
  trolleyId: number
}>()

const emit = defineEmits<{
  drawerClick: [trolleyId: number, drawerId: number]
}>()

const splineCanvas = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
let splineApp: Application | null = null

onMounted(async () => {
  if (!splineCanvas.value) return

  try {
    splineApp = new Application(splineCanvas.value)
    await splineApp.load(props.splineUrl)
    loading.value = false

    splineApp.addEventListener('mouseDown', (event: any) => {
      if (event.target?.name) {
        const objectName: string = event.target.name

        if (objectName.startsWith('drawer_')) {
          const parts = objectName.split('_')
          const drawerNum = parts[1]

          if (drawerNum) {
            const drawerId = parseInt(drawerNum)

            if (!isNaN(drawerId)) {
              emit('drawerClick', props.trolleyId, drawerId)
            }
          }
        }
      }
    })
  } catch (error) {
    console.error('Error loading Spline scene:', error)
    loading.value = false
  }
})

onUnmounted(() => {
  if (splineApp) {
    splineApp.dispose()
  }
})
</script>

<style scoped>
.spline-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: #f1f5f9;
  border: 2px solid #cbd5e1;
}

.spline-canvas {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  color: #64748b;
}
</style>
