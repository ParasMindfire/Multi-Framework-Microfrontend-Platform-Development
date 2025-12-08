<script lang="ts">
  interface Props {
    count: number
  }

  let { count }: Props = $props()

  const maxCrew = 10
  let percentage = $derived(Math.min((count / maxCrew) * 100, 100))
  let status = $derived(
    count === 0 ? 'empty' :
    count < 5 ? 'understaffed' : 
    count <= 8 ? 'optimal' : 
    'overstaffed'
  )
  
  let statusColor = $derived(
    status === 'empty' ? '#94a3b8' :
    status === 'understaffed' ? '#ef4444' : 
    status === 'optimal' ? '#10b981' : 
    '#f59e0b'
  )

  let crewIcons = $derived(Array(count).fill('👤'))
</script>

<div class="crew-chart">
  <div class="stat-display">
    <div class="count" style="color: {statusColor}">
      {count} / {maxCrew}
    </div>
    <div class="label">Crew Members</div>
  </div>

  <div class="crew-icons">
    {#each crewIcons as icon, index}
      <span 
        class="crew-icon" 
        style="animation-delay: {index * 0.1}s"
      >
        {icon}
      </span>
    {/each}
    {#if count === 0}
      <span class="no-crew">No crew assigned</span>
    {/if}
  </div>

  <div class="status-badge" style="background: {statusColor}">
    {status.toUpperCase()}
  </div>

  <svg width="100%" height="100" viewBox="0 0 200 100" class="crew-svg">
    <circle cx="100" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8" />
    <circle 
      cx="100" 
      cy="50" 
      r="45" 
      fill="none" 
      stroke={statusColor}
      stroke-width="8"
      stroke-dasharray="{percentage * 2.827} 282.7"
      transform="rotate(-90 100 50)"
      class="progress-circle"
    />
    <text x="100" y="55" text-anchor="middle" font-size="24" font-weight="bold" fill={statusColor}>
      {percentage.toFixed(0)}%
    </text>
  </svg>
</div>

<style>
  .crew-chart {
    text-align: center;
  }

  .stat-display {
    margin-bottom: 1rem;
  }

  .count {
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 1;
    transition: color 0.3s;
  }

  .label {
    color: #6b7280;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }

  .crew-icons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    min-height: 60px;
    margin-bottom: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
  }

  .crew-icon {
    font-size: 1.5rem;
    animation: fadeIn 0.3s ease forwards;
    opacity: 0;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  .no-crew {
    color: #9ca3af;
    font-style: italic;
    font-size: 0.9rem;
  }

  .status-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .crew-svg {
    margin-top: 1rem;
  }

  .progress-circle {
    transition: stroke-dasharray 0.5s ease;
  }
</style>