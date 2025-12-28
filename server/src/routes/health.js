import express from 'express'
// Import your database connection (adjust path as needed)
import pool from '../config/db.js'

const router = express.Router()

// Health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'backend',
  })
})

// Database health check
router.get('/db', async (req, res) => {
  try {
    // result is assigned but not used, so we can omit it or use _
    await pool.query('SELECT 1')
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

export default router
