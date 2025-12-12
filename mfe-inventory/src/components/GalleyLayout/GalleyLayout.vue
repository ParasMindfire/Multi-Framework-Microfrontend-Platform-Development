<template>
  <div class="galley-layout">
    <svg 
      width="700" 
      height="500" 
      viewBox="0 0 700 500"
      class="galley-svg"
    >
      <defs>
        <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #f1f5f9; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #cbd5e1; stop-opacity: 1" />
        </linearGradient>

        <linearGradient id="trolleyBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #94a3b8; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #cbd5e1; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #64748b; stop-opacity: 1" />
        </linearGradient>

        <linearGradient id="trolleyOpenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #86efac; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #bbf7d0; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #4ade80; stop-opacity: 1" />
        </linearGradient>

        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #475569; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #64748b; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #334155; stop-opacity: 1" />
        </linearGradient>

        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="700" height="500" fill="url(#floorGradient)" />

      <rect
        x="20"
        y="20"
        width="660"
        height="460"
        fill="none"
        stroke="#64748b"
        stroke-width="3"
        rx="12"
        opacity="0.6"
      />

      <g opacity="0.2">
        <line v-for="i in 14" :key="`v${i}`"
          :x1="50 + (i-1) * 50"
          y1="20"
          :x2="50 + (i-1) * 50"
          y2="480"
          stroke="#64748b"
          stroke-width="1"
        />
        <line v-for="i in 10" :key="`h${i}`"
          x1="20"
          :y1="50 + (i-1) * 50"
          x2="680"
          :y2="50 + (i-1) * 50"
          stroke="#64748b"
          stroke-width="1"
        />
      </g>

      <rect x="200" y="35" width="300" height="50" fill="#1e293b" rx="8" opacity="0.9" />
      <text x="350" y="65" text-anchor="middle" font-size="24" fill="#f1f5f9" font-weight="bold">
        GALLEY STATION
      </text>

      <g 
        v-for="trolley in trolleys" 
        :key="trolley.id"
        :transform="`translate(${trolley.position.x}, ${trolley.position.y})`"
        @click="handleTrolleyClick(trolley)"
        class="trolley-group"
        filter="url(#dropShadow)"
      >

        <ellipse
          cx="75"
          cy="245"
          rx="65"
          ry="8"
          fill="#334155"
          opacity="0.4"
        />

        <rect
          x="10"
          y="20"
          width="130"
          height="220"
          :fill="trolley.isOpen ? 'url(#trolleyOpenGradient)' : 'url(#trolleyBodyGradient)'"
          :stroke="trolley.isOpen ? '#10b981' : '#475569'"
          stroke-width="3"
          rx="8"
        />

        <rect
          x="15"
          y="25"
          width="8"
          height="210"
          fill="#1e293b"
          opacity="0.3"
          rx="2"
        />
        <rect
          x="127"
          y="25"
          width="8"
          height="210"
          fill="#f8fafc"
          opacity="0.3"
          rx="2"
        />

        <rect
          x="10"
          y="20"
          width="130"
          height="8"
          fill="#f8fafc"
          opacity="0.4"
          rx="8"
        />

        <g v-if="!trolley.isOpen">
          <rect
            x="25"
            y="40"
            width="100"
            height="180"
            fill="url(#doorGradient)"
            stroke="#1e293b"
            stroke-width="2"
            rx="6"
          />

          <rect x="30" y="50" width="90" height="50" fill="#334155" opacity="0.3" rx="4" />
          <rect x="30" y="110" width="90" height="50" fill="#334155" opacity="0.3" rx="4" />
          <rect x="30" y="170" width="90" height="40" fill="#334155" opacity="0.3" rx="4" />

          <rect x="105" y="120" width="12" height="40" fill="#94a3b8" rx="6" />
          <circle cx="111" cy="140" r="5" fill="#334155" />

          <circle cx="111" cy="140" r="2" fill="#ef4444" />
        </g>

        <g v-if="trolley.isOpen">
          <g v-for="shelf in 4" :key="shelf">
            <rect
              x="20"
              :y="45 + (shelf-1) * 45"
              width="110"
              height="35"
              fill="#f8fafc"
              stroke="#10b981"
              stroke-width="2"
              rx="4"
            />
            <rect
              x="20"
              :y="45 + (shelf-1) * 45"
              width="110"
              height="4"
              fill="#10b981"
              opacity="0.3"
            />
          </g>

          <g v-for="(item, index) in trolley.items.slice(0, 4)" :key="item.id">
            <rect
              x="30"
              :y="52 + index * 45"
              width="90"
              height="20"
              fill="#10b981"
              opacity="0.8"
              rx="3"
            />
            <text
              x="75"
              :y="66 + index * 45"
              text-anchor="middle"
              font-size="11"
              fill="white"
              font-weight="bold"
            >
              {{ item.item_name.substring(0, 12) }}
            </text>
          </g>
        </g>

        <g>
          <ellipse cx="35" cy="245" rx="8" ry="6" fill="#1e293b" />
          <ellipse cx="35" cy="244" rx="6" ry="4" fill="#475569" />
          
          <ellipse cx="115" cy="245" rx="8" ry="6" fill="#1e293b" />
          <ellipse cx="115" cy="244" rx="6" ry="4" fill="#475569" />
        </g>

        <rect
          x="30"
          y="250"
          width="90"
          height="25"
          fill="#1e293b"
          rx="4"
        />
        <text
          x="75"
          y="267"
          text-anchor="middle"
          font-size="14"
          :fill="trolley.isOpen ? '#10b981' : '#94a3b8'"
          font-weight="bold"
        >
          {{ trolley.name }}
        </text>

        <circle cx="125" cy="35" r="18" fill="#10b981" stroke="white" stroke-width="2" />
        <text
          x="125"
          y="41"
          text-anchor="middle"
          font-size="14"
          fill="white"
          font-weight="bold"
        >
          {{ trolley.items.length }}
        </text>

        <text x="75" y="15" text-anchor="middle" font-size="20">
          {{ trolley.isOpen ? '📂' : '🔒' }}
        </text>

        <rect
          x="10"
          y="20"
          width="130"
          height="220"
          fill="white"
          opacity="0"
          rx="8"
          class="hover-overlay"
        />
      </g>

      <!-- Legend Panel -->
      <rect x="30" y="410" width="300" height="70" fill="white" rx="8" stroke="#cbd5e1" stroke-width="2" />
      <text x="50" y="435" font-size="14" fill="#475569" font-weight="bold">
        💡 Instructions
      </text>
      <text x="50" y="455" font-size="12" fill="#64748b">
        • Click trolley to open/close
      </text>
      <text x="50" y="472" font-size="12" fill="#64748b">
        • Green = Open | Gray = Closed
      </text>

      <!-- Status Indicators -->
      <g transform="translate(400, 410)">
        <rect width="270" height="70" fill="white" rx="8" stroke="#cbd5e1" stroke-width="2" />
        
        <text x="20" y="25" font-size="14" fill="#475569" font-weight="bold">
          Status Overview
        </text>
        
        <circle cx="30" cy="45" r="8" fill="#10b981" />
        <text x="45" y="50" font-size="12" fill="#64748b">
          Open: {{ trolleys.filter(t => t.isOpen).length }}
        </text>
        
        <circle cx="150" cy="45" r="8" fill="#94a3b8" />
        <text x="165" y="50" font-size="12" fill="#64748b">
          Closed: {{ trolleys.filter(t => !t.isOpen).length }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { Trolley } from '../../types'

defineProps<{
  trolleys: Trolley[]
}>()

const emit = defineEmits<{
  toggleTrolley: [trolleyId: number]
  trolleyClick: [trolley: Trolley]
}>()

const handleTrolleyClick = (trolley: Trolley) => {
  emit('toggleTrolley', trolley.id)
  emit('trolleyClick', trolley)
}
</script>

<style scoped>
.galley-layout {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  overflow-x: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.galley-svg {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.trolley-group {
  cursor: pointer;
}

.trolley-group:hover .hover-overlay {
  opacity: 0.1;
}
</style>