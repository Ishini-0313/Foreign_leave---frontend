import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RegisterProvider } from './context/RegisterContext.tsx'
import { ApplicationProvider } from './context/ApplicationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RegisterProvider>
        <ApplicationProvider>
          <App />
        </ApplicationProvider>
      </RegisterProvider>
    </BrowserRouter>
  </StrictMode>,
)
