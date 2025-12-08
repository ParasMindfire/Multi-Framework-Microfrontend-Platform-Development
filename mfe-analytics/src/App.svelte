<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { eventBus } from '@skycart/common'
  import FlightActivityChart from './components/FlightActivityChart.svelte'
  import InventoryDeviationChart from './components/InventoryDeviationChart.svelte'
  import CrewLoadChart from './components/CrewLoadChart.svelte'

  interface Flight {
    id: number
    flight_number: string
    origin: string
    destination: string
    departure_time: string
    arrival_time: string
  }

  let selectedFlight: Flight | null = $state(null)
  let inventoryCount = $state(0)
  let crewCount = $state(0)
  let flightActivities: Array<{ time: string; action: string }> = $state([])

  const EVENT_TYPES = {
    FLIGHT_SELECTED: 'flight:selected',
    CREW_UPDATED: 'crew:updated',
    INVENTORY_CHANGED: 'inventory:changed',
  }

  let unsubscribeFlightSelected: (() => void) | null = null
  let unsubscribeCrewUpdated: (() => void) | null = null
  let unsubscribeInventoryChanged: (() => void) | null = null


  async function loadInventoryCount(flightId: number) {
    try {
      console.log('📊 Fetching inventory for flight:', flightId)
      const response = await fetch(`http://localhost:5000/api/inventory/${flightId}`)
      const data = await response.json()
      const totalQuantity = data.inventory.reduce((sum:any, item:any) => sum + item.quantity, 0)
      inventoryCount = totalQuantity
      console.log('📊 Inventory count loaded:', totalQuantity)

      addActivity(`Loaded ${data.inventory.length} items (${totalQuantity} total quantity)`)
    } catch (error) {
      console.error('Failed to load inventory:', error)
    }
  }


onMount(() => {
    console.log('🔍 Analytics onMount - Setting up subscriptions')
    console.log('🔍 EventBus instance:', eventBus)

    const storedFlight = sessionStorage.getItem('selectedFlight')
    if (storedFlight) {
      selectedFlight = JSON.parse(storedFlight)
      console.log('🔍 Loaded stored flight:', $state.snapshot(selectedFlight))
      addActivity(`Dashboard initialized`)
      addActivity(`Flight ${selectedFlight!.flight_number} active`)
      
      loadInventoryCount(selectedFlight!.id)
    }

    unsubscribeFlightSelected = eventBus.subscribe(
      EVENT_TYPES.FLIGHT_SELECTED,
      (data: { flight: Flight }) => {
        selectedFlight = data.flight
        sessionStorage.setItem('selectedFlight', JSON.stringify(data.flight))
        loadInventoryCount(data.flight.id) 
        addActivity(`Flight ${data.flight.flight_number} selected`)
        console.log('📊 Analytics received flight:', data.flight)
      }
    )

  unsubscribeCrewUpdated = eventBus.subscribe(
    EVENT_TYPES.CREW_UPDATED,
    (data) => {
      if (data.action === 'assigned') crewCount++
      else if (data.action === 'unassigned') crewCount--
      addActivity(`Crew update: ${data.action}`)
    }
  )


    unsubscribeInventoryChanged = eventBus.subscribe(
      EVENT_TYPES.INVENTORY_CHANGED,
      (data) => {
        console.log('📊 Analytics received inventory event:', data)
        
        if (data.action === 'loaded') {
          inventoryCount = data.quantity
        } else if (data.action === 'added') {
          inventoryCount += data.quantity
        } else if (data.action === 'removed') {
          inventoryCount -= data.quantity
        }
        
        addActivity(`Inventory updated: ${data.action}`)
      }
    )
    
    console.log('✅ Inventory subscription created')
})


  onDestroy(() => {
    if (unsubscribeFlightSelected) unsubscribeFlightSelected()
    if (unsubscribeCrewUpdated) unsubscribeCrewUpdated()
    if (unsubscribeInventoryChanged) unsubscribeInventoryChanged()
  })

  function addActivity(action: string) {
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    
    flightActivities = [{ time, action }, ...flightActivities].slice(0, 10)
  }
</script>

<div class="analytics-container">
  <header class="analytics-header">
    <h2>📊 Analytics Dashboard</h2>
    <p>Real-time operational insights</p>
  </header>

  {#if !selectedFlight}
    <div class="no-data">
      <p>Select a flight from Dashboard to view analytics</p>
    </div>
  {:else}
    <div class="flight-info">
      <h3>Active Flight: {selectedFlight.flight_number}</h3>
      <p>{selectedFlight.origin} → {selectedFlight.destination}</p>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3>Flight Activity</h3>
        <FlightActivityChart activities={flightActivities} />
      </div>

      <div class="chart-card">
        <h3>Inventory Status</h3>
        <InventoryDeviationChart count={inventoryCount} />
      </div>

      <div class="chart-card">
        <h3>Crew Load</h3>
        <CrewLoadChart count={crewCount} />
      </div>
    </div>
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

  .analytics-header h2 {
    color: #24292e;
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
  }

  .analytics-header p {
    color: #586069;
    margin-bottom: 2rem;
  }

  .no-data {
    text-align: center;
    padding: 4rem 2rem;
    color: #9ca3af;
    font-size: 1.1rem;
  }

  .flight-info {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .flight-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  .flight-info p {
    margin: 0;
    opacity: 0.9;
  }

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