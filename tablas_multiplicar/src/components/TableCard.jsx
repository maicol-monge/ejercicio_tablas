export default function TableCard({ number, animal, label, selected, onToggle }) {
  return (
    <button
      type="button"
      className={selected ? 'table-card table-card-selected' : 'table-card'}
      onClick={() => onToggle(number)}
      aria-pressed={selected}
    >
      <div className="table-card-top">
        <div className="table-card-animal" aria-hidden="true">
          {animal}
        </div>
        <div className="table-card-number" aria-label={label}>
          {number}
        </div>
      </div>
      <div className="table-card-label">{label}</div>
      <div className="table-card-check" aria-hidden="true">
        {selected ? '✓' : ''}
      </div>
    </button>
  )
}
