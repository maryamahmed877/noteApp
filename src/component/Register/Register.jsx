import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { authContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const [isLoading, setisLoading] = useState(false)
  const { registerAuth } = useContext(authContext)
  const navigate=useNavigate()

  async function handleRegister(values) {
    setisLoading(true)
    try {
      const { data } = await registerAuth(values)
      console.log(data);
      Swal.fire({
            position: "center",
            icon: "success",
            title: "Account created successfully",
            showConfirmButton: false,
            timer: 1500
          });
      setisLoading(false)
      setTimeout(() => {
        navigate('/')
      }, 1500);
    } catch (error) {
      console.log(error);
      setisLoading(false)
    }

  }
  const schema = z.object({
    name: z.string().min(3, 'name must be at least 3 letters').max(10, 'name must be less than 11 letters'),
    email: z.string().email('invalid email'),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,'invalid password'),
    age: z.coerce.number().min(16, 'age must be more than 15 years old').max(100, 'age must be less than 100'),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, 'phone must be an egyption number')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', resolver: zodResolver(schema) })



  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)} className="max-w-sm mx-auto border-4 border-stone-500 rounded-xl p-4">
        <h2 className='text-center text-3xl font-bold mb-8 text-stone-500'>Register Now</h2>
        <div className="mb-5">
          <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
          <input {...register('name')} type="text" id="Name" className="focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
          {errors.name && <div className='text-red-700 mt-1'>{errors.name.message}</div>
          }
        </div>
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
        <div className="mb-5">
          <label htmlFor="Age" className="block mb-2 text-sm font-medium text-gray-900 ">  Age</label>
          <input {...register('age')} type="number" id="Age" className="focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
          {errors.age && <div className='text-red-700 mt-1'>{errors.age.message}</div>
          }
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">  phone</label>
          <input {...register('phone')} type="tel" id="phone" className="focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
          {errors.phone && <div className='text-red-700 mt-1'>{errors.phone.message}</div>
          }
        </div>
        <button className='px-4 py-2 rounded-2xl  border-2 border-stone-500 bg-white text-stone-500 font-bold hover:shadow-lg hover:shadow-stone-500/50'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
        </button>
      </form>
    </>
  )
}
