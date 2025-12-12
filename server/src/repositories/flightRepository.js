import { pool } from '../config/db.js'

export const getAllFlights = async () => {
  console.log('yahan a rha ??')
  const result = await pool.query('SELECT * FROM flights ORDER BY id ASC')
  console.log('Aur yahan ?')
  return result.rows
}
