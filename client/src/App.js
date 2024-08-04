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

      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route path='/' element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='add-admin' element={<Add_admin />} />
            {/* <Route path='view-user' element={<View_admin />} /> */}
            <Route path='Nutrients' element={<Nutrients />} />
            <Route path='province-Nutrients/:province/:name' element={<ProvinceNutrients />} />
            <Route path='Nutrients-Source' element={<NutrientsSource />} />
            <Route path='Nutrients-quantity' element={<NutrientsQuantity />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
