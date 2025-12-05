import express from 'express'
import flightRoutes from './routes/flightRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'

const app = express()
app.use(express.json())

app.use('/', flightRoutes)
app.use('/', inventoryRoutes)

export default app
