import { HTTP_STATUS } from '../constants/httpStatus.js'
import { AppError } from './appError.js'

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    })
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
  })
}
