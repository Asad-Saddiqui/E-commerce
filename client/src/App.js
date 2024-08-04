import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './Pages/admin/Dashboard'
import Profile from './Pages/admin/Profile'
import Add_admin from './Pages/admin/Add_admin'
import View_admin from './Pages/admin/View_admin'
import Nutrients from './Pages/admin/Nutrients'
import ProvinceNutrients from './Pages/admin/ProvinceNutrients'
import NutrientsSource from './Pages/admin/NutrientsSource'
import NutrientsQuantity from './Pages/admin/NutrientsQuantity'
function App() {
  return (
    <div className="App">
 asad
      <BrowserRouter>
        <Routes>
          {/* <Route exact path='/login' element={<h2>Asad 4</h2>} /> */}
         ASad 2
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
