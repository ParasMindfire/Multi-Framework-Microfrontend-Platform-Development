import express from 'express'
import {
  getInventory,
  addInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
} from '../controllers/inventoryController.js'

const router = express.Router()
router.get('/api/inventory/:flightId', getInventory)
router.post('/api/inventory/:flightId', addInventoryItem)
router.delete('/api/inventory/:flightId/:itemId', deleteInventoryItem)
router.patch('/api/inventory/:flightId/:itemId', updateInventoryItem)

export default router
