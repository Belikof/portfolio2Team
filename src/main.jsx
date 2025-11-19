import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Обработка ошибок при загрузке
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error)
})

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason)
})

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }
  
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} catch (error) {
  console.error('Failed to render app:', error)
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>Ошибка загрузки</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `
}
