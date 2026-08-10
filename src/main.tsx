import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RegisterProvider } from './context/RegisterContext.tsx'
import { ApplicationProvider } from './context/ApplicationContext.tsx'
import { AmendmentProvider } from './context/AmendmentContext.tsx'
import { Toaster } from 'react-hot-toast'
import { LeaveCategoryProvider } from './context/LeaveCategoryContext.tsx'
import '@fontsource-variable/noto-sans-sinhala/wght.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RegisterProvider>
        <ApplicationProvider>
          <AmendmentProvider>
            <LeaveCategoryProvider>
              <App />
            </LeaveCategoryProvider>
            <Toaster 
              position="top-right"
              reverseOrder={false}
            />
          </AmendmentProvider>
        </ApplicationProvider>
      </RegisterProvider>
    </BrowserRouter>
  </StrictMode>,
)
