import { pool } from '../config/db.js'

export const getInventoryByFlight = async (flightId) => {
  const result = await pool.query('SELECT * FROM inventory WHERE flight_id = $1', [flightId])
  return result.rows
}

export const createInventoryItem = async (flightId, itemName, quantity, trolleyId = null) => {
  const result = await pool.query(
    'INSERT INTO inventory (flight_id, item_name, quantity, trolley_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [flightId, itemName, quantity, trolleyId],
  )
  return result.rows[0]
}

export const removeInventoryItem = async (itemId) => {
  await pool.query('DELETE FROM inventory WHERE id = $1', [itemId])
}

export const updateInventoryQuantity = async (itemId, quantity) => {
  const result = await pool.query('UPDATE inventory SET quantity = $1 WHERE id = $2 RETURNING *', [
    quantity,
    itemId,
  ])
  return result.rows[0]
}

export const updateInventoryTrolley = async (itemId, trolleyId) => {
  const result = await pool.query(
    'UPDATE inventory SET trolley_id = $1 WHERE id = $2 RETURNING *',
    [trolleyId, itemId],
  )
  return result.rows[0]
}

export const getInventoryItemById = async (itemId) => {
  const result = await pool.query('SELECT * FROM inventory WHERE id = $1 LIMIT 1', [itemId])
  return result.rows[0]
}
