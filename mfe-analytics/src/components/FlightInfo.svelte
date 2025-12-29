<!-- components/FlightInfo.svelte -->
<script lang="ts">
  import type {FlightInfoProps } from '../types'



  let { flight }: FlightInfoProps = $props()
</script>

<div class="flight-info">
  <h3>Active Flight: {flight.flight_number}</h3>
  <p>{flight.origin} → {flight.destination}</p>
</div>

<style>
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
</style>