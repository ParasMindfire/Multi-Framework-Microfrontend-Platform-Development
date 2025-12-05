import { pool } from '../config/db.js'

export const getInventoryByFlight = async (flightId) => {
  const result = await pool.query('SELECT * FROM inventory WHERE flight_id = $1', [flightId])
  return result.rows
}
