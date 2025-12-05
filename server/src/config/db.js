import dotenv from 'dotenv'
dotenv.config()

import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

console.log('DB_USER:', process.env.DB_USER)
console.log('DB_PASS:', process.env.DB_PASS)
