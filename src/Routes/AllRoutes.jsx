import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import BasketDetails from '../Pages/BasketDetails'
import Disclosure from '../Pages/Disclosure'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import ConfirmOrder from '../Pages/ConfirmOrder'

export default function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/basket/:id' element={<BasketDetails/>} />
            <Route path='/disclosure/:id' element={<Disclosure/>}/>
            <Route path='/confirm-order' element={<ConfirmOrder/>} />
            <Route path='/home' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}
