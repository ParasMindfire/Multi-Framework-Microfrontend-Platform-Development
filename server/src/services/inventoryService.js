import {
  createInventoryItem as createItem,
  removeInventoryItem as removeItem,
  updateInventoryQuantity as updateItem,
  getInventoryByFlight,
  updateInventoryTrolley as updateTrolley,
} from '../repositories/inventoryRepository.js'

import { AppError } from '../middleware/appError.js'
import { ERROR_CODES } from '../constants/errorCodes.js'
import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { validateId } from '../utils/validateId.js'
import { HTTP_STATUS } from '../constants/httpStatus.js'

export const fetchInventory = async (flightId) => {
  try {
    validateId(flightId)

    const inventory = await getInventoryByFlight(flightId)

    if (!inventory || inventory.length === 0) {
      throw new AppError(
        ERROR_MESSAGES.INVENTORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      )
    }

    return inventory
  } catch (err) {
    if (err instanceof AppError) throw err
    throw new AppError(err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.DB_ERROR)
  }
}

export const createInventoryItem = async (flightId, itemName, quantity, trolleyId = null) => {
  try {
    validateId(flightId)

    if (!itemName || typeof itemName !== 'string') {
      throw new AppError(ERROR_MESSAGES.INVALID_NAME, 400, ERROR_CODES.INVALID_INPUT)
    }

    if (quantity == null || quantity < 0) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_QUANTITY,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.INVALID_INPUT,
      )
    }

    return await createItem(flightId, itemName, quantity, trolleyId)
  } catch (err) {
    if (err instanceof AppError) throw err
    throw new AppError(err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.DB_ERROR)
  }
}

export const removeInventoryItem = async (itemId) => {
  try {
    validateId(itemId)

    const deleted = await removeItem(itemId)

    if (!deleted) {
      throw new AppError(
        ERROR_MESSAGES.INVENTORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      )
    }

    return deleted
  } catch (err) {
    if (err instanceof AppError) throw err
    throw new AppError(err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.DB_ERROR)
  }
}

export const updateInventoryQuantity = async (itemId, quantity) => {
  try {
    validateId(itemId)

    if (quantity == null || quantity < 0) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_QUANTITY,
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.INVALID_INPUT,
      )
    }

    const updated = await updateItem(itemId, quantity)

    if (!updated) {
      throw new AppError(
        ERROR_MESSAGES.INVENTORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      )
    }

    return updated
  } catch (err) {
    if (err instanceof AppError) throw err
    throw new AppError(err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.DB_ERROR)
  }
}

export const updateInventoryTrolley = async (itemId, trolleyId) => {
  try {
    validateId(itemId)

    const updated = await updateTrolley(itemId, trolleyId)

    if (!updated) {
      throw new AppError(
        ERROR_MESSAGES.INVENTORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.NOT_FOUND,
      )
    }

    return updated
  } catch (err) {
    if (err instanceof AppError) throw err
    throw new AppError(err.message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.DB_ERROR)
  }
}
