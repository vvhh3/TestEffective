import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Registry from './pages/Registry'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProfileUpdate from './pages/ProfilePage'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registry />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/update' element={<ProfileUpdate />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
