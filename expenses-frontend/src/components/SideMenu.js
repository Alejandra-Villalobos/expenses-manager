import React from 'react'
import { Outlet, Link } from "react-router-dom"
import { AiOutlineDashboard } from 'react-icons/ai'
import { BsBank } from 'react-icons/bs'
import { GrTransaction } from 'react-icons/gr'

const SideMenu = () => {
  return (
    <>
    <div className='flex flex-col w-24 h-screen bg-green-700'>
      <Link to={'/home'} className='flex flex-col p-5 border-2 border-green-600 rounded-md'>
        <button className='flex flex-col items-center '>
          <AiOutlineDashboard/>
          Dashboard
        </button>
      </Link>
      <Link to={'/banks'} className='flex flex-col p-5 border-2 border-green-600 rounded-md'>
        <button className='flex flex-col items-center '>
          <BsBank/>
          Bank Accounts
        </button>
      </Link>
      <Link to={'/transactions'} className='flex flex-col p-5 border-2 border-green-600 rounded-md'>
        <button className='flex flex-col items-center '>
          <GrTransaction/>
          Transactions
        </button>
      </Link>
    </div>
    <Outlet/>
    </>
  )
}

export default SideMenu