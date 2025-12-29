<!-- Analytics.svelte - Main container component -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import AnalyticsHeader from './components/AnalyticsHeader.svelte'
  import FlightInfo from './components/FlightInfo.svelte'
  import ChartsGrid from './components/ChartsGrid.svelte'
  import EmptyState from './components/EmptyState.svelte'
  import { useFlightData } from './composables/useFlightData'
  import { useEventSubscriptions } from './composables/useEventSubscriptions'
  import type { Flight } from './types'

  let selectedFlight = $state<Flight | null>(null)
  let trolleyData = $state({ trolley1: 0, trolley2: 0, trolley3: 0 })
  let crewCount = $state(0)
  let flightActivities = $state<Array<{ time: string; action: string }>>([])

  const { loadInventoryCount, addActivity } = useFlightData(
    () => selectedFlight,
    (data) => { trolleyData = data },
    (activity) => { 
      flightActivities = [activity, ...flightActivities].slice(0, 10) 
    }
  )

  const { cleanup } = useEventSubscriptions({
    onFlightSelected: (flight: Flight) => {
      selectedFlight = flight
      sessionStorage.setItem('selectedFlight', JSON.stringify(flight))
      loadInventoryCount(flight.id)
      addActivity(`Flight ${flight.flight_number} selected`)
    },
    onCrewUpdated: (action: string) => {
      if (action === 'assigned') crewCount++
      else if (action === 'unassigned') crewCount--
      addActivity(`Crew update: ${action}`)
    },
    onInventoryChanged: (action: string) => {
      if (selectedFlight) {
        loadInventoryCount(selectedFlight.id)
      }
      addActivity(`Inventory updated: ${action}`)
    }
  })

  onMount(() => {
    const storedFlight = sessionStorage.getItem('selectedFlight')
    if (storedFlight) {
      selectedFlight = JSON.parse(storedFlight)
      addActivity('Dashboard initialized')
      addActivity(`Flight ${selectedFlight!.flight_number} active`)
      loadInventoryCount(selectedFlight!.id)
    }
  })

  onDestroy(cleanup)
</script>

<div class="analytics-container">
  <AnalyticsHeader />

  {#if !selectedFlight}
    <EmptyState />
  {:else}
    <FlightInfo flight={selectedFlight} />
    <ChartsGrid 
      {flightActivities} 
      {trolleyData} 
      {crewCount} 
    />
  {/if}
</div>

<style>
  .analytics-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }
</style>