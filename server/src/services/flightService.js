import { getAllFlights } from '../repositories/flightRepository.js'
import { AppError } from '../middleware/appError.js'
import { ERROR_CODES } from '../constants/errorCodes.js'
import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { HTTP_STATUS } from '../constants/httpStatus.js'

export const fetchFlights = async () => {
  try {
    const flights = await getAllFlights()

    if (!flights || flights.length === 0) {
      throw new AppError(
        ERROR_MESSAGES.FLIGHT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      )
    }

    return flights
  } catch (err) {
    if (err instanceof AppError) throw err

    throw new AppError(
      err.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.DB_ERROR,
    )
  }
}
