import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import { FavoritesProvider } from './Contaxt/Favorit.tsx'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
    <FavoritesProvider>
      <RouterProvider router={router} />
   
      </FavoritesProvider>
   
      
  </StrictMode>,
)
