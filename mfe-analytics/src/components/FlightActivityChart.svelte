<script lang="ts">
  interface Props {
    activities: Array<{ time: string; action: string }>
  }

  let { activities }: Props = $props()
</script>

<div class="activity-chart">
  {#if activities.length === 0}
    <div class="empty">No activity yet</div>
  {:else}
    <div class="activity-list">
      {#each activities as activity, index (index)}
        <div class="activity-item" style="animation-delay: {index * 0.05}s">
          <span class="time">{activity.time}</span>
          <span class="action">{activity.action}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .activity-chart {
    min-height: 200px;
  }

  .empty {
    text-align: center;
    padding: 3rem 1rem;
    color: #9ca3af;
    font-style: italic;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
  }

  .activity-item {
    background: white;
    padding: 0.75rem;
    border-radius: 6px;
    border-left: 3px solid #667eea;
    display: flex;
    gap: 1rem;
    animation: slideIn 0.3s ease forwards;
    opacity: 0;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .time {
    color: #6366f1;
    font-weight: 600;
    font-size: 0.85rem;
    min-width: 80px;
  }

  .action {
    color: #24292e;
    font-size: 0.9rem;
  }
</style>