import type { SearchFilterProps } from '../../types'
import { UI_TEXT } from '../../constants'
import './SearchFilter.css'

export default function SearchFilter({ searchTerm, onSearchChange, onRefresh }: SearchFilterProps) {
  return (
    <div className="dashboard-controls">
      <input
        type="text"
        placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <button onClick={onRefresh} className="refresh-btn">
        {UI_TEXT.REFRESH_BUTTON}
      </button>
    </div>
  )
}
