import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="relative   mx-auto min-h-dvh p-14 bg-stone-200 ">
        <Outlet />
      </section>
    </>
  )
}
