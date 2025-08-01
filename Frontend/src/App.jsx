import { React, useEffect, useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import SignUpPage from './Pages/SignUpPage.jsx'
import SettingsPage from './Pages/SettingsPage.jsx'
import ProfilePage from './Pages/ProfilePage.jsx'
import { useAuthStore } from './Api/Auth.js'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { authUser, CheckAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    CheckAuth()
  }, [CheckAuth])

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
