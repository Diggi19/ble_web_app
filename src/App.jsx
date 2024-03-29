import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Reminder from './pages/Reminder'
import About from './pages/About'
import React from 'react'
import Auth from './pages/Auth'
import '../sw';
import {BluetoothContextProvider} from './context'

function App() {
  const[isUser,setisUser] = React.useState(true)
  const[user,setuser] = React.useState("")
  const[activeDrawer,setactiveDrawer] = React.useState("home")
  const[reg,setreg] = React.useState()
  
  if (!isUser) {
    return(
      <>
        <Auth/>
      </>
    )
  }
  return (
    <>
    
      <BrowserRouter>
        <BluetoothContextProvider>
          <Routes>
            <Route path='/' element={<Home activeDrawer={activeDrawer} setactiveDrawer={setactiveDrawer} />}/>
            <Route path='/reminder' element={<Reminder activeDrawer={activeDrawer} setactiveDrawer={setactiveDrawer}/>}/>
            <Route path='/about' element={<About activeDrawer={activeDrawer} setactiveDrawer={setactiveDrawer}/>}/>
          </Routes>
          </BluetoothContextProvider>
      </BrowserRouter>
          
    </>
  )
}

export default App
