import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CompaniesProvider } from './contexts/CompanyContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CompaniesProvider>
      <App />
    </CompaniesProvider>
  </React.StrictMode>,
)
