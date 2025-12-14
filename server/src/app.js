import express from 'express'
import flightRoutes from './routes/flightRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/', flightRoutes)
app.use('/', inventoryRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
