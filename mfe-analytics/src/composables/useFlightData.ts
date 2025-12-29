// composables/useFlightData.ts
import type { Flight, InventoryItem, TrolleyData, Activity } from '../types'

export function useFlightData(
  getSelectedFlight: () => Flight | null,
  setTrolleyData: (data: TrolleyData) => void,
  addActivityToList: (activity: Activity) => void,
) {
  async function loadInventoryCount(flightId: number) {
    try {
      const response = await fetch(`http://localhost:5000/api/inventory/${flightId}`)
      const data = await response.json()

      const trolleyCounts = data.inventory.reduce(
        (acc: TrolleyData, item: InventoryItem) => {
          const trolleyKey = `trolley${item.trolley_id}` as keyof TrolleyData
          acc[trolleyKey] = (acc[trolleyKey] || 0) + item.quantity
          return acc
        },
        { trolley1: 0, trolley2: 0, trolley3: 0 },
      )

      setTrolleyData(trolleyCounts)

      const totalQuantity = data.inventory.reduce(
        (sum: number, item: InventoryItem) => sum + item.quantity,
        0,
      )

      addActivity(`Loaded ${data.inventory.length} items (${totalQuantity} total quantity)`)
      addActivity(
        `Trolley 1: ${trolleyCounts.trolley1}, Trolley 2: ${trolleyCounts.trolley2}, Trolley 3: ${trolleyCounts.trolley3}`,
      )
    } catch (error) {
      console.error('Failed to load inventory:', error)
    }
  }

  function addActivity(action: string) {
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    addActivityToList({ time, action })
  }

  return {
    loadInventoryCount,
    addActivity,
  }
}
