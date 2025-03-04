import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { authContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function Register() {
  const [isLoading, setisLoading] = useState(false)
  const { loginAuth } = useContext(authContext)
  const [error, seterror] = useState(null)
  const navigate=useNavigate()

  async function handleLogin(values) {
    setisLoading(true)
    try {
      const { data } = await loginAuth(values)
      console.log(data);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Account logged in successfully",
      showConfirmButton: false,
      timer: 1500
    });
      setisLoading(false)
      setTimeout(() => {
        navigate('/')
      }, 1500);
      
    } catch (error) {
      console.log(error.response.data.msg);
      setisLoading(false)
      seterror(error.response.data.msg)
    }

  }
  const schema = z.object({
    email: z.string().email('invalid email'),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,'invalid password'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', resolver: zodResolver(schema) })



  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-sm mx-auto border-4 border-stone-500 rounded-xl p-4">
        <h2 className='text-center text-3xl font-bold mb-8 text-stone-500'>Login Now</h2>
        {error!== null ? <div className='text-red-700 mt-1 text-center my-3'>{error}</div>: ''}

        <div className="mb-5">
          <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 ">  Email</label>
          <input {...register('email')} type="email" id="Email" className="focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
          {errors.email && <div className='text-red-700 mt-1'>{errors.email.message}</div>
          }
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">  password</label>
          <input {...register('password')} type="password" id="password" className="focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
          {errors.password && <div className='text-red-700 mt-1'>{errors.password.message}</div>
          }
        </div>


        <button className='px-4 py-2 rounded-2xl  border-2 border-stone-500 bg-white text-stone-500 font-bold hover:shadow-lg hover:shadow-stone-500/50'>
        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
        </button>
      </form>
    </>
  )
}
