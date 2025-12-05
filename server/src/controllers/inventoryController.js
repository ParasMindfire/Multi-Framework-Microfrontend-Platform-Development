import { fetchInventory } from '../services/inventoryService.js'

export const getInventory = async (req, res) => {
  try {
    const flightId = req.params.flightId
    const items = await fetchInventory(flightId)
    res.json({ inventory: items })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
