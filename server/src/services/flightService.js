import { getAllFlights } from '../repositories/flightRepository.js'

export const fetchFlights = async () => {
  return await getAllFlights()
}
