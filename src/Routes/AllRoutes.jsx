import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import BasketDetails from '../Pages/BasketDetails'
import Disclosure from '../Pages/Disclosure'
import NotFound from '../Pages/NotFound'
import Login from '../Pages/Login'
import ConfirmOrder from '../Pages/ConfirmOrder'
import PrivateRoute from './PrivateRoute'

export default function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/basket/:id' element={<PrivateRoute><BasketDetails/></PrivateRoute>} />
            <Route path='/disclosure/:id' element={<PrivateRoute><Disclosure/></PrivateRoute>}/>
            <Route path='/confirm-order/:id' element={<PrivateRoute><ConfirmOrder/></PrivateRoute>} />
            <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}
