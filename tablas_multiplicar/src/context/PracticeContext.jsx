import { createContext, useContext, useMemo, useState } from 'react'
import { fisherYatesShuffle } from '../utils/fisherYates'
import { randomFrom } from '../utils/random'
import {
  correctMessages,
  incorrectMessages,
  resultMessages,
} from '../data/messages'

const PracticeContext = createContext(null)

function buildQuestions(selectedTables) {
  const questions = []
  for (const table of selectedTables) {
    for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
      questions.push({ table, multiplier })
    }
  }
  return fisherYatesShuffle(questions)
}

export function PracticeProvider({ children }) {
  const [selectedTables, setSelectedTables] = useState([])

  const [session, setSession] = useState({
    status: 'idle', // idle | running | finished
    questions: [],
    index: 0,
    correct: 0,
    incorrect: 0,
    lastFeedback: null, // { isCorrect: boolean, message: string }
    resultMessage: null,
  })

  const actions = useMemo(() => {
    function toggleTable(number) {
      setSelectedTables((prev) => {
        const has = prev.includes(number)
        const next = has ? prev.filter((n) => n !== number) : [...prev, number]
        next.sort((a, b) => a - b)
        return next
      })
    }

    function clearTables() {
      setSelectedTables([])
    }

    function beginSession() {
      if (!selectedTables.length) return false
      const questions = buildQuestions(selectedTables)
      setSession({
        status: 'running',
        questions,
        index: 0,
        correct: 0,
        incorrect: 0,
        lastFeedback: null,
        resultMessage: null,
      })
      return true
    }

    function submitAnswer(answerNumber) {
      setSession((prev) => {
        if (prev.status !== 'running') return prev
        const current = prev.questions[prev.index]
        if (!current) return prev

        const expected = current.table * current.multiplier
        const isCorrect = answerNumber === expected

        const nextCorrect = prev.correct + (isCorrect ? 1 : 0)
        const nextIncorrect = prev.incorrect + (isCorrect ? 0 : 1)

        const message = randomFrom(
          isCorrect ? correctMessages : incorrectMessages,
        )

        return {
          ...prev,
          correct: nextCorrect,
          incorrect: nextIncorrect,
          lastFeedback: {
            isCorrect,
            message,
          },
        }
      })
    }

    function nextQuestion() {
      setSession((prev) => {
        if (prev.status !== 'running') return prev
        const isLast = prev.index >= prev.questions.length - 1
        if (isLast) {
          const total = prev.questions.length || 0
          const scorePercent = total
            ? Math.round((prev.correct / total) * 100)
            : 0

          const resultMessage = randomFrom(
            scorePercent >= 75 ? resultMessages.great : resultMessages.keepGoing,
          )

          return {
            ...prev,
            status: 'finished',
            resultMessage,
          }
        }
        return {
          ...prev,
          index: prev.index + 1,
          lastFeedback: null,
        }
      })
    }

    function resetSession() {
      setSession({
        status: 'idle',
        questions: [],
        index: 0,
        correct: 0,
        incorrect: 0,
        lastFeedback: null,
        resultMessage: null,
      })
    }

    function getResultMessage(scorePercent) {
      const bucket = scorePercent >= 75 ? 'great' : 'keepGoing'
      return randomFrom(resultMessages[bucket])
    }

    return {
      toggleTable,
      clearTables,
      beginSession,
      submitAnswer,
      nextQuestion,
      resetSession,
      getResultMessage,
    }
  }, [selectedTables])

  const value = useMemo(() => {
    const total = session.questions.length || 0
    const answered = session.correct + session.incorrect
    const scorePercent = total ? Math.round((session.correct / total) * 100) : 0
    const errorPercent = total ? 100 - scorePercent : 0

    return {
      selectedTables,
      session,
      total,
      answered,
      scorePercent,
      errorPercent,
      ...actions,
    }
  }, [actions, selectedTables, session])

  return (
    <PracticeContext.Provider value={value}>{children}</PracticeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePractice() {
  const context = useContext(PracticeContext)
  if (!context) {
    throw new Error('usePractice must be used within PracticeProvider')
  }
  return context
}
