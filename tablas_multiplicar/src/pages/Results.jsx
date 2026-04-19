import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HappyMascot, StudyMascot } from '../components/Mascots'
import ProgressBar from '../components/ProgressBar'
import { usePractice } from '../context/PracticeContext'

export default function Results() {
  const navigate = useNavigate()

  const {
    session,
    total,
    answered,
    scorePercent,
    errorPercent,
    getResultMessage,
    resetSession,
  } = usePractice()

  useEffect(() => {
    if (session.status !== 'finished') {
      navigate('/tablas', { replace: true })
    }
  }, [navigate, session.status])

  const isGreat = scorePercent >= 75
  const displayMessage = session.resultMessage || getResultMessage(scorePercent) || ''

  const summary = useMemo(() => {
    return {
      correct: session.correct,
      incorrect: session.incorrect,
    }
  }, [session.correct, session.incorrect])

  return (
    <section className="stack">
      <div className="page-head">
        <h1>Resultados</h1>
        <p className="muted">¡Buen trabajo! Mira cómo te fue.</p>
      </div>

      <div className="results-grid">
        <div className="result-card">
          <div className="result-hero">
            {isGreat ? <HappyMascot /> : <StudyMascot />}
          </div>
          <div className="result-message" role="status">
            {displayMessage}
          </div>

          <div className="result-metrics">
            <div className="metric">
              <div className="metric-label">Aciertos</div>
              <div className="metric-value">{summary.correct}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Errores</div>
              <div className="metric-value">{summary.incorrect}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Puntaje</div>
              <div className="metric-value">{scorePercent}%</div>
            </div>
          </div>
        </div>

        <div className="result-card">
          <h2>Porcentajes</h2>
          <p className="muted">Total respondidas: {answered} de {total}</p>

          <div className="stack-sm">
            <div>
              <div className="row-between">
                <span>Aciertos</span>
                <strong>{scorePercent}%</strong>
              </div>
              <ProgressBar value={scorePercent} max={100} />
            </div>
            <div>
              <div className="row-between">
                <span>Errores</span>
                <strong>{errorPercent}%</strong>
              </div>
              <ProgressBar value={errorPercent} max={100} />
            </div>
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                resetSession()
                navigate('/tablas')
              }}
            >
              Elegir otras tablas
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
