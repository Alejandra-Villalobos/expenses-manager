import React from 'react'
import { ImSad2 } from 'react-icons/im'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='bg-emerald-100 w-screen h-screen flex justify-center items-center flex-col gap-7'>
      <h1 className='text-4xl'>Error 404!</h1>
      <ImSad2 size={100}/>
      <h1 className='text-3xl'>The page you are looking for does not exist</h1>
      <div className='h-1/6'>
        <h1 className='text-xl'>Go back to <Link to={'/home'} className='text-sky-600 underline hover:text-2xl transition-all'>Home</Link></h1>
      </div>
    </div>
  )
}

export default NotFound