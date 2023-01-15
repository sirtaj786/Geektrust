import React from 'react'
import {Routes,Route} from "react-router-dom"
import Cart from '../Components/Cart'

import Dashboard from '../Components/Dashboard'


export default function MainRoute() {
  return (
    <>
    <Routes>
     <Route path='/' element={<Dashboard/>}/>
     <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </>
  )
}