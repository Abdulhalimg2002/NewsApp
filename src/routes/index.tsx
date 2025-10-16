import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Category from "../Pages/Category";
import FavoritesP from "../Pages/FavoritesP";


const router = createBrowserRouter(createRoutesFromElements(
   
    <>
    <Route path="/" element={<Layout />}>
<Route index element={ <Home/>} />
<Route path="category/:category" element={ <Category/>} />
<Route path="/favorites" element={<FavoritesP />} />
    </Route>
     {/* --- loyut fristp ---*/}
  


  
</>
   
)

);
export default router;