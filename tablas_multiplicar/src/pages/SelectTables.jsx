import { useNavigate } from 'react-router-dom'
import TableCard from '../components/TableCard'
import { tablesCatalog } from '../data/tables'
import { usePractice } from '../context/PracticeContext'

export default function SelectTables() {
  const navigate = useNavigate()
  const { selectedTables, toggleTable, clearTables, beginSession } = usePractice()

  const canStart = selectedTables.length > 0

  function onStart() {
    const started = beginSession()
    if (started) navigate('/practicar')
  }

  return (
    <section className="stack">
      <div className="page-head">
        <h1>Elige tus tablas</h1>
        <p className="muted">
          Puedes elegir una o varias. Luego presiona <strong>Comenzar</strong>.
        </p>
      </div>

      <div className="table-grid" role="list">
        {tablesCatalog.map((t) => (
          <div key={t.number} role="listitem">
            <TableCard
              number={t.number}
              animal={t.animal}
              label={t.label}
              selected={selectedTables.includes(t.number)}
              onToggle={toggleTable}
            />
          </div>
        ))}
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={clearTables}
          disabled={!selectedTables.length}
        >
          Limpiar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onStart}
          disabled={!canStart}
        >
          Comenzar ({selectedTables.length})
        </button>
      </div>
    </section>
  )
}
