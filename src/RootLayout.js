import React from 'react'
import Navigationbar from './components/navigationbar/Navigationbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/footer.js'
function RootLayout() {
  return (
    <div>
        <Navigationbar/>
        <div className='container'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout