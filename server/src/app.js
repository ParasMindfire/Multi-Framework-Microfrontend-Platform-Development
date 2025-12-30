import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import flightRoutes from './routes/flightRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

/* -------------------- Security Middleware -------------------- */

// Helmet: secure HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
)

// Rate limiter: prevent abuse / brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

// CORS (be strict in prod)
app.use(cors({ origin: '*' }))

/* -------------------- Core Middleware -------------------- */

app.use(express.json())

/* -------------------- Routes -------------------- */

app.use('/', flightRoutes)
app.use('/', inventoryRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

app.use(errorHandler)

export default app
