import { fetchFlights } from '../services/flightService.js'

export const getFlights = async (req, res, next) => {
  try {
    const data = await fetchFlights()
    res.json({ flights: data })
  } catch (error) {
    next(error)
  }
}
