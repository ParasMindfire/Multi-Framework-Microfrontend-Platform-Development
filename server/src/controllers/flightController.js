import { fetchFlights } from '../services/flightService.js'

export const getFlights = async (req, res) => {
  try {
    console.log('controller flight')
    const data = await fetchFlights()
    res.json({ flights: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
