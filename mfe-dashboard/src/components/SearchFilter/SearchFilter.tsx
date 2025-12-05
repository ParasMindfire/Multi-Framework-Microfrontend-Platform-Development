import './SearchFilter.css'

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
}

export default function SearchFilter({ searchTerm, onSearchChange, onRefresh }: SearchFilterProps) {
  return (
    <div className="dashboard-controls">
      <input
        type="text"
        placeholder="Search by flight number, origin, or destination..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />

      <button onClick={onRefresh} className="refresh-btn">
        ↻ Refresh
      </button>
    </div>
  )
}
