import React, { useState } from 'react'
import SideMenu from '../components/SideMenu.js'
import NavBar from '../components/NavBar.js'

const Home = () => {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <>
    <NavBar setState={setShowMenu} state={showMenu}/>
    <div className='flex flex-row'>
    {showMenu && <SideMenu/>}
      <div className='w-full'>
        <section className='mt-8'>
          <h1 className='text-center font-bold text-2xl'>Dashboard</h1>
        </section>
        <section className='justify-evenly flex mt-12'>
          <button className='bg-green-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Expense</button>
          <button className='bg-blue-500 border-2 rounded-lg border-white p-4 shadow-md'>Add Income</button>
        </section>
        <section className='mt-12'>
          <h2 className='text-center font-bold text-2xl'>Bank Accounts</h2>
        </section>
      </div>
    </div>
    </>
  )
}

export default Home