
import { RouterProvider } from 'react-router-dom'
import './App.css'


import router from './routes'
import { FavoritesProvider } from './Contaxt/Favorit'
import Home from './Pages/Home'



function App() {
 

  return (
    <>
    
<RouterProvider router={router} />
   <FavoritesProvider>
      <Home />
    </FavoritesProvider>
    
   
     
    </>
  )
}

export default App
