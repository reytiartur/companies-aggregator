import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CompaniesProvider } from './contexts/CompanyContext'
import { FiltersProvider } from './contexts/FiltersContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FiltersProvider>
      <CompaniesProvider>
        <App />
      </CompaniesProvider>
    </FiltersProvider>
  </React.StrictMode>,
)
