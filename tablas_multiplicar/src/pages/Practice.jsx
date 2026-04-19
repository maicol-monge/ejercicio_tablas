import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { usePractice } from '../context/PracticeContext'

function AnswerForm({ questionIndex, disabled, onSubmitAnswer }) {
  const inputRef = useRef(null)
  const [answerText, setAnswerText] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [questionIndex])

  function onSubmit(e) {
    e.preventDefault()
    if (disabled) return

    const value = Number.parseInt(answerText, 10)
    if (Number.isNaN(value)) return

    onSubmitAnswer(value)
  }

  return (
    <form className="answer-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="answer">
        Tu respuesta
      </label>
      <input
        id="answer"
        ref={inputRef}
        className="input"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        disabled={disabled}
        placeholder="Escribe tu respuesta"
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={disabled || answerText.trim() === ''}
      >
        Revisar
      </button>
    </form>
  )
}

export default function Practice() {
  const navigate = useNavigate()
  const nextButtonRef = useRef(null)

  const {
    session,
    total,
    answered,
    submitAnswer,
    nextQuestion,
    scorePercent,
  } = usePractice()

  const current = session.questions[session.index]
  const hasSubmitted = Boolean(session.lastFeedback)

  useEffect(() => {
    if (session.status === 'idle') {
      navigate('/tablas', { replace: true })
      return
    }

    if (session.status === 'finished') {
      navigate('/resultados', { replace: true })
    }
  }, [navigate, session.status])

  const prompt = useMemo(() => {
    if (!current) return ''
    return `${current.table} × ${current.multiplier} = `
  }, [current])

  const onNext = useCallback(() => {
    nextQuestion()
  }, [nextQuestion])

  useEffect(() => {
    if (!hasSubmitted) return
    nextButtonRef.current?.focus()
  }, [hasSubmitted])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'Enter') return
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (!hasSubmitted) return
      e.preventDefault()
      onNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasSubmitted, onNext])

  if (!current) return null

  return (
    <section className="stack">
      <div className="page-head">
        <h1>Practicar</h1>
        <p className="muted">
          Pregunta {session.index + 1} de {total}
        </p>
      </div>

      <ProgressBar value={answered} max={total} />

      <div className="question-card">
        <div className="question-row">
          <div className="question-prompt" aria-label="Pregunta">
            {prompt}
          </div>
        </div>

        <AnswerForm
          key={session.index}
          questionIndex={session.index}
          disabled={hasSubmitted}
          onSubmitAnswer={submitAnswer}
        />

        {session.lastFeedback ? (
          <div
            className={
              session.lastFeedback.isCorrect
                ? 'feedback feedback-ok'
                : 'feedback feedback-bad'
            }
            role="status"
          >
            <div className="feedback-title">
              {session.lastFeedback.isCorrect ? '¡Correcto!' : '¡Casi!'}
            </div>
            <div className="feedback-message">{session.lastFeedback.message}</div>
          </div>
        ) : (
          <div className="hint" aria-label="Pista">
            Consejo: piensa en sumas repetidas.
          </div>
        )}

        <div className="actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate('/tablas')}
          >
            Cambiar tablas
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onNext}
            disabled={!hasSubmitted}
            ref={nextButtonRef}
          >
            {session.index >= total - 1 ? 'Ver resultados' : 'Siguiente'}
          </button>
        </div>

        <div className="mini-stats" aria-label="Progreso">
          <span>
            Aciertos: <strong>{session.correct}</strong>
          </span>
          <span>
            Errores: <strong>{session.incorrect}</strong>
          </span>
          <span>
            Puntaje: <strong>{scorePercent}%</strong>
          </span>
        </div>
      </div>
    </section>
  )
}
