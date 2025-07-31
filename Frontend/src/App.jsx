import { React, useEffect, useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import SignUpPage from './Pages/SignUpPage.jsx'
import SettingsPage from './Pages/SettingsPage.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import { useAuthStore } from './Api/Auth.js'

const App = () => {
  const { authUser, CheckAuth } = useAuthStore();
  
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
