export * from './eventBus'
export * from './types'
export * from './api'

export const formatTime = (timeString: string): string => {
  try {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return timeString
  }
}

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}
