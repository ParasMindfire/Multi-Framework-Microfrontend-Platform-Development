import { pool } from '../config/db.js'

export const getAllFlights = async () => {
  const result = await pool.query('SELECT * FROM flights ORDER BY id ASC')
  return result.rows
}
