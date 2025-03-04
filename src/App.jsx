import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Notfound from './component/Notfound/Notfound'
import AuthContextProvider from './Context/AuthContext'
import NoteContextProvider from './Context/NoteContext'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes'

function App() {
  let rout = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element:<ProtectedRoutes><Home /></ProtectedRoutes>  },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> },

      ]
    }
  ])

  return (
    <>
      <AuthContextProvider>
        <NoteContextProvider>
          <RouterProvider router={rout}>
          </RouterProvider>
        </NoteContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
