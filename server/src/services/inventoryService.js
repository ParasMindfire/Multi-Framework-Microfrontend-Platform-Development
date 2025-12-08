import {
  createInventoryItem as createItem,
  removeInventoryItem as removeItem,
  updateInventoryQuantity as updateItem,
  getInventoryByFlight,
  updateInventoryTrolley as updateTrolley,
} from '../repositories/inventoryRepository.js'

export const fetchInventory = async (id) => {
  return await getInventoryByFlight(id)
}

export const createInventoryItem = async (flightId, itemName, quantity, trolleyId = null) => {
  return await createItem(flightId, itemName, quantity, trolleyId)
}

export const removeInventoryItem = async (itemId) => {
  return await removeItem(itemId)
}

export const updateInventoryQuantity = async (itemId, quantity) => {
  return await updateItem(itemId, quantity)
}

export const updateInventoryTrolley = async (itemId, trolleyId) => {
  return await updateTrolley(itemId, trolleyId)
}
