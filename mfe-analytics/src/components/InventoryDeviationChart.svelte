<script lang="ts">
  interface Props {
    count: number
  }

  let { count }: Props = $props()

  const maxItems = 500 
  let percentage = $derived(Math.min((count / maxItems) * 100, 100))
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
</script>

<div class="inventory-chart">
  <div class="stat-display">
    <div class="count" style="color: {statusColor}">
      {count}
    </div>
    <div class="label">of {maxItems} items</div>
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

  <svg width="100%" height="140" viewBox="0 0 300 140" class="inventory-svg">
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="60" height="100" fill="#e5e7eb" stroke="#64748b" stroke-width="2" rx="4" />
      <text x="30" y="-5" text-anchor="middle" font-size="10" fill="#64748b" font-weight="bold">Trolley A</text>

      <rect 
        x="5" 
        y="{100 - Math.min((count / maxItems) * 100, 100)}" 
        width="50" 
        height="{Math.min((count / maxItems) * 100, 100)}" 
        fill={statusColor} 
        opacity="0.8" 
      />

      {#if count > 0}
        <text x="30" y="110" text-anchor="middle" font-size="10" fill="#374151" font-weight="bold">
          {Math.min(count, Math.ceil(maxItems/3))}
        </text>
      {/if}
    </g>

    <g transform="translate(110, 20)">
      <rect x="0" y="0" width="60" height="100" fill="#e5e7eb" stroke="#64748b" stroke-width="2" rx="4" />
      <text x="30" y="-5" text-anchor="middle" font-size="10" fill="#64748b" font-weight="bold">Trolley B</text>

      {#if count > maxItems/3}
        <rect 
          x="5" 
          y="{100 - Math.min(((count - maxItems/3) / maxItems) * 100, 33.33)}" 
          width="50" 
          height="{Math.min(((count - maxItems/3) / maxItems) * 100, 33.33)}" 
          fill={statusColor} 
          opacity="0.8" 
        />
        <text x="30" y="110" text-anchor="middle" font-size="10" fill="#374151" font-weight="bold">
          {Math.min(Math.max(0, count - Math.ceil(maxItems/3)), Math.ceil(maxItems/3))}
        </text>
      {/if}
    </g>

    <g transform="translate(200, 20)">
      <rect x="0" y="0" width="60" height="100" fill="#e5e7eb" stroke="#64748b" stroke-width="2" rx="4" />
      <text x="30" y="-5" text-anchor="middle" font-size="10" fill="#64748b" font-weight="bold">Trolley C</text>

      {#if count > (maxItems * 2/3)}
        <rect 
          x="5" 
          y="{100 - Math.min(((count - maxItems*2/3) / maxItems) * 100, 33.33)}" 
          width="50" 
          height="{Math.min(((count - maxItems*2/3) / maxItems) * 100, 33.33)}" 
          fill={statusColor} 
          opacity="0.8" 
        />
        <text x="30" y="110" text-anchor="middle" font-size="10" fill="#374151" font-weight="bold">
          {Math.max(0, count - Math.ceil(maxItems * 2/3))}
        </text>
      {/if}
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
    font-size: 1rem;
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