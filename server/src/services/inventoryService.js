import { getInventoryByFlight } from '../repositories/inventoryRepository.js'

export const fetchInventory = async (id) => {
  return await getInventoryByFlight(id)
}
