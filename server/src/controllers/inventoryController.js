import {
  fetchInventory,
  createInventoryItem,
  removeInventoryItem,
  updateInventoryQuantity,
  updateInventoryTrolley,
} from '../services/inventoryService.js'
import { getInventoryItemById } from '../repositories/inventoryRepository.js'

export const getInventory = async (req, res) => {
  try {
    const flightId = req.params.flightId
    const items = await fetchInventory(flightId)
    res.json({ inventory: items })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const addInventoryItem = async (req, res) => {
  try {
    const flightId = req.params.flightId
    const { item_name, quantity, trolley_id } = req.body
    const item = await createInventoryItem(flightId, item_name, quantity, trolley_id || null)
    res.json({ item })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteInventoryItem = async (req, res) => {
  try {
    const { itemId } = req.params
    await removeInventoryItem(itemId)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateInventoryItem = async (req, res) => {
  try {
    const { itemId } = req.params
    const { quantity, trolley_id } = req.body

    console.log('quant ' + quantity)
    console.log('trolley_id ' + trolley_id)

    if (quantity !== undefined) {
      await updateInventoryQuantity(itemId, quantity)
    }

    if (trolley_id !== undefined) {
      await updateInventoryTrolley(itemId, trolley_id)
    }

    const item = await getInventoryItemById(itemId)

    console.log('item ? ' + item)
    res.json({ item })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
