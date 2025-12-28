import { useState, useMemo } from 'react'
import type { Flight } from '@skycart/common'
import type { UsePaginationResult } from '../types'
import { ITEMS_PER_PAGE } from '../constants'

/**
 * Custom hook to handle pagination logic
 * @param data - Array of items to paginate
 * @param itemsPerPage - Number of items per page (defaults to ITEMS_PER_PAGE constant)
 * @returns Object containing pagination state and controls
 */
export const usePagination = (
  data: Flight[],
  itemsPerPage: number = ITEMS_PER_PAGE,
): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
  }
}
