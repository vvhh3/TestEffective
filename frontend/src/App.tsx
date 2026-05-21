import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Registry from './pages/Registry'
import Login from './pages/Login'
import Profile from './pages/Profile'

import axios from 'axios'

import './App.css'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const init = async () => {

      if (localStorage.getItem("isAuth") === "true") {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true
        })
        console.log("res", res)
      }

    }
    init()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registry' element={<Registry />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
