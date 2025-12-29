<!-- components/ChartsGrid.svelte -->
<script lang="ts">
  import FlightActivityChart from './FlightActivityChart.svelte'
  import InventoryDeviationChart from './InventoryDeviationChart.svelte'
  import CrewLoadChart from './CrewLoadChart.svelte'
  import type { ChartGridProps } from '../types'

  let { flightActivities, trolleyData, crewCount }: ChartGridProps = $props()
</script>

<div class="charts-grid">
  <div class="chart-card">
    <h3>Flight Activity</h3>
    <FlightActivityChart activities={flightActivities} />
  </div>

  <div class="chart-card">
    <h3>Inventory Status</h3>
    <InventoryDeviationChart {trolleyData} />
  </div>

  <div class="chart-card">
    <h3>Crew Load</h3>
    <CrewLoadChart count={crewCount} />
  </div>
</div>

<style>
  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }

  .chart-card {
    background: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .chart-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .chart-card h3 {
    color: #24292e;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
</style>