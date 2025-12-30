import { AppError } from '../middleware/appError.js'
import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { ERROR_CODES } from '../constants/errorCodes.js'

export const validateId = (id) => {
  if (!id || isNaN(Number(id))) {
    throw new AppError(ERROR_MESSAGES.INVALID_ID, 400, ERROR_CODES.INVALID_INPUT)
  }
}
