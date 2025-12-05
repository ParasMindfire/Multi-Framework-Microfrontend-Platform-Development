import express from 'express'
import flightRoutes from './routes/flightRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/', flightRoutes)
app.use('/', inventoryRoutes)

export default app
