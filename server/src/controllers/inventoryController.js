import {
  fetchInventory,
  createInventoryItem,
  removeInventoryItem,
  updateInventoryQuantity,
  updateInventoryTrolley,
} from '../services/inventoryService.js'
import { getInventoryItemById } from '../repositories/inventoryRepository.js'

export const getInventory = async (req, res, next) => {
  try {
    const flightId = req.params.flightId
    const items = await fetchInventory(flightId)
    res.json({ inventory: items })
  } catch (error) {
    next(error)
  }
}

export const addInventoryItem = async (req, res, next) => {
  try {
    const flightId = req.params.flightId
    const { item_name, quantity, trolley_id, drawer_id } = req.body
    const item = await createInventoryItem(
      flightId,
      item_name,
      quantity,
      trolley_id || null,
      drawer_id || null,
    )
    res.json({ item })
  } catch (error) {
    next(error)
  }
}

export const deleteInventoryItem = async (req, res, next) => {
  try {
    const { itemId } = req.params
    await removeInventoryItem(itemId)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
}

export const updateInventoryItem = async (req, res, next) => {
  try {
    const { itemId } = req.params
    const { quantity, trolley_id, drawer_id } = req.body

    if (quantity !== undefined) {
      await updateInventoryQuantity(itemId, quantity)
    }

    if (trolley_id !== undefined) {
      await updateInventoryTrolley(itemId, trolley_id)
    }

    const item = await getInventoryItemById(itemId)
    res.json({ item })
  } catch (error) {
    next(error)
  }
}
