import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PracticeProvider } from './context/PracticeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PracticeProvider>
      <App />
    </PracticeProvider>
  </StrictMode>,
)
