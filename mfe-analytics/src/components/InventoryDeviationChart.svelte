<script lang="ts">
  interface Props {
    trolleyData: {
      trolley1: number
      trolley2: number
      trolley3: number
    }
  }

  let { trolleyData }: Props = $props()

  const maxItemsPerTrolley = 200 // Max capacity per trolley
  
  // Get actual counts from props
  let trolleyA = $derived(trolleyData.trolley1)
  let trolleyB = $derived(trolleyData.trolley2)
  let trolleyC = $derived(trolleyData.trolley3)
  let totalCount = $derived(trolleyA + trolleyB + trolleyC)
  
  // Calculate percentage heights for visual display (0-100)
  let heightA = $derived(Math.min((trolleyA / maxItemsPerTrolley) * 100, 100))
  let heightB = $derived(Math.min((trolleyB / maxItemsPerTrolley) * 100, 100))
  let heightC = $derived(Math.min((trolleyC / maxItemsPerTrolley) * 100, 100))
  
  // Overall stats
  let maxTotal = maxItemsPerTrolley * 3
  let percentage = $derived(Math.min((totalCount / maxTotal) * 100, 100))
  let status = $derived(
    percentage < 30 ? 'Low Stock' : 
    percentage < 70 ? 'Good' : 
    percentage >= 100 ? 'At Capacity' : 'High'
  )
  
  let statusColor = $derived(
    percentage < 30 ? '#ef4444' : 
    percentage < 70 ? '#10b981' : 
    percentage >= 100 ? '#f59e0b' : '#10b981'
  )

  // Individual trolley colors based on capacity
  function getTrolleyColor(count: number): string {
    const percent = (count / maxItemsPerTrolley) * 100
    if (percent >= 100) return '#f59e0b' // Orange - at capacity
    if (percent >= 80) return '#10b981' // Green - high
    if (percent >= 50) return '#3b82f6' // Blue - medium
    return '#6b7280' // Gray - low
  }

  let colorA = $derived(getTrolleyColor(trolleyA))
  let colorB = $derived(getTrolleyColor(trolleyB))
  let colorC = $derived(getTrolleyColor(trolleyC))
</script>

<div class="inventory-chart">
  <div class="stat-display">
    <div class="count" style="color: {statusColor}">
      {totalCount}
    </div>
    <div class="label">total items across all trolleys</div>
  </div>

  <div class="progress-container">
    <div 
      class="progress-bar" 
      style="width: {percentage}%; background: {statusColor}"
    ></div>
    <div class="progress-text">{percentage.toFixed(1)}%</div>
  </div>

  <div class="status-indicator">
    <span class="status-dot" style="background: {statusColor}"></span>
    <span class="status-text">{status}</span>
  </div>

  <svg width="100%" height="160" viewBox="0 0 300 160" class="inventory-svg">
    <!-- Trolley A (trolley_id: 1) -->
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="60" height="100" fill="#e5e7eb" stroke="#64748b" stroke-width="2" rx="4" />
      <text x="30" y="-5" text-anchor="middle" font-size="10" fill="#64748b" font-weight="bold">Trolley 1</text>

      {#if trolleyA > 0}
        <rect 
          x="5" 
          y="{100 - heightA}" 
          width="50" 
          height="{heightA}" 
          fill={colorA} 
          opacity="0.8" 
        />
      {/if}
      
      <text x="30" y="110" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">
        {trolleyA}
      </text>
      <text x="30" y="120" text-anchor="middle" font-size="8" fill="#6b7280">
        {((trolleyA / maxItemsPerTrolley) * 100).toFixed(0)}% full
      </text>
    </g>

    <!-- Trolley B (trolley_id: 2) -->
    <g transform="translate(110, 20)">
      <rect x="0" y="0" width="60" height="100" fill="#e5e7eb" stroke="#64748b" stroke-width="2" rx="4" />
      <text x="30" y="-5" text-anchor="middle" font-size="10" fill="#64748b" font-weight="bold">Trolley 2</text>

      {#if trolleyB > 0}
        <rect 
          x="5" 
          y="{100 - heightB}" 
          width="50" 
          height="{heightB}" 
          fill={colorB} 
          opacity="0.8" 
        />
      {/if}
      
      <text x="30" y="110" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">
        {trolleyB}
      </text>
      <text x="30" y="120" text-anchor="middle" font-size="8" fill="#6b7280">
        {((trolleyB / maxItemsPerTrolley) * 100).toFixed(0)}% full
      </text>
    </g>

    <!-- Trolley C (trolley_id: 3) -->
    <g transform="translate(200, 20)">
      <rect x="0" y="0" width="60" height="100" fill="#e5e7eb" stroke="#64748b" stroke-width="2" rx="4" />
      <text x="30" y="-5" text-anchor="middle" font-size="10" fill="#64748b" font-weight="bold">Trolley 3</text>

      {#if trolleyC > 0}
        <rect 
          x="5" 
          y="{100 - heightC}" 
          width="50" 
          height="{heightC}" 
          fill={colorC} 
          opacity="0.8" 
        />
      {/if}
      
      <text x="30" y="110" text-anchor="middle" font-size="11" fill="#374151" font-weight="bold">
        {trolleyC}
      </text>
      <text x="30" y="120" text-anchor="middle" font-size="8" fill="#6b7280">
        {((trolleyC / maxItemsPerTrolley) * 100).toFixed(0)}% full
      </text>
    </g>
  </svg>
</div>

<style>
  .inventory-chart {
    text-align: center;
  }

  .stat-display {
    margin-bottom: 1rem;
  }

  .count {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1;
    transition: color 0.3s;
  }

  .label {
    color: #6b7280;
    font-size: 0.9rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }

  .progress-container {
    position: relative;
    width: 100%;
    height: 20px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 2px solid #cbd5e1;
  }

  .progress-bar {
    height: 100%;
    transition: width 0.5s ease, background 0.3s;
    border-radius: 8px;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.75rem;
    font-weight: bold;
    color: #1f2937;
    text-shadow: 0 0 3px white;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: #f9fafb;
    border-radius: 6px;
  }

  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }

  .status-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
  }

  .inventory-svg {
    margin-top: 1rem;
    background: #f9fafb;
    border-radius: 8px;
    padding: 10px;
  }
</style>