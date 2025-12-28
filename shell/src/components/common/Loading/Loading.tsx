import type { LoadingProps } from '../../../types'

export default function Loading({ message = 'Loading module...' }: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  )
}
