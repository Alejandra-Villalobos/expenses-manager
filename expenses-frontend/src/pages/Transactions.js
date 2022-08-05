import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'


function Transactions() {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row'>
    {showMenu && <SideMenu/>}
    <div className='w-full'>
      <h1 className='text-center mt-8 font-bold text-2xl'>Transactions</h1>
      <section className='flex flex-row justify-center items-center gap-x-5 mt-8'>
        <button className='bg-green-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Expense</button>
        <button className='bg-blue-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Income</button>
      </section>
        <section className='flex flex-row mt-8 gap-x-5 items-center'>
          <p className='ml-8 font-bold text-xl'>Sort by:</p>
          <button className='bg-red-500 border-2 rounded-lg border-white p-4 shadow-md'>Date</button>
          <button className='bg-orange-500 border-2 rounded-lg border-white p-4 shadow-md'>Category</button>
          <button className='bg-yellow-500 border-2 rounded-lg border-white p-4 shadow-md'>Bank</button>
        </section>
      </div>
    </div>
    </>
  )
}

export default Transactions